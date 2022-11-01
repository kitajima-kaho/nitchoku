// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

    css:['assets/scss/index.scss'],
   
    ssr:false,

    modules: [ 
    '@pinia/nuxt'
  ],

    alias: {
      pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
    } ,
    


})
