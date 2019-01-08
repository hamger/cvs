### 自定义元素

组合使用四种基本元素（`Path`、`Image`、`Text`、`Group`）可以自由创造出无限种自定义元素。以下以创建一个按钮元素为例，演示如何创造一个按钮。

```js
import { Scene, Group, Text, Path } from "cvs";

let scene = new Scene({ containerId: "container" });
let layer = scene.layer({ handleEvent: true });

let text = new Text({
  zIndex: 1,
  text: "确 定",
  x: 10,
  y: 11,
  font: "20px system-ui",
  fill: "#409eff"
});

let rect = new Path({
  x: 1,
  y: 1,
  d: {
    type: "rect",
    w: text.size[0] + 20,
    h: text.size[1] + 20,
    borderRadius: 8
  },
  stroke: "#ecf5ff",
  fill: "#b3d8ff"
});

let button = new Group({
  x: 100,
  y: 100
}).append(text, rect);

rect.on("click", () => {
  console.log('rect')
});

rect.on("mouseenter", () => {
  layer.clear();
  scene.container.style.cursor = "pointer";
  rect.attr({ fill: "#409eff", stroke: "#409eff" });
  text.attr({ fill: "#fff" });
  layer.draw();
});

rect.on("mouseleave", () => {
  layer.clear();
  scene.container.style.cursor = "default";
  rect.attr({ fill: "#b3d8ff", stroke: "#ecf5ff" });
  text.attr({ fill: "#409eff" });
  layer.draw();
});

layer.append(button);
layer.draw();
```

<ClientOnly><c-custom></c-custom></ClientOnly>

以上方法可以实现创造一个按钮元素，但是如果有多处需要用到这类按钮元素，一个个创建的话代码必然会变得冗长，解决方法是通过继承`Group`构造器来创建一个按钮的构造器，以下是如何实现的代码，从中你可以体会到 cvs 在元素自定义上的高度自由。

```js
class Button extends Group {
  constructor (opt) {
    super(opt)
    // 自定义参数
    opt = Object.assign({borderWidth: 1, padding: 0, borderRadius: 0, font: '20px system-ui'}, opt)
    this.text = new Text({
      zIndex: 1,
      x: opt.padding + Math.floor(opt.borderWidth / 2),
      y: opt.padding + Math.floor(opt.borderWidth / 2),
      text: opt.text,
      font: opt.font,
      fill: opt.color
    })
    this.append(this.text)
    this.rect = new Path({
      x: Math.floor(opt.borderWidth / 2),
      y: Math.floor(opt.borderWidth / 2),
      d: {
        type: 'rect',
        w: this.text.size[0] + opt.padding * 2,
        h: this.text.size[1] + opt.padding * 2,
        borderRadius: opt.borderRadius,
      },
      lineWidth: opt.borderWidth,
      stroke: opt.borderColor,
      fill: opt.bgColor
    })
    this.append(this.rect)
  }
}

let button = new Button({
  x: 100,
  y: 100,
  padding: 10,
  text: '确定',
  font: '20px system-ui',
  color: '#409eff',
  borderColor: '#ecf5ff',
  bgColor: '#b3d8ff',
  borderRadius: 8
})

layer.append(button)

let rect = button.rect, text = button.text

rect.on('click', () => {
  console.log('rect')
})
rect.on('mouseenter', () => {
  layer.clear()
  scene.container.style.cursor = 'pointer'
  rect.attr({ fill: '#409eff', stroke: '#409eff' })
  text.attr({ fill: '#fff' })
  layer.draw()
})
rect.on('mouseleave', () => {
  layer.clear()
  scene.container.style.cursor = 'default'
  rect.attr({ fill: '#b3d8ff', stroke: '#ecf5ff' })
  text.attr({ fill: '#409eff' })
  layer.draw()
})

layer.draw()
```

