### Img

绘制一个图片元素

```js
var element = new Img(options);
```

### options

除了支持[公共属性](../../element/)外，还支持以下属性：

| options.key | value   | description                                 | default |
| ----------- | ------- | ------------------------------------------- | ------- |
| img         | Object  | canvas 图像源                               | --      |
| dx          | Number  | 目标画布的左上角在目标 canvas 上 X 轴的位置 | --      |
| dy          | Number  | 目标画布的左上角在目标 canvas 上 Y 轴的位置 | --      |
| dw          | Number  | 在目标画布上绘制图像的宽度                  | --      |
| dh          | Number  | 在目标画布上绘制图像的高度                  | --      |
| sx          | Number  | 源图像的矩形选择框的左上角 X 坐标           | --      |
| sy          | Number  | 源图像的矩形选择框的左上角 Y 坐标           | --      |
| sw          | Number  | 源图像的矩形选择框的宽度                    | --      |
| sh          | Number  | 源图像的矩形选择框的高度                    | --      |
| cache       | Boolean | 规定是否缓存                                | `false` |

> 在动画中，如果只有元素的位置发生变化，推荐开启`cache`，使用离屏渲染提高性能

### example

```js
var img = new Image();
img.src = "https://zos.alipayobjects.com/rmsportal/nAVchPnSaAWncPj.png";
img.onload = function() {
  new Img({
    img: img,
    dx: 200,
    dy: 200
  });
};
```

<c-img></c-img>   