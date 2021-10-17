/**
 * @description 導出默認通用配置
 */
const setting = {
  //開發以及部署時的URL，hash模式時在不確定二級目錄名稱的情況下建議使用""代表相對路徑或者"/二級目錄/"，history模式默認使用"/"或者"/二級目錄/"
  publicPath: '',
  //生產環境構建文件的目錄名
  outputDir: 'dist',
  //放置生成的靜態資源 (js、css、img、fonts) 的 (相對於 outputDir 的) 目錄。
  assetsDir: 'static',
  //開發環境每次保存時是否輸出為eslint編譯警告
  lintOnSave: true,
  //進行編譯的依賴
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  //默認的接口地址 如果是開發環境和生產環境走vab-mock-server，當然你也可以選擇自己配置成需要的接口地址
  baseURL: 'https://derrick-blog-backend.tk/api',
  //標題 （包括初次加載雪花屏的標題 頁面的標題 瀏覽器的標題）
  title: 'Blog-admin',
  //標題分隔符
  titleSeparator: ' - ',
  //標題是否反轉 如果為false:"page - title"，如果為ture:"title - page"
  titleReverse: false,
  //簡寫
  abbreviation: 'vab-pro',
  //開發環境端口號
  devPort: '9999',
  //版本號
  version: process.env.VUE_APP_VERSION,
  //pro版本copyright可隨意修改
  copyright: 'chuzhixin 1204505056@qq.com',
  //緩存路由的最大數量
  keepAliveMaxNum: 99,
  //路由模式，可選值為 history 或 hash
  routerMode: 'hash',
  //不經過token校驗的路由
  routesWhiteList: ['/login', '/register', '/callback', '/404', '/403'],
  //加載時顯示文字
  loadingText: '正在加載中...',
  //token名稱
  tokenName: 'token',
  //token在localStorage、sessionStorage、cookie存儲的key的名稱
  tokenTableName: 'token',
  //token存儲位置localStorage sessionStorage cookie
  storage: 'localStorage',
  //token失效回退到登錄頁時是否記錄本次的路由
  recordRoute: true,
  //是否顯示logo，不顯示時設置false，顯示時請填寫remixIcon圖標名稱，暫時只支持設置remixIcon
  logo: 'vuejs-fill',
  //語言類型zh、en
  i18n: 'zh',
  //在哪些環境下顯示高亮錯誤
  errorLog: ['development', 'production'],
  //是否開啟登錄攔截
  loginInterception: true,
  //是否開啟登錄RSA加密
  loginRSA: false,
  //intelligence（前端導出路由）和all（後端導出路由）兩種方式
  authentication: 'intelligence',
  //是否開啟roles字段進行角色權限控制（如果是all模式後端完全處理角色並進行json組裝，可設置false不處理路由中的roles字段）
  rolesControl: true,
  //vertical gallery comprehensive common布局時是否只保持一個子菜單的展開
  uniqueOpened: false,
  //vertical布局時默認展開的菜單path，使用逗號隔開建議只展開一個
  defaultOpeneds: ['/vab'],
  //需要加loading層的請求，防止重複提交
  debounce: ['doEdit'],
  //需要自動注入並加載的模塊
  providePlugin: {},
  //npm run build時是否自動生成7z壓縮包
  build7z: false,
  //代碼生成機生成在view下的文件夾名稱
  templateFolder: 'project',
  //是否顯示終端donation打印
  donation: false,
  //畫廊布局和綜合布局時，是否點擊一級菜單默認開啟第一個二級菜單
  openFirstMenu: true,
}
module.exports = setting
