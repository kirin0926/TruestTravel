<template>
  <div>
    <div class="main-content">
      <navTop v-on:updateMe="reRenderMe" v-on:updateVs="reRenderVs" v-on:removeVs="removeVs" :info="info" :vs-info="vsInfo" :has-vs="true"></navTop>
      <div class="main-top">
        <div class="tab">
          <div class="trail-bar-charts">
            <div class="title">省内停留时间</div>
            <div id="myBarLChart" :style="{width:'100%',height:'180px'}"></div>
          </div>
        </div>
        <div class="tab">
          <div class="trail-bar-charts">
            <div class="title">过夜游客常住区域 TOP5</div>
            <div id="myBarRChart" :style="{width:'100%',height:'180px'}"></div>
          </div>
        </div>
      </div>
      <div class="rankmain">
        <div class="trail-barb-charts">
          <div class="title" style="position: relative;">游客进出省城市分布
            <i class="el-icon-information" v-on:mouseover="showtooltip=true" v-on:mouseout="showtooltip=false"></i>
            <div class="tooltip" v-show="showtooltip">
              <i class="tooltip-icon-left"></i>
              <h3 class="tooltip-title">进省人次：</h3>
              <p class="tooltip-desc">进入该省的首次落入城市人次</p>
              <h3 class="tooltip-title">出省人次：</h3>
              <p class="tooltip-desc">离开该省的最后城市人次</p>
            </div>
          </div>
          <div id="myBarsRChart" :style="{width:'100%',height:'400px'}"></div>
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
      showtooltip: false,
      info: '',
      vsInfo: '',
      stay: {

      },
      live: {

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
    if(vsinfo){
      //对比的数据
      this.reRenderVs({
          info: vsinfo,
          month: month || self.monthval || '2017-06'
      });
    }
  },
  methods: {
    reRenderMe(data) {
      var self = this;
      var datas = data;
      self.info = data.info;
      self.$http.post(fixurl + '/Visitor/track',
        qs.stringify({
          data: JSON.stringify(data)
        })).then(response => {
          const pagedata = response.data;
                self.stay = pagedata.stay;
                self.live = pagedata.live;
                self.inout = pagedata.inout;
                //左边饼状图
                let myLChart = self.$echarts.init(document.getElementById('myBarLChart'));
                self.myBarLChart(self.stay, myLChart);
                //右边饼状图
                let myRChart = self.$echarts.init(document.getElementById('myBarRChart'))
                self.myBarRChart(self.live, myRChart);
                //底部柱状图
                let myBChart = self.$echarts.init(document.getElementById('myBarsRChart'))
                self.myBarsRChart(self.inout, myBChart);
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
        self.vsInfo = data.info;
        self.$router.push('/visitortrailJinucontrast');
      };
    },
    removeVs(){
      this.vsInfo = {};
    },
    myBarLChart(data, myLChart) {
      let dataname = new Array();
      let seriesdata = new Array();
      for (let i in data) {
        dataname.push(i);
        seriesdata.push(data[i])
      }
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
          data: dataname
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
              { value: seriesdata[0], name: dataname[0], itemStyle: { normal: { color: '#01aef0' } } },
              { value: seriesdata[1], name: dataname[1], itemStyle: { normal: { color: '#03ca99' } } },
              { value: seriesdata[2], name: dataname[2], itemStyle: { normal: { color: '#ffbd2e' } } },
              { value: seriesdata[3], name: dataname[3], itemStyle: { normal: { color: '#7f7fff' } } }
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
    myBarRChart(data, myRChart) {
      // console.log(data);
      let dataname = new Array();
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

      var BarRoption = {
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
            barWidth: '20%',
            data: sData
          }
        ]
      };
      myRChart.setOption(BarRoption)
    },
    myBarsRChart(data, myBChart) {
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
          // {
          //   type: 'category',
          //   data:  // ['贵阳', '遵义', '六盘水', '安顺', '毕节', '同仁']
          // }
          {
          type: 'category',
          data: data[0],
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
            type: 'value'
          }
        ],
        series: [
          {
            name: '进省人次',
            type: 'bar',
            barWidth:'20%',
            data: data[1].map(item => {
              return {
                value: item,
                itemStyle: {
                  normal: {
                    color: '#01aef0'
                  }
                }
              }
            })
          },
          {
            name: '出省人次',
            type: 'bar',
            barWidth:'20%',
            stack: '广告',
            data: data[2].map(item => {
              return {
                value: item,
                itemStyle: {
                  normal: {
                    color: '#03ca99'
                  }
                }
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
.trail-bar-charts {
  width: 100%;
  height: 100%
}

.trail-bar-charts .title {
  font-size: 15px;
  color: #464c5b
}

.tab {
  padding: 16px 0 16px 24px
}

.trail-barb-charts {
  background: #FFF;
  border-radius: 8px
}

.trail-barb-charts .title {
  padding: 16px 0 16px 24px;
  font-size: 15px;
  color: #464c5b;
  border-bottom: 1px solid #e3e8ee
}

.trail-barb-charts .title .el-icon-information {
  margin-left: 8px;
}

.tooltip {
  position: absolute;
  background: #55636c;
  border-radius: 8px;
  color: #fff;
  padding: 10px;
  z-index: 22;
  top: 0;
  left: 200px
}

.tooltip h3 {
  font-size: 14px
}

.tooltip p {
  font-size: 13px;
  color: #eee;
}

.tooltip p:first-of-type {
  margin-bottom: 8px;
}

.tooltip-icon-left {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-right: 10px solid #55636c;
  border-bottom: 5px solid transparent;
  position: absolute;
  left: 0;
  margin-left: -10px;
  top: 20px
}
</style>
