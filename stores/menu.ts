import { defineStore } from 'pinia'
import type { IMenu } from '@/types'
import { useAlertErrorModal } from '@/composables/alert'

export const useMenuStore = defineStore('useMenuStore', () => {
  interface IMenuDashboard extends IMenu {
    selected: boolean
  }

  const menu = ref<[IMenuDashboard ] | []>([])
  const menuOpen = ref<Record<string, any> | null>(null)
  const showMenu = ref<boolean>(false)
  const minimized = ref<boolean>(false)
  const loading = ref<boolean>(false)
  const $route = useRouter()
  /* const getMenus = (): [IMenu] | undefined => {
    return menu.value
  } */
  const activeMenu = (id: String) => {
    const index = menu.value.findIndex((item: IMenuDashboard) => item.id === id)
    if (index !== -1)
      menu.value[index].selected = true
  }
  const minimizeBar = () => {
    minimized.value = !minimized.value
    if (minimized.value)
      showMenu.value = false
  }
  const openAndCloseMenu = () => {
    showMenu.value = !showMenu.value
    if (showMenu.value && minimized.value)
      minimized.value = false
  }
  onBeforeMount(async () => {
    await fetchMenus()
  })
  async function fetchMenus(reload = false) {
    if (!reload && menu.value)
      return

    const showModalError = useAlertErrorModal()
    try {
      loading.value = true
      const result = await fetchMAHIRFULL({
        baseURL: '/config/menu/getMenus',
        method: 'GET',
      })
      loading.value = false
      menu.value = result.results.map((item: IMenu) => {
        return {
          ...item,
          selected: false,
        }
      })
    }
    catch (e) {
      loading.value = false
      showModalError(e, 'Cerrar Session')
    }
  }
  return {
    menuOpen,
    minimized,
    showMenu,
    getMenus: menu,
    minimizeBar,
    activeMenu,
    openAndCloseMenu,
    fetchMenus,
  }
}, {
  persist: true,

})
