<template>
	<div class="account">
		<p class="account-wrapper" @click="$emit('showPopup')" >{{rollOut}} <span class="account-sum" >{{value}}</span> </p>
		<p class="account-wrapper" @click="$emit('showPopup')" >{{rollIn}} <span class="account-sum" >{{value}}</span> </p>
	</div>
</template>

<script>
	export default {
		props:['value','rollOut','rollIn']
	}
</script>

<style lang="scss" scoped>

	$scale:0.1333;

	.account{
		border-top: $scale*1vw solid #efefef;
		overflow: hidden;

		.account-wrapper{
			height: $scale*70vw;
			line-height: $scale*70vw;
			border-radius: $scale*10vw;
			margin: $scale*10vw;
			border:$scale*1vw solid #efefef;
			font-size: $scale*18vw;
			padding-left: $scale*20vw;
			padding-right: $scale*20vw;

			.account-sum{
				float: right;
			}
		}
	}
</style>