
import epub from './function/epub'
const $lizhao = {
	//#ifndef H5
	epub,
	//#endif
}
uni.$lizhao = $lizhao
const install = Vue => {
	// #ifndef APP-NVUE
	Vue.prototype.$lizhao = $lizhao
	// #endif
}

export default {
	install
}