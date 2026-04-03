import { createStore } from 'vuex'
import { message } from 'ant-design-vue'
import axios from 'axios'
import { addAsyncRoute } from '../utils/routes.config'
import router from '../router/index'

export default createStore({
  state: {
    //存放菜单结构
    asyncMenu: [],
  },
  getters: {
    getAsyncMenu(state) {
      return state.asyncMenu
    }
  },
  mutations: {
    // 保存菜单结构
    SAVEASYNCMENU(state, payload) {
      state.asyncMenu = payload
    }
  },
  actions: {
    async saveAsyncMenu(context, payload) {
      const res = await axios.get('/asyncMenu')
      if (res.data.status === 0) {
        // 把后端返回的路由信息暂存起来供菜单渲染使用
        context.commit('SAVEASYNCMENU', res.data.asyncMenu)
        // 动态拼接添加路由
        addAsyncRoute(res.data.asyncMenu)
        router.push('/')
      } else {
        message.error(res.data.msg, 3)
      }
    }
  },
  modules: {
  }
})
