<template>
  <div>
    <Container>
      <div id="circle-container" style="width:100%;height:200px"></div>
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
      containerId: 'circle-container'
    })
    let layer = scene.layer()

    let circle = new Path({
      d: {
        type: 'circle',
        cx: 200,
        cy: 160,
        r: [60, 40],
        rotate: 45,
      },
      stroke: 'red'
    })

    let ellipse = new Path({
      d: {
        type: 'circle',
        cx: 400,
        cy: 150,
        r: 40
      },
      fill: '#153'
    })

    layer.append(circle, ellipse)

    layer.draw()
  }
}
</script>
