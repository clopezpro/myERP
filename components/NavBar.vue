<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useMenuStore } from '~/stores/menu'
import type { IMenu } from '@/types'

const sidebarElement = ref<HTMLElement | null>(null)

const Minimize = ref<Boolean>(false)
const minimizeBar = (value: Boolean) => Minimize.value = value
const useAuth = useAuthUserStore()
const useMenu = useMenuStore()
const $route = useRoute()
const menus = ref<[IMenu] | []>()

const menuOpen = ref<string | null>(null)

onClickOutside(sidebarElement, () => {
  menuOpen.value = null
})
async function fetchMenus() {
  menus.value = useMenu.getMenus()
}
const getMenus = computed(() => {
  return menus.value?.map((menu: IMenu) => {
    const subMenus = menu.subMenus?.map((subMenu) => {
      return {
        ...subMenu,
        active: subMenu.path === $route.path,
      }
    })
    const isOpen = menuOpen.value === menu.id
    return {
      ...menu,
      isOpen,
      subMenus,
      active: menu.path === $route.path,
    }
  })
})
function openMenu(menuId: string) {
  if (menuOpen.value === menuId)
    menuOpen.value = null
  else
    menuOpen.value = menuId
}
onMounted(() => {
  fetchMenus()
})
</script>

<template>
  <div flex>
    <div
      v-if="!Minimize"
      id="sidebar"
      ref="sidebarElement"
      scrollbar
      scrollbar-rounded
      scrollbar-w-6px
      scrollbar-radius-2
      scrollbar-track-black
      scrollbar-thumb-radius-4
      scrollbar-thumb-red-900
      class=" scrollbar-track-gray-800"
      dark:bg-gray-800
      dark:border-gray-700
      bg-green-50
      border-r-4
      shadow
      min-h-full
      transition-all
      duration-300
      linear
      overflow-y-auto
      flex
    >
      <div>
        <div flex justify-center mt-1 overflow-hidden>
          <UTooltip text="Ocultar">
            <button
              class="justify-center flex-1 h-full border border-green-800 rounded-md"
              @click="minimizeBar(true)"
              @touchmove="minimizeBar(true)"
            >
              <div class="relative">
                <div i-carbon-arrow-left h-7 w-7 />
              </div>
            </button>
          </UTooltip>
        </div>
        <div
          overflow-hidden
          mt-2
        >
          <div class="w-full text-center">
            <hr class="border-gray-500">
            <div class="text-center">
              Notify <br>
              EC
            </div>
            <hr class="border-gray-500">
            <div class=" pt-1">
              <div class=" flex justify-center">
                <UButton
                  title="CERRAR LA SESSION ACTUAL "
                  :padded="false"
                  variant="outline"
                  :loading="useAuth.loading"
                  class="justify-center  mr-1"
                  @click="useAuth.logout()"
                >
                  <div v-if="!useAuth.loading" class="relative text-red-600">
                    <div i-carbon-power h7 w-7 />
                  </div>
                </UButton>

                <button
                  title="Recargar Modulos "
                  class="justify-center p-1   border border-green-800 rounded-md"
                  @click="useMenu.fetchMenus()"
                >
                  <div class="relative text-yellow-500">
                    <div i-carbon-update-now />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          flex="~ row col" justify-top gap-4
          pt-2
          px-1
          items-center
        >
          <NuxtLink v-slot="{ isActive }" to="/" title="Home">
            <div class="mt-1" :class="{ 'text-green-500 shadow-lg rounded bg-gray-900 p-2': isActive }">
              <div flex flex-col items-center border rounded-md border-gray-700 p-1 px-2>
                <div
                  w-5
                  h-5
                  :class="isActive ? 'i-ph-house-fill text-primary' : 'i-ph-house'"
                />
                <div>Inicio</div>
              </div>
            </div>
          </NuxtLink>
          <ul>
            <li v-for="menu in getMenus" :key="menu.id">
              <div>
                <div class="mt-1" :class="{ 'text-green-500 shadow-lg rounded bg-gray-900 p-2': menu.active }">
                  <div
                    flex
                    flex-col
                    items-center
                    border
                    rounded-md
                    border-gray-700
                    p-1 px-2
                    text-xs
                    @click="openMenu(menu?.id || '')"
                  >
                    <i
                      w-5
                      h-5
                      :class="menu.icon"
                    />
                    <div>{{ menu.name }}</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Transition>
      <div
        v-show="menuOpen"
        w-30
        border-r
        border-gray-200
        dark:border-gray-700
        dashes
      >
        <div
          class="dropdown"
        >
          <ul class="dropdown-content">
            sss
            <!-- <div

                        v-for="submenu in menu.subMenus"
                        :key="submenu._id"
                      >
                        <li
                          class="py-1 m-1 hover_menu  text-xs border-b border-opacity-20 border-b-green-800"
                        >
                          {{ submenu.name.toUpperCase() }}
                        </li>
                      </div> -->
          </ul>
        </div>
      </div>
    </Transition>
  </div>

  <div

    v-if="Minimize"
    dark:bg-muted-900
    border-dashed
    class="group  "
    w-5
    noprint
    flex="~ row col" justify-evenly
    items-center
    px2
    border=" r base"
    border-primary
    shadow="md"
    shadow-primary
    @click="minimizeBar(false)"
    @touchmove="minimizeBar(false)"
  >
    <div
      class="transition-transform  group  group-hover:scale-200"
      transform hover:scale-110 group:bg-primary hover="   rounded  "
    >
      <div i-heroicons-chevron-double-right-solid h-8 w-8 text-primary shadow-primary shadow="md" />
    </div>
  </div>
</template>

<style>
  #sidebar{
    --scrollbar-track: gray-800;
    --scrollbar-thumb: gray;
}
.activeModule{

  color: green-500;
  background-color: gray-900;
  box-shadow: 0 0 0 2px green-500;
  padding: 0.5rem;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
