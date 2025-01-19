import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import { qs, qsa, querySelectorByType, filterChildren, getParentByTagName, uuid } from "../utils/core";

/**
 * Navigation wrapper
 * @param {[object]} manifest
 */

var Navigation = function () {
	function Navigation(manifest) {
		_classCallCheck(this, Navigation);

		this.toc = [];
		this.tocByHref = {};
		this.tocById = {};

		this.landmarks = [];
		this.landmarksByType = {};

		if (manifest) {
			this.unpack(manifest);
		}
	}

	/**
  * Get an item from the navigation
  * @param  {string} target
  * @return {object} navItems
  */


	_createClass(Navigation, [{
		key: "get",
		value: function get(target) {
			var index;

			if (!target) {
				return this.toc;
			}

			if (target.indexOf("#") === 0) {
				index = this.tocById[target.substring(1)];
			} else if (target in this.tocByHref) {
				index = this.tocByHref[target];
			}

			return this.toc[index];
		}

		/**
   * Get a landmark by type
   * List of types: https://idpf.github.io/epub-vocabs/structure/
   * @param  {string} type
   * @return {object} landmarkItems
   */

	}, {
		key: "landmark",
		value: function landmark(type) {
			var index = void 0;

			index = this.landmarksByType[type];

			return this.landmarks[index];
		}

		/**
   * Unpack manifest object
   */

	}, {
		key: "unpack",
		value: function unpack(manifest) {
			if (manifest.toc) {
				this.unpackToc(manifest.toc);
			}

			if (manifest.landmarks) {
				this.unpackLandmarks(manifest.landmarks);
			}
		}
	}, {
		key: "unpackToc",
		value: function unpackToc(toc) {
			var _this = this;

			this.toc = toc;
			toc.forEach(function (item, index) {
				_this.tocByHref[item.href] = index;
				if (item.source) {
					_this.tocByHref[item.href] = index;
				}
				if (item.id) {
					_this.tocId[item.id] = index;
				}
			});
		}
	}, {
		key: "unpackLandmarks",
		value: function unpackLandmarks(landmarks) {
			var _this2 = this;

			this.landmarks = landmarks;
			landmarks.forEach(function (item, index) {
				_this2.landmarksByType[item.type] = index;
			});
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.toc = undefined;
			this.tocByHref = undefined;
			this.tocById = undefined;

			this.landmarks = undefined;
			this.landmarksByType = undefined;
		}
	}]);

	return Navigation;
}();

export default Navigation;