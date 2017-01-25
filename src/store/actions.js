import * as types from './mutation-types'

export const showDesc = ({ commit }) =>{
  commit(types.SHOW_MENU)
}

export const getGoods = ({ commit })=>{
  commit(types.GET_GOODS)
}

export const addSelectFoods = ({commit},payload)=>{
  commit(types.ADD_SELECT_FOODS,{ payload })
}

export const decreaseSelectFoods = ({commit},payload)=>{
  commit(types.DECREASE_SELECT_FOODS,{payload})
}

//todo 记录：内部 commit的参数需要带{}
//todo 接收端(mutations)的参数payload也带{}，并严格同名
