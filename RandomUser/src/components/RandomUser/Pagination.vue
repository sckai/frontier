<script setup lang="ts">
import { computed } from 'vue'

// props
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 1
  }
})

// emit
const emit = defineEmits(['GetPage'])
const GetPage = (page: number) => {
  emit("GetPage", page)
}

// computed
const showOneAfterManyButton = computed(() => {
  if (props.total > 5 && props.currentPage > 3) return true

  return false
})

const showLastAfterManyButton = computed(() => {
  if (props.total > 5 && props.total - 2 > props.currentPage) return true

  return false
})

const shwoLastNumButton = computed(() => {
  if (props.total > 4) return true

  return false
})

const showMiddleButton = computed(() => {
  if (props.total > 1) return true

  return false
})

const middleNums = computed(() => {
  if (props.total < 5) {
    const nums = []
    const displayNums = props.total - 1
    for (let index = 0; index < displayNums; index++) {
      nums[index] = index + 2
    }
    return nums
  }
  if (props.currentPage < 4) return [2, 3, 4]
  if (props.currentPage >= 4 && props.total - 2 >= props.currentPage) return [props.currentPage -1, props.currentPage, props.currentPage + 1]
  return [props.total - 3, props.total - 2, props.total - 1]
})

const showPreviousButton = computed(() => {
  if (props.currentPage === 1) return false

  return true
})

const showNextButton = computed(() => {
  if (props.total === props.currentPage) return false

  return true
})

// event
const ClickPage = (page: number) => {
  GetPage(page)
}
</script>

<template lang="pug">
div(id="Pagination")
  ul(class="inline-flex items-center -space-x-px")
    li(v-show="showPreviousButton"
      @click="ClickPage(currentPage - 1)")
      a(href="#" class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white")
        span(class="sr-only") {{ `Previous` }}
        svg(aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg")
          path(fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd")

    li(@click="ClickPage(1)")
      a(:class="{'bg-gray-400': currentPage === 1}"
        href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white") {{ `1` }}

    li(v-show="showOneAfterManyButton")
      a(href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white") {{ `...` }}

    li(v-show="showMiddleButton"
      v-for="(num, index) in middleNums"
      :key="index"
      @click="ClickPage(num)")
      a(:class="{'bg-gray-400': currentPage === num}"
        href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white") {{ `${num}` }}

    li(v-show="showLastAfterManyButton")
      a(href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white") {{ `...` }}

    li(v-show="shwoLastNumButton"
      @click="ClickPage(total)")
      a(:class="{'bg-gray-400': currentPage === total}"
        href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white") {{ `${total}` }}

    li(v-show="showNextButton"
      @click="ClickPage(currentPage + 1)")
      a(href="#" class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white")
        span(class="sr-only") Next
        svg(aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg")
          path(fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd")
</template>