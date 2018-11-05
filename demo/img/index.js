import { Cvs, Rect, Img } from '@'
  ;(async function () {
  let cvs = new Cvs({
    container: document.getElementById('container')
  })
  await cvs.preload({
    safari: '../../static/safari.png',
    robot01: '../../static/robot01.png',
    robot02: '../../static/robot02.png',
    robot03: '../../static/robot03.png',
  })
  let element = new Rect({
    x: 0,
    y: 0,
    w: cvs.width,
    h: cvs.height,
    fill: '#bcd9f5'
  })
  cvs.add(element)
  cvs.draw()

  let cvs2 = new Cvs({
    container: document.getElementById('container2')
  })
  let element2 = new Img({
    img: 'safari',
    x: 200,
    y: 100,
    transform: [{ rotate: 10 }, { scale: [1.5, 1.1] }]
  })
  cvs2.add(element2)
  cvs2.draw()
})()
