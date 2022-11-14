// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig ({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=500, initial-scale=1', 
      title: 'なにたべルーレット',
      meta: [
        { name: 'description', content: '朝ごはん、昼ごはん、夜ごはん、なに食べようか迷った時はルーレットで決めましょう。' }
      ],
    }
  },

  css:['assets/scss/index.scss'],
  
  ssr:false,

  modules: [ 
  '@pinia/nuxt',
  ],

});
