<template>
  <div class="app-container">
    <div class="inout">
      <h2 class="hover" :class="inout == 'in' ? 'seleted' : ''" @click="enterFc">进厂</h2>
      <h2 class="hover" :class="inout == 'out' ? 'seleted' : ''" style="margin-left: 100px;" @click="outFc">出厂</h2>
    </div>
    <h2 style="margin-top: 20px;">{{ `${inout == 'in' ? '进厂' : '出厂'}车皮信息查询` }}</h2>
    <a-form ref="formRef1" name="advanced_search1" :model="formState1">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item name="A" label="当前位置(现车)">
            <a-select placeholder="当前位置(现车)" v-model:value="formState1[`A`]" :options="options1"
              @change="handleChange1">
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item name="B" label="进厂车次">
            <a-input v-model:value="formState1[`B`]" placeholder="进厂车次"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item name="C" label="物料名称">
            <a-select placeholder="物料名称" v-model:value="formState1[`C`]" :options="options2" @change="handleChange2">
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item name="D" label="车号">
            <a-input v-model:value="formState1[`D`]" placeholder="车号"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="6" v-show="expand">
          <a-form-item name="E" label="进厂时间">
            <a-date-picker style="width: 100%;" value-format="YYYY-MM-DD" v-model:value="formState1[`E`]"
              placeholder="进厂时间" />
          </a-form-item>
        </a-col>
        <a-col :span="6" v-show="expand">
          <a-form-item name="F" label="车皮状态">
            <a-select placeholder="车皮状态" v-model:value="formState1[`F`]" :options="options3" @change="handleChange3">
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6" v-show="expand">
          <a-form-item name="G" label="班别">
            <a-select placeholder="班别" v-model:value="formState1[`G`]" :options="options4" @change="handleChange4">
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6" v-show="expand">
          <a-form-item name="H" label="班次">
            <a-select placeholder="班次" v-model:value="formState1[`H`]" :options="options5" @change="handleChange5">
            </a-select>
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
        <a-radio-group v-model:value="radio" @change="radioChange" style="transform: scale(1.2);margin-left: 40px;">
          <a-radio :value="1">按车次</a-radio>
          <a-radio :value="2">按车皮</a-radio>
        </a-radio-group>
        <div class="right-tool">
          <a-button style="padding: 4px 0; margin-right:8px;" type="link" @click="handleExcel" v-btnDebounce>导出
          </a-button>
          <a-button style="padding: 4px 0;" type="link" @click="handlePrint" v-btnDebounce>打印</a-button>
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

const tableScroll = ref({ y: 0 })
const antdTable = ref<FormInstance>()
onMounted(() => {
  tableScroll.value.y = antdTable.value?.$el.clientHeight - 55
  console.log('onMounted')
})

onUpdated(() => {
  tableScroll.value.y = antdTable.value?.$el.clientHeight - 55
  console.log('onUpdated')
})

const originData1 = { A: '1', B: null, C: '1', D: null, E: null, F: '1', G: '1', H: '1' }
const formRef1 = ref<FormInstance>()
const formState1 = ref({ ...originData1 })
const elFlag = ref(true)
const inout = ref('in')
const expand = ref(false)
const options1 = ref<SelectProps['options']>([
  {
    value: '1',
    label: '全部',
  }
])
const options2 = ref<SelectProps['options']>([
  {
    value: '1',
    label: '全部',
  }
])
const options3 = ref<SelectProps['options']>([
  {
    value: '1',
    label: '全部',
  }
])
const options4 = ref<SelectProps['options']>([
  {
    value: '1',
    label: '全部',
  },
  {
    value: '2',
    label: '甲班',
  },
  {
    value: '3',
    label: '乙班',
  },
  {
    value: '4',
    label: '丙班',
  },
  {
    value: '5',
    label: '丁班',
  }
])

const options5 = ref<SelectProps['options']>([
  {
    value: '1',
    label: '全部',
  },
  {
    value: '2',
    label: '白班',
  },
  {
    value: '3',
    label: '中班',
  },
  {
    value: '4',
    label: '夜班',
  }
])

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

const radio = ref<number>(1)
const radioChange = (value: any) => {
  console.log(value.target.value);
}

const enterFc = () => {
  inout.value = 'in'
}

const outFc = () => {
  inout.value = 'out'
}

const isExpand = async () => {
  expand.value = !expand.value
  await nextTick()
  // vue3通过ref来获取dom元素
  // console.log(formRef1.value?.$el)
  if (formRef1.value?.$el.clientHeight > 88) {
    elFlag.value = false
  } else {
    elFlag.value = true
  }
}
const handleChange1 = (value: string) => {
  console.log(`selected1 ${value}`)
}

const handleChange2 = (value: string) => {
  console.log(`selected2 ${value}`)
}

const handleChange3 = (value: string) => {
  console.log(`selected3 ${value}`)
}
const handleChange4 = (value: string) => {
  console.log(`selected4 ${value}`)
}
const handleChange5 = (value: string) => {
  console.log(`selected5 ${value}`)
}
const submit = () => {
  console.log('submit formState1: ', formState1)
}

const reset = () => {
  formRef1.value?.resetFields()
  formState1.value = { ...originData1 }
  console.log('reset formState1: ', formState1)
}

const handleExcel = () => {
  console.log(11);
}

const handlePrint = () => {
  console.log(11);
}

const sizeChange = (page: number, pageSize: number) => {
  console.log('sizeChange', page, pageSize)

}

const currentChange = (current: number, pageSize: number) => {
  console.log('currentChange', current, pageSize);
}

</script>

<style lang="scss" scoped>
.inout {
  display: flex;

  .hover {
    cursor: pointer;

    &:hover {
      color: #16a8ff;
    }
  }

  .seleted {
    position: relative;

    &::after {
      content: "";
      width: 51px;
      height: 5px;
      background-color: #16a8ff;
      position: absolute;
      left: -4px;
      bottom: -6px;
    }
  }
}

.ant-form {
  margin-top: 20px;
}

.bottom-table-fold {
  height: calc(100% - 210px);
}

.bottom-table-expand {
  height: calc(100% - 266px);
}

.table-tool {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 32px;
  height: 32px;
}

.ant-radio-inner {
  width: 32px;
  height: 32px;
}

.table-bar {
  height: calc(100% - 52px);
  margin: 20px 20px 0 20px;
}

.table-bar>.ant-table-wrapper:first-child {
  height: calc(100% - 52px);
  overflow: auto;
}

.ant-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>