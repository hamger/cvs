import { Scene, Text, Path } from '#'
let scene = new Scene({
  containerId: 'container'
})

let layer = scene.layer()
var text = new Text({
  text: '狂拽酷炫吊炸天\n123456789\nhello',
  x: 200,
  y: 200,
  // text: 'hello\nbig\nworld',
  // {scale: 2},
  stroke: 'blue',
  fill: 'red',
  linewidth: 10,
  // opacity: 0.4,
  // shadowColor: '#444',
  // shadowOffsetX: 10,
  // shadowOffsetY: 10,
  // textAlign: 'center',
  textAlign: 'right',
  font: '48px serif'
})
text.on('click', e => {
  console.log(e)
})
let rect = new Path({
  d: {
    type: 'rect',
    x: text.bounds[0],
    y: text.bounds[1],
    w: text.size[0],
    h: text.size[1],
  },
  stroke: '#153'
})
layer.append(rect)
layer.append(text)
layer.draw()
// text.keyframe([['rotate'], {rotate: 500}], 5000, function () {
//   layer.cancelAnimate()
// })
// layer.animate()
