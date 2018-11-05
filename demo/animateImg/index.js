import { Cvs, Img, Bezier } from '@'
  ;(async function () {
  let cvs = new Cvs({
    container: document.getElementById('container')
  })
  await cvs.preload({
    robot01: '../../static/robot01.png',
    robot02: '../../static/robot02.png',
    robot03: '../../static/robot03.png'
  })

  let element = new Img({
    img: 'robot01',
    x: 169,
    y: 225,
    h: 51,
    w: 38,
  })
  let bezier = new Bezier({
    delay: 0,
    duration: 8000,
    retrace: true,
    iterationCount: 1,
    points: [
      { x: 169, y: 225 },
      { x: 178, y: 442 },
      { x: 379, y: 119 },
      { x: 398, y: 430 },
      { x: 555, y: 160 },
      { x: 264, y: 312 },
      { x: 293, y: 508 },
      { x: 545, y: 513 }
    ]
  })
  element.addTrack(bezier)
  cvs.add(element)
  cvs.animate()

  document.querySelector('.stop').onclick = function () {
    cvs.pauseAnimate()
  }
  document.querySelector('.again').onclick = function () {
    // 重置动画
    cvs.resetAnimate()
    // 开启动画
    cvs.animate()
  }
})()
