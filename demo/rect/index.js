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
cvs.add(
  new Rect({
    x: 400,
    y: 100,
    w: 200,
    h: 100,
    borderRadius: [5, 10],
  })
)
cvs.add(
  new Rect({
    x: 100,
    y: 350,
    w: 200,
    h: 100,
    borderRadius: [5, 10, 15],
  })
)
cvs.add(
  new Rect({
    x: 400,
    y: 350,
    w: 200,
    h: 100,
    borderRadius: [5, 10, 15, 30],
  })
)

cvs.draw()
