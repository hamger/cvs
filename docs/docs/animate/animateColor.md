### animate-color

> 各种路径函数(同路径动画)

- 有type字段的表示可以接入缓动函数  
  - type的类型： string、Array  
  - String只能为Linear  大小写敏感   
  - Array: 第一个值确定缓动类型，比如Quad、Cubic，第二个值确定缓动速度，比如easeIn，详细值可以参考 [张鑫旭](https://www.zhangxinxu.com/wordpress/2016/12/how-use-tween-js-animation-easing/)   
  - 默认值： Linear  


> 生成调色板

```javascript

import { colorPalette } from cvs

```

- 参数：

| 描述                                             | 类型   | 默认值 |示例|
| --------- | ------------------------------------------------ | ------ | ------ |
|允许使用透明度的颜色|Array\<array\>|无|[0.6,'red']|


##### 示例

```javascript

const colors = [
  [0.3, 'red'],
  [0.7, 'orange'],
  [0.17, 'yellow'],
  [0.22, 'green'],
  [0.42, 'cyan'],
  [0.82, 'blue'],
  [0.90, 'purple'],
]

const colorArr = colorPalette(colors)

```

##### 利用调色板数组进行各种缓动动画

| 字段 | 描述                                | 类型   | 默认值 |
| ---- | ----------------------------------- | ------ | ------ |
| colorArr | 调色板 | Array\<Number\> | Linear     |
| during | 必填参数，运动的持续时间，单位是 ms | Number | --     |
| type | 缓动函数 | Array、String | Linear     |

```javascript

import { colorPalette,Circle,Cvs } from cvs

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
    colorArr,
    during: 20
  })
}

cvs.animate()

```