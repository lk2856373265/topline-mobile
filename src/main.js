import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vant from 'vant'
import store from './store'
import VeeValidate from 'vee-validate'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './styles/index.less'

Vue.use(VeeValidate)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
