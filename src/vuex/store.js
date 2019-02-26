import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)
const key = 'user'
// 应用初始状态
const state = {
        user: null
},

// 定义所需的 mutations
  mutations = {
    setStorage(state, value) {
        state.user = value
        localStorage.setItem(key,JSON.stringify(value))
    },
    removeStorage(state) {
        state.user = null
        localStorage.removeItem(key)
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})