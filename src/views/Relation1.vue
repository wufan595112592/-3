<!-- 关系图谱 -->
<template>
  <ToolBox v-model:isShowFilter="isShowFilter"
           :buttonGroup="buttons"
           @maoScale="maoScale"
           @refresh="refresh"
           @exportImg="exportImg"/>
  <RelationFilter ref="filter" v-model:visiable="isShowFilter" @stateChange="filterStateChange"/>
  <Legend/>

  <!-- <RelationDetail v-if="DetailShow" @close="close" /> -->
  <div style="width: 100%;height: 100%;">
    <div id="MainCy" style="width: 100%;height: 100%;"></div>
    <!-- <div id="MainD3" scale="1" class="no-padding tp-container">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">
      </svg> -->
    <!-- </div> -->
  </div>
</template>
<script>
import Header from '../components/Header/index.vue'
import ToolBox from './components/ToolBox/index.vue'
import Legend from './components/Relation/Legend.vue'
import RelationDetail from './components/RelationDetail.vue'
import RelationFilter from '@/views/components/Relation/RelationFilter.vue';

// import { relation } from './components/Relation/index.js'
import $ from 'jquery'
import cytoscape from 'cytoscape'
import * as d3 from 'd3'
import Buttons from '@/views/components/ToolBox/buttons';
import Painter from '@/views/components/Relation/index.js';
import relativeJson from "@/api/relativeJson.json";


export default {
  components: {
    Header,
    ToolBox,
    Legend,
    RelationDetail,
    RelationFilter
  },
  data() {
    return {
      buttons: Buttons.FILTER | Buttons.ABBREVIATE | Buttons.EDIT | Buttons.ZOOMIN | Buttons.ZOOMOUT | Buttons.REFRESH | Buttons.FULLSCREEN | Buttons.SAVE,
      DetailShow: true,
      isShowFilter: false
    }
  },
  created() {
    // HTTP 请求
  },
  mounted() {
    Painter.init('MainCy');
    Painter.register({
      backgroudClick: () => {
        this.isShowFilter  = false;
      }
    })
    this.getData(relativeJson.data);
  },
  methods: {
    getData(data) {
      Painter.getData(data, "534472fd-7d53-4958-8132-d6a6242423d8");
    },
    // 关闭左侧信息弹框
    close() {
      this.DetailShow = false
    },
    /**
     * 图谱缩放
     * type == 1  放大
     * type == -1  缩小
     */
    maoScale(type) {
      Painter.maoScale(type);
    },
    // 导出png
    exportImg() {
      Painter.exportImg();
    },
    refresh() {
      this.isShowFilter = false;
      this.$refs.filter.resetState();
      this.getData(relativeJson.data);
      // Painter.refresh({
      //   name,
      //   randomize,
      //   animate,
      // })
    },
    //
    filterStateChange(event) {
      Painter.filter(event);
    }
  }
}
</script>

<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  background-color: #cbe8ff;
}
</style>
