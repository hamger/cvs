<template>
  <div>
    <Container>
      <div id="container" style="width:100%;height:300px"></div>
    </Container>
  </div>
</template>
<script>
import { Elliptic, Circle, Scene } from '#'
import Container from '../Container'
export default {
  components: {
    Container
  },
  data() {
    return {}
  },
  destroyed() {
    this.layer.cancelAnimate()
  },
  mounted() {
    let scene = new Scene({
      containerId: 'container'
    })
    let layer = scene.layer()
    this.layer = layer
    let dot = new Circle({
      x: layer.width / 2 + 200,
      y: layer.height / 2 + 80,
      r: 10,
      cache: true,
      fill: 'pink'
    })
    let cd = new Circle({
      x: layer.width / 2,
      y: layer.height / 2,
      r: 10,
      cache: true,
    })

    let elliptic = new Elliptic({
      delay: 0,
      duration: 4000,
      retrace: false, // 是否折返
      iterationCount: 10, // 重复次数
      centerX: layer.width / 2,
      centerY: layer.height / 2,
      radiusX: 200,
      radiusY: 80,
      anticlockwise: false
    })
    dot.addTrack(elliptic)
    layer.append(dot, cd)
    layer.animate()
  }
}
</script>
