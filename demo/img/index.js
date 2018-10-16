import { Cvs, Img } from '@'
let cvs = new Cvs({
  container: document.getElementById('container')
})

let img = new Image()
img.src = 'http://olislpb6q.bkt.clouddn.com/safari.png'

img.onload = function () {
  let element = new Img({
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
