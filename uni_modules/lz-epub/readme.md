## 说明

lz-epub，是集web端epub阅读器到uniapp上的插件

# 特性

- 超高的性能，堪比原生
- 更开放的自定义api

## 链接

|平台		|体验链接																																																								|体验账号	|密码	|
|:-----		|:-------																																																								|:-----		|-----	|
|H5			|[lz-epub](https://static-76e84fbd-eabd-4327-8282-9419ae18e17c.bspapp.com/epub/#/)	|-----		|-----	|
|APP		|[lz-epub](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76e84fbd-eabd-4327-8282-9419ae18e17c/0edc133d-66d3-4194-822e-d2f74aca1be3.apk)																										|-----		|-----	|
|官方文档	|[epubjs](http://epubjs.org/documentation/0.3/ )																																														|--			|--		|

##想要 更加完美的电子阅读，可下载我的另一个插件，支持多端，支持云开发
[lzbook小说插件链接](https://ext.dcloud.net.cn/plugin?id=6381 )	

## 使用
	```
	1.在main.js中引入插件
	import lizhao from 'uni_modules/lz-epub';
	Vue.use(lizhao)
	```

```
2.在需要页面中使用,打开epub格式的电子书，最好在新页面中调用，不懂的可以下载示例代码
this.$lizhao.epub.show({
	url:xxxxxxx.epub
})

```





