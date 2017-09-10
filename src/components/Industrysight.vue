<template>
  <div>
    <div class="main-content">
      <nav class="nav-top">
        <div class="title">行业洞察</div>
      </nav>

      <div class="main-top">
        <div class="sight">
          <div class="title">行业洞察
            <div @click="next()">
              <span class="refresh icon"></span>
            </div>
          </div>
          <div class="sightCont">
            <div class="sight-article">
              <ul>
                <li v-for="item in newsList" :key="item.title">
                  <a v-bind:href="item.resource" target="_blank">
                    <h3>{{item.title}}
                      <span>{{item.time}}</span>
                    </h3>
                    <p>{{item.brief}}</p>
                  </a>
                </li>
              </ul>
            </div>

            <div class="sight-slider">
              <el-carousel :interval="5000" arrow="always">
                <el-carousel-item v-for="item in newsSlick" :key="item.title">
                  <a v-bind:href="item.resource" class="slickNewsItem">
                    <img :src="picurl + item.icon" />
                    <div class="newsTitle">{{item.title}}</div>
                  </a>
                </el-carousel-item>
              </el-carousel>
              <ul>
                <li>
                  <img v-bind:src="picurl + imgUrl1.icon" :alt="imgUrl1.title" />
                  <div class="owh">
                    <div v-for="val in minNewsList[0]" :key="val.author"><a v-bind:href="val.resource">{{val.title}}</a></div>
                    <!-- <div>敦煌莫高窟7月起开售应急参观门票</div>
                    <div>北京新机场航站楼钢结构封顶 2019年通航</div>
                    <div>故宫博物院：挥别92年纸质门票</div> -->
                  </div>
                </li>
                <li>
                  <img :src="picurl + imgUrl2.icon" :alt="imgUrl2.title" />
                  <div class="owh">
                    <div v-for="val in minNewsList[1]" :key="val.author">{{val.title}}</div>
                    <!-- <div>敦煌莫高窟7月起开售应急参观门票</div>
                    <div>近日，河北省旅游委印发《关于开展旅游安全四大专项行....</div>
                    <div>敦煌莫高窟7月起开售应急参观门票</div> -->
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="rankmain">
        <div class="rankmain-report">
          <div class="title">行业研究报告
            <span class="fr">
              <a class="swiperPrev">
                <</a>
                  <a class="swiperNext">></a>
            </span>
          </div>
          <div class="report-slider">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in reports">
                  <div class="img">
                    <img v-bind:src="picurl+item.icon" alt="" />
                  </div>
                  <div class="owh" :title="item.title">
                    <h3>{{item.title}}</h3>
                    <p>摘要:{{item.brief}}</p>
                    <span>{{item.time}}</span>
                  </div>
                  <button>
                    <a v-bind:href="picurl+item.resource" target="_Blank">下载</a>
                  </button>
                </div>
              </div>
              <div class="scrollbar swiper-scrollbar"></div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
