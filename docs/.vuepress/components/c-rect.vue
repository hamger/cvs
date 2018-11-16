<template>
    <div>
      <Container>
          <div id="text-container" style="width:100%;height:400px"></div>
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
    this.cvs = cvs
    var rect = new Rect({
      x: 100,
      y: 50,
      w: 200,
      h: 100,
      fill: 'blue',
      borderRadius: 5,
    })
    var rect2 = new Rect({
      x: 400,
      y: 50,
      w: 200,
      h: 100,
      fill: 'green',
      borderRadius: [5, 25],
    })
    var rect3 = new Rect({
      x: 100,
      y: 250,
      w: 200,
      h: 100,
      fill: 'pink',
      borderRadius: [5, 15, 35],
    })
    var rect4 = new Rect({
      x: 400,
      y: 250,
      w: 200,
      h: 100,
      fill: 'purple',
      borderRadius: [5, 15, 25, 35],
    })
    cvs.add(rect, rect2, rect3, rect4)
    cvs.draw()
  }
}
</script>
