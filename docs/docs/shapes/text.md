### Text

绘制一个文本，`Text`继承自`Shape`。

```js
let element = new Text(options);
```

### options

除了支持[公共属性](/docs/element.html#options)外，还支持以下属性：

| options.key | value  | description                    | default                           |
| ----------- | ------ | ------------------------------ | --------------------------------- |
| text        | String | 规定文字的内容（`\n`表示换行） | --                                |
| x           | Number | 规定文字内容左上角的 x 坐标    | --                                |
| y           | Number | 规定文字内容左上角的 y 坐标    | --                                |
| textAlign   | String | 规定文字水平方向的对齐方式     | `left`                            |
| font        | String | 规定文本内容的当前字体属性     | `16px Arial` |

### example

```js
new Text({
  text: "hello\nworld",
  x: 89,
  y: 16,
  font: "48px serif"
});
```

<ClientOnly><c-text></c-text></ClientOnly>
