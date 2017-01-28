<template>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper logo-hook">
            <div class="logo" :class="{'highlight':totalPrice>0}" @click="showInfo">
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
          <div class="pay" :class="{'highlight': whetherHighlight }">{{sellInfo}}</div>

        </div>
      </div>
      <!--小球动画-->
      <div class="ball-container">
        <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-for="(ball,index) of balls" v-show="ball.show" :key="index">
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div>
      <!--购物车详情栏-->
      <transition name="fold">
      <div class="cart" v-show="listShow">
          <div class="cart-top">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty()">清空</span>
          </div>
          <div class="cart-info" ref="cartInfo">
            <ul>
              <li  v-for="(food,index) in selectFoods" :key="index" class="food border-1px">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span class="money-icon">￥</span><span class="money">{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
      </div>
      </transition>
      <!--<div class="ball-container">-->
        <!--<template v-for="ball in balls">-->
          <!--<transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">-->
            <!--<div class="ball" v-show="ball.show">-->
              <!--<div class="inner inner-hook"></div>-->
            <!--</div>-->
          <!--</transition>-->
        <!--</template>-->
      <!--</div>-->
      <transition name="fade">
        <div class="list-mask" v-show="listShow" @click="hideList"></div>
      </transition>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
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
          &.highlight
            color #fff
    .ball-container
      .ball
        /*落点位置*/
        position fixed
        left 32px
        bottom 22px
        z-index 200
        .inner
          width 16px
          height 16px
          border-radius 50%
          background rgb(0,160,220)
        &.drop-enter-active
          transition: all .4s cubic-bezier(.49, -0.29, .75, .41)
          .inner
            transition all .4s linear
    .cart
      position absolute
      top 0   //top 0和shopcart完全重合，但是下方的transform translate3d(0,-100%，0)使他水平对称翻转了。
      //不能去掉top 0 和transform，改成bottom 0 否则详情会从shopcart组件的0,0,0处向下生长
      left 0
      z-index -1   //不明白为什么-1
      width 100%
      background #fff
      transform translate3d(0,-100%,0) //这个属性标定了顶栏的位置（最终态）
      //transition表示了动画的过程，transform是状态帧
      &.fold-enter-active,&.fold-leave-active
        transition all .5s
      &.fold-enter,&.fold-leave-active
        transform translate3d(0,0,0)
      .cart-top
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7,17,27,0.1)
        .title
          float left
          font-size 14px
          color rgb(7,17,27)
        .empty
          float right
          font-size 12px
          color rgb(0,160,220)
      .cart-info
        max-height 217px
        padding 0 18px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7,17,27,0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7,17,27)
          .price
            position absolute
            right 96px
            bottom 14px
            line-height:24px
            color:rgb(240,20,20)
            .money-icon
              font-size 8px
            .money
              font-size:14px
              font-weight:700
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px
    .list-mask
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      z-index -2
      background: rgba(7, 17, 27, .6);
      backdrop-filter blur(10px)
      &.fade-enter-active,&.fade-leave-active
        transition all 0.5s
      &.fade-enter,&.fade_leave
        opacity 0
