<script setup lang="ts">
defineProps({
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <v-tooltip :text="description" location="top" max-width="220">
    <template #activator="{ props }">
      <v-btn variant="text" color="primary" icon="mdi-information-outline" v-bind="props" size="sm" />
    </template>
  </v-tooltip>
</template>
