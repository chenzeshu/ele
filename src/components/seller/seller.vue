<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
          <div class="overview">
            <div class="desc border-1px">
              <p class="title">{{seller.name}}</p>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="num">{{seller.ratingCount}}</span>
              <span class="sell-count">月售{{seller.sellCount}}单</span>
            </div>
            <ul class="remark">
                <li class="block">
                  <h2 class="title">起送价</h2>
                  <span class="stress">{{seller.minPrice}}</span><span class="yuan">元</span>
                </li>
                <li class="block">
                  <h2 class="title">商家配送</h2>
                  <span class="stress">{{seller.deliveryPrice}}</span><span class="yuan">元</span>
                </li>
                <li class="block">
                  <h2 class="title">平均起送时间</h2>
                  <span class="stress">{{seller.deliveryTime}}</span><span class="yuan">分钟</span>
                </li>
              </ul>
            <div class="favorite" @click="toggleFavorite($event)">
              <!--<i class="icon-favorite" :class="{'like':favorite}" @click="beFavorite($event)"></i>-->
              <span class="icon-favorite" :class="{'like':favorite}"></span>
              <p class="text">{{favoriteText}}</p>
            </div>
          </div>
          <split></split>
          <div class="bulletin">
            <h1 class="title">公告与活动</h1>
            <div class="content-wrapper">
              <p class="content">
                {{seller.bulletin}}
              </p>
              <ul v-if="seller.supports" class="support">
                <li v-for="(support,index) in seller.supports" class="support-item border-1px">
                  <icon :icontype="seller.supports[index].type" :iconstyle="4"></icon>
                  <span class="text">{{seller.supports[index].description}}</span>
                </li>
              </ul>
            </div>

          </div>
          <split></split>
          <div class="pics">
            <h1 class="title">商家实景</h1>
            <div v-if="seller.pics" class="pic-wrapper" ref="picWrapper">
              <ul class="pic-list" ref="picList">
                <li v-for="pic in seller.pics" class="pic-item">
                  <img :src="pic" width="120" height="90">
                </li>
              </ul>
            </div>
          </div>
          <split></split>
          <div class="info">
            <h1 class="title">商家信息</h1>
            <ul>
              <li v-for="info in seller.infos" class="item border-1px">
                {{info}}
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .seller
    position fixed
    top 174px
    bottom 0px
    width 100%
    overflow hidden
    .overview
      position relative
      margin 0 18px
      .desc
        padding 18px 0
        font-size 0
        border-1px(rgba(7,17,27,0.1))
        .title
          display block
          line-height 14px
          font-size 14px
          color rgb(7,17,27)
          margin-bottom 8px
        .star
          display inline-block
          vertical-align top
          margin-right 12px
        .num,.sell-count
          display inline-block
          line-height 18px
          font-size 10px
          color rgb(77,85,93)
        .num
          margin-right 12px
      .remark
        padding 18px 0
        display flex
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7,17,27,0.1)
          &:last-child
            border none
          .title
            display block
            margin-bottom 4px
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          .stress
            display inline-block
            line-height:24px
            font-size:24px
            color rgb(147,153,159)
          .yuan
            display inline-block
            vertical-align: top
            line-height:28px
            font-size:10px
            color rgb(7,17,27)

      .favorite
        position absolute
        right 18px
        top 15px
        text-align center
        .icon-favorite
          line-height 28px
          font-size 24px
          margin-bottom 8px
          color rgb(77,85,93)
          &.like
            color rgb(240,20,20)
        .text
          line-height 14px
          font-size 10px
          color rgb(77,85,93)
    .bulletin
      margin 0 18px
      padding-top 18px
      .title
        display block
        line-height 14px
        font-size 14px
        color rgb(7,17,27)
        margin-bottom 8px
      .content-wrapper
        padding 0 12px
        .content
          line-height:24px
          font-size 12px
          color rgb(240,20,0)
      .support
        padding 0 12px
        .support-item
          padding 16px 0
          border-1px(rgba(7,17,27,0.1))
          font-size 0
          &:last-child
            border-none()
          .icon
            display inline-block
            vertical-align top
            margin-right 6px
          .text
            display inline-block
            vertical-align top
            line-height 12px
            font-size 12px
            color rgb(7,17,27)



    .pics
      padding 18px
      .title
        line-height 14px
        font-size 14px
        color rgb(7,17,27)
        margin-bottom 12px
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .pic-list
          font-size 0
          .pic-item
            display inline-block
            margin-right 6px
            width 120px
            height 90px
            &:last-child
              margin-right 0


    .info
      padding 18px
      .title
        line-height 14px
        font-size 14px
        color rgb(7,17,27)
        margin-bottom 12px
      .item
        padding 16px 12px
        line-height 16px
        font-size 12px
        color rgb(7,17,27)
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
</style>

<script>
  import star from 'components/star/star'
  import split from 'components/split/split'
  import icon from 'components/icon/icon'
  import BScroll from 'better-scroll'
  import {saveToLocal, loadFromLocal} from 'common/js/localStore'

  const LIKE = 1
  const UNLIKNE = 2
    export default{
        props:{
            seller:{
                type:Object
            }
        },
        methods:{
            _initScroll(){
                if (!this.scroll){
                    this.scroll = new BScroll(this.$refs.seller, {
                        click:true
                    })
                } else {
                    this.scroll.refresh()
                }
            },
            _initPics(){
                if (this.seller.pics){
                  /**
                   * 纵向因为始终有屏幕高度H和元素高度，所以直接傻瓜式调用插件即可。
                   * 横向则需要计算内容宽度总长度
                   */
                    //内容宽度超过了包括宽度，就可以滚动
                  let picWidth =120
                  let margin = 6
                  let width = (picWidth+margin)*this.seller.pics.length - margin
                  this.$refs.picList.style.width = width +'px'

                  this.$nextTick(()=>{
                    if (!this.picScroll){
                      this.picScroll = new BScroll(this.$refs.picWrapper,{
                        scrollX :true, //横向滚动
                        eventPassthrough:true //本层滚动时不传导至外层
                      })
                    } else {
                      this.picScroll.refresh()
                    }
                  })
                }
            },
            toggleFavorite(event){
                if (!event._constructed){
                    return
                }
                this.favorite = !this.favorite
                console.log(this.seller.id)
                saveToLocal(this.seller.id, 'favorite', this.favorite)

            }
//            beFavorite(event){
//              if (!event._constructed){
//                  return
//              }
//
//              let fav = localStorage.getItem('favorite')
//              if (fav==UNLIKNE){
//                    localStorage.setItem('favorite',LIKE)
//                    this.favorite = true
//              }else{
//                    localStorage.setItem('favorite',UNLIKNE)
//                    this.favorite = false
//              }
//              console.log(fav)
//            }
        },
      data(){
        return{
//          favorite : {
//              return (){
//                      return localStorage.getItem('favorite')
//               }
//          }
          favorite :(()=>{
              return loadFromLocal(this.seller.id,'favorite', false)
          })()
        }
      },
      watch:{
        'seller'(){
            this._initPics()
        }
      },
      computed:{
//        favoriteText(){
//          return this.favorite === UNLIKNE ? "未收藏" : "已收藏"
//        }
        favoriteText(){
          return this.favorite ? "已收藏" : "未收藏"
        }
      },
        mounted() {
          this.$nextTick(()=> {
            this._initScroll()
            this._initPics()
          })
        },
        components:{
            star,split,icon
        }
    }
</script>




