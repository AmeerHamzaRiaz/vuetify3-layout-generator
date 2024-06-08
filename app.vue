<script lang="ts" setup>
import { appBarTemplate, endNavDrawerTemplate, footerTemplate, startNavDrawerTemplate } from './templates'
import { appBarLayoutConfig, footerProperties, navigationDrawerProperties } from '~/config'

import 'prismjs/themes/prism.min.css'

const appBarLayoutValues = ref({})
const footerLayoutValues = ref({})
const startLayoutValues = ref({})
const endLayoutValues = ref({})
const verticalStepper = ref(0)

const layoutPartValues: Ref<Record<string, boolean>> = ref({
  appBarVisible: true,
  startNaviDrawerVisible: true,
  endNavDrawerVisible: true,
  footerVisible: true,
})

const stepper = ref(1)
const dialog = ref(false)
const finished = ref(false)

const stepperConfig = computed(() => ({
  appBar: {
    title: 'Configure Application Bar',
    config: appBarLayoutConfig,
    values: appBarLayoutValues.value,
    visibility: layoutPartValues.value.appBarVisible,
  },
  startNavDrawer: {
    title: 'Configure Left Navigation Drawer',
    config: navigationDrawerProperties,
    values: startLayoutValues.value,
    visibility: layoutPartValues.value.startNaviDrawerVisible,

  },
  endNavDrawer: {
    title: 'Configure Right Navigation Drawer',
    config: navigationDrawerProperties,
    values: endLayoutValues.value,
    visibility: layoutPartValues.value.endNavDrawerVisible,

  },
  footer: {
    title: 'Configure Footer',
    config: footerProperties,
    values: footerLayoutValues.value,
    visibility: layoutPartValues.value.footerVisible,
  },
}))

const filteredStepperConfig = computed(() =>
  Object.entries(stepperConfig.value)
    .filter(([_, config]) => config.visibility === true)
    .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {}),
)

function onClickFinish() {
  finished.value = true
  stepper.value = 3
}

function onUpdateLayoutPartValue(newValues: Record<string, boolean>) {
  layoutPartValues.value = { ...newValues }
}

function mapProperties(template: string, values: any) {
  let props = ''
  for (const [key, value] of Object.entries(values)) {
    if (['boolean', 'number'].includes(typeof value))
      props += `:${key}="${value}" \n`
    else
      props += `${key}="${value}" `
  }
  return template.replace('$propsPlaceholder', props)
}

const generatedTemplate = ref('')

function formatVueTemplate(template) {
  const lines = template.split('\n')
  let formatted = ''
  let indentLevel = 0
  const indentSize = 2

  const increaseIndent = () => indentLevel += 1
  const decreaseIndent = () => indentLevel -= 1

  lines.forEach((line) => {
    line = line.trim()
    if (line.startsWith('</')) {
      decreaseIndent()
      formatted += `${' '.repeat(indentLevel * indentSize) + line}\n`
    }
    else if (line.endsWith('/>')) {
      formatted += `${' '.repeat(indentLevel * indentSize) + line}\n`
    }
    else if (line.endsWith('>')) {
      formatted += `${' '.repeat(indentLevel * indentSize) + line}\n`
      if (!line.startsWith('<!') && !line.startsWith('<?') && !line.includes('</'))
        increaseIndent()
    }
    else {
      formatted += `${' '.repeat(indentLevel * indentSize) + line}\n`
    }
  })

  return formatted.trim()
}

function onExport() {
  dialog.value = true
  const finalTemplate
  = `<template>${mapProperties(appBarTemplate, appBarLayoutValues.value)}${mapProperties(startNavDrawerTemplate, startLayoutValues.value)}${mapProperties(endNavDrawerTemplate, endLayoutValues.value)}${mapProperties(footerTemplate, footerLayoutValues.value)}</template>
  `
  generatedTemplate.value = formatVueTemplate(finalTemplate)
}

const isNextButtonDisabled = computed(() => {
  if (stepper.value === 1) {
    if (Object.values(layoutPartValues.value).every(value => value === false))
      return true

    return 'prev'
  }
  else if (stepper.value === 3) { return 'next' }

  return undefined
},
)

function onUpdateLayoutProperties(key: string, newValues: any) {
  if (key === 'appBar')
    appBarLayoutValues.value = { ...newValues }

  else if (key === 'startNavDrawer')
    startLayoutValues.value = { ...newValues }

  else if (key === 'endNavDrawer')
    endLayoutValues.value = { ...newValues }

  else if (key === 'footer')
    footerLayoutValues.value = { ...newValues }
}

