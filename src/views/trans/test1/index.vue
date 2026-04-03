<template>
  <div class="app-container">
    <div class="main">
      <a-button @click="handle" v-btnDebounce>{{ `${!flag ? '打开' : '关闭'}抽屉` }}</a-button>
      <div class="chouti" :class="flag ? 'open' : 'close'">抽屉</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const flag = ref(false)
const handle = () => {
  flag.value = !flag.value
}
</script>

<style lang="scss" scoped>
.chouti {
  position: fixed;
  height: 100%;
  background-color: skyblue;
  right: 0;
  top: 0;
}

.open {
  width: 300px;
  transition: width 0.5s linear;
}

.close {
  transition: width 0.5s linear;
  width: 0;
}
</style>