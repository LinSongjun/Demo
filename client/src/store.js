import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isToken: false,
  user: {}
}

const getters = {
  isToken: state => state.isToken,
  user: state => state.user
}

const mutations = {
  setIsToken(state, isToken) {
    if (isToken) {
      state.isToken = isToken
    } else {
      state.isToken = false
    }
  },
  setUser(state, user) {
    if (user) {
      state.user = user
    } else {
      state.user = {}
    }
  }
}

const actions = {
  setIsToken({commit}, isToken) {
    commit('setIsToken', isToken)
  },
  setUser({commit}, user) {
    commit('setUser', user)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
