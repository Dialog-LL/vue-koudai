
<template>
	<div class="install">
		<div class="install-header"><div class="go-back" @click="$emit('goBack')"><van-icon name="arrow-left" class="go-icon"  /><span>更多</span></div><p>设置</p> </div>
		<div class="halving-line"></div>
		<div class="option-list">
			<van-icon name="bar-chart-o" class="halving-icon" />
			<p class="text">账单总结</p>
			<van-icon name="arrow" class="right-arrows"/>
		</div>
		<div class="halving-line"></div>
		<div class="option-list">
			<van-icon name="certificate" class="halving-icon" />
			<p class="text">账号安全与绑定</p>
			<van-icon name="arrow" class="right-arrows"/>
		</div>
		<div class="option-list">
			<van-icon name="other-pay" class="halving-icon" />
			<p class="text">密码锁</p>
			<van-switch v-model="checked" size="24px" class="switch" />
		</div>
		<div class="option-list">
			<van-icon name="sign" class="halving-icon" />
			<p class="text">记账设置</p>
			<van-icon name="arrow" class="right-arrows"/>
		</div>
		<div class="option-list" @click="management=true">
			<van-icon name="down" class="halving-icon" />
			<p class="text">数据管理、导出excel</p>
			<van-icon name="arrow" class="right-arrows"/>
		</div>
		<div class="halving-line"></div>
		<div class="option-list">
			<van-icon name="brush-o" class="halving-icon" />
			<p class="text">清除缓存</p>
			<van-icon name="arrow" class="right-arrows"/>
		</div>
		<div class="option-list" @click="shareShow=true">
			<van-icon name="share-o" class="halving-icon"  />
			<p class="text">分享APP</p>
			<van-icon name="arrow" class="right-arrows"/>
		</div>
		<h1 class="install-bottom">退出登录</h1>

		<!--分享app-->
		<van-share-sheet v-model="shareShow" title="立即分享给好友" :options="options" @select="shareShow=false"/>

		<!--数据管理-->
		<div class="management" v-if="management">
			<div class="install-header"><div class="go-back" @click="management=false"><van-icon name="arrow-left" class="go-icon"  /><span>设置</span></div><p>数据管理</p> </div>
			<div class="halving-line"></div>
			<div class="option-list"  @click="$emit('educeExcel')">
				<van-icon name="down" class="halving-icon" />
				<p class="text">导出Excel</p>
			</div>
			<div class="option-list">
				<van-icon name="back-top" class="halving-icon" />
				<p class="text" @click="clouds">云备份</p>
			</div>
			<div class="halving-line"></div>
			<h1 class="management-bottom" @click="$emit('empty')">永久清除掉所有数据</h1>
		</div>
	</div>
</template>

<script>
	export default {
		data:()=>({
			checked:false,
			management:false,
			shareShow:false,
			options: [
				{ name: '微信', icon: 'wechat' },
				{ name: '微博', icon: 'weibo' },
				{ name: '分享海报', icon: 'poster' },
				{ name: '二维码', icon: 'qrcode' },
			]
		}),
		methods:{
			clouds(){
				//判断当前是否登录
				if(document.cookie){
					console.log('登录了')
				}else{
					this.$router.push("/login");
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	$scale:0.1333;

	.management{
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: #f3f2f7;
		z-index: 101;
	}

	.install{
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: #f3f2f7;
		z-index: 100;


		.install-header{
			position: relative;
			width: 100vw;
			height: $scale*55vw;
			font-size: $scale*20vw;
			line-height: $scale*55vw;
			background: white;

			.go-back{
				position: absolute;
				left: $scale*10vw;
				color: #4e67d9;
			}

			.go-icon{
				font-size: $scale*24vw;
				vertical-align: text-bottom;
			}

			p{
				text-align: center;
			}
		}

		.switch{
			position: absolute;
			right: $scale*20vw;
		}

		.install-bottom{
			width: 100vw;
			height: $scale*55vw;
			font-size: $scale*20vw;
			text-align: center;
			line-height: $scale*55vw;
			background: white;
			margin-top: $scale*50vw;
			color: #4e67d9;
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
	}

	.option-list{
		display: flex;
		align-items: center;
		height: $scale*50vw;
		border-top: $scale*1vw solid #efefef;
		border-bottom: $scale*1vw solid #efefef;
		background: #fff;

		.halving-icon{
			color: #8fa7e3;
			font-size: $scale*30vw;
			margin-left: $scale*10vw;
			margin-right: $scale*20vw;
			vertical-align: middle;

		}
	}

	.management-bottom{
		width: 100vw;
		height: $scale*55vw;
		font-size: $scale*20vw;
		text-align: center;
		line-height: $scale*55vw;
		background: white;
		color: red;
	}



</style>