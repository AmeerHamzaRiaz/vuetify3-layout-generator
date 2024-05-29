<template>
  <v-footer color="black" v-bind="{ ...$attrs.values }">
    {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
  </v-footer>
</template>
