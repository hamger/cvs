### Bezier

定义一段贝尔曲线运动

```js
let bezier = new Bezier(options);
```

### options

| options.key | value          | description                                       | default  |
| ----------- | -------------- | ------------------------------------------------- | -------- |
| delay       | Number         | 规定运动延迟时间                                  | --       |
| duration    | Number         | 规定运动持续时间                                  | --       |
| points      | Array\<object> | 规定贝塞尔曲线控制点                              | --       |
| easing      | String         | 规定缓动效果（[可选值](/docs/track.html#easing)） | `linear` |

::: tip
`points` 值为两项数组时，便可以用于绘制直线
:::

### tool

[贝塞尔曲线描绘器](https://hamger.github.io/demo/bezier/bezier.html)-这是一个很实用的工具，以便于让开发者能够更直观地设计曲线运动。

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
