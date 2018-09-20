<template>
  <div id="app">
   <div class="regist-container"> 
      <regist-input></regist-input>
      <rules></rules>
   </div>
  </div>
</template>

<script>
import registInput from "./regist_input/index"
import rules from "./regist_input/rules"

export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  components:{
    registInput,
    rules
  }
}
</script>

<style >
  #app{
    width: 100%;
    height: 100%;
  }
  .regist-container{
    margin-top: -2px;
    background-color: #ffe5e7;
    background-image:url(../images/dabeijing.png);
    background-repeat: no-repeat;
    -webkit-background-size: 750px auto;
    background-size: 750px auto;
    background-position: center 0;
    padding-top: 822px;
  }
</style>
