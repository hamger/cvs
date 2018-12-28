import { Scene, Text, Path } from '#'
let scene = new Scene({
  containerId: 'container'
})

let layer = scene.layer()
var text = new Text({
  text: '狂拽酷炫吊炸天\n哈哈哈哈哈哈哈哈\n欧耶',
  x: 100,
  y: 100,
  // text: 'hello\nbig\nworld',
  // transform: [
  //   {scale: 2},
  //   // {skew: [0.4, 0.4]},
  // ],
  stroke: 'blue',
  fill: 'red',
  // textAlign: 'center',
  textAlign: 'left',
  // textAlign: 'right',
  font: '48px serif'
})
text.on('click', (e) => {
  console.log(e)
})
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
layer.append(text)
layer.draw()
