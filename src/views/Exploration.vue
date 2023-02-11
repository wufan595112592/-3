<template>
    <div v-if="!isShowTable" id="root"></div>
    <ToolBox v-if="!isShowTable"
        @maoScale="maoScale"
        @refresh="refresh"
        @exportImg="exportImg"/>
   
    <div class="tabs">
      <a-radio-group @change="switchTabs">
          <a-radio-button value="map" >查看图谱</a-radio-button>
          <a-radio-button value="table">查看表格</a-radio-button>
      </a-radio-group>
    </div>
    <div class="table-container" v-if="isShowTable">

      <svg height="20" width="100" xmlns="http://www.w3.org/2000/svg">
              <g>
                <marker id="arrowRight" markerUnits="userSpaceOnUse" refX="8" refY="4" markerWidth="8" markerHeight="8" ><path d="M0 0 L0 8 L8 4 Z" fill="#e7e7e7" fill-opacity="1"></path></marker>
                <marker id="arrowLeft" markerUnits="userSpaceOnUse" refX="0" refY="4" markerWidth="8" markerHeight="8" ><path d="M8 0 L8 8 L0 4 Z" fill="#e7e7e7"  fill-opacity="1"></path></marker>
              </g>
      </svg> 

      <div class="wrapper">
        <table border="1">
        <tr>
            <th v-for="item in columns" :key="item" :width="item.with">{{ item.title }}</th>
          </tr>
        <tr v-for="(item, index) in dataSource" :key="item">
          <td >{{ index + 1}}</td>
          <td ><span class="view" @click="switchTabs({ target: { value: 'map' } })">查看</span></td>
          <td >
            <div class="template">
              <template v-for="(d, index) in item" :key="d">
                  <span class="text" v-if="(index) % 2 === 0">{{ d}}</span>
                  <svg v-if="(index) % 2 === 1" height="20" :width="d[2]" xmlns="http://www.w3.org/2000/svg">
                    <path v-if="d[1] === 'Right'" stroke-width="1" stroke="#e7e7e7" marker-end="url(#arrowRight)" :d="'M0 16 L'+d[2]+' 16'" stroke-opacity="1" />
                    <path v-else stroke-width="1" stroke="#e7e7e7" marker-end="url(#arrowLeft)"  :d="'M '+ d[2] +' 16 L0 16'" stroke-opacity="1"/>
                    <text :x="d[2]/2" y="10" style="fill: #208EEE; font-size: 10px; text-anchor: middle;">{{ d[0] }}</text>
                  </svg> 
              </template>
              
            <!-- <svg height="20" width="100" xmlns="http://www.w3.org/2000/svg">
              <g>
                <marker id="arrowRight" markerUnits="userSpaceOnUse" refX="8" refY="4" markerWidth="8" markerHeight="8" ><path d="M0 0 L0 8 L8 4 Z" fill="#e7e7e7" fill-opacity="1"></path></marker>
                <marker id="arrowLeft" markerUnits="userSpaceOnUse" refX="0" refY="4" markerWidth="8" markerHeight="8" ><path d="M8 0 L8 8 L0 4 Z" fill="#e7e7e7"  fill-opacity="1"></path></marker>
              </g>
              <path stroke-width="1" stroke="#e7e7e7" marker-end="url(#arrowRight)" d="M0 16 L100 16" stroke-opacity="1"></path>
                <text x="50" y="10" style="fill: #208EEE; font-size: 10px; text-anchor: middle;">
                  股东
                </text>
            </svg> 
            2323
            <svg height="20" width="100" xmlns="http://www.w3.org/2000/svg">
              <path stroke-width="1" stroke="#e7e7e7" marker-end="url(#arrowLeft)"  d="M 100 16 L0 16" stroke-opacity="1"></path>
                <text x="50" y="10" style="fill: #208EEE; font-size: 10px; text-anchor: middle;">
                  股东
                </text>
            </svg>  -->
            

            </div>
          </td>
        </tr>
      </table>
      </div>
    </div>
</template>

<script setup>
import {onMounted, ref, nextTick} from "vue";
import * as d3 from "d3";
import {Graph, GraphEdge, GraphVertex} from 'ss-graph';
import ToolBox from './components/ToolBox/index.vue'
import ExplorationJson from "@/api/ExplorationJson2.json";
import D3Mixin from '@/hooks/D3Mixin'

