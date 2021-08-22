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
      <a-button type="primary" @click.prevent="onSubmit">創建</a-button>
      <a-button style="margin-left: 10px" @click="resetFields">重置</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
  import { defineComponent, reactive, toRaw, unref, inject } from 'vue'
  import { Form, message } from 'ant-design-vue'

  import { createCategorie } from '@/api/categories.js'
  import mybus from '@/utils/mybus.js'

  export default defineComponent({
    setup() {
      const treeData = [
        {
          id: 0,
          name: '頂級目錄',
          children: toRaw(unref(inject('dataSource'))),
        },
      ]
      console.log(treeData)
      const replaceFields = {
        title: 'name',
        value: 'id',
        key: 'id',
      }

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
            await createCategorie(toRaw(modelRef))
            message.success('新增類別成功')
            // 重置
            resetFields()
            // 關閉 add model
            mybus.emit('categoriesAdd')
          })
          .catch((err) => {
            console.log('error', err)
          })
      }

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
