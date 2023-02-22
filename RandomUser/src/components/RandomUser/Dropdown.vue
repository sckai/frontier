<script setup lang="ts">
import { ref } from 'vue'

// props
const props = defineProps({
  dropdownList: {
    tpye: Array,
    default: [10 , 30 , 50]
  }
})

// emit
const emit = defineEmits(['GetValue'])
const GetValue = () => {
  emit("GetValue", currnetValue.value)
}

// ref
const currnetValue = ref(10)
const showMenu = ref(false)


// event
const ShowMenuButton = (value: boolean) => {
  showMenu.value = value
}

const ClickDropDownValue = (value: any) => {
  ShowMenuButton(false)

  if (currnetValue.value === value) return
  currnetValue.value = value

  GetValue()
}
</script>

<template lang="pug">
div(id="Dropdown")
  button(class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button"
    @click="ShowMenuButton(!showMenu)") {{ `${currnetValue}` }}
    svg(class="w-4 h-4 ml-2"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg")
      path(stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7")

  div(v-show="showMenu"
    class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none")
    a(v-for="(listItem, listIndex) in props.dropdownList"
      :key="listIndex"
      href="#" class="text-gray-700 hover:bg-gray-200 block px-4 py-2 text-sm"
      @click="ClickDropDownValue(listItem)") {{ `${listItem}` }}
</template>