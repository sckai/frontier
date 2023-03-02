<template lang="pug">
teleport(to="body")
  transition(name="modal")
    #UserModal(v-if="visible" :style="modalZindex")
      .modal-mask(@click="ClickMask")
      transition(name="card")
        .modal-card
          .modal-close(v-if="closeable")
            div(@click="ClickClose")
              font-awesome-icon(icon="fa-solid fa-xmark"
                class="text-xl mr-2 mt-2")
          .modal-body
            div(class="flex-wrap justify-center sm:flex md:flex lg:flex h-30")
              div(class="mr-4")
                div(class="mx-auto w-full rounded-bl-md mb-2")
                  img(class="mx-auto rounded-full mr-auto w-28 h-28"
                    :src="userData.picture.large" alt="photo")
                div(class="text-center mb-4 text-base animate-text bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black"
                  ) {{ `${userData.name.first} ${userData.name.last}` }}
              
              div(class="h-30 mx-auto flex justify-center items-center")
                div(class="text-indigo-500 mr-4 text-center") Post
                  div(class="text-black font-semibold") {{ `${userData.registered.age}` }}
                div(class="text-indigo-500 mr-4 text-center") Followers
                  div(class=" text-black font-semibold") {{ `${userData.location.street.number}` }}
                div(class="text-indigo-500 text-center") Following
                  div(class=" text-black font-semibold") {{ `${userData.dob.age}` }}
              
</template>

<script setup lang="ts">
import { computed } from 'vue'
// props
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 1100
    },
    closeable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    headerHeight: {
      type: [Number, String],
      default: 0
    },
    userData: {
      type: Object,
      default: () => {}
    }
  })

  // emit
  const emit = defineEmits(['OnClose'])
  const OnClose = () => {
    emit("OnClose", false)
  }

  // computed
  const modalZindex = computed(() => {
    return {
      "z-index": props.zIndex
    }
  })

  const modalHeaderHeight = computed(() => {
    if (props.headerHeight === 0) return "min-height: auto"
    return `min-height:${props.headerHeight}px`
  })

  // event
  const ClickMask = function () {
    if (props.maskClosable) OnClose()
  }
  const ClickClose = function () {
    OnClose()
  }
</script>

<style lang="scss" scoped>
// 排版
#UserModal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -20vh;
  overflow: hidden;
  letter-spacing: 1px;
}
// 元件
#UserModal {
  .modal-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
    backdrop-filter: blur(1px);
  }
  .modal-card {
    position: relative;
    min-width: 100px;
    min-height: 50px;
    background: #fff;
    border: 5px;
    border-radius: 6px;
    padding: 20px;
    box-shadow: 0 4px 12px #0002;
    .modal-close {
      position: absolute;
      top: 5px;
      right: 7px;
      cursor: pointer;
      color: #aaa;
      &:hover {
        color: #888;
      }
      &:active {
        transform: scale(0.9);
      }
    }
  }
}

// fadeIn fadeOut
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.card-enter-active,
.card-leave-active {
  transition: all 0.2s ease;
}
.card-enter-from,
.card-leave-to {
  transform: scale(0.7);
  opacity: 0;
}
</style>
