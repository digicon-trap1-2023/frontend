import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initMock } from '@/lib/msw'

initMock()

import mitt from 'mitt'

import { VueMasonryPlugin } from 'vue-masonry'
const emitter = mitt()

const app = createApp(App)
app.config.globalProperties.emitter = emitter

app.use(createPinia())
app.use(router)
app.use(VueMasonryPlugin)

app.mount('#app')
