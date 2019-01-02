<template>
    <div>
      <Container>
          <div id="container" style="width:100%;height:160px"></div>
      </Container>
    </div>
</template>
<script>
import { Text, Scene } from '#'
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
    layer.append(
      new Text({
        text: 'hello\nworld',
        x: 89,
        y: 16,
        font: '48px serif',
        stroke: 'blue',
        fill: 'red',
      })
    )
    layer.draw()
  }
}
</script>
