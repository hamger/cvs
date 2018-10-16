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
for (let i = 0; i < dotCount; i++) {
  let r = Math.random() * 30 + 10
  let x = Math.random() * (cvs.width - 2 * r) + r
  let y = Math.random() * (cvs.height - 2 * r) + r
  let xa = (Math.random() * 2 - 1) * dotSpeed
  let ya = (Math.random() * 2 - 1) * dotSpeed
  let element = new Circle({
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
    let r = dot.element.opt.r
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
<ClientOnly><c-attr></c-attr></ClientOnly>
