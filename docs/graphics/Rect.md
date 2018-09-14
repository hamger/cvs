## Rect

绘制一个矩形元素

```js
var element = new Rect(options);
```

### options

除了支持[公共属性](../Element.md)外，还支持以下属性：

| options.key | value   | description     | default |
| ----------- | ------- | --------------- | ------- |
| w           | Number  | 规定矩形宽度    | --      |
| h           | Number  | 规定矩形高度    | --      |
| x           | Number  | 规定矩形 x 坐标 | --      |
| y           | Number  | 规定矩形 y 坐标 | --      |
| cache       | Boolean | 规定是否缓存    | `false` |

> 当元素在画布中的位置需动态变化，且元素其余属性不发生改变时，推荐开启 cache ，提高渲染性能

### example

```js
new Rect({
  x: 70,
  y: 600,
  fill: "pink",
  w: 50,
  h: 50
});
```
