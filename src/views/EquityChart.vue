<!-- 股权穿透图 -->
<template>
  <Header title="小米科技有限责任公司" :active="3" />
	<!-- <ToolBox @screenfullChange="screenfullChange" @maoScale="maoScale" @refresh="refresh" @exportImg="exportImg" /> -->
	<ToolBox @maoScale="maoScale" @simpleChange="simpleChange" @editChange="editChange" />

  <div id="mountNode" style="width: 100%;height: 100%;"></div>
</template>
<script>
import Header from '../components/Header/index.vue'
import ToolBox from './components/Equity/ToolBox.vue'
import { drawing, simpleChange1, zoomClick, editChange1 } from './components/Equity/index.js'
import { D3Mixin } from '@/mixin/D3Mixin'

export default {
  components: {
    Header,
    ToolBox
  },
  mixins: [D3Mixin],
  data() {
    return {
    };
  },
  mounted() {
    window.addEventListener('resize', function () {
      const svg = document.getElementById('svg')
      svg.setAttribute('height', window.innerHeight)
    })
    drawing()
  },
  methods: {
    simpleChange(val) {
      simpleChange1(val.value)
    },
    maoScale(val) {
      // zoomClick(val.value)
    },
    editChange(val) {
      editChange1(val.value)
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

