// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  devtools: { enabled: true },
  css: [
    '@/assets/app.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  modules: [
    '@pinia/nuxt',
  ],
  build:{
    // vue-toastification - old commonjs module 
    transpile: ['vue-toastification'],
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
    },
  },

})

