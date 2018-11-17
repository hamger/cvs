import { Scene, Element, Circle, Rect, Img } from '#'

  ;(async function () {
  let scene = new Scene({
    containerId: 'container'
  })
  await scene.preload({
    safari: '../../static/safari.png'
  })

  let layer = scene.layer()

  let circle = new Circle({
    r: 50,
    y: 100,
    x: 100,
    fill: '#999'
  })
  circle.on('click', function () {
    layer.clear()
    if (this.attr('fill') === '#999') {
      this.attr({ fill: '#23af9a' })
    } else {
      this.attr({ fill: '#999' })
    }
    layer.draw()
  })
  layer.add(circle)

  let circle2 = new Circle({
    zIndex: -2,
    r: 50,
    y: 150,
    x: 150,
    fill: '#3e9',
    hover: {
      fill: '#5f1'
    },
    cache: true
  })
  circle2.on('click', function (e) {
    console.log('circle2: ' + e)
  })
  layer.add(circle2)

  let circle3 = new Circle({
    zIndex: 2,
    r: 50,
    y: 350,
    x: 450,
    startAngle: 0,
    endAngle: 100,
    anticlockwise: true,
    lineWidth: 4,
    stroke: '#39e',
    cache: true
  })
  circle3.on('click', function (e) {
    console.log('circle3: ' + e)
  })
  layer.add(circle3)

  let rect = new Rect({
    w: 50,
    h: 50,
    x: 150,
    y: 350,
    fill: '#3e9',
    hover: {
      fill: '#5f1'
    },
    cache: true
  })
  rect.on('click', function (e) {
    console.log('rect: ' + e)
  })
  layer.add(rect)

  let img = new Img({
    img: 'safari',
    y: 100,
    x: 340,
  })
  img.on('click', function (e) {
    console.log('img: ' + e)
  })
  layer.add(img)

  layer.draw()
})()
