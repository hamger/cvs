import { Cvs, Element, Circle, Rect, Img, Poly } from '@'
let cvs = new Cvs({
  container: document.getElementById('container')
})

let element = new Circle({
  r: 50,
  y: 100,
  x: 100,
  fill: '#999'
})
element.on('click', function () {
  cvs.clear()
  if (this.attr('fill') === '#999') {
    this.attr({ fill: '#23af9a' })
  } else {
    this.attr({ fill: '#999' })
  }
  cvs.draw()
})
cvs.add(element)

let element2 = new Element({
  x: 600,
  y: 100,
  w: 180,
  h: 180
})
element2.draw = function () {
  this.ctx.save()
  this.ctx.fillRect(this.attr('x'), this.attr('y'), this.attr('w'), this.attr('h'))
  this.ctx.restore()
}
element2.drawPath = function () {
  this.ctx.save()
  this.ctx.rect(this.attr('x'), this.attr('y'), this.attr('w'), this.attr('h'))
  this.ctx.restore()
}
element2.on('click', function (e) {
  console.log(e)
})
cvs.add(element2)

let element4 = new Circle({
  zIndex: -2,
  r: 50,
  y: 150,
  x: 150,
  fill: '#3e9',
  hover: {
    fill: '#5f1'
  }
  // cache: true
})
element4.on('click', function (e) {
  console.log('element4: ' + e)
})

let element6 = new Poly({
  zIndex: 9,
  points: [
    { x: 200, y: 23 },
    { x: 250, y: 53 },
    { x: 260, y: 93 },
    { x: 170, y: 173 },
    { x: 200, y: 23 }
  ],
  fill: '#f88a95',
  cache: true
})
element6.on('click', function (e) {
  console.log('element6: ' + e)
})
cvs.add(element4, element6)
cvs.draw()
