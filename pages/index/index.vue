<template>
	<view class="home">
		<view class="lbt">
			<!-- <u-swiper :list="list1" @change="change" @click="click"></u-swiper> -->
			<u-swiper :list="list1" circular showTitle keyName="image" height="200px" indicator
				indicator-mode="dot"></u-swiper>
		</view>
		<view class="search">
			<u-search :showAction="true" actionText="搜索" placeholder="电脑:Ctrl+F搜佛经名字;手机:工具箱-页内查找" @search="search"
				:animation="true"></u-search>
		</view>
		<view class="titles">
			<span class="text"> 乾 隆 大 藏 经 </span>
			<p class="dzj"><a href="/static/qldzj/index.html">龙藏目录</a> </p>
			<!-- <span class="line"></span> -->
			<hr />
			<span class="text">Cbeta</span>
		</view>


		<view class="content">
			<view class="files">
				<view class="file" v-for="(item,index) in arr">
					<b @click="toSee(item.filePath)">{{item.fileName}}</b>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	// import fs from "fs-extra" 引入不用都报错 直接用uni.request
	import data from "../../data.json"
	const decoder = new TextDecoder()
	export default {
		components: {

		},
		data() {
			return {
				list1: [{
					image: '/static/imgs/莲花.jpg',
					title: '应无所住 而生其心 不取于相 如如不动',
				}, {
					image: '/static/imgs/2.jpg',
					title: '凡所有相 皆是虚妄 知幻即离 离幻即觉'
				}, {
					image: '/static/imgs/1.jpg',
					title: '一翳在眼 空华乱坠 知是空华 则无轮转'
				}, {
					image: '/static/imgs/3.jpg',
					title: '不是息心除妄想 只缘无事可思量'
				}],
				title: "藏经阁",
				arr: data,
				path: "../../static/cbeta_epub/"
			}
		},
		onShow() {

		},
		onLoad() {

		},
		methods: {
			search() {
				uni.showToast({
					title: "请直接>电脑:Ctrl+F搜佛经名字;手机:工具箱-页内查找",
					icon: "none",
					duration: 3000
				})
			},

			toSee(e) {
				let url = e
				//本地处理版
				uni.navigateTo({
					url: "/pages/read/read?url=" + url
				})
				//node接口版
				// uni.navigateTo({
				// 	url: "/pages/books/books?url=" + url
				// })
			}
		}
	}
</script>

<style lang="scss">
	// @font-face {
	// 	font-family: 'dingliesongtypeface';
	// 	src: url('../../static/fonts/dingliesongtypeface.ttf');
	// }

	.home {
		-webkit-user-select: text;
		// background-image: url("../../static/imgs/莲花.jpg");
		background-color: #C8EDC0;

		background-size: 100%;

		.content {

			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

		}

		.lbt {
			padding: 5rpx;
		}

		.search {
			//4上右下左  2上下 ,左右
			padding: 5rpx 0 20rpx 0;
		}


		.titles {
			text-align: center;
			height: 100%;
		}

		.titles .text {
			font-size: 20px;
			font-weight: bold;
		}


		hr {
			margin-bottom: 30rpx;
		}

		.titles .dzj {
			padding: 20rpx;
			font-size: 20px;
		}



		.files {

			.file {
				height: auto;
				padding: 10rpx 20rpx;
				font-variant-east-asian: normal;
				overflow: hidden;
				text-overflow: ellipsis;

			}
		}
	}
</style>