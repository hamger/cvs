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
| activeAngle    | Number  | 规定运动的角度，声明此属性后圆周运动会变成圆弧运动, 不声明则是圆周运动               | --      |
| relativeX      | Number  | 元素本身运动中心相对于元素左上角(元素为圆的话是相对于圆心)在 X 轴上的偏移量 | `0`      |
| relativeY      | Number  | 元素本身运动中心相对于元素左上角(元素为圆的话是相对于圆心)在 Y 轴上的偏移量 | `0`      |
| centerX        | Number  | 规定圆周运动中心点在 X 轴上的位置                                           | --       |
| centerY        | Number  | 规定圆周运动中心点在 Y 轴上的位置                                           | --       |
| anticlockwise  | Number  | 规定圆周运动的方向                                                          | `true`   |
| easing         | String  | 规定缓动效果（[可选值](/docs/track.html#easing)）                           | `linear` |

::: tip
`anticlockwise` 值为`false`时，逆时针转动  
:::

::: tip
`relativeX` : 假设元素为一个宽高都为 20 正方形，不设置`relativeX`时，是正方形的左上角(0,0)做圆周运动，设置`relativeX`的值为 10，就是元素身上(10，0)这个点做圆周运动，可以说是基准点相对于自身的偏移，`relativeY`同理  
:::

### example

```js
import { Scene, Circle, Round } from "cvs";
let scene = new Scene({
  containerId: 'container'
})
let layer = scene.layer()
let dot = new Circle({
  x: layer.width / 2 + 50,
  y: layer.height / 2,
  r: 10,
  cache: true,
  fill: "pink"
});
let sdot = new Circle({
  x: layer.width / 2,
  y: layer.height / 2 - 100,
  r: 10,
  cache: true,
  fill: "blue"
});
let cd = new Circle({
  x: layer.width / 2,
  y: layer.height / 2,
  r: 10,
  cache: true
});
let round = new Round({
  delay: 0,
  duration: 3000,
  retrace: false, // 是否折返
  iterationCount: 10, // 重复次数
  centerX: layer.width / 2,
  centerY: layer.height / 2,
  anticlockwise: false
});
let sround = new Round({
  delay: 0,
  duration: 3000,
  retrace: false, // 是否折返
  iterationCount: 10, // 重复次数
  centerX: layer.width / 2,
  centerY: layer.height / 2,
  anticlockwise: false
});
dot.addTrack(round)
sdot.addTrack(sround)

layer.append(dot, sdot, cd);
layer.animate();
```

<ClientOnly><c-round></c-round></ClientOnly>
