import { Cvs, Circle, AnimatePath } from '@'
const { circling, elliptic, line, parabola, colorPalette, gradientColor } = AnimatePath
let cvs = new Cvs({
  container: document.getElementById('container')
})
let ball = new Circle({
  x: 300,
  y: 300,
  r: 200,
  cache: true
})
cvs.add(ball)
const colors = [
  [0.3, 'red'],
  [0.7, 'orange'],
  [0.17, 'yellow'],
  [0.22, 'green'],
  [0.42, 'cyan'],
  [0.82, 'blue'],
  [0.90, 'purple'],
]

// const colorArr = colorPalette(colors)
ball.animate = () => {
  gradientColor(ball, {
    colors,
    during: 20,
    period: true
  })
}

cvs.animate()

// let flag
// let stopBtn = document.querySelector('.stop')
// stopBtn.onclick = function () {
//   if (flag) {
//     cvs.cancelAnimate()
//     flag = false
//   } else {
//     cvs.animateRound()
//     flag = true
//   }
// }
