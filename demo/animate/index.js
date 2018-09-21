import { Cvs, Circle, Animate } from '@'
const { circling, elliptic, line, parabola } = Animate
let cvs = new Cvs({
  container: document.getElementById('container')
})

let dot = new Circle({
  angle: 0,
  x: 0,
  y: 0,
  r: 10,
  cache: true
})

cvs.add(dot)
dot.animate = () => {
  parabola(dot, {
    endX: cvs.width - 10,
    endY: cvs.height - 10,
    time: 500,
    type: ['Quad', 'easeIn']
    // type: 'Linear'
  })
}
cvs.animate()

let flag = true
let stopBtn = document.querySelector('.stop')
stopBtn.onclick = function () {
  if (flag) {
    cvs.cancelAnimate()
    flag = false
  } else {
    cvs.animate()
    flag = true
  }
}
