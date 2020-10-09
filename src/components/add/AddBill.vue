<template>
	<div class="addPage">
		<div class="title-tab">
			<span :class="choose=='income' ? 'light' :''" @click="choose='income'" >收入</span>
			<span :class="choose=='expend' ? 'light' :''" @click="choose='expend'" >支出</span>
			<span :class="choose=='account' ? 'light' :''" @click="choose='account'" >转账</span>
		</div>
	</div>
</template>

<script>
	export default {
		data:()=>({
			choose:'expend',
			pageShow:false
		})
	}
</script>

<style lang="scss" >

	$scale:0.1333;

	.addPage{
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: 100;
		background: white;
	}

	.title-tab{
		width: $scale*260vw;
		margin:$scale*20vw auto;
		color: #4f77e6;
		text-align: center;

		span{
			display: inline-block;
			border:$scale*1vw solid #c9d1d6;
			padding: $scale*10vw $scale*20vw;
		}

		.light{
			background: #4f77e6;
			color: #fff;
		}

		span:first-child{
			border-radius: $scale*10vw 0 0 $scale*10vw;
		}

		span:last-child{
			border-radius:0 $scale*10vw   $scale*10vw 0;
		}
	}
</style>