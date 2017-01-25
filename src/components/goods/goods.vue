<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item"
            :class="{'active' : currentIndex === parseInt(index)}"
            @click="selectMenu(index,$event)">
          <!--<li v-for="item in goods" class="menu-item">-->
          <span class="text border-1px">
            <div class="icon-wrapper" v-show="item.type>0">
              <icon :icontype="item.type" :iconstyle="3"></icon>
            </div>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now"><span class="money">￥</span>{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        line-height 14px
        padding 0 12px
        &.active
          position relative
          margin-top -1px
          z-index 10
          font-weight 700
          background #fff
          .text
            border-none()
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7,17,27,0.1))
          font-size 12px
          .icon-wrapper
            display inline-block
            vertical-align top
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon //这里360的样式，content覆盖了icon
          flex 0 0 57px
          margin-right 10px
        .content
          position relative
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7,17,27)
          .desc,.extra
            margin-bottom 8px
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          .desc
            line-height 14px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240,20,20)
              .money
                font-size 10px
                font-weight 500
            .old
              color rgb(147,153,159)
              font-size 10px
              text-decoration line-through
          .cartcontrol-wrapper
            position absolute
            right 18px
            bottom 18px
</style>

<script>
  //引入vuex
  import {mapGetters,mapActions} from 'vuex'
  //引入JS库
  import BScroll from 'better-scroll'
  //引入组件
  import icon from '../icon/icon'
  import shopcart from '../shopcart/shopcart'
  import cartcontrol from '../cartcontrol/cartcontrol'
  const  ERR_OK = 0
  const  cc = console.log
  export default{
    data(){
      return{
        goods:[],
        listHeight:[],
        scrollY:0
        /**
         * 页面生成->取得数据->得到fooditems的各个区间->BS暴露实时position->得到实时scrollY
         * ->通过scrollY映射区间->得到currentIndex->对应menu高亮
         * 关键在于：BS暴露实时position是封装好的，节省了大量操作
         * BS的监听滚动是原生实现实时得到position的功能。
         */
      }
    },
    props:{
      seller:{
        type:Object
      }
    },
    created(){
      this.$http.get('/api/goods').then((res)=>{
        res = res.body
        if (res.errno === ERR_OK){
          this.$store.state.goods = Object.assign({},res.data)
          this.goods = this.$store.state.goods
          this.$nextTick(()=>{
            this._initScroll()
            this._calculate()
          })
        }
      })
    },
    computed:{
      ...mapGetters({
        selectFoods : 'selectFoods'
      }),
      currentIndex(){
        for(let i = 0;i<this.listHeight.length;i++){
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2) ){
            return i
          }
        }
        return 0
      },
      //todo 这里放goods()，去掉data()中的goods，显式效果相同
//            goods(){
//                return  this.$store.state.goods
//            }
    },
    methods:{
      selectMenu(index,event){
        //todo 浏览器原生JS的事件，没有_constructed这个属性，为了阻止浏览器模式时的二次点击——
        if (!event._constructed){
          return;
        }
        //todo 如此，只会通过BScroll的点击事件（既Vue的事件）
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el =foodList[index];
        this.foodsScroll.scrollToElement(el,300)
      },
      selectFood(food,event){
        if (!event._constructed){
          return
        }
      },
      _initScroll(){
        this.menuScroll = new BScroll(this.$refs.menuWrapper,{
          click:true
        })

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
          probeType:3,  //检测实时滚动位置，会暴露出当前的position，可以用 on('scroll',cb(position){})来操作
          click:true
        })

        this.foodsScroll.on('scroll',(position)=>{
          this.scrollY = Math.abs(Math.round(position.y))    //.abs()取绝对值  //拿到右侧的Y值，要实时，就要用计算属性
        })
      },
      _calculate(){
        let foodlist = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i<foodlist.length;i++){
          let item = foodlist[i]
          height += item.clientHeight;
          this.listHeight.push(height);
        }
        //拿到右侧的Y值，然后和左侧做映射
      }
    },
    components:{
      icon,shopcart,cartcontrol
    }
  }
</script>




