## Instrall

```bash
npm instrall cvs
```

## Usage

```js
// create a circle in canvas
import { Canvas, Circle } from "cvs";

var canvas = new Canvas({
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
