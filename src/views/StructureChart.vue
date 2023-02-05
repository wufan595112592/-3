<!-- 股权结构图 -->
<template>
  <Header title="小米科技有限责任公司" :active="4" />
  <div id="borrow" style="width: 100%;height: 100%;background-color: #fff;">
		<div class="box" style="width: 100%;height: 100%;">
			<div id="MainCy" style="width: 100%;height: 100vh;overflow-x: hidden;overflow-y: auto;"></div>
		</div>
		<ToolBox ref="toolBoxRef" @maoScale="maoScale" @openAll="openAll" @refresh="refresh" @exportImg="exportImg" @screenfullChange="screenfullChange" />
		<Collapse @clickTab="clickTab" />
	</div>
</template>

<script>
// import d3 from './components/Equity/d3.min.js'
import Header from '../components/Header/index.vue'
import ToolBox from './components/Structure/ToolBox.vue'
import Collapse from './components/Structure/Collapse.vue'
import { drawing, zoomClick } from './components/Structure/index.js'
import { ref, onMounted } from 'vue'
import D3Mixin from '@/hooks/D3Mixin'
let { toggleFullScreen, downloadImpByChart } = D3Mixin()

export default {
	components: {
		Header,
		ToolBox,
		Collapse
	},
	setup() {
		const isOpen = ref(false)
		const toolBoxRef = ref(null)
		// 缩放
		const maoScale = (type) => {
			zoomClick(type)
		}
		// 展开收起
		const openAll = () => {
      drawing(isOpen.value)
			isOpen.value = !isOpen.value
		}
		// 图片导出
		const exportImg = () => {
      downloadImpByChart('股权结构图谱', '北京马六级餐饮')
		}
		// 刷新
		const refresh = () => {
			toolBoxRef.value.openAll()
			isOpen.value = false
      drawing()
		}
		// 全屏退出
    const screenfullChange = () => {
      toggleFullScreen()
		}
		// 左侧菜单
		const clickTab = () => {
			isOpen.value = false
		}
		onMounted(drawing)
		return { isOpen, toolBoxRef, exportImg, refresh, screenfullChange, maoScale, openAll, clickTab }
	}
}
</script>

<style scoped>
 .box {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
.link {
  fill: none;
  stroke: #d8d8d8;
  stroke-width: 0.5px;
}
.bg{
	background: #666;
}
</style>
