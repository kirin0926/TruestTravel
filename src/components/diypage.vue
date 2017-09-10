<template>
	<div class="bg" v-bind:style="{backgroundImage:'url(' + img + ')'}">
		<nav class="owh">
			<div class="logo-box">
				<img class="diypage-logo" src="/Public/static/assets/image/trusttravel.png" alt="个性化定制主页" />
				<div class="logo-title">个性化定制主页
					<div class="login-menu fr">
						burke@sina.com
					</div>
				</div>
			</div>
		</nav>
		<div class="switch" v-show="schedule">
			<div class="diypage-schedule">
				<span>1</span>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<span :style="{opacity: '0.25'}">2</span>
			</div>
			<div class="diypage-tips"><h3>请问您是？</h3><p>选择您的身份</p></div>
			<div class="switch-chiose-box">
				<div class="switch-chiose" @click=" layout='area' ">
					<img src="/Public/static/assets/image/diypage-area.jpg" alt="我是旅游局" />
					<div class="text">我是旅游局</div>
					<div class="cover-area" :class="{ active:layout == 'area' }"><div class="cover-area-circ">
            <i class="el-icon-check"></i></div></div>
				</div>
				<div class="switch-chiose" @click=" layout='tourst' ">
					<img src="/Public/static/assets/image/diypage-tourst.jpg" alt="我是景区管理" />
					<div class="text">我是景区管理</div>
					<div class="cover-area" :class="{ active:layout == 'tourst' }"><div class="cover-area-circ">
            <i class="el-icon-check"></i></div></div>
				</div>
			</div>
			<div class="submit-next"><button v-on:click="next()" :disabled="layout === ''">下一步</button></div>
		</div>

		<div class="chiosearea" v-show="area">
			<div class="diypage-schedule">
				<span :style="{opacity: '0.25'}">1</span>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<span>2</span>
			</div>
			<div class="diypage-tips">
				<h3 v-if="layout=='area'">请选择您的主要关注景域</h3>
				<h3 v-else="layout=='tourst'">请选择您的主要关注景区</h3>
				<p v-if="layout=='area'">选择省份或城市</p>
				<p v-else="layout=='tourst'"></p>
			</div>
			<div class="serch-city" v-if="layout=='area'">
		        <el-autocomplete
		          class="serch-city-input"
		          v-model="serchcity"
		          :props="{value:'id', label: 'name'}"
		          :fetch-suggestions="inputCity"
		          @select="handleSelect"
		          :trigger-on-focus="false"
		          placeholder="输入关键词搜索省份和城市..."
		        ></el-autocomplete>
			</div>
			<div class="serch-city" v-else="layout=='tourst'">
		        <el-autocomplete
		          class="serch-city-input"
		          v-model="serchcity"
		          :props="{value:'id', label: 'name'}"
		          :fetch-suggestions="inputCity"
		          @select="handleSelect"
		          :trigger-on-focus="false"
		          placeholder="输入关键词搜索景区..."
		        ></el-autocomplete>
			</div>
			<div class="city-list" v-if="layout =='tourst'">
				<h3>热门景区</h3>
				<table cellspacing="10">
					<tr><td v-for="li in cityData" :data-cityid = "li.city_id" :data-id = "li.id" :data-province = "li.province_id" @click="chiosehot(li.name)">{{li.name}}</td></tr>
				</table>
			</div>
			<div class="city-list" v-else="layout =='area'">
				<h3>热门省份和城市</h3>
				<table cellspacing="10">
					<tr><td v-for="li in cityData" :data-cityid = "li.city_id" :data-id = "li.id" :data-province = "li.province_id" @click="chiosehot(li.name)">{{li.name}}</td></tr>
				</table>
			</div>
			<div class="submit-over"><button @click="over()">完成，进入主页</button></div>
		</div>
	</div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'app',
  data(){
		return{
			img:'/Public/static/assets/image/diypage-bg.jpg',
			chiose:'',
			layout:'',
			area:false,
			schedule:true,
			cityData:'',
			serchcity:'',
		      dbsug:false,
		      selectCity: null
		}
  },
  created:function(){

  },
  methods:{
  	next:function(){
        if (!this.layout) {
          this.open3('请选择您的身份！');
          return ;
        }
        this.schedule = false;
	  		this.area = true;
  	},
    open3:function(msg){
	      this.$message({
	        showClose: true,
	        message: msg,
	        type: 'warning'
	      });
    },
  	chiosehot:function(name){
		  this.serchcity = name;
  	},
  	inputCity:function(queryString, cb){
	      if (queryString) {
	        const scope = this.layout == 'area' ? 6 : 4;
	        var self = this;
	        self.$http.post(fixurl + '/Customize/select',
	          qs.stringify({
	            'data': JSON.stringify({
	                search: {
		                scope: scope,
		                name: queryString
		              }
	          	})
	          })).then((response) => {
	          	cb(response.data);
	          }).catch(function (error) {
	          	console.log(error);
	          });
	      }
    },
    handleSelect(item) {
//	      console.log(item);
	      this.serchcity = item.name;
	      this.selectCity = item;
//	      console.log(this.selectCity);
    },
  	over:function(){
      	  var self = this;
	      if (!this.selectCity) {
	        this.open3('请选择您的主要关注景域!');
	        return ;
	      }
	      self.$http.post(fixurl+'/Customize/customize',
	        qs.stringify({
	          data: window.JSON.stringify({
	            info: self.selectCity
	          })
	        }))
	      .then(function (response) {
	        if (response.data && response.data.code == 0) {
	          self.$router.push('/index')
	        }
	      })
	      .catch(function (error) {
	        console.log(error);
	      });
  	}
  }
}
</script>

