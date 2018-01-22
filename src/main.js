import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'assets/css/common.css'
Vue.use(ElementUI)
Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
