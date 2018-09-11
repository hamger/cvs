import { Canvas, Text } from '@'
// import { Canvas, Text } from '../../dist/cvs.js'
var canvas = new Canvas({
  container: document.getElementById('container')
})

canvas.add(
  new Text({
    text: 'hello',
    x: 89,
    y: 76,
    font: '48px serif'
  })
)

canvas.add(
  new Text({
    text: 'hanger',
    x: 189,
    y: 76,
    fontSize: 43
  })
)
canvas.draw()
