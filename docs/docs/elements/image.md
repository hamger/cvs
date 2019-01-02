### Image

绘制一个图像，`Image`继承自`Element`。

```js
let element = new Image(options);
```

### options

除了支持元素的[基础属性](/docs/element.html#options)外，还支持以下属性：

| options.key   | value  | description                       | default |
| ------------- | ------ | --------------------------------- | ------- |
| image         | Object | canvas 图像源                     | --      |
| w             | Number | 在目标画布上绘制图像的宽度        | --      |
| h             | Number | 在目标画布上绘制图像的高度        | --      |
| sx            | Number | 源图像的矩形选择框的左上角 X 坐标 | --      |
| sy            | Number | 源图像的矩形选择框的左上角 Y 坐标 | --      |
| sw            | Number | 源图像的矩形选择框的宽度          | --      |
| sh            | Number | 源图像的矩形选择框的高度          | --      |
| opacity       | Number | 规定元素的透明度                  | `1.0`   |
| shadowColor   | String | 设置用于阴影的颜色                | --      |
| shadowBlur    | Number | 设置用于阴影的模糊级别            | --      |
| shadowOffsetX | Number | 设置阴影距形状的水平距离          | --      |
| shadowOffsetY | Number | 设置阴影距形状的垂直距离          | --      |

::: tip
在动画中，如果只有元素的位置发生变化，推荐开启`cache`，使用离屏渲染提高性能
:::

### example

```js
(async function() {
  let scene = new Scene({
    containerId: "container"
  });
  await scene.preload({
    safari: require("../../../static/safari.png")
  });
  let layer = scene.layer();
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
