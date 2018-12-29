<template>
  <div>
    <Container>
      <div id="path-container" style="width:100%;height:260px"></div>
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
      containerId: 'path-container'
    })
    let layer = scene.layer()

    var ele = new Path({
      x: 200,
      y: 10,
      d:
        'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z',
      rotate: 45,
      scale: 6,
      stroke: 'red',
      lineWidth: 4
    })

    layer.append(ele)

    layer.draw()
  }
}
</script>
