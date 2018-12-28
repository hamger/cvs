### Element

所有元素和组合的基类，该类不对外暴露，你可以在这里看到所有元素的公共属性和方法。

### options

| options.key | value   | description             | default |
| ----------- | ------- | ----------------------- | ------- |
| zIndex      | Number  | 规定元素在 z 轴上的坐标 | `0`     |
| visible     | Boolean | 规定元素是否可见        | `true`  |

<!-- | hover       | Object  | 规定鼠标移动到元素上时的元素属性（仅在 PC 端生效） | --      | -->

由于 cvs 是基于 canvas 的框架，所以元素支持应有的 canvas 属性，以下列出了常用的属性，详细信息可参考[canvas 属性](http://www.w3school.com.cn/tags/html_ref_canvas.asp)。

| options.key   | value  | description                        | default |
| ------------- | ------ | ---------------------------------- | ------- |
| fill          | String | 设置用于填充绘画的颜色、渐变或模式 | --  |
| stroke        | String | 设置用于笔触的颜色、渐变或模式     | --      |
| shadowColor   | String | 设置用于阴影的颜色                 | --      |
| shadowBlur    | Number | 设置用于阴影的模糊级别             | --      |
| shadowOffsetX | Number | 设置阴影距形状的水平距离           | --      |
| shadowOffsetY | Number | 设置阴影距形状的垂直距离           | --      |
| globalAlpha   | Number | 设置绘图的当前 alpha 或透明值      | --      |

::: tip
cvs 只对两个常用属性进行了缩写

- `fillStyle` 缩写为 `fill`
- `strokeStyle` 缩写为 `stroke`

这两个属性支持同时设置
:::

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
  ::: warning
  cvs 内部使用`isPointInPath()`判断是否在元素区域内，如果路径指定了变形，将以变形前为基准，因此不要为变形后的元素绑定事件监听
  :::

- 参数：

  - `{string} eventType`规定绑定的事件名称，可选值: `click`
  - `{Function} callback`规定监听函数

- 示例：
  ```js
  element.on("click", function(e) {
    console.log("element: " + e);
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

#### addTrack(track)

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
  ```
