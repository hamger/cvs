import Track from './track'

let id = 0
export default class Element {
  constructor (opt) {
    this.id = id++
    this.execArr = []
    this.opt = {
      cache: false,
      visible: true,
      zIndex: 0
    }
    this.noHover = {}
    this.attr(opt)
    if (this.opt.cache) {
      // 为离屏 canvas 添加 padding ，使渲染更完整

      this.p = 2
      // 记录线条宽度，离屏渲染需要遇到
      this.lw = 0
      if (this.opt.stroke && this.opt.lineWidth) {
        this.lw = this.opt.lineWidth / 2
      }
    }
    this.finished = false
    this.tracks = []
    this.trackIndex = 0
  }
  // 设置上下文属性
  setAttr (ctx2) {
    let ctx = ctx2 || this.ctx
    for (let key in this.opt) {
      if (key === 'opacity') ctx.globalAlpha = this.opt[key]
      else if (key === 'stroke') ctx.strokeStyle = this.opt[key]
      else if (key === 'fill') ctx.fillStyle = this.opt[key]
      else if (
        /(shadowColor|shadowBlur|shadowOffsetX|shadowOffsetY|lineCap|lineJoin|lineWidth|miterLimit|font|textAlign|textBaseline|globalCompositeOperation)/.test(
          key
        )
      ) {
        ctx[key] = this.opt[key]
      } else if (key === 'transform') {
        this.execArr.forEach(item => {
          let k = Object.keys(item)[0]
          let val = item[k]
          if (/(scale|translate|transform|setTransform)/.test(k)) {
            ctx[k](...val)
          }
          if (k === 'rotate') ctx[k]((val * Math.PI) / 180)
        })
      }
    }
  }
  // 填充或描边
  dye (ctx2) {
    let ctx = ctx2 || this.ctx
    if (this.opt.stroke) ctx.stroke()
    else ctx.fill()
  }
  // 设置/获取绘制属性
  attr (opt, isHover) {
    if (typeof opt === 'string') {
      return this.opt[opt]
    }
    // 更新属性
    Object.assign(this.opt, opt)
    // 设置转换函数
    if (opt.transform) {
      this.execArr = []
      opt.transform.forEach(item => {
        this.execArr.push(item)
      })
    }
    // 由 hover 引起的属性变化，不更新 noHover
    if (isHover) return
    if (this.opt.hover) {
      for (let key in this.opt.hover) {
        this.noHover[key] = this.opt[key]
      }
    }
  }
  on (eventType, callback) {
    this[eventType] = callback
  }
  off (eventType) {
    this[eventType] = null
  }
  runTrack (animateTime) {
    let track = this._curTrack()
    if (animateTime <= this._curTrackDelay()) {
      return false
    } else if (
      animateTime > this._curTrackDelay() &&
      animateTime < this._curTrackDelay() + track.duration
    ) {
      // 当前运动进度
      console.log(this._curTrackDelay())
      let p = (animateTime - this._curTrackDelay()) / track.duration
      track.loop(p)
    } else if (track.iterationCount > track.cycleIndex + 1) {
      console.log('cycle:' + track.cycleIndex)
      track.cycleIndex++
    } else if (
      animateTime >= this._curTrackDelay() + track.duration &&
      this.tracks[this.trackIndex + 1]
    ) {
      console.log('trackIndex:' + track.cycleIndex)
      this.trackIndex++
    } else {
      console.log('finished:' + track.cycleIndex)
      this.finished = true
    }
  }
  _curTrack () {
    return this.tracks[this.trackIndex]
  }
  _curTrackDelay () {
    if (!this.tracks.length) return
    let track = this._curTrack()
    let i = this.trackIndex
    if (i === 0) {
      if (track.iterationCount > track.cycleIndex) {
        // let cycleCount = track.cycleIndex
        return track.delay + track.duration * track.cycleIndex
      } else {
        return track.delay
      }
    }
    let sum = 0
    for (let j = 1; j <= i; j++) {
      sum +=
        this.tracks[j - 1].delay +
        this.tracks[j - 1].duration +
        this.tracks[j].delay
    }
    console.log(track)
    if (track.iterationCount > track.cycleIndex) {
      let cycleCount = track.cycleIndex - 1
      console.log(sum + track.duration * cycleCount)
      return sum + track.duration * cycleCount
    } else {
      return sum
    }
  }
  _addTrackUnit (track) {
    if (track instanceof Track) {
      track.$ele = this
      this.tracks.push(track)
    } else {
      throw Error('Function addTrack only accept the instance of Track.')
    }
  }
  addTrack (track) {
    if (track instanceof Array) {
      track.forEach(item => {
        this._addTrackUnit(item)
      })
    } else {
      this._addTrackUnit(track)
    }
  }
  _removeTrackUnit (track) {
    this.tracks.some((item, index) => {
      if (item.id === track.id) {
        this.children.splice(index, 1)
        return true
      }
    })
  }
  removeTrack (track) {
    if (!track) {
      this.tracks = []
    }
    if (track instanceof Array) {
      track.forEach(item => {
        this._removeTrackUnit(item)
      })
    } else {
      this._removeTrackUnit(track)
    }
  }
}
