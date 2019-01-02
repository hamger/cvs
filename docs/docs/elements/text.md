### Text

绘制一个文本，`Text`继承自`Element`。

```js
let element = new Text(options);
```

### options

除了支持元素的[基础属性](/docs/element.html#options)外，还支持以下属性：

| options.key   | value  | description                        | default      |
| ------------- | ------ | ---------------------------------- | ------------ |
| text          | String | 规定文字的内容（`\n`表示换行）     | --           |
| textAlign     | String | 规定文字水平方向的对齐方式         | `left`       |
| font          | String | 规定文本内容的当前字体属性         | `16px Arial` |
| fill          | String | 设置用于填充绘画的颜色、渐变或模式 | --           |
| stroke        | String | 设置用于笔触的颜色、渐变或模式     | --           |
| opacity       | Number | 规定元素的透明度                   | `1.0`        |
| shadowColor   | String | 设置用于阴影的颜色                 | --           |
| shadowBlur    | Number | 设置用于阴影的模糊级别             | --           |
| shadowOffsetX | Number | 设置阴影距形状的水平距离           | --           |
| shadowOffsetY | Number | 设置阴影距形状的垂直距离           | --           |

::: tip
`fill`和`stroke`支持都设置。
:::

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
