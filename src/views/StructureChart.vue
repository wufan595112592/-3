<!-- 股权结构图 -->
<template>
  <Header title="小米科技有限责任公司" :active="4" />
  <div class="box" style="width: 100%;height: 100%;">
    <div id="MainCy" style="width: 100%;height: 100%;overflow-x: hidden;overflow-y: auto;"></div>
  </div>
</template>

<script>
// import d3 from './components/Equity/d3.min.js'
import * as d3 from 'd3v4'
import Header from '../components/Header/index.vue'
import json from "@/api/structureJson.json";
const actualController = json.data.actual_controller
let structureJson = {
    "name": "马云",
		"tap": "节点",
		"isKey": true,
	"children": [
			{
				"amount": "994.04万股",
				"children": [],
				"count": 0,
				"eid": "90fe3383f8333a3190a0fda5f4ecd621",
				"level": "1",
				"name": "邱昆",
				"percent": "19.07%",
				"sh_type": "主要股东(新三板)",
				"short_name": "邱昆",
				"type": "P"
			},
        {
            "name": "中国平安人寿保险股份有限公司-自有资金",
            "percent": "2.27%",
            "children": [
                {
                    "name": "中国证券金融股份有限公司",
                    "percent": "2.27%",
                    "children": [
                        {
                            "name": "中国证券金融股份有限公司",
                            "percent": "2.27%"
                        }
                    ]
                },
                {
                    "name": "中央汇金资产管理有限责任公司",
                    "percent": "2.27%"
                }
            ]
        },
        {
            "name": "中国平安人寿保险股份有限公司-自有资金",
            "percent": "2.27%"
        },
        {
            "name": "中国平安人寿保险股份有限公司-自有资金",
            "percent": "2.27%"
        },
        {
            "name": "中国平安人寿保险股份有限公司-自有资金",
            "percent": "2.27%"
        },
        {
            "name": "中国平安人寿保险股份有限公司-自有资金",
            "percent": "2.27%"
        }
    ]
}
structureJson = json.data.equity_structure

