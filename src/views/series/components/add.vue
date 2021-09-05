<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="系列名" v-bind="validateInfos.name">
      <a-input v-model:value="modelRef.name" />
    </a-form-item>
    <a-form-item label="系列描述">
      <div id="seriesAdd"></div>
    </a-form-item>
    <a-form-item label="類別區塊" v-bind="validateInfos.categorieId">
      <a-tree-select
        :treeDefaultExpandAll="true"
        :replaceFields="replaceFields"
        v-model:value="modelRef.categorieId"
        style="width: 100%"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        :tree-data="categoriesTreeData"
        placeholder="請選擇父級分類"
      ></a-tree-select>
    </a-form-item>
    <a-form-item label="文章">
      <a-transfer
        :data-source="articlesSource"
        :target-keys="modelRef.article"
        :show-select-all="false"
        @change="onChange"
        :rowKey="(record) => record.id"
      >
        <template
          #children="{
            direction,
            filteredItems,
            selectedKeys,
            disabled: listDisabled,
            onItemSelectAll,
            onItemSelect,
          }"
        >
          <a-table
            :row-selection="
              getRowSelection({
                disabled: listDisabled,
                selectedKeys,
                onItemSelectAll,
                onItemSelect,
              })
            "
            :columns="direction === 'left' ? leftColumns : rightColumns"
            :data-source="filteredItems"
            size="small"
            :style="{ pointerEvents: listDisabled ? 'none' : null }"
            :custom-row="
              ({ key, disabled: itemDisabled }) => ({
                onClick: () => {
                  if (itemDisabled || listDisabled) return
                  onItemSelect(key, !selectedKeys.includes(key))
                },
              })
            "
          />
        </template>
      </a-transfer>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click.prevent="onSubmit">創建</a-button>
      <a-button style="margin-left: 10px" @click="resetFields">重置</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
  import { defineComponent, reactive, toRaw, inject, ref, onMounted } from 'vue'
  import { Form, message } from 'ant-design-vue'
  import Vditor from 'vditor'

  import { createSerie } from '@/api/serie.js'

  import mybus from '@/utils/mybus.js'
  import { difference, without } from 'lodash-es'

  export default defineComponent({
    setup() {
      onMounted(() => {
        dealWithTreeData(categoriesTreeData.value)
        initVditor()
      })
      const contentEditor = ref()
      const categoriesTreeData = inject('categoriesTreeData')
      const articlesSource = inject('articlesSource')

      const dealWithTreeData = (val) => {
        for (const iterator of val) {
          if (iterator.children) {
            iterator.disabled = true
            dealWithTreeData(iterator.children)
          }
        }
      }

      const replaceFields = {
        title: 'name',
        value: 'id',
      }

      const modelRef = reactive({
        name: '',
        description: '',
        categorieId: undefined,
        article: [],
      })
      const rulesRef = reactive({
        name: [
          {
            required: true,
            message: '請輸入名稱',
          },
        ],
        categorieId: [
          {
            required: true,
            message: '請選擇父級',
          },
        ],
      })

      const showSearch = ref(false)
      const leftColumns = ref([
        {
          dataIndex: 'title',
          title: '文章標題',
        },
      ])
      const rightColumns = ref([
        {
          dataIndex: 'title',
          title: '文章標題',
        },
        {
          title: '系列排序',
          customRender: (data) => {
            return `第${data.index + 1}篇`
          },
        },
      ])

      const { resetFields, validate, validateInfos } = Form.useForm(
        modelRef,
        rulesRef
      )
      const onSubmit = () => {
        validate().then(async () => {
          await createSerie(toRaw(modelRef))
          message.success('新增系列成功')
          initVditor()
          // 重置
          resetFields()
          // 關閉 add model
          mybus.emit('serieAdd')
        })
      }

      const onChange = (targetKeys, direction, moveKeys) => {
        if (direction === 'right') {
          modelRef.article = modelRef.article.concat(moveKeys)
        } else {
          modelRef.article = without(modelRef.article, ...moveKeys)
        }
      }

      const getRowSelection = ({
        disabled,
        selectedKeys,
        onItemSelectAll,
        onItemSelect,
      }) => {
        return {
          getCheckboxProps: (item) => ({
            disabled: disabled || item.disabled,
          }),

          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter((item) => !item.disabled)
              .map(({ key }) => key)
            const diffKeys = selected
              ? difference(treeSelectedKeys, selectedKeys)
              : difference(selectedKeys, treeSelectedKeys)
            onItemSelectAll(diffKeys, selected)
          },

          onSelect({ key }, selected) {
            onItemSelect(key, selected)
          },

          selectedRowKeys: selectedKeys,
        }
      }

      // md 編輯器
      const initVditor = () => {
        contentEditor.value = new Vditor('seriesAdd', {
          height: 360,
          lang: 'zh_TW',
          input: (value) =>
            (modelRef.description = value === '\n' ? '' : value),
          outline: {
            enable: true,
            position: 'right',
          },
          cache: {
            enable: false,
          },
          preview: {
            actions: ['desktop', 'tablet', 'mobile'],
            markdown: {
              autoSpace: false,
              fixTermTypo: true,
            },
            mode: 'both',
            hljs: {
              lineNumber: true,
            },
          },
          tab: '    ',
          resize: {
            enable: true,
          },
          placeholder: '請輸入 MD 格式',
          after: () => {
            contentEditor.value.setValue(modelRef.description)
          },
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
        categoriesTreeData,
        replaceFields,
        articlesSource,
        showSearch,
        leftColumns,
        rightColumns,
        onChange,
        getRowSelection,
      }
    },
  })
</script>
