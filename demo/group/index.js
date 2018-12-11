import { Scene, Circle, Rect, Image, Group, Bezier } from '#'
  ;(async function () {
  let scene = new Scene({
    containerId: 'container'
  })
  await scene.preload({
    safari: '../../static/safari.png'
  })

  let layer = scene.layer({
    handleEvent: true
  })
  let circle2 = new Circle({
    zIndex: 2,
    r: 50,
    y: 50,
    x: 50,
    fill: '#3e9',
    hover: {
      fill: '#5f1'
    }
    // cache: true
  })
  circle2.on('click', function (e) {
    console.log('circle2: ' + e)
  })
  let image = new Image({
    image: 'safari',
    y: 100,
    x: 240
  })
  let group = new Group({
    x: 100,
    y: 100,
    w: 550,
    h: 550,
    stroke: '#ddd'
  })
  group.append(circle2, image)
  // group.append(circle2)
  group.addTrack(
    new Bezier({
      delay: 0,
      duration: 3000,
      points: [
        { x: 100, y: 100 },
        { x: 600, y: 200 },
      ]
    })
  )
  layer.append(group)
  // layer.draw()
  layer.animate()
})()