export default {
	components: {
		Header
	},
	mounted() {
		var i = 0,
			duration = 400,
			root;
		var margin = { top: 100, right: 20, bottom: 30, left: 20 },
			width = document.getElementById('MainCy').scrollWidth,
			height = document.getElementById('MainCy').scrollHeight,
			barHeight = 50,
			barSpace = 10,
			barWidth = 500;

		var svg = d3.select("#MainCy").append("svg")
			.attr("class", 'svg')
			.attr('width', width < 900 ? 900 : width)
			.attr('height', height)

		var container = svg.append('g')
			.attr('width', barWidth)
			.attr("transform", function (d) {
				if (width < barWidth + 400) {
					return "translate(207.5," + margin.top + ")"
				} else {
					let left = (width - barWidth) / 2
					return "translate(" + left + "," + margin.top + ")"
				}
			})
			.attr('class', 'container');

		root = d3.hierarchy(structureJson);
		root.x0 = 0;
		root.y0 = 0;
		update(root);

		function update(source) {
			//Compute the "layout". TODO https://github.com/d3/d3-hierarchy/issues/67
			var index = -1,
				count = 0;
			let curentObj = null
			let curentObjCount = 0
			root.eachBefore(function (n) {
				let space = barSpace
				if (curentObj) {
					space = barSpace + 25
					curentObjCount++
				}
				curentObj = null
				if (n.parent) {
					if (n.data.isKey) {
						if (!n.data.children) {
							curentObj = n.data.children[0]
						} else {
							for (let k = 0; k < n.parent.children.length; k++) {
								if (n.parent.children[k].id === n.id) {
									curentObj = n.parent.children[k].data
								}							
							}
							curentObj = n.data.children
						}
					}
				}
				count += space;
				n.style = "node_" + n.depth;
				n.x = ++index * barHeight + count;
				n.y = n.depth * 20;
			});

			//Compute the flattened node list.
			var nodes = root.descendants();
			var height = Math.max(1000, (nodes.length - curentObjCount) * barHeight + (curentObjCount + 1) * (barHeight + 30) + margin.top + margin.bottom + 100);

			d3.select("svg").transition()
				.duration(duration)
				.attr("height", height);

			d3.select(self.frameElement).transition()
				.duration(duration)
				.style("height", height + "px");

			// Update the nodes…
			var node = container.selectAll(".node")
				.data(nodes, function (d) { return d.id || (d.id = ++i); });

			var nodeEnter = node.enter().append("g")
				.attr("class", function (d) { return "node node_" + d.depth + " " + getClass(d); })
				.attr("transform", function (d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
				.style("opacity", 0);

			//Enter any new nodes at the parent's previous position.
			// 矩形框样式
			nodeEnter.append("rect")
				// .attr("x", (width / 2 - barHeight / 2))
				.attr("class", "rect")
				.attr("y", -barHeight / 2)
				.attr("height", function (d) {
					return d.data.name === actualController.name && d.depth ? barHeight + 25 : barHeight
				})
				.attr("width", function (d) {
					return barWidth - (d.depth * 20)
				})
				.style('stroke', "#d8d8d8")
				.style('fill', "#fff")
				.style('stroke-width', "0.5px")
				// .on("mouseenter", nodeHover);

			// 红蓝小长条的样式
			nodeEnter.append("rect")
				.attr("y", -barHeight / 2)
				.attr("height", function (d) {
					return d.data.name === actualController.name && d.depth ? barHeight + 25 : barHeight
				})
				.attr("width", 5)
				.style('fill', function (d) {
					return d.data.type === 'P' ? '#FF7777' : '#359CEF'
				})

			// 第一行name  公司名称或自然人股东姓名
			nodeEnter.append("text")
				.attr("dy", function (d) {
					return d.depth >= 1 ? -3.5 : 5
				})
				.attr("dx", 40)
				.style("fill", "#128bed")
				.style("font-size", "14px")
				.style('font-family', 'microsoft yahei')
				.text(function (d) {
					if (d.data.name.length > 24) {
						return d.data.name.substring(0, 25) + '...';
					}
					return d.data.name;
				});
			// 第二行  标签
			const tag = nodeEnter.append('g')
				.attr('class', 'tag')
				.attr('transform', 'translate(40, 2)')

			// 大股东标签
			const tagG1 = tag.append('g')
				.attr('class', 'g')

			tagG1.append("rect")
				.attr("y", 2)
				.attr("height", 20)
					.attr("width", 44)
					.style('fill', function (d) {
						return d.data.name === actualController.name && d.depth ? '#FFECEC': 'rgba(0,0,0,0)'
					})

				tagG1.append("text")
				.attr("dx", 3)
				.attr("dy", 15.5)
				.attr("height", 20)
				.style('fill', "#FF6060")
				.style('font-family', 'microsoft yahei')
				.style("font-size", "12px")
				.text(function (d) {
					return d.data.name === actualController.name && d.depth ? '大股东' : ''
				});

					// 实际控制人标签
				const tagG2 = tag.append('g')
				.attr('class', 'g')
				.attr('transform', 'translate(50, 0)')
					
				tagG2.append("rect")
					.attr("y", 2)
					.attr("height", 20)
					.attr("width", 68)
					.style('fill', function (d) {
						return d.data.name === actualController.name && d.depth ? '#FFEEDB': 'rgba(0,0,0,0)'
					})

				tagG2.append("text")
				.attr("dx", 3)
				.attr("dy", 15.5)
				.attr("height", 20)
				.style('font-family', 'microsoft yahei')
				.style('fill', "#FF8900")
				.style("font-size", "12px")
				.text(function (d) {
					return d.data.name === actualController.name && d.depth ? '实际控制人' : ''
				});

				// 最终受益人标签
				const tagG3 = tag.append('g')
				.attr('class', 'g')
				.attr('transform', 'translate(126, 0)')
					
				tagG3.append("rect")
					.attr("y", 2)
					.attr("height", 20)
					.attr("width", 68)
					.style('fill', function (d) {
						return d.data.name === actualController.name && d.depth ? '#E5F2FD': 'rgba(0,0,0,0)'
					})

				tagG3.append("text")
				.attr("dx", 3)
				.attr("height", 20)
				.style('font-family', 'microsoft yahei')
				.attr("dy", 15.5)
				.style('fill', "#128BED")
				.style("font-size", "12px")
				.text(function (d) {
					return d.data.name === actualController.name && d.depth ? '最终受益人' : ''
				});
				

				// 第三行 持股比例
				const percent = nodeEnter.append('g')
					.attr('class', 'percent')
					.attr('transform', function (d) {
						return d.data.name === actualController.name && d.depth ? 'translate(40, 25)' : 'translate(40, 0)'
					})

				percent.append("text")
				.attr("dy", 15.5)
				.style('fill', "#808080")
				.style('font-family', 'microsoft yahei')
				.style("font-size", "12px")
				.text(function (d) {
					return d.depth ? "持股比例：" : ""
				});

				percent.append("text")
				.attr("dy", 15.5)
				.style('fill', "#FF8900")
				.attr('transform', 'translate(60, 0)')
				.style('font-family', 'microsoft yahei')
				.style("font-size", "12px")
				.text(function (d) {
					return d.data.percent
				});

				// 第三行 认缴金额
				const amount = nodeEnter.append('g')
					.attr('class', 'amount')
					.attr('transform', 'translate(240, 0)')

				amount.append("text")
				.attr("dy", function (d) {
					return d.data.name === actualController.name && d.depth ? 40.5 : 15.5
				})
				.style('fill', "#808080")
				.style('font-family', 'microsoft yahei')
				.style("font-size", "12px")
				.text(function (d) {
					return d.depth ? "认缴金额：" : ""
				});

				amount.append("text")
				.attr("dy", function (d) {
						return d.data.name === actualController.name && d.depth ? 40.5 : 15.5
					})
				.style('fill', "#FF8900")
				.attr('transform', 'translate(60, 0)')
				.style('font-family', 'microsoft yahei')
				.style("font-size", "12px")
				.text(function (d) {
					return d.data.percent
				});

				// 圆圈+ -整体
			var circle = nodeEnter.append("g")
				.attr("class", "circle")
				.on("click", click);

			circle.append("circle")
				.style('fill', "#fff")
				.style("stroke", "#d8d8d8")
				.style('stroke-width', 1)
				.style('cursor', "pointer")
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
			circle.append("text")
				.attr("class", "fa")
				.attr("dy", 4.5)
				.attr("cx", "20px")
				.attr("cy", "30px")
				.attr("font-family", "FontAwesome")
				.attr('text-anchor', 'middle')
				.style('fill', "#d8d8d8")
				.style('cursor', "pointer")
				.attr("transform", function (d) {
					return "translate(20,0)";
				})
				.text(function (d) {
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
				.attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
				.style("opacity", 1);

			node.transition()
				.duration(duration)
				.attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
				.style("opacity", 1)
				.select("rect")
				.style("stroke", "#d8d8d8")
				.style("fill", color);

			// Transition exiting nodes to the parent's new position.
			node.exit().transition()
				.duration(duration)
				.attr("transform", function (d) { return "translate(" + source.y + "," + source.x + ")"; })
				.style("opacity", 0)
				.remove();

			//Update the links…
			var link = container.selectAll(".link")
				.data(root.links(), function (d) { return d.target.id; });

			//Enter any new links at the parent's previous position.
			link.enter().insert("path", "g")
				.attr("class", function (d) {
					return "link link_" + d.target.depth + " " + getClass(d.target);
				})
				.attr('fill', 'none')
				.attr('stroke', '#d8d8d8')
				.attr("d", function (d) {
					var o = { x: source.x0, y: source.y0 };
					return elbow({ source: o, target: o });
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
				.attr("d", function (d) {
					var o = { x: source.x, y: source.y };
					return elbow({ source: o, target: o });
				})
				.remove();

			//Stash the old positions for transition.
			root.each(function (d) {
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
			if (lastClickD) {
				lastClickD._isSelected = false;
			}
			d._isSelected = true;
			lastClickD = d;
			update(d);
		}

		function getClass(d) {
			if (d.data.class) {
				return d.data.class
			} else {
				return "";
			}
		}
		// 折线
		function elbow(d) {
			return "M" + d.source.y + "," + d.source.x
				+ "H" + (d.source.y + (d.target.y - d.source.y) / 8)
				+ "V" + d.target.x
				+ "H" + d.target.y;
		}
		function color(d) {
			if (d._isSelected) return '#fff';
			return d._children ? "#fff" : d.children ? "#fff" : "#fff";
		}
		function nodeHover(d, i) {
			var links = d3.selectAll(".rect")[0];
				for (let i = 0; i < links.length; i++) {
					let item = links[i];
					if (
						d3.select(item).attr("class").indexOf("bg") != "-1"
					) {
						d3.select(item).attr("class", "bg");
					}
				}
			console.log(d)
		}
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
