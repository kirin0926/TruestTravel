<template>
  <div>
    <div class="main-content">
      <navTop
        v-on:updateMe="reRenderMe"
        v-on:updateVs="reRenderVs"
        v-on:removeVs="removeVs"
        :info="info"
        :vsinfo="vsInfo"
        :has-vs="true"
      ></navTop>
      <div class="main-top">
        <div class="tab staytime">
          <div class="title">所在省停留时间</div>
          <div id="myBarLChartStay" :style="{width:'100%',height:'180px'}"></div>
        </div>
        <div class="tab staytime">
          <div class="title"><label class="vsLabel labelvs" v-if="vsInfo.name">{{vsInfo.name}}</label>所在省停留时间</div>
          <div id="myBarRChartStay" :style="{width:'100%',height:'180px'}"></div>
        </div>
      </div>
      <div class="main-top">
        <div class="tab">
          <div class="title">所在省过夜游客常住区域 TOP5</div>
          <div id="myBarLCharthlod" :style="{width:'100%',height:'180px'}"></div>
        </div>
        <div class="tab">
          <div class="title"><label class="vsLabel labelvs" v-if="vsInfo.name">{{vsInfo.name}}</label>所在省过夜游客常住区域 TOP5</div>
          <div id="myBarRCharthlod" :style="{width:'100%',height:'180px'}"></div>
        </div>
      </div>
      <div class="rankmain">
        <div class="trail-barb-charts">
          <div class="title">游客进出省城市分布</div>
          <div id="myBarsRChart" :style="{width:'100%',height:'400px'}"></div>
        </div>
      </div>
      <div class="rankmain">
        <div class="trail-barb-charts">
          <div class="title"><label class="vsLabel labelvs" v-if="vsInfo.name">{{vsInfo.name}}</label>游客进出省城市分布</div>
          <div id="myBarsRChart-vs" :style="{width:'100%',height:'400px'}"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import qs from 'qs'
