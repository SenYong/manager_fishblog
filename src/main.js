import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'assets/css/iconfont.css'
import 'assets/css/common.css'
import { emoji } from './api/emoji.js'
Vue.use(ElementUI)
Vue.prototype.emoji = emoji
//import axios from 'axios'
//Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
