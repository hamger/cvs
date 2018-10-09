import { Cvs, Circle, Animate } from '@'
const { bezier } = Animate
let cvs = new Cvs({
  container: document.getElementById('container')
})
let stopBtn = document.querySelector('.stop')
let againBtn = document.querySelector('.again')
let flag = true

stopBtn.onclick = function () {
  if (flag) {
    cvs.cancelAnimate()
    flag = false
  } else {
    cvs.animate()
    flag = true
  }
}

againBtn.onclick = function () {
  let dots = new Circle({
    x: 0,
    y: 0,
    r: 10,
    cache: true,
    fill: 'pink'
  })
  dots.animate = () => {
    bezier(dots, {
      points: [
        { x: 10, y: 10 },
        { x: 160, y: 60 },
        { x: 60, y: 160 },
        { x: 210, y: 210 }
      ]
    })
  }
  cvs.add(dots)
}
