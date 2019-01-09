# cvs

Cvs (a short name from 'canvas') is a basic canvas framework for 2d drawing, it's designed to make canvas's drawing easier.

## Features

- 简洁的 API 设计
- 面向对象编程
- 支持高度自由的元素组合
- 基于时间轴的细粒度动画控制
- 元素支持事件响应
- 基于离屏渲染的缓存机制

## Install

使用 npm 安装： `npm install cvs`

使用 yarn 安装： `yarn add cvs`

## Usage

```js
import { Scene, Path } from "cvs";

let scene = new Scene({ containerId: "container" });
let layer = scene.layer();

let circle = new Path({
  x: 130,
  y: 60,
  d: {
    type: "circle",
    r: 40
  },
  fill: "#153",
  stroke: "red"
});

layer.draw();
```

## Document

[文档地址](https://hamger.github.io/cvs/)

## Todo

- 优化缓存机制
- 支持伪 3D 效果
- 实现元素的碰撞机制
- 提高单元测试覆盖率

## Reference

- [SpriteJS](https://github.com/spritejs/spritejs)
- [antvis/g](https://github.com/antvis/g)
- [timeline](https://github.com/spritejs/sprite-timeline)
- [svg-path-to-canvas](https://github.com/akira-cn/svg-path-to-canvas)

## Changelog

### 2018.1.9

> v0.6.8 修复预加载资源获取失败

> v0.6.7 实现元素的基础缓存机制

### 2018.1.7

> v0.6.4 支持虚拟组合

> v0.6.3 修复组合中元素事件无响应

### 2018.1.4

> v0.6.2 支持 svg 路径矩阵变换

### 2018.1.3

> v0.6.1 支持 mouseenter 和 mouseleave 的事件响应

> v0.6.0 元素支持对原生鼠标和触碰事件的响应

### 2018.12.30

> v0.5.13 支持 Text 元素 textAlign 设置

### 2018.12.30

> v0.5.12 实现对 Path 元素的缓存

### 2018.12.29

> v0.5.11 支持椭圆的快捷绘制

> v0.5.10 支持 transformOrigin 属性设置

### 2018.12.28

> v0.5.9 优化绘图属性设置，更改矩阵变换的设置形式

> v0.5.8 元素支持矩阵变换，keyframe 支持回调函数，支持 fill 和 stroke 同时设置

> v0.5.7 去除 Rect 和 Circle 构造器，使用 Path 构造器代替

### 2018.12.17

> v0.5.5 增强 Path 构造器，支持矩阵变换

### 2018.12.16

> v0.5.4 实现颜色的关键帧动画，修改 easing 缓动类型

> v0.5.3 支持关键帧动画，修改轨迹定义方式

### 2018.12.13

> v0.5.2 支持 group 嵌套使用，支持 append 方法链式调用

### 2018.12.12

> v0.5.1 Text 构造器支持文字换行

### 2018.12.12

> v0.5.0 接入时间轴来控制动画

### 2018.12.10

> v0.4.1 支持椭圆运动的倾斜角配置

### 2018.12.5

> v0.4.0 引入 Group 构造器，Element 构造器作为基类

### 2018.11.17

> v0.3.0 引入 Scene 和 Layer 构造器

### 2018.11.16

> v0.2.11 添加 Element 实例方法 clone

> v0.2.10 Circle 构造器支持绘制扇形

> v0.2.9 Rect 构造器支持圆角设置

> v0.2.8 去除 Poly 和 Arc 构造器

### 2018.11.15

> v0.2.7 优化贝尔曲线运动计算

### 2018.11.5

> v0.2.5 添加 preload 资源预加载函数

### 2018.10.30

> v0.2.4 添加圆周运动、椭圆运动

### 2018.10.18

> v0.2.3 支持自定义元素

### 2018.10.17

> v0.2.2 修复 hover 事件重复绘制元素

### 2018.10.16

> v0.2.1 考虑到 duration 是 Infinity 的情况，loop 函数接受的参数改为当前轨迹下已运行的时间

> v0.2.0 重新设计元素动画的实现，添加贝塞尔曲线运动，添加动画重置

### 2018.10.11

> v0.1.11 cvs 支持多项添加和删除元素

### 2018.10.9

> v0.1.10 添加开启和关闭动画

### 2018.9.18

> v0.1.8 优化配置项赋值操作

### 2018.9.17

> v0.1.7 添加 hover 效果

### 2018.9.14

> v0.1.6 添加离屏 canvas 缓存

### 2018.9.12

> v0.1.5 添加 click 事件监听

### 2018.9.11

> v0.1.4 添加 Path，Image，Text 构造器

### 2018.9.5

> v0.1.0 项目初始化
