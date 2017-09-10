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
        <div class="tab">
          <h4 class="tab-title">性别</h4>
          <div style="width: 80%;margin: 0 auto;">
            <div class="p-sex-nums" id="sexNums"></div>
            <canvas id="sexChart" :style="{width:'100%',height:'121px'}"></canvas>
          </div>
        </div>
        <div class="tab" v-show="vsInfo.name">
          <h4 class="tab-title"><label class="vsLabel labelvs" v-if="vsInfo.name">{{vsInfo.name}}</label>性别</h4>
          <div style="width: 80%;margin: 0 auto;">
            <div class="p-sex-nums" id="vsSexNums"></div>
            <canvas id="vsSexChart" :style="{width:'100%',height:'121px'}"></canvas>
          </div>
        </div>
        <div class="tab">
          <div class="basic-barb-charts">
            <div class="title">年龄</div>
            <div id="myBarsRChart" :style="{width:'100%',height:'240px'}"></div>
          </div>
        </div>
        <div class="tab" v-show="vsInfo.name">
          <div class="basic-barb-charts">
            <div class="title"><label class="vsLabel labelvs" v-if="vsInfo.name">{{vsInfo.name}}</label>年龄</div>
            <div id="myBarsRChart-vs" :style="{width:'100%',height:'240px'}"></div>
          </div>
        </div>
      </div>

      <div class="tab-box">
        <div class="tab">
          <div class="basic-sumption-charts">
            <div class="title"> 消费水平</div>
            <div id="sumptionCharts" :style="{width:'100%',height:'240px'}"></div>
          </div>
        </div>

        <div class="tab" v-show="vsInfo.name">
          <div class="basic-sumption-charts">
            <div class="title"><label class="vsLabel labelvs" v-if="vsInfo.name">{{vsInfo.name}}</label>消费水平</div>
            <div id="sumptionCharts-vs" :style="{width:'100%',height:'240px'}"></div>
          </div>
        </div>

        <div class="tab">
          <div class="basic-Marriage-charts">
            <div class="title">婚育状态</div>
            <div id="marriageCharts" :style="{width:'100%',height:'240px'}"></div>
          </div>
        </div>

        <div class="tab" v-show="vsInfo.name">
          <div class="basic-Marriage-charts">
            <div class="title"><label class="vsLabel labelvs" v-if="vsInfo.name">{{vsInfo.name}}</label>婚育状态</div>
            <div id="marriageCharts-vs" :style="{width:'100%',height:'240px'}"></div>
          </div>
        </div>

      </div>

      <div class="rankmain">
        <div class="online-shop">
          <div class="title">网购习惯</div>
          <div id="online-shop-charts" :style="{width:'100%',height:'355px'}"></div>
        </div>
      </div>
      <div class="rankmain" v-show="vsInfo.name">
        <div class="online-shop">
          <div class="title"><label class="vsLabel labelvs" v-if="vsInfo.name">{{vsInfo.name}}</label>网购习惯</div>
          <div id="online-shop-charts-vs" :style="{width:'100%',height:'355px'}"></div>
        </div>
      </div>
      <div class="rankmain">
        <div class="mark">
          <div class="title">用户标签</div>
          <div class="user-tag-chart-box">
            <div id="user-tag-chart" class="user-tag-chart"></div>
          </div>
        </div>
      </div>
      
      <div class="rankmain" v-show="vsInfo.name">
        <div class="mark">
          <div class="title"><label class="vsLabel labelvs" v-if="vsInfo.name">{{vsInfo.name}}</label>用户标签</div>
          <div class="user-tag-chart-box">
            <div id="user-tag-chart-vs" class="user-tag-chart"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import echarts from 'echarts'
import store from 'store'
import qs from 'qs'
import aside from './aside.vue'
import nav from './nav.vue'
import { sexNums, sextab, basicbarCharts, basicmarryageCharts,
  initInterest, onlineCharts, basicsumptionCharts } from '@/lib/td-chart.js'

