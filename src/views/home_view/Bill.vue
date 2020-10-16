<template>
	<div class="bill-page" >
			<div v-show="budgetShow" class="set-budget">
				<input type="text" class="budget" v-model="budget" @focus="keywordShow = true" ref="monBudget" >
				<van-number-keyboard v-model="budget" :show="keywordShow" extra-key="." :maxlength="10" close-button-text="完成" @close="budgetShow=false  "  @blur="keywordShow = false" />
			</div>
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
			<div class="budget" :style="{'background': budgets[0] == '-'?'#c72e2e':'#4e78e4'}" @click="openBudget" >
				<p class="month-budget">月预算</p>
				<p>{{budgets}}</p>
			</div>
			<div>
				<p>{{currentDate}}月支出</p>
				<p>{{monthExpend}}</p>
			</div>
		</div>
		<div class="alex">
			<div class="line"></div>
			<div class="today">今日<span></span></div>
			<div class="addAlex" v-if="bills">
				<div  class="ondeAlex" v-for="item in bills" :key="item.id" >
						<div class="line bill-line"  ></div>
					<!--icon-->
					<div class="iconfont icon" :class="`icon-${item.icon.icon}`" :style="{'color':item.icon.bgIcon}" @click.self="$emit('toggleAnimate',item)" >
						<!--花费-->
						<p v-if="item.price && item.choose=='AddExpend'" class="expend-price" >{{item.icon.txt}} {{item.price}} <span v-if="item.remark!='无'" class="ex-remark">{{item.remark}}</span> </p>
						<p v-if="item.price && item.choose=='AddIncome'" class="income-price" > {{item.price}} {{item.icon.txt}} <span v-if="item.remark!='无'" class="in-remark">{{item.remark}}</span> </p>
						<img :src="item.img" alt="" v-if="item.img && item.choose== 'AddExpend'" class="expendImg" >
						<img :src="item.img" alt="" v-if="item.img && item.choose== 'AddIncome'" class="incomeImg" >
						<transition name="remove">
							<span class="remove" v-show="item.toggle" @click="$emit('removeBill',item.id)"> - </span>
						</transition>
						<transition name="writer">
							<span class="writer iconfont icon-bi" v-show="item.toggle" @click="$emit('addBill',item)">  </span>
						</transition>

					</div>
				</div>
			</div>
			<div class="ondeAlex" style="padding-bottom: 55px">
				<div class="line bill-line"  ></div>
				<!--icon-->
				<div class="iconfont icon icon-xiaolian-" ></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:['bills','monthExpend','monthIncome'],
		data:() =>({
			budget:'3000.00',
			budgetShow:false,
			keywordShow:true
		}),
		computed:{
			currentDate(){
				let data= new Date()
				let month=data.getMonth()+1;
				return month
			},
			budgets(){
				if(this.monthExpend !='0' && this.monthIncome !='0'){
					return (Number(this.budget)-Number(this.monthExpend)).toFixed(2)
				}else{
					return this.budget
				}
			}

		},
		methods:{
			//提醒
			remind(){
				//判断当前是否登录
				if(document.cookie){
					console.log('登录了')
				}else{
					this.$router.push("/login");
				}
			},
			openBudget(){
				this.budgetShow=true
				this.$nextTick(()=>this.$refs.monBudget.focus())
			}

		}
	}
</script>

<style lang="scss" scoped>

	$scale:0.1333;

	.set-budget{
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: #fff;
		z-index: 100;

		.budget{
			width: 100vw;
			border: 0;
			outline: none;
		}


	}

	.bill-page{
		width: 100vw;
		height: 100vh;
		overflow: auto;


	}

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

	.icon{
		width: $scale*50vw;
		height: $scale*50vw;
		font-size: $scale*50vw;
		transform: translateX(46.68vw);
		position: relative;
		display: inline-block;
		animation: iconSize 1s linear;

		.remove{
			position: absolute;
			width: $scale*30vw;
			height: $scale*30vw;
			background-color: brown;
			color: white;
			border-radius: 50%;
			font-size: $scale*50vw;
			line-height: $scale*24vw;
			text-align: center;
			top:$scale*10vw;
			left: -$scale*220vw;
			z-index: -1;
		}

		.writer{
			position: absolute;
			top:$scale*10vw;
			left: $scale*240vw;
			width: $scale*30vw;
			height: $scale*30vw;
			background-color: #5093eb;
			color: white;
			border-radius: 50%;
			font-size: $scale*20vw;
			text-align: center;
			line-height: $scale*30vw;
			z-index: -1;
		}
	}



	.addAlex p{
		position: absolute;
		top:50%;
		width: $scale*200vw;
		margin-top: -$scale*8vw;
		color: black;
		font-size: $scale*20vw;
		z-index: -2;

		span{
			position: absolute;
			color:#c5c5c5;
			font-size: $scale*14vw;
			top: $scale*25vw;
		}
		.ex-remark{
			left: 0;
		}

		.in-remark{
			right: 0;
		}

	}

	.expendImg{
		position: absolute;
		width: $scale*40vw;
		height: $scale*40vw;
		right: $scale*70vw;
		top:$scale*10vw;
	}

	.incomeImg{
		position: absolute;
		width: $scale*40vw;
		height: $scale*40vw;
		left: $scale*70vw;
		top:$scale*10vw;
	}

	.income-price{
		text-align: right;
		right: $scale*60vw;
	}

	.expend-price{
		left: $scale*60vw;
	}

	.bill-line{
		animation: lineHeight .5s linear;
	}

	@keyframes lineHeight {
		0%{
			height: 0;
		}
		100%{
			height: $scale*80vh;
		}
	}

	@keyframes iconSize {
		0%{
			opacity: 0;
		}
		100%{
			opacity: 1;
		}
	}




	.remove-enter,
	.remove-leave-to{
		transform: translateX($scale*220vw) rotate(360deg);
	}
	.remove-enter-active{
		transition: all .5s cubic-bezier(0.16,-0.01, 0.48, 1.46);
	}
	.remove-leave-active{
		transition: all .3s cubic-bezier(0, 0, 0, 1.01);
	}
	.remove-enter-to,
	.remove-leave{
		transform: translateX( $scale*0vw) rotate(0deg);
	}

	.writer-enter,
	.writer-leave-to{
		transform: translateX(-$scale*240vw) rotate(0deg);
	}
	.writer-enter-active{
		transition: all .5s cubic-bezier(0.16,-0.01, 0.48, 1.46);
	}
	.writer-leave-active{
		transition: all .3s cubic-bezier(0, 0, 0, 1.01);
	}
	.writer-enter-to,
	.writer-leave{
		transform: translateX( $scale*0vw) rotate(360deg);
	}


</style>