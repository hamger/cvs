import { Scene, Path } from '#'
let scene = new Scene({
  containerId: 'container'
})
const d =
  'M10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 109.9 L 315 10'
const d2 =
  'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z'
const d3 = 'M 0 0 h 100 v 100 h -100 z'
const d4 = 'M 50 50 L 350 100 L 50 150 z'
let layer = scene.layer({ handleEvent: true })
var ele = new Path({
  zIndex: 2,
  d: d4,
  x: 0,
  y: 0,
  // opacity: 0.4,
  // transformOrigin: [50, 50],
  // translate: -50,
  // rotate: 90,
  stroke: 'pink',
  fill: '#344',
  lineWidth: 4,
  miterLimit: 100
})
ele.on('click', () => {
  console.log('haha')
})
// ele.keyframe([['x', 'rotate'], {x: 450, rotate: 900}], 3000, function () {
//   layer.cancelAnimate()
// })
// ele.keyframe([['rotate'], {rotate: 900}], 5000, function () {
//   layer.cancelAnimate()
// })
layer.append(ele)

// layer.append(
//   new Path({
//     id: 'line',
//     d: d,
//     stroke: '#540'
//   })
// )
// // let rect = new Path({
// //   d: 'M100 100 h 90 v 90 h -90 z',
// //   fill: '#153'
// // })
// let group = new Group({
//   x: 0,
//   y: 0,
//   w: 100,
//   h: 200,
//   stroke: '#333'
//   // transform: [1, 1, 0, 1, 0, 0]
// })
// // group.append(rect)
// layer.append(group)

let ruler = new Path({
  zIndex: -1,
  d: {
    type: 'rect',
    x: 0,
    y: 0,
    w: 200,
    h: 200
  },
  stroke: '#444'
})
layer.append(ruler)
// ruler.keyframe([['x'], {x: 300}], 3000)

let circle = new Path({
  x: 200,
  y: 200,
  d: {
    type: 'circle',
    r: [100, 50],
  },
  transformOrigin: [100, 50],
  rotate: 90,
  lineWidth: 10,
  stroke: '#444'
})

let flag = true
circle.on('click', () => {
  if (flag) {
    ele.attr({ stroke: 'blue' })
  } else {
    ele.attr({ stroke: 'red' })
  }
  flag = !flag
  layer.clear()
  layer.draw()
})
circle.on('mouseup', (e) => {
  console.log(e)
})
// circle.on('mousemove', (e) => {
//   console.log(e)
// })
circle.on('mouseenter', (e) => {
  console.log('enter')
  layer.clear()
  circle.attr({stroke: '#098'})
  layer.draw()
})
circle.on('mouseleave', (e) => {
  console.log('leave')
  layer.clear()
  circle.attr({stroke: '#444'})
  layer.draw()
})

layer.append(circle)
// layer.animate()

layer.draw()
