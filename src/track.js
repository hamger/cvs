let id = 0
export default class Track {
  constructor (opt) {
    this.id = id++
    if (!opt.easing) opt.easing = 'linear'
    Object.assign(this, opt)
  }
}
