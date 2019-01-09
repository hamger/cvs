<template>
    <div>
         <Container>
             <div id="container" style="width:100%;height:160px"></div>
         </Container>
    </div>
</template>
<script>
import { Image, Scene } from '#'
import Container from '../Container'
export default {
  components: {
    Container
  },
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(function () {
      (async function () {
        let scene = new Scene({ containerId: 'container' })
        await scene.preload({
          safari: require('../../../static/safari.png')
        })
        let layer = scene.layer()
        layer.append(new Image({
          image: 'safari',
          x: 200,
          y: 10
        }))
        layer.draw()
      })()
    })
  }
}
</script>
