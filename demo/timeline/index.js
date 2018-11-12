import { Cvs, Rect, Img, Keyframe, Round } from '@'
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

  let ele = new Img({
    img: 'safari',
    // x: 300,
    // y: 300,
    w: 80,
    h: 80
  })
  let round = new Round({
    delay: 0,
    duration: 5000,
    retrace: false, // 是否折返
    iterationCount: 2, // 重复次数
    centerX: 300,
    centerY: 300,
    r: 150,
    angle: 180,
    anticlockwise: false,
    relativeX: 40,
    relativeY: 40
  })
  ele.addTrack(round)
  cvs.add(ele)

  let btn = new Rect({
    x: 500,
    y: 500,
    w: 30,
    h: 30,
    fill: '#3F9'
  })
  btn.on('click', function () {
    ele.timeline.playbackRate = 0
  })
  let btn2 = new Rect({
    x: 550,
    y: 500,
    w: 30,
    h: 30
  })
  btn.on('click', function () {
    ele.timeline.playbackRate = 1
    console.log(ele.timeline.playbackRate)
  })
  cvs.add(btn, btn2)

  cvs.animate()
})()
