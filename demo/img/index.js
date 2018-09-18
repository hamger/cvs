import { Cvs, Img } from '@'
var cvs = new Cvs({
  container: document.getElementById('container')
})

var img = new Image()
img.src = 'http://olislpb6q.bkt.clouddn.com/safari.png'

img.onload = function () {
  var element = new Img({
    img: img,
    dx: 200,
    dy: 100,
    transform: [
      {rotate: 10},
      {scale: [1.5, 1.1]}
    ]
  })
  cvs.add(element)
  cvs.draw()
}
