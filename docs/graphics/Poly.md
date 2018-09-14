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

### example

```js
new Poly({
  points: [[90, 190], [34, 56], [222, 333]],
  stroke: "#198",
  lineWidth: 3
});
```
