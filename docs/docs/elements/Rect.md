### Rect

绘制一个矩形元素

```js
let element = new Rect(options);
```

### options

除了支持[公共属性](/docs/element.html#options)外，还支持以下属性：

| options.key  | value   | description          | default |
| ------------ | ------- | -------------------- | ------- |
| w            | Number  | 规定矩形宽度         | --      |
| h            | Number  | 规定矩形高度         | --      |
| x            | Number  | 规定矩形 x 坐标      | --      |
| y            | Number  | 规定矩形 y 坐标      | --      |
| borderRadius | Number\|Array   | 规定矩形的外边框圆角 | --      |
| cache        | Boolean | 规定是否缓存         | `false` |

::: tip
在动画中，如果只有元素的位置发生变化，推荐开启`cache`，使用离屏渲染提高性能
:::

### example

```js
new Rect({
  x: 100,
  y: 100,
  w: 200,
  h: 100,
  borderRadius: 5,
})
new Rect({
  x: 400,
  y: 100,
  w: 200,
  h: 100,
  borderRadius: [5, 10],
})
new Rect({
  x: 100,
  y: 350,
  w: 200,
  h: 100,
  borderRadius: [5, 10, 15],
})
new Rect({
  x: 400,
  y: 350,
  w: 200,
  h: 100,
  borderRadius: [5, 10, 15, 30],
})
```

<ClientOnly><c-rect></c-rect></ClientOnly>
