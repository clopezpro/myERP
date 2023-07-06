<script setup lang="ts">
import { useMenuStore } from '~/stores/menu'
import type { IMenu } from '@/types'

const sidebarElement = ref<HTMLElement | null>(null)

const useAuth = useAuthUserStore()
const useMenu = useMenuStore()
const $route = useRoute()
const menus = toRef<[IMenu] | []>([])

const menuOpen = toRef(useMenu, 'menuOpen')

/* onClickOutside(sidebarElement, () => {
  menuOpen.value = null
}) */

const getMenus = computed(() => {
  return useMenu.getMenus
})
function activeMenu(id: string) {
  useMenu.activeMenu(id)
  if (!useMenu.showMenu)
    useMenu.showMenu = true
}
/* onMounted(() => {
  useMenu.fetchMenus()
}) */
</script>

<template>
  <div v-if="!useMenu.minimized" flex>
    <div

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
      bg-white
      border-r-4
      shadow
      min-h-full
      transition-all
      duration-300
      linear
      overflow-y-auto
      flex
      z-50
    >
      <div>
        <div flex justify-center mt-1 overflow-hidden>
          <UTooltip text="Ocultar">
            <button
              class="justify-center flex-1 h-full border dark:border-green-800 rounded-md"
              @click="useMenu.minimizeBar()"
              @touchmove="useMenu.minimizeBar()"
            >
              <div class="relative">
                <div i-carbon-arrow-left h-7 w-7 text-muted-600 dark:text-muted-200 />
              </div>
            </button>
          </UTooltip>
        </div>
        <div
          overflow-hidden
          mt-2
        >
          <div class="w-full text-center">
            <hr class="dark:border-gray-500">
            <div class="text-center text-4xl text-primary ">
              מ
            </div>
            <hr class="dark:border-gray-500">
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
                  @click="useMenu.fetchMenus(true)"
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
          <!-- <NuxtLink v-slot="{ isActive }" to="/" title="Home">
            <div class="mt-1">
              <div flex flex-col items-center border rounded-md border-muted-200 dark:border-muted-700 p-1 px-2>
                <div
                  w-5
                  h-5
                  :class="isActive ? 'i-ph-house-fill text-primary' : 'i-ph-house'"
                />
                <div>Inicio</div>
              </div>
            </div>
          </NuxtLink> -->
          <ul>
            <li v-for="(menu, index) in getMenus" :key="index">
              <div>
                <div
                  class="mt-1"
                  :class="{
                    ' rounded-2xl transition-colors duration-300 bg-primary-100 text-primary-500 dark:bg-primary-500/10 p-2  ': menu.selected,
                    'dark:bg-muted-200   border-dashed': menu.selected && useMenu.showMenu,
                  }
                  "
                >
                  <div
                    flex
                    flex-col
                    items-center
                    border
                    rounded-md
                    border-muted-200
                    dark:border-muted-700
                    p-1 px-2
                    text-xs
                    @click="activeMenu(menu.id || '')"
                  >
                    <div

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
    <Transition name="slide-fade">
      <div
        v-show="useMenu.showMenu"
        class="w-[200px]"
        border
        border-muted-200
        dark:border-muted-700
        dark:bg-gray-900
        pointer-events-auto
        relative
        z-10
        h-full

        bg-white
      >
        <div
          class="flex h-screen flex-col"
        >
          <ul>
            <div class="flex h-16 w-full items-center px-6">
              <div class="font-heading text-muted-700 text-lg font-light capitalize dark:text-white">
                {{ menuOpen?.name }}
              </div>
            </div>
            <div slimscroll relative h-full w-full overflow-y-auto px-2>
              <div border border-muted-200 dark:border-green-700 rounded-md py-2 dark:bg-muted-900>
                <NuxtLink
                  v-for="submenu in menuOpen?.subMenus" :key="submenu._id"
                  v-slot="{ isActive }" :to="submenu.path" title="Home"
                >
                  <li
                    class=""
                    hover="dark:bg-muted-700 "
                    :class="{
                      ' dark:bg-muted-800 text-primary  ml-2': isActive,
                    }"
                    dark:bg-gray-800
                    bg-muted-100
                    text-muted-400
                    hover:text-primary-500
                    focus:text-primary-500
                    rounded-md
                    text-primary
                    flex items-center
                    m-1
                    divide-x
                    divide-x-green-700
                  >
                    <div
                      pl-2
                      min-h-8
                      class=" flex w-full items-center "
                    >
                      <span
                        class="font-sans text-sm"
                      >
                        {{ submenu.name.toUpperCase() }}
                      </span>
                    </div>
                  </li>
                </NuxtLink>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </Transition>
  </div>

  <div

    v-if="useMenu.minimized"
    dark:bg-muted-900
    border-dashed
    class="group  "
    lg:w-5
    lg:px2
    w-2
    noprint
    flex="~ row col" justify-evenly
    items-center
    border=" r base"
    border-primary
    shadow="md"
    shadow-primary
    @click="useMenu.minimizeBar()"
    @touchmove="useMenu.minimizeBar()"
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
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from{
  transform: translateX(-20px);
  opacity: 0;
}
.slide-fade-leave-to{
  transform: translateX(-200px);
  border: 0px;
  opacity: 100;
}
</style>
