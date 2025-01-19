<template>
	<view class="content">
		<view id="read" />
		<view class="control" v-if="hid">
			<button id="bPrev" type="primary" @click="prevPage" size="mini">上页</button>
			<button type="default" @click="largeFont" size="mini">+</button>
			<button type="default" @click="reduceFont" size="mini">-</button>
			<button id="bNext" type="primary" @click="nextPage" size="mini">下页</button>
			
		</view>
		<view class="hidden">
			<u-icon name="eye-off" size="48rpx" @click="hiddButton"></u-icon>
		</view>
	</view>
</template>

<script>
	import Epub from "epubjs"

	export default {
		data() {
			return {
				fontsize: 14,
				OldTime: 0,
				path: "",
				wHeight: 0,
				title: "一切无住",
				hid:true
			}
		},
		onLoad(e) {
			const systemInfo = uni.getSystemInfoSync()
			this.wHeight = systemInfo.windowHeight
			// console.log(e);
			if (e.url) {
				this.path = e.url
				this.title = this.path.match('[^/]+(?!.*/)')[0].replace(".epub", "")
			}
			this.read()
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		methods: {
			hiddButton(){
				this.hid = ! this.hid
			},
			read() {
				
				this.book = new Epub(
					this.path
				)
				this.rendition = this.book.renderTo("read");
				

				this.rendition.display()
				
				this.themes = this.rendition.themes

				this.rendition.on('touchstart', e => {
					console.log(1);
					//开始点击事件 点击的x坐标
					this.touchStartX = e.changedTouches[0].clientX
					//触发点击开始事件时间
					this.touchStartTime = e.timeStamp
					
				});
				
				this.rendition.on('touchend', e => {
					console.log(2);
					const offsetX = e.changedTouches[0].clientX - this.touchStartX
					const time = e.timeStamp - this.touchStartTime
					if (time < 500 && offsetX > 20) {
						this.prevPage();
					} else{
						this.nextPage();
					}
				});

			},
			nextPage() {
				//增加判断 已经在最后一页就吐司提示且return
				this.rendition.next()
			},
			prevPage() {
				this.rendition.prev()
			},
			reduceFont() {
				// let time = new Date()

				if (this.fontsize == 1) {
					
					if (this.OldTime == 1) return
					uni.showToast({
						title: "已最小了",
						duration: 800
					})
					return this.OldTime++
				}
				this.fontsize = this.fontsize - 1
				this.themes.fontSize(this.fontsize + "px") //第一次触发会变大后面触发才是变小
			},
			largeFont() {
				if (this.fontsize == 1) {
					this.OldTime = 0
				}
				//fontsize需要自己定义一个初始值 我在data return中定义
				this.themes.fontSize(++this.fontsize + "px")

			}

		}
	}
</script>

<style lang="scss">

	.control {
		bottom: 0;
		right: 0;
		position: absolute;
	}
	.hidden{
		bottom: 68rpx;
		right: 0;
		position: absolute;
	}
</style>