export default {
  data() {
    return {
      monthval: '',
      info: {},
      vsInfo: {},
      personalData: null,
      onlineChart: null,
      basicbarChart: null,
      marryChart: null,
      sumptionChart: null,
      onlineChartVs: null,
      basicbarChartVs: null,
      marryChartVs: null,
      sumptionChartVs: null,
    }
  },
  methods: {
      renderCharts(data) {
        const self = this;
        onlineCharts(self.onlineChart, data.life_dist)
        basicbarCharts(self.basicbarChart, data.age_dist)
        basicmarryageCharts(self.marryChart, data.marriage_state)
        basicsumptionCharts(self.sumptionChart, data.consume_level)
        initInterest('user-tag-chart', data.man_type_dist)
        const sex_dist = data.sex_dist;
        if(sex_dist) {
          sextab(self.$el.querySelector('#sexChart'), sex_dist)
          this.$el.querySelector('#sexNums').innerHTML = sexNums(sex_dist);
        }
      },
      renderVsCharts(data) {
        const self = this;
        onlineCharts(self.onlineChartVs, data.life_dist)
        basicbarCharts(self.basicbarChartVs, data.age_dist)
        basicmarryageCharts(self.marryChartVs, data.marriage_state)
        basicsumptionCharts(self.sumptionChartVs, data.consume_level)
        initInterest('user-tag-chart-vs', data.man_type_dist, 'vs')

        const sex_dist = data.sex_dist;
        self.$el.querySelector('#vsSexNums').innerHTML = sexNums(sex_dist);

        setTimeout(function() {
          if(sex_dist) {
            sextab(self.$el.querySelector('#vsSexChart'), sex_dist)
          }
          self.onlineChartVs.resize();
          self.basicbarChartVs.resize();
          self.marryChartVs.resize();
          self.sumptionChartVs.resize();
          echarts.getInstanceByDom(document.getElementById('user-tag-chart-vs')).resize();
        }, 20);
      },
      reRenderMe(data) {
        var self = this;
        let loading = this.$loading()
        self.$http.post(fixurl + '/Persona/feature',
          qs.stringify({
            data: JSON.stringify(data)
          })).then(response => {
            self.personalData = response.data;
            self.renderCharts(response.data);
            self.info = response.data.info;
            loading.close();
          }).catch(error => {
            console.log(error)
            loading.close();
          });
      },
      reRenderVs(data) {
        var self = this;
//      if(!self.onlineChartVs) {
//      }
        let loading = this.$loading();
        self.$http.post(fixurl + '/Persona/feature',
          qs.stringify({
            data: JSON.stringify(data)
          })).then(response => {
            self.vsInfo = response.data.info;
            self.$nextTick(() => {
	          self.onlineChartVs = self.$echarts.init(document.getElementById('online-shop-charts-vs'))
	          self.basicbarChartVs = self.$echarts.init(document.getElementById('myBarsRChart-vs'))
	          self.marryChartVs = self.$echarts.init(document.getElementById('marriageCharts-vs'))
	          self.sumptionChartVs = self.$echarts.init(document.getElementById('sumptionCharts-vs'))
              self.renderVsCharts(response.data);
            })
            loading.close();
          }).catch(error => {
            console.log(error)
            loading.close();
          });
      },
      removeVs() {
        this.vsInfo = {};
      }
    },
    created() {
      const info = store.get('travelInfo');
      const vsinfo = store.get('travelVsInfo');
      const month = store.get('travelMonth');
      this.reRenderMe({
        info: info||{
          'id': 78 ,
          'name': '海南槟榔谷黎苗文化旅游区',
          'type': 4,
          "province_id": 391,
          "city_id": 375
        },
        month: self.monthval || '2017-05'
      });
      //对比的数据
      if(vsinfo){
      	this.reRenderVs({
          info: vsinfo,
          month:month
        });
      }
    },
    mounted: function () {
      var self = this;

      self.onlineChart = self.$echarts.init(document.getElementById('online-shop-charts'))

      self.basicbarChart = self.$echarts.init(document.getElementById('myBarsRChart'))

      self.marryChart = self.$echarts.init(document.getElementById('marriageCharts'))

      self.sumptionChart = self.$echarts.init(document.getElementById('sumptionCharts'))
	  
    },
    components: {
      asideLi: aside,
      navTop: nav
    }
}
</script>

<style scoped="scoped">
#online-shop-charts {
  width: 100%;
  height: 355px;
}

.user-tag-chart-box {
  height: 300px;
  width: 100%;
  overflow: auto;
}

.user-tag-chart {
  height: 100%;
  width: 100%;
}

.rankmain {
  margin-bottom: 24px;
}

.online-shop {
  width: 100%;
  height: 408px;
  background: #fff;
  box-shadow: 5px 5px 3px -5px #909090;
  border-radius: 8px;
}

.mark {
  width: 100%;
  height: 358px;
  background: #fff;
  box-shadow: 5px 5px 3px -5px #909090;
  border-radius: 8px;
}

.online-shop .title,
.mark .title {
  padding: 16px 0 16px 24px;
  font-size: 15px;
  color: #464c5b;
}

.basic-barb-charts,
.basic-sumption-charts {
  width: 100%;
  height: 100%;
}

.basic-barb-charts .title,
.basic-sumption-charts .title,
.basic-Marriage-charts .title {
  font-size: 15px;
  color: #464c5b;
  padding-left: 24px;
}
.main-top {
  display: block;
  margin-bottom: 0;
}
.main-top::before {
  display: block;
  content: '';
}
.main-top::after {
  display: block;
  content: '';
  clear: both;
}
.main-top * {
  box-sizing: border-box;
}

.tab {
  padding: 16px 0 16px 0;
  position: relative;
  float: left;
  width: calc(50% - 12px);
  min-height: 240px;
  margin-bottom: 24px;
}
.tab:nth-child(1) {
   margin-right: 24px;
}
.tab:nth-child(3) {
  margin-right: 0;
}
.tab:nth-child(4) {
  margin-left: 24px;
}
.tab-title {
  position: absolute;
  top: 16px;
  font-size: 15px;
  color: #464c5b;
  padding-left: 24px;
  width: 100%;
}
.p-sex-nums {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -ms-flex-line-pack: center;
  align-content: center;
  line-height: 1.35;
  margin: 30px 0 18px;
  /* min-height: 100px; */
}

.tab-box {
  display: block;
}

.tab-box::before {
  display: block;
  content: '';
}
.tab-box::after {
  display: block;
  content: '';
  clear: both;
}

.rankmain * {
  box-sizing: border-box;
}

</style>
<style>
.p-sex-nums .iconfont {
  font-size: 42px;
  line-height: 1;
}

.sex-male {
  width: 50%;
  color: #01aef0;
  text-align: center;
  font-size: 16px;
}
.sex-male .icon {
  fill: #01aef0;
  height: 40px;
}

.sex-female .icon {
  fill: #7f7fff;
  height: 40px;
}

.sex-female {
  width: 50%;
  color: #7f7fff;
  text-align: center;
  font-size: 16px;
}
.chartCircleSpan {
  content: '';
  display:inline-block;
  border-radius: 100%;
  line-height: 1;
  over-flow:hidden;
  height: 10px;
  width: 10px;
  vertical-align: middle;
  margin-right: 5px;
}
.vsLabel {padding: 7px 10px;
    color: #fff;
    float: right;
    margin: -6px 20px 0 0;
    position: absolute;
    right: 0;
    text-align: center;
    padding-left: 20px;
}
</style>
