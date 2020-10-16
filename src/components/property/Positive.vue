<template>
	<ol class="asset-list">
		<li>资产 <van-icon name="arrow-down" @click.self="$emit('toggleShow')" class="pull-down" />
			<span class="asset-price" :style="{'color': property[0] == '-'?'#c72e2e':'#4e78e4'}" >{{property}}</span>
		</li>

		<li v-for="item in List.Positive" :key="item.text" v-show="item.show"  :style="{'background':item.bgColor}" class="account-list" @click="$emit('detailPage',item.text,item.bgColor)" >
			<span :class="`iconfont icon-${item.accountIcon} icon`"></span>
			<p>
				<span :class="item.remark ? 'top' : '' " >{{item.text}}</span>
				<span class="remark" v-if="item.remark">{{item.remark}}</span>
				<span class="asset-price" >{{item.price}}</span>
			</p>
		</li>

		<li @click="$emit('showAdd')" > <van-icon name="plus " class="icon"  /> 添加账户</li>
	</ol>
</template>

<script>
	export default {
		props:['List','billFigure'],
		data:()=>({
		}),
		computed:{
			property(){
				if(this.billFigure){
					let expendFigure =0  /* 收入  支出 */
					let incomeFigure =0
					this.billFigure.filter(item=>{
						if(item.choose !='AddAccount'){

							if(item.choose=='AddExpend'){
								expendFigure += Number(item.price)
							}else {
								incomeFigure += Number(item.price)
							}
						}
					})
					this.$emit('Tendency',(incomeFigure-expendFigure).toFixed(2))
					return (incomeFigure-expendFigure).toFixed(2)
				}else{
					this.$emit('Tendency','0.00')
					return '0.00'
				}

			},

		}

	}
</script>

<style lang="scss" scoped>

	$scale:0.1333;

	@mixin asset-item($border-style,$color,$text-color,$size,$price-color,$direction){
		height: $scale*70vw;
		border: $border-style;
		border-radius: $scale*10vw;
		background-color:$color ;
		color:$text-color ;
		font-size: $scale*$size;
		line-height: $scale*70vw;
		margin-top: $scale*10vw;

		.asset-price{
			float: right;
			color: $price-color;
			font-size: $scale*16vw;
		}

		p{
			display: inline-block;
			width: 85vw;
			height: $scale*60vw;
			margin-left: $scale*10vw;
			position: relative;

		}

		.top{
			position: absolute;
			line-height: 0;
			top: $scale*24vw;
			font-size: $scale*18vw;
		}

		.remark{
			display: inline-block;
			line-height: 0;
			padding-top: $scale*48vw;
			font-size: $scale*16vw;
			color: #e9ebec;
		}

		.icon{
			vertical-align: $direction;
			font-size: $scale*34vw;
		}


	}

.asset-list{

	li{
		padding-left: $scale*20vw;
	}

	li:first-child{
		padding-left: $scale*20vw;

	.pull-down{
		vertical-align: middle;
		color: #c7c7c7;
		margin-left: $scale*10vw;
	}

	.asset-price{
		display: inline-block;
		margin-right: $scale*20vw;
	}

	@include asset-item($scale*1vw solid #eaeaea,transparent ,black,28vw,#4d68b6,normal)
	}

	.account-list{
		@include asset-item(0,transparent,#fff,20vw,#fff,top)
	}


	li:nth-child(5){
	@include asset-item(0,transparent,#fff,20vw,#fff,middle)
	}

	li:last-child{

	.icon{
		margin-right: $scale*10vw;
	}

	@include asset-item($scale*1vw solid #eaeaea,transparent ,#b7b7b7,20vw,none,middle)
	}
}
</style>