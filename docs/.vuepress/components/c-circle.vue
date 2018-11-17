<template>
    <div>
      <Container>
          <div id="container" style="width:100%;height:160px"></div>
      </Container>
    </div>
</template>
<script>
import { Circle, Scene } from '#'
import Container from '../Container'
export default {
  components: {
    Container
  },
  data() {
    return {}
  },
  mounted() {
    let scene = new Scene({
      containerId: 'container'
    })
    let layer = scene.layer()
    var dot = new Circle({
      r: 50,
      x: 200,
      y: 80
    })
    var sector = new Circle({
      r: 50,
      x: 500,
      y: 80,
      startAngle: 0,
      endAngle: 70,
      anticlockwise: true,
    })
    layer.add(dot, sector)
    layer.draw()
  }
}
</script>
