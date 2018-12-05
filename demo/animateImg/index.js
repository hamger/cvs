import { Scene, Image, Bezier } from '#'

  ;(async function () {
  let scene = new Scene({
    containerId: 'container'
  })
  let layer = scene.layer()
  var resouce = await layer.preload({
    robot01: '../../static/robot01.png',
    robot02: '../../static/robot02.png',
    robot03: '../../static/robot03.png'
  })

  console.log(resouce)

  let element = new Image({
    image: 'robot01',
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
  layer.append(element)
  layer.animate()

  document.querySelector('.stop').onclick = function () {
    layer.pauseAnimate()
  }
  document.querySelector('.again').onclick = function () {
    // 重置动画
    layer.resetAnimate()
    // 开启动画
    layer.animate()
  }
})()