function populateLayoutDefaultValues() {
  function extractProperties(config) {
    const properties = {}
    config.forEach((group) => {
      group.props.forEach((property) => {
        if (property.name && property.default !== undefined && property.default !== null)
          properties[property.name] = property.default
      })
    })
    return properties
  }

  const navProperties = extractProperties(navigationDrawerProperties)
  startLayoutValues.value = { ...navProperties, location: 'start' }

  endLayoutValues.value = { ...navProperties, location: 'end' }

  const appProperties = extractProperties(appBarLayoutConfig)
  appBarLayoutValues.value = { ...appProperties, prominent: true }

  const footeLayoutProperties = extractProperties(footerProperties)
  footerLayoutValues.value = { ...footeLayoutProperties, app: true }
}

onMounted(() => {
  nextTick(() => populateLayoutDefaultValues(),
  )
})

defineExpose({
  appBarLayoutValues,
  layoutPartValues,
  startLayoutValues,
  endLayoutValues,
  filteredStepperConfig,
})
</script>

<template>
  <NuxtLayout>
    <v-app>
      <app-bar-layout v-if="layoutPartValues.appBarVisible" :values="appBarLayoutValues" />
      <start-navigation-drawer-layout v-if="layoutPartValues.startNaviDrawerVisible" :values="startLayoutValues" />
      <end-navigation-drawer-layout v-if="layoutPartValues.endNavDrawerVisible" :values="endLayoutValues" />

      <v-container class="my-15">
        <v-stepper
          v-model="stepper"
          class="mx-auto"
          style="max-width: 800px;"
          alt-labels
          editable
          hide-actions
          :items="['Pick Layout', 'Configure', 'Export']"
        >
          <template #item.1>
            <v-card title="Pick Layout Parts" flat>
              <v-card-item>
                <layout-parts :values="layoutPartValues" @update:values="onUpdateLayoutPartValue" />
              </v-card-item>
            </v-card>
          </template>

          <template #item.2>
            <v-card title="Configure Layout Parts" flat>
              <v-card-item>
                <v-stepper-vertical v-model="verticalStepper">
                  <template #default="{ step }">
                    <v-stepper-vertical-item
                      v-for="(stepConfig, key, index) in filteredStepperConfig"
                      :key="index"
                      :complete="step > index + 1"
                      :title="stepConfig.title"
                      :value="index + 1"
                    >
                      <ui-renderer :config="stepConfig.config" :values="stepConfig.values" @update:values="updatedValues => onUpdateLayoutProperties(key, updatedValues)" />
                      <template #next="{ next }">
                        <v-btn v-if="index === Object.keys(filteredStepperConfig).length - 1" color="primary" text="Finish" @click="onClickFinish" />
                        <v-btn v-else color="primary" @click="next" />
                      </template>

                      <template #prev="{ prev }">
                        <v-btn v-if="index !== 0" variant="plain" @click="prev" />
                      </template>
                    </v-stepper-vertical-item>
                  </template>
                </v-stepper-vertical>
              </v-card-item>
            </v-card>
          </template>

          <template #item.3>
            <v-card title="Export Layout" flat>
              <v-card>
                <v-empty-state
                  class="pa-0"
                  image="/all_done.svg"
                  size="200"
                >
                  <template #media>
                    <v-sheet class="py-4 mb-4" color="#fdefff">
                      <v-img />
                    </v-sheet>
                  </template>

                  <template #title>
                    <div class="text-h6 text-high-emphasis">
                      Layout Generted Successfully !
                    </div>
                  </template>

                  <template #text>
                    <div class="text-body-2 font-weight-medium text-medium-emphasis">
                      If you're happy with the result, click export. Otherwise, go back and update the properties.
                    </div>
                  </template>

                  <template #actions>
                    <v-spacer />

                    <v-btn color="primary" @click="onExport">
                      Export Now
                    </v-btn>

                    <v-spacer />
                  </template>
                </v-empty-state>

                <v-dialog
                  v-model="dialog"
                  width="auto"
                  scrollable
                >
                  <v-card
                    title="Output Layout"
                  >
                    <v-card-text>
                      <ClientOnly>
                        <markup lang="markup" :code="generatedTemplate" />
                      </ClientOnly>
                    </v-card-text>

                    <template #actions>
                      <v-btn
                        class="ms-auto"
                        text="Ok"
                        variant="flat"
                        @click="dialog = false"
                      />
                    </template>
                  </v-card>
                </v-dialog>
              </v-card>
            </v-card>
          </template>

          <v-divider class="mb-4" />
          <v-stepper-actions
            color="primary"
            :disabled="isNextButtonDisabled"
            @click:next="stepper = stepper + 1"
            @click:prev="stepper = stepper - 1"
          />
        </v-stepper>
      </v-container>
      <NuxtPage />
      <footer-layout v-if="layoutPartValues.footerVisible" :values="footerLayoutValues" />
    </v-app>
  </NuxtLayout>
</template>
