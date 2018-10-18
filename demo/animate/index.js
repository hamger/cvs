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

let cd = new Circle({
  r: 10,
  x: cvs.width / 2,
  y: cvs.height / 2
})

let round = new Round({
  delay: 0,
  duration: 5000,
  retrace: false, // 是否折返
  iterationCount: 1, // 重复次数
  vpx: cvs.width / 2,
  vpy: cvs.height / 2,
  r: 200,
  angle: 0
})

dot.addTrack(round)

// let rect = new Rect({
//   h: 20,
//   w: 20,
//   cache: true
// })
//
// let customTrack = new Track({
//   delay: 0,
//   duration: 2000,
//   loop: function (t) {
//     let p = t / this.duration
//     this.$ele.attr({
//       // 这里的 200 为运动总路程，10 为初始位置
//       x: 400 * easing.easeOutQuad(p),
//       y: 100 // 此行不能省略，因为动画重置时需要获取到y轴坐标
//     })
//   }
// })
//
// let customTrack2 = new Track({
//   delay: 0,
//   duration: 3000,
//   loop: function (t) {
//     let p = t / this.duration
//     this.$ele.attr({
//       x: 400,
//       y: 400 * easing.easeOutQuad(p) + 100,
//     })
//   }
// })
//
// rect.addTrack([customTrack, customTrack2])
//
// cvs.add([dot, rect])
cvs.add([dot, cd])

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
