<template>
    <div class="cartcontrol">
      <div class="cart-decrease" v-show="food.count>0"
      @click="decreaseCart(food,$event)">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add" @click="addCart(food,$event)">
        <span class="inner icon-add_circle"></span>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-decrease,.cart-add
      display inline-block
      vertical-align top
      .inner
        line-height 24px
        font-size 24px
        color rgb(0,160,220)
    .cart-count
      display inline-block
      width 24px
      text-align center
      line-height 24px
      font-size 10px
      color rgb(147,153,159)
</style>

<script>
import Vue from 'vue'
    export default {
        props:{
          food:{
              type:Object
          }
        },
        methods:{
           addCart(food,event){
               if (!event._constructed){
                   return;
               }
               if (!this.food.count){
                 Vue.set(this.food, 'count',1)//子组件不能影响父组件，但是set()可以
               }else{
                  this.food.count++
               }
               this.$store.dispatch('addSelectFoods',{food})
//            this.$store.dispatch('addCart',event.target) //试试这里换成本来的this.$dispatch()会有什么效果
           },
          decreaseCart(food,event){
            if (!event._constructed){
              return;
            }
            if (this.food.count){
              this.food.count--
            }
            this.$store.dispatch('decreaseSelectFoods',{food})
          }
        },
        data() {
            return {}
        },
        components: {}
    }
</script>


