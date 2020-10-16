<template>
	<div class="TendencyChart">
		<div class="TendencyChart-header"><div class="go-back" @click="$emit('goBack')"><van-icon name="arrow-left" class="go-icon"  /><span>返回</span></div><p>资产趋势图</p> </div>
		<div class="halving-line">{{currentYear}}</div>

		<p class="data-analysis">{{describe}}</p>

		<div class="line" ref="line">

		</div>
	</div>
</template>

<script>
	export default {
		props:['bills','tendencyData'],
		data:()=>({
			currentYear:new Date().getFullYear(),
			TendencyChartChoose:'positive',
			timeData:[],
			dataTendency:[],
			month:new Date().getMonth()+1
		}),
		computed:{
			describe(){
				if(Number(this.tendencyData) > 0){
					return '本月总资产上升'
				}else if(Number(this.tendencyData) === 0){
					return  '本月资产与上月持平'
				}else{
					return '本月总资产下降'
				}
			}
		},
		methods:{
			TendencyChart(){

				const echarts = require('echarts/lib/echarts');
				require('echarts/lib/chart/line');
				require('echarts/lib/component/title');
				const TendencyChart = echarts.init(this.$refs.line);
				window.addEventListener("resize", () => { TendencyChart.resize()});
				for(let i=1; i<=this.month;i++){
					this.timeData.push(i+'月')
					if(i===9){
						this.dataTendency.push(Number(this.tendencyData))
					}else{
						this.dataTendency.push(0)
					}
				}
					this.$nextTick(()=>{
							TendencyChart.setOption({
								title: {
									text: '总资产',
									left: '4%'
								},
								toolbox: {
									feature: {
										saveAsImage: {}
									}
								},
								grid: {
									left: '6%',
									right: '8%',
									bottom: '3%',
									containLabel: true
								},
								xAxis: [
									{
										type: 'category',
										boundaryGap: false,
										data: this.timeData
									}
								],
								yAxis: [
									{
										type: 'value',
										axisLine: { //坐标轴
											show: false
										},
										axisTick: {//坐标轴刻度
											show: false
										}
									}
								],
								series: [

									{
										name: '总资产',
										type: 'line',
										stack: '总量',
										label: {
											normal: {
												show: true,
												position: 'top'
											}
										},
										areaStyle: {},
										data: this.dataTendency
									}
								],
								color:['#5b80d9']
							});
					})
			}
		},
		mounted() {
			this.TendencyChart()
		}
	}
</script>

<style lang="scss" scoped>
	$scale:0.1333;

	.TendencyChart{
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: #fff;
		z-index: 100;

		.TendencyChart-header{
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

	.halving-line{
		width: 100vw;
		height: $scale*40vw;
		text-align: center;
		background: #f8f8f8;
		border-top: $scale*1vw solid #efefef;
		border-bottom: $scale*1vw solid #efefef;
		line-height:$scale*40vw ;
		color: #9c9c9c;
	}

	.data-analysis{
		font-size: $scale*14vw;
		color: #ababab;
		margin-top: $scale*50vw;
		margin-bottom: $scale*20vw;
		text-align: center;
	}

	.line{
		width: 100vw;
		height: $scale*300vw;
	}
</style>