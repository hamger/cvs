> 使用以下代码创建一个 canvas 画布，并在画布上画一个圆形

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