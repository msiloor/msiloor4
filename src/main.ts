import { createApp } from 'vue'
import element from 'element-plus'
import { createPinia } from 'pinia'

import 'element-plus/dist/index.css'
import './assets/css/app.css'

import router from './router/index'

import App from './App.vue'
document.title = 'msiloor-梦聆 聆听梦中的声音'

createApp(App).use(element).use(createPinia()).use(router).mount('#app')
