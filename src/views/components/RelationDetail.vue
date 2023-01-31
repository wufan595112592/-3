<template>
<div class="ant-modal-root">
  <div class="ant-modal-mask"></div>
  <div tabindex="-1" role="dialog" aria-labelledby="rcDialogTitle0" class="ant-modal-wrap">
    <div role="document" class="ant-modal">
      <div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden;"></div>
      <div class="ant-modal-content">
        <button type="button" aria-label="Close" class="ant-modal-close">
          <span class="ant-modal-close-x">
            <i aria-label="icon: close" class="anticon anticon-close ant-modal-close-icon">
              <svg viewBox="64 64 896 896" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="">
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
              </svg>
            </i>
          </span>
        </button>
        <div class="ant-modal-header">
          <div id="rcDialogTitle0" class="ant-modal-title">
            <div class="company-header">
              <div class="company-header-logo clearfix">
                <div>
                  <span class="large-logo enterprise">北京点睛</span>
                </div>
              </div>
              <div class="company-header-info">
                <div class="company-header-info-name">
                  <span>
                    <a href="/company/7dc9b702-90b1-4fb3-bc96-a8fa670bcd68" target="_blank">北京点睛无限科技有限责任公司</a>
                  </span>
                </div>
                <div class="company-header-info-item">
                  <span class="company-header-info-item-key">法定代表人：</span>
                  <span class="company-header-info-item-value">
                    <span>
                      <a href="/name-detail/06f299e66a816e852627bb745cef2783" target="_blank">刘斌</a>
                    </span>
                  </span>
                </div> 
                <div class="company-header-info-item">
                  <span class="company-header-info-item-key">注册资本：</span>
                  <span class="company-header-info-item-value">210 万人民币</span>
                </div>
                <div class="company-header-info-item">
                  <span class="company-header-info-item-key">成立日期：</span>
                  <span class="company-header-info-item-value">2009-12-30</span>
                </div>
                <div class="company-header-info-item">
                  <span class="company-header-info-item-key">行业领域：</span>
                  <span class="company-header-info-item-value">其他技术推广服务</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
          <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
          <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
        </a-tabs>
      </div>
      <div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden;">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const activeKey = ref('1')
    return {
      activeKey
    };
  },
});
</script>
<style lang="scss" scoped>
.ant-modal-wrap{
  position: fixed;
  top: 105px;
  left: 0;
  width: 350px;
  z-index: 1001;
  .ant-modal {
    box-sizing: border-box;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum";
    position: relative;
    top: 100px;
    width: auto;
    margin: 0 auto;
    padding: 0 0 24px;
    pointer-events: none;
    width: 350px;
    top: auto;
    padding-bottom: 0;
  }
  .ant-modal-content {
    position: relative;
    background-color: #f5f5f5;
    background-clip: padding-box;
    border: 0;
    border-radius: 4px;
    box-shadow: 0 2px 7px 0 hsl(0deg 0% 61% / 50%);
    pointer-events: auto;
  }
  .ant-modal-header {
    padding: 15px;
    color: rgba(0,0,0,.65);
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 4px 4px 0 0;
    
}
.ant-modal-title {
    margin: 0;
    color: rgba(0,0,0,.85);
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    word-wrap: break-word;
    .company-header-logo {
      float: left;
    }
  }
  .clearfix:before {
    display: table;
    content: "";
  }
}
</style>