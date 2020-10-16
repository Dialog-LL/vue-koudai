<template>
	<div>
		<h1 class="more-header">更多</h1>
		<router-link to="/login" tag="div" class="login">
			<van-icon name="manager" class="profile" />
			<div class="login-right">
				<p class="text">立即登录</p>
				<p class="tip"><van-icon name="warning" class="right-warning"/>登录后可免费备份数据</p>
			</div>
			<van-icon name="arrow" class="right-arrows"/>
		</router-link>
		<router-view />
		<div class="halving-line"></div>
		<div class="option-list" @click="showItem('fixedDemoCommunity','口袋社区') ">
			<span class="iconfont icon-shequ-active halving-icon"></span>
			<p class="text">口袋社区</p>
			<van-icon name="arrow" class="right-arrows"/>
		</div>
		<div class="halving-line"></div>
		<div class="option-list" @click="showItem('Skin')" >
			<span class="iconfont icon-theme halving-icon"></span>
			<p class="text">主题皮肤</p>
			<van-icon name="arrow" class="right-arrows"/>
		</div>
		<div class="option-list" @click="showItem('fixedDemoTis','提醒') ">
			<span class="iconfont icon-xiaoxi halving-icon"></span>
			<p class="text">提醒</p>
			<van-icon name="arrow" class="right-arrows"/>
		</div>
		<div class="halving-line"></div>
		<div class="option-list" @click="showItem('Install')" >
			<span class="iconfont icon-shezhi halving-ff"></span>
			<p class="text">设置</p>
			<van-icon name="arrow" class="right-arrows"/>
		</div>
		<div class="option-list" @click="showItem('FeedBack') ">
			<span class="iconfont icon-fankui halving-ff"></span>
			<p class="text">用户反馈</p>
			<van-icon name="arrow" class="right-arrows"/>
		</div>
		<div class="option-list" @click="showItem('fixedDemoWe','关于我们') ">
			<span class="iconfont icon-guanyuwomen halving-ff"></span>
			<p class="text">关于我们</p>
			<van-icon name="arrow" class="right-arrows"/>
		</div>
		<transition name="levels">
			<components :is="selectItem" v-if="show" @goBack="goBack" @empty="empty" @educeExcel="educeExcel" @bgImg="bgImg" :demoName="demoName" ></components>
		</transition>
	</div>
</template>

<script>


	export default {
		data:()=>({
			selectItem:'Install',
			show:false,
			demoName:''
		}),
		components:{
			Install:()=>import('../../components/more/Install'),
			Skin:()=>import('../../components/more/Skin'),
			FeedBack:()=>import('../../components/more/FeedBack'),
			fixedDemoWe:()=>import('../../components/more/fixedDemoWe'),
			fixedDemoTis:()=>import('../../components/more/fixedDemoTis'),
			fixedDemoCommunity:()=>import('../../components/more/fixedDemoCommunity')
		},
		methods:{
			bgImg(value){
				this.$emit('bgImg',value)
				this.show=false
			},
			showItem(module,name){
				this.selectItem=module
				this.demoName=name
				this.show=true
			},
			goBack(){
				this.show=false
			},
			empty(){
				this.$emit('emptyBill')
			},
			educeExcel(){
				this.$emit('educeExcel')
			}
		}
	}
</script>

<style lang="scss" scoped >
	$scale:0.1333;

	.more-header{
		width: 100vw;
		height: $scale*55vw;
		text-align: center;
		font-size: $scale*20vw;
		line-height: $scale*55vw;
	}


	.login{
		display: flex;
		align-items: center;
		width: 100vw;
		padding: $scale*10vw;
		border-top: $scale*1vw solid #efefef;
		border-bottom: $scale*1vw solid #efefef;

		.profile{
			width: $scale*80vw;
			height: $scale*80vw;
			margin-left:$scale*10vw ;
			margin-right:$scale*10vw ;
			color: #4f77e6;
			font-size: $scale*80vw;
		}

		.login-right{
			color: black;
			line-height: $scale*30vw;

			.tip{
				font-size: $scale*14vw;
				color: #b6b6b6;

				.right-warning{
					color: #4e67d9;
					font-size: $scale*16vw;
					vertical-align: text-bottom;
					margin-right: $scale*2vw;
				}
			}
		}
	}

	.right-arrows{
		position: absolute;
		right: 0;
		margin-right: $scale*20vw;
	}

	.text{
		font-size: $scale*20vw;
	}

	.halving-line{
		width: 100vw;
		height: $scale*30vw;
		background: #ececec;
		opacity: .4;
	}

	.option-list{
		display: flex;
		align-items: center;
		height: $scale*50vw;
		border-top: $scale*1vw solid #efefef;
		border-bottom: $scale*1vw solid #efefef;

		.halving-icon{
			color: #8fa7e3;
			font-size: $scale*30vw;
			margin-left: $scale*10vw;
			margin-right: $scale*20vw;
			vertical-align: middle;

		}

		.halving-ff{
			color: #bfbebf;
			font-size: $scale*30vw;
			margin-left: $scale*10vw;
			margin-right: $scale*20vw;
			vertical-align: middle;
		}


	}

	.levels-enter,
	.levels-leave-to{
		transform: translateX(100%);
	}
	.levels-enter-active,
	.levels-leave-active{
		transition: all .3s ease-out;
	}
	.levels-enter-to,
	.levels-leave{
		transform: translateX(0);
	}

</style>