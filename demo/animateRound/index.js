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

let circle = new Circle({
  zIndex: 1,
  r: 100,
  x: cvs.width / 2,
  y: cvs.height / 2,
  cache: true,
  stroke: true
})

let rect = new Rect({
  x: 400,
  y: 100,
  w: 50,
  h: 20
})

// let sdot = new Circle({
//   zIndex: 1,
//   relativeX: 10,
//   r: 10,
//   x: 169,
//   y: 225,
//   cache: true,
//   fill: 'blue'
// })
//
// let tdot = new Circle({
//   zIndex: 1,
//   r: 10,
//   x: 169,
//   y: 225,
//   cache: true,
//   fill: 'red'
// })

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
  centerX: cvs.width / 2,
  centerY: cvs.height / 2,
  anticlockwise: false,
  relativeX: 25,
  relativeY: 10,
  activeAngle: 180,
})
let dotRound = new Round({
  delay: 0,
  duration: 3000,
  retrace: false, // 是否折返
  iterationCount: 1, // 重复次数
  centerX: cvs.width / 2,
  centerY: cvs.height / 2,
  anticlockwise: false,
  angle: 180
})
//
// let sround = new Round({
//   delay: 3000,
//   duration: 5000,
//   retrace: false, // 是否折返
//   iterationCount: Infinity, // 重复次数
//   centerX: cvs.width / 2,
//   centerY: cvs.height / 2,
//   r: 150,
//   angle: 90
// })
//
// let tround = new Round({
//   delay: 0,
//   duration: 8000,
//   retrace: true, // 是否折返
//   iterationCount: 1, // 重复次数
//   centerX: cvs.width / 2,
//   centerY: cvs.height / 2,
//   r: 200,
//   angle: 180,
//   direction: false
// })

rect.addTrack(round)
dot.addTrack(dotRound)
// sdot.addTrack(sround)
// tdot.addTrack(tround)

// cvs.add([dot, sdot, tdot, cd])
cvs.add([cd, rect, circle, dot])

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
