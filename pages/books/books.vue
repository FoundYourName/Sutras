<template>
	<view class="content">
		<view class="files">
			<view class="file" v-for="(item,index) in arr">
				<b @click="toSee(item)">{{item}}</b>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url1: "",
				title: "",
				arr:[]
			}
		},
		onLoad(e) {
			this.url1 = e.url +"/"
			this.getBooks()

			
		},
		methods: {
			async getBooks() {
				await uni.request({
					url: this.url1,
					// withCredentials:false,
					complete: (res) => {
						console.log(res);
						this.arr = res.data
						// console.log(this.arr);
					}
				})
			},
			 toSee(e) {
				let url = this.url1 + e
				uni.navigateTo({
					url: "/pages/read/read?url=" + url
				})
			}
		}
	}
</script>

<style>
	.content {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 20rpx;
	}


	.files {
		.file {
			height: auto;
			padding: 10rpx 20rpx;
		}
	}
</style>