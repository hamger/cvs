<template>
    <div>
         <Container>
             <div id="container" style="width:100%;height:160px"></div>
         </Container>
    </div>
</template>
<script>
import { Img, Scene } from '../../../src/'
import Container from '../Container'
export default {
  components: {
    Container
  },
  data() {
    return {}
  },
  mounted() {
    (async function () {
      let scene = new Scene({
        containerId: 'container'
      })
      await scene.preload({
        safari: require('../../../static/safari.png')
      })
      let cvs = scene.layer()
      cvs.add(new Img({
        img: 'safari',
        x: 200,
        y: 10
      }))
      cvs.draw()
    })()
  }
}
</script>
