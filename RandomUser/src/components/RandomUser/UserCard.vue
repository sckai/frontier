<script setup lang="ts">
import { computed } from 'vue'

// props
const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  photoUrl: {
    type: String,
    default: ''
  },
  isFavorite: {
    tpye: Boolean,
    default: false
  },
  name: {
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

// emit
const emit = defineEmits(['GetFavoriteStatus'])
const GetFavoriteStatus = (favoriteStatus: boolean) => {
  emit("GetFavoriteStatus", favoriteStatus, props.id)
}

// method
const ClickFavoriteStatus = (isFavorite:　boolean) => {
  GetFavoriteStatus(isFavorite)
}
</script>

<template lang="pug">
div(id="UserCard")
  div(class="relative p-4 h-min-64 w-full sm:w-full md:w-80 lg:w-80 border-2 shadow-2xl mx-auto rounded-md cursor-pointer")
    div(class="flex-wrap justify-center sm:flex md:flex lg:flex h-30")
      div
        div(class="mx-auto w-full rounded-bl-md mb-2")
          img(class="mx-auto rounded-full mr-auto w-28 h-28"
            :src="photoUrl" alt="photo")
        div(class="text-center mb-4 text-base animate-text bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black"
          ) {{ `${name}` }}
      
      div(class="h-30 mx-auto flex justify-center items-center")
        div(class="text-indigo-500 mr-4 text-center") Post
          div(class="text-black font-semibold") {{ `${post}` }}
        div(class="text-indigo-500 mr-4 text-center") Followers
          div(class=" text-black font-semibold") {{ `${followers}` }}
        div(class="text-indigo-500 text-center") Following
          div(class=" text-black font-semibold") {{ `${following}` }}
    
    div(class="absolute right-2 top-2")
      font-awesome-icon(:class="{ 'text-red-500': isFavorite }"
        class="text-2xl cursor-pointer"
        icon="fa-solid fa-heart"
        @click.stop="ClickFavoriteStatus(!isFavorite)")
</template>