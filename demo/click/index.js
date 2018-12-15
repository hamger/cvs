import { Scene, Element, Circle, Rect, Image, Path } from '#'
  ;(async function () {
  let scene = new Scene({
    containerId: 'container'
  })
  await scene.preload({
    safari: '../../static/safari.png'
  })

  let layer = scene.layer({
    handleEvent: true
  })

  let circle = new Path.Circle({
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
  layer.append(circle)

  let circle2 = new Path.Circle({
    zIndex: -2,
    r: 50,
    y: 150,
    x: 150,
    fill: '#3e9',
    hover: {
      fill: '#5f1'
    },
    // cache: true
  })
  circle2.on('click', function (e) {
    console.log('circle2: ' + e)
  })
  layer.append(circle2)

  let circle3 = new Path.Circle({
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
  layer.append(circle3)

  let rect = new Path.Rect({
    zIndex: 88,
    w: 50,
    h: 50,
    x: 150,
    y: 350,
    fill: '#3e9',
    borderRadius: 3,
    hover: {
      fill: '#5f1'
    },
    cache: true
  })
  rect.on('click', function (e) {
    console.log('rect: ' + e)
  })
  layer.append(rect)

  let image = new Image({
    image: 'safari',
    y: 100,
    x: 340
  })

  class Triangle extends Element {
    draw () {
      let ctx = this.ctx
      ctx.save()
      this.outline()
      ctx.fill()
      ctx.restore()
    }
    outline () {
      let ctx = this.ctx
      let p = this.attr('points')
      ctx.beginPath()
      ctx.moveTo(p[0].x, p[0].y)
      ctx.lineTo(p[1].x, p[1].y)
      ctx.lineTo(p[2].x, p[2].y)
      ctx.closePath()
    }
  }
  let triangle = new Triangle({
    zIndex: 5,
    points: [{ x: 2, y: 2 }, { x: 102, y: 12 }, { x: 12, y: 92 }]
  })
  triangle.on('click', function (e) {
    console.log(e)
  })
  layer.append(triangle, image)
  layer.draw()
})()
