import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: ''
  },
  mutations: {
    'editUser': function (state, usr) {
      state.user = usr
    }
  },
  getters: {

  },
  setter: {

  }
})

export default store
