import { Cvs, Circle, Rect, Img, Poly } from '@'
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
  if (this.attr('fill') === '#999') {
    this.attr({fill: '#23af9a'})
  } else {
    this.attr({fill: '#999'})
  }
  cvs.draw()
})
cvs.add(element)

// let element2 = new Rect({
//   x: 200,
//   y: 400,
//   w: 60,
//   h: 60,
//   stroke: 'green',
//   // cache: true
// })

let element3 = new Rect({
  x: 400,
  y: 300,
  w: 80,
  h: 80,
  stroke: 'blue'
})
// element3.exec({
//   scale: [1.2, 1.1]
// })
// element3.exec([
//   {
//     rotate: 10
//   }
// ])
// element3.on('click', function (e) {
//   console.log('element3: ' + e)
// })
cvs.add(element3)

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
cvs.add(element4)

let element6 = new Poly({
  zIndex: 9,
  points: [[200, 23], [250, 53], [260, 93], [170, 173], [200, 23]],
  cache: true
})
element6.on('click', function (e) {
  console.log('element6: ' + e)
})
cvs.add(element6)

let img = new Image()
img.src = 'http://olislpb6q.bkt.clouddn.com/safari.png'

// 当图片准备以后再绘制
img.onload = function () {
  let element5 = new Img({
    img: img,
    dx: 200,
    dy: 200
  })
  element5.on('click', function (e) {
    console.log('element5: ' + e)
  })
  cvs.add(element5)
  cvs.draw()
}
