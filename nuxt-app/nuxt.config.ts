// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'device-width, initial-scale=1',
      title: 'ルーレット',
      meta: [
        { name: 'description', content: '迷った時はルーレットで決めましょう。' }
      ],
      // link: [
      //   { rel: 'icon', href: '/favicon.ico' },
      // ],
    }
  },

  css: ['assets/scss/index.scss'],

  ssr: false,

  modules: [
    '@pinia/nuxt',
  ],

});
