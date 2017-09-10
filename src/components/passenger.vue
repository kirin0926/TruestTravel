<template>
	<div>
		<div class="main-content">
			<navTop v-on:updateMe="reRenderMe" v-on:updateVs="reRenderVs" v-on:removeVs="removeVs" :info="info" :vsinfo="vsInfo" :has-vs="true"></navTop>
			<div class="main-top">
				<div class="tab">
					<ul>
						<li class="cl">
							<img class="fl" src="/Public/static/assets/image/tour-icon.png" alt="" />
							<div class="owh">
								<h3>当月接待量</h3>
								<div>{{formatNumber(scenic.month)}} <span>人次</span></div>
							</div>
						</li>
						<li class="cl">
							<img class="fl" src="/Public/static/assets/image/tours-icon.png" alt="" />
							<div class="owh">
								<h3>本年度累计接待量</h3>
								<div>{{formatNumber(scenic.year)}} <span>人次</span></div>
							</div>
						</li>
					</ul>
				</div>
				<div class="tab">
					<div class="title">本地与外地游客占比</div>
					<div class="passenger-bar-charts">
						<div id="myBarChart" class="newStyle" :style="{width:'100%',height:'180px'}"></div>
					</div>
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
	      info:'',
	      vsInfo: {},
	      scenic:{
	      	month:'',
	      	year:'',
	      	percent:[]
	      },
	      pvpass:'',
	      serchcity:'',
	      dbsug:false,
	      selectCity: null,
	      infopass:{
	      	brand:'',
	      	name:'',
	      	cate1:[],
	      	cate2:[]
	      }
		}
	},
	created: function(){
		  	  var self = this;
    			  const info = store.get('travelInfo');
		  	  const month = store.get('travelMonth');
		  	  const vsinfo = store.get('travelVsInfo');
		  	  this.reRenderMe({
			      info:info || {
			        'id': 78 ,
			        'name': '海南槟榔谷黎苗文化旅游区',
			        'type': 4,
			        "province_id": 391,
			        "city_id": 375
			      },
			      month: month || self.monthval || '2017-06'
			    });
			  if(vsinfo){
			  	  this.reRenderVs({
				  	info:vsinfo,
				  	month:month
				  })
			  }
	},
	methods:{
	    formatNumber(value, formatter) {
	      return numeral(value).format(formatter || '0,0');
	    },
		//选择的景区信息		根据type判断进入景区还是景域
		reRenderMe(data){
	      var self = this;
	      if(data.info.province_id){
	      	//为景区
	        self.$router.push('/passenger');
	      }else if(data.info.superior){
	      	//为景域
	        self.$router.push('/visitorflow');
	      };
	      self.$http.post(fixurl + '/Visitor/flow',
	      qs.stringify({
	        data: JSON.stringify(data)
	      })).then(response => {
		      const pageData = response.data;
		      	if(pageData.scenic){
		      		 	self.scenic.month = pageData.scenic.month;
				        self.scenic.year = pageData.scenic.year;
				        self.scenic.percent = pageData.scenic.percent;
				        self.pvpass = pageData.pv;
				        self.infopass.brand = pageData.info.brand;
				        self.infopass.name = pageData.info.name;
				        self.infopass.cate1 = pageData.info.cate1;
				        self.infopass.cate2 = pageData.info.cate2;
				        //nav信息
				        self.info = pageData.info;
				        //柱状混合
						let myChart = self.$echarts.init(document.getElementById('myChart'));
			    			self.$options.methods.myChart(self.pvpass, myChart, self);
			    			//饼图
						let myBarChart = self.$echarts.init(document.getElementById('myBarChart'));
			    			self.$options.methods.myBarChart(self.scenic.percent,myBarChart);
		      	}
	      }).catch(error => console.log(error));
	    },
	    //选择的对比的景区信息
	    reRenderVs(data){
		      var self = this;
		      const subdata = data;
		      console.log(data);
		      if(data.info.province_id){
		      	//为景区对比
		        self.$router.push('/passengercontrast');
		      }else if(data.info.superior){
		      	//为景域对比
		        self.$router.push('/visitorflowcontrast');
		      };
	    },
	    removeVs() {
	      this.vsInfo = {};
	    },
		myChart(data,myChart, self){
			let chartlist = new Array();
			let xdata = new Array();
			for(let i=0;i<data.length;i++){
				chartlist.push({
					'value':Number(data[i][1]).toFixed(2),
					'itemStyle':{
						'normal':{
							'color':'#01aef0'
						}
					}
				})
				xdata.push(data[i][0])
      }
      var legendData = [self.info.name];
		    	//柱折混合图
	    		var lineoption = {
	    			color:['#3c82e3'],
	            tooltip: {
	                trigger: 'axis'
	            },
	            legend: {
	            		right:'40px',
	                data:[{name: self.info.name}]
	            },
	            grid:{
	                    x:65,
	                    y:25,
	                    x2:24,
	                    y2:45,
	                    borderWidth:1,
                      containLabel: true
	            },
	            xAxis: {
	                data: xdata
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
		            data:chartlist
		        	}]
	        };
			myChart.setOption(lineoption)
		},
		myBarChart(data,myBarChart){
				let chartlist = new Array();
				chartlist.push({'value':data[2], 'name':'外地游客','itemStyle':{'normal':{'color':'#03ca99'}}},{'value':data[1], 'name':'本地游客','itemStyle':{'normal':{'color':'#01aef0'}}})
				var Baroption = {
					    title : {
					        text: '',
					        subtext: '',
					        x:'center'
					    },
		//			    tooltip : {
		//			        trigger: 'item',
		//			        formatter: "{a} <br/>{b} : {c} ({d}%)"
		//			    },
					    legend: {
					        orient: 'vertical',
					       	x :10,
					       	y :80,
					        data: ['本地游客','外地游客']
					    },
					    grid: {
					      top:'10%',
					      left:'300px'
					    },
					    series : [
					        {
					            name: '',
					            type: 'pie',
					            radius : '80%',
					            center: ['50%', '60%'],
					            data:chartlist,
					            itemStyle: {
					                emphasis: {
					                    shadowBlur: 10,
					                    shadowOffsetX: 0,
					                    shadowColor: 'rgba(0, 0, 0, 0.5)'
					                }
					            },
					            		label: {
						                normal: {
						                    show: true,
				                            position: 'outside',
				                            formatter: '{b}: {d}%'
						                },
						                emphasis: {
						                    show: true,
						                    textStyle: {
						                        fontSize: '13',
						                        fontWeight: 'bold'
						                    }
						                }
						            },
						            labelLine: {
						                normal: {
						                    show: true
						                }
						        		},
					        }
					    ]
					};
				myBarChart.setOption(Baroption)
		}
	},
	components:{
	     asideLi:aside,
		 navTop:nav
  	}
}
</script>

<style scoped="scoped">
	.tab li img{width:55px;margin-right:16px}
	.tab li{overflow:hidden;padding-bottom:33px;border-bottom:1px solid #e3e8ee}
	.tab li:last-child{padding-top:33px;padding-bottom:0;border-bottom:0}
	.tab li .owh h3{font-size:14px;color:#657180}
	.tab li .owh div{font-size:32px;color:#464c5b}
	.tab li .owh div span{font-size:12px;color:#464c5b}
	.flow-trend{background:#fff;border-radius:8px;box-shadow:5px 5px 3px -5px #909090}
	.flow-trend .title{padding:16px 0 16px 24px;font-size:15px;color:#464c5b}
</style>
