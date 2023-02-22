<script setup lang="ts">
import { computed } from 'vue'
// props
const props = defineProps({
  photoUrl: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  eMail: {
    type: String,
    default: ''
  },
  post: {
    type: Number,
    defalut: 0
  },
  followers: {
    type: Number,
    defalut: 0
  },
  following: {
    type: Number,
    defalut: 0
  }
})

// computed
const showSkeleton = computed(() => {
  if (props.photoUrl === '') return true

  return false
})
</script>

<template lang="pug">
div(id="UserList")
  div(class="border-2 shadow-2xl p-4")
    li(v-if="!showSkeleton"
      class="overflow-hidden")
      div(class="flex items-center space-x-4 border-2 shadow-2xl rounded-md p-4")
        div(class="flex-shrink-0")
          img(class="w-16 h-16 rounded-full" :src="photoUrl" alt="photo")
        div(class="flex-1 min-w-0")
          p(class="text-sm font-medium text-gray-900 truncate dark:text-white") {{ `${name}` }}
          p(class="text-sm text-gray-500 truncate dark:text-gray-400") {{ `${eMail}` }}
        div(class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white")
          div(class="text-indigo-500 mr-4") Post
            div(class="text-cneter text-black font-semibold") {{ `${post}` }}
        div(class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white")
          div(class="text-indigo-500 mr-4") Followers
            div(class="text-center text-black font-semibold") {{ `${followers}` }}
        div(class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white")
          div(class="text-indigo-500") Following
            div(class="text-center text-black font-semibold") {{ `${following}` }}
    
    //- skeleton
    div(v-if="showSkeleton"
      class="flex animate-pulse")
      div(class="flex-shrink-0")
        span(class="w-12 h-12 block bg-gray-200 rounded-full dark:bg-gray-700")

      div(class="ml-4 mt-2 w-full")
        h3(class="h-4 bg-gray-200 rounded-md dark:bg-gray-700" style="width: 40%;")

        ul(class="mt-5 space-y-3")
          li(class="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700")
          li(class="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700")
          li(class="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700")
          li(class="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700")
</template>