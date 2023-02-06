<template>
  <div class="toolbox">
    <ul class="mao-title breadcrumb">
      <li :class="show ? 'active': ''" @click="showBox(true)">
        <div class="icon"><span class="iconfont icon-liebiao"></span></div>
        <div class="text">模板</div>
      </li>
      <li :class="text ? 'active': ''" @click="textShowChange(true)">
        <div class="icon"><span class="iconfont icon-zitiyanse"></span></div>
        <div class="text">文字</div>
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
      <li v-if="!isFullscreen" @click="fullscreenClick(true)">
        <div class="icon"><span class="iconfont icon-quanping"></span></div>
        <div class="text">全屏</div>
      </li>
      <li v-if="isFullscreen" @click="fullscreenClick(true)">
        <div class="icon"><span class="iconfont icon-tuichuquanping"></span></div>
        <div class="text">退出</div>
      </li>
      <li @click="exportImg">
        <div class="icon"><span class="iconfont icon-xiazai"></span></div>
        <div class="text">保存</div>
      </li>
    </ul>
  </div>
  <div v-if="show" class="relation-muban">
    <div class="header">
      <div class="title">筛选</div>
      <div class="filter-close"><span>×</span></div>
    </div>
    <div class="body">
      <div class="row-panel">
        <div class="key">状态</div>
        <div class="val">
          <a class="btn active">全部</a>
          <a class="btn">吊销</a>
          <a class="btn">注销</a>
          <a class="btn">存续</a>
        </div>
      </div>

      <div class="row-panel">
        <div class="key range">持股</div>
        <div class="val range">
          <a-slider id="itxst" :default-value="10" :min="1" :max="100" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
const emit = defineEmits(['screenfullChange', 'maoScale', 'refresh', 'exportImg','showBox', 'textShowChange'])
defineProps(['active'])
let show = ref(false)
let text = ref(true)
let isFullscreen = ref(false)
let shareholding = ref(0)
let investment = ref(0)
const state = ref([])
state.value = [true, true]
function stateChange(value, bool = false) {
  if (bool) {
    state.value[value] = !state.value[value]
  } else {
    state.value = [bool, bool]
  }
}
function shareFormatter(value) {
  shareholding.value = value
}

function investFormatter(value) {
  investment.value = value
}
function showBox(bool = false) {
  if (bool) {
    show.value = !show.value
  } else {
    show.value = bool
  }
}
function textShowChange(bool = false) {
  if (bool) {
    text.value = !text.value
    emit('textShowChange', text)
  } else {
    text.value = bool
  }
}
function fullscreenClick(bool) {
  emit('screenfullChange')
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

defineExpose({ textShowChange })
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
.relation-muban{
  width: 500px;
  height: 560px;
  background: white;
  box-shadow: 0px 2px 4px 0px rgb(0 0 0 / 20%);
  position: fixed;
  bottom: 100px;
  right: 70px;
  border-radius: 6px;
  z-index: 1000;
  .header{
    border-bottom: 1px solid #eee;
    height: 55px;
    line-height: 55px;
    font-size: 16px;
    font-weight: bold;
    position: relative;
    padding: 0 15px;
    .filter-close{
      position: absolute;
      right: 15px;
      display: inline-block;
      font-size: 26px;
      top: 50%;
      transform: translate(0, -50%);
      font-weight: bold;
      cursor: pointer;
      span{
        color: #128BED;
      }
    }
  }
  .body {
    padding: 15px 0;
    .row-panel {
      margin-bottom: 20px;
      overflow: hidden;
      padding: 0 15px;
      .key {
        float: left;
        margin-right: 15px;
        line-height: 32px;
      }
      .val {
        float: left;
        min-height: 32px;
        position: relative;
        .btn {
          display: inline-block;
          margin-right: 15px;
          width: 82px;
          height: 32px;
          box-sizing: border-box;
          border-radius: 2px;
          font-size: 12px;
          padding: 0;
          line-height: 30px;
          border: 1px solid #d6d6d6 !important;
          color: #333 !important;
          background-color: #fff !important;
          color: #333;
          background-image: none;
        }
      }
      a.active {
        background: white !important;
        color: #128bed !important;
        border: #128bed 1px solid !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
      }
    }
  }
}
</style>
