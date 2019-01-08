import { Scene, Image, Path, Text } from '#'
  ;(async function () {
  let scene = new Scene({
    containerId: 'container'
  })

  await scene.preload({
    safari: '../../static/safari.png'
  })

  let bgLayer = scene.layer({
    background: '#bcd9f5',
    handleEvent: true
  })
  let fgLayer = scene.layer()

  // let img = new Image({
  //   image: 'safari',
  //   w: 80,
  //   h: 80,
  //   x: 200,
  //   y: 100
  // })
  // img.keyframe([['w', 'h'], { w: 110, h: 110 }, { w: 140, h: 140 }], {duration: 3000, easing: 'ease-in'})
  // fgLayer.append(img)
  const d = 'M235.946483,75.0041277 C229.109329,53.4046689 214.063766,34.845093 195.469876,22.3846101 C175.428247,8.9577702 151.414895,2 127.314132,2 C75.430432,2 31.6212932,32.8626807 18.323944,74.9130141 C8.97646468,77.1439182 2,85.5871171 2,95.7172992 C2,104.709941 7.49867791,112.371771 15.2700334,115.546944 C15.8218133,115.773348 16.6030463,122.336292 16.8270361,123.236385 C22.1235768,144.534892 35.4236577,163.530709 52.5998558,176.952027 C52.6299032,176.976876 52.6626822,177.001726 52.6954612,177.026575 C72.5513428,192.535224 98.5478246,202 127.043705,202 C152.034964,202 176.867791,194.597706 197.428422,180.146527 C215.659011,167.335395 230.201962,148.621202 236.52831,126.969284 C237.566312,123.421373 238.549682,119.685713 239.038636,116.019079 C239.044099,115.983185 239.074146,115.444787 239.082341,115.442025 C246.673412,112.184022 252,104.580173 252,95.7172992 C252,85.6892748 245.15192,77.3371896 235.946483,75.0041277'
  const d2 = 'M 23.6 0 c -3.4 0 -6.3 2.7 -7.6 5.6 C 14.7 2.7 11.8 0 8.4 0 C 3.8 0 0 3.8 0 8.4 c 0 9.4 9.5 11.9 16 21.2 c 6.1 -9.3 16 -12.1 16 -21.2 C 32 3.8 28.2 0 23.6 0 z'
  let rect = new Path({
    d: {
      type: 'rect',
      w: 80,
      h: 80,
    },
    x: 0,
    y: 0,
    offsetPath: {
      path: d2,
      scale: 6
    },
    fill: 'green'
  })
  rect.keyframe([['fill', 'offsetDistance'], { fill: 'red', offsetDistance: 1 }], {duration: 8000})
  // let p = new Path({
  //   zindex: 22,
  //   id: 'line',
  //   d: d2,
  //   x: 0,
  //   y: 300,
  //   stroke: '#454'
  // })
  // p.keyframe([['x'], { x: 400 }], {duration: 5000})
  fgLayer.append(rect)

  let start = new Text({
    x: 600,
    y: 550,
    text: '开启',
    font: '20px Arial',
    fill: 'blue'
  })
  let stop = new Text({
    x: 650,
    y: 550,
    text: '停止',
    font: '20px Arial',
    fill: 'orange'
  })
  start.on('click', function () {
    fgLayer.timeline.playbackRate = 1
  })
  stop.on('click', function () {
    fgLayer.timeline.playbackRate = 0
  })
  bgLayer.append(start, stop)
  // bgLayer.draw()
  fgLayer.animate()
})()
