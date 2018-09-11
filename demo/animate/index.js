import { Canvas, Circle } from '@'
let canvas = new Canvas({
  container: document.getElementById('container')
})
const dotCount = 3
let r = 10

let dots = []
for (var i = 0; i < dotCount; i++) {
  r = r + 0.5
  var x = Math.random() * canvas.width
  var y = Math.random() * canvas.height
  let dot = new Circle({
    angle: 0,
    zIndex: Math.random() * dotCount,
    r,
    x,
    y,
    fill: 'red'
  })
  dots.push(dot)
}

function move () {
  canvas.remove()
  dots.forEach((dot, i) => {
    if (i === 0) {
      dot.circling({
        vpx: canvas.width / 2,
        vpy: canvas.height / 2,
        r: 200,
        speed: 0.01
      })
    } else if (i === 1) {
      dot.elliptic({
        vpx: canvas.width / 2,
        vpy: canvas.height / 2,
        radiusX: 400,
        radiusY: 200,
        speed: 0.03
      })
    } else {
      dot.line({
        endX: canvas.width / 2,
        endY: canvas.height / 2,
        time: 1000
      })
    }
    canvas.add(
      dot
    )
  })
  canvas.draw()
}

canvas.animate(move)
