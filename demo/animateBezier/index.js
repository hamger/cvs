import { Cvs, Circle, Rect, Animate } from '@'
const { bezier } = Animate
let cvs = new Cvs({
  container: document.getElementById('container')
})
let stopBtn = document.querySelector('.stop')
let againBtn = document.querySelector('.again')
let flag = true

let dot = new Circle({
  x: 0,
  y: 0,
  r: 10,
  cache: true,
  fill: 'pink'
})

let rect = new Rect({
  x: 0,
  y: 100,
  h: 20,
  w: 20,
  cache: true
})

rect.track({
  delay: 1000,
  duration: 2000,
  loop: function () {
    this.attr({ x: this.attr('x') + 1, y: this.attr('y') + 1 })
  }
})

dot.track({
  delay: 0,
  duration: 6000,
  loop: function () {
    bezier(this, {
      points: [
        { x: 10, y: 10 },
        { x: 360, y: 160 },
        { x: 160, y: 360 },
        { x: 410, y: 410 }
      ]
    })
  }
})

var init = 12
dot.track({
  delay: 0,
  duration: 3000,
  easing: 'Linear',
  loop: function () {
    if (init <= 85) {
      this.attr({ x: this.attr('x') + 1, y: this.attr('y') - 1 })
    } else {
      this.attr({ x: this.attr('x') + 1, y: this.attr('y') + 1 })
    }
    init++
  }
})

cvs.add([dot, rect])

cvs.animate()

stopBtn.onclick = function () {
  if (flag) {
    cvs.cancelAnimate()
    flag = false
  } else {
    cvs.animate()
    flag = true
  }
}

// againBtn.onclick = function () {
//   let dot = new Circle({
//     x: 0,
//     y: 0,
//     r: 10,
//     cache: true,
//     fill: 'pink'
//   })
//   dot.animate = () => {
//     bezier(dot, {
//       speed: 0.007,
//       points: [
//         { x: 10, y: 10 },
//         { x: 360, y: 160 },
//         { x: 160, y: 360 },
//         { x: 410, y: 410 }
//       ]
//     })
//   }
//   cvs.add(dot)
// }
