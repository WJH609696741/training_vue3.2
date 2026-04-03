<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
// 全局汉化
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import 'dayjs/locale/zh-cn'
// 配置dayjs中文环境
import dayjs from 'dayjs'
dayjs.locale('zh-cn')
//打印环境变量
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const router = useRouter()
const store = useStore()
if (sessionStorage.isLogin) {
  store.dispatch('saveAsyncMenu')
} else {
  router.push('/login')
}
</script>
