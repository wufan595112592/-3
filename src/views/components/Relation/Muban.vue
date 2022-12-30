<template>
  <div class="relation-muban">
    <div class="header">
      <div class="title">筛选</div>
      <div class="filter-close"><span>×</span></div>
    </div>
    <div class="body">
      <div class="row-panel">
        <div class="key">状态</div>
        <div class="val">
          <a class="btn active">全部</a>
          <a class="btn">吊销</a>
          <a class="btn">注销</a>
          <a class="btn">存续</a>
        </div>
      </div>

      <div class="row-panel">
        <div class="key range">持股</div>
        <div class="val range">
          <a class="btn active">全部</a>
          <a class="btn">吊销</a>
          <a class="btn">注销</a>
          <a class="btn">存续</a>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.relation-muban{
  width: 500px;
  height: 560px;
  background: white;
  box-shadow: 0px 2px 4px 0px rgb(0 0 0 / 20%);
  position: absolute;
  bottom: 100px;
  right: 70px;
  border-radius: 6px;
  .header{
    border-bottom: 1px solid #eee;
    height: 55px;
    line-height: 55px;
    font-size: 16px;
    font-weight: bold;
    position: relative;
    padding: 0 15px;
    .filter-close{
      position: absolute;
      right: 15px;
      display: inline-block;
      font-size: 26px;
      top: 50%;
      transform: translate(0, -50%);
      font-weight: bold;
      cursor: pointer;
      span{
        color: #128BED;
      }
    }
  }
  .body {
    padding: 15px 0;
    .row-panel {
      margin-bottom: 20px;
      overflow: hidden;
      padding: 0 15px;
      .key {
        float: left;
        margin-right: 15px;
        line-height: 32px;
      }
      .val {
        float: left;
        min-height: 32px;
        position: relative;
        .btn {
          display: inline-block;
          margin-right: 15px;
          width: 82px;
          height: 32px;
          box-sizing: border-box;
          border-radius: 2px;
          font-size: 12px;
          padding: 0;
          line-height: 30px;
          border: 1px solid #d6d6d6 !important;
          color: #333 !important;
          background-color: #fff !important;
          color: #333;
          background-image: none;
        }
      }
      a.active {
        background: white !important;
        color: #128bed !important;
        border: #128bed 1px solid !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
      }
    }
  }
}
</style>
