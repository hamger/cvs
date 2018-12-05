### Layer

创建一个图层对象

```js
var scene = new Scene({ containerId: "container" });
var layer = scene.layer(options);
```

### options

| options.key | value   | description                   | default |
| ----------- | ------- | ----------------------------- | ------- |
| zIndex      | Number  | 规定图层在 scene 中的前后顺序 | `0`     |
| handleEvent | Boolean | 规定是否对图层进行事件监听    | `false` |

### 实例属性

| layer.key | value  | description                                       |
| --------- | ------ | ------------------------------------------------- |
| canvas    | DOM    | 图层中的画布，即 canvas 元素                      |
| width     | Number | canvas 元素标签宽度（等价于 layer.canvas.width）  |
| height    | Number | canvas 元素标签高度（等价于 layer.canvas.height） |

### 实例方法

#### append(element)

- 描述：

  向画布中添加一个或多个元素

- 参数：

  - `{Element} element`

- 示例：
  ```js
  layer.append(element, element2);
  ```

#### remove(element)

- 描述：

  从画布中去除一个或多个元素

- 参数：

  - `{Element} element`

::: tip
支持不传参数，`layer.remove()`将删除所有的元素
:::

- 示例：

  ```js
  layer.remove(element);
  ```

#### draw()

- 描述：

  执行一次画布绘制

- 示例：

  ```js
  layer.draw();
  ```

#### clear()

- 描述：

  清空画布

- 示例：

  ```js
  layer.clear();
  ```

#### animate()

- 描述：

  执行动画

- 示例：

  ```js
  import { Scene, Circle, Track } from "cvs";
  let scene = new Scene({
    containerId: "container"
  });
  let layer = scene.layer();
  let dot = new Circle({
    x: 10,
    y: 10,
    r: 10,
    cache: true,
    fill: "pink"
  });
  let customTrack = new Track({
    delay: 100,
    duration: 3000,
    loop: function(p) {
      this.$ele.attr({
        x: 400 * p + 10
      });
    }
  });
  dot.addTrack(customTrack);
  layer.append(dot);
  layer.animate();
  ```

#### pauseAnimate()

- 描述：

  暂停动画

- 示例：

  ```js
  layer.pauseAnimate();
  ```

#### cancelAnimate()

- 描述：

  关闭动画

- 示例：

  ```js
  layer.cancelAnimate();
  ```

#### resetAnimate()

- 描述：

  重置动画属性（ 再次运动仍需执行`layer.animate()`）

- 示例：

  ```js
  layer.resetAnimate();
  ```
