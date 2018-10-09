// import Tween from './Animate/tween'

var t = 0 // 贝塞尔函数涉及的占比比例，0<=t<=1
var bezierNodes = [] // 绘制内部控制点的数组
var nextNodes = [] // 下一帧绘制的控制点
var isPrinting = false // 正在绘制中标识

function bezier (element, option) {
  if (t > 1) {
    isPrinting = false
    return
  }
  const { opt: ele } = element
  const speed = option.speed || 0.01
  isPrinting = true
  t += speed
  drawnode(ele, nextNodes.length ? nextNodes : option.points)
}

function drawnode (ele, nodes) {
  if (!nodes.length) return
  nextNodes = []
  nodes.forEach(function (item) {
    if (nodes.length === 1) {
      bezierNodes.push(item)
      if (bezierNodes.length > 1) {
        var len = bezierNodes.length
        ele.x = bezierNodes[len - 1].x
        ele.y = bezierNodes[len - 1].y
      }
    }
  })
  if (nodes.length) {
    for (var i = 0; i < nodes.length - 1; i++) {
      var arr = [
        {
          x: nodes[i].x,
          y: nodes[i].y
        },
        {
          x: nodes[i + 1].x,
          y: nodes[i + 1].y
        }
      ]
      nextNodes.push(getLocation(arr, t))
    }
  }
}
// 通过各控制点与占比t计算当前贝塞尔曲线上的点坐标
function getLocation (arr, t) {
  var x = 0,
    y = 0,
    n = arr.length - 1
  arr.forEach(function (item, index) {
    if (!index) {
      x += item.x * Math.pow(1 - t, n - index) * Math.pow(t, index)
      y += item.y * Math.pow(1 - t, n - index) * Math.pow(t, index)
    } else {
      x +=
        (factorial(n) / factorial(index) / factorial(n - index)) *
        item.x *
        Math.pow(1 - t, n - index) *
        Math.pow(t, index)
      y +=
        (factorial(n) / factorial(index) / factorial(n - index)) *
        item.y *
        Math.pow(1 - t, n - index) *
        Math.pow(t, index)
    }
  })
  return {
    x: x,
    y: y
  }
}
// 递归阶乘
function factorial (num) {
  if (num <= 1) {
    return 1
  } else {
    return num * factorial(num - 1)
  }
}

export default bezier
