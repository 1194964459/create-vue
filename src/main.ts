import { createApp } from 'vue'
import { createPinia } from 'pinia'  // vue的专属状态管理器

import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)   // Antd

app.mount('#app')
