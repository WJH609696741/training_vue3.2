<template>
  <a-menu mode="inline" v-model:selectedKeys="selectedKeys" theme="dark" :open-keys="openKeys"
    @openChange="onOpenChange" @click="handleRouteChange">
    <template v-for="item in asyncMenu">
      <!-- 有子级的情况 -->
      <a-sub-menu v-if="item.children" :title="item.name" :key="item.path">
        <a-menu-item v-for="subitem in item.children" :key="subitem.path">{{ subitem.name }}</a-menu-item>
      </a-sub-menu>
      <!-- 无子级的情况 -->
      <a-menu-item v-else :key="item.path">{{ item.name }}</a-menu-item>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

interface Menu {
  path: string;
  name: string;
  children?: Menu[]
}

const store = useStore()
const asyncMenu = computed(() => store.getters['getAsyncMenu'])
const selectedKeys = ref(['/dashboard'])
const openKeys = ref([])
const rootSubmenuKeys = ref([])
const router = useRouter()

watch(asyncMenu, () => {
  rootSubmenuKeys.value = asyncMenu.value.map((item: { children: Menu[]; path: string; }) => {
    if (item.children) {
      return item.path
    }
  })
}, {
  immediate: true
})

const onOpenChange = (keys: never[]) => {
  const latestOpenKey = keys.find(key => openKeys.value.indexOf(key) === -1);

  if (rootSubmenuKeys.value.indexOf(latestOpenKey!) === -1) {
    openKeys.value = keys;
  } else {
    openKeys.value = latestOpenKey ? [latestOpenKey] : [];
  }
}

const handleRouteChange = ({ key }: { key: string }) => {
  console.log(key);
  router.push(key)
}

</script>

<style lang="scss" scoped>
.ant-menu {
  height: 100%;
}
</style>