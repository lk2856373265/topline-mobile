// 1.npm install vuex

// 2.配置
import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'
// import { saveUser } from '../utils/auth';

Vue.use(Vuex)
// 3.创建容器实例
export default new Vuex.Store({
  state: {
    // 初始化的时候从本地存储获取数据，防止刷新丢失token
    user: auth.getUser()
  },
  mutations: {
    /**
     * 登录成功，调用mutation更新容器中的user状态
     */
    setUser (state, data) {
      state.user = data
      auth.saveUser(state.user)
    }
  },
  actions: {
  }
})
