<template>
	<div>
		<div class="main-content">
			<nav class="nav-top"><div class="title">定制服务</div></nav>
			<div class="main-top">
				<div class="service-bgtop">
					<div class="service-sketch">
						<div class="title">智慧景区服务体系概述</div>
						<p>Trust Travel 智能分析系统帮助景区，地方政府以及投资机构，针对旅游开发、投资、运营管理及营销规划 <br />
						四个方面提供分析及决策数据支持。并根据景区特点实施营销推广及媒介方案</p>
					</div>
					<div class="service-tabs">
						<ul>
							<li><img :src="servicegp57" alt="景区定制研究" /><h3>景区定制研究</h3><p>通过Trustdata大数据对景区竞品深度分析、指导优化景区规划、提高景区。</p></li>
							<li><img :src="servicegp44" alt="精准营销" /><h3>精准营销</h3><p>准确锁定目标客群，自定义筛选人群兴趣偏好，挖掘线上及线下活跃站点，指导商家识别媒体最佳投放渠道，目标客户精准有效推广。</p></li>
							<li><img :src="servicegp49" alt="集课分享" /><h3>集课分享</h3><p>基于微信公众号流量入口，做到一方面可以来自更多的流量接入，另一方面对接入流量实现更有效的销售措施。</p></li>
							<li><img :src="servicegp54" alt="舆情监测" /><h3>舆情监测</h3><p>全维度舆情分析，帮助景区迅速感知景区舆情，抢先了解网民动态，景区第一时间作出翻译。</p></li>
						</ul>
					</div>
					<div class="service-system">
						<div class="title">智慧景区营销服务体系</div>
						<div class="systembox">
							<div class="lititle">景区营销解决方案</div>
							<div class="systemboxall">
								<div class="systemtab">
									<h3>旅游景区风向标</h3>
									<ul>
										<li><i class="spape3"></i>景区关注指数</li>
										<li><i class="spape3"></i>景区经济指数</li>
									</ul>
								</div>
							
								<div class="systemtab systemtab-green">
									<h3>旅游移动数据营销</h3>
									<ul>
										<li><i class="spape1"></i>智慧景区分析</li>
										<li><i class="spape1"></i>浅客洞察解析</li>
										<li><i class="spape1"></i>定向精准触达</li>
										<li><i class="spape1"></i>意向客户管理</li>
									</ul>
								</div>
								<div class="systemtab systemtab-orange">
									<h3>景区舆情监测及预警</h3>
									<ul>
										<li><i class="spape2"></i>媒体监控及舆情分析</li>
										<li><i class="spape2"></i>竞品营销动态分析</li>
									</ul>
								</div>
							</div>

						</div>
					</div>

				</div>
				<div class="service-watch">
					<div class="title">旅游潜客洞察</div>
					<div class="watch-box">
						<div class="watchboxone">
							<div class="tit">目标人群触媒渠道</div>
							<img :src="watch01" alt="目标人群触媒渠道" />
						</div>
						<div class="watchboxtwo">
							<div class="tit">人群筛选方法</div>
							<img :src="watch02" alt="人群筛选方法" />
						</div>
					</div>
				</div>
				<div class="service-data">
					<div class="title">数据优势</div>
					<div class="cont">TrustTravel依托于Trustdata行业领先的移动大数据采集和挖掘能力，全面和精准地展现景区游客画像</div>
					<div class="databox">
						<div style="position: relative;">
							<i class="icon-data-right"></i>
							<ul>
								<li :class="{active:layout == 'scale' }" @click="layout = 'scale'"><i class="icon-phone"></i>移动样本覆盖规模</li>
								<li :class="{active:layout == 'frequency' }" @click="layout = 'frequency'"><i class="icon-time"></i>数据采集频次</li>
								<li :class="{active:layout == 'validity' }" @click="layout = 'validity'"><i class="icon-write"></i>数据有效性</li>
								<li :class="{active:layout == 'Handle'}" @click="layout = 'Handle'"><i class="icon-data"></i>数据处理能力</li>
								<li :class="{active:layout == 'Security'}" @click="layout = 'Security'"><i class="icon-hold"></i>法律安全性</li>
							</ul>
						</div>

						<div>
							<div class="service-img-tab" :class="{active:layout == 'scale' }"><img v-bind:src="scaleimg" alt="" /></div>
							<div class="service-img-tab" :class="{active:layout == 'frequency' }"><img v-bind:src="frequencyimg" alt="" /></div>
							<div class="service-img-tab" :class="{active:layout == 'validity' }"><img v-bind:src="validityimg" alt="" /></div>
							<div class="service-img-tab" :class="{active:layout == 'Handle'}"><img v-bind:src="Handleimg" alt="" /></div>
							<div class="service-img-tab" :class="{active:layout == 'Security'}"><img v-bind:src="Securityimg" alt="" /></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import qs from 'qs'
