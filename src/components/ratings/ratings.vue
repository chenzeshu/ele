<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="text">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <div class="star"><star :size="36" :score="seller.serviceScore"></star></div>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <div class="star"><star :size="36" :score="seller.foodScore"></star></div>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType" :only-content="onlyContent"
                    :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <!--右边部分-->
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div><!--右边部分-->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .ratings
    position absolute
    top 174px
    bottom 0
    left 0
    width:100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex: 0 0 137px
        width:137px  //为了兼容性
        border-right:1px solid rgba(7,17,27,0.1)
        text-align center
        padding:6px 0
        box-sizing border-box
        @media only screen and (max-width:320px)
          flex  0 0 120px
          width 120px
        .score
          padding-bottom:6px
          font-size:24px
          color:rgb(255,153,0)
          line-height 28px
        .text
          text-align center
          padding-bottom:8px
          font-size:12px
          line-height:12px
          color rgb(7,17,27)
        .rank
          font-size:10px
          line-height:10px
          color rgba(7,17,27,0.4)
      .overview-right
        flex 1
        padding:6px 0 6px 24px
        @media only screen and (max-width:320px)
          padding-left 6px
        .score-wrapper
          margin-bottom 8px
          font-size 0
          .title,.star,.score
            display inline-block
            vertical-align top
          .title
            font-size:12px
            line-height:17px
            color rgb(7,17,27)
          .star
            display inline-block
            vertical-align top
            margin 0 6px
          .score
            font-size:12px
            line-height:18px
            color rgb(255,153,0)
        .delivery-wrapper
          font-size 0
          .title
            display inline-block
            font-size:12px
            line-height:18px
            color rgb(7,17,27)
          .time
            display inline-block
            margin-left 12px
            font-size:12px
            color rgb(147,153,159)
    .ratingselect
      padding-left 18px
    .rating-wrapper
      padding:0 18px
      .rating-item
        display flex
        padding:18px 0
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex 0 0 28px
          width: 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          position relative
          flex 1
          .name
            line-height 12px
            font-size 10px
            color rgb(7,17,27)
            margin-bottom:4px
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star
              display inline-block
              margin-right 6px
              vertical-align top
            .delivery
              display inline-block
              vertical-align top
              font-size 10px
              line-height 12px
              color rgb(147,153,159)
          .text
            font-size 12px
            line-height 18px
            color rgb(7,17,27)
            margin-bottom 8px
          .recommend
            line-height 16px
            font-size 0
            .icon-thumb_up,.item
              display inline-block
              margin 0 8px 4px 0
            .icon-thumb_up
              font-size 12px
              color rgb(0,160,220)
            .item
              font-size 9px
              padding 0 6px
              border 1px solid rgba(7,17,27,0.1)
              border-radius 1px
              color rgb(147,153,159)
              background #fff
          .time
            position:absolute
            top 0
            right 0
            font-size:10px
            color rgb(147,153,159)
            line-height 12px
</style>

<script>
  import star from 'components/star/star'
  import split from 'components/split/split'
  import ratingselect from 'components/ratingselect/ratingselect'
  import {formatDate} from 'common/js/date'
  import BScroll from "better-scroll"

  import Bus from 'common/js/EventBus'

  const ERR_OK = 0
  const ALL = 2
  const POSITIVE = 0
  const NEGATIVE = 1
    export default{
        props:{
            seller:{
                type:Object
            }
        },
        data(){
            return{
                ratings:[],
              selectType : ALL,
              onlyContent : false
            }
        },
      filters:{
        formatDate(time){
          let date = new Date(time)
          return formatDate(date,'yy-MM-dd hh:mm')
        }
      },
      created(){
        this.$http.get('/api/ratings').then((res)=>{
          res = res.body
          if (res.errno === ERR_OK){
            this.ratings = res.data
            this.$nextTick(()=>{
              this.scroll = new BScroll(this.$refs.ratings,{
                click:true
              })
            })
          }
        })

        Bus.$on('selectTypes',type=>{
          this.selectType = type
          this.$nextTick(()=>{
            if(!this.scroll){
              this.scroll = new BScroll(this.$refs.ratings,{
                click:true
              })
            }else{
              this.scroll.refresh()
            }
          })
        })

        Bus.$on('toggleContent',content=>{
          this.onlyContent = content
          this.$nextTick(()=>{
              if(!this.scroll){
                this.scroll = new BScroll(this.$refs.ratings,{
                  click:true
                })
              }else{
                this.scroll.refresh()
              }
          })
        })
      },
      methods:{
          test(){
              console.log(this.seller)
          },
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
          select(type) {
            this.selectType = type;
            this.$nextTick(() => {
              this.scroll.refresh();
            });
          },
          onlyContent2(onlyContent) {
            this.onlyContent = onlyContent;
            this.$nextTick(() => {
              this.scroll.refresh();
            });
          },
      },
        components:{
          star,split,ratingselect
        }
    }
</script>




