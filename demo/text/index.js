import { Scene, Text, Path } from '#'
let scene = new Scene({
  containerId: 'container'
})

let layer = scene.layer()
// var text = new Text({
//   font: '48px serif',
//   text: '狂拽酷炫吊炸天\n123456789\nhello',
//   x: 18,
//   y: 18,
//   lineWidth: 5,
//   stroke: 'blue',
//   // fill: 'red',
//   // opacity: 0.4,
//   shadowColor: '#444',
//   shadowOffsetX: -10,
//   shadowOffsetY: 10,
//   // textAlign: 'center',
//   textAlign: 'right',
// })
// text.on('click', e => {
//   console.log(e)
// })
// let rect = new Path({
//   d: {
//     type: 'rect',
//     x: text.bounds[0],
//     y: text.bounds[1],
//     w: text.size[0],
//     h: text.size[1],
//   },
//   stroke: '#153'
// })
// layer.append(rect)
// layer.append(text)
let text2 = new Text({
  // zIndex: 1,
  text: '确定',
  x: 10,
  y: 10,
  font: '24px serif',
  fill: '#444'
})
layer.append(text2)
layer.draw()
// text.keyframe([['rotate'], {rotate: 500}], 5000, function () {
//   layer.cancelAnimate()
// })
// layer.animate()
