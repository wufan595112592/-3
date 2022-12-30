<!-- 实际控制人 -->
<script setup>
import cytoscape from 'cytoscape'
import Header from '../components/Header/index.vue'
</script>

<template>
  <Header title="小米科技有限责任公司" :active="8" />
  <div class="box">
    <div id="MainCy" style="width: 100%;height: 100%;"></div>
  </div>
</template>
<script>
  export default {
    components: {
      Header
    },
    mounted() {
      var cy = cytoscape({
        container: document.getElementById('MainCy'),
        layout: {
          name: 'grid',
          rows: 2,
          cols: 2
        },
        minZoom: 0.5,
        maxZoom: 2,
        style: [
          {
            selector: 'node',
            style: {
                'content': 'data(name)',
                'background-color': '#3549fc',
            }
          },
          {
            selector: 'edge',
            style: {
              'content': 'data(relationship)',
              'curve-style': 'bezier', 
              'line-color': '#1db1b1',
            }
          },
        ],
        elements: {
          nodes: [
            {
              data: {
                id: 'a',
                name: 'aaa'
              }
            },
            {
              data: {
                id: 'j',
                name: 'Jerry'
              }
            },
            {
              data: {
                id: 'e',
                name: 'Elaine'
              }
            },
            {
              data: {
                id: 'k',
                name: 'Kramer'
              }
            },
            {
              data: {
                id: 'g',
                name: 'George'
              }
            },
          ],
          edges: [
            {
              data: {
                source: 'a',
                target: 'k',
                relationship: '12'
              }
            },
            {
              data: {
                source: 'a',
                target: 'e',
                relationship: '12'
              }
            },
            {
              data: {
                source: 'a',
                target: 'j',
                relationship: '12'
              }
            },
            {
              data: {
                source: 'e',
                target: 'k',
                relationship: '1'
              }
            },
            {
              data: {
                source: 'k',
                target: 'e',
                relationship: '2'
              }
            },
            {
              data: {
                source: 'k',
                target: 'j',
                relationship: '3'
              }
            },
            {
              data: {
                source: 'k',
                target: 'g',
                relationship: '4'
              }
            },
            {
              data: {
                source: 'e',
                target: 'j',
                relationship: '5'
              }
            },
          ]
        }
      });
      cy.nodes().on('click', (evt) => {
        console.log(evt)
      });
      cy.edges().on('click', (evt) => {
        console.log(evt)
      });
    },
  }
</script>

<style scoped>
.box{
  width: 100vw;
  height: 100vh;
  background-color: #cbe8ff;
}
</style>
