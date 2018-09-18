<template>
    <div>
         <Container>
             <div id="container" style="width:700px;height:500px"></div>
         </Container>
    </div>
</template>
<script>
import { Cvs, Text } from 'cvs'
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
var cvs = new Cvs({
  container: document.getElementById('container')
})

cvs.add(
  new Text({
    text: 'hello',
    x: 89,
    y: 76,
    font: '48px serif'
  })
)

cvs.add(
  new Text({
    text: 'hanger',
    x: 189,
    y: 76,
    fontSize: 43
  })
)
cvs.draw()

        }
    }
</script>
