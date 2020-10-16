<template>
	<div>
		<div v-if="!bills" class="classify-null">
			<van-icon name="description" class="from-icon" />
			<p class="text" >报表空空的</p>
			<p class="next">快去添加新的记录吧~</p>
		</div>
		<div v-if="bills" class="classify">
			<p class="default">默认账本</p>
			<div class="from-box">
				<div class="from" ref="expendFrom"></div>
				<div class="toggle-price" @click="toggleFrom" >
					<p>{{currentText}}<br>{{itemPrice}}<br> <van-icon name="exchange" /></p>
				</div>
			</div>
				<ul class="from-list">
					<li v-show="classifyExpend">
						<div class="from-list-mess" v-for="item in classifyExpend" :key="item.id" >
							<p><span :class="`iconfont icon-${item['icon'].icon} from-list-icon`" :style="{'color':item['icon'].bgIcon}"></span>{{item['icon'].txt}}</p>
							<span class="percent">{{item['percent']}}</span><span>{{item['value']}}</span>
						</div>
					</li>

				</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props:['bills','monthIncome','monthExpend'],
		data:()=>({
			totalExpend:[],
			itemPrice:0.00,
			currentText:"总支出",
			filterList:'AddExpend'
		}),
		methods:{
			monitor(){
				if(this.bills){
					this.totalExpend=this.bills.filter(item=>item.choose == this.filterList)
					this.$nextTick(()=>{
						const echarts = require('echarts/lib/echarts');
						require('echarts/lib/chart/pie');
						const expendChart = echarts.init(this.$refs.expendFrom);
						window.addEventListener("resize", () => { expendChart.resize()})
						if(this.totalExpend.length>0){

							this.itemPrice= this.filterList == 'AddExpend' ? Number(this.monthExpend) : Number(this.monthIncome)
							/*支出数据  支出的类目数据  对应类目颜色数据 */
							let expendData=[]
							let exValueData=[]
							let exColorData=[]
							this.totalExpend.forEach(item=>{
								exValueData.push(item.icon.txt)
								exColorData.push(item.icon.bgIcon)
								expendData.push({
									value:item.price,
								})
							})
							this.itemPrice=this.itemPrice.toFixed(2)
							expendChart.setOption({

								legend: {
									orient: 'vertical',
									left: 30,
									top:30,
									data: exValueData
								},
								color:exColorData,
								series: [
									{
										name: '访问来源',
										type: 'pie',
										radius: ['40%', '60%'],
										avoidLabelOverlap: false,
										label: {
											show: false,
											position: 'center'
										},
										emphasis: {
											label: {
												show: true,
												fontSize: '26',
												fontWeight: 'bold'
											}
										},
										labelLine: {
											show: false
										},
										data: expendData
									}
								]
							});

						}else{
							this.itemPrice='0.00'
							expendChart.setOption({
								legend: {
									orient: 'vertical',
									left: 30,
									top:30,
									data: ['无']
								},
								color:['#e6e6e6'],
								series: [
									{
										name: '访问来源',
										type: 'pie',
										radius: ['40%', '60%'],
										avoidLabelOverlap: false,
										label: {
											show: false,
											position: 'center'
										},
										emphasis: {
											label: {
												show: true,
												fontSize: '26',
												fontWeight: 'bold'
											}
										},
										labelLine: {
											show: false
										},
										data: [{
											value:100
										}]
									}
								]
							});
						}

					})
				}

			},
			toggleFrom(){
				this.currentText=this.currentText == '总支出' ? '总收入' : '总支出'
				this.filterList=this.filterList == 'AddExpend' ? 'AddIncome' : 'AddExpend'
				this.monitor()
			}
		},
		computed:{
			classifyExpend(){
				if(this.totalExpend.length>0){
					let removeDup={}
						/*去重 集合*/
						for(let i=0;i<this.totalExpend.length; i++){
							if(!removeDup[this.totalExpend[i].icon.txt]){
								removeDup[this.totalExpend[i].icon.txt]={
									'value':Number(this.totalExpend[i].price).toFixed(2),
									'icon':this.totalExpend[i].icon,
									'percent':(Number(this.totalExpend[i].price)*100/Number(this.itemPrice)).toFixed(1)+'%'
								}
							}else{
								removeDup[this.totalExpend[i].icon.txt]['value']=Number(removeDup[this.totalExpend[i].icon.txt]['value'])
								removeDup[this.totalExpend[i].icon.txt]['value'] += Number(this.totalExpend[i].price)
								removeDup[this.totalExpend[i].icon.txt]['value']= removeDup[this.totalExpend[i].icon.txt]['value'].toFixed(2)
							}
						}

					return removeDup
				}else{
					return []
				}
			}
		},
		watch:{
			bills:function(){
				this.monitor()
			}
		},
		mounted() {
			this.monitor()
		}

	}
</script>

<style lang="scss" scoped>
	$scale:0.1333;

	.classify-null{
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

	.classify{
		width: 100vw;
		position: relative;

		.default{
			position: absolute;
			left: 50%;
			margin-left: -$scale*28vw;
			top:4%;
			color: #a7a7a7;
			font-size: $scale*14vw;
			text-align: center;
		}

		.from{

			width: 100vw;
			height: 36vh;
		}

	}

	.from-box{
		position: relative;
	}

	.toggle-price{
		display: table;
		width: $scale*100vw;
		height: $scale*100vw;
		position: absolute;
		top: 52%;
		margin-top: -$scale*50vw;
		left: 50%;
		margin-left: -$scale*50vw;
		text-align: center;
		z-index: 100;

		p{
			display: table-cell;
			vertical-align: middle;
			line-height: $scale*26vw;
			font-size: $scale*20vw;
		}

	}

	.from-list{
		height: $scale*320vw;
		overflow: auto;

		li{

			height: $scale*60vw;
			line-height: $scale*60vw;
			font-size: $scale*16vw;
			padding:0 $scale*20vw 0 $scale*20vw;

			p{
				width: $scale*130vw;

			}

			.from-list-icon{
				display: inline-block;
				font-size: $scale*40vw;
				margin-right:$scale*20vw ;
				vertical-align: middle;
			}

			.from-list-mess{
				display: flex;
				justify-content: space-between;
				border-top: $scale*1vw solid #efefef;
				border-bottom: $scale*1vw solid #efefef;
			}
		}

		.percent{
			width: $scale*60vw;
			text-align: center;
		}
	}
</style>