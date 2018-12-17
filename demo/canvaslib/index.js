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

;(function () {
  var canvas = document.getElementById('canvas')
  var ctx = canvas.getContext('2d')
  drawEllipse(ctx, 100, 100, 50, 80)
})()
