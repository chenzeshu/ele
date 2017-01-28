import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import  mutations from './mutations'

Vue.use(Vuex)

const state = {
  showDesc:false,
  selectFoods:[], //数组,因为数组可以包裹多个对象
  totalCount:0,
  totalPrice:null,
  seller:{},
  goods:{
    //food
  },
  ratings:[]
}


const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  // strict:debug
})
