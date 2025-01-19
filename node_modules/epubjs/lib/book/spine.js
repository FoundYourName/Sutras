import _JSON$stringify from "babel-runtime/core-js/json/stringify";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import EpubCFI from "../utils/epubcfi";
import Hook from "../utils/hook";
import Section from "./section";
import { replaceBase, replaceCanonical, replaceMeta } from "../utils/replacements";

/**
 * A collection of Spine Items
 */

var Spine = function () {
	function Spine(items) {
		_classCallCheck(this, Spine);

		this.spineItems = [];
		this.spineByHref = {};
		this.spineById = {};

		this.hooks = {};
		this.hooks.serialize = new Hook();
		this.hooks.content = new Hook();

		// Register replacements
		this.hooks.content.register(replaceBase);
		this.hooks.content.register(replaceCanonical);
		this.hooks.content.register(replaceMeta);

		this.epubcfi = new EpubCFI();

		this.loaded = false;

		this.items = undefined;
		this.manifest = undefined;
		this.spineNodeIndex = undefined;
		this.baseUrl = undefined;
		this.length = undefined;

		if (items) {
			this.unpack(items);
		}
	}

	/**
  * Unpack items from a opf into spine items
  * @param  {items} items
  */


	_createClass(Spine, [{
		key: "unpack",
		value: function unpack(items) {
			var _this = this;

			this.items = items;
			this.length = this.items.length;

			this.items.forEach(function (item, index) {

				if (item.linear === "yes") {
					item.prev = function () {
						var prevIndex = item.index;
						while (prevIndex > 0) {
							var prev = this.get(prevIndex - 1);
							if (prev && prev.linear) {
								return prev;
							}
							prevIndex -= 1;
						}
						return;
					}.bind(_this);
					item.next = function () {
						var nextIndex = item.index;
						while (nextIndex < this.spineItems.length - 1) {
							var next = this.get(nextIndex + 1);
							if (next && next.linear) {
								return next;
							}
							nextIndex += 1;
						}
						return;
					}.bind(_this);
				} else {
					item.prev = function () {
						return;
					};
					item.next = function () {
						return;
					};
				}

				var spineItem = new Section(item, _this.hooks);

				_this.append(spineItem);
			});

			this.loaded = true;
		}

		/**
   * Get an item from the spine
   * @param  {string|int} [target]
   * @return {Section} section
   * @example spine.get();
   * @example spine.get(1);
   * @example spine.get("chap1.html");
   * @example spine.get("id1234");
   */

	}, {
		key: "get",
		value: function get(target) {
			var index = void 0;

			if (typeof target === "undefined") {
				while (index < this.spineItems.length) {
					var next = this.spineItems[index];
					if (next && next.linear) {
						break;
					}
					index += 1;
				}
			} else if (this.epubcfi.isCfiString(target)) {
				var cfi = new EpubCFI(target);
				index = cfi.spinePos;
			} else if (typeof target === "number" || isNaN(target) === false) {
				index = target;
			} else if (typeof target === "string" && target.indexOf("#") === 0) {
				index = this.spineById[target.substring(1)];
			} else if (typeof target === "string") {
				// Remove fragments
				target = target.split("#")[0];

				if (this.spineById[target] !== undefined) {
					index = this.spineById[target];
				} else if (this.spineById[target] !== undefined) {
					index = this.spineByHref[target];
				} else {
					index = this.spineByHref[encodeURI(target)];
				}
			}

			if (index != undefined) {
				return this.spineItems[index];
			}
		}

		/**
   * Append a Section to the Spine
   * @private
   * @param  {Section} section
   */

	}, {
		key: "append",
		value: function append(section) {
			var index = this.spineItems.length;
			section.index = index;

			this.spineItems.push(section);

			// Encode and Decode href lookups
			// see pr for details: https://github.com/futurepress/epub.js/pull/358
			this.spineByHref[decodeURI(section.href)] = index;
			this.spineByHref[encodeURI(section.href)] = index;
			this.spineByHref[section.href] = index;

			if (section.source) {
				this.spineByHref[section.source] = index;
			}

			this.spineById[section.idref] = index;

			return index;
		}

		/**
   * Prepend a Section to the Spine
   * @private
   * @param  {Section} section
   */

	}, {
		key: "prepend",
		value: function prepend(section) {
			// var index = this.spineItems.unshift(section);
			this.spineByHref[section.href] = 0;
			this.spineById[section.idref] = 0;

			// Re-index
			this.spineItems.forEach(function (item, index) {
				item.index = index;
			});

			return 0;
		}

		// insert(section, index) {
		//
		// };

		/**
   * Remove a Section from the Spine
   * @private
   * @param  {Section} section
   */

	}, {
		key: "remove",
		value: function remove(section) {
			var index = this.spineItems.indexOf(section);

			if (index > -1) {
				delete this.spineByHref[section.href];
				delete this.spineById[section.idref];

				return this.spineItems.splice(index, 1);
			}
		}

		/**
   * Loop over the Sections in the Spine
   * @return {method} forEach
   */

	}, {
		key: "each",
		value: function each() {
			return this.spineItems.forEach.apply(this.spineItems, arguments);
		}

		/**
   * Map the Sections in the Spine
   * @return {method} map
   */

	}, {
		key: "map",
		value: function map() {
			return this.spineItems.map.apply(this.spineItems, arguments);
		}
	}, {
		key: "first",
		value: function first() {
			var index = 0;

			do {
				var next = this.get(index);

				if (next && next.linear) {
					return next;
				}
				index += 1;
			} while (index < this.spineItems.length);
		}
	}, {
		key: "last",
		value: function last() {
			var index = this.spineItems.length - 1;

			do {
				var prev = this.get(index);
				if (prev && prev.linear) {
					return prev;
				}
				index -= 1;
			} while (index >= 0);
		}

		/**
   * Export an Array of all Spine Items
   * @return {array}
   */

	}, {
		key: "toArray",
		value: function toArray() {
			return this.spineItems.map(function (item, index) {
				return item.toObject();
			});
		}
	}, {
		key: "toJSON",
		value: function toJSON() {
			return _JSON$stringify(this.toArray());
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.each(function (section) {
				return section.destroy();
			});

			this.spineItems = undefined;
			this.spineByHref = undefined;
			this.spineById = undefined;

			this.hooks.serialize.clear();
			this.hooks.content.clear();
			this.hooks = undefined;

			this.epubcfi = undefined;

			this.loaded = false;

			this.items = undefined;
			this.manifest = undefined;
			this.spineNodeIndex = undefined;
			this.baseUrl = undefined;
			this.length = undefined;
		}
	}]);

	return Spine;
}();

export default Spine;