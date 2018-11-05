import { Cvs, Element, Arc } from '@'
let cvs = new Cvs({
  container: document.getElementById('container')
})

let arc = new Arc({
  x: 300,
  y: 300,
  r: 50,
  startAngle: 0,
  endAngle: 180,
  anticlockwise: false,
  cache: true,
  stroke: 'blue',
  startArrow: true,
  endArrow: true
})

let arc2 = new Arc({
  x: 500,
  y: 300,
  r: 50,
  startAngle: 90,
  endAngle: 270,
  anticlockwise: false,
  cache: true,
  stroke: 'red',
  endArrow: true
})

let arc3 = new Arc({
  x: 300,
  y: 500,
  r: 50,
  startAngle: 45,
  endAngle: 285,
  anticlockwise: false,
  cache: true,
  stroke: 'pink',
  startArrow: true,
})

cvs.add([arc, arc2, arc3])
cvs.draw()
