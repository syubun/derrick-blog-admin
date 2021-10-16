<template>
  <a-card class="version-information">
    <template v-slot:title>Blog 相關資訊</template>
    <div class="version-information-table" v-if="!isEmpty(blogData)">
      <table>
        <tr class="editable-cell">
          <td>版主暱稱</td>
          <td class="editable-cell-text-wrapper">
            <div v-if="editableStatus.name" class="editable-cell-input-wrapper">
              <a-input
                v-focus
                v-model:value="editableData.name"
                @pressEnter="save('name')"
              />
              <check-outlined
                class="editable-cell-icon-check"
                @click="save('name')"
              />
            </div>
            <div v-else>
              {{ blogData.name }}
              <edit-outlined
                class="editable-cell-icon"
                @click="edit('name', blogData.name)"
              />
            </div>
          </td>
          <td>主題樣式</td>
          <td>
            <div
              v-if="editableStatus.blogThemeStyle"
              class="editable-cell-input-wrapper"
            >
              <a-input
                v-focus
                v-model:value="editableData.blogThemeStyle"
                @pressEnter="save('blogThemeStyle')"
              />
              <check-outlined
                class="editable-cell-icon-check"
                @click="save('blogThemeStyle')"
              />
            </div>
            <div v-else>
              {{ blogData.blogThemeStyle }}
              <edit-outlined
                class="editable-cell-icon"
                @click="edit('blogThemeStyle', blogData.blogThemeStyle)"
              />
            </div>
          </td>
        </tr>
        <tr class="editable-cell">
          <td>部落格創建日期</td>
          <td class="editable-cell-text-wrapper" colspan="3">
            <div
              v-if="editableStatus.blogCreateTime"
              class="editable-cell-input-wrapper"
            >
              <a-input
                v-focus
                v-model:value="editableData.blogCreateTime"
                @pressEnter="save('blogCreateTime')"
              />
              <check-outlined
                class="editable-cell-icon-check"
                @click="save('blogCreateTime')"
              />
            </div>
            <div v-else>
              {{ blogData.blogCreateTime }}
              <edit-outlined
                class="editable-cell-icon"
                @click="edit('blogCreateTime', blogData.blogCreateTime)"
              />
            </div>
          </td>
        </tr>
        <tr class="editable-cell">
          <td>作者自介</td>
          <td class="editable-cell-text-wrapper" colspan="3">
            <div
              v-if="editableStatus.introduction"
              class="editable-cell-input-wrapper"
            >
              <a-input
                v-focus
                v-model:value="editableData.introduction"
                @pressEnter="save('introduction')"
              />
              <check-outlined
                class="editable-cell-icon-check"
                @click="save('introduction')"
              />
            </div>
            <div v-else>
              {{ blogData.introduction }}
              <edit-outlined
                class="editable-cell-icon"
                @click="edit('introduction', blogData.introduction)"
              />
            </div>
          </td>
        </tr>
        <tr class="editable-cell">
          <td>頭像</td>
          <td colspan="3">
            <div
              v-if="editableStatus.avatarPath"
              class="editable-cell-input-wrapper"
            >
              <a-upload
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                action="http://laravel8.blog.com/api/admin/file"
                @change="avatarPathHandleChange"
              >
                <a-image
                  v-if="avatarPathImageUrl"
                  :width="300"
                  :src="avatarPathImageUrl"
                  :preview="false"
                />
                <div v-else>
                  <loading-outlined v-if="loading"></loading-outlined>
                  <plus-outlined v-else></plus-outlined>
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
              <check-outlined
                class="editable-cell-icon-check"
                @click="save('avatarPath')"
              />
            </div>
            <div v-else>
              <a-image :width="200" :src="blogData.avatarPath" />
              <edit-outlined
                class="editable-cell-icon"
                @click="edit('avatarPath', blogData.avatarPath)"
              />
            </div>
          </td>
        </tr>
        <tr class="editable-cell">
          <td>Blog底圖</td>
          <td colspan="3">
            <div
              v-if="editableStatus.blogBigBackImg"
              class="editable-cell-input-wrapper"
            >
              <a-upload
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                action="http://laravel8.blog.com/api/admin/file"
                @change="blogBigBackImgChange"
              >
                <a-image
                  v-if="blogBigBackImgUrl"
                  :width="300"
                  :src="blogBigBackImgUrl"
                  :preview="false"
                />
                <div v-else>
                  <loading-outlined v-if="loading"></loading-outlined>
                  <plus-outlined v-else></plus-outlined>
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
              <check-outlined
                class="editable-cell-icon-check"
                @click="save('blogBigBackImg')"
              />
            </div>
            <div v-else>
              <a-image :width="200" :src="blogData.blogBigBackImg" />
              <edit-outlined
                class="editable-cell-icon"
                @click="edit('blogBigBackImg', blogData.blogBigBackImg)"
              />
            </div>
          </td>
        </tr>
        <tr class="editable-cell">
          <td>Blog下方資訊</td>
          <td class="editable-cell-text-wrapper" colspan="3">
            <div
              v-if="editableStatus.blogBottomNarrate"
              class="editable-cell-input-wrapper"
            >
              <a-input
                v-focus
                v-model:value="editableData.blogBottomNarrate"
                @pressEnter="save('blogBottomNarrate')"
              />
              <check-outlined
                class="editable-cell-icon-check"
                @click="save('blogBottomNarrate')"
              />
            </div>
            <div v-else>
              {{ blogData.blogBottomNarrate }}
              <edit-outlined
                class="editable-cell-icon"
                @click="edit('blogBottomNarrate', blogData.blogBottomNarrate)"
              />
            </div>
          </td>
        </tr>
        <tr></tr>
        <tr class="editable-cell">
          <td>作者github</td>
          <td class="editable-cell-text-wrapper" colspan="3">
            <div
              v-if="editableStatus.contactGithub"
              class="editable-cell-input-wrapper"
            >
              <a-form-item label="Github 帳號">
                <a-input
                  v-focus
                  v-model:value="editableData.contactGithub"
                  @pressEnter="save('contactGithub')"
                />
                <check-outlined
                  class="editable-cell-icon-check"
                  @click="save('contactGithub')"
                />
              </a-form-item>
            </div>
            <div v-else>
              {{ `https://github.com/${blogData.contactGithub}` }}
              <edit-outlined
                class="editable-cell-icon"
                @click="edit('contactGithub', blogData.contactGithub)"
              />
            </div>
          </td>
        </tr>
        <tr class="editable-cell">
          <td>作者email</td>
          <td class="editable-cell-text-wrapper" colspan="3">
            <div
              v-if="editableStatus.contactEmail"
              class="editable-cell-input-wrapper"
            >
              <a-input
                v-focus
                v-model:value="editableData.contactEmail"
                @pressEnter="save('contactEmail')"
              />
              <check-outlined
                class="editable-cell-icon-check"
                @click="save('contactEmail')"
              />
            </div>
            <div v-else>
              {{ blogData.contactEmail }}
              <edit-outlined
                class="editable-cell-icon"
                @click="edit('contactEmail', blogData.contactEmail)"
              />
            </div>
          </td>
        </tr>
      </table>
    </div>
  </a-card>
