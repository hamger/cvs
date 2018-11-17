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
    layer.add(
      new Text({
        text: 'hello',
        x: 89,
        y: 76,
        font: '48px serif'
      })
    )
    layer.draw()
  }
}
</script>
