<script setup>
import '@unocss/reset/tailwind.css'

useHead({
  link: [
    {
      rel: 'icon', type: 'image/webp', href: '/movies.webp',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <AlertModal />
    <NuxtLoadingIndicator color="#348feb" :height="6" />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
  background: rgb(17 24 39/1);
  color: white;
  color-scheme: dark;
}
</style>
