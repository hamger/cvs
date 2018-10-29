import { Cvs, Circle, Color } from '@'

let cvs = new Cvs({
  container: document.getElementById('container')
})

let dot = new Circle({
  zIndex: 1,
  r: 200,
  x: 400,
  y: 400,
  cache: true,
  fill: 'pink'
})

let color = new Color({
  delay: 0,
  duration: 8000,
  retrace: false, // 是否折返
  colors: [
    [0.3, 'red'],
    [0.7, 'orange'],
    [0.17, 'yellow'],
    [0.22, 'green'],
    [0.42, 'cyan'],
    [0.82, 'blue'],
    [0.90, 'purple'],
  ]
})

dot.addTrack(color)

cvs.add([dot])

cvs.animate()
