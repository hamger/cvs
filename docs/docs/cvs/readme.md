
### Cvs

创建一个绘图对象

```js
var cvs = new Cvs(options);
```

### options

| options.key | value | description                               | default |
| ----------- | ----- | ----------------------------------------- | ------- |
| container   | DOM   | 作为容器的 dom 元素，容器大小决定画布大小 | --      |

### 实例属性

| cvs.key | value | description          |
| ------- | ----- | -------------------- |
| canvas  | DOM   | 生成的 canvas 元素（便于设置其 css 样式） |
| width   | Number | canvas 元素标签宽度（等价于cvs.canvas.width） |
| height  | Number | canvas 元素标签高度（等价于cvs.canvas.height） |

### 实例方法

#### add(element)

- 描述：

  向画布中添加一个元素

- 参数：

  - `{Element} element`

- 示例：
  ```js
  cvs.add(element);
  ```

#### remove(element)

- 描述：

  从画布中去除一个元素

- 参数：

  - `{Element} element`

- 示例：
  ```js
  cvs.remove(element);
  ```

#### draw()

- 描述：

  命令画布进行绘制

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
    cvs.clear();
    element.attr({
      x: x++,
      y: y++
    });
    cvs.draw();
  }
  elememt.animate(move);
  ```


<ClientOnly><c-animate></c-animate></ClientOnly>
