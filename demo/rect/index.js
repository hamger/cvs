import { Cvs, Rect } from '@'
let cvs = new Cvs({
  container: document.getElementById('container')
})

cvs.add(
  new Rect({
    x: 100,
    y: 100,
    w: 200,
    h: 100,
    borderRadius: 5,
  })
)

cvs.draw()
