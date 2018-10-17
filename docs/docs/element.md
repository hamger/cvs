### Element
支持的所有图形的基类，支持的所有通用的属性和方法
```js
let elememt = new Elememt(options);
```

### options

| options.key | value   | description    | default |
| ----------- | ------- | -------------- | ------- |
| zIndex      | Number  | 规定层次索引值 | `0`     |
| visible     | Boolean | 规定是否可见   | `true`  |
| hover     | Object | 规定鼠标移动到元素上时的元素属性   | -- |

由于使用的是 canvas，绘制的所有图形都支持 canvas 的属性，这里只列出常用的属性，详细信息参考[canvas 属性](http://www.w3school.com.cn/tags/html_ref_canvas.asp)。

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

  更改元素属性

- 参数：

  - `{Object} opt`表示属性的对象

- 示例：

  ```js
  elememt.attr({
    x: 12,
    y: 34
  });
  ```

#### on(eventType, callback)

- 描述：

  为元素（除 Text 元素）绑定事件监听
::: warning
cvs 内部使用`isPointInPath()`判断是否在元素区域内，如果路径指定了变形，将以变形前为基准，因此不要为变形后的元素绑定事件监听
:::

- 参数：

  - `{string} eventType`规定绑定的事件名称，可选项: `click`
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

  - `{string} eventType`规定绑定的事件名称，可选项: `click`，`tapStart`，`tapEnd`，`tapMove`

- 示例：
  ```js
  element.off("click");
  ```
