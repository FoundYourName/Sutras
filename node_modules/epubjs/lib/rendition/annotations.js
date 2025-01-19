import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import EventEmitter from "event-emitter";
import EpubCFI from "../utils/epubcfi";

/**
	* Handles managing adding & removing Annotations
	* @param {Rendition} rendition
	* @class
	*/

var Annotations = function () {
	function Annotations(rendition) {
		_classCallCheck(this, Annotations);

		this.rendition = rendition;
		this.highlights = [];
		this.underlines = [];
		this.marks = [];
		this._annotations = {};
		this._annotationsBySectionIndex = {};

		this.rendition.hooks.render.register(this.inject.bind(this));
		this.rendition.hooks.unloaded.register(this.clear.bind(this));
	}

	/**
  * Add an annotation to store
  * @param {string} type Type of annotation to add: "highlight", "underline", "mark"
  * @param {EpubCFI} cfiRange EpubCFI range to attach annotation to
  * @param {object} data Data to assign to annotation
  * @param {function} [cb] Callback after annotation is added
  * @returns {Annotation} annotation
  */


	_createClass(Annotations, [{
		key: "add",
		value: function add(type, cfiRange, data, cb) {
			var hash = encodeURI(cfiRange);
			var cfi = new EpubCFI(cfiRange);
			var sectionIndex = cfi.spinePos;
			var annotation = new Annotation({
				type: type,
				cfiRange: cfiRange,
				data: data,
				sectionIndex: sectionIndex,
				cb: cb
			});

			this._annotations[hash] = annotation;

			if (sectionIndex in this._annotationsBySectionIndex) {
				this._annotationsBySectionIndex[sectionIndex].push(hash);
			} else {
				this._annotationsBySectionIndex[sectionIndex] = [hash];
			}

			var views = this.rendition.views();

			views.forEach(function (view) {
				if (annotation.sectionIndex === view.index) {
					annotation.attach(view);
				}
			});

			return annotation;
		}

		/**
   * Remove an annotation from store
   * @param {EpubCFI} cfiRange EpubCFI range the annotation is attached to
   * @param {string} type Type of annotation to add: "highlight", "underline", "mark"
   */

	}, {
		key: "remove",
		value: function remove(cfiRange, type) {
			var _this = this;

			var hash = encodeURI(cfiRange);

			if (hash in this._annotations) {
				var annotation = this._annotations[hash];

				if (type && annotation.type !== type) {
					return;
				}

				var views = this.rendition.views();
				views.forEach(function (view) {
					_this._removeFromAnnotationBySectionIndex(annotation.sectionIndex, hash);
					if (annotation.sectionIndex === view.index) {
						annotation.detach(view);
					}
				});

				delete this._annotations[hash];
			}
		}

		/**
   * Remove an annotations by Section Index
   * @private
   */

	}, {
		key: "_removeFromAnnotationBySectionIndex",
		value: function _removeFromAnnotationBySectionIndex(sectionIndex, hash) {
			this._annotationsBySectionIndex[sectionIndex] = this._annotationsAt(sectionIndex).filter(function (h) {
				return h !== hash;
			});
		}

		/**
   * Get annotations by Section Index
   * @private
   */

	}, {
		key: "_annotationsAt",
		value: function _annotationsAt(index) {
			return this._annotationsBySectionIndex[index];
		}

		/**
   * Add a highlight to the store
   * @param {EpubCFI} cfiRange EpubCFI range to attach annotation to
   * @param {object} data Data to assign to annotation
   * @param {function} cb Callback after annotation is added
   */

	}, {
		key: "highlight",
		value: function highlight(cfiRange, data, cb) {
			this.add("highlight", cfiRange, data, cb);
		}

		/**
   * Add a underline to the store
   * @param {EpubCFI} cfiRange EpubCFI range to attach annotation to
   * @param {object} data Data to assign to annotation
   * @param {function} cb Callback after annotation is added
   */

	}, {
		key: "underline",
		value: function underline(cfiRange, data, cb) {
			this.add("underline", cfiRange, data, cb);
		}

		/**
   * Add a mark to the store
   * @param {EpubCFI} cfiRange EpubCFI range to attach annotation to
   * @param {object} data Data to assign to annotation
   * @param {function} cb Callback after annotation is added
   */

	}, {
		key: "mark",
		value: function mark(cfiRange, data, cb) {
			this.add("mark", cfiRange, data, cb);
		}

		/**
   * iterate over annotations in the store
   */

	}, {
		key: "each",
		value: function each() {
			return this._annotations.forEach.apply(this._annotations, arguments);
		}

		/**
   * Hook for injecting annotation into a view
   * @param {View} view
   * @private
   */

	}, {
		key: "inject",
		value: function inject(view) {
			var _this2 = this;

			var sectionIndex = view.index;
			if (sectionIndex in this._annotationsBySectionIndex) {
				var annotations = this._annotationsBySectionIndex[sectionIndex];
				annotations.forEach(function (hash) {
					var annotation = _this2._annotations[hash];
					annotation.attach(view);
				});
			}
		}

		/**
   * Hook for removing annotation from a view
   * @param {View} view
   * @private
   */

	}, {
		key: "clear",
		value: function clear(view) {
			var _this3 = this;

			var sectionIndex = view.index;
			if (sectionIndex in this._annotationsBySectionIndex) {
				var annotations = this._annotationsBySectionIndex[sectionIndex];
				annotations.forEach(function (hash) {
					var annotation = _this3._annotations[hash];
					annotation.detach(view);
				});
			}
		}

		/**
   * [Not Implemented] Show annotations
   * @TODO: needs implementation in View
   */

	}, {
		key: "show",
		value: function show() {}

		/**
   * [Not Implemented] Hide annotations
   * @TODO: needs implementation in View
   */

	}, {
		key: "hide",
		value: function hide() {}
	}]);

	return Annotations;
}();

