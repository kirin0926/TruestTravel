<template>
  <div>
    <div class="main-content">
      <navTop v-on:updateMe="reRenderMe" v-on:updateVs="reRenderVs" v-on:removeVs="removeVs" :info="info" :vsinfo="vsInfo" :has-vs="true"></navTop>
      <div class="main-top">
        <div class="tab">
          <div class="title">游客线上/扫码支付占比</div>
          <div id="myBarLChart" :style="{width:'100%',height:'180px'}"></div>
        </div>
        <div class="tab">
          <div class="title"><label class="vsLabel labelvs" v-if="vsInfo.name">{{vsInfo.name}}</label>游客线上/扫码支付占比</div>
          <div id="myBarRChart" :style="{width:'100%',height:'180px'}"></div>
        </div>
      </div>
      <div class="main-top hotcontrast">
        <div class="tab" style="padding: 0;position: relative;">
          <div class="tab-switch">
            <ul>
              <li :class="{ active:laylt == 'total' }" @click=" laylto('total')">整体支付热力图</li>
              <!--<li :class="{ active:laylt == 'visitor' }" @click=" laylto('visitor')">游客支付热力图</li>-->
            </ul>
          </div>
          <div id="containerL"></div>
        </div>
        <div class="tab" style="padding: 0;position: relative;">
          <div class="tab-switch">
            <ul>
              <li :class="{ active:layrt == 'total' }" @click=" layrto('total')">整体支付热力图</li>
              <!--<li :class="{ active:layrt == 'visitor' }" @click=" layrto('visitor')">游客支付热力图</li>-->
            </ul>
          </div>
          <div id="containerR"></div>
        </div>
      </div>
      <div class="rankmain">
        <div class="PayHot-table-charts">
          <div class="title">游客支付行为 TOP5(支付笔数占比)</div>
          <table cellspacing="" cellpadding="">
            <tr>
              <th style="width: 10%;min-width: 24px">排行</th>
              <th style="width: 60%;">应用名称</th>
              <th>比例</th>
            </tr>
            <tbody>
              <tr v-for="(item,index) in payhotappL" v-if="index<5" :key="index">
                <td>{{index+1}}</td>
                <td>
                  <div class="appCol">
                    <img class="appimg" :src="item.img" :alt="item.name" />
                    <div class="appname">{{item.name}}</div>
                  </div>
                </td>
                <td>
                  <el-progress :percentage="Number(item.percent*100).toFixed(0)"></el-progress>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="PayHot-table-charts">
          <div class="title">游客支付行为 TOP5(支付笔数占比)</div>
          <table cellspacing="" cellpadding="">
            <tr>
              <th style="width: 10%;min-width: 24px">排行</th>
              <th style="width: 60%;">应用名称</th>
              <th>比例</th>
            </tr>
            <tbody>
              <tr v-for="(item,index) in payhotappR" v-if="index<5">
                <td>{{index+1}}</td>
                <td>
                  <div class="appCol">
                    <img class="appimg" :src="item.img" :alt="item.name" />
                    <div class="appname">{{item.name}}</div>
                  </div>
                <td>
                  <el-progress :percentage="Number(item.percent*100).toFixed(0)"></el-progress>
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
import nav from './nav.vue'
export default {
  data() {
    return {
      monthval: '',
      info: {},
      vsInfo: {},
      payhotappL: '',
      payhotappR: '',
      laylt: 'total',
      layrt: 'total',
      latlngt: {
        total: {
          balance: '',
          data: []
        },
        visitor: {
          balance: '',
          data: []
        }
      },
      latlngr: {
        total: {
          balance: '',
          data: []
        },
        visitor: {
          balance: '',
          data: []
        }
      },
      apps: []
    }
  },
  created: function () {
    var self = this;
    const info = store.get('travelInfo');
    const vsinfo = store.get('travelVsInfo');
    const month = store.get('travelMonth');
    this.reRenderMe({
      info: info || {
        'id': 78,
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
        'id': 78,
        'name': '海南槟榔谷黎苗文化旅游区',
        'type': 4,
        "province_id": 391,
        "city_id": 375
      },
      month: month || self.monthval || '2017-06'
    });
  },
  methods: {
    reRenderMe(data) {
      var self = this;
      self.$http.post(fixurl + '/Visitor/payfor',
        qs.stringify({
          data: JSON.stringify(data)
        })).then(response => {
          const pageData = response.data;
          //nav信息
          self.info = pageData.info;
          //热力图
          self.payhotappL = pageData.app;
          self.latlngt.total.balance = pageData.latlng.total.balance;
          self.latlngt.total.data = pageData.latlng.total.data;
          self.latlngt.visitor.balance = pageData.latlng.visitor.balance;
          self.latlngt.visitor.data = pageData.latlng.visitor.data;
          //调用饼状图饼状图
          let myLChart = self.$echarts.init(document.getElementById('myBarLChart'))
          self.$options.methods.myBarLChart(pageData.percent, myLChart);
          //调用热力图热力图
          self.laylto(self.laylt);
        }).catch(error => console.log(error));
    },
    reRenderVs(data) {
      var self = this;
      self.$http.post(fixurl + '/Visitor/payfor',
        qs.stringify({
          data: JSON.stringify(data)
        })).then(response => {
          const pageData = response.data;
          console.log(pageData);
          self.payhotappR = pageData.app;
          self.latlngr.total.balance = pageData.latlng.total.balance;
          self.latlngr.total.data = pageData.latlng.total.data;
          self.latlngr.visitor.balance = pageData.latlng.visitor.balance;
          self.latlngr.visitor.data = pageData.latlng.visitor.data;
          //nav信息
          self.vsInfo = pageData.info;
          console.log(self.vsInfo);
          //调用对比饼状图
          let myRChart = self.$echarts.init(document.getElementById('myBarRChart'));
          self.$options.methods.myBarRChart(pageData.percent, myRChart);
          //调用热力图热力图
          self.layrto(self.layrt);
        }).catch(error => console.log(error));
    },
    removeVs() {
      this.vsInfo = {};
      this.$router.push('/visitorPayHot');
    },
    laylto(name) {
      var self = this;
      self.laylt = name;
      if (self.laylt == 'total') {
        self.$options.methods.containerL(self.info.name, self.latlngt.total.data);
      } else if (self.laylt == 'visitor') {
        self.$options.methods.containerL(self.info.name, self.latlngt.visitor.data);
      }
    },
    layrto(name) {
      var self = this;
      self.layrt = name;
      if (self.layrt == 'total') {
        self.$options.methods.containerR(self.vsInfo.name, self.latlngr.visitor.data);
      } else if (self.layrt == 'visitor') {
        self.$options.methods.containerR(self.vsInfo.name, self.latlngr.visitor.data);
      }
    },
    myBarLChart(data, myLChart) {
      var BarLoption = {
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        legend: {
          orient: 'vertical',
          x: 10,
          y: 50,
          data: ['线上支付', '扫码支付']
        },
        grid: {
          top: '0%'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '80%',
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
                  fontSize: 13,
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [
              { value: data[1], name: '线上支付', itemStyle: { normal: { color: '#01aef0' } } },
              { value: data[2], name: '扫码支付', itemStyle: { normal: { color: '#03ca99' } } }
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
      myLChart.setOption(BarLoption)
    },
    containerL(name, data) {
      var map = new BMap.Map("containerL");          // 创建地图实例
      var point = new BMap.Point(116.418261, 39.921984);
      map.centerAndZoom(point, 11);             // 初始化地图，设置中心点坐标和地图级别
      if (name) {
      	console.log(name);
        map.centerAndZoom(name, 11);      // 用城市名设置地图中心点
      }
      map.enableScrollWheelZoom(); // 允许滚轮缩放
      var points = data;
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
      var heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
      map.addOverlay(heatmapOverlay);
      heatmapOverlay.setDataSet({ data: points, max: 100 });
      //是否显示热力图
      heatmapOverlay.show();
      function setGradient() {
        /*格式如下所示:
    {
        0:'rgb(102, 255, 0)',
          .5:'rgb(255, 170, 0)',
        1:'rgb(255, 0, 0)'
    }*/
        var gradient = {};
        var colors = document.querySelectorAll("input[type='color']");
        colors = [].slice.call(colors, 0);
        colors.forEach(function (ele) {
          gradient[ele.getAttribute("data-key")] = ele.value;
        });
        heatmapOverlay.setOptions({ "gradient": gradient });
      }
    },
    myBarRChart(data, myRChart) {
      var BarRoption = {
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        legend: {
          orient: 'vertical',
          x: 10,
          y: 50,
          data: ['线上支付', '扫码支付']
        },
        grid: {
          top: '0%'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '80%',
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
                  fontSize: 13,
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [
              { value: data[1], name: '线上支付', itemStyle: { normal: { color: '#01aef0' } } },
              { value: data[2], name: '扫码支付', itemStyle: { normal: { color: '#03ca99' } } }
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
      myRChart.setOption(BarRoption)
    },
    containerR(name, data) {
      var map = new BMap.Map("containerR");          // 创建地图实例
      var point = new BMap.Point(116.418261, 39.921984);
      map.centerAndZoom(point, 15);             // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(); // 允许滚轮缩放
      if (name) {
      	console.log(name);
        map.centerAndZoom(name, 11);      // 用城市名设置地图中心点
      }
      var points = data;
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
      var heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
      map.addOverlay(heatmapOverlay);
      heatmapOverlay.setDataSet({ data: points, max: 100 });
      //是否显示热力图
      heatmapOverlay.show();
      function setGradient() {
        /*格式如下所示:
    {
        0:'rgb(102, 255, 0)',
          .5:'rgb(255, 170, 0)',
        1:'rgb(255, 0, 0)'
    }*/
        var gradient = {};
        var colors = document.querySelectorAll("input[type='color']");
        colors = [].slice.call(colors, 0);
        colors.forEach(function (ele) {
          gradient[ele.getAttribute("data-key")] = ele.value;
        });
        heatmapOverlay.setOptions({ "gradient": gradient });
      }
    }
  },
  components: {
    asideLi: aside,
    navTop: nav
  }
}
</script>

<style scoped="scoped">
.tab {
  padding: 16px 0 16px 24px
}

.tab .title {
  font-size: 15px;
  color: #464c5b
}

.PayHot-table-charts {
  background: #FFF;
  border-radius: 8px
}

.PayHot-table-charts .title {
  font-size: 15px;
  color: #333;
  padding-bottom: 14px;
  padding: 16px 0 16px 24px
}

.PayHot-table-charts table {
  width: 100%
}

.PayHot-table-charts table tr th {
  background: #f4f7fc;
  border: 1px solid #e3e8ee;
  font-size: 12px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 9px;
  padding-bottom: 9px;
  color: #464C5B;
}

.PayHot-table-charts table tr td {
  height: 58px;
  padding-left: 12px;
  padding-right: 12px;
  border-bottom: 1px solid #e3e8ee;
  font-size: 12px
}

.PayHot-table-charts table tr td:first-child {
  text-align: center;
}

.PayHot-table-charts table body tr:nth-of-type(1) {
  background: #fbfcfe
}

.PayHot-table-charts table tr td img {
  width: 32px;
  height: 32px;
  margin-right: 27px;
}

.rankmain {
  display: flex
}

.PayHot-table-charts {
  width: 50%;
  overflow: auto;
  background: #fff;
  height: 385px
}

.PayHot-table-charts:first-child {
  margin-right: 24px
}

#containerL,
#containerR {
  width: 100%;
  height: 100%
}

.hotcontrast {
  height: 242.5px
}

.tab-switch {
  position: absolute;
  z-index: 22;
  background: #fff;
  top: 17px;
  left: 24px;
  border-radius: 8px;
}

.tab-switch ul {
  overflow: hidden;
  padding: 0 8px;
}

.tab-switch ul li {
  float: left;
  font-size: 14px;
  color: #464c5b;
  padding: 4px 16.5px;
  cursor: pointer;
}

.tab-switch ul li.active {
  font-weight: 800;
  border-bottom: 3px solid #0082E6;
}

.appCol {
  display: flex;
  align-items: center;
}
.appname {
  flex: 1;
}

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
