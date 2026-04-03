<template>
  <div class="header">
    <Header />
  </div>
  <div class="bottom">
    <div class="menu">
      <Menu />
    </div>
    <div class="content">
      <!-- <div class="app-container"> -->
      <router-view />
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { } from 'vue'
import Header from './header/index.vue'
import Menu from './menu/index.vue'

</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom {
  height: calc(100% - 60px);
  display: flex;

  .menu {
    width: 250px;
  }

  .content {
    background-color: #ccc;
    height: 100%;
    width: calc(100% - 250px);
    padding: 20px;
  }
}
</style>