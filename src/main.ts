import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import mitt from 'mitt'

import { VueMasonryPlugin } from 'vue-masonry'
const emitter = mitt()

const app = createApp(App)
app.config.globalProperties.emitter = emitter

app.use(createPinia())
app.use(router)
app.use(VueMasonryPlugin)

app.mount('#app')
