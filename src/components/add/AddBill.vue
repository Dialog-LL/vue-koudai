<template>
	<transition tag="div" name="addBill">
	<div class="addPage">
		<!--选择账户-->
		<van-popup v-model="showPop" position="bottom" :style="{ height: '30%' }" >
			<p class="account-title" >选择账户</p>
			<ul>
				<li @click="selectAccount('现金','out') " ><span class="account-icon">¥</span>现金 <van-icon name="success"  v-if="payWay=='现金'"  class="select-icon" color="#4f77e6"/></li>
				<li @click="selectAccount('银行卡','in')" ><span class="iconfont icon-ka account-icon"></span>银行卡 <van-icon name="success" v-if="payWay=='银行卡'" class="select-icon" color="#4f77e6"/> </li>
			</ul>
		</van-popup>
		<div class="title-tab">
			<span :class="choose=='AddIncome' ? 'light' :''" @click=" incomeAdd('AddIncome')" >收入</span>
			<span :class="choose=='AddExpend' ? 'light' :''" @click="incomeAdd('AddExpend')" >支出</span>
			<span :class="choose=='AddAccount' ? 'light' :''" @click="incomeAdd('AddAccount')" >转账</span>
			<div class="close " @click="canselBill" >×</div>
		</div>
		<components :is="choose" :iconLists="iconList" :choosetype="choose" :value="sum" :chooseicon="icon" :rollOut="rollOut" :rollIn="rollIn" @showPopup="showPopup" @iconMess="iconMessage" ></components>
		<div class="keyboard">
			<div class="select-account" @click="showPopup" v-if="choose !='AddAccount' " >{{payWay}}</div>
			<div @click="showExchangeRate=true" class='exchange' >汇率换算</div>
			<van-popup v-model="showExchangeRate" closeable position="bottom" :style="{ height: '46%' }" :close-on-click-overlay=false >
				<p class="coin-title">请选择币种</p>
				<p class="coin" @click="coinList=true" >{{fromCoin}}<van-icon name="arrow-down" class="sleect-coin" /></p>
				<van-icon name="down"  class="convert"/>
				<ul class="coin-list" v-show="coinList">
					<li @click="selectCoin('美元(USD)')" >美元(USD)</li>
					<li @click="selectCoin('日元(JPY)')" >日元(JPY)</li>
					<li @click="selectCoin('韩元(KRW)')" >韩元(KRW)</li>
					<li @click="selectCoin('俄罗斯(RUB)')" >俄罗斯(RUB)</li>
					<li @click="selectCoin('泰国(THB)')" >泰国(THB)</li>
					<li @click="selectCoin('英国(GBP)')" >英国(GBP)</li>
					<li @click="selectCoin('欧元(EUR)')" >欧元(EUR)</li>
					<li @click="selectCoin('澳门(MOP)')" >澳门(MOP)</li>
					<li @click="selectCoin('香港(HKD)')" >香港(HKD)</li>
				</ul>
				<p class="coin">人民币</p>
				<p class="coin-btn" @click="exchangeRate">确定</p>
			</van-popup>
			<div class="iconfont icon-bi redact" @click="redactSow = true"> </div>
            <!--填写备注-->
			<van-popup v-model="redactSow" position="bottom" :style="{ height: '24%' }" class="redactText" >
				<textarea  placeholder="输入备注" v-model="text" ></textarea>
				<van-uploader :after-read="afterRead" v-model="fileList" :max-count="1" class="redactImg" />
				<div class="redactSelect">
					<van-icon name="close" class="redactIcon" @click="cancelRedact" />
					<van-icon name="passed" class="redactIcon" @click="affirmRedact" />
				</div>
			</van-popup>
		</div>
			<!--键盘-->
		<van-number-keyboard
				:show="show"  theme="custom" :extra-key="['C', '.']" close-button-text="确定"
				@input="reset" :maxlength=10  @close="finish" @delete="deleteNum"/>
	</div>
	</transition>
</template>


