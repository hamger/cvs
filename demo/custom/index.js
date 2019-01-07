import { Scene, Group, Text, Path } from '#'
  ;(async function () {
  let scene = new Scene({
    containerId: 'container'
  })

  let layer = scene.layer({ handleEvent: true })
  // 0
  let text = new Text({
    zIndex: 1,
    text: '确定',
    x: 10,
    y: 11,
    font: '24px system-ui',
    fill: '#409eff'
  })
  // 1
  let rect = new Path({
    x: 1,
    y: 1,
    d: {
      type: 'rect',
      w: text.size.w + 20,
      h: text.size.h + 20,
      borderRadius: 8,
    },
    stroke: '#ecf5ff',
    fill: '#b3d8ff'
  })

  // 2
  let button = new Group({
    x: 200,
    y: 200,
    w: rect.size.w + 3,
    h: rect.size.h + 3,
    // w: 300,
    // h: 300,
    // stroke: '#ddd'
  }).append(text, rect)

  rect.on('click', () => {
    console.log('rect')
  })
  button.on('click', () => {
    console.log('button')
  })
  // button.on('mouseenter', () => {
  //   layer.clear()
  //   scene.container.style.cursor = 'pointer'
  //   rect.attr({fill: '#409eff', stroke: '#409eff'})
  //   text.attr({fill: '#fff'})
  //   layer.draw()
  // })
  // button.on('mouseleave', () => {
  //   layer.clear()
  //   scene.container.style.cursor = 'default'
  //   rect.attr({fill: '#b3d8ff', stroke: '#ecf5ff'})
  //   text.attr({fill: '#409eff'})
  //   layer.draw()
  // })
  layer.append(button)
  // 3
  let ruler = new Path({
    zIndex: -1,
    d: {
      type: 'rect',
      w: 200,
      h: 200
    },
    stroke: '#444'
  })
  layer.append(ruler)
  layer.draw()
})()
