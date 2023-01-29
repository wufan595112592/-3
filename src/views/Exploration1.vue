<template>
  <div class="flow-chart">
    <svg
      width="2400"
      height="1600"
    >
      <g />
      <rect />
    </svg>
  </div>

</template>

<script>
import dagreD3 from "dagre-d3";
import * as d3 from "d3";

export default {
  data () {
    return {
      list: {
        nodeInfos: [  // 节点数组
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
        edges: [  //节点之间关系数组
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
        ]
      },
      nextNode: '',
      gGraph: new dagreD3.graphlib.Graph().setGraph({ // 初始画布板式
        rankdir: 'TB', //默认'TB'
        // align: 'DL',
        nodesep: 40,
        edgesep: 80,
        ranksep: 60,
        marginx: 140,
        marginy: 140,
      })
    };
  },
  methods: {
    // 删除节点
    removeNode (item) {
      this.gGraph.removeNode(item.id,);
    },
    // 生成节点
    setNodeFun () {
      this.list.nodeInfos && this.list.nodeInfos.forEach((item, index) => {
        item.rx = item.ry = 5;//圆角
        if (item.class === 'empty') {
          this.gGraph.setNode(item.id, {
            style: "stroke: #ccc; ;stroke-0.2px",
            //  -19, //线条颜色
            ...item,
          });
        } else {
          this.gGraph.setNode(item.id, {
            //  style: "stroke: #ccc; fill: #666;stroke-2px",
            label: item.label,
            labelStyle:item.labelStyle || 'fill:#000',
            //节点形状
            shape: item.shape || 'rect',
            //节点样式
            style: item.nodeStyle || "fill:none;stroke:#9fbed2"
          });
        }

      })
    },
    // 生成链接线
    setEdgeFun () {
      this.list.edges.forEach(item => {
        this.gGraph.setEdge(item.source, item.target, {
          // style: "stroke: #ccc; fill: none;stroke-2px", //线条颜色
          // arrowheadStyle: "fill: #ccc;stroke: #ccc", //箭头颜色
          // arrowhead: 'undirected', // normal,vee,undirected 三种样式
          // labelType: '',//可以设置文本以及 html 格式，默认为文本格式
          
          label: item.label,
          labelStyle:item.labelStyle || 'fill:#84b8e0',
          //节点形状
          // shape: item.shape || 'rect',
          //节点样式
          // style: item.nodeStyle || "fill:none;stroke:#9fbed2"
          style: item.edgeStyle || "fill:none;stroke:#e1e1e1;stroke-width:1.5px",
          arrowheadStyle :item.arrowheadStyle || 'fill:#2385d2'
        });
      });
    },
    //绘制图形
    renderFun () {
      var svgAb = d3.select("svg"),
        innerAb = svgAb.select("g");
      //缩放
      // var zoom = d3.zoom().on("zoom", function () {
      //   inner.attr("transform", d3.event.transform);
      // });
      // svg.call(zoom);
      var render = new dagreD3.render();
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
    selectEvent () {
      var svg = d3.select("svg"),
        inner = svg.select("g");
      let code;

      // 鼠标右击
      inner.selectAll("g.node").on("mousedown", e => {
        //  e.preventDefault();
        console.log(e, '鼠标右键点击了')
      })
      // 点击节点
      inner.selectAll("g.node").on("click", (e, k, n) => {
          return
          // 并行

          // 添加空节点（创建空节点视觉优化链接线汇交点）
          this.list.nodeInfos = this.list.nodeInfos.concat({
            id: e + '0',
            label: '',
            shape: "ellipse",
            class: 'empty'
          })
          // 添加并行节点
          this.list.nodeInfos = this.list.nodeInfos.concat({
            id: e + '21',
            label: "节点" + e + '21',
          }, {
            id: e + '22',
            label: "节点" + e + '22',
          })

          //添加并行节点链接关系1
          this.list.edges = this.list.edges.map(q => {
            if (q.source == e) {
              this.nextNode = q.target
              q.target = e + '21'
            }
            return q
          })
          // 添加空节点链接关系
          this.list.edges = this.list.edges && this.list.edges.concat({
            source: e + '0',
            target: this.nextNode,
          })
          // 添加并行节点链接关系2
          this.list.edges = this.list.edges && this.list.edges.concat({
            source: e,
            target: e + '22',
          }, {
            source: e + '21',
            // target: this.nextNode,
            target: e + '0',
          }, {
            source: e + '22',
            // target: this.nextNode,
            target: e + '0',
          })

          // 存储并重新渲染
          // localStorage.setItem('list', JSON.stringify(this.list))
          // window.location.reload()
        
        code = this.list.nodeInfos.filter(item => {
          return item.id == e;
        });
        console.log(code, '12212121');
        this.setNodeFun()
        this.setEdgeFun()
        setTimeout(() => {
          this.renderFun()
        }, 1000)
      });
    },
    // 缩放
    scale () {
      var initialScale = 0.75;
      svg.call(
        zoom.transform,
        d3.zoomIdentity
          .translate(
            (svg.attr("width") - g.graph().width * initialScale) / 2,
            20
          )
          .scale(initialScale)
      );
      svg.attr("height", g.graph().height * initialScale + 40);
    },
    rightEvent () {
      var svgCanvas = document.getElementById('svg-canvas'); //svg
      var myMenu = document.getElementById("myMenu"); //右键菜单
      svgCanvas.addEventListener('mouseover', function (e) {//监听鼠标右键
        e.preventDefault();
        if (e.target.tagName === 'rect') {
          myMenu.style.top = event.clientY + "px"; //获取鼠标位置
          myMenu.style.left = event.clientX + "px";
          myMenu.style.display = 'block';      //显示相应右键内容
        }
      })
      document.addEventListener("click", (event) => {
        myMenu.style.display = 'none';
      });

    }
  },
  created () {
    // this.list = JSON.parse(localStorage.getItem('list')) || this.list
  },
  mounted () {
    this.setNodeFun()
    this.setEdgeFun()
    this.renderFun()
    this.selectEvent()
    // g.nodes().forEach(function (v) {
    //   console.log("Node " + v + ": " + JSON.stringify(g.node(v)));
    // });
    // g.edges().forEach(function (e) {
    //   console.log("Edge " + e.v + " -> " + e.w + ": " + JSON.stringify(g.edge(e)));
    // });
  }
}
</script>

<style lang="scss">
.flow-chart {
   width: 2400px;
  height: 800px;
  border: solid 1px #666;
}
svg {
  font-size: 14px;
}

.node rect {
  stroke: #606266;
  fill: #fff;
}

.edgePath path {
  stroke: #606266;
  fill: #333;
  stroke-width: 1.5px;
}
.node circle {
  stroke: #606266;
  fill: #fff;
  stroke-width: 0.5px;
}
.node ellipse {
  fill: #606266;
  opacity: 0.2;
  stroke-width: 1px;
}
.btn-position {
  position: fixed;
  top: 20px;
  left: 20px;
  button {
    margin-left: 16px;
  }
}
</style>