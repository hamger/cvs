import SvgPath from 'svg-path-to-canvas'
// function drawEllipse (ctx, x, y, rx, ry) {
//   var r = Math.min(rx, ry),
//     scaleX = rx / r,
//     scaleY = ry / r

//   ctx.lineWidth = 6
//   ctx.save()
//   ctx.scale(scaleX, scaleY)

//   ctx.beginPath()
//   ctx.arc(x / scaleX, y / scaleY, r, 0, Math.PI * 2, true)
//   ctx.closePath()
//   ctx.restore()
//   ctx.stroke()
// }

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

const d =
  'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z'

const sp = new SvgPath(d)
const [cx, cy] = sp.center

sp.save()
  .beginPath()
  .translate(100, 100)
  .scale(2)
  .lineWidth(3)
  .to(ctx)
  .stroke()
// sp.save()
//   .beginPath()
//   .translate(-cx, -cy)
//   .rotate(45)
//   .scale(10)
//   .translate(cx, cy)
//   .translate(350, 350)
//   .strokeStyle('red')
//   .lineWidth(3)
//   .to(ctx)
//   .stroke()
// drawEllipse(ctx, 100, 100, 50, 80)

// ctx.translate(190, 190)
// // ctx.transform(1, 0.2, 0.2, 1, 0, 0)
// // ctx.scale(2, 2)
// ctx.rotate((45 * Math.PI) / 180)
// ctx.translate(-190, -190)
// ctx.fillRect(100, 100, 100, 100)

// function loadImage (url) {
//   return new Promise(function (resolve, reject) {
//     const image = new Image()

//     image.onload = function () {
//       resolve(image)
//     }

//     image.onerror = function () {
//       reject(new Error('Could not load image at ' + url))
//     }

//     image.src = url
//   })
// }

// loadImage('https://avatars3.githubusercontent.com/u/20814333?s=40&v=4').then(img => {
//   ctx.drawImage(img, 100, 100)
// })
