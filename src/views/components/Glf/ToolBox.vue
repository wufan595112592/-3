<template>
	<div class="toolbox">
		<ul class="mao-title breadcrumb">
			<li @click="searchChange(true)">
				<div class="icon"><span class="iconfont icon-sousuo"></span></div>
				<div class="text">搜索</div>
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
	<div v-show="show" id="search-box" class="box-detail">
		<div class="m_search-box animated fadeIn">
			<div class="ma_top-bar e_close-bar">
				<span class="ea_title">
					<span v-for="(item,index) in tabList" :key="index" class="ma_bar-all" :class="currentTab === index ? 'current': ''" @click="tabClick(index)">{{ item }}</span>
				</span>
				<span class="ea_close" @click="close">×</span>
			</div>
			<div class="ma_search-group input-group">
				<a class="clear-searchkey" style="display: none;"></a>
				<input type="text" placeholder="请输入筛选名称" value="" autocomplete="off"
					class="ma_search-input form-control headerKey">
				<label :class="isOpen ? 'active' : ''">
					<span class="label-span" @click="openAll">
						<span style="margin-right:9px">{{ isOpen ? '全部收起' : '全部展开' }}</span>
						<span class="iconfont" :class="isOpen ? 'icon-top' : 'icon-bottom'"></span>
					</span>
				</label>
			</div>
			<div class="ma_items-container">
				<div v-for="(item, index) in list" :key="item.Id" class="ma_item">
					<div v-if="currentTab === 0" class="ma_item-top">
						<img alt="company"
							src="https://image.qcc.com/auto/1ea557c511d6c06423d0519a364ae0a5.jpg?x-oss-process=style/logo_120"
							onerror="this.src='//qcc-static.qcc.com/resources/web/omaterial/company.jpeg'">
						<a href="https://www.qcc.com/firm/1ea557c511d6c06423d0519a364ae0a5.html" target="_blank"
							class="ma_name">
							<span>{{index + 1}}. {{ item.Name }}</span>
						</a>
						<span>
							<span v-if="item.stateType" class="ma_tag ntag text-success tooltip-br">存续</span>
							<span v-else class="ma_tag ntag text-danger tooltip-br">注销</span>
						</span>
						<span class="ma_arrow pull-right text-muted" :class="item.isOpen ? 'active' : ''" @click="itemOpen(index)">
							<span class="iconfont" :class="item.isOpen ? 'icon-top' : 'icon-bottom'"></span>
						</span>
					</div>
					<div v-else class="ma_item-top">
						<img alt="company"
							src="https://image.qcc.com/auto/1ea557c511d6c06423d0519a364ae0a5.jpg?x-oss-process=style/logo_120"
							onerror="this.src='//qcc-static.qcc.com/resources/web/omaterial/company.jpeg'">
						<a href="https://www.qcc.com/firm/1ea557c511d6c06423d0519a364ae0a5.html" target="_blank"
							class="ma_name">
							<span>{{index + 1}}. {{ item.Name }}</span>
						</a>
						<span class="ma_arrow pull-right text-muted" :class="item.isOpen ? 'active' : ''" @click="itemOpen(index)">
							<span class="iconfont" :class="item.isOpen ? 'icon-top' : 'icon-bottom'"></span>
						</span>
					</div>
					<!-- 折叠版 -->
					<div v-show="item.isOpen" class="fold-detail-company">
						<div class="ma_item-detail">
							<div v-if="currentTab === 0">
								<div class="detail-cell">
									<span>法定代表人：</span>
									<a href="https://www.qcc.com/firm/pr838adcb9d2819d3e0cd67b9d6ce429.html" target="_blank">林世伟</a>
								</div>
								<div class="detail-cell">
									<span>注册资本：</span>
									<span class="val">20000万元人民币</span>
								</div>
								<div class="detail-cell">
									<span>成立日期：</span>
									<span class="val">2019-06-05</span>
								</div>
							</div>
							<div v-else>
								<div class="detail-cell">
									<span>担任法人：</span>
									<span>-</span>
								</div>
								<div class="detail-cell">
									<span>对外投资：</span>
									<span>50</span>
								</div>
								<div class="detail-cell">
									<span>在外任职：</span>
									<span>50</span>
								</div>
								<div class="detail-cell">
									<span>控股企业：</span>
									<span>50</span>
								</div>
							</div>
						</div>
						<div class="ma_item-path">
							<div class="e_path">
								<div class="ea_path-title">
									关联方认定详情
									<span class="ntag text-primary">上交所</span>
									<!-- <span class="ntag text-warning">深交所</span>
									<span class="ntag text-pl">会计准则</span> -->
								</div>
								<div v-for="(ele,idx) in item.Path" :key="idx" class="single-path">
									<span v-for="(path,i) in ele" :key="i">
										<span v-if="path.Name">
											<a href="https://www.qcc.com/firm/fa902aeb2eab4ef9b9fcd1ef109ec54a.html" target="_blank">{{ path.Name }}</a>
										</span>
										<span v-else>
											<span>
												<span class="e_lang-arrow">
													<span class="ea_text">{{ path.Operation }}</span>
													<span class="ea_text">{{ path.Reason }}</span>
													<span class="ea_line"></span>
													<span v-if="path.Direction === 'OUT'" class="ea_arrow-wrap ea_left iconfont icon-caret-left"></span>
													<span v-else class="ea_arrow-wrap ea_right iconfont icon-caret-right"></span>
												</span>
											</span>
										</span>
									</span>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
