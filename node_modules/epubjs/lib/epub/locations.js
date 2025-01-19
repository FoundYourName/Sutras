import _JSON$stringify from "babel-runtime/core-js/json/stringify";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import { qs, sprint, locationOf, defer } from "../utils/core";
import Queue from "../utils/queue";
import EpubCFI from "../utils/epubcfi";
import { EVENTS } from "../utils/constants";
import EventEmitter from "event-emitter";

/**
 * Find Locations for a Book
 * @param {Spine} spine
 * @param {request} request
 */

var Locations = function () {
	function Locations(request, pause) {
		_classCallCheck(this, Locations);

		this.request = request;
		this.pause = pause || 100;

		this.q = new Queue(this);
		this.epubcfi = new EpubCFI();

		this._locations = [];
		this.total = 0;

		this.break = 150;

		this._current = 0;

		this.currentLocation = "";
		this._currentCfi = "";
		this.processingTimeout = undefined;
	}

	/**
  * Load all of sections in the book to generate locations
  * @param  {int} chars how many chars to split on
  * @return {object} locations
  */


	_createClass(Locations, [{
		key: "generate",
		value: function generate(spine, chars) {
			this.spine = spine;

			if (chars) {
				this.break = chars;
			}

			this.q.pause();

			this.spine.each(function (section) {
				if (section.linear) {
					this.q.enqueue(this.process.bind(this), section);
				}
			}.bind(this));

			return this.q.run().then(function () {
				this.total = this._locations.length - 1;

				if (this._currentCfi) {
					this.currentLocation = this._currentCfi;
				}

				return this._locations;
				// console.log(this.percentage(this.book.rendition.location.start), this.percentage(this.book.rendition.location.end));
			}.bind(this));
		}
	}, {
		key: "createRange",
		value: function createRange() {
			return {
				startContainer: undefined,
				startOffset: undefined,
				endContainer: undefined,
				endOffset: undefined
			};
		}
	}, {
		key: "process",
		value: function process(section) {
			return section.load(this.request).then(function (contents) {
				var completed = new defer();

				var locations = this.parse(contents, section.cfiBase);
				this._locations = this._locations.concat(locations);

				section.unload();

				this.processingTimeout = setTimeout(function () {
					return completed.resolve(locations);
				}, this.pause);
				return completed.promise;
			}.bind(this));
		}
	}, {
		key: "parse",
		value: function parse(contents, cfiBase, chars) {
			var locations = [];
			var range;
			var doc = contents.ownerDocument;
			var body = qs(doc, "body");
			var counter = 0;
			var prev;
			var _break = chars || this.break;
			var parser = function parser(node) {
				var len = node.length;
				var dist;
				var pos = 0;

				if (node.textContent.trim().length === 0) {
					return false; // continue
				}

				// Start range
				if (counter == 0) {
					range = this.createRange();
					range.startContainer = node;
					range.startOffset = 0;
				}

				dist = _break - counter;

				// Node is smaller than a break,
				// skip over it
				if (dist > len) {
					counter += len;
					pos = len;
				}

				while (pos < len) {
					dist = _break - counter;

					if (counter === 0) {
						// Start new range
						pos += 1;
						range = this.createRange();
						range.startContainer = node;
						range.startOffset = pos;
					}

					// pos += dist;

					// Gone over
					if (pos + dist >= len) {
						// Continue counter for next node
						counter += len - pos;
						// break
						pos = len;
						// At End
					} else {
						// Advance pos
						pos += dist;

						// End the previous range
						range.endContainer = node;
						range.endOffset = pos;
						// cfi = section.cfiFromRange(range);
						var cfi = new EpubCFI(range, cfiBase).toString();
						locations.push(cfi);
						counter = 0;
					}
				}
				prev = node;
			};

			sprint(body, parser.bind(this));

			// Close remaining
			if (range && range.startContainer && prev) {
				range.endContainer = prev;
				range.endOffset = prev.length;
				var cfi = new EpubCFI(range, cfiBase).toString();
				locations.push(cfi);
				counter = 0;
			}

			return locations;
		}

		/**
   * Get a location from an EpubCFI
   * @param {EpubCFI} cfi
   * @return {number}
   */

	}, {
		key: "locationFromCfi",
		value: function locationFromCfi(cfi) {
			var loc = void 0;
			if (EpubCFI.prototype.isCfiString(cfi)) {
				cfi = new EpubCFI(cfi);
			}
			// Check if the location has not been set yet
			if (this._locations.length === 0) {
				return -1;
			}

			loc = locationOf(cfi, this._locations, this.epubcfi.compare);

			if (loc > this.total) {
				return this.total;
			}

			return loc;
		}

		/**
   * Get a percentage position in locations from an EpubCFI
   * @param {EpubCFI} cfi
   * @return {number}
   */

	}, {
		key: "percentageFromCfi",
		value: function percentageFromCfi(cfi) {
			if (this._locations.length === 0) {
				return null;
			}
			// Find closest cfi
			var loc = this.locationFromCfi(cfi);
			// Get percentage in total
			return this.percentageFromLocation(loc);
		}

		/**
   * Get a percentage position from a location index
   * @param {number} location
   * @return {number}
   */

	}, {
		key: "percentageFromLocation",
		value: function percentageFromLocation(loc) {
			if (!loc || !this.total) {
				return 0;
			}

			return loc / this.total;
		}

		/**
   * Get an EpubCFI from location index
   * @param {number} loc
   * @return {EpubCFI} cfi
   */

	}, {
		key: "cfiFromLocation",
		value: function cfiFromLocation(loc) {
			var cfi = -1;
			// check that pg is an int
			if (typeof loc != "number") {
				loc = parseInt(loc);
			}

			if (loc >= 0 && loc < this._locations.length) {
				cfi = this._locations[loc];
			}

			return cfi;
		}

		/**
   * Get an EpubCFI from location percentage
   * @param {number} percentage
   * @return {EpubCFI} cfi
   */

	}, {
		key: "cfiFromPercentage",
		value: function cfiFromPercentage(percentage) {
			var loc = void 0;
			if (percentage > 1) {
				console.warn("Normalize cfiFromPercentage value to between 0 - 1");
			}

			// Make sure 1 goes to very end
			if (percentage >= 1) {
				var cfi = new EpubCFI(this._locations[this.total]);
				cfi.collapse();
				return cfi.toString();
			}

			loc = Math.ceil(this.total * percentage);
			return this.cfiFromLocation(loc);
		}

		/**
   * Load locations from JSON
   * @param {json} locations
   */

	}, {
		key: "load",
		value: function load(locations) {
			if (typeof locations === "string") {
				this._locations = JSON.parse(locations);
			} else {
				this._locations = locations;
			}
			this.total = this._locations.length - 1;
			return this._locations;
		}

		/**
   * Save locations to JSON
   * @alias toJSON
   * @return {json}
   */

	}, {
		key: "save",
		value: function save() {
			return this.toJSON();
		}
	}, {
		key: "getCurrent",
		value: function getCurrent() {
			return this._current;
		}
	}, {
		key: "setCurrent",
		value: function setCurrent(curr) {
			var loc;

			if (typeof curr == "string") {
				this._currentCfi = curr;
			} else if (typeof curr == "number") {
				this._current = curr;
			} else {
				return;
			}

			if (this._locations.length === 0) {
				return;
			}

			if (typeof curr == "string") {
				loc = this.locationFromCfi(curr);
				this._current = loc;
			} else {
				loc = curr;
			}

			this.emit(EVENTS.LOCATIONS.CHANGED, {
				percentage: this.percentageFromLocation(loc)
			});
		}

		/**
   * Get the current location
   */

	}, {
		key: "length",


		/**
   * Locations length
   */
		value: function length() {
			return this._locations.length;
		}

		/**
   * Export locations as an Array
   * @return {array}
   */

	}, {
		key: "toArray",
		value: function toArray() {
			return this._locations;
		}

		/**
   * Export locations as JSON
   * @return {json}
   */

	}, {
		key: "toJSON",
		value: function toJSON() {
			return _JSON$stringify(this._locations);
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.spine = undefined;
			this.request = undefined;
			this.pause = undefined;

			this.q.stop();
			this.q = undefined;
			this.epubcfi = undefined;

			this._locations = undefined;
			this.total = undefined;

			this.break = undefined;
			this._current = undefined;

			this.currentLocation = undefined;
			this._currentCfi = undefined;
			clearTimeout(this.processingTimeout);
		}
	}, {
		key: "currentLocation",
		get: function get() {
			return this._current;
		}

		/**
   * Set the current location
   */
		,
		set: function set(curr) {
			this.setCurrent(curr);
		}
	}]);

	return Locations;
}();

EventEmitter(Locations.prototype);

export default Locations;