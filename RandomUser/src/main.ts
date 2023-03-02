import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faList, faAddressCard, faHeart, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faList, faAddressCard, faHeart, faXmark)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
