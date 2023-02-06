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
<div class="cy" style="width:90%;height:90vh;margin:5vh auto">
  </div>
</template>
<script>
import * as d3 from "d3";
// import relativeJson from "@/api/relativeJson.json";
import relativeJson from "@/api/ExplorationJson.json";
	import cytoscape from 'cytoscape'
	
	var cy;

export default {
  components: {
    Header,
    ToolBox,
    Legend
  },
  data() {
    return {
    }
  },
  created() {

  },
  mounted() {
    const cy = cytoscape({
      container: document.querySelector('.cy'),

      boxSelectionEnabled: false,
      autounselectify: true,
      style: [
        {
          selector: "node",
          style: {
            height: 80,
            width: 80,
            "background-fit": "cover",
            "border-color": "#000",
            "border-width": 3,
            "border-opacity": 0.5
          }
        },
        {
          selector: ".eating",
          style: {
            "border-color": "red"
          }
        },
        {
          selector: ".eater",
          style: {
            "border-width": 9
          }
        },
        {
          selector: "edge",
          style: {
            content: "data(name)",
            "curve-style": "bezier",
            width: 6,
            "target-arrow-shape": "triangle",
            "line-color": "#ffaaaa",
            "target-arrow-color": "#ffaaaa"
          }
        },
        {
          selector: "#bird",
          style: {
            "background-image":
              "https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg"
          }
        },
        {
          selector: "#bird2",
          style: {
            "background-image":
              "https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg"
          }
        },
        {
          selector: "#bird3",
          style: {
            "background-image":
              "https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg"
          }
        },
        {
          selector: "#cat",
          style: {
            "background-image":
              "https://live.staticflickr.com/1261/1413379559_412a540d29_b.jpg"
          }
        },
        {
          selector: "#ladybug",
          style: {
            "background-image":
              "https://live.staticflickr.com/3063/2751740612_af11fb090b_b.jpg"
          }
        },
        {
          selector: "#aphid",
          style: {
            "background-image":
              "https://live.staticflickr.com/8316/8003798443_32d01257c8_b.jpg"
          }
        },
        {
          selector: "#rose",
          style: {
            "background-image":
              "https://live.staticflickr.com/5109/5817854163_eaccd688f5_b.jpg"
          }
        },
        {
          selector: "#grasshopper",
          style: {
            "background-image":
              "https://live.staticflickr.com/6098/6224655456_f4c3c98589_b.jpg"
          }
        },
        {
          selector: "#plant",
          style: {
            "background-image":
              "https://live.staticflickr.com/3866/14420309584_78bf471658_b.jpg"
          }
        },
        {
          selector: "#wheat",
          style: {
            "background-image":
              "https://live.staticflickr.com/2660/3715569167_7e978e8319_b.jpg"
          }
        },
        {
          selector: ".autorotate",
          style: {
            content: "data(label)",
            "text-rotation": "autorotate",
          }
        },
        {
          selector: "#ar-src,#ar-tgt",
          style: {
            content: "data(name)",
            "font-size": "12px",
            "text-valign": "center",
            "text-halign": "center"
          }
        }
      ],

      elements: {
        nodes: [
          { data: { id: "cat" } },
          { data: { id: "bird" } },
          { data: { id: "bird2" } },
          { data: { id: "bird3" } },
          { data: { id: "ladybug" } },
          { data: { id: "aphid" } },
          { data: { id: "rose" } },
          { data: { id: "grasshopper" } },
          { data: { id: "plant" } },
          { data: { id: "wheat" } },
          { data: { id: "ar-src", name: "ar-src" } },
          { data: { id: "ar-tgt", name: "ar-tgt" } }
        ],
        edges: [
          {
            data: { source: "ar-src", target: "ar-tgt", label: "autorotate" },
            classes: "autorotate"
          },
          { data: { source: "cat", target: "bird" } },
          { data: { source: "bird", target: "ladybug" } },
          { data: { source: "bird", target: "grasshopper" } },
          { data: { source: "grasshopper", target: "plant" } },
          { data: { source: "grasshopper", target: "wheat" } },
          { data: { source: "ladybug", target: "aphid" } },
          { data: { source: "aphid", target: "rose" } },
          { data: { source: "aphid", target: "bird2" } },
          { data: { source: "bird2", target: "bird3" } },
          { data: { source: "bird3", target: "rose" } },
          { data: { source: "plant", target: "rose" } },
          { data: { source: "wheat", target: "rose" } },

        ]
      },

      layout: {
        name: "breadthfirst",
        directed: true,
        padding: 10,
      }
    });

  },
  methods: {

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
