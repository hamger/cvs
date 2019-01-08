### Element

所有元素和组合的基类，该类不对外暴露，你可以在这里看到所有元素的公共属性和方法。

### options

| options.key     | value          | description                                  | default              |
| --------------- | -------------- | -------------------------------------------- | -------------------- |
| id              | String         | 规定元素的 id                                | 一个自然数           |
| zIndex          | Number         | 规定元素在 z 轴上的坐标                      | `0`                  |
| visible         | Boolean        | 规定元素是否可见                             | `true`               |
| x               | Number         | 规定元素矩阵变换前的左上角 x 轴坐标          | `0`                  |
| y               | Number         | 规定元素矩阵变换前的左上角 y 轴坐标          | `0`                  |
| transformOrigin | Number\|Array  | 规定元素矩阵变换的的原点与元素左上角的偏移量 | --                   |
| rotate          | Number         | 规定元素矩阵变换中旋转的角度                 | `0`                  |
| scale           | Number\|Array  | 规定元素矩阵变换中 x 轴与 y 轴缩放的倍数     | `[1, 1]`             |
| translate       | Number\|Array  | 规定元素矩阵变换中 x 轴与 y 轴移动的距离     | `[0, 0]`             |
| skew            | Number\|Array  | 规定元素矩阵变换中 x 轴与 y 轴倾斜的角度     | `[0, 0]`             |
| transform       | Array          | 规定元素矩阵变换中的矩阵                     | `[1, 0, 0, 1, 0, 0]` |
| offsetPath      | String\|Object | 规定运动路径                                 | --                   |

::: tip
`transformOrigin: [50, 50]`表示元素矩阵变换的原点为`[x + 50, y + 50]`，可以缩写为`transformOrigin: 50`。`scale`、`translate`、`skew`的缩写形式同理。
:::

::: tip
offsetPath 的值和 Path 元素的 d 形式相同，在关键帧中使用 offsetDistance 定义进度。
:::

### 实例属性

| property | value | description                                                              | example              |
| -------- | ----- | ------------------------------------------------------------------------ | -------------------- |
| size     | Array | 元素的大小(第一项表示宽，第二项表示高)                                   | `[100, 80]`          |
| center   | Array | 元素相对于父元素的的中心点坐标(第一项表示 x 轴坐标，第二项表示 y 轴坐标) | `[12, 12]`           |
| bounds   | Array | 元素相对于父元素的左上角（前两项）和右下角（后两项）的坐标               | `[12, 12, 110, 110]` |

### 实例方法

#### attr(opt)

- 描述：

  获取或设置元素属性

- 参数：

  - `{String | Object} opt` 参数类型为`String`表示获取属性，`Object`表示设置属性

- 示例：

  ```js
  // 获取元素属性
  elememt.attr("x");
  // 设置元素属性
  elememt.attr({ x: 12, y: 34 });
  ```

#### clone(options)

- 描述：

  基于当前元素克隆一个新的元素

- 参数：

  - `{Object} options` 新元素的属性

  ::: tip
  支持不传参数，将返回一个和原元素属性相同的元素
  :::

- 返回值：`{Element}` 新的元素

- 示例：

  ```js
  let rect = new Rect({
    w: 50,
    h: 50,
    x: 150,
    y: 350
  });
  let rect2 = rect.clone({ y: 100 });
  ```

#### keyframe(keyframes, timing)

- 描述：

  为元素添加关键帧动画，支持链式调用

- 参数：

  - `{Array} keyframes` 关键帧的属性描述

  keyframes 至少需要有两项，分别代表第一帧和最后一帧，第一帧中需要指明可能变化的所有属性的初始值，之后的帧中可以省略不变的属性。

  - `{Object} timing` timing 对象支持以下属性

  | timing.key | value           | description            | default  |
  | ---------- | --------------- | ---------------------- | -------- |
  | delay      | Number          | 规定运动延迟时间       | `0`      |
  | duration   | Number          | 规定运动持续时间       | --       |
  | easing     | String \| Array | 规定动画的 easing 函数 | `linear` |

  ::: tip
  easing 可选值有 `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out` 或者一个代表[ cubic-bezier 函数](https://blog.csdn.net/wjnf012/article/details/78795573)传参的数组，如`[0.42, 0, 0.58, 1]`
  :::

* 返回值：`{Element}` 元素自身

* 示例：

  ```js
  let rect = new Rect({
    w: 80,
    h: 80,
    x: 0,
    y: 180,
    fill: "green"
  });
  rect.keyframe([{ fill: rect.attr("fill") }, { fill: "red" }], 4000);
  rect.keyframe(["fill", { fill: "red" }], 4000);
  fgLayer.append(rect);
  ```

  以上代码中 `{ fill: rect.attr('fill') }` 写法显得过于繁琐，因此也支持省略写法：`['fill']`, 如果变化的属性只有一个还可以直接使用字符串，所以可以缩写为：`rect.keyframe(['fill', { fill: "red" }], 4000);`

#### on(eventType, callback)

- 描述：

  为元素绑定事件监听

- 参数：

  - `{string} eventType`规定绑定的事件名称，可选值: `click`、`mousedown`、`mouseup`、`mousemove`、`touchstart`、`touchend`、`touchmove`、`mouseenter`、`mouseleave`
  - `{Function} callback`规定监听函数

  ::: tip
  callback 会接收一个包含事件信息的参数`e`，通过`e.originalEvent`可获得原始事件的参数
  :::

- 示例：
  ```js
  element.on("click", function(e) {
    console.log(e.originalEvent);
  });
  ```

#### off(eventType)

- 描述：

  为元素取消绑定事件监听

- 参数：

  - `{string} eventType`规定绑定的事件名称，可选值: `click`

- 示例：
  ```js
  element.off("click");
  ```

<!-- #### addTrack(track)

- 描述：

  向元素中添加一个或多个轨迹

- 参数：

  - `{Track} track`

- 示例：
  ```js
  elememt.addTrack(track, track2);
  ```

#### removeTrack(track)

- 描述：

  从元素中去除一个或多个轨迹

- 参数：

  - `{Track} track`

  ::: tip
  支持不传参数，`elememt.removeTrack()`将删除所有的轨迹
  :::

- 示例：

  ```js
  elememt.removeTrack(track, track2);
  ``` -->