const jsonData = ExplorationJson.data;
let {downloadImpByChart} = D3Mixin()
let topPostion = {x: 0, y: 0};
const rect = getClientRect();
const isShowTable = ref(true);
let curTransform = {
  x: 0,
  y: 0,
  k: 1
}

const drawData = convertToDrawData(jsonData)
const columns= ref( [
          {
            title: '序号',
            with:'10%'
          },
          {
            title: '图谱展示',
            with:'10%'
          },
          {
            title: '关联路径详情',
            with:'80%'
          },
        ]);


const dataSource = ref(
findAllPath(jsonData, jsonData.shortestPathIds[0], jsonData.shortestPathIds[jsonData.shortestPathIds.length - 1])
);


/**
 * 
 */
function loadData() {
  if(isShowTable.value) {

  } else {
    draw(drawData);
  }
}

/**
 * 获取文字长度
 * @param {} text 
 * @param {*} size 
 */
function getTextLength(text, size = 14) {
    return text.length * size;
}

/**
 * 
 */        
function findAllPath(data, start, end) {
  // 保存节点方便查询
  const nodeMap = new Map();
  const linkMap = new Map();
  // graph
  const graph = new Graph();
  const vertexs = new Map();  
  data.nodes.forEach(node => {
    vertexs.set(node.id, new GraphVertex(node.id));
    nodeMap.set(node.id, node);
  });
  data.links.forEach(link => {
    linkMap.set(link.source + '' + link.target, link);
    graph.addEdge(new GraphEdge(vertexs.get(link.source), vertexs.get(link.target)))
  });
  
  const pathIterator = graph.findAllPath(vertexs.get(start), vertexs.get(end));

  // 获取所有路径
  const allPaths = Array.from(pathIterator).map( path => {
    const result = [];

    // 头节点放入数组
    result.push(nodeMap.get(path[0].value).name);
    for(let i = 1; i < path.length;i ++) {
      let link = linkMap.get(path[i-1].value +''+ path[i].value);
      // 放入两个节点关系和方向
      if(link) {
        result.push([link.label, 'Right', getTextLength(link.label, 10) * 2]);
      } else {
        link = linkMap.get(path[i].value + '' + path[i-1].value);
        if(link) {
          result.push([link.label, 'Left', getTextLength(link.label, 10)* 2]);
        }      
      }
      result.push(nodeMap.get(path[i].value).name);
    }
    return result;
  });
  return allPaths;
}


/**
 * 带有计算位置
 * @param data
 * @returns {{nodes: Map<any, any>, links}}
 */
function convertToDrawData(data) {
  const nodes = new Map();
  const topNodeId = data.shortestPathIds[0];
  const bottomNodeId = data.shortestPathIds[jsonData.shortestPathIds.length - 1];
  const layer = data.longestPathIds.length;
  const margin = 200;
  let baseX = rect.center.left;
  let baseY = rect.center.top - ((layer - 1) * margin / 2);
  let index = 1;

  topPostion = {x: baseX, y: baseY};
  data.nodes.forEach(item => {
    let x, y;
    if (item.id === topNodeId) {
      x = baseX;
      y = baseY;
    } else if (item.id === bottomNodeId) {
      x = baseX;
      y = baseY + margin * (layer - 1);
    } else {
      x = rect.center.left - (data.nodes.length / 2 - index - data.nodes.length % 2) * 100
      y = baseY + margin;
      index++;
    }
    nodes.set(item.id, {
      id: item.id,
      eid: item.eid,
      isKey: item.isKey,
      name: item.name,
      text: item.name,
      type: item.type,
      x,
      y
    });
  });

  return {
    nodes,
    links: data.links
  };
}

/**
 * 画图
 * @param data
 */
