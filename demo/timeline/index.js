import { Scene, Rect, Image, Keyframe, Round } from '#'
  ;(async function () {
  let scene = new Scene({
    containerId: 'container'
  })

  await scene.preload({
    safari: '../../static/safari.png',
    robot01: '../../static/robot01.png',
    robot02: '../../static/robot02.png',
    robot03: '../../static/robot03.png'
  })

  let bgLayer = scene.layer({
    background: '#bcd9f5',
    handleEvent: true
  })
  let fgLayer = scene.layer()

  let ele = new Image({
    image: 'safari',
    w: 80,
    h: 80
  })
  let round = new Round({
    delay: 0,
    duration: 5000,
    iterationCount: 800, // 重复次数
    centerX: 300,
    centerY: 300,
    r: 150,
    angle: 180,
    anticlockwise: false,
    relativeX: 40,
    relativeY: 40
  })
  ele.addTrack(round)
  fgLayer.append(ele)

  let btn = new Rect({
    x: 500,
    y: 500,
    w: 30,
    h: 30,
    fill: 'yellow'
  })
  btn.on('click', function () {
    ele.timeline.playbackRate = 0
  })
  let btn2 = new Rect({
    x: 550,
    y: 500,
    w: 30,
    h: 30,
    fill: 'green'
  })
  btn2.on('click', function () {
    ele.timeline.playbackRate = 1
  })
  let btn3 = new Rect({
    x: 600,
    y: 500,
    w: 30,
    h: 30,
    fill: 'pink'
  })
  btn3.on('click', function () {
    fgLayer.timeline.playbackRate = 0
  })
  let btn4 = new Rect({
    x: 650,
    y: 500,
    w: 30,
    h: 30,
    fill: 'blue'
  })
  btn4.on('click', function () {
    fgLayer.timeline.playbackRate = 1
  })
  let btn5 = new Rect({
    x: 650,
    y: 550,
    w: 30,
    h: 30,
    fill: 'orange'
  })
  btn5.on('click', function () {
    scene.timeline.currentTime = 0
  })
  bgLayer.append(btn, btn2, btn3, btn4, btn5)
  bgLayer.draw()
  fgLayer.animate()
})()
