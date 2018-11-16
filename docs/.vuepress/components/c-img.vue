<template>
    <div>
         <Container>
             <div id="img-container" style="width:100%;height:160px"></div>
         </Container>
    </div>
</template>
<script>
import { Cvs, Img } from '../../../src/'
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
      let cvs = new Cvs({
        container: document.getElementById('img-container')
      })
      await cvs.preload({
        safari: require('../../../static/safari.png')
      })
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
