### Path

绘制一个路径元素

```js
let element = new Path(options);
```

### options

除了支持[公共属性](/docs/element.html#options)外，还支持以下属性：

| options.key | value              | description          | default |
| ----------- | ------------------ | -------------------- | ------- |
| path        | String             | 规定路径             | --      |

<!-- | endArrow    | Boolean\|\<object> | 规定路径结束位置箭头 | `false` |
| startArrow  | Boolean\|\<object> | 规定路径开始箭头     | `false` |
| endArrow.key/startArrow.key | value  | description          | default |
| --------------------------- | ------ | -------------------- | ------- |
| angle                       | Number | 规定与路径的夹角大小 | `30`    |
| len                         | Number | 规定箭头两侧的长度   | `20`    | -->

:::tip
使用字符串描述路径，详情参考 [svg path](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths)
:::

- 大写字母表示决定位置，小写字母表示相对位置（除`M/m`和`Z/z`）
- `M/m x y`表示`ctx.moveTo(x, y)`
- `L/l x y`表示`ctx.lineTo(x, y)`
- `H/h x`表示水平移动`x`距离
- `V/v y`表示垂直移动`y`距离
- `A/a x y r startAngle endAngle anticlockwise`表示绘制圆弧`ctx.arc(x, y, r, startAngle, endAngle, anticlockwise)`
- `Q/q x1 y1 x y`表示绘制二次贝塞尔曲线`ctx.quadraticCurveTo(x1, y1, x, y)`
- `T/t x y`表示绘制光滑的二次贝塞尔曲线
- `C/c x1 y1 x2 y2 x y`表示绘制三次贝塞尔曲线`ctx.bezierCurveTo(x1, y1, x2, y2, x, y)`
- `S/s x2 y2, x y`表示绘制光滑的三次贝塞尔曲线
- `Z/z`表示闭合路径

### example

```js
cvs.add(
  new Path({
    path:
      "M 10 10" +
      "L 100 100" +
      "l 30 -50" +
      "C 100 100 200 200 300 200" +
      "s 50 50 100 100" +
      "T 130 350" +
      "a 0 50 50 -90 180",
    stroke: "#454"
  })
);
cvs.add(
  new Path({
    path: "M 400 100 L 600 400",
    stroke: "red",
  })
);

cvs.draw();
```

<ClientOnly><c-path></c-path></ClientOnly>
