import { Canvas, Circle } from '@'
let canvas = new Canvas({
  container: document.getElementById('container')
})

const dotSpeed = 1
const dotCount = 80
let r = 10

let dots = []
for (var i = 0; i < dotCount; i++) {
  r = r + 0.5
  var x = Math.random() * (canvas.width - 2 * r) + r
  var y = Math.random() * (canvas.height - 2 * r) + r
  // (Math.random() * 2 - 1) 用来表示随机的运动方向
  var xa = (Math.random() * 2 - 1) * dotSpeed
  var ya = (Math.random() * 2 - 1) * dotSpeed
  var element = new Circle({
    zIndex: Math.random() * dotCount,
    r: r,
    x: x,
    y: y,
    fill: `rgba(${Math.random() * 255}, ${Math.random() *
      255}, ${Math.random() * 255}, ${Math.random()})`
  })
  canvas.add(element)
  dots.push({
    x: x,
    y: y,
    xa: xa,
    ya: ya,
    element: element
  })
}

// function move () {
//   requestAnimationFrame(move)
//   dots.forEach(dot => {
//     // 粒子位移
//     dot.x += dot.xa
//     dot.y += dot.ya
//     let r = dot.r
//     // 遇到边界将加速度反向
//     dot.xa *= dot.x > canvas.width - r || dot.x < r ? -1 : 1
//     dot.ya *= dot.y > canvas.height - r || dot.y < r ? -1 : 1
//     dot.element.attr({
//       x: dot.x,
//       y: dot.y
//     })
//   })
//   canvas.draw()
// }

// requestAnimationFrame(move)

canvas.draw()
