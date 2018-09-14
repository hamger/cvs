import { Cvs, Text } from '@'
var cvs = new Cvs({
  container: document.getElementById('container')
})

cvs.add(
  new Text({
    text: 'hello',
    x: 89,
    y: 76,
    font: '48px serif'
  })
)

cvs.add(
  new Text({
    text: 'hanger',
    x: 189,
    y: 76,
    fontSize: 43
  })
)
cvs.draw()