<style scoped="scoped">
.logo-title {
  position: relative;
  padding-left: 170px;
}
.logo-title::before {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 159px;
  margin-top: -3px;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background: #fff;
}
	.bg{width:100%;min-height:900px;height:100%;background-size:100%;overflow:hidden}
	.diypage-logo{height:40px;float:left;margin-right:8px}
	nav{padding:8px 32px;border-bottom:1px solid #aac7e0}
	.logo-box{overflow:hidden;margin:15px 0;line-height:40px;color:#FFF;font-size:16px}
	.diypage-schedule{max-width:1200px;min-width:1000px;margin:0 auto;margin-top:37.5px}
	.diypage-schedule span{
    width:70px;height:70px;display:inline-block;background:#FFF;border-radius:35px;
    line-height:75px;font-size:40px;color:#657180;position:relative;top:7px}
	.diypage-schedule i{
    width:8px;height:8px;display:inline-block;
    background:rgba(255, 255, 255, 0.8);border-radius:4px;margin:0 17.5px}
	.diypage-tips{margin:60px 0}
	.diypage-tips h3{font-size:24px;color:#fff;font-weight:800}
	.diypage-tips p{color:#FFF;font-size:14px;margin-top:5px}
	.switch-chiose-box{max-width:1200px;min-width:1000px;margin:0 auto;display:flex}
	.switch{margin:auto 240px;text-align:center;max-width:1200px;min-width:1000px;margin:0 auto}
	.chiosearea{text-align:center;max-width:1200px;min-width:1000px;margin:0 auto}
  .switch-chiose{width:361px;display:inline-block;margin:0 115px;cursor:pointer;position: relative;
    border-radius: 12px;
    overflow: hidden;
  }
	.switch-chiose img{width:100%;border-radius: 12px 12px 0 0;}
	.switch-chiose .text{
    color:#657180;background:#FFF;text-align:center;padding:26px;font-size:20px;margin-top:-5px;
    border-radius: 0 0 12px 12px;
    }
	.submit-next{margin-top:80px}
	.submit-next button{
    height:48px;width:240px;background:#fff;border:none;border-radius:24px;font-size:14px;color:#657180}

  .submit-next button[disabled] {
    opacity: 0.3;
  }
	.submit-over{margin-top:60px}
  .submit-over button{height:48px;width:240px;background:#fff;border:none;
  border-radius:24px;font-size:14px;color:#657180}
	.serch-city-input {
    width:930px;height:48px;
    padding: 0 20px;
    border:1px solid #fff;border-radius:24px;
    background:rgba(255,255,255,.22);color:#FFF;font-size:14px}
  .serch-city-input::-webkit-input-placeholder{color:#FFF;font-size:14px}

	.city-list h3{text-align:left;font-size:16px;color:#fff;padding-left:13px;margin-bottom:10px}
	.city-list{width:990px;margin:0 auto;margin-top:20px}
	.city-list tr td{height:32px;color:#fff;cursor:pointer;font-size:14px}
	.city-list tr td:hover{background:#FFF;color:#1c9fe2;border-radius:4px}
	.cover-area{position: absolute;width: 361px;height: 310px;top: 0;background: rgba(255,255,255,0.5);display: none;}
	.cover-area.active{display: block;}
	.cover-area-circ {
    width: 120px;height: 120px;margin: 95px auto;background: #FFFFFF;border-radius: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cover-area-circ i {
    font-size: 40px;
    font-weight: 100;
    color: #01AEF0;
    opacity: 0.6;
  }
	/*输入框*/
	.serch-city{
		position: relative;
	}
	.bdsug{
		width: 920px;
	    text-align: left;
	    margin: 0 auto;
	    position: absolute;
	    left: 140px;
	    background: #FFFFFF;
	}
	.bdsug ul li{
		height: 32px;
	    line-height: 32px;
	    font-size: 13px;
	    padding: 0 8px;
	}
	.bdsug ul li:hover{
		background: #eff0f2;
	}
</style>
<style>
.serch-city-input .el-input__inner {
  height: 48px;
  width: 100%;
  border: 0;
  background: transparent;
  color: #fff;
}
.serch-city-input .el-input__inner::-webkit-input-placeholder {
  color: #fff;
}
.serch-city-input .el-input__inner:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #fff;
}
.serch-city-input .el-input__inner::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #fff;
}
.serch-city-input .el-input__inner:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #fff;
}

@media screen and ( max-width: 1400px ) {
  .logo-box {
    margin: 6px 0 !important;
  }
  .diypage-schedule {
    margin-top: 20px !important;
  }
  .diypage-schedule span {
    height: 64px !important;
    width: 64px !important;
    line-height: 70px !important;
    font-size: 36px !important;
  }
  .diypage-tips p {
    margin-left: -20px;
  }
  .diypage-tips {
    margin: 10px 0 !important;
  }
  .cover-area {
    height: 298px !important;
  }
  .city-list {
    margin-top: 10px !important;
  }
  .bg {
    min-height: 700px !important;
  }
  .submit-next {
    margin-top: 60px !important;
  }
  .switch-chiose .text {
    padding: 20px !important;
  }
}
</style>
