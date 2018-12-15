import { Scene, Rect, Image, Keyframe, Round, Text } from '#'
  ;(async function () {
  let scene = new Scene({
    containerId: 'container'
  })

  await scene.preload({
    safari: '../../static/safari.png'
  })

  let bgLayer = scene.layer({
    background: '#bcd9f5',
    handleEvent: true
  })
  let fgLayer = scene.layer()

  let img = new Image({
    image: 'safari',
    w: 80,
    h: 80,
    x: 0,
    y: 0
  })
  img.keyframe([{x: 100}, {x: 200}, {x: 300}], 5000)
  fgLayer.append(img)
  let start = new Text({
    x: 600,
    y: 550,
    text: '开启',
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
