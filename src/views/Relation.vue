<!-- 关系图谱 -->
<template>
  <ToolBox v-model:isShowFilter="isShowFilter"
           v-model:isShowWords="isShowWords"
           :buttonGroup="buttons"
           @maoScale="maoScale"
           @refresh="refresh"
           @exportImg="exportImg"/>
  <RelationFilter ref="filter" :data="list" v-model:visiable="isShowFilter" @resetState="resetFilterState" @focusSelected="focusSelected" @stateChange="filterStateChange"/>
  <Legend/>
  <RelationDetail ref="detail" @stateChange="filterStateChange" />
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
import RelationDetail from '@/views/components/Relation/RelationDetail.vue'
import RelationFilter from '@/views/components/Relation/RelationFilter.vue';

// import { relation } from './components/Relation/index.js'
import $ from 'jquery'
import cytoscape from 'cytoscape'
import * as d3 from 'd3'
import Buttons from '@/views/components/ToolBox/buttons';
import Painter from '@/views/components/Relation/index.js';
import relativeJson from "@/api/relativeJson.json";
import store from '../store';

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
      buttons: Buttons.FILTER | Buttons.WRITTENWORDS | Buttons.ZOOMIN | Buttons.ZOOMOUT | Buttons.REFRESH | Buttons.FULLSCREEN | Buttons.SAVE,
      DetailShow: true,
      isShowFilter: true,
      isShowWords: true,
      list: []
    }
  },
  watch: {
    isShowWords(newVal, oldVal) {
      Painter.wordsChange(newVal)
    }
  },
  created() {
    // HTTP 请求
  },
  mounted() {
    Painter.init('MainCy');
    Painter.register({
      backgroudClick: () => {
        const preStatus =   this.isShowFilter ;
        this.isShowFilter = false;          
        return preStatus;
      }
    })
    this.getData(relativeJson.data);
  },
  methods: {
    getData(data) {
      this.list = data.nodes.map(a => Object.assign(a, { checked: true }))
      Painter.getData(data, "534472fd-7d53-4958-8132-d6a6242423d8");
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
    resetFilterState() {
        Painter.cancelAllHighLight();
        Painter.allLinkHighLight();
    },
    refresh() {
      this.isShowFilter = false;
      this.isShowWords = true;
      this.$refs.filter.resetState();
      this.getData(relativeJson.data);
      store.commit('setCurrentNode', null)
      // Painter.refresh({
      //   name,
      //   randomize,
      //   animate,
      // })
    },
    focusSelected(id){
        Painter.focusSelected(id)
    },
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
