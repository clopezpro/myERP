<script setup lang="ts">
import modalOrdening from './components/menu.ordering.vue'

const showModalError = useAlertErrorModal()
const { getRoutes } = useRouter()
const routes = computed(() => getRoutes().map(route => route.path).sort((a, b) => a.length > b.length ? 1 : -1))
const menusData = ref({
  results: [] as Array<typeof formMenu>,
})
const orderTd = ref < [typeof formMenu] | [] > ([])
const columns = [{
  key: 'id',
  label: 'ID',
  sortable: true,
},
{
  key: 'name',
  label: 'Name',
}, {
  key: 'path',
  label: 'path',
},
{
  key: 'acc',
  label: 'ACC',
}]
const formSubMenu = reactive({
  _id: undefined as undefined | string,
  name: '',
  path: '/',
  icon: '',
  order: undefined,
  active: true,
})
const formMenu = reactive({
  id: undefined as undefined | string,
  name: '',
  path: '/',
  icon: '',
  order: undefined,
  active: true,
  subMenus: [] as Array<typeof formSubMenu>,
})
const modals = reactive({
  ordeningMenu: false,
})
const loading = ref<boolean> (false)
const loadingTable = ref<boolean> (false)

async function fetchMenus() {
  loadingTable.value = true
  const data = await fetchMAHIRFULL({
    baseURL: '/config/menu/getMenus',
    method: 'GET',
  })
  loadingTable.value = false
  menusData.value.results = data.results
}
onMounted(() => {
  fetchMenus()
})

function setEditSubMenu(item: typeof formSubMenu) {
  item._id = item._id ? item._id : Math.random().toString()
  Object.assign(formSubMenu, item)
}
function setEditMenu(item: typeof formMenu) {
  item.id = item.id ? item.id : Math.random().toString()
  Object.assign(formMenu, item)
}
function cleanSubMenu() {
  Object.assign(formSubMenu, {
    _id: null,
    name: '',
    path: '/',
    icon: '',
    order: undefined,
    active: true,
  })
}
async function addAndUpdateSubMenu() {
  if (formMenu.id) {
    if (formSubMenu._id) {
      loading.value = true
      try {
        await fetchMAHIRFULL({
          baseURL: `/config/subMenu/${formSubMenu._id}`,
          method: 'PATCH',
          body: { ...formSubMenu, _id: undefined },
        })
        loading.value = false
        formMenu.subMenus[formMenu.subMenus.findIndex(item => item._id === formSubMenu._id)] = { ...formSubMenu }
        cleanSubMenu()
      }
      catch (e) {
        showModalError(e)
      }
    }
    else {
      loading.value = true
      try {
        const data = await fetchMAHIRFULL({
          baseURL: `/config/subMenu/create/${formMenu.id}`,
          method: 'POST',
          body: { ...formSubMenu, _id: undefined },
        })
        loading.value = false
        formMenu.subMenus.push({ ...formSubMenu })
        cleanSubMenu()
      }
      catch (e) {
        showModalError(e)
      }
    }
  }
  else {
    formMenu.subMenus.push({ ...formSubMenu })
    cleanSubMenu()
  }
}
async function updateMenu() {
  if (formMenu.id) {
    loadingTable.value = true
    try {
      const data = await fetchMAHIRFULL({
        baseURL: `/config/menu/${formMenu.id}`,
        method: 'PATCH',
        body: { ...formMenu, id: undefined },
      })
      loadingTable.value = false
      const index = menusData.value.results.findIndex(item => item.id === formMenu.id)
      menusData.value.results[index] = { ...formMenu }
      cleanForm()
    }
    catch (e) {
      showModalError(e)
    }
  }
}
function cleanForm() {
  Object.assign(formMenu, {
    id: undefined,
    name: '',
    path: '/',
    icon: '',
    order: undefined,
    active: true,
    subMenus: [] as Array<typeof formSubMenu>,
  })
}
async function createMenu() {
  try {
    loading.value = true
    const result = await fetchMAHIRFULL({
      baseURL: '/config/menu/create',
      method: 'POST',
      body: formMenu,
    })
    loading.value = false
    menusData.value.results.push(result)
    cleanForm()
  }
  catch (e) {
    loading.value = false
    showModalError(e)
  }
}
</script>

