> 创建一个绘图对象

```js
var canvas = new Canvas(options);
```

### options

| options.key | value | description                               | default |
| ----------- | ----- | ----------------------------------------- | ------- |
| container   | DOM   | 作为容器的 dom 元素，容器大小决定画布大小 | --      |

### 实例方法

#### addElement

向画布中添加一个元素

```js
canvas.addElement(element);
```

- element 必须为一个`Element`实例

#### removeElement

从画布中去除一个元素

```js
canvas.removeElement(element);
```

- element 必须为一个`Element`实例

#### draw

命令画布进行绘制

```js
canvas.draw();
```

#### clear

清空画布

```js
canvas.clear();
```
