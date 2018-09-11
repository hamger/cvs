> 支持的所有图形的基类，支持的所有通用的属性和方法

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

> see 对以下图形属性进行了缩写

- fillStyle 缩写为 fill
- stokeStyle 缩写为 stroke
- globalAlpha 缩写为 opacity

### 实例方法

| function  | param                 | return | description      |
| --------- | --------------------- | ------ | ---------------- |
| attr(opt) | `opt`: 表示属性的对象 | --     | 用于更改元素属性 |


### 运动函数
#### 1.圆周运动 circling()
circling函数接受一个对象参数, 以下是改对象各个字段的介绍

| 字段   |  描述    | 类型 |  默认值 |
|----|---------|-----|--------|
| relativeX  | 元素本身运动参照点相对元素X属性在X轴上的偏移 | number  | 0
| relativeY  | 元素本身运动参照点相对元素Y属性在Y轴上的偏移 | number  | 0
| vpx        | 必填参数，圆周运动中心点在X轴的位置 | number  | 无
| vpy        | 必填参数，圆周运动中心点在Y轴的位置 | number  | 无
| r          | 圆周运动的半径          | number  | 100
| speed      | 圆周运动的速度          | number  | 0.05

#### 2.椭圆运动 elliptic()
elliptic函数接受一个对象参数, 以下是改对象各个字段的介绍

| 字段   |  描述    | 类型 |  默认值 |
|----|---------|-----|--------|
| relativeX  | 元素本身运动参照点相对元素X属性在X轴上的偏移 | number  | 0
| relativeY  | 元素本身运动参照点相对元素Y属性在Y轴上的偏移 | number  | 0
| vpx     | 必填参数，椭圆运动中心点在X轴的位置 | number  | 无
| vpx     | 必填参数，椭圆运动中心点在X轴的位置 | number  | 无
| vpx     | 必填参数，椭圆运动中心点在X轴的位置 | number  | 无
| vpy     | 必填参数，椭圆运动中心点在Y轴的位置 | number  | 无
| radiusX | 椭圆运动的长轴长度       | number  | 100
| radiusY | 椭圆运动的短轴长度       | number  | 80
| speed   | 椭圆运动的速度          | number  | 0.05

#### 3.匀速运动 line()
line函数接受一个对象参数, 以下是改对象各个字段的介绍

| 字段   |  描述    | 类型 |  默认值 |
|----|---------|-----|--------|
| endX     | 必填参数，运动终点在X轴的位置     | number  | 无
| endY     | 必填参数，运动终点在Y轴的位置     | number  | 无
| time     | 必填参数，运动的持续时间,单位是ms  | number  | 无
