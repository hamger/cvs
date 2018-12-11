import { Scene, Circle, Rect, Bezier, Round, Track, easing } from '#'
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
  x: layer.width / 2 - 150,
  y: layer.height / 2 - 150,
  cache: true,
  fill: 'pink'
})

// let circle = new Circle({
//   zIndex: 1,
//   r: 150,
//   x: layer.width / 2,
//   y: layer.height / 2,
//   // cache: true,
//   stroke: true
// })

// let rect = new Rect({
//   x: layer.width / 2 - 100,
//   y: layer.height / 2,
//   w: 50,
//   h: 20
// })

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

// let cd = new Circle({
//   r: 10,
//   x: layer.width / 2,
//   y: layer.height / 2
// })

let round = new Round({
  delay: 0,
  duration: 3000,
  retrace: false, // 是否折返
  iterationCount: 10, // 重复次数
  centerX: layer.width / 2,
  centerY: layer.height / 2,
  anticlockwise: false,
  // relativeX: '50%',
  // relativeY: 10,
})
// let dotRound = new Round({
//   delay: 0,
//   duration: 3000,
//   retrace: false, // 是否折返
//   iterationCount: 1, // 重复次数
//   centerX: layer.width / 2,
//   centerY: layer.height / 2,
// })
//
// let sround = new Round({
//   delay: 3000,
//   duration: 5000,
//   retrace: false, // 是否折返
//   iterationCount: Infinity, // 重复次数
//   centerX: layer.width / 2,
//   centerY: layer.height / 2,
//   r: 150,
//   angle: 90
// })
//
// let tround = new Round({
//   delay: 0,
//   duration: 8000,
//   retrace: true, // 是否折返
//   iterationCount: 1, // 重复次数
//   centerX: layer.width / 2,
//   centerY: layer.height / 2,
//   r: 200,
//   angle: 180,
//   direction: false
// })

dot.addTrack(round)
// dot.addTrack(dotRound)
// sdot.addTrack(sround)
// tdot.addTrack(tround)

// layer.append([dot, sdot, tdot, cd])
layer.append(dot)

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

// 重置动画
againBtn.onclick = function () {
  layer.timeline.currentTime = 0
}
