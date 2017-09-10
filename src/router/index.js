import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello'
import login from '@/components/login'
import diypage from '@/components/diypage'
// const diypage = resolve => require(['@/components/diypage'], resolve)
import aside from '@/components/aside'
// import index from '@/components/index'
const index = resolve => require(['@/components/index'], resolve)
const passenger = resolve => require(['@/components/passenger'], resolve)
const passengercontrast = resolve => require(['@/components/passengercontrast'], resolve)
const tourist = resolve => require(['@/components/tourist'], resolve)
const touristBasic = resolve => require(['@/components/touristBasic'], resolve)
const tourism = resolve => require(['@/components/tourism'], resolve)
const tourismAnaly = resolve => require(['@/components/tourismAnaly'], resolve)
const visitorflow = resolve => require(['@/components/visitorflow'], resolve)
const visitorflowcontrast = resolve => require(['@/components/visitorflowcontrast'], resolve)
const visitorsource = resolve => require(['@/components/visitorsource'], resolve)
const visitortrail = resolve => require(['@/components/visitortrail'], resolve)
const visitortrailJinucontrast = resolve => require(['@/components/visitortrailJinucontrast'], resolve)
const visitortrailcontrast = resolve => require(['@/components/visitortrailcontrast'], resolve)
const visitorPayHot = resolve => require(['@/components/visitorPayHot'], resolve)
const visitorPayHotcontrast = resolve => require(['@/components/visitorPayHotcontrast'], resolve)
const Industrysight = resolve => require(['@/components/Industrysight'], resolve)
const service = resolve => require(['@/components/service'], resolve)
// import passenger from '@/components/passenger'
// import passengercontrast from '@/components/passengercontrast'
// import tourist from '@/components/tourist'
// import touristBasic from '@/components/touristBasic'
// import tourism from '@/components/tourism'
// import tourismAnaly from '@/components/tourismAnaly'
// import visitorflow from '@/components/visitorflow'
// import visitorflowcontrast from '@/components/visitorflowcontrast'
// import visitorsource from '@/components/visitorsource'
// import visitortrail from '@/components/visitortrail'
// import visitortrailJinucontrast from '@/components/visitortrailJinucontrast'
// import visitortrailcontrast from '@/components/visitortrailcontrast'
// import visitorPayHot from '@/components/visitorPayHot'
// import visitorPayHotcontrast from '@/components/visitorPayHotcontrast'
// import Industrysight from '@/components/Industrysight'
// import service from '@/components/service'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: '首页',
    component: Hello
  },
  {
    path: '/login',
    name: '登录',
    component: login
  },
  {
    path: '/diypage',
    name: '个性化定制主页',
    component: diypage
  },
  {
    path: '/aside',
    name: '主页内容',
    component: aside,
    children: [
    {
    	  path: '/service',
    	  name: 'service',
    	  component: service
    },
    {
    	  path: '/index',
    	  name: '主页',
    	  component: index
    },
    //游客流量
    {
    	  path: '/passenger',
    	  name: '游客流量-景区',
    	  component: passenger
    },
    {
    	  path: '/passengercontrast',
    	  name: '游客流量-景区对比',
    	  component: passengercontrast
    },
    {
    	  path: '/visitorflow',
    	  name: '游客流量-景域',
    	  component: visitorflow
    },
    {
    	  path: '/visitorflowcontrast',
    	  name: '游客流量-景域对比',
    	  component: visitorflowcontrast
    },
    //游客来源分析
    {
      path: '/visitorsource',
      name: '游客来源分析-无景区域',
      component: visitorsource
    },
    //旅游轨迹分析
    {
      path: '/visitortrail',
      name: '游客轨迹分析-景域',
      component: visitortrail
    },
    {
      path: '/visitortrailJinucontrast',
      name: '游客轨迹分析-景域对比',
      component: visitortrailJinucontrast
    },
    {
      path: '/visitortrailcontrast',
      name: '游客轨迹分析-景区对比',
      component: visitortrailcontrast
    },
    //游客支付热力图
    {
      path: '/visitorPayHot',
      name: '游客支付热力图-景域',
      component: visitorPayHot
    },
    {
      path: '/visitorPayHotcontrast',
      name: '游客支付热力图-景区对比',
      component: visitorPayHotcontrast
    },
    //游客画像
    {
      path: '/touristBasic',
      name: '游客画像-基本属性',
      component: touristBasic
    },
    {
      path: '/tourist',
      name: '游客画像-游客常用App',
      component: tourist
    },
    {
      path: '/tourism',
      name: '在线旅游-整体旅游市场',
      component: tourism
    },
    {
      path: '/tourismAnaly',
      name: '在线旅游-区域在线旅游分析',
      component: tourismAnaly
    },
    {
      path: 'service',
      name:'定制服务',
      component: service
    },
    {
      path: '/Industrysight',
      name: '行业洞察',
      component: Industrysight
    }]
  }]
})
