### Instrall

```bash
npm instrall cvs
```

### Usage

```js
// create a circle in canvas
import { Cvs, Circle } from "cvs";

var canvas = new Cvs({
  container: document.getElementById("container")
});

canvas.add(
  new Circle({
    x: 100,
    y: 100,
    r: 59
  })
);

canvas.draw();
```
