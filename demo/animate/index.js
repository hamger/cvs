import { Cvs, Circle, Animate } from '@'
const { circling, elliptic, line, parabola, colorPalette, gradientColor } = Animate
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
  let cc = new Circle({
    angle: 0,
    x: 0,
    y: 0,
    r: 10,
    cache: true,
  })
  cc.animate = () => {
    parabola(cc, {
      endX: cvs.width - 10,
      endY: cvs.height - 10,
      time: 5000,
      // type: ['Quad', 'easeIn']
      // type: 'Linear'
    })
  }
  cvs.add(cc)
}

addBtn.onclick = function () {
  let bb = new Circle({
    color: 0,
    angle: 0,
    x: 0,
    y: cvs.height / 2 - 10,
    r: 10,
    cache: true,
  })
  bb.animate = () => {
    if (bb.opt.x < cvs.width - bb.opt.r) {
      bb.opt.x += 1
    }
    if (bb.opt.color < 255) {
      bb.opt.color++
    }
    bb.opt.fill = `rgba(${bb.opt.color}, 0, 0, 1)`
  }
  cvs.add(bb)
}
