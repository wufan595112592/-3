<!-- 股权结构图 -->
<script setup>
import cytoscape from 'cytoscape'
import Header from '../components/Header/index.vue'
</script>

<template>
  <Header title="小米科技有限责任公司" :active="4" />
  <div class="box">
    <div id="MainCy" style="width: 100%;height: 100%;"></div>
  </div>
</template>
<script>
import d3 from './components/Equity/d3.min.js'

const json = {
  "name": "马云",
  "tap":"节点",
  "children": [
    {
      "name": "中国平安人寿保险股份有限公司-自有资金",
      "shareNumProportion": "2.27%",
      "children": [
        {
          "name": "中国证券金融股份有限公司",
          "shareNumProportion": "2.27%",
          "children": [
            {
              "name": "中国证券金融股份有限公司",
              "shareNumProportion": "2.27%"
            }
          ]
        },
        {
          "name": "中央汇金资产管理有限责任公司",
          "shareNumProportion": "2.27%"
        }
      ]
    }
  ]
}
  export default {
    components: {
      Header
    },
  mounted() {
    var i = 0,
	duration = 400,
	root;
	var margin = {top: 30, right: 20, bottom: 30, left: 20},
	    width = document.body.clientWidth,
      height = document.body.clientHeight,
		barHeight = 50,
		barSpace = 10,
		barWidth = (width - margin.left - margin.right);
 
	var diagonal = d3.linkHorizontal()
		.x(function(d) { return d.y; })
		.y(function(d) { return d.x; });
		var scale=0.6;
	var svg = d3.select("body").append("svg")
		//.attr("width", width) // + margin.left + margin.right)
		.attr("class", 'svg')
		.attr('width', width)
		.attr('height', height)
		.on("dblclick.zoom", null)
 
	var container = svg.append('g')
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")scale(0.8)")
		.attr('class', 'container');
 
	function zoomFn() {
		const transform = d3.event.transform
		container.attr('transform', "translate(" + (transform.x + margin.left) + "," + (transform.y + margin.top) + ")scale(" + (transform.k) * 0.8 + ")");
	}
	svg.call(d3.zoom()
		.scaleExtent([1 / 2, 4])
		.on("zoom", zoomFn))
 
 
	d3.json("flare.json", function(error, flare) {
	  if (error) throw error;
	  root = d3.hierarchy(flare);
	  root.x0 = 0;
	  root.y0 = 0;
	  update(root);
	});
 
	function update(source) {
		//Compute the flattened node list.
		var nodes = root.descendants();
		var height = Math.max(1000, nodes.length * barHeight + margin.top + margin.bottom);
 
		d3.select("svg").transition()
			.duration(duration)
			.attr("height", height);
 
		d3.select(self.frameElement).transition()
			.duration(duration)
			.style("height", height + "px");
 
		//Compute the "layout". TODO https://github.com/d3/d3-hierarchy/issues/67
		var index = -1,
			count = 0;
		root.eachBefore(function(n) {
			count+=barSpace;
			n.style = "node_" + n.depth;
			n.x = ++index * barHeight + count;
			n.y = n.depth * 20;
		});
 
		// Update the nodes…
		var node = container.selectAll(".node")
			.data(nodes, function(d) { return d.id || (d.id = ++i); });
 
		var nodeEnter = node.enter().append("g")
			.attr("class", function(d){ return "node node_" + d.depth +" "+  getClass(d); })
			.attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
			.style("opacity", 0);
 
		//Enter any new nodes at the parent's previous position.
		nodeEnter.append("rect")
			.attr("y", -barHeight / 2)
			.attr("height", barHeight)
			.attr("width", barWidth)
			.style('stroke',"#333")
			.style('fill', "#fff")
			.style('stroke-width',"0.5px")
			
 
		nodeEnter.append("rect")
			.attr("y", -barHeight / 2)
			.attr("height", barHeight)
			.attr("width", 3)
			.style('fill', "red")
 
		nodeEnter.append("text")
			.attr("dy", -3.5)
			.attr("dx", 40)
			.style("font-size", "14px")
			.text(function(d) {
				if(d.data.name.length>9){
					return	d.data.name.substring(0, 10) + '...'; 
				} 
				return d.data.name; 
			});
 
		nodeEnter.append("text")
			.attr("dy", 15.5)
			.attr("dx", 40)
			.style("font-size", "14px")
			.text(function(d) {
				if(!d.data.tap){
					return ('持股' + '(' + d.data.shareNumProportion + ')')
				} 
			});
		nodeEnter.append("text")
			.attr("dy", 5.5)
			.attr("dx",220 )
			.style("font-size", "14px")
			.style('fill', "#359FFB")
			.text(function(d) {
				if(!d.data.tap){
					return "企业信息"
				}
				
			});
		var circle = nodeEnter.append("g")
            .attr("class", "circle")
			.on("click", click);
			
		circle.append("circle")
            .style('fill', "#fff")
            .style("stroke","#D9D8D8")
            .style('stroke-width', 1)
            .attr("r", function (d) {
				if (d.children) {
					return 8.5;
				} else if (d._children) {
					return 8.5;
				} else {
					return;
				}
                
            })
 
            // .style('stroke-opacity', 1)
            .attr("transform", function (d) {
                return "translate(20,0)"; 
			})
		
        // circle.append("text")
        //     .attr("class", "sign")
        //     .attr("cx", "20px")
        //     .attr("cy", ".1.8em")
        //     .style('font-size', 18)
        //     .style('fill', function (d) {
        //         return "#D9D8D8 ";
        //     })
 
        //     .attr('text-anchor', 'middle')
        //     .attr('dy', '.28em')
        //     .text(function (d) {
		// 		if (d.children) {
		// 			return '-';
		// 		} else if (d._children) {
		// 			return '+';
		// 		} else {
		// 			return '';
		// 		}
        //     })
        //     .attr("transform", function (d) {
        //         return "translate(20,0)"; 
        //     })
		circle.append("text")
		    .attr("dy", 4.5)
			.attr("cx", "20px")
			.attr("cy", "30px")
			.attr("font-family","FontAwesome")
			.attr('text-anchor', 'middle')
			.attr("class", "fa")
			.style('fill', function (d) {
                return "#D9D8D8 ";
            })
			.attr("transform", function (d) {
				return "translate(20,0)"; 
            })
			.text(function(d) {
				if (d.children) {
					return '-';
				} else if (d._children) {
					return '+';
				} else {
					return '';
				}
			})
		node.select('.fa')
		.text(function (d) {
			if (d.children) {
				return '-';
			} else if (d._children) {
				return '+';
			} else {
				return '';
			}
		})
 
		
 
		//Transition nodes to their new position.
		nodeEnter.transition()
			.duration(duration)
			.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
			.style("opacity", 1);
 
		node.transition()
			.duration(duration)
			.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
			.style("opacity", 1)
			.select("rect")
			.style("stroke","#666")
			.style("fill", color);
 
		// Transition exiting nodes to the parent's new position.
		node.exit().transition()
			.duration(duration)
			.attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
			.style("opacity", 0)
			.remove();
 
		//Update the links…
		var link = container.selectAll(".link")
			.data(root.links(), function(d) { return d.target.id; });
 
		//Enter any new links at the parent's previous position.
		link.enter().insert("path", "g")
			.attr("class", function(d){ 
				return "link link_" + d.target.depth +" "+ getClass(d.target); 
			})
			.attr("d", function(d) {
				var o = {x: source.x0, y: source.y0};
				return elbow({source: o, target: o});
			})
			.transition()
			.duration(duration)
			.attr("d", elbow);
 
		//Transition links to their new position.
		link.transition()
		.duration(duration)
		.attr("d", elbow);
 
		//Transition exiting nodes to the parent's new position.
		link.exit().transition()
			.duration(duration)
			.attr("d", function(d) {
				var o = {x: source.x, y: source.y};
				return elbow({source: o, target: o});
			})
			.remove();
 
		//Stash the old positions for transition.
		root.each(function(d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});
 
	}
 
	/*Toggle children on click.
	function click(d) {
		if (d.children) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}
		update(d);
	}*/
 
	// Toggle children on click.
	var lastClickD = null;
	function click(d) {
	  if (d.children) {
		d._children = d.children;
		d.children = null;
	  } else {
		d.children = d._children;
		d._children = null;
	  }
	  if (lastClickD){
		lastClickD._isSelected = false;
	  }
	  d._isSelected = true;
	  lastClickD = d;
	  update(d);
	}
	
	function getClass(d){
		if(d.data.class)
		{
			return d.data.class
		}else{
			return "";
		}
	}
	function elbow(d) {
		return "M" + d.source.y + "," + d.source.x
		+ "H" + (d.source.y + (d.target.y-d.source.y)/2)
		+ "V" + d.target.x 
		+ "H" + d.target.y;
	}
	function color(d) {
		if (d._isSelected) return '#fff';
		return d._children ? "#fff" : d.children ? "#fff" : "#fff";
	}
  }
   
}
</script>

<style scoped>

body{ 
	font-family:sans-serif;
	width: 100%;
	height: 100%;
	overflow: hidden;
	margin:0;
	padding: 0;
}
 
.link {
  fill: none;
  stroke: #666;
  stroke-width: 0.5px;
}
</style>
