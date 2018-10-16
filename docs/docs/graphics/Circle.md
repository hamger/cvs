### Circle

绘制一个圆形元素

```js
let element = new Circle(options);
```

### options

除了支持[公共属性](/docs/element.html#options)外，还支持以下属性：

| options.key | value   | description     | default |
| ----------- | ------- | --------------- | ------- |
| r           | Number  | 规定圆形半径    | --      |
| x           | Number  | 规定圆心 x 坐标 | --      |
| y           | Number  | 规定圆心 y 坐标 | --      |
| cache       | Boolean | 规定是否缓存    | `false` |

::: tip
在动画中，如果只有元素的位置发生变化，推荐开启`cache`，使用离屏渲染提高性能
:::

### example

```js
new Circle({
  r: 50,
  x: 100,
  y: 100
});
```
