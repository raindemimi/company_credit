import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
// axios默认的请求方式,可以自己设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8800/api/'
Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.filter('dateFormat', function (date) {
  const dt = new Date(date)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1).toString().padStart(2, '0')
  const d = dt
    .getDate()
    .toString()
    .padStart(2, '0')
  const hh = dt
    .getHours()
    .toString()
    .padStart(2, '0')
  const mm = dt
    .getMinutes()
    .toString()
    .padStart(2, '0')
  const ss = dt
    .getSeconds()
    .toString()
    .padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
