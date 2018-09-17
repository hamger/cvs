<template>
    <div>
         <Container>
             <div id="container" style="width:700px;height:500px"></div>
         </Container>
    </div>
</template>
<script>
import { Cvs,Img } from 'cvs'
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

// 准备图片元素对象
var img = new Image()
img.src = 'http://olislpb6q.bkt.clouddn.com/safari.png'

// 当图片准备以后再绘制
img.onload = function () {
  // 绘制图片,按照图片本身的大小进行加载
  let dx = 0
  let dy = 0
  var element = new Img({
    img: img,
    dx: dx,
    dy: dy,
    cache: true
  })
  cvs.add(element)
  function move () {
    element.attr({
      dx: dx++,
      dy: dy++
    })
    cvs.draw()
  }
  cvs.animate(move)
}

        }
    }
</script>
