<template>
  <div>
    <span class="icon-icon" :class="classMap[icontype]"></span>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
    .icon-icon
      display inline-block
      vertical-align top
      width 12px
      height 12px
      margin-right 4px
      background-size 12px 12px
      background-repeat no-repeat
      /*
      &.decrease
        bg-image('decrease_2')
      &.discount
        bg-image('discount_2')
      &.guarantee
        bg-image('guarantee_2')
      &.invoice
        bg-image('invoice_2')
      &.special
        bg-image('special_2')
        */
      &.decrease-1
        bg-image('decrease_1')
      &.decrease-2
        bg-image('decrease_2')
      &.decrease-3
        bg-image('decrease_3')
      &.decrease-4
        bg-image('decrease_4')
      &.discount-1
        bg-image('discount_1')
      &.discount-2
        bg-image('discount_2')
      &.discount-3
        bg-image('discount_3')
      &.discount-4
        bg-image('discount_4')
      &.guarantee-1
        bg-image('guarantee_1')
      &.guarantee-2
        bg-image('guarantee_2')
      &.guarantee-3
       bg-image('guarantee_3')
      &.guarantee-4
        bg-image('guarantee_4')
      &.invoice-1
        bg-image('invoice_1')
      &.invoice-2
        bg-image('invoice_2')
      &.invoice-3
        bg-image('invoice_3')
      &.invoice-4
        bg-image('invoice_4')
      &.special-1
        bg-image('special_1')
      &.special-2
        bg-image('special_2')
      &.special-3
        bg-image('special_3')
      &.special-4
        bg-image('special_4')
</style>

<script>
  import '../../common/stylus/mixins.styl'
  //考虑到有每种图标有4种大小样式，所以要给出对应的选项
  //iconType对应图标种类，iconSize对应图标样式
    export default{
        props:{
          icontype:{
              type:Number
          },
          iconstyle:{
              type:Number
          }
        },
      created(){
        this.maps = ['decrease','discount','guarantee','invoice','special'];
//        this.classMap = this.maps.map((val)=> {
//          return val + '-'+this.iconstyle
//        })
      },
      /**
       *  computed和created都可以，放在computed里更易维护，至于性能不太清楚
       */
      computed:{
        classMap(){
          return this.classMap = this.maps.map((val)=> {
            return val + '-'+this.iconstyle
          })
        }
      }
    }
</script>




