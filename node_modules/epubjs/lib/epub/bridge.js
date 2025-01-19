import _JSON$stringify from "babel-runtime/core-js/json/stringify";
import _Promise from "babel-runtime/core-js/promise";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import { extend, defer } from "../utils/core";
import { EVENTS } from "../utils/constants";
import Book from "../book/book";
import Epub from "./epub";

var DEV = false;
/**
 * Book proxy
 */

var Bridge = function () {
	function Bridge(options) {
		var _this = this;

		_classCallCheck(this, Bridge);

		this.waiting = {};

		this.ready = new _Promise(function (resolve, reject) {
			_this.resolveReady = resolve;
			_this.rejectReady = reject;
		});

		if (options && options.worker) {
			this.worker = new Worker(options.worker);
			this.worker.addEventListener("message", this.listen.bind(this));

			this.ask("init", [options]);
		}
	}

	_createClass(Bridge, [{
		key: "ask",
		value: function ask(method, args) {
			var asking = new defer();
			var promiseId = asking.id;

			if (this.worker) {
				var str = _JSON$stringify({
					method: method,
					args: args,
					promise: promiseId
				});

				if (method in this.waiting) {
					this.waiting[promiseId].push(asking);
				} else {
					this.waiting[promiseId] = [asking];
				}

				DEV && console.log("[ask]", str);
				this.worker.postMessage(str);
			} else {
				asking.resolve(this.epub[method].apply(this.epub, args));
			}

			return asking.promise;
		}
	}, {
		key: "listen",
		value: function listen(event) {
			var data = event.data;

			if (typeof data === "string") {
				data = JSON.parse(data);
			}

			DEV && console.log("[listen]", data);

			// Promises
			if (data.promise && data.promise in this.waiting) {
				var p = this.waiting[data.promise].shift();
				if (p) {
					p.resolve(data.value);
				}
			}

			// Events
			if (data.eventName) {
				switch (data.eventName) {
					case "ready":
						this.manifest = event.data.value;
						this.book = new Book(this.manifest);
						this.resolveReady(this.book);
						break;
					case "failed":
						this.rejectReady(event.data.error);
						break;
				}
			}
		}
	}, {
		key: "open",
		value: function open(url) {
			var _this2 = this;

			return this.ask("open", [url]).then(function (result) {
				if (typeof result === "string") {
					_this2.manifest = JSON.parse(result);
					_this2.book = new Book(_this2.manifest);
				} else {
					_this2.book = result;
				}

				_this2.resolveReady(_this2.book);
				return _this2.book;
			});
		}
	}, {
		key: "key",
		value: function key(identifier) {
			return this.ask("key", [identifier]);
		}
	}, {
		key: "replacements",
		value: function replacements() {
			var _this3 = this;

			return this.ask("replacements").then(function (manifest) {
				_this3.manifest = manifest;
				_this3.book = new Book(_this3.manifest);
				return _this3.book;
			});
		}
	}, {
		key: "cache",
		value: function cache() {
			var _this4 = this;

			return this.ask("cache").then(function (manifest) {
				_this4.manifest = manifest;
				_this4.book = new Book(_this4.manifest);
				return _this4.book;
			});
		}
	}, {
		key: "locations",
		value: function locations() {
			var _this5 = this;

			return this.ask("replacements").then(function (manifest) {
				_this5.manifest = manifest;
				_this5.book = new Book(_this5.manifest);
				return _this5.book;
			});
		}
	}, {
		key: "generateLocations",
		value: function generateLocations(breakPoint) {
			var _this6 = this;

			return this.ask("generateLocations", [breakPoint]).then(function (locations) {
				if (!_this6.book) {
					return;
				}
				_this6.book.locations = locations;
				return locations;
			});
		}
	}, {
		key: "loadLocations",
		value: function loadLocations(json) {
			var locations = void 0;
			if (!this.book) {
				return;
			}

			if (typeof locations === "string") {
				locations = JSON.parse(json);
			} else {
				locations = json;
			}

			this.book.locations = locations;
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.ask("destroy");
			this.worker.removeEventListener("message", this.listen);
		}
	}]);

	return Bridge;
}();

export default Bridge;