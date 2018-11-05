### Poly

绘制一个多边形/折线元素

```js
let element = new Poly(options);
```

### options

除了支持[公共属性](/docs/element.html#options)外，还支持以下属性：

| options.key | value          | description              | default |
| ----------- | -------------- | ------------------------ | ------- |
| points      | Array\<Object> | 规定多边形顶点(折线拐点) | --      |
| cache       | Boolean        | 规定是否缓存             | `false` |

::: tip
在动画中，如果只有元素的位置发生变化，推荐开启`cache`，使用离屏渲染提高性能
:::

::: warning
当设置了`stroke`且开启`cache`，请确保没有设置`lineWidth`，如果设置了较大的`lineWidth`，每个角会有明显的裁剪现象，这是因为 cvs 不会去计算线条交接处最远的位置
:::

### example

```js
new Poly({
  points: [{ x: 90, y: 190 }, { x: 34, y: 56 }, { x: 222, y: 333 }],
  stroke: "#198",
  lineWidth: 3
});
```

<ClientOnly><c-poly></c-poly></ClientOnly>