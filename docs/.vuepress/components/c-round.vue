<template>
  <div>
    <Container>
      <div id="container" style="width:100%;height:300px"></div>
    </Container>
  </div>
</template>
<script>
import { Round, Circle, Scene } from '#'
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
      x: layer.width / 2 + 50,
      y: layer.height / 2,
      r: 10,
      cache: true,
      fill: "pink"
    });
    let sdot = new Circle({
      x: layer.width / 2,
      y: layer.height / 2 - 100,
      r: 10,
      cache: true,
      fill: "blue"
    });
    let cd = new Circle({
      x: layer.width / 2,
      y: layer.height / 2,
      r: 10,
      cache: true
    });
    let round = new Round({
      delay: 0,
      duration: 3000,
      retrace: false, // 是否折返
      iterationCount: 10, // 重复次数
      centerX: layer.width / 2,
      centerY: layer.height / 2,
      anticlockwise: false
    });
    let sround = new Round({
      delay: 0,
      duration: 3000,
      retrace: false, // 是否折返
      iterationCount: 10, // 重复次数
      centerX: layer.width / 2,
      centerY: layer.height / 2,
      anticlockwise: false
    });
    dot.addTrack(round)
    sdot.addTrack(sround)
    layer.append(dot, sdot, cd);
    layer.animate();
  }
}
</script>