<script>

	import AddExpend from './AddExpend'

	export default {
		props:['writeBill'],
		data:()=>({
			fileList:[],//图片上传
			coinList:false,
			fromCoin:'美元(USD)',
			showExchangeRate:false,
			transferAccount:'0.00',/*转入  转出  转账金额*/
			rollOut:'转出账户',
			rollIn:'转入账户',
			text:'',
			redactSow:false,
			payWay:'现金',
			choose:'AddExpend',/*收入或者支出*/
			showPop:false,  /*选择账户*/
			show: true,   /*键盘*/
			remark:'无',
			img:null,
			sum:'0',
			icon:{
				icon:"shoucang",
				txt:"其他",
				bgIcon:"#a2d7f3"
			},
			iconList:{
				'AddExpend':[
					{
						text:'其他',
						icon:'shoucang',
						bgColor: '#a2d7f3'
					},
					{
						text:'餐饮',
						icon:'qunfengcanyinmeishichong',
						bgColor: '#fec87d'
					},
					{
						text:'交通',
						icon:'jiaotong',
						bgColor: '#a1b4fe'
					},
					{
						text:'酒水饮料',
						icon:'011',
						bgColor: '#9dcafa'
					},
					{
						text:'水果',
						icon:'shuiguo',
						bgColor: '#f3d96e'
					},
					{
						text:'零食',
						icon:'lingshi',
						bgColor: '#b3de81'
					},
					{
						text:'买菜',
						icon:'qian',
						bgColor: '#9adbd1'
					},
					{
						text:'衣服鞋包',
						icon:'bao',
						bgColor: '#c7adf7'
					},
					{
						text:'生活用品',
						icon:'riyongpin',
						bgColor: '#c0bbd9'
					},
					{
						text:'话费',
						icon:'huafei2',
						bgColor: '#86c5ed'
					},
					{
						text:'护肤彩妆',
						icon:'huazhuangpin',
						bgColor: '#f0a7d6'
					},
					{
						text:'房租',
						icon:'fangzu',
						bgColor: '#8fbadf'
					},
					{
						text:'电影',
						icon:'dianying',
						bgColor: '#9adee2'
					},
					{
						text:'淘宝',
						icon:'taobao',
						bgColor: '#f9c66a'
					},
					{
						text:'红包',
						icon:'hongbao2',
						bgColor: '#fd9299'
					},
					{
						text:'药品',
						icon:'yaopin',
						bgColor: '#deceb3'
					}

				],
				'AddIncome':[
					{
						text:'其他',
						icon:'shoucang',
						bgColor: '#a2d7f3'
					},
					{
						text:'工资',
						icon:'jindutiaoqiandai',
						bgColor:'#6a83b2'
					},
					{
						text:'生活费',
						icon:'quqian',
						bgColor:'#d1b95d'
					},
					{
						text:'红包',
						icon:'hongbao2',
						bgColor:'#fe9295'
					},
					{
						text:'零花钱',
						icon:'cunqianguan',
						bgColor: '#8c9272'
					},
					{
						text:'外快兼职',
						icon:'shouru-copy',
						bgColor: '#65aaca'
					},
					{
						text:'投资收入',
						icon:'baobiao',
						bgColor: '#cc6601'
					},
					{
						text:'奖金',
						icon:'liwu',
						bgColor: '#ea9143'
					},
					{
						text:'报销',
						icon:'zhangdanmingxi01',
						bgColor: '#afd4cd'
					},
					{
						text:'现金',
						icon:'qian',
						bgColor: '#bc7475'
					},
					{
						text:'退款',
						icon:'quqian',
						bgColor: '#93ddb8'
					},
					{
						text:'支付宝',
						icon:'zhifubao',
						bgColor: '#70c4fd'
					},


				]
			}
		}),
		components:{
			AddExpend,
			AddIncome:() =>import('./AddIncome'),
			AddAccount:()=>import('./AddAccount')
		},
		watch:{
			//清空已上传的图片
			redactSow:function(){
				this.fileList=[]
			},
			writeBill:function(){
				if(this.writeBill.id){
					this.choose=this.writeBill.choose
					this.icon=this.writeBill.icon
					this.sum=Number(this.writeBill.price).toFixed()

				}
			}
		},
		methods:{
			//选择汇率
			selectCoin(value){
				this.fromCoin=value
				this.coinList=false
			},
			//汇率换算
			exchangeRate(){
				if(this.sum=='0'){
					this.$toast('请先输入金额')
					this.showExchangeRate=false
					return
				}
				this.$toast.loading({
					duration: 0, // 持续展示 toast
					forbidClick: true,
					message: '正在转换中',
				});
				this.axios(`/exchange/convert?appkey=8e5bcaa4cb1bb202&from=${this.fromCoin.substr(-4,3)}&to=CNY&amount=${Number(this.sum)}`)
					.then(res=>{
						this.sum=Number(res.data.result.camount).toFixed(2)
						this.$toast.clear();
						this.showExchangeRate=false

					})

			},
			//取消添加/修改
			canselBill(){
				//初始化
				this.icon={
					icon:"shoucang",
					txt:"其他",
					bgIcon:"#a2d7f3"
				}
				this.sum='0'
				this.payWay='现金'
				this.choose='AddExpend'
				this.remark='无'
				this.img=null
				this.rollOut='转出账户'
				this.rollIn='转入账户'

				this.$emit('closeAdd')
			},
			//文本备注
			affirmRedact(){
				if(this.fileList[0]){
					this.img=this.fileList[0].content
				}
				this.remark=this.text
				this.redactSow=false
				this.text=''
			},
			//取消备注
			cancelRedact(){
				this.redactSow=false
				this.text=''
			},
			//图片上传
			afterRead(file){
				file.status = 'uploading';
				file.message = '上传中...';
				let fr = new FileReader();
				fr.readAsDataURL(file.file);
				fr.onloadend = function(){
					file.status = '';
					file.message = '';
				}
			}
			,
			incomeAdd(name){
				this.choose=name
				this.icon={
					icon:"shoucang",
					txt:"其他",
					bgIcon:"#a2d7f3"
				}
			},
			//选择账户
			selectAccount(account,way){
				if(this.choose !='AddAccount'){
					this.payWay=account;
				}else {
					if(way == 'out'){
						this.rollOut=account
					}else {
						this.rollIn=account
					}
				}

				this.showPop=false

			},
			//显示选择账户
			showPopup() {
				this.showPop = true;
			},
			//点击对应的键值
			reset(key){
				//清除
				if(key == "C"){
					key = ''
					this.sum='0'
				//处理首位是零
				}else if(this.sum.length == 1){
					if(this.sum.charAt(0) == '0' && key !='.'){

						this.sum=this.sum.slice(1)
					}
				//数值最大长度
				}else if( this.sum.length>10){
						key = ''
				//只允许出现一次 .
				}else if(key == '.'){
					//此时金钱里面没有.
					if(this.sum.indexOf('.') != -1){
						key = ''
					}
				}
				this.sum += String(key)

			},
			//消费的类目icon
			iconMessage({icon,txt,bgIcon}){
				this.icon={icon,txt,bgIcon}
			},
			//完成,初始化花费
			finish(){

				//不能为0
				if(this.sum == '0') {
					this.$toast.setDefaultOptions({className:'toast-modal'})
					this.$toast('金额不能为0喔',1500 );
					return
				}
				this.sum= Number(this.sum).toFixed(2)
				if(this.writeBill.id){
					this.$emit('againWriteBill',this.writeBill.id,this.remark,this.img,this.sum,this.icon,this.choose,this.payWay)
				}else if(this.choose !='AddAccount' ){
					this.$emit('onceFinish',this.remark,this.img,this.sum,this.icon,this.choose,this.payWay)
				}else {
					if(this.rollOut !='转出账户' && this.rollIn!='转入账户'){
						this.$emit('transferAccount',this.remark,this.img,this.sum,this.choose,this.rollOut,this.rollIn)
					}else{
						this.$toast.setDefaultOptions({className:'toast-modal'})
						this.$toast('请选择账户',1500 );
						return
					}

				}

				this.icon={
					icon:"shoucang",
					txt:"其他",
					bgIcon:"#a2d7f3"
				}
				this.sum='0'
				this.payWay='现金'
				this.choose='AddExpend'
				this.remark='无'
				this.img=null
				this.rollOut='转出账户'
				this.rollIn='转入账户'

			},
			//删除花费
			deleteNum(){
				if(this.sum.length == 1){
					this.sum='0'
				}else{
					this.sum=this.sum.slice(0,this.sum.length-1)
				}
			}


		}
	}
