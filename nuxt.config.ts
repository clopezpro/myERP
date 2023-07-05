const isDev = process.env.NODE_ENV === 'development'

// const apiBaseUrl = 'http://localhost:3001'
const apiBaseUrl: String = process.env.PUBLIC_API_BASE || 'http://localhost:3001'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    '@nuxthq/ui',
    '@unocss/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    '@pinia-plugin-persistedstate/nuxt',
  ],
  imports: {
    dirs: ['stores'],
  },
  experimental: {
    inlineSSRStyles: false,
    viewTransition: true,
  },
  routeRules: {
    '/**': isDev ? {} : { cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true } },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl,
      NAMESYSTEM: process.env.NAMESYSTEM,
    },
  },
  devtools: {
    enabled: true,
  },
  image: {
    provider: 'proxy',
    providers: {
      proxy: {
        provider: 'ipx',
        options: {
          baseURL: `${apiBaseUrl}/ipx`,
        },
      },
    },
  },
  nitro: {
    routeRules: {
      '/**': { isr: false },
    },
  },
})
