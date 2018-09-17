## Poly

绘制一个多边形/折线元素

```js
var element = new Poly(options);
```

### options

除了支持[公共属性](../Element.md)外，还支持以下属性：

| options.key | value        | description              | default |
| ----------- | ------------ | ------------------------ | ------- |
| points      | Array<array> | 规定多边形顶点(折线拐点) | --      |
| cache       | Boolean | 规定是否缓存    | `false` |

> 当元素在画布中的位置需动态变化，且元素其余属性不发生改变时，推荐开启 cach ，提高渲染性能

> 当设置了`stroke`且开启`cache`，请确保没有设置`lineWidth`，如果设置了较大的`lineWidth`，图形的角会有明显的裁剪现象，这是因为 cvs 不会对线条交接处最远的位置进行大量计算 

### example

```js
new Poly({
  points: [[90, 190], [34, 56], [222, 333]],
  stroke: "#198",
  lineWidth: 3
});
```
