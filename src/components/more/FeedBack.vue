<template>
	<div class="feedback">
		<div class="feedback-header"><div class="go-back" @click="$emit('goBack')"><van-icon name="arrow-left" class="go-icon"  /><span>返回</span></div><p>反馈</p> </div>
		<div class="feedback-list" v-if="this.feedbackList['history']" >
			<van-icon name="chat" class="halving-ff" />
			<p class="text">{{this.feedbackList['history']['feedbackButton']['content']}}</p>
			<van-icon name="arrow" class="right-arrows"/>
		</div>
		<div class="halving-line" v-if="this.feedbackList['faq']">{{this.feedbackList['faq']['faqTitle']['content']}}</div>
		<div v-if="this.feedbackList['faq']">
			<div class="feedback-list"  v-for="item in this.feedbackList['faq']['questions'].content " :key="item.id" @click="resolve(item.id)" >
				<p class="text">{{item.title}}</p>
				<van-icon name="arrow" class="right-arrows"/>
			</div>
		</div>
		<div class="resolve" v-if="showResolve" >
			<div class="resolve-header" ><div class="go-back" @click="showResolve=false" ><van-icon name="arrow-left" class="go-icon"/><span>返回</span></div><p>常见问题</p></div>
			<div class="resolve-title">{{resolveTitle}}</div>
			<div ref="resolveContent" class="resolve-content"></div>
		</div>

	</div>
</template>

<script>
	export default {
		name: "FeedBack",
		data:()=>({
			feedbackList:[],
			showResolve:false,
			resolveTitle:''
		}),
		methods:{
			resolve(id){
				this.resolveId=id
				this.showResolve=true
				this.feedbackList['faq']['questions'].content.filter(item=>{
					if(item.id===id){
						this.$nextTick(()=>{
							this.resolveTitle=item.title
							this.$refs.resolveContent.innerHTML=item.content
						})
					}
				})
			}
		},
		mounted() {
			this.axios('/getConfiguration.do?appkey=23568452&status=0&deviceId=AKU01LDosz0DAKJ2yja9aqxl&sign=3c040275ffcaaef2a82f146bc67f07c7466c9049')
			.then(res=>{
				this.feedbackList=res.data.data
			})
		}
	}
</script>

<style lang="scss" scoped>

	$scale:0.1333;

	.feedback{
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: #fff;
		z-index: 100;

		.feedback-header{
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

	.feedback-list{
		display: flex;
		align-items: center;
		height: $scale*50vw;
		border-top: $scale*1vw solid #efefef;
		border-bottom: $scale*1vw solid #efefef;

		.halving-icon{
			color: #8fa7e3;
			font-size: $scale*30vw;
			margin-left: $scale*10vw;
			margin-right: $scale*20vw;
			vertical-align: middle;

		}

		.halving-ff{
			color: #bfbebf;
			font-size: $scale*30vw;
			margin-left: $scale*10vw;
			vertical-align: middle;

		}


	}

	.halving-line{
		width: 100vw;
		height: $scale*40vw;
		background: #ececec;
		opacity: .4;
		padding-left: $scale*20vw;
		font-size: $scale*20vw;
		line-height: $scale*40vw;
	}

	.text{
		margin-left: $scale*20vw;
		font-size: $scale*16vw;
	}

	.right-arrows{
		position: absolute;
		right: 0;
		margin-right: $scale*20vw;
	}


	.resolve-title{
		font-size: $scale*18vw;
		padding-bottom: $scale*10vw;
		margin-left: $scale*10vw;
		border-bottom: $scale*1vw solid #ccc;
	}

	.resolve-content{
		margin-left: $scale*10vw;
		margin-top:$scale*10vw ;
	}

	.resolve{
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: #fff;

		.resolve-header{
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

</style>