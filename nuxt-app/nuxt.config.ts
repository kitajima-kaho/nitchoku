// https://v3.nuxtjs.org/api/configuration/nuxt.config
// export default defineNuxtConfig({
  // import { defineNuxtConfig } from 'nuxt';

  export default defineNuxtConfig ({
    css:['assets/scss/index.scss'],
   
    ssr:false,

    modules: [ 
    '@pinia/nuxt',
    ],

})
