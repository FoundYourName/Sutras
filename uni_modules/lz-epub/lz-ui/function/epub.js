let dom=null
/**
 * @param url //电子书的地址 xxxx.epub
 **/
function show({url}){
	let option={
		url
	}
	let styles = {
		width: '100%',
		height: '100%',
		background: 'transparent' 
	};
	let extras = {
		debug: true,
	}
	dom = plus.webview.create('/uni_modules/lz-epub/hybrid/html/epub.html', 'animate', styles,extras);
	console.log(option);
	// 调用 webview 内部逻辑,传递参数
	dom.evalJS(`vm.show('${JSON.stringify(option)}')`);
	//显示在当前实例下
	var pages = getCurrentPages();
	var page = pages[pages.length - 1];
	var currentWebview = page.$getAppWebview();; //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
	currentWebview.append(dom);//一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
	//监听回调事件
	// addEventListenerEmit();
}
//关闭遮罩动画
function close(){
	plus.webview.close('animate');
}
//监听回调事件
function addEventListenerEmit(){
	dom.overrideUrlLoading({ mode: 'reject' }, e => {
		let {retype,data} = getRequest(e.url);
		console.log(retype);
		if(retype=='close'){
			close()
		}
	})
}
function getRequest(url) {
	let theRequest = new Object()
	let index = url.indexOf('?')
	if (index != -1) {
		let str = url.substring(index + 1)
		let strs = str.split('&')
		for (let i = 0; i < strs.length; i++) {
			theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
		}
	}
	return theRequest
}

export default {
	show,
	close
}