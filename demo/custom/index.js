import { Scene, Group, Text, Path } from '#'
let scene = new Scene({
  containerId: 'container'
})

let layer = scene.layer({ handleEvent: true })
let text = new Text({
  zIndex: 1,
  text: '确 定',
  x: 10,
  y: 11,
  font: '20px system-ui',
  fill: '#409eff'
})
let rect = new Path({
  x: 1,
  y: 1,
  d: {
    type: 'rect',
    w: text.size[0] + 20,
    h: text.size[1] + 20,
    borderRadius: 8
  },
  stroke: '#ecf5ff',
  fill: '#b3d8ff'
})

let button = new Group({
  x: 200,
  y: 200,
}).append(text, rect)

rect.on('click', () => {
  console.log('rect')
})
rect.on('mouseenter', () => {
  layer.clear()
  scene.container.style.cursor = 'pointer'
  rect.attr({ fill: '#409eff', stroke: '#409eff' })
  text.attr({ fill: '#fff' })
  layer.draw()
})
rect.on('mouseleave', () => {
  layer.clear()
  scene.container.style.cursor = 'default'
  rect.attr({ fill: '#b3d8ff', stroke: '#ecf5ff' })
  text.attr({ fill: '#409eff' })
  layer.draw()
})
layer.append(button)
layer.draw()
