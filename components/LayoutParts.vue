<script lang="ts" setup>
const props = defineProps({
  values: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'update:values', value: Record<string, boolean>): void
}>()

function handleChange(propertyName: string, propertyValue: boolean) {
  const updatedValues = { ...props.values, [propertyName]: propertyValue }
  emit('update:values', updatedValues)
}

const switches = [
  { key: 'appBarVisible', label: 'Do you want an app bar ?' },
  { key: 'startNavigationDrawerVisible', label: 'Do you want a left navigation drawer ?' },
  { key: 'endNavigationDrawerVisible', label: 'Do you want a right navigation drawer ?' },
  { key: 'footerVisible', label: 'Do you want a footer ?' },
]
</script>

<template>
  <div>
    <v-switch
      v-for="(switchItem, index) in switches"
      :key="index"
      :model-value="values[switchItem.key]"
      :label="switchItem.label"
      inset
      @update:model-value="val => handleChange(switchItem.key, val)"
    />
  </div>
</template>
