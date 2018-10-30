<template>
  <div>
    <Container>
      <div id="container" style="width:100%;height:400px"></div>
    </Container>
  </div>
</template>
<script>
import { Cvs, Parabola, Circle } from '../../../src/'
import Container from '../Container'
export default {
  components: {
    Container
  },
  data() {
    return {}
  },
  destroyed() {
    this.cvs.cancelAnimate()
  },
  mounted() {
    let cvs = new Cvs({
      container: document.getElementById('container')
    })
    this.cvs = cvs
    let dot = new Circle({
      x: 0,
      y: 0,
      r: 10,
      cache: true,
      fill: 'pink'
    })
    let parabola = new Parabola({
      delay: 0,
      duration: 2000,
      retrace: false, // 是否折返
      iterationCount: 30, // 重复次数
      endX: cvs.width - 10,
      endY: cvs.height - 10
    })
    dot.addTrack(parabola)

    cvs.add(dot)
    cvs.animate()
  }
}
</script>
