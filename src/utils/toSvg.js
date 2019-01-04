import { oneOrTwoValues, error, getMatrix } from './utils'
import SvgPath from '../svgPath'

export default function toSvg (d) {
  if (typeof d === 'string') return new SvgPath(d)
  if (typeof d === 'object') {
    let pas = ''
    if (d.path) pas = d.path
    else if (d.type === 'rect') pas = rect2svg(d)
    else if (d.type === 'circle') pas = circle2svg(d)
    else error('unexpected type of path.')
    let p = new SvgPath(pas)
    let m = getMatrix(d)
    p.transform(...m)
    return p
  }
}

// 矩形转成 svg 路径
function rect2svg (d) {
  if (!d.borderRadius) {
    return `M ${d.x || 0} ${d.y || 0} h ${d.w} v ${d.h} h -${d.w} z`
  } else {
    let r = [],
      radius = d.borderRadius,
      x = d.x || 0,
      y = d.y || 0,
      w = d.w,
      h = d.h
    if (radius instanceof Array) {
      if (radius.length >= 4) r = radius.slice(0, 4)
      else if (radius.length === 3) {
        r[1] = r[3] = radius[1]
        r[0] = radius[0]
        r[2] = radius[2]
      } else if (radius.length === 2) {
        r[0] = r[2] = radius[0]
        r[1] = r[3] = radius[1]
      }
    } else r = new Array(4).fill(radius)
    const aCmd = r.map((item, index) => {
      if (index === 0) return `a ${item} ${item} 0 0 1 ${item} -${item}`
      if (index === 1) return `a ${item} ${item} 0 0 1 ${item} ${item}`
      if (index === 2) return `a ${item} ${item} 0 0 1 -${item} ${item}`
      if (index === 3) return `a ${item} ${item} 0 0 1 -${item} -${item}`
    })
    const lCmd = r.map((item, index) => {
      if (index === 0) return `h ${w - r[0] - r[1]}`
      if (index === 1) return `v ${h - r[1] - r[2]}`
      if (index === 2) return `h ${(w - r[2] - r[3]) * -1}`
    })
    return `M ${x} ${y + r[0]} ${aCmd[0]} ${lCmd[0]} ${aCmd[1]} ${lCmd[1]} ${
      aCmd[2]
    } ${lCmd[2]} ${aCmd[3]} z`
  }
}

// 圆形、椭圆转成 svg 路径
function circle2svg (d) {
  const [rx, ry] = oneOrTwoValues(d.r),
    { cx = rx, cy = ry, rotate = 0 } = d
  const calc = calculate({ cx, cy, rx, ry, rotate })
  const start = calc(0)
  const end = calc(-1)
  return `M ${start.x} ${start.y} A ${rx} ${ry} ${rotate} 1 1 ${end.x} ${
    end.y
  } z`
}

function calculate ({ cx, cy, rx, ry, rotate }) {
  return function (angle) {
    const rnx = rx * Math.cos((angle * Math.PI) / 180)
    const rny = ry * Math.sin((angle * Math.PI) / 180)
    const x =
      cx +
      rnx * Math.cos((rotate * Math.PI) / 180) -
      rny * Math.sin((rotate * Math.PI) / 180)
    const y =
      cy +
      rnx * Math.sin((rotate * Math.PI) / 180) +
      rny * Math.cos((rotate * Math.PI) / 180)
    return { x, y }
  }
}
