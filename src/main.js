import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vant from 'vant'
import store from './store'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './styles/index.less'

Vue.use(VeeValidate, {
  // 配置改变的时候触发校验，默认是input
  events: ''
})
Validator.localize('zh_CN', zhCN)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
