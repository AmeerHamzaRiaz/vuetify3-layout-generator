<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  values: {
    type: Object as PropType<Record<string, boolean>>,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'update:values', value: Record<string, boolean>): void
}>()

const layouts: Ref<string[]> = ref([])

function onUpdateModelValue(val: string[]): void {
  const updateVisibleValues = { ...props.values }

  for (const layout in updateVisibleValues) {
    updateVisibleValues[layout] = val.includes(layout)
  }

  emit('update:values', updateVisibleValues)
}

// TODO: Need to fix this, vItemGroup value was not working
onMounted(() => layouts.value = [...Object.keys(props.values).filter(key => props.values[key])])

const switches = [
  {
    key: 'appBarVisible',
    label: 'Application Bar',
    src: 'app-bar',
  },
  {
    key: 'startNaviDrawerVisible',
    label: 'Left Navigation Drawer',
    src: 'start-nav-drawer',
  },
  {
    key: 'endNavDrawerVisible',
    label: 'Right Navigation Drawer',
    src: 'end-nav-drawer',
  },
  {
    key: 'footerVisible',
    label: 'Footer',
    src: 'footer',
  },
]
</script>

<template>
  <div>
    <v-item-group
      :key="Date.now"
      v-model="layouts"
      multiple
      @update:model-value="onUpdateModelValue"
    >
      <v-row>
        <v-col
          v-for="item in switches"
          :key="item.key"
          cols="12"
          md="6"
        >
          <v-item v-slot="{ isSelected, toggle }" :value="item.key">
            <v-card
              class="d-flex align-center ma-2"
              height="200"
              dark
              :image="`/images/${item.src}.png`"
              :style="!isSelected ? 'filter: grayscale(1);' : 'filter: hue-rotate(45deg);'"
              v-bind="props"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <v-btn
                  class="ms-auto mb-auto mt-4 me-4"
                  variant="text"
                  :icon="isSelected ? 'mdi-checkbox-marked-circle' : 'mdi-checkbox-blank-circle-outline'"
                  :color="isSelected ? 'success' : 'gray'"
                />
              </v-scroll-y-transition>
            </v-card>
            <p class="text-caption mt-1">
              {{ item.label }}
            </p>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </div>
</template>
