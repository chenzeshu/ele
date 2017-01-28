<template>
    <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease" v-show="food.count>0"
        @click.stop.prevent="decreaseCart(food,$event)">
          <span class="inner icon-remove_circle_outline"></span>
        </div>
      </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>

        <div class="cart-add" @click.stop.prevent="addCart(food,$event)">
          <span class="inner icon-add_circle"></span>
        </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding: 6px;
      .inner
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
      &.move-enter-active,&.move-leave-active
        transition: all .5s;
        transform: translate3d(0, 0, 0);
        .inner
          transition all .5s
          transform rotate(0deg)
      &.move-enter, &.move-leave-active
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner
          transform: rotate(360deg);
    .cart-count
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    .cart-add
      display: inline-block;
      line-height: 24px;
      font-size: 24px;
      padding: 6px;
      color: rgb(0, 160, 220);
</style>

<script>
import Vue from 'vue'
import Bus from 'common/js/EventBus'
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
               Bus.$emit('addCartAnimation',event.target) //试试这里换成本来的this.$dispatch()会有什么效果
           },
          decreaseCart(food,event){
            if (!event._constructed){
              return;
            }
            //move to mutations
//            if (this.food.count){
//              this.food.count--
//            }
            this.$store.dispatch('decreaseSelectFoods',{food})
          }
        },
        data() {
            return {}
        },
        components: {}
    }
</script>


