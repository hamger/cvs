import { Cvs, Circle, Rect, Bezier, Track, easing } from '@'
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

let bezier = new Bezier({
  delay: 0,
  duration: 8000,
  retrace: true, // 是否折返
  iterationCount: 1, // 重复次数
  points: [
    { x: 169, y: 225 },
    { x: 178, y: 442 },
    { x: 379, y: 119 },
    { x: 398, y: 430 },
    { x: 555, y: 160 },
    { x: 264, y: 312 },
    { x: 293, y: 508 },
    { x: 545, y: 513 }
  ]
})
dot.addTrack(bezier)

let rect = new Rect({
  h: 20,
  w: 20,
  cache: true
})

let customTrack = new Track({
  delay: 0,
  duration: 2000,
  loop: function (t) {
    let p = t / this.duration
    this.$ele.attr({
      // 这里的 400 为运动总路程，10 为初始位置
      x: 400 * easing.easeOutQuad(p),
      y: 100 // 此行不能省略，因为动画重置时需要获取到y轴坐标
    })
  }
})

let customTrack2 = new Bezier({
  delay: 0,
  duration: 3500,
  retrace: true, // 是否折返
  iterationCount: 2, // 重复次数
  points: [
    {
      x: 400,
      y: 100
    },
    {
      x: 400,
      y: 500
    }
  ]
})

rect.addTrack([customTrack, customTrack2])

cvs.add([dot, rect])

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
