<script lang="ts" setup>
import { Component } from '~/enums'

const props = defineProps({
  config: {
    required: true,
  },
  values: {
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'update:values', value: any): void
}>()

function handleChange(propertyName: string, propertyValue: string | boolean | number) {
  console.log(propertyValue)
  const updatedValues = { ...props.values, [propertyName]: propertyValue }
  emit('update:values', updatedValues)
}
</script>

<template>
  <v-row v-for="group in config" :key="group.groupName">
    <v-col cols="12">
      <div
        class="text-h6"
      >
        {{ group.groupName }}
      </div>
    </v-col>

    <v-col
      v-for="(property, key) in group.props"
      :key="key"
      cols="12"
      md="6"
    >
      <!-- {{ property }} -->

      <v-switch
        v-if="property.component === Component.SWITCH"
        inset
        :hint="property.description"
        persistent-hint :label="property.title"
        :model-value="!!values[property.name]"
        @update:model-value="val => handleChange(property.name, property.activeValue && val ? property.activeValue : val)"
      />

      <v-checkbox
        v-if="property.component === Component.CHECKBOX"
        :label="property.title"
        :value="values[property.name]"
        :hint="property.description"
        persistent-hint
        @update:model-value="val => handleChange(property.name, property.activeValue && val ? property.activeValue : val)"
      />

      <v-select
        v-else-if="property.component === Component.SELECT"
        :label="property.title"
        :items="property.items"
        :value="values[property.name]"
        :clearable="property.clearable"
        :hint="property.description"
        persistent-hint
        @update:model-value="val => handleChange(property.name, val)"
      />

      <v-text-field
        v-else-if="property.component === Component.TEXT"
        :label="property.title"
        :items="property.items"
        :value="values[property.name]"
        :hint="property.description"
        persistent-hint
        :clearable="property.clearable"
        @update:model-value="val => handleChange(property.name, val)"
      />

      <v-number-input
        v-else-if="property.component === Component.NUMBER_SELECTOR"
        :max="property.maxValue"
        :min="property.minValue"
        :label="property.title"
        :model-value="values[property.name]"
        :hint="property.description"
        persistent-hint
        @update:model-value="val => handleChange(property.name, val)"
      />
    </v-col>
  </v-row>
</template>
