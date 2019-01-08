### Path

绘制一个路径，`Path`继承自`Element`。

```js
let element = new Path(options);
```

### options

除了支持元素的[基础属性](/docs/element.html#options)外，还支持以下属性：

| options.key   | value                     | description                                  | default |
| ------------- | ------------------------- | -------------------------------------------- | ------- |
| d             | String\|Object            | 规定路径                                     | --      |
| fill          | String                    | 设置用于填充绘画的颜色、渐变或模式           | --      |
| stroke        | String                    | 设置用于笔触的颜色、渐变或模式               | --      |
| opacity       | Number                    | 规定元素的透明度                             | `1.0`   |
| shadowColor   | String                    | 设置用于阴影的颜色                           | --      |
| shadowBlur    | Number                    | 设置用于阴影的模糊级别                       | --      |
| shadowOffsetX | Number                    | 设置阴影距形状的水平距离                     | --      |
| shadowOffsetY | Number                    | 设置阴影距形状的垂直距离                     | --      |
| lineWidth     | Number                    | 规定描边宽度                                 | `1.0`   |
| lineCap       | `butt`\|`round`\|`square` | 规定如何绘制每一条线段末端                   | `butt`  |
| lineJoin      | `round`\|`bevel`\|`miter` | 规定 2 个长度不为 0 的相连部分如何连接在一起 | `miter` |
| miterLimit    | Number                    | 规定斜接面限制比例                           | `10.0`  |

#### d 为对象的情况

当`d`为对象时形式如下：

```js
d: {
  path: 'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6z',
  rotate: 20,
  translate: [12, 34],
  skew: [30, 20],
  scale: [6, 6],
  transform: [1, 0.2, 0.3, 1, 0, 0]
}
```

当`d`为对象时也可以表示一个规则图形，支持矩形和圆形两种类型。

- `d.type: "circle"`表示圆形/椭圆

| d.key | value                   | description                             | default |
| ----- | ----------------------- | --------------------------------------- | ------- |
| r     | Number\|Array\<Number\> | 圆形的半径\| 椭圆的 x 轴半径和 y 轴半径 | --      |

::: tip
圆形/椭圆路径的中心坐标为`(x + r[0], y + r[1])`，
:::

```js
let circle = new Path({
  x: 130,
  y: 60,
  d: {
    type: "circle",
    r: 40
  },
  fill: "#153",
  stroke: "red"
});

let ellipse = new Path({
  x: 300,
  y: 60,
  d: {
    type: "circle",
    r: [60, 40]
  },
  transformOrigin: [60, 40],
  rotate: 45,
  fill: "#329",
  stroke: "red"
});
```

<ClientOnly><c-circle></c-circle></ClientOnly>

- `d.type: "rect"`表示(圆角)矩形

| d.key        | value                   | description    | default |
| ------------ | ----------------------- | -------------- | ------- |
| w            | Number                  | 矩形宽度       | --      |
| h            | Number                  | 矩形高度       | --      |
| borderRadius | Number\|Array\<Number\> | 矩形圆角的半径 | `0`     |

::: tip
(圆角)矩形路径的左上角坐标通过`x`和`y`设置，
borderRadius 的值遵循 css3 中 border-radius 的设置规则，但不区分水平半径和垂直半径
:::

```js
var rect = new Path({
  x: 100,
  y: 50,
  d: {
    type: "rect",
    w: 200,
    h: 100,
    borderRadius: 5
  },
  fill: "blue"
});
var rect2 = new Path({
  x: 400,
  y: 50,
  d: {
    type: "rect",
    w: 200,
    h: 100,
    borderRadius: [5, 25]
  },
  stroke: "green"
});
var rect3 = new Path({
  x: 100,
  y: 250,
  d: {
    type: "rect",
    w: 200,
    h: 100,
    borderRadius: [5, 15, 35]
  },
  fill: "pink"
});
var rect4 = new Path({
  x: 400,
  y: 250,
  d: {
    type: "rect",
    w: 200,
    h: 100,
    borderRadius: [5, 15, 25, 35]
  },
  stroke: "purple"
});
```

<ClientOnly><c-rect></c-rect></ClientOnly>

#### d 为字符串的情况

当`d`为字符串时表示一个 svg 路径，详情参考 [svg path](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths)

- 大写字母表示决定位置，小写字母表示相对位置（除`M/m`和`Z/z`）
- `M/m x y`表示`ctx.moveTo(x, y)`
- `L/l x y`表示`ctx.lineTo(x, y)`
- `H/h x`表示水平移动`x`距离
- `V/v y`表示垂直移动`y`距离
- `A/a rx ry x-axis-rotation large-arc-flag sweep-flag x y`表示绘制弧形
- `Q/q x1 y1 x y`表示绘制二次贝塞尔曲线
- `T/t x y`表示绘制光滑的二次贝塞尔曲线
- `C/c x1 y1 x2 y2 x y`表示绘制三次贝塞尔曲线
- `S/s x2 y2, x y`表示绘制光滑的三次贝塞尔曲线
- `Z/z`表示闭合路径

::: tip
`d: 'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6z'`等价于`d: {path: 'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6z'}`
:::

```js
var ele = new Path({
  x: 200,
  y: 10,
  d:
    "M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z",
  rotate: 45,
  scale: 6,
  stroke: "red",
  lineWidth: 4
});
```

<ClientOnly><c-path></c-path></ClientOnly>
