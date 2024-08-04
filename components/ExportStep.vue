<script setup lang="ts">
import { appBarTemplate, endNavDrawerTemplate, footerTemplate, startNavDrawerTemplate } from '@/templates'
import { appBarLayoutConfig, footerLayoutProperties, navigationDrawerProperties } from '~/config'

const props = defineProps({
  appBarLayoutValues: {
    required: true,
  },
  startLayoutValues: {
    required: true,
  },
  endLayoutValues: {
    required: true,
  },
  footerLayoutValues: {
    required: true,
  },

})
const dialog = ref(false)
const generatedTemplate = ref('')

const onExport = () => {
  dialog.value = true
  const finalTemplate
  = `<template>
  <v-app>${mapProperties(appBarTemplate, props.appBarLayoutValues, appBarLayoutConfig)}${mapProperties(startNavDrawerTemplate, props.startLayoutValues, navigationDrawerProperties)}${mapProperties(endNavDrawerTemplate, props.endLayoutValues, navigationDrawerProperties)}${mapProperties(footerTemplate, props.footerLayoutValues, footerLayoutProperties)}</v-app>
  </template>
  `
  generatedTemplate.value = formatVueTemplate(finalTemplate)
}

const mapProperties = (template: string, values: any, config: any) => {
  const flatProps = config.reduce((acc, group) => {
    return acc.concat(group.props)
  }, [])

  let props = ''
  for (const [index, [key, value]] of Object.entries(values).entries()) {
    const currentProp = flatProps.find(item => item.name === key)
    if (currentProp && value === currentProp.default
    ) {
      continue
    }

    if (['boolean', 'number'].includes(typeof value)) { props += `:${key}="${value}"` }
    else { props += `${key}="${value}" ` }
    if (index < Object.entries(values).length - 1) { props += '\n' }
  }
  return template.replace('$propsPlaceholder', props)
}

const formatVueTemplate = (template: string) => {
  const lines = template.split('\n')
  let formatted = ''
  let indentLevel = 0
  const indentSize = 2

  const increaseIndent = () => indentLevel += 1
  const decreaseIndent = () => indentLevel -= 1

  lines.forEach((line: string) => {
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
      if (!line.startsWith('<!') && !line.startsWith('<?') && !line.includes('</')) { increaseIndent() }
    }
    else {
      formatted += `${' '.repeat(indentLevel * indentSize) + line}\n`
    }
  })

  return formatted.trim()
}
</script>

<script lang="ts">
export default {
  name: 'ExportStep',
}
</script>

<template>
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