</style>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'
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
                balls:[
                  {
                    show:false
                  },
                  {
                    show:false
                  },
                  {
                    show:false
                  },
                  {
                    show:false
                  },
                  {
                    show:false
                  },
                ],
                dropBalls:[],
                fold:true,
                sellInfo:null,
            }
        },
        computed:{
          ...mapGetters({
              totalPrice:'totalPrice',
              totalCount:'totalCount',
              selectFoods:'selectFoods'
          }),
          listShow(){
              if (!this.totalCount){
                  this.fold = true
                  return false
              }
              let show = !this.fold
            if (show){
                  this.$nextTick(()=>{
                      if (!this.scroll){
                          this.scroll = new BScroll(this.$refs.cartInfo,{
                              click : true
                          })
                      }else{
                          this.scroll.refresh()
                      }
                  })
            }
            return show
          },
          whetherHighlight(){
              if (this.totalPrice === 0){
                  this.sellInfo = `起送￥${this.minPrice}元`
                  return false
              } else if(this.totalPrice < this.minPrice){
                  let diff = this.minPrice - this.totalPrice
                  this.sellInfo = `还差￥${diff}元起送`
                  return false
              } else {
                  this.sellInfo = "去结算"
                  return true
            }
          }
        },
        methods:{
          ...mapActions([
              'emptyCount'
          ]),
            hideList(){
              this.fold = !this.fold
            },
            empty(){
              //不行，详情页不会自动消失
//                this.$store.state.selectFoods = []
              for (let food of this.$store.state.selectFoods){
                  food.count = 0
              }
              this.emptyCount()
            },
            showInfo(){
                if(!this.totalCount){
                    return
                }
              this.fold = !this.fold
            },
          drop(el) {
            for (let i = 0; i < this.balls.length; i++) {
              let ball = this.balls[i];
              if (!ball.show) {
                ball.show = true;
                // 保存el
                ball.el = el;
                this.dropBalls.push(ball);
                return;
              }
            }
          },
          beforeEnter(el) {
            let count = this.balls.length;
            while (count--) {
              let ball = this.balls[count];
              if (ball.show) {
                // getBoundingClientRect 这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom
                let rect = ball.el.getBoundingClientRect();
                let x = rect.left - 32;
                let y = -(window.innerHeight - rect.top - 22);

                el.style.display = '';

                el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
                el.style.transform = `translate3d(0, ${y}px, 0)`;

                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
                inner.style.transform = `translate3d(${x}px, 0, 0)`;
              }
            }
          },
          enter(el) {
            /* 触发浏览器重绘 */
            let rf = el.offsetHeight;

            this.$nextTick(() => {
              el.style.webkitTransform = 'translate3d(0, 0, 0)';
              el.style.transform = 'translate3d(0, 0, 0)';

              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform = 'translate3d(0, 0, 0)';
              inner.style.transform = 'translate3d(0, 0, 0)';
            });
          },
          afterEnter(el) {
            let ball = this.dropBalls.shift();
            if (ball) {
              ball.show = false;
              el.style.display = 'none';
            }
          },
        },
//      transition:{
//        drop:{
//            //el就时命名为drop的transition的动画DOM
//            beforeEnter(el){
//              let count = this.balls.length
//              while(count--){
//                  let ball =this.balls[count]
//                  if (ball.show){
//              //getBoundingClientRect 这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom
//                        let rect = ball.el.getBoundingClientRect()
//                        let x = rect.left -32
//                        let y = (window.innerHeight - rect.top - 22 )
//                    //todo 为什么y不是rect.bottom + 22?
//
//                    //把位移分成了X Y两个方向分别计算
//                    //要分别计算，就需要有2个元素，那么包裹层一个位移，内层一个位移
//                    //在视觉上就是一个完整的二维运动
//                    el.style.display = ''
//                    el.style.webkitTransform = `translate3d(0,${y}px,0)`
//                    el.style.Transfrom = `translate3d(0,${y}px,0)`
//                    let inner = el.getElementsByClassName('inner-hook')[0]
//                    inner.style.webkitTransform = `translate3d(${x},0,0)`
//                    inner.style.Transform = `translate3d(${x},0,0)`
//                  //logo 为什么要这么做
//                    let logo = document.getElementsByClassName('logo-hook')[0]
//                    logo.className += 'animated pulse'
//                  }
//              }
//            },
//            enter(el){
//                /*下面这句主要工作：浏览器重绘*/
//                let rf = el.offsetHeight  //高度offset重绘
//                this.$nextTick(()=>{
//                    el.style.webkitTransform = `translate3d(0,0,0)`
//                    el.style.transform = `translate3d(0,0,0)`
//                    let inner = el.getElementsByClassName('inner-hook')[0]
//                    inner.style.webkitTransform = `translate3d(0,0,0)`
//                    inner.style.Transform = `translate3d(0,0,0)`
//                })
//            },
//            afterEnter(el){
//                let ball = this.dropBall.shift(); //删除并返回dropBall中的第一个元素
//                if (ball){
//                    ball.show = false
//                    el.style.display = 'none'
//                }
//              //logo 为什么要这么做
//              let logo = document.getElementsByClassName('logo-hook')[0]
//              logo.className = 'logo-wrapper logo-hook'
//            }
//        }
//      },
        components:{
            cartcontrol
        }
    }
</script>




