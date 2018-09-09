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

// 去除字符串多余空格，并将内部的多个空格转化为一个空格
export function delBlank (str) {
  var regEx = /\s+/g
  return str.trim().replace(regEx, ' ')
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
