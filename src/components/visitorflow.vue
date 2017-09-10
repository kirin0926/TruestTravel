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
								<h3 v-if="infotype==1">入市人次</h3>
								<h3 v-else-if="infotype==2">入省人次</h3>
								<div>{{formatNumber(visitorflow.in)}} <span>人次</span></div>
							</div>
						</li>
						<li class="cl">
							<img class="fl" src="/Public/static/assets/image/tours-icon.png" alt="" />
							<div class="owh">
								<h3 v-if="infotype==1">出市人次</h3>
								<h3 v-else-if="infotype==2">出省人次</h3>
								<div>{{formatNumber(visitorflow.out)}} <span>人次</span></div>
							</div>
						</li>
					</ul>
				</div>
				<div class="tab" style="padding: 0;width: 72%;height: 258px;">
					<div class="flow-trend">
						<div class="title">景域客流量走势</div>
						<div class="passenger-line-charts"><div id="myChart" :style="{width:'100%',height:'205px'}"></div></div>
					</div>
				</div>
			</div>
			<div class="rankmain" style="position: relative;padding: 0;height:500px">
					<div class="tab-switch">
						<ul>
							<li :class="{ active:hotlayout == 'natives' }" @click=" tabhot('natives')">整体热力图</li>
							<li :class="{ active:hotlayout == 'visitor' }" @click=" tabhot('visitor')">游客热力图</li>
						</ul>
					</div>
					<div id="container" style="height: 100%;"></div>
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
			infotype:'',
			vsInfo:{},
			hotlayout:'natives',
			hotdata:{
				natives:{
					banlance:'',
					data:[]
				},
				visitor:{
					banlance:'',
					data:[]
				}
			},
			visitorflow:{
				in:'',
				out:''
			},
			visitorinfo:{
				name:''
			},
			visitorpv:[],
		      apps: [],
		      vsApps: [],
		      total:'',
		      exponent:'',
		}
	},
	created:function(){
		  var self = this;
    			  const info = store.get('travelInfo');
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
	},
	methods:{
		formatNumber(value, formatter) {
	      return numeral(value).format(formatter || '0,0');
	    },
		tabhot(name){
				this.hotlayout = name;
				var self = this;
				if(self.hotlayout =='visitor'){
		        		self.$options.methods.container(self.info.name,self.hotdata.visitor.data);
				}else if(self.hotlayout == 'natives'){
		        		self.$options.methods.container(self.info.name,self.hotdata.natives.data);
				}
		},
		reRenderMe(data) {
	      var self = this;
		      self.infotype = data.info.type;
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
	        		if(pageData.flow !=undefined){
			        self.visitorflow.in = pageData.flow.in;
			        self.visitorflow.out = pageData.flow.out;
			        //热力图数据
			        self.hotdata.natives.banlance = pageData.flow.latlng.native.banlance;
			        self.hotdata.natives.data = pageData.flow.latlng.native.data;
			        self.hotdata.visitor.banlance = pageData.flow.latlng.visitor.banlance;
			        self.hotdata.visitor.data = pageData.flow.latlng.visitor.data;
			        self.visitorinfo.name = pageData.info.name;
			        self.visitorpv = pageData.pv;
			        //nav信息
			        self.info = pageData.info;
			        //柱状图和折线图
					let myChart = self.$echarts.init(document.getElementById('myChart'));
		    			self.$options.methods.myChart(self.info.name,self.visitorpv,myChart);
		    			self.tabhot(self.hotlayout);
	        		}
	      }).catch(error => console.log(error));
	    },
	    reRenderVs(data) {
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
		        self.vsInfo = data.info;
		        self.$router.push('/visitorflowcontrast');
		      }).catch(error => console.log(error));
	    },
	    removeVs() {
	      this.vsInfo = {};
	    },
		myChart(name,data,myChart){
			var self = this;
				var dataline = new Array();
				var seriesdata = new Array();
				for(let i=0;i<data.length;i++){
					dataline.push(data[i][0]);
					seriesdata.push({value:data[i][1],itemStyle:{normal:{color:'#01aef0'}}})
				}
      			var legendData = name;
				var lineoption = {
	            tooltip: {},
	            legend: {
	                data:name
	            },
	            grid:{
	                    top:'10%',
	                    left:20,
	                    right:'5%',
	                    bottom:'15%',
	                    borderWidth:1,
                      containLabel: true,
	            },
	            tooltip:{
	            		trigger:'axis'
	            },
	            xAxis: {
	                data: dataline
	            },
	            yAxis: {
	        			type: 'value'
	            },
	            series: [{
		            name:name,
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
		            data:seriesdata
		        	}]
	        };
			myChart.setOption(lineoption)
		},
		container(name,data){
//			console.log(data);
			let hotdata = data;
				var map = new BMap.Map("container");          // 创建地图实例
			    var point = new BMap.Point(116.418261, 39.921984);
			    map.centerAndZoom(point, 8);             // 初始化地图，设置中心点坐标和地图级别
			    map.enableScrollWheelZoom(); // 允许滚轮缩放
			    if (name != "") {
			        map.centerAndZoom(name, 8);      // 用城市名设置地图中心点
			    }
			    var points = hotdata;
			    if(!isSupportCanvas()){
			    	alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
			    }
				//详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
				//参数说明如下:
				/* visible 热力图是否显示,默认为true
			     * opacity 热力的透明度,1-100
			     * radius 势力图的每个点的半径大小
			     * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
			     *	{
						.2:'rgb(0, 255, 255)',
						.5:'rgb(0, 110, 255)',
						.8:'rgb(100, 0, 255)'
					}
					其中 key 表示插值的位置, 0~1.
					    value 为颜色值.
			     */
				var heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
				map.addOverlay(heatmapOverlay);
				heatmapOverlay.setDataSet({data:points,max:100});
				//是否显示热力图
			//  function openHeatmap(){
			        heatmapOverlay.show();
			//  }
			//	function closeHeatmap(){
			//      heatmapOverlay.hide();
			//  }
			//	closeHeatmap();
			    function setGradient(){
			     	/*格式如下所示:
					{
				  		0:'rgb(102, 255, 0)',
				 	 	.5:'rgb(255, 170, 0)',
					  	1:'rgb(255, 0, 0)'
					}*/
			     	var gradient = {};
			     	var colors = document.querySelectorAll("input[type='color']");
			     	colors = [].slice.call(colors,0);
			     	colors.forEach(function(ele){
						gradient[ele.getAttribute("data-key")] = ele.value;
			     	});
			        heatmapOverlay.setOptions({"gradient":gradient});
			    }
				//判断浏览区是否支持canvas
			    function isSupportCanvas(){
			        var elem = document.createElement('canvas');
			        return !!(elem.getContext && elem.getContext('2d'));
			    }
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
	.tab:first-child li:last-child{padding-top:33px;padding-bottom:0;border-bottom:0}
	.tab:first-child{
		    width: 321px;
	}
	.tab li .owh h3{font-size:14px;color:#657180}
	.tab li .owh div{font-size:32px;color:#464c5b}
	.tab li .owh div span{font-size:12px;color:#464c5b}
	.flow-trend{background:#fff;border-radius:8px;box-shadow:5px 5px 3px -5px #909090;height: 258px;}
	.flow-trend .title{padding:16px 0 16px 24px;font-size:15px;color:#464c5b}
	#container{width:100%;height:100%}
	.tab-switch{position:absolute;z-index:22;background:#fff;top:17px;left:24px;border-radius:8px}
	.tab-switch ul{overflow:hidden;padding:0 8px}
	.tab-switch ul li{float:left;font-size:14px;color:#464c5b;padding:4px 16.5px;cursor:pointer}
	.tab-switch ul li.active{font-weight:800;border-bottom:3px solid #0082E6}
</style>
