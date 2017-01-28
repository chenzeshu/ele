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
      let record = state.selectFoods.find(food=>food.name===f.name)
      //商品数量减一
      if(record.count&&record.count !==0){
        record.count --
        state.totalPrice = state.totalPrice - price
      }
      //注意：ES6的for of无法获取index
      state.selectFoods.forEach((food,index)=>{
          if (food.count == 0){
            state.selectFoods.splice(index,1)
          }
      })
      if (state.totalCount <= 0){
        return
      }else{
        state.totalCount --
      }
    },
    [types.EMPTY](state){
      state.totalCount = 0
    }

}
//判断空数组
function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}


