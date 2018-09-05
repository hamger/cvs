import { Canvas, Circle, Rect } from '@'
var canvas = new Canvas({
  container: document.getElementById('container')
})

var element = new Circle({
  r: 50,
  y: 100,
  x: 100,
  fill: '#999'
})
element.addEventListener('click', function (e) {
  console.log('element: ' + e)
})
canvas.addElement(element)

var element2 = new Rect({
  x: 200,
  y: 400,
  w: 60,
  h: 60,
  fill: 'green'
})
element2.addEventListener('click', function (e) {
  console.log('element2: ' + e)
})
canvas.addElement(element2)

var element3 = new Rect({
  x: 300,
  y: 300,
  w: 80,
  h: 80,
  stroke: 'blue'
})

canvas.addElement(element3)

var element4 = new Circle({
  zIndex: -2,
  r: 50,
  y: 150,
  x: 150,
  fill: '#3e9'
})
element4.addEventListener('click', function (e) {
  console.log('element4: ' + e)
})
canvas.addElement(element4)

canvas.draw()

// setTimeout(() => {
//   canvas.removeElement(element2)
//   element3.attr({stroke: '#4F8'})
//   canvas.draw()
// }, 1600)
