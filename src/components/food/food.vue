<template>
  <transition name="move">
   <div class="food" v-show="showFlag" ref="content">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0 " @click="addFirst($event)">
              加入购物车
            </div>
          </transition>
        </div>
        <split></split>
        <div class="info">
          <h1 class="title">商品介绍</h1>
          <div class="desc">{{food.info}}</div>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
        </div>
        <div class="rating-wrapper">
          <ul v-show="food.ratings &&food.ratings.length">
            <li class="rating-item" v-for="rating in food.ratings"
                v-show="needShow(rating.rateType,rating.text)">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img :src="rating.avatar" class="avatar" width="12" height="12">
              </div>
              <div class="time">{{ rating.rateTime | formatDate }}</div>
              <p class="text">
                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
              </p>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </transition>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background #fff
    &.move-enter-active,&.move-leave-active
      transition all .2s linear
    &.move-enter,&.move-leave-active
      transform translate3d(100%,0,0)
    .food-content
      .image-header
        position relative
        width 100%
        height 0
        padding-top 100%
        img
          position absolute
          top 0
          left 0
          height 100%
          width 100%
        .back
          position absolute
          top 10px
          left 0
          .icon-arrow_lift
            display block
            padding 10px
            font-size 20px
            color #fff
      .content
        position relative
        padding 18px
        .title
          margin-bottom 8px
          line-height 14px
          font-size 14px
          font-weight 700
          color rgb(7,17,27)
        .detail
          margin-bottom 18px
          height:10px
          line-height:10px
          font-size:0
          color:rgb(147,153,159)
          .sell-count,.rating
            font-size:10px
          .sell-count
            margin-right:12px
        .price
          .now,.old
            font-size 14px
            font-weight 700
            color rgb(240,20,20)
        .cartcontrol-wrapper
          position absolute
          right 12px
          bottom 8px
        .buy
          position absolute
          right 18px
          bottom 16px
          z-index 10
          height 24px
          line-height 24px
          box-sizing border-box
          border-radius 12px
          background rgb(0,160,220)
          font-size 10px
          color #fff
          padding 0 12px
          &.fade-enter-active,&.fade-leave-active
            opacity 1
            transition all .3s linear
          &.fade-enter,&.fade-leave
            opacity 0
      .info
        padding 18px
        .title
          line-height 14px
          font-size 14px
          color rgb(7,17,27)
          margin-bottom 12px
        .desc
          padding 0 12px
          line-height 24px
          font-size 12px
          color rgb(77,85,93)
      .rating
        padding-top:18px
        .title
          line-height:14px
          margin-left 18px
          font-size:14px
          font-weight:600
          color:rgb(7,17,27)
        .ratingselect
          margin-left 18px
      .rating-wrapper
        padding 0 18px
        .rating-item
          position: relative
          padding:16px 0
          color:rgb(147,153,159)
          border-1px(rgba(7,17,27,0.1))
          .user
            position:absolute
            right 0
            top 16px
            font-size:0
            line-height:12px
            .name,.avatar
              display :inline-block
            .name
              font-size:10px
              margin-right:6px
              vertical-align top
            .avatar
              border-radius 50%
          .time
            padding-bottom 6px
            font-size:10px
            line-height:12px
          .text
            font-size:12px
            line-height:16px
            color rgb(7,17,27)
            .icon-thumb_up,.icon-thumb_down
              line-height:24px
              margin-right:4px
            .icon-thumb_up
              color:rgb(0,160,220)
            .icon-thumb_down
              color:rgb(147,153,159)
</style>

<script>
  //引入系统插件
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  //引入组件
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import split from 'components/split/split'
  import ratingselect from 'components/ratingselect/ratingselect'
  //引入状态管理
  import Bus from 'common/js/EventBus'
  //引入方法
  import {formatDate} from 'common/js/date'

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

    export default {
        props:{
          food:{
              type:Object
          },
        },
        data() {
            return {
              showFlag : false,
              onlyContent : false,
              selectType : ALL,
              desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
              }
            }
        },
        created(){
              Bus.$on('selectTypes',selectType=>{
                  this.selectType = selectType
                  this.$nextTick(()=>{
                        this.scroll.refresh()
                  })
              })

              Bus.$on('toggleContent',content=>{
                  this.onlyContent = content
                  this.$nextTick(()=>{
                    this.scroll.refresh()
                  })
              })
        },
        methods:{
          needShow(type,text){
              if (this.onlyContent && !text ){
                  return false
              }
              if ( this.selectType === ALL ){
                  return true
              } else {
                  return type === this.selectType
              }
          },
          show(){
              this.showFlag = true
              this.$nextTick(function(){
                if(!this.scroll) {
                  this.scroll = new BScroll(this.$refs.content,{
                    click:true
                  })
                } else {
                  this.scroll.refresh()
                }
              })
          },
          hide(){
              this.showFlag = false
          },
          addFirst(event){
            if (!event._constructed){
              return;
            }
            if (!this.food.count){
              Vue.set(this.food, 'count',1)//子组件不能影响父组件，但是set()可以
            }else{
              this.food.count++
            }
            let food = this.food
            this.$store.dispatch('addSelectFoods',{food})
            Bus.$emit('addCartAnimation',event.target) //试试这里换成本来的this.$dispatch()会有什么效果
          },
        },
      filters: {
        formatDate(time) {
          let date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      },
        components: {
          cartcontrol,split,ratingselect
        }
    }
</script>


