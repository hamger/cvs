<template>
    <div>
      <Container>
          <div id="text-container" style="width:100%;height:160px"></div>
      </Container>
    </div>
</template>
<script>
import { Cvs, Rect } from '../../../src/'
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
      new Rect({
        x: 100,
        y: 30,
        fill: '#19da3f',
        w: 180,
        h: 80,
        borderRadius: 10
      })
    )
    cvs.draw()
  }
}
</script>
