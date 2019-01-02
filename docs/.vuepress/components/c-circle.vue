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
      x: 130,
      y: 60,
      d: {
        type: 'circle',
        r: 40
      },
      fill: '#153',
      stroke: 'red'
    })

    let ellipse = new Path({
      x: 300,
      y: 60,
      d: {
        type: 'circle',
        r: [60, 40],
      },
      transformOrigin: [60, 40],
      rotate: 45,
      fill: '#329',
      stroke: 'red'
    })


    layer.append(circle, ellipse)

    layer.draw()
  }
}
</script>
