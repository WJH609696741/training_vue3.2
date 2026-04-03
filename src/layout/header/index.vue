<template>
  <h1 style="margin-left: 20px;">头部区域</h1>
  <div class="h-right">
    <span class="user">admin</span>
    <a-button shape="circle" @click="logout" style="margin-right: 40px;" v-btnDebounce>
      <template #icon>
        <LogoutOutlined />
      </template>
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { LogoutOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = () => {
  router.push('/login')
  sessionStorage.clear()
  message.info('已退出', 3)
}
</script>

<style lang="scss" scoped>
.user {
  margin-right: 40px;
  font-size: 24px;
  vertical-align: middle;
  position: relative;

  &::after {
    content: "";
    width: 2px;
    height: 50px;
    background-color: #ccc;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -20px;
  }
}
</style>