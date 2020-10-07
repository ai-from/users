import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAdmin: false
  },
  mutations: {
    SET_ADMIN_TRUE(state){
      state.isAdmin = true
    }
  },
  actions: {
    SET_ADMIN_TRUE({commit}){
      commit('SET_ADMIN_TRUE')
    }
  },
  getters: {
    GET_ADMIN_STATUS(state){
      return state.isAdmin
    }
  },
  modules: {
  }
})
