<template>
    <div>
         <Container>
             <div id="path-container" style="width:100%;height:460px"></div>
         </Container>
    </div>
</template>
<script>
import { Cvs, Path } from '../../../src/'
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
      container: document.getElementById('path-container')
    })

    cvs.add(
      new Path({
        path:
          'M 10 10' +
          'L 100 100' +
          'l 30 -50' +
          'C 100 100 200 200 300 200' +
          's 50 50 100 100' +
          'T 130 350' +
          'a 0 50 50 -90 180',
        stroke: '#454'
      })
    )
    cvs.add(
      new Path({
        path: 'M 100 100' + 'L 200 200',
        stroke: 'red',
        startArrow: {
          angle: 15,
          len: 50,
        },
        endArrow: {
          angle: 15,
          len: 30,
        }
      })
    )

    cvs.draw()
  }
}
</script>
