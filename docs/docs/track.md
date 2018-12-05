### Track

所有运动轨迹的基类，使用该类可自定义运动轨迹

```js
let track = new Track(options);
```

### options

| options.key | value    | description      | default |
| ----------- | -------- | ---------------- | ------- |
| delay       | Number   | 规定运动延迟时间 | `0`     |
| duration    | Number   | 规定运动持续时间 | --      |
| loop        | Function | 规定动画循环体   | --      |

::: tip
`loop`函数会接受一个参数`t`，该参数表示当前轨迹下已经运动的时间（单位：ms）。在该函数中你可以引入`easing`来实现缓动，[`easing`函数](#easing)需要传入一个关于时间进度的参数`p`（0<=p<=1），返回一个新的时间进度。
:::

### easing

```js
let t = easing[key](p);
```

| key                                                                 | description                               |
| ------------------------------------------------------------------- | ----------------------------------------- |
| linear                                                              | 匀速                                      |
| easeInQuad \| easeInCubic \| easeInQuart \| easeInQuint             | 二阶 \| 三阶 \| 四阶 \| 五阶 加速         |
| easeOutQuad \| easeOutCubic \| easeOutQuart \| easeOutQuint         | 二阶 \| 三阶 \| 四阶 \| 五阶 减速         |
| easeInOutQuad \| easeInOutCubic \| easeInOutQuart \| easeInOutQuint | 二阶 \| 三阶 \| 四阶 \| 五阶 先加速后减速 |

- 描述：

  获取缓动效果

- 参数：

  - `{Number} p` 时间进度（`0<=p<=1`）

- 返回值：

  - `{Number} p2` 缓动计算后的时间进度（`0<=p2<=1`）

- 示例：
  ```js
  let p2 = easing.easeInQuad(p);
  ```

### example

以下是一个使用`Track`构造器自定义轨迹（规定时间内到达指定的终点）的例子。

```js
import { Scene, Circle, Track, easing } from "cvs";
let scene = new Scene({ containerId: "container" });
let layer = scene.layer();
let dot = new Circle({x: 10, y: 10, r: 10});

class CustomTrack extends Track {
  loop(t) {
    let p = t / this.duration;
    this.$ele.attr({
      x: this.attr("destination").x * easing[this.easing](p),
      y: this.attr("destination").y * easing[this.easing](p)
    });
  }
}

let customTrack = new CustomTrack({
  delay: 100,
  duration: 4000,
  destination: { x: 200, y: 300 }
});
dot.addTrack(customTrack);
layer.append(dot);
layer.animate();
```
