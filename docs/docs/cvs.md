### Cvs

创建一个绘图对象

```js
let cvs = new Cvs(options);
```

### options

| options.key | value | description                               | default |
| ----------- | ----- | ----------------------------------------- | ------- |
| container   | DOM   | 作为容器的 dom 元素，容器大小决定画布大小 | --      |

### 实例属性

| cvs.key | value  | description                                     |
| ------- | ------ | ----------------------------------------------- |
| canvas  | DOM    | 生成的 canvas 元素（便于设置其 css 样式）       |
| width   | Number | canvas 元素标签宽度（等价于 cvs.canvas.width）  |
| height  | Number | canvas 元素标签高度（等价于 cvs.canvas.height） |

### 实例方法

#### _async_ preload(obj)

- 描述：

  资源预加载

- 参数：

  - `{Object} obj` 表示资源路径的键值对

- 返回值：`{Object}` 表示资源的键值对

- 示例：
  ```js
  (async function() {
    let cvs = new Cvs({
      container: document.getElementById("img-container")
    });
    await cvs.preload({
      safari: require("../../../static/safari.png")
    });
    cvs.add(
      new Img({
        img: "safari",
        dx: 200,
        dy: 10
      })
    );
    cvs.draw();
  })();
  ```

#### add(element)

- 描述：

  向画布中添加一个或多个元素

- 参数：

  - `{Element} element`

- 示例：
  ```js
  cvs.add(element, element2);
  ```

#### remove(element)

- 描述：

  从画布中去除一个或多个元素

- 参数：

  - `{Element} element`

::: tip
支持不传参数，`cvs.remove()`将删除所有的元素
:::

- 示例：
  ```js
  cvs.remove(element);
  ```

#### draw()

- 描述：

  执行一次画布绘制

- 示例：

  ```js
  cvs.draw();
  ```

#### clear()

- 描述：

  清空画布

- 示例：
  ```js
  cvs.clear();
  ```

#### animate()

- 描述：

  执行动画

- 示例：

  ```js
  import { Cvs, Circle, Track } from "cvs";
  let cvs = new Cvs({
    container: document.getElementById("container")
  });
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
  cvs.add(dot);
  cvs.animate();
  ```

#### pauseAnimate()

- 描述：

  暂停动画

- 示例：

  ```js
  cvs.pauseAnimate();
  ```

#### cancelAnimate()

- 描述：

  关闭动画

- 示例：

  ```js
  cvs.cancelAnimate();
  ```

#### resetAnimate()

- 描述：

  重置动画属性（ 再次运动仍需执行`cvs.animate()`）

- 示例：

  ```js
  cvs.resetAnimate();
  ```
