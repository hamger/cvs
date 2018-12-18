import { Scene, Path } from '#'
let scene = new Scene({
  containerId: 'container'
})
const d =
  'M10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 109.9 L 315 10'
const d2 =
  'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z'
let layer = scene.layer({ handleEvent: true })
var ele = new Path({
  path: d2,
  transform: [
    { translate: [-10, -10] },
    { rotate: 45 },
    { scale: 10 },
    { translate: [350, 350] },
    { transform: [1, 0.2, 0.1, 1, 0, 0] }
  ],
  stroke: 'red',
  lineWidth: 4
})
ele.on('click', () => {
  console.log('haha')
})
layer.append(ele)
console.log(ele.center)
console.log(ele.bounds)

layer.append(
  new Path({
    id: 'line',
    path: d,
    stroke: '#454'
  })
)
console.log(layer.element('line').center)
console.log(layer.element('line').bounds)
layer.draw()
