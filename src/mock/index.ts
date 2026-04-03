import axios from 'axios'

interface MenuItem {
  path: string
  name: string
  children?: MenuItem[]
}

const asyncMenu: MenuItem[] = [
  {
    path: '/dashboard',
    name: '首页'
  },
  {
    path: '/trans',
    name: '业务管理',
    children: [
      { path: '/trans/pickuptask', name: '接车任务管理' },
      { path: '/trans/test1', name: '测试页1' },
      { path: '/trans/test2', name: '测试页2' }
    ]
  },
  {
    path: '/inout',
    name: '进出厂',
    children: [
      { path: '/inout/wagon', name: '车皮信息' }
    ]
  }
]

axios.interceptors.request.use((config) => {
  // 可在此处加入请求日志等
  return config
})

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 简单登录与菜单模拟
axios.interceptors.request.use(async (config) => {
  if (!config.url) return config

  if (config.url.endsWith('/login') && config.method === 'post') {
    const data = config.data ?? {}
    const { username, password } = typeof data === 'string' ? JSON.parse(data) : data
    config.adapter = async () => {
      await new Promise((resolve) => setTimeout(resolve, 400))
      return {
        data: {
          status: username === 'admin' && password === '123456' ? 0 : 1,
          msg: username === 'admin' && password === '123456' ? '登录成功' : '用户名或密码错误'
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      }
    }
  }

  if (config.url.endsWith('/asyncMenu') && config.method === 'get') {
    config.adapter = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        data: {
          status: 0,
          asyncMenu
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      }
    }
  }

  return config
})

export { asyncMenu }
