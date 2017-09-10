<template>
  <div>
    <div class="main-content">
      <navTop v-on:updateMe="reRenderMe" v-on:updateVs="reRenderVs" v-on:removeVs="removeVs"
      :info="info" :vsinfo="vsInfo" :has-vs="true"></navTop>

      <div class="main-top">
        <div class="tab staytime">
          <div class="title">所在市停留时间</div>
          <div id="myBarLChartStay" :style="{width:'100%',height:'180px'}"></div>
        </div>
        <div class="tab staytime">
          <div class="title">
            <label class="vsLabel labelvs" v-if="vsInfo.name">{{vsInfo.name}}</label>所在市停留时间</div>
          <div id="myBarRChartStay" :style="{width:'100%',height:'180px'}"></div>
        </div>
      </div>
      <div class="main-top">
        <div class="tab">
          <div class="title">所在市过夜游客常住区域 TOP5</div>
          <div id="myBarLCharthlod" :style="{width:'100%',height:'180px'}"></div>
        </div>
        <div class="tab">
          <div class="title">
            <label class="vsLabel labelvs" v-if="vsInfo.name">{{vsInfo.name}}</label>所在市过夜游客常住区域 TOP5</div>
          <div id="myBarRCharthlod" :style="{width:'100%',height:'180px'}"></div>
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
    //调用对比的数据
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
      self.$http.post(fixurl + '/Visitor/track',
        qs.stringify({
          data: JSON.stringify(data)
        })).then(response => {
          const pagedata = response.data;
          self.info = pagedata.info;
          self.nomal.stay = pagedata.stay;
          self.nomal.live = pagedata.live;
          //左边饼状图
          let myLChartstay = self.$echarts.init(document.getElementById('myBarLChartStay'))
          self.staytimenomal(self.nomal.stay, myLChartstay);
          //左边饼状图下
          let myLCharthold = self.$echarts.init(document.getElementById('myBarLCharthlod'))
          self.holdareanomal(self.nomal.live, myLCharthold);
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
        self.$router.push('/visitortrailJinucontrast');
      };
      self.$http.post(fixurl + '/Visitor/track',
        qs.stringify({
          data: JSON.stringify(data)
        })).then(response => {
          const pagedata = response.data;
        	  self.vsInfo = pagedata.info;
          self.trast.stay = pagedata.stay;
          self.trast.live = pagedata.live;
          //右边饼状图
          let myRChartstay = self.$echarts.init(document.getElementById('myBarRChartStay'));
          self.staytimetrast(self.trast.stay, myRChartstay);
          //右边饼状图
          let myRCharthold = self.$echarts.init(document.getElementById('myBarRCharthlod'))
          self.holdareatrast(self.trast.live, myRCharthold);
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
        legend: {
          orient: 'vertical',
          x: 10,
          y: 50,
          formatter: '{name}',
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
      let valuedata = new Array();
      for (let i in data) {
        legdata.push(i);
        valuedata.push(data[i])
      }
      var BarLoptionhold = {
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
      myLCharthold.setOption(BarLoptionhold)
    },
    holdareatrast(data, myRCharthold) {
      let legdata = new Array();
      let valuedata = new Array();
      for (let i in data) {
        legdata.push(i);
        valuedata.push(data[i])
      }
      var BarRoptionhold = {
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
            radius: '75%',
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
      myRCharthold.setOption(BarRoptionhold)
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

.vsLabel {padding: 7px 10px;
    color: #fff;
    float: right;
    margin: -6px 20px 0 0;
    position: absolute;
    right: 0;
    text-align: center;
    padding-left: 20px;}
</style>
