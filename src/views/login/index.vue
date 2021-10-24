<template>
  <div class="login-container">
    <a-row>
      <a-col :xs="0" :md="0" :sm="12" :lg="14" :xl="16"></a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="6">
        <div class="login-container-form">
          <div class="login-container-hello">hello!</div>
          <div class="login-container-title">歡迎來到 {{ title }}</div>
          <a-form :model="form" @submit="handleSubmit" @submit.prevent>
            <a-form-item>
              <a-input v-model:value="form.email" placeholder="email">
                <template v-slot:prefix>
                  <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-model:value="form.password"
                type="password"
                placeholder="Password"
              >
                <template v-slot:prefix>
                  <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                :disabled="form.email === '' || form.password === ''"
              >
                登錄
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>
    <div class="login-container-tips">
      基於vue{{ dependencies['vue'] }}
      + ant-design-vue
      {{ dependencies['ant-design-vue'] }}開發
    </div>
  </div>
</template>
<script>
  import { dependencies, devDependencies } from '*/package.json'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

  import { useStore } from 'vuex'
  import { useRouter, useRoute } from 'vue-router'
  import { reactive, computed, watch, ref } from 'vue'

  export default {
    name: 'Login',
    components: {
      UserOutlined,
      LockOutlined,
    },
    setup() {
      const store = useStore()
      const router = useRouter()
      const route = useRoute()
      let redirect = ref(undefined)
      const form = reactive({
        email: '',
        password: '',
      })

      const logo = computed(() => store.getters['settings/logo'])
      const title = computed(() => store.getters['settings/title'])

      function handleRoute() {
        return redirect.value === '/404' || redirect.value === '/403'
          ? '/'
          : redirect.value
      }

      async function handleSubmit() {
        await store.dispatch('user/login', form)
        await router.push(handleRoute())
      }

      watch(
        route,
        (route) => {
          redirect.value = (route.query && route.query.redirect) || '/'
        },
        { immediate: true }
      )

      return {
        handleSubmit,
        form,
        devDependencies,
        dependencies,
        logo,
        title,
      }
    },
  }
</script>
<style lang="less">
  .login-container {
    width: 100%;
    height: 100vh;
    background: url('~@/assets/login_images/login_background.png');
    background-size: cover;
    &-form {
      width: calc(100% - 40px);
      height: 380px;
      padding: 4vh;
      margin-top: calc((100vh - 380px) / 2);
      margin-right: 20px;
      margin-left: 20px;
      background: url('~@/assets/login_images/login_form.png');
      background-size: 100% 100%;
      border-radius: 10px;
      box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);
    }
    &-hello {
      font-size: 32px;
      color: #fff;
    }
    &-title {
      margin-bottom: 30px;
      font-size: 20px;
      color: #fff;
    }
    &-tips {
      position: fixed;
      bottom: @vab-margin;
      width: 100%;
      height: 40px;
      color: rgba(255, 255, 255, 0.856);
      text-align: center;
    }
    .ant-col {
      width: 100%;
      padding: 0 10px 0 10px;
    }
    .ant-input {
      height: 35px;
    }
    .ant-btn {
      width: 100%;
      height: 45px;
      border-radius: 99px;
    }
  }
</style>
