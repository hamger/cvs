### Path

绘制一个路径，`Path`继承自`Element`。

```js
let element = new Path(options);
```

### options

除了支持[公共属性](/docs/element.html#options)外，还支持以下属性：

| options.key | value              | description          | default |
| ----------- | ------------------ | -------------------- | ------- |
| path        | String             | 规定路径             | --      |

:::tip
使用字符串描述路径，详情参考 [svg path](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths)
:::

- 大写字母表示决定位置，小写字母表示相对位置（除`M/m`和`Z/z`）
- `M/m x y`表示`ctx.moveTo(x, y)`
- `L/l x y`表示`ctx.lineTo(x, y)`
- `H/h x`表示水平移动`x`距离
- `V/v y`表示垂直移动`y`距离
- `A/a rx ry x-axis-rotation large-arc-flag sweep-flag x y`表示绘制弧形
- `Q/q x1 y1 x y`表示绘制二次贝塞尔曲线`ctx.quadraticCurveTo(x1, y1, x, y)`
- `T/t x y`表示绘制光滑的二次贝塞尔曲线
- `C/c x1 y1 x2 y2 x y`表示绘制三次贝塞尔曲线`ctx.bezierCurveTo(x1, y1, x2, y2, x, y)`
- `S/s x2 y2, x y`表示绘制光滑的三次贝塞尔曲线
- `Z/z`表示闭合路径

### example

```js
new Path({
  path: 'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z',
  stroke: 'red',
  transform: [{translate: [-10, -10]}, {rotate: 45}, {scale: 6}, {translate: [200, 200]}],
  lineWidth: 4
})
```

<ClientOnly><c-path></c-path></ClientOnly>
