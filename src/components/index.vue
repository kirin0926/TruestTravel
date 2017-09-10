<template>
  <div>
    <div class="main-content">
      <navTop v-on:updateMe="reRenderMe" :info="info" :has-vs="false" :ranking="ranking"></navTop>
      <div class="main-top">
        <div class="tab" style="">
          <img class="fl" src="/Public/static/assets/image/tour-icon.png" alt="" />
          <div class="owh">
            <h3>访客人数</h3>
            <div class="cont">
              <span>{{formatNumber(total.num)}}</span>
              <i style="margin-left: 10px;">人</i>
              <div class="growth">
                <span>{{total.growth}}</span>
                <i>%</i>
                <div :class="total.growth > 0 ? 'triangle-topright' : 'triangle-bottomright'"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab" style="display: flex;">
          <div class="mr36 expond">
            <img class="fl" src="/Public/static/assets/image/tour-sina-icon.png" alt="" />
            <div class="owh">
              <h3>微博指数</h3>
              <div class="cont">
                <span>{{formatNumber(exponent.weibo)}}</span>
              </div>
            </div>
          </div>
          <div class="mr36 expond">
            <img class="fl" src="/Public/static/assets/image/tour-baidu-icon.png" alt="" />
            <div class="owh">
              <h3>百度指数</h3>
              <div class="cont">
                <span>{{formatNumber(exponent.baidu)}}</span>
              </div>
            </div>
          </div>
          <div class=" expond">
            <img class="fl" src="/Public/static/assets/image/tour-wechat-icon.png" alt="" />
            <div class="owh">
              <h3>微信指数</h3>
              <div class="cont">
                <span>{{formatNumber(exponent.mm)}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="rankmain">
        <div class="userfrommap">
          <div class="title">
          	<div class="tabs" :class="{active:layusermap == 'source' }"  style="display: inline-block;" @click="tablayeruser('source')">游客来源地分布</div>
          	<div class="tabs" :class="{active:layusermap == 'out' }" style="display: inline-block;" @click="tablayeruser('out')">人口流出地分布</div>
          </div>
          <div class="layusermap" :class="{active:layusermap == 'source' }">
          	  <div class="choice-cityprov">
	            <ul>
	              <li :class="{ active:layer == 'province' }" @click=" tablayer('province') ">省份</li>
	              <li :class="{ active:layer == 'city' }"  @click=" tablayer('city') " >城市</li>
	            </ul>
	          </div>
	          <div id="usermapCharts"></div>
          </div>
          <div class="layusermap" :class="{active:layusermap == 'out' }">
          		 <div class="choice-cityprov">
		            <ul>
		              <li :class="{ active:layeruser == 'province' }" @click=" layerusers('province') ">省份</li>
		              <li :class="{ active:layeruser == 'city' }"  @click=" layerusers('city') " >城市</li>
		            </ul>
		          </div>
	            <div id="usermapChartlay"></div>
          </div>
        </div>
        <div class="tourstRank" v-if="layusermap == 'source' ">
          <div class="title">游客来源地排名</div>
          <table>
            <thead>
              <tr>
                <th style="width: 20%;">排名</th>
                <th>区域</th>
                <th>占比</th>
                <!--<th>TGI</th>-->
              </tr>
            </thead>
            <tbody v-if=" layer=='province' ">
              <tr v-for="(li,index) in source.province" v-bind:key="index">
                <td>{{index+1}}</td>
                <td>{{li.name}}</td>
                <td>{{(li.percent*100).toFixed(1)}}%</td>
                <!--<td></td>-->
              </tr>
            </tbody>
            <tbody v-else="layer=='city'">
              <tr v-for="(li,index) in source.city" v-bind:key="index">
                <td>{{index+1}}</td>
                <td>{{li.name}}</td>
                <td>{{(li.percent*100).toFixed(1)}}%</td>
                <!--<td></td>-->
              </tr>
            </tbody>
          </table>
        </div>

      	<div class="tourstRank" v-else="layusermap == 'out' ">
      		<div class="title">人口流出地排名</div>
      		<table>
            <thead>
              <tr>
                <th>排名</th>
                <th>区域</th>
                <th>占比</th>
                <!--<th>TGI</th>-->
              </tr>
            </thead>
            <tbody v-if=" layeruser=='province' ">
              <tr v-for="(li,index) in out.province" v-bind:key="index">
                <td>{{index+1}}</td>
                <td>{{li.name}}</td>
                <td>{{(li.percent*100).toFixed(1)}}%</td>
                <!--<td></td>-->
              </tr>
            </tbody>
            <tbody v-else="layeruser=='city'">
              <tr v-for="(li,index) in out.city" v-bind:key="index">
                <td>{{index+1}}</td>
                <td>{{li.name}}</td>
                <td>{{(li.percent*100).toFixed(1)}}%</td>
                <!--<td></td>-->
              </tr>
            </tbody>
          </table>
      	</div>
      </div>
      <div class="rankmain">
        <div class="areahotrank">
          <div class="title">省／市内景区热度排名</div>
          <table>
            <thead>
              <tr>
                <th style="width: 5%;">排名</th>
                <th style="width: 20%;">景区</th>
                <th style="width: 26%;">客流量(万)</th>
                <th>半年内客流量变化</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in sortedPv(pv)" v-bind:key="index">
                <td>{{index+1}}</td>
                <td>{{item.name}}</td>
                 <td>{{formatNumber(item.num || 0)}}</span></td>
                <td>
                	  <div style="margin: 10px auto;display: inline-block;">
	                  <i class="hotrank-icon" v-for="(lis, item) in item.detail" v-bind:key="item">{{formatNumber(lis[1])}}</i>
                	  </div>
                  <div v-bind:id="'lineCharts'+index" style="width: 120px;height: 36px;display: inline-block;position:relative;top: 13px;border: 1px solid #01aef0;"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import store from 'store'
import aside from './aside.vue'
import numeral from 'numeral'
import nav from './nav.vue'
export default {
  data() {
    return {
      input: '',
      monthval: '',
      reportimg: [
        '/Public/static/assets/image/index-bg.png',
        '/Public/static/assets/image/index-bg.png'
      ],
      total: {
        num: '',
        growth: ''
      },
      exponent: {
        baidu: '',
        mm: '',
        weibo: ''
      },
      pv: '',
      out: {
        city: '',
        province: ''
      },
      layer: 'city',
      layeruser:'city',
      layusermap:'source',  //总体数据
      source: {
        city: '',
        province: ''
      },
      ranking:{},
      info: {},
      mapChart: {},
      countArr: [],
      provinces:{},
      cities:{},
      surpoid:''
    }
  },
  created: function () {
    		  	var self = this;
    			  const info = store.get('travelInfo');
						const month = store.get('travelMonth');
						if(!info){
	        		store.set('travelInfo', {
								'id': 78 ,
								'name': '海南槟榔谷黎苗文化旅游区',
								'type': 4,
								"province_id": 391, 
								"city_id": 375
							});
						}
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
  },
  methods: {
		sortedPv(pv) {
      return [].concat(pv).sort((x, y) => {
        return  Number(y.num) - Number(x.num);
      })
   	},
  	//更新数据
  	tablayer(name){
  		var self = this;
  		self.layer = name;
  		if( self.layer == 'city'){
  			self.$nextTick(()=>{
  				const mapChart = self.$echarts.init(document.getElementById('usermapCharts'))
	        		self.usermapCharts(self.initProvCity(self.surpoid,self.surponame,self.surpotype),self.source.city,mapChart);
				})
  		}else if(self.layer == 'province'){
  			self.$nextTick(()=>{
  				const mapChart = self.$echarts.init(document.getElementById('usermapCharts'))
	        		self.usermapCharts(self.initProvCity(self.surpoid,self.surponame,self.surpotype),self.source.province,mapChart);
  			})
  		}
  	},
  	layerusers(name){
  		var self = this;
  		self.layeruser = name;
  		if( self.layeruser == 'city'){
	  			self.$nextTick(()=>{
			        const mapChart = self.$echarts.init(document.getElementById('usermapChartlay'))
			        self.usermapChartlay(self.initProvCity(self.surpoid,self.surponame,self.surpotype),self.out.city,mapChart);
	  			})
  		}else if(self.layeruser == 'province'){
  				self.$nextTick(()=>{
			        const mapChart = self.$echarts.init(document.getElementById('usermapChartlay'))
			        self.usermapChartlay(self.initProvCity(self.surpoid,self.surponame,self.surpotype),self.out.province,mapChart);
		        })
  		}
  	},
  	tablayeruser(name){
  		var self = this;
  		self.layusermap = name;
  		self.layerusers(self.layeruser);
  	},
    formatNumber(value, formatter) {
      return numeral(value).format(formatter || '0,0');
    },
    getEveryMonthCount: function(monthData){
      let countArr = [];
      monthData.forEach(function(val, index){
        countArr[index] = 0;
        val.detail.forEach(function(value){
          countArr[index] += Number(value[1]);
        })
      })
      countArr = countArr.map(function(val){
        return (val / 10000).toFixed(2);
      })
      this.countArr = countArr;
  	},
    initProvCity(id,name,type){
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
			console.log(selectpro);
      var pdata = provinces.data;
      var cdata = cities.data;
      for(let i=0;i<pdata.length;i++){
      		selectpro[pdata[i].superior] = pdata[i].name;
      }
      for(let i=0;i<cdata.length;i++){
      		selectciy[cdata[i].superior] = cdata[i].name;
      }
    	  if(type=='2'){ //省
      		return selectpro[id]
    	  }else if(type=='1'){ //市
    	  		return name
    	  }else if(type == '4'){ //jing
    	  		return selectpro[id]
    	  }
    },
    batchlineCharts(data){
    			var self = this;
    			var dataid = new Array();//id数组
    			for(let i=0 ; i<data.length ; i++ ){
		    		const lineCharts = self.$echarts.init(document.getElementById('lineCharts'+i));
    				dataid.push(lineCharts);
    					var seriesdata = new Array();
    					for(let k=0;k<data[i].detail.length;k++){
    						seriesdata.push(Number(data[i].detail[k][1]))
							}
	    				var option = {
	    					backgroundColor:['#e5f7fd'],
								title: {
										text: ''
								},
								color:['#01aef0'],
								grid:{
										top:'5%',
										left:'5%',
										bottom:'5%',
										right:'5%'
								},
								xAxis : [
										{
												show:false,
												type : 'category',
												boundaryGap : false,
												data : ['','','','','','']
										}
								],
								yAxis : {
										show:false,
										max:'maxData'
								},
								series : [
										{
												name:'',
												type:'line',
												stack: '总量',
												data:seriesdata
										}
								]
							};
							dataid[i].setOption(option);
    			}
    },
  	usermapCharts(name,data,mapChart){
  			var serverdata= new Array()
  			for(let i=0;i<10;i++){
  				if(data[i]){
  					serverdata.push([{ 'name': name }, { 'name': data[i].name, 'value': data[i].num }]);
  				}
  			}
		    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
		    var convertData = function (data) {
		      var res = [];
		      for (let i = 0; i < data.length; i++) {
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
		    [[name, serverdata]].forEach(function (item, i) {
		          var data2 = [];
		    			 item[1].map(function (dataItem) {
			          	if(geoCoordMap[dataItem[1].name] !=undefined){
			          		//没数值
			          		data2.push({
				              name: dataItem[1].name,
				              value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
				              itemStyle: {
				                  normal: {
				                    color: color[i] || '#79839e'
				                  }
				               }
			          		})
			          	}else{
			          		return null
			          	}
			          }).filter(a=>{
			          	 return a!=null
			          })
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
		          data: data2
		        }
		        );
		    });

		    var option = {
		      backgroundColor: '#ffffff',
		      title: {
		        text: '',
		        left: 'center',
		        textStyle: {
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
		    mapChart.setOption(option);
  	},
  	usermapChartlay(name,data,mapChart){
  		var serverdata= new Array()
  			for(let i=0;i<10;i++){
  				if(data[i]){
  					serverdata.push([{ 'name': name }, { 'name': data[i].name, 'value': data[i].num }]);
  				}
  			}
		    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
		    var convertData = function (data) {
		      var res = [];
		      for (let i = 0; i < data.length; i++) {
		        var dataItem = data[i];
		        var fromCoord = geoCoordMap[dataItem[0].name];
		        var toCoord = geoCoordMap[dataItem[1].name];
		        if (fromCoord && toCoord) {
		          res.push({
		            fromName: dataItem[0].name,
		            toName: dataItem[1].name,
		            coords: [fromCoord, toCoord]
		          });
		        }
		      }
		      return res;
		    };
		    var color = ['#1385d9', '#ffa022', '#46bee9'];
		    var series = [];
		    [[name, serverdata]].forEach(function (item, i) {

		          var data2 = [];
		    			 item[1].map(function (dataItem) {
			          	if(geoCoordMap[dataItem[1].name] !=undefined){
			          		//没数值
			          		data2.push({
				              name: dataItem[1].name,
				              value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
				              itemStyle: {
				                  normal: {
				                    color: color[i] || '#79839e'
				                  }
				               }
			          		})
			          	}else{
			          		return null
			          	}
			          }).filter(a=>{
			          	 return a!=null
			          })
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
		          data: data2

		        }
		        );
		    });

		    var option = {
		      backgroundColor: '#ffffff',
		      title: {
		        text: '',
		        left: 'center',
		        textStyle: {
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
		    mapChart.setOption(option);
		    mapChart.resize(option,{
		    		width:'100%',
		    		height:'100%'
		    })
  	},
  	//监听nav 更新的数据
    reRenderMe(item) {
	      var self = this;
	      self.surponame = item.info.name;
	      self.surpotype = item.info.type;
	      if(item.info.superior){
	      	self.surpoid = item.info.superior;
	      }else{
	      	self.surpoid = item.info.province_id;
	      }
	      self.$http.post(fixurl + '/Main/search', qs.stringify({
	        data: JSON.stringify(item)
	      })).then(response => {
				const pageData = response.data;
	            self.ranking = pageData.ranking;
	        		self.total = pageData.total
							self.exponent = pageData.exponent;
							self.pv = pageData.pv;
							self.source = pageData.source;
							self.info = pageData.info;
							self.out = pageData.out;
							self.$nextTick(()=>{
									self.batchlineCharts(self.sortedPv(self.pv));
							})
							localStorage.setItem('infoName', pageData.info.name);
							self.tablayer(self.layer);
							self.tablayeruser(self.layusermap);
	            self.getEveryMonthCount(self.pv);
	      }).catch(error => {
	        return error;
	      })
    },
    reRenderVs() {
      var self = this;
      self.info = pageData.info;
      self.total = pageData.total
      self.exponent = pageData.exponent;
      self.pv = pageData.pv;
      self.source = pageData.source;
    },
    updateMapChart(option) {
      this.mapChart.setOption(option);
    }
  },
  components: {
    asideLi: aside,
    navTop: nav
  }
}
</script>

<style scoped="scoped">
nav .title{font-size:16px;color:#FFF}
.search-prv{height:34px;border:1px solid #fff;border-radius:20px;padding-left:24px;padding-right:24px;width:235px;background:rgba(255,255,255,.4);color:#fff;font-size:12px;margin-right:24px}
.add-contrast{width:91px;height:34px;background:rgba(255,255,255,.4);border-radius:20px;padding-left:24px;padding-right:24px;border:1px solid #fff;margin-right:24px}
.add-contrast::-webkit-input-placeholder{color:#FFF;font-size:12px}
.search-prv::-webkit-input-placeholder{color:#FFF;font-size:12px}
.scenic-heat-ranking{width:70%;background:#fff;border-radius:8px;float:left;margin-right:24px}
.scenic-heat-ranking .tit{padding:16px 0 16px 24px;font-size:15px;color:#464c5b}
.scenic-heat-ranking .footer{padding:16px 24px 16px 24px;overflow:hidden}
.scenic-heat-ranking .footer .el-pagination{float:right}
.scenic-heat-ranking .footer .demonstration{display:inline-block;height:32px;line-height:32px}
.tab img{width:55px;margin-right:16px}
.tab .owh h3{font-size:14px;color:#657180}
.tab .owh .cont span{font-size:32px;color:#464c5b;font-weight:500}
.growth{display:inline-block;margin-left:58px;position: relative;}
.tab .expond{width:33.3%}
.rankmain{overflow:hidden;display:flex}
.mr36{margin-right:36px}
.tourist-from{background:#fff;border-radius:8px;box-shadow:-4px 7px 10px -8px #909090}
.tourist-from .tit{padding:16px 0 16px 24px;font-size:15px;color:#464c5b}
.indu-report{margin-top:24px;background:#fff;border-radius:8px;box-shadow:-4px 7px 10px -8px #909090}
.indu-report .tit{padding:16px 0 16px 24px;font-size:15px;color:#464c5b;border-bottom:1px solid #e3e8ee}
.indu-report .cont{padding:24px}
.indu-report .cont .el-carousel{height:180px;margin-bottom:15px}
.report-name{font-size:14px;color:#657180;margin-bottom:10px}
.report-cont{color:#79839e;font-size:14px;margin-bottom:10px}
.report-time{font-size:14px;color:#79839E;margin-bottom:25px}
.rankmain{display:flex}
.rankmain .userfrommap{width:60%;background:#FFF;border-radius:8px;margin-right:24px;position:relative;height:620px}
.rankmain .userfrommap .title{font-size:14px;border-bottom:1px solid #E3E8EE}
.rankmain .tourstRank{width:40%;background:#FFF;border-radius:8px;height:620px;overflow:auto}
.rankmain .tourstRank .title{font-size:14px;color:#464c5b;padding-left:24px;padding-top:17.5px;padding-bottom:17.5px;border-bottom:1px solid #E3E8EE}
.tourstRank table{width:100%}
table thead th{background:#F4F7FC;border:1px solid #E3E8EE;border-top:none;padding-left:11px;padding-top:10px;padding-bottom:10px;font-size:14px;color:#464C5B;font-weight:800}
table tbody td{padding-left:11px}
table tbody tr{border-bottom:1px solid #E3E8EE;height:57px}
table tbody tr:last-child{border-bottom:none}
table tbody tr:nth-child(2n){background:#fbfcfe}
#usermapCharts{width:100%;height:100%;min-height:509px}
#usermapChartlay{width:100%;height:100%;min-height:509px}
.choice-cityprov{overflow:hidden}
.choice-cityprov ul{width:111px;height:24px;position:absolute;z-index:11;top:80px;left:24px}
.choice-cityprov ul li{float:left;background:#e5f7fd;color:#1385d9;width:50%;height:24px;text-align:center;line-height:24px;cursor:pointer}
.choice-cityprov ul li.active{background:#1385d9;color:#FFF}
.areahotrank{width:100%;background:#FFF;margin-top:24px;border-radius:8px}
.areahotrank .title{font-size:14px;color:#464c5b;padding-left:24px;padding-top:17.5px;padding-bottom:17.5px;border-bottom:1px solid #E3E8EE}
.areahotrank table{width:100%}
.hotrank-icon{
	display: inline-block;
    text-align: center;
    background: #01AEF0;
    color: #FFF;
    margin-right: 2px;
    font-size: 12px;
    width: 60px;
    height: 40px;
    line-height: 40px;
}
.triangle-bottomright {
  width: 0;
	height: 0;
	border-bottom: 10px solid red;
	border-left: 10px solid transparent;
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
  height: 8px;
  width: 5px;
  background: red;
  transform: rotate(-45deg);
  top: -1px;
  left: -10px;
}

.triangle-topright {
  width: 0;
	height: 0;
	border-top: 10px solid #03ca99;
  border-left: 10px solid transparent;
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
  height: 8px;
  width: 4px;
  background: #03ca99;
  transform: rotate(45deg);
  top: -7px;
  left: -9px;
}
.layusermap{
	display: none;
}
.layusermap.active{
	display: block;
}
.userfrommap .title .tabs{
	font-size: 14px;
    color: #a5b6c1;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 17.5px;
    padding-bottom: 17.5px;
	cursor: pointer;
	color: ;
}
.userfrommap .title .tabs.active{
	color: #333333;
	    border-bottom: 1px solid #01aef0;
}
.tourstRank table tbody tr:nth-child(1){
	background: #ffbd2e;
    color: #fff;
}
.tourstRank table tbody tr:nth-child(2){
	background: #01aef0;
	color:#FFFFFF;
}
.tourstRank table tbody tr:nth-child(3){
	background: #03ca99;
	color: #FFFFFF;
}
</style>
