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
        <div class="com-table">
          <div class="title">
            游客常用App排名
            <span class="pro-select">
              <i class="el-icon-search pro-select-search-icon"></i>
              <el-select v-model="bigCate"
                @clear="resetBigCate"
                @change="appsBigCateSelect"
                filterable clearable placeholder="请选择大分类">
                <el-option
                  :key="0"
                  label="全部"
                  :value="0"></el-option>
                <el-option
                  v-for="item in bigCates"
                  :key="item[0]"
                  :label="item[1]"
                  :value="item"
                  :value-key="item[0]">
                </el-option>
              </el-select>
            </span>
            <span class="pro-select">
              <i class="el-icon-search pro-select-search-icon"></i>
              <el-select v-model="smallCate"
                @change="appsSmallCateSelect"
                filterable clearable placeholder="请选择小分类">
                <el-option
                  :key="bigCate[0]"
                  label="全部"
                  :value="bigCate"
                  :value-key="bigCate[0]">
                </el-option>
                <el-option
                  v-for="item in filterSmallCates"
                  :key="item[0]"
                  :label="item[1]"
                  :value="item"
                  :value-key="item[0]">
                </el-option>
              </el-select>
            </span>

          </div>
          <table cellspacing="" cellpadding="">
            <thead>
              <tr>
                <th>排名</th>
                <th>应用名称</th>
                <th style="width:20%;cursor: default;">DAU(万)</th>
                <th @click="changeSort('mau')" style="width:20%;cursor: default;">MAU(万) <i :class="sortIcon('mau')"></i></th>
                <!--<th @click="changeSort('tgi')" style="width:120px;cursor: default;">总体TGI <i :class="sortIcon('tgi')" ></i></th>-->
                <th style="width: 20%;cursor: default;" @click="changeSort('value')">渗透率 <i :class="sortIcon('value')" ></i></th>
              </tr>
            </thead>
            <tbody v-if="apps && apps.length">
              <tr v-for="(item, index) in sortedApps(apps, appOrderBy, appSort)" :key="index">
                <td>{{index + 1}}</td>
                <td>
                  <img :src="item.img" :alt="item.name" class="appimg" />
                  <span class="appname">{{item.name}}</span>
                </td>
                <td>{{formatNumber(item.dau)}}</td>
                <td>{{formatNumber(item.mau)}}</td>
                <!--<td>{{1.0}}</td>-->
                <td>
                  <el-progress :percentage="percent(item.value)"></el-progress>
                </td>
              </tr>
            </tbody>
          </table>
          <el-pagination
            v-if="apps && apps.length"
            layout="prev, pager, next"
            @current-change="jumpPage"
            :total="apps.length">
          </el-pagination>
        </div>
      </div>

      <div class="rankmain" v-if="vsInfo && vsInfo.name">
        <div class="com-table">
          <div class="title">
            <label class="vsLabel labelvs" v-if="vsInfo.name">{{vsInfo.name}}</label> 游客常用APP排名
            <span class="pro-select">
              <i class="el-icon-search pro-select-search-icon"></i>
              <el-select v-model="vsBigCate"
                @clear="resetVsBigCate"
                @change="appsVsBigCateSelect"
                filterable clearable placeholder="请选择大分类">
                <el-option
                  :key="0"
                  label="全部"
                  :value="0"></el-option>
                <el-option
                  v-for="item in bigCates"
                  :key="item[0]"
                  :label="item[1]"
                  :value="item"
                  :value-key="item[0]">
                </el-option>
              </el-select>
            </span>
            <span class="pro-select">
              <i class="el-icon-search pro-select-search-icon"></i>
              <el-select v-model="vsSmallCate"
                @change="appsVsSmallCateSelect"
                filterable clearable placeholder="请选择小分类">
                <el-option
                  :key="vsBigCate[0]"
                  label="全部"
                  :value="vsBigCate"
                  :value-key="vsBigCate[0]">
                </el-option>
                <el-option
                  v-for="item in filterVsSmallCates"
                  :key="item[0]"
                  :label="item[1]"
                  :value="item"
                  :value-key="item[0]">
                </el-option>
              </el-select>
            </span>
          </div>
          <table cellspacing="" cellpadding="">
            <thead>
              <tr>
                <th>排名</th>
                <th>应用名称</th>
                <th style="width:20%;cursor: default;">DAU(万)</th>
                <th @click="changeVsSort('mau')" style="width:20%;cursor: default;">MAU(万) <i :class="sortVsIcon('mau')"></i></th>
                <!--<th @click="changeVsSort('tgi')" style="width:120px;cursor: default;">总体TGI <i :class="sortVsIcon('tgi')" ></i></th>-->
                <th style="width: 20%;cursor: default;" @click="changeVsSort('value')">渗透率 <i :class="sortVsIcon('value')" ></i></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in sortedApps(vsApps, appVsOrderBy, appVsSort)" :key="item.name">
                <td>{{index + 1}}</td>
                <td>
                  <img :src="item.img" :alt="item.name" class="appimg" />
                  <span class="appname">{{item.name}}</span>
                </td>
                <td>{{formatNumber(item.dau)}}</td>
                <td>{{formatNumber(item.mau)}}</td>
                <td>{{1.0}}</td>
                <td>
                  <el-progress :percentage="percent(item.value)"></el-progress>
                </td>
              </tr>
            </tbody>
          </table>
          <el-pagination
            v-if="vsApps && vsApps.length"
            layout="prev, pager, next"
            @current-change="jumpPage"
            :total="vsApps.length">
          </el-pagination>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import qs from 'qs';
