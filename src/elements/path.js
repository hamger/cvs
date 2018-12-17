import Element from '../element'
import Circle from './circle'
import Rect from './rect'
// import { delBlank } from '../utils/utils'
import SvgPath from 'svg-path-to-canvas'
class Path extends Element {
  constructor (opt) {
    super(opt)
    this.path = new SvgPath(this.attr('path'))
  }
  get center () {
    return this.path.center
  }
  get bounds () {
    return this.path.bounds
  }
  setAttr (opt) {
    let p = this.path
    for (let key in opt) {
      if (key === 'stroke') p.strokeStyle(opt[key])
      else if (key === 'fill') p.fillStyle(opt[key])
      else if (/(lineCap|lineJoin|lineWidth)/.test(key)) {
        if (Array.isArray(opt[key])) p[key](...opt[key])
        else p[key](opt[key])
      } else if (/(transform)/.test(key)) {
        opt[key].forEach(item => {
          const [type, val] = Object.entries(item)[0]
          if (/(translate|rotate|scale|skew)/.test(type)) {
            if (Array.isArray(val)) p[type](...val)
            else p[type](val)
          }
        })
      }
    }
  }
  draw (ctx) {
    this.setAttr(this.attr())
    if (this.attr('stroke')) this.path.to(ctx).stroke()
    else this.path.to(ctx).fill()
  }
  outline (ctx, { x, y }) {
    return this.path.isPointInPath(x, y)
    // ctx.beginPath()
    // let path = delBlank(this.attr('path'))
    // let pathType = path.match(/[A-z]/g)
    // let pathVal = path
    //   .split(/[A-z]/)
    //   .filter(function (item) {
    //     // 过滤掉空的项
    //     return item !== ''
    //   })
    //   .map(function (item) {
    //     // 去除多余的空格
    //     return delBlank(item)
    //   })
    // pathType.forEach((item, index) => {
    //   let arr = []
    //   if (pathVal[index]) {
    //     if (/,/.test(pathVal[index])) {
    //       arr = pathVal[index].split(',').map(item => Number(item))
    //     } else {
    //       arr = pathVal[index].split(' ').map(item => Number(item))
    //     }
    //   }
    //   this.resolve(item, arr)
    //   // if (index === 0) {
    //   //   if (this.attr('startArrow')) {
    //   //     const end = pathVal[1].split(' ').map(item => {
    //   //       // 需要将字符串转化为数字
    //   //       return +item
    //   //     })
    //   //     const { angle, len } = this.attr('startArrow')
    //   //     this.drawArrow('start', item, arr, end, angle, len)
    //   //   }
    //   // }
    //   // if (index === pathType.length - 1) {
    //   //   if (this.attr('endArrow')) {
    //   //     const start = pathVal[pathType.length - 2].split(' ').map(item => {
    //   //       // 需要将字符串转化为数字
    //   //       return +item
    //   //     })
    //   //     const { angle, len } = this.attr('endArrow')
    //   //     this.drawArrow('end', item, start, arr, angle, len)
    //   //   }
    //   // }
    // })
  }
  resolve (type, val) {
    if (/(M|m)/.test(type)) {
      this.lastPoint = val
      this.ctx.moveTo(this.lastPoint[0], this.lastPoint[1])
    }
    if (/(L|l)/.test(type)) {
      if (type === 'l') {
        val.forEach((item, index) => {
          this.lastPoint[index] += item
        })
      } else this.lastPoint = val
      this.ctx.lineTo(this.lastPoint[0], this.lastPoint[1])
    }
    // 水平直线
    if (/(H|h)/.test(type)) {
      if (type === 'h') this.lastPoint[0] += val[0]
      else this.lastPoint[0] = val[0]
      this.ctx.lineTo(this.lastPoint[0], this.lastPoint[1])
    }
    // 垂直直线
    if (/(V|v)/.test(type)) {
      if (type === 'v') this.lastPoint[1] += val[0]
      else this.lastPoint[1] = val[0]
      this.ctx.lineTo(this.lastPoint[0], this.lastPoint[1])
    }
    if (/(A|a)/.test(type)) {
      let params = val
      if (type === 'a') {
        params[0] = this.lastPoint[0] + val[0]
        params[1] = this.lastPoint[1] + val[1]
      }
      params[3] = (val[3] * Math.PI) / 180
      params[4] = (val[4] * Math.PI) / 180
      params[5] = !!val[5]
      this.ctx.arc(...params)
      this.lastPoint = [
        params[0] + params[2] * Math.cos(params[4]),
        params[1] + params[2] * Math.sin(params[4])
      ]
    }
    // 三次贝塞尔曲线
    if (/(C|c|S|s)/.test(type)) {
      let params = []
      if (/(S|s)/.test(type)) {
        params[0] =
          this.lastPoint[0] * 2 - (this.lastCpoint[0] || this.lastPoint[0])
        params[1] =
          this.lastPoint[1] * 2 - (this.lastCpoint[1] || this.lastPoint[0])
      }
      if (/(c|s)/.test(type)) {
        val.forEach((item, index) => {
          params.push(this.lastPoint[index % 2] + item)
        })
      } else params = params.concat(val)
      this.ctx.bezierCurveTo(...params)
      this.lastPoint = [params[4], params[5]]
      this.lastCpoint = [params[2], params[3]]
    }
    // 二次贝塞尔曲线
    if (/(Q|q|T|t)/.test(type)) {
      let params = []
      if (/(T|t)/.test(type)) {
        params[0] =
          this.lastPoint[0] * 2 - (this.lastCpoint[0] || this.lastPoint[0])
        params[1] =
          this.lastPoint[1] * 2 - (this.lastCpoint[1] || this.lastPoint[0])
      }
      if (/(q|t)/.test(type)) {
        val.forEach((item, index) => {
          params.push(this.lastPoint[index % 2] + item)
        })
      } else params = params.concat(val)
      this.ctx.quadraticCurveTo(...params)
      this.lastPoint = [params[2], params[3]]
      this.lastCpoint = [params[0], params[1]]
    }
    // 闭合路径
    if (/(Z|z)/.test(type)) {
      this.ctx.closePath()
    }
  }
}

Path.Circle = Circle
Path.Rect = Rect

export default Path
