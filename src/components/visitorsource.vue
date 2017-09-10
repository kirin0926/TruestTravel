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
				<div class="mylinesBox">
					<div class="title">游客来源地分布</div>
					<div class="mylines">
							<ul class="chiose-tab">
								<li :class="{ active:layet == 'province' }" @click=" layets('province') ">省份</li>
								<li :class="{ active:layet == 'city'}" @click=" layets('city') ">城市</li>
							</ul>
							<div id="myLinesChart" class="mapChart" :style="{width:'100%',height:'493px'}"></div>
							<table>
								<thead>
									<tr><th>区域</th><th>占比</th>
										<!--<th>TGI</th>-->
									</tr>
								</thead>
								<tbody v-if=" layet == 'city' ">
									<tr v-for="(item,index) in citytsource"><td>{{index+1}}{{item.name}}</td><td>{{(item.percent*100).toFixed(2)}}%</td>
										<!--<td></td>-->
									</tr>
								</tbody>
								<tbody v-else=" layet == 'province' ">
									<tr v-for="(item,index) in provincetsource"><td>{{index+1}}{{item.name}}</td><td>{{(item.percent*100).toFixed(2)}}%</td>
										<!--<td></td>-->
									</tr>
								</tbody>
							</table>
					</div>
				</div>
			</div>
			<div class="rankmain">
				<div class="mylinesBox" v-if="isContrast">
					<div class="title">游客来源地分布</div>
					<div class="mylines">
							<ul class="chiose-tab">
								<li :class="{ active:layeb == 'province' }" @click=" layebs('province') ">省份</li>
								<li :class="{ active:layeb == 'city' }" @click=" layebs('city') ">城市</li>
							</ul>
							<div id="myBLinesChart" :style="{width:'100%',height:'493px'}"></div>
								<table>
									<thead>
										<tr><th>区域</th><th>占比</th>
											<!--<th>TGI</th>-->
										</tr>
									</thead>
									<tbody v-if=" layeb == 'city' ">
										<tr v-for="(item,index) in citybsource"><td>{{index+1}}{{item.name}}</td><td>{{(item.percent*100).toFixed(2)}}%</td>
											<!--<td></td>-->
										</tr>
									</tbody>
									<tbody v-else=" layeb == 'province' ">
										<tr v-for="(item,index) in provincebsource"><td>{{index+1}}{{item.name}}</td><td>{{(item.percent*100).toFixed(2)}}%</td>
											<!--<td></td>-->
										</tr>
									</tbody>
								</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import qs from 'qs'
