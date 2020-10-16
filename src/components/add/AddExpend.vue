<template>
	<div class="expend-content">
		<p class="expend-head" >
			<span class="iconfont icon" :class="`icon-${chooseicon.icon}`" :style="{'color':chooseicon.bgIcon}"></span>
			<span class="text-name"> {{chooseicon.txt}}</span>
			<span class="sum">{{value}}  ¥</span>
		</p>
		<ul class="list-box">
			<li v-for="item in iconLists[choosetype]" :key="item.text" @click="exiconType(item.icon,item.text,item.bgColor)" >
				<span class="iconfont" :class="`icon-${item.icon}`" :style="{'color':item.bgColor}" ></span>
				<p>{{item.text}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			iconLists :Object,
			choosetype:String,
			value:String,
			chooseicon:Object
			},
		data:()=>({

		}),
		methods:{
			//选择对应的icon
			exiconType(icon,txt,bgIcon){
				this.chooseIcon=icon
				this.chooseText=txt
				this.chooseColor=bgIcon
				this.$emit('iconMess',{icon,txt,bgIcon})
			}
		}
	}
</script>

<style lang="scss" >
	$scale:0.1333;

	.expend-head {
		margin-top:$scale*30vw;
		border-top: $scale*1vw solid #efefef ;
		border-bottom: $scale*1vw solid #efefef ;
		padding: $scale*10vw 0 $scale*10vw 0;

		span {
			display: inline-block;
		}

		.icon {
			margin-left:$scale*20vw ;
			font-size: $scale*48vw;
			vertical-align: middle;
		}
		.text-name {
			display: inline-block;
			font-size: $scale*24vw;
			margin-left:$scale*10vw ;
		}

		.sum {
			float: right;
			font-size: $scale*48vw;
			margin-right: $scale*10vw;
		}
	}

	.list-box{
		display: flex;
		flex-flow: row wrap;

		li{
			width:$scale*150vw;
			margin-top:$scale*10vw;
			box-sizing: border-box;
			text-align: center;
			margin-bottom:$scale*10vw;

			.iconfont{
				display: inline-block;
				font-size:$scale*36vw;
				margin-bottom:$scale*10vw;
			}

			p {
				font-size: $scale*20vw;
			}
		}
	}

</style>