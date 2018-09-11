import { Canvas, Circle, Rect, Img, Text } from '@'
var canvas = new Canvas({
  container: document.getElementById('container')
})

var element = new Circle({
  r: 50,
  y: 100,
  x: 100,
  fill: '#999'
})
element.on('click', function (e) {
  console.log('element: ' + e)
})
canvas.add(element)

var element2 = new Rect({
  x: 200,
  y: 400,
  w: 60,
  h: 60,
  fill: 'green'
})
element2.on('click', function (e) {
  console.log('element2: ' + e)
})
canvas.add(element2)

var element3 = new Rect({
  x: 300,
  y: 300,
  w: 80,
  h: 80,
  stroke: 'blue'
})

canvas.add(element3)

var element4 = new Circle({
  zIndex: -2,
  r: 50,
  y: 150,
  x: 150,
  fill: '#3e9'
})
element4.on('click', function (e) {
  console.log('element4: ' + e)
})
canvas.add(element4)

var element5 = new Img({
  img: 'https://zos.alipayobjects.com/rmsportal/nAVchPnSaAWncPj.png',
  dx: 200,
  dy: 200
})
element5.on('click', function (e) {
  console.log('element5: ' + e)
})
canvas.add(element5)

// var element6 = new Text({
//   text: 'Hello cvs',
//   x: 289,
//   y: 76
// })
// element6.on('click', function (e) {
//   console.log('element6: ' + e)
// })
// canvas.add(element6)

canvas.draw()
