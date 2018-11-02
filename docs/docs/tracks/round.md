### Round

定义一段圆周运动

```js
let round = new Round(options);
```

### options

| options.key    | value   | description                                                                 | default  |
| -------------- | ------- | --------------------------------------------------------------------------- | -------- |
| delay          | Number  | 规定运动延迟时间                                                            | --       |
| duration       | Number  | 规定运动持续时间                                                            | --       |
| retrace        | Boolean | 规定运动是否折返                                                            | `false`  |
| iterationCount | Number  | 规定运动重复次数                                                            | `1`      |
| relativeX      | Number  | 元素本身运动中心相对于元素左上角(元素为圆的话是相对于圆心)在 X 轴上的偏移量 | `0`      |
| relativeY      | Number  | 元素本身运动中心相对于元素左上角(元素为圆的话是相对于圆心)在 Y 轴上的偏移量 | `0`      |
| centerX        | Number  | 规定圆周运动中心点在 X 轴上的位置                                           | --       |
| centerY        | Number  | 规定圆周运动中心点在 Y 轴上的位置                                           | --       |
| r              | Number  | 规定圆周运动的半径                                                          | `50`     |
| angle          | Number  | 规定圆周运动的初始位置                                                      | `0`      |
| anticlockwise  | Number  | 规定圆周运动的方向                                                          | `true`   |
| easing         | String  | 规定缓动效果（[可选值](/docs/track.html#easing)）                           | `linear` |

::: tip
`angle` 值为元素与中心点的连线跟 X 轴形成的角度  
:::

::: tip
`anticlockwise` 值为`false`时，逆时针转动  
:::

::: tip
`relativeX` : 假设元素为一个宽高都为 20 正方形，不设置`relativeX`时，是正方形的左上角(0,0)做圆周运动，设置`relativeX`的值为 10，就是元素身上(10，0)这个点做圆周运动，`relativeY`同理  
:::

### example

```js
import { Cvs, Circle, Round } from "cvs";
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
let cd = new Circle({
  x: cvs.width / 2,
  y: cvs.height / 2,
  r: 10,
  cache: true
});
let round = new Round({
  delay: 0,
  duration: 8000,
  retrace: false, // 是否折返
  iterationCount: 30, // 重复次数
  centerX: cvs.width / 2,
  centerY: cvs.height / 2,
  r: 100,
  angle: 180,
  anticlockwise: false
});
dot.addTrack(round);

cvs.add([dot, cd]);
cvs.animate();
```

<c-round></c-round>
