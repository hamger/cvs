### Text

绘制一个文本元素

```js
var element = new Text(options);
```

### options

除了支持[公共属性](/docs/element.html#options)外，还支持以下属性：

| options.key  | value  | description                | default           |
| ------------ | ------ | -------------------------- | ----------------- |
| text         | String | 规定文字的内容             | --                |
| x            | Number | 规定文字 x 坐标            | --                |
| y            | Number | 规定文字 y 坐标            | --                |
| textAlign    | String | 规定文字水平方向的对齐方式 | `start`           |
| textBaseline | String | 规定文字垂直方向的对齐方式 | `alphabetic`      |
| font         | String | 规定文本内容的当前字体属性 | `10px sans-serif` |

font 属性可以分解成多个属性单独配置，这些配置只有在不设置 font 时生效

| options.key | value  | description                 | default      |
| ----------- | ------ | --------------------------- | ------------ |
| fontStyle   | Number | 规定文本内容的 font-style   | `normal`     |
| fontVariant | String | 规定文本内容的 font-variant | `normal`     |
| fontWeight  | String | 规定文本内容的 font-weight  | `normal`     |
| fontSize    | String | 规定文本内容的 font-size    | `10`         |
| fontFamily  | String | 规定文本内容的 font-family  | `sans-serif` |

### example

```js
var cvs = new Cvs({
  container: document.getElementById('container')
})

cvs.add(
  new Text({
    text: 'hello',
    x: 89,
    y: 76,
    font: '48px serif'
  })
)
cvs.draw()
```

<c-text></c-text>