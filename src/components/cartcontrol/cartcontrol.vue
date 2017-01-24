<template>
    <div class="cartcontrol">
      <div class="cart-decrease" v-show="food.count>0"
      @click="decreaseCart($event)">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add" @click="addCart($event)">
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
  import {set} from 'vue'
    export default {
        props:{
          food:{
              type:Object
          }
        },
        methods:{
           addCart(event){
               if (!event._constructed){
                   return;
               }
            if (!this.food.count){
              vue.set(this.food, count,1)
            }else{
                this.food.count++
            }
            this.$dispatch('cart.add',event.target)
           },
          decreaseCart(event){
            if (!event._constructed){
              return;
            }
            if (this.food.count){
              this.food.count--
            }
          }
        },
        data() {
            return {}
        },
        components: {}
    }
</script>


