<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import aside from '@/components/aside'
export default {
  name: 'app',
  data(){
		return{
			layout:true
		}
  },
  components:{
     asideLi:aside
  },
  created:function(){
  		var type = this.$route.path.replace('/','');
  		if(type=='diypage'){
			this.layout = false
  		}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
      height: 100%;
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
    max-width: 1920px;
    min-width: 1000px;
    margin: 0 auto;
}
body{
	height: 100%;
}
</style>
