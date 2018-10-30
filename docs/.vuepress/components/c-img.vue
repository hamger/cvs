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
    let cvs = new Cvs({
      container: document.getElementById('img-container')
    })

    let img = new Image()
    img.src = 'http://olislpb6q.bkt.clouddn.com/safari.png'

    img.onload = function() {
      cvs.add(new Img({
        img: img,
        dx: 200,
        dy: 10
      }))
      cvs.draw()
    }
  }
}
</script>
