<template>
	<div class="report-from">
		<div class="from-nav">
			<span @click="chooseFrom='Classify'" :style="{'color': chooseFrom == 'Classify' ? '#4e78e4' : ''}" >分类</span>
			<span @click="chooseFrom='Tendency'" :style="{'color': chooseFrom == 'Tendency' ? '#4e78e4' : ''}" >趋势</span>
		</div>
		<p class="month">{{currentYear}}年</p>
		<keep-alive>
			<components :is="chooseFrom" :bills="bills" :monthExpend="monthExpend" :monthIncome="monthIncome" ></components>
		</keep-alive>

	</div>
</template>

<script>

	import Classify from '../../components/report_froms/Classify'
	import Tendency from '../../components/report_froms/Tendency'

	export default {
		props:['bills','monthIncome','monthExpend'],
		data:()=>({
			chooseFrom:'Classify',
			currentYear:new Date().getFullYear()
		}),
		components:{
			Classify,
			Tendency
		},
		methods:{

		}
	}
</script>

<style lang="scss" scoped>

	$scale:0.1333;

	.report-from{

		.from-nav{
			display: flex;
			justify-content: center;
			align-items: center;
			height: $scale*55vw;
			font-size: $scale*20vw;

			span{
				margin-right: $scale*10vw;
				margin-left: $scale*10vw;

			}
		}

		.month{
			height: $scale*40vw;
			text-align: center;
			line-height: $scale*40vw;
			color: #4c4a4b;
			background: #f7f7f7;
			opacity: .5;

		}
	}

</style>