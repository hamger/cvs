<template>
    <div>
      <Container>
          <div id="text-container" style="width:100%;height:160px"></div>
      </Container>
    </div>
</template>
<script>
import { Cvs, Poly } from '../../../src/'
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
    cvs.add(
      new Poly({
        points: [{ x: 90, y: 10 }, { x: 134, y: 116 }, { x: 422, y: 155 }],
        stroke: '#198',
        lineWidth: 3
      })
    )
    cvs.draw()
  }
}
</script>
