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
  mounted() {
    let cvs = new Cvs({
      container: document.getElementById('container')
    })

    let dot = new Circle({
      x: 0,
      y: 0,
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
      duration: 8000,
      retrace: false, // 是否折返
      iterationCount: 30, // 重复次数
      centerX: cvs.width / 2,
      centerY: cvs.height / 2,
      radiusX: 200,
      radiusY: 80,
      angle: 180,
      direction: false
    })
    dot.addTrack(elliptic)
    cvs.add([dot, cd])
    cvs.animate()
  }
}
</script>