import store from 'store'
// import echarts from 'echarts'
import aside from './aside.vue'
import nav from './nav.vue'
export default {
  data() {
    return {
      monthval: '',
      info: '',
      vsInfo: '',
      nomal: {
        live: [],
        stay: []
      },
      trast: {
        live: [],
        stay: []
      }
    }
  },
  created: function () {
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
      const datas = data;
      self.info = data.info;
      self.$http.post(fixurl + '/Visitor/track',
        qs.stringify({
          data: JSON.stringify(datas)
        })).then(response => {
          const pagedata = response.data;
          self.nomal.stay = pagedata.stay;
          self.nomal.live = pagedata.live;
          //左边饼状图
          let myLChartstay = self.$echarts.init(document.getElementById('myBarLChartStay'))
          self.staytimenomal(self.nomal.stay, myLChartstay);
          //左边饼状图下
          let myLCharthold = self.$echarts.init(document.getElementById('myBarLCharthlod'))
          self.holdareanomal(self.nomal.live, myLCharthold);

          //
          let myBChart = self.$echarts.init(document.getElementById('myBarsRChart'))
          self.linescitynomal(pagedata.inout, myBChart);
        }).catch(error => console.log(error));
    },
    reRenderVs(data) {
      var self = this;
      const subdata = data;
      self.vsInfo = data.info;
      if (subdata.info.province_id) {
        //为景区对比
        self.$router.push('/visitortrailcontrast');
      } else if (subdata.info.superior) {
        //为景域对比
        //		      	self.vsInfo = datas.info;
        self.$router.push('/visitortrailJinucontrast');
      };
      // console.log(data, 'ddd');
      var datas = data;
      self.$http.post(fixurl + '/Visitor/track',
        qs.stringify({
          data: JSON.stringify(datas)
        })).then(response => {
          // console.log(response.data);
          const pagedata = response.data;
          self.trast.stay = pagedata.stay;
          self.trast.live = pagedata.live;
          //右边饼状图
          let myRChartstay = self.$echarts.init(document.getElementById('myBarRChartStay'))
          self.staytimetrast(self.trast.stay, myRChartstay);
          //右边饼状图
          let myRCharthold = self.$echarts.init(document.getElementById('myBarRCharthlod'))
          self.holdareatrast(self.trast.live, myRCharthold);

          let myBChart = self.$echarts.init(document.getElementById('myBarsRChart-vs'))
          self.linescitynomal(pagedata.inout, myBChart);
        }).catch(error => console.log(error));
    },
    removeVs() {
      this.vsInfo = {};
      this.$router.push('/visitortrail');
    },
    staytimenomal(data, myLChartstay) {
      let legdata = new Array();
      let valuedata = new Array();
      for (let i in data) {
        legdata.push(i);
        valuedata.push(data[i])
      }
      var BarLoptionstay = {
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        //			    tooltip : {
        //			        trigger: 'item',
        //			        formatter: "{a} <br/>{b} : {c} ({d}%)"
        //			    },
        legend: {
          orient: 'vertical',
          x: 10,
          y: 50,
          data: legdata
        },
        grid: {
          top: '10%'
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
              { value: valuedata[0], name: legdata[0], itemStyle: { normal: { color: '#01aef0' } } },
              { value: valuedata[1], name: legdata[1], itemStyle: { normal: { color: '#03ca99' } } },
              { value: valuedata[2], name: legdata[2], itemStyle: { normal: { color: '#ffbd2e' } } },
              { value: valuedata[3], name: legdata[3], itemStyle: { normal: { color: '#7f7fff' } } }
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
      myLChartstay.setOption(BarLoptionstay)
    },
    staytimetrast(data, myRChartstay) {
      let legdata = new Array();
      let valuedata = new Array();
      for (let i in data) {
        legdata.push(i);
        valuedata.push(data[i])
      }
      var BarRoptionstay = {
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        //			    tooltip : {
        //			        trigger: 'item',
        //			        formatter: "{a} <br/>{b} : {c} ({d}%)"
        //			    },
        legend: {
          orient: 'vertical',
          x: 10,
          y: 50,
          data: legdata
        },
        grid: {
          top: '10%'
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
              { value: valuedata[0], name: legdata[0], itemStyle: { normal: { color: '#01aef0' } } },
              { value: valuedata[1], name: legdata[1], itemStyle: { normal: { color: '#03ca99' } } },
              { value: valuedata[2], name: legdata[2], itemStyle: { normal: { color: '#ffbd2e' } } },
              { value: valuedata[3], name: legdata[3], itemStyle: { normal: { color: '#7f7fff' } } }
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
      myRChartstay.setOption(BarRoptionstay)
    },
    holdareanomal(data, myLCharthold) {
      let legdata = new Array();
      let seriesdata = new Array();
      var color = ['#01aef0', '#03ca99', '#ffbd2e', '#7f7fff', '#1385d9'];
      for (let i in data) {
        seriesdata.push({
          value: Number(data[i]), name: i
        })
      }
      seriesdata.sort((x, y) => {
        return y.value - x.value;
      });

      var sData = seriesdata.filter((item, i) => i < 5).map((item, i) => {
        item.itemStyle = { normal: { color: color[i] } };
        return item;
      })
      var BarLoptionhold = {
        grid: {
          top: 20,
          bottom: 10,
          left: 5,
          right: 20,
          containLabel: true
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
              return params[0].name + '<br />' +
                (params[0].value * 100).toFixed(1) + '%'
            }
        },
        yAxis : [
          {
            type : 'value',
            axisLabel: {
              formatter: function(value, index) {
                return (value * 100).toFixed(0) + '%'
              }
            }

          }
        ],
        xAxis : [
          {
            type : 'category',
            data : sData.map(item => item.name),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        series: [
          {
            name:'过夜游客常住区域',
            type:'bar',
            barWidth: '60%',
            data: sData
          }
        ]
      };
      myLCharthold.setOption(BarLoptionhold)
    },
    holdareatrast(data, myRCharthold) {
    	
      let legdata = new Array();
      let seriesdata = new Array();

      var color = ['#01aef0', '#03ca99', '#ffbd2e', '#7f7fff', '#1385d9'];

      for (let i in data) {
        seriesdata.push({
          value: Number(data[i]), name: i
        })
      }
      seriesdata.sort((x, y) => {
        return y.value - x.value;
      });
	  
      var sData = seriesdata.filter((item, i) => i < 5).map((item, i) => {
        item.itemStyle = { normal: { color: color[i] } };
        return item;
      });
      var BarRoptionhold = {
        grid: {
          top: 20,
          bottom: 10,
          left: 5,
          right: 20,
          containLabel: true
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
              return params[0].name + '<br />' +
                (params[0].value * 100).toFixed(1) + '%'
            }
        },
        yAxis : [
          {
            type : 'value',
            axisLabel: {
              formatter: function(value, index) {
                return (value * 100).toFixed(0) + '%'
              }
            }

          }
        ],
        xAxis : [
          {
            type : 'category',
            data : sData.map(item => item.name),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        series: [
          {
            name:'过夜游客常住区域',
            type:'bar',
            barWidth: '60%',
            data: sData
          }
        ]
      };
      
      myRCharthold.setOption(BarRoptionhold)
    },
    linescitynomal(data, myBChart) {
      // console.log(data);
      var BarBoption = {
        color: [
          '#01aef0', '#03ca99'
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          top: '20',
          right: '20',
          data: [{
            name: '进省人次'
          }, {
            name: '出省人次'
          }]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: data[0] // ['贵阳', '遵义', '六盘水', '安顺', '毕节', '同仁']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '进省人次',
            type: 'bar',
            data: data[1].map(item => {
              return {
                value: item,
              }
            })
          },
          {
            name: '出省人次',
            type: 'bar',
            stack: '广告',
            data: data[2].map(item => {
              return {
                value: item,
              }
            })
          }
        ]
      };
      myBChart.setOption(BarBoption)
    }
  },
  components: {
    asideLi: aside,
    navTop: nav
  }
}
</script>

<style scoped="scoped">
.mylinesBox {
  width: 100%;
  height: 547px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.mylinesBox .title {
  padding: 16px 0 16px 24px;
  font-size: 15px;
  color: #464c5b;
}

.tab {
  padding: 16px 0 16px 24px;
}

.tab .title {
  font-size: 15px;
  color: #464c5b;
}

.tab:first-child {
  margin-right: 24px;
}

.trail-barb-charts {
  background: #FFFFFF;
  border-radius: 8px;
}

.trail-barb-charts .title {
  padding: 16px 0 16px 24px;
  font-size: 15px;
  color: #464c5b;
}
.rankmain {
  margin-bottom: 24px;
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
