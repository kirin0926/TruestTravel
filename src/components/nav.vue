<template>
	<div>
		<nav class="nav-top">
				<div class="fl">
			          <!--<el-tooltip class="item" effect="dark" :content="info.name" placement="bottom">-->
			            <div class="title" >{{info.name || serchcity}}</div>
			          <!--</el-tooltip>-->
		            <!--<div class="desc" v-if="vsinfo.brand">
		              <div class="meau-name" v-if="info.brand">级别：{{info.brand}}</div>
		              <div class="meau-par" v-if="info.brand">
		              	<span>{{info.cate1[0]}}</span><span>{{info.cate2[0]}}</span>
		              	<ul class="meau-select" style="display: none;">
			              	<li>{{info.cate1[0]}}</li>
			              	<li>{{info.cate2[0]}}</li>
			            </ul>
		              </div>
		            </div>-->
		            <div class="ranking" v-if="ranking!=undefined">
		            		<h3>全国排名</h3>
		            		<div>
		            			<span class="num">{{ranking.ranking}}</span>
		            			<span class="swim">{{ranking.increase}}
                        <span :class="ranking.increase >= 0 ? 'triangle-topright' : 'triangle-bottomright' "></span>
                      </span>
		            		</div>
		            </div>
		       </div>
		        <div class="fl vsinfo" v-if="vsinfo && vsinfo.name">
		              <!--<el-tooltip class="item" effect="dark" :content="vsinfo.name" placement="bottom">-->
		                <div class="title" >vs.{{vsinfo.name || serchcity}}</div>
		              <!--</el-tooltip>-->
		        		<!--<div class="desc" v-if="vsinfo.brand">
		        			<div class="meau-name" v-if="vsinfo.brand">级别：{{vsinfo.brand}}</div>
		              	<div class="meau-par" v-if="vsinfo.cate1 || vsinfo.cate2">
			              	<span v-if="vsinfo.cate1">{{vsinfo.cate1[0]}}</span>
			              	<span v-if="vsinfo.cate2">{{vsinfo.cate2[0]}}</span>
                      	  <ul class="meau-select" style="display: none;">
				              	<li v-if="vsinfo.cate1">{{vsinfo.cate1[0]}}</li>
				              	<li v-if="vsinfo.cate2">{{vsinfo.cate2[0]}}</li>
				              </ul>
			              </div>
		        		</div>-->
		        </div>
				<div class="owh tr" style="display: flex;">
          <el-autocomplete
            class="search-prv"
            v-model="serchcity"
            :props="{value:'id', label: 'name'}"
            :fetch-suggestions="inputCity"
            @select="handleSelect"
            :trigger-on-focus="false"
            placeholder="输入关键词搜索省市或景区"
          ></el-autocomplete>
           <el-autocomplete v-if="hasVs"
            class="add-contrast"
            v-model="serchVsCity"
            :props="{value:'id', label: 'name'}"
            :fetch-suggestions="inputVsCity"
            @select="handleVsSelect"
            :trigger-on-focus="false"
            placeholder="添加对比"
            :icon="icon"
            :on-icon-click="removeVs"
          ></el-autocomplete>
					 <!-- <input class="search-prv" type="text" placeholder="输入关键词搜索省市或景区"/>  -->
					 <!-- <input class="add-contrast" type="text" placeholder="添加对比"/> -->
					<el-date-picker v-model="monthval" type="month" placeholder="选择月"
            @change="monthChanged" :editable="false" :picker-options="pickerOptions"
          > </el-date-picker>
				</div>
		</nav>
	</div>
</template>

<script>
import qs from 'qs';
import store from 'store';
import numeral from 'numeral';
export default {
	data() {
      const now = new Date();
//    		store.set('travelMonth', this.formatDate(new Date(now.getFullYear(), now.getMonth() - 2, 1)))
			return {
//		        monthval: new Date(now.getFullYear(), now.getMonth() - 2, 1),
				monthval: store.get('travelMonth'),
		        serchcity: '',
//		        selectCity: '',
		        serchVsCity: '',
		        pickerOptions: {
		          disabledDate: (date) => {
		            return +date > Date.now();
		          }
		        }
			}
    },
    computed: {
      icon(){
      	if(this.serchVsCity){
	        return this.serchVsCity.length > 0 ? 'circle-cross' : ''
      	}
      }
    },
    props: ['info','vsinfo', 'hasVs', 'updateUrl','ranking','noSearch'],
    created:function(){
				var self = this;
				const info = store.get('travelInfo');
    		const vsinfo = store.get('travelVsInfo');
				if(info){
					self.serchcity = info.name;
				}
				if(vsinfo){
					self.serchVsCity = vsinfo.name;
				}
    },
    methods: {
    	  //获取年月 返回年月
      formatDate(value) {
        let month = value.getMonth() + 1;
        month = month > 9 ? month : '0' + month;
        return value.getFullYear() + '-' + month;
      },
      //输入城市  queryString 输入的关键词  cb
      inputCity(queryString, cb) {
        if (queryString) {
          // TODO: 对比的scope按照当前选择的scope来定。
          const scope = 7;
          var self = this;
          self.$http.post(fixurl + '/Main/select', qs.stringify({
            'data': JSON.stringify({
                search: {
                scope: scope,
                name: queryString
              }
          }) })).then((response) => {
            cb(response.data);
          }).catch(function (error) {
            console.log(error);
          });
        }
      },
      //输入对比
      inputVsCity(queryString, cb) {
        if (queryString) {
          // TODO: 对比的scope按照当前选择的scope来定。
          const travelInfo = store.get('travelInfo');
          const scope = 7;
          var self = this;
          self.$http.post(fixurl + '/Main/select', qs.stringify({
            'data': JSON.stringify({
                search: {
                scope: scope,
                name: queryString
              }
          }) })).then((response) => {
            cb(response.data);
          }).catch(function(error){
            console.log(error);
          });
        }
      },
      //选择的景区信息
      handleSelect(item) {
	      	console.log(item);
	        this.serchcity = item.name;
	        var self = this;
	        store.set('travelInfo', item);
	        console.log(self.monthval);
//	        const month = self.formatDate(self.monthval);
          store.set('travelMonth', self.monthval);
	        //将子组件信息上传
	        self.$emit('updateMe',{
	          info: item,
	          month: self.monthval
	        });
      },
      //选择的对比的景区信息
      handleVsSelect(item){
	        const self = this;
	        this.serchVsCity = item.name;
	        store.set('travelVsInfo', item);
	        let month = store.get('travelMonth');
	        if(!month){
	          month = this.formatDate(self.monthval);
	          store.set('travelMonth', month);
          	}
	        //把组件信息传给父组件
	        this.$emit('updateVs',{
	          info: item,
	          month: month
	        });
      },
      //更改月份
      monthChanged(month){
      	store.set('travelMonth', month);
      	console.log(month);
        if(this.noSearch){
          this.$emit('monthChanged',month);
        } else {
          this.$emit('updateMe', {
            info: store.get('travelInfo'),
            month: month
        	});
          if (this.serchVsCity) {
            this.$emit('updateVs', {
              info: this.serchVsCity,
              month: month
            });
          }
        }
      },
      //益处对比方法
      removeVs () {
        this.serchVsCity = '';
        this.$emit('removeVs');
	    store.set('travelVsInfo', '');
      }
    }
}
</script>

