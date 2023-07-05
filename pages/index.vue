<script setup lang="ts">
const showModal = useAlertModal()
const useAuth = useAuthUserStore()
definePageMeta({
  title: 'Home',
  description: 'This is the home page',
  middleware: ['authenticated'],
})

function showAlert() {
  return showModal({
    title: 'Hello',
    message: 'This is a alert modal',

  })
}
</script>

<template>
  <div>
    <h1>Hola como estas {{ useAuth.getUser.name }}??</h1>
    <button @click="showAlert">
      click me!
    </button>
  </div>
</template>
