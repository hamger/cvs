### Image

绘制一个图像，`Image`继承自`Shape`。

```js
let element = new Image(options);
```

### options

除了支持[公共属性](/docs/element.html#options)外，还支持以下属性：

| options.key | value   | description                                 | default |
| ----------- | ------- | ------------------------------------------- | ------- |
| image         | Object  | canvas 图像源                               | --      |
| x           | Number  | 目标画布的左上角在目标 canvas 上 X 轴的位置 | --      |
| y           | Number  | 目标画布的左上角在目标 canvas 上 Y 轴的位置 | --      |
| w           | Number  | 在目标画布上绘制图像的宽度                  | --      |
| h           | Number  | 在目标画布上绘制图像的高度                  | --      |
| sx          | Number  | 源图像的矩形选择框的左上角 X 坐标           | --      |
| sy          | Number  | 源图像的矩形选择框的左上角 Y 坐标           | --      |
| sw          | Number  | 源图像的矩形选择框的宽度                    | --      |
| sh          | Number  | 源图像的矩形选择框的高度                    | --      |
| cache       | Boolean | 规定是否缓存                                | `false` |

::: tip
在动画中，如果只有元素的位置发生变化，推荐开启`cache`，使用离屏渲染提高性能
:::

### example

```js
(async function() {
  let scene = new Scene({
    containerId: 'container'
  })
  await scene.preload({
    safari: require("../../../static/safari.png")
  });
  let layer = scene.layer()
  layer.append(
    new Image({
      image: "safari",
      x: 200,
      y: 10
    })
  );
  layer.draw();
})();
```

<ClientOnly><c-image></c-image></ClientOnly>
