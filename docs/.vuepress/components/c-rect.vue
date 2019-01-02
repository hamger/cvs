<template>
    <div>
      <Container>
          <div id="rect-container" style="width:100%;height:400px"></div>
      </Container>
    </div>
</template>
<script>
import { Path, Scene } from '#'
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
      containerId: 'rect-container'
    })
    let layer = scene.layer()
    this.layer = layer
    var rect = new Path({
      x: 100,
      y: 50,
      d: {
        type: 'rect',
        w: 200,
        h: 100,
        borderRadius: 5,
      },
      fill: 'blue',
    })
    var rect2 = new Path({
      x: 400,
      y: 50,
      d: {
        type: 'rect',
        w: 200,
        h: 100,
        borderRadius: [5, 25],
      },
      stroke: 'green',
    })
    var rect3 = new Path({
      x: 100,
      y: 250,
      d: {
        type: 'rect',
        w: 200,
        h: 100,
        borderRadius: [5, 15, 35],
      },
      fill: 'pink',
    })
    var rect4 = new Path({
      x: 400,
      y: 250,
      d: {
        type: 'rect',
        w: 200,
        h: 100,
        borderRadius: [5, 15, 25, 35],
      },
      stroke: 'purple',
    })
    layer.append(rect, rect2, rect3, rect4)
    layer.draw()
  }
}
</script>
