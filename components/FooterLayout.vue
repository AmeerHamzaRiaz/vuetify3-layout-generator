import { NuxtLink } from '#build/compone';

<template>
  <v-footer color="deep-purple-lighten-5" v-bind="{ ...$attrs.values }" class="d-flex align-center justify-center">
    Made with 💜 by <NuxtLink class="ms-1" to="https://github.com/AmeerHamzaRiaz">
      Ameer Hamza
    </NuxtLink>
  </v-footer>
</template>
