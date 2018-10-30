import { Cvs, Path, Poly, Arc } from '@'
let cvs = new Cvs({
  container: document.getElementById('container')
})

// cvs.add(
//   new Path({
//     path: 'M 167 211' + 'C 444 205 268 438 583 489',
//     stroke: 'red'
//   })
// )
// cvs.add(
//   new Path({
//     path: 'M 500 300' + 'L 500 500',
//     stroke: 'red',
//     endArrow: {
//       fill: 'blue'
//     },
//   })
// )

// cvs.add(
//   new Path({
//     path: 'M 300 300' + 'L 600 400',
//     stroke: 'red',
//     endArrow: {
//       angle: 15,
//       len: 50
//     }
//   })
// )

cvs.add(
  new Path({
    path: 'M 100 100' + 'L 700 500',
    stroke: 'red',
    startArrow: true,
    endArrow: {
      angle: 15,
      len: 30,
    }
  })
)
//
// cvs.add(
//   new Path({
//     path: 'M 200 300' + 'L 400 500',
//     stroke: 'red',
//     startArrow: true
//   })
// )
//
// cvs.add(
//   new Path({
//     path: 'M 200 400' + 'L 700 400',
//     stroke: 'red',
//     startArrow: {
//       angle: 60,
//       len: 50
//     },
//     endArrow: true
//   })
// )

cvs.add(
  new Path({
    startArrow: true,
    path:
      'M 10 10' +
      'L 100 100' +
      'l 30 -50' +
      'C 100 100 200 200 300 200' +
      's 50 50 100 100' +
      'T 130 500' +
      'a 0 50 50 -90 180',
    stroke: '#454'
  })
)

// cvs.add(
//   new Poly({
//     points: [[90, 190], [34, 56], [222, 333]],
//     stroke: '#198',
//     lineWidth: 1,
//     cache: true
//   })
// )
//
// cvs.add(
//   new Poly({
//     points: [[500, 190], [234, 356], [522, 433]],
//     fill: '#999',
//     cache: true
//   })
// )
//
// cvs.add(
//   new Arc({
//     x: 500.3,
//     y: 100.4,
//     r: 50,
//     startAngle: -80,
//     endAngle: 20,
//     anticlockwise: true,
//     cache: true
//   })
// )

cvs.draw()