import Swiper from '../../static/assets/js/swiper.min.js';
export default {
  data() {
    return {
      news: [],
      reports: [],
      page: 1,
      pageSize: 5,
      pageStart: 0,
      totalPage: null,
      total: 50,
      picurl: "http://114.215.19.11:20009",
      imgUrl1: '',
      imgUrl2: ''
    }
  },
  computed: {
    newsSlick() {
      return this.news.slice(0, 4);
    },
    newsList() {
      return this.news.slice(4, 10);
    },
    minNewsList() {
      var a = [this.news.slice(4, 7), this.news.slice(7, 10)];
      var imgUrl11 = a[0][0] || {icon:1, title: 1};
      var imgUrl22 = a[1][0] || {icon:1,title: 2};
      this.imgUrl1 = imgUrl11;
      this.imgUrl2 = imgUrl22;
      return [this.news.slice(4, 7), this.news.slice(7, 10)];
    },
  },
  created() {
    this.getData();
  },
  methods: {
    initSwiper() {
      new Swiper('.swiper-container', {
        scrollbar: '.scrollbar',
        scrollbarHide: false,
        freeMode: true,
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30,
        nextButton: '.swiperPrev',
        prevButton: '.swiperNext'
      });
    },
    getData() {
      var self = this;
      self.$http.post(fixurl + '/Industry/overview', qs.stringify({
        data: JSON.stringify({
          'news': {
            'offset': 0,
            'rows': self.pageSize
          },
          'report': {
            'offset': 0,
            'rows': 4
          }
        })
      })).then(function (response) {
        self.news = response.data.news;
        self.reports = response.data.report;
        self.$nextTick(function () {
          self.initSwiper();
        })
      }).catch(function (error) {
        console.log(error);
      });
    },
    next() {
      var self = this;
      self.$http.post(fixurl + '/Industry/overview', qs.stringify({
        data: JSON.stringify({
          'news': {
            'offset': (self.page) * self.pageSize,
            'rows': self.pageSize
          }
        })
      })).then(function (response) {
        self.news = response.data.news;
        self.page += 1;
      }).catch(function (error) {
        console.log(error);
      });
    }
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
  z-index: 250;
}

.slickNewsItem {
  position: relative;
  display: block;
  height: 100%;
}

.slickNewsItem img {
  max-height: 100%;
  max-width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 1;
}
.slickNewsItem .newsTitle {
  position: absolute;
  z-index: 2;
  bottom: 24px;
  left: 16px;
  border: 0;
  background: rgba(86,102,109,0.9);
  color: #fff;
}

.sight {
  background: #FFFFFF;
  width: 100%;
  border-radius: 8px;
}

.sight .title {
  font-size: 15px;
  color: #464c5b;
  padding-left: 24px;
  padding-top: 17.5px;
  padding-bottom: 17.5px;
  border-bottom: 1px solid #E3E8EE;
}

.sight .title div {
  float: right;
  margin-right: 24px;
  width: 40px;
  height: 20px;
  border: 1px solid #E3E8EE;
  padding-left: 20px;
}

.sight ul li h3 {
  color: #464C5B;
  font-size: 15px;
  margin-bottom: 15px;
  font-weight: bold;
}

.sight ul li h3 span {
  float: right;
  font-size: 12px;
  color: #657180;
  line-height: 28px;
  font-weight: normal;
}

.sight ul li p {
  font-size: 12px;
  color: #657180;
}

.sight-article ul li {
  padding: 15px 0;
  margin-left: 24px;
  margin-right: 30px;
  border-bottom: 1px solid #E3E8EE;
}

.sight ul li:last-child {
  border-bottom: none;
}

.sight-slider ul li {
  overflow: hidden;
  margin: 15px 0;
}

.sight-slider ul li img {
  float: left;
  width: 177.5px;
  margin-right: 24px;
}

.sight-slider ul li .owh div {
  height: 32px;
  font-size: 12px;
  color: #464c5b;
}

.sightCont {
  display: flex;
}

.sight-slider {
  width: 50%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.rankmain-report {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.rankmain-report .title {
  font-size: 15px;
  color: #464c5b;
  padding-left: 24px;
  padding-top: 17.5px;
  padding-bottom: 17.5px;
  border-bottom: 1px solid #E3E8EE;
}

.rankmain-report .title span {
  margin-top: -6px;
  margin-right: 24px;
  width: 75px;
  height: 32px;
  border-radius: 8px;
}

.rankmain-report .title span a {
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #FFFFFF;
  border: none;
  color: #0190FE;
  display: inline-block;
  float: left;
  border: 1px solid #d7dde4;
}

.rankmain-report .title span a:nth-child(1) {
  border-right: none;
}

.rankmain-report .title span a:hover {
  background: #0190FE;
  color: #FFFFFF;
}

.swiper-slide {
  height: 230px;
}

.report-slider .swiper-slide .img {
  float: left;
  width: 100px;
  height: 130px;
  margin: 25px 18px 9px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
}

.report-slider .swiper-slide .img img {
  max-height: 100%;
  max-width: 100%;
}

.report-slider .swiper-slide .owh h3 {
  font-size: 14px;
  color: #464C5B;
  margin-top: 24px;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.report-slider .swiper-slide .owh p {
  font-size: 13px;
  line-height: 20px;
  color: #657180;
  height: 42px;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 5px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.report-slider .swiper-slide .owh span {
  font-size: 12px;
  color: #79839e;
}

.report-slider .swiper-slide button {
  display: block;
  height: 32px;
  background: #01aef0;
  border: none;
  font-size: 14px;
  color: #FFFFFF;
  margin-top: 5px;
  border-radius: 8px;
  width: calc(100% - 24px);
  margin-left: 24px;
}

.report-slider .swiper-slide button a {
  display: block;
  height: 32px;
  line-height: 32px;
  color: #fff;
}


/*分页*/

.page-box {
  display: inline-block;
  float: right;
  margin-right: 30px;
  font-size: 14px;
  color: #657180;
  padding-bottom: 20px;
}

.page-box span {
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;
  padding: 0 5px;
  text-align: center;
}

.page-box span.none {
  cursor: not-allowed;
}

.page-box span.active {
  background-color: #01aef0;
  color: #fff;
}

.refresh.icon {
  color: #01aef0;
  position: absolute;
  margin-left: 4px;
  margin-top: 3px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border-top: solid 1px currentColor;
  border-bottom: solid 1px currentColor;
  border-left: solid 1px transparent;
  border-right: solid 1px currentColor;
  cursor: pointer;
}

.refresh.icon:before {
  content: '';
  position: absolute;
  left: 1px;
  top: 10px;
  width: 3px;
  height: 3px;
  border-top: solid 1px currentColor;
  border-left: solid 1px currentColor;
  -webkit-transform: rotate(-22.5deg);
  transform: rotate(-22.5deg);
}

@media screen and (max-width: 1400px) {
  .report-slider .swiper-slide button {
    margin-left: 17px !important;
  }
}
</style>
