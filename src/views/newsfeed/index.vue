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
        total,
        current: query.pagination.page,
        pageSize: query.pagination.size,
      }"
      @change="paginationChange"
    >
      <template #thumb="{ text }">
        <a-image :width="100" :src="text" />
      </template>
      <template #image="{ text }">
        <el-image
          style="width: 100px; height: 100px"
          :src="text[0]"
          :preview-src-list="text"
        ></el-image>
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
  import { ElImage } from 'element-plus'

  import { defineComponent, reactive, ref, toRaw, onMounted } from 'vue'
  import { DeleteFilled, EditFilled } from '@ant-design/icons-vue'

  import { getNewsfeedApi } from '@/api/newsfeed.js'

  import edit from './components/edit.vue'
  import add from './components/add.vue'

  import { parseTime } from '@/utils//index.js'
  import mybus from '@/utils/mybus.js'

  export default defineComponent({
    components: {
      ElImage,
      DeleteFilled,
      EditFilled,
      edit,
      add,
    },
    setup() {
      const addVisible = ref(false)
      const columns = [
        {
          title: '動態標題',
          dataIndex: 'title',
        },
        {
          title: '文章作者',
          dataIndex: 'user.name',
        },
        {
          title: '更新日期',
          dataIndex: 'createdAt',
          customRender: ({ text }) => {
            return parseTime(text, '{y}-{m}-{d} {h}:{i}')
          },
        },
        {
          title: '分享圖片',
          dataIndex: 'image',
          slots: {
            customRender: 'image',
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
          size: 5,
          // 頁數
          page: 1,
        },
        // 篩選條件
        where: {},
      })

      const editableData = reactive({})
      const editVisible = ref(false)

      onMounted(() => {
        getListApi()
      })

      // 獲取數據
      const getListApi = async () => {
        const { list, pagination } = await getNewsfeedApi(query)
        dataSource.value = list
        total.value = pagination.total
        query.pagination.size = pagination.size
        query.pagination.page = pagination.page
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
        mybus.emit('newsfeedEditDate', {
          val: toRaw(val),
        })
        editVisible.value = true
      }
      // 新增成功事件調用
      mybus.on('newsfeedAdd', () => {
        addVisible.value = false
        getListApi()
      })
      // 修改成功事件調用
      mybus.on('newsfeedEdit', () => {
        editVisible.value = false
        getListApi()
      })

      const handleAdd = () => {
        addVisible.value = true
      }

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
        handleAdd,
        addVisible,
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
