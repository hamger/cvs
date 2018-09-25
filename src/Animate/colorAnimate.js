/**
 * 调色板
 * @param {Array} gradient 透明度对应颜色变化
 */
export function colorPalette (gradient) {
  var canvas = document.createElement('canvas')
  canvas.width = '1'
  canvas.height = '256'
  // document.body.appendChild(canvas); // debug
  var ele = canvas.getContext('2d'),
    grad = ele.createLinearGradient(0, 0, 1, 256)
  gradient.forEach(function (item) {
    grad.addColorStop(item[0], item[1])
  })
  ele.fillStyle = grad
  ele.fillRect(0, 0, 1, 256)
  return ele.getImageData(0, 0, 1, 256).data
}
