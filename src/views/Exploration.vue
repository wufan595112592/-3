<!-- 关系图谱 -->
<script setup>
	import Header from '../components/Header/index.vue'
	import ToolBox from './components/ToolBox.vue'
	import Legend from './components/Relation/Legend.vue'

	// import { relation } from './components/Relation/index.js'
</script>

<template>
	<Header v-if="!screenfull" title="小米科技有限责任公司" :active="9" />
	<ToolBox @screenfullChange="screenfullChange" @maoScale="maoScale" @refresh="refresh" @exportImg="exportImg" />
	<Legend />
<div class="flow-chart">
    <svg
      width="2400"
      height="1600"
    >
      <g />
    </svg>
  </div>
</template>
<script>
import dagreD3 from "dagre-d3";
import * as d3 from "d3";
// import relativeJson from "@/api/relativeJson.json";
import relativeJson from "@/api/ExplorationJson.json";
	
	var cy;

	export default {
		components: {
			Header,
			ToolBox,
			Legend
		},
	data() {
		return {
			list: {
				nodeInfos: [  // 节点数组
				],
				edges: [  //节点之间关系数组
				]
			},
			tooltip: this.createTooltip(), //创建tooptip窗体 ,即鼠标移入有窗体显示
			gGraph: new dagreD3.graphlib.Graph().setGraph({ // 初始画布板式
				rankdir: 'TB', //设置 node 节点的延伸排列方向，它有4个值: TB, BT, LR, 或者 RL 可选，默认是’TB’（从上到下）。
				align: 'DL',
				nodesep: 100,
				edgesep: 100,
				ranksep: 50,
				marginx: 50,
				marginy: 100
			})
		}
	},
	created () {
   this.list.nodeInfos = [
      // { id: 0, label: "TAOBAO HOLDING LIMITED", shape: "rect", },
      // { id: 1, label: "淘宝中国控股有限公司", shape: "rect" },
      // { id: 2, label: "淘宝（中国）软件有限公司", shape: "rect" },
      // { id: 3, label: "浙江天猫技术有限公司", shape: "rect" },
      // { id: 4, 
      //   label: "阿里巴巴（中国）网络技术有限公司", 
      //   shape: "rect",
      //   nodeStyle:'fill:#128aeb;stroke:#9fbed2',
      //   labelStyle:"fill:#fff" 
      // },
      {
            id: "node1",
            label: "节点1",
            shape: "circle", // rect,circle,ellipse,diamond,默认值为rect
          },
          {
            id: "node2",
            label: "节点2",
          },
          {
            id: "node3",
            label: "节点3",
            rank: 2
          },
          {
            id: "node4",
            label: "节点4",
            // rank: 2,
            //  shape: "ellipse",
            //  class:'empty'
          },
          {
            id: "node5",
            label: "节点5",
          },
          {
            id: "node6",
            label: "节点6",
          },
          {
            id: "node7",
            label: "节点7",
          },
          {
            id: "node8",
            label: "节点8",
          },
          {
            id: "node10",
            label: "节点10",
          },
          {
            id: "node11",
            label: "节点11",
          },
          {
            id: "node9",
            label: "节点9",
            shape: "circle",
          },
    ],
     this.list.edges = [
        {
            source: "node1",
            target: "node2",
            label: "100%"
          },
          {
            source: "node1",
            target: "node3",
            label: "100%"
          },
          {
            source: "node1",
            target: "node4",
            label: "100%"
          },
          {
            source: "node1",
            target: "node5",
            label: "100%"
          },
          {
            source: "node1",
            target: "node6",
            label: "100%"
          },
          {
            source: "node1",
            target: "node7",
            label: "100%"
          },
          {
            source: "node1",
            target: "node8",
            label: "100%"
          },
          {
            source: "node2",
            target: "node9",
            label: "100%"
          },
          {
            source: "node3",
            target: "node9",
            label: "100%"
          },
          {
            source: "node4",
            target: "node9",
            label: "100%"
          },
          {
            source: "node5",
            target: "node9",
            label: "100%"
          },
          {
            source: "node6",
            target: "node9",
          },
          {
            source: "node7",
            target: "node9",
            label: "100%"
          },
          {
            source: "node2",
            target: "node10",
          },
          {
            source: "node5",
            target: "node10",
            label: "100%"
          },
          {
            source: "node10",
            target: "node9",
            label: "100%"
          },
          {
            source: "node10",
            target: "node11",
          },
          {
            source: "node11",
            target: "node9",
            label: "100%"
          },
          {
            source: "node8",
            target: "node9",
          }
	// { source: 0, target: 1, label: "100%" },
  // 	{ source: 2, target: 1, label: "100%" },
  //   { source: 1, target: 3, label: "57.945%",
	//    	edgeStyle:"fill:#fff;stroke:#fc485e;stroke-width:1.5px",
	//     arrowheadStyle:'fill:#fc485e',
	//     labelStyle:'fill:#fc485e'
  //   	},
    ]
 },
	mounted() {
		this.setNodeFun()
    this.setEdgeFun()
    this.renderFun()
	},
	methods: {
		// 生成节点
    setNodeFun () {
      this.list.nodeInfos && this.list.nodeInfos.forEach((item) => {

        this.gGraph.setNode(item.id, {
          //节点标签
          
          label: item.label,
          labelStyle:item.labelStyle || 'fill:#000',
          //节点形状
          shape: item.shape || 'rect',
          //节点样式
          style: item.nodeStyle || "fill:none;stroke:#9fbed2"
        })
      })
    },
    // 生成链接线
    setEdgeFun () {
      this.list.edges.forEach(item => {
        this.gGraph.setEdge(item.source, item.target, {
          //边标签
          label: item.label,
          labelStyle :item.labelStyle || "fill:#84b8e0",
          //边样式
          style: item.edgeStyle || "fill:none;stroke:#e1e1e1;stroke-width:1.5px",
          arrowheadStyle :item.arrowheadStyle || 'fill:#2385d2'
        })
      });
    },
    //绘制图形
    renderFun () {
      const that = this
      const svgAb = d3.select("svg"),
        innerAb = svgAb.select("g");
      //缩放
      // const zoom = d3.zoom().on("zoom", function () {
      //   svgAb.attr("transform", d3.event.transform);
      // });
      // svgAb.call(zoom);
      const render = new dagreD3.render();
      render(innerAb, this.gGraph);
        
      innerAb.selectAll("g.node")
      .on("mouseover", function (v) {
        that.tipVisible(that.gGraph.node(v).label);
      })
      .on("mouseout", function () {
        that.tipHidden();
      })
    },
      //创建提示框
    createTooltip() {
      return d3.select('body')
        .append('div')
        .classed('tooltip', true)
        .style('opacity', 0)
        .style('display', 'none');
    },
    //tooltip显示
    tipVisible(textContent) {
      this.tooltip.transition()
        .duration(400)
        .style('opacity', 0.9)
        .style('display', 'block');
      this.tooltip.html(textContent)
        .style('left', (d3.event.pageX + 15) + 'px')
        .style('top', (d3.event.pageY + 15) + 'px');
    },
    //tooltip隐藏
    tipHidden() {
      this.tooltip.transition()
        .duration(400)
        .style('opacity', 0)
        .style('display', 'none');
    },
	}
	}
</script>

<style scoped>
	.box {
		width: 100vw;
		height: 100vh;
		background-color: #cbe8ff;
	}
    .tooltip {
      position: absolute;
      font-size: 12px;
      text-align: center;
      background-color: white;
      border-radius: 3px;
      box-shadow: rgb(174, 174, 174) 0px 0px 10px;
      cursor: pointer;
      display: inline-block;
      padding: 10px;
    }

    .tooltip>div {
      padding: 10px;
    }

</style>
