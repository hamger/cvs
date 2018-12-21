import { Scene, Image } from '#'
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
  element2.on('click', () => {
    console.log(123324243)
  })
  let element3 = new Image({
    image: 'robot01',
    x: 400,
    y: 40,
  })
  element3.keyframe([
    {image: 'robot01'},
    {image: 'robot02'},
    {image: 'robot03'},
    {image: 'robot02'},
    {image: 'robot01'},
  ], {
    delay: 110,
    duration: 4000,
    iterationCount: 2, // 重复次数
  })
  fgLayer.append(element2, element3)
  fgLayer.animate()
})()
