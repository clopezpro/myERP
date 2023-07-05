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
      <div class="relative h-5 w-5">
        <span class="bg-primary-500 absolute block h-0.5 w-full transition-all duration-300 top-0.5" />
        <span class="bg-primary-500 absolute top-1/2 block h-0.5 w-full max-w-[50%] transition-all duration-300" /><span class="bg-primary-500 absolute block h-0.5 w-full transition-all duration-300 bottom-0" />
      </div>
    </button>
    <h1 class="font-heading text-2xl font-light leading-normal text-muted-800 hidden dark:text-white md:block">
      {{ $route.name }}
    </h1>
    <div class="ms-auto">
      asasasas
    </div>
    <div class="flex items-center gap-2 h-16">
      <div class="animate-pulse  bg-black  rounded-full m-1   opacity-90   p-2 relative inline-flex shrink-0 items-center justify-center">
        <div i-carbon-x />
      </div>

      <button>
        a
      </button>
    </div>
  </div>
</template>
