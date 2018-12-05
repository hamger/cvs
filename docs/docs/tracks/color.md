### Color

定义一段颜色渐变效果

```js
let round = new Color(options);
```

### options

| options.key | value         | description                                       | default  |
| ----------- | ------------- | ------------------------------------------------- | -------- |
| delay       | Number        | 规定运动延迟时间                                  | --       |
| duration    | Number        | 规定运动持续时间                                  | --       |
| retrace     | Boolean       | 规定运动是否折返                                  | `false`  |
| easing      | String        | 规定缓动效果（[可选值](/docs/track.html#easing)） | `linear` |
| colors      | Array\<Array> | 颜色变化范围                                      | --       |
|iterationCount|Number|重复次数|1|

### example

```js
import { Scene, Circle, Color } from "cvs";

let scene = new Scene({
  containerId: 'container'
})
let layer = scene.layer()

let dot = new Circle({
  zIndex: 1,
  r: 200,
  x: 400,
  y: 400,
  cache: true,
  fill: "pink"
});

let color = new Color({
  delay: 0,
  duration: 8000,
  retrace: false, // 是否折返
  colors: [
    [0.3, "red"],
    [0.7, "orange"],
    [0.17, "yellow"],
    [0.22, "green"],
    [0.42, "cyan"],
    [0.82, "blue"],
    [0.9, "purple"]
  ]
});

dot.addTrack(color);

layer.append([dot]);

layer.animate();
```
