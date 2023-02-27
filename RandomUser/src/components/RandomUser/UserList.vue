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
</script>

<template lang="pug">
div(id="UserList")
  div(class="border-2 shadow-2xl p-4")
    li(class="overflow-hidden")
      div(class="flex items-center space-x-4 border-2 shadow-2xl rounded-md p-4")
        div(class="flex-shrink-0")
          img(class="w-16 h-16 rounded-full" :src="photoUrl" alt="photo")
        div(class="flex-1 min-w-0")
          p(class="text-sm font-medium text-gray-900 truncate dark:text-white") {{ `${name}` }}
          p(class="text-sm text-gray-500 truncate dark:text-gray-400") {{ `${eMail}` }}
        div(class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white")
          div(class="text-center text-indigo-500 mr-4") Post
            div(class="text-cneter text-black font-semibold") {{ `${post}` }}
        div(class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white")
          div(class="text-indigo-500 mr-4") Followers
            div(class="text-center text-black font-semibold") {{ `${followers}` }}
        div(class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white")
          div(class="text-indigo-500") Following
            div(class="text-center text-black font-semibold") {{ `${following}` }}
</template>