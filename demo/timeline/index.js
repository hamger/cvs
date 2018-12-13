import { Scene, Rect, Image, Keyframe, Round, Text } from '#'
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
  let start = new Text({
    x: 600,
    y: 550,
    text: '开启',
    // text: 'hello\nmy\nworld',
    font: '20px Arial',
    fill: 'blue'
  })
  let stop = new Text({
    x: 650,
    y: 550,
    text: '停止',
    font: '20px Arial',
    fill: 'orange'
  })
  start.on('click', function () {
    fgLayer.timeline.playbackRate = 1
  })
  stop.on('click', function () {
    fgLayer.timeline.playbackRate = 0
  })
  bgLayer.append(start, stop)
  bgLayer.draw()
  fgLayer.animate()
})()
