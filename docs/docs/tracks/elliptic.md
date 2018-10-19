### Round

定义一段椭圆运动

```js
let elliptic = new Elliptic(options);
```

### options

| options.key | value          | description                                       | default  |
| ----------- | -------------- | ------------------------------------------------- | -------- |
| delay       | Number         | 规定运动延迟时间                                  | --       |
| duration    | Number         | 规定运动持续时间                                  | --       |
| vpx         | Number         | 规定椭圆运动中心点在X轴上的位置                              | --       |
| vpy         | Number         | 规定椭圆运动中心点在Y轴上的位置                              | --       |
| radiusX     | Number         | 规定椭圆运动在X轴上的半径                             | `100`       |
| radiusY     | Number         | 规定椭圆运动在Y轴上的半径                             | `80`       |
| angle       | Number         | 规定椭圆运动的初始位置                           | `0`       |
| direction   | Number         | 规定椭圆运动的方向                              | `true`       |
| easing      | String         | 规定缓动效果（[可选值](/docs/track.html#easing)） | `linear` |

::: tip
`angle` 值为元素与中心点的连线跟X轴形成的角度     
`direction` 值为`false`时，逆时针转动 
:::



### example

```js
import { Cvs, Circle, Elliptic } from "cvs";
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
let elliptic = new Elliptic({
    delay: 0,
    duration: 8000,
    retrace: false, // 是否折返
    iterationCount: 1, // 重复次数
    vpx: cvs.width / 2,
    vpy: cvs.height / 2,
    angle: 180,
    direction: false
});
dot.addTrack(elliptic);
cvs.add(dot);
cvs.animate();
```

<c-elliptic></c-elliptic>
