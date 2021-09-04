<template>
  <div>
    <router-link :to="{ name: 'articleAdd' }">
      <a-button
        type="primary"
        class="editable-add-btn"
        style="margin-bottom: 8px"
      >
        新增
      </a-button>
    </router-link>
    <a-table
      bordered
      :data-source="dataSource"
      :columns="columns"
      rowKey="id"
      :pagination="{
        total,
        current: query.pagination.page,
        pageSize: query.pagination.size,
      }"
      @change="paginationChange"
    >
      <template #thumb="{ text }">
        <a-image :width="100" :src="text" />
      </template>
      <template #tag="{ text }">
        <a-tag color="cyan" v-for="(n, k) in text" :key="k">{{ n }}</a-tag>
      </template>
      <template #operation="{ record }">
        <a-button type="primary" shape="circle" @click="handleEdit(record)">
          <EditFilled />
        </a-button>
        <a-popconfirm
          v-if="dataSource.length"
          title="確定要刪除?"
          @confirm="onDelete(record.id)"
        >
          <a-button type="primary" shape="circle" danger>
            <DeleteFilled />
          </a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <a-modal
      v-model:visible="editVisible"
      :forceRender="true"
      title="編輯文章分類"
      :footer="null"
      width="80%"
    >
      <edit />
    </a-modal>
  </div>
</template>
<script>
  import {
    defineComponent,
    reactive,
    ref,
    provide,
    toRaw,
    unref,
    onMounted,
  } from 'vue'
  import { DeleteFilled, EditFilled } from '@ant-design/icons-vue'

  import { getArticle, deleteArticle } from '@/api/article.js'
  import { getCategorie } from '@/api/categories.js'

  import edit from './components/edit.vue'

  import { parseTime } from '@/utils//index.js'
  import mybus from '@/utils/mybus.js'

  export default defineComponent({
    name: 'Article',
    components: {
      DeleteFilled,
      EditFilled,
      edit,
    },
    setup() {
      const columns = [
        {
          title: '文章縮略圖',
          dataIndex: 'thumb',
          slots: {
            customRender: 'thumb',
          },
        },
        {
          title: '文章標題',
          dataIndex: 'title',
        },
        {
          title: '文章作者',
          dataIndex: 'author',
        },
        {
          title: '文章標籤',
          dataIndex: 'articleDetil.tag',
          slots: {
            customRender: 'tag',
          },
        },
        {
          title: '文章瀏覽次數',
          dataIndex: 'articleDetil.view',
        },
        {
          title: '更新日期',
          dataIndex: 'createdAt',
          customRender: ({ text }) => {
            return parseTime(text, '{y}-{m}-{d} {h}:{i}')
          },
        },
        {
          title: '操作',
          dataIndex: 'operation',
          slots: {
            customRender: 'operation',
          },
        },
      ]
      // 數據
      const dataSource = ref([])
      // 類別區塊數據
      const categoriesData = ref([])
      // 總文章數
      const total = ref(0)
      // 查詢
      const query = reactive({
        // 分頁
        pagination: {
          // 每頁數量
          size: 10,
          // 頁數
          page: 1,
        },
        // 篩選條件
        where: {},
      })

      const editableData = reactive({})
      const editVisible = ref(false)
      provide('categoriesData', categoriesData)

      onMounted(() => {
        getListApi()
        getCategorieApi()
      })

      // 獲取數據
      const getListApi = async () => {
        const { list, pagination } = await getArticle(query)
        dataSource.value = list
        total.value = pagination.total
        query.pagination.size = pagination.size
        query.pagination.page = pagination.page
      }
      // 獲取數據
      const getCategorieApi = async () => {
        const { result } = await getCategorie()
        categoriesData.value = result
      }

      // 切換分頁
      const paginationChange = (pagination) => {
        query.pagination.page = pagination.current
        query.pagination.size = pagination.pageSize
        getListApi()
      }

      const onDelete = async (key) => {
        await deleteArticle(key)
        getListApi()
      }

      const handleEdit = (val) => {
        mybus.emit('articleEditDate', {
          val: toRaw(val),
        })
        editVisible.value = true
      }
      // 修改成功事件調用
      mybus.on('categoriesEdit', () => {
        editVisible.value = false
        getListApi()
      })
      return {
        columns,
        onDelete,
        dataSource,
        editableData,
        parseTime,
        editVisible,
        handleEdit,
        total,
        query,
        paginationChange,
      }
    },
  })
</script>
<style lang="less">
  .editable-cell {
    display: inline-flex;
    position: relative;
    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
      padding-right: 24px;
    }

    .editable-cell-text-wrapper {
      padding: 5px 24px 5px 5px;
    }

    .editable-cell-icon,
    .editable-cell-icon-check {
      position: absolute;
      right: 0;
      width: 20px;
      cursor: pointer;
    }

    .editable-cell-icon {
      margin-top: 4px;
      display: none;
    }

    .editable-cell-icon-check {
      line-height: 28px;
    }

    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
      color: #108ee9;
    }

    .editable-add-btn {
      margin-bottom: 8px;
    }
  }
  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }
</style>
