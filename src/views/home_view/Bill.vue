<template>
	<div>
		<div class="head">
			<span class="iconfont both-ends" @click="remind" >&#xe627;</span>
			<div class="selector">默认账本<span class="iconfont selector-icon" >&#xe61e;</span></div>
			<span class="iconfont both-ends" >&#xe685;</span>
		</div>
		<div class="line"></div>
		<div class="compute">
			<div>
				<p>{{currentDate}}月收入</p>
				<p>{{monthIncome}}</p>
			</div>
			<div class="budget">
				<p class="month-budget">月预算</p>
				<p>{{budget}}</p>
			</div>
			<div>
				<p>{{currentDate}}月支出</p>
				<p>{{monthExpend}}</p>
			</div>
		</div>
		<div class="line"></div>
		<div class="today">今日<span></span></div>
	</div>
</template>

<script>
	export default {
		data:() =>({
			monthIncome:0.00,
			monthExpend:0.00,
			budget:3000.00,
		}),
		computed:{
			currentDate(){
				let data= new Date()
				let month=data.getMonth()+1
				return month
			}
		},
		methods:{
			remind(){
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

	.head{
		display: flex;
		justify-content:space-between;

		.both-ends{
			padding: $scale*10vw;
			font-size:$scale*28vw ;

		}

		.selector{
			position: relative;
			border:$scale*1vw solid #aeaeae;
			border-radius: $scale*20vw;
			font-size:$scale*20vw ;
			width: $scale*120vw;
			height: $scale*40vw;
			margin-top: $scale*10vw;
			padding-left: $scale*10vw;
			color: #706e6f;
			line-height: $scale*40vw ;

			.selector-icon{
				position: absolute;
				right:- $scale*10vw ;
				font-size:$scale*30vw ;
				color: #acacac;
			}
		}
	}

	.line{
		width: 0;
		height: $scale*80vh;
		border-left:$scale*1vw solid #aeaeae;
		transform: translateX(50vw);
	}

	.compute{
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-size: $scale*20vw;

		p{
			margin-bottom: $scale*5vw;
		}

		.budget{
			width: $scale*100vw;
			height: $scale*100vw;
			margin-left:$scale*100vw ;
			margin-right:$scale*100vw ;
			border-radius: 50%;
			color: #fff;
			background: #4f77e6;

			.month-budget{
				margin-top: $scale*30vw;
			}

		}
	}

	.today{
		width: $scale*50vw;
		height: $scale*50vw;
		color: #fff;
		font-size: $scale*20vw;
		background: #d3cfd0;
		border-radius: 50%;
		text-align: center;
		line-height:$scale*50vw ;
		transform: translateX(46.675vw);
	}
</style>