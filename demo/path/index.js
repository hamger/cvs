import { Scene, Path, Group, Text } from '#'
let scene = new Scene({
  containerId: 'container'
})
const d =
  'M10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 109.9 L 315 10'
const d2 =
  'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z'
const d3 = 'M 230 200 L 550 250 L 230 300 z'
let layer = scene.layer({ handleEvent: true })
var ele = new Path({
  zIndex: 2,
  d: d2,
  pos: [50, 50],
  // anchor: [0.5, 0.5],
  transform: {
    // skew: 0.3,
    scale: 8,
    translate: [50, 50],
    // rotate: 45,
  },
  stroke: '#54F',
  lineWidth: 4
})

ele.on('click', () => {
  console.log('haha')
})
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

let rect2 = new Path({
  zIndex: -1,
  d: {
    type: 'rect',
    x: ele.bounds[0],
    y: ele.bounds[1],
    w: ele.size[0],
    h: ele.size[1],
    borderRadius: 10,
  },
  stroke: '#153'
})
layer.append(rect2)

let circle = new Path({
  d: {
    type: 'circle',
    cx: 300,
    cy: 200,
    r: [50, 34],
    rotate: 90,
  },
  stroke: 'red'
})
layer.append(circle)

layer.draw()

// let flag = true
// rect2.on('click', () => {
//   if (flag) {
//     ele.attr({ stroke: 'blue' })
//   } else {
//     ele.attr({ stroke: 'red' })
//   }
//   flag = !flag
//   layer.clear()
//   layer.draw()
// })
