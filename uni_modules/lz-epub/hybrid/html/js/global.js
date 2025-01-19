//传过来的全局参数
let Global_params=null,timeout = null;

//获取url中的参数
function GLOBAL_getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return r[2];
	return null; //返回参数值
}
//扩展mui.showLoading
(function($, window) {
	//显示加载框
	$.showLoading = function(message, type) {
		if ($.os.plus && type !== 'div') {
			$.plusReady(function() {
				plus.nativeUI.showWaiting(message);
			});
		} else {
			var html = '';
			html += '<i class="mui-spinner mui-spinner-white"></i>';
			html += '<p class="text">' + (message || "数据加载中") + '</p>';

			//遮罩层
			var mask = document.getElementsByClassName("mui-show-loading-mask");
			if (mask.length == 0) {
				mask = document.createElement('div');
				mask.classList.add("mui-show-loading-mask");
				document.body.appendChild(mask);
				mask.addEventListener("touchmove", function(e) {
					e.stopPropagation();
					e.preventDefault();
				});
			} else {
				mask[0].classList.remove("mui-show-loading-mask-hidden");
			}
			//加载框
			var toast = document.getElementsByClassName("mui-show-loading");
			if (toast.length == 0) {
				toast = document.createElement('div');
				toast.classList.add("mui-show-loading");
				toast.classList.add('loading-visible');
				document.body.appendChild(toast);
				toast.innerHTML = html;
				toast.addEventListener("touchmove", function(e) {
					e.stopPropagation();
					e.preventDefault();
				});
			} else {
				toast[0].innerHTML = html;
				toast[0].classList.add("loading-visible");
			}
		}
	};

	//隐藏加载框
	$.hideLoading = function(callback) {
		if ($.os.plus) {
			$.plusReady(function() {
				plus.nativeUI.closeWaiting();
			});
		}
		var mask = document.getElementsByClassName("mui-show-loading-mask");
		var toast = document.getElementsByClassName("mui-show-loading");
		if (mask.length > 0) {
			mask[0].classList.add("mui-show-loading-mask-hidden");
		}
		if (toast.length > 0) {
			toast[0].classList.remove("loading-visible");
			callback && callback();
		}
	}
})(mui, window);


let $lizhao = {
	post: function(url, data, headers = {}) {
		return new Promise((resolve, reject) => {
			mui.ajax(Global_params.baseUrl+url, {
				data,
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 20000, //超时时间设置为10秒；
				headers: {
					'Content-Type': 'application/json',
					'us': 'app',
					'Authorization':Global_params.token,
					...headers
				},
				success: function(res) {
					resolve(res)
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					console.log(type);
					reject(type)
				}
			});
		});
	},
	get: function(url, data, headers = {}) {
		return new Promise((resolve, reject) => {
			console.log(Global_params.baseUrl+url);
			mui.ajax(Global_params.baseUrl+url, {
				data,
				dataType: 'json', //服务器返回json格式数据
				type: 'get', //HTTP请求类型
				timeout: 20000, //超时时间设置为10秒；
				headers: {
					// 'Content-Type': 'application/json',
					'us': 'app',
					'Authorization':Global_params.token,
					...headers
				},
				success: function(res) {
					resolve(res)
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					console.log(type);
					reject(type)
				}
			});
		});
	},
	timeFormat:function(dateTime , fmt= 'yyyy-mm-dd hh:MM:ss') {
		// 如果为null,则格式化当前时间
		if (!dateTime){ dateTime = Number(new Date())}
		// 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
		if (dateTime.toString().length == 10){ dateTime *= 1000;}
		let date = new Date(dateTime);
		let ret;
		let opt = {
			"y+": date.getFullYear().toString(), // 年
			"m+": (date.getMonth() + 1).toString(), // 月
			"d+": date.getDate().toString(), // 日
			"h+": date.getHours().toString(), // 时
			"M+": date.getMinutes().toString(), // 分
			"s+": date.getSeconds().toString() // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		};
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(fmt);
			if (ret) {
				fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			};
		};
		return fmt;
	},
	base64:{
		base64ToArrayBuffer:function(base64){
			var binary_string = window.atob(base64);//解码使用base64编码的字符串
			var len = binary_string.length;			//获取长度
			var bytes = new Uint8Array(len);
			for (var i = 0; i < len; i++) {
				bytes[i] = binary_string.charCodeAt(i);
			}
			return bytes.buffer;
		}
	},
	debounce:function(func, wait = 500, immediate = false) {
		// 清除定时器
		if (timeout !== null) clearTimeout(timeout);
		// 立即执行，此类情况一般用不到
		if (immediate) {
			var callNow = !timeout;
			timeout = setTimeout(function() {
				timeout = null;
			}, wait);
			if (callNow) typeof func === 'function' && func();
		} else {
			// 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
			timeout = setTimeout(function() {
				typeof func === 'function' && func();
			}, wait);
		}
	},
	/**
	 * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
	 * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
	 * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
	 * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
	 * v-for的时候,推荐使用后端返回的id而不是循环的index
	 * @param {Number} len uuid的长度
	 * @param {Boolean} firstU 将返回的首字母置为"u"
	 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
	 */
	guid:function(len = 32, firstU = true, radix = null) {
		let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		let uuid = [];
		radix = radix || chars.length;
	
		if (len) {
			// 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
			for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
		} else {
			let r;
			// rfc4122标准要求返回的uuid中,某些位为固定的字符
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';
	
			for (let i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random() * 16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}
		// 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
		if (firstU) {
			uuid.shift();
			return 'u' + uuid.join('');
		} else {
			return uuid.join('');
		}
	}
	

}
