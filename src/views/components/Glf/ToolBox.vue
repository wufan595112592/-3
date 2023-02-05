<template>
	<div class="toolbox">
		<ul class="mao-title breadcrumb">
			<li :class="show ? 'active': ''" @click="showBox(true)">
				<div class="icon"><span class="iconfont icon-liebiao"></span></div>
				<div class="text">筛选</div>
			</li>
			<li :class="simple ? 'active': ''" @click="simpleChange(true)">
				<div class="icon"><span class="iconfont icon-zitiyanse"></span></div>
				<div class="text">简称</div>
			</li>
			<li :class="edit ? 'active': ''" @click="editChange(true)">
				<div class="icon"><span class="iconfont icon-sousuo"></span></div>
				<div class="text">编辑</div>
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
	<div id="search-box" class="box-detail">
		<div class="m_search-box animated fadeIn">
			<div class="ma_top-bar e_close-bar">
				<!---->
				<span class="ea_title">
					<span class="ma_bar-all current">所有关联企业</span>
					<span class="ma_bar-all">所有关联自然人</span>
				</span>
				<span class="ea_close">×</span>
			</div>
			<div class="ma_search-group input-group">
				<a class="clear-searchkey" style="display: none;"></a>
				<input type="text" placeholder="请输入筛选名称" value="" autocomplete="off"
					class="ma_search-input form-control headerKey">
				<label class="">
					<span>全部展开 <i class="fa fa-fw fa-angle-down text"></i></span></label>
			</div>
			<div>
				<div class="ma_items-container">
					<div id="0">
						<div class="ma_item">
							<div class="ma_item-top"><img alt="company"
									src="https://image.qcc.com/logo/fa902aeb2eab4ef9b9fcd1ef109ec54a.jpg?x-oss-process=style/logo_120"
									onerror="this.src='//qcc-static.qcc.com/resources/web/omaterial/company.jpeg'">
								<!---->
								<a href="https://www.qcc.com/firm/fa902aeb2eab4ef9b9fcd1ef109ec54a.html" target="_blank"
									class="ma_name">
									<span>重庆小米创业投资有限公司</span>
								</a>
								<!----> <span>
									<span class="ma_tag ntag text-success tooltip-br">存续</span>
								</span>
								<span class="ma_arrow pull-right text-muted">
									<i class="fa fa-fw fa-angle-down text"></i></span>
							</div>
							<!---->
							<!---->
						</div>
					</div>
					<div id="1">
						<div class="ma_item">
							<div class="ma_item-top">
								<img alt="company"
									src="https://image.qcc.com/auto/1ea557c511d6c06423d0519a364ae0a5.jpg?x-oss-process=style/logo_120"
									onerror="this.src='//qcc-static.qcc.com/resources/web/omaterial/company.jpeg'">
								<!---->
								<a href="https://www.qcc.com/firm/1ea557c511d6c06423d0519a364ae0a5.html" target="_blank"
									class="ma_name">
									<span>天津众米企业管理合伙企业（有限合伙）</span>
								</a>
								<!----> <span>
									<span class="ma_tag ntag text-success tooltip-br">存续</span>
								</span>
								<span class="ma_arrow pull-right text-muted">
									<i class="fa fa-fw fa-angle-down text"></i>
								</span>
							</div>
							<!---->
							<!---->
						</div>
					</div>
					<div id="2">
						<div class="ma_item">
							<div class="ma_item-top">
								<img alt="company"
									src="https://image.qcc.com/auto/e4e890fcaebdde059dbc91dbb05a9ed1.jpg?x-oss-process=style/logo_120"
									onerror="this.src='//qcc-static.qcc.com/resources/web/omaterial/company.jpeg'">
								<!---->
								<a href="https://www.qcc.com/firm/e4e890fcaebdde059dbc91dbb05a9ed1.html" target="_blank"
									class="ma_name">
									<span>天津捌米企业管理合伙企业（有限合伙）</span>
								</a>
								<!---->
								<span>
									<span class="ma_tag ntag text-success tooltip-br">存续</span>
								</span>
								<span class="ma_arrow pull-right text-muted">
									<i class="fa fa-fw fa-angle-down text"></i></span>
							</div>
							<!---->
							<!---->
						</div>
					</div>
					<div id="3">
						<div class="ma_item">
							<div class="ma_item-top">
								<img alt="company"
									src="https://image.qcc.com/auto/8aab7f9b6a41da4aba1fed32acd85cee.jpg?x-oss-process=style/logo_120"
									onerror="this.src='//qcc-static.qcc.com/resources/web/omaterial/company.jpeg'">
								<!---->
								<a href="https://www.qcc.com/firm/8aab7f9b6a41da4aba1fed32acd85cee.html" target="_blank"
									class="ma_name">
									<span>湖北小米长江产业投资基金管理有限公司</span>
								</a>
								<!---->
								<span>
									<span class="ma_tag ntag text-success tooltip-br">存续</span>
								</span>
								<span class="ma_arrow pull-right text-muted">
									<i class="fa fa-fw fa-angle-down text"></i></span>
							</div>
							<!---->
							<!---->
						</div>
					</div>
					<div id="4">
						<div class="ma_item">
							<div class="ma_item-top">
								<img alt="company"
									src="https://image.qcc.com/auto/3f6fc061939713beac9679ee2886cc0f.jpg?x-oss-process=style/logo_120"
									onerror="this.src='//qcc-static.qcc.com/resources/web/omaterial/company.jpeg'">
								<!---->
								<a href="https://www.qcc.com/firm/3f6fc061939713beac9679ee2886cc0f.html" target="_blank"
									class="ma_name">
									<span>上海籽月企业管理咨询合伙企业（有限合伙）</span>
								</a>
								<!---->
								<span>
									<span class="ma_tag ntag text-success tooltip-br">存续</span>
								</span>
								<span class="ma_arrow pull-right text-muted">
									<i class="fa fa-fw fa-angle-down text"></i></span>
							</div>
							<!---->
							<!---->
						</div>
					</div>
					<div id="5">
						<div class="ma_item">
							<div class="ma_item-top">
								<img alt="company"
									src="https://image.qcc.com/logo/b776cd768c95794fe670c4e73c214aed.jpg?x-oss-process=style/logo_120"
									onerror="this.src='//qcc-static.qcc.com/resources/web/omaterial/company.jpeg'">
								<!---->
								<a href="https://www.qcc.com/firm/b776cd768c95794fe670c4e73c214aed.html" target="_blank"
									class="ma_name">
									<span>成都分享信息传播有限公司</span>
								</a>
								<!---->
								<span>
									<span class="ma_tag ntag text-success tooltip-br">存续</span>
								</span>
								<span class="ma_arrow pull-right text-muted">
									<i class="fa fa-fw fa-angle-down text"></i></span>
							</div>
							<!---->
							<!---->
						</div>
					</div>
					<div id="6">
						<div class="ma_item">
							<div class="ma_item-top">
								<img alt="company"
									src="https://image.qcc.com/auto/a9187fccc35b7a46c67c7dde3927659c.jpg?x-oss-process=style/logo_120"
									onerror="this.src='//qcc-static.qcc.com/resources/web/omaterial/company.jpeg'">
								<!---->
								<a href="https://www.qcc.com/firm/a9187fccc35b7a46c67c7dde3927659c.html" target="_blank"
									class="ma_name">
									<span>南昌银鲨科技有限公司</span>
								</a>
								<!---->
								<span>
									<span class="ma_tag ntag text-success tooltip-br">存续</span>
								</span>
								<span class="ma_arrow pull-right text-muted">
									<i class="fa fa-fw fa-angle-down text"></i></span>
							</div>
							<!---->
							<!---->
						</div>
					</div>

					<!---->
				</div>
			</div>
			<!---->
			<!---->
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
		defineExpose
	} from 'vue'
	const emit = defineEmits(['screenfullChange', 'maoScale', 'refresh', 'exportImg', 'showBox', 'editChange',
		'simpleChange'
	])
	defineProps(['active'])
	let show = ref(false)
	let simple = ref(false)
	let edit = ref(false)
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

	function simpleChange(bool = false) {
		if (bool) {
			simple.value = !simple.value
			emit('simpleChange', simple)
		} else {
			simple.value = bool
		}
	}

	function editChange(bool = false) {
		if (bool) {
			edit.value = !edit.value
			emit('editChange', edit)
		} else {
			edit.value = bool
		}
	}

	function fullscreenClick() {
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

	defineExpose({
		simpleChange,
		editChange,
		showBox
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

			.active {
				color: #fff;
				background-color: #128BED;
			}
		}
	}


label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 700;
}
  .box-detail {
    width: 500px;
    height: 600px;
    border-radius: 5px;
    position: fixed;
    right: 80px;
    top: 125px;
    z-index: 999;
    background: #ffffff;
    -webkit-box-shadow: 0 0 10px rgb(0 0 0 / 50%);
    -moz-box-shadow: 0 0 10px rgba(0,0,0,0.5);
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px 0px;
    display: none;
    opacity: 0;
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
      font-weight: bold;
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
    .ntag.text-success {
      color: #00ad65;
      background: #e3f6ee;
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
}
</style>
