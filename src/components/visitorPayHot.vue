<template>
  <div>
    <div class="main-content">
      <navTop v-on:updateMe="reRenderMe" v-on:updateVs="reRenderVs" v-on:removeVs="removeVs" :info="info" :vs-info="vsInfo" :has-vs="true"></navTop>
      <div class="main-top">
        <div class="tab hotTab" style="height: 385px">
          <div class="title">游客线上/扫码支付占比</div>
          <div id="myBarLChart" :style="{width:'100%',height:'300px'}"></div>
        </div>

        <div class="tab" style="padding: 0;height: 385px;overflow: auto;">
          <div class="PayHot-table-charts">
            <div class="title">游客支付行为 TOP5(支付笔数占比)</div>
            <table>
              <tr>
                <th style="width: 3%;">排行</th>
                <th style="width: 15%;">应用名称</th>
                <th style="width: 20%;">比例</th>
              </tr>
              <tbody>
                <tr v-for="(item,index) in payHotAppSort" v-if="index<5">
                  <td>{{index+1}}</td>
                  <td>
                    <div class="appCol">
                      <img class="appimg" :src="item.img" :alt="item.name" />
                      <div class="appname">{{item.name}}</div>
                    </div>
                  <td>
                    <el-progress :percentage="Number(item.percent*100).toFixed(1)"></el-progress>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="rankmain" style="height: 495px;padding: 0;position: relative;">
        <div class="tab-switch">
          <ul>
            <li :class="{ active:hotlay == 'total' }" @click=" tabhot('total')">扫码支付热力图</li>
            <!--<li :class="{ active:hotlay == 'visitor' }" @click=" tabhot('visitor')">游客支付热力图</li>-->
          </ul>
        </div>
        <div id="container"></div>
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
      payhotlatlng: {
        total: {
          balance: '',
          data: []
        },
        visitor: {
          balance: '',
          data: []
        }
      },
      payhotapp: '',
      info: {},
      vsInfo: {},
      payhotpercent: [],
      hotlay: 'total',
      total: '',
      exponent: ''
    }
  },
  computed: {
    payHotAppSort() {
      return [].concat(this.payhotapp).sort((x, y) => {
        return y.percent - x.percent;
      })
    }
  },
  created: function () {
    var self = this;
    const info = store.get('travelInfo');
    const month = store.get('travelMonth');
	  const vsinfo = store.get('travelVsInfo');
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
    if(vsinfo){
    	 this.reRenderVs({
        info:vsinfo,
        month:month
      })
    }

  },
  methods: {
    reRenderMe(data) {
      var self = this;
      self.$http.post(fixurl + '/Visitor/payfor',
        qs.stringify({
          data: JSON.stringify(data)
        })).then(response => {
          const pageData = response.data;
          //热力图
          self.payhotlatlng.total.balance = pageData.latlng.total.balance;
          self.payhotlatlng.total.data = pageData.latlng.total.data;
          self.payhotlatlng.visitor.balance = pageData.latlng.visitor.balance;
          self.payhotlatlng.visitor.data = pageData.latlng.visitor.data;
          //绑定的排行
          self.payhotapp = pageData.app;
          //nav信息
          self.info = pageData.info;
          //饼状图
          let myLChart = self.$echarts.init(document.getElementById('myBarLChart'));
          self.$options.methods.barChart(pageData.percent, myLChart);
          //调取热力图
          self.tabhot(self.hotlay);
        }).catch(error => console.log(error));
    },
    reRenderVs(data) {
      //对比
      this.vsInfo = data.info;
      this.$router.push('/visitorPayHotcontrast');
    },
    removeVs() {
      this.vsInfo = {};
    },
    tabhot(name) {
      var self = this;
      self.hotlay = name;
      if (name == 'total') {
        //整体热力图
        self.$options.methods.payhot(self.info.name, self.payhotlatlng.total.data);
      } else if (name == 'visitor') {
        //游客热力图
        self.$options.methods.payhot(self.info.name, self.payhotlatlng.visitor.data);
      }
    },
    payhot: function (name, data) {
      let hotdata = data;
      var map = new BMap.Map("container");          // 创建地图实例
      var point = new BMap.Point(116.418261, 39.921984);
      map.centerAndZoom(point, 8);             // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(); // 允许滚轮缩放
      if (name != "") {
      	console.log(name,111);
        map.centerAndZoom(name, 8);      // 用城市名设置地图中心点
      }
      var points = hotdata;

      if (!isSupportCanvas()) {
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

      var heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
      map.addOverlay(heatmapOverlay);

      heatmapOverlay.setDataSet({ data: points, max: 100 });
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
      //判断浏览区是否支持canvas
      function isSupportCanvas() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
      }
    },
    barChart: function (data, myLChart) {
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
          top: '20%'
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

.hotTab {
  box-sizing: border-box;
}

#container {
  width: 100%;
  height: 100%
}

.tab-switch {
  position: absolute;
  z-index: 22;
  background: #fff;
  top: 17px;
  left: 24px;
  border-radius: 8px
}

.tab-switch ul {
  overflow: hidden;
  padding: 0 8px
}

.tab-switch ul li {
  float: left;
  font-size: 14px;
  color: #464c5b;
  padding: 4px 16.5px;
  cursor: pointer
}

.tab-switch ul li.active {
  font-weight: 800;
  border-bottom: 3px solid #0082E6
}
.appCol {
  display: flex;
  align-items: center;
}
.appname {
  flex: 1;
}
</style>
<style>

.el-progress-bar{
	width: 95%;
    margin-right: -50px;
}
</style>
