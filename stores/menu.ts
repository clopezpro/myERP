import { defineStore } from 'pinia'
import type { IMenu } from '@/types'
import { useAlertErrorModal } from '@/composables/alert'

export const useMenuStore = defineStore('useMenuStore', () => {
  const menu = ref<[IMenu]>()
  const loading = ref<boolean>(false)

  const getMenus = (): [IMenu] | undefined => {
    if (!menu.value)
      fetchMenus()

    return menu.value
  }
  async function fetchMenus() {
    const showModalError = useAlertErrorModal()
    try {
      loading.value = true
      const result = await fetchMAHIRFULL({
        baseURL: '/config/menu/getMenus',
        method: 'GET',
      })
      loading.value = false
      menu.value = result.results
    }
    catch (e) {
      loading.value = false
      showModalError(e, 'Cerrar Session')
    }
  }
  return {
    menu,
    getMenus,
    fetchMenus,
  }
}, {
  persist: true,

})
