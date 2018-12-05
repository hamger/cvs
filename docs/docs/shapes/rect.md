### Rect

绘制一个矩形，`Rect`继承自`Shape`。

```js
let element = new Rect(options);
```

### options

除了支持[公共属性](/docs/element.html#options)外，还支持以下属性：

| options.key  | value         | description          | default |
| ------------ | ------------- | -------------------- | ------- |
| w            | Number        | 规定矩形宽度         | --      |
| h            | Number        | 规定矩形高度         | --      |
| x            | Number        | 规定矩形 x 坐标      | --      |
| y            | Number        | 规定矩形 y 坐标      | --      |
| borderRadius | Number\|Array | 规定矩形的外边框圆角 | --      |
| cache        | Boolean       | 规定是否缓存         | `false` |

::: tip
borderRadius 的值遵循 css3 中 border-radius 的设置规则，但不区分水平半径和垂直半径
:::

::: tip
在动画中，如果只有元素的位置发生变化，推荐开启`cache`，使用离屏渲染提高性能
:::

### example

```js
var rect = new Rect({
  x: 100,
  y: 50,
  w: 200,
  h: 100,
  fill: "blue",
  borderRadius: 5
});
var rect2 = new Rect({
  x: 400,
  y: 50,
  w: 200,
  h: 100,
  fill: "green",
  borderRadius: [5, 25]
});
var rect3 = new Rect({
  x: 100,
  y: 250,
  w: 200,
  h: 100,
  fill: "pink",
  borderRadius: [5, 15, 35]
});
var rect4 = new Rect({
  x: 400,
  y: 250,
  w: 200,
  h: 100,
  fill: "purple",
  borderRadius: [5, 15, 25, 35]
});
```

<ClientOnly><c-rect></c-rect></ClientOnly>