import store from 'store';
import numeral from 'numeral';
// import echarts from 'echarts'
import aside from './aside.vue'
import nav from './nav.vue'
export default {
  data() {
    return {
      monthval: '',
      apps: [],
      oApps: [],
      oVsApps: [],
      appOrderBy: 'mau',
      appSort: 'desc',
      appVsOrderBy: 'mau',
      appVsSort: 'desc',
      vsApps: [],
      info: {},
      vsInfo: {},
      currentPage: 1,
      bigCate: {},
      smallCate: {},
      vsBigCate: {},
      vsSmallCate: {},
      bigCates: [],
      smallCates: [],
    }
  },
  computed: {
    filterSmallCates() {
      return this.smallCates[this.bigCate[0]];
    },
    filterVsSmallCates() {
      return this.smallCates[this.vsBigCate[0]];
    }
  },
  methods: {
    sortIcon(orderBy) {
      return this.appOrderBy == orderBy ? (
        this.appSort == 'desc' ? 'el-icon-caret-bottom' : 'el-icon-caret-top'
      ) : 'el-icon-d-caret'
    },
    changeSort(orderBy) {
      if(this.appOrderBy == orderBy) {
        this.appSort = this.appSort == 'desc' ? 'asc' : 'desc';
      } else {
        this.appOrderBy = orderBy;
        this.appSort = 'desc';
      }
    },
    sortVsIcon(orderBy) {
      return this.appVsOrderBy == orderBy ? (
        this.appVsSort == 'desc' ? 'el-icon-caret-bottom' : 'el-icon-caret-top'
      ) : 'el-icon-d-caret'
    },
    changeVsSort(orderBy) {
      if(this.appVsOrderBy == orderBy) {
        this.appVsSort = this.appVsSort == 'desc' ? 'asc' : 'desc';
      } else {
        this.appVsOrderBy = orderBy;
        this.appVsSort = 'desc';
      }
    },
    percent(value) {
      return (value * 100).toFixed(1) * 1;
    },
    jumpPage(page){
      this.currentPage = page;
    },
    sortedApps(apps, orderby, sort){
      let appList = [].concat(apps).sort((x, y) => {
        if(sort === 'asc') {
          return parseFloat(x[orderby]) - parseFloat(y[orderby]);
        } else {
          return parseFloat(y[orderby]) - parseFloat(x[orderby]);
        }
      })

      var pageNumCount = Math.min(10, apps.length); // 一页显示10个
      var curedData = [];
      for (var i = (this.currentPage - 1) * pageNumCount; i < this.currentPage * pageNumCount; i++) {
        curedData.push(appList[i]);
      }
      return curedData;
    },
    formatNumber(value) {
      return numeral(value).format('0,0');
    },
    reRenderMe(data) {
      var self = this;
      let loading = this.$loading();
      self.$http.post(fixurl + '/Persona/appinfo',
      qs.stringify({
        data: JSON.stringify(data)
      })).then(response => {
	        self.info = response.data.info;
	        if(response.data.app_dist){
		        self.oApps = [].concat(response.data.app_dist);
	        		self.apps = response.data.app_dist;
	        }
			if(response.data.cateInfo){
		        self.bigCates = response.data.cateInfo.cate2id
		        self.smallCates = response.data.cateInfo.cate3id
			}
	        loading.close();
      }).catch(error => {
        console.log(error)
        loading.close();
      });
    },
    reRenderVs(data) {
      var self = this;
      let loading = this.$loading();
      self.$http.post(fixurl + '/Persona/appinfo',
      qs.stringify({
        data: JSON.stringify(data)
      })).then(response => {
	        self.oVsApps = response.data.app_dist;
	        self.vsApps = response.data.app_dist;
	        self.vsInfo = response.data.info;
	        loading.close();
      }).catch(error => {
        console.log(error)
        loading.close();
      });
    },
    removeVs() {
      this.vsInfo = {};
    },
    // initCatgories() {
    //   var self = this;
    //   var bigCates = store.get('bigCates');
    //   var smallCates = store.get('smallCates');
    //   if(bigCates && (+new Date() < bigCates.time) && smallCates && (smallCates.time > +new Date())) {
    //     this.bigCates = bigCates.data;
    //     this.smallCates = smallCates.data;
    //   } else {
    //     self.$http.post(fixurl + '/Main/select', qs.stringify({
    //       'data': JSON.stringify({
    //           search: {
    //             scope: 6,
    //             name: ''
    //           }
    //         })
    //     })).then((response) => {
    //       self.bigCates = response.data.filter(item => item.type === '2');
    //       self.smallCates = response.data.filter(item => item.type === '1');
    //       store.set('bigCates', {
    //         time: +new Date() + (3600 * 24 * 1000),
    //         data: self.bigCates
    //       });
    //       store.set('smallCates', {
    //         time: +new Date() + (3600 * 24 * 1000),
    //         data: self.smallCates
    //       })
    //     }).catch(function (error) {
    //       console.log(error);
    //     });
    //   }
    // },
    appsSmallCateSelect(value) {
	      var self = this;
	      if(value.length){
	      	this.apps = [].concat(this.oApps).filter((item) =>{
        			var filterItems = item.Cate3Id.filter(function(element){
        				return value[0] == element;
        			})
        			return filterItems.length > 0;
        		})
	      }else if(value==""){
        		//选择
        		this.apps = [].concat(this.oApps).filter((item) => {
	          var filterItems = item.Cate2Id.filter(function(element) {
	            return self.bigCate[0] == element;
	          });
	          return filterItems.length > 0;
	        })
	      }
//	      this.smallCate = {};
    },
    resetBigCate() {
      this.smallCate = {};
      this.bigCate = {};
    },
    appsBigCateSelect() {
      var self = this;
      if(this.bigCate.length){
        this.apps = [].concat(this.oApps).filter((item) => {
          var filterItems = item.Cate2Id.filter(function(element) {
            return self.bigCate[0] == element;
          });
          return filterItems.length > 0;
        })
      } else {
        this.apps = [].concat(this.oApps);
      }
      this.smallCate = {};
    },
    appsVsSmallCateSelect(value) {
      var self = this;
	      if(value.length){
	      	this.vsApps = [].concat(this.oVsApps).filter((item) =>{
        			var filterItems = item.Cate3Id.filter(function(element){
        				return value[0] == element;
        			})
        			return filterItems.length > 0;
        		})
	      }else if(value==""){
        		//选择
        		this.vsApps = [].concat(this.oVsApps).filter((item) => {
	          var filterItems = item.Cate2Id.filter(function(element) {
	            return self.vsBigCate[0] == element;
	          });
	          return filterItems.length > 0;
	        })
	      }
    },
    resetVsBigCate() {
      this.vsSmallCate = {};
      this.apps = [].concat(this.oApps);
      this.vsBigCate = {};
    },
    appsVsBigCateSelect() {
    	  var self = this;
    	  if(this.vsBigCate.length){
        this.vsApps = [].concat(this.oVsApps).filter((item) => {
          var filterItems = item.Cate2Id.filter(function(element) {
            return self.vsBigCate[0] == element;
          });
          return filterItems.length > 0;
        })
      } else {
        this.vsApps = [].concat(this.oVsApps);
      }
      this.vsSmallCate = {};
      
    }
  },
  created() {
    var self = this;
    const info = store.get('travelInfo');
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
  },
  mounted: function () {

  },
  components: {
    asideLi: aside,
    navTop: nav
  }
}
</script>

