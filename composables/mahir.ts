import { LRUCache } from 'lru-cache'
import { hash as ohash } from 'ohash'
import type { Media, ModuleType, PageResult } from '../types'
import { useAuthUserStore } from '~/stores/auth'

const cache = new LRUCache<string, any>({
  max: 500,
  ttl: 2000 * 60 * 60, // 2 hour
})
type typesParams = 'post' | 'get' | 'put' | 'delete' | 'patch' | 'head' | 'options' | 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

interface paramsServer {
  params?: Record<string, string | number | undefined>
  body?: Record<string, any >
  baseURL: string
  method?: typesParams
  ignoreResponseError?: boolean
}
export const $api = $fetch.create({
  headers: {
    'Content-Type': 'application/json',
  },
  onRequest({ request, options }) {
    options.headers = {
      Authorization: `Bearer ${useAuthUserStore().tokens.access.token}`,
    }
  },
  onRequestError({ request, options, error }) {
    /* console.log('[fetch request error]', request, error) */
  },
  async onResponseError({ request, response, options }) {
    /*  console.log(options) */
    /* if (response.status === 401)
      await useAuthUserStore().refreshToken() */
    // $api(options.baseURL as string, { ...options, baseURL: `${useRuntimeConfig().public.apiBaseUrl}/api` })
  },
})
function _fetchServer(params: paramsServer, raw: boolean): Promise<any> {
  if (raw)
    return $api.raw(params.baseURL, { ...params, baseURL: `${useRuntimeConfig().public.apiBaseUrl}/api` })

  return $api(params.baseURL, { ...params, baseURL: `${useRuntimeConfig().public.apiBaseUrl}/api` })
}
/*
function _fetchAPI(params: paramsServer) {
  return useFetch('/api/auth/login', {
    onRequest({ request, options }) {
      options?.headers?.authorization = '...'
    },
    onRequestError({ request, options, error }) {
      console.log('Handle the request errors', error)
    },
    onResponseError({ request, response, options }) {
      console.log('Handle the request errors', options)
    },
  })
} */
function _fetchMAHIR(url: string, params: Record<string, string | number | undefined> = {}) {
  return $fetch(url, {
    baseURL: `${useRuntimeConfig().public.apiBaseUrl}/api`,
    params,
  })
}

export function fetchMAHIRCache(url: string, params: Record<string, string | number | undefined> = {}): Promise<any> {
  const hash = ohash([url, params])
  if (!cache.has(hash)) {
    cache.set(
      hash,
      _fetchMAHIR(url, params)
        .catch((e) => {
          cache.delete(hash)
          throw e
        }),
    )
  }
  return cache.get(hash)!
}
export function fetchMAHIR(url: string, params: Record<string, string | number | undefined> = {}): Promise<any> {
  return _fetchMAHIR(url, params)
    .catch((e) => {
      throw e
    })
}
export function fetchMAHIRFULL(params: paramsServer, raw = false): Promise<any> {
  const authStore = useAuthUserStore()

  return _fetchServer(params, raw).catch(async (e) => {
    console.log(e)
    if (e.response?.status === 401) {
      await authStore.refreshToken()
      return _fetchServer(params, raw)
    }
    if (e.response?._data) {
      e.code = e.response._data.code
      e.message = e.response._data.message
    }

    if (!params.ignoreResponseError)
      throw e
  })
}
export function listModules(type: ModuleType, query: string): Promise<PageResult<Media>> {
  return fetchMAHIR(`${type}/${query}`)
}
