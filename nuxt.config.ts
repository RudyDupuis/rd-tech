// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  serverHandlers: [{ route: '/api/**', handler: './server/index' }],
  css: ['@/assets/style/index.scss'],
  components: [{ path: '~/components', pathPrefix: false }]
})
