<template>
	<div class="expend-content">
		<p class="expend-head">
			<span class="iconfont icon" :class="`icon-${chooseicon.icon}`" :style="{'color':chooseicon.bgIcon}"></span>
			<span class="text-name"> {{chooseicon.txt}}</span>
			<span class="sum">{{value}}  ¥</span>
		</p>
		<ul class="list-box">
			<li v-for="item in iconLists[choosetype]" :key="item.text" @click="iniconType(item.icon,item.text,item.bgColor)"  >
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
			iniconType(icon,txt,bgIcon){
				this.chooseIcon=icon
				this.chooseText=txt
				this.chooseColor=bgIcon
				this.$emit('iconMess',{icon,txt,bgIcon})
			},


		}
	}
</script>

<style scoped>

</style>