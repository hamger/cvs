import { Scene, Path, Group, Text } from '#'
let scene = new Scene({
  containerId: 'container'
})
const d =
  'M10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 109.9 L 315 10'
const d2 =
  'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z'
let layer = scene.layer({ handleEvent: true })
var ele = new Path({
  zIndex: 2,
  path: d2,
  transform: [
    { translate: [-10, -10] },
    { rotate: 45 },
    { scale: 10 },
    { translate: [350, 350] }
  ],
  stroke: 'red',
  lineWidth: 4
})
ele.on('click', () => {
  console.log('haha')
})
layer.append(ele)

layer.append(
  new Path({
    id: 'line',
    path: d,
    stroke: '#540'
  })
)
let rect = new Path({
  path: 'M100 100 h 90 v 90 h -90 z',
  fill: '#153'
})
let group = new Group({
  x: 100,
  y: 100,
  w: 350,
  h: 350,
  stroke: '#ddd',
  // transform: [1, 1, 0, 1, 0, 0]
})
group.append(rect)
layer.append(group)

var a = ele.bounds
let rect2 = new Path({
  zIndex: -1,
  path: `M ${a[0]} ${a[1]} h ${a[2] - a[0]} v ${a[3] - a[1]} h ${-1 *
    (a[2] - a[0])} z`,
  stroke: '#153'
})
let flag = true
rect2.on('click', () => {
  if (flag) {
    ele.attr({ stroke: 'blue' })
  } else {
    ele.attr({ stroke: 'red' })
  }
  flag = !flag
  layer.clear()
  layer.draw()
})
layer.append(rect2)
layer.draw()
