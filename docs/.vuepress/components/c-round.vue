<template>
  <div>
    <Container>
      <div id="container" style="width:100%;height:300px"></div>
    </Container>
  </div>
</template>
<script>
import { Cvs, Round, Circle } from '../../../src/'
import Container from '../Container'
export default {
  components: {
    Container
  },
  data() {
    return {}
  },
  destroyed() {
    this.cvs.cancelAnimate()
  },
  mounted() {
    let cvs = new Cvs({
      container: document.getElementById('container')
    })
    this.cvs = cvs
    let dot = new Circle({
      x: cvs.width / 2 + 50,
      y: cvs.height / 2,
      r: 10,
      cache: true,
      fill: "pink"
    });
    let sdot = new Circle({
      x: cvs.width / 2,
      y: cvs.height / 2 - 100,
      r: 10,
      cache: true,
      fill: "blue"
    });
    let cd = new Circle({
      x: cvs.width / 2,
      y: cvs.height / 2,
      r: 10,
      cache: true
    });
    let round = new Round({
      delay: 0,
      duration: 3000,
      retrace: false, // 是否折返
      iterationCount: 10, // 重复次数
      centerX: cvs.width / 2,
      centerY: cvs.height / 2,
      anticlockwise: false
    });
    let sround = new Round({
      delay: 0,
      duration: 3000,
      retrace: false, // 是否折返
      iterationCount: 10, // 重复次数
      centerX: cvs.width / 2,
      centerY: cvs.height / 2,
      anticlockwise: false
    });
    dot.addTrack(round)
    sdot.addTrack(sround)

    cvs.add(dot, sdot, cd);
    cvs.animate();
  }
}
</script>
