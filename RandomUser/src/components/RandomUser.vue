<script setup lang="ts">
import { ref } from 'vue'

// components
import Dropdown from '@/components/RandomUser/Dropdown.vue'
import UserCard from '@/components/RandomUser/UserCard.vue'
import UserList from '@/components/RandomUser/UserList.vue'
import Pagination from '@/components/RandomUser/Pagination.vue'

const statusSet = ref('ALL') // ALL、Favorite, default: ALL
const displayMode = ref('Card') // Card 、List, default: Card
const page = ref(1)
const total = ref(10)

// event
const ToggleStatus = (status: string) => {
  statusSet.value = status
}

const ToggleDisplayMode = (mode: string) => {
  if (displayMode.value === 'mode') return
  displayMode.value = mode
}

// emit
const GetDropdownValue = (dropdownValue: any) => {
  console.log(dropdownValue)
}

const GetPage = (pageNum: number) => {
  page.value = pageNum
}
</script>

<template lang="pug">
div(id="RandomUser"
  class="p-6")

  //- condition area
  div(class="flex justify-between items-center mb-6")
    div(class="flex")
      div(:class="{ 'text-indigo-700': statusSet === 'ALL' }"
        class="mr-2 underline text-indigo-400 text-xl  hover:text-indigo-800 active:text-indigo-700 cursor-pointer"
        @click="ToggleStatus('ALL')") {{ `ALL` }}
      div(:class="{ 'text-indigo-700': statusSet === 'Favorite' }"
        class="underline hover:underline text-indigo-400 text-xl hover:text-indigo-800 active:text-indigo-700 cursor-pointer"
        @click="ToggleStatus('Favorite')") {{ `Favorite` }}

    div(class="flex justify-between items-center")
      Dropdown(class="mr-4"
        @getValue="GetDropdownValue")

      font-awesome-icon(:class="{ 'text-2xl text-indigo-700': displayMode === 'List' }"
        class="mr-2 cursor-pointer text-indigo-400 hover:text-indigo-800"
        icon="fa-solid fa-list"
        @click="ToggleDisplayMode('List')")
      font-awesome-icon(:class="{ 'text-2xl text-indigo-700': displayMode === 'Card' }"
        class="cursor-pointer text-indigo-400 hover:text-indigo-800"
        icon="fa-solid fa-address-card"
        @click="ToggleDisplayMode('Card')")

  //- mode has card、list
  div(class="mb-8")
    //- card component
    div(v-show="displayMode === 'List'")
      ul(class="max-w divide-y divide-gray-200 dark:divide-gray-700")
        UserList
        UserList
        UserList
        UserList
        UserList
    //- list component
    div(v-show="displayMode === 'Card'"
      class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4")
      UserCard
      UserCard
      UserCard
      UserCard
      UserCard

  div(class="flex justify-center items-center")
    Pagination(:currentPage="page"
      :total="total"
      @GetPage="GetPage")
</template>