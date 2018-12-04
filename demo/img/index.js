import { Scene, Rect, Image, Keyframe } from '#'
  ;(async function () {
  let scene = new Scene({
    containerId: 'container'
  })
  await scene.preload({
    safari: '../../static/safari.png',
    robot01: '../../static/robot01.png',
    robot02: '../../static/robot02.png',
    robot03: '../../static/robot03.png',
  })
  let fgLayer = scene.layer()
  let element2 = new Image({
    image: 'safari',
    x: 10,
    y: 10,
    // transform: [{ rotate: 10 }, { scale: [1.5, 1.1] }]
  })
  let element3 = new Image({
    image: 'robot01',
    x: 400,
    y: 40,
  })
  element3.addTrack(new Keyframe({
    delay: 110,
    duration: 4000,
    retrace: true, // 是否折返
    iterationCount: 2, // 重复次数
    keyframe: [
      {texture: 'robot01'},
      {texture: 'robot02'},
      {texture: 'robot03'}
    ]
  }))
  fgLayer.add(element2, element3)
  fgLayer.animate()
})()
