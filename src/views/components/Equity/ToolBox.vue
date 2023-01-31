<template>
  <div class="toolbox">
    <ul class="mao-title breadcrumb">
      <li :class="show ? 'active': ''" @click="showBox(true)">
        <div class="icon"><span class="iconfont icon-liebiao"></span></div>
        <div class="text">筛选</div>
      </li>
      <li :class="simple ? 'active': ''" @click="simpleChange(true)">
        <div class="icon"><span class="iconfont icon-zitiyanse"></span></div>
        <div class="text">简称</div>
      </li>
      <li :class="edit ? 'active': ''" @click="editChange(true)">
        <div class="icon"><span class="iconfont icon-sousuo"></span></div>
        <div class="text">编辑</div>
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
  <div v-if="show" class="equity-filter-container nmodal">
    <div class="equity-filter-header">
    筛选
    <span class="ntag vip-n m-l-n-xxs"></span> 
    <a type="button" class="nclose">
      <span class="close-btn" @click="showBox">×</span>
      <!-- <i class="iconfont icon-icon_guanbixx close-btn"></i> -->
    </a>
    </div> 
    <div class="equity-filter-body">
      <div class="section">
        <div class="section-header">
          企业登记状态
          <div class="header-option">
            <input type="checkbox">
            是否显示企业状态
          </div>
        </div> 
        <div class="main">
          <span class="tag btn-default" :class="state[0] ? 'active' : ''" @click="stateChange(0, true)">在业/存续</span>
          <span class="tag btn-default" :class="state[1] ? 'active' : ''" @click="stateChange(1, true)">其他状态</span>
        </div>
      </div> 
      <div class="section">
        <div class="section-header">股东持股比例</div> 
        <div class="slider-container">
          <a-slider id="itxst" :tooltipVisible="false" :tip-formatter="shareFormatter" :default-value="0" :min="0" :max="50" />
          <span class="range-value value-0">0</span>
          <span class="range-value value-float">{{ shareholding }}%</span> 
          <span class="range-value value-100">高于50%</span>
        </div>
      </div>
      <div class="section">
        <div class="section-header">对外投资比例</div> 
        <div class="slider-container">
          <a-slider id="itxst" :tooltipVisible="false" :tip-formatter="investFormatter" :default-value="0" :min="0" :max="100" />
          <span class="range-value value-0">0</span>
          <span class="range-value value-float">{{ investment }}%</span>
          <span class="range-value value-100">100%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
const emit = defineEmits(['screenfullChange', 'maoScale', 'refresh', 'exportImg','showBox', 'editChange', 'simpleChange'])
defineProps(['active'])
let show = ref(false)
let simple = ref(false)
let edit = ref(false)
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
function simpleChange(bool = false) {
  if (bool) {
    simple.value = !simple.value
    emit('simpleChange', simple)
  } else {
    simple.value = bool
  }
}
function editChange(bool = false) {
  if (bool) {
    edit.value = !edit.value
    emit('editChange', edit)
  } else {
    edit.value = bool
  }
}
function fullscreenClick() {
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

defineExpose({ simpleChange, editChange, showBox })
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
.equity-filter-container{
  font-family: "Microsoft YaHei", Arial, sans-serif;
  width: 500px;
  height: 400px;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px 0px;
  background-color: #fff;
  position: absolute;
  right: 70px;
  bottom: 100px;
  overflow: hidden;
  background-size: 360px 280px;
  line-height: 1.2;
  .equity-filter-header {
    position: relative;
    height: 56px;
    color: #333;
    font-size: 16px;
    line-height: 56px;
    padding: 0 15px;
    border-bottom: 1px solid #eeeeee;
    font-weight: bold;
  }
  .equity-filter-body {
    padding: 0 15px;
    .section {
      padding-top: 20px;
      .section-header {
        color: #666;
        font-size: 14px;
        position: relative;
        .header-option {
          float: right;
          position: relative;
          input {
            position: relative;
            top: 1px;
            cursor: pointer;
          }
        }
      }
      .main {
        width: 100%;
        overflow: hidden;
        .tag {
          box-sizing: border-box;
          font-size: 12px;
          text-align: center;
          line-height: 31px;
          float: left;
          display: block;
          cursor: pointer;
          width: 17.4%;
          height: 32px;
          border-radius: 2px;
          border: 1px solid #d6d6d6;
          margin-right: 15px;
          margin-top: 15px;
        }
        .tag.active {
          color: #128BED !important;
          border-color: #128BED !important;
        }
      }
      .slider-container {
        position: relative;
        margin-top: 15px;
        width: 400px;
        .ant-slider {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          color: #333333;
          font-size: 14px;
          font-variant: tabular-nums;
          line-height: 1.5;
          list-style: none;
          font-feature-settings: 'tnum';
          position: relative;
          height: 12px;
          margin: 14px 6px 10px;
          padding: 4px 0;
          cursor: pointer;
          touch-action: none;
          margin-left: 0;
          margin-right: 0;
          .ant-slider-handle {
            position: absolute;
            width: 14px;
            height: 14px;
            margin-top: -5px;
            background-color: #fff;
            border: solid 2px #8fd8ff;
            border-radius: 50%;
            box-shadow: 0;
            cursor: pointer;
            transition: border-color 0.3s, box-shadow 0.6s, transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
            border-color: #128bed;
          }
        }
        .range-value {
          color: #999;
          font-size: 14px;
          display: inline-block;
        }
        .range-value.value-float {
          position: absolute;
          color: #128BED;
          left: 50%;
          transform: translate(-50%, 0);
        }
        .range-value.value-100 {
          float: right;
        }
      }
    }
  }
}
.nmodal {
  .nclose {
    color: #128bed;
    float: right;
    width: 22px;
    height: 22px;
    background-size: 22px 22px;
    font-weight: normal;
    background: none;
    .close-btn {
      font-size: 36px;
      color: #bbb;
    }
  }
}
</style>
