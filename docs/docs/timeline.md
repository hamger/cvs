### Timeline

cvs 的时间轴使用的是 [sprite-timeline](https://github.com/spritejs/sprite-timeline)。Secne 实例的 timeline 属性是一个 Timeline 实例，之后子代的 timeline 属性都会基于其父集的 timeline 属性。

### timeline.playbackRate

通过控制 timeline.playbackRate (默认值为1) 的值来控制运动的速度，值越大表示运动越快，负值表示反向运动。

```js
// 加速动画
layer.timeline.playbackRate += 0.1
// 减速动画
layer.timeline.playbackRate -= 0.1
// 停止动画
layer.timeline.playbackRate = 0
// 开启动画
layer.timeline.playbackRate = 1
// 反向运动
layer.timeline.playbackRate = -1
```

### timeline.currentTime

timeline.currentTime 表示当前动画运动的时间，通过指定 timeline.currentTime 的值，可以定位到任意时刻的动画状态。

```js
// 重置动画
layer.timeline.currentTime = 0
// 定位到 8000 毫秒时的动画
layer.timeline.currentTime = 8000
```
