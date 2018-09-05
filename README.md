# cvs

A basic canvas framework for 2d drawing.

## Usage

```js
import { Canvas, Circle } from "cvs";

var canvas = new Canvas({
  container: document.getElementById("container")
});

canvas.addChild(
  new Circle({
    x: 100,
    y: 100,
    r: 59
  })
);

canvas.draw();
```

## Document

[文档地址](https://hamger.github.io/canvas-demo/#/)

## Changelog

### 2018.9.5

> v0.1.0 项目初始化
