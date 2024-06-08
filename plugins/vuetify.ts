import '@mdi/font/css/materialdesignicons.css'
import { md3 } from 'vuetify/blueprints'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as labsComponents from 'vuetify/labs/components'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    blueprint: md3,
    components: {
      ...labsComponents,
    },
    defaults: {
      VNumberInput: {
        VBtn: { variant: 'text' },
      },
      VStepperActions: {
        VBtn: { variant: 'flat' },
      },
    },
  })
  app.vueApp.use(vuetify)
})
