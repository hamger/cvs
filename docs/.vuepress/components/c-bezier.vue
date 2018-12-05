<template>
  <div>
    <Container>
      <div id="container" style="width:100%;height:420px"></div>
    </Container>
  </div>
</template>
<script>
// import { Bezier, Circle, Scene } from '#'
import { Bezier, Circle, Scene } from '#'
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
      cache: true
    })
    let bezier = new Bezier({
      delay: 0,
      duration: 8000,
      retrace: true, // 是否折返
      iterationCount: 30, // 重复次数
      points: [
        { x: 10, y: 10 }, // 起点
        { x: 360, y: 160 }, // 控制点1
        { x: 160, y: 360 }, // 控制点2
        { x: 410, y: 410 } // 终点
      ]
    })
    dot.addTrack(bezier)
    layer.append(dot)
    layer.animate()
  }
}
</script>
