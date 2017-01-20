<template>
    <div class="star" :class="starType">
      <span v-for="itemClass in itemClasses" :key="itemClass.id" :class="itemClass" class="star-item" ></span>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>

<script>
    const LENGTH = 5;         //星数量，如果后期要扩展数量，那么就把LENGTH也作为pros由父组件传入
    const CLS_ON = 'on';      //满星
    const CLS_HALF = 'half';  //半颗星
    const CLS_OFF = 'off';    //没星

    export default{
        props:{
            size:{
                type:Number
            },
            score:{
                type:Number
            }
        },
        computed:{
            starType(){
                return 'star-'+this.size;
            },
            itemClasses(){
                let result = [];  //最后返回给itemClasses
                let score = Math.floor(this.score * 2 ) / 2;
                let hasDecimal = score % 1 !==0 ; //!==0返回1, ===0返回0
                let integer = Math.floor(score) ; //向下取整
              for(let i = 0;i < integer; i++){
                  result.push(CLS_ON);
              }
              if (hasDecimal){
                  result.push(CLS_HALF)
              }
              while( result < LENGTH ){
                  result.push(CLS_OFF)
              }
              return result
            }
        }
    }
</script>




