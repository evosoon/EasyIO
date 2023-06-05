import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import lazy from 'vue3-lazy'
import Loading from '@/assets/imgs/Loading.jpg'
import Error from '@/assets/imgs/Error.jpg'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazy,{
    error:Error,
    loading:Loading,
})

app.mount('#app')
