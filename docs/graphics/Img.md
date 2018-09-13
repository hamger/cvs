> 绘制一个图片

```js
var element = new Img(options);
```

### options

除了支持[公共属性](../Element.md)外，还支持以下属性：

| options.key | value          | description                                 | default |
| ----------- | -------------- | ------------------------------------------- | ------- |
| img         | Object / String | 图片地址或者 canvas 图像源                  | --      |
| dx          | Number         | 目标画布的左上角在目标 canvas 上 X 轴的位置 | --      |
| dy          | Number         | 目标画布的左上角在目标 canvas 上 Y 轴的位置 | --      |
| dw          | Number         | 在目标画布上绘制图像的宽度                  | --      |
| dh          | Number         | 在目标画布上绘制图像的高度                  | --      |
| sx          | Number         | 源图像的矩形选择框的左上角 X 坐标           | --      |
| sy          | Number         | 源图像的矩形选择框的左上角 Y 坐标           | --      |
| sw          | Number         | 源图像的矩形选择框的宽度                    | --      |
| sh          | Number         | 源图像的矩形选择框的高度                    | --      |

### example

```js
new Img({
  img: "https://zos.alipayobjects.com/rmsportal/nAVchPnSaAWncPj.png",
  dx: 200,
  dy: 200
});
```
