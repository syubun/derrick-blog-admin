<template>
  <div id="vue-admin-beautiful">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>
<script>
  import zhTW from 'ant-design-vue/es/locale/zh_TW'

  export default {
    name: 'App',
    data() {
      return {
        locale: zhTW,
      }
    },
  }
</script>
<style lang="less">
  @import '~@/vab/styles/vab.less';
  @import '~vditor/dist/index.css';
</style>
