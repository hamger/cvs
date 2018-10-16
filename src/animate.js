import Tween from './Animate/tween'

// 默认运动速度
const defaultSpeed = 0.04

function circling (element, option) {
  const { opt: ele } = element
  const relativeX = option.relativeX || 0
  const relativeY = option.relativeY || 0
  const vpx = option.vpx
  const vpy = option.vpy
  const r = option.r || 100
  const speed = option.speed || defaultSpeed
  ele.x = vpx + r * Math.cos(ele.angle) - relativeX
  ele.y = vpy + r * Math.sin(ele.angle) - relativeY
  ele.angle += speed
}

// 椭圆运动
function elliptic (element, option) {
  const { opt: ele } = element
  const relativeX = option.relativeX || 0
  const relativeY = option.relativeY || 0
  const vpx = option.vpx
  const vpy = option.vpy
  const radiusX = option.radiusX || 100
  const radiusY = option.radiusY || 80
  const speed = option.speed || defaultSpeed
  ele.angle += speed
  ele.x = vpx + radiusX * Math.cos(ele.angle) - relativeX
  ele.y = vpy + radiusY * Math.sin(ele.angle) - relativeY
}

// 直线运动
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

// 半抛物线运动
function parabola (element, option) {
  const { opt: ele } = element
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

// 调色板
const colorPalette = (gradient) => {
  let canvas = document.createElement('canvas')
  canvas.width = '1'
  canvas.height = '256'
  let ele = canvas.getContext('2d'),
    grad = ele.createLinearGradient(0, 0, 1, 256)
  gradient.forEach(function (item) {
    grad.addColorStop(item[0], item[1])
  })
  ele.fillStyle = grad
  ele.fillRect(0, 0, 1, 256)
  return ele.getImageData(0, 0, 1, 256).data
}

// 颜色缓动
const gradientColor = (ele, options) => {
  const { ctx, opt } = ele
  let width = ctx.width, height = ctx.height
  let start = 0
  let begin = 0
  let during = options.during
  let type = options.type || 'Linear'
  let colorArr = (ele.recordParam && ele.recordParam.colorArr) || colorPalette(options.colors)

  let end = ((colorArr.length / 4) / during)

  if (!ele.recordParam) {
    ele.recordParam = {
      start,
      begin,
      end,
      during,
      colorArr
    }
  } else {
    start = ele.recordParam.start++
    begin = ele.recordParam.begin
    end = ele.recordParam.end
  }
  let offset
  if (type instanceof Array) {
    offset = Tween[type[0]][type[1]](start, begin, end, during).toFixed(0)
  } else if (typeof type === 'string') {
    offset = Tween[type](start, begin, end, during).toFixed(0)
  }
  if (options.period && offset > (colorArr.length / 4)) {
    ele.recordParam.start = 0
  }
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = 'rgba(' + [
    colorArr[offset * 4 + 0],
    colorArr[offset * 4 + 1],
    colorArr[offset * 4 + 2],
    colorArr[offset * 4 + 3]
  ] + ')'
  ctx.fill()
}

const Animate = {
  circling,
  elliptic,
  line,
  parabola,
  colorPalette,
  gradientColor
}

export default Animate
