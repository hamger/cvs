> 绘制一个矩形

```js
var element = new Rect(options);
```

### options

除了支持[公共属性](../Element.md)外，还支持以下属性：

| options.key   | value  | description     | default |
| ------------- | ------ | --------------- | ------- |
| w             | Number | 规定矩形宽度    | --      |
| h             | Number | 规定矩形高度    | --      |
| x             | Number | 规定矩形 x 坐标 | --      |
| y             | Number | 规定矩形 y 坐标 | --      |
| fill / stroke | String | 规定颜色        | `#000`  |
| zIndex        | Number | 规定前后顺序    | `0`     |

### example

```js
new Rect({
  x: 70,
  y: 600,
  fill: "pink",
  w: 50,
  h: 50
});
```
