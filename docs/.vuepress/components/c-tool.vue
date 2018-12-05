<template>
    <div>
      <Container>
          <div id="container" style="width:100%;height:600px"></div>
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
    layer.append(
      new Circle({
        r: 50,
        x: 100,
        y: 60
      })
    )
    layer.draw()
  }
}
</script>
