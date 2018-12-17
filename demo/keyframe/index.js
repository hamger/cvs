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
  img.keyframe([['w', 'h'], { w: 110, h: 110 }, { w: 140, h: 140 }], {duration: 3000, easing: 'ease-in'})
  img.track('bezier', {
    points: [
      { x: 73, y: 59 },
      { x: 296, y: 76 },
      { x: 164, y: 227 },
      { x: 336, y: 313 }
    ],
    delay: 0,
    duration: 5000,
    // retrace: true,
    iterationCount: 1
  })
  fgLayer.append(img)

  let rect = new Rect({
    w: 80,
    h: 80,
    x: 0,
    y: 180,
    fill: 'green',
  })
  rect.keyframe([['fill', 'x'], { fill: 'red', x: 400 }], {duration: 4000, easing: 'ease-out'})
  fgLayer.append(rect)

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
  // bgLayer.draw()
  fgLayer.animate()
})()
