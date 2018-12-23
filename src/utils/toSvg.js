
// 矩形转成 svg 路径
export function rect2svg (d) {
  if (!d.borderRadius) {
    return `M ${d.x} ${d.y} h ${d.w} v ${d.h} h ${-d.w} z`
  } else {
    let r = [],
      radius = d.borderRadius,
      x = d.x,
      y = d.y,
      w = d.w,
      h = d.h
    if (radius instanceof Array) {
      if (radius.length >= 4) r = radius.slice(0, 4)
      else if (radius.length >= 2) {
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
export function circle2svg (d) {
  let r = []
  if (typeof d.r === 'number') r = [d.r, d.r]
  else r = d.r
  return `M ${d.cx - r[0]} ${d.cy - r[1]} a ${r[0]} ${r[1]} ${d.rotate ||
    0} 1 0 0 1 z`
}
