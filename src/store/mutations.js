import * as types from './mutation-types'

const ERR_OK = 0

export default {
    [types.SHOW_MENU](state){
      state.showDesc =  !state.showDesc
    },
    [types.ADD_SELECT_FOODS](state,{payload}){
        let f = payload.food
        let price = f.price
        let record = state.selectFoods.filter(food=>food.name == f.name)
      if (isEmptyObject(record)){
          state.selectFoods.push(f)
        } else {
          record.count ++
        }
      //改变总价和总量
      state.totalPrice = state.totalPrice + price
      state.totalCount ++
    },
    [types.DECREASE_SELECT_FOODS](state,{payload}){
      let f = payload.food
      let price = f.price
      let record = state.selectFoods.filter(food=>food.name == f.name)
      //数量减一
      record.count --
      //改变总价和总量
      state.totalPrice = state.totalPrice - price

      if (state.totalCount <= 0){
        return
      }else{
        state.totalCount --
      }
    }
}

//判断空数组
function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}
