### animate-color

> 各种路径函数(同路径动画)

- 有type字段的表示可以接入缓动函数  
  - type的类型： string | Array  
  - String只能为Linear  大小写敏感   
  - Array: 第一个值确定缓动类型，比如Quad、Cubic，第二个值确定缓动速度，比如easeIn，详细值可以参考 [张鑫旭](https://www.zhangxinxu.com/wordpress/2016/12/how-use-tween-js-animation-easing/)   
  - 默认值： Linear  


> 颜色缓动动画

| 字段 | 描述                                | 类型   | 默认值 |
| ---- | ----------------------------------- | ------ | ------ |
| colors | 允许使用透明度的颜色 | Array\<array\> | --   |
| during | 必填参数，运动的持续时间，单位是 ms | Number | --     |
| type | 缓动函数 | Array \| String | `Linear`     |
| period | 是否循环 | Boolean | `false` |

```javascript

import { gradientColor,Circle,Cvs } from cvs

let cvs = new Cvs({
  container: document.getElementById('container')
})

let ball = new Circle({
  x: 50,
  y: 50,
  r: 50,
  cache: true
})

ball.animate = () => {
  gradientColor(ball, {
    colors:[
        [0.3, 'red'],
        [0.7, 'orange'],
        [0.17, 'yellow'],
        [0.22, 'green'],
        [0.42, 'cyan'],
        [0.82, 'blue'],
        [0.90, 'purple'],
    ],
    during: 20,
    period:true
  })
}

cvs.animate()
```