import { Cvs, Circle, Rect, Bezier, Elliptic, Track, easing } from '@'
let cvs = new Cvs({
  container: document.getElementById('container')
})
let stopBtn = document.querySelector('.stop')
let againBtn = document.querySelector('.again')
let flag = true

let dot = new Circle({
  zIndex: 1,
  r: 10,
  x: 169,
  y: 225,
  cache: true,
  fill: 'pink'
})
let sdot = new Circle({
  zIndex: 1,
  r: 10,
  x: 169,
  y: 225,
  cache: true,
  fill: 'blue'
})
let tdot = new Circle({
  zIndex: 1,
  r: 10,
  x: 169,
  y: 225,
  cache: true,
  fill: 'red'
})

let cd = new Circle({
  r: 10,
  x: cvs.width / 2,
  y: cvs.height / 2
})

let elliptic = new Elliptic({
  delay: 0,
  duration: 3000,
  retrace: false, // 是否折返
  iterationCount: 1, // 重复次数
  centerX: cvs.width / 2,
  centerY: cvs.height / 2,
  angle: 0
})

let selliptic = new Elliptic({
  delay: 0,
  duration: 5000,
  retrace: false, // 是否折返
  iterationCount: Infinity, // 重复次数
  radiusX: 300,
  radiusY: 100,
  centerX: cvs.width / 2,
  centerY: cvs.height / 2,
  angle: 90
})

let telliptic = new Elliptic({
  delay: 0,
  duration: 8000,
  retrace: false, // 是否折返
  iterationCount: 1, // 重复次数
  centerX: cvs.width / 2,
  centerY: cvs.height / 2,
  radiusX: 50,
  radiusY: 200,
  angle: 180,
  direction: false
})

dot.addTrack(elliptic)
sdot.addTrack(selliptic)
tdot.addTrack(telliptic)

cvs.add([dot, sdot, tdot, cd])
// cvs.add([dot, cd])

cvs.animate()

stopBtn.onclick = function () {
  if (flag) {
    // 关闭动画
    cvs.cancelAnimate()
    flag = false
  } else {
    // 开启动画
    cvs.animate()
    flag = true
  }
}

againBtn.onclick = function () {
  // 重置动画
  cvs.resetAnimate()
  // 开启动画
  cvs.animate()
}
