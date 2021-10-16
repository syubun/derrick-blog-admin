import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import '@/vab'
import directives from '@/utils/directives'

const app = createApp(App)

app.directive(...directives)

app.use(store).use(router).use(Antd).mount('#app')
