<template>
  <v-navigation-drawer v-bind="{ ...$attrs.values }" :permanent="$attrs.values.permanent && !$vuetify.display.mobile">
    <v-list-item title="My Application" subtitle="Vuetify" />
    <v-divider />
    <v-list-item link title="List Item 1" />
    <v-list-item link title="List Item 2" />
    <v-list-item link title="List Item 3" />
  </v-navigation-drawer>
</template>
