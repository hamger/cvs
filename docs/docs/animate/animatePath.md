### animate-path

> 各种路径函数

- 有 type 字段的表示可以接入缓动函数
  - type 的类型： string | Array
  - String 只能为 Linear 大小写敏感
  - Array: 第一个值确定缓动类型，比如 Quad、Cubic，第二个值确定缓动速度，比如 easeIn，详细值可以参考 [张鑫旭](https://www.zhangxinxu.com/wordpress/2016/12/how-use-tween-js-animation-easing/)
  - 默认值： Linear

```js
var elememt = new Elememt(options);
```

#### 运动函数

##### 圆周运动 circling()

- 描述：

  circling 函数接受一个实例对象和参数对象, 根据参数对象的 key 和 value 确定实例对象圆周运动的轨迹和速度

- 参数：

  - `{Object} ele`  
    一个 Element 的实例
  - `{Object} opt`

    | opt.key   | 描述                                             | 类型   | 默认值 |
    | --------- | ------------------------------------------------ | ------ | ------ |
    | relativeX | 元素本身运动参照点相对元素 X 属性在 X 轴上的偏移 | Number | `0`    |
    | relativeY | 元素本身运动参照点相对元素 Y 属性在 Y 轴上的偏移 | Number | `0`    |
    | vpx       | 必填参数，圆周运动中心点在 X 轴的位置            | Number | --     |
    | vpy       | 必填参数，圆周运动中心点在 Y 轴的位置            | Number | --     |
    | r         | 圆周运动的半径                                   | Number | `100`  |
    | speed     | 圆周运动的速度                                   | Number | `0.05` |

- 示例：

  ```js
  circling(ele, {
    relativeX: 50,
    relativeY: 40,
    vpx: cvs.width / 2,
    vpy: cvs.height / 2,
    r: 200,
    speed: 0.01
  });
  ```

##### 椭圆运动 elliptic()

- 描述：

  elliptic 函数接受一个实例对象和参数对象, 根据参数对象的 key 和 value 确定实例对象椭圆运动的轨迹和速度

- 参数：

  - `{Object} ele`  
    一个 Element 的实例
  - `{Object} opt`

    | 字段      | 描述                                             | 类型   | 默认值 |
    | --------- | ------------------------------------------------ | ------ | ------ |
    | relativeX | 元素本身运动参照点相对元素 X 属性在 X 轴上的偏移 | Number | `0`    |
    | relativeY | 元素本身运动参照点相对元素 Y 属性在 Y 轴上的偏移 | Number | `0`    |
    | vpx       | 必填参数，椭圆运动中心点在 X 轴的位置            | Number | --     |
    | vpx       | 必填参数，椭圆运动中心点在 X 轴的位置            | Number | --     |
    | vpx       | 必填参数，椭圆运动中心点在 X 轴的位置            | Number | --     |
    | vpy       | 必填参数，椭圆运动中心点在 Y 轴的位置            | Number | --     |
    | radiusX   | 椭圆运动的长轴长度                               | Number | `100`  |
    | radiusY   | 椭圆运动的短轴长度                               | Number | `80`   |
    | speed     | 椭圆运动的速度                                   | Number | `0.05` |

- 示例：

  ```js
  elliptic(ele, {
    relativeX: 50,
    relativeY: 40,
    vpx: cvs.width / 2,
    vpy: cvs.height / 2,
    radiusX: 400,
    radiusY: 200,
    speed: 0.03
  });
  ```

##### 匀速直线运动 line()

- 描述：

  line 函数接受一个实例对象和参数对象, 根据参数对象的 key 和 value 确定实例对象匀速直线运动的终点跟运动时间

- 参数：

  - `{Object} ele`  
    一个 Element 的实例

  - `{Object} opt`

    | 字段 | 描述                                | 类型          | 默认值 |
    | ---- | ----------------------------------- | ------------- | ------ |
    | endX | 必填参数，运动终点在 X 轴的位置     | Number        | --     |
    | endY | 必填参数，运动终点在 Y 轴的位置     | Number        | --     |
    | time | 必填参数，运动的持续时间，单位是 ms | Number        | --     |
    | type | 缓动函数                            | Array、String | Linear |

* 示例：

  ```
    line(ele, {
      endX: cvs.width / 2 - 50,
      endY: cvs.height / 2 - 40,
      time: 1000
      type: ['Quad', 'easeIn']
    })
  ```

##### 抛物线运动 parabola()

- 描述：

  parabola 函数接受一个实例对象和参数对象, 根据参数对象的 key 和 value 确定实例对象抛物运动的终点跟运动时间

- 参数：

  - `{Object} ele`  
    一个 Element 的实例
  - `{Object} opt`

    | 字段 | 描述                                | 类型            | 默认值   |
    | ---- | ----------------------------------- | --------------- | -------- |
    | endX | 必填参数，运动终点在 X 轴的位置     | Number          | --       |
    | endY | 必填参数，运动终点在 Y 轴的位置     | Number          | --       |
    | time | 必填参数，运动的持续时间，单位是 ms | Number          | --       |
    | type | 缓动函数                            | Array \| String | `Linear` |

- 示例：
  ```
    parabola(ele, {
      endX: cvs.width / 2 - 50,
      endY: cvs.height / 2 - 40,
      time: 1000
      type: ['Quad', 'easeIn']
    })
  ```