const emit = defineEmits(['screenfullChange', 'maoScale', 'refresh', 'exportImg', 'searchChange',
])
// 列表数据
let list = ref([])
list.value = [
	{
		HasImage: true, Id: "fa902aeb2eab4ef9b9fcd1ef109ec54a", Name: "重庆小米创业投资有限公司", stateType: '0',
		isOpen: false,
		Path: [
			[
				{ Id: "fa902aeb2eab4ef9b9fcd1ef109ec54a", Name: "重庆小米创业投资有限公司", },
				{ Direction: "OUT", Operation: "控制", Reason: "100.00%" },
				{ Id: "9cce0780ab7644008b73bc2120479d31",Name: "小米科技有限责任公司" },
			],
			[
				{ Id: "fa902aeb2eab4ef9b9fcd1ef109ec54a", Name: "重庆小米创业投资有限公司", },
				{ Direction: "OUT", Operation: "控制", Reason: "77.80%" },
				{ Id: "p1910534b4ae98fea35ddbeb1d61cd44", Name: "雷军" },
				{ Direction: "IN", Operation: "控制", Reason: "77.80%" },
				{ Id: "9cce0780ab7644008b73bc2120479d31", Name: "小米科技有限责任公司" },
			]
		]
	},
	{
		HasImage: true, Id: "fa902aeb2eab4ef9b9fcd1ef109ec54a", Name: "重庆小米创业投资有限公司1", stateType: '0',
		isOpen: false,
		Path: [
			[
				{ Id: "fa902aeb2eab4ef9b9fcd1ef109ec54a", Name: "重庆小米创业投资有限公司", },
				{ Direction: "OUT", Operation: "控制", Reason: "100.00%" },
				{ Id: "9cce0780ab7644008b73bc2120479d31",Name: "小米科技有限责任公司" },
			],
			[
				{ Id: "fa902aeb2eab4ef9b9fcd1ef109ec54a", Name: "重庆小米创业投资有限公司", },
				{ Direction: "OUT", Operation: "控制", Reason: "77.80%" },
				{ Id: "p1910534b4ae98fea35ddbeb1d61cd44", Name: "雷军" },
				{ Direction: "IN", Operation: "控制", Reason: "77.80%" },
				{ Id: "9cce0780ab7644008b73bc2120479d31", Name: "小米科技有限责任公司" },
			]
		]
	},
	{
		HasImage: true, Id: "fa902aeb2eab4ef9b9fcd1ef109ec54a", Name: "重庆小米创业投资有限公司2", stateType: '0',
		isOpen: false,
		Path: [
			[
				{ Id: "fa902aeb2eab4ef9b9fcd1ef109ec54a", Name: "重庆小米创业投资有限公司", },
				{ Direction: "OUT", Operation: "控制", Reason: "100.00%" },
				{ Id: "9cce0780ab7644008b73bc2120479d31",Name: "小米科技有限责任公司" },
			],
			[
				{ Id: "fa902aeb2eab4ef9b9fcd1ef109ec54a", Name: "重庆小米创业投资有限公司", },
				{ Direction: "OUT", Operation: "控制", Reason: "77.80%" },
				{ Id: "p1910534b4ae98fea35ddbeb1d61cd44", Name: "雷军" },
				{ Direction: "IN", Operation: "控制", Reason: "77.80%" },
				{ Id: "9cce0780ab7644008b73bc2120479d31", Name: "小米科技有限责任公司" },
			]
		]
	},
]