<style scoped>
.nav-top {
  background: #677a87 url(/Public/static/assets/image/nav-top-bg.png) no-repeat 233px top;
  background-size: 100% 76px;
  padding: 17px 20px;
  border-left: 1px solid #677a87;
  box-sizing: border-box;
  height: 71px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  padding-left: 260px;
  width: 100%;
  z-index: 250;
}
.nav-top .title{
	font-size: 15px;
  font-weight: 600;
  max-width: 190px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.desc {
  	color: #fff;
    float: left;
    margin-right: 24px;
}
.owh .el-date-editor.el-input {
  width: 115px;
}
.meau-par{
	/*position: relative;*/
	padding-top: 5px;
}
.meau-name{
	padding: 3px;
}
.meau-par span{
	padding: 3px;
}
.meau-par span:first-child{
	background: #313f49;
    margin-right: 5px;
}
.meau-select{
	position: absolute;
	margin-top: 5px;
}
.meau-select li{
	background: #24343f;
	color: #FFFFFF;
	padding: 3px;
	cursor: pointer;
}
.nav-top .ranking{
    float: left;
    background: #FFFFFF;
    padding: 10px 12px;
    position: relative;
    border-radius: 8px;
    margin-top: -14px;
    top: 6px;
}
.nav-top .ranking h3{
	font-size: 13px;
	color: #464c5b;
}
.nav-top .ranking .num{
	font-size: 14px;
	color: #464c5b;
	font-weight: 600;
}
.nav-top .ranking .swim{
	font-size: 12px;
	margin-left: 8px;
	color: #464c5b;
}

.triangle-topright {
  	width: 0;
	height: 0;
	border-top: 6px solid #03ca99;
  	border-left: 6px solid transparent;
  	display: inline-block;
  	position: relative;
  	transform: rotate(-45deg);
  	/* top: 14px;
  	left: -12px; */
}
.triangle-topright::before {
  	content: '';
  	display: block;
  	position: absolute;
  	height: 4px;
  	width: 2px;
  	background: #03ca99;
  	-webkit-transform: rotate(45deg);
  	transform: rotate(45deg);
  	top: -4px;
  	left: -5px;
}
.triangle-bottomright {
  	width: 0;
	height: 0;
	border-bottom: 6px solid red;
	border-left: 6px solid transparent;
  	display: inline-block;
  	position: relative;
  	transform: rotate(45deg);
  	/* top: 18px;
  	left: -12px; */
}
.triangle-bottomright::before {
  	content: '';
  	display: block;
  	position: absolute;
  	height: 4px;
  	width: 2px;
  	background: red;
  	transform: rotate(-45deg);
  	top: 0px;
  	left: -5px;
}
</style>

<style>
.search-prv,
.add-contrast {
  	padding: 0 14px;
}
.add-contrast {
  	padding-right: 6px;
}
.search-prv .el-input__inner,
.add-contrast .el-input__inner {
  	height: 34px;
  	line-height: 34px;
  	width: 100%;
  	border: 0;
  	background: #fff;
  	color: #6b7d89;
}
.add-contrast .el-input__inner {
  color: #1eaee2;
  width: 90px;
  transition: width 0.2s ease;
}
.add-contrast .el-input__inner:focus {
  width: 200px;
  transition: width 0.2s;
}
.search-prv .el-input__inner::-webkit-input-placeholder {
  color: #999;
}
.search-prv .el-input__inner:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #999;
}
.search-prv .el-input__inner::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #999;
}
.search-prv .el-input__inner:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #999;
}
.el-input__inner{
	background: none;
    border: none;
    color: #fff;
}
</style>
