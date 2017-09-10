<template>
	<div>
		<div class="main-content">
			<navTop v-on:updateMe="reRenderMe"
        v-on:updateVs="reRenderVs"
        v-on:removeVs="removeVs"
        :info="info"
        :vsinfo="vsInfo"
        :has-vs="true"></navTop>
			<div class="main-top">
				<div class="tab">
					<ul>
						<li class="cl">
							<img class="fl" src="/Public/static/assets/image/tour-icon.png" alt="" />
							<div class="owh">
								<h3>入省人次</h3>
								<div>{{formatNumber(flowbef.in)}} <span>人次</span></div>
							</div>
						</li>
						<li class="cl">
							<img class="fl" src="/Public/static/assets/image/tours-icon.png" alt="" />
							<div class="owh">
								<h3>出省人次</h3>
								<div>{{formatNumber(flowbef.out)}} <span>人次</span></div>
							</div>
						</li>
					</ul>
				</div>

				<div class="tab">
					<label class="vsLabel labelvs" v-if="vsInfo.name">{{vsInfo.name}}</label>
					<ul>
						<li class="cl">
							<img class="fl" src="/Public/static/assets/image/tour-icon.png" alt="" />
							<div class="owh">
								<h3>入省人次</h3>
								<div>{{formatNumber(flowaft.in)}} <span>人次</span></div>
							</div>
						</li>
						<li class="cl">
							<img class="fl" src="/Public/static/assets/image/tours-icon.png" alt="" />
							<div class="owh">
								<h3>出省人次</h3>
								<div>{{formatNumber(flowaft.out)}} <span>人次</span></div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="rankmain">
				<div class="flow-trend">
					<div class="title">景区客流量走势</div>
					<div class="passenger-line-charts"><div id="myChart" :style="{width:'100%',height:'300px'}"></div></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import qs from 'qs'
