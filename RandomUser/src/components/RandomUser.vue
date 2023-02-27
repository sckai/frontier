<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// api fn
import { GetUserList } from '@/api/index'

// components
import Dropdown from '@/components/RandomUser/Dropdown.vue'
import UserCard from '@/components/RandomUser/UserCard.vue'
import UserList from '@/components/RandomUser/UserList.vue'
import Pagination from '@/components/RandomUser/Pagination.vue'

// data
const statusSet = ref('ALL') // ALL、Favorite, default: ALL
const displayMode = ref('Card') // Card 、List, default: Card
let listData:any = reactive({ userData:[] })
let displayData:any = reactive({ userData:[] })
let favoriteData:any = reactive({ userData:[] })
const page = ref(1)
const count = ref(10)
const total = ref(3010)
const results = ref(count.value)
const pagesNums = ref(Math.ceil(total.value / count.value))

// Init
const Init = onMounted(() => {
  results.value = count.value
  ApiGetUserList({page: page.value, results: results.value })
})

// api
const ApiGetUserList = async (params: any) => {
  displayData.userData = []
  listData.userData = []
  const data = await GetUserList(params)

  data.data.results.forEach((userItem: { isFavorite: boolean }) => {
    userItem['isFavorite'] = false
  })

  listData.userData = data.data.results
  displayData.userData = data.data.results
}

// event
const ToggleStatus = (status: string) => {
  if (statusSet.value === status) return

  statusSet.value = status
  if (statusSet.value === 'Favorite') { 
    displayData.userData = favoriteData.userData
    return
  }

  displayData.userData = listData.userData
}

const ToggleDisplayMode = (mode: string) => {
  if (displayMode.value === mode) return
  displayMode.value = mode
}

// method
const GetDropdownValue = (dropdownValue: any) => {
  page.value = 1
  pagesNums.value = Math.ceil(total.value / dropdownValue)
  count.value = dropdownValue
  results.value = dropdownValue

  ApiGetUserList({page: page.value, results: results.value })
}

const GetPage = (pageValue: number) => {
  page.value = pageValue

  if (pagesNums.value !== pageValue) {
    results.value = count.value
    ApiGetUserList({page: page.value, results: results.value })
    return
  }

  if (total.value % count.value === 0) {
    results.value = count.value
  } else {
    results.value = total.value % count.value
  }

  ApiGetUserList({page: page.value, results: results.value })
}

// method
const GetFavoriteStatus = (favoriteStatus: boolean, id: String) => {

  listData.userData.forEach((userItem: any) => {
    if (userItem['login']['uuid'] === id) {
      if (favoriteStatus) favoriteData.userData.push(userItem)
      userItem['isFavorite'] = favoriteStatus
    }
  })
  if (!favoriteStatus) DelFavorite(id)
}

const DelFavorite = (id: String) => {
  for(let index = 0; index < favoriteData.userData.length; index++) {
    if(favoriteData.userData[index].login.uuid = id) {
      favoriteData.userData.splice(index, 1)
      break
    }
  }
}

// const 
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
        div(v-for="list in displayData.userData"
          :key="list.login.uuid")
          UserList(:photoUrl="list.picture.large"
            :name="`${list.name.first} ${list.name.last}`"
            :eMail="list.email"
            :post="list.registered.age"
            :followers="list.location.street.number"
            :following="list.dob.age")
    //- list component
    div(v-show="displayMode === 'Card'"
      class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4")
      div(v-for="list in displayData.userData"
        :key="list.login.uuid")
        UserCard(:photoUrl="list.picture.large"
          :name="`${list.name.first} ${list.name.last}`"
          :id="list.login.uuid"
          :post="list.registered.age"
          :followers="list.location.street.number"
          :following="list.dob.age"
          :isFavorite="list.isFavorite"
          @GetFavoriteStatus="GetFavoriteStatus")

  div(v-show="statusSet === 'ALL'"
    class="flex justify-center items-center")
    Pagination(:currentPage="page"
      :total="pagesNums"
      @GetPage="GetPage")
</template>