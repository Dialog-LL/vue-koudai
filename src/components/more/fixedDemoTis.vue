<template>
	<div class="fixed-demo">
		<div class="demo-header"><div class="go-back" @click="$emit('goBack')"><van-icon name="arrow-left" class="go-icon"  /><span>返回</span></div><p>{{demoName}}</p> </div>
		<div class="content">
			<div class="halving-line"></div>
			<div class="option-list">
				<p class="text">记账提醒</p>
				<van-icon name="arrow" class="right-arrows"/>
			</div>
			<div class="halving-line"></div>
			<div class="option-list">
				<p class="text">距离还款天数</p>
				<van-icon name="arrow" class="right-arrows"/>
			</div>
			<div class="option-list">
				<p class="text">距离房租天数</p>
				<van-icon name="arrow" class="right-arrows"/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:['demoName']
	}
</script>

<style lang="scss" scoped>

	$scale:0.1333;

	.fixed-demo{
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: #fff;
		z-index: 100;

		.demo-header{
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
	}

	.content{
		font-size:$scale*20vw ;

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


			.halving-ff{
				color: #bfbebf;
				font-size: $scale*30vw;
				margin-left: $scale*10vw;
				margin-right: $scale*20vw;
				vertical-align: middle;
			}

		}

		.right-arrows{
			position: absolute;
			right: 0;
			margin-right: $scale*20vw;
		}
	}

</style>