// 获取相对于容器的坐标
export function getLocation (container, event) {
  var hastouch = 'ontouchstart' in window
  var e = event || window.event
  var x = hastouch ? e.targetTouches[0].pageX : e.clientX
  var y = hastouch ? e.targetTouches[0].pageY : e.clientY
  return {
    x: x - container.getBoundingClientRect().left,
    y: y - container.getBoundingClientRect().top
  }
}

export const tap = {
  start: f.isMobile() ? 'touchstart' : 'mousedown',
  move: f.isMobile() ? 'touchmove' : 'mousemove',
  end: f.isMobile() ? 'touchend' : 'mouseup'
}

// 四舍五入取整（将目标数字加上 0.5，然后对结果执行逐位运算以消除小数部分）
export function int (num) {
  var rounded
  // With a bitwise or.
  rounded = (0.5 + num) | 0
  // A double bitwise not.
  rounded = ~~(0.5 + num)
  // Finally, a left bitwise shift.
  rounded = (0.5 + num) << 0
  return rounded
}

export const animFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()