function draw(data) {
  const zoom = d3.zoom().scaleExtent([0.5, 2])
      .on('zoom', zoomFn);
  const root = drawRootSvg("#root");
  const svg = drawViewBox(root);

  const node = svg.selectAll("g")
      .data(
          Array.from(data.nodes.values()));
  const path = svg.selectAll("path")
      .data(data.links);
  // 箭头
  drawArrow(svg).transition().duration(500)
      .attr("fill-opacity", 1);
  // 生成线条
  drawPath(path).transition()
      .duration(500)
      .attr("fill-opacity", 1)
      .attr("stroke-opacity", 1);
  // 生成节点
  drawNodes(node)
      .transition()
      .duration(500)
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
      .attr("fill-opacity", 1)
      .attr("stroke-opacity", 1);

  /**
   *
   */
  function getColor(d) {
    if (d.isKey) {
      return "#F86403";

    }
    switch (d.type) {
      case "P":
        return "#FE485E";
      case "E":
      default:
        return "#178BED";
    }
  }

  /**
   *
   * @param {*} el
   */
  function drawRootSvg(el) {
    return (
        d3
            .select(el)
            .append("svg")
            .attr("id", "svg")
            .attr("width", "100vw")
            .attr("height", "100vh")
            .attr("viewBox", "0 0 " + rect.with + " " + rect.height)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            // .on('mousedown', disableRightClick)
            .call(zoom)
            .on("dblclick.zoom", null)
    );
  }

  /**
   *
   * @param {*} svg
   */
  function drawViewBox(svg) {
    return (
        svg.append("g")
            .attr("id", "container")
            .attr("class", "gbox")
            .attr("transform-origin", "center")
            .attr("transform", "translate(0,0)")
            .attr("scale", 1)
    );
  }

  /**
   *
   * @param svg
   */
  function drawNodes(svg) {
    const g = svg.enter().append('g')
        .attr('id', d => `g_${d.id}`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .attr("transform", d => `translate(${topPostion.x},${topPostion.y})`);
    drawCircle(g);
    drawText(g);
    return g;
  }

  /**
   *
   * @param svg
   */
  function drawText(svg) {
    svg.append('text')
        .style("fill", "#fff")
        .style("font-size", "10px")
        .style("text-anchor", "middle")
        .attr("width", 100)
        .text(function (d) {
          let x = d.text.substr(0, 3);
          const gNode = d3.select("#g_" + d.id);
          if (d.text.length > 6) {
            drawTextWithContent(gNode, x, 0, -13);
            x = d.text.substr(3, 6);
            drawTextWithContent(gNode, x, 0, 2.5);
            x = d.text.substr(9, 3);
            drawTextWithContent(gNode, x + '...', 0, 18);
          } else {
            return d.text
          }
        });
  }

  function drawTextWithContent(svg, content, x, y) {
    return svg.append("text")
        .attr("x", x)
        .attr("y", y)
        .style("fill", "#fff")
        .style("font-size", "10px")
        .style("text-anchor", "middle")
        .text(content)
  }

  /**
   *
   * @param {*} svg
   */
  function drawCircle(svg) {
    svg
        .append("circle")
        .attr("class", "circle")
        .attr("r", 30)
        .style("fill", (d) => getColor(d));
  }

  function drawPath(svg) {
    const enter = svg.enter();
    const path = enter.append('path')
        .attr("id", d => ('p_' + d.source + d.target))
        .attr("class", "upwardLink")
        .attr("fill", "none")
        .attr("fill-opacity", "0.5")
        .attr("stroke-width", 1)
        .attr("stroke", "#E7E7E7")
        .attr("marker-start", d => {
          const source = data.nodes.get(d.source);
          const target = data.nodes.get(d.target);
          return source.x - target.x > 0 ? 'url(#arrowLeft)' : ''
        })
        .attr("marker-end", d => {
          const source = data.nodes.get(d.source);
          const target = data.nodes.get(d.target);
          return source.x - target.x > 0 ? '' : 'url(#arrowRight)'
        })
        .attr('d', d => {
          const source = data.nodes.get(d.source);
          const target = data.nodes.get(d.target);
          if (source.x - target.x > 0) {
            return `M${target.x} ${target.y} L${source.x} ${source.y}`;
          } else {
            return `M${source.x} ${source.y} L${target.x} ${target.y}`;
          }
        });

    enter
        .append("text")
        .style("fill", "#555")
        //.style("alignement-baseline", "middle")
       // .style("text-anchor", "middle")
        .style("font-size", "10px")
        .style("text-anchor", "middle")
        .append('textPath')
        .attr("transform", "translate(110,0)")
        .attr("xlink:href", d => ('#p_' + d.source + d.target))
        .attr('startOffset', '50%')
        .text(d => d.label)

    return path;
  }


  function drawArrow(svg) {
    const g = svg.append('g');
    const down = g.append("marker")
        .attr("id", "arrowRight")
        .attr("markerUnits", "strokeWidth") //设置为strokeWidth箭头会随着线的粗细发生变化
        .attr("markerUnits", "userSpaceOnUse")
        // .attr("viewBox", "0 -5 10 10") //坐标系的区域
        .attr("refX", 38) //箭头坐标
        .attr("refY", 4)
        .attr("markerWidth", 8) //标识的大小
        .attr("markerHeight", 8)
        .attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
        //  .attr("stroke-width", 6) //箭头宽度
        .append("path")
        .attr("d", "M0 0 L0 8 L8 4 Z") //箭头的路径
        .attr("fill", "#E7E7E7")
        .attr("fill-opacity", 0); //箭头颜色

    const up = g.append("marker")
        .attr("id", "arrowLeft")
        .attr("markerUnits", "strokeWidth") //设置为strokeWidth箭头会随着线的粗细发生变化
        .attr("markerUnits", "userSpaceOnUse")
        // .attr("viewBox", "0 -5 10 10") //坐标系的区域
        .attr("refX", -30) //箭头坐标
        .attr("refY", 4)
        .attr("markerWidth", 8) //标识的大小
        .attr("markerHeight", 8)
        .attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
        //  .attr("stroke-width", 6) //箭头宽度
        .append("path")
        .attr("d", "M8 0 L8 8 L0 4 Z") //箭头的路径
        .attr("fill", "#E7E7E7")
        .attr("fill-opacity", 1); //箭头颜色
    return down.merge(up);
  }
}

function getClientRect() {
  return {
    with: window.innerWidth,
    height: window.innerHeight,
    center: {
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,
    },
  };
}

function zoomFn(x, y, k) {
  curTransform = d3.event.transform;
  return d3.select('#container').attr(
      "transform",
      "translate(" +
      curTransform.x / 2 +
      "," +
      curTransform.y / 2 +
      ")scale(" +
      curTransform.k +
      ")"
  );
};
/**
 * 保存图片
 */
function exportImg ()  {
  downloadImpByChart('关联关系探查', '小米');
}
/**
 * 刷新
 */
function refresh () {
  d3.select('#root svg').remove();
  draw(d);
}
/**
 * 缩放
 * @param type
 * @returns {*}
 */
function maoScale (type) {
  let c1 = curTransform.k;
  curTransform.k = Number((c1 + 0.3 * type).toFixed(1));
  d3.select('#container').transition().duration(400).attr(
      "transform",
      "translate(" +
      (curTransform.x / 2) +
      "," +
      (curTransform.y / 2) +
      ")scale(" +
      curTransform.k +
      ")"
  )
}


function switchTabs (e) {
   isShowTable.value = e.target.value === 'table';  
   nextTick(loadData)
}



onMounted(() => {
  loadData();
});
</script>

<style scoped lang="scss">
.tabs{
  position: absolute;
  z-index: 200;
  right: 15px;
  top: 70px;
  background: yellow
}

.table-container {
  position: relative;
  box-sizing: border-box;
  width: calc(100% - 30px);
  height: calc(100% - 120px);
  margin: 120px 15px 0 ;
  padding: 15px 0 ;
  border-top: 1px solid #eee;

  .wrapper {
    width: 100%;
    height: calc(100% - 30px);
    border: 1px solid #eee;
  }

  table{
    table-layout:fixed;
    border-collapse: collapse;
    width: 100%;
    border:  1px solid #eee;
    
    tr {
      width: 100%;
      height: 40px;
      border:  1px solid #eee;

      th {
        height: 50px;
        background: #F2FAFC;
        color: #404141;
        text-align: center;

        &:nth-child(1) {
          width: 70px;
        }

        &:nth-child(2) {
          width: 120px;
        }

        &:nth-child(3) {
          padding-left: 20px;
          text-align: left;
          width: calc(100% - 190px);
        }

      }

      td {
        padding-left: 20px;
        background: #fff;
        color: #208EEE;

        &:nth-child(1) {
          color: #404141;
        }
      }


      td, th {
        
      }
    }

    .template {
      .text {
        margin: 0 5px;
      }
    }
    .view {
      cursor: pointer;
    }
      
  }
   
}
</style>