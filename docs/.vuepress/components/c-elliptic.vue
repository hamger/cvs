<template>
  <div>
    <Container>
      <div id="container" style="width:100%;height:300px"></div>
    </Container>
  </div>
</template>
<script>
import { Cvs, Elliptic, Circle } from '../../../src/'
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
      x: cvs.width / 2 + 200,
      y: cvs.height / 2 + 80,
      r: 10,
      cache: true,
      fill: 'pink'
    })
    let cd = new Circle({
      x: cvs.width / 2,
      y: cvs.height / 2,
      r: 10,
      cache: true,
    })

    let elliptic = new Elliptic({
      delay: 0,
      duration: 4000,
      retrace: false, // 是否折返
      iterationCount: 10, // 重复次数
      centerX: cvs.width / 2,
      centerY: cvs.height / 2,
      radiusX: 200,
      radiusY: 80,
      anticlockwise: false
    })
    dot.addTrack(elliptic)
    cvs.add(dot, cd)
    cvs.animate()
  }
}
</script>
