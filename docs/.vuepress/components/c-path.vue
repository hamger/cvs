<template>
    <div>
         <Container>
             <div id="container" style="width:700px;height:500px"></div>
         </Container>
    </div>
</template>
<script>
import { Cvs, Path, Poly, Arc } from 'cvs'
import Container from '../Container'
    export default{
        components:{
            Container
        },
        data(){
            return{
                
            }
        },
        mounted() {
let cvs = new Cvs({
  container: document.getElementById('container')
})

cvs.add(
  new Path({
    path:
      'M 10 10' +
      'L 100 100' +
      'l 30 -50' +
      'C 100 100 200 200 300 200' +
      's 50 50 100 100' +
      'T 130 500' +
      'a 0 50 50 -90 180',
    stroke: '#454'
  })
)

cvs.add(
  new Poly({
    points: [[90, 190], [34, 56], [222, 333]],
    stroke: '#198',
    lineWidth: 1,
    cache: true
  })
)

cvs.add(
  new Poly({
    points: [[500, 190], [234, 356], [522, 433]],
    fill: '#999',
    cache: true
  })
)

cvs.add(
  new Arc({
    x: 500.3,
    y: 100.4,
    r: 50,
    startAngle: -80,
    endAngle: 20,
    anticlockwise: true,
    cache: true
  })
)

cvs.draw()

        }
    }
</script>
