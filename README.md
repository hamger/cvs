# cvs

Cvs (a short name from 'canvas') is a basic canvas framework for 2d drawing, it's designed to make canvas's drawing easier.

## Features

- 对其他库的无依赖，轻量快捷
- 支持元素和运动的自定义，应用灵活
- 元素与运动高度解耦，使动画逻辑更加清晰
- 画布针对运动进行了拓展，具有更强的动画控制能力
- 元素支持基础事件绑定，时画布具有更多的交互
- 支持 Canvas 离屏渲染，使动画绘制更加流畅
- 简化曲线运动的调用，并提供工具辅助可视化开发

## Install
```bash
npm install cvs
```

## Usage

```js
import { Cvs, Circle } from "cvs";

let cvs = new Cvs({
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

[文档地址](https://hamger.github.io/cvs/)

## Future

- 拓展缓动类型
- 拓展规则性运动方程
- 实现大小、颜色的动画
- 支持图片的更迭动画
- 基于时间线的细粒度动画控制
- 支持伪 3D 效果

## CommitRule
提交信息需遵循以下格式：
```bash
commitType: description
```
`commitType`应为以下类型之一：

- feat: 增加新特性
- fix: 问题修复
- docs: 文档修改
- test: 测试用例修改
- opti: 代码优化，包括重构，格式、配置修改等

## Changelog

### 2018.11.5
> v0.2.6 添加 pauseAnimate 暂停动画函数

> v0.2.5 添加 preload 资源预加载函数

### 2018.10.30
> v0.2.4 添加圆周运动、椭圆运动、平抛运动

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

> v0.1.4 添加 Path，Img，Text 构造器

### 2018.9.5

> v0.1.0 项目初始化
