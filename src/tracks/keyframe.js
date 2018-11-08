import easing from '../easing'
import Track from '../track'
import { loadedResources } from '../resource'

export default class Keyframe extends Track {
  constructor (opt) {
    super(opt)
    this.opt = Object.assign({ keyframe: [] }, opt)
    let p = 1 / this.keyframe.length
    this.keyframe = this.keyframe.map((element, index) => {
      return Object.assign({ offset: p * (index + 1) }, element)
    })
    console.log(this.keyframe)
  }
  loop (t) {
    const p2 = t / this.duration
    // 设置了折返的的情况
    if (this.retrace) {
      let p = 0
      if (p2 <= 0.5) {
        p = easing[this.easing](p2 * 2)
        this.changeTexture(p, this.keyframe)
      } else {
        let p3 = 1 - (p2 - 0.5) * 2
        // 防止折返后终点不在起点上
        if ((1 - p2) * this.duration < 80) p3 = 0
        p = easing[this.easing](p3)
        this.changeTexture(p, this.keyframe)
      }
    } else {
      this.changeTexture(p2, this.keyframe)
    }
  }
  changeTexture (p, keyframe) {
    for (let i = 0, len = keyframe.length; i < len; i++) {
      let curFrame = keyframe[i]
      if (curFrame.offset >= p) {
        if (curFrame.texture) {
          this.$ele.attr({ img: loadedResources.get(curFrame.texture) })
        }
        return
      }
    }
  }
}