</template>
<script>
  import { getBlogInfoDetailApi, patchBlogInfo } from '@/api/blogInfo.js'
  import { articleCountApi } from '@/api/article.js'
  import { reactive, ref } from 'vue'
  import { useStore } from 'vuex'
  import { patchUser } from '@/api/user.js'
  import { getBase64 } from '@/utils/image.js'

  import { isEmpty } from 'lodash-es'
  import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
  import { message } from 'ant-design-vue'

  export default {
    components: {
      EditOutlined,
      CheckOutlined,
    },
    setup() {
      const blogInfoId = 1
      const store = useStore()
      const avatarPathImageUrl = ref('')
      const blogBigBackImgUrl = ref('')
      const loading = ref(false)
      const blogData = reactive({
        name: '',
        blogThemeStyle: '',
        introduction: '',
        avatarPath: '',
        blogBigBackImg: '',
        blogBottomNarrate: '',
        contactGithub: '',
        contactEmail: '',
        blogCreateTime: '',
      })
      const articleCount = ref({})
      const editableData = reactive({
        name: '',
        blogThemeStyle: '',
        introduction: '',
        avatarPath: '',
        blogBigBackImg: '',
        blogBottomNarrate: '',
        contactGithub: '',
        contactEmail: '',
        blogCreateTime: '',
      })
      const editableStatus = reactive({
        blogThemeStyle: false,
        blogBigBackImg: false,
        blogBottomNarrate: false,
        name: false,
        introduction: false,
        avatarPath: false,
        contactGithub: false,
        contactEmail: false,
        blogCreateTime: false,
      })

      async function save(status) {
        switch (status) {
          case 'name':
          case 'introduction':
          case 'contactEmail':
          case 'contactGithub':
          case 'avatarPath':
            let formData = new FormData()
            formData.append(status, editableData[status])
            await patchUser(formData)
            if (status === 'name') {
              store.commit('user/setUsername', editableData[status])
            }
            break
          default:
            let formData2 = new FormData()
            formData2.append(status, editableData[status])
            await patchBlogInfo(blogInfoId, formData2)
            break
        }
        blogData[status] = editableData[status]
        message.success('修改成功')
        editableStatus[status] = false
      }
      function edit(status, data) {
        editableData[status] = data
        editableStatus[status] = true
      }
      function init() {
        getBlogInfoDetail()
        getArticleCount()
      }
      async function getBlogInfoDetail() {
        const { result } = await getBlogInfoDetailApi(blogInfoId)
        blogData.name = result.user.name
        blogData.blogThemeStyle = result.blogThemeStyle
        blogData.blogCreateTime = result.blogCreateTime
        blogData.introduction = result.user.detail.introduction
        blogData.avatarPath = result.user.detail.avatar.url
        blogData.blogBigBackImg = result.blogBigBackImg
        blogData.blogBottomNarrate = result.blogBottomNarrate
        blogData.contactGithub = result.user.detail.contactGithub
        blogData.contactEmail = result.user.detail.contactEmail
      }
      async function getArticleCount() {
        const { result } = await articleCountApi()
        articleCount.value = result
      }
      init()

      // 上傳圖片callback
      const avatarPathHandleChange = (info) => {
        if (info.file.status === 'uploading') {
          loading.value = true
          return
        }
        if (info.file.status === 'done') {
          avatarPathImageUrl.value = info.file.response.result.url
          editableData.avatarPath = info.file.response.result.url
          save('avatarPath')
        }
        if (info.file.status === 'error') {
          loading.value = false
          message.error('upload error')
        }
      }
      // 上傳圖片callback
      const blogBigBackImgChange = (info) => {
        if (info.file.status === 'uploading') {
          loading.value = true
          return
        }
        if (info.file.status === 'done') {
          blogBigBackImgUrl.value = info.file.response.result.url
          editableData.blogBigBackImg = info.file.response.result.url
          save('blogBigBackImg')
        }
        if (info.file.status === 'error') {
          loading.value = false
          message.error('upload error')
        }
      }

      return {
        blogData,
        articleCount,
        isEmpty,
        editableStatus,
        editableData,
        save,
        edit,
        avatarPathHandleChange,
        avatarPathImageUrl,
        blogBigBackImgChange,
        blogBigBackImgUrl,
      }
    },
  }
</script>
<style lang="less" scoped>
  .editable-cell {
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
  .version-information {
    margin-top: @vab-margin;
    &-table {
      width: 100%;
      overflow: scroll;
      table {
        width: 100%;
        color: #666;
        border-collapse: collapse;
        background-color: #fff;

        td {
          position: relative;
          padding: 9px 15px;
          font-size: 14px;
          line-height: 20px;
          border: 1px solid #e6e6e6;

          &:nth-child(odd) {
            width: 20%;
            text-align: right;
            background-color: #f7f7f7;
          }
        }
      }
    }
  }
</style>
