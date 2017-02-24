//index.js
//获取应用实例
var app = getApp()
var ctx = null
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    var that = this
    ctx = wx.createCanvasContext('firstCanvas');

    that.render()

  },

  render: function (e) {

    console.log("111")

    /**/
    var points = [{ "name": "其他", "cost": 400, "color": "#ffdb00" }, { "name": "手机充值", "cost": 100, "color": "#ff0066" }, { "name": "线下", "cost": 260, "color": "#6959cd" }, { "name": "网购", "cost": 100, "color": "#85a969" }, { "name": "网购", "cost": 100, "color": "#27cc73" }, { "name": "网购", "cost": 100, "color": "#9c1414" }, { "name": "网购", "cost": 100, "color": "#bcfffd" }, { "name": "网购", "cost": 100, "color": "#936b3c" }];

    var totalCost = 0.0;
    for (var i in points) {
      console.log("points.count")
      console.log(points[i].cost);
      totalCost += points[i].cost;
    }

    if (totalCost > 0) {
      console.log("totalCost")

      var r = 60.0   //圆的半径
      var context = wx.createContext() // 使用 wx.createContext 获取绘图上下文 context

      context.setLineWidth(40.0) // 设置线条宽度

      var float = 0.0;
      var occfloat = 0.0;

      //圆点坐标
      var centerPointX = 150.0;
      var centerPointY = 100.0;

       //起始点坐标
      var beginPointX = centerPointX;
      var beginPointY = centerPointY - r;

       //起始弧度  结束弧度（圆的总弧度为2𝜋 ，约定：水平x正轴为弧度起始，值为零，顺时针增大「y负轴为𝜋／2 ，  x负轴为𝜋 ，y正轴为 3𝜋/2」）
      var beginRadian = 3 * Math.PI / 2;
      var endRadian = 0;


      for (var j in points) {
        console.log("points.count")
        float = points[j].cost / totalCost;
        beginRadian = occfloat > 0.75 ? 2 * Math.PI * (1 + 0.75 - occfloat) : 3 * Math.PI / 2 - 2 * Math.PI * occfloat

        endRadian = (occfloat + float) > 0.75 ? 2 * Math.PI * (1 + 0.75 - (occfloat + float)) : 3 * Math.PI / 2 - 2 * Math.PI * (occfloat + float)
        if (occfloat + float == 1) {
          endRadian = 3 * Math.PI / 2
        }
        if (float == 1) {
          beginRadian = 0;
          endRadian = 2 * Math.PI
          beginPointX = centerPointX + r;
          beginPointY = centerPointY;
        }


        context.beginPath(); //开始创建一个路径
        context.moveTo(beginPointX, beginPointY) //把路径移动到画布中的指定点，不创建线条
        context.setStrokeStyle(points[j].color) // 设置线条颜色

        context.arc(centerPointX, centerPointY, r, beginRadian, endRadian, true) //true 表示指定的弧度方向是逆时针 （顺时针为 false）

        console.log("beginPointX:" + beginPointX + ",beginPointY:" + beginPointY + ",centerPointX:" + centerPointX + ",centerPointY:" + centerPointY + ",beginRadian:" + beginRadian / Math.PI + ",endRadian:" + endRadian / Math.PI + ",float:" + float)

       

        context.stroke();//画出当前路径的边框

        context.closePath();//关闭一个路径 关闭路径会连接起点和终点
        context.fillText(points[j].name,beginPointX,beginPointY,r)
        occfloat += float;
        beginPointX = centerPointX - r * Math.sin(2 * occfloat * Math.PI);
        beginPointY = centerPointY - r * Math.cos(2 * occfloat * Math.PI);
      }
      // 调用 wx.drawCanvas，通过 canvasId 指定在哪张画布上绘制，通过 actions 指定绘制行为
      wx.drawCanvas({
        canvasId: 'firstCanvas',
        actions: context.getActions() // 获取绘图动作数组
      })
    }



  }

})
