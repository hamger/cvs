import { Scene, Circle, Rect, Bezier, Ellipse, Track, easing } from '#'
let scene = new Scene({
  containerId: 'container'
})
let layer = scene.layer()
let stopBtn = document.querySelector('.stop')
let againBtn = document.querySelector('.again')
let flag = true

let dot = new Circle({
  zIndex: 1,
  r: 10,
  x: layer.width / 2 - 200,
  y: layer.height / 2,
  cache: true,
  fill: 'pink',
})
// let rect = new Rect({
//   x: layer.width / 2 - 200,
//   y: layer.height / 2,
//   w: 50,
//   h: 30
// })

let cd = new Circle({
  r: 10,
  x: layer.width / 2,
  y: layer.height / 2,
  cache: true,
})

let ellipse = new Ellipse({
  delay: 0,
  duration: 3000,
  retrace: false, // 是否折返
  radiusX: 200,
  radiusY: 80,
  iterationCount: Infinity, // 重复次数
  centerX: layer.width / 2,
  centerY: layer.height / 2,
  rotate: 45
})

let rellipse = new Ellipse({
  delay: 0,
  duration: 3000,
  retrace: false,
  iterationCount: 1, // 重复次数
  centerX: layer.width / 2,
  centerY: layer.height / 2,
  radiusX: 200,
  radiusY: 100,
  relativeX: '50%',
  relativeY: '50%'
})

dot.addTrack(ellipse)
// rect.addTrack(rellipse)

layer.append(dot, cd)

layer.animate()

stopBtn.onclick = function () {
  if (flag) {
    // 关闭动画
    layer.cancelAnimate()
    flag = false
  } else {
    // 开启动画
    layer.animate()
    flag = true
  }
}

againBtn.onclick = function () {
  layer.timeline.currentTime = 0
}
