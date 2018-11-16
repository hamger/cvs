import { Scene, Circle, Rect, Bezier, Elliptic, Track, easing } from '#'
let scene = new Scene({
  containerId: 'container'
})
let cvs = scene.layer()
let stopBtn = document.querySelector('.stop')
let againBtn = document.querySelector('.again')
let flag = true

let dot = new Circle({
  zIndex: 1,
  r: 10,
  x: cvs.width / 2 - 100,
  y: cvs.height / 2,
  cache: true,
  fill: 'pink'
})
let rect = new Rect({
  x: cvs.width / 2 - 200,
  y: cvs.height / 2,
  w: 50,
  h: 30
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
})

let relliptic = new Elliptic({
  delay: 0,
  duration: 3000,
  retrace: false,
  iterationCount: 1, // 重复次数
  centerX: cvs.width / 2,
  centerY: cvs.height / 2,
  radiusX: 200,
  radiusY: 100,
  relativeX: '50%',
  relativeY: '50%'
})

dot.addTrack(elliptic)
rect.addTrack(relliptic)

cvs.add(dot, rect, cd)

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
