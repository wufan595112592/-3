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
  <div v-show="show" class="relation-muban">
    <div class="header">
      <div class="title">筛选</div>
      <div class="filter-close"><span>×</span></div>
    </div>
    <div class="body">
      <div class="row-panel">
        <div class="key">层级</div>
        <div class="val">
          <a class="btn">一层</a>
          <a class="btn active">二层</a>
        </div>
      </div>
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
          <div class="inputRange-div">
            <a-slider id="itxst" :tooltipVisible="false" :tip-formatter="investFormatter" :default-value="0" :min="0" :max="100" />
          </div>
          <div class="RangeLabel">
            <div class="pull-left">0%</div>
            <div class="pull-center">{{ investment ? investment + '%' : '未选择' }}</div>
            <div class="pull-right">100%</div>
          </div>
        </div>
      </div>
      <div class="row-panel">
        <div class="key">关系</div>
        <div class="val">
          <a class="btn active">全部</a>
          <a class="btn">直接投资</a>
          <a class="btn">股东投资</a>
          <a class="btn">董监高法投资</a>
        </div>
      </div>
      <div class="split-line"><div></div></div>

      <div class="filter-form-group">
        <div class="input-wrap">
          <span v-show="inputVal" id="ClearInput" @click="clearInput">×</span>
          <input id="FocusInput" v-model="inputVal" type="text" placeholder="请输入您想查询的公司/个人" class="form-control">
        </div> 
        <button id="FocusBt" type="submit" class="btn-search btn btn-primary focusDisable btn-icon btn-top" :class="inputVal ? '' : 'disable'" style="height: 32px;">聚焦</button>
      </div>

      <div class="tp-list">
        <div v-for="(item, index) in list" :key="item.id" class="list-item">
          <span class="item" :class="item.isCheck ? 'active' : ''"></span>
          <span class="app-auto-logo" style="width: 32px; height: 32px;">
            <img src="https://image.qcc.com/logo/9cce0780ab7644008b73bc2120479d31.jpg?x-oss-process=style/logo_200" :alt="item.name" style="width: 32px; height: 32px; border: 1px solid rgb(238, 238, 238); border-radius: 4px;"></span>
            <span class="name">{{ index + 1 }}. {{ item.name }}</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
const emit = defineEmits(['screenfullChange', 'maoScale', 'refresh', 'exportImg','showBox', 'textShowChange'])
defineProps(['active'])
let list = ref([])
list.value = [
  { id: 1, name: '小米科技有限责任公司', img: '', isCheck: true, }
]
let inputVal = ref('')
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

function clearInput() {
  inputVal.value = ''
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
.btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  border-radius: 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  box-shadow: none !important;
  border: 1px solid #ddd;
  border-radius: 2px;
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
        // .inputRange-div {
        //   margin: auto 0;
        //   position: absolute;
        //   left: 0;
        //   top: 50%;
        //   transform: translate(0, -50%);
        // }
        .btn {
          display: inline-block;
          margin-right: 10px;
          box-sizing: border-box;
          border-radius: 2px;
          font-size: 12px;
          padding: 5px 16px;
          position: relative;
          border: 1px solid #d6d6d6;
          color: #333;
          background-color: #fff;
          &.active {
            background: white;
            color: #128bed;
            border: #128bed 1px solid;
            -webkit-box-shadow: none;
            box-shadow: none;
          }
        }
        &.range{
          margin-bottom: 5px;
          width: 360px;
          min-height: 40px;
        }
      }
    }
    .split-line {
      padding: 0 15px;
      & div{
        border-bottom: 1px solid #eee;
      }
    }
    .filter-form-group{
      padding: 20px 15px 20px;
      box-sizing: border-box;
      overflow: hidden;
      .input-wrap {
        float: left;
        width: 400px;
        position: relative;
        .input-wrap span {
          cursor: pointer;
        }
      }
      span {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translate(0, -50%);
        color: #d6d6d6;
        z-index: 1;
        cursor: pointer;
      }
      input {
        width: 400px;
        float: left;
        border-radius: 2px;
        border-color: #d8d8d8;
        height: 32px !important;
      }
      .btn-search {
        font-size: 14px;
        border-radius: 2px;
        padding: 5px 12px;
        float: right;
        height: 32px;
        color: #fff;
        &.disable {
          background-color: #88C5F6;
          border: 1px solid #88C5F6;
          cursor: not-allowed;
        }
      }
    }
    .tp-list {
      height: 190px;
      overflow-y: auto;
      position: relative;
      .list-item {
        padding: 8px 15px;
        cursor: pointer;
        .item {
          position: relative;
          top: 3px;
          display: inline-block;
          width: 14px;
          height: 14px;
          background: url('@/assets/checkbox.png') 14px 14px;
          background-position: -14px 0;
          background-size: cover;
          margin-right: 5px;
          &.active {
            background-position: 0 0;
          }
        }
        .app-auto-logo {
          display: inline-block;
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;
          position: relative;
          width: 32px;
          height: 32px;
          img{
            width: 32px;
            height: 32px;
            border: 1px solid rgb(238, 238, 238);
            border-radius: 4px;
            object-fit: contain;
          }
        }
        .name {
          margin-left: 5px;
          width: 86%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          float: right;
          line-height: 32px;
        }
      }
    }
  }
  .RangeLabel {
    position: absolute;
    left: 0;
    width: 360px;
    bottom: -8px;
    div {
      color: #666;
      font-size: 12px;
    }
    .pull-left {
      float: left;
    }
    .pull-center {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .pull-right {
      float: right;
    }
  }
}
</style>
