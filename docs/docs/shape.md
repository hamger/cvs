### Shape

构造一个图形，`Shape`继承自`Element`，使用该类可自定义图形。

### 实例方法

#### clone(options)

- 描述：

  基于当前图形克隆一个新的图形

- 参数：

  - `{Object} options` 新图形的属性

  ::: tip
  支持不传参数，将返回一个和原图形属性相同的图形
  :::

- 返回值：`{Element}` 新的图形

- 示例：

  ```js
  let rect = new Rect({
    w: 50,
    h: 50,
    x: 150,
    y: 350
  });
  let rect2 = rect.clone({ y: 100 });
  ```

### 自定义图形

以下是一个使用`Shape`构造器自定义一个三角形图形的例子，你需要定义一个 `draw` 函数，用来表示如何绘制图形，如果你需要事件监听，需要再定义`drawPath`绘制图形路径。

```js
import { Scene, Shape } from "cvs";
let scene = new Scene({ containerId: "container" });
let layer = scene.layer({ handleEvent: true });

class Triangle extends Shape {
  draw() {
    let ctx = this.ctx;
    ctx.save();
    this.drawPath();
    ctx.fill();
    ctx.restore();
  }
  drawPath() {
    let ctx = this.ctx;
    let p = this.attr("points");
    ctx.beginPath();
    ctx.moveTo(p[0].x, p[0].y);
    ctx.lineTo(p[1].x, p[1].y);
    ctx.lineTo(p[2].x, p[2].y);
    ctx.closePath();
  }
}

let triangle = new Triangle({
  zIndex: 5,
  points: [{ x: 2, y: 2 }, { x: 102, y: 12 }, { x: 12, y: 92 }]
});
triangle.on("click", function(e) {
  console.log(e);
});
layer.append(triangle);
layer.draw();
```

<!-- <ClientOnly><c-circle></c-circle></ClientOnly> -->
