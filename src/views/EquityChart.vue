<!-- 股权穿透图 -->
<template>
  <Header title="小米科技有限责任公司" :active="3" />
	<!-- <ToolBox @screenfullChange="screenfullChange" @maoScale="maoScale" @refresh="refresh" @exportImg="exportImg" /> -->
  <div id="borrow" style="width: 100%;height: 100%;background-color: #fff;">
    <div id="mountNode" style="width: 100%;height: 100%;"></div>
    <ToolBox v-if="show" ref="toolBoxRef" @maoScale="maoScale" @simpleChange="simpleChange" @editChange="editChange" @refresh="refresh" @exportImg="exportImg" @screenfullChange="screenfullChange" />
    <!-- <DetailContent /> -->
    <RelationDetail />
  </div>
</template>
<script>
import Header from '../components/Header/index.vue'
import ToolBox from './components/Equity/ToolBox.vue'
import DetailContent from './components/DetailContent.vue'
import RelationDetail from './components/RelationDetail.vue'
import { drawing, simpleChange1, zoomClick, editChange1 } from './components/Equity/index.js'
import D3Mixin from '@/hooks/D3Mixin'
import { ref, onMounted } from 'vue'
let { toggleFullScreen, downloadImpByChart } = D3Mixin()
export default {
  components: {
    Header,
    ToolBox,
    DetailContent,
    RelationDetail
  },
  setup() {
    let show = ref(true)
    const toolBoxRef = ref(null)
    const exportImg = () => {
      downloadImpByChart('股权穿透图谱', '北京马六级餐饮')
    }
    const simpleChange = (val) => {
      simpleChange1(val.value)
    }
    const maoScale = (val) => {
      zoomClick(val)
    }
    const editChange = (val) => {
      editChange1(val.value)
    }
    const refresh = () => {
      toolBoxRef.value.simpleChange()
      toolBoxRef.value.editChange()
      toolBoxRef.value.showBox()
      show.value = false
      setTimeout(function () {
        show.value = true
      }, 2)
      drawing()
    }
    const screenfullChange = () => {
      toggleFullScreen()
    }
    onMounted(drawing)
    return {
      show,
      toolBoxRef,
      simpleChange,
      maoScale,
      editChange,
      refresh,
      exportImg,
      screenfullChange
    }
  }
};
</script>

<style lang="scss" scoped>
.downwardNode text,
.upwardNode text {
  font: 10px sans-serif;
}

.downwardLink {
  fill: none;
  stroke-width: 1px;
  /* opacity: 0.5; */
}

.upwardLink {
  fill: none;
  stroke-width: 1px;
  /* opacity: 0.5; */
}
::v-deep .downLine {
  stroke: #128bed;
  stroke-dasharray: 6, 2;
  stroke-dashoffset: 20;
  animation: 1s down-lines infinite linear;
  z-index: 999;
  opacity: 1;
  stroke-width: 2px;
}
::v-deep .upLine {
  stroke: #128bed;
  stroke-dasharray: 6, 2;
  stroke-dashoffset: 20;
  animation: 1s up-lines infinite linear;
  z-index: 999;
  opacity: 1;
  stroke-width: 2px;
}
@keyframes down-lines {
  0% {
    stroke-dashoffset: 10;
  }

  100% {
    stroke-dashoffset: -10;
  }
}
@keyframes up-lines {
  0% {
    stroke-dashoffset: -10;
  }

  100% {
    stroke-dashoffset: 10;
  }
}
::v-deep .isExpand {
  dominant-baseline: middle;
  text-anchor: middle;
}

::v-deep .linkname {
  text-anchor: middle;
}
</style>

