<template>
    <div>
         <Container>
             <div id="container" style="width:700px;height:500px"></div>
         </Container>
    </div>
</template>
<script>
import { Cvs, Circle } from 'cvs'
import Container from '../Container'
export default {
  components: {
    Container
  },
  data() {
    return {}
  },
  mounted() {
    let cvs = new Cvs({
      container: document.getElementById('container')
    })

    const dotSpeed = 1
    const dotCount = 80

    let dots = []
    for (var i = 0; i < dotCount; i++) {
      var r = Math.random() * 30 + 10
      var x = Math.random() * (cvs.width - 2 * r) + r
      var y = Math.random() * (cvs.height - 2 * r) + r
      // (Math.random() * 2 - 1) 用来表示随机的运动方向
      var xa = (Math.random() * 2 - 1) * dotSpeed
      var ya = (Math.random() * 2 - 1) * dotSpeed
      var element = new Circle({
        zIndex: Math.random() * dotCount,
        r: r,
        x: x,
        y: y,
        cache: true,
        fill: `rgba(${Math.random() * 255}, ${Math.random() *
          255}, ${Math.random() * 255}, ${Math.random()})`
      })
      cvs.add(element)
      dots.push({
        x: x,
        y: y,
        xa: xa,
        ya: ya,
        element: element
      })
    }

    function move() {
      dots.forEach(dot => {
        // 粒子位移
        dot.x += dot.xa
        dot.y += dot.ya

        let r = dot.r
        // 遇到边界将加速度反向
        dot.xa *= dot.x > cvs.width - r || dot.x < r ? -1 : 1
        dot.ya *= dot.y > cvs.height - r || dot.y < r ? -1 : 1
        dot.element.attr({
          x: dot.x,
          y: dot.y
        })
      })
      cvs.draw()
    }

    cvs.animate(move)

    // setTimeout(function () {
    //   cvs.cancelAnimate()
    // }, 600)
  }
}
</script>
