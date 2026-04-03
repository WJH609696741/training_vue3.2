<template>
  <div class="app-container">
    <a-tree v-model:expandedKeys="expandedKeys" v-model:checkedKeys="checkedKeys" checkable :tree-data="treeData">
      <!-- <template #title="{ title, key }">
        <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
        <template v-else>{{ title }}</template>
      </template> -->
    </a-tree>
    <Test />
  </div>
</template>

<script setup lang="ts">
import type { TreeProps } from 'ant-design-vue'
import { ref, watch } from 'vue'
import Test from './test.vue'

const treeData: TreeProps['treeData'] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          { title: 'leaf', key: '0-0-0-0' },
          { title: 'leaf', key: '0-0-0-1' },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ key: '0-0-1-0', title: 'sss' }],
      },
    ],
  },
];

const expandedKeys = ref<string[]>(['0-0']);
// const selectedKeys = ref<string[]>(['0-0-0', '0-0-1']);
const checkedKeys = ref<string[]>(['0-0-0']);
watch(expandedKeys, () => {
  console.log('expandedKeys', expandedKeys);
});
// watch(selectedKeys, () => {
//   console.log('selectedKeys', selectedKeys);
// });
watch(checkedKeys, () => {
  console.log('checkedKeys', checkedKeys);
});

</script>