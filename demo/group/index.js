import { Scene, Circle, Rect, Image, Group, Bezier, Path } from '#'
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
    cache: true
  })
  circle2.on('click', function (e) {
    console.log('circle2: ' + e)
  })
  let image = new Image({
    image: 'safari',
    y: 100,
    x: 200
  })
  let group = new Group({
    x: 100,
    y: 100,
    w: 350,
    h: 350,
    stroke: '#ddd'
  })
  let subGroup = new Group({
    zIndex: 3,
    x: 10,
    y: 200,
    // w: 100,
    // h: 100,
    // stroke: '#ddd'
  })
    .append(circle2.clone({ r: 20, y: 30, x: 30, fill: 'pink' }))
    .append(new Rect({ x: 60, y: 60, w: 30, h: 30 }))

  group.append(circle2, image, subGroup)
  // group.addTrack(
  //   new Bezier({
  //     delay: 0,
  //     duration: 3000,
  //     points: [{ x: 100, y: 100 }, { x: 600, y: 200 }]
  //   })
  // )
  layer.append(group)
  layer.draw()
  // layer.animate()
})()
