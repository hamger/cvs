import { Scene, Element, Circle, Rect, Image, Group } from '#'
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
    zIndex: -2,
    r: 50,
    y: 50,
    x: 50,
    fill: '#3e9',
    hover: {
      fill: '#5f1'
    },
    // cache: true
  })
  circle2.on('click', function (e) {
    console.log('circle2: ' + e)
  })
  let group = new Group({
    x: 100,
    y: 100,
    w: 150,
    h: 150,
    stroke: '#ddd'
  })
  group.append(circle2)
  layer.add(group)
  layer.draw()
})()
