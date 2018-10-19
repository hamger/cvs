### Round

定义一段圆周运动

```js
let round = new Round(options);
```

### options

| options.key | value          | description                                       | default  |
| ----------- | -------------- | ------------------------------------------------- | -------- |
| delay       | Number         | 规定运动延迟时间                                  | --       |
| duration    | Number         | 规定运动持续时间                                  | --       |
| retrace        | Boolean         | 规定运动是否折返                                  | `false`  |
| iterationCount | Number         | 规定运动重复次数                                  | `1`      |
| vpx         | Number         | 规定圆周运动中心点在X轴上的位置                              | --       |
| vpy         | Number         | 规定圆周运动中心点在Y轴上的位置                              | --       |
| r           | Number         | 规定圆周运动的半径                              | `50`       |
| angle       | Number         | 规定圆周运动的初始位置                           | `0`       |
| direction   | Number         | 规定圆周运动的方向                              | `true`       |
| easing      | String         | 规定缓动效果（[可选值](/docs/track.html#easing)） | `linear` |

::: tip
`angle` 值为元素与中心点的连线跟X轴形成的角度     
:::

::: tip
`direction` 值为`false`时，逆时针转动     
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
let round = new Round({
    delay: 0,
    duration: 8000,
    retrace: false, // 是否折返
    iterationCount: 1, // 重复次数
    vpx: cvs.width / 2,
    vpy: cvs.height / 2,
    r: 100,
    angle: 180,
    direction: false
});
dot.addTrack(round);
cvs.add(dot);
cvs.animate();
```

<c-round></c-round>
