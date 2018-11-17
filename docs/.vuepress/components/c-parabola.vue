<template>
  <div>
    <Container>
      <div id="container" style="width:100%;height:400px"></div>
    </Container>
  </div>
</template>
<script>
import { Parabola, Circle, Scene } from '#'
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
      endX: layer.width - 10,
      endY: layer.height - 10
    })
    dot.addTrack(parabola)

    layer.add(dot)
    layer.animate()
  }
}
</script>
