import { Cvs, Circle, Rect, Bezier, Track, easing } from '@'
let cvs = new Cvs({
  container: document.getElementById('container')
})
let stopBtn = document.querySelector('.stop')
let againBtn = document.querySelector('.again')
let flag = true

let dot = new Circle({
  x: 210,
  y: 10,
  r: 10,
  cache: true,
  fill: 'pink'
})

// let rect = new Rect({
//   x: 0,
//   y: 100,
//   h: 20,
//   w: 20,
//   cache: true
// })

// var customTrack = new Track({
//   delay: 0,
//   duration: 1000,
//   loop: function (p) {
//     console.log(p)
//     this.$ele.attr({
//       // 这里的 200 为运动总路程，10 为初始位置
//       x: 200 * easing.easeOutQuad(p) + 10
//     })
//   }
// })

var bezier = new Bezier({
  delay: 100,
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
dot.addTrack([bezier])
// dot.addTrack([customTrack, bezier])

// var init = 12
// dot.addTrack({
//   delay: 0,
//   duration: 3000,
//   easing: 'Linear',
//   loop: function () {
//     if (init <= 85) {
//       this.attr({ x: this.attr('x') + 1, y: this.attr('y') - 1 })
//     } else {
//       this.attr({ x: this.attr('x') + 1, y: this.attr('y') + 1 })
//     }
//     init++
//   }
// })

cvs.add([dot])

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
