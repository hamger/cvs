### Circle

绘制一个圆形，`Circle`继承自`Element`。

```js
let element = new Circle(options);
```

### options

除了支持[公共属性](/docs/element.html#options)外，还支持以下属性：

| options.key | value   | description     | default |
| ----------- | ------- | --------------- | ------- |
| r           | Number  | 规定圆形半径    | --      |
| x           | Number  | 规定圆心 x 坐标 | --      |
| y           | Number  | 规定圆心 y 坐标 | --      |
| cache       | Boolean | 规定是否缓存    | `false` |

::: tip
在动画中，如果只有元素的位置发生变化，推荐开启`cache`，使用离屏渲染提高性能
:::

Circle 构造器也支持绘制扇形，需增添如下配置项：

| options.key   | value   | description        | default |
| ------------- | ------- | ------------------ | ------- |
| startAngle    | Number  | 规定绘制的起始角度 | --      |
| endAngle      | Number  | 规定绘制的终点角度 | --      |
| anticlockwise | Boolean | 规定是否逆时针绘制 | `false` |

### example

```js
var dot = new Circle({
  r: 50,
  x: 200,
  y: 80
});
var sector = new Circle({
  r: 50,
  x: 500,
  y: 80,
  startAngle: 0,
  endAngle: 70,
  anticlockwise: true
});
```

<ClientOnly><c-circle></c-circle></ClientOnly>