import store from 'store'
import numeral from 'numeral'
// import echarts from 'echarts'
import aside from './aside.vue'
import nav from './nav.vue'
export default{
	data(){
		return{
			monthval:'',
			info:{},
			vsinfo:'1',
			flowcont:{
				pvbef:[],
				pvaft:[]
			},
			flowbef:{
				in:'',
				out:''
			},
			flowaft:{
				in:'',
				out:''
			},

	      apps: [],
	      vsApps: [],
	      info: {},
	      total:'',
	      exponent:'',
	      vsInfo: {},
	      
	      legendData:[],
	      seriesdata:{},
	      befxline:[]
		}
	},
	created:function(){
		      const info = store.get('travelInfo');
			  const vsinfo = store.get('travelVsInfo');
		  	  const month = store.get('travelMonth');
		  	  this.reRenderMe({
			      info: info || {
			        'id': 78 ,
			        'name': '海南槟榔谷黎苗文化旅游区',
			        'type': 4,
			        "province_id": 391,
			        "city_id": 375
			      },
			      month: month || self.monthval || '2017-06'
			  });
			  //对比的数据
			  this.reRenderVs({
			      info: vsinfo || {
			        'id': 78 ,
			        'name': '海南槟榔谷黎苗文化旅游区',
			        'type': 4,
			        "province_id": 391,
			        "city_id": 375
			      },
			      month: month || self.monthval || '2017-06'
			  });
	},
	methods:{
		formatNumber(value, formatter) {
	      return numeral(value).format(formatter || '0,0');
	    },
		reRenderMe(data) {
	      var self = this;
	      if(data.info.province_id){
	      	//为景区
	        self.$router.push('/passenger');
	      }else if(data.info.superior){
	      	//为景域
	        self.$router.push('/visitorflow');
	      }
	      self.$http.post(fixurl + '/Visitor/flow',
	      qs.stringify({
	        data: JSON.stringify(data)
	      })).then(response => {
		        const pageData = response.data;
		        self.flowcont.pvbef = pageData.pv;
		        self.flowbef.in = pageData.flow.in;
		        self.flowbef.out = pageData.flow.out;
		        //nav信息
		        self.info = pageData.info;
		        //柱状图数据
		        self.legendData.push(self.info.name);
						//柱状混合
							let myChart = self.$echarts.init(document.getElementById('myChart'))
	    				self.$options.methods.lines(self.legendData,self.flowcont,myChart);
	      }).catch(error => console.log(error));
	    },
	    reRenderVs(data){
		      var self = this;
		      if(data.info.province_id){
		      	//为景区对比
		        self.$router.push('/passengercontrast');
		      }else if(data.info.superior){
		      	//为景域对比
		        self.$router.push('/visitorflowcontrast');
		      };
		      self.$http.post(fixurl + '/Visitor/flow',
		      qs.stringify({
		        data: JSON.stringify(data)
		      })).then(response => {
		        		const pageData = response.data;
		      		self.vsInfo = pageData.info;
		        		self.legendData.push(self.vsInfo.name);
			        self.flowcont.pvaft = pageData.pv;
			        self.flowaft.in = pageData.flow.in;
			        self.flowaft.out = pageData.flow.out;
		        //柱状混合
							let myChart = self.$echarts.init(document.getElementById('myChart'))
	    				self.$options.methods.lines(self.legendData,self.flowcont,myChart);
		      }).catch(error => console.log(error));
	    },
	    removeVs() {
	      this.vsInfo = {};
	      const info = store.get('travelInfo');
	      if(info.province_id){
	        //为景区
	        this.$router.push('/passenger');
	      }else if(info.superior){
	        //为景域
	        this.$router.push('/visitorflow');
	      };
	    },
		lines(legendData,data,myChart){
			var self = this;
			var befxline = new Array();
			var befseriesdata = new Array();
			var aftseriesdata = new Array();
			for(let i=0;i<data.pvaft.length;i++){
				befxline.push(data.pvaft[i][0])
				befseriesdata.push({
					value:data.pvaft[i][1],
		            	itemStyle:{
		            		normal:{
		            			color:'#01aef0'
		            		}
		            	}
				})
			}
			for(let i=0;i<data.pvbef.length;i++){
				aftseriesdata.push({
					value:data.pvbef[i][1],
		            	itemStyle:{
		            		normal:{
		            			color:'#03ca99'
		            		}
		            	}
				})
			};
	    		var lineoption = {
	            tooltip: {},
	            color:['#1dafed','#21c99a'],
	            legend: {
	                data:legendData
	            },
	            xAxis: {
	                data: befxline
	            },
	            yAxis: {
	        			type: 'value'
	            },
	            series: [{
		            name:legendData[0],
		            type:'line',
		            stack: '总量',
		            areaStyle: {normal: {
		            		color:"#e5f7fd"
		            }},
		            itemStyle: {
								normal: {
									lineStyle: {
										color: "#3c82e3"
									}
								}
							},
		            data:befseriesdata
		        	},{
		            name:legendData[1],
		            type:'line',
		            stack: '总量',
		            areaStyle: {normal: {
		            		color:"#e6faf5"
		            }},
		            itemStyle: {
				      	normal: {
									lineStyle: {
										color: "#21c99a"
									}
								}
				    },
		            data:aftseriesdata
		        	}]
	        };
			myChart.setOption(lineoption)
		}
	},
	components:{
		asideLi:aside,
		navTop:nav
	}
}
</script>

<style scoped="scoped">
	.tab li img{
		width: 55px;
		margin-right: 16px;
	}
	.tab li{
		overflow: hidden;
		padding-bottom: 33px;
		border-bottom: 1px solid #e3e8ee;
	}
	.tab li:last-child{
		padding-top: 33px;
		padding-bottom: 0;
    		border-bottom: 0;
	}
	.tab li .owh h3{
		font-size: 14px;
		color: #657180;
	}
	.tab li .owh div{
		font-size: 32px;
		color: #464c5b;
	}
	.tab li .owh div span{
		font-size: 12px;
		color: #464c5b;
	}
	.flow-trend{
		/*width: 1136px;*/
		background: #fff;
		border-radius: 8px;
		box-shadow: 5px 5px 3px -5px #909090;
	}
	.flow-trend .title{
		padding: 16px 0 16px 24px;
		font-size: 15px;
		color: #464c5b;
	}
	#myLBarChart,#myRBarChart{
		width: 100%;
		height: 243px;
	}
	.vsLabel {padding: 7px 10px;
    color: #fff;
    float: right;
    margin: -6px 20px 0 0;
    position: absolute;
    right: 0;
    text-align: center;
    padding-left: 20px;}
</style>
