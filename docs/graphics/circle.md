> 绘制一个圆形

```js
var element = new Circle(options);
```

### options

除了支持[公共属性](../Element.md)外，还支持以下属性：

| options.key   | value  | description     | default |
| ------------- | ------ | --------------- | ------- |
| r             | Number | 规定圆形半径    | --      |
| x             | Number | 规定圆心 x 坐标 | --      |
| y             | Number | 规定圆心 y 坐标 | --      |
| fill / stroke | String | 规定颜色        | `#000`  |
| zIndex        | Number | 规定前后顺序    | `0`     |

### example

```js
new Circle({
  r: 50,
  x: 100,
  y: 100
});
```
