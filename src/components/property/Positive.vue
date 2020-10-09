<template>
	<ol class="asset-list">
		<li>资产 <van-icon name="arrow-down" @click.self="show=true" class="pull-down" /> <span class="asset-price" >0.00</span></li>

		<li v-for="item in List" :key="item.text">
			<span :class="`iconfont icon-${item.accountIcon} icon`"></span>
			<p>
				<span  :class="item.remark ? 'top' : '' " >{{item.text}}</span>
				<span class="remark" v-if="item.remark">{{item.remark}}</span>
				<span class="asset-price" >{{item.price}}</span>
			</p>
		</li>

		<li> <van-icon name="plus " class="icon" /> 添加账户</li>
	</ol>
</template>

<script>
	export default {
		props:['List']
	}
</script>

<style scoped>

</style>