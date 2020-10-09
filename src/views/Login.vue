<template>
	<div class="login">
		<ul class="login-content">
			<li><h1 class="title">你好，口袋君！</h1></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
		<div class="tab-bar">
			<div @click="codeShow=true">忘记密码</div>
			<div class="register" @click="regShow=true">注册账号</div>
		</div>
		<Register v-if="regShow" />
		<ForgetCode v-if="codeShow"/>
	</div>
</template>

<script>


	export default {
		data :() =>({
			regShow:false,
			codeShow:false
		}),
		components:{
			Register:()=> import('./Register') , /*resolve => require(['./Register'],resolve)*/
			ForgetCode:()=> import('./ForgetCode')
		},
		methods:{

		}
	}
</script>

<style lang="scss" scoped>
	.login {
		position: absolute;
		width: 100vw;
		height: 100vh;
		color: #8db3ef;
		background: #4f77e6;
		z-index: 100;

		.login-content{
			margin-top: 100px;

			.title {
				text-align: center;
				font-size: 22px;
				font-family: 宋体;
				color: #fff;
			}
		}

		.tab-bar{
			position: absolute;
			bottom: 0;
			width: 100vw;
			height: 55px;
			border-top: 1px solid #8db3ef;

			div {
				display: inline-block;
				width: 50vw;
				height: 55px;
				line-height: 55px;
				box-sizing: border-box;
				text-align: center;
			}
			.register {
				border-left: 1px solid #8db3ef;
			}
		}


	}
</style>