<template>
  <div>
    <div class="main-content">
      <navTop :info="info" :has-vs="false" :no-search="true" v-on:monthChanged="monthChanged"></navTop>
      <div class="main-top">
        <div class="tab">
          <img class="fl" src="/Public/static/assets/image/tour-icon.png" alt="MAU" />
          <div class="owh">
            <h3>MAU</h3>
            <p>{{formatNumber(overAllCate.mau)}}<span>万</span>
            </p>
          </div>
        </div>
        <div class="tab">
          <img class="fl" src="/Public/static/assets/image/tours-icon.png" alt="月均DAU" />
          <div class="owh">
            <h3>月均DAU</h3>
            <p>{{formatNumber(overAllCate.avgdau)}}<span>万</span>
            </p>
          </div>
        </div>
        <div class="tab">
          <img class="fl" src="/Public/static/assets/image/phone-icon.png" alt="打开频次" />
          <div class="owh">
            <h3>打开频次</h3>
            <p>{{formatNumber(overAllCate.DayActiveTimes)}}<span>次</span>
            </p>
          </div>
        </div>
        <div class="tab">
          <img class="fl" src="/Public/static/assets/image/time-icon.png" alt="日均打开时长" />
          <div class="owh">
            <h3>日均打开时长</h3>
            <p>1{{formatNumber(overAllCate.DayActiveAvgSecs, '0,0')}}<span>秒</span>

            </p>
          </div>
        </div>
      </div>
      <div class="rankmain">
        <div class="user-map">
          <div class="title">综合用户分布</div>
          <div id="myChart" class="map-charts"></div>
        </div>

        <div class="tour-rank">
          <div class="title">在线旅游类APP排名</div>
          <div class="ranking">
            <table v-if="sortedOverAllApps && sortedOverAllApps.length">
              <thead>
                <tr>
                  <th>排名</th>
                  <th>应用名称</th>
                  <th>MAU</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(app, index) in sortedOverAllApps" :key="app.id">
                  <td>{{index + 1}}</td>
                  <td>
                    <div class="appCol">
                      <img class="appimg" :src="app.img" :alt="app.name" />
                      <div class="appname">{{app.name}}</div>
                    </div>
                  </td>
                  <td>{{formatNumber(app.mau)}}</td>
                </tr>
              </tbody>
            </table>
            <div v-else class="no-data">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function maphot(chart, data) {
  const seriesData = [];
  let maxValue = 0;
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      let value = Number(data[key]);
      maxValue = Math.max(maxValue, value);
      seriesData.push({
        name: key.replace('市', '').replace('省', '').replace('自治区', '')
          .replace('特别行政区', '').replace('维吾尔', '').replace('壮族', '').replace('回族', ''),
        value: value
      })
    }
  }
  var option = {
    tooltip: {},
    visualMap: {
      type: 'piecewise',
      splitNumber: 4,
      min: 0,
      max: maxValue,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      seriesIndex: [0],
      inRange: {
        color: ['rgba(104,151,199, 0.5)', '#123b4f']
      },
      calculable: true
    },
    geo: {
      map: 'china',
      roam: 'move',
      label: {
        normal: {
          show: true,
          textStyle: {
            color: 'rgba(0,0,0,0.4)'
          }
        }
      },
      itemStyle: {
        normal: {
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
    series: [
      {
        name: '综合用户分布',
        type: 'map',
        geoIndex: 0,
        // tooltip: {show: false},
        data: seriesData,
      }
    ]
  };
  chart.setOption(option)
}
import qs from 'qs'
import numeral from 'numeral'
import nav from './nav.vue'
export default {
  data() {
    return {
      monthval: '',
      info:{
      	"name":'整体旅游市场'
      },
      overAllApps: null,
      overAllCate: {},
      mapChart: null,
      pickerOptions: {
        disabledDate: (date) => {
          return +date > Date.now();
        }
      }
    }
  },
  computed: {
    sortedOverAllApps() {
      if(this.overAllApps) {
        let apps = [];
        for (var key in this.overAllApps) {
          if (this.overAllApps.hasOwnProperty(key)) {
            var element = this.overAllApps[key];
            element.id = key;
            apps.push(element);
          }
        }
        apps.sort((x, y) => {
          return parseFloat(y.mau) - parseFloat(x.mau);
        });
        return apps;
      } else {
        return [];
      }
    }
  },
  created(){
    this.renderMe(this.monthval);
  },
  mounted: function () {
    var self = this;
    this.mapChart = self.$echarts.init(document.getElementById('myChart'))

  },
  methods: {
    formatNumber(value, format) {
      return numeral(value).format(format || '0,0.0');
    },
    renderMe(month) {
      const vm = this;
      this.$http.post(fixurl + '/Online/overall', qs.stringify({
        data: JSON.stringify({month: month})
      })).then(response => {
        vm.overAllApps = response.data.app;
        vm.overAllCate = response.data.cate;
        let chart = vm.mapChart;
        if (!vm.mapChart) {
          chart = echarts.getInstanceByDom(document.getElementById('myChart'));
          vm.mapChart = chart;
        }
        maphot(chart, response.data.distribution);
      }).catch(error => console.log(error));
    },
    monthChanged(month){
      this.renderMe(month);
    }
  },
  components: {
  	navTop: nav
  }
}
</script>

<style scoped="scoped">
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
  z-index: 200;
}


.map-charts {
  padding: 0 0 15px 15px;
}

.tab {
  width: 25%;
  margin-right: 24px;
}

.tab:last-child {
  margin-right: 0;
}

.tab img {
  width: 55px;
  margin-right: 14px;
}

.tab h3 {
  font-size: 14px;
  color: #657180;
}

.tab .owh p {
  font-size: 32px;
  color: #464C5B;
}

.tab .owh p span {
  font-size: 14px;
  margin-left: 5px;
  color: #657180;
}

.rankmain {
  display: flex;
}

.rankmain .user-map {
  width: 70%;
  background: #FFFFFF;
  margin-right: 22px;
  border-radius: 8px;
}

.user-map .title {
  font-size: 14px;
  color: #464c5b;
  padding-left: 24px;
  padding-top: 17.5px;
  padding-bottom: 17.5px;
  border-bottom: 1px solid #E3E8EE;
}

.tour-rank {
  width: 30%;
  background: #FFFFFF;
  border-radius: 8px;
}

.tour-rank .title {
  font-size: 14px;
  color: #464c5b;
  padding-left: 24px;
  padding-top: 17.5px;
  padding-bottom: 17.5px;
  border-bottom: 1px solid #E3E8EE;
}

.ranking table {
  width: 100%;
}

.ranking table thead th {
  background: #F4F7FC;
  border: 1px solid #E3E8EE;
  border-top: none;
  padding: 10px 6px;
  font-size: 14px;
  color: #464C5B;
  font-weight: 800;
}

.ranking table tbody td {
  padding-left: 8px;
  padding-right: 8px;
}

.ranking table tbody td:first-child {
  text-align: center;
}

.ranking table tbody tr {
  border-bottom: 1px solid #E3E8EE;
  height: 57px;
}

.ranking table tbody tr:last-child {
  border-bottom: none;
}

#myChart {
  height: 500px;
}
.appCol {
  display: flex;
  align-items: center;
}
.appname {
  flex: 1;
}
.appimg {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}
</style>
