<template>
	<transition tag="div"  name="level" >
		<div class="login" v-if="pageShow" >
			<ul class="login-content">
				<li><h1 class="title">你好，口袋君！</h1></li>
				<li></li>
				<li><van-divider>使用口袋账号登录</van-divider></li>
				<li class="text"><input type="text" placeholder="用户名/邮箱/手机号"></li>
				<li class="text"><input type="password" placeholder="密码"></li>
				<li><p>登录即同意口袋用户服务协议 ,隐私权政策</p></li>
			</ul>
			<div class="tab-bar">
				<div @click="codeShow=true">忘记密码</div>
				<div class="register" @click="regShow=true">注册账号</div>
			</div>
			<Register v-if="regShow" />
			<ForgetCode v-if="codeShow"/>
		</div>
	</transition>
</template>

<script>


	export default {
		data :() =>({
			pageShow:false,
			regShow:false,
			codeShow:false
		}),
		components:{
			Register:()=> import('../components/login/Register') ,
			ForgetCode:()=> import('../components/login/ForgetCode')
		},
		methods:{

		},
		mounted() {
			this.$nextTick(() =>{
				this.pageShow=true;
			})
		},
		beforeDestroy() {
			this.pageShow=false;
		}
	}
</script>

<style lang="scss" scoped>

	$scale:0.1333;

	.login {
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
		color: #8db3ef;
		background: #4f77e6;
		z-index: 100;

		.login-content{
			width: $scale*500vw;
			margin:$scale*100vw auto;

			li{
				color: #bcd0fa;
				margin: $scale*10vw;

				input{
					border:0;
					width: 100%;
					height: $scale*40vw;

					background: 0;
					font-size: $scale*20vw;
				}

			}

			.text{
				border-bottom: $scale*1vw solid #8bb8ff;
			}

			.title {
				text-align: center;
				font-size: $scale*30vw;
				font-family: 宋体;
				color: #fff;
				margin-bottom: $scale*100vw;
			}
		}

		.tab-bar{
			position: absolute;
			bottom: 0;
			width: 100vw;
			height: $scale*55vw;
			border-top: 1px solid #8db3ef;

			div {
				display: inline-block;
				width: 50vw;
				height: $scale*55vw;
				line-height: $scale*55vw;
				box-sizing: border-box;
				text-align: center;
				font-size: $scale*16vw;
			}
			.register {
				border-left: $scale*1vw solid #8db3ef;
			}
		}


	}


</style>

<style>
	.level-enter,
	.level-leave-to{
		transform: translateX(100%);
	}
	.level-enter-active,
	.level-leave-active{
		transition: all .2s ease-out;
	}
	.level-enter-to,
	.level-leave{
		transform: translateX(0);
	}
</style>