<template>
  <v-navigation-drawer
    v-bind="{ ...$attrs.values }"
    :permanent="$attrs.values.permanent && !$vuetify.display.mobile"
  >
    <template #prepend>
      <v-list-item
        lines="two"
        prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
        subtitle="Logged in"
        title="Jane Smith"
      />
    </template>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" />
      <v-list-item prepend-icon="mdi-account" title="My Account" value="account" />
      <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users" />
    </v-list>
  </v-navigation-drawer>
</template>
