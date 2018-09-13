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

// 四舍五入 取整
export function int (num) {
  return ~~(0.5 + num)
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
