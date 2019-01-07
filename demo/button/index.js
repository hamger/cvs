import { Scene, Group, Text, Path } from '#'
let scene = new Scene({
  containerId: 'container'
})

let layer = scene.layer({ handleEvent: true })

class Button extends Group {
  constructor (opt) {
    super(opt)
    opt = Object.assign({borderWidth: 1, padding: 0, borderRadius: 0, font: '20px system-ui'}, opt)
    var text = new Text({
      zIndex: 1,
      x: opt.padding + Math.floor(opt.borderWidth / 2),
      y: opt.padding + Math.floor(opt.borderWidth / 2),
      text: opt.text,
      font: opt.font,
      fill: opt.color
    })
    this.append(text)
    var rect = new Path({
      x: Math.floor(opt.borderWidth / 2),
      y: Math.floor(opt.borderWidth / 2),
      d: {
        type: 'rect',
        w: text.size.w + opt.padding * 2,
        h: text.size.h + opt.padding * 2,
        borderRadius: opt.borderRadius,
      },
      lineWidth: opt.borderWidth,
      stroke: opt.borderColor,
      fill: opt.bgColor
    })
    this.append(rect)
  }
}

let button2 = new Button({
  x: 100,
  y: 100,
  w: 100,
  h: 80,
  padding: 10,
  text: '确定',
  font: '20px system-ui',
  color: '#409eff',
  borderColor: '#ecf5ff',
  bgColor: '#b3d8ff',
  borderRadius: 8
})

layer.append(button2)

// let text = new Text({
//   zIndex: 1,
//   text: '确 定',
//   x: 10,
//   y: 11,
//   font: '20px system-ui',
//   fill: '#409eff'
// })
// let rect = new Path({
//   x: 1,
//   y: 1,
//   d: {
//     type: 'rect',
//     w: text.size.w + 20,
//     h: text.size.h + 20,
//     borderRadius: 8
//   },
//   stroke: '#ecf5ff',
//   fill: '#b3d8ff'
// })

// let button = new Group({
//   x: 200,
//   y: 200,
//   w: rect.size.w + 3,
//   h: rect.size.h + 3
// }).append(text, rect)

// rect.on('click', () => {
//   console.log('rect')
// })
// rect.on('mouseenter', () => {
//   layer.clear()
//   scene.container.style.cursor = 'pointer'
//   rect.attr({ fill: '#409eff', stroke: '#409eff' })
//   text.attr({ fill: '#fff' })
//   layer.draw()
// })
// rect.on('mouseleave', () => {
//   layer.clear()
//   scene.container.style.cursor = 'default'
//   rect.attr({ fill: '#b3d8ff', stroke: '#ecf5ff' })
//   text.attr({ fill: '#409eff' })
//   layer.draw()
// })
// layer.append(button)

layer.draw()
