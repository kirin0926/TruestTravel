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
								<h3>本月接待量</h3>
								<div>{{formatNumber(scenicbef.month)}} <span>人次</span></div>
							</div>
						</li>
						<li class="cl">
							<img class="fl" src="/Public/static/assets/image/tours-icon.png" alt="" />
							<div class="owh">
								<h3>本年度累计接待量</h3>
								<div>{{formatNumber(scenicbef.year)}} <span>人次</span></div>
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
								<h3>本月接待量</h3>
								<div>{{formatNumber(scenicaft.month)}} <span>人次</span></div>
							</div>
						</li>
						<li class="cl">
							<img class="fl" src="/Public/static/assets/image/tours-icon.png" alt="" />
							<div class="owh">
								<h3>本年度累计接待量</h3>
								<div>{{formatNumber(scenicaft.year)}} <span>人次</span></div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="main-top">
				<div class="tab">
					<div class="title">本地与外地游客占比</div>
					<div class="passenger-bar-charts">
						<div id="myBarChart" :style="{width:'100%',height:'180px'}"></div>
					</div>
				</div>
				<div class="tab">
					<div class="title"><label class="vsLabel labelvs" v-if="vsInfo.name">{{vsInfo.name}}</label>本地与外地游客占比</div>
					<div class="passenger-bar-charts">
						<div id="myBarRChart" :style="{width:'100%',height:'180px'}"></div>
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
import aside from './aside.vue'
import nav from './nav.vue'
export default{
	data(){
		return{
			monthval:'',
			info:{

			},
			scenicbef:{
				month:'',
				year:''
			},
			legendData:[],
			scenicaft:{
				month:'',
				year:''
			},
			flowconstpv:{
				befpv:[],
				aftpv:[]
			},
      apps: [],
      vsApps: [],
      total:'',
      exponent:'',
      vsInfo: {}
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
		//监听nav 更新的数据
    reRenderMe(data) {
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
					// console.log(pageData);
								self.scenicbef.month = pageData.scenic.month;
								self.scenicbef.year = pageData.scenic.year;
								self.flowconstpv.befpv = pageData.pv;
								//nav信息
								self.info = pageData.info;
								self.legendData.push(self.info.name);
								//柱状混合
								let myChart = self.$echarts.init(document.getElementById('myChart'));
								self.$options.methods.myChart(myChart, self,self.legendData);
								//饼状图
								let myBarChart = self.$echarts.init(document.getElementById('myBarChart'));
								self.$options.methods.myBarChart(pageData.scenic.percent,myBarChart);
      }).catch(error => console.log(error));
    },
    //监听对比信息
    reRenderVs(data){
        var self = this;
        if(data.info.province_id){
          //根据前面进行判断为景区对比
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
	              self.scenicaft.month = pageData.scenic.month;
	              self.scenicaft.year = pageData.scenic.year;
	              self.flowconstpv.aftpv = pageData.pv;
	        		  //柱状混合
	      		  let myChart = self.$echarts.init(document.getElementById('myChart'));
	        		  self.$options.methods.myChart(myChart, self,self.legendData);
	        		  //nav
	          	  self.vsInfo = pageData.info;
	              self.legendData.push(self.vsInfo.name);
	              //饼状图
	          	  let myBarChart = self.$echarts.init(document.getElementById('myBarRChart'));
	              self.$options.methods.myBarChart(pageData.scenic.percent,myBarChart);
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
	myChart(myChart, self,legendData){
      const data = self.flowconstpv;
			var xlinedata = new Array();
			var befseriesdata = new Array();
			var aftseriesdata = new Array();
			// console.log(legendData);
			if(data!=undefined){
        for(let i=0;i<data.befpv.length;i++){
          xlinedata.push(data.befpv[i][0]);
          befseriesdata.push({
            value:data.befpv[i][1]
          })
				}
        for(let i=0;i<data.aftpv.length;i++){
          aftseriesdata.push({
            value:data.aftpv[i][1]
          })
        }
			}
			// console.log(legendData);
      var lineoption = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
            right:'10%',
            data: legendData
        },
        xAxis: {
            data: xlinedata
        },
        yAxis: {
          type: 'value'
        },
        color:['#ffbd2e','#01aef0'],
        series: [{
          name: legendData[0],
          type:'line',
          stack: '总量',
          areaStyle: {normal: {
              color:"#fff8ea"
          }},
             itemStyle: {
               normal: {
                 lineStyle: {
                   color: "#ffbd2e"
                 }
               }
             },
          data:befseriesdata
        },
        {
          name: legendData[1],
          type:'line',
          stack: '总量',
          areaStyle: {normal: {
              color:"#e5f7fd"
          }},
             itemStyle: {
               normal: {
                 lineStyle: {
                   color: "#01aef0"
                 }
               }
             },
          data:aftseriesdata
        }]
      };
			myChart.setOption(lineoption)
		},
	myBarChart(data, myBarChart){

      //饼状图
      var Baroption = {
        legend: {
          orient: 'vertical',
          x :10,
          y :70,
          data: ['本地游客','外地游客']
        },
        grid: {
          top:'20%'
        },
        series : [
          {
            name: '',
            type: 'pie',
            radius : '85%',
            silent: true,
            center: ['60%', '50%'],
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
            data:[
              {value:data[2], name:'外地游客',itemStyle:{normal:{color:'#03ca99'}}},
              {value:data[1], name:'本地游客',itemStyle:{normal:{color:'#01aef0'}}}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      		myBarChart.setOption(Baroption)
		},
	myBarRChart(data,myBarRChart){
			//饼状图
				var Baroption = {
					    title : {
					        text: '',
					        subtext: '',
					        x:'center'
					    },
					    legend: {
					        orient: 'vertical',
					       	x :10,
					       	y :70,
					        data: ['本地游客','外地游客']
					    },
					    grid: {
					      top:'20%'
					    },
					    series : [
					        {
					            name: '',
					            type: 'pie',
					            radius : '55%',
					            center: ['50%', '60%'],
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
					            data:[
					                {value:data[1], name:'外地游客',itemStyle:{normal:{color:'#03ca99'}}},
					                {value:data[2], name:'本地游客',itemStyle:{normal:{color:'#01aef0'}}}
					            ],
					            itemStyle: {
					                emphasis: {
					                    shadowBlur: 10,
					                    shadowOffsetX: 0,
					                    shadowColor: 'rgba(0, 0, 0, 0.5)'
					                }
					            }
					        }
					    ]
					};
				myBarRChart.setOption(Baroption)
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
	
	.vsLabel {padding: 7px 10px;
    color: #fff;
    float: right;
    margin: -6px 20px 0 0;
    position: absolute;
    right: 0;
    text-align: center;
    padding-left: 20px;}
	.tab{padding: 16px 0 16px 24px;}
</style>
