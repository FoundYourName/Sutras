<template>
	<view class="content">
		<u-swiper class="uswiper" :height="wHeight" imgMode="aspectFit" :list="list1" duration="500" indicatorMode="dot"
			indicator="true" indicatorActiveColor="#000000" indicatorInactiveColor="#ffffff" circular :autoplay="true"
			interval="30000" radius="5" bgColor="#ffffff"></u-swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: ['/static/shufa/69.jpg', '/static/shufa/70.jpg', '/static/shufa/37.jpg','/static/shufa/01.webp', '/static/shufa/02.webp', '/static/shufa/03.webp', '/static/shufa/04.webp', '/static/shufa/05.webp', '/static/shufa/06.webp', '/static/shufa/34.jpg', '/static/shufa/35.jpg', '/static/shufa/36.jpg', '/static/shufa/38.jpg', '/static/shufa/39.jpg', '/static/shufa/40.jpg', '/static/shufa/41.jpg', '/static/shufa/42.jpg', '/static/shufa/43.jpg', '/static/shufa/44.jpg', '/static/shufa/45.jpg', '/static/shufa/46.jpg', '/static/shufa/47.jpg', '/static/shufa/48.jpg', '/static/shufa/49.jpg', '/static/shufa/50.jpg', '/static/shufa/51.jpg', '/static/shufa/52.jpg', '/static/shufa/53.jpg', '/static/shufa/54.jpg', '/static/shufa/55.jpg', '/static/shufa/56.jpg', '/static/shufa/57.jpg', '/static/shufa/58.jpg', '/static/shufa/59.jpg', '/static/shufa/60.jpg', '/static/shufa/61.jpg', '/static/shufa/62.jpg', '/static/shufa/63.jpg', '/static/shufa/64.jpg', '/static/shufa/65.jpg', '/static/shufa/66.jpg', '/static/shufa/67.jpg', '/static/shufa/68.jpg',  '/static/shufa/71.jpg', '/static/shufa/72.png', '/static/shufa/73.png', '/static/shufa/74.png', '/static/shufa/75.png', '/static/shufa/76.png', '/static/shufa/77.png', '/static/shufa/78.png', '/static/shufa/79.png', '/static/shufa/80.png', '/static/shufa/81.png', '/static/shufa/82.png', '/static/shufa/83.png', '/static/shufa/84.png', '/static/shufa/85.png', '/static/shufa/86.png', '/static/shufa/87.png', '/static/shufa/88.png', '/static/shufa/89.png', '/static/shufa/90.png', '/static/shufa/91.png','/static/shufa/07.webp', '/static/shufa/08.webp', '/static/shufa/09.webp', '/static/shufa/10.webp', '/static/shufa/11.webp', '/static/shufa/12.webp', '/static/shufa/13.webp', '/static/shufa/14.webp', '/static/shufa/15.webp', '/static/shufa/16.webp', '/static/shufa/17.webp', '/static/shufa/18.webp', '/static/shufa/19.webp', '/static/shufa/20.webp', '/static/shufa/21.webp', '/static/shufa/22.webp', '/static/shufa/23.webp', '/static/shufa/24.webp', '/static/shufa/25.webp', '/static/shufa/26.webp', '/static/shufa/27.webp', '/static/shufa/28.webp', '/static/shufa/29.webp', '/static/shufa/30.webp', '/static/shufa/31.jpg', '/static/shufa/32.jpg', '/static/shufa/33.jpg', ],				wHeight: 0
			}
		},
		onLoad() {
			const systemInfo = uni.getSystemInfoSync()
			this.wHeight = systemInfo.windowHeight
			systemInfo.wind
			// this.showImgs()

		},
		methods: {
			showImgs() {
				for (var i = 1; i < 92; i++) {
					console.log(i);
					if (i < 31) {
						if (i < 10) {
							let j = '0' + i
							this.list1.push('/static/shufa/' + j + '.webp')
						} else {
							this.list1.push('/static/shufa/' + i + '.webp')
						}

					} else if (i>30) {
						if (i < 72)
						this.list1.push('/static/shufa/' + i + '.jpg')
						else{
							this.list1.push('/static/shufa/' + i + '.png')
						}
					} 

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