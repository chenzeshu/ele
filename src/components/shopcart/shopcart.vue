<template>
    <div class="shopcart" @click="test">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalPrice>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalPrice>0}"></i>
            </div>
            <div class="num" v-show="totalCount">
              {{totalCount}}
            </div>
          </div>
          <div class="price" :class="{'hignlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" v-if="totalPrice<minPrice">还差￥{{minPrice - totalPrice}}元起送</div>
          <div class="pay" v-if="totalPrice>minPrice"
            :class="{'hignlight':totalPrice>minPrice}">去结算</div>
        </div>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      color rgba(255,255,255,0.4)
      background #141d27
      .content-left
        flex 1
        font-size 0
        .logo-wrapper
          display inline-block
          vertical-align: top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27  //注意,颜色没有继承，要重写，否则wrapper颜色不会出来
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background rgb(0,160,220)
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            font-size 9px
            font-weight 700
            color #fff
            border-radius 12px
            background rgb(240,20,20)
        .price
          display inline-block
          vertical-align top
          line-height:24px
          margin-top:12px
          padding-right:12px
          box-sizing:border-box
          border-right:1px solid rgba(255,255,255,0.1)
          font-size:16px
          font-weight:700
          &.hignlight
            color #fff
        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        background #2b343c
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight:700
          &.hignlight
            color #fff
</style>

<script>
  import {mapGetters} from 'vuex'
    export default{
        props:{
          deliveryPrice:{
              type:Number
          },
          minPrice:{
              type:Number
          }
        },
        data(){
            return{
                msg:'hello vue'
            }
        },
        computed:{
          ...mapGetters({
              totalPrice:'totalPrice',
              totalCount:'totalCount'
          })
        },
        methods:{
            test(){
                if (this.totalPrice<=0){
                    return
                }
                console.log(this.totalPrice)
            }
        },
        components:{
        }
    }
</script>




