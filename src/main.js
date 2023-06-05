import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import lazy from 'vue3-lazy'
import lazyimg from '@/assets/imgs/white.jpg'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazy,{
    error:lazyimg,
    loading:lazyimg,
})

app.mount('#app')
