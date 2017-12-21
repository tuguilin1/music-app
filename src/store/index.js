/*
* @Author: tuguilin
* @Date:   2017-12-19 15:46:52
* @Last Modified by:   tuguilin
* @Last Modified time: 2017-12-19 16:58:01
*/
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})