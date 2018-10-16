<template>
  <div>
    <Container>
      <div id="container" style="width:100%;height:500px"></div>
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
    const dotCount = 60
    let dots = []
    for (let i = 0; i < dotCount; i++) {
      let r = Math.random() * 30 + 10
      let x = Math.random() * (cvs.width - 2 * r) + r
      let y = Math.random() * (cvs.height - 2 * r) + r
      let xa = (Math.random() * 2 - 1) * dotSpeed
      let ya = (Math.random() * 2 - 1) * dotSpeed
      let ele = new Circle({
        zIndex: Math.random() * dotCount,
        r: r,
        x: x,
        y: y,
        fill: `rgba(${Math.random() * 255}, ${Math.random() *
          255}, ${Math.random() * 255}, ${Math.random()})`,
        cache: true
      })
      cvs.add(ele)
      dots.push({
        x: x,
        y: y,
        xa: xa,
        ya: ya,
        ele: ele
      })
    }
    function move() {
      dots.forEach(dot => {
        dot.x += dot.xa
        dot.y += dot.ya
        let r = dot.ele.opt.r
        dot.xa *= dot.x > cvs.width - r || dot.x < r ? -1 : 1
        dot.ya *= dot.y > cvs.height - r || dot.y < r ? -1 : 1
        dot.ele.attr({
          x: dot.x,
          y: dot.y
        })
      })
      cvs.draw()
    }
    cvs.animate(move)
  }
}
</script>
