<template>
  <div class="wsfs">
    <div class="wrap" :style="{ backgroundColor: backgroundColor }">
        <!-- 左 -->
        <div class="left">
            <slot name="left">
               <div @click="LeftBtn">
                    <i :class="leftIcon+' icon-font'" :style="{color:color}"></i> 
               </div>  
            </slot>    
        </div>
        <!-- 中间 -->
        <div class="middle-wrap">
            <slot name="middle">   
                <div class="text-s" style="" :style="{color:color}" >{{title}}</div>
            </slot>  
        </div>
        <!-- 右 -->
        <div class="right">
            <slot name="right">
                <div @click="btnIcon">
                    <i v-if="rightIcon" :class="rightIcon+' icon-font'" :style="{color:color}" ></i> 
                </div>
                <div @click="btnText" v-if="tel=='1'">
                    <a href="tel:020 8852 5087">
                      <span v-if="rightText" class="text-1">{{rightText}}</span>
                    </a>  
                </div>
                <div @click="btnText" v-if="tel=='0'">
                    <span v-if="rightText" class="text-1">{{rightText}}</span> 
                </div>


            </slot>
        </div>
    </div>
  </div>  
</template>
<script>
export default {
    data:()=>({

    }),
    props:{
      backgroundColor: {
          type: String,
          default: '#fff'
        }, 
        leftIcon:{
          type:String,
          default:'icon-you'
        }, 
        leftText: {
          type: String,
          default: '返回'
        },
        title: {
          type: String,
          default: '标题'
        },
        rightIcon: {
          type: String,
          default: ' '
        }, 
        rightText: {
          type: String,
          default: ''
        }, 
        tel:{
          type: String,
          default:'0'
        },
        color:{
            type:String,
            default:'#000'
        },
    },
    components:{

    },
    methods:{
      LeftBtn(){
        this.$router.back();
      },
      btnIcon:function(){
        this.$emit('btnIcon', {});
      },
      btnText(){
        this.$emit('btnText', {});
      }
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/variable"
  .wsfs
    position fixed
    width 100%
    top 0
    left 0 
    z-index 2000
    box-sizing border-box
    overflow hidden
    color #000
    .icon-font
        font-size 47px
        // font-weight bold 
        position relative
    .wrap
        display flex
        flex-direction row
        height 110px
        width 100%
        align-items center
        color #000
        transform: translateZ(0)
        -webkit-transform: translateZ(0)
        box-sizing border-box
        .left
            display flex
            flex-direction row
            width 100px
            height 100%
            align-items center
            box-sizing border-box
            padding-left 10px
            .texts
                font-size 25px
        .middle-wrap
            height 100%
            display flex 
            flex 1    
            justify-content center
            align-items center
            .text-s
                font-size 35px
                font-weight 490
        .right
            display flex
            width 100px
            height 100%
            justify-content:flex-end
            align-items center
            font-size 25px
            color $color-text-FB6334  
            flex-direction row
            box-sizing border-box
            padding-right 15px
            .iocns
                font-size 40px 
                margin-right 25px
            .text-1
                color $color-text-FB6334 
                font-size $font-size-30 
</style>