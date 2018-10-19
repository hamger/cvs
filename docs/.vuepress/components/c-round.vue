<template>
  <div>
    <Container>
      <div id="container" style="width:100%;height:160px"></div>
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
    mounted() {
      let cvs = new Cvs({
        container: document.getElementById('container')
      })

      let dot = new Circle({
        x: 0,
        y: 0,
        r: 10,
        cache: true,
        fill: "pink"
      });
      let round = new Round({
        delay: 0,
        duration: 8000,
        retrace: false, // 是否折返
        iterationCount: 1, // 重复次数
        centerX: cvs.width / 2,
        centerY: cvs.height / 2,
        r: 100,
        angle: 180,
        direction: false
      });
      dot.addTrack(round);

      cvs.add(dot)
      cvs.animate()
    }
  }
</script>
