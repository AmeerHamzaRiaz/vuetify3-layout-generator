import "@mdi/font/css/materialdesignicons.css";
import { md3 } from "vuetify/blueprints";
import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    blueprint: md3,
  });
  app.vueApp.use(vuetify);
});
