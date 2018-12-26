import { Scene, Image, Group, Text, Path } from '#'
  ;(async function () {
  let scene = new Scene({
    containerId: 'container'
  })

  let layer = scene.layer({ handleEvent: true })

  let rect = new Path({
    d: 'M0 0 h 70 v 50 h -70 z',
    stroke: '#153'
  })

  rect.on('click', () => {
    console.log(123)
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
        x: 0,
        y: 0,
        font: '24px serif'
      })
    )
    .append(rect)

  console.log(rect.outline)
  button.outline = rect.outline
  layer.append(button)

  let ruler = new Path({
    zIndex: -1,
    d: {
      type: 'rect',
      x: 0,
      y: 0,
      w: 200,
      h: 200
    },
    stroke: '#444'
  })
  layer.append(ruler)
  layer.draw()
})()
