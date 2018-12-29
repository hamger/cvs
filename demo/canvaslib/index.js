
function drawEllipse (ctx, x, y, rx, ry) {
  var r = Math.min(rx, ry),
    scaleX = rx / r,
    scaleY = ry / r

  ctx.lineWidth = 6
  ctx.save()
  ctx.scale(scaleX, scaleY)

  ctx.beginPath()
  ctx.arc(x / scaleX, y / scaleY, r, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.restore()
  ctx.stroke()
}

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

// ctx.translate(190, 190)
ctx.transform(1, 0.2, 0.2, 1, 0, 0)
// ctx.scale(2, 2)
// ctx.rotate((45 * Math.PI) / 180)
// ctx.translate(-190, -190)
ctx.fillStyle = 'red'
ctx.save()
ctx.fillRect(100, 100, 100, 100)
// ctx.clearRect(0, 0, 800, 800)
ctx.fillStyle = 'blue'
ctx.restore()
ctx.fillRect(200, 200, 200, 200)

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
  ctx.drawImage(img, 100, 100)
  ctx.shadowColor = 'green'
  ctx.shadowOffsetX = 10
})
