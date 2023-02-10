<!-- 股权穿透图 -->
<template>
  <!-- <Header title="小米科技有限责任公司" :active="3" /> -->
  <div id="borrow" style="width: 100%;height: 100%;background-color: #fff;">
    <div id="mountNode" style="width: 100%;height: 100%;"></div>
    <ToolBox v-if="show" ref="toolBoxRef" @maoScale="maoScale" @simpleChange="simpleChange" @editChange="editChange" @refresh="refresh" @exportImg="exportImg" @screenfullChange="screenfullChange" />
    <!-- <DetailContent /> -->
    <!-- <RelationDetail v-if="Detailshow" @close="close" /> -->
    <transition name="v">
          <ChartDetail v-if="isShowDetail" :data="detailData" :position="detailPosition"></ChartDetail>
        </transition>
  </div>
</template>
<script>
import Header from '../components/Header/index.vue'
import ToolBox from './components/Equity/ToolBox.vue'
import DetailContent from './components/DetailContent.vue'
import RelationDetail from '@/views/components/Relation/RelationDetail.vue'
import ChartDetail from './components/CompanyChart/ChartDetail.vue';
import { drawing, simpleChange1, zoomClick, editChange1, init, register } from './components/Equity/index.js'
import D3Mixin from '@/hooks/D3Mixin'
import { ref, onMounted } from 'vue'
import EquityJson from '@/api/EquityJson.json'

let { toggleFullScreen, downloadImpByChart } = D3Mixin()
export default {
  components: {
    Header,
    ToolBox,
    DetailContent,
    RelationDetail,
    ChartDetail
  },
  setup() {
    let show = ref(true)
    let isShowDetail = ref(false)
    let detailData = ref({});
    let detailPosition = ref({
        top: 0,
        left: 0
     });
    const toolBoxRef = ref(null)
    const exportImg = () => {
      downloadImpByChart('股权穿透图谱', '北京马六级餐饮')
    }
    const close = () => {
      Detailshow.value = false
    }
    const simpleChange = (val) => {
      simpleChange1(val.value)
    }
    const maoScale = (val) => {
      zoomClick(val)
    }
    const editChange = (val) => {
      editChange1(val.value)
    }
    const refresh = () => {
      toolBoxRef.value.simpleChange()
      toolBoxRef.value.editChange()
      toolBoxRef.value.showBox()
      show.value = false
      setTimeout(function () {
        show.value = true
      }, 2)
      drawing()
    }
    const screenfullChange = () => {
      toggleFullScreen()
    }

    


    let x = ['' ,'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    const convertToHierarchy = (data) => {
      function uuid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
      }

      return (
          s4() +
          s4() +
          "-" +
          s4() +
          "-" +
          s4() +
          "-" +
          s4() +
          "-" +
          s4() +
          s4() +
          s4()
      );
      }
         // 获取子元素
        function getChildren(level, name) {
            if(level > 10) {
              return [];
            }
            const current = s[level].get(name);    
            if(!current) {
              return []
            }
            const children = [];
            current.stock_holder.forEach(item => {
                  children.push({
                    "id": uuid(),
                    "short_name": item.name,
                    "level": level,
                    "isKey":level == 1 && item.stock_type.indexOf('法人')>=0,
                    "amount": item.amount,
                    "has_problem": "0",
                    "percent": item.percent,
                   // "pid": "77bd1a4a4459cafe587269a271c2261a",
                    "sh_type": item.invest_type,
                    "children": getChildren(level+1, item.name),
                  //  "eid": "",
                   // "identifier": "2",
                    "name": item.name,
                    "type": "E"
                  });
            })

            return children;
        }

        let c_trees = [], p_trees = [];
        let s = [null, new Map(),new Map(),new Map(),new Map(),new Map(),new Map(),new Map(),new Map(),new Map(),new Map()];
        for(let i = 1 ;i < 11;i ++) {
          data['stock_holder_' + x[i]].forEach(item => {
            s[i].set(item.name, item);
          });
        }
        getChildren(1, data.enterprise.name).forEach(item => {
            if(item.isKey) p_trees .push(item)
            else c_trees.push(item)
        });
        return {
          root: data.enterprise,
          c_trees,
          p_trees,
        }
    }

    onMounted(() => {
      let hoverTimer;      

      register({
        nodeHover: function(e) {
          let dom =  document.getElementById(e.id);
          let rect = dom.getBoundingClientRect();

          hoverTimer && clearTimeout(hoverTimer);
          hoverTimer = setTimeout(() => {
            isShowDetail.value = true;

            if(e.name =="origin") {
              detailData.value = {
              short_name: e.data.short_name,
              name: e.data.name,
              oper_name: e.data.oper_name,
              reg_capi: e.data.regist_capi,
              start_date: e.data.start_date
              }
            } else {
              detailData.value = {
              short_name: e.short_name,
              name: e.name,
              oper_name: e.oper_name
              }
            }
            
            detailPosition.value = {
              top: rect.top - 130,
              left:  rect.right ,
            }
          }, 500);
        },
	      nodeOut: () => {
          hoverTimer && clearTimeout(hoverTimer);
          isShowDetail.value = false;
        }
      })

      drawing(convertToHierarchy(EquityJson.data));
    })

    return {
      isShowDetail,
      close,
      show,
      toolBoxRef,
      simpleChange,
      maoScale,
      editChange,
      refresh,
      exportImg,
      screenfullChange,
      detailData,
      detailPosition
    }
  }
};
</script>

<style lang="scss" scoped>
.downwardNode text,
.upwardNode text {
  font: 10px sans-serif;
}

.downwardLink {
  fill: none;
  stroke-width: 1px;
  /* opacity: 0.5; */
}

.upwardLink {
  fill: none;
  stroke-width: 1px;
  /* opacity: 0.5; */
}
::v-deep .downLine {
  stroke: #128bed;
  stroke-dasharray: 6, 2;
  stroke-dashoffset: 20;
  animation: 1s down-lines infinite linear;
  z-index: 999;
  opacity: 1;
  stroke-width: 2px;
}
::v-deep .upLine {
  stroke: #128bed;
  stroke-dasharray: 6, 2;
  stroke-dashoffset: 20;
  animation: 1s up-lines infinite linear;
  z-index: 999;
  opacity: 1;
  stroke-width: 2px;
}
@keyframes down-lines {
  0% {
    stroke-dashoffset: 10;
  }

  100% {
    stroke-dashoffset: -10;
  }
}
@keyframes up-lines {
  0% {
    stroke-dashoffset: -10;
  }

  100% {
    stroke-dashoffset: 10;
  }
}
::v-deep .isExpand {
  dominant-baseline: middle;
  text-anchor: middle;
}

::v-deep .linkname {
  text-anchor: middle;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
/* 离开和进入过程中的样式 */
.v-enter-active,
.v-leave-active {
  /* 添加过渡动画 */
  transition: opacity 0.6s ease;
}
/* 进入之后和离开之前的样式 */
.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>

