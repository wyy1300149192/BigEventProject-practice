import Vue from "vue"
import Vuex from "vuex"
import axios from "../http"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: []
  },
  mutations: {
    // 请求后更新用户信息
    setUserInfo(state, value) {
      state.userInfo = value
    }
  },
  actions: {
    // 请求用户信息
    async getUserInfo(store) {
      const { data: res } = await axios.get("/my/userinfo")
      console.log(res)
      store.commit("setUserInfo", res.data)
    }
  }
})
