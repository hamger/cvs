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
| cache       | Boolean | 规定是否缓存   | `false` |

> 当元素在画布中的位置需动态变化，且元素其余属性不发生改变时，推荐开启 cache，提高渲染性能

### example

```js
new Circle({
  r: 50,
  x: 100,
  y: 100
});
```