// 搜索弹框显示状态
let show = ref(false)
// 全屏
let isFullscreen = ref(false)
// 当前菜单
let currentTab = ref(0)
let tabList = ref([])
tabList.value = ['所有关联企业', '所有关联自然人']

// 展开收起
let isOpen = ref(false)

function openAll() {
	const bool = !isOpen.value
	isOpen.value = bool
	list.value.forEach(item => {
		item.isOpen = bool
		return item
	})
}


function itemOpen(i) {
	list.value[i].isOpen = !list.value[i].isOpen
}
// 搜索功能按钮事件
function searchChange(bool = false) {
	if (bool && !show.value) {
		show.value = true
		emit('searchChange')
	}
}
// 头部切换
function tabClick(index) {
	currentTab.value = index
}

// 搜索弹框关闭
function close() {
	show.value = false
}

// 全屏事件
function fullscreenClick() {
	emit('screenfullChange')
}

// 缩放事件
function maoScale(type) {
	emit('maoScale', type)
}

// 刷新事件
function refresh() {
	emit('refresh')
}

// 保存事件
function exportImg() {
	emit('exportImg')
}

defineExpose({
	searchChange,
})
</script>

<style lang="scss" scoped>
	.toolbox {
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

			li {
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

				&:hover {
					color: #fff;
					background-color: #128BED;
				}

				&:first-child {
					border-top: 0;
				}

				.icon {
					display: flex;
					justify-content: center;
				}

				.text {
					line-height: 18px;
					margin-top: 3px;
				}
			}
		}
	}


