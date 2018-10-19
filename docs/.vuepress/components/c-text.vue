<template>
    <div>
      <Container>
          <div id="text-container" style="width:100%;height:160px"></div>
      </Container>
    </div>
</template>
<script>
import { Cvs, Text } from 'cvs'
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
      new Text({
        text: 'hello',
        x: 89,
        y: 76,
        font: '48px serif'
      })
    )
    cvs.draw()
  }
}
</script>
