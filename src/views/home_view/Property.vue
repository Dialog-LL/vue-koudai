<template>
	<div class="property">
		<van-popup v-model="show" position="top" :style="{ height: '40%' }" >
			<p class="pop-title">选择要展示的账户</p>
			<ul class="pop-list">
				<li v-for="item in account[page]" :key="item.text" @click="toggleChoose(item)" >{{item.text}}
					<van-icon :name="item.show? 'checked' : ''" color="#5174ea" class="choose-icon" />
				</li>
			</ul>
		</van-popup>
		<ul class="nav">
			<li :style="{'color':page == 'Positive' ? '#4d63ce':'black'}" @click="page = 'Positive'" >资产</li>
			<li :style="{'color':page == 'Negative'? '#4d63ce':'black' }"  @click="page = 'Negative'" >负债</li>
			<li class="iconfont icon-baobiao1 report" @click="showTendencyChart=true"></li>
		</ul>
		<BillDetails v-if="showDetail" @goBack="goBack" :bills="bills" :cashData="cashData" :bankData="bankData" :bgwall="bgwall" :choosePage="choosePage" :cashFlowIn="cashFlowIn" :cashFlowOut="cashFlowOut" :bankFlowIn="bankFlowIn" :bankFlowOut="bankFlowOut" />
		<components :is="page" :List="account" @toggleShow="toggleShow" :billFigure="bills" @Tendency="tendency" @showAdd="showAdd" @detailPage="detailPage" ></components>
		<TendencyChart v-if="showTendencyChart"  :bills="bills" :tendencyData="tendencyData" @goBack="goBack" />
		<!--添加账户-->
		<div class="add-account" v-if="addAccountShow">
			<div class="account-header"><div class="go-back" @click="goBack"><van-icon name="arrow-left" class="go-icon"  /><span>资产</span></div><p>选择账户类型</p> </div>
			<div class="halving-line">资产账户</div>
			<div class="option-list" @click="addAccount('Positive','wechat','xiaolian1','微信','微信余额','0.00','#a3e175')"  >
				<van-icon name="wechat" class="halving-icon"  />
				<p class="text">微信</p>
			</div>
			<div class="halving-line">负债账户</div>
			<div class="option-list" @click="addAccount('Negative','zfb','zhifubao','花呗','花呗欠账','0.00','#8fa7e3')" >
				<span class="iconfont icon-zhifubao halving-icon" style="color: #8fa7e3"></span>
				<p class="text">花呗</p>
			</div>
		</div>
	</div>
</template>

