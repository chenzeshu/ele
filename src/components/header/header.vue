<template>
    <div class="header">
        <!--<div class="content-wrapper" @click="showDetail">-->
        <div class="content-wrapper" @click="showDesc">
          <div class="avatar">
            <img :src="seller.avatar" width="64" height="64">
          </div>
          <div class="content">
            <div class="title">
              <span class="brand"></span><span class="name">{{seller.name}}</span>
            </div>
            <div class="desc">
              <span class="description">{{seller.description}} / {{seller.deliveryTime}}分钟送达</span>
            </div>
            <div v-if="seller.supports" class="support">
              <!--<span class="icon" :class="classMap[seller.supports[0].type]"></span>-->
              <div class="icon-wrapper">
                <icon :icontype="seller.supports[0].type" :iconstyle="1"></icon>
              </div>
              <span class="text">{{seller.supports[0].description}}</span>
            </div>
            <div v-if="seller.supports" class="support-count">
              <span class="count">{{seller.supports.length}}个</span>
              <i class="icon-keyboard_arrow_right"></i>
            </div>
          </div>
        </div>
        <!--<div class="bulletin-wrapper" @click="showDetail">-->
        <div class="bulletin-wrapper" @click="showDesc">
          <span class="icon"></span><span class="text">{{seller.bulletin}}</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      <div class="background">
        <img :src="seller.avatar" width="100%" height="100%">
      </div>
      <transition name="fade">
        <div class="detail" v-show="detailShow"
           @click="showDesc">
          <div class="detail-wrapper clear-fix">
            <div class="detail-main">
              <h1 class="name">{{seller.name}}</h1>
              <div class="star-wrapper">
                <star :score="seller.score" :size="48"></star>
              </div>
              <div class="title-wrapper">
                <v-title :title="titleOne"></v-title>
              </div>
              <ul v-if="seller.supports" class="supports">
                <li v-for="(item,index) in seller.supports" class="support-item">
                  <div class="icon-wrapper">
                    <icon :icontype="seller.supports[index].type" :iconstyle="2"></icon>
                  </div>
                  <!--<span :class="classMap[seller.supports[index].type]" class="icon"></span>-->
                  <span class="text">{{seller.supports[index].description}}</span>
                </li>
              </ul>
              <div class="title-wrapper">
                <v-title :title="titleTwo"></v-title>
              </div>
              <div class="bulletin">
                <p class="content">{{seller.bulletin}}</p>
              </div>
            </div>
          </div>
          <div class="detail-close">
            <i class="icon-close"></i>
          </div>
      </div>
      </transition>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
  .header
    position relative
    top 0
    left 0
    color: #000
    .content-wrapper
      position relative
      padding:24px 12px 18px 24px
      font-size 0
      .avatar
        display inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display inline-block
        padding:2px 0 0 16px
        .title
          margin-bottom 8px
          .brand
            display inline-block
            vertical-align top
            width:30px;
            height:18px;
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size 16px
            font-weight bold
            line-height 18px
        .desc
          margin-bottom 10px
          font-size 0
          .description
            display inline-block
            font-size 12px
            height:12px
            line-height 12px
        .support
          .icon-wrapper
            display inline-block
            vertical-align top
          .text
            line-height 10px
            font-size 10px
      .support-count
        position absolute
        bottom 14px
        right 12px
        padding 0 8px
        height 24px
        line-height 24px
        border-radius 14px
        background:rgba(0,0,0,0.2)
        text-align center
        .count
          font-size 10px
          vertical-align top
        .icon-keyboard_arrow_right
          line-height 24px
          font-size 10px
    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      background rgba(7,17,27,0.2)
      .icon
        display inline-block
        vertical-align top
        margin-top 8px
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .text
        //display inline-block，就会自动撑满容器？
        //当不能给display inline-block时，只有再给vertical-align top ,从而出现双vertical-align现象
        /*display inline-block*/
        vertical-align :top
        font-size:10px
        font-weight:200
        margin:0 4px
      .icon-keyboard_arrow_right
        position absolute
        font-size 10px
        right 12px
        top 8px
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      z-index 100
      top 0
      left 0
      width 100%
      height 100%
      overflow auto
      color #fff
      background rgba(7,17,27,0.8)
      backdrop-filter blur(10px)
      .detail-wrapper
        min-height:100%
        width 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            line-height 16px
            text-align center
            font-size 16px
            font-weight 700
          .star-wrapper
            margin-top 16px
            padding 2px 0
            text-align center
          .title-wrapper
            width 80%
            margin 28px auto 24px auto
          .supports
            width 80%
            margin 0 auto
            .support-item
              padding 0 12px
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 12px
              .icon-wrapper
                display inline-block
                vertical-align top
                width 12px
                height 12px
                margin-right 4px
                background-size 12px 12px
                background-repeat no-repeat
              .text
                display inline-block
                line-height 12px
                font-size 12px
          .bulletin
            width 80%
            margin 0 auto
            .content
              padding 0 12px
              line-height 24px
              font-size 12px
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
//anmimation
.fade-enter-active, .fade-leave-active
      transition: all .5s
      background rgba(7,17,27,0.8)
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  opacity: 0
  background rgba(7,17,27,0)
</style>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import icon from '../icon/icon'
  import star from '../star/star'
  import title from '../title/title'
    export default{
      props: {
        seller: {
          type: Object
        }
      },
      data(){
        return {
//              detailShow:false,
          titleOne: "优惠信息",
          titleTwo: "商家公告"
        }
      },
      created(){
        this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      },
      computed: {
        ...mapGetters({
          detailShow: 'showDesc'
        })
      },
      methods: {
        ...mapActions([
          'showDesc'
        ]),
      },
//        showDetail(){
//            this.detailShow = !this.detailShow
//        },
//        hideDetail(){
//            this.detailShow = false
//        }
//      ,
        components:{
            star, 'v-title':title, icon
        }
    }
</script>




