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
