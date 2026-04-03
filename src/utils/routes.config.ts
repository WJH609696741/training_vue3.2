import router from '../router/index'

interface Menu {
  path: string;
  name: string;
  children?: Menu[]
}

interface Route {
  path: string;
  name: string;
  meta: { title: string };
  component: () => Promise<typeof import("*.vue")>
}

const fullRoutes: Route[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: '首页'
    },
    component: () => import('../views/index.vue')
  },
  {
    path: '/trans/pickuptask',
    name: 'pickuptask',
    meta: {
      title: '接车任务管理'
    },
    component: () => import('../views/trans/pickuptask/index.vue')
  },
  {
    path: '/trans/test1',
    name: 'test1',
    meta: {
      title: '测试页1'
    },
    component: () => import('../views/trans/test1/index.vue')
  },
  {
    path: '/trans/test2',
    name: 'test2',
    meta: {
      title: '测试页2'
    },
    component: () => import('../views/trans/test2/index.vue')
  },
  {
    path: '/inout/wagon',
    name: 'wagon',
    meta: {
      title: '进出厂车皮信息'
    },
    component: () => import('../views/inout/wagon/index.vue')
  }
]

const addAsyncRoute = (routes: Menu[]) => {
  //把后端传来的多层级路由数组转化为一层路由数组
  const asyncRoutes: Menu[] = []
  routes.forEach((item: Menu) => {
    if (item.children) {
      item.children.forEach((subItem) => {
        asyncRoutes.push(subItem)
      })
    } else {
      asyncRoutes.push(item)
    }
  })
  fullRoutes.forEach((item) => {
    asyncRoutes.forEach((subItem) => {
      if (subItem.path == item.path) {
        //根据转化后的路由数组去抽取完整路由表里面的路由项
        //然后动态添加路由权限
        router.addRoute('index', { ...item })
      }
    })
  })
}

export { addAsyncRoute }