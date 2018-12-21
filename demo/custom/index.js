import { Scene, Image, Group, Text, Path } from '#'
  ;(async function () {
  let scene = new Scene({
    containerId: 'container'
  })

  let layer = scene.layer({ handleEvent: true })

  let rect = new Path({
    path: 'M10 10 h 70 v 50 h -70 z',
    stroke: '#153'
  })

  let button = new Group({
    x: 100,
    y: 100,
    w: 350,
    h: 350,
    stroke: '#ddd'
  })
    .append(
      new Text({
        text: '确定',
        x: 20,
        y: 20,
        font: '24px serif'
      })
    )
    .append(rect)

  layer.append(button)
  layer.draw()
})()
