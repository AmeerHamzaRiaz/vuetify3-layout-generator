<template>
  <v-app-bar color="primary" v-bind="{ ...$attrs.values }">
    <v-app-bar-nav-icon variant="text" />

    <v-toolbar-title>
      Vuetify Layout Designer
    </v-toolbar-title>

    <v-spacer />

    <template v-if="$vuetify.display.mdAndUp">
      <v-btn icon="mdi-magnify" variant="text" />

      <v-btn icon="mdi-filter" variant="text" />
    </template>

    <v-btn icon="mdi-dots-vertical" variant="text" />
  </v-app-bar>
</template>
