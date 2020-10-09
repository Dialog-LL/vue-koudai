<template>
	<div class="fixed-demo">固定模板</div>
</template>

<script>
	export default {
		name: "fixedDemo"
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
	}

</style>