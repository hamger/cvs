import { Scene, Text } from '#'
let scene = new Scene({
  containerId: 'container'
})

let cvs = scene.layer()

cvs.add(
  new Text({
    text: 'hello',
    x: 89,
    y: 76,
    font: '48px serif'
  })
)

cvs.add(
  new Text({
    text: 'hanger',
    x: 189,
    y: 76,
    fontSize: 43
  })
)
cvs.draw()
