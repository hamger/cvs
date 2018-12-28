import { Scene, Image, Group, Text, Path } from '#'
  ;(async function () {
  let scene = new Scene({
    containerId: 'container'
  })

  let layer = scene.layer({ handleEvent: true })
  let text = new Text({
    zIndex: 1,
    text: '确定',
    x: 100,
    y: 100,
    font: '24px serif'
  })

  let rect = new Path({
    d: 'M0 0 h 70 v 50 h -70 z',
    stroke: 'red'
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
  }).append(text, rect)

  // button.outline = rect.outline
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
