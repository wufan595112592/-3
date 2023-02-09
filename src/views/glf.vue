<!-- 关联方认定 -->
<template>
  <!-- <Header title="小米科技有限责任公司" :active="7" /> -->
  <div id="borrow" style="width: 100%;height: 100%;background-color: #fff;">
	  <ToolBox @maoScale="maoScale" @searchChange="searchChange" @refresh="refresh" @exportImg="exportImg" @screenfullChange="screenfullChange" />
    <div id="mountNode" style="width: 100%;height: 100%;"></div>
    <!-- 左侧按钮 -->
    <div class="wrap">
      <a v-for="(item, index) in wrapList" :key="index" href="javascript:;" :class="currentTab === index ? 'current' : ''" @click="leftTab(index)">{{ item }}</a>
    </div>
	</div>
</template>
<script>
import Header from '../components/Header/index.vue'
import ToolBox from './components/Glf/ToolBox.vue'
import Painter from '@/views/components/Glf/index.js'; 
import { ref, onMounted } from 'vue';
import D3Mixin from '@/hooks/D3Mixin'
let { toggleFullScreen, downloadImpByChart } = D3Mixin()

export default {
  components: {
    Header,
    ToolBox
  },
  setup() {
    const wrapList = ref([])
    wrapList.value = ['上交所规则', '深交所规则', '企业会计准则']
    let currentTab = ref(0)
    const toolBoxRef = ref(null)
    // 左侧菜单
    const leftTab = (index) => {
      currentTab.value = index
    }
    // 搜索
		const searchChange = (type) => {
		}
		// 缩放
		const maoScale = (type) => {
			Painter.zoomClick(type)
		}
		// 图片导出
		const exportImg = () => {
      downloadImpByChart('股权结构图谱', '北京马六级餐饮')
		}
		// 刷新
		const refresh = () => {
      Painter.refresh()
		}
		// 全屏退出
    const screenfullChange = () => {
      toggleFullScreen()
    }
    // 初始化
    const init = () => {
      window.addEventListener('resize', function () {
        const svg = document.getElementById('svg')
        svg.setAttribute('width', window.innerWidth)
        svg.setAttribute('height', window.innerHeight)
      })
      Painter.drawing()
    }
    onMounted(init)
    return { wrapList, currentTab, toolBoxRef, leftTab, searchChange, exportImg, refresh, screenfullChange, maoScale}
  },
};
</script>

<style lang="scss" scoped>
.downwardNode text,
.upwardNode text {
  font: 10px sans-serif;
}
.wrap {
  position: fixed;
  top: 156px;
  left: 30px;
  width: 106px;
  a {
    border: 1px solid #d6d6d6;
    font-size: 14px;
    display: block;
    width: 130px;
    line-height: 40px;
    box-sizing: border-box;
    text-decoration: none;
    text-align: center;
    background: #fff;
    color: #666;
    height: 42px;
    margin-bottom: 10px;
    border-radius: 2px;
    &.current {
      color: #fff;
      background: #128bed;
      border: 1px solid #128bed;
    }
  }
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

