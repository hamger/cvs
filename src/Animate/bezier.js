import easing from './easing'

var bezierNodes = [] // 绘制内部控制点的数组
var nextNodes = [] // 下一帧绘制的控制点
function bezier (element, option) {
  // 贝塞尔函数涉及的占比比例，0<=p<=1 (p: progress 运动进度)
  var p = easing.easeOutQuad(element.curTime / element._curTrack().duration)
  if (p > 1) return
  const { opt: ele } = element
  drawnode(ele, nextNodes.length ? nextNodes : option.points, p)
}

function drawnode (ele, nodes, p) {
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
      nextNodes.push(getLocation(arr, p))
    }
  }
}
// 通过各控制点与占比t计算当前贝塞尔曲线上的点坐标
function getLocation (arr, p) {
  var x = 0,
    y = 0,
    n = arr.length - 1
  arr.forEach(function (item, index) {
    if (!index) {
      x += item.x * Math.pow(1 - p, n - index) * Math.pow(p, index)
      y += item.y * Math.pow(1 - p, n - index) * Math.pow(p, index)
    } else {
      x +=
        (factorial(n) / factorial(index) / factorial(n - index)) *
        item.x *
        Math.pow(1 - p, n - index) *
        Math.pow(p, index)
      y +=
        (factorial(n) / factorial(index) / factorial(n - index)) *
        item.y *
        Math.pow(1 - p, n - index) *
        Math.pow(p, index)
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
