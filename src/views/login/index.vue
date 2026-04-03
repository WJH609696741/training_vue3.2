<template>
  <div class="login">
    <div class="container">
      <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
        <a-form-item label="用户名" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="formState.password" autocomplete="off" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" @click="onFinish" v-btnDebounce>登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import axios from 'axios'
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'

interface FormState {
  username: string
  password: string
}

const store = useStore()
debugger
const formState = reactive<FormState>({
  username: '',
  password: ''
})

const onFinish = async () => {
  const { data } = await axios.post('/login', formState)
  if (data.status === 0) {
    //登录成功
    //获取路由组装路由
    store.dispatch('saveAsyncMenu')
    sessionStorage.setItem('isLogin', '1')
    message.success(data.msg, 3)
  } else {
    //登录失败
    message.error(data.msg, 3)
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  position: relative;

  .container {
    padding: 20px;
    background-color: #cccccc3d;
    border-radius: 10px;
    border: 1px solid #cccccc2c;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>