label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 700;
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
	border: 1px solid #ddd;
	border-radius: 4px;
}
.box-detail {
	user-select:none;
	width: 500px;
	height: 600px;
	border-radius: 5px;
	position: fixed;
	right: 80px;
	top: 125px;
	z-index: 9999;
	background: #ffffff;
	-webkit-box-shadow: 0 0 10px rgb(0 0 0 / 50%);
	-moz-box-shadow: 0 0 10px rgba(0,0,0,0.5);
	box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px 0px;
	.input-group {
		position: relative;
		display: table;
		border-collapse: separate;
		.form-control {
			position: relative;
			z-index: 2;
			float: left;
			width: 100%;
			margin-bottom: 0;
		}
	}
	.animated {
		-webkit-animation-fill-mode: both;
		-moz-animation-fill-mode: both;
		-ms-animation-fill-mode: both;
		-o-animation-fill-mode: both;
		animation-fill-mode: both;
		-webkit-animation-duration: 0.5s;
		-moz-animation-duration: 0.5s;
		-ms-animation-duration: 0.5s;
		-o-animation-duration: 0.5s;
		animation-duration: 0.5s;
	}
  .fadeIn {
    display: block !important;
    -webkit-animation-name: fadeIn-data-v-5f846fb4;
    -moz-animation-name: fadeIn-data-v-5f846fb4;
    -o-animation-name: fadeIn-data-v-5f846fb4;
    animation-name: fadeIn-data-v-5f846fb4;
  }
  .e_close-bar {
    height: 52px;
    border-bottom: #E5E5E5 1px solid;
    padding: 0px 15px;
  }
   .m_search-box .ma_top-bar {
    position: relative;
  }
  .ma_bar-all {
    font-size: 16px;
    position: relative;
    cursor: pointer;
    height: 51px;
    padding: 0px;
    display: inline-block;
    margin-right: 30px;
    &.current {
    color: #128bed;
    border-bottom: 2px solid #128bed;
	}
}
  .e_close-bar{
    .ea_title {
      color: #333;
      font-size: 18px;
      line-height: 52px;
      float: left;
      font-weight: bold;
    }
      .ea_close {
      color: #128BED;
      font-size: 30px;
      line-height: 52px;
      float: right;
      cursor: pointer;
    }
  }
  .ma_search-group {
    border-bottom: 1px solid #EEEEEE;
    padding: 0px 15px;
    position: relative;
    height: 66px;
    width: 100%;
		span.label-span {
			position: relative;
			display: inline-block;
			color: #666666;
			font-size: 14px;
			top: 18px;
			font-weight: normal !important;
			left: 55px;
			&:hover{
				cursor: pointer;
			}
		}
    a.clear-searchkey {
      background: url(//qcc-static.qichacha.com/qcc/pc-web/prod-23.01.239/images/icon_delete_xs-575db988.png) no-repeat;
      background-size: 16px 16px;
      width: 16px;
      height: 16px;
      position: absolute;
      opacity: 1;
      top: 49%;
      transform: translate(0, -50%);
      left: 290px;
      z-index: 5;
    }
    input.ma_search-input {
      width: 300px;
      top: 15px;
    }
    label {
      cursor: pointer;
      position: relative;
      right: -26px;
    }
    .fa {
      display: inline-block;
      font: normal normal normal 14px/1 FontAwesome;
      font-size: inherit;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .fa-fw {
      width: 1.28571429em;
      text-align: center;
    }
  }
  .m_search-box .ma_items-container {
    height: 480px;
    overflow-y: auto;
  }
  .ma_item .ma_item-top {
    padding: 14px 15px;
    height: 60px;
    position: relative;
    img {
    width: 30px;
    height: 30px;
    display: block;
    border-radius: 3px;
    float: left;
    border: 1px solid #eee;
    object-fit: contain;
}
.ma_name {
    font-size: 14px;
    color: #333333;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 32px;
    line-height: 32px;
    margin-left: 10px;
    float: left;
}
    .ma_tag {
      font-size: 12px;
      margin-top: 5px;
      margin-left: 5px;
    }
		.ntag {
			height: 22px;
			font-weight: normal;
			display: inline-block;
			line-height: 14px;
			font-size: 12px;
			padding: 4px 8px 4px 8px;
			border-radius: 2px;
		}
    .ma_arrow {
      font-size: 14px;
      color: #666666;
      float: right;
      cursor: pointer;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
	.ntag.text-pl {
		color: #6f77d1;
		background: #edeef9;
	}
	.ntag.text-success {
		color: #00ad65;
		background: #e3f6ee;
	}

	.ntag.text-primary {
		color: #128bed;
		background: #e5f2fd;
	}
	.ntag.text-warning {
		color: #ff8900;
		background: #ffeed5;
	}
	.ntag.text-danger {
    color: #FF6060;
    background: #ffecec;
	}
	.active span{
		color: #128bed;	
	}
}
.e_lang-arrow {
	position: relative;
	top: 10px;
	border: red 0px solid;
	display: inline-block;
	height: 32px;
	padding: 0px 5px;
	margin-left: 10px;
	margin-right: 10px;
	max-width: 160px;
}
.ea_text {
	position: relative;
	display: inline-block;
	height: 12px;
	line-height: 12px;
	color: #128bed;
	text-align: center;
	font-size: 12px;
	width: 100%;
	margin-bottom: 7px;
	float: left;
	max-width: 150px;
	word-break: keep-all;
	text-overflow: ellipsis;
	overflow: hidden;
}
.ea_line {
	position: absolute;
	width: 100%;
	height: 2px;
	background-color: #ddd;
	top: 15px;
	left: 0px;
}
.ea_arrow-wrap {
	position: absolute;
	top: 2px;
	font-size: 15px;
	color: #999;
	width: 15px;
	height: 100%;
	z-index: 99;
	&.ea_left {
		left: -5px;
	}
	&.ea_right {
    right: -10px;
	}
}
.fold-detail-company{
	.ma_item-detail {
    padding: 10px 15px 0px 15px;
    background: #F3F9FD;
		&>div {
			border-bottom: 1px #EEEEEE solid;
			padding-bottom: 10px;
			.detail-cell{
				display: inline-block;
				margin-right: 15px;
				font-size: 14px;
				line-height: 22px;
				span {
					font-size: 12px;
					font-size: 14px;
					color: #999;
					&.val {
    				color: #333;
					}
				}
				a {
					font-size: 14px;
					color: #128BED;
				}
			}
		}
	}
	.ma_item-path {
    background: #F3F9FD;
    padding: 10px 15px 0;
		.e_path {
			line-height: 28px;
			margin-bottom: 6px;
			a {
				word-break: break-all;
				color: #333333;
			}
		}
		.ea_path-title {
			color: #333333;
			font-weight: bold;
			font-size: 12px;
		}
		.single-path {
			color: #666;
			padding-bottom: 10px;
			border-bottom: 1px solid #eee;
		}
		.ntag {
			padding: 4px 6px;
			margin-left: 5px;
		}
	}
}
</style>
