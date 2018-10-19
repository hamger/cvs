### Bezier

定义一段贝尔曲线运动

```js
let bezier = new Bezier(options);
```

### options

| options.key    | value          | description                                       | default  |
| -------------- | -------------- | ------------------------------------------------- | -------- |
| delay          | Number         | 规定运动延迟时间                                  | `0`      |
| duration       | Number         | 规定运动持续时间                                  | --       |
| retrace        | Boolean         | 规定运动是否折返                                  | `false`  |
| iterationCount | Number         | 规定运动重复次数                                  | `1`      |
| points         | Array\<object> | 规定贝塞尔曲线起点、控制点和终点                  | --       |
| easing         | String         | 规定缓动效果（[可选值](/docs/track.html#easing)） | `linear` |

::: tip
`points` 值为两项数组（表示起点和终点的坐标）时，便可用于绘制直线
:::

::: tip
`iterationCount`支持设为`Infinity`，运动将无限循环
:::

### tool

[贝塞尔曲线描绘器](https://hamger.github.io/demo/bezier/bezier.html)-这是一个很实用的工具，以便于让开发者能够更直观地设计曲线运动。将其导出参数赋值给`ponits`属性，即可得到对应的运动轨迹。

### example

```js
import { Cvs, Circle, Bezier } from "cvs";
let cvs = new Cvs({
  container: document.getElementById("container")
});
let dot = new Circle({
  x: 0,
  y: 0,
  r: 10,
  cache: true,
  fill: "pink"
});
let bezier = new Bezier({
  delay: 0,
  duration: 4000,
  points: [
    { x: 10, y: 10 }, // 起点
    { x: 360, y: 160 }, // 控制点1
    { x: 160, y: 360 }, // 控制点2
    { x: 410, y: 410 } // 终点
  ]
});
dot.addTrack(bezier);
cvs.add(dot);
cvs.animate();
```
