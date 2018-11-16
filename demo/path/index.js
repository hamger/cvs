import { Scene, Path } from '#'
let scene = new Scene({
  containerId: 'container'
})

let cvs = scene.layer()

cvs.add(
  new Path({
    path: 'M 300 100' + 'L 700 500',
    stroke: 'red',
    startArrow: true,
    endArrow: {
      angle: 15,
      len: 30,
    }
  })
)

cvs.add(
  new Path({
    startArrow: true,
    endArrow: true,
    path:
      'M 10 10' +
      'L 100 100' +
      'l 30 -50' +
      'C 100 100 200 200 300 200' +
      's 50 50 100 100' +
      'T 130 500' +
      'a 0 50 50 -90 180',
    stroke: '#454'
  })
)

cvs.draw()
