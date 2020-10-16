<template>
	<div class="skin">

		<div class="skin-header"><div class="go-back" @click="$emit('goBack')"><van-icon name="arrow-left" class="go-icon"  /><span>返回</span></div><p>壁纸</p> </div>
		<div class="imgList">
			<van-skeleton  avatar :loading="loading" class="skeleton" avatar-shape="square" avatar-size="80px" ></van-skeleton>
			<van-skeleton  avatar :loading="loading" class="skeleton" avatar-shape="square" avatar-size="80px" ></van-skeleton>
			<van-skeleton  avatar :loading="loading" class="skeleton" avatar-shape="square" avatar-size="80px" ></van-skeleton>
			<van-skeleton  avatar :loading="loading" class="skeleton" avatar-shape="square" avatar-size="80px" ></van-skeleton>
			<img v-for="item in imgList" :key="item.autokid" :src="item.thumb_url" @click="bgImg(item.autokid)"  class="imgDemo" :class="currentImg==item.autokid?'choose-img':''" >
		</div>
	</div>
</template>

<script>
	export default {
		data:()=>({
			currentImg:null,
			imgList:[],
			loading:true
		}),
		methods:{
			bgImg(value){
				this.currentImg=value
				this.$emit('bgImg',value)
			},

		},
		mounted() {
			this.axios('/background/get')
				.then(res=>{
					this.imgList=res.data.data.backGrounds
					this.loading=false
				})
		}
	}
</script>

<style lang="scss" scoped>

	$scale:0.1333;

	.skin{
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: #fff;
		z-index: 100;

		.skin-header{
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

	.imgList{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background: #fafafa;
		width: 100vw;
		margin-top: $scale*20vw;

		.imgDemo{
			width: $scale*100vw;
			height: $scale*100vw;
			border-radius: $scale*20vw;
			margin: $scale*30vw $scale*42vw $scale*30vw $scale*42vw;
			box-sizing: border-box;
		}

		.choose-img{
			border: $scale*5vw solid #bedef6;
			background: #bedef6;
		}
	}


</style>