import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import { defer } from "../utils/core";
import EpubCFI from "../utils/epubcfi";
import Hook from "../utils/hook";
import { sprint, createBase64Url, createBlobUrl, blob2base64, revokeBlobUrl } from "../utils/core";
import { replaceBase } from "../utils/replacements";
import Request from "../utils/request";
import xmldom from "xmldom";

/**
 * Represents a Section of the Book
 *
 * In most books this is equivelent to a Chapter
 * @param {object} item  The spine item representing the section
 * @param {object} hooks hooks for serialize and content
 * @param {object} settings
 * @param {object} settings.replacements
 */

var Section = function () {
	function Section(item, hooks, settings) {
		_classCallCheck(this, Section);

		this.item = item;
		this.idref = item.idref;
		this.linear = item.linear === "yes";
		this.properties = item.properties;
		this.index = item.index;
		this.href = item.href;
		this.source = item.source;
		this.canonical = item.canonical;
		this.type = item.type;
		this.next = item.next;
		this.prev = item.prev;

		this.cfiBase = item.cfiBase;

		if (hooks) {
			this.hooks = hooks;
		} else {
			this.hooks = {};
			this.hooks.serialize = new Hook(this);
			this.hooks.content = new Hook(this);
		}

		this.document = undefined;
		this.contents = undefined;
		this.output = undefined;

		this.originalHref = undefined;

		this.settings = settings || {};
	}

	/**
  * Load the section from its url
  * @param  {method} _request a request method to use for loading
  * @return {document} a promise with the xml document
  */


	_createClass(Section, [{
		key: "load",
		value: function load(_request) {
			var request = _request || this.request || Request;
			var loading = new defer();
			var loaded = loading.promise;

			if (this.contents) {
				loading.resolve(this.contents);
			} else {
				var type = this.type === "application/xhtml+xml" ? "xhtml" : "html";
				request(this.href, type).then(function (xml) {
					this.document = xml;
					this.contents = xml.documentElement;

					return this.hooks.content.trigger(this.document, this);
				}.bind(this)).then(function () {
					loading.resolve(this.contents);
				}.bind(this)).catch(function (error) {
					loading.reject(error);
				});
			}

			return loaded;
		}

		/**
   * Adds a base tag for resolving urls in the section
   * @private
   */

	}, {
		key: "base",
		value: function base() {
			return replaceBase(this.document, this);
		}

		/**
   * Render the contents of a section
   * @param  {method} _request a request method to use for loading
   * @return {string} output a serialized XML Document
   */

	}, {
		key: "render",
		value: function render(_request) {
			var rendering = new defer();
			var rendered = rendering.promise;
			this.output; // TODO: better way to return this from hooks?

			this.load(_request).then(function (contents) {
				var userAgent = typeof navigator !== "undefined" && navigator.userAgent || "";
				var isIE = userAgent.indexOf("Trident") >= 0;
				var Serializer;
				if (typeof XMLSerializer === "undefined" || isIE) {
					Serializer = xmldom.XMLSerializer;
				} else {
					Serializer = XMLSerializer;
				}
				var serializer = new Serializer();
				this.output = serializer.serializeToString(contents);
				return this.output;
			}.bind(this)).then(function () {
				return this.hooks.serialize.trigger(this.output, this);
			}.bind(this)).then(function () {
				rendering.resolve(this.output);
			}.bind(this)).catch(function (error) {
				rendering.reject(error);
			});

			return rendered;
		}

		/**
   * Find a string in a section
   * @param  {string} _query The query string to find
   * @return {object[]} A list of matches, with form {cfi, excerpt}
   */

	}, {
		key: "find",
		value: function find(_query) {
			var section = this;
			var matches = [];
			var query = _query.toLowerCase();
			var find = function find(node) {
				var text = node.textContent.toLowerCase();
				var range = section.document.createRange();
				var cfi;
				var pos;
				var last = -1;
				var excerpt;
				var limit = 150;

				while (pos != -1) {
					// Search for the query
					pos = text.indexOf(query, last + 1);

					if (pos != -1) {
						// We found it! Generate a CFI
						range = section.document.createRange();
						range.setStart(node, pos);
						range.setEnd(node, pos + query.length);

						cfi = section.cfiFromRange(range);

						// Generate the excerpt
						if (node.textContent.length < limit) {
							excerpt = node.textContent;
						} else {
							excerpt = node.textContent.substring(pos - limit / 2, pos + limit / 2);
							excerpt = "..." + excerpt + "...";
						}

						// Add the CFI to the matches list
						matches.push({
							cfi: cfi,
							excerpt: excerpt
						});
					}

					last = pos;
				}
			};

			sprint(section.document, function (node) {
				find(node);
			});

			return matches;
		}

		/**
  * Reconciles the current chapters layout properties with
  * the global layout properties.
  * @param {object} global  The globa layout settings object, chapter properties string
  * @return {object} layoutProperties Object with layout properties
  */

	}, {
		key: "reconcileLayoutSettings",
		value: function reconcileLayoutSettings(global) {
			//-- Get the global defaults
			var settings = {
				layout: global.layout,
				spread: global.spread,
				orientation: global.orientation
			};

			//-- Get the chapter's display type
			this.properties.forEach(function (prop) {
				var rendition = prop.replace("rendition:", "");
				var split = rendition.indexOf("-");
				var property, value;

				if (split != -1) {
					property = rendition.slice(0, split);
					value = rendition.slice(split + 1);

					settings[property] = value;
				}
			});
			return settings;
		}

		/**
   * Get a CFI from a Range in the Section
   * @param  {range} _range
   * @return {string} cfi an EpubCFI string
   */

	}, {
		key: "cfiFromRange",
		value: function cfiFromRange(_range) {
			return new EpubCFI(_range, this.cfiBase).toString();
		}

		/**
   * Get a CFI from an Element in the Section
   * @param  {element} el
   * @return {string} cfi an EpubCFI string
   */

	}, {
		key: "cfiFromElement",
		value: function cfiFromElement(el) {
			return new EpubCFI(el, this.cfiBase).toString();
		}

		/**
   * Unload the section document
   */

	}, {
		key: "unload",
		value: function unload() {
			this.document = undefined;
			this.contents = undefined;
			this.output = undefined;
		}

		/**
   * Return an object representation of the item
   * @return {object}
   */

	}, {
		key: "toObject",
		value: function toObject() {
			return {
				idref: this.idref,
				linear: this.linear ? "yes" : "no",
				href: this.href,
				source: this.source,
				type: this.type,
				canonical: this.canonical,
				cfiBase: this.cfiBase
			};
		}

		/**
   * Create a url from the content
   */

	}, {
		key: "createUrl",
		value: function createUrl(request) {
			var _this = this;

			//var parsedUrl = new Url(url);
			//var mimeType = mime.lookup(parsedUrl.filename);
			var mimeType = this.type;

			return this.render(request).then(function (text) {
				return new Blob([text], { type: mimeType });
			}).then(function (blob) {
				if (_this.settings.replacements && _this.settings.replacements === "base64") {
					return blob2base64(blob).then(function (blob) {
						return createBase64Url(blob, mimeType);
					});
				} else {
					return createBlobUrl(blob, mimeType);
				}
			}).then(function (url) {
				_this.originalHref = _this.href;
				_this.href = url;

				_this.unload();

				return url;
			});
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.unload();
			this.hooks.serialize.clear();
			this.hooks.content.clear();

			if (this.originalHref) {
				revokeBlobUrl(this.href);
			}

			this.hooks = undefined;
			this.idref = undefined;
			this.linear = undefined;
			this.properties = undefined;
			this.index = undefined;
			this.href = undefined;
			this.source = undefined;
			this.next = undefined;
			this.prev = undefined;

			this.cfiBase = undefined;
		}
	}]);

	return Section;
}();

export default Section;