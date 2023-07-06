<script setup lang="ts">
const myButtons = [
  {
    icon: 'i-uil-notebooks',
    label: 'Notebooks',
  },
  {
    icon: 'i-uil-bookmarks',
    label: 'Bookmarks',
  },
]
</script>

<template>
  <div>
    <button
      v-for="(item, index) in myButtons"
      :key="index"
      class="px-3 py-2 text-light-300 bg-red-500 text-sm"
    >
      <div :class="item.icon" />
      {{ item.label }}
    </button>
  </div>
</template>
