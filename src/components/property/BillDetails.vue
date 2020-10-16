<template>
	<div class="details">
		<!--账单数据-->
		<div class="top-half" :style="{'background':bgwall}" >
			<div class="account-header">
				<div class="go-back" @click="$emit('goBack')"><van-icon name="arrow-left" class="go-icon"  /><span>资产</span></div>
				<div>{{choosePage}}</div>
				<div class="account-header-right">设置</div>
			</div>
			<div class="account-price">{{amount}}</div>
			<div class="flow" v-if="choosePage=='现金' || choosePage=='银行卡'">
				<div>
					<p class="flow-way" >流入</p>
					<p>{{pageFlowIn}}</p>
				</div>
				<div>
					<p class="flow-way" >流出</p>
					<p>{{pageFlowOut}}</p>
				</div>
			</div>
		</div>
			<!--账单渲染-->
			<div class="bottom-half">
				<div v-show="bills" class="bottom-half-list" >
					<div class="from-list-mess" v-for="item in pageList" :key="item.id" >
						<p><span :class="`iconfont icon-${item['icon'].icon} from-list-icon`" :style="{'color':item['icon'].bgIcon}"></span>{{item['icon'].txt}}</p>
						<span>{{item.price}}</span>
					</div>
				</div>

			</div>
	</div>
</template>

<script>
	export default {
		props:['bills','cashData','bankData','cashFlowIn','cashFlowOut','bankFlowIn','bankFlowOut','choosePage','bgwall'],
		data:()=>({
			pageFlowIn:'',
			pageFlowOut:''
		}),
		computed:{
			pageList(){
				if(this.bills){
					return this.bills.filter(item=>{return item.payWay==this.choosePage})
				}else{
					return []
				}
			},
			amount(){
				if(this.choosePage=='现金'){
					return this.cashData
				}else if(this.choosePage=='银行卡'){
					return this.bankData
				}else{
					return '0.00'
				}
			}
		},
		mounted() {
			if(this.choosePage=='现金'){
				this.pageFlowIn=this.cashFlowIn.toFixed(2)
				this.pageFlowOut=this.cashFlowOut.toFixed(2)
			}else{
				this.pageFlowIn=this.bankFlowIn.toFixed(2)
				this.pageFlowOut=this.bankFlowOut.toFixed(2)
			}
		}
	}
</script>

<style lang="scss" scoped>

	$scale:0.1333;

	.bottom-half{
		height: $scale*320vw;
		overflow: auto;

		.bottom-half-list{
			background: #f7f7f7;
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
				height: $scale*60vw;
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

	.details{
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: #fff;
		z-index: 100;

		.top-half{
			color: #fff;
			font-size: $scale*20vw;

			.account-price{
				text-align: center;
				font-size: $scale*50vw;
				padding: $scale*50vw;
			}
		}

		.flow{
			display: flex;
			justify-content: space-around;
			padding-bottom: $scale*10vw;
			font-size: $scale*24vw;


			.flow-way{
				color:#f7f7f7;
				font-size: $scale*14vw;
			}
		}

		.account-header{
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100vw;
			height: $scale*55vw;
			font-size: $scale*20vw;


			.go-icon{
				font-size: $scale*24vw;
				vertical-align: text-bottom;
			}
		}

		.account-header-right{
			padding-right: $scale*10vw;
		}

	}

</style>