/**
 * Annotation object
 * @class
 * @param {object} options
 * @param {string} options.type Type of annotation to add: "highlight", "underline", "mark"
 * @param {EpubCFI} options.cfiRange EpubCFI range to attach annotation to
 * @param {object} options.data Data to assign to annotation
 * @param {int} options.sectionIndex Index in the Spine of the Section annotation belongs to
 * @param {function} [options.cb] Callback after annotation is added
 * @returns {Annotation} annotation
 */


var Annotation = function () {
	function Annotation(_ref) {
		var type = _ref.type,
		    cfiRange = _ref.cfiRange,
		    data = _ref.data,
		    sectionIndex = _ref.sectionIndex,
		    cb = _ref.cb;

		_classCallCheck(this, Annotation);

		this.type = type;
		this.cfiRange = cfiRange;
		this.data = data;
		this.sectionIndex = sectionIndex;
		this.mark = undefined;
		this.cb = cb;
	}

	/**
  * Update stored data
  * @param {object} data
  */


	_createClass(Annotation, [{
		key: "update",
		value: function update(data) {
			this.data = data;
		}

		/**
   * Add to a view
   * @param {View} view
   */

	}, {
		key: "attach",
		value: function attach(view) {
			var cfiRange = this.cfiRange,
			    data = this.data,
			    type = this.type,
			    cb = this.cb;

			var result = void 0;

			if (type === "highlight") {
				result = view.highlight(cfiRange, data, cb);
			} else if (type === "underline") {
				result = view.underline(cfiRange, data, cb);
			} else if (type === "mark") {
				result = view.mark(cfiRange, data, cb);
			}

			this.mark = result;

			return result;
		}

		/**
   * Remove from a view
   * @param {View} view
   */

	}, {
		key: "detach",
		value: function detach(view) {
			var cfiRange = this.cfiRange,
			    type = this.type;

			var result = void 0;

			if (view) {
				if (type === "highlight") {
					result = view.unhighlight(cfiRange);
				} else if (type === "underline") {
					result = view.ununderline(cfiRange);
				} else if (type === "mark") {
					result = view.unmark(cfiRange);
				}
			}

			this.mark = undefined;

			return result;
		}

		/**
   * [Not Implemented] Get text of an annotation
   * @TODO: needs implementation in contents
   */

	}, {
		key: "text",
		value: function text() {}
	}]);

	return Annotation;
}();

EventEmitter(Annotation.prototype);

export default Annotations;