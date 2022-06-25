import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import '@/assets/global.less'

// 引入 axios
import axios from '@/http/index.js'

// 引入 ElementUI
import ElementUI from 'element-ui'
// 引入 element-ui 的全局样式
import 'element-ui/lib/theme-chalk/index.css'
// 将 element-ui 安装为 Vue 的插件
Vue.use(ElementUI)

// 将 axios 挂载到 Vue.prototype 原型身上
// 目的就是将来组件中，想要发起请求的时候，不用每次都在组件引入 axios，而只需要通过 this.$http 就能够拿到 axios
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
