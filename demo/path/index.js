import { Scene, Path } from '#'
let scene = new Scene({
  containerId: 'container'
})

// this.path
// .save()
// .beginPath()
// .translate(-cx, -cy)
// .rotate(45)
// .scale(10)
// .translate(cx, cy)
// .translate(350, 350)
// .strokeStyle('red')
// .lineWidth(3).to(ctx).stroke()

let layer = scene.layer({handleEvent: true})
var ele = new Path({
  path: 'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z',
  stroke: 'red',
  transform: [{translate: [-10, -10]}, {rotate: 45}, {scale: 10}, {translate: [350, 350]}],
  lineWidth: 4
})
ele.on('click', () => {
  console.log('haha')
})
layer.append(ele)

// layer.append(
//   new Path({
//     startArrow: true,
//     endArrow: true,
//     path:
//       'M 10 10' +
//       'L 100 100' +
//       'l 30 -50' +
//       'C 100 100 200 200 300 200' +
//       's 50 50 100 100' +
//       'T 130 500' +
//       'a 0 50 50 -90 180',
//     stroke: '#454'
//   })
// )

layer.draw()
