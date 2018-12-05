import { Scene, Text } from '#'
let scene = new Scene({
  containerId: 'container'
})

let layer = scene.layer()

layer.append(
  new Text({
    text: 'hello',
    x: 89,
    y: 76,
    font: '48px serif'
  })
)

layer.append(
  new Text({
    text: 'hanger',
    x: 189,
    y: 76,
    fontSize: 43
  })
)
layer.draw()
