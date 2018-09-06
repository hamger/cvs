// import { Canvas, Circle } from '../../see'
import { Canvas, Path, Poly, Arc } from '@'
let canvas = new Canvas({
  container: document.getElementById('container')
})

canvas.add(
  new Path({
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

canvas.add(
  new Poly({
    points: [[90, 190], [34, 56], [222, 333]],
    stroke: '#198',
    lineWidth: 3
  })
)

canvas.add(
  new Poly({
    points: [[500, 190], [234, 356], [522, 433]],
    fill: '#999'
  })
)

canvas.add(
  new Arc({
    visible: false,
    x: 500,
    y: 100,
    r: 50,
    startAngle: -80,
    endAngle: 20,
    anticlockwise: true
  })
)

canvas.draw()
// const dotSpeed = 1
// const dotCount = 80
// let r = 10

// let dots = []
// for (var i = 0; i < dotCount; i++) {
//   r = r + 0.5
//   var x = Math.random() * (canvas.width - 2 * r) + r
//   var y = Math.random() * (canvas.height - 2 * r) + r
//   // (Math.random() * 2 - 1) 用来表示随机的运动方向
//   var xa = (Math.random() * 2 - 1) * dotSpeed
//   var ya = (Math.random() * 2 - 1) * dotSpeed
//   dots.push({
//     zIndex: Math.random() * dotCount,
//     r: r,
//     x: x,
//     y: y,
//     xa: xa,
//     ya: ya,
//     color: `rgba(${Math.random() * 255}, ${Math.random() *
//       255}, ${Math.random() * 255}, ${Math.random()})`
//   })
// }

// function move () {
//   requestAnimationFrame(move)
//   canvas.remove()
//   dots.forEach(dot => {
//     // 粒子位移
//     dot.x += dot.xa
//     dot.y += dot.ya

//     let r = dot.r
//     // 遇到边界将加速度反向
//     dot.xa *= dot.x > canvas.width - r || dot.x < r ? -1 : 1
//     dot.ya *= dot.y > canvas.height - r || dot.y < r ? -1 : 1

//     canvas.add(
//       new Circle({
//         zIndex: dot.zIndex,
//         r: r,
//         x: dot.x,
//         y: dot.y,
//         fill: dot.color
//       })
//     )
//   })
//   canvas.draw()
// }

// canvas.animate(move)
