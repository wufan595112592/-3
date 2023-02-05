<template>
<div class="collapse-main">
  <div class="left">
    <div class="left">
      <div v-for="(item, index) in menuList" :key="item.name">
        <div class="rule-btn rule-btn-radius" :class="[!index ?'rule-btn-radius' : '', activeIndex == index ? 'active' : '',]" @click="clickTab(index)">{{ item.title }}</div>
        <div class="filter-panel gd-filter">
          <div v-if="activeIndex == index" translate="">
            <div class="single-filter" v-for="(ele, idx) in item.subItems" :key="ele.name">
              <div class="value rule-btn" @click="selectChange(idx)">
                {{ ele.name }}
                <span class="caret"></span>
              </div>
              <div v-if="showOpt[idx]" class="option">
                <div v-for="(opt, i) in ele.children" :key="i" :class="opt.name == ele.name ? 'active': ''" @click="optChange(index, idx, opt.name)">{{ opt.name }}<span v-if="opt.tips" class="tips">{{ opt.tips }}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { ref } from 'vue';
const emit = defineEmits(['clickTab'])
const activeIndex = ref(0);
const showOpt = ref([]);
showOpt.value = [false, false]
const menuList = ref([])
menuList.value = [
  {
    title: '股东信息', subItems:
    [
      {
        name: '全部类型', children: [{ name: '全部类型', tips: '' }, { name: '自然人股东', tips: '' }, { name: '企业法人', tips: '' }, { name: '法人股东', tips: '' }, { name: '外国(地区)企业', tips: '' }]
      },
      {
        name: '持股比例不限', children: [{ name: '持股比例不限', tips: '' }, { name: '5%以上', tips: '' }, { name: '25%以上', tips: '(超过25%的为最终受益人)' }, { name: '50%以上', tips: '' }, { name: '90%以上', tips: '' }]
      }
    ]
  },
  {
    title: '对外投资', subItems:
    [
      {
        name: '控股类型不限', children: [{ name: '控股类型不限', tips: '' }, { name: '控股', tips: '' }, { name: '非控股', tips: '' }]
      },
      {
        name: '持股比例不限', children: [{ name: '持股比例不限', tips: '' }, { name: '100%', tips: '' }, { name: '66.66%以上', tips: '' }, { name: '50%以上', tips: '' }, { name: '20%以上', tips: '' }, { name: '5%以上', tips: '' }, { name: '不到5%', tips: '' }]
      }
    ]
  },
  {
    title: '历史股东信息', subItems:null
  }
]


const clickTab = (active) => {
  activeIndex.value = active
  emit('clickTab')
}
const selectChange = (idx) => {
  showOpt.value.forEach((item, i) => {
    if (i == idx) {
      showOpt.value[idx] = !showOpt.value[idx]
    } else {
      showOpt.value[i] = false
    }
  })
}
const optChange = (index, idx, name) => {
  menuList.value[index].subItems[idx].name = name
  showOpt.value[idx] = false
}

</script>
<!-- <script>
import { ref, defineEmits } from 'vue';

export default {
  setup() {
    const emit = defineEmits(['clickTab'])
    const activeIndex = ref(0);
    const showOpt = ref([]);
    showOpt.value = [false, false]
    const menuList = ref([])
    menuList.value = [
      {
        title: '股东信息', subItems:
        [
          {
            name: '全部类型', children: [{ name: '全部类型', tips: '' }, { name: '自然人股东', tips: '' }, { name: '企业法人', tips: '' }, { name: '法人股东', tips: '' }, { name: '外国(地区)企业', tips: '' }]
          },
          {
            name: '持股比例不限', children: [{ name: '持股比例不限', tips: '' }, { name: '5%以上', tips: '' }, { name: '25%以上', tips: '(超过25%的为最终受益人)' }, { name: '50%以上', tips: '' }, { name: '90%以上', tips: '' }]
          }
        ]
      },
      {
        title: '对外投资', subItems:
        [
          {
            name: '控股类型不限', children: [{ name: '控股类型不限', tips: '' }, { name: '控股', tips: '' }, { name: '非控股', tips: '' }]
          },
          {
            name: '持股比例不限', children: [{ name: '持股比例不限', tips: '' }, { name: '100%', tips: '' }, { name: '66.66%以上', tips: '' }, { name: '50%以上', tips: '' }, { name: '20%以上', tips: '' }, { name: '5%以上', tips: '' }, { name: '不到5%', tips: '' }]
          }
        ]
      },
      {
        title: '历史股东信息', subItems:null
      }
    ]


    const clickTab = (active) => {
      activeIndex.value = active
      emit('clickTab')
    }
    const selectChange = (idx) => {
      showOpt.value[idx] = !showOpt.value[idx]
    }
    const optChange = (index, idx, name) => {
      menuList.value[index].subItems[idx].name = name
      showOpt.value[idx] = false
    }
    return { activeIndex, showOpt, menuList, clickTab, selectChange, optChange };
  },
};
</script> -->
<style lang="scss" scoped>
.collapse-main{
  position: fixed;
  left: 30px;
  top: 156px;
  display: inline-block;
  z-index: 1;
  border-radius: 2px;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  border-top: 1px solid #eee;
  .left {
    .rule-btn {
      width: 130px;
      height: 40px;
      line-height: 40px;
      color: #333;
      background-color: #fff;
      text-align: center;
      cursor: pointer;
      font-weight: bold;
      border-bottom: 1px solid #eee;
    }
    .rule-btn.active {
      color: #fff;
      border: 1px solid #128bed;
      background-color: #128bed;
    }
  }
  .single-filter {
    position: relative;
    background-color: #fafafa;
    .value {
      font-weight: 400;
      position: relative;
      width: 130px;
      height: 40px;
      line-height: 40px;
      color: #808080;
      background-color: #fff;
      text-align: center;
      cursor: pointer;
      border-radius: 2px;
      border-bottom: 1px solid #eee;
      .rotate{
        transform: rotate(180deg);
        transition: transform .2s;
      }
    }
    .caret {
      position: relative;
      top: -2px;
      margin-left: 4px;
    }
    .option {
      position: absolute;
      left: 0;
      top: 34px;
      min-width: 130px;
      background-color: #fff;
      box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
      border-radius: 4px;
      z-index: 1;
      div {
        display: block;
        padding: 5px 12px;
        overflow: hidden;
        color: rgba(0,0,0,0.65);
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      .active {
        background-color: #fafafa;
        color: #128bed;
      }
    }
  }
  .filter-panel{
    height: unset;
    transition: all 0.3s linear;
    will-change: height;
 
    &.up {
      height: 0;
    }
    &.down {
      height: 80px;
    }
  }
}
.caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}
</style>