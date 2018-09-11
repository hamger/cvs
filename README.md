# cvs

cvs (a short name from canvas) is a basic canvas framework for 2d drawing, it's designed to make drawing easier.

## Usage

```js
import { Canvas, Circle } from "cvs";

var canvas = new Canvas({
  container: document.getElementById("container")
});

canvas.add(
  new Circle({
    x: 100,
    y: 100,
    r: 59
  })
);

canvas.draw();
```

## Document

[文档地址](https://hamger.github.io/cvs/#/)

## Changelog

### 2018.9.11

> v0.1.4 添加 Path，Img，Text 构造器

### 2018.9.5

> v0.1.0 项目初始化
