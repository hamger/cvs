### Ellipse

定义一段椭圆运动

```js
let ellipse = new Ellipse(options);
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
| centerX        | Number  | 规定椭圆运动中心点在 X 轴上的位置                                           | --       |
| centerY        | Number  | 规定椭圆运动中心点在 Y 轴上的位置                                           | --       |
| radiusX        | Number  | 规定椭圆运动在 X 轴上的半径                                                 | `120`    |
| radiusY        | Number  | 规定椭圆运动在 Y 轴上的半径                                                 | `80`     |
| activeAngle    | Number  | 规定运动的角度，声明此属性后椭圆运动会变成弧运动，不声明则是椭圆运动                | --      |
| rotate         | Number  | 规定椭圆运动的轨迹旋转角度，可以把正椭圆轨迹变成斜椭圆轨迹, 正数为顺时针旋转  | `0`      |
| anticlockwise  | Number  | 规定椭圆运动的方向                                                          | `true`   |
| easing         | String  | 规定缓动效果（[可选值](/docs/track.html#easing)）                           | `linear` |

::: tip
`direction` 值为`false`时，逆时针转动  
:::

::: tip
`relativeX` : 假设元素为一个宽高都为 20 正方形，不设置`relativeX`时，是正方形的左上角(0,0)做圆周运动，设置`relativeX`的值为 10，就是元素身上(10，0)这个点做圆周运动，`relativeY`同理  
:::

### example

```js
import { Scene, Circle, Ellipse } from "cvs";
let scene = new Scene({
  containerId: 'container'
})
let layer = scene.layer()
let dot = new Circle({
  x: layer.width / 2 + 200,
  y: layer.height / 2 + 80,
  r: 10,
  cache: true,
  fill: 'pink'
})
let cd = new Circle({
  x: layer.width / 2,
  y: layer.height / 2,
  r: 10,
  cache: true
});
let ellipse = new Ellipse({
  delay: 0,
  duration: 4000,
  retrace: false, // 是否折返
  iterationCount: 10, // 重复次数
  centerX: layer.width / 2,
  centerY: layer.height / 2,
  radiusX: 200,
  radiusY: 80,
  direction: false
});
dot.addTrack(ellipse);
layer.append(dot, cd);
layer.animate();
```

<ClientOnly><c-ellipse></c-ellipse></ClientOnly>
