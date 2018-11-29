import Element from '../element'
import {error} from '../utils'
export default class Rect extends Element {
  constructor (opt) {
    super(opt)
    if (this.attr('cache')) this.cacheDraw()
  }
  draw (ctx) {
    ctx.save()
    if (this.cache) {
      ctx.drawImage(this.cacheCanvas, this.opt.x - this.lw, this.opt.y - this.lw)
    } else {
      this.drawUnit()
    }
    ctx.restore()
  }
  drawPath (cacheCtx) {
    let ctx = cacheCtx || this.ctx
    ctx.beginPath()
    if (cacheCtx) {
      if (this.attr('borderRadius')) this.drawRoundRect(ctx, this.lw, this.lw)
      else ctx.rect(this.lw, this.lw, this.opt.w, this.opt.h)
    } else {
      if (this.attr('borderRadius')) this.drawRoundRect(ctx, this.opt.x, this.opt.y)
      else ctx.rect(this.opt.x, this.opt.y, this.opt.w, this.opt.h)
    }
    // ctx.rect(this.opt.x, this.opt.y, this.opt.w, this.opt.h)
    // if (this.attr('borderRadius')) {
    //   this.drawRoundRect(cacheCtx || null)
    // } else {
    //   if (cacheCtx) ctx.rect(this.lw, this.lw, this.opt.w, this.opt.h)
    //   else ctx.rect(this.opt.x, this.opt.y, this.opt.w, this.opt.h)
    // }
  }
  drawRoundRect (ctx, rx, ry) {
    const x = rx
    const y = ry
    const { w, h, borderRadius: r } = this.opt
    const posA = [x + r, y]
    const posB = [x + w, y]
    const posC = [x + w, y + h]
    const posD = [x, y + h]
    const posE = [x, y]
    if (r instanceof Array) {
      if (r.length === 2) {
        const r1 = r[0]
        const r2 = r[1]
        const posa1 = [x + r1, y]
        const posa2 = [x + w - r2, y]
        const posb1 = [x + w, y + r2]
        const posb2 = [x + w, y + h - r1]
        const posc1 = [x + w - r1, y + h]
        const posc2 = [x + r2, y + h]
        const posd1 = [x, y + h - r2]
        const posd2 = [x, y + r1]
        ctx.beginPath()
        ctx.moveTo(posa1[0], posa1[1])
        ctx.lineTo(posa2[0], posa2[1])
        ctx.arcTo(posB[0], posB[1], posb1[0], posb1[1], r2)
        ctx.lineTo(posb2[0], posb2[1])
        ctx.arcTo(posC[0], posC[1], posc1[0], posc1[1], r1)
        ctx.lineTo(posc2[0], posc2[1])
        ctx.arcTo(posD[0], posD[1], posd1[0], posd1[1], r2)
        ctx.lineTo(posd2[0], posd2[1])
        ctx.arcTo(posE[0], posE[1], posa1[0], posa1[1], r1)
      } else if (r.length === 3) {
        const r1 = r[0]
        const r2 = r[1]
        const r3 = r[2]
        const posa1 = [x + r1, y]
        const posa2 = [x + w - r2, y]
        const posb1 = [x + w, y + r2]
        const posb2 = [x + w, y + h - r3]
        const posc1 = [x + w - r3, y + h]
        const posc2 = [x + r2, y + h]
        const posd1 = [x, y + h - r2]
        const posd2 = [x, y + r1]
        ctx.beginPath()
        ctx.moveTo(posa1[0], posa1[1])
        ctx.lineTo(posa2[0], posa2[1])
        ctx.arcTo(posB[0], posB[1], posb1[0], posb1[1], r2)
        ctx.lineTo(posb2[0], posb2[1])
        ctx.arcTo(posC[0], posC[1], posc1[0], posc1[1], r3)
        ctx.lineTo(posc2[0], posc2[1])
        ctx.arcTo(posD[0], posD[1], posd1[0], posd1[1], r2)
        ctx.lineTo(posd2[0], posd2[1])
        ctx.arcTo(posE[0], posE[1], posa1[0], posa1[1], r1)
      } else if (r.length === 4) {
        const r1 = r[0]
        const r2 = r[1]
        const r3 = r[2]
        const r4 = r[3]
        const posa1 = [x + r1, y]
        const posa2 = [x + w - r2, y]
        const posb1 = [x + w, y + r2]
        const posb2 = [x + w, y + h - r3]
        const posc1 = [x + w - r3, y + h]
        const posc2 = [x + r4, y + h]
        const posd1 = [x, y + h - r4]
        const posd2 = [x, y + r1]
        ctx.beginPath()
        ctx.moveTo(posa1[0], posa1[1])
        ctx.lineTo(posa2[0], posa2[1])
        ctx.arcTo(posB[0], posB[1], posb1[0], posb1[1], r2)
        ctx.lineTo(posb2[0], posb2[1])
        ctx.arcTo(posC[0], posC[1], posc1[0], posc1[1], r3)
        ctx.lineTo(posc2[0], posc2[1])
        ctx.arcTo(posD[0], posD[1], posd1[0], posd1[1], r4)
        ctx.lineTo(posd2[0], posd2[1])
        ctx.arcTo(posE[0], posE[1], posa1[0], posa1[1], r1)
      } else {
        error('please provide correct parameter')
      }
    } else {
      ctx.beginPath()
      ctx.moveTo(posA[0], posA[1])
      ctx.arcTo(posB[0], posB[1], posC[0], posC[1], r)
      ctx.arcTo(posC[0], posC[1], posD[0], posD[1], r)
      ctx.arcTo(posD[0], posD[1], posE[0], posE[1], r)
      ctx.arcTo(posE[0], posE[1], posA[0], posA[1], r)
    }
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    this.cacheCanvas.width = this.opt.w + this.lw * 2
    this.cacheCanvas.height = this.opt.h + this.lw * 2
    this.drawUnit(this.cacheCanvas.getContext('2d'))
  }
}
