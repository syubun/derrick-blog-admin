<template>
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
      total,
      current: query.pagination.page,
      pageSize: query.pagination.size,
    }"
    @change="paginationChange"
  >
    <template #created_at="{ text }">
      {{ text ? parseTime(text, '{y}-{m}-{d} {h}:{i}') : '' }}
    </template>
    <template #updated_at="{ text }">
      {{ text ? parseTime(text, '{y}-{m}-{d} {h}:{i}') : '' }}
    </template>
    <template #name="{ text, record }">
      <div class="editable-cell">
        <div v-if="editableData[record.id]" class="editable-cell-input-wrapper">
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
          <edit-outlined class="editable-cell-icon" @click="edit(record.id)" />
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
  </a-table>
  <!-- 
  <a-modal v-model:visible="addVisible" title="新增文章分類" :footer="null">
    <add />
  </a-modal>
  <a-modal
    v-model:visible="editVisible"
    :forceRender="true"
    title="編輯文章分類"
    :footer="null"
  >
    <edit />
  </a-modal> -->
</template>
<script>
  import {
    computed,
    defineComponent,
    reactive,
    ref,
    provide,
    toRaw,
    unref,
    onMounted,
  } from 'vue'
  import {
    CheckOutlined,
    EditOutlined,
    DeleteFilled,
    EditFilled,
  } from '@ant-design/icons-vue'
  import { cloneDeep } from 'lodash-es'
  import { message } from 'ant-design-vue'

  import { getArticle } from '@/api/article.js'
  import { parseTime, searchTreeArray, getChild } from '@/utils//index.js'
  import add from './components/add.vue'
  import edit from './components/edit.vue'
  import mybus from '@/utils/mybus.js'

  export default defineComponent({
    components: {
      CheckOutlined,
      EditOutlined,
      DeleteFilled,
      EditFilled,
      // add,
      // edit,
    },
    setup() {
      console.log('eee')
      const columns = [
        {
          title: '文章主題',
          dataIndex: 'title',
          slots: {
            customRender: 'title',
          },
        },
        {
          title: '創建日期',
          dataIndex: 'updated_at',
          slots: {
            customRender: 'updated_at',
          },
        },
        {
          title: '更新日期',
          dataIndex: 'created_at',
          slots: {
            customRender: 'created_at',
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
      // 總文章數
      const total = ref(0)
      // 查詢
      const query = reactive({
        // 分頁
        pagination: {
          // 每頁數量
          size: 1,
          // 頁數
          page: 1,
        },
        // 篩選條件
        where: {},
      })

      const count = computed(() => dataSource.value.length + 1)
      const editableData = reactive({})
      const addVisible = ref(false)
      const editVisible = ref(false)
      provide('dataSource', dataSource)

      // 獲取數據
      const getListApi = async () => {
        const { list, pagination } = await getArticle(query)
        dataSource.value = list
        total.value = pagination.total
        query.pagination.size = pagination.size
        query.pagination.page = pagination.page
      }

      onMounted(() => {
        getListApi()
      })
      // 切換分頁
      const paginationChange = (pagination) => {
        query.pagination.page = pagination.current
        query.pagination.size = pagination.pageSize
        getListApi()
      }

      const edit = async (key) => {
        editableData[key] = cloneDeep(
          await searchTreeArray(dataSource.value, 'id', key)
        )
      }

      const save = async (key) => {
        await patchCategorie(key, editableData[key])
        let data = await searchTreeArray(dataSource.value, 'id', key)
        data.name = editableData[key].name
        message.success('修改成功')
        delete editableData[key]
      }

      const onDelete = async (key) => {
        for (const iterator of getChild(dataSource.value, 'id', key, [])) {
          await deleteCategorie(iterator)
        }
        getListApi()
      }

      const handleAdd = () => {
        addVisible.value = true
      }
      const handleEdit = (val) => {
        mybus.emit('categoriesEditDate', {
          val: toRaw(val),
          dataSource: toRaw(unref(dataSource)),
        })
        editVisible.value = true
      }
      // 新增成功事件調用
      mybus.on('categoriesAdd', () => {
        addVisible.value = false
        getListApi()
      })
      // 修改成功事件調用
      mybus.on('categoriesEdit', () => {
        editVisible.value = false
        getListApi()
      })

      return {
        columns,
        onDelete,
        handleAdd,
        dataSource,
        editableData,
        count,
        edit,
        save,
        parseTime,
        addVisible,
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
