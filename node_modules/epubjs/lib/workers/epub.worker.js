import _JSON$stringify from "babel-runtime/core-js/json/stringify";
import _Promise from "babel-runtime/core-js/promise";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import Epub from "../epub/epub";
import { EVENTS } from "../utils/constants";
import JSZip from "jszip/dist/jszip";
import mime from "../../libs/mime/mime";

var DEV = false;

var CACHES = {
	resources: 'epubjs-resources'
};

var EpubWorker = function () {
	function EpubWorker() {
		_classCallCheck(this, EpubWorker);

		self.addEventListener("message", this.onMessage.bind(this));

		self.addEventListener('install', this.onInstall.bind(this));
		self.addEventListener('fetch', this.onFetch.bind(this));
		self.addEventListener('activate', this.onActivate.bind(this));

		this.epub = undefined;
	}

	_createClass(EpubWorker, [{
		key: "onInstall",
		value: function onInstall(event) {
			DEV && console.log('[install] Kicking off service worker registration!');
			event.waitUntil(self.skipWaiting());
		}
	}, {
		key: "onActivate",
		value: function onActivate(event) {
			// Claim the service work for this client, forcing `controllerchange` event
			DEV && console.log('[activate] Claiming this service worker!');

			event.waitUntil(clients.claim().then(function () {
				// After the activation and claiming is complete, send a message to each of the controlled
				// pages letting it know that it's active.
				// This will trigger navigator.serviceWorker.onmessage in each client.
				return self.clients.matchAll().then(function (clients) {
					return _Promise.all(clients.map(function (client) {
						return client.postMessage({ msg: 'active' });
					}));
				});
			}));
		}
	}, {
		key: "onFetch",
		value: function onFetch(event) {
			var _this = this;

			event.respondWith(caches.match(event.request).then(function (response) {
				// Cache hit - return the response from the cached version
				if (response) {
					DEV && console.log('[fetch] Returning from Service Worker cache: ', event.request.url, response.ok);
					return response;
				}

				var fromZip = event.request.url.indexOf("epubjs-zip/");
				if (fromZip > -1) {
					return _this.loadFromZip(event.request);
				}

				var fromProxy = event.request.url.indexOf("epubjs-proxy/");
				if (fromProxy > -1) {
					return _this.loadFromProxy(event.request);
				}

				// Not in cache - return the result from the live server
				DEV && console.log('[fetch] Returning from server: ', event.request.url);
				return fetch(event.request);
			}));
		}
	}, {
		key: "onMessage",
		value: function onMessage(event) {
			var _this2 = this;

			var data = event.data;

			if (typeof data === "string") {
				data = JSON.parse(data);
			}

			DEV && console.log("[worker]", data);

			switch (data.method) {
				case "init":
					this.init(data);
					break;
				case "destroy":
					this.epub && this.epub.destroy();
					self.close();
					break;
				case "add":
					this.add(event);
					break;
				case "open":
					if (this.epub) {
						this.epub.open.apply(this.epub, data.args).then(function (book) {
							var manifest = book.toJSON();
							_this2.respond(data.method, manifest, data.promise);
						});
					}
					break;
				default:
					if (this.epub) {
						var r = this.epub[data.method].apply(this.epub, data.args);
						_Promise.resolve(r).then(function (result) {
							if (typeof result.toJSON === "function") {
								result = result.toJSON();
							}
							_this2.respond(data.method, result, data.promise);
						});
					}
			}
		}
	}, {
		key: "respond",
		value: function respond(method, result, promise, asJson) {
			var response = {
				method: method,
				promise: promise,
				value: result
			};

			if (asJson) {
				response = _JSON$stringify(response);
			}

			self.postMessage(response);
		}
	}, {
		key: "init",
		value: function init(data) {
			var options = void 0,
			    url = void 0;

			if (data.args.length > 1) {
				url = data.args[0];
				options = data.args[1];
			} else {
				options = data.args[0];
			}

			if (typeof options.cache === "undefined") {
				options.cache = true;
			}

			if (url) {
				this.epub = new Epub(url, options);
			} else {
				this.epub = new Epub(options);
			}

			this.epub.on(EVENTS.BOOK.READY, function (manifest) {
				self.postMessage({ eventName: "ready", value: manifest });
			});
			this.epub.on(EVENTS.BOOK.OPEN_FAILED, function (error) {
				self.postMessage({ eventName: "failed", error: error.message });
			});
		}
	}, {
		key: "add",
		value: function add(event) {
			var resources = event.data.resources;
			var key = event.data.key || CACHES['resources'];
			if (!key in CACHES) {
				CACHES[key] = key;
			}
			// Open the given cache with the keys
			var added = caches.open(CACHES[key]).then(function (cache) {
				// Process each item in the resources
				var mapped = resources.map(function (item) {
					var href = item.href;
					// Check if the href is already cached
					return cache.match(href).then(function (response) {
						if (!response) {
							// If not found, fetch the resource and store it
							var request = new Request(href, { mode: 'no-cors' });
							return fetch(request).then(function (response) {
								if (response.ok) {
									return cache.put(href, response);
								}
							});
						}
					});
				});
				return _Promise.all(mapped);
			});

			event.waitUntil(added);
		}
	}, {
		key: "loadFromZip",
		value: function loadFromZip(originalRequest) {
			var _this3 = this;

			var divider = "epubjs-zip/";
			var start = originalRequest.url.indexOf(divider) + divider.length;
			var chunks = originalRequest.url.substring(start).split("/");
			var cacheName = chunks.shift();
			var url = decodeURIComponent(cacheName);
			var path = decodeURIComponent(chunks.join("/"));
			var mimeType = "text/plain";
			var entry = void 0;

			if (this.zip) {
				entry = this.zip.file(path);
				mimeType = mime.lookup(entry.name);

				return entry.async("arraybuffer").then(function (file) {
					var zipResponse = new Response(file, {
						"status": 200,
						"headers": { 'Content-Type': mimeType }
					});
					var zipResponseClone = zipResponse.clone();
					caches.open(cacheName).then(function (cache) {
						return cache.put(originalRequest.url, zipResponseClone);
					}).then(function () {
						console.log("from cached zip");
					});
					return zipResponse;
				});
			} else {
				this.zip = new JSZip();
				return fetch(url).then(function (epubResponse) {
					return epubResponse.arrayBuffer();
				}).then(function (buffer) {
					return _this3.zip.loadAsync(buffer);
				}).then(function () {
					entry = _this3.zip.file(path);
					mimeType = mime.lookup(entry.name);
					return entry.async("arraybuffer");
				}).then(function (file) {
					var zipResponse = new Response(file, {
						"status": 200,
						"headers": { 'Content-Type': mimeType }
					});
					var zipResponseClone = zipResponse.clone();
					caches.open(cacheName).then(function (cache) {
						return cache.put(originalRequest.url, zipResponseClone);
					}).then(function () {
						console.log("loaded from zip & cached");
					});
					return zipResponse;
				});
			}
		}
	}, {
		key: "loadFromProxy",
		value: function loadFromProxy(originalRequest) {
			var divider = "epubjs-proxy/";
			var start = originalRequest.url.indexOf(divider) + divider.length;
			var chunks = originalRequest.url.substring(start).split("/");

			var cacheName = chunks.shift();
			var url = decodeURIComponent(cacheName);
			var path = decodeURIComponent(chunks.join("/"));
			var mimeType = mime.lookup(chunks[chunks.length - 1]);
			var entry = void 0;

			return fetch(url + "/" + path).then(function (fromProxy) {
				return fromProxy.arrayBuffer();
			}).then(function (file) {
				var proxyResponse = new Response(file, {
					"status": 200,
					"headers": { 'Content-Type': mimeType }
				});
				var proxyResponseClone = proxyResponse.clone();
				caches.open(cacheName).then(function (cache) {
					return cache.put(originalRequest.url, proxyResponseClone);
				});
				return proxyResponse;
			});
		}
	}]);

	return EpubWorker;
}();

new EpubWorker();