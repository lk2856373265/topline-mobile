import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vant, { Lazyload } from 'vant'
import store from './store'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './styles/index.less'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 加载中文语言包
import relativeTime from 'dayjs/plugin/relativeTime' // dayjs的相对时间插件

dayjs.extend(relativeTime) // 把插件注册到dayjs中
dayjs.locale('zh-cn') // 配置使用中文语言包
console.log(dayjs().from(dayjs('2018-12-01')))
Vue.use(VeeValidate, {
  // 配置改变的时候触发校验，默认是input
  events: ''
})
Validator.localize('zh_CN', zhCN)

Vue.use(Vant)
Vue.use(Lazyload)

Vue.config.productionTip = false
Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
