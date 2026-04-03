import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// 公共样式
import './styles/common.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import btnDebounce from './directives/btnDebounce'
import './mock' // 本地 mock 数据, 后端接口模拟

const app = createApp(App)
app.use(Antd)
app.use(router)
app.use(store)
app.use(btnDebounce)
app.mount('#app')
