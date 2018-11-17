import { Scene, Rect } from '#'
let scene = new Scene({
  containerId: 'container'
})

let layer = scene.layer()

const rect1 = new Rect({
  x: 100,
  y: 100,
  w: 200,
  h: 100,
  borderRadius: 5,
  cache: true
})
rect1.on('click', function (e) {
  console.log('click  rect1')
})
const rect2 = new Rect({
  x: 400,
  y: 100,
  w: 200,
  h: 100,
  borderRadius: [5, 10],
  cache: true
})

const rect3 = new Rect({
  x: 100,
  y: 350,
  w: 200,
  h: 100,
  borderRadius: [5, 10, 15],
  cache: true
})

const rect4 = new Rect({
  x: 400,
  y: 350,
  w: 200,
  h: 100,
  borderRadius: [5, 10, 15, 30],
  cache: true
})

rect4.on('click', function (e) {
  console.log('click  rect4')
})
layer.add(rect1, rect2, rect3, rect4)
// layer.add(rect1)

layer.draw()
