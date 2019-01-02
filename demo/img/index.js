import { Scene, Image, Path } from '#'
  ;(async function () {
  let scene = new Scene({
    containerId: 'container'
  })
  await scene.preload({
    safari: '../../static/safari.png',
    taiji: '../../static/taiji.png',
    github: '../../static/github.png',
    robot01: '../../static/robot01.png',
    robot02: '../../static/robot02.png',
    robot03: '../../static/robot03.png'
  })
  let fgLayer = scene.layer()
  let ele = new Image({
    image: 'safari',
    x: 100,
    y: 100,
    // anchor: [0.5, 0.5],
    // w: 100,
    // h: 100,
    scale: 2,
    // transform: [
    //   // { translate: [200, 0] },
    //   // { rotate: 45 },
    //   // { skew: [1, 0] },
    //   { scale: 2 },
    //   {transform: [1, 1, 0, 1, 0, 0]},
    //   // { translate: [200, 0] },
    // ]
    // transform: [1, 0.1, 0.2, 1, 100, 100],
    // cache: true,
  })
  ele.on('click', () => {
    console.log(123324243)
  })
  console.log(ele.bounds)
  var rect = new Path({
    d: {
      type: 'rect',
      x: ele.bounds[0],
      y: ele.bounds[1],
      w: ele.size[0],
      h: ele.size[1]
    },
    stroke: '#513'
  })
  fgLayer.append(ele, rect)

  // let element3 = new Image({
  //   image: 'robot01',
  //   x: 600,
  //   y: 40
  // })
  // element3.keyframe(
  //   [
  //     { image: 'robot01' },
  //     { image: 'robot02' },
  //     { image: 'robot03' },
  //     { image: 'robot02' },
  //     { image: 'robot01' }
  //   ],
  //   {
  //     delay: 110,
  //     duration: 4000,
  //     iterationCount: 2 // 重复次数
  //   }
  // )
  // fgLayer.append(element3)
  // let ruler = new Path({
  //   d: {
  //     type: 'rect',
  //     x: 0,
  //     y: 0,
  //     w: 200,
  //     h: 200
  //   },
  //   stroke: 'red'
  // })
  // fgLayer.append(ruler)
  fgLayer.draw()
  // fgLayer.animate()
})()