</script>

<style lang="scss" scoped>

	$scale:0.1333;

	.addPage{
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: 100;
		background: white;

		.account-title{
			width: 100%;
			text-align: center;
			font-size: $scale*20vw;
			padding:$scale*20vw 0 $scale*20vw 0;
			color: #575253;
		}

		li{
			height: $scale*50vw;
			font-size: $scale*20vw;
			border:$scale*.5vw solid #e8e8e8;
			line-height: $scale*50vw;

			.account-icon{
				display: inline-block;
				width: $scale*60vw;
				text-align: center;
				font-size: $scale*30vw;
				vertical-align: middle;
				color: #74aee2;

			}

			.select-icon{
				float: right;
				margin-top:$scale*16vw;
				margin-right: $scale*30vw;
			}
		}

	}

	.bgcontent{
		background: none;
		color: #fff;
		font-size: $scale*20vw;
	}

	.title-tab{
		position: relative;
		width: $scale*300vw;
		margin:$scale*20vw auto;
		color: #4f77e6;
		text-align: center;

		span{
			display: inline-block;
			border:$scale*1vw solid #c9d1d6;
			padding: $scale*10vw $scale*20vw;
			font-size: $scale*16vw;
		}

		.light{
			background: #4f77e6;
			color: #fff;
		}

		span:first-child{
			border-radius: $scale*10vw 0 0 $scale*10vw;
		}

		span:nth-child(3){
			border-radius:0 $scale*10vw $scale*10vw 0;
		}

		.close{
			position: absolute;
			top:$scale*10vw;
			right: -$scale*180vw;
			color: #5a5a5a;
			font-size: $scale*42vw;
		}
	}

	.keyboard{
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		width: 100vw;
		height: 7vh;
		background-color: #f2f3f5;
		bottom: 238px;
		border-radius:$scale*16vw $scale*16vw 0 0;


		.select-account{
			display: inline-block;
			border: $scale*2vw solid #fff;
			padding: $scale*10vw $scale*20vw $scale*10vw $scale*20vw;
			border-radius: $scale*20vw;
			color: #4e67d9;
			margin-left: $scale*20vw;
			font-size: $scale*16vw;

		}

		.exchange{
			border: $scale*2vw solid #fff;
			padding: $scale*10vw $scale*20vw $scale*10vw $scale*20vw;
			border-radius: $scale*20vw;
			color: #4e67d9;
			font-size: $scale*16vw;
		}

		.coin{
			margin:$scale*20vw;
			border:$scale*1vw solid black;
			height: $scale*40vw;
			font-size: $scale*20vw;
			line-height: $scale*40vw;
		}

		.convert{
			margin-left: 50%;
			width: $scale*20vw;
			font-size: $scale*20vw;
		}

		.coin-list{
			width: $scale*709vw;
			height: $scale*240vw;
			overflow: auto;
			position: absolute;
			top:$scale*120vw;
			left: $scale*20vw;
			background: #fff;
			border: $scale*1vw solid #595b5d;
		}

		.coin-btn{
			margin:$scale*20vw;
			text-align: center;
			border:$scale*1vw solid #cccdd0;
			height: $scale*40vw;
			font-size: $scale*20vw;
			line-height: $scale*40vw;
			border-radius: $scale*20vw;
			background: #4f77e6;
			color: #fff;
		}

		.sleect-coin{
			float: right;
			font-size: $scale*20vw;
			margin-right: $scale*20vw;
			margin-top: $scale*10vw;
		}


		.coin-title{
			text-align: center;
			font-size: $scale*26vw;
			margin-top: $scale*30vw;
		}

		.redact{
			font-size: $scale*28vw;
			margin-right: $scale*40vw;
			margin-left: $scale*40vw;
		}

		.redactText{

			textarea{
				width: $scale*600vw;
				height: $scale*100vw;
				margin: $scale*20vw $scale*20vw 0 $scale*20vw;
				border:0;
				background: #f3f3f5;
				color: #88888a;
				font-size: $scale*20vw;
				outline: none;
				padding-top: $scale*10vw;
				text-indent: 1em;
				resize: none;
			}

			span{
				position: absolute;
				width: $scale*80vw;
				height: $scale*80vw;
				top: $scale*30vw;
				font-size: $scale*50vw;
				text-align: center;
				line-height: $scale*94vw;
				border: $scale*1vw solid #e0e0e0;
			}


			.redactImg{
				position: absolute;
				top: $scale*36vw;
			}

			.redactSelect{
				display: flex;
				position: absolute;
				bottom: 0;
				width: 100vw;
				justify-content: center;
				align-items: center;
				background: #f6f6f6;
				font-size: $scale*30vw;
				height: $scale*55vw;
				border-top: $scale*1vw solid #e0e0e0;

				.redactIcon{
					margin:0 $scale*70vw 0 $scale*70vw;
				}


			}
		}
	}



	.addBill-enter,
	.addBill-leave-to{
		transform: translateY(100%);
	}
	.addBill-enter-active,
	.addBill-leave-active{
		transition: all .2s ease-out;
	}
	.addBill-enter-to,
	.addBill-leave{
		transform: translateY(0);
	}
</style>