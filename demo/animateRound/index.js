import { Cvs, Circle, Rect, Bezier, Round, Track, easing } from '@'
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

let round = new Round({
  delay: 0,
  duration: 3000,
  retrace: false, // 是否折返
  iterationCount: 1, // 重复次数
  vpx: cvs.width / 2,
  vpy: cvs.height / 2,
  angle: 0
})

let sround = new Round({
  delay: 0,
  duration: 5000,
  retrace: false, // 是否折返
  iterationCount: Infinity, // 重复次数
  vpx: cvs.width / 2,
  vpy: cvs.height / 2,
  angle: 90
})

let tround = new Round({
  delay: 0,
  duration: 8000,
  retrace: false, // 是否折返
  iterationCount: 1, // 重复次数
  vpx: cvs.width / 2,
  vpy: cvs.height / 2,
  angle: 180,
  direction: false
})

dot.addTrack(round)
sdot.addTrack(sround)
tdot.addTrack(tround)

cvs.add([dot, sdot, tdot, cd])
// cvs.add([tdot, cd])

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