import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@hebilicious/authjs-nuxt"
  ],
  alias: {
    cookie: "cookie"
  },
  authJs: {
    guestRedirectTo: "/redirected"
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET
    },
    github: {
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_PUBLIC_NEXTAUTH_URL,
        verifyClientOnEveryRequest: true
      }
    }
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  i18n: {
    compilation: {
      strictMessage: false,
    },
    defaultLocale: "en",
    strategy: "no_prefix",
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en-US.ts",
        dir: "ltr",
      },
      {
        code: "ar",
        iso: "ar-AE",
        file: "ar-AE.ts",
        dir: "rtl",
      },
    ],
    lazy: true,
    langDir: "locales",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: true,
    },
    vueI18n: "./i18n.config.ts",
  },
});