import store from 'store'
import aside from './aside.vue'
// import echarts from 'echarts'
import numeral from 'numeral'
import nav from './nav.vue'
export default {
	data() {
		return {
			val:'',
			layout:'scale',
			scaleimg:'/Public/static/assets/image/serverone.png',
			frequencyimg:'/Public/static/assets/image/servertwo.png',
			validityimg:'/Public/static/assets/image/serverthree.png',
			Handleimg:'/Public/static/assets/image/serverfor.png',
			Securityimg:'/Public/static/assets/image/serverfive.png',
			servicegp57:'/Public/static/assets/image/Group 57.png',
			servicegp44:'/Public/static/assets/image/Group 44.png',
			servicegp49:'/Public/static/assets/image/Group 49.png',
			servicegp54:'/Public/static/assets/image/Group 54.png',
			watch01:'/Public/static/assets/image/watch01.png',
			watch02:'/Public/static/assets/image/watch02.png',
		}
	}
}
</script>

<style scoped="scoped">
.nav-top{background:#677a87 url(/Public/static/assets/image/nav-top-bg.png) no-repeat 233px top;background-size:100% 76px;padding:17px 20px;border-left:1px solid #677a87;box-sizing:border-box;height:71px;display:flex;justify-content:space-between;align-items:center;position:fixed;left:0;top:0;padding-left:260px;width:100%;z-index:200}
.main-top{display:inherit;margin-top:0}
.main-content{padding:0;padding-top:71px}
.service-sketch{overflow:hidden;padding-left:57px;padding-top:30px}
.service-sketch .title{font-size:30px;color:#65717e;margin-bottom:20px}
.service-sketch p{font-size:18px;color:#7a8491}
.service-tabs ul{overflow:hidden;background:#0491ff;border-radius:8px;display:flex;width:1116px;margin:0 auto;margin-top:74px}
.service-tabs ul li{width:22%;text-align:center;color:#FFF;padding:0 20px;border-right:1px solid #74c6ff;margin:40px 0}
.service-tabs ul li:last-child{border:none}
.service-tabs ul li h3{font-size:16px;font-weight:600;margin-bottom:12px;margin-top:20px}
.service-tabs ul li p{font-size:12px;color:#fff}
.service-system{margin-top:76px;overflow:hidden;padding-left:57px;padding-top:29px}
.systemboxall{display:flex;width:1116px;margin:0 auto;padding-bottom:39px}
.service-system .title{font-size:30px;color:#65717e}
.systembox .lititle{font-size:25px;background-image:-webkit-gradient(linear,0 0,0 bottom,from(#0285ff),to(#11cfff));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-top:20px;margin-bottom:20px}
.service-system .systemtab{float:left;width:236px;margin-right:124px;text-align:center;box-shadow:0 1px 4px #cac7c7;border-radius:4px}
.systemtab ul{background:#FFF;height:192px;padding-top:32px;border-bottom-left-radius:8px;border-bottom-right-radius:8px}
.systemtab ul li{font-size:18px;margin-bottom:12px;color:#65717e;text-align:left;padding-left:47px}
.systemtab ul li:last-child{margin-bottom:0}
.service-system .systemtab:last-child{margin:0}
.service-system h3{background:#41bbfc;color:#FFF;font-size:22px;border-top-left-radius:4px;border-top-right-radius:4px;padding:6px 0}
.lititle{text-align:center}
.service-watch{background:#f5f7f9;padding-left:57px;padding-top:29px;padding-bottom:40px}
.service-watch .title{font-size:30px;color:#65717e;font-weight:800;margin-bottom:28px}
.watch-box{display:flex;width:1116px;margin:0 auto}
.watch-box .tit{font-size:25px;text-align:center;margin-bottom:14px;background-image:-webkit-gradient(linear,0 0,0 bottom,from(#0285ff),to(#11cfff));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.watchboxone{margin-right:70px}
.watchboxone img{width:442px;height:400px}
.watchboxtwo img{width:578px;height:400px}
.service-bgtop{background-image:url(/Public/static/assets/image/servicebg2.png);background-size:100%}
.service-data{margin-top:30px;padding-left:57px;background-image:url(/Public/static/assets/image/servicebg1.png);background-size:100%}
.service-data .title{font-size:30px;color:#65717e;font-weight:800;margin-bottom:20px}
.service-data .cont{font-size:18px;color:#7a8491;margin-bottom:59px}
.service-data ul{width:337px;background-image:linear-gradient(-135deg,#1e8ffb 0,#5edff9 100%);overflow:hidden;border-radius:8px;float:left;margin-right:90px}
.service-data ul li{width:166px;margin:0 auto;height:45px;line-height:45px;font-size:16px;margin-top:30px;margin-bottom:30px;color:#c3e7fd;cursor:pointer;padding-left:44px;border-radius:4px;font-weight:600}
.service-data ul li.active{background:#fc9626;color:#FFF}
.databox{display:flex;width:1116px;margin:0 auto;padding-bottom:54px}
.service-img-tab.active{display:block}
.service-img-tab{display:none}
.service-img-tab img{width:617px;height:368px}
.icon-phone{background-image:url(/Public/static/assets/image/icon-phone.png);width:21px;height:24px;position:relative;top:6px;right:18px;background-size:100%}
.icon-time{background-image:url(/Public/static/assets/image/icon-time.png);width:21px;height:24px;position:relative;top:6px;right:18px;background-size:100%}
.icon-write{background-image:url(/Public/static/assets/image/icon-data.png);width:21px;height:24px;position:relative;top:6px;right:18px;background-size:100%}
.icon-data{background-image:url(/Public/static/assets/image/icon-write.png);width:21px;height:24px;position:relative;top:6px;right:18px;background-size:100%}
.icon-hold{background-image:url(/Public/static/assets/image/icon-hold.png);width:21px;height:24px;position:relative;top:6px;right:18px;background-size:100%}
.icon-data-right{width:0;height:0;border-top:5px solid transparent;border-left:10px solid #43bdfa;border-bottom:5px solid transparent;position:absolute;right:80px;top:100px}
.spape1{background-image:url(/Public/static/assets/image/Shape@1x.png);width:20px;height:15px;background-size:100%;position:relative;left:-23px}
.spape2{background-image:url(/Public/static/assets/image/Shape@2.png);width:20px;height:15px;background-size:100%;position:relative;left:-23px}
.spape3{background-image:url(/Public/static/assets/image/Shape@3.png);width:20px;height:15px;background-size:100%;position:relative;left:-23px}
.systemtab-green h3{background:#43d342}
.systemtab-orange h3{background:#fc9626}


@media screen and (max-width: 1280px) {
	.main-content{
		min-width: 1000px;
	}
	.service-sketch{
		padding-left: 40px;
    		padding-top: 30px;
	}
	.service-tabs ul{
		width: 800px;
		margin: 0 auto;
		margin-top: 30px;
	}
	.service-tabs ul li{
		width: 20%;
		margin: 20px 0;
	}
	.service-tabs ul li img{
		width: 80%;
	}
	.service-system{
		padding-left: 40px;
		padding-top: 30px;
		margin-top: 30px;
	}
	.systemboxall{
		width: 800px;
	}
	.service-system .systemtab{
		width: 236px;
	}
	.service-system h3{
		font-size: 16px;
	}
	.systemtab ul li{
		padding-left: 25px;
		font-size: 16px;
	}
	.spape3,.spape2,.spape1{
		left: -10px;
	}
	.watchboxone img{
		width: 380px;
		height: 250px;
	}
	.watchboxtwo img{
		width: 380px;
    	height: 250px;
	}
	
	.service-img-tab img{
		width: 60%;
		height: 60%;
	}
	.service-data ul{
		width: 250px;
	}
	.service-data ul li{
		margin-top: 15px;
		margin-bottom: 15px;
	}
}
</style>
