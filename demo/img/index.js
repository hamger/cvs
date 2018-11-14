import { Cvs2, Rect, Img, Keyframe } from '#'
  ;(async function () {
  let cvs = new Cvs2({
    container: document.getElementById('container')
  })
  await cvs.preload({
    safari: '../../static/safari.png',
    robot01: '../../static/robot01.png',
    robot02: '../../static/robot02.png',
    robot03: '../../static/robot03.png',
  })
  let bgLayer = cvs.layer({
    background: '#bcd9f5',
    handleEvent: true
  })
  let fgLayer = cvs.layer()

  let btn = new Rect({
    x: 500,
    y: 500,
    w: 30,
    h: 30,
    fill: '#3F9'
  })
  btn.on('click', function () {
    ele.timeline.playbackRate = 0
    console.log(ele.timeline.playbackRate)
  })
  let btn2 = new Rect({
    x: 550,
    y: 500,
    w: 30,
    h: 30
  })
  btn.on('click', function () {
    ele.timeline.playbackRate = 1
    console.log(ele.timeline.playbackRate)
  })
  bgLayer.add(btn, btn2)
  bgLayer.draw()

  // let cvs2 = new Cvs({
  //   container: document.getElementById('container2')
  // })
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
  fgLayer.add(element2, element3)
  fgLayer.animate()
})()
