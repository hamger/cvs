### Scene

创建一个场景对象

```js
let scene = new Scene(options);
```

### options

| options.key | value  | description                                    | default |
| ----------- | ------ | ---------------------------------------------- | ------- |
| containerId | String | 作为容器的 dom 元素的 Id，容器大小决定画布大小 | --      |

### 实例属性

| scene.key | value         | description      |
| --------- | ------------- | ---------------- |
| layers    | Array\<Layer> | 实例中的所有图层 |

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
    let cvs = new Scene({
      container: document.getElementById("img-container")
    });
    await layer.preload({
      safari: require("../../../static/safari.png")
    });
    layer.add(
      new Img({
        img: "safari",
        dx: 200,
        dy: 10
      })
    );
    layer.draw();
  })();
  ```

#### add(element)

- 描述：

  向画布中添加一个或多个元素

- 参数：

  - `{Element} element`

- 示例：
  ```js
  layer.add(element, element2);
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
  layer.add(dot);
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
