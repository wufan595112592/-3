<template>
  <div class="toolbox">
    <ul class="mao-title breadcrumb">      

      <li v-if="hasButon(Buttons.FILTER)" :class="show ? 'active': ''" @click="showBox(true)">
        <div class="icon"><span class="iconfont icon-liebiao"></span></div>
        <div class="text">筛选</div>
      </li>
      <li v-if="hasButon(Buttons.ABBREVIATE)" :class="simple ? 'active': ''" @click="simpleChange(true)">
        <div class="icon"><span class="iconfont icon-zitiyanse"></span></div>
        <div class="text">简称</div>
      </li>

      <li v-if="hasButon(Buttons.TEMPLATE)" :class="simple ? 'active': ''" @click="openTemplate(true)">
        <div class="icon"><span class="iconfont icon-zitiyanse"></span></div>
        <div class="text">模板</div>
      </li>

      <li v-if="hasButon(Buttons.EDIT)" :class="edit ? 'active': ''" @click="editChange(true)">
        <div class="icon"><span class="iconfont icon-sousuo"></span></div>
        <div class="text">编辑</div>
      </li>
      <li v-if="hasButon(Buttons.ZOOMIN)" @click="maoScale(1)">
        <div class="icon"><span class="iconfont icon-fangda"></span></div>
        <div class="text">放大</div>
      </li>
      <li v-if="hasButon(Buttons.ZOOMOUT)" @click="maoScale(2)">
        <div class="icon"><span class="iconfont icon-suoxiao"></span></div>
        <div class="text">缩小</div>
      </li>
      <li v-if="hasButon(Buttons.REFRESH)" @click="refresh">
        <div class="icon"><span class="iconfont icon-shuaxin"></span></div>
        <div class="text">刷新</div>
      </li>
      <template v-if="hasButon(Buttons.FULLSCREEN)">
        <li v-if="!isFullscreen" @click="fullscreenClick(true)">
        <div class="icon"><span class="iconfont icon-quanping"></span></div>
        <div class="text">全屏</div>
      </li>
      <li v-if="isFullscreen" @click="fullscreenClick(true)">
        <div class="icon"><span class="iconfont icon-tuichuquanping"></span></div>
        <div class="text">退出</div>
      </li>
      </template>
      
      <li v-if="hasButon(Buttons.SAVE)" @click="exportImg">
        <div class="icon"><span class="iconfont icon-xiazai"></span></div>
        <div class="text">保存</div>
      </li>      
    </ul>
  </div>
  
</template>

<script setup>
import { ref, defineExpose  } from 'vue'
import  Buttons from './buttons';

const emit = defineEmits(['screenfullChange', 'maoScale', 'refresh', 'exportImg','showBox', 'editChange', 'simpleChange', 'openTemplate'])
const props = defineProps({
    active: Boolean,
    buttonGroup: {
        type: Number,
        default() {
            return  Buttons.ZOOMOUT |
                Buttons.ZOOMIN |
                Buttons.REFRESH |
                Buttons.FULLSCREEN |
                Buttons.SAVE;
        }
    }
})


let show = ref(false)
let simple = ref(false)
let edit = ref(false)
let isFullscreen = ref(false)
let shareholding = ref(0)
let investment = ref(0)
const state = ref([])
state.value = [true, true]

/**
 * 
 */
function hasButon(type) {  
  return (props.buttonGroup & type) === type;
}

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

function openTemplate() {
   emit('openTemplate')
}

defineExpose({ simpleChange, editChange })
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
