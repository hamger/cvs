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
// drawEllipse(ctx, 100, 100, 50, 80)

// ctx.translate(100, 100)
// ctx.transform(1, 0, 0, 1, 0, 0)
// ctx.scale(2, 2)
// ctx.rotate((40 * Math.PI) / 180)
ctx.shadowColor = '#333'
ctx.shadowOffsetX = 12
ctx.shadowOffsetY = 12
ctx.shadowBlur = 10
ctx.fillRect(0, 0, 100, 100)

function loadImage (url) {
  return new Promise(function (resolve, reject) {
    const image = new Image()

    image.onload = function () {
      resolve(image)
    }

    image.onerror = function () {
      reject(new Error('Could not load image at ' + url))
    }

    image.src = url
  })
}

loadImage('https://avatars3.githubusercontent.com/u/20814333?s=40&v=4').then(img => {
  console.log(img)
  ctx.drawImage(img, 300, 300)
})
