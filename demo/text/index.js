import { Canvas, Text } from '@'
var canvas = new Canvas({
  container: document.getElementById('container')
})

canvas.addElement(new Text({
  text: 'hello',
  x: 89,
  y: 76
}))
canvas.draw()
