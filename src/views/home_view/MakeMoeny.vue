<template>
	<div class="make-money">
		<router-view/>
		<h1 class="make-money-title">购物返利</h1>

		<div class="box">
			<p>您未登录 <span class="order">查看订单</span></p>
		</div>

		<div class="make-list">
				<div>
				<a href="https://ai.m.taobao.com/">
					<img src="../../assets/images/fanli/taobao.png" alt="">
				</a>
					<p>淘宝</p>
					</div>
				<div>
				<a  href="https://m.jd.com/">
					<img src="../../assets/images/fanli/jd.png" alt="">

				</a>
					<p>京东</p>
					</div>
				<div>
				<a href=" https://mobile.yangkeduo.com/">
					<img src="../../assets/images/fanli/pdd.png" alt="">

				</a>
					<p>拼多多</p>
					</div>
				<div>
				<a href=" https://main.m.taobao.com/?sprefer=sypc00">
					<img src="../../assets/images/fanli/jhs.png" alt="">

				</a>
					<p>聚划算</p>
					</div>
				<div>
				<a href=" https://chaoshi.m.tmall.com/">
					<img src="../../assets/images/fanli/tmall.png" alt="">

				</a>
					<p>天猫超市</p>
					</div>
				<div>
				<a href="https://m.fliggy.com/?ttid=seo.000000573&seoType=origin">
					<img src="../../assets/images/fanli/feizhu.png" alt="">

				</a>
					<p>飞猪旅行</p>
					</div>
				<div>
				<a href="https://m.ikoudai.cc/h5/kdjz/nomoneybuy/index">
					<img src="../../assets/images/fanli/0y.png" alt="">

				</a>
					<p>0元购物</p>
					</div>
				<div>
				<a href="https://temai.m.taobao.com/index.htm?pid=mm_115753568_41926531_220250584">
					<img src="../../assets/images/fanli/temai.png" alt="">

				</a>
					<p>淘宝特卖</p>
					</div>
			</div>
	</div>
</template>

<script>
	export default {
		name: "MakeMoeny",
		methods:{

		}
	}
</script>

<style lang="scss" scoped>
	$scale:0.1333;

	.make-money{
		padding-left: $scale*10vw;
		padding-right: $scale*10vw ;
		background: #fff;
		height: 100vh;
	}

	.make-money-title{
		width: 100vw;
		height: $scale*55vw;
		font-size: $scale*20vw;
		line-height: $scale*55vw;
	}

	.make-list{
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;

		div{
			display: inline-block;
			width: $scale*180vw;
			text-align: center;
			margin-bottom: $scale*50vw;
			font-size: $scale*14vw;
		}

		a{
			color: black;
		}

		img{
			width: $scale*80vw;
			margin-bottom: $scale*10vw;

		}
	}

	.box{
		background: #fe9a1c;
		border-radius: $scale*20vw;
		height: $scale*300vw;
		color: #fff;
		font-size: $scale*30vw;
		font-weight: bold;
		margin: $scale*40vw $scale*20vw $scale*40vw $scale*20vw;
		overflow: hidden;

		p{
			margin:$scale*30vw;

			.order{
				float: right;
				padding: $scale*10vw;
				border-radius: $scale*20vw;
				background: #fff;
				color:#fe9a1c ;
				font-size: $scale*20vw;
				font-weight: normal;
			}
		}
	}
</style>