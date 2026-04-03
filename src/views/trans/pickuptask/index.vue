<template>
  <div class="app-container">
    <h2>接车任务查询</h2>
    <a-form ref="formRef" name="advanced_search" class="ant-advanced-search-form" :model="formState">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item name="A" label="合同编号">
            <a-input v-model:value="formState[`A`]" placeholder="合同编号"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item name="B" label="进厂车次">
            <a-input v-model:value="formState[`B`]" placeholder="进厂车次"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item name="C" label="车号/集装箱号">
            <a-input v-model:value="formState[`C`]" placeholder="车号/集装箱号"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item name="D" label="流向号">
            <a-input v-model:value="formState[`D`]" placeholder="流向号"></a-input>
          </a-form-item>
        </a-col>
        <a-col v-show="expand" :span="6">
          <a-form-item name="E" label="执行状态">
            <a-select placeholder="执行状态" v-model:value="formState[`E`]" :options="options1" @change="handleChange1">
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-show="expand" :span="6">
          <a-form-item name="F" label="接车任务号">
            <a-input v-model:value="formState[`F`]" placeholder="接车任务号"></a-input>
          </a-form-item>
        </a-col>
        <a-col v-show="expand" :span="6">
          <a-form-item name="G" label="物料名称">
            <a-select placeholder="物料名称" v-model:value="formState[`G`]" :options="options2" @change="handleChange2">
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-show="expand" :span="6">
          <a-form-item name="H" label="进厂时间">
            <a-input v-model:value="formState[`H`]" placeholder="进厂时间"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" style="text-align: right">
          <a-button type="primary" @click="submit" v-btnDebounce>搜索</a-button>
          <a-button style="margin: 0 8px" @click="reset">重置</a-button>
          <a style="font-size: 12px" @click="isExpand">
            <template v-if="expand">
              <UpOutlined />收起
            </template>
            <template v-else>
              <DownOutlined />更多
            </template>
          </a>
        </a-col>
      </a-row>
    </a-form>
    <hr>
    <div :class="elFlag ? 'bottom-table-fold' : 'bottom-table-expand'">
      <div class="table-tool">
        <div class="tool-left">
          <span>每日接车计划：计划接车 <span class="color">70</span>，已接车 <span class="color">30</span></span>
        </div>
        <div class="tool-right">排序：
          <a-select ref="select" placeholder="预计进厂时间" v-model:value="selected" style="width: 180px" :options="options"
            @change="handleChange">
          </a-select>
        </div>
      </div>
      <div class="table-bar">
        <a-table :columns="columns" :data-source="data" :pagination="false" :scroll="tableScroll" ref="antdTable">
          <template #expandedRowRender>
            <a-table :columns="innerColumns" :data-source="innerData" :pagination="false">
            </a-table>
          </template>
        </a-table>
        <a-pagination v-model:pageSize="pageSize" v-model:current="current" :total="50" showSizeChanger
          :show-total="(total: number) => `总数 ${total} 条`" showQuickJumper @change="currentChange"
          @showSizeChange="sizeChange" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUpdated } from 'vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import type { FormInstance, SelectProps } from 'ant-design-vue'

const antdTable = ref<FormInstance>()
//初始化 table纵向滚动条高度为0
const tableScroll = ref({ y: 0 })
//.table-bar>.ant-table-wrapper:first-child 
// css样式里面其实已经得到了整个表格的动态高度，减去55表头高度，就是表格内容实际的动态高度
onMounted(() => {
  //页面挂载完成计算一次table纵向滚动条高度   
  tableScroll.value.y = antdTable.value?.$el.clientHeight - 55
  console.log('onMounted')
})
//当上方搜索框展开或者收起的时候重新计算table纵向滚动条高度
onUpdated(() => {
  tableScroll.value.y = antdTable.value?.$el.clientHeight - 55
  console.log('onUpdated')
})

const originData = { A: null, B: null, C: null, D: null, E: '1', F: null, G: '1', H: null }
const columns = [
  { title: 'Index', dataIndex: 'index', key: 'index' },
  { title: 'Platform', dataIndex: 'platform', key: 'platform' },
  { title: 'Version', dataIndex: 'version', key: 'version' },
  { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  { title: 'Creator', dataIndex: 'creator', key: 'creator' },
  { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' }
]

interface DataItem {
  key: number;
  index: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
}
const data: DataItem[] = []
for (let i = 0; i < 20; ++i) {
  data.push({
    key: i,
    index: `${i + 1}`,
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: 'Jack',
    createdAt: '2014-12-24 23:12:00',
  })
}

const innerColumns = [
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' }
]

interface innerDataItem {
  key: number;
  date: string;
  name: string;
  upgradeNum: string;
}

const innerData: innerDataItem[] = [];
for (let i = 0; i < 3; ++i) {
  innerData.push({
    key: i,
    date: '2014-12-24 23:12:00',
    name: `This is production name ${i + 1}`,
    upgradeNum: 'Upgraded: 56'
  })
}

const current = ref(1)
const pageSize = ref(10)
const expand = ref(false)
const selected = ref('1')
const formRef = ref<FormInstance>()
const formState = ref({ ...originData })
const elFlag = ref(true)
const options = ref<SelectProps['options']>([
  {
    value: '1',
    label: '预计进厂时间 早 → 晚',
  },
  {
    value: '2',
    label: '预计进厂时间 晚 → 早',
  },
  {
    value: '3',
    label: '实际进厂时间 早 → 晚',
  },
  {
    value: '4',
    label: '实际进厂时间 晚 → 早',
  }
])
const options1 = ref<SelectProps['options']>([
  {
    value: '1',
    label: '全部',
  },
  {
    value: '2',
    label: '待接车',
  },
  {
    value: '3',
    label: '执行中',
  },
  {
    value: '4',
    label: '已完成',
  }
])
const options2 = ref<SelectProps['options']>([
  {
    value: '1',
    label: '全部',
  },
  {
    value: '2',
    label: '非全部',
  }
])

const isExpand = async () => {
  expand.value = !expand.value
  await nextTick()
  // vue3通过ref来获取dom元素
  // console.log(formRef.value?.$el)
  if (formRef.value?.$el.clientHeight > 88) {
    elFlag.value = false
  } else {
    elFlag.value = true
  }
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`)
}

const handleChange1 = (value: string) => {
  console.log(`selected1 ${value}`)
}

const handleChange2 = (value: string) => {
  console.log(`selected2 ${value}`)
}

const submit = () => {
  console.log('submit formState: ', formState)
}

const reset = () => {
  formRef.value?.resetFields()
  formState.value = { ...originData }
  console.log('reset formState: ', formState)
}

const sizeChange = (page: number, pageSize: number) => {
  console.log('sizeChange', page, pageSize)

}

const currentChange = (current: number, pageSize: number) => {
  console.log('currentChange', current, pageSize);
}
</script>

<style lang="scss" scoped>
.ant-form {
  margin-top: 20px;
}

.bottom-table-fold {
  height: calc(100% - 157px);
}

.bottom-table-expand {
  height: calc(100% - 213px);
}

.color {
  color: blue;
}

.table-tool {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 32px;
}

.table-bar {
  height: calc(100% - 52px);
  margin: 20px 20px 0 20px;
}

.table-bar>.ant-table-wrapper:first-child {
  height: calc(100% - 52px);
}

.ant-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>