
// 声明变量
var id;
var activeNode;
var graphDatas;     //接口返回的原始数据
var _rootData, _rootNode;  //原始数据转换成的graph数据,根节点数据
const _COLOR = {
  node: { person: 'rgb(255, 96, 96)', company:'rgb(78, 162, 240)', current:'rgb(255, 158, 0)' },
  border: { person: 'rgb(255, 96, 96)', company:'rgb(78, 162, 240)', current:'#EF941B' },
  line: { invest:'rgb(255, 96, 96)', employ:'rgb(78, 162, 240)' }
};

var _currentKeyNo,_companyRadius = 35,_personRadius = 15,_circleMargin = 10,_circleBorder = 3,_layoutNode = {}, _isFocus = false;
var _maxChildrenLength = 0;
/** 解决浏览器标签切换排列问题 */
var _isNeedReload = false;
var _isGraphLoaded = false;

export function currentState() {
  /** 网页当前状态判断 (解决没布局完就切换页面造成点聚集在一起)*/
  var hidden, state, visibilityChange;
  if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
    state = "visibilityState";
  } else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
    state = "mozVisibilityState";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
    state = "msVisibilityState";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
    state = "webkitVisibilityState";
  }
}

export function init() {
  
}