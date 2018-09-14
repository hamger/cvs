## Element
支持的所有图形的基类，支持的所有通用的属性和方法
```js
var elememt = new Elememt(options);
```

### options

| options.key | value   | description    | default |
| ----------- | ------- | -------------- | ------- |
| zIndex      | Number  | 规定层次索引值 | `0`     |
| visible     | Boolean | 规定是否可见   | `true`  |

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

> cvs 对以下图形属性进行了缩写

- fillStyle 缩写为 fill
- stokeStyle 缩写为 stroke
- globalAlpha 缩写为 opacity

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

#### exec(opt)

- 描述：

  添加元素绘制方法（添加顺序决定执行顺序)

- 参数：

  - `{Object | Array<Object>} opt`表示绘制方法的对象或对象数组

- 示例：

  ```js
  element.exec({ scale: [1.5, 1.8] });
  element.exec({ setTransform: [1, 1, 0, 1, 0, 0] });
  element.exec([{ rotate: 10 }, { translate: [10, 90] }]);
  ```

#### on(eventType, callback)

- 描述：

  为元素（除 Text 元素）绑定事件监听

  !> 内部使用 isPointInPath() 判断是否在区域内，如果路径指定了变形，将以变形前为基准，因此不要在变形的元素中绑定事件监听

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

#### 运动函数

##### 圆周运动 circling()

circling 函数接受一个对象参数, 以下是该对象各个字段的介绍

| 字段      | 描述                                             | 类型   | 默认值 |
| --------- | ------------------------------------------------ | ------ | ------ |
| relativeX | 元素本身运动参照点相对元素 X 属性在 X 轴上的偏移 | Number | 0      |
| relativeY | 元素本身运动参照点相对元素 Y 属性在 Y 轴上的偏移 | Number | 0      |
| vpx       | 必填参数，圆周运动中心点在 X 轴的位置            | Number | --     |
| vpy       | 必填参数，圆周运动中心点在 Y 轴的位置            | Number | --     |
| r         | 圆周运动的半径                                   | Number | 100    |
| speed     | 圆周运动的速度                                   | Number | 0.05   |

##### 椭圆运动 elliptic()

elliptic 函数接受一个对象参数, 以下是该对象各个字段的介绍

| 字段      | 描述                                             | 类型   | 默认值 |
| --------- | ------------------------------------------------ | ------ | ------ |
| relativeX | 元素本身运动参照点相对元素 X 属性在 X 轴上的偏移 | Number | 0      |
| relativeY | 元素本身运动参照点相对元素 Y 属性在 Y 轴上的偏移 | Number | 0      |
| vpx       | 必填参数，椭圆运动中心点在 X 轴的位置            | Number | --     |
| vpx       | 必填参数，椭圆运动中心点在 X 轴的位置            | Number | --     |
| vpx       | 必填参数，椭圆运动中心点在 X 轴的位置            | Number | --     |
| vpy       | 必填参数，椭圆运动中心点在 Y 轴的位置            | Number | --     |
| radiusX   | 椭圆运动的长轴长度                               | Number | 100    |
| radiusY   | 椭圆运动的短轴长度                               | Number | 80     |
| speed     | 椭圆运动的速度                                   | Number | 0.05   |

##### 匀速运动 line()

line 函数接受一个对象参数, 以下是该对象各个字段的介绍

| 字段 | 描述                                | 类型   | 默认值 |
| ---- | ----------------------------------- | ------ | ------ |
| endX | 必填参数，运动终点在 X 轴的位置     | Number | --     |
| endY | 必填参数，运动终点在 Y 轴的位置     | Number | --     |
| time | 必填参数，运动的持续时间，单位是 ms | Number | --     |
