<template>
  <div>
    <a-button
      type="primary"
      class="editable-add-btn"
      @click="handleAdd"
      style="margin-bottom: 8px"
    >
      新增
    </a-button>
    <a-table
      bordered
      :data-source="dataSource"
      :columns="columns"
      rowKey="id"
      :pagination="{
        total: serieQuery.pagination.total,
        current: serieQuery.pagination.page,
        pageSize: serieQuery.pagination.size,
      }"
      @change="paginationChange"
    >
      <template #name="{ text, record }">
        <div class="editable-cell">
          <div
            v-if="editableData[record.id]"
            class="editable-cell-input-wrapper"
          >
            <a-input
              v-focus
              v-model:value="editableData[record.id].name"
              @pressEnter="save(record.id)"
            />
            <check-outlined
              class="editable-cell-icon-check"
              @click="save(record.id)"
            />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || '' }}
            <edit-outlined
              class="editable-cell-icon"
              @click="edit(record.id)"
            />
          </div>
        </div>
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
      <template #expandedRowRender="{ record }">
        <a-empty v-if="isEmpty(record.article)" />
        <a-list
          item-layout="horizontal"
          :data-source="sortBy(record.article, 'pivot.page')"
          v-else
        >
          <template #renderItem="{ item }">
            <a-list-item>
              <template #extra>
                <p>第{{ item.pivot.page + 1 }}篇</p>
              </template>
              <a-list-item-meta :description="item.articleDetil.description">
                <template #title>
                  {{ item.title }}
                </template>
                <template #avatar>
                  <a-avatar :src="item.thumb" />
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </template>
    </a-table>

    <a-modal
      v-model:visible="addVisible"
      title="新增文章分類"
      :footer="null"
      width="80%"
    >
      <add />
    </a-modal>
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
    onMounted,
    defineComponent,
    reactive,
    ref,
    provide,
    toRaw,
    unref,
  } from 'vue'
  import {
    CheckOutlined,
    EditOutlined,
    DeleteFilled,
    EditFilled,
  } from '@ant-design/icons-vue'
  import { cloneDeep, isEmpty, sortBy } from 'lodash-es'
  import { message } from 'ant-design-vue'
  import { parseTime, searchTreeArray } from '@/utils//index.js'
  import mybus from '@/utils/mybus.js'

  import { getSerie, patchSerie, deleteSerie } from '@/api/serie.js'
  import { getCategorie } from '@/api/categories.js'
  import { getArticle } from '@/api/article.js'

  import add from './components/add.vue'
  import edit from './components/edit.vue'

  export default defineComponent({
    name: 'Series',
    components: {
      CheckOutlined,
      EditOutlined,
      DeleteFilled,
      EditFilled,
      add,
      edit,
    },
    setup() {
      const columns = [
        {
          title: '系列名',
          dataIndex: 'name',
          slots: {
            customRender: 'name',
          },
        },
        {
          title: '文章分類',
          dataIndex: 'categorie.name',
        },
        {
          title: '創建日期',
          dataIndex: 'updatedAt',
          customRender: ({ text }) => {
            return parseTime(text, '{y}-{m}-{d} {h}:{i}')
          },
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
      // 查詢
      const articleQuery = reactive({
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
      const serieQuerytTotal = ref(0)
      // 查詢
      const serieQuery = reactive({
        // 分頁
        pagination: {
          total: 0,
          // 每頁數量
          size: 10,
          // 頁數
          page: 1,
        },
        // 篩選條件
        where: {},
      })
      const dataSource = ref([])
      const categoriesTreeData = ref([
        {
          id: 0,
          name: '頂級目錄',
          children: '',
        },
      ])
      // 數據
      const articlesSource = ref([])

      const editableData = reactive({})
      const addVisible = ref(false)
      const editVisible = ref(false)
      provide('categoriesTreeData', categoriesTreeData)
      provide('articlesSource', articlesSource)

      onMounted(() => {
        getCategorieApi()
        getarticlesApi()
        getListApi()
      })

      // 獲取 Categorie 數據
      const getCategorieApi = async () => {
        const { result } = await getCategorie()
        categoriesTreeData.value[0].children = result
      }
      // 獲取 article 數據
      const getarticlesApi = async () => {
        const { list, pagination } = await getArticle(articleQuery)
        articlesSource.value = list
        articleQuery.pagination.size = pagination.size
        articleQuery.pagination.page = pagination.page
      }

      // 獲取數據
      const getListApi = async () => {
        const { list, pagination } = await getSerie(serieQuery)
        dataSource.value = list
        serieQuery.pagination.total = pagination.total
        serieQuery.pagination.size = pagination.size
        serieQuery.pagination.page = pagination.page
      }
      // 切換分頁
      const paginationChange = (pagination) => {
        serieQuery.pagination.page = pagination.current
        serieQuery.pagination.size = pagination.pageSize
        getListApi()
      }

      const edit = async (key) => {
        editableData[key] = cloneDeep(
          await searchTreeArray(dataSource.value, 'id', key)
        )
      }

      const save = async (key) => {
        await patchSerie(key, { name: editableData[key].name })
        let data = await searchTreeArray(dataSource.value, 'id', key)
        data.name = editableData[key].name
        message.success('修改成功')
        delete editableData[key]
      }

      const onDelete = async (key) => {
        await deleteSerie(key)
        getListApi()
      }

      const handleAdd = () => {
        addVisible.value = true
      }
      const handleEdit = (val) => {
        mybus.emit('serieEditDate', {
          val: toRaw(val),
        })
        editVisible.value = true
      }
      // 新增成功事件調用
      mybus.on('serieAdd', () => {
        addVisible.value = false
        getListApi()
      })
      // 修改成功事件調用
      mybus.on('serieEdit', () => {
        editVisible.value = false
        getListApi()
      })

      return {
        columns,
        onDelete,
        handleAdd,
        dataSource,
        editableData,
        edit,
        save,
        parseTime,
        addVisible,
        editVisible,
        handleEdit,
        isEmpty,
        sortBy,
        serieQuerytTotal,
        paginationChange,
        serieQuery,
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
