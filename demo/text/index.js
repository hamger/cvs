import { Scene, Text } from '#'
let scene = new Scene({
  containerId: 'container'
})

let layer = scene.layer()

layer.add(
  new Text({
    text: 'hello',
    x: 89,
    y: 76,
    font: '48px serif'
  })
)

layer.add(
  new Text({
    text: 'hanger',
    x: 189,
    y: 76,
    fontSize: 43
  })
)
layer.draw()
