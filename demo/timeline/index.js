import { Cvs, Rect, Img, Keyframe } from '@'
  ;(async function () {
  let cvs = new Cvs({
    container: document.getElementById('container')
  })

  await cvs.preload({
    safari: '../../static/safari.png',
    robot01: '../../static/robot01.png',
    robot02: '../../static/robot02.png',
    robot03: '../../static/robot03.png'
  })

  let element2 = new Img({
    img: 'safari',
    x: 10,
    y: 10,
  })
  let element3 = new Img({
    img: 'robot01',
    x: 400,
    y: 40
  })
  element3.addTrack(
    new Keyframe({
      delay: 110,
      duration: 4000,
      retrace: true, // 是否折返
      iterationCount: 2, // 重复次数
      keyframe: [
        { texture: 'robot01' },
        { texture: 'robot02' },
        { texture: 'robot03' }
      ]
    })
  )
  cvs.add(element2, element3)
  cvs.animate()
})()
