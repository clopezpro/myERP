<script setup lang="ts">
const myButtons = [
  {
    icon: 'i-carbon-settings-adjust',
    label: 'Notebooks',
  },
  {
    icon: 'i-carbon-settings-check',
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
