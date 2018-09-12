> 创建一个绘图对象

```js
var canvas = new Canvas(options);
```

### options

| options.key | value | description                               | default |
| ----------- | ----- | ----------------------------------------- | ------- |
| container   | DOM   | 作为容器的 dom 元素，容器大小决定画布大小 | --      |

### 实例方法

#### add(element)

- 描述：

  向画布中添加一个元素

- 参数：

  - `{Element} element`

- 示例：
  ```js
  canvas.add(element);
  ```

#### remove(element)

- 描述：

  从画布中去除一个元素

- 参数：

  - `{Element} element`

- 示例：
  ```js
  canvas.remove(element);
  ```

#### draw()
- 描述：

  命令画布进行绘制

- 示例：

  ```js
  canvas.draw();
  ```

#### clear()
- 描述：

  清空画布

- 示例：
  ```js
  canvas.clear();
  ```

#### animate(func)

- 描述：

  执行动画

- 参数：

  - `{Function} func`表示每一帧绘制的逻辑

- 示例：

  ```js
  var x = 0,
    y = 0;
  var element = new Circle({ x: x, y: y, r: 10 });
  function move() {
    canvas.clear();
    element.attr({
      x: x++,
      y: y++
    });
    canvas.draw();
  }
  elememt.animate(move);
  ```
