<template>
  <div class="toolbox">
    <ul class="mao-title breadcrumb">
      <li :class="muban ? 'active': ''" @click="colorChange('1')">
        <div class="icon"><span class="iconfont icon-liebiao"></span></div>
        <div class="text">模板</div>
      </li>
      <li :class="wenzi ? 'active': ''" @click="colorChange('2')">
        <div class="icon"><span class="iconfont icon-zitiyanse"></span></div>
        <div class="text">文字</div>
      </li>
      <li :class="sousuo ? 'active': ''" @click="colorChange('3')">
        <div class="icon"><span class="iconfont icon-sousuo"></span></div>
        <div class="text">搜索</div>
      </li>
      <li v-if="open" @click="openChange">
        <div class="icon"><span class="iconfont icon-unfolded-s"></span></div>
        <div class="text">展开</div>
      </li>
      <li v-if="!open" @click="openChange">
        <div class="icon"><span class="iconfont icon-shouqi"></span></div>
        <div class="text">收起</div>
      </li>
      <li @click="maoScale(1)">
        <div class="icon"><span class="iconfont icon-fangda"></span></div>
        <div class="text">放大</div>
      </li>
      <li @click="maoScale(2)">
        <div class="icon"><span class="iconfont icon-suoxiao"></span></div>
        <div class="text">缩小</div>
      </li>
      <li @click="refresh">
        <div class="icon"><span class="iconfont icon-shuaxin"></span></div>
        <div class="text">刷新</div>
      </li>
      <li v-if="!isFullscreen" @click="fullscreenClick">
        <div class="icon"><span class="iconfont icon-quanping"></span></div>
        <div class="text">全屏</div>
      </li>
      <li v-if="isFullscreen" @click="fullscreenClick">
        <div class="icon"><span class="iconfont icon-tuichuquanping"></span></div>
        <div class="text">退出</div>
      </li>
      <li @click="exportImg">
        <div class="icon"><span class="iconfont icon-xiazai"></span></div>
        <div class="text">保存</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import screenfull from 'screenfull'
const emit = defineEmits(['screenfullChange', 'maoScale', 'refresh', 'exportImg'])
defineProps(['active'])
let muban = ref(false)
let wenzi = ref(false)
let sousuo = ref(false)
const open = ref(true)
const isFullscreen = ref(false)
function colorChange(type) {
  type == '1' ? muban.value = !muban.value : type == '2' ? wenzi.value = !wenzi.value : sousuo.value = !sousuo.value
}
function openChange() {
  open.value = !open.value
}
function fullscreenClick() {
  if (!screenfull.isEnabled) {
    console.log('你的浏览器不支持全屏')
    return false
  }
  isFullscreen.value = !isFullscreen.value
  screenfull.toggle()
  emit('screenfullChange', isFullscreen)
}
function maoScale(type) {
  emit('maoScale', type)
}
function refresh() {
  emit('refresh')
}
function exportImg() {
  emit('exportImg')
}
</script>

<style lang="scss" scoped>
.toolbox{
  position: absolute;
  right: 10px;
  bottom: 40px;
  font-size: 18px;
  z-index: 20;
  ul {
    width: 48px;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    border: 1px solid #eee;
    background: #fff;
    border-radius: 4px;
    li{
      width: 46px;
      height: 52px;
      text-align: center;
      box-sizing: border-box;
      font-size: 11px;
      color: #666;
      padding: 7px 0 0 0;
      list-style-type: none;
      cursor: pointer;
      user-select: none;
      position: relative;
      line-height: 20px;
      border-top: 1px solid #eee;
      &:hover{
        color: #fff;
        background-color: #128BED;
      }
      &:first-child{
        border-top: 0;
      }
      .icon{
        display: flex;
        justify-content: center;
      }
      .text{
        line-height: 18px;
        margin-top: 3px;
      }
    }
    .active{
      color: #fff;
      background-color: #128BED;
    }
  }
}
</style>
