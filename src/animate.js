import Tween from './Animate/tween'
import { colorPalette } from './Animate/colorAnimate'

function circling (element, option) {
  const { opt: ele } = element
  const relativeX = option.relativeX || 0
  const relativeY = option.relativeY || 0
  const vpx = option.vpx
  const vpy = option.vpy
  const r = option.r || 100
  const speed = option.speed || 0.05
  ele.x = vpx + r * Math.cos(ele.angle) - relativeX
  ele.y = vpy + r * Math.sin(ele.angle) - relativeY
  ele.angle += speed
}
function elliptic (element, option) {
  const { opt: ele } = element
  const relativeX = option.relativeX || 0
  const relativeY = option.relativeY || 0
  const vpx = option.vpx
  const vpy = option.vpy
  const radiusX = option.radiusX || 100
  const radiusY = option.radiusY || 80
  const speed = option.speed || 0.05
  ele.angle += speed
  ele.x = vpx + radiusX * Math.cos(ele.angle) - relativeX
  ele.y = vpy + radiusY * Math.sin(ele.angle) - relativeY
}

function line (element, option) {
  const { opt: ele } = element
  const endX = option.endX
  const endY = option.endY
  const time = option.time
  const type = option.type || 'Linear'
  let start, x, y
  if (!ele.recordLine) {
    start = 0
    ele.recordLine = {
      start: 0,
      sx: ele.x,
      sy: ele.y,
    }
  } else {
    start = ele.recordLine.start
  }
  if (type instanceof Array) {
    x = Tween[type[0]][type[1]](start, ele.recordLine.sx, endX, time)
    y = Tween[type[0]][type[1]](start, ele.recordLine.sy, endY, time)
  } else if (typeof type === 'string') {
    x = Tween[type](start, ele.recordLine.sx, endX, time)
    y = Tween[type](start, ele.recordLine.sy, endY, time)
  }
  if (Math.abs(ele.x - endX) < 0.1 && Math.abs(ele.y - endY) < 0.1) {
    ele.x = endX
    ele.y = endY
  } else {
    ele.x = x
    ele.y = y
    ele.recordLine.start += 10
  }
}
function parabola (element, option) {
  const { opt: ele, ctx } = element
  const endX = option.endX
  const endY = option.endY
  const time = option.time
  const type = option.type || 'Linear'
  let a = 0.0004
  let b, c
  let start, x
  if (!ele.recordParabola) {
    start = 0
    b = ((ele.y - endY) - a * (Math.pow(ele.x, 2) - Math.pow(endX, 2))) / (ele.x - endX)
    c = ele.y - a * Math.pow(ele.x, 2) - b * ele.x
    ele.recordParabola = {
      start: 0,
      sx: ele.x,
      sy: ele.y,
      b,
      c,
    }
  } else {
    start = ele.recordParabola.start
    b = ele.recordParabola.b
    c = ele.recordParabola.c
  }
  if (type instanceof Array) {
    x = Tween[type[0]][type[1]](start, ele.recordParabola.sx, endX, time)
  } else if (typeof type === 'string') {
    x = Tween[type](start, ele.recordParabola.sx, endX, time)
  }
  if (Math.abs(ele.x - endX) < 0.1 && Math.abs(ele.y - endY) < 0.1) {
    ele.x = endX
    ele.y = endY
  } else {
    ele.x = x
    ele.y = (a * ele.x * ele.x + b * ele.x + c)
    ele.recordParabola.start += 10
  }
}

// var palette = colorPalette([
//   [0, 'red'],
//   [0.7, 'orange'],
//   [0.17, 'yellow'],
//   [0.22, 'green'],
//   [0.42, 'cyan'],
//   [0.82, 'blue'],
//   [0.90, 'purple'],
// ])

const gradientColor = (ele, options) => {
  const { ctx, opt } = ele
  const { colors } = options
  const palette = colorPalette(colors)
  var width = ctx.width, height = ctx.height
  var start = 0
  const len = palette.length / 4
  var end = len
  const draw = (offset) => {
    ctx.clearRect(0, 0, width, height)
    console.log(offset)
    ctx.fillStyle = 'rgba(' + [
      palette[offset * 4 + 0],
      palette[offset * 4 + 1],
      palette[offset * 4 + 2],
      palette[offset * 4 + 3]
    ] + ')'
    ctx.arc(width / 2, height / 2, height / 2, 0, 2 * Math.PI)
    ctx.fill()
  }

  setInterval(() => {
    start++
    if (start > end) {
      start = 0
    }
    draw(Tween.Linear(start, 0, len, end).toFixed(0))
  }, 10)
}

const Animate = {
  circling,
  elliptic,
  line,
  parabola,
  gradientColor
}

export default Animate
