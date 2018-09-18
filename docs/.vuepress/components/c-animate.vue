<template>
    <div>
         <Container>
             <div id="container" style="width:100%;height:500px"></div>
         </Container>
    </div>
</template>

<script>
import { Cvs, Circle, Rect } from 'cvs'
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
      container: document.getElementById('container')
    })
    const dotCount = 3
    let r = 10
    let dots = []
    for (var i = 0; i < dotCount; i++) {
      r = r + 0.5
      var x = Math.random() * cvs.width
      var y = Math.random() * cvs.height
      let dot = new Rect({
        angle: 0,
        x,
        y,
        w: 100,
        h: 80,
        cache: true
      })
      dots.push(dot)
      cvs.add(dot)
    }
    function move() {
      dots.forEach((dot, i) => {
        if (i === 0) {
          dot.circling({
            relativeX: 50,
            relativeY: 40,
            vpx: cvs.width / 2,
            vpy: cvs.height / 2,
            r: 200,
            speed: 0.01
          })
        } else if (i === 1) {
          dot.elliptic({
            relativeX: 50,
            relativeY: 40,
            vpx: cvs.width / 2,
            vpy: cvs.height / 2,
            radiusX: 400,
            radiusY: 200,
            speed: 0.03
          })
        } else {
          dot.line({
            endX: cvs.width / 2 - 50,
            endY: cvs.height / 2 - 40,
            time: 1000
          })
        }
      })
      cvs.draw()
    }
    cvs.animate(move)
  }
}
</script>
