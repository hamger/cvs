import { Cvs, Img } from '@'

  ;(async function () {
  let cvs = new Cvs({
    container: document.getElementById('container')
  })
  await cvs.preload({
    safari: '../../static/safari.png'
  })
  let element = new Img({
    img: 'safari',
    dx: 200,
    dy: 100,
    transform: [{ rotate: 10 }, { scale: [1.5, 1.1] }]
  })
  cvs.add(element)
  cvs.draw()
})()
