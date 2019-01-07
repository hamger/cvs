import { Scene, Image, Group, Path } from '#'
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
  let circle2 = new Path({
    d: {
      type: 'circle',
      r: 50,
      cy: 50,
      cx: 50
    },
    zIndex: 2,
    fill: '#3e9',
    cache: true
  })
  circle2.on('click', function (e) {
    console.log('circle2: ' + e)
  })
  let image = new Image({
    image: 'safari',
    y: 0,
    x: 200
  })
  let group = new Group({
    x: 100,
    y: 100,
    // w: 300,
    // h: 300,
    stroke: '#ddd',
    // transformOrigin: 150,
    fill: 'green',
    rotate: 45
  })
  let subGroup = new Group({
    zIndex: 3,
    x: 0,
    y: 200,
    w: 100,
    h: 100,
    // stroke: '#ddd'
    stroke: 'red'
  })
    .append(
      new Path({
        d: {
          type: 'circle',
          r: 15,
          cy: 15,
          cx: 15
        },
        fill: 'pink'
      })
    )
    .append(new Path({ d: { type: 'rect', x: 70, y: 0, w: 30, h: 30 } }))

  // group.append(circle2, image)
  group.append(circle2, image, subGroup)
  group.keyframe([['x'], { x: 600, rotate: 900 }], {duration: 3000}, function () {
    layer.cancelAnimate()
  })
  // group.track(
  //   'bezier',
  //   {
  //     delay: 0,
  //     duration: 3000,
  //     points: [{ x: 100, y: 100 }, { x: 600, y: 200 }]
  //   }
  // )
  layer.append(group)
  // let ruler = new Path({
  //   zIndex: 2,
  //   d: {
  //     type: 'rect',
  //     x: 100,
  //     y: 100,
  //     w: 350,
  //     h: 350,
  //   },
  //   linewidth: 4,
  //   stroke: 'red'
  // })
  // layer.append(ruler)
  // layer.draw()
  layer.animate()
})()