<template>
  <div lg:flex gap-4 mx-1>
    <UContainer class="lg:w-1/2 bg-gray-50 dark:bg-muted-800  p-4 rounded-md !border border-gray-300 dark:!border-gray-700">
      <div
        grid
        lg:grid-cols-2
        lg:gap-4
      >
        <UFormGroup name="nameMenu" label="Nombre">
          <UInput v-model="formMenu.name" icon="i-heroicons-cursor-arrow-rays" color="gray" variant="outline" />
        </UFormGroup>
        <UFormGroup name="path" label="Ruta Navegación">
          <USelect v-model="formMenu.path" :options="routes" />
        </UFormGroup>
        <UFormGroup name="icon" label="Icono">
          <UInput v-model="formMenu.icon" :icon="formMenu.icon" name="icon" label="icono" />
        </UFormGroup>
        <div flex gap-2 items-center justify-between>
          <UFormGroup name="status" label="Estado">
            <UCheckbox v-model="formMenu.active" name="status" label="Activado?" />
          </UFormGroup>
          <UButton
            v-if="!formMenu.id"
            :loading="loading"
            :disabled="loading"
            color="red"
            variant="solid"
            icon="i-carbon-save-series"
            @click="createMenu()"
          >
            <span>Guardar</span>
          </UButton>
          <div v-else flex gap-1 flex-col>
            <UButton h-7 label="Cancelar" color="red" variant="solid" icon="i-carbon-close" @click="cleanForm" />
            <UButton h-7 label="Actualizar" color="yellow" variant="solid" icon="i-heroicons-arrow-path-rounded-square" @click="updateMenu" />
          </div>
        </div>
      </div>
      <UBadge label="SUBMENUS" color="pink" mt-2 />
      <div
        grid
        grid-cols-2
        gap-4
        border
        border-dashed
        rounded-md
        p-2
      >
        <UFormGroup name="nameMenu" label="Nombre">
          <UInput v-model="formSubMenu.name" icon="i-heroicons-cursor-arrow-rays" color="white" variant="outline" />
        </UFormGroup>
        <UFormGroup name="path" label="Ruta Navegación">
          <USelect v-model="formSubMenu.path" :options="routes" />
        </UFormGroup>
        <UFormGroup name="icon" label="Icono">
          <UInput v-model="formSubMenu.icon" :icon="formSubMenu.icon" name="icon" label="icono" />
        </UFormGroup>
        <div flex justify-between items-center>
          <UFormGroup name="status" label="Estado">
            <UCheckbox v-model="formSubMenu.active" name="status" label="Activado?" />
          </UFormGroup>

          <UButton v-if="!formSubMenu._id" h-7 label="Agregar" variant="solid" icon="i-heroicons-arrow-down" @click="addAndUpdateSubMenu" />
          <div v-else>
            <UButton h-7 label="Actualizar" color="yellow" variant="solid" icon="i-heroicons-arrow-path-rounded-square" @click="addAndUpdateSubMenu" />
          </div>
        </div>
        <div class="col-span-2">
          <UTable

            :ui="{
              td: {
                padding: 'px-1 py-1',
              },
            }" :columns="columns" :rows="formMenu.subMenus"
          >
            <template #id-data="{ index }">
              {{ index + 1 }}
            </template>
            <template #name-data="{ row }">
              <div class="orderMenu">
                <UIcon name="i-carbon-list-checked" />

                {{ row.name }}
              </div>
            </template>
            <template #acc-data="{ row }">
              <div class="flex justify-end gap-1">
                <UButton h-7 color="yellow" variant="solid" icon="i-heroicons-pencil" @click="setEditSubMenu(row)" />
                <UButton h-7 color="red" variant="solid" icon="i-heroicons-trash" />
              </div>
            </template>
          </UTable>
        </div>
      </div>
    </UContainer>
    <UContainer class="lg:w-1/2 bg-gray-50 dark:bg-muted-800   p-4 rounded-md !border border-gray-300 dark:!border-gray-700">
      <div flex justify-center p-1>
        <UButton icon="i-carbon-sort-descending" label="Ordenar Menu" @click="modals.ordeningMenu = true" />
      </div>
      <UTable
        :loading="loadingTable"
        :ui="{
          td: {
            padding: 'px-1 py-1',
          },
          th: {
            padding: 'px-1 py-1',
          },
        }" :columns="columns" :rows="menusData.results"
      >
        <template #id-data="{ index }">
          {{ index + 1 }}
        </template>
        <template #acc-data="{ row }">
          <div class="flex justify-end gap-1">
            <UButton h-7 color="yellow" variant="solid" icon="i-heroicons-pencil" @click="setEditMenu(row)" />
            <UButton h-7 color="red" variant="solid" icon="i-heroicons-trash" />
          </div>
        </template>
      </UTable>
    </UContainer>
  </div>
  <modalOrdening v-if="modals.ordeningMenu" v-model="modals.ordeningMenu" :items="menusData.results" />
</template>
