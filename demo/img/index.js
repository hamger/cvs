// import { Canvas, Img } from '../../dist/cvs'
import { Canvas, Img } from '@'
var canvas = new Canvas({
  container: document.getElementById('container')
})

canvas.addElement(
  new Img({
    img: 'https://zos.alipayobjects.com/rmsportal/nAVchPnSaAWncPj.png',
    dx: 200,
    dy: 200
  })
)

canvas.draw()

// // 准备图片元素对象
// var img = new Image()
// img.src = 'https://zos.alipayobjects.com/rmsportal/nAVchPnSaAWncPj.png'

// // 当图片准备以后再绘制
// img.onload = function () {
//   // 绘制图片,按照图片本身的大小进行加载
//   canvas.addElement(
//     new Img({
//       img: img,
//       dx: 80,
//       dy: 80,
//       dw: 200,
//       dh: 200,
//       sx: 20,
//       sy: 30,
//       sw: 100,
//       sh: 100
//     })
//   )
//   canvas.draw()
// }