<script>

	import Positive from '../../components/property/Positive'

	export default {
		props:['bills'],
		components:{
			Positive,
			BillDetails:()=>import('../../components/property/BillDetails'),
			Negative:()=>import('../../components/property/Negative'),
			TendencyChart:()=>import('../../components/property/TendencyChart')
		},
		data:()=>({
			tendencyData:0,
			showDetail:false,
			addAccountShow:false,
			show:false, //资产  负债
			page:'Positive',
			cashFlowIn:0,
			cashFlowOut:0,
			bankFlowIn:0,
			bankFlowOut:0,
			cashData:'',
			bankData:'',
			choosePage:'',
			bgwall:'',
			showTendencyChart:false, //资产分析表
			account:{
				Positive:{
					cash:{
						accountIcon:'qianyue',
						text:'现金',
						remark:'现金余额',
						price:'0.00',
						bgColor:'#58c1ee',
						show:true
					},
					bank:{
						accountIcon:'ka',
						text:'银行卡',
						remark:'银行卡余额',
						price:'0.00',
						bgColor:'#6ac9c1',
						show:true
					},
					income:{
						accountIcon:'tubiaozhizuo-',
						text:'应收账',
						remark:'别人欠我的钱',
						price:'0.00',
						bgColor:'#f3aa7d',
						show:true
					},
					invest:{
						accountIcon:'68',
						text:'投资中心',
						remark:null,
						price:'0.00',
						bgColor:'#ee8d87',
						show:true
					}
				},
				Negative:{
					bank:{
						accountIcon:'ka',
						text:'银行卡',
						remark:'未设置还款日',
						price:'0.00',
						bgColor:'#6ac9c1',
						show:true
					},
					debt:{
						accountIcon:'fuqian',
						text:'应付账',
						remark:'我欠别人的钱',
						price:'0.00',
						bgColor:'#f19fcf',
						show:true
					}
				}
			}


		}),
		watch:{
			bills:function(){
				this.propertyToggle()
			}
		},
		methods:{
			detailPage(way,color){
				this.showDetail=true
				this.choosePage=way
				this.bgwall=color
			},
			showAdd(){
				this.addAccountShow=true;
			},
			addAccount(way,wechat,accountIcon,text,remark,price,bgColor){
				for(let item in this.account){
					if(item == way && way =='Positive'){
						this.account={
							...this.account,
							Positive:{
								...this.account[way],
								wechat:{
									accountIcon,
									text,
									remark,
									price,
									bgColor,
									show:true
								}
							}
						}
					}else if(item == way && way =='Negative'){
						this.account={
							...this.account,
							Negative:{
								...this.account[way],
								zfb:{
									accountIcon,
									text,
									remark,
									price,
									bgColor,
									show:true
								}
							}
						}
					}
				}
				this.addAccountShow=false

			},
			goBack(){
				this.showTendencyChart=false
				this.addAccountShow=false
				this.showDetail=false
			},
			propertyToggle(){
				let cashFigure=0.00
				let bankFigure=0.00
				if(this.bills){
					this.bills.filter(item=>{
						if(item.payWay =='现金'){
							if(item.choose=='AddExpend'){
								this.cashFlowOut+=Number(item.price)
								cashFigure -= Number(item.price)
							}else {
								this.cashFlowIn+=Number(item.price)
								cashFigure += Number(item.price)
							}
						}
						if(item.payWay =='银行卡'){
							if(item.choose=='AddExpend'){
								this.bankFlowOut+=Number(item.price)
								bankFigure -= Number(item.price)
							}else {
								this.bankFlowIn +=Number(item.price)
								bankFigure += Number(item.price)
							}
						}
					})
				}
				this.cashData=cashFigure.toFixed(2)
				this.bankData=bankFigure.toFixed(2)
				this.account.Positive.cash.price=this.cashData
				this.account.Positive.bank.price=this.bankData
			},
			//选择展示的账户
			toggleShow(){
				this.show=true
			},
			//切换展示用户
			toggleChoose(item){
				item.show=!item.show
			},
			tendency(data){
				this.tendencyData=data
			}

		},
		mounted() {
			this.propertyToggle()
		}
	}
</script>

<style lang="scss" scoped>

	$scale:0.1333;

	.add-account{
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 100;
		background: white;

		.account-header{
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

		.halving-line{
			width: 100vw;
			height: $scale*40vw;
			background: #f3f2f7;
			font-size: $scale*16vw;
			line-height:$scale*40vw;
			padding-left: $scale*10vw;
		}

		.option-list{
			display: flex;
			align-items: center;
			height: $scale*50vw;
			border-top: $scale*1vw solid #efefef;
			border-bottom: $scale*1vw solid #efefef;
			background: #fff;

			.halving-icon{
				font-size: $scale*30vw;
				margin-left: $scale*10vw;
				margin-right: $scale*20vw;
				vertical-align: middle;
				color: #a3e175;
			}
		}

		.switch{
			position: absolute;
			right: $scale*20vw;
		}

		.install-bottom{
			width: 100vw;
			height: $scale*55vw;
			font-size: $scale*20vw;
			text-align: center;
			line-height: $scale*55vw;
			background: white;
			margin-top: $scale*50vw;
			color: #4e67d9;
		}


	}

	.property{
		overflow: hidden;
	}

	.pop-title{
		font-size: $scale*20vw;
		color: #6b7bbb;
		margin: $scale*20vw;
	}

	.pop-list{
		margin-left: $scale*20vw;
		margin-bottom: $scale*30vw;

		li {
			border-top:$scale*1vw solid #eaeaea;
			height: $scale*50vw;
			line-height: $scale*50vw;
			font-size: $scale*18vw;
		}

		.choose-icon{
			float: right;
			margin-right: $scale*24vw;
			margin-top: $scale*16vw;

		}
	}


	.property{
		width: 95vw;
		margin: 0 auto;
	}

	.nav{
		height: $scale*50vh;
		font-size: $scale*24vw;
		line-height: $scale*50vh;
		margin-top: $scale*10vw;

		li{
			float: left;
		}

		li:first-child{
			margin-right: $scale*30vw;
		}

		.report{
			color: #4f77e6;
			font-size: $scale*30vw;
			float: right;
		}
	}



</style>