<template>
    <div class="box">
      <div id="cy" style="width: 100%;height: 100%;"></div>
    </div>
</template>
<script>

import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre';
cytoscape.use (dagre)
export default {
	mounted() {
		var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: {
          nodes: [
            // { data: { id: '1' } },
            // { data: { id: '2' } },
            // { data: { id: '3' } },
            // { data: { id: '4' } },
            // { data: { id: '5' } },
            // { data: { id: '6' } },
            // { data: { id: '7' } },
            // { data: { id: '8' } },
            // { data: { id: '9' } },
            // { data: { id: '10' } },
            // { data: { id: '11' } },
            // { data: { id: '12' } },
            // { data: { id: '13' } },
            // { data: { id: '14' } },
            // { data: { id: '15' } },
            // { data: { id: '16' } },
            // { data: { id: '17' } },
			// { data: { id: '18' } } 
			{ data:{ "uid": "50cea0a1-0f7a-4d61-98a5-55b9497b3d17", "id": "80319730", "name": "根节点", "iskey": true } },
			{ data:{ "uid": "e39132df-0851-4c97-8871-96c3fdf6b74e", "id": "165939042", "name": "南通众和融资担保集团有限公司", "iskey": false } },
			{ data:{ "uid": "a1cb2110-e750-48b1-9266-fe1d44c5ff75", "id": "81694529", "name": "南通产业控股集团有限公司", "iskey": false } },
			{ data:{ "uid": "7a3f7a34-024f-44bb-96ff-77c4045a7b05", "id": "102930825", "name": "南通投资管理有限公司", "iskey": false } },
			{ data:{ "uid": "587eff5b-38c6-4a9d-8871-fb67356874ef", "id": "443841020", "name": "子节点", "iskey": true } },
			{ data: { "uid": "", "id": "407356079", "name": "顾建国", "iskey": false}  },
			{ data: { "uid": "", "id": "70390028", "name": "王国庆", "iskey": false } },
			{ data:{ "uid": "be7d4a46-80b9-446d-94f8-b30a56cb7f94", "id": "139077047", "name": "宝钢集团南通钢铁有限公司杭州分公司", "iskey": false}  },
			{ data:{ "uid": "8c6015b6-f496-43c5-abe3-807e05703079", "id": "506008514", "name": "宝钢集团南通钢铁有限公司宁波分公司", "iskey": false}  },
			{ data:{ "uid": "ad67c923-fc86-4a19-af3c-e025327a5671", "id": "296419603", "name": "上海优纳供应链管理有限公司", "iskey": false } },
			{ data:{ "uid": "9b1a87e4-4a76-44f3-8f57-8e39c79a0d0d", "id": "138501684", "name": "上海西本建设发展有限公司", "iskey": false}  }
          ],
          edges: [
            // { data: { source: '1', target: '2' } },
            // { data: { source: '1', target: '3' } },
            // { data: { source: '2', target: '4' } },
            // { data: { source: '4', target: '5' } },
            // { data: { source: '4', target: '6' } },
            // { data: { source: '5', target: '6' } },
            // { data: { source: '5', target: '7' } },
            // { data: { source: '7', target: '8' } },
            // { data: { source: '3', target: '9' } },
            // { data: { source: '3', target: '10' } },
            // { data: { source: '10', target: '11' } },
            // { data: { source: '11', target: '12' } },
            // { data: { source: '12', target: '13' } },
            // { data: { source: '12', target: '14' } },
            // { data: { source: '14', target: '15' } },
            // { data: { source: '15', target: '16' } },
            // { data: { source: '16', target: '17' } },
            // { data: { source: '16', target: '18' } },
            { data: { "source": "165939042", "target": "80319730", "label": "股东" } },
						{ data: { "source": "81694529", "target": "165939042", "label": "股东" }},
						{ data: { "source": "81694529", "target": "102930825", "label": "股东" }},
						{ data: { "source": "102930825", "target": "443841020", "label": "股东" }},
						{ data: { "source": "407356079", "target": "81694529", "label": "董监高" }},
						{ data: { "source": "407356079", "target": "443841020", "label": "董监高" }},
						{ data: { "source": "70390028", "target": "80319730", "label": "董监高，历史股东" }},
						{ data: { "source": "70390028", "target": "139077047", "label": "法定代表人" }},
						{ data: { "source": "443841020", "target": "139077047", "label": "分支机构" }},
						{ data: { "source": "70390028", "target": "506008514", "label": "法定代表人" }},
						{ data: { "source": "443841020", "target": "506008514", "label": "分支机构" }},
						{ data: { "source": "296419603", "target": "80319730", "label": "股东" }},
						{ data: { "source": "70390028", "target": "296419603", "label": "董监高，股东，法定代表人" }},
						{ data: { "source": "138501684", "target": "80319730", "label": "股东" }},
						{ data: { "source": "70390028", "target": "138501684", "label": "法定代表人，董监高，股东" }}
          ]
        },
  layout: {
    name: "dagre",
    rankDir: 'TB' //love this. you can quickly change the orientation here from LR(left to right) TB (top to bottom), RL, BT. Great dropdown option for users here. 
  },
  style: [{
    selector: 'node',
    style: {
      'label': 'data(name)',
      'width': '30%',
      'font-size': '20px',
      'text-valign': 'center',
      'shape': 'circle',
      'background-color': 'rgba(113,158,252,1)', 
      'border': '2px grey #ccc'
    }
  }, {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle'
    }
  }]
});cy.nodes().on('click', (evt) => {
				console.log(evt)
		});
		cy.edges().on('click', (evt) => {
				console.log(evt)
		});
	},
}
</script>

<style lang="scss" scoped>
.box{
  width: 100vw;
  height: 100vh;
}
</style>
