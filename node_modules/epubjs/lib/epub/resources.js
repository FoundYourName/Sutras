import _Promise from "babel-runtime/core-js/promise";
import _Object$keys from "babel-runtime/core-js/object/keys";
import _typeof from "babel-runtime/helpers/typeof";
import _Object$assign from "babel-runtime/core-js/object/assign";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import { substitute } from "../utils/replacements";
import { createBlob, createBase64Url, createBlobUrl, blob2base64, revokeBlobUrl, defer } from "../utils/core";
import Url from "../utils/url";
import mime from "../../libs/mime/mime";
import Path from "../utils/path";
// import path from "path-webpack";

/**
 * Handles Package Resources
 * @class
 * @param {object} resources
 * @param {object} [options]
 * @param {string} [options.replacements="base64"]
 * @param {Archive} [options.archive]
 * @param {method} [options.load]
 * @param {string} [options.url]
 * @param {string} [options.inject]
 */

var Resources = function () {
	function Resources(resources, options) {
		_classCallCheck(this, Resources);

		this.settings = {
			replacements: options && options.replacements || "blobUrl",
			archive: options && options.archive,
			load: options && options.load,
			url: options && options.url,
			// path: (options && options.path),
			inject: options && options.inject || {}
		};

		this.urlCache = {};

		this.resources = _Object$assign({}, resources);

		this.resourcesByHref = {};

		this.ids = [];
		this.html = [];
		this.assets = [];
		this.css = [];

		if (typeof this.settings.url === "string") {
			this.url = new Url(this.settings.url);
			this.path = new Path(this.settings.url);
		} else if (_typeof(this.settings.url) === "object") {
			this.url = this.settings.url;
			this.path = new Path(this.url.toString());
		} else {
			this.path = new Path("/");
		}

		if (resources) {
			this.split(resources);
		}
	}

	/**
  * Split resources by type
  * @private
  */


	_createClass(Resources, [{
		key: "split",
		value: function split(resources) {
			var _this = this;

			var keys = _Object$keys(resources);

			// HTML
			var html = keys.filter(function (key) {
				var item = resources[key];
				if (item.type === "application/xhtml+xml" || item.type === "text/html") {
					return true;
				}
			});

			// Exclude HTML & CSS
			var assets = keys.filter(function (key) {
				var item = resources[key];
				if (item.type !== "application/xhtml+xml" && item.type !== "text/html" && item.type !== "text/css") {
					return true;
				}
			});

			// Only CSS
			var css = keys.filter(function (key) {
				var item = resources[key];
				if (item.type === "text/css") {
					return true;
				}
			});

			keys.forEach(function (id) {
				var resource = resources[id];
				// set ID from keys
				resource.id = id;
				if (!resource.source) {
					resource.source = resource.href;
				}
				_this.resourcesByHref[resource.href] = id;
			});

			this.ids = keys;
			this.html = html;
			this.assets = assets;
			this.css = css;

			return {
				html: html,
				assets: assets,
				css: css
			};
		}

		/**
   * Save all resources into the cache
   * @return {array}
   */

	}, {
		key: "cache",
		value: function cache(key, origin) {
			var _this2 = this;

			if (typeof caches === "undefined") {
				return new _Promise(function (resolve, reject) {
					resolve([]);
				});
			}

			this.cacheKey = key;

			var originUrl = this.url;
			if (typeof origin === "string") {
				originUrl = new Url(origin);
			}

			this.ids.map(function (resourceId) {
				var resource = _this2.resources[resourceId];
				var href = resource.source || resource.href;
				var isAbsolute = href.indexOf("://") > -1;
				var path = isAbsolute ? href : _this2.path.resolve(href);
				var url = void 0;

				if (!isAbsolute && originUrl) {
					url = originUrl.resolve(href);
				} else {
					var originalUrl = new Url(href, origin);
					var base = encodeURIComponent(originalUrl.origin);
					path = path.replace(originalUrl.origin, "");

					url = new Url(key + base + path, location.href).toString();
				}

				_this2.resources[resourceId].path = path;
				_this2.resources[resourceId].cached = url;
				_this2.urlCache[path] = url;
			});

			return caches.open(key).then(function (cache) {
				var urls = _this2.ids.map(function (resourceId) {
					var resource = _this2.resources[resourceId];
					var url = resource.cached;
					var path = resource.path;

					var mimeType = mime.lookup(path);

					return cache.match(url).then(function (result) {
						if (!result) {
							var loaded = void 0;
							if (resource.type === "application/xhtml+xml" || resource.type === "text/html") {
								loaded = _this2.settings.load(path, "text").then(function (text) {

									if (_this2.settings.inject.identifier) {
										text = _this2.injectIdentifier(text, _this2.settings.inject.identifier);
									}

									if (_this2.settings.inject.script) {
										text = _this2.injectScript(text, _this2.settings.inject.script);
									}

									if (_this2.settings.inject.stylesheet) {
										text = _this2.injectStylesheet(text, _this2.settings.inject.script);
									}

									return createBlob(text, resource.type);
								});
							} else {
								loaded = _this2.settings.load(path, "blob");
							}

							return loaded.then(function (blob) {
								var response = new Response(blob, {
									"status": 200,
									"headers": { 'Content-Type': mimeType }
								});
								_this2.urlCache[path] = url;
								return cache.put(url, response);
							}, function (err) {
								console.warn("Missing Resource", path);
								return path;
							}).then(function () {
								return url;
							});
						} else {
							_this2.urlCache[path] = url;
							return url;
						}
					});
				});

				return _Promise.all(urls);
			});
		}

		/**
   * Create blob urls for all the assets
   * @return {Promise}         returns replacement urls
   */

	}, {
		key: "replacements",
		value: function replacements() {
			var _this3 = this;

			if (this.settings.replacements === "none") {
				return new _Promise(function (resolve) {
					resolve([]);
				}.bind(this));
			}

			var replacements = [];

			// Replace all the assets
			var assets = this.assets.map(function (resourceId) {
				var url = _this3.replacementUrl(resourceId);
				replacements.push(url);
				return url;
			});

			// Re-write and replace css files
			var css = _Promise.all(assets).then(function () {
				return _this3.css.map(function (resourceId) {
					var url = _this3.replacementCss(resourceId);
					replacements.push(url);
					return url;
				});
			});

			// Re-write and replace htmls files
			var html = css.then(function () {
				return _this3.html.map(function (resourceId) {
					var url = _this3.replacementHtml(resourceId);
					replacements.push(url);
					return url;
				});
			});

			return html.then(function () {
				return _Promise.all(replacements);
			}).then(function (urls) {
				return urls;
			});
		}

		/**
   * Create a replacement url from a resource
   * @param  {number} resourceId
   * @return {promise}
   */

	}, {
		key: "replacementUrl",
		value: function replacementUrl(resourceId) {
			var _this4 = this;

			var resource = this.resources[resourceId];
			var absolute = this.url.resolve(resource.href);
			var createUrl = void 0;

			if (this.settings.replacements === "base64") {
				createUrl = this.base64UrlFrom(absolute);
			} else {
				createUrl = this.blobUrlFrom(absolute);
			}

			return createUrl.then(function (url) {
				_this4.resources[resourceId].replacement = url;
				_this4.urlCache[absolute] = url;
				return url;
			}).catch(function (err) {
				console.error(err);
				return null;
			});
		}

		/**
   * Replace URLs in CSS resources
   * @private
   * @param  {number} resourceId
   * @return {Promise}
   */

	}, {
		key: "replacementCss",
		value: function replacementCss(resourceId) {
			var _this5 = this;

			var newUrl = void 0;
			var resource = this.resources[resourceId];
			var href = resource.href;

			if (this.path.isAbsolute(href)) {
				return new _Promise(function (resolve) {
					resolve(href);
				});
			}

			var resolved = this.path.resolve(href);
			var fullpath = new Path(resolved);
			// Get the text of the css file from the archive
			var textResponse;

			if (this.settings.archive) {
				textResponse = this.settings.archive.getText(resolved);
			} else {
				textResponse = this.settings.load(resolved, "text");
			}

			return textResponse.then(function (text) {
				var replacements = {};

				// Get asset links relative to css file
				_this5.ids.forEach(function (resourceId) {
					var resource = _this5.resources[resourceId];
					if (!resource.replacement) {
						return;
					}

					var assetHref = resource.href;
					var resolved = _this5.path.resolve(assetHref);
					var relative = fullpath.relative(resolved);

					replacements[relative] = resource.replacement;
				});

				// Replacements in the css text
				text = _this5.substitute(text, replacements);

				// Get the new url
				if (_this5.settings.replacements === "base64") {
					newUrl = createBase64Url(text, "text/css");
				} else {
					newUrl = createBlobUrl(text, "text/css");
				}

				return newUrl;
			}, function (err) {
				// handle response errors
				return new _Promise(function (resolve) {
					resolve();
				});
			}).then(function (url) {
				if (url) {
					_this5.resources[resourceId].replacement = url;
					_this5.urlCache[fullpath] = url;
				}
				return url;
			});
		}

		/**
   * Replace URLs in HTML resources
   * @private
   * @param  {number} resourceId
   * @return {Promise}
   */

	}, {
		key: "replacementHtml",
		value: function replacementHtml(resourceId) {
			var _this6 = this;

			var newUrl = void 0;
			var resource = this.resources[resourceId];
			var href = resource.href;
			var mimeType = mime.lookup(href);

			if (this.path.isAbsolute(href)) {
				return new _Promise(function (resolve) {
					resolve(href);
				});
			}

			var resolved = this.path.resolve(href);
			var fullpath = new Path(resolved);
			// Get the text of the css file from the archive
			var textResponse;

			if (this.settings.archive) {
				textResponse = this.settings.archive.getText(resolved);
			} else {
				textResponse = this.settings.load(resolved, "text");
			}

			return textResponse.then(function (text) {
				var replacements = {};

				// Get asset links relative to html file
				_this6.ids.forEach(function (resourceId) {
					var resource = _this6.resources[resourceId];
					if (!resource.replacement) {
						return;
					}

					var assetHref = resource.href;
					var resolved = _this6.path.resolve(assetHref);
					var relative = fullpath.relative(resolved);

					replacements[relative] = resource.replacement;
				});

				// Replacements in the css text
				text = _this6.substitute(text, replacements);

				// Inject
				if (_this6.settings.inject.base) {
					text = _this6.injectBase(text, _this6.settings.inject.base);
				}

				if (_this6.settings.inject.identifier) {
					text = _this6.injectIdentifier(text, _this6.settings.inject.identifier);
				}

				if (_this6.settings.inject.script) {
					text = _this6.injectScript(text, _this6.settings.inject.script);
				}

				if (_this6.settings.inject.stylesheet) {
					text = _this6.injectStylesheet(text, _this6.settings.inject.script);
				}

				// Get the new url
				if (_this6.settings.replacements === "base64") {
					newUrl = createBase64Url(text, mimeType);
				} else {
					newUrl = createBlobUrl(text, mimeType);
				}

				return newUrl;
			}, function (err) {
				// handle response errors
				return new _Promise(function (resolve) {
					resolve();
				});
			}).then(function (url) {
				if (url) {
					_this6.resources[resourceId].replacement = url;
					_this6.urlCache[fullpath] = url;
				}
				return url;
			});
		}

		/**
   * Create a blob url from a resource absolute url
   * @param  {string} url
   * @return {string}          the resolved path string
   */

	}, {
		key: "blobUrlFrom",
		value: function blobUrlFrom(url) {
			var parsedUrl = new Url(url);
			var mimeType = mime.lookup(parsedUrl.filename);

			if (this.settings.archive) {
				return this.settings.archive.createUrl(url, { "base64": false });
			} else {
				return this.settings.load(url, "blob").then(function (blob) {
					return createBlobUrl(blob, mimeType);
				});
			}
		}

		/**
   * Create a base64 encoded url from a resource absolute url
   * @param  {string} url
   * @return {string}          the resolved path string
   */

	}, {
		key: "base64UrlFrom",
		value: function base64UrlFrom(url) {
			var parsedUrl = new Url(url);
			var mimeType = mime.lookup(parsedUrl.filename);

			if (this.settings.archive) {
				return this.settings.archive.createUrl(url, { "base64": true });
			} else {
				return this.settings.load(url, "blob").then(function (blob) {
					return blob2base64(blob);
				}).then(function (blob) {
					return createBase64Url(blob, mimeType);
				});
			}
		}

		/**
   * Substitute urls in a resource
   */

	}, {
		key: "substitute",
		value: function substitute(text, resources) {
			var query = _Object$keys(resources).map(function (i) {
				return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
			}).join("|");

			var reg = new RegExp("(" + query + ")", "g");

			return text.replace(reg, function (match) {
				return resources[match];
			});
		}
	}, {
		key: "injectStylesheet",
		value: function injectStylesheet(text, src) {
			var reg = /<[ ]*\/head[ ]*>/;
			var toInject = "<link href=\"" + src + "\" rel=\"stylesheet\" />";

			return text.replace(reg, toInject + "$&");
		}
	}, {
		key: "injectScript",
		value: function injectScript(text, src) {
			var reg = /<[ ]*\/head[ ]*>/;
			var toInject = "<script src=\"" + src + "\" type=\"text/javascript\"></script>";

			return text.replace(reg, toInject + "$&");
		}
	}, {
		key: "injectIdentifier",
		value: function injectIdentifier(text, identifier) {
			var reg = /<[ ]*\/head[ ]*>/;
			var toInject = "<meta name=\"dc.relation.ispartof\" content=\"" + identifier + "\" />";

			return text.replace(reg, toInject + "$&");
		}
	}, {
		key: "injectBase",
		value: function injectBase(text, url) {
			var reg = /<[ ]*head[ ]*>/;
			var absolute = url.indexOf("://") > -1;

			// Fix for Safari crashing if the url doesn't have an origin
			if (!absolute && typeof window !== "undefined" && window.location) {
				var parts = window.location.href.split("/");
				var directory = "";

				parts.pop();
				directory = parts.join("/");

				url = directory + url;
			}

			var toInject = "<base href=\"" + url + "\" />";

			return text.replace(reg, "$&" + toInject);
		}
	}, {
		key: "origin",
		value: function origin(url) {
			this.url = new Url(url);
		}

		/**
   * Resolve a path to its absolute url (or replaced url)
   * @param  {string} path
   * @return {string}          the resolved path string
   */

	}, {
		key: "resolve",
		value: function resolve(path) {
			if (!path) {
				return;
			}
			var isAbsolute = path.indexOf("://") > -1;
			var href = isAbsolute ? path : this.path.resolve(path);
			var resolved = href;

			var search = href.split("?");
			var anchor = href.split("#");
			var base = href;
			if (search.length > 1) {
				base = search[0];
			} else if (anchor.length > 1) {
				base = anchor[0];
			}
			var cached = this.urlCache[base];

			if (cached) {
				resolved = cached;

				// Add query strings back
				if (search.length > 1) {
					resolved += "?" + search[1];
				} else if (anchor.length > 1) {
					resolved += "#" + anchor[1];
				}
			} else if (this.url) {
				resolved = this.url.resolve(path);
			} else {
				resolved = path;
			}

			return resolved;
		}

		/**
   * Export an Array of all resources
   * @return {array}
   */

	}, {
		key: "toArray",
		value: function toArray() {
			var _this7 = this;

			return this.ids.map(function (key) {
				var item = _this7.resources[key];
				var type = item.type,
				    properties = item.properties,
				    id = item.id;

				var source = item.href;

				var href = item.cached || item.replacement || _this7.url && _this7.url.resolve(item.href) || item.href;

				return {
					href: href,
					source: source,
					type: type,
					properties: properties,
					id: id
				};
			});
		}
	}, {
		key: "forEach",
		value: function forEach(func) {
			var _this8 = this;

			return this.ids.forEach(function (id) {
				var r = _this8.resources[id];
				r.id = key;
				func(r);
			});
		}
	}, {
		key: "map",
		value: function map(func) {
			var _this9 = this;

			return this.ids.map(function (id) {
				var r = _this9.resources[id];
				r.id = key;
				return func(r);
			});
		}
	}, {
		key: "filter",
		value: function filter(func) {
			var _this10 = this;

			return this.ids.filter(function (id) {
				var r = _this10.resources[id];
				r.id = key;
				return func(r);
			});
		}
	}, {
		key: "get",
		value: function get(what) {
			if (what in this.resources) {
				return this.resources[what];
			} else if (what in this.resourcesByHref) {
				var id = this.resourcesByHref[what];
				return this.resources[id];
			}
		}
	}, {
		key: "revokeBlobUrls",
		value: function revokeBlobUrls() {
			var _this11 = this;

			this.ids.forEach(function (id) {
				var r = _this11.resources[id];
				if (r.replacement) {
					revokeBlobUrl(r.replacement);
				}
			});
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.revokeBlobUrls();

			this.settings = undefined;
			this.manifest = undefined;

			this.html = undefined;
			this.assets = undefined;
			this.css = undefined;

			this.urls = undefined;
			this.cssUrls = undefined;
		}
	}]);

	return Resources;
}();

export default Resources;