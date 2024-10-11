// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  serverHandlers: [{ route: '/api/**', handler: './server/api/index' }],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  css: ['@/assets/style/main.scss'],
  components: [{ path: '~/components', pathPrefix: false }],
  modules: ['nuxt-gtag'],
  gtag: {
    initMode: 'manual',
    id: 'G-VSNBTJ5G4B'
  },
  app: {
    head: {
      meta: [
        {
          property: 'og:title',
          content: 'Rudy Dupuis - Développeur Web et Web mobile'
        },
        {
          property: 'og:description',
          content:
            "Je suis Rudy Dupuis, un développeur Web et Web mobile passionné par l'UX. J'ai fusionné ma passion pour le bricolage et le numérique dans la conception de ce site. Découvrez mon parcours et mes compétences. Contactez-moi pour discuter de votre projet numérique."
        },
        {
          property: 'og:image',
          content: 'https://rd-tech.fr/open-graph.png'
        },
        {
          property: 'og:url',
          content: 'https://rd-tech.fr'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:site_name',
          content: 'RD-Tech'
        }
      ]
    }
  }
})