<style scoped="scoped">
.com-table {
  width: 100%;
  background: #FFFFFF;
  border-radius: 8px;
}

.com-table .title {
  font-size: 15px;
  color: #333;
  padding-bottom: 14px;
  padding: 16px 0 16px 24px;
}

.com-table thead tr th {
  background: #f4f7fc;
  border: 1px solid #e3e8ee;
  font-size: 12px;
  padding-left: 24px;
  padding-top: 9px;
  padding-bottom: 9px;
  color: #464C5B;
}
.com-table tbody tr:nth-child(even) {
  background: #fbfcfe;
}
.com-table tbody tr td {
  height: 58px;
  padding-left: 24px;
  border-bottom: 1px solid #e3e8ee;
  font-size: 12px;
}

.com-table table {
  width: 100%;
}
.vsLabel {padding: 7px 10px;
    color: #fff;
    float: right;
    margin: -6px 20px 0 0;
    position: absolute;
    right: 0;
    text-align: center;
    padding-left: 20px;}
.el-pagination {
  float: right;
  padding: 8px 14px;
}
.appimg, .appname {
  display: inline-block;
  vertical-align: middle;
}
.appimg {
  width: 30px;
  height: 30px;
  border: 1px solid #d7dde4;
  border-radius: 5px;
  margin-right: 20px;
}
.pro-select {
  box-sizing: border-box;
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  border-radius: 20px;
  border: 1px solid rgb(227, 232, 238);
  background: #eff0f2;
  width: 175px;
  position: relative;
  margin-left: 10px;
}
.pro-select:first-child {
  margin-left: 24px;
}
.pro-select-search-icon {
  position: absolute;
  left: 16px;
  top: 8px;
  color: #a7afbb;
}
</style>
<style>
.pro-select .el-select .el-input__inner {
  height: 32px;
  border: 0;
  background: transparent;
  color: #657180;
  padding-left: 26px;
}
</style>
