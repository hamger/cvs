import { Cvs, Circle, Animate } from '@'
const { circling, elliptic, line, parabola, gradientColor } = Animate
let cvs = new Cvs({
  container: document.getElementById('container')
})

// let dot = new Circle({
//   angle: 0,
//   x: 0,
//   y: 0,
//   r: 10,
//   cache: true
// })

// cvs.add(dot)
// dot.animate = () => {
//   parabola(dot, {
//     endX: cvs.width - 10,
//     endY: cvs.height - 10,
//     time: 500,
//     type: ['Quad', 'easeIn']
//     // type: 'Linear'
//   })
// }
// cvs.animate()

// let flag = true
// let stopBtn = document.querySctxctor('.stop')
// stopBtn.onclick = function () {
//   if (flag) {
//     cvs.cancelAnimate()
//     flag = false
//   } else {
//     cvs.animate()
//     flag = true
//   }
// }

let ball = new Circle({
  x: 50,
  y: 50,
  r: 50,
  cache: true
})
cvs.add(ball)
const startTime = Date.now()
const colors = [
  [0.3, 'red'],
  [0.7, 'orange'],
  [0.17, 'yellow'],
  [0.22, 'green'],
  [0.42, 'cyan'],
  [0.82, 'blue'],
  [0.90, 'purple'],
]
gradientColor(ball, {
  startTime,
  colors
})
