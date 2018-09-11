import { Canvas, Text } from '@'
// import { Canvas, Text } from '../../dist/cvs.js'
var canvas = new Canvas({
  container: document.getElementById('container')
})

canvas.add(new Text({
  text: 'hello',
  x: 89,
  y: 76
}))
canvas.draw()
