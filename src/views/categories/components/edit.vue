<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="分類名" v-bind="validateInfos.name">
      <a-input v-model:value="modelRef.name" />
    </a-form-item>
    <a-form-item label="父級" v-bind="validateInfos.pid">
      <a-tree-select
        :treeDefaultExpandAll="true"
        :replaceFields="replaceFields"
        v-model:value="modelRef.pid"
        style="width: 100%"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        :tree-data="treeData"
        placeholder="請選擇父級分類"
      ></a-tree-select>
    </a-form-item>
    <a-form-item label="排序">
      <a-input-number v-model:value="modelRef.order" :min="0" :max="10" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click.prevent="onSubmit">修改</a-button>
      <a-button style="margin-left: 10px" @click="resetFields">重置</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
  import { defineComponent, reactive, toRaw, unref, ref } from 'vue'
  import { Form, message } from 'ant-design-vue'

  import { putCategorie } from '@/api/categories.js'
  import mybus from '@/utils/mybus.js'

  export default defineComponent({
    setup() {
      let treeData = ref()
      const replaceFields = {
        title: 'name',
        value: 'id',
        key: 'id',
      }
      const id = ref(undefined)
      const modelRef = reactive({
        name: '',
        pid: undefined,
        order: 0,
      })
      const rulesRef = reactive({
        name: [
          {
            required: true,
            message: '請輸入名稱',
          },
        ],
        pid: [
          {
            required: true,
            message: '請選擇父級',
          },
        ],
      })
      const { resetFields, validate, validateInfos } = Form.useForm(
        modelRef,
        rulesRef
      )
      const onSubmit = () => {
        validate()
          .then(async () => {
            await putCategorie(unref(id), toRaw(modelRef))
            message.success('修改類別成功')
            // 重置
            resetFields()
            // 關閉 add model
            mybus.emit('categoriesEdit')
          })
          .catch((err) => {
            console.log('error', err)
          })
      }

      mybus.on('categoriesEditDate', ({ val, dataSource }) => {
        id.value = val.id
        modelRef.name = val.name
        modelRef.pid = val.pid
        modelRef.order = val.order
        treeData.value = [
          {
            id: 0,
            name: '頂級目錄',
            children: toRaw(unref(dataSource)),
          },
        ]
      })
      return {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
        validateInfos,
        resetFields,
        modelRef,
        onSubmit,
        treeData,
        replaceFields,
      }
    },
  })
</script>
