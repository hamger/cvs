### Arc

绘制一个圆弧元素

```js
var element = new Arc(options);
```

### options

除了支持[公共属性](/docs/element.html#options)外，还支持以下属性：

| options.key   | value   | description     | default |
| ------------- | ------- | --------------- | ------- |
| r             | Number  | 规定圆弧半径    | --      |
| x             | Number  | 规定圆心 x 坐标 | --      |
| y             | Number  | 规定圆心 y 坐标 | --      |
| startAngle    | Number  | 规定起始角度    | --      |
| endAngle      | Number  | 规定终点角度    | --      |
| anticlockwise | Number  | 规定绘制方向    | `false` |
| cache         | Boolean | 规定是否缓存    | `false` |

> 在动画中，如果只有元素的位置发生变化，推荐开启`cache`，使用离屏渲染提高性能

### example

```js
new Arc({
  x: 500,
  y: 100,
  r: 50,
  startAngle: -80,
  endAngle: 20,
  anticlockwise: true
});
```
