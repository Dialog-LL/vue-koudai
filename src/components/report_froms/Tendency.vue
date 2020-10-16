<template>
	<div class="tendency">
		<div v-if="!bills" class="tendency-null">
			<van-icon name="description" class="from-icon" />
			<p class="text" >报表空空的</p>
			<p class="next">快去添加新的记录吧~</p>
		</div>

		<div class="model" v-show="bills">
			<div style="background: #5ac5ab">收入</div><div>支出</div>
		</div>

		<div v-show="bills" class="tendency" ref="tendency">

		</div>
	</div>

</template>

<script>
	export default {
		props:['bills','monthIncome','monthExpend'],
		data:()=>({
			month:new Date().getMonth()+1,

		}),
		methods:{
			tendency(){
				let timeData=[]
				let dataTendencyEx=[]
				let dataTendencyIn=[]

				const echarts = require('echarts/lib/echarts');
				require('echarts/lib/chart/line');
				require('echarts/lib/component/title');
				for(let i=1; i<=this.month;i++){
					timeData.push(i+'月')
					if(i===this.month){
						dataTendencyEx.push(Number(this.monthExpend))
						dataTendencyIn.push(Number(this.monthIncome))
					}else{
						dataTendencyEx.push(0)
						dataTendencyIn.push(0)
					}
				}
				this.$nextTick(()=>{
					const tendency = echarts.init(this.$refs.tendency);
					window.addEventListener("resize", () => { tendency.resize()});
					tendency.setOption({
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
								data: []
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
								name: '收入',
								type: 'line',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'top'
									}
								},
								areaStyle: {},
								data: dataTendencyIn
							},
							{
								name: '支出',
								type: 'line',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'top'
									}
								},
								areaStyle: {},
								data: dataTendencyEx
							}
						],
						color:['#59c5ab','#5b80d9']
					});
				})
			}
		},
		watch:{
			bills:function(){
				this.tendency()
			}
		},
		mounted() {
			this.tendency()
		}
	}
</script>

<style lang="scss" scoped>

	$scale:0.1333;

	.tendency-null{
		position: relative;
		height: 50vh;

		.from-icon{
			position: absolute;
			left: 50%;
			margin-left: -$scale*40vw;
			top: 56%;
			color: #4e67d9;
			font-size: $scale*80vw;
		}

		p{
			font-size: $scale*22vw;
			position: absolute;
			left: 50%;
		}

		.text{
			top: 85%;
			margin-left: -$scale*55vw;
		}

		.next{
			top: 94%;
			color: #4e67d9;
			margin-left: -$scale*100vw;
		}
	}

	.tendency{
		width: 100vw;
		height: $scale*300vw;
	}

	.model{
		display: flex;
		justify-content: center;

		div{
			width: $scale*80vw;
			height: $scale*30vw;
			margin:$scale*50vw;
			background: #4d78e3;
			border-radius: $scale*20vw;
			color: white;
			text-align: center;
			line-height: $scale*30vw;
		}
	}

</style>