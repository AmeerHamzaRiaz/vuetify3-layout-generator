<script lang="ts" setup>
import { appBarTemplate, endNavDrawerTemplate, footerTemplate, startNavDrawerTemplate } from './templates'
import { appBarLayoutConfig, footerProperties, navigationDrawerProperties } from '~/config'

const appBarLayoutValues = ref({
  prominent: true,
})

const footerLayoutValues = ref({
  app: true,
})

const startLayoutValues = ref({
  location: 'start',
})

const endLayoutValues = ref({
  location: 'end',
})

const layoutPartValues: Ref<Record<string, boolean>> = ref({
  appBarVisible: true,
  startNavigationDrawerVisible: true,
  endNavigationDrawerVisible: true,
  footerVisible: true,
})

const stepper = ref(1)
const dialog = ref(false)
const finished = ref(false)

function onClickFinish() {
  finished.value = true
  stepper.value = 3
}

function onUpdateStartNavValue(newValues: any) {
  startLayoutValues.value = { ...newValues }
}
function onUpdateEndNavValue(newValues: any) {
  endLayoutValues.value = { ...newValues }
}

function onUpdateAppLayoutValue(newValues: any) {
  appBarLayoutValues.value = { ...newValues }
}

function onUpdateFooterLayoutValue(newValues: any) {
  footerLayoutValues.value = { ...newValues }
}

function onUpdateLayoutPartValue(newValues: Record<string, boolean>) {
  layoutPartValues.value = { ...newValues }
}

function mapProperties(template: string, values: any) {
  let props = ''
  for (const [key, value] of Object.entries(values))
    props += `${key}="${value}" `
  return template.replace('$propsPlaceholder', props)
}

const generatedTemplate = ref('')

function onExport() {
  dialog.value = true
  const finalTemplate = `
    <template>
      ${mapProperties(appBarTemplate, appBarLayoutValues.value)}
      ${mapProperties(startNavDrawerTemplate, startLayoutValues.value)}
      ${mapProperties(endNavDrawerTemplate, endLayoutValues.value)}
      ${mapProperties(footerTemplate, footerLayoutValues.value)}
    </template>
  `
  generatedTemplate.value = finalTemplate
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

onMounted(() => {
  const { $Prism } = useNuxtApp()
  $Prism?.highlightAll()
})

defineExpose({
  appBarLayoutValues,
  layoutPartValues,
  startLayoutValues,
  endLayoutValues,
})
</script>

<template>
  <NuxtLayout>
    <v-app>
      <app-bar-layout v-if="layoutPartValues.appBarVisible" :values="appBarLayoutValues" />
      <start-navigation-drawer-layout v-if="layoutPartValues.startNavigationDrawerVisible" :values="startLayoutValues" />
      <end-navigation-drawer-layout v-if="layoutPartValues.endNavigationDrawerVisible" :values="endLayoutValues" />

      <v-container class="mt-15">
        <v-stepper
          v-model="stepper"
          alt-labels
          editable
          hide-actions
          :items="['Pick Layout Parts', 'Configure Layout Parts', 'Play with Layout']"
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
                <v-stepper-vertical>
                  <template #default="{ step }">
                    <v-stepper-vertical-item
                      :complete="step > 1"
                      title="Configure Application Bar"
                      value="1"
                    >
                      <ui-renderer :config="appBarLayoutConfig" :values="appBarLayoutValues" @update:values="onUpdateAppLayoutValue" />

                      <template #next="{ next }">
                        <v-btn color="primary" @click="next" />
                      </template>

                      <template #prev />
                    </v-stepper-vertical-item>

                    <v-stepper-vertical-item
                      :complete="step > 2"
                      title="Configure Left Navigation Drawer"
                      value="2"
                    >
                      <ui-renderer :config="navigationDrawerProperties" :values="startLayoutValues" @update:values="onUpdateStartNavValue" />

                      <template #next="{ next }">
                        <v-btn color="primary" @click="next" />
                      </template>

                      <template #prev="{ prev }">
                        <v-btn variant="plain" @click="prev" />
                      </template>
                    </v-stepper-vertical-item>

                    <v-stepper-vertical-item
                      title="Configure Right Navigation Drawer"
                      :complete="step > 3"
                      value="3"
                    >
                      <ui-renderer :config="navigationDrawerProperties" :values="endLayoutValues" @update:values="onUpdateEndNavValue" />

                      <template #next="{ next }">
                        <v-btn color="primary" @click="next" />
                      </template>

                      <template #prev="{ prev }">
                        <v-btn variant="plain" @click="prev" />
                      </template>
                    </v-stepper-vertical-item>

                    <v-stepper-vertical-item
                      title="Configure Footer"
                      value="4"
                      @click:next="onClickFinish"
                    >
                      <ui-renderer :config="footerProperties" :values="footerLayoutValues" @update:values="onUpdateFooterLayoutValue" />

                      <template #next="{ next }">
                        <v-btn color="primary" text="Finish" @click="next" />
                      </template>

                      <template #prev="{ prev }">
                        <v-btn v-if="!finished" variant="plain" @click="prev" />

                        <v-btn v-else text="Reset" variant="plain" @click="finished = false" />
                      </template>
                    </v-stepper-vertical-item>
                  </template>
                </v-stepper-vertical>
              </v-card-item>
            </v-card>
          </template>

          <template #item.3>
            <v-card title="Play with Layout" flat>
              <v-btn @click="onExport">
                Open Dialog
              </v-btn>

              <v-dialog
                v-model="dialog"
                width="auto"
                scrollable
              >
                <v-card
                  title="Output Layout"
                >
                  <v-card-text>
                    <pre class="language-markup">
                      <code>
                        {{ generatedTemplate }}
                      </code>
                    </pre>
                  </v-card-text>
                  <template #actions>
                    <v-btn
                      class="ms-auto"
                      text="Ok"
                      @click="dialog = false"
                    />
                  </template>
                </v-card>
              </v-dialog>
            </v-card>
          </template>

          <v-stepper-actions
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
