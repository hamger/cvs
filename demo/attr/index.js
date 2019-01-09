import { Scene, Path } from '#'
let scene = new Scene({ containerId: 'container' })
let layer = scene.layer()

const dotSpeed = 1.5
const dotCount = 60
for (let i = 0; i < dotCount; i++) {
  let r = Math.random() * 30 + 10
  layer.append(
    new Path({
      d: {
        type: 'circle',
        r: r
      },
      x: Math.random() * (layer.width - 2 * r),
      y: Math.random() * (layer.height - 2 * r),
      xa: (Math.random() * 2 - 1) * dotSpeed,
      ya: (Math.random() * 2 - 1) * dotSpeed,
      zIndex: Math.random() * dotCount,
      fill: `rgba(${Math.random() * 255}, ${Math.random() *
        255}, ${Math.random() * 255}, ${Math.random()})`
    })
  )
}

var timer = null
requestAnimationFrame(function loopUnit () {
  timer = requestAnimationFrame(loopUnit)
  layer.clear()
  layer.children.forEach(ele => {
    const x = ele.attr('x') + ele.attr('xa')
    const y = ele.attr('y') + ele.attr('ya')
    const r = ele.attr('d').r
    if (x > layer.width - 2 * r - 1 || x < 0) ele.attr({xa: v => -v})
    if (y > layer.height - 2 * r - 1 || y < 0) ele.attr({ya: v => -v})
    ele.attr({x, y})
  })
  layer.draw()
})

// setTimeout(function () {
//   cancelAnimationFrame(timer)
// }, 18000)
