<template>
	<div class="fixed-demo">
		<div class="demo-header"><div class="go-back" @click="$emit('goBack')"><van-icon name="arrow-left" class="go-icon"  /><span>返回</span></div><p>{{demoName}}</p> </div>
		<div class="content">
			<p>口袋记账V3.9.1</p>
			<p>
				想知道钱花哪儿了? <br/>
				想存钱却总也存不下钱? <br/>
				每次记报销、人情往来和友情周转最后总是一团糟? <br/>
				想学理财却无从入口? <br/>
				以上问题都是口袋记账核心致力于通过产品解决的 <br/>
				问题，希望通过简洁、易用的用户体验，帮助用户 <br/>
				轻松梳理财务，真实改善理财状况<br/>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		props:['demoName']
	}
</script>

<style lang="scss" scoped>

	$scale:0.1333;

	.fixed-demo{
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: #fff;
		z-index: 100;

		.demo-header{
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

	.content{
		font-size:$scale*20vw ;
		margin-left: $scale*10vw;

		p{
			margin-bottom: $scale*10vw;
			line-height: $scale*26vw;
		}
	}

</style>