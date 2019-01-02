### Path

绘制一个路径，`Path`继承自`Element`。

```js
let element = new Path(options);
```

### options

除了支持元素的[基础属性](/docs/element.html#options)外，还支持以下属性：

| options.key   | value          | description                        | default |
| ------------- | -------------- | ---------------------------------- | ------- |
| d             | String\|Object | 规定路径                           | --      |
| fill          | String         | 设置用于填充绘画的颜色、渐变或模式 | --      |
| stroke        | String         | 设置用于笔触的颜色、渐变或模式     | --      |
| opacity       | Number         | 规定元素的透明度                   | `1.0`   |
| shadowColor   | String         | 设置用于阴影的颜色                 | --      |
| shadowBlur    | Number         | 设置用于阴影的模糊级别             | --      |
| shadowOffsetX | Number         | 设置阴影距形状的水平距离           | --      |
| shadowOffsetY | Number         | 设置阴影距形状的垂直距离           | --      |

::: tip
`fill`和`stroke`支持都设置。
:::

#### d 为对象的情况

当`d`为对象时表示一个规则图形的描述，现支持两种类型。

- `d.type: "circle"`表示圆形/椭圆

| d.key  | value                   | description                             | default |
| ------ | ----------------------- | --------------------------------------- | ------- |
| r      | Number\|Array\<Number\> | 圆形的半径\| 椭圆的 x 轴半径和 y 轴半径 | --      |
| cx     | Number                  | 圆形/椭圆中心 x 轴坐标                  | `r[0]`  |
| cy     | Number                  | 圆形/椭圆中心 y 轴坐标                  | `r[1]`  |
| rotate | Number                  | 椭圆倾斜角度, 正数为顺时针旋转          | `0`     |

```js
let circle = new Path({
  d: {
    type: "circle",
    cx: 200,
    cy: 100,
    r: [60, 40],
    rotate: 45
  },
  stroke: "red"
});

let ellipse = new Path({
  d: {
    type: "circle",
    cx: 400,
    cy: 100,
    r: 40
  },
  fill: "#153"
});
```

<ClientOnly><c-circle></c-circle></ClientOnly>

- `d.type: "rect"`表示(圆角)矩形

| d.key        | value                   | description         | default |
| ------------ | ----------------------- | ------------------- | ------- |
| x            | Number                  | 矩形左上角 x 轴坐标 | `0`     |
| y            | Number                  | 矩形左上角 y 轴坐标 | `0`     |
| w            | Number                  | 矩形宽度            | --      |
| h            | Number                  | 矩形高度            | --      |
| borderRadius | Number\|Array\<Number\> | 矩形圆角的半径      | `0`     |

::: tip
borderRadius 的值遵循 css3 中 border-radius 的设置规则，但不区分水平半径和垂直半径
:::

```js
var rect = new Path({
  d: {
    type: "rect",
    x: 100,
    y: 50,
    w: 200,
    h: 100,
    borderRadius: 5
  },
  fill: "blue"
});
var rect2 = new Path({
  d: {
    type: "rect",
    x: 400,
    y: 50,
    w: 200,
    h: 100,
    borderRadius: [5, 25]
  },
  fill: "green"
});
var rect3 = new Path({
  d: {
    type: "rect",
    x: 100,
    y: 250,
    w: 200,
    h: 100,
    borderRadius: [5, 15, 35]
  },
  fill: "pink"
});
var rect4 = new Path({
  d: {
    type: "rect",
    x: 400,
    y: 250,
    w: 200,
    h: 100,
    borderRadius: [5, 15, 25, 35]
  },
  fill: "purple"
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
