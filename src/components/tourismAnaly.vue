<template>
  <div>
    <div class="main-content">
      <navTop :info="info" :has-vs="false" v-on:updateMe="reRenderMe"></navTop>
      <div class="main-top">
        <div class="tab">
          <img class="fl" src="/Public/static/assets/image/tour-icon.png" alt="渗透率" />
          <div class="owh">
            <h3>渗透率</h3>
            <p>{{ formatNumber(penetrance*100) }}<span class="small">%</span></p>
          </div>
        </div>
        <div class="tab">
          <img class="fl" src="/Public/static/assets/image/tourism-icon.png" alt="总体TGI" />
          <div class="owh">
            <h3>总体TGI</h3>
            <p>{{ total_tgi }}</p>
          </div>
        </div>
        <div class="tab">
          <img class="fl" src="/Public/static/assets/image/tourism-gr-icon.png" alt="区域TGI" />
          <div class="owh">
            <h3>区域TGI</h3>
            <p>{{ area_tgi.toFixed(1) }}</p>
          </div>
        </div>
      </div>
      <div class="rankmain">
        <div class="barChart">
          <div class="title">{{ monthval }}月均MAU</div>
          <div id="myChart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import echarts from 'echarts'
import aside from './aside.vue'
import numeral from 'numeral';
import nav from './nav.vue'
import store from 'store';
import qs from 'qs';
export default {
  data() {
    return {
      info: {},
      monthval: '',
      penetrance: 0,
      total_tgi: 0,
      area_tgi: 0,
      chartData: {}
    }
  },
  methods: {
    formatNumber(value) {
      return numeral(value).format('0.00');
    },
    reRenderMe(data) {
      this.getData(data.info, data.month);
    },
    getData(body, date){
      var self = this;
      // body.month = date;
      self.$http.post(
        fixurl + '/Online/area',
        qs.stringify({
          'data': JSON.stringify({
            info: body,
            month: date
          })
        })).then((response) => {
          if (response.data.global) {
            self.info = body;
            this.penetrance = response.data.global.penetrance;
            this.total_tgi = response.data.global.total_tgi;
            this.area_tgi = response.data.global.area_tgi;
          }
        this.dealChartData(response.data.app, date);
      }).catch(function (error) {
        console.log(error);
      });
    },
    dealChartData (unDealData, date) {
      var appNameArr = [];
      var lineData = [];
      var barData = [];
      var barName = 'b';
      var lineName = 'l';

      for (var appid in unDealData) {
        appNameArr.push(unDealData[appid].name);
        lineData.push(unDealData[appid].growth.toFixed(2));
        barData.push(unDealData[appid].mau.toFixed(2));
      }

      this.chartData = {
        "appNameArr": appNameArr,
        "lineData": lineData,
        "barData": barData
      }
      const self = this;
      linebarChart(self, {
        "appNameArr": appNameArr,
        "lineData": lineData,
        "barData": barData
      }, date)
    }
  },
  created: function(){
    const travelInfo = store.get('travelInfo');
    const travelMonth = store.get('travelMonth');
    this.info = travelInfo;
    var self = this;
    this.getData(travelInfo, travelMonth);
  },
  mounted: function () {
    var self = this;
  },
  components: {
    asideLi: aside,
    navTop: nav
  }
}
  function linebarChart(self, options, date) {
  	//排序
  	var cont = new Array();
  	for(let i=0;i<10;i++){
  		cont.push({
  			'barData':options.barData[i],
  			'appNameArr':options.appNameArr[i],
  			'lineData':options.lineData[i]
  		})
  	}
	cont.sort(function (x, y){
	    return y.barData - x.barData;
	});
	var barDatas = new Array();
	var lineDatas = new Array();
	var appNameArrs = new Array();
	for(let i=0;i<cont.length;i++){
		barDatas.push(cont[i].barData);
		lineDatas.push(cont[i].lineData);
		appNameArrs.push(cont[i].appNameArr);
	}
    var titleDate = '';
    if (date) {
      if (date.indexOf('-') !== -1) {
        date.split('-');
        titleDate = date.split('-')[0] + '年' + date.split('-')[1];
        self.monthval = titleDate;
      }
    }
    let myChart = self.$echarts.init(document.getElementById('myChart'))
    var option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        },
        formatter: function(titleData){
          var title = titleData[0].name + '<br/>' + titleData[0].marker + titleData[0].seriesName + ': ' + titleData[0].value + ' 万' + '<br/>'
                      + titleData[1].marker + titleData[1].seriesName + ': ' + titleData[1].value + ' %';
          return title;
        }
      },
      grid:{
      	top:'25%'
      },
      legend: {
      	top:'10%',
        data: [titleDate + '月均MAU', '同比增长']
      },
      xAxis: [
        {
          type: 'category',
          data: appNameArrs,
          axisLabel: {
            rotate: 20,
            interval: 0,
            // showMinLabel: false,
            // showMaxLabel: false,
          },
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '',
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            show: false
          }
        },
        {
          type: 'value',
          name: '',
          axisLabel: {
            formatter: '{value} %'
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: titleDate + '月均MAU',
          type: 'bar',
          barWidth: '40px',
          itemStyle: {
            normal: {
              color: '#01aef0'
            }
          },
          data: barDatas,
        },
        {
          name: '同比增长',
          type: 'line',
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#ffbd2e'
            }
          },
          data: lineDatas
        }
      ]
    };

    myChart.setOption(option)
  }
</script>

<style scoped="scoped">
.small {
  font-size: 16px;
  margin-left: 5px;
}
.tab {
  width: 33.3%;
  margin-right: 24px;
}

.tab:last-child {
  margin-right: 0;
}

.tab img {
  width: 55px;
  margin-right: 24px;
}

.tab h3 {
  font-size: 14px;
  color: #657180;
}

.tab p {
  font-size: 32px;
  color: #464C5B;
}

.barChart {
  background: #FFFFFF;
  border-radius: 8px;
}

.barChart .title {
  color: #464c5b;
  font-size: 14px;
  font-weight: 800;
  padding: 16px 0 16px 24px;
  border-bottom: 1px solid #e3e8ee;
}

#myChart {
  height: 500px;
}
</style>
