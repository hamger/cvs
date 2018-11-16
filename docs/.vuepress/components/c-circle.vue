<template>
    <div>
      <Container>
          <div id="text-container" style="width:100%;height:160px"></div>
      </Container>
    </div>
</template>
<script>
import { Cvs, Circle } from '../../../src/'
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
      container: document.getElementById('text-container')
    })
    var dot = new Circle({
      r: 50,
      x: 200,
      y: 80
    })
    var sector = new Circle({
      r: 50,
      x: 500,
      y: 80,
      startAngle: 0,
      endAngle: 70,
      anticlockwise: true,
    })
    cvs.add(dot, sector)
    cvs.draw()
  }
}
</script>
