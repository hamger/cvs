import { Cvs, Rect } from '#'
let cvs = new Cvs({
  container: document.getElementById('container')
})

const rect1 = new Rect({
  x: 100,
  y: 100,
  w: 200,
  h: 100,
  borderRadius: 5,
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
})

const rect3 = new Rect({
  x: 100,
  y: 350,
  w: 200,
  h: 100,
  borderRadius: [5, 10, 15],
})

const rect4 = new Rect({
  x: 400,
  y: 350,
  w: 200,
  h: 100,
  borderRadius: [5, 10, 15, 30],
})

rect4.on('click', function (e) {
  console.log('click  rect4')
})
cvs.add([rect1, rect2, rect3, rect4])

cvs.draw()
