import { Cvs, Circle, Rect, Parabola, Track, easing } from '#'
let cvs = new Cvs({
  container: document.getElementById('container')
})
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
  y: cvs.height,
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
  endX: cvs.width,
  endY: cvs.height
})

let sround = new Parabola({
  delay: 0,
  duration: 2000,
  retrace: false, // 是否折返
  iterationCount: 1, // 重复次数
  endX: cvs.width,
  endY: 0
})

let tround = new Parabola({
  delay: 0,
  duration: 2000,
  retrace: false, // 是否折返
  iterationCount: 1, // 重复次数
  endX: cvs.width / 2,
  endY: cvs.height
})

dot.addTrack(parabola)
sdot.addTrack(sround)
tdot.addTrack(tround)

cvs.add([dot, sdot, tdot])
// cvs.add(dot)

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
