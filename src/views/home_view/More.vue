<template>
	<div>
		<router-link to="/login">立即登录</router-link>
		<transition name="level">
			<router-view></router-view>
		</transition>

	</div>
</template>

<script>
	export default {
		name: "More"
	}
</script>

<style scoped>
	.level-enter,
	.level-leave-to{
		transform: translateX(100%);
	}
	.level-enter-active,
	.level-leave-active{
		transition: all 2s linear;
	}
	.level-enter-to,
	.level-leave{
		transform: translateX(0);
	}
</style>