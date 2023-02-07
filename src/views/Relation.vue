<!-- 关系图谱 -->
<template>
	<Header title="小米科技有限责任公司" :active="1" />
	
	<div id="borrow" style="width: 100%;height: 100%;background: #fff;">
		<Legend />
		<ToolBox @screenfullChange="screenfullChange" @maoScale="maoScale" @refresh="refresh" @exportImg="exportImg" @textShowChange="textShowChange" />
		<div id="MainCy" style="width: 100%;height: 100%;"></div>
		<div id="MainD3" scale="1" class="no-padding tp-container">
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">
			</svg>
		</div>
	</div>
</template>
<script>
import { ref, onMounted } from 'vue'
import Header from '../components/Header/index.vue'
import ToolBox from './components/Relation/ToolBox.vue'
import Legend from './components/Relation/Legend.vue'
import { init, zoomClick, downImg, textShow } from "./components/Relation/index.js";
import D3Mixin from '@/hooks/D3Mixin'
let { toggleFullScreen } = D3Mixin()
export default {		
	components: {
		Header,
		ToolBox,
		Legend
  },
	setup() {
		// 缩放
		const maoScale = (type) => {
			zoomClick(type)
		}
		// 导出png
		function exportImg() {
			downImg()
		}
		function refresh() {
			init()
		}
		// 全屏退出
		const screenfullChange = () => {
      toggleFullScreen()
		}
		function textShowChange(val) {
			textShow()
		}
			onMounted(init)
			return { exportImg , refresh, screenfullChange, textShowChange, maoScale }
	}
}

</script>

<style lang="scss" scoped>
	.box {
		width: 100vw;
		height: 100vh;
		background-color: #cbe8ff;
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
</style>
