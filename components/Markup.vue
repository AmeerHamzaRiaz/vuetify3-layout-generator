<script setup lang="ts">
import Prism from 'prismjs'
import 'prismjs/themes/prism.min.css'

import type { ComponentPublicInstance } from 'vue'

const props = defineProps({
  resource: String,
  code: null,
  inline: Boolean,
  language: {
    type: String,
    default: 'markup',
  },
  rounded: {
    type: Boolean,
    default: true,
  },
})

// Data Propeties
const highlighted = ref('')
const clicked = ref(false)
const root = ref<ComponentPublicInstance>()

// Computed Properties
const className = computed(() => `language-${props.language}`)
const icon = computed(() => clicked.value ? 'mdi-check' : 'mdi-clipboard-text-outline')

// Methods
const copy = async () => {
  const wait = (ms: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const el = root.value?.$el.querySelector('code')
  navigator.clipboard.writeText(props.code || el?.textContent || '')
  clicked.value = true
  await wait(2000)
  clicked.value = false
}

// Lifecycle methods
watchEffect(async () => {
  highlighted.value = props.code
  && props.language
  && Prism.highlight(await props.code, Prism.languages[props.language], props.language)
})
</script>

<template>
  <v-sheet
    ref="root"
    :rounded="rounded"
    class="app-markup overflow-hidden"
    dir="ltr"
  >
    <v-toolbar
      v-if="resource"
      class="px-1"
      height="44"
    >
      <v-sheet
        v-if="resource"
        class="text-body-2 px-3 pt-3 text-medium-emphasis"
        color="transparent"
        height="44"
        rounded="tl"
      >
        <v-icon icon="mdi-file-tree" />

        {{ resource }}
      </v-sheet>
    </v-toolbar>

    <v-tooltip location="start">
      <template #activator="{ props: activatorProps }">
        <v-fade-transition hide-on-leave>
          <v-btn
            :key="icon"
            :icon="icon"
            class="text-disabled me-3 mt-1 app-markup-btn"
            density="comfortable"
            style="position: absolute; right: 0; top: 0;"
            v-bind="activatorProps"
            variant="text"
            @click="copy"
          />
        </v-fade-transition>
      </template>

      <span>Copy Source</span>
    </v-tooltip>

    <div class="pa-4 pe-12">
      <slot>
        <pre v-if="inline" :class="className">
          <code :class="className" v-html="highlighted" />
        </pre>

        <code v-else :class="className" v-html="highlighted" />
      </slot>
    </div>
  </v-sheet>
</template>

<style lang="scss">
.v-sheet.app-markup {
  position: relative;

  &:not(:hover) {
    .app-markup-btn {
      opacity: 0 !important;
    }

    .v-btn--copy .v-icon {
      opacity: .4;
    }
  }

  code,
  pre {
    background: none;
    color: currentColor !important;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1rem;
    font-weight: 300;
    hyphens: none;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    tab-size: 4;
    text-align: left;
    text-shadow: none;
    white-space: pre-wrap;
    word-break: normal;
    word-spacing: normal;
    word-wrap: normal;

    &::after {
      bottom: .5rem;
      color: hsla(0, 0%, 19%, 0.5);
      font-family: inherit;
      font-size: 0.7rem;
      font-weight: 700;
      pointer-events: none;
      position: absolute;
      right: 1rem;
      text-transform: uppercase;
    }
  }

  pre.language-html::after {
    content: 'html';
  }

  pre.language-vue::after {
    content: 'vue';
  }

}
</style>
