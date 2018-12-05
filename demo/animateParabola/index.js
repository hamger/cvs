import { Scene, Circle, Rect, Parabola, Track, easing } from '#'
let scene = new Scene({
  containerId: 'container'
})
let layer = scene.layer()

let stopBtn = document.querySelector('.stop')
let againBtn = document.querySelector('.again')
let flag = true
console.log(typeof 666)
let dot = new Circle({
  zIndex: 1,
  r: 10,
  x: 0,
  y: 0,
  cache: true,
  fill: 'pink'
})

let sdot = new Circle({
  zIndex: 1,
  relativeX: 10,
  r: 10,
  x: 0,
  y: layer.height,
  cache: true,
  fill: 'blue'
})

let tdot = new Circle({
  zIndex: 1,
  r: 10,
  x: 0,
  y: 0,
  cache: true,
  fill: 'red'
})

let parabola = new Parabola({
  delay: 0,
  duration: 2000,
  retrace: true, // 是否折返
  iterationCount: 1, // 重复次数
  endX: layer.width,
  endY: layer.height
})

let sround = new Parabola({
  delay: 0,
  duration: 2000,
  retrace: false, // 是否折返
  iterationCount: 1, // 重复次数
  endX: layer.width,
  endY: 0
})

let tround = new Parabola({
  delay: 0,
  duration: 2000,
  retrace: false, // 是否折返
  iterationCount: 1, // 重复次数
  endX: layer.width / 2,
  endY: layer.height
})

dot.addTrack(parabola)
sdot.addTrack(sround)
tdot.addTrack(tround)

layer.append(dot, sdot, tdot)
// layer.append(dot)

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
  // 重置动画
  layer.resetAnimate()
  // 开启动画
  layer.animate()
}
