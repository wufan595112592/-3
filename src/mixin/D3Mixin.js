/**
 * 全屏 toggleFullScreen
 * 保存 downloadImpByChart
 */
export const D3Mixin = {
  data() {
    return {
      isFullscreen: true,
    }
  },
  methods: {
    downloadImpByChart(chartName) {
      var _this = this;
      var html = document.getElementsByTagName("html")[0]; //获取可视区域宽

      var Bwidth = html.clientWidth + 20; //转换屏幕宽高
      var Bheight = html.clientHeight + 150;
      var Bmax = Bwidth > Bheight ? Bwidth : Bheight;
      var Bmin = Bwidth > Bheight ? Bheight : Bwidth;

      var canvas = document.createElement("canvas");
      var g = document.getElementsByTagName("g")[0].getBBox();
      var svgbox = d3.select('#mountNode svg');
      var gbox = document.getElementsByClassName("gbox")[0] || document.getElementsByClassName("container")[0];
      var x = g.width / 2 - html.clientWidth / 2 + 20; //计算偏移位置
      var y = 0;
      g.y < 0 ? (y = Math.abs(g.y)) : (y = 0);
      // gbox.style.transform = "translate(" + x + 'px' + "," + (y-60) + "px" + ")  scale(1)"; //偏移位置
      gbox.style.transform =
        "translate(" + x + "px" + "," + y + "px" + ")  scale(1)"; //偏移位置
      svgbox.attr("width", g.width + 20);
      svgbox.attr("height", g.height + 150);
      var svg = document.getElementById("mountNode").innerHTML;
      var c = canvas.getContext("2d");
      //新建Image对象
      var img = new Image();
      //svg内容
      img.src = "data:image/svg+xml," + encodeURIComponent(svg); //svg内容中可以有中文字符
      // img.src = "data:image/svg+xml," + svg; //svg内容中不能有中文字符
      //图片初始化完成后调用
      var cwidth = g.width;
      img.onload = function () {
        //将canvas的宽高设置为图像的宽高
        canvas.width = cwidth + 20;
        canvas.height = g.height + 150;
        //canvcas画图片
        c.fillStyle = "#fff";
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.drawImage(img, 0, 30);
        var a = document.createElement("a");
        a.download = `${chartName}-${_this.companyName}.png`;
        a.href = canvas.toDataURL("image/png");
        a.click();
      };
      //图片转换为base64后 传给后端 发邮件
      gbox.style.transform = "";
      svgbox.attr("width", Bmax);
      svgbox.attr("height", Bmin);
    },
    checkFull() {
      var isFull =
        document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled
      if (isFull === undefined) {
        isFull = false
      }
      return isFull
    },
    FullScreen(el) {
      if (this.isFullscreen) {
        //退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (!document.msRequestFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        //进入全屏
        if (el.requestFullscreen) {
          el.requestFullscreen()
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen()
        } else if (el.webkitRequestFullscreen) {
          //改变平面图在google浏览器上面的样式问题
          el.webkitRequestFullscreen()
        } else if (el.msRequestFullscreen) {
          this.isFullscreen = true
          el.msRequestFullscreen()
        }
      }
    },
    toggleFullScreen(e) {
      this.isFullscreen = !this.isFullscreen
      this.FullScreen(document.getElementById('borrow'))
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      let that = this
      if (!that.checkFull()) {
        //要执行的动作
        that.isFullscreen = true
      }
    })
  }
}