<script setup>
import { Sortable } from 'sortablejs-vue3'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  items: {
    required: false,
  },
})
const emit = defineEmits(['update:modelValue'])
const showModalError = useAlertErrorModal()
const { modelValue, items } = toRefs(props)
const loading = ref(false)
const itemKey = ref()
const itemsLocal = ref(items.value)
function ordening(e) {
  const item = itemsLocal.value.splice(e.oldIndex, 1)[0]
  itemsLocal.value.splice(e.newIndex, 0, item)
  /* console.log(items.value[e.oldIndex].order, e.newIndex)
  itemsLocal.value[e.oldIndex].order = e.newIndex
  itemsLocal.value[e.newIndex].order = e.oldIndex */
  /* console.log(e, e.newIndex) */
}
async function updateMenu() {
  const newOrder = itemsLocal.value.map((item) => {
    return { id: item.id, order: itemsLocal.value.indexOf(item) }
  })
  loading.value = true
  try {
    const data = await fetchMAHIRFULL({
      baseURL: '/config/menu/newOrder',
      method: 'POST',
      body: { newOrder },
    })
    loading.value = false
    items.value = itemsLocal.value
  }
  catch (e) {
    showModalError(e)
  }
}
function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <div>
    <UModal v-model="modelValue">
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          Ordenar Menus
        </template>
        <pre>{{ items }}</pre>
        <Sortable
          :list="items"
          item-key="id"
          tag="div"
          @sort="ordening"
        >
          <template #item="{ element }">
            <div :key="element.id" class="draggable">
              {{ element.name }}
            </div>
          </template>
        </Sortable>

        <template #footer>
          <div flex justify-end gap-2>
            <UButton h-7 label="Cancelar" color="red" variant="solid" icon="i-carbon-close" @click="close" />
            <UButton h-7 :disable="loading" :loading="loading" label="Actualizar" color="yellow" variant="solid" icon="i-heroicons-arrow-path-rounded-square" @click="updateMenu" />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