import store from 'store'
import aside from './aside.vue'
import nav from './nav.vue'
export default{
	data(){
		return{
			monthval:'',
			layet:'city',
			layeb:'province',
			citytsource:'',
			citybsource:'',
			info:{},
			vsInfo:{},
			isContrast: false,
			provincetsource:'',
			migratedata:[],
			migrateprovincedata:[],
			migratebdata:[],
			migrateprovincebdata:[],
			provincebsource:'',
			total:'',
			exponent:'',
			surpoid:'',
			surpoidpr:''
		}
	},
	created: function () {
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
			  if(vsinfo){
				   this.reRenderVs({
				       info: vsinfo,
				       month:month
				   });
			  }
	},
	methods:{
		layets(name){
			var self = this;
			self.layet = name;
			if(self.layet=='city'){
				let myLinesChart = self.$echarts.init(document.getElementById('myLinesChart'));
		        self.$options.methods.topChart(self.initProvCity(self.surpoid),self.migratedata,myLinesChart);
			}else if(self.layet=='province'){
				let myLinesChart = self.$echarts.init(document.getElementById('myLinesChart'));
		        self.$options.methods.topChart(self.initProvCity(self.surpoid),self.migrateprovincedata,myLinesChart);
			}
		},
		layebs(name){
			var self = this;
			self.layeb = name;
			if(self.layeb=='city'){
				let myBLinesChart = self.$echarts.init(document.getElementById('myBLinesChart'))
		        self.$options.methods.bChart(self.initProvCity(self.surpoidpr),self.migratebdata,myBLinesChart);
			}else if(self.layeb=='province'){
				let myBLinesChart = self.$echarts.init(document.getElementById('myBLinesChart'))
		        self.$options.methods.bChart(self.initProvCity(self.surpoidpr),self.migrateprovincebdata,myBLinesChart);
			}
		},
		initProvCity(id){
			var self = this;
			if(provinces && (+new Date() < provinces.time) && cities && (cities.time > +new Date())) {
				this.provinces = provinces.data;
				this.cities = cities.data;
			} else {
				self.$http.post(fixurl + '/Main/select', qs.stringify({
				'data': JSON.stringify({
					search: {
						scope: 6,
						name: ''
					}
					})
				})).then((response) => {
				self.provinces = response.data.filter(item => item.type === '2');
				self.cities = response.data.filter(item => item.type === '1');
				store.set('provinces', {
					time: +new Date() + (3600 * 24 * 1000),
					data: self.provinces
				});
				store.set('cities', {
					time: +new Date() + (3600 * 24 * 1000),
					data: self.cities
				})
				}).catch(function (error) {
				console.log(error);
				});
			}
			var provinces = store.get('provinces');
			var cities = store.get('cities');
			var selectpro = {};
			var selectciy = {};
			var pdata = provinces.data;
			var cdata = cities.data;
			for(let i=0;i<pdata.length;i++){
					selectpro[pdata[i].superior] = pdata[i].name;
			}
			for(let i=0;i<cdata.length;i++){
					selectciy[cdata[i].superior] = cdata[i].name;
			}
	//	    		console.log(selectpro[id]);
	//	    		console.log(selectciy[id]);
			if(selectpro[id]){
					return selectpro[id]
			}else{
					return selectciy[id]
			}
	    },
		reRenderMe(data) {
			var self = this;
			if(data.info.superior){
				self.surpoid = data.info.superior;
			}else{
				self.surpoid = data.info.province_id;
			}
			self.$http.post(fixurl + '/Visitor/source',
			qs.stringify({
				data: JSON.stringify(data)
			})).then(response => {
						const pageData = response.data;
					self.citytsource = pageData.city;
					self.provincetsource = pageData.province;
					//nav信息
					self.info = pageData.info;
					//调用上方分布图方法
					var migratedata = new Array();//城市数据
					var migrateprovincedata = new Array();//省份数据

					for(let i=0;i<10;i++){
						if(self.citytsource[i]){
							migratedata.push(
								[{'name':self.initProvCity(self.surpoid)}, {'name':self.citytsource[i].name,'value':self.citytsource[i].num}]
							)
						}
						if(self.provincetsource[i]){
							migrateprovincedata.push(
								[{'name':self.initProvCity(self.surpoid)}, {'name':self.provincetsource[i].name,'value':self.provincetsource[i].num}]
							)
						}
					}
					self.migratedata = migratedata;
					self.migrateprovincedata = migrateprovincedata;
					self.layets(self.layet)
			}).catch(error => console.log(error));
	    },
	    reRenderVs(data) {
			this.isContrast = true;
	      	var self = this;
			if(data.info.superior){
				self.surpoidpr = data.info.superior;
			}else{
				self.surpoidpr = data.info.province_id;
			}
			self.$http.post(fixurl + '/Visitor/source',
			qs.stringify({
				data: JSON.stringify(data)
			})).then(response => {
						const pageData = response.data;
						console.log(pageData);
					self.citybsource = pageData.city;
					self.provincebsource = pageData.province;
					//nav信息
					self.vsInfo = pageData.info;
					//调用上方分布图方法
					var migratebdata = new Array();
					var migrateprovincebdata = new Array();
					for(let i=0;i<10;i++){
						if(self.citybsource[i]){
							migratebdata.push(
								[{'name':self.initProvCity(self.surpoidpr)}, {'name':self.citybsource[i].name,'value':self.citybsource[i].num}]
							)
						}
						if(self.provincebsource[i]){
							migrateprovincebdata.push(
								[{'name':self.initProvCity(self.surpoidpr)}, {'name':self.provincebsource[i].name,'value':self.provincebsource[i].num}]
							)
						}

					}
					self.migratebdata = migratebdata;
					self.migrateprovincebdata = migrateprovincebdata;
					self.layebs(self.layeb);
			}).catch(error => console.log(error));
	    },
	    removeVs() {
			this.vsInfo = {};
			this.isContrast =false;
	    },
		topChart(name,data,myLinesChart){
			var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
			var convertData = function (data) {
			    var res = [];
			    for (var i = 0; i < data.length; i++) {
			        var dataItem = data[i];
			        var fromCoord = geoCoordMap[dataItem[1].name];
			        var toCoord = geoCoordMap[dataItem[0].name];
			        if (fromCoord && toCoord) {
			            res.push({
			                fromName: dataItem[1].name,
			                toName: dataItem[0].name,
			                coords: [fromCoord, toCoord]
			            });
			        }
			    }
			    return res;
			};
			var color = ['#1385d9', '#ffa022', '#46bee9'];
			var series = [];
			[[name, data]].forEach(function (item, i){
			    series.push({
			        name: item[0] + ' Top10',
			        type: 'lines',
			        zlevel: 1,
			        effect: {
			            show: true,
			            period: 6,
			            trailLength: 0.7,
			            color: '#fff',
			            symbolSize: 3
			        },
			        lineStyle: {
			            normal: {
			                color: color[i],
			                width: 0,
			                curveness: 0.2
			            }
			        },
			        data: convertData(item[1])
			    },
			    {
			        name: item[0] + ' Top10',
			        type: 'lines',
			        zlevel: 2,
			        symbol: ['none', 'arrow'],
			        symbolSize: 10,
			        effect: {
			            show: true,
			            period: 6,
			            trailLength: 0,
			            symbol: planePath,
			            symbolSize: 15
			        },
			        lineStyle: {
			            normal: {
			                color: color[i],
			                width: 1,
			                opacity: 0.6,
			                curveness: 0.2
			            }
			        },
			        data: convertData(item[1])
			    },
			    {
			        name: item[0] + ' Top10',
			        type: 'effectScatter',
			        coordinateSystem: 'geo',
			        zlevel: 2,
			        rippleEffect: {
			            brushType: 'stroke'
			        },
			        label: {
			            normal: {
			                show: true,
			                position: 'right',
			                formatter: '{b}'
			            }
			        },
			        symbolSize: function (val) {
			            return 8;
			        },
			        itemStyle: {
			            normal: {
			                color: color[i]
			            }
			        },
			        data: item[1].map(function (dataItem) {
			          	if(geoCoordMap[dataItem[1].name] !=undefined){
			          		//没数值
			          		return {
				              name: dataItem[1].name,
				              value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
				            }
			          	}else{
			          		return null
			          	}
			          }).filter(a=>{
			          	 return a!=null
			          })
			    });
			});
			var option = {
			    backgroundColor: '#fff',
			    title : {
			        text: '',
			        left: 'center',
			        textStyle : {
			            color: '#fff'
			        }
			    },
			    geo: {
			        map: 'china',
			        label: {
			            emphasis: {
			                show: false
			            }
			        },
			        left:'20%',
			        roam: true,
              scaleLimit: {
                min: 1,
                max: 10
              },
			        itemStyle: {
                normal: {
                  color: 'rgba(104,151,199, 0.5)',
                  borderColor: '#fff'
                },
                emphasis: {
                  areaColor: null,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
			    },
			    series: series
			};
			myLinesChart.setOption(option)
		},
		bChart(name,data,myBLinesChart){
				var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
				var convertData = function(data){
				    var res = [];
				    for (var i = 0; i < data.length; i++) {
				        var dataItem = data[i];
				        var fromCoord = geoCoordMap[dataItem[1].name];
				        var toCoord = geoCoordMap[dataItem[0].name];
				        if (fromCoord && toCoord) {
				            res.push({
				                fromName: dataItem[1].name,
				                toName: dataItem[0].name,
				                coords: [fromCoord, toCoord]
				            });
				        }
				    }
				    return res;
				};
				var color = ['#1385d9', '#ffa022', '#46bee9'];
				var series = [];
				[[name, data]].forEach(function (item, i) {
				    series.push({
				        name: item[0] + ' Top10',
				        type: 'lines',
				        zlevel: 1,
				        effect: {
				            show: true,
				            period: 6,
				            trailLength: 0.7,
				            color: '#fff',
				            symbolSize: 3
				        },
				        lineStyle: {
				            normal: {
				                color: color[i],
				                width: 0,
				                curveness: 0.2
				            }
				        },
				        data: convertData(item[1])
				    },
				    {
				        name: item[0] + ' Top10',
				        type: 'lines',
				        zlevel: 2,
				        symbol: ['none', 'arrow'],
				        symbolSize: 10,
				        effect: {
				            show: true,
				            period: 6,
				            trailLength: 0,
				            symbol: planePath,
				            symbolSize: 15
				        },
				        lineStyle: {
				            normal: {
				                color: color[i],
				                width: 1,
				                opacity: 0.6,
				                curveness: 0.2
				            }
				        },
				        data: convertData(item[1])
				    },
				    {
				        name: item[0] + ' Top10',
				        type: 'effectScatter',
				        coordinateSystem: 'geo',
				        zlevel: 2,
				        rippleEffect: {
				            brushType: 'stroke'
				        },
				        label: {
				            normal: {
				                show: true,
				                position: 'right',
				                formatter: '{b}'
				            }
				        },
				        symbolSize: function (val) {
				            return 8;
				        },
				        itemStyle: {
				            normal: {
				                color: color[i]
				            }
				        },
				        data: item[1].map(function (dataItem) {
				          	if(geoCoordMap[dataItem[1].name] !=undefined){
				          		//没数值
				          		return {
					              name: dataItem[1].name,
					              value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
					            }
				          	}else{
				          		return null
				          	}
				          }).filter(a=>{
				          	 return a!=null
				          })
				    });
				});
				var Boption = {
				    backgroundColor: '#fff',
				    title : {
				        text: '',
				        left: 'center',
				        textStyle : {
				            color: '#fff'
				        }
				    },
				    geo: {
				        map: 'china',
				        label: {
				            emphasis: {
				                show: false
				            }
				        },
				        left:'20%',
				        roam: true,
                scaleLimit: {
                  min: 1,
                  max: 10
                },
				        itemStyle: {
				            normal: {
				                areaColor: '#f2f3f5',
				                borderColor: '#dfe4e9'
				            },
				            emphasis: {
				                areaColor: '#e2e5e8'
				            }
				        }
				    },
				    series: series
				};
				myBLinesChart.setOption(Boption)
		}
	},
	components:{
		asideLi:aside,
		navTop:nav
	}
}
</script>

<style scoped="scoped">
	.mylinesBox{width:100%;height:547px;background:#fff;border-radius:8px;overflow:hidden;position:relative}
	.mylinesBox .title{padding:16px 0 16px 24px;font-size:15px;border-bottom:1px solid #e3e8ee;color:#464c5b}
	.chiose-tab{overflow:hidden;position:absolute;z-index:222;top:78px;left:24px}
	.chiose-tab li{float:left;background:#E5F7FD;color:#0190FE;cursor:pointer;height:24px;width:56px;text-align:center;line-height:24px}
	.chiose-tab li:hover{background:#1385D9;color:#FFF}
	.chiose-tab li.active{background:#1385D9;color:#FFF}
	.mylines table{
		z-index: 222;
		position: absolute;
	    right: 24px;
	    top: 98px;
	    width: 265px;
	    height: 400px;
	    display: block;
	    overflow: auto;
	}
	.mylines table thead tr th{
		height: 30px;
		background: #EFF0F2;
		font-size: 12px;
		color: #464C5B;
		padding-left: 26px;
		padding-right: 26px;
		    width: 50%;
	}
	.mylines table tbody tr td{
		height: 36px;
		padding: 0;
	    padding-left: 26px;
	    padding-right: 26px;
  }
  .mapChart {
    box-sizing: border-box;
    padding-right: 100px;
  }

table tbody tr:nth-child(1){
	background: #ffbd2e;
    color: #fff;
}
table tbody tr:nth-child(2){
	background: #01aef0;
	color:#FFFFFF;
}
table tbody tr:nth-child(3){
	background: #03ca99;
	color: #FFFFFF;
}
</style>
