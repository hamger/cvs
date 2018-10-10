import { Cvs, Circle, Animate } from '@'
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

dot.track({
  delay: 100,
  duration: 4000,
  loop: () => {
    bezier(dot, {
      points: [
        { x: 10, y: 10 },
        { x: 360, y: 160 },
        { x: 160, y: 360 },
        { x: 410, y: 410 }
      ]
    })
  }
})

dot.track({
  delay: 100,
  duration: 4000,
  loop: () => {
    dot.attr({ x: dot.opt.x + 1, y: dot.opt.y - 1 })
  }
})

cvs.add(dot)

cvs.animate()

// stopBtn.onclick = function () {
//   if (flag) {
//     cvs.cancelAnimate()
//     flag = false
//   } else {
//     cvs.animate()
//     flag = true
//   }
// }

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
