<template>
    <div>
      <Container>
          <div id="text-container" style="width:100%;height:500px"></div>
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
  // destroyed() {
  //   this.cvs = null
  // },
  mounted() {
    let cvs = new Cvs({
      container: document.getElementById('text-container')
    })
    this.cvs = cvs
    cvs.add(
      new Rect({
        x: 100,
        y: 100,
        w: 200,
        h: 100,
        borderRadius: 5,
      })
    )
    cvs.add(
      new Rect({
        x: 400,
        y: 100,
        w: 200,
        h: 100,
        borderRadius: [5, 10],
      })
    )
    cvs.add(
      new Rect({
        x: 100,
        y: 350,
        w: 200,
        h: 100,
        borderRadius: [5, 10, 15],
      })
    )
    cvs.add(
      new Rect({
        x: 400,
        y: 350,
        w: 200,
        h: 100,
        borderRadius: [5, 10, 15, 30],
      })
    )
    cvs.draw()
  }
}
</script>
