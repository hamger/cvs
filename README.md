# cvs

cvs (a short name from canvas) is a basic canvas framework for 2d drawing, it's designed to make drawing easier.

## Usage

```js
import { Cvs, Circle } from "cvs";

var cvs = new Canvas({
  container: document.getElementById("container")
});

cvs.add(
  new Circle({
    x: 100,
    y: 100,
    r: 59
  })
);

cvs.draw();
```

## Document

[文档地址](https://hamger.github.io/cvs/#/)

## Changelog

### 2018.9.14

> v0.1.6 添加离屏 canvas 缓存

### 2018.9.12

> v0.1.5 添加 click 事件监听

### 2018.9.11

> v0.1.4 添加 Path，Img，Text 构造器

### 2018.9.5

> v0.1.0 项目初始化
