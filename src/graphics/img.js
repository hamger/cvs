import Element from '../element'

// ctx.drawImage() 参数解释:
// https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
export default class Img extends Element {
  draw () {
    let img = this.img
    if (f.isString(this.img)) {
      img = new Image()
      img.src = this.img
      img.onload = () => {
        this.drawImg(img)
      }
    } else {
      this.drawImg(img)
    }
  }
  drawImg (img) {
    let ctx = this.ctx
    ctx.save()
    this.setGeneral()
    if (f.isDef(this.sw) && f.isDef(this.sh)) {
      ctx.drawImage(
        img,
        this.sx,
        this.sy,
        this.sw,
        this.sh,
        this.dx,
        this.dy,
        this.dw,
        this.dh
      )
    } else if (f.isDef(this.dw) && f.isDef(this.dh)) {
      ctx.drawImage(img, this.dx, this.dy, this.dw, this.dh)
    } else {
      ctx.drawImage(img, this.dx, this.dy)
    }
    ctx.restore()
  }
}
