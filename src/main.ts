import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/reset.css'

import { createApp } from 'vue'

import App from './App.vue'
const app = createApp(App)

import ElementPlus from 'element-plus'
app.use(ElementPlus)

import Antd from 'ant-design-vue'
app.use(Antd)

app.mount('#app')
