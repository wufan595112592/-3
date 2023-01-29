<template>
  <div class="mao-head">
    <div class="container">
      <ul class="mao-title">
        <li><a href='/' target="_">{{title}}</a></li>
      </ul>
      <ul id="navTab" class="mao-nav clearfix">
        <li v-for="item in navList" :key="item.value" :class="active === item.value ? 'active': ''"><a :href='item.path'>{{item.label}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
defineProps(['title', 'active'])
const navList = reactive([
  { label: '企业关系图谱', value: 1, path: '/' },
  { label: '企业构成图谱', value: 2, path: '/company-chart' },
  { label: '股权穿透图谱', value: 3, path: '/equity-chart' },
  { label: '股权结构图谱', value: 4, path: '/structure-chart' },
  { label: '企业受益股东', value: 5, path: '/beneficiary-person' },
  { label: '关联方认定图', value: 7, path: '/glf' },
  { label: '实际控制人', value: 8, path: '/kzr' },
  { label: '关联关系探查', value: 9, path: '/exploration' },
])
</script>

<style lang="scss" scoped>
.mao-head{
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height:50px;
  z-index: 10;
  background: rgba(255,255,255,0.9);
  
  .container{
    width: 1060px;
    height:50px;
    margin: 0 auto;
  }
  .mao-title{
    float: left;
    font-size: 14px;
    color: #128bed;
    height: 50px;
    li {
      height: 100%;
      a {
        line-height: 50px;
        display: inline-block;
        max-width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #128bed;
        display: inline-block;
      }
    }
  }
  .mao-nav {
    float: left;
    font-size: 14px;
    color: #666;
    margin: 0;
    padding-left: 0px;
    height: 50px;
    li{
      margin-left: 30px;
      position: relative;
      height: 50px;
      float: left;
      padding-right: 0;
      a {
        line-height: 50px;
        color: #3c4144;
        display: inline-block;
        background-color: transparent;
      }
      &.active{
        a{
          color: #128bed;
          height: 45px;
          border-bottom: 2px solid #128bed;
        }
      }
      &:hover {
        a{
          color: #128bed;
        }
      }
    }
  }
}
</style>
