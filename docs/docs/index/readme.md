### Instrall

```bash
npm instrall cvs
```

### Usage

```js
import { Cvs, Circle } from 'cvs'
let cvs = new Cvs({
  container: document.getElementById('container')
})
const dotSpeed = 1
const dotCount = 60
let dots = []
for (var i = 0; i < dotCount; i++) {
  var r = Math.random() * 30 + 10
  var x = Math.random() * (cvs.width - 2 * r) + r
  var y = Math.random() * (cvs.height - 2 * r) + r
  var xa = (Math.random() * 2 - 1) * dotSpeed
  var ya = (Math.random() * 2 - 1) * dotSpeed
  var element = new Circle({
    zIndex: Math.random() * dotCount,
    r: r,
    x: x,
    y: y,
    fill: `rgba(${Math.random() * 255}, ${Math.random() *
      255}, ${Math.random() * 255}, ${Math.random()})`,
    cache: true
  })
  cvs.add(element)
  dots.push({
    x: x,
    y: y,
    xa: xa,
    ya: ya,
    element: element
  })
}
function move () {
  dots.forEach(dot => {
    dot.x += dot.xa
    dot.y += dot.ya
    let r = dot.element.r
    dot.xa *= dot.x > cvs.width - r || dot.x < r ? -1 : 1
    dot.ya *= dot.y > cvs.height - r || dot.y < r ? -1 : 1
    dot.element.attr({
      x: dot.x,
      y: dot.y
    })
  })
  cvs.draw()
}
cvs.animate(move)
```
<c-attr></c-attr> 