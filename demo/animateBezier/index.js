import { Cvs, Circle, Rect, Bezier, Track, easing } from '@'
let cvs = new Cvs({
  container: document.getElementById('container')
})
let stopBtn = document.querySelector('.stop')
let againBtn = document.querySelector('.again')
let flag = true

let dot = new Circle({
  zIndex: 1,
  x: 210,
  y: 10,
  r: 10,
  cache: true,
  fill: 'pink'
})

let dotCustomTrack = new Track({
  delay: 0,
  duration: 1000,
  loop: function (t) {
    let p = t / this.duration
    this.$ele.attr({
      // 这里的 200 为运动总路程，10 为初始位置
      x: 200 * easing.easeOutQuad(p) + 10,
      y: 10 // 此行不能省略，因为动画重置时需要获取到y轴坐标
    })
  }
})

let bezier = new Bezier({
  delay: 0,
  duration: 4000,
  retrace: true,
  iterationCount: 2,
  points: [
    { x: 210, y: 10 },
    { x: 460, y: 60 },
    { x: 260, y: 260 },
    { x: 510, y: 310 }
  ]
})
dot.addTrack([dotCustomTrack, bezier])

let rect = new Rect({
  x: 0,
  y: 100,
  h: 20,
  w: 20,
  cache: true
})

let customTrack2 = new Track({
  delay: 0,
  duration: 3000,
  loop: function (t) {
    let p = t / this.duration
    this.$ele.attr({
      // 这里的 200 为运动总路程，10 为初始位置
      x: 400 * easing.easeOutQuad(p) + 0,
      y: 100
    })
  }
})

rect.addTrack(customTrack2)

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
