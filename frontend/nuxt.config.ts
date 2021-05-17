import { config as configDotenv } from 'dotenv'
import { parseEnv } from './helpers/env'
import type { NuxtConfig } from '@nuxt/types'

configDotenv({ path: '../.env' })

const { host, port, apiEndpoint } = parseEnv()
const lang = 'ru'

export default {
  server: { host, port },

  // $config
  publicRuntimeConfig: {
    apiEndpoint
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://github.com/bootstrap-vue/bootstrap-vue/issues/5627
    babel: { compact: true }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/style'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://typed-vuex.roe.dev
    'nuxt-typed-vuex'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa'
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      lang,
      nativeUI: true
    },
    manifest: {
      lang
    }
  }
} as NuxtConfig
