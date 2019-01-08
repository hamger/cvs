import { Scene, Group, Text, Path } from '#'
let scene = new Scene({
  containerId: 'container'
})

let layer = scene.layer({ handleEvent: true })

class Button extends Group {
  constructor (opt) {
    super(opt)
    opt = Object.assign({borderWidth: 1, padding: 0, borderRadius: 0, font: '20px system-ui'}, opt)
    this.text = new Text({
      zIndex: 1,
      x: opt.padding + Math.floor(opt.borderWidth / 2),
      y: opt.padding + Math.floor(opt.borderWidth / 2),
      text: opt.text,
      font: opt.font,
      fill: opt.color
    })
    this.append(this.text)
    this.rect = new Path({
      x: Math.floor(opt.borderWidth / 2),
      y: Math.floor(opt.borderWidth / 2),
      d: {
        type: 'rect',
        w: this.text.size[0] + opt.padding * 2,
        h: this.text.size[1] + opt.padding * 2,
        borderRadius: opt.borderRadius,
      },
      lineWidth: opt.borderWidth,
      stroke: opt.borderColor,
      fill: opt.bgColor
    })
    this.append(this.rect)
  }
}

let button = new Button({
  x: 100,
  y: 100,
  padding: 10,
  text: '确定',
  font: '20px system-ui',
  color: '#409eff',
  borderColor: '#ecf5ff',
  bgColor: '#b3d8ff',
  borderRadius: 8
})

layer.append(button)

let rect = button.rect, text = button.text

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

layer.draw()
