<script setup lang="ts">
const useMenu = useMenuStore()
const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.preference === 'dark' ? colorMode.preference = 'ligth' : colorMode.preference = 'dark'
}
</script>

<template>
  <div
    relative
    z-50 mb-5
    flex
    h-16
    items-center
    justify-between
    gap-2

    border-b
    border-gray-200
    dark:border-gray-700
  >
    <button type="button" class="flex h-10 w-10 items-center justify-center -ms-3">
      <div
        class="relative h-5 w-5" :class="{
          'scale-90 ms-3': useMenu.showMenu,
        }"
        @click="useMenu.openAndCloseMenu()"
      >
        <span
          :class="{
            '-rotate-45 rtl:rotate-45 max-w-[75%] top-1': useMenu.showMenu,
          }"
          class="bg-primary-500 absolute block h-0.5 w-full transition-all duration-300 top-0.5"
        />
        <span
          :class="{
            'opacity-0 translate-x-4': useMenu.showMenu,
          }"
          class="bg-primary-500 absolute top-1/2 block h-0.5 w-full max-w-[50%] transition-all duration-300"
        />
        <span
          :class="{
            ' rotate-45 rtl:-rotate-45 max-w-[75%] bottom-1': useMenu.showMenu,
          }"
          class="bg-primary-500 absolute block h-0.5 w-full transition-all duration-300 bottom-0"
        />
      </div>
    </button>
    <h1 class="font-heading text-2xl font-light leading-normal text-muted-800 hidden dark:text-white md:block">
      {{ $route.name }}
    </h1>
    <div class="ms-auto" />
    <div class="flex items-center gap-2 h-16">
      <!--  <label class="focusGlobal relative block h-9 w-9 shrink-0 overflow-hidden rounded-full transition-all duration-300 focus-visible:outline-2 dark:ring-offset-muted-900">
        <input
          type="checkbox"
          class="absolute start-0 top-0 z-[2] h-full w-full cursor-pointer opacity-0"
        >
        <span class="relative block h-9 w-9 rounded-full bg-white dark:bg-muted-800  border border-muted-300 dark:border-muted-700">
          <div i-carbon-moon text-yellow-500 bg-yellow-500 />
        </span>
      </label> -->
      <!--  border-muted-200
      hover:ring-muted-200
      dark:hover:ring-muted-700
      dark:border-muted-700
      dark:bg-muted-800
      dark:ring-offset-muted-900
      flex
      h-9 w-9
      items-center justify-center rounded-full border
      bg-white ring-1
      ring-transparent
      transition-all duration-300
      hover:ring-offset-4 -->
      <div
        border
        border-gray-700
        cursor-pointer
        hover:ring-gray-500
        ring-offset-gray-900
        ring-1
        ring-transparent
        hover:ring-offset-4
        transition-all duration-300
        dark:bg-muted-800
        rounded-full
        m-1
        opacity-90
        p-2
        relative
        inline-flex
        shrink-0
        items-center
        justify-center
        @click="toggleColorMode()"
      >
        <div i-carbon-moon text-yellow-500 bg-yellow-500 />
      </div>
      <div class="animate-pulse  bg-black  rounded-full m-1   opacity-90   p-2 relative inline-flex shrink-0 items-center justify-center">
        <div i-carbon-x />
      </div>

      <button>
        a
      </button>
    </div>
  </div>
</template>
