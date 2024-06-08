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
      <v-row v-if="property.component === Component.SWITCH" class="d-flex align-center justify-space-between">
        <v-col cols="10">
          <v-switch
            inset
            color="success"
            :label="property.title"
            :model-value="!!values[property.name]"
            hide-details
            @update:model-value="val => handleChange(property.name, property.activeValue && val ? property.activeValue : val)"
          />
        </v-col>
        <v-col cols="2">
          <ToolTip :description="property.description" />
        </v-col>
      </v-row>

      <v-row v-if="property.component === Component.CHECKBOX" align="center">
        <v-col cols="10">
          <v-checkbox
            :label="property.title"
            :value="values[property.name]"
            hide-details
            @update:model-value="val => handleChange(property.name, property.activeValue && val ? property.activeValue : val)"
          />
        </v-col>
        <v-col cols="2">
          <ToolTip :description="property.description" />
        </v-col>
      </v-row>

      <v-row v-if="property.component === Component.SELECT" align="center">
        <v-col cols="10">
          <v-select
            variant="outlined"
            :label="property.title"
            :items="property.items"
            :model-value="values[property.name]"
            :clearable="property.clearable"
            hide-details
            @update:model-value="val => handleChange(property.name, val)"
          />
        </v-col>
        <v-col cols="2">
          <ToolTip :description="property.description" />
        </v-col>
      </v-row>

      <v-row v-if="property.component === Component.TEXT" align="center">
        <v-col cols="10">
          <v-text-field
            variant="outlined"

            :label="property.title"
            :items="property.items"
            :value="values[property.name]"
            hide-details
            :clearable="property.clearable"
            @update:model-value="val => handleChange(property.name, val)"
          />
        </v-col>
        <v-col cols="2">
          <ToolTip :description="property.description" />
        </v-col>
      </v-row>

      <v-row v-if="property.component === Component.NUMBER_SELECTOR" align="center">
        <v-col cols="10">
          <v-number-input
            control-variant="stacked"
            variant="outlined"
            :max="property.maxValue"
            :min="property.minValue"
            :label="property.title"
            :model-value="values[property.name]"
            hide-details
            @update:model-value="val => handleChange(property.name, val)"
          />
        </v-col>
        <v-col cols="2">
          <ToolTip :description="property.description" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
