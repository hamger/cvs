> canvas 绘图基础框架

```js
import { Canvas, Circle } from "canvas-kit";

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