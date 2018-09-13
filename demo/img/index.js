// import { Canvas, Img } from '../../dist/cvs'
import { Canvas, Img } from '@'
var canvas = new Canvas({
  container: document.getElementById('container')
})

// 准备图片元素对象
var img = new Image()
img.src = 'https://zos.alipayobjects.com/rmsportal/nAVchPnSaAWncPj.png'

// 当图片准备以后再绘制
img.onload = function () {
  // 绘制图片,按照图片本身的大小进行加载
  let dx = 0
  let dy = 0
  var element = new Img({
    img: img,
    dx: dx,
    dy: dy,
    cache: true
  })
  canvas.add(element)
  function move () {
    element.attr({
      dx: dx++,
      dy: dy++
    })
    canvas.draw()
  }
  canvas.animate(move)
}
