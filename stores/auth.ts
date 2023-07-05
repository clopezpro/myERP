import { defineStore } from 'pinia'

interface UserT {
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  role: string
}

interface TokensT {
  token: string | null
  expires: Date | null
}

interface IUser {
  user: UserT
  tokens: {
    access: TokensT
    refresh: TokensT
  }
  loading: boolean

}
const useShowModal = defineStore('useShowModal', () => {
  const showModalError = useAlertErrorModal()
  return {
    showModalError,
  }
})

export const useAuthUserStore = defineStore('useAuthUserStore', {
  state: () => (
    {
      user: {
        id: '',
        email: '',
        isEmailVerified: false,
        name: '',
        role: '',
      },
      tokens: {
        access: {
          token: null,
          expires: null,
        },
        refresh: {
          token: null,
          expires: null,
        },
      },
      loading: false,

    } as IUser
  ),
  getters: {
    getUser(): UserT {
      return this.user
    },
    isAuth(): boolean {
      return this.tokens.access.token !== null
    },
    getLoading(): boolean {
      return this.loading
    },
  },
  persist: {
    key: 'auth',
    storage: persistedState.cookiesWithOptions({
      httpOnly: false, // It works when i set it to false or remove this property
      secure: false,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    }),
    paths: ['user', 'tokens'],
    /* afterRestore: (ctx) => {
      console.log(`just restored '${ctx.store.$state}'`, ctx.store.$state)
    },
    beforeRestore: (ctx) => {
      console.log(`about to restore '${ctx.store.$state}'`)
    }, */
    /* serializer: {
      deserialize: parse,
      serialize: stringify,
    }, */

  },
  actions: {
    async setUser(data: IUser) {
      this.tokens.access.token = data.tokens.access.token
      this.tokens.access.expires = data.tokens.access.expires
      this.tokens.refresh.token = data.tokens.refresh.token
      this.tokens.refresh.expires = data.tokens.refresh.expires
      this.user = data.user
      /* useCookie('auth',
        {
          httpOnly: true,
        },
      ).value = data.tokens.refresh.token */
      const route = useRoute()
      if (route.params.nextUrl)
        return await navigateTo(route.params.nextUrl as string)
      else
      if (route.params.nextUrl)
        return await navigateTo(route.params.nextUrl)
      else
        return await navigateTo('/')
    },
    cleanData() {
      this.tokens.access.token = null
      this.tokens.access.expires = null
      this.tokens.refresh.token = null
      this.tokens.refresh.expires = null
      this.user = {
        id: '',
        email: '',
        isEmailVerified: false,
        name: '',
        role: '',
      }
      const token = useCookie('auth')
      token.value = null
    },
    async logout(redirect = true) {
      const { showModalError } = useShowModal()

      if (!this.tokens.refresh.token) {
        this.cleanData()
        if (redirect)
          return await navigateTo('/login')
      }
      try {
        this.loading = true
        const result = await fetchMAHIRFULL({
          baseURL: '/auth/logout',
          method: 'POST',
          ignoreResponseError: true,
          body: {
            refreshToken: this.tokens.refresh.token?.toString(),
          },
        }, true)
        if (result.status === 204 || result.status === 404) {
          this.loading = false
          this.cleanData()
          if (redirect)
            return await navigateTo('/login')
        }
        throw new Error(result._data.message)
      }
      catch (e) {
        this.loading = false
        showModalError(e, 'Cerrar Session')
      }
    },
    async refreshToken() {
      const { showModalError } = useShowModal()
      try {
        /* if (!this.tokens.refresh.token) {
          this.cleanData()
          return await navigateTo('/login')
        } */
        this.loading = true
        const result = await fetchMAHIRFULL({
          baseURL: '/auth/refresh-tokens',
          method: 'POST',
          ignoreResponseError: true,
          body: {
            refreshToken: this.tokens.refresh.token?.toString(),
          },
        }, true)
        this.loading = false

        if (result.status === 200) {
          this.tokens.access.token = result._data.tokens.access.token
          this.tokens.access.expires = result._data.tokens.access.expires
          this.tokens.refresh.token = result._data.tokens.refresh.token
          this.tokens.refresh.expires = result._data.tokens.refresh.expires
          this.user = result._data.user
        }
        else {
          this.cleanData()
          return await navigateTo('/login')
        }
      }
      catch (e) {
        this.loading = false
        showModalError(e, 'Cerrar Session')
      }
    },
  },
})
