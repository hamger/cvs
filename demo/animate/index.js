import { Cvs, Circle, AnimatePath } from '@'
const { circling, elliptic, line, parabola, colorPalette, gradientColor } = AnimatePath
let cvs = new Cvs({
  container: document.getElementById('container')
})
let dot = new Circle({
  angle: 0,
  x: 0,
  y: 0,
  r: 10,
  cache: true,
})
dot.animate = () => {
  dot.opt.x++
}
cvs.add(dot)

let flag = true
let stopBtn = document.querySelector('.stop')
let againBtn = document.querySelector('.again')
let addBtn = document.querySelector('.add')

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
    angle: 0,
    x: 0,
    y: 0,
    r: 10,
    cache: true,
  })
  dots.animate = () => {
    parabola(dots, {
      endX: cvs.width - 10,
      endY: cvs.height - 10,
      time: 5000,
      type: ['Quad', 'easeIn']
      // type: 'Linear'
    })
  }
  cvs.add(dots)
}

addBtn.onclick = function () {
  let dot = new Circle({
    color: 0,
    angle: 0,
    x: 0,
    y: cvs.height / 2 - 10,
    r: 10,
    cache: true,
  })
  dot.animate = () => {
    if (dot.opt.x < cvs.width - dot.opt.r) {
      dot.opt.x += 1
    }
    if (dot.opt.color < 255) {
      dot.opt.color++
    }
    dot.opt.fill = `rgba(${dot.opt.color}, 0, 0, 1)`
  }
  cvs.add(dot)
}
