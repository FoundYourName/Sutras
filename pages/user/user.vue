<template>
	<view class="content">
		<u-swiper class="uswiper" :height="wHeight" imgMode="aspectFit" :list="list1" 
		duration="500"  
		indicatorMode="dot" indicator="true" indicatorActiveColor="#000000" indicatorInactiveColor="#ffffff"
		circular 
		:autoplay="true" interval="30000"
		radius="5"
			bgColor="#ffffff"></u-swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: [],
				wHeight:0
			}
		},
		onLoad() {
			const systemInfo = uni.getSystemInfoSync()
			this.wHeight = systemInfo.windowHeight
			systemInfo.wind
			this.showImgs()
			
		},
		methods: {
			showImgs() {
				for (var i = 0; i < 45; i++) {
					if (i < 10) {
						let j = '0' + i
						this.list1.push('/static/shufa/' + j + '.webp')
						continue
					}
					this.list1.push('/static/shufa/' + i + '.webp')
					// i++
				}
				console.log(this.list1); 
			}


		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.uswiper {
		width: 100%;
		height: 100%;
	}

</style>