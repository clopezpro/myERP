<script setup>
const props = defineProps({
  error: Object,
})

const message = computed(() => String(props.error?.message || ''))
const is404 = computed(() => props.error?.statusCode === 404 || message.value?.includes('404'))
const isDev = process.dev

function handleError() {
  return clearError({ redirect: '/' })
}
</script>

<template>
  <NuxtLayout>
    <div flex="~ col" h-screen text-center items-center justify-center gap4>
      <div text-3xl>
        {{ is404 ? 'Esta pagina no pudo ser encontrada' : 'An error occurred' }}
      </div>
      <div text-xl op50>
        Parece que siguió un enlace roto o ingresó una URL que no existe en este sitio
      </div>
      <pre v-if="isDev" class="min-w-1/2">{{ error }}</pre>
      <button n-link border px4 py1 rounded @click="handleError">
        Regresar
      </button>
    </div>
  </NuxtLayout>
</template>
