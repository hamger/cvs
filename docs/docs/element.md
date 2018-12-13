### Element

所有图形和组合的基类，该类不对外暴露，你可以在这里看到所有元素的公共属性和方法。

### options

| options.key | value   | description                                        | default |
| ----------- | ------- | -------------------------------------------------- | ------- |
| zIndex      | Number  | 规定元素在 z 轴上的坐标                            | `0`     |
| visible     | Boolean | 规定元素是否可见                                   | `true`  |

<!-- | hover       | Object  | 规定鼠标移动到元素上时的元素属性（仅在 PC 端生效） | --      | -->

由于 cvs 是基于 canvas 的框架，所以元素支持应有的 canvas 属性，以下列出了常用的属性，详细信息可参考[canvas 属性](http://www.w3school.com.cn/tags/html_ref_canvas.asp)。

| options.key              | value  | description                        | default |
| ------------------------ | ------ | ---------------------------------- | ------- |
| fill                     | String | 设置用于填充绘画的颜色、渐变或模式 | --      |
| stroke                   | String | 设置用于笔触的颜色、渐变或模式     | --      |
| shadowColor              | String | 设置用于阴影的颜色                 | --      |
| shadowBlur               | Number | 设置用于阴影的模糊级别             | --      |
| shadowOffsetX            | Number | 设置阴影距形状的水平距离           | --      |
| shadowOffsetY            | Number | 设置阴影距形状的垂直距离           | --      |
| opacity                  | Number | 设置绘图的当前 alpha 或透明值      | --      |
| globalCompositeOperation | String | 设置新图像如何绘制到已有的图像上   | --      |

::: tip
cvs 对以下图形属性进行了缩写

- `fillStyle` 缩写为 `fill`
- `stokeStyle` 缩写为 `stroke`
- `globalAlpha` 缩写为 `opacity`

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