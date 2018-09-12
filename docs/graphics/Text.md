> 绘制一个文本

```js
var element = new Text(options);
```

### options

除了支持[公共属性](../Element.md)外，还支持以下属性：

| options.key | value  | description     | default |
| ----------- | ------ | --------------- | ------- |
| text        | String | 规定文字的内容  | --      |
| x           | Number | 规定文字 x 坐标 | --      |
| y           | Number | 规定文字 y 坐标 | --      |

### example

```js
new Text({
  text: "hello",
  x: 89,
  y: 76
});
```
