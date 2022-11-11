// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

    css:['assets/scss/index.scss'],
   
    ssr:false,

    modules: [ 
    '@pinia/nuxt'
  ],

  app: {
    head: {
      title: 'nanitabe',
      htmlAttrs: {
        lang: 'ja'
      },
    
      // link: [
      //   { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // ]
    },

  }
  



})
