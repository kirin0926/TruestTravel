<template>
  <div class="page-wrapper">
    <aside>
        <div class="logo">
          <router-link to="/index" @click="changePath(path)">
              <img class="fl" src="/Public/static/assets/image/trusttravel.png" alt="trusttravel" />
          </router-link>
        </div>
      <ul class="menu">
        <li v-for="item in list" :key="item.path" :class="{'open': openMenu == item.name, 'menu-li':true }">
          <a v-if="item.path!='null'" @click="changePath(item.path)" :class="{'active':layout == item.path }"><i :class="item.class"></i>{{item.name}}</a>
          <a v-else="item.path=='null'" @click="showToggle(item, $event)" class="hasSubItem"><i :class="item.class"></i>{{item.name}}</a>
          <ul class="meau-list">
            <li v-for="subItem in item.subItems">
              <a @click="changePath(subItem.href, item.path)" :class="{'active':layout == subItem.href }">{{subItem.name}}</a>
            </li>
          </ul>
        </li>
      </ul>
      <div class="aside-bottom">
        <a href="javascript:;">abcdefg@iappease.com.cn</a>
        <a href="/logout">
          <img src="/Public/static/assets/image/shutdown.svg" class="shutdown" />
        </a>
      </div>
    </aside>
    <router-view to="index"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabValue: '',
      layout: 'index',
      list: [
        {
          "name": "主页",
          "isSubShow": true,
          "path": "index",
          "class": "icon-home"
        },
        {
          "name": "客流分析",
          "isSubShow": false,
          "subItems": [{ "name": "游客流量", "href": "passenger" }, { "name": "游客来源分析", "href": "visitorsource" }, { "name": "旅游轨迹分析", "href": "visitortrail" }, { "name": "游客支付热力图", "href": "visitorPayHot" }],
          "path": "null",
          "class": "icon-chart"
        },
        {
          "name": "游客画像",
          "isSubShow": false,
          "subItems": [{ "name": "基本属性", "href": "touristBasic" }, { "name": "游客常用APP", "href": "tourist" }],
          "path": "null",
          "class": "icon-person"
        },
        {
          "name": "在线旅游",
          "isSubShow": false,
          "subItems": [{ "name": "整体旅游市场", "href": "tourism" }, { "name": "区域在线旅游分析", "href": "tourismAnaly" }],
          "path": "null",
          "class": "icon-world"
        },
        {
          "name": "行业洞察",
          "isSubShow": false,
          "path": "Industrysight",
          "class": "icon-par"
        },
        {
          "name": "定制服务",
          "isSubShow": false,
          "path": "service",
          "class": "icon-par"
        }
      ]
    }
  },
  computed: {
    openMenu() {
      if(this.layout=='null') {return ''}
      let currentItem = this.list.filter((item) => item.path == this.layout )[0];
      let openPath = '';
      if(!currentItem){
        this.list.forEach(item => {
          if(item.subItems) {
            item.subItems.forEach(sub => {
              if(this.layout == sub.href) {
                openPath = item.name;
              }
            })
          }
        });
        if(this.layout =='passengercontrast'||this.layout == 'visitorflow'|| this.layout =='visitorflowcontrast'){
          openPath = '客流分析';
          this.layout ='passenger';
        }else if(this.layout =='visitortrailJinucontrast'|| this.layout =='visitortrailcontrast'){
          openPath = '客流分析';
          this.layout ='visitortrail';
        }else if(this.layout =='visitorPayHotcontrast'){
          openPath = '客流分析';
          this.layout ='visitorPayHot';
        }
      } else {
        openPath = currentItem.name;
      }
      return openPath
    }
  },
  created: function () {
    this.layout = this.$route.path.replace('/', '');
  },
  methods: {
    showToggle: function (item, $event){
      if(item.path == 'null') {
        var otherOpen = this.$el.querySelector('.menu-li.open');
        if(otherOpen) {
          otherOpen.classList.remove('open');
          if(!otherOpen.contains($event.currentTarget)) {
            $event.currentTarget.parentNode.classList.toggle('open');
          }
        } else {
          $event.currentTarget.parentNode.classList.toggle('open');
        }
      }
    },
    changePath: function (data, path) {
      this.layout = data;
      this.$router.push({ path: data })
    }
  }
}
</script>

<style scoped="scoped">
aside {
  width: 235px;
   position: fixed;
  /* float: left; */
   top: 0;
  left: 0;
  min-height: 100%;
  height: 100%;
  box-shadow: 5px 0px 5px -5px #909090;
  z-index: 290;
  margin-bottom: -5px;
  background: transparent url(/Public/static/assets/image/sidebar-bg.png) no-repeat;
  background-size: 240px 101%;
}

.menu {
  margin-top: 17px;
  margin-bottom: 48px;
}

.menu li a {
  height: 48px;
  line-height: 48px;
  color: #fff;
  display: block;
  padding-left: 32px;
  font-size: 14px;
  position: relative;
}

.menu li a:hover {
  color: #FFFFFF;
  background: #344752;
}

.menu li a.active {
  color: #FFFFFF;
}
.menu > li > a.active {
  background: linear-gradient(to bottom, #2f414d, #344752);
}

.menu-li ul > li a.active::before {
  content: '';
  display: block;
  border-radius: 100%;
  background: #fff;
  width: 8px;
  height: 8px;
  position: absolute;
  left: 35px;
  top: 50%;
  margin-top: -4px;
}

.meau-list {
  background: #455a67;
  margin-top: 0;
  display: none;
}

.meau-list li a {
  padding-left: 68px;
}

.menu-li.open > a {
  background: linear-gradient(to bottom, #2f414d, #344752);
}

.menu-li.open .meau-list {
  display: block;
}

.menu-li ul {
  background: #455a67;
}

.hasSubItem {
  position: relative;
}
.hasSubItem::after {
  content: '';
  /* display: inline-block; */
  position: absolute;
  right: 1.8em;
  top: 50%;
  height: 6px;
  width: 6px;
  margin-top: -3px;
  border-bottom: 1px solid currentColor;
  border-right: 1px solid currentColor;
  transform: rotate(-45deg);
  transition: transform 0.2s ease;
}
.menu-li.open .hasSubItem::after {
  transform: rotate(45deg);
}

.logo {
  overflow: hidden;
  border-bottom: 1px solid #738591;
  height: 70px;
  line-height: 70px;
}

.logo img {
  height: 40px;
  margin-left: 32px;
  margin-top: 15px;
  margin-right: 8.5px;
}

.logo .owh {
  font-size: 20px;
  color: #01aef0;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgb(1, 174, 240)), to(rgb(19, 133, 217)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.shutdown {
  width: 16px;
  height: 16px;
}

.aside-bottom {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 235px;
  left: 0;
  display: flex;
  justify-content: space-around;
  padding: 24px 12px;
}
.aside-bottom a {
  color: #fff;
  display: inline-block;
  min-width: 24px;
  text-align: center;
  vertical-align: middle;
}
.aside-bottom a:first-child {
  margin-right: 10px;
}

</style>
