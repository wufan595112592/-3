<template>
  <div>
    <div id="root" class=""></div>
    <ToolBox
        v-model:isShowTemplate="isShowTemplate"
        :buttonGroup="buttons"
        @maoScale="maoScale"
        @refresh="refresh"
        @exportImg="exportImg"/>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import * as d3 from "d3";
import ToolBox from './components/ToolBox/index.vue'
import ExplorationJson from "@/api/ExplorationJson2.json";
import D3Mixin from '@/hooks/D3Mixin'

let {downloadImpByChart} = D3Mixin()
let topPostion = { x:0, y: 0};
const rect = getClientRect();
const jsonData = ExplorationJson.data;
let curTransform = {
  x: 0,
  y: 0,
  k: 1
}

function convertToDrawData(data) {
  const nodes = new Map();
  const topNodeId = data.shortestPathIds[0];
  const bottomNodeId =  data.shortestPathIds[1];
  const layer = data.longestPathIds.length;
  const margin = 200;
  let baseX = rect.center.left;
  let baseY = rect.center.top - ( (layer - 1)  * margin / 2 ) ;
  let index = 1;

  topPostion = { x:baseX, y:baseY};
  data.nodes.forEach(item => {
    let x,y;
    if(item.id === topNodeId) {
       x = baseX;
       y = baseY;
    } else if(item.id === bottomNodeId) {
      x = baseX;
      y = baseY + margin * (layer-1);
    } else {
      x = rect.center.left - (data.nodes.length / 2  - index - data.nodes.length % 2) * 100
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
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
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
    if(d.isKey) {
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
        .attr("transform", d => `translate(${topPostion.x},${topPostion.y})`)
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
        .text(function (d){
          let x = d.text.substr(0, 3);
          const gNode = d3.select("#g_"+ d.id);
          if(d.text.length > 6) {
            drawTextWithContent(gNode, x, 0 ,-15);
            x = d.text.substr(3, 6);
            drawTextWithContent(gNode, x, 0 ,0);
            x = d.text.substr(9, 3);
            drawTextWithContent(gNode, x + '...', 0 ,15);
          } else {
            return d.text
          }
        });
  }

  function drawTextWithContent(svg, content, x, y) {
    svg.append("text")
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
      return svg.enter()
          .append('path')
          .attr("id", d => (d.source+''+d.target))
          .attr("class", "upwardLink")
          .attr("fill", "none")
          .attr("fill-opacity", "0.5")
          .attr("stroke-width", 1)
          .attr("stroke", "#E7E7E7")
          .attr("marker-end", 'url(#arrow)')
          .attr('d', d => {
            const source = data.nodes.get(d.source);
            const target = data.nodes.get(d.target);
            return `M${source.x} ${source.y} L${target.x} ${target.y}`;
          });
  }

  function drawArrow(svg) {
    return svg
        .append("marker")
        .attr("id", "arrow")
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
const zoomFn = (x, y, k) => {
  curTransform = d3.event.transform;
  return d3.select('#container').attr(
      "transform",
      "translate(" +
      curTransform.x / 2 +
      "," +
      curTransform.y / 2 +
      ")scale(" +
      curTransform.k * 1 +
      ")"
  );
};
/**
 * 保存图片
 */
const exportImg = () => {
  downloadImpByChart('关联关系探查', '小米');
}
/**
 * 刷新
 */
const refresh = () => {
  d3.select('#root svg').remove();
  draw(d);
}
/**
 * 缩放
 * @param type
 * @returns {*}
 */
const maoScale = (type) => {
  let c1 = curTransform.k;
  let c2 = Number((c1 + 0.2 * type).toFixed(1));
  curTransform.k = c2;
  return d3
      .transition()
      .duration(350)
      .tween("zoom", function () {
        var i = d3.interpolate(c1, c2);
        return function (t) {
          d3.select('#container').attr(
              "transform",
              "translate(" +
              (curTransform.x / 2) +
              "," +
              (curTransform.y / 2) +
              ")scale(" +
              i(t) * 1 +
              ")"
          )
        };
      });
}

let d = convertToDrawData(jsonData)
onMounted(() => {
  draw(d)
});
</script>
