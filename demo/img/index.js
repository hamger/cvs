import { Cvs, Rect, Img, Keyframe } from '@'
  ;(async function () {
  let cvs = new Cvs({
    container: document.getElementById('container')
  })
  await cvs.preload({
    safari: '../../static/safari.png',
    robot01: '../../static/robot01.png',
    robot02: '../../static/robot02.png',
    robot03: '../../static/robot03.png',
  })
  let element = new Rect({
    x: 0,
    y: 0,
    w: cvs.width,
    h: cvs.height,
    fill: '#bcd9f5'
  })
  cvs.add(element)
  cvs.draw()

  let cvs2 = new Cvs({
    container: document.getElementById('container2')
  })
  let element2 = new Img({
    img: 'safari',
    x: 10,
    y: 10,
    transform: [{ rotate: 10 }, { scale: [1.5, 1.1] }]
  })
  let element3 = new Img({
    img: 'robot01',
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
  cvs2.add(element2, element3)
  cvs2.animate()
})()
