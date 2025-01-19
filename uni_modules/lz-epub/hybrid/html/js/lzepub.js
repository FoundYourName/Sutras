(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('xmldom')) :
	typeof define === 'function' && define.amd ? define(['xmldom'], factory) :
	(global.ePub = factory(global.xmldom));
}(this, (function (XMLDom) { 'use strict';

	XMLDom = XMLDom && XMLDom.hasOwnProperty('default') ? XMLDom['default'] : XMLDom;

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var $JSON = _core.JSON || (_core.JSON = {stringify: JSON.stringify});
	var stringify = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

	var stringify$1 = createCommonjsModule(function (module) {
	module.exports = { "default": stringify, __esModule: true };
	});

	var _JSON$stringify = unwrapExports(stringify$1);

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	var _toInteger = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function(TO_STRING){
	  return function(that, pos){
	    var s = String(_defined(that))
	      , i = _toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _library = true;

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
	});

	var _aFunction = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function(fn, that, length){
	  _aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function(it){
	  if(!_isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

	var document$1 = _global.document
	  // in old IE typeof document.createElement is 'object'
	  , is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function(it){
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function(){
	  return Object.defineProperty(_domCreate('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function(it, S){
	  if(!_isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP             = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if(_ie8DomDefine)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

	var _hide = _descriptors ? function(object, key, value){
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

	var PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? _core : _core[name] || (_core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])_hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	var _export = $export;

	var _redefine = _hide;

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

	var _iterators = {};

	var toString = {}.toString;

	var _cof = function(it){
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings

	var _toIobject = function(it){
	  return _iobject(_defined(it));
	};

	// 7.1.15 ToLength
	var min       = Math.min;
	var _toLength = function(it){
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max       = Math.max
	  , min$1       = Math.min;
	var _toIndex = function(index, length){
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes

	var _arrayIncludes = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = _toIobject($this)
	      , length = _toLength(O.length)
	      , index  = _toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var SHARED = '__core-js_shared__'
	  , store  = _global[SHARED] || (_global[SHARED] = {});
	var _shared = function(key){
	  return store[key] || (store[key] = {});
	};

	var id = 0
	  , px = Math.random();
	var _uid = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');
	var _sharedKey = function(key){
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false)
	  , IE_PROTO     = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function(object, names){
	  var O      = _toIobject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)_has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(_has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)


	var _objectKeys = Object.keys || function keys(O){
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties){
	  _anObject(O);
	  var keys   = _objectKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)_objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var _html = _global.document && document.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var IE_PROTO$1    = _sharedKey('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE$1   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe')
	    , i      = _enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var _wks = createCommonjsModule(function (module) {
	var store      = _shared('wks')
	  , Symbol     = _global.Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f
	  , TAG = _wks('toStringTag');

	var _setToStringTag = function(it, tag, stat){
	  if(it && !_has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function(){ return this; });

	var _iterCreate = function(Constructor, NAME, next){
	  Constructor.prototype = _objectCreate(IteratorPrototype, {next: _propertyDesc(1, next)});
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function(it){
	  return Object(_defined(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var IE_PROTO$2    = _sharedKey('IE_PROTO')
	  , ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function(O){
	  O = _toObject(O);
	  if(_has(O, IE_PROTO$2))return O[IE_PROTO$2];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR       = _wks('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	var _iterDefine = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = _objectGpo($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!_library && !_has(IteratorPrototype, ITERATOR))_hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))_redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at  = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

	var _iterStep = function(done, value){
	  return {value: value, done: !!done};
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function(iterated, kind){
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if(kind == 'keys'  )return _iterStep(0, index);
	  if(kind == 'values')return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	var TO_STRING_TAG = _wks('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = _global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])_hide(proto, TO_STRING_TAG, NAME);
	  _iterators[NAME] = _iterators.Array;
	}

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var TAG$1 = _wks('toStringTag')
	  // ES3 wrong here
	  , ARG = _cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	var _classof = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var _anInstance = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	// call something on iterator step with safe closing on error

	var _iterCall = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)_anObject(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator
	var ITERATOR$1   = _wks('iterator')
	  , ArrayProto = Array.prototype;

	var _isArrayIter = function(it){
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	var ITERATOR$2  = _wks('iterator');
	var core_getIteratorMethod = _core.getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var _forOf = createCommonjsModule(function (module) {
	var BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : core_getIteratorMethod(iterable)
	    , f      = _ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(_isArrayIter(iterFn))for(length = _toLength(iterable.length); length > index; index++){
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = _iterCall(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var SPECIES   = _wks('species');
	var _speciesConstructor = function(O, D){
	  var C = _anObject(O).constructor, S;
	  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
	};

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

	var process            = _global.process
	  , setTask            = _global.setImmediate
	  , clearTask          = _global.clearImmediate
	  , MessageChannel     = _global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(_cof(process) == 'process'){
	    defer = function(id){
	      process.nextTick(_ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = _ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts){
	    defer = function(id){
	      _global.postMessage(id + '', '*');
	    };
	    _global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in _domCreate('script')){
	    defer = function(id){
	      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function(){
	        _html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(_ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set:   setTask,
	  clear: clearTask
	};

	var macrotask = _task.set
	  , Observer  = _global.MutationObserver || _global.WebKitMutationObserver
	  , process$1   = _global.process
	  , Promise$1   = _global.Promise
	  , isNode    = _cof(process$1) == 'process';

	var _microtask = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process$1.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise$1 && Promise$1.resolve){
	    var promise = Promise$1.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(_global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	var _redefineAll = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else _hide(target, key, src[key]);
	  } return target;
	};

	var SPECIES$1     = _wks('species');

	var _setSpecies = function(KEY){
	  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
	  if(_descriptors && C && !C[SPECIES$1])_objectDp.f(C, SPECIES$1, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

	var ITERATOR$3     = _wks('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	} catch(e){ /* empty */ }

	var _iterDetect = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR$3]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR$3] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

	var task               = _task.set
	  , microtask          = _microtask()
	  , PROMISE            = 'Promise'
	  , TypeError$1          = _global.TypeError
	  , process$2            = _global.process
	  , $Promise           = _global[PROMISE]
	  , process$2            = _global.process
	  , isNode$1             = _classof(process$2) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[_wks('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError$1('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = _aFunction(resolve);
	  this.reject  = _aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(_global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode$1){
	          process$2.emit('unhandledRejection', value, promise);
	        } else if(handler = _global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = _global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(_global, function(){
	    var handler;
	    if(isNode$1){
	      process$2.emit('rejectionHandled', promise);
	    } else if(handler = _global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError$1("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    _anInstance(this, $Promise, PROMISE, '_h');
	    _aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = _redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(_speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$2.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = _ctx($resolve, promise, 1);
	    this.reject  = _ctx($reject, promise, 1);
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, {Promise: $Promise});
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _core[PROMISE];

	// statics
	_export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	_export(_export.S + _export.F * (_library || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	_export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      _forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      _forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

	var promise = _core.Promise;

	var promise$1 = createCommonjsModule(function (module) {
	module.exports = { "default": promise, __esModule: true };
	});

	var _Promise = unwrapExports(promise$1);

	var classCallCheck = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', {defineProperty: _objectDp.f});

	var $Object = _core.Object;
	var defineProperty = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$1 = createCommonjsModule(function (module) {
	module.exports = { "default": defineProperty, __esModule: true };
	});

	var _Object$defineProperty = unwrapExports(defineProperty$1);

	var createClass = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _defineProperty2 = _interopRequireDefault(defineProperty$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();
	});

	var _createClass = unwrapExports(createClass);

	var isImplemented = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== "function") return false;
		obj = { foo: "raz" };
		assign(obj, { bar: "dwa" }, { trzy: "trzy" });
		return (obj.foo + obj.bar + obj.trzy) === "razdwatrzy";
	};

	var isImplemented$1 = function () {
		try {
			return true;
		} catch (e) {
	 return false;
	}
	};

	// eslint-disable-next-line no-empty-function
	var noop = function () {};

	var _undefined = noop(); // Support ES3 engines

	var isValue = function (val) {
	 return (val !== _undefined) && (val !== null);
	};

	var keys = Object.keys;

	var shim = function (object) {
		return keys(isValue(object) ? Object(object) : object);
	};

	var keys$1 = isImplemented$1()
		? Object.keys
		: shim;

	var validValue = function (value) {
		if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
		return value;
	};

	var max$1   = Math.max;

	var shim$1 = function (dest, src /*, …srcn*/) {
		var error, i, length = max$1(arguments.length, 2), assign;
		dest = Object(validValue(dest));
		assign = function (key) {
			try {
				dest[key] = src[key];
			} catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < length; ++i) {
			src = arguments[i];
			keys$1(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};

	var assign = isImplemented()
		? Object.assign
		: shim$1;

	var forEach = Array.prototype.forEach, create = Object.create;

	var process$3 = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};

	// eslint-disable-next-line no-unused-vars
	var normalizeOptions = function (opts1 /*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (!isValue(options)) return;
			process$3(Object(options), result);
		});
		return result;
	};

	// Deprecated

	var isCallable = function (obj) {
	 return typeof obj === "function";
	};

	var str = "razdwatrzy";

	var isImplemented$2 = function () {
		if (typeof str.contains !== "function") return false;
		return (str.contains("dwa") === true) && (str.contains("foo") === false);
	};

	var indexOf = String.prototype.indexOf;

	var shim$2 = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};

	var contains = isImplemented$2()
		? String.prototype.contains
		: shim$2;

	var d_1 = createCommonjsModule(function (module) {

	var d;

	d = module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if ((arguments.length < 2) || (typeof dscr !== 'string')) {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOptions(options), desc);
	};

	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOptions(options), desc);
	};
	});

	var validCallable = function (fn) {
		if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
		return fn;
	};

	var eventEmitter = createCommonjsModule(function (module, exports) {

	var apply = Function.prototype.apply, call = Function.prototype.call
	  , create = Object.create, defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , descriptor = { configurable: true, enumerable: false, writable: true }

	  , on, once, off, emit, methods, descriptors, base;

	on = function (type, listener) {
		var data;

		validCallable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) {
			data = descriptor.value = create(null);
			defineProperty(this, '__ee__', descriptor);
			descriptor.value = null;
		} else {
			data = this.__ee__;
		}
		if (!data[type]) data[type] = listener;
		else if (typeof data[type] === 'object') data[type].push(listener);
		else data[type] = [data[type], listener];

		return this;
	};

	once = function (type, listener) {
		var once, self;

		validCallable(listener);
		self = this;
		on.call(this, type, once = function () {
			off.call(self, type, once);
			apply.call(listener, this, arguments);
		});

		once.__eeOnceListener__ = listener;
		return this;
	};

	off = function (type, listener) {
		var data, listeners, candidate, i;

		validCallable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) return this;
		data = this.__ee__;
		if (!data[type]) return this;
		listeners = data[type];

		if (typeof listeners === 'object') {
			for (i = 0; (candidate = listeners[i]); ++i) {
				if ((candidate === listener) ||
						(candidate.__eeOnceListener__ === listener)) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
					else listeners.splice(i, 1);
				}
			}
		} else {
			if ((listeners === listener) ||
					(listeners.__eeOnceListener__ === listener)) {
				delete data[type];
			}
		}

		return this;
	};

	emit = function (type) {
		var i, l, listener, listeners, args;

		if (!hasOwnProperty.call(this, '__ee__')) return;
		listeners = this.__ee__[type];
		if (!listeners) return;

		if (typeof listeners === 'object') {
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

			listeners = listeners.slice();
			for (i = 0; (listener = listeners[i]); ++i) {
				apply.call(listener, this, args);
			}
		} else {
			switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
			}
		}
	};

	methods = {
		on: on,
		once: once,
		off: off,
		emit: emit
	};

	descriptors = {
		on: d_1(on),
		once: d_1(once),
		off: d_1(off),
		emit: d_1(emit)
	};

	base = defineProperties({}, descriptors);

	module.exports = exports = function (o) {
		return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;
	});
	var eventEmitter_1 = eventEmitter.methods;

	var _meta = createCommonjsModule(function (module) {
	var META     = _uid('meta')
	  , setDesc  = _objectDp.f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !_fails(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!_isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!_has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!_has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !_has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	// most Object methods by ES6 should accept primitives

	var _objectSap = function(KEY, exec){
	  var fn  = (_core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function(){ fn(1); }), 'Object', exp);
	};

	// 19.1.2.5 Object.freeze(O)
	var meta     = _meta.onFreeze;

	_objectSap('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

	var freeze = _core.Object.freeze;

	var freeze$1 = createCommonjsModule(function (module) {
	module.exports = { "default": freeze, __esModule: true };
	});

	var _Object$freeze = unwrapExports(freeze$1);

	var f$1 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$1
	};

	var gOPD           = Object.getOwnPropertyDescriptor;

	var f$2 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if(_ie8DomDefine)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(_has(O, P))return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$2
	};

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var $getOwnPropertyDescriptor = _objectGopd.f;

	_objectSap('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(_toIobject(it), key);
	  };
	});

	var $Object$1 = _core.Object;
	var getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  return $Object$1.getOwnPropertyDescriptor(it, key);
	};

	var getOwnPropertyDescriptor$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getOwnPropertyDescriptor, __esModule: true };
	});

	var _Object$getOwnPropertyDescriptor = unwrapExports(getOwnPropertyDescriptor$1);

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$3
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var gOPN      = _objectGopn.f
	  , toString$1  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	var f$4 = function getOwnPropertyNames(it){
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$4
	};

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	_objectSap('getOwnPropertyNames', function(){
	  return _objectGopnExt.f;
	});

	var $Object$2 = _core.Object;
	var getOwnPropertyNames = function getOwnPropertyNames(it){
	  return $Object$2.getOwnPropertyNames(it);
	};

	var getOwnPropertyNames$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getOwnPropertyNames, __esModule: true };
	});

	var _Object$getOwnPropertyNames = unwrapExports(getOwnPropertyNames$1);

	/**
	 * Core Utilities and Helpers
	 * @module Core
	*/

	/**
	 * Vendor prefixed requestAnimationFrame
	 * @returns {function} requestAnimationFrame
	 * @memberof Core
	 */
	var requestAnimationFrame$1 = typeof window != "undefined" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : false;
	var ELEMENT_NODE = 1;
	var TEXT_NODE = 3;
	var COMMENT_NODE = 8;
	var DOCUMENT_NODE = 9;
	var _URL = typeof URL != "undefined" ? URL : typeof window != "undefined" ? window.URL || window.webkitURL || window.mozURL : undefined;

	/**
	 * Generates a UUID
	 * based on: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
	 * @returns {string} uuid
	 * @memberof Core
	 */
	function uuid() {
		var d = new Date().getTime();
		if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
			d += performance.now(); //use high-precision timer if available
		}
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
		});
	}

	/**
	 * Gets the height of a document
	 * @returns {number} height
	 * @memberof Core
	 */
	function documentHeight() {
		return Math.max(document.documentElement.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight);
	}

	/**
	 * Checks if a node is an element
	 * @returns {boolean}
	 * @memberof Core
	 */
	function isElement(obj) {
		return !!(obj && obj.nodeType == 1);
	}

	/**
	 * @returns {boolean}
	 * @memberof Core
	 */
	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	/**
	 * @returns {boolean}
	 * @memberof Core
	 */
	function isFloat(n) {
		var f = parseFloat(n);
		return isNumber(n) && Math.floor(f) !== parseFloat(n);
	}

	/**
	 * Get a prefixed css property
	 * @returns {string}
	 * @memberof Core
	 */
	function prefixed(unprefixed) {
		var vendors = ["Webkit", "webkit", "Moz", "O", "ms"];
		var prefixes = ["-webkit-", "-webkit-", "-moz-", "-o-", "-ms-"];
		var upper = unprefixed[0].toUpperCase() + unprefixed.slice(1);
		var length = vendors.length;

		if (typeof document === "undefined" || typeof document.body.style[unprefixed] != "undefined") {
			return unprefixed;
		}

		for (var i = 0; i < length; i++) {
			if (typeof document.body.style[vendors[i] + upper] != "undefined") {
				return prefixes[i] + unprefixed;
			}
		}

		return unprefixed;
	}

	/**
	 * Apply defaults to an object
	 * @param {object} obj
	 * @returns {object}
	 * @memberof Core
	 */
	function defaults(obj) {
		for (var i = 1, length = arguments.length; i < length; i++) {
			var source = arguments[i];
			for (var prop in source) {
				if (obj[prop] === void 0) obj[prop] = source[prop];
			}
		}
		return obj;
	}

	/**
	 * Extend properties of an object
	 * @param {object} target
	 * @returns {object}
	 * @memberof Core
	 */
	function extend(target) {
		var sources = [].slice.call(arguments, 1);
		sources.forEach(function (source) {
			if (!source) return;
			_Object$getOwnPropertyNames(source).forEach(function (propName) {
				_Object$defineProperty(target, propName, _Object$getOwnPropertyDescriptor(source, propName));
			});
		});
		return target;
	}

	/**
	 * Fast quicksort insert for sorted array -- based on:
	 *  http://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers
	 * @param {any} item
	 * @param {array} array
	 * @param {function} [compareFunction]
	 * @returns {number} location (in array)
	 * @memberof Core
	 */
	function insert(item, array, compareFunction) {
		var location = locationOf(item, array, compareFunction);
		array.splice(location, 0, item);

		return location;
	}

	/**
	 * Finds where something would fit into a sorted array
	 * @param {any} item
	 * @param {array} array
	 * @param {function} [compareFunction]
	 * @param {function} [_start]
	 * @param {function} [_end]
	 * @returns {number} location (in array)
	 * @memberof Core
	 */
	function locationOf(item, array, compareFunction, _start, _end) {
		var start = _start || 0;
		var end = _end || array.length;
		var pivot = parseInt(start + (end - start) / 2);
		var compared;
		if (!compareFunction) {
			compareFunction = function compareFunction(a, b) {
				if (a > b) return 1;
				if (a < b) return -1;
				if (a == b) return 0;
			};
		}
		if (end - start <= 0) {
			return pivot;
		}

		compared = compareFunction(array[pivot], item);
		if (end - start === 1) {
			return compared >= 0 ? pivot : pivot + 1;
		}
		if (compared === 0) {
			return pivot;
		}
		if (compared === -1) {
			return locationOf(item, array, compareFunction, pivot, end);
		} else {
			return locationOf(item, array, compareFunction, start, pivot);
		}
	}

	/**
	 * Finds index of something in a sorted array
	 * Returns -1 if not found
	 * @param {any} item
	 * @param {array} array
	 * @param {function} [compareFunction]
	 * @param {function} [_start]
	 * @param {function} [_end]
	 * @returns {number} index (in array) or -1
	 * @memberof Core
	 */
	function indexOfSorted$1(item, array, compareFunction, _start, _end) {
		var start = _start || 0;
		var end = _end || array.length;
		var pivot = parseInt(start + (end - start) / 2);
		var compared;
		if (!compareFunction) {
			compareFunction = function compareFunction(a, b) {
				if (a > b) return 1;
				if (a < b) return -1;
				if (a == b) return 0;
			};
		}
		if (end - start <= 0) {
			return -1; // Not found
		}

		compared = compareFunction(array[pivot], item);
		if (end - start === 1) {
			return compared === 0 ? pivot : -1;
		}
		if (compared === 0) {
			return pivot; // Found
		}
		if (compared === -1) {
			return indexOfSorted$1(item, array, compareFunction, pivot, end);
		} else {
			return indexOfSorted$1(item, array, compareFunction, start, pivot);
		}
	}
	/**
	 * Find the bounds of an element
	 * taking padding and margin into account
	 * @param {element} el
	 * @returns {{ width: Number, height: Number}}
	 * @memberof Core
	 */
	function bounds(el) {

		var style = window.getComputedStyle(el);
		var widthProps = ["width", "paddingRight", "paddingLeft", "marginRight", "marginLeft", "borderRightWidth", "borderLeftWidth"];
		var heightProps = ["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth"];

		var width = 0;
		var height = 0;

		widthProps.forEach(function (prop) {
			width += parseFloat(style[prop]) || 0;
		});

		heightProps.forEach(function (prop) {
			height += parseFloat(style[prop]) || 0;
		});

		return {
			height: height,
			width: width
		};
	}

	/**
	 * Find the bounds of an element
	 * taking padding, margin and borders into account
	 * @param {element} el
	 * @returns {{ width: Number, height: Number}}
	 * @memberof Core
	 */
	function borders(el) {

		var style = window.getComputedStyle(el);
		var widthProps = ["paddingRight", "paddingLeft", "marginRight", "marginLeft", "borderRightWidth", "borderLeftWidth"];
		var heightProps = ["paddingTop", "paddingBottom", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth"];

		var width = 0;
		var height = 0;

		widthProps.forEach(function (prop) {
			width += parseFloat(style[prop]) || 0;
		});

		heightProps.forEach(function (prop) {
			height += parseFloat(style[prop]) || 0;
		});

		return {
			height: height,
			width: width
		};
	}

	/**
	 * Find the equivelent of getBoundingClientRect of a browser window
	 * @returns {{ width: Number, height: Number, top: Number, left: Number, right: Number, bottom: Number }}
	 * @memberof Core
	 */
	function windowBounds() {

		var width = window.innerWidth;
		var height = window.innerHeight;

		return {
			top: 0,
			left: 0,
			right: width,
			bottom: height,
			width: width,
			height: height
		};
	}

	/**
	 * Gets the index of a node in its parent
	 * @private
	 * @memberof Core
	 */
	function indexOfNode(node, typeId) {
		var parent = node.parentNode;
		var children = parent.childNodes;
		var sib;
		var index = -1;
		for (var i = 0; i < children.length; i++) {
			sib = children[i];
			if (sib.nodeType === typeId) {
				index++;
			}
			if (sib == node) break;
		}

		return index;
	}

	/**
	 * Gets the index of a text node in its parent
	 * @param {node} textNode
	 * @returns {number} index
	 * @memberof Core
	 */
	function indexOfTextNode(textNode) {
		return indexOfNode(textNode, TEXT_NODE);
	}

	/**
	 * Gets the index of an element node in its parent
	 * @param {element} elementNode
	 * @returns {number} index
	 * @memberof Core
	 */
	function indexOfElementNode(elementNode) {
		return indexOfNode(elementNode, ELEMENT_NODE);
	}

	/**
	 * Check if extension is xml
	 * @param {string} ext
	 * @returns {boolean}
	 * @memberof Core
	 */
	function isXml(ext) {
		return ["xml", "opf", "ncx"].indexOf(ext) > -1;
	}

	/**
	 * Create a new blob
	 * @param {any} content
	 * @param {string} mime
	 * @returns {Blob}
	 * @memberof Core
	 */
	function createBlob(content, mime) {
		return new Blob([content], { type: mime });
	}

	/**
	 * Create a new blob url
	 * @param {any} content
	 * @param {string} mime
	 * @returns {string} url
	 * @memberof Core
	 */
	function createBlobUrl(content, mime) {
		var tempUrl;
		var blob = createBlob(content, mime);

		tempUrl = _URL.createObjectURL(blob);

		return tempUrl;
	}

	/**
	 * Remove a blob url
	 * @param {string} url
	 * @memberof Core
	 */
	function revokeBlobUrl(url) {
		return _URL.revokeObjectURL(url);
	}

	/**
	 * Create a new base64 encoded url
	 * @param {any} content
	 * @param {string} mime
	 * @returns {string} url
	 * @memberof Core
	 */
	function createBase64Url(content, mime) {
		var data;
		var datauri;

		if (typeof content !== "string") {
			// Only handles strings
			return;
		}

		data = btoa(encodeURIComponent(content));

		datauri = "data:" + mime + ";base64," + data;

		return datauri;
	}

	/**
	 * Get type of an object
	 * @param {object} obj
	 * @returns {string} type
	 * @memberof Core
	 */
	function type(obj) {
		return Object.prototype.toString.call(obj).slice(8, -1);
	}

	/**
	 * Parse xml (or html) markup
	 * @param {string} markup
	 * @param {string} mime
	 * @param {boolean} forceXMLDom force using xmlDom to parse instead of native parser
	 * @returns {document} document
	 * @memberof Core
	 */
	function parse(markup, mime, forceXMLDom) {
		var doc;
		var Parser;

		if (typeof DOMParser === "undefined" || forceXMLDom) {
			Parser = XMLDom.DOMParser;
		} else {
			Parser = DOMParser;
		}

		// Remove byte order mark before parsing
		// https://www.w3.org/International/questions/qa-byte-order-mark
		if (markup.charCodeAt(0) === 0xFEFF) {
			markup = markup.slice(1);
		}

		doc = new Parser().parseFromString(markup, mime);

		return doc;
	}

	/**
	 * querySelector polyfill
	 * @param {element} el
	 * @param {string} sel selector string
	 * @returns {element} element
	 * @memberof Core
	 */
	function qs(el, sel) {
		var elements;
		if (!el) {
			throw new Error("No Element Provided");
		}

		if (typeof el.querySelector != "undefined") {
			return el.querySelector(sel);
		} else {
			elements = el.getElementsByTagName(sel);
			if (elements.length) {
				return elements[0];
			}
		}
	}

	/**
	 * querySelectorAll polyfill
	 * @param {element} el
	 * @param {string} sel selector string
	 * @returns {element[]} elements
	 * @memberof Core
	 */
	function qsa(el, sel) {

		if (typeof el.querySelector != "undefined") {
			return el.querySelectorAll(sel);
		} else {
			return el.getElementsByTagName(sel);
		}
	}

	/**
	 * querySelector by property
	 * @param {element} el
	 * @param {string} sel selector string
	 * @param {props[]} props
	 * @returns {element[]} elements
	 * @memberof Core
	 */
	function qsp(el, sel, props) {
		var q, filtered;
		if (typeof el.querySelector != "undefined") {
			sel += "[";
			for (var prop in props) {
				sel += prop + "~='" + props[prop] + "'";
			}
			sel += "]";

			return el.querySelector(sel);
		} else {
			q = el.getElementsByTagName(sel);
			filtered = Array.prototype.slice.call(q, 0).filter(function (el) {
				for (var prop in props) {
					if (el.getAttribute(prop) === props[prop]) {
						return true;
					}
				}
				return false;
			});

			if (filtered) {
				return filtered[0];
			}
		}
	}

	/**
	 * Sprint through all text nodes in a document
	 * @memberof Core
	 * @param  {element} root element to start with
	 * @param  {function} func function to run on each element
	 */
	function sprint(root, func) {
		var doc = root.ownerDocument || root;
		if (typeof doc.createTreeWalker !== "undefined") {
			treeWalker(root, func, NodeFilter.SHOW_TEXT);
		} else {
			walk(root, function (node) {
				if (node && node.nodeType === 3) {
					// Node.TEXT_NODE
					func(node);
				}
			}, true);
		}
	}

	function treeWalker(root, func, filter) {
		var treeWalker = document.createTreeWalker(root, filter, null, false);
		var node = void 0;
		while (node = treeWalker.nextNode()) {
			func(node);
		}
	}

	/**
	 * @memberof Core
	 * @param {node} node
	 * @param {callback} return false for continue,true for break inside callback
	 */
	function walk(node, callback) {
		if (callback(node)) {
			return true;
		}
		node = node.firstChild;
		if (node) {
			do {
				var walked = walk(node, callback);
				if (walked) {
					return true;
				}
				node = node.nextSibling;
			} while (node);
		}
	}

	/**
	 * Convert a blob to a base64 encoded string
	 * @param {Blog} blob
	 * @returns {string}
	 * @memberof Core
	 */
	function blob2base64(blob) {
		return new _Promise(function (resolve, reject) {
			var reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = function () {
				resolve(reader.result);
			};
		});
	}

	/**
	 * Creates a new pending promise and provides methods to resolve or reject it.
	 * From: https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred#backwards_forwards_compatible
	 * @memberof Core
	 */
	function defer$1() {
		var _this = this;

		/* A method to resolve the associated Promise with the value passed.
	  * If the promise is already settled it does nothing.
	  *
	  * @param {anything} value : This value is used to resolve the promise
	  * If the value is a Promise then the associated promise assumes the state
	  * of Promise passed as value.
	  */
		this.resolve = null;

		/* A method to reject the assocaited Promise with the value passed.
	  * If the promise is already settled it does nothing.
	  *
	  * @param {anything} reason: The reason for the rejection of the Promise.
	  * Generally its an Error object. If however a Promise is passed, then the Promise
	  * itself will be the reason for rejection no matter the state of the Promise.
	  */
		this.reject = null;

		this.id = uuid();

		/* A newly created Pomise object.
	  * Initially in pending state.
	  */
		this.promise = new _Promise(function (resolve, reject) {
			_this.resolve = resolve;
			_this.reject = reject;
		});
		_Object$freeze(this);
	}

	/**
	 * querySelector with filter by epub type
	 * @param {element} html
	 * @param {string} element element type to find
	 * @param {string} type epub type to find
	 * @returns {element[]} elements
	 * @memberof Core
	 */
	function querySelectorByType(html, element, type) {
		var query;
		if (typeof html.querySelector != "undefined") {
			query = html.querySelector(element + "[*|type=\"" + type + "\"]");
		}
		// Handle IE not supporting namespaced epub:type in querySelector
		if (!query || query.length === 0) {
			query = qsa(html, element);
			for (var i = 0; i < query.length; i++) {
				if (query[i].getAttributeNS("http://www.idpf.org/2007/ops", "type") === type || query[i].getAttribute("epub:type") === type) {
					return query[i];
				}
			}
		} else {
			return query;
		}
	}

	/**
	 * Find direct decendents of an element
	 * @param {element} el
	 * @returns {element[]} children
	 * @memberof Core
	 */
	function findChildren(el) {
		var result = [];
		var childNodes = el.childNodes;
		for (var i = 0; i < childNodes.length; i++) {
			var node = childNodes[i];
			if (node.nodeType === 1) {
				result.push(node);
			}
		}
		return result;
	}

	/**
	 * Find all parents (ancestors) of an element
	 * @param {element} node
	 * @returns {element[]} parents
	 * @memberof Core
	 */
	function parents(node) {
		var nodes = [node];
		for (; node; node = node.parentNode) {
			nodes.unshift(node);
		}
		return nodes;
	}

	/**
	 * Find all direct decendents of a specific type
	 * @param {element} el
	 * @param {string} nodeName
	 * @param {boolean} [single]
	 * @returns {element[]} children
	 * @memberof Core
	 */
	function filterChildren(el, nodeName, single) {
		var result = [];
		var childNodes = el.childNodes;
		for (var i = 0; i < childNodes.length; i++) {
			var node = childNodes[i];
			if (node.nodeType === 1 && node.nodeName.toLowerCase() === nodeName) {
				if (single) {
					return node;
				} else {
					result.push(node);
				}
			}
		}
		if (!single) {
			return result;
		}
	}

	/**
	 * Filter all parents (ancestors) with tag name
	 * @param {element} node
	 * @param {string} tagname
	 * @returns {element[]} parents
	 * @memberof Core
	 */
	function getParentByTagName(node, tagname) {
		var parent = void 0;
		if (node === null || tagname === "") return;
		parent = node.parentNode;
		while (parent.nodeType === 1) {
			if (parent.tagName.toLowerCase() === tagname) {
				return parent;
			}
			parent = parent.parentNode;
		}
	}

	/**
	 * Get the next section in the spine
	 */
	function nextSection(section, spine) {
		var nextIndex = section.index;
		while (nextIndex < spine.length - 1) {
			var next = spine[nextIndex + 1];
			if (next && (next.linear === true || next.linear === "yes")) {
				return next;
			}
			nextIndex += 1;
		}
		return;
	}

	/**
	 * Get the previous section in the spine
	 */
	function prevSection(section, spine) {
		var prevIndex = section.index;
		while (prevIndex > 0) {
			var prev = spine[prevIndex - 1];
			if (prev && (prev.linear === true || prev.linear === "yes")) {
				return prev;
			}
			prevIndex -= 1;
		}
		return;
	}

	/**
	 * Serialize the contents of a document
	 */
	function serialize(doc) {
		var userAgent = typeof navigator !== "undefined" && navigator.userAgent || "";
		var isIE = userAgent.indexOf("Trident") >= 0;
		var Serializer = void 0;
		if (typeof XMLSerializer === "undefined" || isIE) {
			Serializer = XMLDom.XMLSerializer;
		} else {
			Serializer = XMLSerializer;
		}
		var serializer = new Serializer();
		return serializer.serializeToString(doc);
	}

	/**
	 * Lightweight Polyfill for DOM Range
	 * @class
	 * @memberof Core
	 */
	var RangeObject = function () {
		function RangeObject() {
			_classCallCheck(this, RangeObject);

			this.collapsed = false;
			this.commonAncestorContainer = undefined;
			this.endContainer = undefined;
			this.endOffset = undefined;
			this.startContainer = undefined;
			this.startOffset = undefined;
		}

		_createClass(RangeObject, [{
			key: "setStart",
			value: function setStart(startNode, startOffset) {
				this.startContainer = startNode;
				this.startOffset = startOffset;

				if (!this.endContainer) {
					this.collapse(true);
				} else {
					this.commonAncestorContainer = this._commonAncestorContainer();
				}

				this._checkCollapsed();
			}
		}, {
			key: "setEnd",
			value: function setEnd(endNode, endOffset) {
				this.endContainer = endNode;
				this.endOffset = endOffset;

				if (!this.startContainer) {
					this.collapse(false);
				} else {
					this.collapsed = false;
					this.commonAncestorContainer = this._commonAncestorContainer();
				}

				this._checkCollapsed();
			}
		}, {
			key: "collapse",
			value: function collapse(toStart) {
				this.collapsed = true;
				if (toStart) {
					this.endContainer = this.startContainer;
					this.endOffset = this.startOffset;
					this.commonAncestorContainer = this.startContainer.parentNode;
				} else {
					this.startContainer = this.endContainer;
					this.startOffset = this.endOffset;
					this.commonAncestorContainer = this.endOffset.parentNode;
				}
			}
		}, {
			key: "selectNode",
			value: function selectNode(referenceNode) {
				var parent = referenceNode.parentNode;
				var index = Array.prototype.indexOf.call(parent.childNodes, referenceNode);
				this.setStart(parent, index);
				this.setEnd(parent, index + 1);
			}
		}, {
			key: "selectNodeContents",
			value: function selectNodeContents(referenceNode) {
				// let end = referenceNode.childNodes[referenceNode.childNodes - 1];
				var endIndex = referenceNode.nodeType === 3 ? referenceNode.textContent.length : parent.childNodes.length;
				this.setStart(referenceNode, 0);
				this.setEnd(referenceNode, endIndex);
			}
		}, {
			key: "_commonAncestorContainer",
			value: function _commonAncestorContainer(startContainer, endContainer) {
				var startParents = parents(startContainer || this.startContainer);
				var endParents = parents(endContainer || this.endContainer);

				if (startParents[0] != endParents[0]) return undefined;

				for (var i = 0; i < startParents.length; i++) {
					if (startParents[i] != endParents[i]) {
						return startParents[i - 1];
					}
				}
			}
		}, {
			key: "_checkCollapsed",
			value: function _checkCollapsed() {
				if (this.startContainer === this.endContainer && this.startOffset === this.endOffset) {
					this.collapsed = true;
				} else {
					this.collapsed = false;
				}
			}
		}, {
			key: "toString",
			value: function toString() {
				// TODO: implement walking between start and end to find text
			}
		}]);

		return RangeObject;
	}();

	var core = /*#__PURE__*/Object.freeze({
		requestAnimationFrame: requestAnimationFrame$1,
		ELEMENT_NODE: ELEMENT_NODE,
		TEXT_NODE: TEXT_NODE,
		COMMENT_NODE: COMMENT_NODE,
		DOCUMENT_NODE: DOCUMENT_NODE,
		_URL: _URL,
		uuid: uuid,
		documentHeight: documentHeight,
		isElement: isElement,
		isNumber: isNumber,
		isFloat: isFloat,
		prefixed: prefixed,
		defaults: defaults,
		extend: extend,
		insert: insert,
		locationOf: locationOf,
		indexOfSorted: indexOfSorted$1,
		bounds: bounds,
		borders: borders,
		windowBounds: windowBounds,
		indexOfNode: indexOfNode,
		indexOfTextNode: indexOfTextNode,
		indexOfElementNode: indexOfElementNode,
		isXml: isXml,
		createBlob: createBlob,
		createBlobUrl: createBlobUrl,
		revokeBlobUrl: revokeBlobUrl,
		createBase64Url: createBase64Url,
		type: type,
		parse: parse,
		qs: qs,
		qsa: qsa,
		qsp: qsp,
		sprint: sprint,
		treeWalker: treeWalker,
		walk: walk,
		blob2base64: blob2base64,
		defer: defer$1,
		querySelectorByType: querySelectorByType,
		findChildren: findChildren,
		parents: parents,
		filterChildren: filterChildren,
		getParentByTagName: getParentByTagName,
		nextSection: nextSection,
		prevSection: prevSection,
		serialize: serialize,
		RangeObject: RangeObject
	});

	if (!process$4) {
	  var process$4 = {
	    "cwd" : function () { return '/' }
	  };
	}

	function assertPath(path) {
	  if (typeof path !== 'string') {
	    throw new TypeError('Path must be a string. Received ' + path);
	  }
	}

	// Resolves . and .. elements in a path with directory names
	function normalizeStringPosix(path, allowAboveRoot) {
	  var res = '';
	  var lastSlash = -1;
	  var dots = 0;
	  var code;
	  for (var i = 0; i <= path.length; ++i) {
	    if (i < path.length)
	      code = path.charCodeAt(i);
	    else if (code === 47/*/*/)
	      break;
	    else
	      code = 47/*/*/;
	    if (code === 47/*/*/) {
	      if (lastSlash === i - 1 || dots === 1) {
	        // NOOP
	      } else if (lastSlash !== i - 1 && dots === 2) {
	        if (res.length < 2 ||
	            res.charCodeAt(res.length - 1) !== 46/*.*/ ||
	            res.charCodeAt(res.length - 2) !== 46/*.*/) {
	          if (res.length > 2) {
	            var start = res.length - 1;
	            var j = start;
	            for (; j >= 0; --j) {
	              if (res.charCodeAt(j) === 47/*/*/)
	                break;
	            }
	            if (j !== start) {
	              if (j === -1)
	                res = '';
	              else
	                res = res.slice(0, j);
	              lastSlash = i;
	              dots = 0;
	              continue;
	            }
	          } else if (res.length === 2 || res.length === 1) {
	            res = '';
	            lastSlash = i;
	            dots = 0;
	            continue;
	          }
	        }
	        if (allowAboveRoot) {
	          if (res.length > 0)
	            res += '/..';
	          else
	            res = '..';
	        }
	      } else {
	        if (res.length > 0)
	          res += '/' + path.slice(lastSlash + 1, i);
	        else
	          res = path.slice(lastSlash + 1, i);
	      }
	      lastSlash = i;
	      dots = 0;
	    } else if (code === 46/*.*/ && dots !== -1) {
	      ++dots;
	    } else {
	      dots = -1;
	    }
	  }
	  return res;
	}

	function _format(sep, pathObject) {
	  var dir = pathObject.dir || pathObject.root;
	  var base = pathObject.base ||
	    ((pathObject.name || '') + (pathObject.ext || ''));
	  if (!dir) {
	    return base;
	  }
	  if (dir === pathObject.root) {
	    return dir + base;
	  }
	  return dir + sep + base;
	}

	var posix = {
	  // path.resolve([from ...], to)
	  resolve: function resolve() {
	    var resolvedPath = '';
	    var resolvedAbsolute = false;
	    var cwd;

	    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	      var path;
	      if (i >= 0)
	        path = arguments[i];
	      else {
	        if (cwd === undefined)
	          cwd = process$4.cwd();
	        path = cwd;
	      }

	      assertPath(path);

	      // Skip empty entries
	      if (path.length === 0) {
	        continue;
	      }

	      resolvedPath = path + '/' + resolvedPath;
	      resolvedAbsolute = path.charCodeAt(0) === 47/*/*/;
	    }

	    // At this point the path should be resolved to a full absolute path, but
	    // handle relative paths to be safe (might happen when process.cwd() fails)

	    // Normalize the path
	    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

	    if (resolvedAbsolute) {
	      if (resolvedPath.length > 0)
	        return '/' + resolvedPath;
	      else
	        return '/';
	    } else if (resolvedPath.length > 0) {
	      return resolvedPath;
	    } else {
	      return '.';
	    }
	  },


	  normalize: function normalize(path) {
	    assertPath(path);

	    if (path.length === 0)
	      return '.';

	    var isAbsolute = path.charCodeAt(0) === 47/*/*/;
	    var trailingSeparator = path.charCodeAt(path.length - 1) === 47/*/*/;

	    // Normalize the path
	    path = normalizeStringPosix(path, !isAbsolute);

	    if (path.length === 0 && !isAbsolute)
	      path = '.';
	    if (path.length > 0 && trailingSeparator)
	      path += '/';

	    if (isAbsolute)
	      return '/' + path;
	    return path;
	  },


	  isAbsolute: function isAbsolute(path) {
	    assertPath(path);
	    return path.length > 0 && path.charCodeAt(0) === 47/*/*/;
	  },


	  join: function join() {
	    if (arguments.length === 0)
	      return '.';
	    var joined;
	    for (var i = 0; i < arguments.length; ++i) {
	      var arg = arguments[i];
	      assertPath(arg);
	      if (arg.length > 0) {
	        if (joined === undefined)
	          joined = arg;
	        else
	          joined += '/' + arg;
	      }
	    }
	    if (joined === undefined)
	      return '.';
	    return posix.normalize(joined);
	  },


	  relative: function relative(from, to) {
	    assertPath(from);
	    assertPath(to);

	    if (from === to)
	      return '';

	    from = posix.resolve(from);
	    to = posix.resolve(to);

	    if (from === to)
	      return '';

	    // Trim any leading backslashes
	    var fromStart = 1;
	    for (; fromStart < from.length; ++fromStart) {
	      if (from.charCodeAt(fromStart) !== 47/*/*/)
	        break;
	    }
	    var fromEnd = from.length;
	    var fromLen = (fromEnd - fromStart);

	    // Trim any leading backslashes
	    var toStart = 1;
	    for (; toStart < to.length; ++toStart) {
	      if (to.charCodeAt(toStart) !== 47/*/*/)
	        break;
	    }
	    var toEnd = to.length;
	    var toLen = (toEnd - toStart);

	    // Compare paths to find the longest common path from root
	    var length = (fromLen < toLen ? fromLen : toLen);
	    var lastCommonSep = -1;
	    var i = 0;
	    for (; i <= length; ++i) {
	      if (i === length) {
	        if (toLen > length) {
	          if (to.charCodeAt(toStart + i) === 47/*/*/) {
	            // We get here if `from` is the exact base path for `to`.
	            // For example: from='/foo/bar'; to='/foo/bar/baz'
	            return to.slice(toStart + i + 1);
	          } else if (i === 0) {
	            // We get here if `from` is the root
	            // For example: from='/'; to='/foo'
	            return to.slice(toStart + i);
	          }
	        } else if (fromLen > length) {
	          if (from.charCodeAt(fromStart + i) === 47/*/*/) {
	            // We get here if `to` is the exact base path for `from`.
	            // For example: from='/foo/bar/baz'; to='/foo/bar'
	            lastCommonSep = i;
	          } else if (i === 0) {
	            // We get here if `to` is the root.
	            // For example: from='/foo'; to='/'
	            lastCommonSep = 0;
	          }
	        }
	        break;
	      }
	      var fromCode = from.charCodeAt(fromStart + i);
	      var toCode = to.charCodeAt(toStart + i);
	      if (fromCode !== toCode)
	        break;
	      else if (fromCode === 47/*/*/)
	        lastCommonSep = i;
	    }

	    var out = '';
	    // Generate the relative path based on the path difference between `to`
	    // and `from`
	    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
	      if (i === fromEnd || from.charCodeAt(i) === 47/*/*/) {
	        if (out.length === 0)
	          out += '..';
	        else
	          out += '/..';
	      }
	    }

	    // Lastly, append the rest of the destination (`to`) path that comes after
	    // the common path parts
	    if (out.length > 0)
	      return out + to.slice(toStart + lastCommonSep);
	    else {
	      toStart += lastCommonSep;
	      if (to.charCodeAt(toStart) === 47/*/*/)
	        ++toStart;
	      return to.slice(toStart);
	    }
	  },


	  _makeLong: function _makeLong(path) {
	    return path;
	  },


	  dirname: function dirname(path) {
	    assertPath(path);
	    if (path.length === 0)
	      return '.';
	    var code = path.charCodeAt(0);
	    var hasRoot = (code === 47/*/*/);
	    var end = -1;
	    var matchedSlash = true;
	    for (var i = path.length - 1; i >= 1; --i) {
	      code = path.charCodeAt(i);
	      if (code === 47/*/*/) {
	        if (!matchedSlash) {
	          end = i;
	          break;
	        }
	      } else {
	        // We saw the first non-path separator
	        matchedSlash = false;
	      }
	    }

	    if (end === -1)
	      return hasRoot ? '/' : '.';
	    if (hasRoot && end === 1)
	      return '//';
	    return path.slice(0, end);
	  },


	  basename: function basename(path, ext) {
	    if (ext !== undefined && typeof ext !== 'string')
	      throw new TypeError('"ext" argument must be a string');
	    assertPath(path);

	    var start = 0;
	    var end = -1;
	    var matchedSlash = true;
	    var i;

	    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
	      if (ext.length === path.length && ext === path)
	        return '';
	      var extIdx = ext.length - 1;
	      var firstNonSlashEnd = -1;
	      for (i = path.length - 1; i >= 0; --i) {
	        var code = path.charCodeAt(i);
	        if (code === 47/*/*/) {
	          // If we reached a path separator that was not part of a set of path
	          // separators at the end of the string, stop now
	          if (!matchedSlash) {
	            start = i + 1;
	            break;
	          }
	        } else {
	          if (firstNonSlashEnd === -1) {
	            // We saw the first non-path separator, remember this index in case
	            // we need it if the extension ends up not matching
	            matchedSlash = false;
	            firstNonSlashEnd = i + 1;
	          }
	          if (extIdx >= 0) {
	            // Try to match the explicit extension
	            if (code === ext.charCodeAt(extIdx)) {
	              if (--extIdx === -1) {
	                // We matched the extension, so mark this as the end of our path
	                // component
	                end = i;
	              }
	            } else {
	              // Extension does not match, so our result is the entire path
	              // component
	              extIdx = -1;
	              end = firstNonSlashEnd;
	            }
	          }
	        }
	      }

	      if (start === end)
	        end = firstNonSlashEnd;
	      else if (end === -1)
	        end = path.length;
	      return path.slice(start, end);
	    } else {
	      for (i = path.length - 1; i >= 0; --i) {
	        if (path.charCodeAt(i) === 47/*/*/) {
	          // If we reached a path separator that was not part of a set of path
	          // separators at the end of the string, stop now
	          if (!matchedSlash) {
	            start = i + 1;
	            break;
	          }
	        } else if (end === -1) {
	          // We saw the first non-path separator, mark this as the end of our
	          // path component
	          matchedSlash = false;
	          end = i + 1;
	        }
	      }

	      if (end === -1)
	        return '';
	      return path.slice(start, end);
	    }
	  },


	  extname: function extname(path) {
	    assertPath(path);
	    var startDot = -1;
	    var startPart = 0;
	    var end = -1;
	    var matchedSlash = true;
	    // Track the state of characters (if any) we see before our first dot and
	    // after any path separator we find
	    var preDotState = 0;
	    for (var i = path.length - 1; i >= 0; --i) {
	      var code = path.charCodeAt(i);
	      if (code === 47/*/*/) {
	        // If we reached a path separator that was not part of a set of path
	        // separators at the end of the string, stop now
	        if (!matchedSlash) {
	          startPart = i + 1;
	          break;
	        }
	        continue;
	      }
	      if (end === -1) {
	        // We saw the first non-path separator, mark this as the end of our
	        // extension
	        matchedSlash = false;
	        end = i + 1;
	      }
	      if (code === 46/*.*/) {
	        // If this is our first dot, mark it as the start of our extension
	        if (startDot === -1)
	          startDot = i;
	        else if (preDotState !== 1)
	          preDotState = 1;
	      } else if (startDot !== -1) {
	        // We saw a non-dot and non-path separator before our dot, so we should
	        // have a good chance at having a non-empty extension
	        preDotState = -1;
	      }
	    }

	    if (startDot === -1 ||
	        end === -1 ||
	        // We saw a non-dot character immediately before the dot
	        preDotState === 0 ||
	        // The (right-most) trimmed path component is exactly '..'
	        (preDotState === 1 &&
	         startDot === end - 1 &&
	         startDot === startPart + 1)) {
	      return '';
	    }
	    return path.slice(startDot, end);
	  },


	  format: function format(pathObject) {
	    if (pathObject === null || typeof pathObject !== 'object') {
	      throw new TypeError(
	        'Parameter "pathObject" must be an object, not ' + typeof(pathObject)
	      );
	    }
	    return _format('/', pathObject);
	  },


	  parse: function parse(path) {
	    assertPath(path);

	    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
	    if (path.length === 0)
	      return ret;
	    var code = path.charCodeAt(0);
	    var isAbsolute = (code === 47/*/*/);
	    var start;
	    if (isAbsolute) {
	      ret.root = '/';
	      start = 1;
	    } else {
	      start = 0;
	    }
	    var startDot = -1;
	    var startPart = 0;
	    var end = -1;
	    var matchedSlash = true;
	    var i = path.length - 1;

	    // Track the state of characters (if any) we see before our first dot and
	    // after any path separator we find
	    var preDotState = 0;

	    // Get non-dir info
	    for (; i >= start; --i) {
	      code = path.charCodeAt(i);
	      if (code === 47/*/*/) {
	        // If we reached a path separator that was not part of a set of path
	        // separators at the end of the string, stop now
	        if (!matchedSlash) {
	          startPart = i + 1;
	          break;
	        }
	        continue;
	      }
	      if (end === -1) {
	        // We saw the first non-path separator, mark this as the end of our
	        // extension
	        matchedSlash = false;
	        end = i + 1;
	      }
	      if (code === 46/*.*/) {
	        // If this is our first dot, mark it as the start of our extension
	        if (startDot === -1)
	          startDot = i;
	        else if (preDotState !== 1)
	          preDotState = 1;
	      } else if (startDot !== -1) {
	        // We saw a non-dot and non-path separator before our dot, so we should
	        // have a good chance at having a non-empty extension
	        preDotState = -1;
	      }
	    }

	    if (startDot === -1 ||
	        end === -1 ||
	        // We saw a non-dot character immediately before the dot
	        preDotState === 0 ||
	        // The (right-most) trimmed path component is exactly '..'
	        (preDotState === 1 &&
	         startDot === end - 1 &&
	         startDot === startPart + 1)) {
	      if (end !== -1) {
	        if (startPart === 0 && isAbsolute)
	          ret.base = ret.name = path.slice(1, end);
	        else
	          ret.base = ret.name = path.slice(startPart, end);
	      }
	    } else {
	      if (startPart === 0 && isAbsolute) {
	        ret.name = path.slice(1, startDot);
	        ret.base = path.slice(1, end);
	      } else {
	        ret.name = path.slice(startPart, startDot);
	        ret.base = path.slice(startPart, end);
	      }
	      ret.ext = path.slice(startDot, end);
	    }

	    if (startPart > 0)
	      ret.dir = path.slice(0, startPart - 1);
	    else if (isAbsolute)
	      ret.dir = '/';

	    return ret;
	  },


	  sep: '/',
	  delimiter: ':',
	  posix: null
	};


	var path = posix;

	/**
	 * Creates a Path object for parsing and manipulation of a path strings
	 *
	 * Uses a polyfill for Nodejs path: https://nodejs.org/api/path.html
	 * @param	{string} pathString	a url string (relative or absolute)
	 * @class
	 */

	var Path = function () {
		function Path(pathString) {
			_classCallCheck(this, Path);

			var protocol;
			var parsed;

			protocol = pathString.indexOf("://");
			if (protocol > -1) {
				pathString = new URL(pathString).pathname;
			}

			parsed = this.parse(pathString);

			this.path = pathString;

			if (this.isDirectory(pathString)) {
				this.directory = pathString;
			} else {
				this.directory = parsed.dir + "/";
			}

			this.filename = parsed.base;
			this.extension = parsed.ext.slice(1);
		}

		/**
	  * Parse the path: https://nodejs.org/api/path.html#path_path_parse_path
	  * @param	{string} what
	  * @returns {object}
	  */


		_createClass(Path, [{
			key: "parse",
			value: function parse(what) {
				return path.parse(what);
			}

			/**
	   * @param	{string} what
	   * @returns {boolean}
	   */

		}, {
			key: "isAbsolute",
			value: function isAbsolute(what) {
				return path.isAbsolute(what || this.path);
			}

			/**
	   * Check if path ends with a directory
	   * @param	{string} what
	   * @returns {boolean}
	   */

		}, {
			key: "isDirectory",
			value: function isDirectory(what) {
				return what.charAt(what.length - 1) === "/";
			}

			/**
	   * Resolve a path against the directory of the Path
	   *
	   * https://nodejs.org/api/path.html#path_path_resolve_paths
	   * @param	{string} what
	   * @returns {string} resolved
	   */

		}, {
			key: "resolve",
			value: function resolve(what) {
				return path.resolve(this.directory, what);
			}

			/**
	   * Resolve a path relative to the directory of the Path
	   *
	   * https://nodejs.org/api/path.html#path_path_relative_from_to
	   * @param	{string} what
	   * @returns {string} relative
	   */

		}, {
			key: "relative",
			value: function relative(what) {
				return path.relative(this.directory, what);
			}
		}, {
			key: "splitPath",
			value: function splitPath(filename) {
				return this.splitPathRe.exec(filename).slice(1);
			}

			/**
	   * Return the path string
	   * @returns {string} path
	   */

		}, {
			key: "toString",
			value: function toString() {
				return this.path;
			}
		}]);

		return Path;
	}();

	/**
	 * creates a Url object for parsing and manipulation of a url string
	 * @param	{string} urlString	a url string (relative or absolute)
	 * @param	{string} [baseString] optional base for the url,
	 * default to window.location.href
	 */

	var Url = function () {
		function Url(urlString, baseString) {
			_classCallCheck(this, Url);

			var absolute = urlString.indexOf("://") > -1;
			var pathname = urlString;
			var basePath;

			this.Url = undefined;
			this.href = urlString;
			this.protocol = "";
			this.origin = "";
			this.hash = "";
			this.hash = "";
			this.search = "";
			this.base = baseString;

			if (!absolute && baseString !== false && typeof baseString !== "string" && typeof window !== "undefined" && typeof window.location !== "undefined") {
				this.base = window.location.href;
			}

			// URL Polyfill doesn't throw an error if base is empty
			if (absolute || this.base) {
				try {
					if (this.base) {
						// Safari doesn't like an undefined base
						this.Url = new URL(urlString, this.base);
					} else {
						this.Url = new URL(urlString);
					}
					this.href = this.Url.href;

					this.protocol = this.Url.protocol;
					this.origin = this.Url.origin;
					this.hash = this.Url.hash;
					this.search = this.Url.search;

					pathname = this.Url.pathname;
				} catch (e) {
					// Skip URL parsing
					this.Url = undefined;
					// resolve the pathname from the base
					if (this.base) {
						basePath = new Path(this.base);
						pathname = basePath.resolve(pathname);
					}
				}
			}

			this.Path = new Path(pathname);

			this.directory = this.Path.directory;
			this.filename = this.Path.filename;
			this.extension = this.Path.extension;
		}

		/**
	  * @returns {Path}
	  */


		_createClass(Url, [{
			key: "path",
			value: function path$$1() {
				return this.Path;
			}

			/**
	   * Resolves a relative path to a absolute url
	   * @returns {string} url
	   */

		}, {
			key: "resolve",
			value: function resolve(what) {
				var isAbsolute = what.indexOf("://") > -1;
				var fullpath;

				if (isAbsolute) {
					return what;
				}

				fullpath = path.resolve(this.directory, what);
				return this.origin + fullpath;
			}

			/**
	   * Resolve a path relative to the url
	   * @returns {string} path
	   */

		}, {
			key: "relative",
			value: function relative(what) {
				return path.relative(what, this.directory);
			}

			/**
	   * @returns {string}
	   */

		}, {
			key: "toString",
			value: function toString() {
				return this.href;
			}
		}]);

		return Url;
	}();

	var f$5 = _wks;

	var _wksExt = {
		f: f$5
	};

	var iterator = _wksExt.f('iterator');

	var iterator$1 = createCommonjsModule(function (module) {
	module.exports = { "default": iterator, __esModule: true };
	});

	unwrapExports(iterator$1);

	var defineProperty$2 = _objectDp.f;
	var _wksDefine = function(name){
	  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty$2($Symbol, name, {value: _wksExt.f(name)});
	};

	var _keyof = function(object, el){
	  var O      = _toIobject(object)
	    , keys   = _objectKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

	var f$6 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$6
	};

	// all enumerable object keys, includes symbols

	var _enumKeys = function(it){
	  var result     = _objectKeys(it)
	    , getSymbols = _objectGops.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = _objectPie.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg){
	  return _cof(arg) == 'Array';
	};

	// ECMAScript 6 symbols shim
	var META           = _meta.KEY
	  , gOPD$1           = _objectGopd.f
	  , dP$1             = _objectDp.f
	  , gOPN$1           = _objectGopnExt.f
	  , $Symbol        = _global.Symbol
	  , $JSON$1          = _global.JSON
	  , _stringify     = $JSON$1 && $JSON$1.stringify
	  , PROTOTYPE$2      = 'prototype'
	  , HIDDEN         = _wks('_hidden')
	  , TO_PRIMITIVE   = _wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = _shared('symbol-registry')
	  , AllSymbols     = _shared('symbols')
	  , OPSymbols      = _shared('op-symbols')
	  , ObjectProto$1    = Object[PROTOTYPE$2]
	  , USE_NATIVE$1     = typeof $Symbol == 'function'
	  , QObject        = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function(){
	  return _objectCreate(dP$1({}, 'a', {
	    get: function(){ return dP$1(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD$1(ObjectProto$1, key);
	  if(protoDesc)delete ObjectProto$1[key];
	  dP$1(it, key, D);
	  if(protoDesc && it !== ObjectProto$1)dP$1(ObjectProto$1, key, protoDesc);
	} : dP$1;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto$1)$defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if(_has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!_has(it, HIDDEN))dP$1(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(_has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _objectCreate(D, {enumerable: _propertyDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if(this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key))return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key){
	  it  = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if(it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key))return;
	  var D = gOPD$1(it, key);
	  if(D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN$1(_toIobject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto$1
	    , names  = gOPN$1(IS_OP ? OPSymbols : _toIobject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE$1){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto$1)$set.call(OPSymbols, value);
	      if(_has(this, HIDDEN) && _has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if(_descriptors && setter)setSymbolDesc(ObjectProto$1, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString(){
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor$1;
	  _objectDp.f   = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f  = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if(_descriptors && !_library){
	    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function(name){
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i$1 = 0; symbols.length > i$1; )_wks(symbols[i$1++]);

	for(var symbols = _objectKeys(_wks.store), i$1 = 0; symbols.length > i$1; )_wksDefine(symbols[i$1++]);

	_export(_export.S + _export.F * !USE_NATIVE$1, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return _keyof(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE$1, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor$1,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON$1 && _export(_export.S + _export.F * (!USE_NATIVE$1 || _fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !_isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON$1, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	var symbol = _core.Symbol;

	var symbol$1 = createCommonjsModule(function (module) {
	module.exports = { "default": symbol, __esModule: true };
	});

	unwrapExports(symbol$1);

	var _typeof_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _iterator2 = _interopRequireDefault(iterator$1);



	var _symbol2 = _interopRequireDefault(symbol$1);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};
	});

	var _typeof = unwrapExports(_typeof_1);

	var ELEMENT_NODE$1 = 1;
	var TEXT_NODE$1 = 3;
	// const COMMENT_NODE = 8;
	var DOCUMENT_NODE$1 = 9;

	/**
		* Parsing and creation of EpubCFIs: http://www.idpf.org/epub/linking/cfi/epub-cfi.html

		* Implements:
		* - Character Offset: epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)
		* - Simple Ranges : epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)

		* Does Not Implement:
		* - Temporal Offset (~)
		* - Spatial Offset (@)
		* - Temporal-Spatial Offset (~ + @)
		* - Text Location Assertion ([)
		* @class
		@param {string | Range | Node } [cfiFrom]
		@param {string | object} [base]
		@param {string} [ignoreClass] class to ignore when parsing DOM
	*/

	var EpubCFI = function () {
		function EpubCFI(cfiFrom, base, ignoreClass) {
			_classCallCheck(this, EpubCFI);

			var type$$1;

			this.str = "";

			this.base = {};
			this.spinePos = 0; // For compatibility

			this.range = false; // true || false;

			this.path = {};
			this.start = null;
			this.end = null;

			// Allow instantiation without the "new" keyword
			if (!(this instanceof EpubCFI)) {
				return new EpubCFI(cfiFrom, base, ignoreClass);
			}

			if (typeof base === "string") {
				this.base = this.parseComponent(base);
			} else if ((typeof base === "undefined" ? "undefined" : _typeof(base)) === "object" && base.steps) {
				this.base = base;
			}

			type$$1 = this.checkType(cfiFrom);

			if (type$$1 === "string") {
				this.str = cfiFrom;
				return extend(this, this.parse(cfiFrom));
			} else if (type$$1 === "range") {
				return extend(this, this.fromRange(cfiFrom, this.base, ignoreClass));
			} else if (type$$1 === "node") {
				return extend(this, this.fromNode(cfiFrom, this.base, ignoreClass));
			} else if (type$$1 === "EpubCFI" && cfiFrom.path) {
				return cfiFrom;
			} else if (!cfiFrom) {
				return this;
			} else {
				throw new TypeError("not a valid argument for EpubCFI");
			}
		}

		/**
	  * Check the type of constructor input
	  * @private
	  */


		_createClass(EpubCFI, [{
			key: "checkType",
			value: function checkType(cfi) {

				if (this.isCfiString(cfi)) {
					return "string";
					// Is a range object
				} else if ((typeof cfi === "undefined" ? "undefined" : _typeof(cfi)) === "object" && (type(cfi) === "Range" || typeof cfi.startContainer != "undefined")) {
					return "range";
				} else if ((typeof cfi === "undefined" ? "undefined" : _typeof(cfi)) === "object" && typeof cfi.nodeType != "undefined") {
					// || typeof cfi === "function"
					return "node";
				} else if ((typeof cfi === "undefined" ? "undefined" : _typeof(cfi)) === "object" && cfi instanceof EpubCFI) {
					return "EpubCFI";
				} else {
					return false;
				}
			}

			/**
	   * Parse a cfi string to a CFI object representation
	   * @param {string} cfiStr
	   * @returns {object} cfi
	   */

		}, {
			key: "parse",
			value: function parse$$1(cfiStr) {
				var cfi = {
					spinePos: -1,
					range: false,
					base: {},
					path: {},
					start: null,
					end: null
				};
				var baseComponent, pathComponent, range;

				if (typeof cfiStr !== "string") {
					return { spinePos: -1 };
				}

				if (cfiStr.indexOf("epubcfi(") === 0 && cfiStr[cfiStr.length - 1] === ")") {
					// Remove intial epubcfi( and ending )
					cfiStr = cfiStr.slice(8, cfiStr.length - 1);
				}

				baseComponent = this.getChapterComponent(cfiStr);

				// Make sure this is a valid cfi or return
				if (!baseComponent) {
					return { spinePos: -1 };
				}

				cfi.base = this.parseComponent(baseComponent);

				pathComponent = this.getPathComponent(cfiStr);
				cfi.path = this.parseComponent(pathComponent);

				range = this.getRange(cfiStr);

				if (range) {
					cfi.range = true;
					cfi.start = this.parseComponent(range[0]);
					cfi.end = this.parseComponent(range[1]);
				}

				// Get spine node position
				// cfi.spineSegment = cfi.base.steps[1];

				// Chapter segment is always the second step
				if (!cfi.base.steps || cfi.base.steps.length < 2) {
					return { spinePos: -1 };
				} else {
					cfi.spinePos = cfi.base.steps[1].index;
				}

				return cfi;
			}
		}, {
			key: "parseComponent",
			value: function parseComponent(componentStr) {
				var component = {
					steps: [],
					terminal: {
						offset: null,
						assertion: null
					}
				};
				var parts = componentStr.split(":");
				var steps = parts[0].split("/");
				var terminal;

				if (parts.length > 1) {
					terminal = parts[1];
					component.terminal = this.parseTerminal(terminal);
				}

				if (steps[0] === "") {
					steps.shift(); // Ignore the first slash
				}

				component.steps = steps.map(function (step) {
					return this.parseStep(step);
				}.bind(this));

				return component;
			}
		}, {
			key: "parseStep",
			value: function parseStep(stepStr) {
				var type$$1, num, index, has_brackets, id;

				has_brackets = stepStr.match(/\[(.*)\]/);
				if (has_brackets && has_brackets[1]) {
					id = has_brackets[1];
				}

				//-- Check if step is a text node or element
				num = parseInt(stepStr);

				if (isNaN(num)) {
					return;
				}

				if (num % 2 === 0) {
					// Even = is an element
					type$$1 = "element";
					index = num / 2 - 1;
				} else {
					type$$1 = "text";
					index = (num - 1) / 2;
				}

				return {
					"type": type$$1,
					"index": index,
					"id": id || null
				};
			}
		}, {
			key: "parseTerminal",
			value: function parseTerminal(termialStr) {
				var characterOffset, textLocationAssertion;
				var assertion = termialStr.match(/\[(.*)\]/);

				if (assertion && assertion[1]) {
					characterOffset = parseInt(termialStr.split("[")[0]);
					textLocationAssertion = assertion[1];
				} else {
					characterOffset = parseInt(termialStr);
				}

				if (!isNumber(characterOffset)) {
					characterOffset = null;
				}

				return {
					"offset": characterOffset,
					"assertion": textLocationAssertion
				};
			}
		}, {
			key: "getChapterComponent",
			value: function getChapterComponent(cfiStr) {

				var indirection = cfiStr.split("!");

				return indirection[0];
			}
		}, {
			key: "getPathComponent",
			value: function getPathComponent(cfiStr) {

				var indirection = cfiStr.split("!");

				if (indirection[1]) {
					var ranges = indirection[1].split(",");
					return ranges[0];
				}
			}
		}, {
			key: "getRange",
			value: function getRange(cfiStr) {

				var ranges = cfiStr.split(",");

				if (ranges.length === 3) {
					return [ranges[1], ranges[2]];
				}

				return false;
			}
		}, {
			key: "getCharecterOffsetComponent",
			value: function getCharecterOffsetComponent(cfiStr) {
				var splitStr = cfiStr.split(":");
				return splitStr[1] || "";
			}
		}, {
			key: "joinSteps",
			value: function joinSteps(steps) {
				if (!steps) {
					return "";
				}

				return steps.map(function (part) {
					var segment = "";

					if (part.type === "element") {
						segment += (part.index + 1) * 2;
					}

					if (part.type === "text") {
						segment += 1 + 2 * part.index; // TODO: double check that this is odd
					}

					if (part.id) {
						segment += "[" + part.id + "]";
					}

					return segment;
				}).join("/");
			}
		}, {
			key: "segmentString",
			value: function segmentString(segment) {
				var segmentString = "/";

				segmentString += this.joinSteps(segment.steps);

				if (segment.terminal && segment.terminal.offset != null) {
					segmentString += ":" + segment.terminal.offset;
				}

				if (segment.terminal && segment.terminal.assertion != null) {
					segmentString += "[" + segment.terminal.assertion + "]";
				}

				return segmentString;
			}

			/**
	   * Convert CFI to a epubcfi(...) string
	   * @returns {string} epubcfi
	   */

		}, {
			key: "toString",
			value: function toString() {
				var cfiString = "epubcfi(";

				cfiString += this.segmentString(this.base);

				cfiString += "!";
				cfiString += this.segmentString(this.path);

				// Add Range, if present
				if (this.range && this.start) {
					cfiString += ",";
					cfiString += this.segmentString(this.start);
				}

				if (this.range && this.end) {
					cfiString += ",";
					cfiString += this.segmentString(this.end);
				}

				cfiString += ")";

				return cfiString;
			}

			/**
	   * Compare which of two CFIs is earlier in the text
	   * @returns {number} First is earlier = 1, Second is earlier = -1, They are equal = 0
	   */

		}, {
			key: "compare",
			value: function compare(cfiOne, cfiTwo) {
				var stepsA, stepsB;
				var terminalA, terminalB;

				if (typeof cfiOne === "string") {
					cfiOne = new EpubCFI(cfiOne);
				}
				if (typeof cfiTwo === "string") {
					cfiTwo = new EpubCFI(cfiTwo);
				}
				// Compare Spine Positions
				if (cfiOne.spinePos > cfiTwo.spinePos) {
					return 1;
				}
				if (cfiOne.spinePos < cfiTwo.spinePos) {
					return -1;
				}

				if (cfiOne.range) {
					stepsA = cfiOne.path.steps.concat(cfiOne.start.steps);
					terminalA = cfiOne.start.terminal;
				} else {
					stepsA = cfiOne.path.steps;
					terminalA = cfiOne.path.terminal;
				}

				if (cfiTwo.range) {
					stepsB = cfiTwo.path.steps.concat(cfiTwo.start.steps);
					terminalB = cfiTwo.start.terminal;
				} else {
					stepsB = cfiTwo.path.steps;
					terminalB = cfiTwo.path.terminal;
				}

				// Compare Each Step in the First item
				for (var i = 0; i < stepsA.length; i++) {
					if (!stepsA[i]) {
						return -1;
					}
					if (!stepsB[i]) {
						return 1;
					}
					if (stepsA[i].index > stepsB[i].index) {
						return 1;
					}
					if (stepsA[i].index < stepsB[i].index) {
						return -1;
					}
					// Otherwise continue checking
				}

				// All steps in First equal to Second and First is Less Specific
				if (stepsA.length < stepsB.length) {
					return 1;
				}

				// Compare the charecter offset of the text node
				if (terminalA.offset > terminalB.offset) {
					return 1;
				}
				if (terminalA.offset < terminalB.offset) {
					return -1;
				}

				// CFI's are equal
				return 0;
			}
		}, {
			key: "step",
			value: function step(node) {
				var nodeType = node.nodeType === TEXT_NODE$1 ? "text" : "element";

				return {
					"id": node.id,
					"tagName": node.tagName,
					"type": nodeType,
					"index": this.position(node)
				};
			}
		}, {
			key: "filteredStep",
			value: function filteredStep(node, ignoreClass) {
				var filteredNode = this.filter(node, ignoreClass);
				var nodeType;

				// Node filtered, so ignore
				if (!filteredNode) {
					return;
				}

				// Otherwise add the filter node in
				nodeType = filteredNode.nodeType === TEXT_NODE$1 ? "text" : "element";

				return {
					"id": filteredNode.id,
					"tagName": filteredNode.tagName,
					"type": nodeType,
					"index": this.filteredPosition(filteredNode, ignoreClass)
				};
			}
		}, {
			key: "pathTo",
			value: function pathTo(node, offset, ignoreClass) {
				var segment = {
					steps: [],
					terminal: {
						offset: null,
						assertion: null
					}
				};
				var currentNode = node;
				var step;

				while (currentNode && currentNode.parentNode && currentNode.parentNode.nodeType != DOCUMENT_NODE$1) {

					if (ignoreClass) {
						step = this.filteredStep(currentNode, ignoreClass);
					} else {
						step = this.step(currentNode);
					}

					if (step) {
						segment.steps.unshift(step);
					}

					currentNode = currentNode.parentNode;
				}

				if (offset != null && offset >= 0) {

					segment.terminal.offset = offset;

					// Make sure we are getting to a textNode if there is an offset
					if (segment.steps[segment.steps.length - 1].type != "text") {
						segment.steps.push({
							"type": "text",
							"index": 0
						});
					}
				}

				return segment;
			}
		}, {
			key: "equalStep",
			value: function equalStep(stepA, stepB) {
				if (!stepA || !stepB) {
					return false;
				}

				if (stepA.index === stepB.index && stepA.id === stepB.id && stepA.type === stepB.type) {
					return true;
				}

				return false;
			}

			/**
	   * Create a CFI object from a Range
	   * @param {Range} range
	   * @param {string | object} base
	   * @param {string} [ignoreClass]
	   * @returns {object} cfi
	   */

		}, {
			key: "fromRange",
			value: function fromRange(range, base, ignoreClass) {
				var cfi = {
					range: false,
					base: {},
					path: {},
					start: null,
					end: null
				};

				var start = range.startContainer;
				var end = range.endContainer;

				var startOffset = range.startOffset;
				var endOffset = range.endOffset;

				var needsIgnoring = false;

				if (ignoreClass) {
					// Tell pathTo if / what to ignore
					needsIgnoring = start.ownerDocument.querySelector("." + ignoreClass) != null;
				}

				if (typeof base === "string") {
					cfi.base = this.parseComponent(base);
					cfi.spinePos = cfi.base.steps[1].index;
				} else if ((typeof base === "undefined" ? "undefined" : _typeof(base)) === "object") {
					cfi.base = base;
				}

				if (range.collapsed) {
					if (needsIgnoring) {
						startOffset = this.patchOffset(start, startOffset, ignoreClass);
					}
					cfi.path = this.pathTo(start, startOffset, ignoreClass);
				} else {
					cfi.range = true;

					if (needsIgnoring) {
						startOffset = this.patchOffset(start, startOffset, ignoreClass);
					}

					cfi.start = this.pathTo(start, startOffset, ignoreClass);
					if (needsIgnoring) {
						endOffset = this.patchOffset(end, endOffset, ignoreClass);
					}

					cfi.end = this.pathTo(end, endOffset, ignoreClass);

					// Create a new empty path
					cfi.path = {
						steps: [],
						terminal: null
					};

					// Push steps that are shared between start and end to the common path
					var len = cfi.start.steps.length;
					var i;

					for (i = 0; i < len; i++) {
						if (this.equalStep(cfi.start.steps[i], cfi.end.steps[i])) {
							if (i === len - 1) {
								// Last step is equal, check terminals
								if (cfi.start.terminal === cfi.end.terminal) {
									// CFI's are equal
									cfi.path.steps.push(cfi.start.steps[i]);
									// Not a range
									cfi.range = false;
								}
							} else {
								cfi.path.steps.push(cfi.start.steps[i]);
							}
						} else {
							break;
						}
					}

					cfi.start.steps = cfi.start.steps.slice(cfi.path.steps.length);
					cfi.end.steps = cfi.end.steps.slice(cfi.path.steps.length);

					// TODO: Add Sanity check to make sure that the end if greater than the start
				}

				return cfi;
			}

			/**
	   * Create a CFI object from a Node
	   * @param {Node} anchor
	   * @param {string | object} base
	   * @param {string} [ignoreClass]
	   * @returns {object} cfi
	   */

		}, {
			key: "fromNode",
			value: function fromNode(anchor, base, ignoreClass) {
				var cfi = {
					range: false,
					base: {},
					path: {},
					start: null,
					end: null
				};

				if (typeof base === "string") {
					cfi.base = this.parseComponent(base);
					cfi.spinePos = cfi.base.steps[1].index;
				} else if ((typeof base === "undefined" ? "undefined" : _typeof(base)) === "object") {
					cfi.base = base;
				}

				cfi.path = this.pathTo(anchor, null, ignoreClass);

				return cfi;
			}
		}, {
			key: "filter",
			value: function filter(anchor, ignoreClass) {
				var needsIgnoring;
				var sibling; // to join with
				var parent, previousSibling, nextSibling;
				var isText = false;

				if (anchor.nodeType === TEXT_NODE$1) {
					isText = true;
					parent = anchor.parentNode;
					needsIgnoring = anchor.parentNode.classList.contains(ignoreClass);
				} else {
					isText = false;
					needsIgnoring = anchor.classList.contains(ignoreClass);
				}

				if (needsIgnoring && isText) {
					previousSibling = parent.previousSibling;
					nextSibling = parent.nextSibling;

					// If the sibling is a text node, join the nodes
					if (previousSibling && previousSibling.nodeType === TEXT_NODE$1) {
						sibling = previousSibling;
					} else if (nextSibling && nextSibling.nodeType === TEXT_NODE$1) {
						sibling = nextSibling;
					}

					if (sibling) {
						return sibling;
					} else {
						// Parent will be ignored on next step
						return anchor;
					}
				} else if (needsIgnoring && !isText) {
					// Otherwise just skip the element node
					return false;
				} else {
					// No need to filter
					return anchor;
				}
			}
		}, {
			key: "patchOffset",
			value: function patchOffset(anchor, offset, ignoreClass) {
				if (anchor.nodeType != TEXT_NODE$1) {
					throw new Error("Anchor must be a text node");
				}

				var curr = anchor;
				var totalOffset = offset;

				// If the parent is a ignored node, get offset from it's start
				if (anchor.parentNode.classList.contains(ignoreClass)) {
					curr = anchor.parentNode;
				}

				while (curr.previousSibling) {
					if (curr.previousSibling.nodeType === ELEMENT_NODE$1) {
						// Originally a text node, so join
						if (curr.previousSibling.classList.contains(ignoreClass)) {
							totalOffset += curr.previousSibling.textContent.length;
						} else {
							break; // Normal node, dont join
						}
					} else {
						// If the previous sibling is a text node, join the nodes
						totalOffset += curr.previousSibling.textContent.length;
					}

					curr = curr.previousSibling;
				}

				return totalOffset;
			}
		}, {
			key: "normalizedMap",
			value: function normalizedMap(children, nodeType, ignoreClass) {
				var output = {};
				var prevIndex = -1;
				var i,
				    len = children.length;
				var currNodeType;
				var prevNodeType;

				for (i = 0; i < len; i++) {

					currNodeType = children[i].nodeType;

					// Check if needs ignoring
					if (currNodeType === ELEMENT_NODE$1 && children[i].classList.contains(ignoreClass)) {
						currNodeType = TEXT_NODE$1;
					}

					if (i > 0 && currNodeType === TEXT_NODE$1 && prevNodeType === TEXT_NODE$1) {
						// join text nodes
						output[i] = prevIndex;
					} else if (nodeType === currNodeType) {
						prevIndex = prevIndex + 1;
						output[i] = prevIndex;
					}

					prevNodeType = currNodeType;
				}

				return output;
			}
		}, {
			key: "position",
			value: function position(anchor) {
				var children, index;
				if (anchor.nodeType === ELEMENT_NODE$1) {
					children = anchor.parentNode.children;
					if (!children) {
						children = findChildren(anchor.parentNode);
					}
					index = Array.prototype.indexOf.call(children, anchor);
				} else {
					children = this.textNodes(anchor.parentNode);
					index = children.indexOf(anchor);
				}

				return index;
			}
		}, {
			key: "filteredPosition",
			value: function filteredPosition(anchor, ignoreClass) {
				var children, index, map;

				if (anchor.nodeType === ELEMENT_NODE$1) {
					children = anchor.parentNode.children;
					map = this.normalizedMap(children, ELEMENT_NODE$1, ignoreClass);
				} else {
					children = anchor.parentNode.childNodes;
					// Inside an ignored node
					if (anchor.parentNode.classList.contains(ignoreClass)) {
						anchor = anchor.parentNode;
						children = anchor.parentNode.childNodes;
					}
					map = this.normalizedMap(children, TEXT_NODE$1, ignoreClass);
				}

				index = Array.prototype.indexOf.call(children, anchor);

				return map[index];
			}
		}, {
			key: "stepsToXpath",
			value: function stepsToXpath(steps) {
				var xpath = [".", "*"];

				steps.forEach(function (step) {
					var position = step.index + 1;

					if (step.id) {
						xpath.push("*[position()=" + position + " and @id='" + step.id + "']");
					} else if (step.type === "text") {
						xpath.push("text()[" + position + "]");
					} else {
						xpath.push("*[" + position + "]");
					}
				});

				return xpath.join("/");
			}

			/*
	  	To get the last step if needed:
	  	// Get the terminal step
	  lastStep = steps[steps.length-1];
	  // Get the query string
	  query = this.stepsToQuery(steps);
	  // Find the containing element
	  startContainerParent = doc.querySelector(query);
	  // Find the text node within that element
	  if(startContainerParent && lastStep.type == "text") {
	  	container = startContainerParent.childNodes[lastStep.index];
	  }
	  */

		}, {
			key: "stepsToQuerySelector",
			value: function stepsToQuerySelector(steps) {
				var query = ["html"];

				steps.forEach(function (step) {
					var position = step.index + 1;

					if (step.id) {
						query.push("#" + step.id);
					} else if (step.type === "text") {
						// unsupported in querySelector
						// query.push("text()[" + position + "]");
					} else {
						query.push("*:nth-child(" + position + ")");
					}
				});

				return query.join(">");
			}
		}, {
			key: "textNodes",
			value: function textNodes(container, ignoreClass) {
				return Array.prototype.slice.call(container.childNodes).filter(function (node) {
					if (node.nodeType === TEXT_NODE$1) {
						return true;
					} else if (ignoreClass && node.classList.contains(ignoreClass)) {
						return true;
					}
					return false;
				});
			}
		}, {
			key: "walkToNode",
			value: function walkToNode(steps, _doc, ignoreClass) {
				var doc = _doc || document;
				var container = doc.documentElement;
				var children;
				var step;
				var len = steps.length;
				var i;

				for (i = 0; i < len; i++) {
					step = steps[i];

					if (step.type === "element") {
						//better to get a container using id as some times step.index may not be correct
						//For ex.https://github.com/futurepress/epub.js/issues/561
						if (step.id) {
							container = doc.getElementById(step.id);
						} else {
							children = container.children || findChildren(container);
							container = children[step.index];
						}
					} else if (step.type === "text") {
						container = this.textNodes(container, ignoreClass)[step.index];
					}
					if (!container) {
						//Break the for loop as due to incorrect index we can get error if
						//container is undefined so that other functionailties works fine
						//like navigation
						break;
					}
				}

				return container;
			}
		}, {
			key: "findNode",
			value: function findNode(steps, _doc, ignoreClass) {
				var doc = _doc || document;
				var container;
				var xpath;

				if (!ignoreClass && typeof doc.evaluate != "undefined") {
					xpath = this.stepsToXpath(steps);
					container = doc.evaluate(xpath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				} else if (ignoreClass) {
					container = this.walkToNode(steps, doc, ignoreClass);
				} else {
					container = this.walkToNode(steps, doc);
				}

				return container;
			}
		}, {
			key: "fixMiss",
			value: function fixMiss(steps, offset, _doc, ignoreClass) {
				var container = this.findNode(steps.slice(0, -1), _doc, ignoreClass);
				var children = container.childNodes;
				var map = this.normalizedMap(children, TEXT_NODE$1, ignoreClass);
				var child;
				var len;
				var lastStepIndex = steps[steps.length - 1].index;

				for (var childIndex in map) {
					if (!map.hasOwnProperty(childIndex)) return;

					if (map[childIndex] === lastStepIndex) {
						child = children[childIndex];
						len = child.textContent.length;
						if (offset > len) {
							offset = offset - len;
						} else {
							if (child.nodeType === ELEMENT_NODE$1) {
								container = child.childNodes[0];
							} else {
								container = child;
							}
							break;
						}
					}
				}

				return {
					container: container,
					offset: offset
				};
			}

			/**
	   * Creates a DOM range representing a CFI
	   * @param {document} _doc document referenced in the base
	   * @param {string} [ignoreClass]
	   * @return {Range}
	   */

		}, {
			key: "toRange",
			value: function toRange(_doc, ignoreClass) {
				var doc = _doc || document;
				var range;
				var start, end, startContainer, endContainer;
				var cfi = this;
				var startSteps, endSteps;
				var needsIgnoring = ignoreClass ? doc.querySelector("." + ignoreClass) != null : false;
				var missed;

				if (typeof doc.createRange !== "undefined") {
					range = doc.createRange();
				} else {
					range = new RangeObject();
				}

				if (cfi.range) {
					start = cfi.start;
					startSteps = cfi.path.steps.concat(start.steps);
					startContainer = this.findNode(startSteps, doc, needsIgnoring ? ignoreClass : null);
					end = cfi.end;
					endSteps = cfi.path.steps.concat(end.steps);
					endContainer = this.findNode(endSteps, doc, needsIgnoring ? ignoreClass : null);
				} else {
					start = cfi.path;
					startSteps = cfi.path.steps;
					startContainer = this.findNode(cfi.path.steps, doc, needsIgnoring ? ignoreClass : null);
				}

				if (startContainer) {
					try {

						if (start.terminal.offset != null) {
							range.setStart(startContainer, start.terminal.offset);
						} else {
							range.setStart(startContainer, 0);
						}
					} catch (e) {
						missed = this.fixMiss(startSteps, start.terminal.offset, doc, needsIgnoring ? ignoreClass : null);
						range.setStart(missed.container, missed.offset);
					}
				} else {
					console.log("No startContainer found for", this.toString());
					// No start found
					return null;
				}

				if (endContainer) {
					try {

						if (end.terminal.offset != null) {
							range.setEnd(endContainer, end.terminal.offset);
						} else {
							range.setEnd(endContainer, 0);
						}
					} catch (e) {
						missed = this.fixMiss(endSteps, cfi.end.terminal.offset, doc, needsIgnoring ? ignoreClass : null);
						range.setEnd(missed.container, missed.offset);
					}
				}

				// doc.defaultView.getSelection().addRange(range);
				return range;
			}

			/**
	   * Check if a string is wrapped with "epubcfi()"
	   * @param {string} str
	   * @returns {boolean}
	   */

		}, {
			key: "isCfiString",
			value: function isCfiString(str) {
				if (typeof str === "string" && str.indexOf("epubcfi(") === 0 && str[str.length - 1] === ")") {
					return true;
				}

				return false;
			}
		}, {
			key: "generateChapterComponent",
			value: function generateChapterComponent(_spineNodeIndex, _pos, id) {
				var pos = parseInt(_pos),
				    spineNodeIndex = (_spineNodeIndex + 1) * 2,
				    cfi = "/" + spineNodeIndex + "/";

				cfi += (pos + 1) * 2;

				if (id) {
					cfi += "[" + id + "]";
				}

				return cfi;
			}

			/**
	   * Collapse a CFI Range to a single CFI Position
	   * @param {boolean} [toStart=false]
	   */

		}, {
			key: "collapse",
			value: function collapse(toStart) {
				if (!this.range) {
					return;
				}

				this.range = false;

				if (toStart) {
					this.path.steps = this.path.steps.concat(this.start.steps);
					this.path.terminal = this.start.terminal;
				} else {
					this.path.steps = this.path.steps.concat(this.end.steps);
					this.path.terminal = this.end.terminal;
				}
			}
		}]);

		return EpubCFI;
	}();

	/**
	 * Hooks allow for injecting functions that must all complete in order before finishing
	 * They will execute in parallel but all must finish before continuing
	 * Functions may return a promise if they are asycn.
	 * @param {any} context scope of this
	 * @example this.content = new EPUBJS.Hook(this);
	 */
	var Hook = function () {
		function Hook(context) {
			_classCallCheck(this, Hook);

			this.context = context || this;
			this.hooks = [];
		}

		/**
	  * Adds a function to be run before a hook completes
	  * @example this.content.register(function(){...});
	  */


		_createClass(Hook, [{
			key: "register",
			value: function register() {
				for (var i = 0; i < arguments.length; ++i) {
					if (typeof arguments[i] === "function") {
						this.hooks.push(arguments[i]);
					} else {
						// unpack array
						for (var j = 0; j < arguments[i].length; ++j) {
							this.hooks.push(arguments[i][j]);
						}
					}
				}
			}

			/**
	   * Triggers a hook to run all functions
	   * @example this.content.trigger(args).then(function(){...});
	   */

		}, {
			key: "trigger",
			value: function trigger() {
				var args = arguments;
				var context = this.context;
				var promises = [];

				this.hooks.forEach(function (task) {
					var executing = task.apply(context, args);

					if (executing && typeof executing["then"] === "function") {
						// Task is a function that returns a promise
						promises.push(executing);
					}
					// Otherwise Task resolves immediately, continue
				});

				return _Promise.all(promises);
			}

			// Adds a function to be run before a hook completes

		}, {
			key: "list",
			value: function list() {
				return this.hooks;
			}
		}, {
			key: "clear",
			value: function clear() {
				return this.hooks = [];
			}
		}]);

		return Hook;
	}();

	function replaceBase(doc, section) {
		var base;
		var head;
		var url = section.href;
		var absolute = url.indexOf("://") > -1;

		if (!doc) {
			return;
		}

		head = qs(doc, "head");
		base = qs(head, "base");

		if (!base) {
			base = doc.createElement("base");
			head.insertBefore(base, head.firstChild);
		}

		// Fix for Safari crashing if the url doesn't have an origin
		if (!absolute && typeof window !== "undefined" && window.location) {
			var parts = window.location.href.split("/");
			var directory = "";

			parts.pop();
			directory = parts.join("/");

			url = directory + url;
		}

		base.setAttribute("href", url);
	}

	function replaceCanonical(doc, section) {
		var head;
		var link;
		var url = section.canonical || section.href;

		if (!doc) {
			return;
		}

		head = qs(doc, "head");
		link = qs(head, "link[rel='canonical']");

		if (link) {
			link.setAttribute("href", url);
		} else {
			link = doc.createElement("link");
			link.setAttribute("rel", "canonical");
			link.setAttribute("href", url);
			head.appendChild(link);
		}
	}

	function replaceMeta(doc, section) {
		var head;
		var meta;
		var id = section.idref || section.href;
		if (!doc) {
			return;
		}

		head = qs(doc, "head");
		meta = qs(head, "link[property='dc.identifier']");

		if (meta) {
			meta.setAttribute("content", id);
		} else {
			meta = doc.createElement("meta");
			meta.setAttribute("name", "dc.identifier");
			meta.setAttribute("content", id);
			head.appendChild(meta);
		}
	}

	// TODO: move me to Contents
	function replaceLinks(contents, fn) {

		var links = contents.querySelectorAll("a[href]");

		if (!links.length) {
			return;
		}

		var base = qs(contents.ownerDocument, "base");
		var location = base ? base.getAttribute("href") : contents.ownerDocument.defaultView.location.href;
		var replaceLink = function (link) {
			var href = link.getAttribute("href");

			if (href.indexOf("mailto:") === 0) {
				return;
			}

			var absolute = href.indexOf("://") > -1;
			var linkUrl = new Url(href, location);

			if (absolute) {

				link.setAttribute("target", "_blank");
			} else {
				link.onclick = function () {

					if (linkUrl && linkUrl.hash) {
						fn(linkUrl.Path.path + linkUrl.hash);
					} else if (linkUrl) {
						fn(linkUrl.Path.path);
					} else {
						fn(href);
					}

					return false;
				};
			}
		}.bind(this);

		for (var i = 0; i < links.length; i++) {
			replaceLink(links[i]);
		}
	}

	function request(url, type$$1, withCredentials, headers) {
		var supportsURL = typeof window != "undefined" ? window.URL : false; // TODO: fallback for url if window isn't defined
		var BLOB_RESPONSE = supportsURL ? "blob" : "arraybuffer";

		var deferred = new defer$1();

		var xhr = new XMLHttpRequest();

		//-- Check from PDF.js:
		//   https://github.com/mozilla/pdf.js/blob/master/web/compatibility.js
		var xhrPrototype = XMLHttpRequest.prototype;

		var header;

		if (!("overrideMimeType" in xhrPrototype)) {
			// IE10 might have response, but not overrideMimeType
			Object.defineProperty(xhrPrototype, "overrideMimeType", {
				value: function xmlHttpRequestOverrideMimeType() {}
			});
		}

		if (withCredentials) {
			xhr.withCredentials = true;
		}

		xhr.onreadystatechange = handler;
		xhr.onerror = err;

		xhr.open("GET", url, true);

		for (header in headers) {
			xhr.setRequestHeader(header, headers[header]);
		}

		if (type$$1 == "json") {
			xhr.setRequestHeader("Accept", "application/json");
		}

		// If type isn"t set, determine it from the file extension
		if (!type$$1) {
			type$$1 = new Path(url).extension;
		}

		if (type$$1 == "blob") {
			xhr.responseType = BLOB_RESPONSE;
		}

		if (isXml(type$$1)) {
			// xhr.responseType = "document";
			xhr.overrideMimeType("text/xml"); // for OPF parsing
		}

		if (type$$1 == "binary") {
			xhr.responseType = "arraybuffer";
		}

		xhr.send();

		function err(e) {
			deferred.reject(e);
		}

		function handler() {
			if (this.readyState === XMLHttpRequest.DONE) {
				var responseXML = false;

				if (this.responseType === "" || this.responseType === "document") {
					responseXML = this.responseXML;
				}

				if (this.status === 200 || responseXML) {
					//-- Firefox is reporting 0 for blob urls
					var r;

					if (!this.response && !responseXML) {
						deferred.reject({
							status: this.status,
							message: "Empty Response",
							stack: new Error().stack
						});
						return deferred.promise;
					}

					if (this.status === 403) {
						deferred.reject({
							status: this.status,
							response: this.response,
							message: "Forbidden",
							stack: new Error().stack
						});
						return deferred.promise;
					}
					if (responseXML) {
						r = this.responseXML;
					} else if (isXml(type$$1)) {
						// xhr.overrideMimeType("text/xml"); // for OPF parsing
						// If this.responseXML wasn't set, try to parse using a DOMParser from text
						r = parse(this.response, "text/xml");
					} else if (type$$1 == "xhtml") {
						r = parse(this.response, "application/xhtml+xml");
					} else if (type$$1 == "html" || type$$1 == "htm") {
						r = parse(this.response, "text/html");
					} else if (type$$1 == "json") {
						r = JSON.parse(this.response);
					} else if (type$$1 == "blob") {

						if (supportsURL) {
							r = this.response;
						} else {
							//-- Safari doesn't support responseType blob, so create a blob from arraybuffer
							r = new Blob([this.response]);
						}
					} else {
						r = this.response;
					}

					deferred.resolve(r);
				} else {

					deferred.reject({
						status: this.status,
						message: this.response,
						stack: new Error().stack
					});
				}
			}
		}

		return deferred.promise;
	}

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
				var request$$1 = _request || this.request || request;
				var loading = new defer$1();
				var loaded = loading.promise;

				if (this.contents) {
					loading.resolve(this.contents);
				} else {
					var type$$1 = this.type === "application/xhtml+xml" ? "xhtml" : "html";
					request$$1(this.href, type$$1).then(function (xml) {
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
				var rendering = new defer$1();
				var rendered = rendering.promise;
				this.output; // TODO: better way to return this from hooks?

				this.load(_request).then(function (contents) {
					var userAgent = typeof navigator !== "undefined" && navigator.userAgent || "";
					var isIE = userAgent.indexOf("Trident") >= 0;
					var Serializer;
					if (typeof XMLSerializer === "undefined" || isIE) {
						Serializer = XMLDom.XMLSerializer;
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
			value: function createUrl(request$$1) {
				var _this = this;

				//var parsedUrl = new Url(url);
				//var mimeType = mime.lookup(parsedUrl.filename);
				var mimeType = this.type;

				return this.render(request$$1).then(function (text) {
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

	/**
	 * Queue for handling tasks one at a time
	 * @class
	 * @param {scope} context what this will resolve to in the tasks
	 */

	var Queue = function () {
		function Queue(context) {
			_classCallCheck(this, Queue);

			this._q = [];
			this.context = context;
			this.tick = requestAnimationFrame$1;
			this.running = false;
			this.paused = false;
		}

		/**
	  * Add an item to the queue
	  * @return {Promise}
	  */


		_createClass(Queue, [{
			key: "enqueue",
			value: function enqueue() {
				var deferred, promise;
				var queued;
				var task = [].shift.call(arguments);
				var args = arguments;

				// Handle single args without context
				// if(args && !Array.isArray(args)) {
				//   args = [args];
				// }
				if (!task) {
					throw new Error("No Task Provided");
				}

				if (typeof task === "function") {

					deferred = new defer$1();
					promise = deferred.promise;

					queued = {
						"task": task,
						"args": args,
						//"context"  : context,
						"deferred": deferred,
						"promise": promise
					};
				} else {
					// Task is a promise
					queued = {
						"promise": task
					};
				}

				this._q.push(queued);

				// Wait to start queue flush
				if (this.paused == false && !this.running) {
					// setTimeout(this.flush.bind(this), 0);
					// this.tick.call(window, this.run.bind(this));
					this.run();
				}

				return queued.promise;
			}

			/**
	   * Run one item
	   * @return {Promise}
	   */

		}, {
			key: "dequeue",
			value: function dequeue() {
				var inwait, task, result;

				if (this._q.length && !this.paused) {
					inwait = this._q.shift();
					task = inwait.task;
					if (task) {
						// console.log(task)

						result = task.apply(this.context, inwait.args);

						if (result && typeof result["then"] === "function") {
							// Task is a function that returns a promise
							return result.then(function () {
								inwait.deferred.resolve.apply(this.context, arguments);
							}.bind(this), function () {
								inwait.deferred.reject.apply(this.context, arguments);
							}.bind(this));
						} else {
							// Task resolves immediately
							inwait.deferred.resolve.apply(this.context, result);
							return inwait.promise;
						}
					} else if (inwait.promise) {
						// Task is a promise
						return inwait.promise;
					}
				} else {
					inwait = new defer$1();
					inwait.deferred.resolve();
					return inwait.promise;
				}
			}

			// Run All Immediately

		}, {
			key: "dump",
			value: function dump() {
				while (this._q.length) {
					this.dequeue();
				}
			}

			/**
	   * Run all tasks sequentially, at convince
	   * @return {Promise}
	   */

		}, {
			key: "run",
			value: function run() {
				var _this = this;

				if (!this.running) {
					this.running = true;
					this.defered = new defer$1();
				}

				this.tick.call(window, function () {

					if (_this._q.length) {

						_this.dequeue().then(function () {
							this.run();
						}.bind(_this));
					} else {
						_this.defered.resolve();
						_this.running = undefined;
					}
				});

				// Unpause
				if (this.paused == true) {
					this.paused = false;
				}

				return this.defered.promise;
			}

			/**
	   * Flush all, as quickly as possible
	   * @return {Promise}
	   */

		}, {
			key: "flush",
			value: function flush() {

				if (this.running) {
					return this.running;
				}

				if (this._q.length) {
					this.running = this.dequeue().then(function () {
						this.running = undefined;
						return this.flush();
					}.bind(this));

					return this.running;
				}
			}

			/**
	   * Clear all items in wait
	   */

		}, {
			key: "clear",
			value: function clear() {
				this._q = [];
			}

			/**
	   * Get the number of tasks in the queue
	   * @return {int} tasks
	   */

		}, {
			key: "length",
			value: function length() {
				return this._q.length;
			}

			/**
	   * Pause a running queue
	   */

		}, {
			key: "pause",
			value: function pause() {
				this.paused = true;
			}

			/**
	   * End the queue
	   */

		}, {
			key: "stop",
			value: function stop() {
				this._q = [];
				this.running = false;
				this.paused = true;
			}
		}]);

		return Queue;
	}();

	var EPUBJS_VERSION = "0.4";

	// Dom events to listen for
	var DOM_EVENTS = ["keydown", "keyup", "keypressed", "mouseup", "mousedown", "click", "touchend", "touchstart"];

	var EVENTS = {
		BOOK: {
			OPEN_FAILED: "openFailed",
			READY: "ready"
		},
		CONTENTS: {
			EXPAND: "expand",
			RESIZE: "resize",
			SELECTED: "selected",
			SELECTED_RANGE: "selectedRange",
			LINK_CLICKED: "linkClicked"
		},
		LOCATIONS: {
			CHANGED: "changed"
		},
		MANAGERS: {
			RESIZE: "resize",
			RESIZED: "resized",
			ORIENTATION_CHANGE: "orientationchange",
			ADDED: "added",
			SCROLL: "scroll",
			SCROLLED: "scrolled"
		},
		VIEWS: {
			AXIS: "axis",
			LOAD_ERROR: "loaderror",
			RENDERED: "rendered",
			RESIZED: "resized",
			DISPLAYED: "displayed",
			SHOWN: "shown",
			HIDDEN: "hidden",
			MARK_CLICKED: "markClicked"
		},
		RENDITION: {
			STARTED: "started",
			ATTACHED: "attached",
			DISPLAYED: "displayed",
			DISPLAY_ERROR: "displayerror",
			RENDERED: "rendered",
			REMOVED: "removed",
			RESIZED: "resized",
			ORIENTATION_CHANGE: "orientationchange",
			LOCATION_CHANGED: "locationChanged",
			RELOCATED: "relocated",
			MARK_CLICKED: "markClicked",
			SELECTED: "selected",
			LAYOUT: "layout",
			WORKER_FAILED: "workerFailed",
			WORKER_INACTIVE: "workerInactive"
		},
		LAYOUT: {
			UPDATED: "updated"
		}
	};

	/**
	 * Locators
	 * @param {object} [manifest]
	 */

	var Locators = function () {
		function Locators(manifest) {
			_classCallCheck(this, Locators);

			if (manifest) {
				this.unpack(manifest);
			}
		}

		_createClass(Locators, [{
			key: "unpack",
			value: function unpack(manifest) {
				if (manifest.locations) {
					this.unpackLocations(manifest.locations);
				}

				if (manifest.pages) {
					this.unpackPages(manifest.page);
				}
			}
		}, {
			key: "unpackLocations",
			value: function unpackLocations(locations) {
				this.locations = locations;
				this.totalLocations = this.locations.length - 1;
			}
		}, {
			key: "unpackPages",
			value: function unpackPages(pages) {
				var _this = this;

				this.pages = pages;
				this.firstPage = parseInt(this.pages[0]);
				this.lastPage = parseInt(this.pages[this.pages.length - 1]);
				this.totalPages = this.lastPage - this.firstPage;

				pages.forEach(function (item) {
					if (item.cfi) {
						_this.pageLocations.push(item.cfi);
					}
				});
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
				if (this.locations.length === 0) {
					return -1;
				}

				loc = locationOf(cfi, this.locations, EpubCFI.prototype.compare);

				if (loc > this.totalLocations) {
					return this.totalLocations;
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
				if (this.locations.length === 0) {
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
				if (!loc || !this.totalLocations) {
					return 0;
				}

				return loc / this.totalLocations;
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

				if (loc >= 0 && loc < this.locations.length) {
					cfi = this.locations[loc];
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
					var cfi = new EpubCFI(this.locations[this.totalLocations]);
					cfi.collapse();
					return cfi.toString();
				}

				loc = Math.ceil(this.totalLocations * percentage);
				return this.cfiFromLocation(loc);
			}

			/**
	   * Get a PageList result from a EpubCFI
	   * @param  {string} cfi EpubCFI String
	   * @return {string} page
	   */

		}, {
			key: "pageFromCfi",
			value: function pageFromCfi(cfi) {
				var pg = -1;

				// Check if the pageList has not been set yet
				if (!this.pageLocations || this.pageLocations.length === 0) {
					return -1;
				}

				// check if the cfi is in the location list
				var index = indexOfSorted(cfi, this.pageLocations, EpubCFI.prototype.compare);
				if (index != -1) {
					pg = this.pages[index];
				} else {
					// Otherwise add it to the list of locations
					// Insert it in the correct position in the locations page
					index = locationOf(cfi, this.pageLocations, EpubCFI.prototype.compare);
					// Get the page at the location just before the new one, or return the first
					pg = index - 1 >= 0 ? this.pages[index - 1] : this.pages[0];
					if (pg !== undefined) {
						// Add the new page in so that the locations and page array match up
						//this.pages.splice(index, 0, pg);
					} else {
						pg = -1;
					}
				}
				return pg;
			}

			/**
	   * Get an EpubCFI from a Page List Item
	   * @param  {string} pg
	   * @return {string} cfi
	   */

		}, {
			key: "cfiFromPage",
			value: function cfiFromPage(pg) {
				var cfi = -1;
				// check that pg is an int
				if (typeof pg != "number") {
					pg = parseInt(pg);
				}

				// check if the cfi is in the page list
				// Pages could be unsorted.
				var index = this.pages.indexOf(pg);
				if (index != -1) {
					cfi = this.pageLocations[index];
				}
				// TODO: handle pages not in the list
				return cfi;
			}

			/**
	   * Get a Page from Book percentage
	   * @param  {number} percent
	   * @return {string} page
	   */

		}, {
			key: "pageFromPercentage",
			value: function pageFromPercentage(percent) {
				var pg = Math.round(this.totalPages * percent);
				return pg;
			}

			/**
	   * Returns a value between 0 - 1 corresponding to the location of a page
	   * @param  {int} pg the page
	   * @return {number} percentage
	   */

		}, {
			key: "percentageFromPage",
			value: function percentageFromPage(pg) {
				var percentage = (pg - this.firstPage) / this.totalPages;
				return Math.round(percentage * 1000) / 1000;
			}

			/**
	   * Returns a value between 0 - 1 corresponding to the location of a cfi
	   * @param  {string} cfi EpubCFI String
	   * @return {number} percentage
	   */

		}, {
			key: "percentagePageFromCfi",
			value: function percentagePageFromCfi(cfi) {
				var pg = this.pageFromCfi(cfi);
				var percentage = this.percentageFromPage(pg);
				return percentage;
			}
		}, {
			key: "destroy",
			value: function destroy() {}
		}]);

		return Locators;
	}();

	eventEmitter(Locators.prototype);

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
			value: function landmark(type$$1) {
				var index = void 0;

				index = this.landmarksByType[type$$1];

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

	/**
	 * An Epub Book representation with methods for the loading and manipulation
	 * of its contents.
	 * @class
	 * @param {json | object} [manifest]
	 * @returns {Book}
	 * @example new Book(manifest)
	 */

	var Book = function () {
		function Book(manifest) {
			_classCallCheck(this, Book);

			/**
	   * @member {Spine} sections
	   * @memberof Book
	   */
			this.sections = new Spine();

			/**
	   * @member {Navigation} navigation
	   * @memberof Book
	   */
			this.navigation = new Navigation();

			/**
	   * @member {Locators} locators
	   * @memberof Book
	   */
			this.locators = new Locators();

			/**
	   * @member {object} manifest
	   * @memberof Book
	   */
			this.manifest = {
				"@context": "http://readium.org/webpub/default.jsonld",
				metadata: {
					"@type": "http://schema.org/Book"
				},
				resources: [],
				toc: [],
				landmarks: [],
				locations: [],
				pages: [],
				spine: [],
				links: []
			};

			if (manifest) {
				this.parse(manifest);
			}
		}

		_createClass(Book, [{
			key: "parse",
			value: function parse$$1(manifest) {
				if (!manifest) {
					return;
				}

				if (typeof manifest === "string") {
					manifest = JSON.parse(manifest);
				}

				var _manifest = manifest,
				    metadata = _manifest.metadata,
				    resources = _manifest.resources,
				    toc = _manifest.toc,
				    landmarks = _manifest.landmarks,
				    locations = _manifest.locations,
				    pages = _manifest.pages,
				    spine = _manifest.spine,
				    links = _manifest.links;


				this.metadata = metadata;
				this.resources = resources;
				this.spine = spine;
				this.toc = toc;
				this.landmarks = landmarks;
				this.locations = locations;
				this.pages = pages;
				this.links = links;
			}

			/**
	   * Get or set the Url
	   * @param {string} [url]
	   * @return {string} href
	   */

		}, {
			key: "section",


			/**
	   * Gets a Section of the Book from the Spine
	   * Alias for `book.spine.get`
	   * @param {string} target
	   * @return {Section}
	   */
			value: function section(target) {
				return this.sections.get(target);
			}

			/**
	   * Get or set the cover url
	   * @param {string} [coverUrl]
	   * @return {string} coverUrl
	   */

		}, {
			key: "getRange",


			/**
	   * Find a DOM Range for a given CFI Range
	   * @param  {EpubCFI} cfiRange a epub cfi range
	   * @return {Range}
	   */
			value: function getRange(cfiRange) {
				var cfi = new EpubCFI(cfiRange);
				var item = this.sections.get(cfi.spinePos);

				if (!item) {
					return new _Promise(function (resolve, reject) {
						reject("CFI could not be found");
					});
				}

				return item.load().then(function (contents) {
					var range = cfi.toRange(item.document);
					return range;
				});
			}

			/**
	   * Generates the Book Key using the identifer in the manifest or other string provided
	   * @param  {string} [identifier] to use instead of metadata identifier
	   * @return {string} key
	   */

		}, {
			key: "key",
			value: function key(identifier) {
				var ident = identifier || this.metadata.identifier;
				return "epubjs-" + EPUBJS_VERSION + "-" + ident;
			}

			/**
	   * Generates a object representation of the book structure
	   * @return {object}
	   */

		}, {
			key: "toObject",
			value: function toObject() {
				return this.manifest;
			}

			/**
	   * Generates a JSON output of the book structure
	   */

		}, {
			key: "toJSON",
			value: function toJSON(key) {
				return _JSON$stringify(this.manifest);
			}

			/**
	   * Destroy the Book and all associated objects
	   */

		}, {
			key: "destroy",
			value: function destroy() {
				this.sections && this.sections.destroy();
				this.locators && this.locators.destroy();
				this.navigation && this.navigation.destroy();

				this.sections = undefined;
				this.locators = undefined;
				this.navigation = undefined;

				this.manifest = undefined;
			}
		}, {
			key: "url",
			get: function get() {
				var selfLink = this.manifest.links.find(function (link) {
					return link.rel === "self";
				});
				return selfLink && selfLink.href;
			},
			set: function set(url) {
				var selfLink = this.manifest.links.find(function (link) {
					return link.rel === "self";
				});

				if (selfLink) {
					selfLink.href = url;
				} else {
					selfLink = {
						rel: "self",
						href: url,
						type: "application/webpub+json"
					};
					this.manifest.links.push(selfLink);
				}

				// Set the Path object for resolving links
				this.path = selfLink.href;

				return selfLink && selfLink.href;
			}

			/**
	   * Get or set the Path to resolve content
	   * @param {string} [url]
	   * @return {string} Path
	   */

		}, {
			key: "path",
			get: function get() {
				return this._path;
			},
			set: function set(url) {
				var uri = new Url(url);
				this._path = uri.Path;
				return this._path;
			}

			/**
	   * Get or set the Spine
	   * @param {array} [spineItems]
	   * @return {array} spineItems
	   */

		}, {
			key: "spine",
			get: function get() {
				return this.manifest.spine;
			},
			set: function set(items) {
				if (!items) {
					return;
				}
				this.sections.unpack(items);

				this.manifest.spine = items;

				return this.manifest.spine;
			}
		}, {
			key: "cover",
			get: function get() {
				var coverLink = this.manifest.links.find(function (link) {
					return link.rel === "cover";
				});
				return coverLink && coverLink.href;
			},
			set: function set(url) {
				var coverLink = this.manifest.links.find(function (link) {
					return link.rel === "cover";
				});

				if (coverLink) {
					coverLink.href = url;
				} else {
					coverLink = {
						rel: "cover",
						href: url
					};
					this.manifest.links.push(coverLink);
				}
				return coverLink && coverLink.href;
			}

			/**
	   * Get or set the metadata
	   * @param {object} [metadata]
	   * @return {object} metadata
	   */

		}, {
			key: "metadata",
			get: function get() {
				return this.manifest.metadata;
			},
			set: function set(metadata) {
				if (!metadata) {
					return;
				}
				this.manifest.metadata = metadata;

				// Set metadata type
				if (!metadata["@type"]) {
					this.manifest.metadata["@type"] = "http://schema.org/Book";
				}

				return this.manifest.metadata;
			}

			/**
	   * Get or set the resources
	   * @param {object} [resources]
	   * @return {object} resources
	   */

		}, {
			key: "resources",
			get: function get() {
				return this.manifest.resources;
			},
			set: function set(resources) {
				var _this = this;

				if (!resources) {
					return;
				}
				this.manifest.resources = resources.map(function (item) {

					// Add Cover Rel
					if (item.properties && item.properties.length) {

						if (item.properties.indexOf("cover-image") > -1) {
							item.rel = "cover";
						}

						// Add Contents Rel
						if (item.properties.indexOf("nav") > -1) {
							item.rel = "contents";
						}

						if (item.rel && item.rel === "cover") {
							_this.cover = item.href;
						}
					}
					return item;
				});

				return this.manifest.resources;
			}

			/**
	   * Get or set the toc
	   * @param {array} [toc]
	   * @return {array} toc
	   */

		}, {
			key: "toc",
			get: function get() {
				return this.manifest.toc;
			},
			set: function set(toc) {
				if (!toc) {
					return;
				}
				this.navigation.unpackToc(toc);
				return this.manifest.toc = toc;
			}

			/**
	   * Get or set the landmarks
	   * @param {array} [landmarks]
	   * @return {array} landmarks
	   */

		}, {
			key: "landmarks",
			get: function get() {
				return this.manifest.landmarks;
			},
			set: function set(landmarks) {
				if (!landmarks) {
					return;
				}
				this.navigation.unpackLandmarks(landmarks);
				return this.manifest.landmarks = landmarks;
			}

			/**
	   * Get or set the locations
	   * @param {array} [locations]
	   * @return {array} locations
	   */

		}, {
			key: "locations",
			get: function get() {
				return this.manifest.locations;
			},
			set: function set(locations) {
				if (!locations) {
					return;
				}
				this.locators.unpackLocations(locations);
				return this.manifest.locations = locations;
			}

			/**
	   * Get or set the pages
	   * @param {array} [pageList]
	   * @return {array} pageList
	   */

		}, {
			key: "pages",
			get: function get() {
				return this.manifest.pages;
			},
			set: function set(pageList) {
				if (!pageList) {
					return;
				}
				this.locators.unpackPages(pageList);
				return this.manifest.pages = pageList;
			}

			/**
	   * Get or set links
	   * @param {array} [links]
	   * @return {array} links
	   */

		}, {
			key: "links",
			get: function get() {
				return this.manifest.links;
			},
			set: function set(links) {
				var _this2 = this;

				if (!links) {
					return;
				}

				links.forEach(function (link) {
					if (link.rel === "cover") {
						_this2.cover = link.href;
					}
					if (link.rel === "self") {
						_this2.path = link.href;
					}
				});

				return this.manifest.links = links;
			}

			/**
	   * Get or set the source of the book.
	   * If returns with an object, the links in the books have been replaced
	   * with service workers urls, or blob urls
	   * @param {array} [links]
	   * @return {array} links
	   */

		}, {
			key: "source",
			get: function get() {
				var sourceLink = this.manifest.links.find(function (link) {
					return link.rel === "source";
				});
				return sourceLink;
			},
			set: function set(url) {
				var sourceLink = this.manifest.links.find(function (link) {
					return link.rel === "source";
				});

				if (sourceLink) {
					sourceLink.href = url;
				} else {
					sourceLink = {
						rel: "source",
						href: url,
						type: "application/epub+zip"
					};
					this.manifest.links.push(sourceLink);
				}
				return sourceLink;
			}
		}]);

		return Book;
	}();

	//-- Enable binding events to book


	eventEmitter(Book.prototype);

	// 19.1.2.14 Object.keys(O)


	_objectSap('keys', function(){
	  return function keys(it){
	    return _objectKeys(_toObject(it));
	  };
	});

	var keys$2 = _core.Object.keys;

	var keys$3 = createCommonjsModule(function (module) {
	module.exports = { "default": keys$2, __esModule: true };
	});

	var _Object$keys = unwrapExports(keys$3);

	/**
	 * Figures out the CSS values to apply for a layout
	 * @class
	 * @param {object} settings
	 * @param {string} [settings.layout='reflowable']
	 * @param {string} [settings.spread]
	 * @param {int} [settings.minSpreadWidth=800]
	 * @param {boolean} [settings.evenSpreads=false]
	 */

	var Layout = function () {
		function Layout(settings) {
			_classCallCheck(this, Layout);

			this.settings = settings;
			this.name = settings.layout || "reflowable";
			this._spread = settings.spread === "none" ? false : true;
			this._minSpreadWidth = settings.minSpreadWidth || 800;
			this._evenSpreads = settings.evenSpreads || false;

			if (settings.flow === "scrolled" || settings.flow === "scrolled-continuous" || settings.flow === "scrolled-doc") {
				this._flow = "scrolled";
			} else {
				this._flow = "paginated";
			}

			this.width = 0;
			this.height = 0;
			this.spreadWidth = 0;
			this.delta = 0;

			this.columnWidth = 0;
			this.gap = 0;
			this.divisor = 1;

			this.props = {
				name: this.name,
				spread: this._spread,
				flow: this._flow,
				width: 0,
				height: 0,
				spreadWidth: 0,
				delta: 0,
				columnWidth: 0,
				gap: 0,
				divisor: 1
			};
		}

		/**
	  * Switch the flow between paginated and scrolled
	  * @param  {string} flow paginated | scrolled
	  */


		_createClass(Layout, [{
			key: "flow",
			value: function flow(_flow) {
				if (typeof _flow != "undefined") {
					if (_flow === "scrolled" || _flow === "scrolled-continuous" || _flow === "scrolled-doc") {
						this._flow = "scrolled";
					} else {
						this._flow = "paginated";
					}
					// this.props.flow = this._flow;
					this.update({ flow: this._flow });
				}
				return this._flow;
			}

			/**
	   * Switch between using spreads or not, and set the
	   * width at which they switch to single.
	   * @param  {string} spread true | false
	   * @param  {boolean} min integer in pixels
	   */

		}, {
			key: "spread",
			value: function spread(_spread, min) {

				if (_spread) {
					this._spread = _spread === "none" ? false : true;
					// this.props.spread = this._spread;
					this.update({ spread: this._spread });
				}

				if (min >= 0) {
					this._minSpreadWidth = min;
				}

				return this._spread;
			}

			/**
	   * Calculate the dimensions of the pagination
	   * @param  {number} _width  [description]
	   * @param  {number} _height [description]
	   * @param  {number} _gap    [description]
	   */

		}, {
			key: "calculate",
			value: function calculate(_width, _height, _gap) {

				var divisor = 1;
				var gap = _gap || 0;

				//-- Check the width and create even width columns
				// var fullWidth = Math.floor(_width);
				var width = _width;
				var height = _height;

				var section = Math.floor(width / 12);

				var columnWidth;
				var spreadWidth;
				var pageWidth;
				var delta;

				if (this._spread && width >= this._minSpreadWidth) {
					divisor = 2;
				} else {
					divisor = 1;
				}

				if (this.name === "reflowable" && this._flow === "paginated" && !(_gap >= 0)) {
					gap = section % 2 === 0 ? section : section - 1;
				}

				if (this.name === "pre-paginated") {
					gap = 0;
				}

				//-- Double Page
				if (divisor > 1) {
					// width = width - gap;
					// columnWidth = (width - gap) / divisor;
					// gap = gap / divisor;
					columnWidth = width / divisor - gap;
					pageWidth = columnWidth + gap;
				} else {
					columnWidth = width;
					pageWidth = width;
				}

				if (this.name === "pre-paginated" && divisor > 1) {
					width = columnWidth;
				}

				spreadWidth = columnWidth * divisor + gap;

				delta = width;

				this.width = width;
				this.height = height;
				this.spreadWidth = spreadWidth;
				this.pageWidth = pageWidth;
				this.delta = delta;

				this.columnWidth = columnWidth;
				this.gap = gap;
				this.divisor = divisor;

				// this.props.width = width;
				// this.props.height = _height;
				// this.props.spreadWidth = spreadWidth;
				// this.props.pageWidth = pageWidth;
				// this.props.delta = delta;
				//
				// this.props.columnWidth = colWidth;
				// this.props.gap = gap;
				// this.props.divisor = divisor;

				this.update({
					width: width,
					height: height,
					spreadWidth: spreadWidth,
					pageWidth: pageWidth,
					delta: delta,
					columnWidth: columnWidth,
					gap: gap,
					divisor: divisor
				});
			}

			/**
	   * Apply Css to a Document
	   * @param  {Contents} contents
	   * @return {Promise}
	   */

		}, {
			key: "format",
			value: function format(contents) {
				var formating;

				if (this.name === "pre-paginated") {
					formating = contents.fit(this.columnWidth, this.height);
				} else if (this._flow === "paginated") {
					formating = contents.columns(this.width, this.height, this.columnWidth, this.gap);
				} else {
					// scrolled
					formating = contents.size(this.width, null);
				}

				return formating; // might be a promise in some View Managers
			}

			/**
	   * Count number of pages
	   * @param  {number} totalLength
	   * @param  {number} pageLength
	   * @return {{spreads: Number, pages: Number}}
	   */

		}, {
			key: "count",
			value: function count(totalLength, pageLength) {

				var spreads = void 0,
				    pages = void 0;

				if (this.name === "pre-paginated") {
					spreads = 1;
					pages = 1;
				} else if (this._flow === "paginated") {
					pageLength = pageLength || this.delta;
					spreads = Math.ceil(totalLength / pageLength);
					pages = spreads * this.divisor;
				} else {
					// scrolled
					pageLength = pageLength || this.height;
					spreads = Math.ceil(totalLength / pageLength);
					pages = spreads;
				}

				return {
					spreads: spreads,
					pages: pages
				};
			}
		}, {
			key: "update",
			value: function update(props) {
				var _this = this;

				// Remove props that haven't changed
				_Object$keys(props).forEach(function (propName) {
					if (_this.props[propName] === props[propName]) {
						delete props[propName];
					}
				});

				if (_Object$keys(props).length > 0) {
					var newProps = extend(this.props, props);
					this.emit(EVENTS.LAYOUT.UPDATED, newProps, props);
				}
			}
		}]);

		return Layout;
	}();

	eventEmitter(Layout.prototype);

	/**
	 * Themes to apply to displayed content
	 * @class
	 * @param {Rendition} rendition
	 */

	var Themes = function () {
		function Themes(rendition) {
			_classCallCheck(this, Themes);

			this.rendition = rendition;
			this._themes = {
				"default": {
					"rules": {},
					"url": "",
					"serialized": ""
				}
			};
			this._overrides = {};
			this._current = "default";
			this._injected = [];
			this.rendition.hooks.content.register(this.inject.bind(this));
			this.rendition.hooks.content.register(this.overrides.bind(this));
		}

		/**
	  * Add themes to be used by a rendition
	  * @param {object | string}
	  * @example themes.register("light", "http://example.com/light.css")
	  * @example themes.register("light", { "body": { "color": "purple"}})
	  * @example themes.register({ "light" : {...}, "dark" : {...}})
	  */


		_createClass(Themes, [{
			key: "register",
			value: function register() {
				if (arguments.length === 0) {
					return;
				}
				if (arguments.length === 1 && _typeof(arguments[0]) === "object") {
					return this.registerThemes(arguments[0]);
				}
				if (arguments.length === 1 && typeof arguments[0] === "string") {
					return this.default(arguments[0]);
				}
				if (arguments.length === 2 && typeof arguments[1] === "string") {
					return this.registerUrl(arguments[0], arguments[1]);
				}
				if (arguments.length === 2 && _typeof(arguments[1]) === "object") {
					return this.registerRules(arguments[0], arguments[1]);
				}
			}

			/**
	   * Add a default theme to be used by a rendition
	   * @param {object | string} theme
	   * @example themes.register("http://example.com/default.css")
	   * @example themes.register({ "body": { "color": "purple"}})
	   */

		}, {
			key: "default",
			value: function _default(theme) {
				if (!theme) {
					return;
				}
				if (typeof theme === "string") {
					return this.registerUrl("default", theme);
				}
				if ((typeof theme === "undefined" ? "undefined" : _typeof(theme)) === "object") {
					return this.registerRules("default", theme);
				}
			}
		}, {
			key: "registerThemes",
			value: function registerThemes(themes) {
				for (var theme in themes) {
					if (themes.hasOwnProperty(theme)) {
						if (typeof themes[theme] === "string") {
							this.registerUrl(theme, themes[theme]);
						} else {
							this.registerRules(theme, themes[theme]);
						}
					}
				}
			}
		}, {
			key: "registerUrl",
			value: function registerUrl(name, input) {
				var url = new Url(input);
				this._themes[name] = { "url": url.toString() };
				if (this._injected[name]) {
					this.update(name);
				}
			}
		}, {
			key: "registerRules",
			value: function registerRules(name, rules) {
				this._themes[name] = { "rules": rules };
				// TODO: serialize css rules
				if (this._injected[name]) {
					this.update(name);
				}
			}
		}, {
			key: "select",
			value: function select(name) {
				var prev = this._current;
				var contents;

				this._current = name;
				this.update(name);

				contents = this.rendition.getContents();
				contents.forEach(function (content) {
					content.removeClass(prev);
					content.addClass(name);
				});
			}
		}, {
			key: "update",
			value: function update(name) {
				var _this = this;

				var contents = this.rendition.getContents();
				contents.forEach(function (content) {
					_this.add(name, content);
				});
			}
		}, {
			key: "inject",
			value: function inject(contents) {
				var links = [];
				var themes = this._themes;
				var theme;

				for (var name in themes) {
					if (themes.hasOwnProperty(name) && (name === this._current || name === "default")) {
						theme = themes[name];
						if (theme.rules && _Object$keys(theme.rules).length > 0 || theme.url && links.indexOf(theme.url) === -1) {
							this.add(name, contents);
						}
						this._injected.push(name);
					}
				}

				if (this._current != "default") {
					contents.addClass(this._current);
				}
			}
		}, {
			key: "add",
			value: function add(name, contents) {
				var theme = this._themes[name];

				if (!theme || !contents) {
					return;
				}

				if (theme.url) {
					contents.addStylesheet(theme.url);
				} else if (theme.serialized) {
					// TODO: handle serialized
				} else if (theme.rules) {
					contents.addStylesheetRules(theme.rules);
					theme.injected = true;
				}
			}
		}, {
			key: "override",
			value: function override(name, value) {
				var _this2 = this;

				var contents = this.rendition.getContents();

				this._overrides[name] = value;

				contents.forEach(function (content) {
					content.css(name, _this2._overrides[name]);
				});
			}
		}, {
			key: "overrides",
			value: function overrides(contents) {
				var overrides = this._overrides;

				for (var rule in overrides) {
					if (overrides.hasOwnProperty(rule)) {
						contents.css(rule, overrides[rule]);
					}
				}
			}

			/**
	   * Adjust the font size of a rendition
	   * @param {number} size
	   */

		}, {
			key: "fontSize",
			value: function fontSize(size) {
				this.override("font-size", size);
			}

			/**
	   * Adjust the font-family of a rendition
	   * @param {string} f
	   */

		}, {
			key: "font",
			value: function font(f) {
				this.override("font-family", f);
			}
		}, {
			key: "destroy",
			value: function destroy() {
				this.rendition = undefined;
				this._themes = undefined;
				this._overrides = undefined;
				this._current = undefined;
				this._injected = undefined;
			}
		}]);

		return Themes;
	}();

	/**
	 * Map text locations to CFI ranges
	 * @class
	 */

	var Mapping = function () {
		function Mapping(layout, direction, axis, dev) {
			_classCallCheck(this, Mapping);

			this.layout = layout;
			this.horizontal = axis === "horizontal" ? true : false;
			this.direction = direction || "ltr";
			this._dev = dev;
		}

		/**
	  * Find CFI pairs for entire section at once
	  */


		_createClass(Mapping, [{
			key: "section",
			value: function section(view) {
				var ranges = this.findRanges(view);
				var map = this.rangeListToCfiList(view.section.cfiBase, ranges);

				return map;
			}

			/**
	   * Find CFI pairs for a page
	   */

		}, {
			key: "page",
			value: function page(contents, cfiBase, start, end) {
				var root = contents && contents.document ? contents.document.body : false;
				var result;

				if (!root) {
					return;
				}

				result = this.rangePairToCfiPair(cfiBase, {
					start: this.findStart(root, start, end),
					end: this.findEnd(root, start, end)
				});

				if (this._dev === true) {
					var doc = contents.document;
					var startRange = new EpubCFI(result.start).toRange(doc);
					var endRange = new EpubCFI(result.end).toRange(doc);

					var selection = doc.defaultView.getSelection();
					var r = doc.createRange();
					selection.removeAllRanges();
					r.setStart(startRange.startContainer, startRange.startOffset);
					r.setEnd(endRange.endContainer, endRange.endOffset);
					selection.addRange(r);
				}

				return result;
			}
		}, {
			key: "walk",
			value: function walk(root, func) {
				// IE11 has strange issue, if root is text node IE throws exception on
				// calling treeWalker.nextNode(), saying
				// Unexpected call to method or property access instead of returing null value
				if (root && root.nodeType === Node.TEXT_NODE) {
					return;
				}
				// safeFilter is required so that it can work in IE as filter is a function for IE
				// and for other browser filter is an object.
				var filter = {
					acceptNode: function acceptNode(node) {
						if (node.data.trim().length > 0) {
							return NodeFilter.FILTER_ACCEPT;
						} else {
							return NodeFilter.FILTER_REJECT;
						}
					}
				};
				var safeFilter = filter.acceptNode;
				safeFilter.acceptNode = filter.acceptNode;

				var treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, safeFilter, false);
				var node;
				var result;
				while (node = treeWalker.nextNode()) {
					result = func(node);
					if (result) break;
				}

				return result;
			}
		}, {
			key: "findRanges",
			value: function findRanges(view) {
				var columns = [];
				var scrollWidth = view.contents.scrollWidth();
				var spreads = Math.ceil(scrollWidth / this.layout.spreadWidth);
				var count = spreads * this.layout.divisor;
				var columnWidth = this.layout.columnWidth;
				var gap = this.layout.gap;
				var start, end;

				for (var i = 0; i < count.pages; i++) {
					start = (columnWidth + gap) * i;
					end = columnWidth * (i + 1) + gap * i;
					columns.push({
						start: this.findStart(view.document.body, start, end),
						end: this.findEnd(view.document.body, start, end)
					});
				}

				return columns;
			}
		}, {
			key: "findStart",
			value: function findStart(root, start, end) {
				var _this = this;

				var stack = [root];
				var $el;
				var found;
				var $prev = root;

				while (stack.length) {

					$el = stack.shift();

					found = this.walk($el, function (node) {
						var left, right, top, bottom;
						var elPos;

						elPos = _this.getBounds(node);

						if (_this.horizontal && _this.direction === "ltr") {

							left = _this.horizontal ? elPos.left : elPos.top;
							right = _this.horizontal ? elPos.right : elPos.bottom;

							if (left >= start && left <= end) {
								return node;
							} else if (right > start) {
								return node;
							} else {
								$prev = node;
								stack.push(node);
							}
						} else if (_this.horizontal && _this.direction === "rtl") {

							left = elPos.left;
							right = elPos.right;

							if (right <= end && right >= start) {
								return node;
							} else if (left < end) {
								return node;
							} else {
								$prev = node;
								stack.push(node);
							}
						} else {

							top = elPos.top;
							bottom = elPos.bottom;

							if (top >= start && top <= end) {
								return node;
							} else if (bottom > start) {
								return node;
							} else {
								$prev = node;
								stack.push(node);
							}
						}
					});

					if (found) {
						return this.findTextStartRange(found, start, end);
					}
				}

				// Return last element
				return this.findTextStartRange($prev, start, end);
			}
		}, {
			key: "findEnd",
			value: function findEnd(root, start, end) {
				var _this2 = this;

				var stack = [root];
				var $el;
				var $prev = root;
				var found;

				while (stack.length) {

					$el = stack.shift();

					found = this.walk($el, function (node) {

						var left, right, top, bottom;
						var elPos;

						elPos = _this2.getBounds(node);

						if (_this2.horizontal && _this2.direction === "ltr") {

							left = Math.round(elPos.left);
							right = Math.round(elPos.right);

							if (left > end && $prev) {
								return $prev;
							} else if (right > end) {
								return node;
							} else {
								$prev = node;
								stack.push(node);
							}
						} else if (_this2.horizontal && _this2.direction === "rtl") {

							left = Math.round(_this2.horizontal ? elPos.left : elPos.top);
							right = Math.round(_this2.horizontal ? elPos.right : elPos.bottom);

							if (right < start && $prev) {
								return $prev;
							} else if (left < start) {
								return node;
							} else {
								$prev = node;
								stack.push(node);
							}
						} else {

							top = Math.round(elPos.top);
							bottom = Math.round(elPos.bottom);

							if (top > end && $prev) {
								return $prev;
							} else if (bottom > end) {
								return node;
							} else {
								$prev = node;
								stack.push(node);
							}
						}
					});

					if (found) {
						return this.findTextEndRange(found, start, end);
					}
				}

				// end of chapter
				return this.findTextEndRange($prev, start, end);
			}
		}, {
			key: "findTextStartRange",
			value: function findTextStartRange(node, start, end) {
				var ranges = this.splitTextNodeIntoRanges(node);
				var range;
				var pos;
				var left, top, right;

				for (var i = 0; i < ranges.length; i++) {
					range = ranges[i];

					pos = range.getBoundingClientRect();

					if (this.horizontal && this.direction === "ltr") {

						left = pos.left;
						if (left >= start) {
							return range;
						}
					} else if (this.horizontal && this.direction === "rtl") {

						right = pos.right;
						if (right <= end) {
							return range;
						}
					} else {

						top = pos.top;
						if (top >= start) {
							return range;
						}
					}

					// prev = range;
				}

				return ranges[0];
			}
		}, {
			key: "findTextEndRange",
			value: function findTextEndRange(node, start, end) {
				var ranges = this.splitTextNodeIntoRanges(node);
				var prev;
				var range;
				var pos;
				var left, right, top, bottom;

				for (var i = 0; i < ranges.length; i++) {
					range = ranges[i];

					pos = range.getBoundingClientRect();

					if (this.horizontal && this.direction === "ltr") {

						left = pos.left;
						right = pos.right;

						if (left > end && prev) {
							return prev;
						} else if (right > end) {
							return range;
						}
					} else if (this.horizontal && this.direction === "rtl") {

						left = pos.left;
						right = pos.right;

						if (right < start && prev) {
							return prev;
						} else if (left < start) {
							return range;
						}
					} else {

						top = pos.top;
						bottom = pos.bottom;

						if (top > end && prev) {
							return prev;
						} else if (bottom > end) {
							return range;
						}
					}

					prev = range;
				}

				// Ends before limit
				return ranges[ranges.length - 1];
			}
		}, {
			key: "splitTextNodeIntoRanges",
			value: function splitTextNodeIntoRanges(node, _splitter) {
				var ranges = [];
				var textContent = node.textContent || "";
				var text = textContent.trim();
				var range;
				var doc = node.ownerDocument;
				var splitter = _splitter || " ";

				var pos = text.indexOf(splitter);

				if (pos === -1 || node.nodeType != Node.TEXT_NODE) {
					range = doc.createRange();
					range.selectNodeContents(node);
					return [range];
				}

				range = doc.createRange();
				range.setStart(node, 0);
				range.setEnd(node, pos);
				ranges.push(range);
				range = false;

				while (pos != -1) {

					pos = text.indexOf(splitter, pos + 1);
					if (pos > 0) {

						if (range) {
							range.setEnd(node, pos);
							ranges.push(range);
						}

						range = doc.createRange();
						range.setStart(node, pos + 1);
					}
				}

				if (range) {
					range.setEnd(node, text.length);
					ranges.push(range);
				}

				return ranges;
			}
		}, {
			key: "rangePairToCfiPair",
			value: function rangePairToCfiPair(cfiBase, rangePair) {

				var startRange = rangePair.start;
				var endRange = rangePair.end;

				startRange.collapse(true);
				endRange.collapse(false);

				var startCfi = new EpubCFI(startRange, cfiBase).toString();
				var endCfi = new EpubCFI(endRange, cfiBase).toString();

				return {
					start: startCfi,
					end: endCfi
				};
			}
		}, {
			key: "rangeListToCfiList",
			value: function rangeListToCfiList(cfiBase, columns) {
				var map = [];
				var cifPair;

				for (var i = 0; i < columns.length; i++) {
					cifPair = this.rangePairToCfiPair(cfiBase, columns[i]);

					map.push(cifPair);
				}

				return map;
			}
		}, {
			key: "getBounds",
			value: function getBounds(node) {
				var elPos = void 0;
				if (node.nodeType == Node.TEXT_NODE) {
					var elRange = document.createRange();
					elRange.selectNodeContents(node);
					elPos = elRange.getBoundingClientRect();
				} else {
					elPos = node.getBoundingClientRect();
				}
				return elPos;
			}
		}, {
			key: "axis",
			value: function axis(_axis) {
				if (_axis) {
					this.horizontal = _axis === "horizontal" ? true : false;
				}
				return this.horizontal;
			}
		}]);

		return Mapping;
	}();

	var isChrome = /Chrome/.test(navigator.userAgent);
	var isWebkit = !isChrome && /AppleWebKit/.test(navigator.userAgent);

	var ELEMENT_NODE$2 = 1;
	// const TEXT_NODE = 3;

	/**
		* Handles DOM manipulation, queries and events for View contents
		* @class
		* @param {document} doc Document
		* @param {element} content Parent Element (typically Body)
		* @param {string} cfiBase Section component of CFIs
		* @param {number} sectionIndex Index in Spine of Conntent's Section
		*/

	var Contents = function () {
		function Contents(doc, content, cfiBase, sectionIndex) {
			_classCallCheck(this, Contents);

			// Blank Cfi for Parsing
			this.epubcfi = new EpubCFI();

			this.document = doc;
			this.documentElement = this.document.documentElement;
			this.content = content || this.document.body;
			this.window = this.document.defaultView;

			this._size = {
				width: 0,
				height: 0
			};

			this.sectionIndex = sectionIndex || 0;
			this.cfiBase = cfiBase || "";

			this.epubReadingSystem("epub.js", ePub.VERSION);

			this.listeners();
		}

		/**
	 	* Get DOM events that are listened for and passed along
	 	*/


		_createClass(Contents, [{
			key: "width",


			/**
	  	* Get or Set width
	  	* @param {number} [w]
	  	* @returns {number} width
	  	*/
			value: function width(w) {
				// var frame = this.documentElement;
				var frame = this.content;

				if (w && isNumber(w)) {
					w = w + "px";
				}

				if (w) {
					frame.style.width = w;
					// this.content.style.width = w;
				}

				return this.window.getComputedStyle(frame)["width"];
			}

			/**
	  	* Get or Set height
	  	* @param {number} [h]
	  	* @returns {number} height
	  	*/

		}, {
			key: "height",
			value: function height(h) {
				// var frame = this.documentElement;
				var frame = this.content;

				if (h && isNumber(h)) {
					h = h + "px";
				}

				if (h) {
					frame.style.height = h;
					// this.content.style.height = h;
				}

				return this.window.getComputedStyle(frame)["height"];
			}

			/**
	  	* Get or Set width of the contents
	  	* @param {number} [w]
	  	* @returns {number} width
	  	*/

		}, {
			key: "contentWidth",
			value: function contentWidth(w) {

				var content = this.content || this.document.body;

				if (w && isNumber(w)) {
					w = w + "px";
				}

				if (w) {
					content.style.width = w;
				}

				return this.window.getComputedStyle(content)["width"];
			}

			/**
	  	* Get or Set height of the contents
	  	* @param {number} [h]
	  	* @returns {number} height
	  	*/

		}, {
			key: "contentHeight",
			value: function contentHeight(h) {

				var content = this.content || this.document.body;

				if (h && isNumber(h)) {
					h = h + "px";
				}

				if (h) {
					content.style.height = h;
				}

				return this.window.getComputedStyle(content)["height"];
			}

			/**
	  	* Get the width of the text using Range
	  	* @returns {number} width
	  	*/

		}, {
			key: "textWidth",
			value: function textWidth() {
				var width = void 0;
				var range = this.document.createRange();
				var content = this.content || this.document.body;
				var border = borders(content);

				// Select the contents of frame
				range.selectNodeContents(content);

				// get the width of the text content
				width = range.getBoundingClientRect().width;

				if (border && border.width) {
					width += border.width;
				}

				return Math.round(width);
			}

			/**
	  	* Get the height of the text using Range
	  	* @returns {number} height
	  	*/

		}, {
			key: "textHeight",
			value: function textHeight() {
				var height = void 0;
				var range = this.document.createRange();
				var content = this.content || this.document.body;
				var border = borders(content);

				range.selectNodeContents(content);

				height = range.getBoundingClientRect().height;

				if (height && border.height) {
					height += border.height;
				}

				return Math.ceil(height);
			}

			/**
	  	* Get documentElement scrollWidth
	  	* @returns {number} width
	  	*/

		}, {
			key: "scrollWidth",
			value: function scrollWidth() {
				var width = this.documentElement.scrollWidth;

				return width;
			}

			/**
	  	* Get documentElement scrollHeight
	  	* @returns {number} height
	  	*/

		}, {
			key: "scrollHeight",
			value: function scrollHeight() {
				var height = this.documentElement.scrollHeight;

				return height;
			}

			/**
	  	* Set overflow css style of the contents
	  	* @param {string} [overflow]
	  	*/

		}, {
			key: "overflow",
			value: function overflow(_overflow) {

				if (_overflow) {
					this.documentElement.style.overflow = _overflow;
				}

				return this.window.getComputedStyle(this.documentElement)["overflow"];
			}

			/**
	  	* Set overflowX css style of the documentElement
	  	* @param {string} [overflow]
	  	*/

		}, {
			key: "overflowX",
			value: function overflowX(overflow) {

				if (overflow) {
					this.documentElement.style.overflowX = overflow;
				}

				return this.window.getComputedStyle(this.documentElement)["overflowX"];
			}

			/**
	  	* Set overflowY css style of the documentElement
	  	* @param {string} [overflow]
	  	*/

		}, {
			key: "overflowY",
			value: function overflowY(overflow) {

				if (overflow) {
					this.documentElement.style.overflowY = overflow;
				}

				return this.window.getComputedStyle(this.documentElement)["overflowY"];
			}

			/**
	  	* Set Css styles on the contents element (typically Body)
	  	* @param {string} property
	  	* @param {string} value
	  	* @param {boolean} [priority] set as "important"
	  	*/

		}, {
			key: "css",
			value: function css(property, value, priority) {
				var content = this.content || this.document.body;

				if (value) {
					content.style.setProperty(property, value, priority ? "important" : "");
				}

				return this.window.getComputedStyle(content)[property];
			}

			/**
	  	* Get or Set the viewport element
	  	* @param {object} [options]
	  	* @param {string} [options.width]
	  	* @param {string} [options.height]
	  	* @param {string} [options.scale]
	  	* @param {string} [options.minimum]
	  	* @param {string} [options.maximum]
	  	* @param {string} [options.scalable]
	  	*/

		}, {
			key: "viewport",
			value: function viewport(options) {
				var $viewport = this.document.querySelector("meta[name='viewport']");
				var parsed = {
					"width": undefined,
					"height": undefined,
					"scale": undefined,
					"minimum": undefined,
					"maximum": undefined,
					"scalable": undefined
				};
				var newContent = [];
				var settings = {};

				/*
	   * check for the viewport size
	   * <meta name="viewport" content="width=1024,height=697" />
	   */
				if ($viewport && $viewport.hasAttribute("content")) {
					var content = $viewport.getAttribute("content");
					var _width = content.match(/width\s*=\s*([^,]*)/);
					var _height = content.match(/height\s*=\s*([^,]*)/);
					var _scale = content.match(/initial-scale\s*=\s*([^,]*)/);
					var _minimum = content.match(/minimum-scale\s*=\s*([^,]*)/);
					var _maximum = content.match(/maximum-scale\s*=\s*([^,]*)/);
					var _scalable = content.match(/user-scalable\s*=\s*([^,]*)/);

					if (_width && _width.length && typeof _width[1] !== "undefined") {
						parsed.width = _width[1];
					}
					if (_height && _height.length && typeof _height[1] !== "undefined") {
						parsed.height = _height[1];
					}
					if (_scale && _scale.length && typeof _scale[1] !== "undefined") {
						parsed.scale = _scale[1];
					}
					if (_minimum && _minimum.length && typeof _minimum[1] !== "undefined") {
						parsed.minimum = _minimum[1];
					}
					if (_maximum && _maximum.length && typeof _maximum[1] !== "undefined") {
						parsed.maximum = _maximum[1];
					}
					if (_scalable && _scalable.length && typeof _scalable[1] !== "undefined") {
						parsed.scalable = _scalable[1];
					}
				}

				settings = defaults(options || {}, parsed);

				if (options) {
					if (settings.width) {
						newContent.push("width=" + settings.width);
					}

					if (settings.height) {
						newContent.push("height=" + settings.height);
					}

					if (settings.scale) {
						newContent.push("initial-scale=" + settings.scale);
					}

					if (settings.scalable === "no") {
						newContent.push("minimum-scale=" + settings.scale);
						newContent.push("maximum-scale=" + settings.scale);
						newContent.push("user-scalable=" + settings.scalable);
					} else {

						if (settings.scalable) {
							newContent.push("user-scalable=" + settings.scalable);
						}

						if (settings.minimum) {
							newContent.push("minimum-scale=" + settings.minimum);
						}

						if (settings.maximum) {
							newContent.push("minimum-scale=" + settings.maximum);
						}
					}

					if (!$viewport) {
						$viewport = this.document.createElement("meta");
						$viewport.setAttribute("name", "viewport");
						this.document.querySelector("head").appendChild($viewport);
					}

					$viewport.setAttribute("content", newContent.join(", "));

					this.window.scrollTo(0, 0);
				}

				return settings;
			}

			/**
	   * Event emitter for when the contents has expanded
	   * @private
	   */

		}, {
			key: "expand",
			value: function expand() {
				this.emit(EVENTS.CONTENTS.EXPAND);
			}

			/**
	   * Add DOM listeners
	   * @private
	   */

		}, {
			key: "listeners",
			value: function listeners() {

				this.imageLoadListeners();

				this.mediaQueryListeners();

				// this.fontLoadListeners();

				this.addEventListeners();

				this.addSelectionListeners();

				// this.transitionListeners();

				this.resizeListeners();

				// this.resizeObservers();

				this.linksHandler();
			}

			/**
	   * Remove DOM listeners
	   * @private
	   */

		}, {
			key: "removeListeners",
			value: function removeListeners() {

				this.removeEventListeners();

				this.removeSelectionListeners();

				clearTimeout(this.expanding);
			}

			/**
	   * Check if size of contents has changed and
	   * emit 'resize' event if it has.
	   * @private
	   */

		}, {
			key: "resizeCheck",
			value: function resizeCheck() {
				var width = this.textWidth();
				var height = this.textHeight();

				if (width != this._size.width || height != this._size.height) {

					this._size = {
						width: width,
						height: height
					};

					this.onResize && this.onResize(this._size);
					this.emit(EVENTS.CONTENTS.RESIZE, this._size);
				}
			}

			/**
	   * Poll for resize detection
	   * @private
	   */

		}, {
			key: "resizeListeners",
			value: function resizeListeners() {
				// Test size again
				clearTimeout(this.expanding);

				requestAnimationFrame(this.resizeCheck.bind(this));

				this.expanding = setTimeout(this.resizeListeners.bind(this), 350);
			}

			/**
	   * Use css transitions to detect resize
	   * @private
	   */

		}, {
			key: "transitionListeners",
			value: function transitionListeners() {
				var body = this.content;

				body.style["transitionProperty"] = "font, font-size, font-size-adjust, font-stretch, font-variation-settings, font-weight, width, height";
				body.style["transitionDuration"] = "0.001ms";
				body.style["transitionTimingFunction"] = "linear";
				body.style["transitionDelay"] = "0";

				this.document.addEventListener("transitionend", this.resizeCheck.bind(this));
			}

			/**
	   * Listen for media query changes and emit 'expand' event
	   * Adapted from: https://github.com/tylergaw/media-query-events/blob/master/js/mq-events.js
	   * @private
	   */

		}, {
			key: "mediaQueryListeners",
			value: function mediaQueryListeners() {
				var sheets = this.document.styleSheets;
				var mediaChangeHandler = function (m) {
					if (m.matches && !this._expanding) {
						setTimeout(this.expand.bind(this), 1);
					}
				}.bind(this);

				for (var i = 0; i < sheets.length; i += 1) {
					var rules;
					// Firefox errors if we access cssRules cross-domain
					try {
						rules = sheets[i].cssRules;
					} catch (e) {
						return;
					}
					if (!rules) return; // Stylesheets changed
					for (var j = 0; j < rules.length; j += 1) {
						//if (rules[j].constructor === CSSMediaRule) {
						if (rules[j].media) {
							var mql = this.window.matchMedia(rules[j].media.mediaText);
							mql.addListener(mediaChangeHandler);
							//mql.onchange = mediaChangeHandler;
						}
					}
				}
			}

			/**
	   * Use MutationObserver to listen for changes in the DOM and check for resize
	   * @private
	   */

		}, {
			key: "resizeObservers",
			value: function resizeObservers() {
				var _this = this;

				// create an observer instance
				this.observer = new MutationObserver(function (mutations) {
					_this.resizeCheck();
				});

				// configuration of the observer:
				var config = { attributes: true, childList: true, characterData: true, subtree: true };

				// pass in the target node, as well as the observer options
				this.observer.observe(this.document, config);
			}
		}, {
			key: "imageLoadListeners",
			value: function imageLoadListeners(target) {
				var images = this.document.querySelectorAll("img");
				var img;
				for (var i = 0; i < images.length; i++) {
					img = images[i];

					if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
						img.onload = this.expand.bind(this);
					}
				}
			}

			/**
	   * Listen for font load and check for resize when loaded
	   * @private
	   */

		}, {
			key: "fontLoadListeners",
			value: function fontLoadListeners(target) {
				if (!this.document || !this.document.fonts) {
					return;
				}

				this.document.fonts.ready.then(function () {
					this.resizeCheck();
				}.bind(this));
			}

			/**
	   * Get the documentElement
	   * @returns {element} documentElement
	   */

		}, {
			key: "root",
			value: function root() {
				if (!this.document) return null;
				return this.document.documentElement;
			}

			/**
	   * Get the location offset of a EpubCFI or an #id
	   * @param {string | EpubCFI} target
	   * @param {string} [ignoreClass] for the cfi
	   * @returns { {left: Number, top: Number }
	   */

		}, {
			key: "locationOf",
			value: function locationOf$$1(target, ignoreClass) {
				var position;
				var targetPos = { "left": 0, "top": 0 };

				if (!this.document) return targetPos;

				if (this.epubcfi.isCfiString(target)) {
					var range = new EpubCFI(target).toRange(this.document, ignoreClass);

					if (range) {
						if (range.startContainer.nodeType === Node.ELEMENT_NODE) {
							position = range.startContainer.getBoundingClientRect();
							targetPos.left = position.left;
							targetPos.top = position.top;
						} else {
							// Webkit does not handle collapsed range bounds correctly
							// https://bugs.webkit.org/show_bug.cgi?id=138949

							// Construct a new non-collapsed range
							if (isWebkit) {
								var container = range.startContainer;
								var newRange = new Range();
								try {
									if (container.nodeType === ELEMENT_NODE$2) {
										position = container.getBoundingClientRect();
									} else if (range.startOffset + 2 < container.length) {
										newRange.setStart(container, range.startOffset);
										newRange.setEnd(container, range.startOffset + 2);
										position = newRange.getBoundingClientRect();
									} else if (range.startOffset - 2 > 0) {
										newRange.setStart(container, range.startOffset - 2);
										newRange.setEnd(container, range.startOffset);
										position = newRange.getBoundingClientRect();
									} else {
										// empty, return the parent element
										position = container.parentNode.getBoundingClientRect();
									}
								} catch (e) {
									console.error(e, e.stack);
								}
							} else {
								position = range.getBoundingClientRect();
							}
						}
					}
				} else if (typeof target === "string" && target.indexOf("#") > -1) {

					var id = target.substring(target.indexOf("#") + 1);
					var el = this.document.getElementById(id);

					if (el) {
						position = el.getBoundingClientRect();
					}
				}

				if (position) {
					targetPos.left = position.left;
					targetPos.top = position.top;
				}

				return targetPos;
			}

			/**
	   * Append a stylesheet link to the document head
	   * @param {string} src url
	   */

		}, {
			key: "addStylesheet",
			value: function addStylesheet(src) {
				return new _Promise(function (resolve, reject) {
					var $stylesheet;
					var ready = false;

					if (!this.document) {
						resolve(false);
						return;
					}

					// Check if link already exists
					$stylesheet = this.document.querySelector("link[href='" + src + "']");
					if ($stylesheet) {
						resolve(true);
						return; // already present
					}

					$stylesheet = this.document.createElement("link");
					$stylesheet.type = "text/css";
					$stylesheet.rel = "stylesheet";
					$stylesheet.href = src;
					$stylesheet.onload = $stylesheet.onreadystatechange = function () {
						if (!ready && (!this.readyState || this.readyState == "complete")) {
							ready = true;
							// Let apply
							setTimeout(function () {
								resolve(true);
							}, 1);
						}
					};

					this.document.head.appendChild($stylesheet);
				}.bind(this));
			}

			/**
	   * Append stylesheet rules to a generate stylesheet
	   * Array: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
	   * Object: https://github.com/desirable-objects/json-to-css
	   * @param {array | object} rules
	   */

		}, {
			key: "addStylesheetRules",
			value: function addStylesheetRules(rules) {
				var styleEl;
				var styleSheet;
				var key = "epubjs-inserted-css";

				if (!this.document || !rules || rules.length === 0) return;

				// Check if link already exists
				styleEl = this.document.getElementById("#" + key);
				if (!styleEl) {
					styleEl = this.document.createElement("style");
					styleEl.id = key;
				}

				// Append style element to head
				this.document.head.appendChild(styleEl);

				// Grab style sheet
				styleSheet = styleEl.sheet;

				if (Object.prototype.toString.call(rules) === "[object Array]") {
					for (var i = 0, rl = rules.length; i < rl; i++) {
						var j = 1,
						    rule = rules[i],
						    selector = rules[i][0],
						    propStr = "";
						// If the second argument of a rule is an array of arrays, correct our variables.
						if (Object.prototype.toString.call(rule[1][0]) === "[object Array]") {
							rule = rule[1];
							j = 0;
						}

						for (var pl = rule.length; j < pl; j++) {
							var prop = rule[j];
							propStr += prop[0] + ":" + prop[1] + (prop[2] ? " !important" : "") + ";\n";
						}

						// Insert CSS Rule
						styleSheet.insertRule(selector + "{" + propStr + "}", styleSheet.cssRules.length);
					}
				} else {
					var selectors = _Object$keys(rules);
					selectors.forEach(function (selector) {
						var definition = rules[selector];
						if (Array.isArray(definition)) {
							definition.forEach(function (item) {
								var _rules = _Object$keys(item);
								var result = _rules.map(function (rule) {
									return rule + ":" + item[rule];
								}).join(";");
								styleSheet.insertRule(selector + "{" + result + "}", styleSheet.cssRules.length);
							});
						} else {
							var _rules = _Object$keys(definition);
							var result = _rules.map(function (rule) {
								return rule + ":" + definition[rule];
							}).join(";");
							styleSheet.insertRule(selector + "{" + result + "}", styleSheet.cssRules.length);
						}
					});
				}
			}

			/**
	   * Append a script tag to the document head
	   * @param {string} src url
	   * @returns {Promise} loaded
	   */

		}, {
			key: "addScript",
			value: function addScript(src) {

				return new _Promise(function (resolve, reject) {
					var $script;
					var ready = false;

					if (!this.document) {
						resolve(false);
						return;
					}

					$script = this.document.createElement("script");
					$script.type = "text/javascript";
					$script.async = true;
					$script.src = src;
					$script.onload = $script.onreadystatechange = function () {
						if (!ready && (!this.readyState || this.readyState == "complete")) {
							ready = true;
							setTimeout(function () {
								resolve(true);
							}, 1);
						}
					};

					this.document.head.appendChild($script);
				}.bind(this));
			}

			/**
	   * Add a class to the contents container
	   * @param {string} className
	   */

		}, {
			key: "addClass",
			value: function addClass(className) {
				var content;

				if (!this.document) return;

				content = this.content || this.document.body;

				if (content) {
					content.classList.add(className);
				}
			}

			/**
	   * Remove a class from the contents container
	   * @param {string} removeClass
	   */

		}, {
			key: "removeClass",
			value: function removeClass(className) {
				var content;

				if (!this.document) return;

				content = this.content || this.document.body;

				if (content) {
					content.classList.remove(className);
				}
			}

			/**
	   * Add DOM event listeners
	   * @private
	   */

		}, {
			key: "addEventListeners",
			value: function addEventListeners() {
				if (!this.document) {
					return;
				}

				DOM_EVENTS.forEach(function (eventName) {
					this.document.addEventListener(eventName, this.triggerEvent.bind(this), false);
				}, this);
			}

			/**
	   * Remove DOM event listeners
	   * @private
	   */

		}, {
			key: "removeEventListeners",
			value: function removeEventListeners() {
				if (!this.document) {
					return;
				}
				DOM_EVENTS.forEach(function (eventName) {
					this.document.removeEventListener(eventName, this.triggerEvent, false);
				}, this);
			}

			/**
	   * Emit passed browser events
	   * @private
	   */

		}, {
			key: "triggerEvent",
			value: function triggerEvent(e) {
				this.emit(e.type, e);
			}

			/**
	   * Add listener for text selection
	   * @private
	   */

		}, {
			key: "addSelectionListeners",
			value: function addSelectionListeners() {
				if (!this.document) {
					return;
				}
				this.document.addEventListener("selectionchange", this.onSelectionChange.bind(this), false);
			}

			/**
	   * Remove listener for text selection
	   * @private
	   */

		}, {
			key: "removeSelectionListeners",
			value: function removeSelectionListeners() {
				if (!this.document) {
					return;
				}
				this.document.removeEventListener("selectionchange", this.onSelectionChange, false);
			}

			/**
	   * Handle getting text on selection
	   * @private
	   */

		}, {
			key: "onSelectionChange",
			value: function onSelectionChange(e) {
				if (this.selectionEndTimeout) {
					clearTimeout(this.selectionEndTimeout);
				}
				this.selectionEndTimeout = setTimeout(function () {
					var selection = this.window.getSelection();
					this.triggerSelectedEvent(selection);
				}.bind(this), 250);
			}

			/**
	   * Emit event on text selection
	   * @private
	   */

		}, {
			key: "triggerSelectedEvent",
			value: function triggerSelectedEvent(selection) {
				var range, cfirange;

				if (selection && selection.rangeCount > 0) {
					range = selection.getRangeAt(0);
					if (!range.collapsed) {
						// cfirange = this.section.cfiFromRange(range);
						cfirange = new EpubCFI(range, this.cfiBase).toString();
						this.emit(EVENTS.CONTENTS.SELECTED, cfirange);
						this.emit(EVENTS.CONTENTS.SELECTED_RANGE, range);
					}
				}
			}

			/**
	   * Get a Dom Range from EpubCFI
	   * @param {EpubCFI} _cfi
	   * @param {string} [ignoreClass]
	   * @returns {Range} range
	   */

		}, {
			key: "range",
			value: function range(_cfi, ignoreClass) {
				var cfi = new EpubCFI(_cfi);
				return cfi.toRange(this.document, ignoreClass);
			}

			/**
	   * Get an EpubCFI from a Dom Range
	   * @param {Range} range
	   * @param {string} [ignoreClass]
	   * @returns {EpubCFI} cfi
	   */

		}, {
			key: "cfiFromRange",
			value: function cfiFromRange(range, ignoreClass) {
				return new EpubCFI(range, this.cfiBase, ignoreClass).toString();
			}

			/**
	   * Get an EpubCFI from a Dom node
	   * @param {node} node
	   * @param {string} [ignoreClass]
	   * @returns {EpubCFI} cfi
	   */

		}, {
			key: "cfiFromNode",
			value: function cfiFromNode(node, ignoreClass) {
				return new EpubCFI(node, this.cfiBase, ignoreClass).toString();
			}

			// TODO: find where this is used - remove?

		}, {
			key: "map",
			value: function map(layout) {
				var map = new Mapping(layout);
				return map.section();
			}

			/**
	   * Size the contents to a given width and height
	   * @param {number} [width]
	   * @param {number} [height]
	   */

		}, {
			key: "size",
			value: function size(width, height) {
				var viewport = { scale: 1.0, scalable: "no" };

				this.layoutStyle("scrolling");

				if (width >= 0) {
					this.width(width);
					viewport.width = width;
					this.css("padding", "0 " + width / 12 + "px", true);
				}

				if (height >= 0) {
					this.height(height);
					viewport.height = height;
				}

				this.css("margin", "0");
				this.css("box-sizing", "border-box");

				this.viewport(viewport);
			}

			/**
	   * Apply columns to the contents for pagination
	   * @param {number} width
	   * @param {number} height
	   * @param {number} columnWidth
	   * @param {number} gap
	   */

		}, {
			key: "columns",
			value: function columns(width, height, columnWidth, gap) {
				var COLUMN_AXIS = prefixed("column-axis");
				var COLUMN_GAP = prefixed("column-gap");
				var COLUMN_WIDTH = prefixed("column-width");
				var COLUMN_FILL = prefixed("column-fill");

				var writingMode = this.writingMode();
				var axis = writingMode.indexOf("vertical") === 0 ? "vertical" : "horizontal";

				this.layoutStyle("paginated");

				// Fix body width issues if rtl is only set on body element
				if (this.content.dir === "rtl") {
					this.direction("rtl");
				}

				this.width(width);
				this.height(height);

				// Deal with Mobile trying to scale to viewport
				this.viewport({ width: width, height: height, scale: 1.0, scalable: "no" });

				// TODO: inline-block needs more testing
				// Fixes Safari column cut offs, but causes RTL issues
				// this.css("display", "inline-block");

				this.css("overflow-y", "hidden");
				this.css("margin", "0", true);

				if (axis === "vertical") {
					this.css("padding", gap / 2 + "px 20px", true);
				} else {
					this.css("padding", "20px " + gap / 2 + "px", true);
				}

				this.css("box-sizing", "border-box");
				this.css("max-width", "inherit");

				this.css(COLUMN_AXIS, "horizontal");
				this.css(COLUMN_FILL, "auto");

				this.css(COLUMN_GAP, gap + "px");
				this.css(COLUMN_WIDTH, columnWidth + "px");
			}

			/**
	   * Scale contents from center
	   * @param {number} scale
	   * @param {number} offsetX
	   * @param {number} offsetY
	   */

		}, {
			key: "scaler",
			value: function scaler(scale, offsetX, offsetY) {
				var scaleStr = "scale(" + scale + ")";
				var translateStr = "";
				// this.css("position", "absolute"));
				this.css("transform-origin", "top left");

				if (offsetX >= 0 || offsetY >= 0) {
					translateStr = " translate(" + (offsetX || 0) + "px, " + (offsetY || 0) + "px )";
				}

				this.css("transform", scaleStr + translateStr);
			}

			/**
	   * Fit contents into a fixed width and height
	   * @param {number} width
	   * @param {number} height
	   */

		}, {
			key: "fit",
			value: function fit(width, height) {
				var viewport = this.viewport();
				var widthScale = width / parseInt(viewport.width);
				var heightScale = height / parseInt(viewport.height);
				var scale = widthScale < heightScale ? widthScale : heightScale;

				var offsetY = (height - viewport.height * scale) / 2;

				this.layoutStyle("paginated");

				this.width(width);
				this.height(height);
				this.overflow("hidden");

				// Scale to the correct size
				this.scaler(scale, 0, offsetY);

				this.css("background-color", "transparent");
			}

			/**
	   * Set the direction of the text
	   * @param {string} [dir="ltr"] "rtl" | "ltr"
	   */

		}, {
			key: "direction",
			value: function direction(dir) {
				if (this.documentElement) {
					this.documentElement.style["direction"] = dir;
				}
			}
		}, {
			key: "mapPage",
			value: function mapPage(cfiBase, layout, start, end, dev) {
				var mapping = new Mapping(layout, dev);

				return mapping.page(this, cfiBase, start, end);
			}

			/**
	   * Emit event when link in content is clicked
	   * @private
	   */

		}, {
			key: "linksHandler",
			value: function linksHandler() {
				var _this2 = this;

				replaceLinks(this.content, function (href) {
					_this2.emit(EVENTS.CONTENTS.LINK_CLICKED, href);
				});
			}

			/**
	   * Set the writingMode of the text
	   * @param {string} [mode="horizontal-tb"] "horizontal-tb" | "vertical-rl" | "vertical-lr"
	   */

		}, {
			key: "writingMode",
			value: function writingMode(mode) {
				var WRITING_MODE = prefixed("writing-mode");

				if (mode && this.documentElement) {
					this.documentElement.style[WRITING_MODE] = mode;
				}

				return this.window.getComputedStyle(this.documentElement)[WRITING_MODE] || "";
			}

			/**
	   * Set the layoutStyle of the content
	   * @param {string} [style="paginated"] "scrolling" | "paginated"
	   * @private
	   */

		}, {
			key: "layoutStyle",
			value: function layoutStyle(style) {

				if (style) {
					this._layoutStyle = style;
					navigator.epubReadingSystem.layoutStyle = this._layoutStyle;
				}

				return this._layoutStyle || "paginated";
			}

			/**
	   * Add the epubReadingSystem object to the navigator
	   * @param {string} name
	   * @param {string} version
	   * @private
	   */

		}, {
			key: "epubReadingSystem",
			value: function epubReadingSystem(name, version) {
				navigator.epubReadingSystem = {
					name: name,
					version: version,
					layoutStyle: this.layoutStyle(),
					hasFeature: function hasFeature(feature) {
						switch (feature) {
							case "dom-manipulation":
								return true;
							case "layout-changes":
								return true;
							case "touch-events":
								return true;
							case "mouse-events":
								return true;
							case "keyboard-events":
								return true;
							case "spine-scripting":
								return false;
							default:
								return false;
						}
					}
				};
				return navigator.epubReadingSystem;
			}

			/**
	   * Add the document identifier before
	   * @param  {string} identifier
	   */

		}, {
			key: "addIdentifier",
			value: function addIdentifier(identifier) {
				var meta = this.document.createElement("meta");
				meta.setAttribute("name", "dc.relation.ispartof");
				if (identifier) {
					meta.setAttribute("content", identifier);
				}
				this.document.getElementsByTagName("head")[0].appendChild(meta);
			}
		}, {
			key: "destroy",
			value: function destroy() {
				// Stop observing
				if (this.observer) {
					this.observer.disconnect();
				}

				this.document.removeEventListener("transitionend", this.resizeCheck);

				this.removeListeners();
			}
		}], [{
			key: "listenedEvents",
			get: function get() {
				return DOM_EVENTS;
			}
		}]);

		return Contents;
	}();

	eventEmitter(Contents.prototype);

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

	eventEmitter(Annotation.prototype);

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
					var completed = new defer$1();

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
			value: function parse$$1(contents, cfiBase, chars) {
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

	eventEmitter(Locations.prototype);

	/**
	 * Page List Parser
	 * @param {document} [xml]
	 */

	var PageList = function () {
		function PageList(xml) {
			_classCallCheck(this, PageList);

			this.pages = [];
			this.locations = [];
			this.epubcfi = new EpubCFI();

			this.firstPage = 0;
			this.lastPage = 0;
			this.totalPages = 0;

			this.toc = undefined;
			this.ncx = undefined;

			if (xml) {
				this.pageList = this.parse(xml);
			}

			if (this.pageList && this.pageList.length) {
				this.process(this.pageList);
			}
		}

		/**
	  * Parse PageList Xml
	  * @param  {document} xml
	  */


		_createClass(PageList, [{
			key: "parse",
			value: function parse$$1(xml) {
				var html = qs(xml, "html");
				var ncx = qs(xml, "ncx");

				if (html) {
					return this.parseNav(xml);
				} else if (ncx) {
					// Not supported
					// return this.parseNcx(xml);
					return;
				}
			}

			/**
	   * Parse a Nav PageList
	   * @private
	   * @param  {document} navHtml
	   * @return {PageList.item[]} list
	   */

		}, {
			key: "parseNav",
			value: function parseNav(navHtml) {
				var navElement = querySelectorByType(navHtml, "nav", "page-list");
				var navItems = navElement ? qsa(navElement, "li") : [];
				var length = navItems.length;
				var i;
				var list = [];
				var item;

				if (!navItems || length === 0) return list;

				for (i = 0; i < length; ++i) {
					item = this.item(navItems[i]);
					list.push(item);
				}

				return list;
			}

			/**
	   * Page List Item
	   * @private
	   * @param  {object} item
	   * @return {object} pageListItem
	   */

		}, {
			key: "item",
			value: function item(_item) {
				var content = qs(_item, "a"),
				    href = content.getAttribute("href") || "",
				    text = content.textContent || "",
				    page = parseInt(text),
				    isCfi = href.indexOf("epubcfi"),
				    split,
				    packageUrl,
				    cfi;

				if (isCfi != -1) {
					split = href.split("#");
					packageUrl = split[0];
					cfi = split.length > 1 ? split[1] : false;
					return {
						"cfi": cfi,
						"href": href,
						"packageUrl": packageUrl,
						"page": page
					};
				} else {
					return {
						"href": href,
						"page": page
					};
				}
			}

			/**
	   * Process pageList items
	   * @private
	   * @param  {array} pageList
	   */

		}, {
			key: "process",
			value: function process(pageList) {
				pageList.forEach(function (item) {
					this.pages.push(item.page);
					if (item.cfi) {
						this.locations.push(item.cfi);
					}
				}, this);
				this.firstPage = parseInt(this.pages[0]);
				this.lastPage = parseInt(this.pages[this.pages.length - 1]);
				this.totalPages = this.lastPage - this.firstPage;
			}

			/**
	   * Get a PageList result from a EpubCFI
	   * @param  {string} cfi EpubCFI String
	   * @return {string} page
	   */

		}, {
			key: "pageFromCfi",
			value: function pageFromCfi(cfi) {
				var pg = -1;

				// Check if the pageList has not been set yet
				if (this.locations.length === 0) {
					return -1;
				}

				// TODO: check if CFI is valid?

				// check if the cfi is in the location list
				// var index = this.locations.indexOf(cfi);
				var index = indexOfSorted$1(cfi, this.locations, this.epubcfi.compare);
				if (index != -1) {
					pg = this.pages[index];
				} else {
					// Otherwise add it to the list of locations
					// Insert it in the correct position in the locations page
					//index = EPUBJS.core.insert(cfi, this.locations, this.epubcfi.compare);
					index = locationOf(cfi, this.locations, this.epubcfi.compare);
					// Get the page at the location just before the new one, or return the first
					pg = index - 1 >= 0 ? this.pages[index - 1] : this.pages[0];
					if (pg !== undefined) {
						// Add the new page in so that the locations and page array match up
						//this.pages.splice(index, 0, pg);
					} else {
						pg = -1;
					}
				}
				return pg;
			}

			/**
	   * Get an EpubCFI from a Page List Item
	   * @param  {string} pg
	   * @return {string} cfi
	   */

		}, {
			key: "cfiFromPage",
			value: function cfiFromPage(pg) {
				var cfi = -1;
				// check that pg is an int
				if (typeof pg != "number") {
					pg = parseInt(pg);
				}

				// check if the cfi is in the page list
				// Pages could be unsorted.
				var index = this.pages.indexOf(pg);
				if (index != -1) {
					cfi = this.locations[index];
				}
				// TODO: handle pages not in the list
				return cfi;
			}

			/**
	   * Get a Page from Book percentage
	   * @param  {number} percent
	   * @return {string} page
	   */

		}, {
			key: "pageFromPercentage",
			value: function pageFromPercentage(percent) {
				var pg = Math.round(this.totalPages * percent);
				return pg;
			}

			/**
	   * Returns a value between 0 - 1 corresponding to the location of a page
	   * @param  {int} pg the page
	   * @return {number} percentage
	   */

		}, {
			key: "percentageFromPage",
			value: function percentageFromPage(pg) {
				var percentage = (pg - this.firstPage) / this.totalPages;
				return Math.round(percentage * 1000) / 1000;
			}

			/**
	   * Returns a value between 0 - 1 corresponding to the location of a cfi
	   * @param  {string} cfi EpubCFI String
	   * @return {number} percentage
	   */

		}, {
			key: "percentageFromCfi",
			value: function percentageFromCfi(cfi) {
				var pg = this.pageFromCfi(cfi);
				var percentage = this.percentageFromPage(pg);
				return percentage;
			}

			/**
	   * Export pages as an Array
	   * @return {array}
	   */

		}, {
			key: "toArray",
			value: function toArray() {
				return this.locations;
			}

			/**
	   * Export pages as JSON
	   * @return {json}
	   */

		}, {
			key: "toJSON",
			value: function toJSON() {
				return _JSON$stringify(this.locations);
			}
		}, {
			key: "destroy",
			value: function destroy() {
				this.pages = undefined;
				this.locations = undefined;
				this.epubcfi = undefined;

				this.pageList = undefined;

				this.toc = undefined;
				this.ncx = undefined;
			}
		}]);

		return PageList;
	}();

	/**
	 * Handles Parsing and Accessing an Epub Container
	 * @class
	 * @param {document} [containerDocument] xml document
	 */

	var Container = function () {
		function Container(containerDocument) {
			_classCallCheck(this, Container);

			this.packagePath = "";
			this.directory = "";
			this.encoding = "";

			if (containerDocument) {
				this.parse(containerDocument);
			}
		}

		/**
	  * Parse the Container XML
	  * @param  {document} containerDocument
	  */


		_createClass(Container, [{
			key: "parse",
			value: function parse$$1(containerDocument) {
				//-- <rootfile full-path="OPS/package.opf" media-type="application/oebps-package+xml"/>
				var rootfile;

				if (!containerDocument) {
					throw new Error("Container File Not Found");
				}

				rootfile = qs(containerDocument, "rootfile");

				if (!rootfile) {
					throw new Error("No RootFile Found");
				}

				this.packagePath = rootfile.getAttribute("full-path");
				this.directory = path.dirname(this.packagePath);
				this.encoding = containerDocument.xmlEncoding;
			}
		}, {
			key: "destroy",
			value: function destroy() {
				this.packagePath = undefined;
				this.directory = undefined;
				this.encoding = undefined;
			}
		}]);

		return Container;
	}();

	/**
	 * Open Packaging Format Parser
	 * @class
	 * @param {document} packageDocument OPF XML
	 */

	var Packaging = function () {
		function Packaging(packageDocument) {
			_classCallCheck(this, Packaging);

			this.manifest = {};
			this.navPath = "";
			this.ncxPath = "";
			this.coverPath = "";
			this.spineNodeIndex = 0;
			this.spine = [];
			this.metadata = {};

			if (packageDocument) {
				this.parse(packageDocument);
			}
		}

		/**
	  * Parse OPF XML
	  * @param  {document} packageDocument OPF XML
	  * @return {object} parsed package parts
	  */


		_createClass(Packaging, [{
			key: "parse",
			value: function parse$$1(packageDocument) {
				var metadataNode, manifestNode, spineNode;

				if (!packageDocument) {
					throw new Error("Package File Not Found");
				}

				metadataNode = qs(packageDocument, "metadata");
				if (!metadataNode) {
					throw new Error("No Metadata Found");
				}

				manifestNode = qs(packageDocument, "manifest");
				if (!manifestNode) {
					throw new Error("No Manifest Found");
				}

				spineNode = qs(packageDocument, "spine");
				if (!spineNode) {
					throw new Error("No Spine Found");
				}

				this.manifest = this.parseManifest(manifestNode);
				this.navPath = this.findNavPath(manifestNode);
				this.ncxPath = this.findNcxPath(manifestNode, spineNode);
				this.coverPath = this.findCoverPath(packageDocument);

				this.spineNodeIndex = indexOfElementNode(spineNode);

				this.spine = this.parseSpine(spineNode, this.manifest);

				this.metadata = this.parseMetadata(metadataNode);

				this.metadata.direction = spineNode.getAttribute("page-progression-direction");

				return {
					"metadata": this.metadata,
					"spine": this.spine,
					"manifest": this.manifest,
					"navPath": this.navPath,
					"ncxPath": this.ncxPath,
					"coverPath": this.coverPath,
					"spineNodeIndex": this.spineNodeIndex
				};
			}

			/**
	   * Parse Metadata
	   * @private
	   * @param  {document} xml
	   * @return {object} metadata
	   */

		}, {
			key: "parseMetadata",
			value: function parseMetadata(xml) {
				var metadata = {};

				metadata.title = this.getElementText(xml, "title");
				metadata.creator = this.getElementText(xml, "creator");
				metadata.description = this.getElementText(xml, "description");

				metadata.pubdate = this.getElementText(xml, "date");

				metadata.publisher = this.getElementText(xml, "publisher");

				metadata.identifier = this.getElementText(xml, "identifier");
				metadata.language = this.getElementText(xml, "language");
				metadata.rights = this.getElementText(xml, "rights");

				metadata.modified_date = this.getPropertyText(xml, "dcterms:modified");

				metadata.layout = this.getPropertyText(xml, "rendition:layout");
				metadata.orientation = this.getPropertyText(xml, "rendition:orientation");
				metadata.flow = this.getPropertyText(xml, "rendition:flow");
				metadata.viewport = this.getPropertyText(xml, "rendition:viewport");

				return metadata;
			}

			/**
	   * Parse Manifest
	   * @private
	   * @param  {document} manifestXml
	   * @return {object} manifest
	   */

		}, {
			key: "parseManifest",
			value: function parseManifest(manifestXml) {
				var manifest = {};

				//-- Turn items into an array
				var selected = qsa(manifestXml, "item");
				var items = Array.prototype.slice.call(selected);

				//-- Create an object with the id as key
				items.forEach(function (item) {
					var id = item.getAttribute("id"),
					    href = item.getAttribute("href") || "",
					    type$$1 = item.getAttribute("media-type") || "",
					    properties = item.getAttribute("properties") || "";

					manifest[id] = {
						"href": href,
						"type": type$$1,
						"properties": properties.length ? properties.split(" ") : []
					};
				});

				return manifest;
			}

			/**
	   * Parse Spine
	   * @param  {document} spineXml
	   * @param  {Packaging.manifest} manifest
	   * @return {object} spine
	   */

		}, {
			key: "parseSpine",
			value: function parseSpine(spineXml, manifest) {
				var spine = [];

				var selected = qsa(spineXml, "itemref");
				var items = Array.prototype.slice.call(selected);

				// var epubcfi = new EpubCFI();

				//-- Add to array to mantain ordering and cross reference with manifest
				items.forEach(function (item, index) {
					var idref = item.getAttribute("idref");
					// var cfiBase = epubcfi.generateChapterComponent(spineNodeIndex, index, Id);
					var props = item.getAttribute("properties") || "";
					var propArray = props.length ? props.split(" ") : [];
					// var manifestProps = manifest[Id].properties;
					// var manifestPropArray = manifestProps.length ? manifestProps.split(" ") : [];

					var itemref = {
						"idref": idref,
						"linear": item.getAttribute("linear") || "yes",
						"properties": propArray,
						// "href" : manifest[Id].href,
						// "url" :  manifest[Id].url,
						"index": index
						// "cfiBase" : cfiBase
					};
					spine.push(itemref);
				});

				return spine;
			}

			/**
	   * Find TOC NAV
	   * @private
	   */

		}, {
			key: "findNavPath",
			value: function findNavPath(manifestNode) {
				// Find item with property "nav"
				// Should catch nav irregardless of order
				var node = qsp(manifestNode, "item", { "properties": "nav" });
				return node ? node.getAttribute("href") : false;
			}

			/**
	   * Find TOC NCX
	   * media-type="application/x-dtbncx+xml" href="toc.ncx"
	   * @private
	   */

		}, {
			key: "findNcxPath",
			value: function findNcxPath(manifestNode, spineNode) {
				var node = qsp(manifestNode, "item", { "media-type": "application/x-dtbncx+xml" });
				var tocId;

				// If we can't find the toc by media-type then try to look for id of the item in the spine attributes as
				// according to http://www.idpf.org/epub/20/spec/OPF_2.0.1_draft.htm#Section2.4.1.2,
				// "The item that describes the NCX must be referenced by the spine toc attribute."
				if (!node) {
					tocId = spineNode.getAttribute("toc");
					if (tocId) {
						// node = manifestNode.querySelector("item[id='" + tocId + "']");
						node = manifestNode.getElementById(tocId);
					}
				}

				return node ? node.getAttribute("href") : false;
			}

			/**
	   * Find the Cover Path
	   * <item properties="cover-image" id="ci" href="cover.svg" media-type="image/svg+xml" />
	   * Fallback for Epub 2.0
	   * @param  {document} packageXml
	   * @return {string} href
	   */

		}, {
			key: "findCoverPath",
			value: function findCoverPath(packageXml) {
				var pkg = qs(packageXml, "package");
				var epubVersion = pkg.getAttribute("version");

				if (epubVersion === "2.0") {
					var metaCover = qsp(packageXml, "meta", { "name": "cover" });
					if (metaCover) {
						var coverId = metaCover.getAttribute("content");
						var cover = packageXml.getElementById(coverId);
						return cover ? cover.getAttribute("href") : "";
					} else {
						return false;
					}
				} else {
					var node = qsp(packageXml, "item", { "properties": "cover-image" });
					return node ? node.getAttribute("href") : "";
				}
			}

			/**
	   * Get text of a namespaced element
	   * @private
	   * @param  {document} xml
	   * @param  {string} tag
	   * @return {string} text
	   */

		}, {
			key: "getElementText",
			value: function getElementText(xml, tag) {
				var found = xml.getElementsByTagNameNS("http://purl.org/dc/elements/1.1/", tag);
				var el;

				if (!found || found.length === 0) return "";

				el = found[0];

				if (el.childNodes.length) {
					return el.childNodes[0].nodeValue;
				}

				return "";
			}

			/**
	   * Get text by property
	   * @private
	   * @param  {document} xml
	   * @param  {string} property
	   * @return {string} text
	   */

		}, {
			key: "getPropertyText",
			value: function getPropertyText(xml, property) {
				var el = qsp(xml, "meta", { "property": property });

				if (el && el.childNodes.length) {
					return el.childNodes[0].nodeValue;
				}

				return "";
			}

			/**
	   * Load JSON Manifest
	   * @param  {document} packageDocument OPF XML
	   * @return {object} parsed package parts
	   */

		}, {
			key: "load",
			value: function load(json) {
				var _this = this;

				this.metadata = json.metadata;

				this.spine = json.spine.map(function (item, index) {
					var id = item.idref;

					if (!id) {
						item.idref = encodeURIComponent(item.href);
					}

					if (typeof item.linear === "undefined") {
						item.linear = "yes";
					}

					if (item.rel && item.rel[0] === "cover") {
						_this.coverPath = item.href;
					}

					item.index = index;
					_this.manifest[item.idref] = item;

					return item;
				});

				if (json.resource) {
					json.resources.forEach(function (item) {
						var id = item.id || item.href;

						_this.manifest[id] = item;

						if (item.rel && item.rel[0] === "cover") {
							_this.coverPath = item.href;
						}
					});
				}

				this.spineNodeIndex = 0;

				this.toc = json.toc;

				return {
					"metadata": this.metadata,
					"spine": this.spine,
					"manifest": this.manifest,
					"navPath": this.navPath,
					"ncxPath": this.ncxPath,
					"coverPath": this.coverPath,
					"spineNodeIndex": this.spineNodeIndex,
					"toc": this.toc
				};
			}
		}, {
			key: "destroy",
			value: function destroy() {
				this.manifest = undefined;
				this.navPath = undefined;
				this.ncxPath = undefined;
				this.coverPath = undefined;
				this.spineNodeIndex = undefined;
				this.spine = undefined;
				this.metadata = undefined;
			}
		}]);

		return Packaging;
	}();

	/**
	 * Navigation Parser
	 * @param {document} xml navigation html / xhtml / ncx
	 */

	var Navigation$1 = function () {
		function Navigation(xml, url) {
			_classCallCheck(this, Navigation);

			this.toc = [];
			this.tocByHref = {};
			this.tocById = {};

			this.landmarks = [];
			this.landmarksByType = {};

			this.length = 0;

			this.url = url || "";

			if (xml) {
				this.parse(xml);
			}
		}

		/**
	  * Parse out the navigation items
	  * @param {document} xml navigation html / xhtml / ncx
	  */


		_createClass(Navigation, [{
			key: "parse",
			value: function parse$$1(xml) {
				var isXml$$1 = xml.nodeType;
				var html = void 0;
				var ncx = void 0;

				if (isXml$$1) {
					html = qs(xml, "html");
					ncx = qs(xml, "ncx");
				}

				if (!isXml$$1) {
					this.toc = this.load(xml);
				} else if (html) {
					this.toc = this.parseNav(xml);
					this.landmarks = this.parseLandmarks(xml);
				} else if (ncx) {
					this.toc = this.parseNcx(xml);
				}

				this.length = 0;

				this.unpack(this.toc);
			}

			/**
	   * Unpack navigation items
	   * @private
	   * @param  {array} toc
	   */

		}, {
			key: "unpack",
			value: function unpack(toc) {
				var item;
				var href;

				for (var i = 0; i < toc.length; i++) {
					item = toc[i];
					href = item.href;

					if (item.href) {
						this.tocByHref[href] = i;
					}

					if (item.id) {
						this.tocById[href] = i;
					}

					this.length++;

					if (item.children.length) {
						this.unpack(item.children);
					}
				}
			}

			/**
	   * Get an item from the navigation
	   * @param  {string} target
	   * @return {object} navItems
	   */

		}, {
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
			value: function landmark(type$$1) {
				var index;

				if (!type$$1) {
					return this.landmarks;
				}

				index = this.landmarksByType[type$$1];

				return this.landmarks[index];
			}

			/**
	   * Parse toc from a Epub > 3.0 Nav
	   * @private
	   * @param  {document} navHtml
	   * @return {array} navigation list
	   */

		}, {
			key: "parseNav",
			value: function parseNav(navHtml) {
				var navElement = querySelectorByType(navHtml, "nav", "toc");
				var navItems = navElement ? qsa(navElement, "li") : [];
				var length = navItems.length;
				var i;
				var toc = {};
				var list = [];
				var item, parent;

				if (!navItems || length === 0) return list;

				for (i = 0; i < length; ++i) {
					item = this.navItem(navItems[i]);
					if (item) {
						toc[item.id] = item;
						if (!item.parentIndex) {
							list.push(item);
						} else {
							parent = toc[item.parent];
							parent.children.push(item);
						}
					}
				}

				return list;
			}

			/**
	   * Create a navItem
	   * @private
	   * @param  {element} item
	   * @return {object} navItem
	   */

		}, {
			key: "navItem",
			value: function navItem(item) {
				var id = item.getAttribute("id") || undefined;
				var content = filterChildren(item, "a", true);

				if (!content) {
					return;
				}

				if (!id) {
					id = 'epubjs-autogen-toc-id-' + uuid();
					item.setAttribute('id', id);
				}

				var href = content.getAttribute("href") || "";
				var title = content.textContent || "";
				var children = [];
				var parentItem = getParentByTagName(item, "li");
				var parent = void 0;

				var split = href.split("#");
				if (split[0] === "") {
					href = this.url + href;
				}

				if (parentItem) {
					parent = parentItem.getAttribute("id");
				}

				while (!parent && parentItem) {
					parentItem = getParentByTagName(parentItem, "li");
					if (parentItem) {
						parent = parentItem.getAttribute("id");
					}
				}

				return {
					id: id,
					href: href,
					title: title,
					children: children,
					parent: parent
				};
			}

			/**
	   * Parse landmarks from a Epub > 3.0 Nav
	   * @private
	   * @param  {document} navHtml
	   * @return {array} landmarks list
	   */

		}, {
			key: "parseLandmarks",
			value: function parseLandmarks(navHtml) {
				var navElement = querySelectorByType(navHtml, "nav", "landmarks");
				var navItems = navElement ? qsa(navElement, "li") : [];
				var length = navItems.length;
				var i;
				var list = [];
				var item;

				if (!navItems || length === 0) return list;

				for (i = 0; i < length; ++i) {
					item = this.landmarkItem(navItems[i]);
					if (item) {
						list.push(item);
						this.landmarksByType[item.type] = i;
					}
				}

				return list;
			}

			/**
	   * Create a landmarkItem
	   * @private
	   * @param  {element} item
	   * @return {object} landmarkItem
	   */

		}, {
			key: "landmarkItem",
			value: function landmarkItem(item) {
				var content = filterChildren(item, "a", true);

				if (!content) {
					return;
				}

				var type$$1 = content.getAttributeNS("http://www.idpf.org/2007/ops", "type") || undefined;
				var href = content.getAttribute("href") || "";
				var title = content.textContent || "";

				var split = href.split("#");
				if (split[0] === "") {
					href = this.url + href;
				}

				return {
					href: href,
					title: title,
					type: type$$1
				};
			}

			/**
	   * Parse from a Epub > 3.0 NC
	   * @private
	   * @param  {document} navHtml
	   * @return {array} navigation list
	   */

		}, {
			key: "parseNcx",
			value: function parseNcx(tocXml) {
				var navPoints = qsa(tocXml, "navPoint");
				var length = navPoints.length;
				var i;
				var toc = {};
				var list = [];
				var item, parent;

				if (!navPoints || length === 0) return list;

				for (i = 0; i < length; ++i) {
					item = this.ncxItem(navPoints[i]);
					toc[item.id] = item;
					if (!item.parent) {
						list.push(item);
					} else {
						parent = toc[item.parent];
						parent.children.push(item);
					}
				}

				return list;
			}

			/**
	   * Create a ncxItem
	   * @private
	   * @param  {element} item
	   * @return {object} ncxItem
	   */

		}, {
			key: "ncxItem",
			value: function ncxItem(item) {
				var id = item.getAttribute("id") || false,
				    content = qs(item, "content"),
				    href = content.getAttribute("src"),
				    navLabel = qs(item, "navLabel"),
				    title = navLabel.textContent ? navLabel.textContent : "",
				    children = [],
				    parentNode = item.parentNode,
				    parent;

				if (parentNode && parentNode.nodeName === "navPoint") {
					parent = parentNode.getAttribute("id");
				}

				if (!id) {
					id = 'epubjs-autogen-toc-id-' + uuid();
					item.setAttribute('id', id);
				}

				return {
					id: id,
					href: href,
					title: title,
					children: children,
					parent: parent
				};
			}

			/**
	   * Load Spine Items
	   * @param  {object} json the items to be loaded
	   */

		}, {
			key: "load",
			value: function load(json) {
				var _this = this;

				return json.map(function (item) {
					if (item.children) {
						item.children = _this.load(item.children);
					}
					return item;
				});
			}

			/**
	   * forEach pass through
	   * @param  {Function} fn function to run on each item
	   * @return {method} forEach loop
	   */

		}, {
			key: "forEach",
			value: function forEach(fn) {
				return this.toc.forEach(fn);
			}

			/**
	   * Get an Array of all Table of Contents Items
	   */

		}, {
			key: "getTocArray",
			value: function getTocArray(resolver) {
				return this.toc.map(function (item) {
					var url = resolver ? resolver(item.href) : item.href;

					var obj = {
						href: url,
						title: item.title
					};

					if (item.children.length) {
						obj.children = item.children;
					}

					return obj;
				});
			}

			/**
	   * Get an Array of all landmarks
	   */

		}, {
			key: "getLandmarksArray",
			value: function getLandmarksArray(resolver) {
				return this.landmarks.map(function (item) {
					var url = resolver ? resolver(item.href) : item.href;

					var obj = {
						href: url,
						title: item.title,
						type: item.type
					};

					return obj;
				});
			}
		}]);

		return Navigation;
	}();

	// 19.1.2.1 Object.assign(target, source, ...)
	var $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = _toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = _objectGops.f
	    , isEnum     = _objectPie.f;
	  while(aLen > index){
	    var S      = _iobject(arguments[index++])
	      , keys   = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', {assign: _objectAssign});

	var assign$1 = _core.Object.assign;

	var assign$2 = createCommonjsModule(function (module) {
	module.exports = { "default": assign$1, __esModule: true };
	});

	var _Object$assign = unwrapExports(assign$2);

	/*
	 From Zip.js, by Gildas Lormeau
	edited down
	 */

	var table = {
		"application": {
			"ecmascript": ["es", "ecma"],
			"javascript": "js",
			"ogg": "ogx",
			"pdf": "pdf",
			"postscript": ["ps", "ai", "eps", "epsi", "epsf", "eps2", "eps3"],
			"rdf+xml": "rdf",
			"smil": ["smi", "smil"],
			"xhtml+xml": ["xhtml", "xht"],
			"xml": ["xml", "xsl", "xsd", "opf", "ncx"],
			"zip": "zip",
			"x-httpd-eruby": "rhtml",
			"x-latex": "latex",
			"x-maker": ["frm", "maker", "frame", "fm", "fb", "book", "fbdoc"],
			"x-object": "o",
			"x-shockwave-flash": ["swf", "swfl"],
			"x-silverlight": "scr",
			"epub+zip": "epub",
			"font-tdpfr": "pfr",
			"inkml+xml": ["ink", "inkml"],
			"json": "json",
			"jsonml+json": "jsonml",
			"mathml+xml": "mathml",
			"metalink+xml": "metalink",
			"mp4": "mp4s",
			// "oebps-package+xml" : "opf",
			"omdoc+xml": "omdoc",
			"oxps": "oxps",
			"vnd.amazon.ebook": "azw",
			"widget": "wgt",
			// "x-dtbncx+xml" : "ncx",
			"x-dtbook+xml": "dtb",
			"x-dtbresource+xml": "res",
			"x-font-bdf": "bdf",
			"x-font-ghostscript": "gsf",
			"x-font-linux-psf": "psf",
			"x-font-otf": "otf",
			"x-font-pcf": "pcf",
			"x-font-snf": "snf",
			"x-font-ttf": ["ttf", "ttc"],
			"x-font-type1": ["pfa", "pfb", "pfm", "afm"],
			"x-font-woff": "woff",
			"x-mobipocket-ebook": ["prc", "mobi"],
			"x-mspublisher": "pub",
			"x-nzb": "nzb",
			"x-tgif": "obj",
			"xaml+xml": "xaml",
			"xml-dtd": "dtd",
			"xproc+xml": "xpl",
			"xslt+xml": "xslt",
			"internet-property-stream": "acx",
			"x-compress": "z",
			"x-compressed": "tgz",
			"x-gzip": "gz"
		},
		"audio": {
			"flac": "flac",
			"midi": ["mid", "midi", "kar", "rmi"],
			"mpeg": ["mpga", "mpega", "mp2", "mp3", "m4a", "mp2a", "m2a", "m3a"],
			"mpegurl": "m3u",
			"ogg": ["oga", "ogg", "spx"],
			"x-aiff": ["aif", "aiff", "aifc"],
			"x-ms-wma": "wma",
			"x-wav": "wav",
			"adpcm": "adp",
			"mp4": "mp4a",
			"webm": "weba",
			"x-aac": "aac",
			"x-caf": "caf",
			"x-matroska": "mka",
			"x-pn-realaudio-plugin": "rmp",
			"xm": "xm",
			"mid": ["mid", "rmi"]
		},
		"image": {
			"gif": "gif",
			"ief": "ief",
			"jpeg": ["jpeg", "jpg", "jpe"],
			"pcx": "pcx",
			"png": "png",
			"svg+xml": ["svg", "svgz"],
			"tiff": ["tiff", "tif"],
			"x-icon": "ico",
			"bmp": "bmp",
			"webp": "webp",
			"x-pict": ["pic", "pct"],
			"x-tga": "tga",
			"cis-cod": "cod"
		},
		"text": {
			"cache-manifest": ["manifest", "appcache"],
			"css": "css",
			"csv": "csv",
			"html": ["html", "htm", "shtml", "stm"],
			"mathml": "mml",
			"plain": ["txt", "text", "brf", "conf", "def", "list", "log", "in", "bas"],
			"richtext": "rtx",
			"tab-separated-values": "tsv",
			"x-bibtex": "bib"
		},
		"video": {
			"mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v", "mp2", "mpa", "mpv2"],
			"mp4": ["mp4", "mp4v", "mpg4"],
			"quicktime": ["qt", "mov"],
			"ogg": "ogv",
			"vnd.mpegurl": ["mxu", "m4u"],
			"x-flv": "flv",
			"x-la-asf": ["lsf", "lsx"],
			"x-mng": "mng",
			"x-ms-asf": ["asf", "asx", "asr"],
			"x-ms-wm": "wm",
			"x-ms-wmv": "wmv",
			"x-ms-wmx": "wmx",
			"x-ms-wvx": "wvx",
			"x-msvideo": "avi",
			"x-sgi-movie": "movie",
			"x-matroska": ["mpv", "mkv", "mk3d", "mks"],
			"3gpp2": "3g2",
			"h261": "h261",
			"h263": "h263",
			"h264": "h264",
			"jpeg": "jpgv",
			"jpm": ["jpm", "jpgm"],
			"mj2": ["mj2", "mjp2"],
			"vnd.ms-playready.media.pyv": "pyv",
			"vnd.uvvu.mp4": ["uvu", "uvvu"],
			"vnd.vivo": "viv",
			"webm": "webm",
			"x-f4v": "f4v",
			"x-m4v": "m4v",
			"x-ms-vob": "vob",
			"x-smv": "smv"
		}
	};

	var mimeTypes = function () {
		var type,
		    subtype,
		    val,
		    index,
		    mimeTypes = {};
		for (type in table) {
			if (table.hasOwnProperty(type)) {
				for (subtype in table[type]) {
					if (table[type].hasOwnProperty(subtype)) {
						val = table[type][subtype];
						if (typeof val == "string") {
							mimeTypes[val] = type + "/" + subtype;
						} else {
							for (index = 0; index < val.length; index++) {
								mimeTypes[val[index]] = type + "/" + subtype;
							}
						}
					}
				}
			}
		}
		return mimeTypes;
	}();

	var defaultValue = "text/plain"; //"application/octet-stream";

	function lookup(filename) {
		return filename && mimeTypes[filename.split(".").pop().toLowerCase()] || defaultValue;
	}
	var mime = {
		'lookup': lookup
	};

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
			value: function substitute$$1(text, resources) {
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
					var type$$1 = item.type,
					    properties = item.properties,
					    id = item.id;

					var source = item.href;

					var href = item.cached || item.replacement || _this7.url && _this7.url.resolve(item.href) || item.href;

					return {
						href: href,
						source: source,
						type: type$$1,
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

	var jszip = createCommonjsModule(function (module, exports) {
	/*!

	JSZip v3.1.5 - A JavaScript class for generating and reading zip files
	<http://stuartk.com/jszip>

	(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
	Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

	JSZip uses the library pako released under the MIT license :
	https://github.com/nodeca/pako/blob/master/LICENSE
	*/

	(function(f){{module.exports=f();}})(function(){return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND", f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r);}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	var utils = require('./utils');
	var support = require('./support');
	// private property
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";


	// public method for encoding
	exports.encode = function(input) {
	    var output = [];
	    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	    var i = 0, len = input.length, remainingBytes = len;

	    var isArray = utils.getTypeOf(input) !== "string";
	    while (i < input.length) {
	        remainingBytes = len - i;

	        if (!isArray) {
	            chr1 = input.charCodeAt(i++);
	            chr2 = i < len ? input.charCodeAt(i++) : 0;
	            chr3 = i < len ? input.charCodeAt(i++) : 0;
	        } else {
	            chr1 = input[i++];
	            chr2 = i < len ? input[i++] : 0;
	            chr3 = i < len ? input[i++] : 0;
	        }

	        enc1 = chr1 >> 2;
	        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	        enc3 = remainingBytes > 1 ? (((chr2 & 15) << 2) | (chr3 >> 6)) : 64;
	        enc4 = remainingBytes > 2 ? (chr3 & 63) : 64;

	        output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));

	    }

	    return output.join("");
	};

	// public method for decoding
	exports.decode = function(input) {
	    var chr1, chr2, chr3;
	    var enc1, enc2, enc3, enc4;
	    var i = 0, resultIndex = 0;

	    var dataUrlPrefix = "data:";

	    if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) {
	        // This is a common error: people give a data url
	        // (data:image/png;base64,iVBOR...) with a {base64: true} and
	        // wonders why things don't work.
	        // We can detect that the string input looks like a data url but we
	        // *can't* be sure it is one: removing everything up to the comma would
	        // be too dangerous.
	        throw new Error("Invalid base64 input, it looks like a data url.");
	    }

	    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	    var totalLength = input.length * 3 / 4;
	    if(input.charAt(input.length - 1) === _keyStr.charAt(64)) {
	        totalLength--;
	    }
	    if(input.charAt(input.length - 2) === _keyStr.charAt(64)) {
	        totalLength--;
	    }
	    if (totalLength % 1 !== 0) {
	        // totalLength is not an integer, the length does not match a valid
	        // base64 content. That can happen if:
	        // - the input is not a base64 content
	        // - the input is *almost* a base64 content, with a extra chars at the
	        //   beginning or at the end
	        // - the input uses a base64 variant (base64url for example)
	        throw new Error("Invalid base64 input, bad content length.");
	    }
	    var output;
	    if (support.uint8array) {
	        output = new Uint8Array(totalLength|0);
	    } else {
	        output = new Array(totalLength|0);
	    }

	    while (i < input.length) {

	        enc1 = _keyStr.indexOf(input.charAt(i++));
	        enc2 = _keyStr.indexOf(input.charAt(i++));
	        enc3 = _keyStr.indexOf(input.charAt(i++));
	        enc4 = _keyStr.indexOf(input.charAt(i++));

	        chr1 = (enc1 << 2) | (enc2 >> 4);
	        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	        chr3 = ((enc3 & 3) << 6) | enc4;

	        output[resultIndex++] = chr1;

	        if (enc3 !== 64) {
	            output[resultIndex++] = chr2;
	        }
	        if (enc4 !== 64) {
	            output[resultIndex++] = chr3;
	        }

	    }

	    return output;
	};

	},{"./support":30,"./utils":32}],2:[function(require,module,exports){

	var external = require("./external");
	var DataWorker = require('./stream/DataWorker');
	var DataLengthProbe = require('./stream/DataLengthProbe');
	var Crc32Probe = require('./stream/Crc32Probe');
	var DataLengthProbe = require('./stream/DataLengthProbe');

	/**
	 * Represent a compressed object, with everything needed to decompress it.
	 * @constructor
	 * @param {number} compressedSize the size of the data compressed.
	 * @param {number} uncompressedSize the size of the data after decompression.
	 * @param {number} crc32 the crc32 of the decompressed file.
	 * @param {object} compression the type of compression, see lib/compressions.js.
	 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the compressed data.
	 */
	function CompressedObject(compressedSize, uncompressedSize, crc32, compression, data) {
	    this.compressedSize = compressedSize;
	    this.uncompressedSize = uncompressedSize;
	    this.crc32 = crc32;
	    this.compression = compression;
	    this.compressedContent = data;
	}

	CompressedObject.prototype = {
	    /**
	     * Create a worker to get the uncompressed content.
	     * @return {GenericWorker} the worker.
	     */
	    getContentWorker : function () {
	        var worker = new DataWorker(external.Promise.resolve(this.compressedContent))
	        .pipe(this.compression.uncompressWorker())
	        .pipe(new DataLengthProbe("data_length"));

	        var that = this;
	        worker.on("end", function () {
	            if(this.streamInfo['data_length'] !== that.uncompressedSize) {
	                throw new Error("Bug : uncompressed data size mismatch");
	            }
	        });
	        return worker;
	    },
	    /**
	     * Create a worker to get the compressed content.
	     * @return {GenericWorker} the worker.
	     */
	    getCompressedWorker : function () {
	        return new DataWorker(external.Promise.resolve(this.compressedContent))
	        .withStreamInfo("compressedSize", this.compressedSize)
	        .withStreamInfo("uncompressedSize", this.uncompressedSize)
	        .withStreamInfo("crc32", this.crc32)
	        .withStreamInfo("compression", this.compression)
	        ;
	    }
	};

	/**
	 * Chain the given worker with other workers to compress the content with the
	 * given compresion.
	 * @param {GenericWorker} uncompressedWorker the worker to pipe.
	 * @param {Object} compression the compression object.
	 * @param {Object} compressionOptions the options to use when compressing.
	 * @return {GenericWorker} the new worker compressing the content.
	 */
	CompressedObject.createWorkerFrom = function (uncompressedWorker, compression, compressionOptions) {
	    return uncompressedWorker
	    .pipe(new Crc32Probe())
	    .pipe(new DataLengthProbe("uncompressedSize"))
	    .pipe(compression.compressWorker(compressionOptions))
	    .pipe(new DataLengthProbe("compressedSize"))
	    .withStreamInfo("compression", compression);
	};

	module.exports = CompressedObject;

	},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(require,module,exports){

	var GenericWorker = require("./stream/GenericWorker");

	exports.STORE = {
	    magic: "\x00\x00",
	    compressWorker : function (compressionOptions) {
	        return new GenericWorker("STORE compression");
	    },
	    uncompressWorker : function () {
	        return new GenericWorker("STORE decompression");
	    }
	};
	exports.DEFLATE = require('./flate');

	},{"./flate":7,"./stream/GenericWorker":28}],4:[function(require,module,exports){

	var utils = require('./utils');

	/**
	 * The following functions come from pako, from pako/lib/zlib/crc32.js
	 * released under the MIT license, see pako https://github.com/nodeca/pako/
	 */

	// Use ordinary array, since untyped makes no boost here
	function makeTable() {
	    var c, table = [];

	    for(var n =0; n < 256; n++){
	        c = n;
	        for(var k =0; k < 8; k++){
	            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
	        }
	        table[n] = c;
	    }

	    return table;
	}

	// Create table on load. Just 255 signed longs. Not a problem.
	var crcTable = makeTable();


	function crc32(crc, buf, len, pos) {
	    var t = crcTable, end = pos + len;

	    crc = crc ^ (-1);

	    for (var i = pos; i < end; i++ ) {
	        crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
	    }

	    return (crc ^ (-1)); // >>> 0;
	}

	// That's all for the pako functions.

	/**
	 * Compute the crc32 of a string.
	 * This is almost the same as the function crc32, but for strings. Using the
	 * same function for the two use cases leads to horrible performances.
	 * @param {Number} crc the starting value of the crc.
	 * @param {String} str the string to use.
	 * @param {Number} len the length of the string.
	 * @param {Number} pos the starting position for the crc32 computation.
	 * @return {Number} the computed crc32.
	 */
	function crc32str(crc, str, len, pos) {
	    var t = crcTable, end = pos + len;

	    crc = crc ^ (-1);

	    for (var i = pos; i < end; i++ ) {
	        crc = (crc >>> 8) ^ t[(crc ^ str.charCodeAt(i)) & 0xFF];
	    }

	    return (crc ^ (-1)); // >>> 0;
	}

	module.exports = function crc32wrapper(input, crc) {
	    if (typeof input === "undefined" || !input.length) {
	        return 0;
	    }

	    var isArray = utils.getTypeOf(input) !== "string";

	    if(isArray) {
	        return crc32(crc|0, input, input.length, 0);
	    } else {
	        return crc32str(crc|0, input, input.length, 0);
	    }
	};

	},{"./utils":32}],5:[function(require,module,exports){
	exports.base64 = false;
	exports.binary = false;
	exports.dir = false;
	exports.createFolders = true;
	exports.date = null;
	exports.compression = null;
	exports.compressionOptions = null;
	exports.comment = null;
	exports.unixPermissions = null;
	exports.dosPermissions = null;

	},{}],6:[function(require,module,exports){

	// load the global object first:
	// - it should be better integrated in the system (unhandledRejection in node)
	// - the environment may have a custom Promise implementation (see zone.js)
	var ES6Promise = null;
	if (typeof Promise !== "undefined") {
	    ES6Promise = Promise;
	} else {
	    ES6Promise = require("lie");
	}

	/**
	 * Let the user use/change some implementations.
	 */
	module.exports = {
	    Promise: ES6Promise
	};

	},{"lie":58}],7:[function(require,module,exports){
	var USE_TYPEDARRAY = (typeof Uint8Array !== 'undefined') && (typeof Uint16Array !== 'undefined') && (typeof Uint32Array !== 'undefined');

	var pako = require("pako");
	var utils = require("./utils");
	var GenericWorker = require("./stream/GenericWorker");

	var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";

	exports.magic = "\x08\x00";

	/**
	 * Create a worker that uses pako to inflate/deflate.
	 * @constructor
	 * @param {String} action the name of the pako function to call : either "Deflate" or "Inflate".
	 * @param {Object} options the options to use when (de)compressing.
	 */
	function FlateWorker(action, options) {
	    GenericWorker.call(this, "FlateWorker/" + action);

	    this._pako = null;
	    this._pakoAction = action;
	    this._pakoOptions = options;
	    // the `meta` object from the last chunk received
	    // this allow this worker to pass around metadata
	    this.meta = {};
	}

	utils.inherits(FlateWorker, GenericWorker);

	/**
	 * @see GenericWorker.processChunk
	 */
	FlateWorker.prototype.processChunk = function (chunk) {
	    this.meta = chunk.meta;
	    if (this._pako === null) {
	        this._createPako();
	    }
	    this._pako.push(utils.transformTo(ARRAY_TYPE, chunk.data), false);
	};

	/**
	 * @see GenericWorker.flush
	 */
	FlateWorker.prototype.flush = function () {
	    GenericWorker.prototype.flush.call(this);
	    if (this._pako === null) {
	        this._createPako();
	    }
	    this._pako.push([], true);
	};
	/**
	 * @see GenericWorker.cleanUp
	 */
	FlateWorker.prototype.cleanUp = function () {
	    GenericWorker.prototype.cleanUp.call(this);
	    this._pako = null;
	};

	/**
	 * Create the _pako object.
	 * TODO: lazy-loading this object isn't the best solution but it's the
	 * quickest. The best solution is to lazy-load the worker list. See also the
	 * issue #446.
	 */
	FlateWorker.prototype._createPako = function () {
	    this._pako = new pako[this._pakoAction]({
	        raw: true,
	        level: this._pakoOptions.level || -1 // default compression
	    });
	    var self = this;
	    this._pako.onData = function(data) {
	        self.push({
	            data : data,
	            meta : self.meta
	        });
	    };
	};

	exports.compressWorker = function (compressionOptions) {
	    return new FlateWorker("Deflate", compressionOptions);
	};
	exports.uncompressWorker = function () {
	    return new FlateWorker("Inflate", {});
	};

	},{"./stream/GenericWorker":28,"./utils":32,"pako":59}],8:[function(require,module,exports){

	var utils = require('../utils');
	var GenericWorker = require('../stream/GenericWorker');
	var utf8 = require('../utf8');
	var crc32 = require('../crc32');
	var signature = require('../signature');

	/**
	 * Transform an integer into a string in hexadecimal.
	 * @private
	 * @param {number} dec the number to convert.
	 * @param {number} bytes the number of bytes to generate.
	 * @returns {string} the result.
	 */
	var decToHex = function(dec, bytes) {
	    var hex = "", i;
	    for (i = 0; i < bytes; i++) {
	        hex += String.fromCharCode(dec & 0xff);
	        dec = dec >>> 8;
	    }
	    return hex;
	};

	/**
	 * Generate the UNIX part of the external file attributes.
	 * @param {Object} unixPermissions the unix permissions or null.
	 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
	 * @return {Number} a 32 bit integer.
	 *
	 * adapted from http://unix.stackexchange.com/questions/14705/the-zip-formats-external-file-attribute :
	 *
	 * TTTTsstrwxrwxrwx0000000000ADVSHR
	 * ^^^^____________________________ file type, see zipinfo.c (UNX_*)
	 *     ^^^_________________________ setuid, setgid, sticky
	 *        ^^^^^^^^^________________ permissions
	 *                 ^^^^^^^^^^______ not used ?
	 *                           ^^^^^^ DOS attribute bits : Archive, Directory, Volume label, System file, Hidden, Read only
	 */
	var generateUnixExternalFileAttr = function (unixPermissions, isDir) {

	    var result = unixPermissions;
	    if (!unixPermissions) {
	        // I can't use octal values in strict mode, hence the hexa.
	        //  040775 => 0x41fd
	        // 0100664 => 0x81b4
	        result = isDir ? 0x41fd : 0x81b4;
	    }
	    return (result & 0xFFFF) << 16;
	};

	/**
	 * Generate the DOS part of the external file attributes.
	 * @param {Object} dosPermissions the dos permissions or null.
	 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
	 * @return {Number} a 32 bit integer.
	 *
	 * Bit 0     Read-Only
	 * Bit 1     Hidden
	 * Bit 2     System
	 * Bit 3     Volume Label
	 * Bit 4     Directory
	 * Bit 5     Archive
	 */
	var generateDosExternalFileAttr = function (dosPermissions, isDir) {

	    // the dir flag is already set for compatibility
	    return (dosPermissions || 0)  & 0x3F;
	};

	/**
	 * Generate the various parts used in the construction of the final zip file.
	 * @param {Object} streamInfo the hash with informations about the compressed file.
	 * @param {Boolean} streamedContent is the content streamed ?
	 * @param {Boolean} streamingEnded is the stream finished ?
	 * @param {number} offset the current offset from the start of the zip file.
	 * @param {String} platform let's pretend we are this platform (change platform dependents fields)
	 * @param {Function} encodeFileName the function to encode the file name / comment.
	 * @return {Object} the zip parts.
	 */
	var generateZipParts = function(streamInfo, streamedContent, streamingEnded, offset, platform, encodeFileName) {
	    var file = streamInfo['file'],
	    compression = streamInfo['compression'],
	    useCustomEncoding = encodeFileName !== utf8.utf8encode,
	    encodedFileName = utils.transformTo("string", encodeFileName(file.name)),
	    utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)),
	    comment = file.comment,
	    encodedComment = utils.transformTo("string", encodeFileName(comment)),
	    utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)),
	    useUTF8ForFileName = utfEncodedFileName.length !== file.name.length,
	    useUTF8ForComment = utfEncodedComment.length !== comment.length,
	    dosTime,
	    dosDate,
	    extraFields = "",
	    unicodePathExtraField = "",
	    unicodeCommentExtraField = "",
	    dir = file.dir,
	    date = file.date;


	    var dataInfo = {
	        crc32 : 0,
	        compressedSize : 0,
	        uncompressedSize : 0
	    };

	    // if the content is streamed, the sizes/crc32 are only available AFTER
	    // the end of the stream.
	    if (!streamedContent || streamingEnded) {
	        dataInfo.crc32 = streamInfo['crc32'];
	        dataInfo.compressedSize = streamInfo['compressedSize'];
	        dataInfo.uncompressedSize = streamInfo['uncompressedSize'];
	    }

	    var bitflag = 0;
	    if (streamedContent) {
	        // Bit 3: the sizes/crc32 are set to zero in the local header.
	        // The correct values are put in the data descriptor immediately
	        // following the compressed data.
	        bitflag |= 0x0008;
	    }
	    if (!useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment)) {
	        // Bit 11: Language encoding flag (EFS).
	        bitflag |= 0x0800;
	    }


	    var extFileAttr = 0;
	    var versionMadeBy = 0;
	    if (dir) {
	        // dos or unix, we set the dos dir flag
	        extFileAttr |= 0x00010;
	    }
	    if(platform === "UNIX") {
	        versionMadeBy = 0x031E; // UNIX, version 3.0
	        extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
	    } else { // DOS or other, fallback to DOS
	        versionMadeBy = 0x0014; // DOS, version 2.0
	        extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
	    }

	    // date
	    // @see http://www.delorie.com/djgpp/doc/rbinter/it/52/13.html
	    // @see http://www.delorie.com/djgpp/doc/rbinter/it/65/16.html
	    // @see http://www.delorie.com/djgpp/doc/rbinter/it/66/16.html

	    dosTime = date.getUTCHours();
	    dosTime = dosTime << 6;
	    dosTime = dosTime | date.getUTCMinutes();
	    dosTime = dosTime << 5;
	    dosTime = dosTime | date.getUTCSeconds() / 2;

	    dosDate = date.getUTCFullYear() - 1980;
	    dosDate = dosDate << 4;
	    dosDate = dosDate | (date.getUTCMonth() + 1);
	    dosDate = dosDate << 5;
	    dosDate = dosDate | date.getUTCDate();

	    if (useUTF8ForFileName) {
	        // set the unicode path extra field. unzip needs at least one extra
	        // field to correctly handle unicode path, so using the path is as good
	        // as any other information. This could improve the situation with
	        // other archive managers too.
	        // This field is usually used without the utf8 flag, with a non
	        // unicode path in the header (winrar, winzip). This helps (a bit)
	        // with the messy Windows' default compressed folders feature but
	        // breaks on p7zip which doesn't seek the unicode path extra field.
	        // So for now, UTF-8 everywhere !
	        unicodePathExtraField =
	            // Version
	            decToHex(1, 1) +
	            // NameCRC32
	            decToHex(crc32(encodedFileName), 4) +
	            // UnicodeName
	            utfEncodedFileName;

	        extraFields +=
	            // Info-ZIP Unicode Path Extra Field
	            "\x75\x70" +
	            // size
	            decToHex(unicodePathExtraField.length, 2) +
	            // content
	            unicodePathExtraField;
	    }

	    if(useUTF8ForComment) {

	        unicodeCommentExtraField =
	            // Version
	            decToHex(1, 1) +
	            // CommentCRC32
	            decToHex(crc32(encodedComment), 4) +
	            // UnicodeName
	            utfEncodedComment;

	        extraFields +=
	            // Info-ZIP Unicode Path Extra Field
	            "\x75\x63" +
	            // size
	            decToHex(unicodeCommentExtraField.length, 2) +
	            // content
	            unicodeCommentExtraField;
	    }

	    var header = "";

	    // version needed to extract
	    header += "\x0A\x00";
	    // general purpose bit flag
	    header += decToHex(bitflag, 2);
	    // compression method
	    header += compression.magic;
	    // last mod file time
	    header += decToHex(dosTime, 2);
	    // last mod file date
	    header += decToHex(dosDate, 2);
	    // crc-32
	    header += decToHex(dataInfo.crc32, 4);
	    // compressed size
	    header += decToHex(dataInfo.compressedSize, 4);
	    // uncompressed size
	    header += decToHex(dataInfo.uncompressedSize, 4);
	    // file name length
	    header += decToHex(encodedFileName.length, 2);
	    // extra field length
	    header += decToHex(extraFields.length, 2);


	    var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;

	    var dirRecord = signature.CENTRAL_FILE_HEADER +
	        // version made by (00: DOS)
	        decToHex(versionMadeBy, 2) +
	        // file header (common to file and central directory)
	        header +
	        // file comment length
	        decToHex(encodedComment.length, 2) +
	        // disk number start
	        "\x00\x00" +
	        // internal file attributes TODO
	        "\x00\x00" +
	        // external file attributes
	        decToHex(extFileAttr, 4) +
	        // relative offset of local header
	        decToHex(offset, 4) +
	        // file name
	        encodedFileName +
	        // extra field
	        extraFields +
	        // file comment
	        encodedComment;

	    return {
	        fileRecord: fileRecord,
	        dirRecord: dirRecord
	    };
	};

	/**
	 * Generate the EOCD record.
	 * @param {Number} entriesCount the number of entries in the zip file.
	 * @param {Number} centralDirLength the length (in bytes) of the central dir.
	 * @param {Number} localDirLength the length (in bytes) of the local dir.
	 * @param {String} comment the zip file comment as a binary string.
	 * @param {Function} encodeFileName the function to encode the comment.
	 * @return {String} the EOCD record.
	 */
	var generateCentralDirectoryEnd = function (entriesCount, centralDirLength, localDirLength, comment, encodeFileName) {
	    var dirEnd = "";
	    var encodedComment = utils.transformTo("string", encodeFileName(comment));

	    // end of central dir signature
	    dirEnd = signature.CENTRAL_DIRECTORY_END +
	        // number of this disk
	        "\x00\x00" +
	        // number of the disk with the start of the central directory
	        "\x00\x00" +
	        // total number of entries in the central directory on this disk
	        decToHex(entriesCount, 2) +
	        // total number of entries in the central directory
	        decToHex(entriesCount, 2) +
	        // size of the central directory   4 bytes
	        decToHex(centralDirLength, 4) +
	        // offset of start of central directory with respect to the starting disk number
	        decToHex(localDirLength, 4) +
	        // .ZIP file comment length
	        decToHex(encodedComment.length, 2) +
	        // .ZIP file comment
	        encodedComment;

	    return dirEnd;
	};

	/**
	 * Generate data descriptors for a file entry.
	 * @param {Object} streamInfo the hash generated by a worker, containing informations
	 * on the file entry.
	 * @return {String} the data descriptors.
	 */
	var generateDataDescriptors = function (streamInfo) {
	    var descriptor = "";
	    descriptor = signature.DATA_DESCRIPTOR +
	        // crc-32                          4 bytes
	        decToHex(streamInfo['crc32'], 4) +
	        // compressed size                 4 bytes
	        decToHex(streamInfo['compressedSize'], 4) +
	        // uncompressed size               4 bytes
	        decToHex(streamInfo['uncompressedSize'], 4);

	    return descriptor;
	};


	/**
	 * A worker to concatenate other workers to create a zip file.
	 * @param {Boolean} streamFiles `true` to stream the content of the files,
	 * `false` to accumulate it.
	 * @param {String} comment the comment to use.
	 * @param {String} platform the platform to use, "UNIX" or "DOS".
	 * @param {Function} encodeFileName the function to encode file names and comments.
	 */
	function ZipFileWorker(streamFiles, comment, platform, encodeFileName) {
	    GenericWorker.call(this, "ZipFileWorker");
	    // The number of bytes written so far. This doesn't count accumulated chunks.
	    this.bytesWritten = 0;
	    // The comment of the zip file
	    this.zipComment = comment;
	    // The platform "generating" the zip file.
	    this.zipPlatform = platform;
	    // the function to encode file names and comments.
	    this.encodeFileName = encodeFileName;
	    // Should we stream the content of the files ?
	    this.streamFiles = streamFiles;
	    // If `streamFiles` is false, we will need to accumulate the content of the
	    // files to calculate sizes / crc32 (and write them *before* the content).
	    // This boolean indicates if we are accumulating chunks (it will change a lot
	    // during the lifetime of this worker).
	    this.accumulate = false;
	    // The buffer receiving chunks when accumulating content.
	    this.contentBuffer = [];
	    // The list of generated directory records.
	    this.dirRecords = [];
	    // The offset (in bytes) from the beginning of the zip file for the current source.
	    this.currentSourceOffset = 0;
	    // The total number of entries in this zip file.
	    this.entriesCount = 0;
	    // the name of the file currently being added, null when handling the end of the zip file.
	    // Used for the emited metadata.
	    this.currentFile = null;



	    this._sources = [];
	}
	utils.inherits(ZipFileWorker, GenericWorker);

	/**
	 * @see GenericWorker.push
	 */
	ZipFileWorker.prototype.push = function (chunk) {

	    var currentFilePercent = chunk.meta.percent || 0;
	    var entriesCount = this.entriesCount;
	    var remainingFiles = this._sources.length;

	    if(this.accumulate) {
	        this.contentBuffer.push(chunk);
	    } else {
	        this.bytesWritten += chunk.data.length;

	        GenericWorker.prototype.push.call(this, {
	            data : chunk.data,
	            meta : {
	                currentFile : this.currentFile,
	                percent : entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100
	            }
	        });
	    }
	};

	/**
	 * The worker started a new source (an other worker).
	 * @param {Object} streamInfo the streamInfo object from the new source.
	 */
	ZipFileWorker.prototype.openedSource = function (streamInfo) {
	    this.currentSourceOffset = this.bytesWritten;
	    this.currentFile = streamInfo['file'].name;

	    var streamedContent = this.streamFiles && !streamInfo['file'].dir;

	    // don't stream folders (because they don't have any content)
	    if(streamedContent) {
	        var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
	        this.push({
	            data : record.fileRecord,
	            meta : {percent:0}
	        });
	    } else {
	        // we need to wait for the whole file before pushing anything
	        this.accumulate = true;
	    }
	};

	/**
	 * The worker finished a source (an other worker).
	 * @param {Object} streamInfo the streamInfo object from the finished source.
	 */
	ZipFileWorker.prototype.closedSource = function (streamInfo) {
	    this.accumulate = false;
	    var streamedContent = this.streamFiles && !streamInfo['file'].dir;
	    var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);

	    this.dirRecords.push(record.dirRecord);
	    if(streamedContent) {
	        // after the streamed file, we put data descriptors
	        this.push({
	            data : generateDataDescriptors(streamInfo),
	            meta : {percent:100}
	        });
	    } else {
	        // the content wasn't streamed, we need to push everything now
	        // first the file record, then the content
	        this.push({
	            data : record.fileRecord,
	            meta : {percent:0}
	        });
	        while(this.contentBuffer.length) {
	            this.push(this.contentBuffer.shift());
	        }
	    }
	    this.currentFile = null;
	};

	/**
	 * @see GenericWorker.flush
	 */
	ZipFileWorker.prototype.flush = function () {

	    var localDirLength = this.bytesWritten;
	    for(var i = 0; i < this.dirRecords.length; i++) {
	        this.push({
	            data : this.dirRecords[i],
	            meta : {percent:100}
	        });
	    }
	    var centralDirLength = this.bytesWritten - localDirLength;

	    var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);

	    this.push({
	        data : dirEnd,
	        meta : {percent:100}
	    });
	};

	/**
	 * Prepare the next source to be read.
	 */
	ZipFileWorker.prototype.prepareNextSource = function () {
	    this.previous = this._sources.shift();
	    this.openedSource(this.previous.streamInfo);
	    if (this.isPaused) {
	        this.previous.pause();
	    } else {
	        this.previous.resume();
	    }
	};

	/**
	 * @see GenericWorker.registerPrevious
	 */
	ZipFileWorker.prototype.registerPrevious = function (previous) {
	    this._sources.push(previous);
	    var self = this;

	    previous.on('data', function (chunk) {
	        self.processChunk(chunk);
	    });
	    previous.on('end', function () {
	        self.closedSource(self.previous.streamInfo);
	        if(self._sources.length) {
	            self.prepareNextSource();
	        } else {
	            self.end();
	        }
	    });
	    previous.on('error', function (e) {
	        self.error(e);
	    });
	    return this;
	};

	/**
	 * @see GenericWorker.resume
	 */
	ZipFileWorker.prototype.resume = function () {
	    if(!GenericWorker.prototype.resume.call(this)) {
	        return false;
	    }

	    if (!this.previous && this._sources.length) {
	        this.prepareNextSource();
	        return true;
	    }
	    if (!this.previous && !this._sources.length && !this.generatedError) {
	        this.end();
	        return true;
	    }
	};

	/**
	 * @see GenericWorker.error
	 */
	ZipFileWorker.prototype.error = function (e) {
	    var sources = this._sources;
	    if(!GenericWorker.prototype.error.call(this, e)) {
	        return false;
	    }
	    for(var i = 0; i < sources.length; i++) {
	        try {
	            sources[i].error(e);
	        } catch(e) {
	            // the `error` exploded, nothing to do
	        }
	    }
	    return true;
	};

	/**
	 * @see GenericWorker.lock
	 */
	ZipFileWorker.prototype.lock = function () {
	    GenericWorker.prototype.lock.call(this);
	    var sources = this._sources;
	    for(var i = 0; i < sources.length; i++) {
	        sources[i].lock();
	    }
	};

	module.exports = ZipFileWorker;

	},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(require,module,exports){

	var compressions = require('../compressions');
	var ZipFileWorker = require('./ZipFileWorker');

	/**
	 * Find the compression to use.
	 * @param {String} fileCompression the compression defined at the file level, if any.
	 * @param {String} zipCompression the compression defined at the load() level.
	 * @return {Object} the compression object to use.
	 */
	var getCompression = function (fileCompression, zipCompression) {

	    var compressionName = fileCompression || zipCompression;
	    var compression = compressions[compressionName];
	    if (!compression) {
	        throw new Error(compressionName + " is not a valid compression method !");
	    }
	    return compression;
	};

	/**
	 * Create a worker to generate a zip file.
	 * @param {JSZip} zip the JSZip instance at the right root level.
	 * @param {Object} options to generate the zip file.
	 * @param {String} comment the comment to use.
	 */
	exports.generateWorker = function (zip, options, comment) {

	    var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);
	    var entriesCount = 0;
	    try {

	        zip.forEach(function (relativePath, file) {
	            entriesCount++;
	            var compression = getCompression(file.options.compression, options.compression);
	            var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
	            var dir = file.dir, date = file.date;

	            file._compressWorker(compression, compressionOptions)
	            .withStreamInfo("file", {
	                name : relativePath,
	                dir : dir,
	                date : date,
	                comment : file.comment || "",
	                unixPermissions : file.unixPermissions,
	                dosPermissions : file.dosPermissions
	            })
	            .pipe(zipFileWorker);
	        });
	        zipFileWorker.entriesCount = entriesCount;
	    } catch (e) {
	        zipFileWorker.error(e);
	    }

	    return zipFileWorker;
	};

	},{"../compressions":3,"./ZipFileWorker":8}],10:[function(require,module,exports){

	/**
	 * Representation a of zip file in js
	 * @constructor
	 */
	function JSZip() {
	    // if this constructor is used without `new`, it adds `new` before itself:
	    if(!(this instanceof JSZip)) {
	        return new JSZip();
	    }

	    if(arguments.length) {
	        throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
	    }

	    // object containing the files :
	    // {
	    //   "folder/" : {...},
	    //   "folder/data.txt" : {...}
	    // }
	    this.files = {};

	    this.comment = null;

	    // Where we are in the hierarchy
	    this.root = "";
	    this.clone = function() {
	        var newObj = new JSZip();
	        for (var i in this) {
	            if (typeof this[i] !== "function") {
	                newObj[i] = this[i];
	            }
	        }
	        return newObj;
	    };
	}
	JSZip.prototype = require('./object');
	JSZip.prototype.loadAsync = require('./load');
	JSZip.support = require('./support');
	JSZip.defaults = require('./defaults');

	// TODO find a better way to handle this version,
	// a require('package.json').version doesn't work with webpack, see #327
	JSZip.version = "3.1.5";

	JSZip.loadAsync = function (content, options) {
	    return new JSZip().loadAsync(content, options);
	};

	JSZip.external = require("./external");
	module.exports = JSZip;

	},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(require,module,exports){
	var utils = require('./utils');
	var external = require("./external");
	var utf8 = require('./utf8');
	var utils = require('./utils');
	var ZipEntries = require('./zipEntries');
	var Crc32Probe = require('./stream/Crc32Probe');
	var nodejsUtils = require("./nodejsUtils");

	/**
	 * Check the CRC32 of an entry.
	 * @param {ZipEntry} zipEntry the zip entry to check.
	 * @return {Promise} the result.
	 */
	function checkEntryCRC32(zipEntry) {
	    return new external.Promise(function (resolve, reject) {
	        var worker = zipEntry.decompressed.getContentWorker().pipe(new Crc32Probe());
	        worker.on("error", function (e) {
	            reject(e);
	        })
	        .on("end", function () {
	            if (worker.streamInfo.crc32 !== zipEntry.decompressed.crc32) {
	                reject(new Error("Corrupted zip : CRC32 mismatch"));
	            } else {
	                resolve();
	            }
	        })
	        .resume();
	    });
	}

	module.exports = function(data, options) {
	    var zip = this;
	    options = utils.extend(options || {}, {
	        base64: false,
	        checkCRC32: false,
	        optimizedBinaryString: false,
	        createFolders: false,
	        decodeFileName: utf8.utf8decode
	    });

	    if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
	        return external.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));
	    }

	    return utils.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64)
	    .then(function(data) {
	        var zipEntries = new ZipEntries(options);
	        zipEntries.load(data);
	        return zipEntries;
	    }).then(function checkCRC32(zipEntries) {
	        var promises = [external.Promise.resolve(zipEntries)];
	        var files = zipEntries.files;
	        if (options.checkCRC32) {
	            for (var i = 0; i < files.length; i++) {
	                promises.push(checkEntryCRC32(files[i]));
	            }
	        }
	        return external.Promise.all(promises);
	    }).then(function addFiles(results) {
	        var zipEntries = results.shift();
	        var files = zipEntries.files;
	        for (var i = 0; i < files.length; i++) {
	            var input = files[i];
	            zip.file(input.fileNameStr, input.decompressed, {
	                binary: true,
	                optimizedBinaryString: true,
	                date: input.date,
	                dir: input.dir,
	                comment : input.fileCommentStr.length ? input.fileCommentStr : null,
	                unixPermissions : input.unixPermissions,
	                dosPermissions : input.dosPermissions,
	                createFolders: options.createFolders
	            });
	        }
	        if (zipEntries.zipComment.length) {
	            zip.comment = zipEntries.zipComment;
	        }

	        return zip;
	    });
	};

	},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(require,module,exports){

	var utils = require('../utils');
	var GenericWorker = require('../stream/GenericWorker');

	/**
	 * A worker that use a nodejs stream as source.
	 * @constructor
	 * @param {String} filename the name of the file entry for this stream.
	 * @param {Readable} stream the nodejs stream.
	 */
	function NodejsStreamInputAdapter(filename, stream) {
	    GenericWorker.call(this, "Nodejs stream input adapter for " + filename);
	    this._upstreamEnded = false;
	    this._bindStream(stream);
	}

	utils.inherits(NodejsStreamInputAdapter, GenericWorker);

	/**
	 * Prepare the stream and bind the callbacks on it.
	 * Do this ASAP on node 0.10 ! A lazy binding doesn't always work.
	 * @param {Stream} stream the nodejs stream to use.
	 */
	NodejsStreamInputAdapter.prototype._bindStream = function (stream) {
	    var self = this;
	    this._stream = stream;
	    stream.pause();
	    stream
	    .on("data", function (chunk) {
	        self.push({
	            data: chunk,
	            meta : {
	                percent : 0
	            }
	        });
	    })
	    .on("error", function (e) {
	        if(self.isPaused) {
	            this.generatedError = e;
	        } else {
	            self.error(e);
	        }
	    })
	    .on("end", function () {
	        if(self.isPaused) {
	            self._upstreamEnded = true;
	        } else {
	            self.end();
	        }
	    });
	};
	NodejsStreamInputAdapter.prototype.pause = function () {
	    if(!GenericWorker.prototype.pause.call(this)) {
	        return false;
	    }
	    this._stream.pause();
	    return true;
	};
	NodejsStreamInputAdapter.prototype.resume = function () {
	    if(!GenericWorker.prototype.resume.call(this)) {
	        return false;
	    }

	    if(this._upstreamEnded) {
	        this.end();
	    } else {
	        this._stream.resume();
	    }

	    return true;
	};

	module.exports = NodejsStreamInputAdapter;

	},{"../stream/GenericWorker":28,"../utils":32}],13:[function(require,module,exports){

	var Readable = require('readable-stream').Readable;

	var utils = require('../utils');
	utils.inherits(NodejsStreamOutputAdapter, Readable);

	/**
	* A nodejs stream using a worker as source.
	* @see the SourceWrapper in http://nodejs.org/api/stream.html
	* @constructor
	* @param {StreamHelper} helper the helper wrapping the worker
	* @param {Object} options the nodejs stream options
	* @param {Function} updateCb the update callback.
	*/
	function NodejsStreamOutputAdapter(helper, options, updateCb) {
	    Readable.call(this, options);
	    this._helper = helper;

	    var self = this;
	    helper.on("data", function (data, meta) {
	        if (!self.push(data)) {
	            self._helper.pause();
	        }
	        if(updateCb) {
	            updateCb(meta);
	        }
	    })
	    .on("error", function(e) {
	        self.emit('error', e);
	    })
	    .on("end", function () {
	        self.push(null);
	    });
	}


	NodejsStreamOutputAdapter.prototype._read = function() {
	    this._helper.resume();
	};

	module.exports = NodejsStreamOutputAdapter;

	},{"../utils":32,"readable-stream":16}],14:[function(require,module,exports){

	module.exports = {
	    /**
	     * True if this is running in Nodejs, will be undefined in a browser.
	     * In a browser, browserify won't include this file and the whole module
	     * will be resolved an empty object.
	     */
	    isNode : typeof Buffer !== "undefined",
	    /**
	     * Create a new nodejs Buffer from an existing content.
	     * @param {Object} data the data to pass to the constructor.
	     * @param {String} encoding the encoding to use.
	     * @return {Buffer} a new Buffer.
	     */
	    newBufferFrom: function(data, encoding) {
	        // XXX We can't use `Buffer.from` which comes from `Uint8Array.from`
	        // in nodejs v4 (< v.4.5). It's not the expected implementation (and
	        // has a different signature).
	        // see https://github.com/nodejs/node/issues/8053
	        // A condition on nodejs' version won't solve the issue as we don't
	        // control the Buffer polyfills that may or may not be used.
	        return new Buffer(data, encoding);
	    },
	    /**
	     * Create a new nodejs Buffer with the specified size.
	     * @param {Integer} size the size of the buffer.
	     * @return {Buffer} a new Buffer.
	     */
	    allocBuffer: function (size) {
	        if (Buffer.alloc) {
	            return Buffer.alloc(size);
	        } else {
	            return new Buffer(size);
	        }
	    },
	    /**
	     * Find out if an object is a Buffer.
	     * @param {Object} b the object to test.
	     * @return {Boolean} true if the object is a Buffer, false otherwise.
	     */
	    isBuffer : function(b){
	        return Buffer.isBuffer(b);
	    },

	    isStream : function (obj) {
	        return obj &&
	            typeof obj.on === "function" &&
	            typeof obj.pause === "function" &&
	            typeof obj.resume === "function";
	    }
	};

	},{}],15:[function(require,module,exports){
	var utf8 = require('./utf8');
	var utils = require('./utils');
	var GenericWorker = require('./stream/GenericWorker');
	var StreamHelper = require('./stream/StreamHelper');
	var defaults = require('./defaults');
	var CompressedObject = require('./compressedObject');
	var ZipObject = require('./zipObject');
	var generate = require("./generate");
	var nodejsUtils = require("./nodejsUtils");
	var NodejsStreamInputAdapter = require("./nodejs/NodejsStreamInputAdapter");


	/**
	 * Add a file in the current folder.
	 * @private
	 * @param {string} name the name of the file
	 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data of the file
	 * @param {Object} originalOptions the options of the file
	 * @return {Object} the new file.
	 */
	var fileAdd = function(name, data, originalOptions) {
	    // be sure sub folders exist
	    var dataType = utils.getTypeOf(data),
	        parent;


	    /*
	     * Correct options.
	     */

	    var o = utils.extend(originalOptions || {}, defaults);
	    o.date = o.date || new Date();
	    if (o.compression !== null) {
	        o.compression = o.compression.toUpperCase();
	    }

	    if (typeof o.unixPermissions === "string") {
	        o.unixPermissions = parseInt(o.unixPermissions, 8);
	    }

	    // UNX_IFDIR  0040000 see zipinfo.c
	    if (o.unixPermissions && (o.unixPermissions & 0x4000)) {
	        o.dir = true;
	    }
	    // Bit 4    Directory
	    if (o.dosPermissions && (o.dosPermissions & 0x0010)) {
	        o.dir = true;
	    }

	    if (o.dir) {
	        name = forceTrailingSlash(name);
	    }
	    if (o.createFolders && (parent = parentFolder(name))) {
	        folderAdd.call(this, parent, true);
	    }

	    var isUnicodeString = dataType === "string" && o.binary === false && o.base64 === false;
	    if (!originalOptions || typeof originalOptions.binary === "undefined") {
	        o.binary = !isUnicodeString;
	    }


	    var isCompressedEmpty = (data instanceof CompressedObject) && data.uncompressedSize === 0;

	    if (isCompressedEmpty || o.dir || !data || data.length === 0) {
	        o.base64 = false;
	        o.binary = true;
	        data = "";
	        o.compression = "STORE";
	        dataType = "string";
	    }

	    /*
	     * Convert content to fit.
	     */

	    var zipObjectContent = null;
	    if (data instanceof CompressedObject || data instanceof GenericWorker) {
	        zipObjectContent = data;
	    } else if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
	        zipObjectContent = new NodejsStreamInputAdapter(name, data);
	    } else {
	        zipObjectContent = utils.prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);
	    }

	    var object = new ZipObject(name, zipObjectContent, o);
	    this.files[name] = object;
	    /*
	    TODO: we can't throw an exception because we have async promises
	    (we can have a promise of a Date() for example) but returning a
	    promise is useless because file(name, data) returns the JSZip
	    object for chaining. Should we break that to allow the user
	    to catch the error ?

	    return external.Promise.resolve(zipObjectContent)
	    .then(function () {
	        return object;
	    });
	    */
	};

	/**
	 * Find the parent folder of the path.
	 * @private
	 * @param {string} path the path to use
	 * @return {string} the parent folder, or ""
	 */
	var parentFolder = function (path) {
	    if (path.slice(-1) === '/') {
	        path = path.substring(0, path.length - 1);
	    }
	    var lastSlash = path.lastIndexOf('/');
	    return (lastSlash > 0) ? path.substring(0, lastSlash) : "";
	};

	/**
	 * Returns the path with a slash at the end.
	 * @private
	 * @param {String} path the path to check.
	 * @return {String} the path with a trailing slash.
	 */
	var forceTrailingSlash = function(path) {
	    // Check the name ends with a /
	    if (path.slice(-1) !== "/") {
	        path += "/"; // IE doesn't like substr(-1)
	    }
	    return path;
	};

	/**
	 * Add a (sub) folder in the current folder.
	 * @private
	 * @param {string} name the folder's name
	 * @param {boolean=} [createFolders] If true, automatically create sub
	 *  folders. Defaults to false.
	 * @return {Object} the new folder.
	 */
	var folderAdd = function(name, createFolders) {
	    createFolders = (typeof createFolders !== 'undefined') ? createFolders : defaults.createFolders;

	    name = forceTrailingSlash(name);

	    // Does this folder already exist?
	    if (!this.files[name]) {
	        fileAdd.call(this, name, null, {
	            dir: true,
	            createFolders: createFolders
	        });
	    }
	    return this.files[name];
	};

	/**
	* Cross-window, cross-Node-context regular expression detection
	* @param  {Object}  object Anything
	* @return {Boolean}        true if the object is a regular expression,
	* false otherwise
	*/
	function isRegExp(object) {
	    return Object.prototype.toString.call(object) === "[object RegExp]";
	}

	// return the actual prototype of JSZip
	var out = {
	    /**
	     * @see loadAsync
	     */
	    load: function() {
	        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
	    },


	    /**
	     * Call a callback function for each entry at this folder level.
	     * @param {Function} cb the callback function:
	     * function (relativePath, file) {...}
	     * It takes 2 arguments : the relative path and the file.
	     */
	    forEach: function(cb) {
	        var filename, relativePath, file;
	        for (filename in this.files) {
	            if (!this.files.hasOwnProperty(filename)) {
	                continue;
	            }
	            file = this.files[filename];
	            relativePath = filename.slice(this.root.length, filename.length);
	            if (relativePath && filename.slice(0, this.root.length) === this.root) { // the file is in the current root
	                cb(relativePath, file); // TODO reverse the parameters ? need to be clean AND consistent with the filter search fn...
	            }
	        }
	    },

	    /**
	     * Filter nested files/folders with the specified function.
	     * @param {Function} search the predicate to use :
	     * function (relativePath, file) {...}
	     * It takes 2 arguments : the relative path and the file.
	     * @return {Array} An array of matching elements.
	     */
	    filter: function(search) {
	        var result = [];
	        this.forEach(function (relativePath, entry) {
	            if (search(relativePath, entry)) { // the file matches the function
	                result.push(entry);
	            }

	        });
	        return result;
	    },

	    /**
	     * Add a file to the zip file, or search a file.
	     * @param   {string|RegExp} name The name of the file to add (if data is defined),
	     * the name of the file to find (if no data) or a regex to match files.
	     * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
	     * @param   {Object} o     File options
	     * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
	     * a file (when searching by string) or an array of files (when searching by regex).
	     */
	    file: function(name, data, o) {
	        if (arguments.length === 1) {
	            if (isRegExp(name)) {
	                var regexp = name;
	                return this.filter(function(relativePath, file) {
	                    return !file.dir && regexp.test(relativePath);
	                });
	            }
	            else { // text
	                var obj = this.files[this.root + name];
	                if (obj && !obj.dir) {
	                    return obj;
	                } else {
	                    return null;
	                }
	            }
	        }
	        else { // more than one argument : we have data !
	            name = this.root + name;
	            fileAdd.call(this, name, data, o);
	        }
	        return this;
	    },

	    /**
	     * Add a directory to the zip file, or search.
	     * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
	     * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
	     */
	    folder: function(arg) {
	        if (!arg) {
	            return this;
	        }

	        if (isRegExp(arg)) {
	            return this.filter(function(relativePath, file) {
	                return file.dir && arg.test(relativePath);
	            });
	        }

	        // else, name is a new folder
	        var name = this.root + arg;
	        var newFolder = folderAdd.call(this, name);

	        // Allow chaining by returning a new object with this folder as the root
	        var ret = this.clone();
	        ret.root = newFolder.name;
	        return ret;
	    },

	    /**
	     * Delete a file, or a directory and all sub-files, from the zip
	     * @param {string} name the name of the file to delete
	     * @return {JSZip} this JSZip object
	     */
	    remove: function(name) {
	        name = this.root + name;
	        var file = this.files[name];
	        if (!file) {
	            // Look for any folders
	            if (name.slice(-1) !== "/") {
	                name += "/";
	            }
	            file = this.files[name];
	        }

	        if (file && !file.dir) {
	            // file
	            delete this.files[name];
	        } else {
	            // maybe a folder, delete recursively
	            var kids = this.filter(function(relativePath, file) {
	                return file.name.slice(0, name.length) === name;
	            });
	            for (var i = 0; i < kids.length; i++) {
	                delete this.files[kids[i].name];
	            }
	        }

	        return this;
	    },

	    /**
	     * Generate the complete zip file
	     * @param {Object} options the options to generate the zip file :
	     * - compression, "STORE" by default.
	     * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
	     * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the zip file
	     */
	    generate: function(options) {
	        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
	    },

	    /**
	     * Generate the complete zip file as an internal stream.
	     * @param {Object} options the options to generate the zip file :
	     * - compression, "STORE" by default.
	     * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
	     * @return {StreamHelper} the streamed zip file.
	     */
	    generateInternalStream: function(options) {
	      var worker, opts = {};
	      try {
	          opts = utils.extend(options || {}, {
	              streamFiles: false,
	              compression: "STORE",
	              compressionOptions : null,
	              type: "",
	              platform: "DOS",
	              comment: null,
	              mimeType: 'application/zip',
	              encodeFileName: utf8.utf8encode
	          });

	          opts.type = opts.type.toLowerCase();
	          opts.compression = opts.compression.toUpperCase();

	          // "binarystring" is prefered but the internals use "string".
	          if(opts.type === "binarystring") {
	            opts.type = "string";
	          }

	          if (!opts.type) {
	            throw new Error("No output type specified.");
	          }

	          utils.checkSupport(opts.type);

	          // accept nodejs `process.platform`
	          if(
	              opts.platform === 'darwin' ||
	              opts.platform === 'freebsd' ||
	              opts.platform === 'linux' ||
	              opts.platform === 'sunos'
	          ) {
	              opts.platform = "UNIX";
	          }
	          if (opts.platform === 'win32') {
	              opts.platform = "DOS";
	          }

	          var comment = opts.comment || this.comment || "";
	          worker = generate.generateWorker(this, opts, comment);
	      } catch (e) {
	        worker = new GenericWorker("error");
	        worker.error(e);
	      }
	      return new StreamHelper(worker, opts.type || "string", opts.mimeType);
	    },
	    /**
	     * Generate the complete zip file asynchronously.
	     * @see generateInternalStream
	     */
	    generateAsync: function(options, onUpdate) {
	        return this.generateInternalStream(options).accumulate(onUpdate);
	    },
	    /**
	     * Generate the complete zip file asynchronously.
	     * @see generateInternalStream
	     */
	    generateNodeStream: function(options, onUpdate) {
	        options = options || {};
	        if (!options.type) {
	            options.type = "nodebuffer";
	        }
	        return this.generateInternalStream(options).toNodejsStream(onUpdate);
	    }
	};
	module.exports = out;

	},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(require,module,exports){
	/*
	 * This file is used by module bundlers (browserify/webpack/etc) when
	 * including a stream implementation. We use "readable-stream" to get a
	 * consistent behavior between nodejs versions but bundlers often have a shim
	 * for "stream". Using this shim greatly improve the compatibility and greatly
	 * reduce the final size of the bundle (only one stream implementation, not
	 * two).
	 */
	module.exports = require("stream");

	},{"stream":undefined}],17:[function(require,module,exports){
	var DataReader = require('./DataReader');
	var utils = require('../utils');

	function ArrayReader(data) {
	    DataReader.call(this, data);
		for(var i = 0; i < this.data.length; i++) {
			data[i] = data[i] & 0xFF;
		}
	}
	utils.inherits(ArrayReader, DataReader);
	/**
	 * @see DataReader.byteAt
	 */
	ArrayReader.prototype.byteAt = function(i) {
	    return this.data[this.zero + i];
	};
	/**
	 * @see DataReader.lastIndexOfSignature
	 */
	ArrayReader.prototype.lastIndexOfSignature = function(sig) {
	    var sig0 = sig.charCodeAt(0),
	        sig1 = sig.charCodeAt(1),
	        sig2 = sig.charCodeAt(2),
	        sig3 = sig.charCodeAt(3);
	    for (var i = this.length - 4; i >= 0; --i) {
	        if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
	            return i - this.zero;
	        }
	    }

	    return -1;
	};
	/**
	 * @see DataReader.readAndCheckSignature
	 */
	ArrayReader.prototype.readAndCheckSignature = function (sig) {
	    var sig0 = sig.charCodeAt(0),
	        sig1 = sig.charCodeAt(1),
	        sig2 = sig.charCodeAt(2),
	        sig3 = sig.charCodeAt(3),
	        data = this.readData(4);
	    return sig0 === data[0] && sig1 === data[1] && sig2 === data[2] && sig3 === data[3];
	};
	/**
	 * @see DataReader.readData
	 */
	ArrayReader.prototype.readData = function(size) {
	    this.checkOffset(size);
	    if(size === 0) {
	        return [];
	    }
	    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
	    this.index += size;
	    return result;
	};
	module.exports = ArrayReader;

	},{"../utils":32,"./DataReader":18}],18:[function(require,module,exports){
	var utils = require('../utils');

	function DataReader(data) {
	    this.data = data; // type : see implementation
	    this.length = data.length;
	    this.index = 0;
	    this.zero = 0;
	}
	DataReader.prototype = {
	    /**
	     * Check that the offset will not go too far.
	     * @param {string} offset the additional offset to check.
	     * @throws {Error} an Error if the offset is out of bounds.
	     */
	    checkOffset: function(offset) {
	        this.checkIndex(this.index + offset);
	    },
	    /**
	     * Check that the specified index will not be too far.
	     * @param {string} newIndex the index to check.
	     * @throws {Error} an Error if the index is out of bounds.
	     */
	    checkIndex: function(newIndex) {
	        if (this.length < this.zero + newIndex || newIndex < 0) {
	            throw new Error("End of data reached (data length = " + this.length + ", asked index = " + (newIndex) + "). Corrupted zip ?");
	        }
	    },
	    /**
	     * Change the index.
	     * @param {number} newIndex The new index.
	     * @throws {Error} if the new index is out of the data.
	     */
	    setIndex: function(newIndex) {
	        this.checkIndex(newIndex);
	        this.index = newIndex;
	    },
	    /**
	     * Skip the next n bytes.
	     * @param {number} n the number of bytes to skip.
	     * @throws {Error} if the new index is out of the data.
	     */
	    skip: function(n) {
	        this.setIndex(this.index + n);
	    },
	    /**
	     * Get the byte at the specified index.
	     * @param {number} i the index to use.
	     * @return {number} a byte.
	     */
	    byteAt: function(i) {
	        // see implementations
	    },
	    /**
	     * Get the next number with a given byte size.
	     * @param {number} size the number of bytes to read.
	     * @return {number} the corresponding number.
	     */
	    readInt: function(size) {
	        var result = 0,
	            i;
	        this.checkOffset(size);
	        for (i = this.index + size - 1; i >= this.index; i--) {
	            result = (result << 8) + this.byteAt(i);
	        }
	        this.index += size;
	        return result;
	    },
	    /**
	     * Get the next string with a given byte size.
	     * @param {number} size the number of bytes to read.
	     * @return {string} the corresponding string.
	     */
	    readString: function(size) {
	        return utils.transformTo("string", this.readData(size));
	    },
	    /**
	     * Get raw data without conversion, <size> bytes.
	     * @param {number} size the number of bytes to read.
	     * @return {Object} the raw data, implementation specific.
	     */
	    readData: function(size) {
	        // see implementations
	    },
	    /**
	     * Find the last occurence of a zip signature (4 bytes).
	     * @param {string} sig the signature to find.
	     * @return {number} the index of the last occurence, -1 if not found.
	     */
	    lastIndexOfSignature: function(sig) {
	        // see implementations
	    },
	    /**
	     * Read the signature (4 bytes) at the current position and compare it with sig.
	     * @param {string} sig the expected signature
	     * @return {boolean} true if the signature matches, false otherwise.
	     */
	    readAndCheckSignature: function(sig) {
	        // see implementations
	    },
	    /**
	     * Get the next date.
	     * @return {Date} the date.
	     */
	    readDate: function() {
	        var dostime = this.readInt(4);
	        return new Date(Date.UTC(
	        ((dostime >> 25) & 0x7f) + 1980, // year
	        ((dostime >> 21) & 0x0f) - 1, // month
	        (dostime >> 16) & 0x1f, // day
	        (dostime >> 11) & 0x1f, // hour
	        (dostime >> 5) & 0x3f, // minute
	        (dostime & 0x1f) << 1)); // second
	    }
	};
	module.exports = DataReader;

	},{"../utils":32}],19:[function(require,module,exports){
	var Uint8ArrayReader = require('./Uint8ArrayReader');
	var utils = require('../utils');

	function NodeBufferReader(data) {
	    Uint8ArrayReader.call(this, data);
	}
	utils.inherits(NodeBufferReader, Uint8ArrayReader);

	/**
	 * @see DataReader.readData
	 */
	NodeBufferReader.prototype.readData = function(size) {
	    this.checkOffset(size);
	    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
	    this.index += size;
	    return result;
	};
	module.exports = NodeBufferReader;

	},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(require,module,exports){
	var DataReader = require('./DataReader');
	var utils = require('../utils');

	function StringReader(data) {
	    DataReader.call(this, data);
	}
	utils.inherits(StringReader, DataReader);
	/**
	 * @see DataReader.byteAt
	 */
	StringReader.prototype.byteAt = function(i) {
	    return this.data.charCodeAt(this.zero + i);
	};
	/**
	 * @see DataReader.lastIndexOfSignature
	 */
	StringReader.prototype.lastIndexOfSignature = function(sig) {
	    return this.data.lastIndexOf(sig) - this.zero;
	};
	/**
	 * @see DataReader.readAndCheckSignature
	 */
	StringReader.prototype.readAndCheckSignature = function (sig) {
	    var data = this.readData(4);
	    return sig === data;
	};
	/**
	 * @see DataReader.readData
	 */
	StringReader.prototype.readData = function(size) {
	    this.checkOffset(size);
	    // this will work because the constructor applied the "& 0xff" mask.
	    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
	    this.index += size;
	    return result;
	};
	module.exports = StringReader;

	},{"../utils":32,"./DataReader":18}],21:[function(require,module,exports){
	var ArrayReader = require('./ArrayReader');
	var utils = require('../utils');

	function Uint8ArrayReader(data) {
	    ArrayReader.call(this, data);
	}
	utils.inherits(Uint8ArrayReader, ArrayReader);
	/**
	 * @see DataReader.readData
	 */
	Uint8ArrayReader.prototype.readData = function(size) {
	    this.checkOffset(size);
	    if(size === 0) {
	        // in IE10, when using subarray(idx, idx), we get the array [0x00] instead of [].
	        return new Uint8Array(0);
	    }
	    var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
	    this.index += size;
	    return result;
	};
	module.exports = Uint8ArrayReader;

	},{"../utils":32,"./ArrayReader":17}],22:[function(require,module,exports){

	var utils = require('../utils');
	var support = require('../support');
	var ArrayReader = require('./ArrayReader');
	var StringReader = require('./StringReader');
	var NodeBufferReader = require('./NodeBufferReader');
	var Uint8ArrayReader = require('./Uint8ArrayReader');

	/**
	 * Create a reader adapted to the data.
	 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data to read.
	 * @return {DataReader} the data reader.
	 */
	module.exports = function (data) {
	    var type = utils.getTypeOf(data);
	    utils.checkSupport(type);
	    if (type === "string" && !support.uint8array) {
	        return new StringReader(data);
	    }
	    if (type === "nodebuffer") {
	        return new NodeBufferReader(data);
	    }
	    if (support.uint8array) {
	        return new Uint8ArrayReader(utils.transformTo("uint8array", data));
	    }
	    return new ArrayReader(utils.transformTo("array", data));
	};

	},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(require,module,exports){
	exports.LOCAL_FILE_HEADER = "PK\x03\x04";
	exports.CENTRAL_FILE_HEADER = "PK\x01\x02";
	exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";
	exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
	exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
	exports.DATA_DESCRIPTOR = "PK\x07\x08";

	},{}],24:[function(require,module,exports){

	var GenericWorker = require('./GenericWorker');
	var utils = require('../utils');

	/**
	 * A worker which convert chunks to a specified type.
	 * @constructor
	 * @param {String} destType the destination type.
	 */
	function ConvertWorker(destType) {
	    GenericWorker.call(this, "ConvertWorker to " + destType);
	    this.destType = destType;
	}
	utils.inherits(ConvertWorker, GenericWorker);

	/**
	 * @see GenericWorker.processChunk
	 */
	ConvertWorker.prototype.processChunk = function (chunk) {
	    this.push({
	        data : utils.transformTo(this.destType, chunk.data),
	        meta : chunk.meta
	    });
	};
	module.exports = ConvertWorker;

	},{"../utils":32,"./GenericWorker":28}],25:[function(require,module,exports){

	var GenericWorker = require('./GenericWorker');
	var crc32 = require('../crc32');
	var utils = require('../utils');

	/**
	 * A worker which calculate the crc32 of the data flowing through.
	 * @constructor
	 */
	function Crc32Probe() {
	    GenericWorker.call(this, "Crc32Probe");
	    this.withStreamInfo("crc32", 0);
	}
	utils.inherits(Crc32Probe, GenericWorker);

	/**
	 * @see GenericWorker.processChunk
	 */
	Crc32Probe.prototype.processChunk = function (chunk) {
	    this.streamInfo.crc32 = crc32(chunk.data, this.streamInfo.crc32 || 0);
	    this.push(chunk);
	};
	module.exports = Crc32Probe;

	},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(require,module,exports){

	var utils = require('../utils');
	var GenericWorker = require('./GenericWorker');

	/**
	 * A worker which calculate the total length of the data flowing through.
	 * @constructor
	 * @param {String} propName the name used to expose the length
	 */
	function DataLengthProbe(propName) {
	    GenericWorker.call(this, "DataLengthProbe for " + propName);
	    this.propName = propName;
	    this.withStreamInfo(propName, 0);
	}
	utils.inherits(DataLengthProbe, GenericWorker);

	/**
	 * @see GenericWorker.processChunk
	 */
	DataLengthProbe.prototype.processChunk = function (chunk) {
	    if(chunk) {
	        var length = this.streamInfo[this.propName] || 0;
	        this.streamInfo[this.propName] = length + chunk.data.length;
	    }
	    GenericWorker.prototype.processChunk.call(this, chunk);
	};
	module.exports = DataLengthProbe;


	},{"../utils":32,"./GenericWorker":28}],27:[function(require,module,exports){

	var utils = require('../utils');
	var GenericWorker = require('./GenericWorker');

	// the size of the generated chunks
	// TODO expose this as a public variable
	var DEFAULT_BLOCK_SIZE = 16 * 1024;

	/**
	 * A worker that reads a content and emits chunks.
	 * @constructor
	 * @param {Promise} dataP the promise of the data to split
	 */
	function DataWorker(dataP) {
	    GenericWorker.call(this, "DataWorker");
	    var self = this;
	    this.dataIsReady = false;
	    this.index = 0;
	    this.max = 0;
	    this.data = null;
	    this.type = "";

	    this._tickScheduled = false;

	    dataP.then(function (data) {
	        self.dataIsReady = true;
	        self.data = data;
	        self.max = data && data.length || 0;
	        self.type = utils.getTypeOf(data);
	        if(!self.isPaused) {
	            self._tickAndRepeat();
	        }
	    }, function (e) {
	        self.error(e);
	    });
	}

	utils.inherits(DataWorker, GenericWorker);

	/**
	 * @see GenericWorker.cleanUp
	 */
	DataWorker.prototype.cleanUp = function () {
	    GenericWorker.prototype.cleanUp.call(this);
	    this.data = null;
	};

	/**
	 * @see GenericWorker.resume
	 */
	DataWorker.prototype.resume = function () {
	    if(!GenericWorker.prototype.resume.call(this)) {
	        return false;
	    }

	    if (!this._tickScheduled && this.dataIsReady) {
	        this._tickScheduled = true;
	        utils.delay(this._tickAndRepeat, [], this);
	    }
	    return true;
	};

	/**
	 * Trigger a tick a schedule an other call to this function.
	 */
	DataWorker.prototype._tickAndRepeat = function() {
	    this._tickScheduled = false;
	    if(this.isPaused || this.isFinished) {
	        return;
	    }
	    this._tick();
	    if(!this.isFinished) {
	        utils.delay(this._tickAndRepeat, [], this);
	        this._tickScheduled = true;
	    }
	};

	/**
	 * Read and push a chunk.
	 */
	DataWorker.prototype._tick = function() {

	    if(this.isPaused || this.isFinished) {
	        return false;
	    }

	    var size = DEFAULT_BLOCK_SIZE;
	    var data = null, nextIndex = Math.min(this.max, this.index + size);
	    if (this.index >= this.max) {
	        // EOF
	        return this.end();
	    } else {
	        switch(this.type) {
	            case "string":
	                data = this.data.substring(this.index, nextIndex);
	            break;
	            case "uint8array":
	                data = this.data.subarray(this.index, nextIndex);
	            break;
	            case "array":
	            case "nodebuffer":
	                data = this.data.slice(this.index, nextIndex);
	            break;
	        }
	        this.index = nextIndex;
	        return this.push({
	            data : data,
	            meta : {
	                percent : this.max ? this.index / this.max * 100 : 0
	            }
	        });
	    }
	};

	module.exports = DataWorker;

	},{"../utils":32,"./GenericWorker":28}],28:[function(require,module,exports){

	/**
	 * A worker that does nothing but passing chunks to the next one. This is like
	 * a nodejs stream but with some differences. On the good side :
	 * - it works on IE 6-9 without any issue / polyfill
	 * - it weights less than the full dependencies bundled with browserify
	 * - it forwards errors (no need to declare an error handler EVERYWHERE)
	 *
	 * A chunk is an object with 2 attributes : `meta` and `data`. The former is an
	 * object containing anything (`percent` for example), see each worker for more
	 * details. The latter is the real data (String, Uint8Array, etc).
	 *
	 * @constructor
	 * @param {String} name the name of the stream (mainly used for debugging purposes)
	 */
	function GenericWorker(name) {
	    // the name of the worker
	    this.name = name || "default";
	    // an object containing metadata about the workers chain
	    this.streamInfo = {};
	    // an error which happened when the worker was paused
	    this.generatedError = null;
	    // an object containing metadata to be merged by this worker into the general metadata
	    this.extraStreamInfo = {};
	    // true if the stream is paused (and should not do anything), false otherwise
	    this.isPaused = true;
	    // true if the stream is finished (and should not do anything), false otherwise
	    this.isFinished = false;
	    // true if the stream is locked to prevent further structure updates (pipe), false otherwise
	    this.isLocked = false;
	    // the event listeners
	    this._listeners = {
	        'data':[],
	        'end':[],
	        'error':[]
	    };
	    // the previous worker, if any
	    this.previous = null;
	}

	GenericWorker.prototype = {
	    /**
	     * Push a chunk to the next workers.
	     * @param {Object} chunk the chunk to push
	     */
	    push : function (chunk) {
	        this.emit("data", chunk);
	    },
	    /**
	     * End the stream.
	     * @return {Boolean} true if this call ended the worker, false otherwise.
	     */
	    end : function () {
	        if (this.isFinished) {
	            return false;
	        }

	        this.flush();
	        try {
	            this.emit("end");
	            this.cleanUp();
	            this.isFinished = true;
	        } catch (e) {
	            this.emit("error", e);
	        }
	        return true;
	    },
	    /**
	     * End the stream with an error.
	     * @param {Error} e the error which caused the premature end.
	     * @return {Boolean} true if this call ended the worker with an error, false otherwise.
	     */
	    error : function (e) {
	        if (this.isFinished) {
	            return false;
	        }

	        if(this.isPaused) {
	            this.generatedError = e;
	        } else {
	            this.isFinished = true;

	            this.emit("error", e);

	            // in the workers chain exploded in the middle of the chain,
	            // the error event will go downward but we also need to notify
	            // workers upward that there has been an error.
	            if(this.previous) {
	                this.previous.error(e);
	            }

	            this.cleanUp();
	        }
	        return true;
	    },
	    /**
	     * Add a callback on an event.
	     * @param {String} name the name of the event (data, end, error)
	     * @param {Function} listener the function to call when the event is triggered
	     * @return {GenericWorker} the current object for chainability
	     */
	    on : function (name, listener) {
	        this._listeners[name].push(listener);
	        return this;
	    },
	    /**
	     * Clean any references when a worker is ending.
	     */
	    cleanUp : function () {
	        this.streamInfo = this.generatedError = this.extraStreamInfo = null;
	        this._listeners = [];
	    },
	    /**
	     * Trigger an event. This will call registered callback with the provided arg.
	     * @param {String} name the name of the event (data, end, error)
	     * @param {Object} arg the argument to call the callback with.
	     */
	    emit : function (name, arg) {
	        if (this._listeners[name]) {
	            for(var i = 0; i < this._listeners[name].length; i++) {
	                this._listeners[name][i].call(this, arg);
	            }
	        }
	    },
	    /**
	     * Chain a worker with an other.
	     * @param {Worker} next the worker receiving events from the current one.
	     * @return {worker} the next worker for chainability
	     */
	    pipe : function (next) {
	        return next.registerPrevious(this);
	    },
	    /**
	     * Same as `pipe` in the other direction.
	     * Using an API with `pipe(next)` is very easy.
	     * Implementing the API with the point of view of the next one registering
	     * a source is easier, see the ZipFileWorker.
	     * @param {Worker} previous the previous worker, sending events to this one
	     * @return {Worker} the current worker for chainability
	     */
	    registerPrevious : function (previous) {
	        if (this.isLocked) {
	            throw new Error("The stream '" + this + "' has already been used.");
	        }

	        // sharing the streamInfo...
	        this.streamInfo = previous.streamInfo;
	        // ... and adding our own bits
	        this.mergeStreamInfo();
	        this.previous =  previous;
	        var self = this;
	        previous.on('data', function (chunk) {
	            self.processChunk(chunk);
	        });
	        previous.on('end', function () {
	            self.end();
	        });
	        previous.on('error', function (e) {
	            self.error(e);
	        });
	        return this;
	    },
	    /**
	     * Pause the stream so it doesn't send events anymore.
	     * @return {Boolean} true if this call paused the worker, false otherwise.
	     */
	    pause : function () {
	        if(this.isPaused || this.isFinished) {
	            return false;
	        }
	        this.isPaused = true;

	        if(this.previous) {
	            this.previous.pause();
	        }
	        return true;
	    },
	    /**
	     * Resume a paused stream.
	     * @return {Boolean} true if this call resumed the worker, false otherwise.
	     */
	    resume : function () {
	        if(!this.isPaused || this.isFinished) {
	            return false;
	        }
	        this.isPaused = false;

	        // if true, the worker tried to resume but failed
	        var withError = false;
	        if(this.generatedError) {
	            this.error(this.generatedError);
	            withError = true;
	        }
	        if(this.previous) {
	            this.previous.resume();
	        }

	        return !withError;
	    },
	    /**
	     * Flush any remaining bytes as the stream is ending.
	     */
	    flush : function () {},
	    /**
	     * Process a chunk. This is usually the method overridden.
	     * @param {Object} chunk the chunk to process.
	     */
	    processChunk : function(chunk) {
	        this.push(chunk);
	    },
	    /**
	     * Add a key/value to be added in the workers chain streamInfo once activated.
	     * @param {String} key the key to use
	     * @param {Object} value the associated value
	     * @return {Worker} the current worker for chainability
	     */
	    withStreamInfo : function (key, value) {
	        this.extraStreamInfo[key] = value;
	        this.mergeStreamInfo();
	        return this;
	    },
	    /**
	     * Merge this worker's streamInfo into the chain's streamInfo.
	     */
	    mergeStreamInfo : function () {
	        for(var key in this.extraStreamInfo) {
	            if (!this.extraStreamInfo.hasOwnProperty(key)) {
	                continue;
	            }
	            this.streamInfo[key] = this.extraStreamInfo[key];
	        }
	    },

	    /**
	     * Lock the stream to prevent further updates on the workers chain.
	     * After calling this method, all calls to pipe will fail.
	     */
	    lock: function () {
	        if (this.isLocked) {
	            throw new Error("The stream '" + this + "' has already been used.");
	        }
	        this.isLocked = true;
	        if (this.previous) {
	            this.previous.lock();
	        }
	    },

	    /**
	     *
	     * Pretty print the workers chain.
	     */
	    toString : function () {
	        var me = "Worker " + this.name;
	        if (this.previous) {
	            return this.previous + " -> " + me;
	        } else {
	            return me;
	        }
	    }
	};

	module.exports = GenericWorker;

	},{}],29:[function(require,module,exports){

	var utils = require('../utils');
	var ConvertWorker = require('./ConvertWorker');
	var GenericWorker = require('./GenericWorker');
	var base64 = require('../base64');
	var support = require("../support");
	var external = require("../external");

	var NodejsStreamOutputAdapter = null;
	if (support.nodestream) {
	    try {
	        NodejsStreamOutputAdapter = require('../nodejs/NodejsStreamOutputAdapter');
	    } catch(e) {}
	}

	/**
	 * Apply the final transformation of the data. If the user wants a Blob for
	 * example, it's easier to work with an U8intArray and finally do the
	 * ArrayBuffer/Blob conversion.
	 * @param {String} type the name of the final type
	 * @param {String|Uint8Array|Buffer} content the content to transform
	 * @param {String} mimeType the mime type of the content, if applicable.
	 * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the content in the right format.
	 */
	function transformZipOutput(type, content, mimeType) {
	    switch(type) {
	        case "blob" :
	            return utils.newBlob(utils.transformTo("arraybuffer", content), mimeType);
	        case "base64" :
	            return base64.encode(content);
	        default :
	            return utils.transformTo(type, content);
	    }
	}

	/**
	 * Concatenate an array of data of the given type.
	 * @param {String} type the type of the data in the given array.
	 * @param {Array} dataArray the array containing the data chunks to concatenate
	 * @return {String|Uint8Array|Buffer} the concatenated data
	 * @throws Error if the asked type is unsupported
	 */
	function concat (type, dataArray) {
	    var i, index = 0, res = null, totalLength = 0;
	    for(i = 0; i < dataArray.length; i++) {
	        totalLength += dataArray[i].length;
	    }
	    switch(type) {
	        case "string":
	            return dataArray.join("");
	          case "array":
	            return Array.prototype.concat.apply([], dataArray);
	        case "uint8array":
	            res = new Uint8Array(totalLength);
	            for(i = 0; i < dataArray.length; i++) {
	                res.set(dataArray[i], index);
	                index += dataArray[i].length;
	            }
	            return res;
	        case "nodebuffer":
	            return Buffer.concat(dataArray);
	        default:
	            throw new Error("concat : unsupported type '"  + type + "'");
	    }
	}

	/**
	 * Listen a StreamHelper, accumulate its content and concatenate it into a
	 * complete block.
	 * @param {StreamHelper} helper the helper to use.
	 * @param {Function} updateCallback a callback called on each update. Called
	 * with one arg :
	 * - the metadata linked to the update received.
	 * @return Promise the promise for the accumulation.
	 */
	function accumulate(helper, updateCallback) {
	    return new external.Promise(function (resolve, reject){
	        var dataArray = [];
	        var chunkType = helper._internalType,
	            resultType = helper._outputType,
	            mimeType = helper._mimeType;
	        helper
	        .on('data', function (data, meta) {
	            dataArray.push(data);
	            if(updateCallback) {
	                updateCallback(meta);
	            }
	        })
	        .on('error', function(err) {
	            dataArray = [];
	            reject(err);
	        })
	        .on('end', function (){
	            try {
	                var result = transformZipOutput(resultType, concat(chunkType, dataArray), mimeType);
	                resolve(result);
	            } catch (e) {
	                reject(e);
	            }
	            dataArray = [];
	        })
	        .resume();
	    });
	}

	/**
	 * An helper to easily use workers outside of JSZip.
	 * @constructor
	 * @param {Worker} worker the worker to wrap
	 * @param {String} outputType the type of data expected by the use
	 * @param {String} mimeType the mime type of the content, if applicable.
	 */
	function StreamHelper(worker, outputType, mimeType) {
	    var internalType = outputType;
	    switch(outputType) {
	        case "blob":
	        case "arraybuffer":
	            internalType = "uint8array";
	        break;
	        case "base64":
	            internalType = "string";
	        break;
	    }

	    try {
	        // the type used internally
	        this._internalType = internalType;
	        // the type used to output results
	        this._outputType = outputType;
	        // the mime type
	        this._mimeType = mimeType;
	        utils.checkSupport(internalType);
	        this._worker = worker.pipe(new ConvertWorker(internalType));
	        // the last workers can be rewired without issues but we need to
	        // prevent any updates on previous workers.
	        worker.lock();
	    } catch(e) {
	        this._worker = new GenericWorker("error");
	        this._worker.error(e);
	    }
	}

	StreamHelper.prototype = {
	    /**
	     * Listen a StreamHelper, accumulate its content and concatenate it into a
	     * complete block.
	     * @param {Function} updateCb the update callback.
	     * @return Promise the promise for the accumulation.
	     */
	    accumulate : function (updateCb) {
	        return accumulate(this, updateCb);
	    },
	    /**
	     * Add a listener on an event triggered on a stream.
	     * @param {String} evt the name of the event
	     * @param {Function} fn the listener
	     * @return {StreamHelper} the current helper.
	     */
	    on : function (evt, fn) {
	        var self = this;

	        if(evt === "data") {
	            this._worker.on(evt, function (chunk) {
	                fn.call(self, chunk.data, chunk.meta);
	            });
	        } else {
	            this._worker.on(evt, function () {
	                utils.delay(fn, arguments, self);
	            });
	        }
	        return this;
	    },
	    /**
	     * Resume the flow of chunks.
	     * @return {StreamHelper} the current helper.
	     */
	    resume : function () {
	        utils.delay(this._worker.resume, [], this._worker);
	        return this;
	    },
	    /**
	     * Pause the flow of chunks.
	     * @return {StreamHelper} the current helper.
	     */
	    pause : function () {
	        this._worker.pause();
	        return this;
	    },
	    /**
	     * Return a nodejs stream for this helper.
	     * @param {Function} updateCb the update callback.
	     * @return {NodejsStreamOutputAdapter} the nodejs stream.
	     */
	    toNodejsStream : function (updateCb) {
	        utils.checkSupport("nodestream");
	        if (this._outputType !== "nodebuffer") {
	            // an object stream containing blob/arraybuffer/uint8array/string
	            // is strange and I don't know if it would be useful.
	            // I you find this comment and have a good usecase, please open a
	            // bug report !
	            throw new Error(this._outputType + " is not supported by this method");
	        }

	        return new NodejsStreamOutputAdapter(this, {
	            objectMode : this._outputType !== "nodebuffer"
	        }, updateCb);
	    }
	};


	module.exports = StreamHelper;

	},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(require,module,exports){

	exports.base64 = true;
	exports.array = true;
	exports.string = true;
	exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
	exports.nodebuffer = typeof Buffer !== "undefined";
	// contains true if JSZip can read/generate Uint8Array, false otherwise.
	exports.uint8array = typeof Uint8Array !== "undefined";

	if (typeof ArrayBuffer === "undefined") {
	    exports.blob = false;
	}
	else {
	    var buffer = new ArrayBuffer(0);
	    try {
	        exports.blob = new Blob([buffer], {
	            type: "application/zip"
	        }).size === 0;
	    }
	    catch (e) {
	        try {
	            var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
	            var builder = new Builder();
	            builder.append(buffer);
	            exports.blob = builder.getBlob('application/zip').size === 0;
	        }
	        catch (e) {
	            exports.blob = false;
	        }
	    }
	}

	try {
	    exports.nodestream = !!require('readable-stream').Readable;
	} catch(e) {
	    exports.nodestream = false;
	}

	},{"readable-stream":16}],31:[function(require,module,exports){

	var utils = require('./utils');
	var support = require('./support');
	var nodejsUtils = require('./nodejsUtils');
	var GenericWorker = require('./stream/GenericWorker');

	/**
	 * The following functions come from pako, from pako/lib/utils/strings
	 * released under the MIT license, see pako https://github.com/nodeca/pako/
	 */

	// Table with utf8 lengths (calculated by first byte of sequence)
	// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
	// because max possible codepoint is 0x10ffff
	var _utf8len = new Array(256);
	for (var i=0; i<256; i++) {
	  _utf8len[i] = (i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1);
	}
	_utf8len[254]=_utf8len[254]=1; // Invalid sequence start

	// convert string to array (typed, when possible)
	var string2buf = function (str) {
	    var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

	    // count binary size
	    for (m_pos = 0; m_pos < str_len; m_pos++) {
	        c = str.charCodeAt(m_pos);
	        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
	            c2 = str.charCodeAt(m_pos+1);
	            if ((c2 & 0xfc00) === 0xdc00) {
	                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
	                m_pos++;
	            }
	        }
	        buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
	    }

	    // allocate buffer
	    if (support.uint8array) {
	        buf = new Uint8Array(buf_len);
	    } else {
	        buf = new Array(buf_len);
	    }

	    // convert
	    for (i=0, m_pos = 0; i < buf_len; m_pos++) {
	        c = str.charCodeAt(m_pos);
	        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
	            c2 = str.charCodeAt(m_pos+1);
	            if ((c2 & 0xfc00) === 0xdc00) {
	                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
	                m_pos++;
	            }
	        }
	        if (c < 0x80) {
	            /* one byte */
	            buf[i++] = c;
	        } else if (c < 0x800) {
	            /* two bytes */
	            buf[i++] = 0xC0 | (c >>> 6);
	            buf[i++] = 0x80 | (c & 0x3f);
	        } else if (c < 0x10000) {
	            /* three bytes */
	            buf[i++] = 0xE0 | (c >>> 12);
	            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
	            buf[i++] = 0x80 | (c & 0x3f);
	        } else {
	            /* four bytes */
	            buf[i++] = 0xf0 | (c >>> 18);
	            buf[i++] = 0x80 | (c >>> 12 & 0x3f);
	            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
	            buf[i++] = 0x80 | (c & 0x3f);
	        }
	    }

	    return buf;
	};

	// Calculate max possible position in utf8 buffer,
	// that will not break sequence. If that's not possible
	// - (very small limits) return max size as is.
	//
	// buf[] - utf8 bytes array
	// max   - length limit (mandatory);
	var utf8border = function(buf, max) {
	    var pos;

	    max = max || buf.length;
	    if (max > buf.length) { max = buf.length; }

	    // go back from last position, until start of sequence found
	    pos = max-1;
	    while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

	    // Fuckup - very small and broken sequence,
	    // return max, because we should return something anyway.
	    if (pos < 0) { return max; }

	    // If we came to start of buffer - that means vuffer is too small,
	    // return max too.
	    if (pos === 0) { return max; }

	    return (pos + _utf8len[buf[pos]] > max) ? pos : max;
	};

	// convert array to string
	var buf2string = function (buf) {
	    var i, out, c, c_len;
	    var len = buf.length;

	    // Reserve max possible length (2 words per char)
	    // NB: by unknown reasons, Array is significantly faster for
	    //     String.fromCharCode.apply than Uint16Array.
	    var utf16buf = new Array(len*2);

	    for (out=0, i=0; i<len;) {
	        c = buf[i++];
	        // quick process ascii
	        if (c < 0x80) { utf16buf[out++] = c; continue; }

	        c_len = _utf8len[c];
	        // skip 5 & 6 byte codes
	        if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len-1; continue; }

	        // apply mask on first byte
	        c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
	        // join the rest
	        while (c_len > 1 && i < len) {
	            c = (c << 6) | (buf[i++] & 0x3f);
	            c_len--;
	        }

	        // terminated by end of string?
	        if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

	        if (c < 0x10000) {
	            utf16buf[out++] = c;
	        } else {
	            c -= 0x10000;
	            utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
	            utf16buf[out++] = 0xdc00 | (c & 0x3ff);
	        }
	    }

	    // shrinkBuf(utf16buf, out)
	    if (utf16buf.length !== out) {
	        if(utf16buf.subarray) {
	            utf16buf = utf16buf.subarray(0, out);
	        } else {
	            utf16buf.length = out;
	        }
	    }

	    // return String.fromCharCode.apply(null, utf16buf);
	    return utils.applyFromCharCode(utf16buf);
	};


	// That's all for the pako functions.


	/**
	 * Transform a javascript string into an array (typed if possible) of bytes,
	 * UTF-8 encoded.
	 * @param {String} str the string to encode
	 * @return {Array|Uint8Array|Buffer} the UTF-8 encoded string.
	 */
	exports.utf8encode = function utf8encode(str) {
	    if (support.nodebuffer) {
	        return nodejsUtils.newBufferFrom(str, "utf-8");
	    }

	    return string2buf(str);
	};


	/**
	 * Transform a bytes array (or a representation) representing an UTF-8 encoded
	 * string into a javascript string.
	 * @param {Array|Uint8Array|Buffer} buf the data de decode
	 * @return {String} the decoded string.
	 */
	exports.utf8decode = function utf8decode(buf) {
	    if (support.nodebuffer) {
	        return utils.transformTo("nodebuffer", buf).toString("utf-8");
	    }

	    buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);

	    return buf2string(buf);
	};

	/**
	 * A worker to decode utf8 encoded binary chunks into string chunks.
	 * @constructor
	 */
	function Utf8DecodeWorker() {
	    GenericWorker.call(this, "utf-8 decode");
	    // the last bytes if a chunk didn't end with a complete codepoint.
	    this.leftOver = null;
	}
	utils.inherits(Utf8DecodeWorker, GenericWorker);

	/**
	 * @see GenericWorker.processChunk
	 */
	Utf8DecodeWorker.prototype.processChunk = function (chunk) {

	    var data = utils.transformTo(support.uint8array ? "uint8array" : "array", chunk.data);

	    // 1st step, re-use what's left of the previous chunk
	    if (this.leftOver && this.leftOver.length) {
	        if(support.uint8array) {
	            var previousData = data;
	            data = new Uint8Array(previousData.length + this.leftOver.length);
	            data.set(this.leftOver, 0);
	            data.set(previousData, this.leftOver.length);
	        } else {
	            data = this.leftOver.concat(data);
	        }
	        this.leftOver = null;
	    }

	    var nextBoundary = utf8border(data);
	    var usableData = data;
	    if (nextBoundary !== data.length) {
	        if (support.uint8array) {
	            usableData = data.subarray(0, nextBoundary);
	            this.leftOver = data.subarray(nextBoundary, data.length);
	        } else {
	            usableData = data.slice(0, nextBoundary);
	            this.leftOver = data.slice(nextBoundary, data.length);
	        }
	    }

	    this.push({
	        data : exports.utf8decode(usableData),
	        meta : chunk.meta
	    });
	};

	/**
	 * @see GenericWorker.flush
	 */
	Utf8DecodeWorker.prototype.flush = function () {
	    if(this.leftOver && this.leftOver.length) {
	        this.push({
	            data : exports.utf8decode(this.leftOver),
	            meta : {}
	        });
	        this.leftOver = null;
	    }
	};
	exports.Utf8DecodeWorker = Utf8DecodeWorker;

	/**
	 * A worker to endcode string chunks into utf8 encoded binary chunks.
	 * @constructor
	 */
	function Utf8EncodeWorker() {
	    GenericWorker.call(this, "utf-8 encode");
	}
	utils.inherits(Utf8EncodeWorker, GenericWorker);

	/**
	 * @see GenericWorker.processChunk
	 */
	Utf8EncodeWorker.prototype.processChunk = function (chunk) {
	    this.push({
	        data : exports.utf8encode(chunk.data),
	        meta : chunk.meta
	    });
	};
	exports.Utf8EncodeWorker = Utf8EncodeWorker;

	},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(require,module,exports){

	var support = require('./support');
	var base64 = require('./base64');
	var nodejsUtils = require('./nodejsUtils');
	var setImmediate = require('core-js/library/fn/set-immediate');
	var external = require("./external");


	/**
	 * Convert a string that pass as a "binary string": it should represent a byte
	 * array but may have > 255 char codes. Be sure to take only the first byte
	 * and returns the byte array.
	 * @param {String} str the string to transform.
	 * @return {Array|Uint8Array} the string in a binary format.
	 */
	function string2binary(str) {
	    var result = null;
	    if (support.uint8array) {
	      result = new Uint8Array(str.length);
	    } else {
	      result = new Array(str.length);
	    }
	    return stringToArrayLike(str, result);
	}

	/**
	 * Create a new blob with the given content and the given type.
	 * @param {String|ArrayBuffer} part the content to put in the blob. DO NOT use
	 * an Uint8Array because the stock browser of android 4 won't accept it (it
	 * will be silently converted to a string, "[object Uint8Array]").
	 *
	 * Use only ONE part to build the blob to avoid a memory leak in IE11 / Edge:
	 * when a large amount of Array is used to create the Blob, the amount of
	 * memory consumed is nearly 100 times the original data amount.
	 *
	 * @param {String} type the mime type of the blob.
	 * @return {Blob} the created blob.
	 */
	exports.newBlob = function(part, type) {
	    exports.checkSupport("blob");

	    try {
	        // Blob constructor
	        return new Blob([part], {
	            type: type
	        });
	    }
	    catch (e) {

	        try {
	            // deprecated, browser only, old way
	            var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
	            var builder = new Builder();
	            builder.append(part);
	            return builder.getBlob(type);
	        }
	        catch (e) {

	            // well, fuck ?!
	            throw new Error("Bug : can't construct the Blob.");
	        }
	    }


	};
	/**
	 * The identity function.
	 * @param {Object} input the input.
	 * @return {Object} the same input.
	 */
	function identity(input) {
	    return input;
	}

	/**
	 * Fill in an array with a string.
	 * @param {String} str the string to use.
	 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to fill in (will be mutated).
	 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated array.
	 */
	function stringToArrayLike(str, array) {
	    for (var i = 0; i < str.length; ++i) {
	        array[i] = str.charCodeAt(i) & 0xFF;
	    }
	    return array;
	}

	/**
	 * An helper for the function arrayLikeToString.
	 * This contains static informations and functions that
	 * can be optimized by the browser JIT compiler.
	 */
	var arrayToStringHelper = {
	    /**
	     * Transform an array of int into a string, chunk by chunk.
	     * See the performances notes on arrayLikeToString.
	     * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
	     * @param {String} type the type of the array.
	     * @param {Integer} chunk the chunk size.
	     * @return {String} the resulting string.
	     * @throws Error if the chunk is too big for the stack.
	     */
	    stringifyByChunk: function(array, type, chunk) {
	        var result = [], k = 0, len = array.length;
	        // shortcut
	        if (len <= chunk) {
	            return String.fromCharCode.apply(null, array);
	        }
	        while (k < len) {
	            if (type === "array" || type === "nodebuffer") {
	                result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
	            }
	            else {
	                result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
	            }
	            k += chunk;
	        }
	        return result.join("");
	    },
	    /**
	     * Call String.fromCharCode on every item in the array.
	     * This is the naive implementation, which generate A LOT of intermediate string.
	     * This should be used when everything else fail.
	     * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
	     * @return {String} the result.
	     */
	    stringifyByChar: function(array){
	        var resultStr = "";
	        for(var i = 0; i < array.length; i++) {
	            resultStr += String.fromCharCode(array[i]);
	        }
	        return resultStr;
	    },
	    applyCanBeUsed : {
	        /**
	         * true if the browser accepts to use String.fromCharCode on Uint8Array
	         */
	        uint8array : (function () {
	            try {
	                return support.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
	            } catch (e) {
	                return false;
	            }
	        })(),
	        /**
	         * true if the browser accepts to use String.fromCharCode on nodejs Buffer.
	         */
	        nodebuffer : (function () {
	            try {
	                return support.nodebuffer && String.fromCharCode.apply(null, nodejsUtils.allocBuffer(1)).length === 1;
	            } catch (e) {
	                return false;
	            }
	        })()
	    }
	};

	/**
	 * Transform an array-like object to a string.
	 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
	 * @return {String} the result.
	 */
	function arrayLikeToString(array) {
	    // Performances notes :
	    // --------------------
	    // String.fromCharCode.apply(null, array) is the fastest, see
	    // see http://jsperf.com/converting-a-uint8array-to-a-string/2
	    // but the stack is limited (and we can get huge arrays !).
	    //
	    // result += String.fromCharCode(array[i]); generate too many strings !
	    //
	    // This code is inspired by http://jsperf.com/arraybuffer-to-string-apply-performance/2
	    // TODO : we now have workers that split the work. Do we still need that ?
	    var chunk = 65536,
	        type = exports.getTypeOf(array),
	        canUseApply = true;
	    if (type === "uint8array") {
	        canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array;
	    } else if (type === "nodebuffer") {
	        canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer;
	    }

	    if (canUseApply) {
	        while (chunk > 1) {
	            try {
	                return arrayToStringHelper.stringifyByChunk(array, type, chunk);
	            } catch (e) {
	                chunk = Math.floor(chunk / 2);
	            }
	        }
	    }

	    // no apply or chunk error : slow and painful algorithm
	    // default browser on android 4.*
	    return arrayToStringHelper.stringifyByChar(array);
	}

	exports.applyFromCharCode = arrayLikeToString;


	/**
	 * Copy the data from an array-like to an other array-like.
	 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayFrom the origin array.
	 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayTo the destination array which will be mutated.
	 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated destination array.
	 */
	function arrayLikeToArrayLike(arrayFrom, arrayTo) {
	    for (var i = 0; i < arrayFrom.length; i++) {
	        arrayTo[i] = arrayFrom[i];
	    }
	    return arrayTo;
	}

	// a matrix containing functions to transform everything into everything.
	var transform = {};

	// string to ?
	transform["string"] = {
	    "string": identity,
	    "array": function(input) {
	        return stringToArrayLike(input, new Array(input.length));
	    },
	    "arraybuffer": function(input) {
	        return transform["string"]["uint8array"](input).buffer;
	    },
	    "uint8array": function(input) {
	        return stringToArrayLike(input, new Uint8Array(input.length));
	    },
	    "nodebuffer": function(input) {
	        return stringToArrayLike(input, nodejsUtils.allocBuffer(input.length));
	    }
	};

	// array to ?
	transform["array"] = {
	    "string": arrayLikeToString,
	    "array": identity,
	    "arraybuffer": function(input) {
	        return (new Uint8Array(input)).buffer;
	    },
	    "uint8array": function(input) {
	        return new Uint8Array(input);
	    },
	    "nodebuffer": function(input) {
	        return nodejsUtils.newBufferFrom(input);
	    }
	};

	// arraybuffer to ?
	transform["arraybuffer"] = {
	    "string": function(input) {
	        return arrayLikeToString(new Uint8Array(input));
	    },
	    "array": function(input) {
	        return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
	    },
	    "arraybuffer": identity,
	    "uint8array": function(input) {
	        return new Uint8Array(input);
	    },
	    "nodebuffer": function(input) {
	        return nodejsUtils.newBufferFrom(new Uint8Array(input));
	    }
	};

	// uint8array to ?
	transform["uint8array"] = {
	    "string": arrayLikeToString,
	    "array": function(input) {
	        return arrayLikeToArrayLike(input, new Array(input.length));
	    },
	    "arraybuffer": function(input) {
	        return input.buffer;
	    },
	    "uint8array": identity,
	    "nodebuffer": function(input) {
	        return nodejsUtils.newBufferFrom(input);
	    }
	};

	// nodebuffer to ?
	transform["nodebuffer"] = {
	    "string": arrayLikeToString,
	    "array": function(input) {
	        return arrayLikeToArrayLike(input, new Array(input.length));
	    },
	    "arraybuffer": function(input) {
	        return transform["nodebuffer"]["uint8array"](input).buffer;
	    },
	    "uint8array": function(input) {
	        return arrayLikeToArrayLike(input, new Uint8Array(input.length));
	    },
	    "nodebuffer": identity
	};

	/**
	 * Transform an input into any type.
	 * The supported output type are : string, array, uint8array, arraybuffer, nodebuffer.
	 * If no output type is specified, the unmodified input will be returned.
	 * @param {String} outputType the output type.
	 * @param {String|Array|ArrayBuffer|Uint8Array|Buffer} input the input to convert.
	 * @throws {Error} an Error if the browser doesn't support the requested output type.
	 */
	exports.transformTo = function(outputType, input) {
	    if (!input) {
	        // undefined, null, etc
	        // an empty string won't harm.
	        input = "";
	    }
	    if (!outputType) {
	        return input;
	    }
	    exports.checkSupport(outputType);
	    var inputType = exports.getTypeOf(input);
	    var result = transform[inputType][outputType](input);
	    return result;
	};

	/**
	 * Return the type of the input.
	 * The type will be in a format valid for JSZip.utils.transformTo : string, array, uint8array, arraybuffer.
	 * @param {Object} input the input to identify.
	 * @return {String} the (lowercase) type of the input.
	 */
	exports.getTypeOf = function(input) {
	    if (typeof input === "string") {
	        return "string";
	    }
	    if (Object.prototype.toString.call(input) === "[object Array]") {
	        return "array";
	    }
	    if (support.nodebuffer && nodejsUtils.isBuffer(input)) {
	        return "nodebuffer";
	    }
	    if (support.uint8array && input instanceof Uint8Array) {
	        return "uint8array";
	    }
	    if (support.arraybuffer && input instanceof ArrayBuffer) {
	        return "arraybuffer";
	    }
	};

	/**
	 * Throw an exception if the type is not supported.
	 * @param {String} type the type to check.
	 * @throws {Error} an Error if the browser doesn't support the requested type.
	 */
	exports.checkSupport = function(type) {
	    var supported = support[type.toLowerCase()];
	    if (!supported) {
	        throw new Error(type + " is not supported by this platform");
	    }
	};

	exports.MAX_VALUE_16BITS = 65535;
	exports.MAX_VALUE_32BITS = -1; // well, "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF" is parsed as -1

	/**
	 * Prettify a string read as binary.
	 * @param {string} str the string to prettify.
	 * @return {string} a pretty string.
	 */
	exports.pretty = function(str) {
	    var res = '',
	        code, i;
	    for (i = 0; i < (str || "").length; i++) {
	        code = str.charCodeAt(i);
	        res += '\\x' + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
	    }
	    return res;
	};

	/**
	 * Defer the call of a function.
	 * @param {Function} callback the function to call asynchronously.
	 * @param {Array} args the arguments to give to the callback.
	 */
	exports.delay = function(callback, args, self) {
	    setImmediate(function () {
	        callback.apply(self || null, args || []);
	    });
	};

	/**
	 * Extends a prototype with an other, without calling a constructor with
	 * side effects. Inspired by nodejs' `utils.inherits`
	 * @param {Function} ctor the constructor to augment
	 * @param {Function} superCtor the parent constructor to use
	 */
	exports.inherits = function (ctor, superCtor) {
	    var Obj = function() {};
	    Obj.prototype = superCtor.prototype;
	    ctor.prototype = new Obj();
	};

	/**
	 * Merge the objects passed as parameters into a new one.
	 * @private
	 * @param {...Object} var_args All objects to merge.
	 * @return {Object} a new object with the data of the others.
	 */
	exports.extend = function() {
	    var result = {}, i, attr;
	    for (i = 0; i < arguments.length; i++) { // arguments is not enumerable in some browsers
	        for (attr in arguments[i]) {
	            if (arguments[i].hasOwnProperty(attr) && typeof result[attr] === "undefined") {
	                result[attr] = arguments[i][attr];
	            }
	        }
	    }
	    return result;
	};

	/**
	 * Transform arbitrary content into a Promise.
	 * @param {String} name a name for the content being processed.
	 * @param {Object} inputData the content to process.
	 * @param {Boolean} isBinary true if the content is not an unicode string
	 * @param {Boolean} isOptimizedBinaryString true if the string content only has one byte per character.
	 * @param {Boolean} isBase64 true if the string content is encoded with base64.
	 * @return {Promise} a promise in a format usable by JSZip.
	 */
	exports.prepareContent = function(name, inputData, isBinary, isOptimizedBinaryString, isBase64) {

	    // if inputData is already a promise, this flatten it.
	    var promise = external.Promise.resolve(inputData).then(function(data) {
	        
	        
	        var isBlob = support.blob && (data instanceof Blob || ['[object File]', '[object Blob]'].indexOf(Object.prototype.toString.call(data)) !== -1);

	        if (isBlob && typeof FileReader !== "undefined") {
	            return new external.Promise(function (resolve, reject) {
	                var reader = new FileReader();

	                reader.onload = function(e) {
	                    resolve(e.target.result);
	                };
	                reader.onerror = function(e) {
	                    reject(e.target.error);
	                };
	                reader.readAsArrayBuffer(data);
	            });
	        } else {
	            return data;
	        }
	    });

	    return promise.then(function(data) {
	        var dataType = exports.getTypeOf(data);

	        if (!dataType) {
	            return external.Promise.reject(
	                new Error("Can't read the data of '" + name + "'. Is it " +
	                          "in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")
	            );
	        }
	        // special case : it's way easier to work with Uint8Array than with ArrayBuffer
	        if (dataType === "arraybuffer") {
	            data = exports.transformTo("uint8array", data);
	        } else if (dataType === "string") {
	            if (isBase64) {
	                data = base64.decode(data);
	            }
	            else if (isBinary) {
	                // optimizedBinaryString === true means that the file has already been filtered with a 0xFF mask
	                if (isOptimizedBinaryString !== true) {
	                    // this is a string, not in a base64 format.
	                    // Be sure that this is a correct "binary string"
	                    data = string2binary(data);
	                }
	            }
	        }
	        return data;
	    });
	};

	},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"core-js/library/fn/set-immediate":36}],33:[function(require,module,exports){
	var readerFor = require('./reader/readerFor');
	var utils = require('./utils');
	var sig = require('./signature');
	var ZipEntry = require('./zipEntry');
	var utf8 = require('./utf8');
	var support = require('./support');
	//  class ZipEntries {{{
	/**
	 * All the entries in the zip file.
	 * @constructor
	 * @param {Object} loadOptions Options for loading the stream.
	 */
	function ZipEntries(loadOptions) {
	    this.files = [];
	    this.loadOptions = loadOptions;
	}
	ZipEntries.prototype = {
	    /**
	     * Check that the reader is on the specified signature.
	     * @param {string} expectedSignature the expected signature.
	     * @throws {Error} if it is an other signature.
	     */
	    checkSignature: function(expectedSignature) {
	        if (!this.reader.readAndCheckSignature(expectedSignature)) {
	            this.reader.index -= 4;
	            var signature = this.reader.readString(4);
	            throw new Error("Corrupted zip or bug: unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
	        }
	    },
	    /**
	     * Check if the given signature is at the given index.
	     * @param {number} askedIndex the index to check.
	     * @param {string} expectedSignature the signature to expect.
	     * @return {boolean} true if the signature is here, false otherwise.
	     */
	    isSignature: function(askedIndex, expectedSignature) {
	        var currentIndex = this.reader.index;
	        this.reader.setIndex(askedIndex);
	        var signature = this.reader.readString(4);
	        var result = signature === expectedSignature;
	        this.reader.setIndex(currentIndex);
	        return result;
	    },
	    /**
	     * Read the end of the central directory.
	     */
	    readBlockEndOfCentral: function() {
	        this.diskNumber = this.reader.readInt(2);
	        this.diskWithCentralDirStart = this.reader.readInt(2);
	        this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
	        this.centralDirRecords = this.reader.readInt(2);
	        this.centralDirSize = this.reader.readInt(4);
	        this.centralDirOffset = this.reader.readInt(4);

	        this.zipCommentLength = this.reader.readInt(2);
	        // warning : the encoding depends of the system locale
	        // On a linux machine with LANG=en_US.utf8, this field is utf8 encoded.
	        // On a windows machine, this field is encoded with the localized windows code page.
	        var zipComment = this.reader.readData(this.zipCommentLength);
	        var decodeParamType = support.uint8array ? "uint8array" : "array";
	        // To get consistent behavior with the generation part, we will assume that
	        // this is utf8 encoded unless specified otherwise.
	        var decodeContent = utils.transformTo(decodeParamType, zipComment);
	        this.zipComment = this.loadOptions.decodeFileName(decodeContent);
	    },
	    /**
	     * Read the end of the Zip 64 central directory.
	     * Not merged with the method readEndOfCentral :
	     * The end of central can coexist with its Zip64 brother,
	     * I don't want to read the wrong number of bytes !
	     */
	    readBlockZip64EndOfCentral: function() {
	        this.zip64EndOfCentralSize = this.reader.readInt(8);
	        this.reader.skip(4);
	        // this.versionMadeBy = this.reader.readString(2);
	        // this.versionNeeded = this.reader.readInt(2);
	        this.diskNumber = this.reader.readInt(4);
	        this.diskWithCentralDirStart = this.reader.readInt(4);
	        this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
	        this.centralDirRecords = this.reader.readInt(8);
	        this.centralDirSize = this.reader.readInt(8);
	        this.centralDirOffset = this.reader.readInt(8);

	        this.zip64ExtensibleData = {};
	        var extraDataSize = this.zip64EndOfCentralSize - 44,
	            index = 0,
	            extraFieldId,
	            extraFieldLength,
	            extraFieldValue;
	        while (index < extraDataSize) {
	            extraFieldId = this.reader.readInt(2);
	            extraFieldLength = this.reader.readInt(4);
	            extraFieldValue = this.reader.readData(extraFieldLength);
	            this.zip64ExtensibleData[extraFieldId] = {
	                id: extraFieldId,
	                length: extraFieldLength,
	                value: extraFieldValue
	            };
	        }
	    },
	    /**
	     * Read the end of the Zip 64 central directory locator.
	     */
	    readBlockZip64EndOfCentralLocator: function() {
	        this.diskWithZip64CentralDirStart = this.reader.readInt(4);
	        this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
	        this.disksCount = this.reader.readInt(4);
	        if (this.disksCount > 1) {
	            throw new Error("Multi-volumes zip are not supported");
	        }
	    },
	    /**
	     * Read the local files, based on the offset read in the central part.
	     */
	    readLocalFiles: function() {
	        var i, file;
	        for (i = 0; i < this.files.length; i++) {
	            file = this.files[i];
	            this.reader.setIndex(file.localHeaderOffset);
	            this.checkSignature(sig.LOCAL_FILE_HEADER);
	            file.readLocalPart(this.reader);
	            file.handleUTF8();
	            file.processAttributes();
	        }
	    },
	    /**
	     * Read the central directory.
	     */
	    readCentralDir: function() {
	        var file;

	        this.reader.setIndex(this.centralDirOffset);
	        while (this.reader.readAndCheckSignature(sig.CENTRAL_FILE_HEADER)) {
	            file = new ZipEntry({
	                zip64: this.zip64
	            }, this.loadOptions);
	            file.readCentralPart(this.reader);
	            this.files.push(file);
	        }

	        if (this.centralDirRecords !== this.files.length) {
	            if (this.centralDirRecords !== 0 && this.files.length === 0) {
	                // We expected some records but couldn't find ANY.
	                // This is really suspicious, as if something went wrong.
	                throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
	            } else {
	                // We found some records but not all.
	                // Something is wrong but we got something for the user: no error here.
	                // console.warn("expected", this.centralDirRecords, "records in central dir, got", this.files.length);
	            }
	        }
	    },
	    /**
	     * Read the end of central directory.
	     */
	    readEndOfCentral: function() {
	        var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
	        if (offset < 0) {
	            // Check if the content is a truncated zip or complete garbage.
	            // A "LOCAL_FILE_HEADER" is not required at the beginning (auto
	            // extractible zip for example) but it can give a good hint.
	            // If an ajax request was used without responseType, we will also
	            // get unreadable data.
	            var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);

	            if (isGarbage) {
	                throw new Error("Can't find end of central directory : is this a zip file ? " +
	                                "If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
	            } else {
	                throw new Error("Corrupted zip: can't find end of central directory");
	            }

	        }
	        this.reader.setIndex(offset);
	        var endOfCentralDirOffset = offset;
	        this.checkSignature(sig.CENTRAL_DIRECTORY_END);
	        this.readBlockEndOfCentral();


	        /* extract from the zip spec :
	            4)  If one of the fields in the end of central directory
	                record is too small to hold required data, the field
	                should be set to -1 (0xFFFF or 0xFFFFFFFF) and the
	                ZIP64 format record should be created.
	            5)  The end of central directory record and the
	                Zip64 end of central directory locator record must
	                reside on the same disk when splitting or spanning
	                an archive.
	         */
	        if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
	            this.zip64 = true;

	            /*
	            Warning : the zip64 extension is supported, but ONLY if the 64bits integer read from
	            the zip file can fit into a 32bits integer. This cannot be solved : JavaScript represents
	            all numbers as 64-bit double precision IEEE 754 floating point numbers.
	            So, we have 53bits for integers and bitwise operations treat everything as 32bits.
	            see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Bitwise_Operators
	            and http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf section 8.5
	            */

	            // should look for a zip64 EOCD locator
	            offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
	            if (offset < 0) {
	                throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
	            }
	            this.reader.setIndex(offset);
	            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
	            this.readBlockZip64EndOfCentralLocator();

	            // now the zip64 EOCD record
	            if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
	                // console.warn("ZIP64 end of central directory not where expected.");
	                this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
	                if (this.relativeOffsetEndOfZip64CentralDir < 0) {
	                    throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
	                }
	            }
	            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
	            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
	            this.readBlockZip64EndOfCentral();
	        }

	        var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
	        if (this.zip64) {
	            expectedEndOfCentralDirOffset += 20; // end of central dir 64 locator
	            expectedEndOfCentralDirOffset += 12 /* should not include the leading 12 bytes */ + this.zip64EndOfCentralSize;
	        }

	        var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;

	        if (extraBytes > 0) {
	            // console.warn(extraBytes, "extra bytes at beginning or within zipfile");
	            if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {
	                // The offsets seem wrong, but we have something at the specified offset.
	                // So… we keep it.
	            } else {
	                // the offset is wrong, update the "zero" of the reader
	                // this happens if data has been prepended (crx files for example)
	                this.reader.zero = extraBytes;
	            }
	        } else if (extraBytes < 0) {
	            throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
	        }
	    },
	    prepareReader: function(data) {
	        this.reader = readerFor(data);
	    },
	    /**
	     * Read a zip file and create ZipEntries.
	     * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
	     */
	    load: function(data) {
	        this.prepareReader(data);
	        this.readEndOfCentral();
	        this.readCentralDir();
	        this.readLocalFiles();
	    }
	};
	// }}} end of ZipEntries
	module.exports = ZipEntries;

	},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(require,module,exports){
	var readerFor = require('./reader/readerFor');
	var utils = require('./utils');
	var CompressedObject = require('./compressedObject');
	var crc32fn = require('./crc32');
	var utf8 = require('./utf8');
	var compressions = require('./compressions');
	var support = require('./support');

	var MADE_BY_DOS = 0x00;
	var MADE_BY_UNIX = 0x03;

	/**
	 * Find a compression registered in JSZip.
	 * @param {string} compressionMethod the method magic to find.
	 * @return {Object|null} the JSZip compression object, null if none found.
	 */
	var findCompression = function(compressionMethod) {
	    for (var method in compressions) {
	        if (!compressions.hasOwnProperty(method)) {
	            continue;
	        }
	        if (compressions[method].magic === compressionMethod) {
	            return compressions[method];
	        }
	    }
	    return null;
	};

	// class ZipEntry {{{
	/**
	 * An entry in the zip file.
	 * @constructor
	 * @param {Object} options Options of the current file.
	 * @param {Object} loadOptions Options for loading the stream.
	 */
	function ZipEntry(options, loadOptions) {
	    this.options = options;
	    this.loadOptions = loadOptions;
	}
	ZipEntry.prototype = {
	    /**
	     * say if the file is encrypted.
	     * @return {boolean} true if the file is encrypted, false otherwise.
	     */
	    isEncrypted: function() {
	        // bit 1 is set
	        return (this.bitFlag & 0x0001) === 0x0001;
	    },
	    /**
	     * say if the file has utf-8 filename/comment.
	     * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
	     */
	    useUTF8: function() {
	        // bit 11 is set
	        return (this.bitFlag & 0x0800) === 0x0800;
	    },
	    /**
	     * Read the local part of a zip file and add the info in this object.
	     * @param {DataReader} reader the reader to use.
	     */
	    readLocalPart: function(reader) {
	        var compression, localExtraFieldsLength;

	        // we already know everything from the central dir !
	        // If the central dir data are false, we are doomed.
	        // On the bright side, the local part is scary  : zip64, data descriptors, both, etc.
	        // The less data we get here, the more reliable this should be.
	        // Let's skip the whole header and dash to the data !
	        reader.skip(22);
	        // in some zip created on windows, the filename stored in the central dir contains \ instead of /.
	        // Strangely, the filename here is OK.
	        // I would love to treat these zip files as corrupted (see http://www.info-zip.org/FAQ.html#backslashes
	        // or APPNOTE#4.4.17.1, "All slashes MUST be forward slashes '/'") but there are a lot of bad zip generators...
	        // Search "unzip mismatching "local" filename continuing with "central" filename version" on
	        // the internet.
	        //
	        // I think I see the logic here : the central directory is used to display
	        // content and the local directory is used to extract the files. Mixing / and \
	        // may be used to display \ to windows users and use / when extracting the files.
	        // Unfortunately, this lead also to some issues : http://seclists.org/fulldisclosure/2009/Sep/394
	        this.fileNameLength = reader.readInt(2);
	        localExtraFieldsLength = reader.readInt(2); // can't be sure this will be the same as the central dir
	        // the fileName is stored as binary data, the handleUTF8 method will take care of the encoding.
	        this.fileName = reader.readData(this.fileNameLength);
	        reader.skip(localExtraFieldsLength);

	        if (this.compressedSize === -1 || this.uncompressedSize === -1) {
	            throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory " + "(compressedSize === -1 || uncompressedSize === -1)");
	        }

	        compression = findCompression(this.compressionMethod);
	        if (compression === null) { // no compression found
	            throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
	        }
	        this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));
	    },

	    /**
	     * Read the central part of a zip file and add the info in this object.
	     * @param {DataReader} reader the reader to use.
	     */
	    readCentralPart: function(reader) {
	        this.versionMadeBy = reader.readInt(2);
	        reader.skip(2);
	        // this.versionNeeded = reader.readInt(2);
	        this.bitFlag = reader.readInt(2);
	        this.compressionMethod = reader.readString(2);
	        this.date = reader.readDate();
	        this.crc32 = reader.readInt(4);
	        this.compressedSize = reader.readInt(4);
	        this.uncompressedSize = reader.readInt(4);
	        var fileNameLength = reader.readInt(2);
	        this.extraFieldsLength = reader.readInt(2);
	        this.fileCommentLength = reader.readInt(2);
	        this.diskNumberStart = reader.readInt(2);
	        this.internalFileAttributes = reader.readInt(2);
	        this.externalFileAttributes = reader.readInt(4);
	        this.localHeaderOffset = reader.readInt(4);

	        if (this.isEncrypted()) {
	            throw new Error("Encrypted zip are not supported");
	        }

	        // will be read in the local part, see the comments there
	        reader.skip(fileNameLength);
	        this.readExtraFields(reader);
	        this.parseZIP64ExtraField(reader);
	        this.fileComment = reader.readData(this.fileCommentLength);
	    },

	    /**
	     * Parse the external file attributes and get the unix/dos permissions.
	     */
	    processAttributes: function () {
	        this.unixPermissions = null;
	        this.dosPermissions = null;
	        var madeBy = this.versionMadeBy >> 8;

	        // Check if we have the DOS directory flag set.
	        // We look for it in the DOS and UNIX permissions
	        // but some unknown platform could set it as a compatibility flag.
	        this.dir = this.externalFileAttributes & 0x0010 ? true : false;

	        if(madeBy === MADE_BY_DOS) {
	            // first 6 bits (0 to 5)
	            this.dosPermissions = this.externalFileAttributes & 0x3F;
	        }

	        if(madeBy === MADE_BY_UNIX) {
	            this.unixPermissions = (this.externalFileAttributes >> 16) & 0xFFFF;
	            // the octal permissions are in (this.unixPermissions & 0x01FF).toString(8);
	        }

	        // fail safe : if the name ends with a / it probably means a folder
	        if (!this.dir && this.fileNameStr.slice(-1) === '/') {
	            this.dir = true;
	        }
	    },

	    /**
	     * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
	     * @param {DataReader} reader the reader to use.
	     */
	    parseZIP64ExtraField: function(reader) {

	        if (!this.extraFields[0x0001]) {
	            return;
	        }

	        // should be something, preparing the extra reader
	        var extraReader = readerFor(this.extraFields[0x0001].value);

	        // I really hope that these 64bits integer can fit in 32 bits integer, because js
	        // won't let us have more.
	        if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
	            this.uncompressedSize = extraReader.readInt(8);
	        }
	        if (this.compressedSize === utils.MAX_VALUE_32BITS) {
	            this.compressedSize = extraReader.readInt(8);
	        }
	        if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
	            this.localHeaderOffset = extraReader.readInt(8);
	        }
	        if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
	            this.diskNumberStart = extraReader.readInt(4);
	        }
	    },
	    /**
	     * Read the central part of a zip file and add the info in this object.
	     * @param {DataReader} reader the reader to use.
	     */
	    readExtraFields: function(reader) {
	        var end = reader.index + this.extraFieldsLength,
	            extraFieldId,
	            extraFieldLength,
	            extraFieldValue;

	        if (!this.extraFields) {
	            this.extraFields = {};
	        }

	        while (reader.index < end) {
	            extraFieldId = reader.readInt(2);
	            extraFieldLength = reader.readInt(2);
	            extraFieldValue = reader.readData(extraFieldLength);

	            this.extraFields[extraFieldId] = {
	                id: extraFieldId,
	                length: extraFieldLength,
	                value: extraFieldValue
	            };
	        }
	    },
	    /**
	     * Apply an UTF8 transformation if needed.
	     */
	    handleUTF8: function() {
	        var decodeParamType = support.uint8array ? "uint8array" : "array";
	        if (this.useUTF8()) {
	            this.fileNameStr = utf8.utf8decode(this.fileName);
	            this.fileCommentStr = utf8.utf8decode(this.fileComment);
	        } else {
	            var upath = this.findExtraFieldUnicodePath();
	            if (upath !== null) {
	                this.fileNameStr = upath;
	            } else {
	                // ASCII text or unsupported code page
	                var fileNameByteArray =  utils.transformTo(decodeParamType, this.fileName);
	                this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
	            }

	            var ucomment = this.findExtraFieldUnicodeComment();
	            if (ucomment !== null) {
	                this.fileCommentStr = ucomment;
	            } else {
	                // ASCII text or unsupported code page
	                var commentByteArray =  utils.transformTo(decodeParamType, this.fileComment);
	                this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
	            }
	        }
	    },

	    /**
	     * Find the unicode path declared in the extra field, if any.
	     * @return {String} the unicode path, null otherwise.
	     */
	    findExtraFieldUnicodePath: function() {
	        var upathField = this.extraFields[0x7075];
	        if (upathField) {
	            var extraReader = readerFor(upathField.value);

	            // wrong version
	            if (extraReader.readInt(1) !== 1) {
	                return null;
	            }

	            // the crc of the filename changed, this field is out of date.
	            if (crc32fn(this.fileName) !== extraReader.readInt(4)) {
	                return null;
	            }

	            return utf8.utf8decode(extraReader.readData(upathField.length - 5));
	        }
	        return null;
	    },

	    /**
	     * Find the unicode comment declared in the extra field, if any.
	     * @return {String} the unicode comment, null otherwise.
	     */
	    findExtraFieldUnicodeComment: function() {
	        var ucommentField = this.extraFields[0x6375];
	        if (ucommentField) {
	            var extraReader = readerFor(ucommentField.value);

	            // wrong version
	            if (extraReader.readInt(1) !== 1) {
	                return null;
	            }

	            // the crc of the comment changed, this field is out of date.
	            if (crc32fn(this.fileComment) !== extraReader.readInt(4)) {
	                return null;
	            }

	            return utf8.utf8decode(extraReader.readData(ucommentField.length - 5));
	        }
	        return null;
	    }
	};
	module.exports = ZipEntry;

	},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(require,module,exports){

	var StreamHelper = require('./stream/StreamHelper');
	var DataWorker = require('./stream/DataWorker');
	var utf8 = require('./utf8');
	var CompressedObject = require('./compressedObject');
	var GenericWorker = require('./stream/GenericWorker');

	/**
	 * A simple object representing a file in the zip file.
	 * @constructor
	 * @param {string} name the name of the file
	 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data
	 * @param {Object} options the options of the file
	 */
	var ZipObject = function(name, data, options) {
	    this.name = name;
	    this.dir = options.dir;
	    this.date = options.date;
	    this.comment = options.comment;
	    this.unixPermissions = options.unixPermissions;
	    this.dosPermissions = options.dosPermissions;

	    this._data = data;
	    this._dataBinary = options.binary;
	    // keep only the compression
	    this.options = {
	        compression : options.compression,
	        compressionOptions : options.compressionOptions
	    };
	};

	ZipObject.prototype = {
	    /**
	     * Create an internal stream for the content of this object.
	     * @param {String} type the type of each chunk.
	     * @return StreamHelper the stream.
	     */
	    internalStream: function (type) {
	        var result = null, outputType = "string";
	        try {
	            if (!type) {
	                throw new Error("No output type specified.");
	            }
	            outputType = type.toLowerCase();
	            var askUnicodeString = outputType === "string" || outputType === "text";
	            if (outputType === "binarystring" || outputType === "text") {
	                outputType = "string";
	            }
	            result = this._decompressWorker();

	            var isUnicodeString = !this._dataBinary;

	            if (isUnicodeString && !askUnicodeString) {
	                result = result.pipe(new utf8.Utf8EncodeWorker());
	            }
	            if (!isUnicodeString && askUnicodeString) {
	                result = result.pipe(new utf8.Utf8DecodeWorker());
	            }
	        } catch (e) {
	            result = new GenericWorker("error");
	            result.error(e);
	        }

	        return new StreamHelper(result, outputType, "");
	    },

	    /**
	     * Prepare the content in the asked type.
	     * @param {String} type the type of the result.
	     * @param {Function} onUpdate a function to call on each internal update.
	     * @return Promise the promise of the result.
	     */
	    async: function (type, onUpdate) {
	        return this.internalStream(type).accumulate(onUpdate);
	    },

	    /**
	     * Prepare the content as a nodejs stream.
	     * @param {String} type the type of each chunk.
	     * @param {Function} onUpdate a function to call on each internal update.
	     * @return Stream the stream.
	     */
	    nodeStream: function (type, onUpdate) {
	        return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);
	    },

	    /**
	     * Return a worker for the compressed content.
	     * @private
	     * @param {Object} compression the compression object to use.
	     * @param {Object} compressionOptions the options to use when compressing.
	     * @return Worker the worker.
	     */
	    _compressWorker: function (compression, compressionOptions) {
	        if (
	            this._data instanceof CompressedObject &&
	            this._data.compression.magic === compression.magic
	        ) {
	            return this._data.getCompressedWorker();
	        } else {
	            var result = this._decompressWorker();
	            if(!this._dataBinary) {
	                result = result.pipe(new utf8.Utf8EncodeWorker());
	            }
	            return CompressedObject.createWorkerFrom(result, compression, compressionOptions);
	        }
	    },
	    /**
	     * Return a worker for the decompressed content.
	     * @private
	     * @return Worker the worker.
	     */
	    _decompressWorker : function () {
	        if (this._data instanceof CompressedObject) {
	            return this._data.getContentWorker();
	        } else if (this._data instanceof GenericWorker) {
	            return this._data;
	        } else {
	            return new DataWorker(this._data);
	        }
	    }
	};

	var removedMethods = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"];
	var removedFn = function () {
	    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
	};

	for(var i = 0; i < removedMethods.length; i++) {
	    ZipObject.prototype[removedMethods[i]] = removedFn;
	}
	module.exports = ZipObject;

	},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(require,module,exports){
	require('../modules/web.immediate');
	module.exports = require('../modules/_core').setImmediate;
	},{"../modules/_core":40,"../modules/web.immediate":56}],37:[function(require,module,exports){
	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};
	},{}],38:[function(require,module,exports){
	var isObject = require('./_is-object');
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	},{"./_is-object":51}],39:[function(require,module,exports){
	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};
	},{}],40:[function(require,module,exports){
	var core = module.exports = {version: '2.3.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
	},{}],41:[function(require,module,exports){
	// optional / simple context binding
	var aFunction = require('./_a-function');
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};
	},{"./_a-function":37}],42:[function(require,module,exports){
	// Thank's IE8 for his funny defineProperty
	module.exports = !require('./_fails')(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});
	},{"./_fails":45}],43:[function(require,module,exports){
	var isObject = require('./_is-object')
	  , document = require('./_global').document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};
	},{"./_global":46,"./_is-object":51}],44:[function(require,module,exports){
	var global    = require('./_global')
	  , core      = require('./_core')
	  , ctx       = require('./_ctx')
	  , hide      = require('./_hide')
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;
	},{"./_core":40,"./_ctx":41,"./_global":46,"./_hide":47}],45:[function(require,module,exports){
	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};
	},{}],46:[function(require,module,exports){
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
	},{}],47:[function(require,module,exports){
	var dP         = require('./_object-dp')
	  , createDesc = require('./_property-desc');
	module.exports = require('./_descriptors') ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};
	},{"./_descriptors":42,"./_object-dp":52,"./_property-desc":53}],48:[function(require,module,exports){
	module.exports = require('./_global').document && document.documentElement;
	},{"./_global":46}],49:[function(require,module,exports){
	module.exports = !require('./_descriptors') && !require('./_fails')(function(){
	  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});
	},{"./_descriptors":42,"./_dom-create":43,"./_fails":45}],50:[function(require,module,exports){
	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};
	},{}],51:[function(require,module,exports){
	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};
	},{}],52:[function(require,module,exports){
	var anObject       = require('./_an-object')
	  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
	  , toPrimitive    = require('./_to-primitive')
	  , dP             = Object.defineProperty;

	exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};
	},{"./_an-object":38,"./_descriptors":42,"./_ie8-dom-define":49,"./_to-primitive":55}],53:[function(require,module,exports){
	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};
	},{}],54:[function(require,module,exports){
	var ctx                = require('./_ctx')
	  , invoke             = require('./_invoke')
	  , html               = require('./_html')
	  , cel                = require('./_dom-create')
	  , global             = require('./_global')
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(require('./_cof')(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};
	},{"./_cof":39,"./_ctx":41,"./_dom-create":43,"./_global":46,"./_html":48,"./_invoke":50}],55:[function(require,module,exports){
	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = require('./_is-object');
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};
	},{"./_is-object":51}],56:[function(require,module,exports){
	var $export = require('./_export')
	  , $task   = require('./_task');
	$export($export.G + $export.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});
	},{"./_export":44,"./_task":54}],57:[function(require,module,exports){
	(function (global){
	var Mutation = global.MutationObserver || global.WebKitMutationObserver;

	var scheduleDrain;

	{
	  if (Mutation) {
	    var called = 0;
	    var observer = new Mutation(nextTick);
	    var element = global.document.createTextNode('');
	    observer.observe(element, {
	      characterData: true
	    });
	    scheduleDrain = function () {
	      element.data = (called = ++called % 2);
	    };
	  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
	    var channel = new global.MessageChannel();
	    channel.port1.onmessage = nextTick;
	    scheduleDrain = function () {
	      channel.port2.postMessage(0);
	    };
	  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
	    scheduleDrain = function () {

	      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	      var scriptEl = global.document.createElement('script');
	      scriptEl.onreadystatechange = function () {
	        nextTick();

	        scriptEl.onreadystatechange = null;
	        scriptEl.parentNode.removeChild(scriptEl);
	        scriptEl = null;
	      };
	      global.document.documentElement.appendChild(scriptEl);
	    };
	  } else {
	    scheduleDrain = function () {
	      setTimeout(nextTick, 0);
	    };
	  }
	}

	var draining;
	var queue = [];
	//named nextTick for less confusing stack traces
	function nextTick() {
	  draining = true;
	  var i, oldQueue;
	  var len = queue.length;
	  while (len) {
	    oldQueue = queue;
	    queue = [];
	    i = -1;
	    while (++i < len) {
	      oldQueue[i]();
	    }
	    len = queue.length;
	  }
	  draining = false;
	}

	module.exports = immediate;
	function immediate(task) {
	  if (queue.push(task) === 1 && !draining) {
	    scheduleDrain();
	  }
	}

	}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	},{}],58:[function(require,module,exports){
	var immediate = require('immediate');

	/* istanbul ignore next */
	function INTERNAL() {}

	var handlers = {};

	var REJECTED = ['REJECTED'];
	var FULFILLED = ['FULFILLED'];
	var PENDING = ['PENDING'];

	module.exports = Promise;

	function Promise(resolver) {
	  if (typeof resolver !== 'function') {
	    throw new TypeError('resolver must be a function');
	  }
	  this.state = PENDING;
	  this.queue = [];
	  this.outcome = void 0;
	  if (resolver !== INTERNAL) {
	    safelyResolveThenable(this, resolver);
	  }
	}

	Promise.prototype["catch"] = function (onRejected) {
	  return this.then(null, onRejected);
	};
	Promise.prototype.then = function (onFulfilled, onRejected) {
	  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
	    typeof onRejected !== 'function' && this.state === REJECTED) {
	    return this;
	  }
	  var promise = new this.constructor(INTERNAL);
	  if (this.state !== PENDING) {
	    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
	    unwrap(promise, resolver, this.outcome);
	  } else {
	    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
	  }

	  return promise;
	};
	function QueueItem(promise, onFulfilled, onRejected) {
	  this.promise = promise;
	  if (typeof onFulfilled === 'function') {
	    this.onFulfilled = onFulfilled;
	    this.callFulfilled = this.otherCallFulfilled;
	  }
	  if (typeof onRejected === 'function') {
	    this.onRejected = onRejected;
	    this.callRejected = this.otherCallRejected;
	  }
	}
	QueueItem.prototype.callFulfilled = function (value) {
	  handlers.resolve(this.promise, value);
	};
	QueueItem.prototype.otherCallFulfilled = function (value) {
	  unwrap(this.promise, this.onFulfilled, value);
	};
	QueueItem.prototype.callRejected = function (value) {
	  handlers.reject(this.promise, value);
	};
	QueueItem.prototype.otherCallRejected = function (value) {
	  unwrap(this.promise, this.onRejected, value);
	};

	function unwrap(promise, func, value) {
	  immediate(function () {
	    var returnValue;
	    try {
	      returnValue = func(value);
	    } catch (e) {
	      return handlers.reject(promise, e);
	    }
	    if (returnValue === promise) {
	      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
	    } else {
	      handlers.resolve(promise, returnValue);
	    }
	  });
	}

	handlers.resolve = function (self, value) {
	  var result = tryCatch(getThen, value);
	  if (result.status === 'error') {
	    return handlers.reject(self, result.value);
	  }
	  var thenable = result.value;

	  if (thenable) {
	    safelyResolveThenable(self, thenable);
	  } else {
	    self.state = FULFILLED;
	    self.outcome = value;
	    var i = -1;
	    var len = self.queue.length;
	    while (++i < len) {
	      self.queue[i].callFulfilled(value);
	    }
	  }
	  return self;
	};
	handlers.reject = function (self, error) {
	  self.state = REJECTED;
	  self.outcome = error;
	  var i = -1;
	  var len = self.queue.length;
	  while (++i < len) {
	    self.queue[i].callRejected(error);
	  }
	  return self;
	};

	function getThen(obj) {
	  // Make sure we only access the accessor once as required by the spec
	  var then = obj && obj.then;
	  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
	    return function appyThen() {
	      then.apply(obj, arguments);
	    };
	  }
	}

	function safelyResolveThenable(self, thenable) {
	  // Either fulfill, reject or reject with error
	  var called = false;
	  function onError(value) {
	    if (called) {
	      return;
	    }
	    called = true;
	    handlers.reject(self, value);
	  }

	  function onSuccess(value) {
	    if (called) {
	      return;
	    }
	    called = true;
	    handlers.resolve(self, value);
	  }

	  function tryToUnwrap() {
	    thenable(onSuccess, onError);
	  }

	  var result = tryCatch(tryToUnwrap);
	  if (result.status === 'error') {
	    onError(result.value);
	  }
	}

	function tryCatch(func, value) {
	  var out = {};
	  try {
	    out.value = func(value);
	    out.status = 'success';
	  } catch (e) {
	    out.status = 'error';
	    out.value = e;
	  }
	  return out;
	}

	Promise.resolve = resolve;
	function resolve(value) {
	  if (value instanceof this) {
	    return value;
	  }
	  return handlers.resolve(new this(INTERNAL), value);
	}

	Promise.reject = reject;
	function reject(reason) {
	  var promise = new this(INTERNAL);
	  return handlers.reject(promise, reason);
	}

	Promise.all = all;
	function all(iterable) {
	  var self = this;
	  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
	    return this.reject(new TypeError('must be an array'));
	  }

	  var len = iterable.length;
	  var called = false;
	  if (!len) {
	    return this.resolve([]);
	  }

	  var values = new Array(len);
	  var resolved = 0;
	  var i = -1;
	  var promise = new this(INTERNAL);

	  while (++i < len) {
	    allResolver(iterable[i], i);
	  }
	  return promise;
	  function allResolver(value, i) {
	    self.resolve(value).then(resolveFromAll, function (error) {
	      if (!called) {
	        called = true;
	        handlers.reject(promise, error);
	      }
	    });
	    function resolveFromAll(outValue) {
	      values[i] = outValue;
	      if (++resolved === len && !called) {
	        called = true;
	        handlers.resolve(promise, values);
	      }
	    }
	  }
	}

	Promise.race = race;
	function race(iterable) {
	  var self = this;
	  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
	    return this.reject(new TypeError('must be an array'));
	  }

	  var len = iterable.length;
	  var called = false;
	  if (!len) {
	    return this.resolve([]);
	  }

	  var i = -1;
	  var promise = new this(INTERNAL);

	  while (++i < len) {
	    resolver(iterable[i]);
	  }
	  return promise;
	  function resolver(value) {
	    self.resolve(value).then(function (response) {
	      if (!called) {
	        called = true;
	        handlers.resolve(promise, response);
	      }
	    }, function (error) {
	      if (!called) {
	        called = true;
	        handlers.reject(promise, error);
	      }
	    });
	  }
	}

	},{"immediate":57}],59:[function(require,module,exports){

	var assign    = require('./lib/utils/common').assign;

	var deflate   = require('./lib/deflate');
	var inflate   = require('./lib/inflate');
	var constants = require('./lib/zlib/constants');

	var pako = {};

	assign(pako, deflate, inflate, constants);

	module.exports = pako;

	},{"./lib/deflate":60,"./lib/inflate":61,"./lib/utils/common":62,"./lib/zlib/constants":65}],60:[function(require,module,exports){


	var zlib_deflate = require('./zlib/deflate');
	var utils        = require('./utils/common');
	var strings      = require('./utils/strings');
	var msg          = require('./zlib/messages');
	var ZStream      = require('./zlib/zstream');

	var toString = Object.prototype.toString;

	/* Public constants ==========================================================*/
	/* ===========================================================================*/

	var Z_NO_FLUSH      = 0;
	var Z_FINISH        = 4;

	var Z_OK            = 0;
	var Z_STREAM_END    = 1;
	var Z_SYNC_FLUSH    = 2;

	var Z_DEFAULT_COMPRESSION = -1;

	var Z_DEFAULT_STRATEGY    = 0;

	var Z_DEFLATED  = 8;

	/* ===========================================================================*/


	/**
	 * class Deflate
	 *
	 * Generic JS-style wrapper for zlib calls. If you don't need
	 * streaming behaviour - use more simple functions: [[deflate]],
	 * [[deflateRaw]] and [[gzip]].
	 **/

	/* internal
	 * Deflate.chunks -> Array
	 *
	 * Chunks of output data, if [[Deflate#onData]] not overriden.
	 **/

	/**
	 * Deflate.result -> Uint8Array|Array
	 *
	 * Compressed result, generated by default [[Deflate#onData]]
	 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
	 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
	 * push a chunk with explicit flush (call [[Deflate#push]] with
	 * `Z_SYNC_FLUSH` param).
	 **/

	/**
	 * Deflate.err -> Number
	 *
	 * Error code after deflate finished. 0 (Z_OK) on success.
	 * You will not need it in real life, because deflate errors
	 * are possible only on wrong options or bad `onData` / `onEnd`
	 * custom handlers.
	 **/

	/**
	 * Deflate.msg -> String
	 *
	 * Error message, if [[Deflate.err]] != 0
	 **/


	/**
	 * new Deflate(options)
	 * - options (Object): zlib deflate options.
	 *
	 * Creates new deflator instance with specified params. Throws exception
	 * on bad params. Supported options:
	 *
	 * - `level`
	 * - `windowBits`
	 * - `memLevel`
	 * - `strategy`
	 * - `dictionary`
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Additional options, for internal needs:
	 *
	 * - `chunkSize` - size of generated data chunks (16K by default)
	 * - `raw` (Boolean) - do raw deflate
	 * - `gzip` (Boolean) - create gzip wrapper
	 * - `to` (String) - if equal to 'string', then result will be "binary string"
	 *    (each char code [0..255])
	 * - `header` (Object) - custom header for gzip
	 *   - `text` (Boolean) - true if compressed data believed to be text
	 *   - `time` (Number) - modification time, unix timestamp
	 *   - `os` (Number) - operation system code
	 *   - `extra` (Array) - array of bytes with extra data (max 65536)
	 *   - `name` (String) - file name (binary string)
	 *   - `comment` (String) - comment (binary string)
	 *   - `hcrc` (Boolean) - true if header crc should be added
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
	 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
	 *
	 * var deflate = new pako.Deflate({ level: 3});
	 *
	 * deflate.push(chunk1, false);
	 * deflate.push(chunk2, true);  // true -> last chunk
	 *
	 * if (deflate.err) { throw new Error(deflate.err); }
	 *
	 * console.log(deflate.result);
	 * ```
	 **/
	function Deflate(options) {
	  if (!(this instanceof Deflate)) return new Deflate(options);

	  this.options = utils.assign({
	    level: Z_DEFAULT_COMPRESSION,
	    method: Z_DEFLATED,
	    chunkSize: 16384,
	    windowBits: 15,
	    memLevel: 8,
	    strategy: Z_DEFAULT_STRATEGY,
	    to: ''
	  }, options || {});

	  var opt = this.options;

	  if (opt.raw && (opt.windowBits > 0)) {
	    opt.windowBits = -opt.windowBits;
	  }

	  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
	    opt.windowBits += 16;
	  }

	  this.err    = 0;      // error code, if happens (0 = Z_OK)
	  this.msg    = '';     // error message
	  this.ended  = false;  // used to avoid multiple onEnd() calls
	  this.chunks = [];     // chunks of compressed data

	  this.strm = new ZStream();
	  this.strm.avail_out = 0;

	  var status = zlib_deflate.deflateInit2(
	    this.strm,
	    opt.level,
	    opt.method,
	    opt.windowBits,
	    opt.memLevel,
	    opt.strategy
	  );

	  if (status !== Z_OK) {
	    throw new Error(msg[status]);
	  }

	  if (opt.header) {
	    zlib_deflate.deflateSetHeader(this.strm, opt.header);
	  }

	  if (opt.dictionary) {
	    var dict;
	    // Convert data if needed
	    if (typeof opt.dictionary === 'string') {
	      // If we need to compress text, change encoding to utf8.
	      dict = strings.string2buf(opt.dictionary);
	    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
	      dict = new Uint8Array(opt.dictionary);
	    } else {
	      dict = opt.dictionary;
	    }

	    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

	    if (status !== Z_OK) {
	      throw new Error(msg[status]);
	    }

	    this._dict_set = true;
	  }
	}

	/**
	 * Deflate#push(data[, mode]) -> Boolean
	 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
	 *   converted to utf8 byte sequence.
	 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
	 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
	 *
	 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
	 * new compressed chunks. Returns `true` on success. The last data block must have
	 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
	 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
	 * can use mode Z_SYNC_FLUSH, keeping the compression context.
	 *
	 * On fail call [[Deflate#onEnd]] with error code and return false.
	 *
	 * We strongly recommend to use `Uint8Array` on input for best speed (output
	 * array format is detected automatically). Also, don't skip last param and always
	 * use the same type in your code (boolean or number). That will improve JS speed.
	 *
	 * For regular `Array`-s make sure all elements are [0..255].
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * push(chunk, false); // push one of data chunks
	 * ...
	 * push(chunk, true);  // push last chunk
	 * ```
	 **/
	Deflate.prototype.push = function (data, mode) {
	  var strm = this.strm;
	  var chunkSize = this.options.chunkSize;
	  var status, _mode;

	  if (this.ended) { return false; }

	  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

	  // Convert data if needed
	  if (typeof data === 'string') {
	    // If we need to compress text, change encoding to utf8.
	    strm.input = strings.string2buf(data);
	  } else if (toString.call(data) === '[object ArrayBuffer]') {
	    strm.input = new Uint8Array(data);
	  } else {
	    strm.input = data;
	  }

	  strm.next_in = 0;
	  strm.avail_in = strm.input.length;

	  do {
	    if (strm.avail_out === 0) {
	      strm.output = new utils.Buf8(chunkSize);
	      strm.next_out = 0;
	      strm.avail_out = chunkSize;
	    }
	    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

	    if (status !== Z_STREAM_END && status !== Z_OK) {
	      this.onEnd(status);
	      this.ended = true;
	      return false;
	    }
	    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
	      if (this.options.to === 'string') {
	        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
	      } else {
	        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
	      }
	    }
	  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

	  // Finalize on the last chunk.
	  if (_mode === Z_FINISH) {
	    status = zlib_deflate.deflateEnd(this.strm);
	    this.onEnd(status);
	    this.ended = true;
	    return status === Z_OK;
	  }

	  // callback interim results if Z_SYNC_FLUSH.
	  if (_mode === Z_SYNC_FLUSH) {
	    this.onEnd(Z_OK);
	    strm.avail_out = 0;
	    return true;
	  }

	  return true;
	};


	/**
	 * Deflate#onData(chunk) -> Void
	 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
	 *   on js engine support. When string output requested, each chunk
	 *   will be string.
	 *
	 * By default, stores data blocks in `chunks[]` property and glue
	 * those in `onEnd`. Override this handler, if you need another behaviour.
	 **/
	Deflate.prototype.onData = function (chunk) {
	  this.chunks.push(chunk);
	};


	/**
	 * Deflate#onEnd(status) -> Void
	 * - status (Number): deflate status. 0 (Z_OK) on success,
	 *   other if not.
	 *
	 * Called once after you tell deflate that the input stream is
	 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
	 * or if an error happened. By default - join collected chunks,
	 * free memory and fill `results` / `err` properties.
	 **/
	Deflate.prototype.onEnd = function (status) {
	  // On success - join
	  if (status === Z_OK) {
	    if (this.options.to === 'string') {
	      this.result = this.chunks.join('');
	    } else {
	      this.result = utils.flattenChunks(this.chunks);
	    }
	  }
	  this.chunks = [];
	  this.err = status;
	  this.msg = this.strm.msg;
	};


	/**
	 * deflate(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * Compress `data` with deflate algorithm and `options`.
	 *
	 * Supported options are:
	 *
	 * - level
	 * - windowBits
	 * - memLevel
	 * - strategy
	 * - dictionary
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Sugar (options):
	 *
	 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
	 *   negative windowBits implicitly.
	 * - `to` (String) - if equal to 'string', then result will be "binary string"
	 *    (each char code [0..255])
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
	 *
	 * console.log(pako.deflate(data));
	 * ```
	 **/
	function deflate(input, options) {
	  var deflator = new Deflate(options);

	  deflator.push(input, true);

	  // That will never happens, if you don't cheat with options :)
	  if (deflator.err) { throw deflator.msg || msg[deflator.err]; }

	  return deflator.result;
	}


	/**
	 * deflateRaw(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * The same as [[deflate]], but creates raw data, without wrapper
	 * (header and adler32 crc).
	 **/
	function deflateRaw(input, options) {
	  options = options || {};
	  options.raw = true;
	  return deflate(input, options);
	}


	/**
	 * gzip(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * The same as [[deflate]], but create gzip wrapper instead of
	 * deflate one.
	 **/
	function gzip(input, options) {
	  options = options || {};
	  options.gzip = true;
	  return deflate(input, options);
	}


	exports.Deflate = Deflate;
	exports.deflate = deflate;
	exports.deflateRaw = deflateRaw;
	exports.gzip = gzip;

	},{"./utils/common":62,"./utils/strings":63,"./zlib/deflate":67,"./zlib/messages":72,"./zlib/zstream":74}],61:[function(require,module,exports){


	var zlib_inflate = require('./zlib/inflate');
	var utils        = require('./utils/common');
	var strings      = require('./utils/strings');
	var c            = require('./zlib/constants');
	var msg          = require('./zlib/messages');
	var ZStream      = require('./zlib/zstream');
	var GZheader     = require('./zlib/gzheader');

	var toString = Object.prototype.toString;

	/**
	 * class Inflate
	 *
	 * Generic JS-style wrapper for zlib calls. If you don't need
	 * streaming behaviour - use more simple functions: [[inflate]]
	 * and [[inflateRaw]].
	 **/

	/* internal
	 * inflate.chunks -> Array
	 *
	 * Chunks of output data, if [[Inflate#onData]] not overriden.
	 **/

	/**
	 * Inflate.result -> Uint8Array|Array|String
	 *
	 * Uncompressed result, generated by default [[Inflate#onData]]
	 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
	 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
	 * push a chunk with explicit flush (call [[Inflate#push]] with
	 * `Z_SYNC_FLUSH` param).
	 **/

	/**
	 * Inflate.err -> Number
	 *
	 * Error code after inflate finished. 0 (Z_OK) on success.
	 * Should be checked if broken data possible.
	 **/

	/**
	 * Inflate.msg -> String
	 *
	 * Error message, if [[Inflate.err]] != 0
	 **/


	/**
	 * new Inflate(options)
	 * - options (Object): zlib inflate options.
	 *
	 * Creates new inflator instance with specified params. Throws exception
	 * on bad params. Supported options:
	 *
	 * - `windowBits`
	 * - `dictionary`
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Additional options, for internal needs:
	 *
	 * - `chunkSize` - size of generated data chunks (16K by default)
	 * - `raw` (Boolean) - do raw inflate
	 * - `to` (String) - if equal to 'string', then result will be converted
	 *   from utf8 to utf16 (javascript) string. When string output requested,
	 *   chunk length can differ from `chunkSize`, depending on content.
	 *
	 * By default, when no options set, autodetect deflate/gzip data format via
	 * wrapper header.
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
	 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
	 *
	 * var inflate = new pako.Inflate({ level: 3});
	 *
	 * inflate.push(chunk1, false);
	 * inflate.push(chunk2, true);  // true -> last chunk
	 *
	 * if (inflate.err) { throw new Error(inflate.err); }
	 *
	 * console.log(inflate.result);
	 * ```
	 **/
	function Inflate(options) {
	  if (!(this instanceof Inflate)) return new Inflate(options);

	  this.options = utils.assign({
	    chunkSize: 16384,
	    windowBits: 0,
	    to: ''
	  }, options || {});

	  var opt = this.options;

	  // Force window size for `raw` data, if not set directly,
	  // because we have no header for autodetect.
	  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
	    opt.windowBits = -opt.windowBits;
	    if (opt.windowBits === 0) { opt.windowBits = -15; }
	  }

	  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
	  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
	      !(options && options.windowBits)) {
	    opt.windowBits += 32;
	  }

	  // Gzip header has no info about windows size, we can do autodetect only
	  // for deflate. So, if window size not set, force it to max when gzip possible
	  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
	    // bit 3 (16) -> gzipped data
	    // bit 4 (32) -> autodetect gzip/deflate
	    if ((opt.windowBits & 15) === 0) {
	      opt.windowBits |= 15;
	    }
	  }

	  this.err    = 0;      // error code, if happens (0 = Z_OK)
	  this.msg    = '';     // error message
	  this.ended  = false;  // used to avoid multiple onEnd() calls
	  this.chunks = [];     // chunks of compressed data

	  this.strm   = new ZStream();
	  this.strm.avail_out = 0;

	  var status  = zlib_inflate.inflateInit2(
	    this.strm,
	    opt.windowBits
	  );

	  if (status !== c.Z_OK) {
	    throw new Error(msg[status]);
	  }

	  this.header = new GZheader();

	  zlib_inflate.inflateGetHeader(this.strm, this.header);
	}

	/**
	 * Inflate#push(data[, mode]) -> Boolean
	 * - data (Uint8Array|Array|ArrayBuffer|String): input data
	 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
	 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
	 *
	 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
	 * new output chunks. Returns `true` on success. The last data block must have
	 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
	 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
	 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
	 *
	 * On fail call [[Inflate#onEnd]] with error code and return false.
	 *
	 * We strongly recommend to use `Uint8Array` on input for best speed (output
	 * format is detected automatically). Also, don't skip last param and always
	 * use the same type in your code (boolean or number). That will improve JS speed.
	 *
	 * For regular `Array`-s make sure all elements are [0..255].
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * push(chunk, false); // push one of data chunks
	 * ...
	 * push(chunk, true);  // push last chunk
	 * ```
	 **/
	Inflate.prototype.push = function (data, mode) {
	  var strm = this.strm;
	  var chunkSize = this.options.chunkSize;
	  var dictionary = this.options.dictionary;
	  var status, _mode;
	  var next_out_utf8, tail, utf8str;
	  var dict;

	  // Flag to properly process Z_BUF_ERROR on testing inflate call
	  // when we check that all output data was flushed.
	  var allowBufError = false;

	  if (this.ended) { return false; }
	  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

	  // Convert data if needed
	  if (typeof data === 'string') {
	    // Only binary strings can be decompressed on practice
	    strm.input = strings.binstring2buf(data);
	  } else if (toString.call(data) === '[object ArrayBuffer]') {
	    strm.input = new Uint8Array(data);
	  } else {
	    strm.input = data;
	  }

	  strm.next_in = 0;
	  strm.avail_in = strm.input.length;

	  do {
	    if (strm.avail_out === 0) {
	      strm.output = new utils.Buf8(chunkSize);
	      strm.next_out = 0;
	      strm.avail_out = chunkSize;
	    }

	    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

	    if (status === c.Z_NEED_DICT && dictionary) {
	      // Convert data if needed
	      if (typeof dictionary === 'string') {
	        dict = strings.string2buf(dictionary);
	      } else if (toString.call(dictionary) === '[object ArrayBuffer]') {
	        dict = new Uint8Array(dictionary);
	      } else {
	        dict = dictionary;
	      }

	      status = zlib_inflate.inflateSetDictionary(this.strm, dict);

	    }

	    if (status === c.Z_BUF_ERROR && allowBufError === true) {
	      status = c.Z_OK;
	      allowBufError = false;
	    }

	    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
	      this.onEnd(status);
	      this.ended = true;
	      return false;
	    }

	    if (strm.next_out) {
	      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

	        if (this.options.to === 'string') {

	          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

	          tail = strm.next_out - next_out_utf8;
	          utf8str = strings.buf2string(strm.output, next_out_utf8);

	          // move tail
	          strm.next_out = tail;
	          strm.avail_out = chunkSize - tail;
	          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

	          this.onData(utf8str);

	        } else {
	          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
	        }
	      }
	    }

	    // When no more input data, we should check that internal inflate buffers
	    // are flushed. The only way to do it when avail_out = 0 - run one more
	    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
	    // Here we set flag to process this error properly.
	    //
	    // NOTE. Deflate does not return error in this case and does not needs such
	    // logic.
	    if (strm.avail_in === 0 && strm.avail_out === 0) {
	      allowBufError = true;
	    }

	  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

	  if (status === c.Z_STREAM_END) {
	    _mode = c.Z_FINISH;
	  }

	  // Finalize on the last chunk.
	  if (_mode === c.Z_FINISH) {
	    status = zlib_inflate.inflateEnd(this.strm);
	    this.onEnd(status);
	    this.ended = true;
	    return status === c.Z_OK;
	  }

	  // callback interim results if Z_SYNC_FLUSH.
	  if (_mode === c.Z_SYNC_FLUSH) {
	    this.onEnd(c.Z_OK);
	    strm.avail_out = 0;
	    return true;
	  }

	  return true;
	};


	/**
	 * Inflate#onData(chunk) -> Void
	 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
	 *   on js engine support. When string output requested, each chunk
	 *   will be string.
	 *
	 * By default, stores data blocks in `chunks[]` property and glue
	 * those in `onEnd`. Override this handler, if you need another behaviour.
	 **/
	Inflate.prototype.onData = function (chunk) {
	  this.chunks.push(chunk);
	};


	/**
	 * Inflate#onEnd(status) -> Void
	 * - status (Number): inflate status. 0 (Z_OK) on success,
	 *   other if not.
	 *
	 * Called either after you tell inflate that the input stream is
	 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
	 * or if an error happened. By default - join collected chunks,
	 * free memory and fill `results` / `err` properties.
	 **/
	Inflate.prototype.onEnd = function (status) {
	  // On success - join
	  if (status === c.Z_OK) {
	    if (this.options.to === 'string') {
	      // Glue & convert here, until we teach pako to send
	      // utf8 alligned strings to onData
	      this.result = this.chunks.join('');
	    } else {
	      this.result = utils.flattenChunks(this.chunks);
	    }
	  }
	  this.chunks = [];
	  this.err = status;
	  this.msg = this.strm.msg;
	};


	/**
	 * inflate(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * Decompress `data` with inflate/ungzip and `options`. Autodetect
	 * format via wrapper header by default. That's why we don't provide
	 * separate `ungzip` method.
	 *
	 * Supported options are:
	 *
	 * - windowBits
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information.
	 *
	 * Sugar (options):
	 *
	 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
	 *   negative windowBits implicitly.
	 * - `to` (String) - if equal to 'string', then result will be converted
	 *   from utf8 to utf16 (javascript) string. When string output requested,
	 *   chunk length can differ from `chunkSize`, depending on content.
	 *
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
	 *   , output;
	 *
	 * try {
	 *   output = pako.inflate(input);
	 * } catch (err)
	 *   console.log(err);
	 * }
	 * ```
	 **/
	function inflate(input, options) {
	  var inflator = new Inflate(options);

	  inflator.push(input, true);

	  // That will never happens, if you don't cheat with options :)
	  if (inflator.err) { throw inflator.msg || msg[inflator.err]; }

	  return inflator.result;
	}


	/**
	 * inflateRaw(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * The same as [[inflate]], but creates raw data, without wrapper
	 * (header and adler32 crc).
	 **/
	function inflateRaw(input, options) {
	  options = options || {};
	  options.raw = true;
	  return inflate(input, options);
	}


	/**
	 * ungzip(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * Just shortcut to [[inflate]], because it autodetects format
	 * by header.content. Done for convenience.
	 **/


	exports.Inflate = Inflate;
	exports.inflate = inflate;
	exports.inflateRaw = inflateRaw;
	exports.ungzip  = inflate;

	},{"./utils/common":62,"./utils/strings":63,"./zlib/constants":65,"./zlib/gzheader":68,"./zlib/inflate":70,"./zlib/messages":72,"./zlib/zstream":74}],62:[function(require,module,exports){


	var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
	                (typeof Uint16Array !== 'undefined') &&
	                (typeof Int32Array !== 'undefined');


	exports.assign = function (obj /*from1, from2, from3, ...*/) {
	  var sources = Array.prototype.slice.call(arguments, 1);
	  while (sources.length) {
	    var source = sources.shift();
	    if (!source) { continue; }

	    if (typeof source !== 'object') {
	      throw new TypeError(source + 'must be non-object');
	    }

	    for (var p in source) {
	      if (source.hasOwnProperty(p)) {
	        obj[p] = source[p];
	      }
	    }
	  }

	  return obj;
	};


	// reduce buffer size, avoiding mem copy
	exports.shrinkBuf = function (buf, size) {
	  if (buf.length === size) { return buf; }
	  if (buf.subarray) { return buf.subarray(0, size); }
	  buf.length = size;
	  return buf;
	};


	var fnTyped = {
	  arraySet: function (dest, src, src_offs, len, dest_offs) {
	    if (src.subarray && dest.subarray) {
	      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
	      return;
	    }
	    // Fallback to ordinary array
	    for (var i = 0; i < len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function (chunks) {
	    var i, l, len, pos, chunk, result;

	    // calculate data length
	    len = 0;
	    for (i = 0, l = chunks.length; i < l; i++) {
	      len += chunks[i].length;
	    }

	    // join chunks
	    result = new Uint8Array(len);
	    pos = 0;
	    for (i = 0, l = chunks.length; i < l; i++) {
	      chunk = chunks[i];
	      result.set(chunk, pos);
	      pos += chunk.length;
	    }

	    return result;
	  }
	};

	var fnUntyped = {
	  arraySet: function (dest, src, src_offs, len, dest_offs) {
	    for (var i = 0; i < len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function (chunks) {
	    return [].concat.apply([], chunks);
	  }
	};


	// Enable/Disable typed arrays use, for testing
	//
	exports.setTyped = function (on) {
	  if (on) {
	    exports.Buf8  = Uint8Array;
	    exports.Buf16 = Uint16Array;
	    exports.Buf32 = Int32Array;
	    exports.assign(exports, fnTyped);
	  } else {
	    exports.Buf8  = Array;
	    exports.Buf16 = Array;
	    exports.Buf32 = Array;
	    exports.assign(exports, fnUntyped);
	  }
	};

	exports.setTyped(TYPED_OK);

	},{}],63:[function(require,module,exports){


	var utils = require('./common');


	// Quick check if we can use fast array to bin string conversion
	//
	// - apply(Array) can fail on Android 2.2
	// - apply(Uint8Array) can fail on iOS 5.1 Safary
	//
	var STR_APPLY_OK = true;
	var STR_APPLY_UIA_OK = true;

	try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
	try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


	// Table with utf8 lengths (calculated by first byte of sequence)
	// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
	// because max possible codepoint is 0x10ffff
	var _utf8len = new utils.Buf8(256);
	for (var q = 0; q < 256; q++) {
	  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
	}
	_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


	// convert string to array (typed, when possible)
	exports.string2buf = function (str) {
	  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

	  // count binary size
	  for (m_pos = 0; m_pos < str_len; m_pos++) {
	    c = str.charCodeAt(m_pos);
	    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
	      c2 = str.charCodeAt(m_pos + 1);
	      if ((c2 & 0xfc00) === 0xdc00) {
	        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
	        m_pos++;
	      }
	    }
	    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
	  }

	  // allocate buffer
	  buf = new utils.Buf8(buf_len);

	  // convert
	  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
	    c = str.charCodeAt(m_pos);
	    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
	      c2 = str.charCodeAt(m_pos + 1);
	      if ((c2 & 0xfc00) === 0xdc00) {
	        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
	        m_pos++;
	      }
	    }
	    if (c < 0x80) {
	      /* one byte */
	      buf[i++] = c;
	    } else if (c < 0x800) {
	      /* two bytes */
	      buf[i++] = 0xC0 | (c >>> 6);
	      buf[i++] = 0x80 | (c & 0x3f);
	    } else if (c < 0x10000) {
	      /* three bytes */
	      buf[i++] = 0xE0 | (c >>> 12);
	      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
	      buf[i++] = 0x80 | (c & 0x3f);
	    } else {
	      /* four bytes */
	      buf[i++] = 0xf0 | (c >>> 18);
	      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
	      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
	      buf[i++] = 0x80 | (c & 0x3f);
	    }
	  }

	  return buf;
	};

	// Helper (used in 2 places)
	function buf2binstring(buf, len) {
	  // use fallback for big arrays to avoid stack overflow
	  if (len < 65537) {
	    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
	      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
	    }
	  }

	  var result = '';
	  for (var i = 0; i < len; i++) {
	    result += String.fromCharCode(buf[i]);
	  }
	  return result;
	}


	// Convert byte array to binary string
	exports.buf2binstring = function (buf) {
	  return buf2binstring(buf, buf.length);
	};


	// Convert binary string (typed, when possible)
	exports.binstring2buf = function (str) {
	  var buf = new utils.Buf8(str.length);
	  for (var i = 0, len = buf.length; i < len; i++) {
	    buf[i] = str.charCodeAt(i);
	  }
	  return buf;
	};


	// convert array to string
	exports.buf2string = function (buf, max) {
	  var i, out, c, c_len;
	  var len = max || buf.length;

	  // Reserve max possible length (2 words per char)
	  // NB: by unknown reasons, Array is significantly faster for
	  //     String.fromCharCode.apply than Uint16Array.
	  var utf16buf = new Array(len * 2);

	  for (out = 0, i = 0; i < len;) {
	    c = buf[i++];
	    // quick process ascii
	    if (c < 0x80) { utf16buf[out++] = c; continue; }

	    c_len = _utf8len[c];
	    // skip 5 & 6 byte codes
	    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

	    // apply mask on first byte
	    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
	    // join the rest
	    while (c_len > 1 && i < len) {
	      c = (c << 6) | (buf[i++] & 0x3f);
	      c_len--;
	    }

	    // terminated by end of string?
	    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

	    if (c < 0x10000) {
	      utf16buf[out++] = c;
	    } else {
	      c -= 0x10000;
	      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
	      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
	    }
	  }

	  return buf2binstring(utf16buf, out);
	};


	// Calculate max possible position in utf8 buffer,
	// that will not break sequence. If that's not possible
	// - (very small limits) return max size as is.
	//
	// buf[] - utf8 bytes array
	// max   - length limit (mandatory);
	exports.utf8border = function (buf, max) {
	  var pos;

	  max = max || buf.length;
	  if (max > buf.length) { max = buf.length; }

	  // go back from last position, until start of sequence found
	  pos = max - 1;
	  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

	  // Fuckup - very small and broken sequence,
	  // return max, because we should return something anyway.
	  if (pos < 0) { return max; }

	  // If we came to start of buffer - that means vuffer is too small,
	  // return max too.
	  if (pos === 0) { return max; }

	  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
	};

	},{"./common":62}],64:[function(require,module,exports){

	// Note: adler32 takes 12% for level 0 and 2% for level 6.
	// It doesn't worth to make additional optimizationa as in original.
	// Small size is preferable.

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	function adler32(adler, buf, len, pos) {
	  var s1 = (adler & 0xffff) |0,
	      s2 = ((adler >>> 16) & 0xffff) |0,
	      n = 0;

	  while (len !== 0) {
	    // Set limit ~ twice less than 5552, to keep
	    // s2 in 31-bits, because we force signed ints.
	    // in other case %= will fail.
	    n = len > 2000 ? 2000 : len;
	    len -= n;

	    do {
	      s1 = (s1 + buf[pos++]) |0;
	      s2 = (s2 + s1) |0;
	    } while (--n);

	    s1 %= 65521;
	    s2 %= 65521;
	  }

	  return (s1 | (s2 << 16)) |0;
	}


	module.exports = adler32;

	},{}],65:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	module.exports = {

	  /* Allowed flush values; see deflate() and inflate() below for details */
	  Z_NO_FLUSH:         0,
	  Z_PARTIAL_FLUSH:    1,
	  Z_SYNC_FLUSH:       2,
	  Z_FULL_FLUSH:       3,
	  Z_FINISH:           4,
	  Z_BLOCK:            5,
	  Z_TREES:            6,

	  /* Return codes for the compression/decompression functions. Negative values
	  * are errors, positive values are used for special but normal events.
	  */
	  Z_OK:               0,
	  Z_STREAM_END:       1,
	  Z_NEED_DICT:        2,
	  Z_ERRNO:           -1,
	  Z_STREAM_ERROR:    -2,
	  Z_DATA_ERROR:      -3,
	  //Z_MEM_ERROR:     -4,
	  Z_BUF_ERROR:       -5,
	  //Z_VERSION_ERROR: -6,

	  /* compression levels */
	  Z_NO_COMPRESSION:         0,
	  Z_BEST_SPEED:             1,
	  Z_BEST_COMPRESSION:       9,
	  Z_DEFAULT_COMPRESSION:   -1,


	  Z_FILTERED:               1,
	  Z_HUFFMAN_ONLY:           2,
	  Z_RLE:                    3,
	  Z_FIXED:                  4,
	  Z_DEFAULT_STRATEGY:       0,

	  /* Possible values of the data_type field (though see inflate()) */
	  Z_BINARY:                 0,
	  Z_TEXT:                   1,
	  //Z_ASCII:                1, // = Z_TEXT (deprecated)
	  Z_UNKNOWN:                2,

	  /* The deflate compression method */
	  Z_DEFLATED:               8
	  //Z_NULL:                 null // Use -1 or null inline, depending on var type
	};

	},{}],66:[function(require,module,exports){

	// Note: we can't get significant speed boost here.
	// So write code to minimize size - no pregenerated tables
	// and array tools dependencies.

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	// Use ordinary array, since untyped makes no boost here
	function makeTable() {
	  var c, table = [];

	  for (var n = 0; n < 256; n++) {
	    c = n;
	    for (var k = 0; k < 8; k++) {
	      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
	    }
	    table[n] = c;
	  }

	  return table;
	}

	// Create table on load. Just 255 signed longs. Not a problem.
	var crcTable = makeTable();


	function crc32(crc, buf, len, pos) {
	  var t = crcTable,
	      end = pos + len;

	  crc ^= -1;

	  for (var i = pos; i < end; i++) {
	    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
	  }

	  return (crc ^ (-1)); // >>> 0;
	}


	module.exports = crc32;

	},{}],67:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	var utils   = require('../utils/common');
	var trees   = require('./trees');
	var adler32 = require('./adler32');
	var crc32   = require('./crc32');
	var msg     = require('./messages');

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	/* Allowed flush values; see deflate() and inflate() below for details */
	var Z_NO_FLUSH      = 0;
	var Z_PARTIAL_FLUSH = 1;
	//var Z_SYNC_FLUSH    = 2;
	var Z_FULL_FLUSH    = 3;
	var Z_FINISH        = 4;
	var Z_BLOCK         = 5;
	//var Z_TREES         = 6;


	/* Return codes for the compression/decompression functions. Negative values
	 * are errors, positive values are used for special but normal events.
	 */
	var Z_OK            = 0;
	var Z_STREAM_END    = 1;
	//var Z_NEED_DICT     = 2;
	//var Z_ERRNO         = -1;
	var Z_STREAM_ERROR  = -2;
	var Z_DATA_ERROR    = -3;
	//var Z_MEM_ERROR     = -4;
	var Z_BUF_ERROR     = -5;
	//var Z_VERSION_ERROR = -6;


	/* compression levels */
	//var Z_NO_COMPRESSION      = 0;
	//var Z_BEST_SPEED          = 1;
	//var Z_BEST_COMPRESSION    = 9;
	var Z_DEFAULT_COMPRESSION = -1;


	var Z_FILTERED            = 1;
	var Z_HUFFMAN_ONLY        = 2;
	var Z_RLE                 = 3;
	var Z_FIXED               = 4;
	var Z_DEFAULT_STRATEGY    = 0;

	/* Possible values of the data_type field (though see inflate()) */
	//var Z_BINARY              = 0;
	//var Z_TEXT                = 1;
	//var Z_ASCII               = 1; // = Z_TEXT
	var Z_UNKNOWN             = 2;


	/* The deflate compression method */
	var Z_DEFLATED  = 8;

	/*============================================================================*/


	var MAX_MEM_LEVEL = 9;
	/* Maximum value for memLevel in deflateInit2 */
	var MAX_WBITS = 15;
	/* 32K LZ77 window */
	var DEF_MEM_LEVEL = 8;


	var LENGTH_CODES  = 29;
	/* number of length codes, not counting the special END_BLOCK code */
	var LITERALS      = 256;
	/* number of literal bytes 0..255 */
	var L_CODES       = LITERALS + 1 + LENGTH_CODES;
	/* number of Literal or Length codes, including the END_BLOCK code */
	var D_CODES       = 30;
	/* number of distance codes */
	var BL_CODES      = 19;
	/* number of codes used to transfer the bit lengths */
	var HEAP_SIZE     = 2 * L_CODES + 1;
	/* maximum heap size */
	var MAX_BITS  = 15;
	/* All codes must not exceed MAX_BITS bits */

	var MIN_MATCH = 3;
	var MAX_MATCH = 258;
	var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

	var PRESET_DICT = 0x20;

	var INIT_STATE = 42;
	var EXTRA_STATE = 69;
	var NAME_STATE = 73;
	var COMMENT_STATE = 91;
	var HCRC_STATE = 103;
	var BUSY_STATE = 113;
	var FINISH_STATE = 666;

	var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
	var BS_BLOCK_DONE     = 2; /* block flush performed */
	var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
	var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

	var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

	function err(strm, errorCode) {
	  strm.msg = msg[errorCode];
	  return errorCode;
	}

	function rank(f) {
	  return ((f) << 1) - ((f) > 4 ? 9 : 0);
	}

	function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


	/* =========================================================================
	 * Flush as much pending output as possible. All deflate() output goes
	 * through this function so some applications may wish to modify it
	 * to avoid allocating a large strm->output buffer and copying into it.
	 * (See also read_buf()).
	 */
	function flush_pending(strm) {
	  var s = strm.state;

	  //_tr_flush_bits(s);
	  var len = s.pending;
	  if (len > strm.avail_out) {
	    len = strm.avail_out;
	  }
	  if (len === 0) { return; }

	  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
	  strm.next_out += len;
	  s.pending_out += len;
	  strm.total_out += len;
	  strm.avail_out -= len;
	  s.pending -= len;
	  if (s.pending === 0) {
	    s.pending_out = 0;
	  }
	}


	function flush_block_only(s, last) {
	  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
	  s.block_start = s.strstart;
	  flush_pending(s.strm);
	}


	function put_byte(s, b) {
	  s.pending_buf[s.pending++] = b;
	}


	/* =========================================================================
	 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
	 * IN assertion: the stream state is correct and there is enough room in
	 * pending_buf.
	 */
	function putShortMSB(s, b) {
	//  put_byte(s, (Byte)(b >> 8));
	//  put_byte(s, (Byte)(b & 0xff));
	  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
	  s.pending_buf[s.pending++] = b & 0xff;
	}


	/* ===========================================================================
	 * Read a new buffer from the current input stream, update the adler32
	 * and total number of bytes read.  All deflate() input goes through
	 * this function so some applications may wish to modify it to avoid
	 * allocating a large strm->input buffer and copying from it.
	 * (See also flush_pending()).
	 */
	function read_buf(strm, buf, start, size) {
	  var len = strm.avail_in;

	  if (len > size) { len = size; }
	  if (len === 0) { return 0; }

	  strm.avail_in -= len;

	  // zmemcpy(buf, strm->next_in, len);
	  utils.arraySet(buf, strm.input, strm.next_in, len, start);
	  if (strm.state.wrap === 1) {
	    strm.adler = adler32(strm.adler, buf, len, start);
	  }

	  else if (strm.state.wrap === 2) {
	    strm.adler = crc32(strm.adler, buf, len, start);
	  }

	  strm.next_in += len;
	  strm.total_in += len;

	  return len;
	}


	/* ===========================================================================
	 * Set match_start to the longest match starting at the given string and
	 * return its length. Matches shorter or equal to prev_length are discarded,
	 * in which case the result is equal to prev_length and match_start is
	 * garbage.
	 * IN assertions: cur_match is the head of the hash chain for the current
	 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
	 * OUT assertion: the match length is not greater than s->lookahead.
	 */
	function longest_match(s, cur_match) {
	  var chain_length = s.max_chain_length;      /* max hash chain length */
	  var scan = s.strstart; /* current string */
	  var match;                       /* matched string */
	  var len;                           /* length of current match */
	  var best_len = s.prev_length;              /* best match length so far */
	  var nice_match = s.nice_match;             /* stop if match long enough */
	  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
	      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

	  var _win = s.window; // shortcut

	  var wmask = s.w_mask;
	  var prev  = s.prev;

	  /* Stop when cur_match becomes <= limit. To simplify the code,
	   * we prevent matches with the string of window index 0.
	   */

	  var strend = s.strstart + MAX_MATCH;
	  var scan_end1  = _win[scan + best_len - 1];
	  var scan_end   = _win[scan + best_len];

	  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
	   * It is easy to get rid of this optimization if necessary.
	   */
	  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

	  /* Do not waste too much time if we already have a good match: */
	  if (s.prev_length >= s.good_match) {
	    chain_length >>= 2;
	  }
	  /* Do not look for matches beyond the end of the input. This is necessary
	   * to make deflate deterministic.
	   */
	  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

	  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

	  do {
	    // Assert(cur_match < s->strstart, "no future");
	    match = cur_match;

	    /* Skip to next match if the match length cannot increase
	     * or if the match length is less than 2.  Note that the checks below
	     * for insufficient lookahead only occur occasionally for performance
	     * reasons.  Therefore uninitialized memory will be accessed, and
	     * conditional jumps will be made that depend on those values.
	     * However the length of the match is limited to the lookahead, so
	     * the output of deflate is not affected by the uninitialized values.
	     */

	    if (_win[match + best_len]     !== scan_end  ||
	        _win[match + best_len - 1] !== scan_end1 ||
	        _win[match]                !== _win[scan] ||
	        _win[++match]              !== _win[scan + 1]) {
	      continue;
	    }

	    /* The check at best_len-1 can be removed because it will be made
	     * again later. (This heuristic is not always a win.)
	     * It is not necessary to compare scan[2] and match[2] since they
	     * are always equal when the other bytes match, given that
	     * the hash keys are equal and that HASH_BITS >= 8.
	     */
	    scan += 2;
	    match++;
	    // Assert(*scan == *match, "match[2]?");

	    /* We check for insufficient lookahead only every 8th comparison;
	     * the 256th check will be made at strstart+258.
	     */
	    do {
	      /*jshint noempty:false*/
	    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             scan < strend);

	    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

	    len = MAX_MATCH - (strend - scan);
	    scan = strend - MAX_MATCH;

	    if (len > best_len) {
	      s.match_start = cur_match;
	      best_len = len;
	      if (len >= nice_match) {
	        break;
	      }
	      scan_end1  = _win[scan + best_len - 1];
	      scan_end   = _win[scan + best_len];
	    }
	  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

	  if (best_len <= s.lookahead) {
	    return best_len;
	  }
	  return s.lookahead;
	}


	/* ===========================================================================
	 * Fill the window when the lookahead becomes insufficient.
	 * Updates strstart and lookahead.
	 *
	 * IN assertion: lookahead < MIN_LOOKAHEAD
	 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
	 *    At least one byte has been read, or avail_in == 0; reads are
	 *    performed for at least two bytes (required for the zip translate_eol
	 *    option -- not supported here).
	 */
	function fill_window(s) {
	  var _w_size = s.w_size;
	  var p, n, m, more, str;

	  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

	  do {
	    more = s.window_size - s.lookahead - s.strstart;

	    // JS ints have 32 bit, block below not needed
	    /* Deal with !@#$% 64K limit: */
	    //if (sizeof(int) <= 2) {
	    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
	    //        more = wsize;
	    //
	    //  } else if (more == (unsigned)(-1)) {
	    //        /* Very unlikely, but possible on 16 bit machine if
	    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
	    //         */
	    //        more--;
	    //    }
	    //}


	    /* If the window is almost full and there is insufficient lookahead,
	     * move the upper half to the lower one to make room in the upper half.
	     */
	    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

	      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
	      s.match_start -= _w_size;
	      s.strstart -= _w_size;
	      /* we now have strstart >= MAX_DIST */
	      s.block_start -= _w_size;

	      /* Slide the hash table (could be avoided with 32 bit values
	       at the expense of memory usage). We slide even when level == 0
	       to keep the hash table consistent if we switch back to level > 0
	       later. (Using level 0 permanently is not an optimal usage of
	       zlib, so we don't care about this pathological case.)
	       */

	      n = s.hash_size;
	      p = n;
	      do {
	        m = s.head[--p];
	        s.head[p] = (m >= _w_size ? m - _w_size : 0);
	      } while (--n);

	      n = _w_size;
	      p = n;
	      do {
	        m = s.prev[--p];
	        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
	        /* If n is not on any hash chain, prev[n] is garbage but
	         * its value will never be used.
	         */
	      } while (--n);

	      more += _w_size;
	    }
	    if (s.strm.avail_in === 0) {
	      break;
	    }

	    /* If there was no sliding:
	     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
	     *    more == window_size - lookahead - strstart
	     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
	     * => more >= window_size - 2*WSIZE + 2
	     * In the BIG_MEM or MMAP case (not yet supported),
	     *   window_size == input_size + MIN_LOOKAHEAD  &&
	     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
	     * Otherwise, window_size == 2*WSIZE so more >= 2.
	     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
	     */
	    //Assert(more >= 2, "more < 2");
	    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
	    s.lookahead += n;

	    /* Initialize the hash value now that we have some input: */
	    if (s.lookahead + s.insert >= MIN_MATCH) {
	      str = s.strstart - s.insert;
	      s.ins_h = s.window[str];

	      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
	//#if MIN_MATCH != 3
	//        Call update_hash() MIN_MATCH-3 more times
	//#endif
	      while (s.insert) {
	        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
	        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

	        s.prev[str & s.w_mask] = s.head[s.ins_h];
	        s.head[s.ins_h] = str;
	        str++;
	        s.insert--;
	        if (s.lookahead + s.insert < MIN_MATCH) {
	          break;
	        }
	      }
	    }
	    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
	     * but this is not important since only literal bytes will be emitted.
	     */

	  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

	  /* If the WIN_INIT bytes after the end of the current data have never been
	   * written, then zero those bytes in order to avoid memory check reports of
	   * the use of uninitialized (or uninitialised as Julian writes) bytes by
	   * the longest match routines.  Update the high water mark for the next
	   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
	   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
	   */
	//  if (s.high_water < s.window_size) {
	//    var curr = s.strstart + s.lookahead;
	//    var init = 0;
	//
	//    if (s.high_water < curr) {
	//      /* Previous high water mark below current data -- zero WIN_INIT
	//       * bytes or up to end of window, whichever is less.
	//       */
	//      init = s.window_size - curr;
	//      if (init > WIN_INIT)
	//        init = WIN_INIT;
	//      zmemzero(s->window + curr, (unsigned)init);
	//      s->high_water = curr + init;
	//    }
	//    else if (s->high_water < (ulg)curr + WIN_INIT) {
	//      /* High water mark at or above current data, but below current data
	//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
	//       * to end of window, whichever is less.
	//       */
	//      init = (ulg)curr + WIN_INIT - s->high_water;
	//      if (init > s->window_size - s->high_water)
	//        init = s->window_size - s->high_water;
	//      zmemzero(s->window + s->high_water, (unsigned)init);
	//      s->high_water += init;
	//    }
	//  }
	//
	//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
	//    "not enough room for search");
	}

	/* ===========================================================================
	 * Copy without compression as much as possible from the input stream, return
	 * the current block state.
	 * This function does not insert new strings in the dictionary since
	 * uncompressible data is probably not useful. This function is used
	 * only for the level=0 compression option.
	 * NOTE: this function should be optimized to avoid extra copying from
	 * window to pending_buf.
	 */
	function deflate_stored(s, flush) {
	  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
	   * to pending_buf_size, and each stored block has a 5 byte header:
	   */
	  var max_block_size = 0xffff;

	  if (max_block_size > s.pending_buf_size - 5) {
	    max_block_size = s.pending_buf_size - 5;
	  }

	  /* Copy as much as possible from input to output: */
	  for (;;) {
	    /* Fill the window as much as possible: */
	    if (s.lookahead <= 1) {

	      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
	      //  s->block_start >= (long)s->w_size, "slide too late");
	//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
	//        s.block_start >= s.w_size)) {
	//        throw  new Error("slide too late");
	//      }

	      fill_window(s);
	      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }

	      if (s.lookahead === 0) {
	        break;
	      }
	      /* flush the current block */
	    }
	    //Assert(s->block_start >= 0L, "block gone");
	//    if (s.block_start < 0) throw new Error("block gone");

	    s.strstart += s.lookahead;
	    s.lookahead = 0;

	    /* Emit a stored block if pending_buf will be full: */
	    var max_start = s.block_start + max_block_size;

	    if (s.strstart === 0 || s.strstart >= max_start) {
	      /* strstart == 0 is possible when wraparound on 16-bit machine */
	      s.lookahead = s.strstart - max_start;
	      s.strstart = max_start;
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/


	    }
	    /* Flush if we may have to slide, otherwise block_start may become
	     * negative and the data will be gone:
	     */
	    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }

	  s.insert = 0;

	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }

	  if (s.strstart > s.block_start) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }

	  return BS_NEED_MORE;
	}

	/* ===========================================================================
	 * Compress as much as possible from the input stream, return the current
	 * block state.
	 * This function does not perform lazy evaluation of matches and inserts
	 * new strings in the dictionary only for unmatched strings or for short
	 * matches. It is used only for the fast compression options.
	 */
	function deflate_fast(s, flush) {
	  var hash_head;        /* head of the hash chain */
	  var bflush;           /* set if current block must be flushed */

	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the next match, plus MIN_MATCH bytes to insert the
	     * string following the next match.
	     */
	    if (s.lookahead < MIN_LOOKAHEAD) {
	      fill_window(s);
	      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) {
	        break; /* flush the current block */
	      }
	    }

	    /* Insert the string window[strstart .. strstart+2] in the
	     * dictionary, and set hash_head to the head of the hash chain:
	     */
	    hash_head = 0/*NIL*/;
	    if (s.lookahead >= MIN_MATCH) {
	      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	      s.head[s.ins_h] = s.strstart;
	      /***/
	    }

	    /* Find the longest match, discarding those <= prev_length.
	     * At this point we have always match_length < MIN_MATCH
	     */
	    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
	      /* To simplify the code, we prevent matches with the string
	       * of window index 0 (in particular we have to avoid a match
	       * of the string with itself at the start of the input file).
	       */
	      s.match_length = longest_match(s, hash_head);
	      /* longest_match() sets match_start */
	    }
	    if (s.match_length >= MIN_MATCH) {
	      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

	      /*** _tr_tally_dist(s, s.strstart - s.match_start,
	                     s.match_length - MIN_MATCH, bflush); ***/
	      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

	      s.lookahead -= s.match_length;

	      /* Insert new strings in the hash table only if the match length
	       * is not too large. This saves time but degrades compression.
	       */
	      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
	        s.match_length--; /* string at strstart already in table */
	        do {
	          s.strstart++;
	          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	          s.head[s.ins_h] = s.strstart;
	          /***/
	          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
	           * always MIN_MATCH bytes ahead.
	           */
	        } while (--s.match_length !== 0);
	        s.strstart++;
	      } else
	      {
	        s.strstart += s.match_length;
	        s.match_length = 0;
	        s.ins_h = s.window[s.strstart];
	        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
	        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

	//#if MIN_MATCH != 3
	//                Call UPDATE_HASH() MIN_MATCH-3 more times
	//#endif
	        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
	         * matter since it will be recomputed at next deflate call.
	         */
	      }
	    } else {
	      /* No match, output a literal byte */
	      //Tracevv((stderr,"%c", s.window[s.strstart]));
	      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

	      s.lookahead--;
	      s.strstart++;
	    }
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* ===========================================================================
	 * Same as above, but achieves better compression. We use a lazy
	 * evaluation for matches: a match is finally adopted only if there is
	 * no better match at the next window position.
	 */
	function deflate_slow(s, flush) {
	  var hash_head;          /* head of hash chain */
	  var bflush;              /* set if current block must be flushed */

	  var max_insert;

	  /* Process the input block. */
	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the next match, plus MIN_MATCH bytes to insert the
	     * string following the next match.
	     */
	    if (s.lookahead < MIN_LOOKAHEAD) {
	      fill_window(s);
	      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) { break; } /* flush the current block */
	    }

	    /* Insert the string window[strstart .. strstart+2] in the
	     * dictionary, and set hash_head to the head of the hash chain:
	     */
	    hash_head = 0/*NIL*/;
	    if (s.lookahead >= MIN_MATCH) {
	      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	      s.head[s.ins_h] = s.strstart;
	      /***/
	    }

	    /* Find the longest match, discarding those <= prev_length.
	     */
	    s.prev_length = s.match_length;
	    s.prev_match = s.match_start;
	    s.match_length = MIN_MATCH - 1;

	    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
	        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
	      /* To simplify the code, we prevent matches with the string
	       * of window index 0 (in particular we have to avoid a match
	       * of the string with itself at the start of the input file).
	       */
	      s.match_length = longest_match(s, hash_head);
	      /* longest_match() sets match_start */

	      if (s.match_length <= 5 &&
	         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

	        /* If prev_match is also MIN_MATCH, match_start is garbage
	         * but we will ignore the current match anyway.
	         */
	        s.match_length = MIN_MATCH - 1;
	      }
	    }
	    /* If there was a match at the previous step and the current
	     * match is not better, output the previous match:
	     */
	    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
	      max_insert = s.strstart + s.lookahead - MIN_MATCH;
	      /* Do not insert strings in hash table beyond this. */

	      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

	      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
	                     s.prev_length - MIN_MATCH, bflush);***/
	      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
	      /* Insert in hash table all strings up to the end of the match.
	       * strstart-1 and strstart are already inserted. If there is not
	       * enough lookahead, the last two strings are not inserted in
	       * the hash table.
	       */
	      s.lookahead -= s.prev_length - 1;
	      s.prev_length -= 2;
	      do {
	        if (++s.strstart <= max_insert) {
	          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	          s.head[s.ins_h] = s.strstart;
	          /***/
	        }
	      } while (--s.prev_length !== 0);
	      s.match_available = 0;
	      s.match_length = MIN_MATCH - 1;
	      s.strstart++;

	      if (bflush) {
	        /*** FLUSH_BLOCK(s, 0); ***/
	        flush_block_only(s, false);
	        if (s.strm.avail_out === 0) {
	          return BS_NEED_MORE;
	        }
	        /***/
	      }

	    } else if (s.match_available) {
	      /* If there was no match at the previous position, output a
	       * single literal. If there was a match but the current match
	       * is longer, truncate the previous match to a single literal.
	       */
	      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
	      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

	      if (bflush) {
	        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
	        flush_block_only(s, false);
	        /***/
	      }
	      s.strstart++;
	      s.lookahead--;
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	    } else {
	      /* There is no previous match to compare with, wait for
	       * the next step to decide.
	       */
	      s.match_available = 1;
	      s.strstart++;
	      s.lookahead--;
	    }
	  }
	  //Assert (flush != Z_NO_FLUSH, "no flush?");
	  if (s.match_available) {
	    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
	    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
	    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

	    s.match_available = 0;
	  }
	  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }

	  return BS_BLOCK_DONE;
	}


	/* ===========================================================================
	 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
	 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
	 * deflate switches away from Z_RLE.)
	 */
	function deflate_rle(s, flush) {
	  var bflush;            /* set if current block must be flushed */
	  var prev;              /* byte at distance one to match */
	  var scan, strend;      /* scan goes up to strend for length of run */

	  var _win = s.window;

	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the longest run, plus one for the unrolled loop.
	     */
	    if (s.lookahead <= MAX_MATCH) {
	      fill_window(s);
	      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) { break; } /* flush the current block */
	    }

	    /* See how many times the previous byte repeats */
	    s.match_length = 0;
	    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
	      scan = s.strstart - 1;
	      prev = _win[scan];
	      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
	        strend = s.strstart + MAX_MATCH;
	        do {
	          /*jshint noempty:false*/
	        } while (prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 scan < strend);
	        s.match_length = MAX_MATCH - (strend - scan);
	        if (s.match_length > s.lookahead) {
	          s.match_length = s.lookahead;
	        }
	      }
	      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
	    }

	    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
	    if (s.match_length >= MIN_MATCH) {
	      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

	      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
	      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

	      s.lookahead -= s.match_length;
	      s.strstart += s.match_length;
	      s.match_length = 0;
	    } else {
	      /* No match, output a literal byte */
	      //Tracevv((stderr,"%c", s->window[s->strstart]));
	      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

	      s.lookahead--;
	      s.strstart++;
	    }
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = 0;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* ===========================================================================
	 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
	 * (It will be regenerated if this run of deflate switches away from Huffman.)
	 */
	function deflate_huff(s, flush) {
	  var bflush;             /* set if current block must be flushed */

	  for (;;) {
	    /* Make sure that we have a literal to write. */
	    if (s.lookahead === 0) {
	      fill_window(s);
	      if (s.lookahead === 0) {
	        if (flush === Z_NO_FLUSH) {
	          return BS_NEED_MORE;
	        }
	        break;      /* flush the current block */
	      }
	    }

	    /* Output a literal byte */
	    s.match_length = 0;
	    //Tracevv((stderr,"%c", s->window[s->strstart]));
	    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
	    s.lookahead--;
	    s.strstart++;
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = 0;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* Values for max_lazy_match, good_match and max_chain_length, depending on
	 * the desired pack level (0..9). The values given below have been tuned to
	 * exclude worst case performance for pathological files. Better values may be
	 * found for specific files.
	 */
	function Config(good_length, max_lazy, nice_length, max_chain, func) {
	  this.good_length = good_length;
	  this.max_lazy = max_lazy;
	  this.nice_length = nice_length;
	  this.max_chain = max_chain;
	  this.func = func;
	}

	var configuration_table;

	configuration_table = [
	  /*      good lazy nice chain */
	  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
	  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
	  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
	  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

	  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
	  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
	  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
	  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
	  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
	  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
	];


	/* ===========================================================================
	 * Initialize the "longest match" routines for a new zlib stream
	 */
	function lm_init(s) {
	  s.window_size = 2 * s.w_size;

	  /*** CLEAR_HASH(s); ***/
	  zero(s.head); // Fill with NIL (= 0);

	  /* Set the default configuration parameters:
	   */
	  s.max_lazy_match = configuration_table[s.level].max_lazy;
	  s.good_match = configuration_table[s.level].good_length;
	  s.nice_match = configuration_table[s.level].nice_length;
	  s.max_chain_length = configuration_table[s.level].max_chain;

	  s.strstart = 0;
	  s.block_start = 0;
	  s.lookahead = 0;
	  s.insert = 0;
	  s.match_length = s.prev_length = MIN_MATCH - 1;
	  s.match_available = 0;
	  s.ins_h = 0;
	}


	function DeflateState() {
	  this.strm = null;            /* pointer back to this zlib stream */
	  this.status = 0;            /* as the name implies */
	  this.pending_buf = null;      /* output still pending */
	  this.pending_buf_size = 0;  /* size of pending_buf */
	  this.pending_out = 0;       /* next pending byte to output to the stream */
	  this.pending = 0;           /* nb of bytes in the pending buffer */
	  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
	  this.gzhead = null;         /* gzip header information to write */
	  this.gzindex = 0;           /* where in extra, name, or comment */
	  this.method = Z_DEFLATED; /* can only be DEFLATED */
	  this.last_flush = -1;   /* value of flush param for previous deflate call */

	  this.w_size = 0;  /* LZ77 window size (32K by default) */
	  this.w_bits = 0;  /* log2(w_size)  (8..16) */
	  this.w_mask = 0;  /* w_size - 1 */

	  this.window = null;
	  /* Sliding window. Input bytes are read into the second half of the window,
	   * and move to the first half later to keep a dictionary of at least wSize
	   * bytes. With this organization, matches are limited to a distance of
	   * wSize-MAX_MATCH bytes, but this ensures that IO is always
	   * performed with a length multiple of the block size.
	   */

	  this.window_size = 0;
	  /* Actual size of window: 2*wSize, except when the user input buffer
	   * is directly used as sliding window.
	   */

	  this.prev = null;
	  /* Link to older string with same hash index. To limit the size of this
	   * array to 64K, this link is maintained only for the last 32K strings.
	   * An index in this array is thus a window index modulo 32K.
	   */

	  this.head = null;   /* Heads of the hash chains or NIL. */

	  this.ins_h = 0;       /* hash index of string to be inserted */
	  this.hash_size = 0;   /* number of elements in hash table */
	  this.hash_bits = 0;   /* log2(hash_size) */
	  this.hash_mask = 0;   /* hash_size-1 */

	  this.hash_shift = 0;
	  /* Number of bits by which ins_h must be shifted at each input
	   * step. It must be such that after MIN_MATCH steps, the oldest
	   * byte no longer takes part in the hash key, that is:
	   *   hash_shift * MIN_MATCH >= hash_bits
	   */

	  this.block_start = 0;
	  /* Window position at the beginning of the current output block. Gets
	   * negative when the window is moved backwards.
	   */

	  this.match_length = 0;      /* length of best match */
	  this.prev_match = 0;        /* previous match */
	  this.match_available = 0;   /* set if previous match exists */
	  this.strstart = 0;          /* start of string to insert */
	  this.match_start = 0;       /* start of matching string */
	  this.lookahead = 0;         /* number of valid bytes ahead in window */

	  this.prev_length = 0;
	  /* Length of the best match at previous step. Matches not greater than this
	   * are discarded. This is used in the lazy match evaluation.
	   */

	  this.max_chain_length = 0;
	  /* To speed up deflation, hash chains are never searched beyond this
	   * length.  A higher limit improves compression ratio but degrades the
	   * speed.
	   */

	  this.max_lazy_match = 0;
	  /* Attempt to find a better match only when the current match is strictly
	   * smaller than this value. This mechanism is used only for compression
	   * levels >= 4.
	   */
	  // That's alias to max_lazy_match, don't use directly
	  //this.max_insert_length = 0;
	  /* Insert new strings in the hash table only if the match length is not
	   * greater than this length. This saves time but degrades compression.
	   * max_insert_length is used only for compression levels <= 3.
	   */

	  this.level = 0;     /* compression level (1..9) */
	  this.strategy = 0;  /* favor or force Huffman coding*/

	  this.good_match = 0;
	  /* Use a faster search when the previous match is longer than this */

	  this.nice_match = 0; /* Stop searching when current match exceeds this */

	              /* used by trees.c: */

	  /* Didn't use ct_data typedef below to suppress compiler warning */

	  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
	  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
	  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

	  // Use flat array of DOUBLE size, with interleaved fata,
	  // because JS does not support effective
	  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
	  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
	  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
	  zero(this.dyn_ltree);
	  zero(this.dyn_dtree);
	  zero(this.bl_tree);

	  this.l_desc   = null;         /* desc. for literal tree */
	  this.d_desc   = null;         /* desc. for distance tree */
	  this.bl_desc  = null;         /* desc. for bit length tree */

	  //ush bl_count[MAX_BITS+1];
	  this.bl_count = new utils.Buf16(MAX_BITS + 1);
	  /* number of codes at each bit length for an optimal tree */

	  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
	  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
	  zero(this.heap);

	  this.heap_len = 0;               /* number of elements in the heap */
	  this.heap_max = 0;               /* element of largest frequency */
	  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
	   * The same heap array is used to build all trees.
	   */

	  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
	  zero(this.depth);
	  /* Depth of each subtree used as tie breaker for trees of equal frequency
	   */

	  this.l_buf = 0;          /* buffer index for literals or lengths */

	  this.lit_bufsize = 0;
	  /* Size of match buffer for literals/lengths.  There are 4 reasons for
	   * limiting lit_bufsize to 64K:
	   *   - frequencies can be kept in 16 bit counters
	   *   - if compression is not successful for the first block, all input
	   *     data is still in the window so we can still emit a stored block even
	   *     when input comes from standard input.  (This can also be done for
	   *     all blocks if lit_bufsize is not greater than 32K.)
	   *   - if compression is not successful for a file smaller than 64K, we can
	   *     even emit a stored file instead of a stored block (saving 5 bytes).
	   *     This is applicable only for zip (not gzip or zlib).
	   *   - creating new Huffman trees less frequently may not provide fast
	   *     adaptation to changes in the input data statistics. (Take for
	   *     example a binary file with poorly compressible code followed by
	   *     a highly compressible string table.) Smaller buffer sizes give
	   *     fast adaptation but have of course the overhead of transmitting
	   *     trees more frequently.
	   *   - I can't count above 4
	   */

	  this.last_lit = 0;      /* running index in l_buf */

	  this.d_buf = 0;
	  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
	   * the same number of elements. To use different lengths, an extra flag
	   * array would be necessary.
	   */

	  this.opt_len = 0;       /* bit length of current block with optimal trees */
	  this.static_len = 0;    /* bit length of current block with static trees */
	  this.matches = 0;       /* number of string matches in current block */
	  this.insert = 0;        /* bytes at end of window left to insert */


	  this.bi_buf = 0;
	  /* Output buffer. bits are inserted starting at the bottom (least
	   * significant bits).
	   */
	  this.bi_valid = 0;
	  /* Number of valid bits in bi_buf.  All bits above the last valid bit
	   * are always zero.
	   */

	  // Used for window memory init. We safely ignore it for JS. That makes
	  // sense only for pointers and memory check tools.
	  //this.high_water = 0;
	  /* High water mark offset in window for initialized bytes -- bytes above
	   * this are set to zero in order to avoid memory check warnings when
	   * longest match routines access bytes past the input.  This is then
	   * updated to the new high water mark.
	   */
	}


	function deflateResetKeep(strm) {
	  var s;

	  if (!strm || !strm.state) {
	    return err(strm, Z_STREAM_ERROR);
	  }

	  strm.total_in = strm.total_out = 0;
	  strm.data_type = Z_UNKNOWN;

	  s = strm.state;
	  s.pending = 0;
	  s.pending_out = 0;

	  if (s.wrap < 0) {
	    s.wrap = -s.wrap;
	    /* was made negative by deflate(..., Z_FINISH); */
	  }
	  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
	  strm.adler = (s.wrap === 2) ?
	    0  // crc32(0, Z_NULL, 0)
	  :
	    1; // adler32(0, Z_NULL, 0)
	  s.last_flush = Z_NO_FLUSH;
	  trees._tr_init(s);
	  return Z_OK;
	}


	function deflateReset(strm) {
	  var ret = deflateResetKeep(strm);
	  if (ret === Z_OK) {
	    lm_init(strm.state);
	  }
	  return ret;
	}


	function deflateSetHeader(strm, head) {
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
	  strm.state.gzhead = head;
	  return Z_OK;
	}


	function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
	  if (!strm) { // === Z_NULL
	    return Z_STREAM_ERROR;
	  }
	  var wrap = 1;

	  if (level === Z_DEFAULT_COMPRESSION) {
	    level = 6;
	  }

	  if (windowBits < 0) { /* suppress zlib wrapper */
	    wrap = 0;
	    windowBits = -windowBits;
	  }

	  else if (windowBits > 15) {
	    wrap = 2;           /* write gzip wrapper instead */
	    windowBits -= 16;
	  }


	  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
	    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
	    strategy < 0 || strategy > Z_FIXED) {
	    return err(strm, Z_STREAM_ERROR);
	  }


	  if (windowBits === 8) {
	    windowBits = 9;
	  }
	  /* until 256-byte window bug fixed */

	  var s = new DeflateState();

	  strm.state = s;
	  s.strm = strm;

	  s.wrap = wrap;
	  s.gzhead = null;
	  s.w_bits = windowBits;
	  s.w_size = 1 << s.w_bits;
	  s.w_mask = s.w_size - 1;

	  s.hash_bits = memLevel + 7;
	  s.hash_size = 1 << s.hash_bits;
	  s.hash_mask = s.hash_size - 1;
	  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

	  s.window = new utils.Buf8(s.w_size * 2);
	  s.head = new utils.Buf16(s.hash_size);
	  s.prev = new utils.Buf16(s.w_size);

	  // Don't need mem init magic for JS.
	  //s.high_water = 0;  /* nothing written to s->window yet */

	  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

	  s.pending_buf_size = s.lit_bufsize * 4;

	  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
	  //s->pending_buf = (uchf *) overlay;
	  s.pending_buf = new utils.Buf8(s.pending_buf_size);

	  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
	  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
	  s.d_buf = 1 * s.lit_bufsize;

	  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
	  s.l_buf = (1 + 2) * s.lit_bufsize;

	  s.level = level;
	  s.strategy = strategy;
	  s.method = method;

	  return deflateReset(strm);
	}

	function deflateInit(strm, level) {
	  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
	}


	function deflate(strm, flush) {
	  var old_flush, s;
	  var beg, val; // for gzip header write only

	  if (!strm || !strm.state ||
	    flush > Z_BLOCK || flush < 0) {
	    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
	  }

	  s = strm.state;

	  if (!strm.output ||
	      (!strm.input && strm.avail_in !== 0) ||
	      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
	    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
	  }

	  s.strm = strm; /* just in case */
	  old_flush = s.last_flush;
	  s.last_flush = flush;

	  /* Write the header */
	  if (s.status === INIT_STATE) {

	    if (s.wrap === 2) { // GZIP header
	      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
	      put_byte(s, 31);
	      put_byte(s, 139);
	      put_byte(s, 8);
	      if (!s.gzhead) { // s->gzhead == Z_NULL
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, s.level === 9 ? 2 :
	                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
	                     4 : 0));
	        put_byte(s, OS_CODE);
	        s.status = BUSY_STATE;
	      }
	      else {
	        put_byte(s, (s.gzhead.text ? 1 : 0) +
	                    (s.gzhead.hcrc ? 2 : 0) +
	                    (!s.gzhead.extra ? 0 : 4) +
	                    (!s.gzhead.name ? 0 : 8) +
	                    (!s.gzhead.comment ? 0 : 16)
	                );
	        put_byte(s, s.gzhead.time & 0xff);
	        put_byte(s, (s.gzhead.time >> 8) & 0xff);
	        put_byte(s, (s.gzhead.time >> 16) & 0xff);
	        put_byte(s, (s.gzhead.time >> 24) & 0xff);
	        put_byte(s, s.level === 9 ? 2 :
	                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
	                     4 : 0));
	        put_byte(s, s.gzhead.os & 0xff);
	        if (s.gzhead.extra && s.gzhead.extra.length) {
	          put_byte(s, s.gzhead.extra.length & 0xff);
	          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
	        }
	        if (s.gzhead.hcrc) {
	          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
	        }
	        s.gzindex = 0;
	        s.status = EXTRA_STATE;
	      }
	    }
	    else // DEFLATE header
	    {
	      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
	      var level_flags = -1;

	      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
	        level_flags = 0;
	      } else if (s.level < 6) {
	        level_flags = 1;
	      } else if (s.level === 6) {
	        level_flags = 2;
	      } else {
	        level_flags = 3;
	      }
	      header |= (level_flags << 6);
	      if (s.strstart !== 0) { header |= PRESET_DICT; }
	      header += 31 - (header % 31);

	      s.status = BUSY_STATE;
	      putShortMSB(s, header);

	      /* Save the adler32 of the preset dictionary: */
	      if (s.strstart !== 0) {
	        putShortMSB(s, strm.adler >>> 16);
	        putShortMSB(s, strm.adler & 0xffff);
	      }
	      strm.adler = 1; // adler32(0L, Z_NULL, 0);
	    }
	  }

	//#ifdef GZIP
	  if (s.status === EXTRA_STATE) {
	    if (s.gzhead.extra/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */

	      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            break;
	          }
	        }
	        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
	        s.gzindex++;
	      }
	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (s.gzindex === s.gzhead.extra.length) {
	        s.gzindex = 0;
	        s.status = NAME_STATE;
	      }
	    }
	    else {
	      s.status = NAME_STATE;
	    }
	  }
	  if (s.status === NAME_STATE) {
	    if (s.gzhead.name/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */
	      //int val;

	      do {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            val = 1;
	            break;
	          }
	        }
	        // JS specific: little magic to add zero terminator to end of string
	        if (s.gzindex < s.gzhead.name.length) {
	          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
	        } else {
	          val = 0;
	        }
	        put_byte(s, val);
	      } while (val !== 0);

	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (val === 0) {
	        s.gzindex = 0;
	        s.status = COMMENT_STATE;
	      }
	    }
	    else {
	      s.status = COMMENT_STATE;
	    }
	  }
	  if (s.status === COMMENT_STATE) {
	    if (s.gzhead.comment/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */
	      //int val;

	      do {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            val = 1;
	            break;
	          }
	        }
	        // JS specific: little magic to add zero terminator to end of string
	        if (s.gzindex < s.gzhead.comment.length) {
	          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
	        } else {
	          val = 0;
	        }
	        put_byte(s, val);
	      } while (val !== 0);

	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (val === 0) {
	        s.status = HCRC_STATE;
	      }
	    }
	    else {
	      s.status = HCRC_STATE;
	    }
	  }
	  if (s.status === HCRC_STATE) {
	    if (s.gzhead.hcrc) {
	      if (s.pending + 2 > s.pending_buf_size) {
	        flush_pending(strm);
	      }
	      if (s.pending + 2 <= s.pending_buf_size) {
	        put_byte(s, strm.adler & 0xff);
	        put_byte(s, (strm.adler >> 8) & 0xff);
	        strm.adler = 0; //crc32(0L, Z_NULL, 0);
	        s.status = BUSY_STATE;
	      }
	    }
	    else {
	      s.status = BUSY_STATE;
	    }
	  }
	//#endif

	  /* Flush as much pending output as possible */
	  if (s.pending !== 0) {
	    flush_pending(strm);
	    if (strm.avail_out === 0) {
	      /* Since avail_out is 0, deflate will be called again with
	       * more output space, but possibly with both pending and
	       * avail_in equal to zero. There won't be anything to do,
	       * but this is not an error situation so make sure we
	       * return OK instead of BUF_ERROR at next call of deflate:
	       */
	      s.last_flush = -1;
	      return Z_OK;
	    }

	    /* Make sure there is something to do and avoid duplicate consecutive
	     * flushes. For repeated and useless calls with Z_FINISH, we keep
	     * returning Z_STREAM_END instead of Z_BUF_ERROR.
	     */
	  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
	    flush !== Z_FINISH) {
	    return err(strm, Z_BUF_ERROR);
	  }

	  /* User must not provide more input after the first FINISH: */
	  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
	    return err(strm, Z_BUF_ERROR);
	  }

	  /* Start a new block or continue the current one.
	   */
	  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
	    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
	    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
	      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
	        configuration_table[s.level].func(s, flush));

	    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
	      s.status = FINISH_STATE;
	    }
	    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
	      if (strm.avail_out === 0) {
	        s.last_flush = -1;
	        /* avoid BUF_ERROR next call, see above */
	      }
	      return Z_OK;
	      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
	       * of deflate should use the same flush parameter to make sure
	       * that the flush is complete. So we don't have to output an
	       * empty block here, this will be done at next call. This also
	       * ensures that for a very small output buffer, we emit at most
	       * one empty block.
	       */
	    }
	    if (bstate === BS_BLOCK_DONE) {
	      if (flush === Z_PARTIAL_FLUSH) {
	        trees._tr_align(s);
	      }
	      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

	        trees._tr_stored_block(s, 0, 0, false);
	        /* For a full flush, this empty block will be recognized
	         * as a special marker by inflate_sync().
	         */
	        if (flush === Z_FULL_FLUSH) {
	          /*** CLEAR_HASH(s); ***/             /* forget history */
	          zero(s.head); // Fill with NIL (= 0);

	          if (s.lookahead === 0) {
	            s.strstart = 0;
	            s.block_start = 0;
	            s.insert = 0;
	          }
	        }
	      }
	      flush_pending(strm);
	      if (strm.avail_out === 0) {
	        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
	        return Z_OK;
	      }
	    }
	  }
	  //Assert(strm->avail_out > 0, "bug2");
	  //if (strm.avail_out <= 0) { throw new Error("bug2");}

	  if (flush !== Z_FINISH) { return Z_OK; }
	  if (s.wrap <= 0) { return Z_STREAM_END; }

	  /* Write the trailer */
	  if (s.wrap === 2) {
	    put_byte(s, strm.adler & 0xff);
	    put_byte(s, (strm.adler >> 8) & 0xff);
	    put_byte(s, (strm.adler >> 16) & 0xff);
	    put_byte(s, (strm.adler >> 24) & 0xff);
	    put_byte(s, strm.total_in & 0xff);
	    put_byte(s, (strm.total_in >> 8) & 0xff);
	    put_byte(s, (strm.total_in >> 16) & 0xff);
	    put_byte(s, (strm.total_in >> 24) & 0xff);
	  }
	  else
	  {
	    putShortMSB(s, strm.adler >>> 16);
	    putShortMSB(s, strm.adler & 0xffff);
	  }

	  flush_pending(strm);
	  /* If avail_out is zero, the application will call deflate again
	   * to flush the rest.
	   */
	  if (s.wrap > 0) { s.wrap = -s.wrap; }
	  /* write the trailer only once! */
	  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
	}

	function deflateEnd(strm) {
	  var status;

	  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
	    return Z_STREAM_ERROR;
	  }

	  status = strm.state.status;
	  if (status !== INIT_STATE &&
	    status !== EXTRA_STATE &&
	    status !== NAME_STATE &&
	    status !== COMMENT_STATE &&
	    status !== HCRC_STATE &&
	    status !== BUSY_STATE &&
	    status !== FINISH_STATE
	  ) {
	    return err(strm, Z_STREAM_ERROR);
	  }

	  strm.state = null;

	  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
	}


	/* =========================================================================
	 * Initializes the compression dictionary from the given byte
	 * sequence without producing any compressed output.
	 */
	function deflateSetDictionary(strm, dictionary) {
	  var dictLength = dictionary.length;

	  var s;
	  var str, n;
	  var wrap;
	  var avail;
	  var next;
	  var input;
	  var tmpDict;

	  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
	    return Z_STREAM_ERROR;
	  }

	  s = strm.state;
	  wrap = s.wrap;

	  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
	    return Z_STREAM_ERROR;
	  }

	  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
	  if (wrap === 1) {
	    /* adler32(strm->adler, dictionary, dictLength); */
	    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
	  }

	  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

	  /* if dictionary would fill window, just replace the history */
	  if (dictLength >= s.w_size) {
	    if (wrap === 0) {            /* already empty otherwise */
	      /*** CLEAR_HASH(s); ***/
	      zero(s.head); // Fill with NIL (= 0);
	      s.strstart = 0;
	      s.block_start = 0;
	      s.insert = 0;
	    }
	    /* use the tail */
	    // dictionary = dictionary.slice(dictLength - s.w_size);
	    tmpDict = new utils.Buf8(s.w_size);
	    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
	    dictionary = tmpDict;
	    dictLength = s.w_size;
	  }
	  /* insert dictionary into window and hash */
	  avail = strm.avail_in;
	  next = strm.next_in;
	  input = strm.input;
	  strm.avail_in = dictLength;
	  strm.next_in = 0;
	  strm.input = dictionary;
	  fill_window(s);
	  while (s.lookahead >= MIN_MATCH) {
	    str = s.strstart;
	    n = s.lookahead - (MIN_MATCH - 1);
	    do {
	      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

	      s.prev[str & s.w_mask] = s.head[s.ins_h];

	      s.head[s.ins_h] = str;
	      str++;
	    } while (--n);
	    s.strstart = str;
	    s.lookahead = MIN_MATCH - 1;
	    fill_window(s);
	  }
	  s.strstart += s.lookahead;
	  s.block_start = s.strstart;
	  s.insert = s.lookahead;
	  s.lookahead = 0;
	  s.match_length = s.prev_length = MIN_MATCH - 1;
	  s.match_available = 0;
	  strm.next_in = next;
	  strm.input = input;
	  strm.avail_in = avail;
	  s.wrap = wrap;
	  return Z_OK;
	}


	exports.deflateInit = deflateInit;
	exports.deflateInit2 = deflateInit2;
	exports.deflateReset = deflateReset;
	exports.deflateResetKeep = deflateResetKeep;
	exports.deflateSetHeader = deflateSetHeader;
	exports.deflate = deflate;
	exports.deflateEnd = deflateEnd;
	exports.deflateSetDictionary = deflateSetDictionary;
	exports.deflateInfo = 'pako deflate (from Nodeca project)';

	/* Not implemented
	exports.deflateBound = deflateBound;
	exports.deflateCopy = deflateCopy;
	exports.deflateParams = deflateParams;
	exports.deflatePending = deflatePending;
	exports.deflatePrime = deflatePrime;
	exports.deflateTune = deflateTune;
	*/

	},{"../utils/common":62,"./adler32":64,"./crc32":66,"./messages":72,"./trees":73}],68:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	function GZheader() {
	  /* true if compressed data believed to be text */
	  this.text       = 0;
	  /* modification time */
	  this.time       = 0;
	  /* extra flags (not used when writing a gzip file) */
	  this.xflags     = 0;
	  /* operating system */
	  this.os         = 0;
	  /* pointer to extra field or Z_NULL if none */
	  this.extra      = null;
	  /* extra field length (valid if extra != Z_NULL) */
	  this.extra_len  = 0; // Actually, we don't need it in JS,
	                       // but leave for few code modifications

	  //
	  // Setup limits is not necessary because in js we should not preallocate memory
	  // for inflate use constant limit in 65536 bytes
	  //

	  /* space at extra (only when reading header) */
	  // this.extra_max  = 0;
	  /* pointer to zero-terminated file name or Z_NULL */
	  this.name       = '';
	  /* space at name (only when reading header) */
	  // this.name_max   = 0;
	  /* pointer to zero-terminated comment or Z_NULL */
	  this.comment    = '';
	  /* space at comment (only when reading header) */
	  // this.comm_max   = 0;
	  /* true if there was or will be a header crc */
	  this.hcrc       = 0;
	  /* true when done reading gzip header (not used when writing a gzip file) */
	  this.done       = false;
	}

	module.exports = GZheader;

	},{}],69:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	// See state defs from inflate.js
	var BAD = 30;       /* got a data error -- remain here until reset */
	var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

	/*
	   Decode literal, length, and distance codes and write out the resulting
	   literal and match bytes until either not enough input or output is
	   available, an end-of-block is encountered, or a data error is encountered.
	   When large enough input and output buffers are supplied to inflate(), for
	   example, a 16K input buffer and a 64K output buffer, more than 95% of the
	   inflate execution time is spent in this routine.

	   Entry assumptions:

	        state.mode === LEN
	        strm.avail_in >= 6
	        strm.avail_out >= 258
	        start >= strm.avail_out
	        state.bits < 8

	   On return, state.mode is one of:

	        LEN -- ran out of enough output space or enough available input
	        TYPE -- reached end of block code, inflate() to interpret next block
	        BAD -- error in block data

	   Notes:

	    - The maximum input bits used by a length/distance pair is 15 bits for the
	      length code, 5 bits for the length extra, 15 bits for the distance code,
	      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
	      Therefore if strm.avail_in >= 6, then there is enough input to avoid
	      checking for available input while decoding.

	    - The maximum bytes that a single length/distance pair can output is 258
	      bytes, which is the maximum length that can be coded.  inflate_fast()
	      requires strm.avail_out >= 258 for each loop to avoid checking for
	      output space.
	 */
	module.exports = function inflate_fast(strm, start) {
	  var state;
	  var _in;                    /* local strm.input */
	  var last;                   /* have enough input while in < last */
	  var _out;                   /* local strm.output */
	  var beg;                    /* inflate()'s initial strm.output */
	  var end;                    /* while out < end, enough space available */
	//#ifdef INFLATE_STRICT
	  var dmax;                   /* maximum distance from zlib header */
	//#endif
	  var wsize;                  /* window size or zero if not using window */
	  var whave;                  /* valid bytes in the window */
	  var wnext;                  /* window write index */
	  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
	  var s_window;               /* allocated sliding window, if wsize != 0 */
	  var hold;                   /* local strm.hold */
	  var bits;                   /* local strm.bits */
	  var lcode;                  /* local strm.lencode */
	  var dcode;                  /* local strm.distcode */
	  var lmask;                  /* mask for first level of length codes */
	  var dmask;                  /* mask for first level of distance codes */
	  var here;                   /* retrieved table entry */
	  var op;                     /* code bits, operation, extra bits, or */
	                              /*  window position, window bytes to copy */
	  var len;                    /* match length, unused bytes */
	  var dist;                   /* match distance */
	  var from;                   /* where to copy match from */
	  var from_source;


	  var input, output; // JS specific, because we have no pointers

	  /* copy state to local variables */
	  state = strm.state;
	  //here = state.here;
	  _in = strm.next_in;
	  input = strm.input;
	  last = _in + (strm.avail_in - 5);
	  _out = strm.next_out;
	  output = strm.output;
	  beg = _out - (start - strm.avail_out);
	  end = _out + (strm.avail_out - 257);
	//#ifdef INFLATE_STRICT
	  dmax = state.dmax;
	//#endif
	  wsize = state.wsize;
	  whave = state.whave;
	  wnext = state.wnext;
	  s_window = state.window;
	  hold = state.hold;
	  bits = state.bits;
	  lcode = state.lencode;
	  dcode = state.distcode;
	  lmask = (1 << state.lenbits) - 1;
	  dmask = (1 << state.distbits) - 1;


	  /* decode literals and length/distances until end-of-block or not enough
	     input data or output space */

	  top:
	  do {
	    if (bits < 15) {
	      hold += input[_in++] << bits;
	      bits += 8;
	      hold += input[_in++] << bits;
	      bits += 8;
	    }

	    here = lcode[hold & lmask];

	    dolen:
	    for (;;) { // Goto emulation
	      op = here >>> 24/*here.bits*/;
	      hold >>>= op;
	      bits -= op;
	      op = (here >>> 16) & 0xff/*here.op*/;
	      if (op === 0) {                          /* literal */
	        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
	        //        "inflate:         literal '%c'\n" :
	        //        "inflate:         literal 0x%02x\n", here.val));
	        output[_out++] = here & 0xffff/*here.val*/;
	      }
	      else if (op & 16) {                     /* length base */
	        len = here & 0xffff/*here.val*/;
	        op &= 15;                           /* number of extra bits */
	        if (op) {
	          if (bits < op) {
	            hold += input[_in++] << bits;
	            bits += 8;
	          }
	          len += hold & ((1 << op) - 1);
	          hold >>>= op;
	          bits -= op;
	        }
	        //Tracevv((stderr, "inflate:         length %u\n", len));
	        if (bits < 15) {
	          hold += input[_in++] << bits;
	          bits += 8;
	          hold += input[_in++] << bits;
	          bits += 8;
	        }
	        here = dcode[hold & dmask];

	        dodist:
	        for (;;) { // goto emulation
	          op = here >>> 24/*here.bits*/;
	          hold >>>= op;
	          bits -= op;
	          op = (here >>> 16) & 0xff/*here.op*/;

	          if (op & 16) {                      /* distance base */
	            dist = here & 0xffff/*here.val*/;
	            op &= 15;                       /* number of extra bits */
	            if (bits < op) {
	              hold += input[_in++] << bits;
	              bits += 8;
	              if (bits < op) {
	                hold += input[_in++] << bits;
	                bits += 8;
	              }
	            }
	            dist += hold & ((1 << op) - 1);
	//#ifdef INFLATE_STRICT
	            if (dist > dmax) {
	              strm.msg = 'invalid distance too far back';
	              state.mode = BAD;
	              break top;
	            }
	//#endif
	            hold >>>= op;
	            bits -= op;
	            //Tracevv((stderr, "inflate:         distance %u\n", dist));
	            op = _out - beg;                /* max distance in output */
	            if (dist > op) {                /* see if copy from window */
	              op = dist - op;               /* distance back in window */
	              if (op > whave) {
	                if (state.sane) {
	                  strm.msg = 'invalid distance too far back';
	                  state.mode = BAD;
	                  break top;
	                }

	// (!) This block is disabled in zlib defailts,
	// don't enable it for binary compatibility
	//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
	//                if (len <= op - whave) {
	//                  do {
	//                    output[_out++] = 0;
	//                  } while (--len);
	//                  continue top;
	//                }
	//                len -= op - whave;
	//                do {
	//                  output[_out++] = 0;
	//                } while (--op > whave);
	//                if (op === 0) {
	//                  from = _out - dist;
	//                  do {
	//                    output[_out++] = output[from++];
	//                  } while (--len);
	//                  continue top;
	//                }
	//#endif
	              }
	              from = 0; // window index
	              from_source = s_window;
	              if (wnext === 0) {           /* very common case */
	                from += wsize - op;
	                if (op < len) {         /* some from window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = _out - dist;  /* rest from output */
	                  from_source = output;
	                }
	              }
	              else if (wnext < op) {      /* wrap around window */
	                from += wsize + wnext - op;
	                op -= wnext;
	                if (op < len) {         /* some from end of window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = 0;
	                  if (wnext < len) {  /* some from start of window */
	                    op = wnext;
	                    len -= op;
	                    do {
	                      output[_out++] = s_window[from++];
	                    } while (--op);
	                    from = _out - dist;      /* rest from output */
	                    from_source = output;
	                  }
	                }
	              }
	              else {                      /* contiguous in window */
	                from += wnext - op;
	                if (op < len) {         /* some from window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = _out - dist;  /* rest from output */
	                  from_source = output;
	                }
	              }
	              while (len > 2) {
	                output[_out++] = from_source[from++];
	                output[_out++] = from_source[from++];
	                output[_out++] = from_source[from++];
	                len -= 3;
	              }
	              if (len) {
	                output[_out++] = from_source[from++];
	                if (len > 1) {
	                  output[_out++] = from_source[from++];
	                }
	              }
	            }
	            else {
	              from = _out - dist;          /* copy direct from output */
	              do {                        /* minimum length is three */
	                output[_out++] = output[from++];
	                output[_out++] = output[from++];
	                output[_out++] = output[from++];
	                len -= 3;
	              } while (len > 2);
	              if (len) {
	                output[_out++] = output[from++];
	                if (len > 1) {
	                  output[_out++] = output[from++];
	                }
	              }
	            }
	          }
	          else if ((op & 64) === 0) {          /* 2nd level distance code */
	            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
	            continue dodist;
	          }
	          else {
	            strm.msg = 'invalid distance code';
	            state.mode = BAD;
	            break top;
	          }

	          break; // need to emulate goto via "continue"
	        }
	      }
	      else if ((op & 64) === 0) {              /* 2nd level length code */
	        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
	        continue dolen;
	      }
	      else if (op & 32) {                     /* end-of-block */
	        //Tracevv((stderr, "inflate:         end of block\n"));
	        state.mode = TYPE;
	        break top;
	      }
	      else {
	        strm.msg = 'invalid literal/length code';
	        state.mode = BAD;
	        break top;
	      }

	      break; // need to emulate goto via "continue"
	    }
	  } while (_in < last && _out < end);

	  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
	  len = bits >> 3;
	  _in -= len;
	  bits -= len << 3;
	  hold &= (1 << bits) - 1;

	  /* update state and return */
	  strm.next_in = _in;
	  strm.next_out = _out;
	  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
	  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
	  state.hold = hold;
	  state.bits = bits;
	  return;
	};

	},{}],70:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	var utils         = require('../utils/common');
	var adler32       = require('./adler32');
	var crc32         = require('./crc32');
	var inflate_fast  = require('./inffast');
	var inflate_table = require('./inftrees');

	var CODES = 0;
	var LENS = 1;
	var DISTS = 2;

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	/* Allowed flush values; see deflate() and inflate() below for details */
	//var Z_NO_FLUSH      = 0;
	//var Z_PARTIAL_FLUSH = 1;
	//var Z_SYNC_FLUSH    = 2;
	//var Z_FULL_FLUSH    = 3;
	var Z_FINISH        = 4;
	var Z_BLOCK         = 5;
	var Z_TREES         = 6;


	/* Return codes for the compression/decompression functions. Negative values
	 * are errors, positive values are used for special but normal events.
	 */
	var Z_OK            = 0;
	var Z_STREAM_END    = 1;
	var Z_NEED_DICT     = 2;
	//var Z_ERRNO         = -1;
	var Z_STREAM_ERROR  = -2;
	var Z_DATA_ERROR    = -3;
	var Z_MEM_ERROR     = -4;
	var Z_BUF_ERROR     = -5;
	//var Z_VERSION_ERROR = -6;

	/* The deflate compression method */
	var Z_DEFLATED  = 8;


	/* STATES ====================================================================*/
	/* ===========================================================================*/


	var    HEAD = 1;       /* i: waiting for magic header */
	var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
	var    TIME = 3;       /* i: waiting for modification time (gzip) */
	var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
	var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
	var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
	var    NAME = 7;       /* i: waiting for end of file name (gzip) */
	var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
	var    HCRC = 9;       /* i: waiting for header crc (gzip) */
	var    DICTID = 10;    /* i: waiting for dictionary check value */
	var    DICT = 11;      /* waiting for inflateSetDictionary() call */
	var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
	var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
	var        STORED = 14;    /* i: waiting for stored size (length and complement) */
	var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
	var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
	var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
	var        LENLENS = 18;   /* i: waiting for code length code lengths */
	var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
	var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
	var            LEN = 21;       /* i: waiting for length/lit/eob code */
	var            LENEXT = 22;    /* i: waiting for length extra bits */
	var            DIST = 23;      /* i: waiting for distance code */
	var            DISTEXT = 24;   /* i: waiting for distance extra bits */
	var            MATCH = 25;     /* o: waiting for output space to copy string */
	var            LIT = 26;       /* o: waiting for output space to write literal */
	var    CHECK = 27;     /* i: waiting for 32-bit check value */
	var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
	var    DONE = 29;      /* finished check, done -- remain here until reset */
	var    BAD = 30;       /* got a data error -- remain here until reset */
	var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
	var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

	/* ===========================================================================*/



	var ENOUGH_LENS = 852;
	var ENOUGH_DISTS = 592;
	//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

	var MAX_WBITS = 15;
	/* 32K LZ77 window */
	var DEF_WBITS = MAX_WBITS;


	function zswap32(q) {
	  return  (((q >>> 24) & 0xff) +
	          ((q >>> 8) & 0xff00) +
	          ((q & 0xff00) << 8) +
	          ((q & 0xff) << 24));
	}


	function InflateState() {
	  this.mode = 0;             /* current inflate mode */
	  this.last = false;          /* true if processing last block */
	  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
	  this.havedict = false;      /* true if dictionary provided */
	  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
	  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
	  this.check = 0;             /* protected copy of check value */
	  this.total = 0;             /* protected copy of output count */
	  // TODO: may be {}
	  this.head = null;           /* where to save gzip header information */

	  /* sliding window */
	  this.wbits = 0;             /* log base 2 of requested window size */
	  this.wsize = 0;             /* window size or zero if not using window */
	  this.whave = 0;             /* valid bytes in the window */
	  this.wnext = 0;             /* window write index */
	  this.window = null;         /* allocated sliding window, if needed */

	  /* bit accumulator */
	  this.hold = 0;              /* input bit accumulator */
	  this.bits = 0;              /* number of bits in "in" */

	  /* for string and stored block copying */
	  this.length = 0;            /* literal or length of data to copy */
	  this.offset = 0;            /* distance back to copy string from */

	  /* for table and code decoding */
	  this.extra = 0;             /* extra bits needed */

	  /* fixed and dynamic code tables */
	  this.lencode = null;          /* starting table for length/literal codes */
	  this.distcode = null;         /* starting table for distance codes */
	  this.lenbits = 0;           /* index bits for lencode */
	  this.distbits = 0;          /* index bits for distcode */

	  /* dynamic table building */
	  this.ncode = 0;             /* number of code length code lengths */
	  this.nlen = 0;              /* number of length code lengths */
	  this.ndist = 0;             /* number of distance code lengths */
	  this.have = 0;              /* number of code lengths in lens[] */
	  this.next = null;              /* next available space in codes[] */

	  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
	  this.work = new utils.Buf16(288); /* work area for code table building */

	  /*
	   because we don't have pointers in js, we use lencode and distcode directly
	   as buffers so we don't need codes
	  */
	  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
	  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
	  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
	  this.sane = 0;                   /* if false, allow invalid distance too far */
	  this.back = 0;                   /* bits back of last unprocessed length/lit */
	  this.was = 0;                    /* initial length of match */
	}

	function inflateResetKeep(strm) {
	  var state;

	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  strm.total_in = strm.total_out = state.total = 0;
	  strm.msg = ''; /*Z_NULL*/
	  if (state.wrap) {       /* to support ill-conceived Java test suite */
	    strm.adler = state.wrap & 1;
	  }
	  state.mode = HEAD;
	  state.last = 0;
	  state.havedict = 0;
	  state.dmax = 32768;
	  state.head = null/*Z_NULL*/;
	  state.hold = 0;
	  state.bits = 0;
	  //state.lencode = state.distcode = state.next = state.codes;
	  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
	  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

	  state.sane = 1;
	  state.back = -1;
	  //Tracev((stderr, "inflate: reset\n"));
	  return Z_OK;
	}

	function inflateReset(strm) {
	  var state;

	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  state.wsize = 0;
	  state.whave = 0;
	  state.wnext = 0;
	  return inflateResetKeep(strm);

	}

	function inflateReset2(strm, windowBits) {
	  var wrap;
	  var state;

	  /* get the state */
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;

	  /* extract wrap request from windowBits parameter */
	  if (windowBits < 0) {
	    wrap = 0;
	    windowBits = -windowBits;
	  }
	  else {
	    wrap = (windowBits >> 4) + 1;
	    if (windowBits < 48) {
	      windowBits &= 15;
	    }
	  }

	  /* set number of window bits, free window if different */
	  if (windowBits && (windowBits < 8 || windowBits > 15)) {
	    return Z_STREAM_ERROR;
	  }
	  if (state.window !== null && state.wbits !== windowBits) {
	    state.window = null;
	  }

	  /* update state and reset the rest of it */
	  state.wrap = wrap;
	  state.wbits = windowBits;
	  return inflateReset(strm);
	}

	function inflateInit2(strm, windowBits) {
	  var ret;
	  var state;

	  if (!strm) { return Z_STREAM_ERROR; }
	  //strm.msg = Z_NULL;                 /* in case we return an error */

	  state = new InflateState();

	  //if (state === Z_NULL) return Z_MEM_ERROR;
	  //Tracev((stderr, "inflate: allocated\n"));
	  strm.state = state;
	  state.window = null/*Z_NULL*/;
	  ret = inflateReset2(strm, windowBits);
	  if (ret !== Z_OK) {
	    strm.state = null/*Z_NULL*/;
	  }
	  return ret;
	}

	function inflateInit(strm) {
	  return inflateInit2(strm, DEF_WBITS);
	}


	/*
	 Return state with length and distance decoding tables and index sizes set to
	 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
	 If BUILDFIXED is defined, then instead this routine builds the tables the
	 first time it's called, and returns those tables the first time and
	 thereafter.  This reduces the size of the code by about 2K bytes, in
	 exchange for a little execution time.  However, BUILDFIXED should not be
	 used for threaded applications, since the rewriting of the tables and virgin
	 may not be thread-safe.
	 */
	var virgin = true;

	var lenfix, distfix; // We have no pointers in JS, so keep tables separate

	function fixedtables(state) {
	  /* build fixed huffman tables if first call (may not be thread safe) */
	  if (virgin) {
	    var sym;

	    lenfix = new utils.Buf32(512);
	    distfix = new utils.Buf32(32);

	    /* literal/length table */
	    sym = 0;
	    while (sym < 144) { state.lens[sym++] = 8; }
	    while (sym < 256) { state.lens[sym++] = 9; }
	    while (sym < 280) { state.lens[sym++] = 7; }
	    while (sym < 288) { state.lens[sym++] = 8; }

	    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

	    /* distance table */
	    sym = 0;
	    while (sym < 32) { state.lens[sym++] = 5; }

	    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

	    /* do this just once */
	    virgin = false;
	  }

	  state.lencode = lenfix;
	  state.lenbits = 9;
	  state.distcode = distfix;
	  state.distbits = 5;
	}


	/*
	 Update the window with the last wsize (normally 32K) bytes written before
	 returning.  If window does not exist yet, create it.  This is only called
	 when a window is already in use, or when output has been written during this
	 inflate call, but the end of the deflate stream has not been reached yet.
	 It is also called to create a window for dictionary data when a dictionary
	 is loaded.

	 Providing output buffers larger than 32K to inflate() should provide a speed
	 advantage, since only the last 32K of output is copied to the sliding window
	 upon return from inflate(), and since all distances after the first 32K of
	 output will fall in the output data, making match copies simpler and faster.
	 The advantage may be dependent on the size of the processor's data caches.
	 */
	function updatewindow(strm, src, end, copy) {
	  var dist;
	  var state = strm.state;

	  /* if it hasn't been done already, allocate space for the window */
	  if (state.window === null) {
	    state.wsize = 1 << state.wbits;
	    state.wnext = 0;
	    state.whave = 0;

	    state.window = new utils.Buf8(state.wsize);
	  }

	  /* copy state->wsize or less output bytes into the circular window */
	  if (copy >= state.wsize) {
	    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
	    state.wnext = 0;
	    state.whave = state.wsize;
	  }
	  else {
	    dist = state.wsize - state.wnext;
	    if (dist > copy) {
	      dist = copy;
	    }
	    //zmemcpy(state->window + state->wnext, end - copy, dist);
	    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
	    copy -= dist;
	    if (copy) {
	      //zmemcpy(state->window, end - copy, copy);
	      utils.arraySet(state.window, src, end - copy, copy, 0);
	      state.wnext = copy;
	      state.whave = state.wsize;
	    }
	    else {
	      state.wnext += dist;
	      if (state.wnext === state.wsize) { state.wnext = 0; }
	      if (state.whave < state.wsize) { state.whave += dist; }
	    }
	  }
	  return 0;
	}

	function inflate(strm, flush) {
	  var state;
	  var input, output;          // input/output buffers
	  var next;                   /* next input INDEX */
	  var put;                    /* next output INDEX */
	  var have, left;             /* available input and output */
	  var hold;                   /* bit buffer */
	  var bits;                   /* bits in bit buffer */
	  var _in, _out;              /* save starting available input and output */
	  var copy;                   /* number of stored or match bytes to copy */
	  var from;                   /* where to copy match bytes from */
	  var from_source;
	  var here = 0;               /* current decoding table entry */
	  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
	  //var last;                   /* parent table entry */
	  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
	  var len;                    /* length to copy for repeats, bits to drop */
	  var ret;                    /* return code */
	  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
	  var opts;

	  var n; // temporary var for NEED_BITS

	  var order = /* permutation of code lengths */
	    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


	  if (!strm || !strm.state || !strm.output ||
	      (!strm.input && strm.avail_in !== 0)) {
	    return Z_STREAM_ERROR;
	  }

	  state = strm.state;
	  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


	  //--- LOAD() ---
	  put = strm.next_out;
	  output = strm.output;
	  left = strm.avail_out;
	  next = strm.next_in;
	  input = strm.input;
	  have = strm.avail_in;
	  hold = state.hold;
	  bits = state.bits;
	  //---

	  _in = have;
	  _out = left;
	  ret = Z_OK;

	  inf_leave: // goto emulation
	  for (;;) {
	    switch (state.mode) {
	    case HEAD:
	      if (state.wrap === 0) {
	        state.mode = TYPEDO;
	        break;
	      }
	      //=== NEEDBITS(16);
	      while (bits < 16) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
	        state.check = 0/*crc32(0L, Z_NULL, 0)*/;
	        //=== CRC2(state.check, hold);
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        state.check = crc32(state.check, hbuf, 2, 0);
	        //===//

	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = FLAGS;
	        break;
	      }
	      state.flags = 0;           /* expect zlib header */
	      if (state.head) {
	        state.head.done = false;
	      }
	      if (!(state.wrap & 1) ||   /* check if zlib header allowed */
	        (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
	        strm.msg = 'incorrect header check';
	        state.mode = BAD;
	        break;
	      }
	      if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
	        strm.msg = 'unknown compression method';
	        state.mode = BAD;
	        break;
	      }
	      //--- DROPBITS(4) ---//
	      hold >>>= 4;
	      bits -= 4;
	      //---//
	      len = (hold & 0x0f)/*BITS(4)*/ + 8;
	      if (state.wbits === 0) {
	        state.wbits = len;
	      }
	      else if (len > state.wbits) {
	        strm.msg = 'invalid window size';
	        state.mode = BAD;
	        break;
	      }
	      state.dmax = 1 << len;
	      //Tracev((stderr, "inflate:   zlib header ok\n"));
	      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
	      state.mode = hold & 0x200 ? DICTID : TYPE;
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      break;
	    case FLAGS:
	      //=== NEEDBITS(16); */
	      while (bits < 16) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      state.flags = hold;
	      if ((state.flags & 0xff) !== Z_DEFLATED) {
	        strm.msg = 'unknown compression method';
	        state.mode = BAD;
	        break;
	      }
	      if (state.flags & 0xe000) {
	        strm.msg = 'unknown header flags set';
	        state.mode = BAD;
	        break;
	      }
	      if (state.head) {
	        state.head.text = ((hold >> 8) & 1);
	      }
	      if (state.flags & 0x0200) {
	        //=== CRC2(state.check, hold);
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        state.check = crc32(state.check, hbuf, 2, 0);
	        //===//
	      }
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = TIME;
	      /* falls through */
	    case TIME:
	      //=== NEEDBITS(32); */
	      while (bits < 32) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if (state.head) {
	        state.head.time = hold;
	      }
	      if (state.flags & 0x0200) {
	        //=== CRC4(state.check, hold)
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        hbuf[2] = (hold >>> 16) & 0xff;
	        hbuf[3] = (hold >>> 24) & 0xff;
	        state.check = crc32(state.check, hbuf, 4, 0);
	        //===
	      }
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = OS;
	      /* falls through */
	    case OS:
	      //=== NEEDBITS(16); */
	      while (bits < 16) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if (state.head) {
	        state.head.xflags = (hold & 0xff);
	        state.head.os = (hold >> 8);
	      }
	      if (state.flags & 0x0200) {
	        //=== CRC2(state.check, hold);
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        state.check = crc32(state.check, hbuf, 2, 0);
	        //===//
	      }
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = EXLEN;
	      /* falls through */
	    case EXLEN:
	      if (state.flags & 0x0400) {
	        //=== NEEDBITS(16); */
	        while (bits < 16) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.length = hold;
	        if (state.head) {
	          state.head.extra_len = hold;
	        }
	        if (state.flags & 0x0200) {
	          //=== CRC2(state.check, hold);
	          hbuf[0] = hold & 0xff;
	          hbuf[1] = (hold >>> 8) & 0xff;
	          state.check = crc32(state.check, hbuf, 2, 0);
	          //===//
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	      }
	      else if (state.head) {
	        state.head.extra = null/*Z_NULL*/;
	      }
	      state.mode = EXTRA;
	      /* falls through */
	    case EXTRA:
	      if (state.flags & 0x0400) {
	        copy = state.length;
	        if (copy > have) { copy = have; }
	        if (copy) {
	          if (state.head) {
	            len = state.head.extra_len - state.length;
	            if (!state.head.extra) {
	              // Use untyped array for more conveniend processing later
	              state.head.extra = new Array(state.head.extra_len);
	            }
	            utils.arraySet(
	              state.head.extra,
	              input,
	              next,
	              // extra field is limited to 65536 bytes
	              // - no need for additional size check
	              copy,
	              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
	              len
	            );
	            //zmemcpy(state.head.extra + len, next,
	            //        len + copy > state.head.extra_max ?
	            //        state.head.extra_max - len : copy);
	          }
	          if (state.flags & 0x0200) {
	            state.check = crc32(state.check, input, copy, next);
	          }
	          have -= copy;
	          next += copy;
	          state.length -= copy;
	        }
	        if (state.length) { break inf_leave; }
	      }
	      state.length = 0;
	      state.mode = NAME;
	      /* falls through */
	    case NAME:
	      if (state.flags & 0x0800) {
	        if (have === 0) { break inf_leave; }
	        copy = 0;
	        do {
	          // TODO: 2 or 1 bytes?
	          len = input[next + copy++];
	          /* use constant limit because in js we should not preallocate memory */
	          if (state.head && len &&
	              (state.length < 65536 /*state.head.name_max*/)) {
	            state.head.name += String.fromCharCode(len);
	          }
	        } while (len && copy < have);

	        if (state.flags & 0x0200) {
	          state.check = crc32(state.check, input, copy, next);
	        }
	        have -= copy;
	        next += copy;
	        if (len) { break inf_leave; }
	      }
	      else if (state.head) {
	        state.head.name = null;
	      }
	      state.length = 0;
	      state.mode = COMMENT;
	      /* falls through */
	    case COMMENT:
	      if (state.flags & 0x1000) {
	        if (have === 0) { break inf_leave; }
	        copy = 0;
	        do {
	          len = input[next + copy++];
	          /* use constant limit because in js we should not preallocate memory */
	          if (state.head && len &&
	              (state.length < 65536 /*state.head.comm_max*/)) {
	            state.head.comment += String.fromCharCode(len);
	          }
	        } while (len && copy < have);
	        if (state.flags & 0x0200) {
	          state.check = crc32(state.check, input, copy, next);
	        }
	        have -= copy;
	        next += copy;
	        if (len) { break inf_leave; }
	      }
	      else if (state.head) {
	        state.head.comment = null;
	      }
	      state.mode = HCRC;
	      /* falls through */
	    case HCRC:
	      if (state.flags & 0x0200) {
	        //=== NEEDBITS(16); */
	        while (bits < 16) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (hold !== (state.check & 0xffff)) {
	          strm.msg = 'header crc mismatch';
	          state.mode = BAD;
	          break;
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	      }
	      if (state.head) {
	        state.head.hcrc = ((state.flags >> 9) & 1);
	        state.head.done = true;
	      }
	      strm.adler = state.check = 0;
	      state.mode = TYPE;
	      break;
	    case DICTID:
	      //=== NEEDBITS(32); */
	      while (bits < 32) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      strm.adler = state.check = zswap32(hold);
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = DICT;
	      /* falls through */
	    case DICT:
	      if (state.havedict === 0) {
	        //--- RESTORE() ---
	        strm.next_out = put;
	        strm.avail_out = left;
	        strm.next_in = next;
	        strm.avail_in = have;
	        state.hold = hold;
	        state.bits = bits;
	        //---
	        return Z_NEED_DICT;
	      }
	      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
	      state.mode = TYPE;
	      /* falls through */
	    case TYPE:
	      if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
	      /* falls through */
	    case TYPEDO:
	      if (state.last) {
	        //--- BYTEBITS() ---//
	        hold >>>= bits & 7;
	        bits -= bits & 7;
	        //---//
	        state.mode = CHECK;
	        break;
	      }
	      //=== NEEDBITS(3); */
	      while (bits < 3) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      state.last = (hold & 0x01)/*BITS(1)*/;
	      //--- DROPBITS(1) ---//
	      hold >>>= 1;
	      bits -= 1;
	      //---//

	      switch ((hold & 0x03)/*BITS(2)*/) {
	      case 0:                             /* stored block */
	        //Tracev((stderr, "inflate:     stored block%s\n",
	        //        state.last ? " (last)" : ""));
	        state.mode = STORED;
	        break;
	      case 1:                             /* fixed block */
	        fixedtables(state);
	        //Tracev((stderr, "inflate:     fixed codes block%s\n",
	        //        state.last ? " (last)" : ""));
	        state.mode = LEN_;             /* decode codes */
	        if (flush === Z_TREES) {
	          //--- DROPBITS(2) ---//
	          hold >>>= 2;
	          bits -= 2;
	          //---//
	          break inf_leave;
	        }
	        break;
	      case 2:                             /* dynamic block */
	        //Tracev((stderr, "inflate:     dynamic codes block%s\n",
	        //        state.last ? " (last)" : ""));
	        state.mode = TABLE;
	        break;
	      case 3:
	        strm.msg = 'invalid block type';
	        state.mode = BAD;
	      }
	      //--- DROPBITS(2) ---//
	      hold >>>= 2;
	      bits -= 2;
	      //---//
	      break;
	    case STORED:
	      //--- BYTEBITS() ---// /* go to byte boundary */
	      hold >>>= bits & 7;
	      bits -= bits & 7;
	      //---//
	      //=== NEEDBITS(32); */
	      while (bits < 32) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
	        strm.msg = 'invalid stored block lengths';
	        state.mode = BAD;
	        break;
	      }
	      state.length = hold & 0xffff;
	      //Tracev((stderr, "inflate:       stored length %u\n",
	      //        state.length));
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = COPY_;
	      if (flush === Z_TREES) { break inf_leave; }
	      /* falls through */
	    case COPY_:
	      state.mode = COPY;
	      /* falls through */
	    case COPY:
	      copy = state.length;
	      if (copy) {
	        if (copy > have) { copy = have; }
	        if (copy > left) { copy = left; }
	        if (copy === 0) { break inf_leave; }
	        //--- zmemcpy(put, next, copy); ---
	        utils.arraySet(output, input, next, copy, put);
	        //---//
	        have -= copy;
	        next += copy;
	        left -= copy;
	        put += copy;
	        state.length -= copy;
	        break;
	      }
	      //Tracev((stderr, "inflate:       stored end\n"));
	      state.mode = TYPE;
	      break;
	    case TABLE:
	      //=== NEEDBITS(14); */
	      while (bits < 14) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
	      //--- DROPBITS(5) ---//
	      hold >>>= 5;
	      bits -= 5;
	      //---//
	      state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
	      //--- DROPBITS(5) ---//
	      hold >>>= 5;
	      bits -= 5;
	      //---//
	      state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
	      //--- DROPBITS(4) ---//
	      hold >>>= 4;
	      bits -= 4;
	      //---//
	//#ifndef PKZIP_BUG_WORKAROUND
	      if (state.nlen > 286 || state.ndist > 30) {
	        strm.msg = 'too many length or distance symbols';
	        state.mode = BAD;
	        break;
	      }
	//#endif
	      //Tracev((stderr, "inflate:       table sizes ok\n"));
	      state.have = 0;
	      state.mode = LENLENS;
	      /* falls through */
	    case LENLENS:
	      while (state.have < state.ncode) {
	        //=== NEEDBITS(3);
	        while (bits < 3) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
	        //--- DROPBITS(3) ---//
	        hold >>>= 3;
	        bits -= 3;
	        //---//
	      }
	      while (state.have < 19) {
	        state.lens[order[state.have++]] = 0;
	      }
	      // We have separate tables & no pointers. 2 commented lines below not needed.
	      //state.next = state.codes;
	      //state.lencode = state.next;
	      // Switch to use dynamic table
	      state.lencode = state.lendyn;
	      state.lenbits = 7;

	      opts = { bits: state.lenbits };
	      ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
	      state.lenbits = opts.bits;

	      if (ret) {
	        strm.msg = 'invalid code lengths set';
	        state.mode = BAD;
	        break;
	      }
	      //Tracev((stderr, "inflate:       code lengths ok\n"));
	      state.have = 0;
	      state.mode = CODELENS;
	      /* falls through */
	    case CODELENS:
	      while (state.have < state.nlen + state.ndist) {
	        for (;;) {
	          here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if ((here_bits) <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        if (here_val < 16) {
	          //--- DROPBITS(here.bits) ---//
	          hold >>>= here_bits;
	          bits -= here_bits;
	          //---//
	          state.lens[state.have++] = here_val;
	        }
	        else {
	          if (here_val === 16) {
	            //=== NEEDBITS(here.bits + 2);
	            n = here_bits + 2;
	            while (bits < n) {
	              if (have === 0) { break inf_leave; }
	              have--;
	              hold += input[next++] << bits;
	              bits += 8;
	            }
	            //===//
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            if (state.have === 0) {
	              strm.msg = 'invalid bit length repeat';
	              state.mode = BAD;
	              break;
	            }
	            len = state.lens[state.have - 1];
	            copy = 3 + (hold & 0x03);//BITS(2);
	            //--- DROPBITS(2) ---//
	            hold >>>= 2;
	            bits -= 2;
	            //---//
	          }
	          else if (here_val === 17) {
	            //=== NEEDBITS(here.bits + 3);
	            n = here_bits + 3;
	            while (bits < n) {
	              if (have === 0) { break inf_leave; }
	              have--;
	              hold += input[next++] << bits;
	              bits += 8;
	            }
	            //===//
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            len = 0;
	            copy = 3 + (hold & 0x07);//BITS(3);
	            //--- DROPBITS(3) ---//
	            hold >>>= 3;
	            bits -= 3;
	            //---//
	          }
	          else {
	            //=== NEEDBITS(here.bits + 7);
	            n = here_bits + 7;
	            while (bits < n) {
	              if (have === 0) { break inf_leave; }
	              have--;
	              hold += input[next++] << bits;
	              bits += 8;
	            }
	            //===//
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            len = 0;
	            copy = 11 + (hold & 0x7f);//BITS(7);
	            //--- DROPBITS(7) ---//
	            hold >>>= 7;
	            bits -= 7;
	            //---//
	          }
	          if (state.have + copy > state.nlen + state.ndist) {
	            strm.msg = 'invalid bit length repeat';
	            state.mode = BAD;
	            break;
	          }
	          while (copy--) {
	            state.lens[state.have++] = len;
	          }
	        }
	      }

	      /* handle error breaks in while */
	      if (state.mode === BAD) { break; }

	      /* check for end-of-block code (better have one) */
	      if (state.lens[256] === 0) {
	        strm.msg = 'invalid code -- missing end-of-block';
	        state.mode = BAD;
	        break;
	      }

	      /* build code tables -- note: do not change the lenbits or distbits
	         values here (9 and 6) without reading the comments in inftrees.h
	         concerning the ENOUGH constants, which depend on those values */
	      state.lenbits = 9;

	      opts = { bits: state.lenbits };
	      ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
	      // We have separate tables & no pointers. 2 commented lines below not needed.
	      // state.next_index = opts.table_index;
	      state.lenbits = opts.bits;
	      // state.lencode = state.next;

	      if (ret) {
	        strm.msg = 'invalid literal/lengths set';
	        state.mode = BAD;
	        break;
	      }

	      state.distbits = 6;
	      //state.distcode.copy(state.codes);
	      // Switch to use dynamic table
	      state.distcode = state.distdyn;
	      opts = { bits: state.distbits };
	      ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
	      // We have separate tables & no pointers. 2 commented lines below not needed.
	      // state.next_index = opts.table_index;
	      state.distbits = opts.bits;
	      // state.distcode = state.next;

	      if (ret) {
	        strm.msg = 'invalid distances set';
	        state.mode = BAD;
	        break;
	      }
	      //Tracev((stderr, 'inflate:       codes ok\n'));
	      state.mode = LEN_;
	      if (flush === Z_TREES) { break inf_leave; }
	      /* falls through */
	    case LEN_:
	      state.mode = LEN;
	      /* falls through */
	    case LEN:
	      if (have >= 6 && left >= 258) {
	        //--- RESTORE() ---
	        strm.next_out = put;
	        strm.avail_out = left;
	        strm.next_in = next;
	        strm.avail_in = have;
	        state.hold = hold;
	        state.bits = bits;
	        //---
	        inflate_fast(strm, _out);
	        //--- LOAD() ---
	        put = strm.next_out;
	        output = strm.output;
	        left = strm.avail_out;
	        next = strm.next_in;
	        input = strm.input;
	        have = strm.avail_in;
	        hold = state.hold;
	        bits = state.bits;
	        //---

	        if (state.mode === TYPE) {
	          state.back = -1;
	        }
	        break;
	      }
	      state.back = 0;
	      for (;;) {
	        here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
	        here_bits = here >>> 24;
	        here_op = (here >>> 16) & 0xff;
	        here_val = here & 0xffff;

	        if (here_bits <= bits) { break; }
	        //--- PULLBYTE() ---//
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	        //---//
	      }
	      if (here_op && (here_op & 0xf0) === 0) {
	        last_bits = here_bits;
	        last_op = here_op;
	        last_val = here_val;
	        for (;;) {
	          here = state.lencode[last_val +
	                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if ((last_bits + here_bits) <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        //--- DROPBITS(last.bits) ---//
	        hold >>>= last_bits;
	        bits -= last_bits;
	        //---//
	        state.back += last_bits;
	      }
	      //--- DROPBITS(here.bits) ---//
	      hold >>>= here_bits;
	      bits -= here_bits;
	      //---//
	      state.back += here_bits;
	      state.length = here_val;
	      if (here_op === 0) {
	        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
	        //        "inflate:         literal '%c'\n" :
	        //        "inflate:         literal 0x%02x\n", here.val));
	        state.mode = LIT;
	        break;
	      }
	      if (here_op & 32) {
	        //Tracevv((stderr, "inflate:         end of block\n"));
	        state.back = -1;
	        state.mode = TYPE;
	        break;
	      }
	      if (here_op & 64) {
	        strm.msg = 'invalid literal/length code';
	        state.mode = BAD;
	        break;
	      }
	      state.extra = here_op & 15;
	      state.mode = LENEXT;
	      /* falls through */
	    case LENEXT:
	      if (state.extra) {
	        //=== NEEDBITS(state.extra);
	        n = state.extra;
	        while (bits < n) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
	        //--- DROPBITS(state.extra) ---//
	        hold >>>= state.extra;
	        bits -= state.extra;
	        //---//
	        state.back += state.extra;
	      }
	      //Tracevv((stderr, "inflate:         length %u\n", state.length));
	      state.was = state.length;
	      state.mode = DIST;
	      /* falls through */
	    case DIST:
	      for (;;) {
	        here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
	        here_bits = here >>> 24;
	        here_op = (here >>> 16) & 0xff;
	        here_val = here & 0xffff;

	        if ((here_bits) <= bits) { break; }
	        //--- PULLBYTE() ---//
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	        //---//
	      }
	      if ((here_op & 0xf0) === 0) {
	        last_bits = here_bits;
	        last_op = here_op;
	        last_val = here_val;
	        for (;;) {
	          here = state.distcode[last_val +
	                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if ((last_bits + here_bits) <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        //--- DROPBITS(last.bits) ---//
	        hold >>>= last_bits;
	        bits -= last_bits;
	        //---//
	        state.back += last_bits;
	      }
	      //--- DROPBITS(here.bits) ---//
	      hold >>>= here_bits;
	      bits -= here_bits;
	      //---//
	      state.back += here_bits;
	      if (here_op & 64) {
	        strm.msg = 'invalid distance code';
	        state.mode = BAD;
	        break;
	      }
	      state.offset = here_val;
	      state.extra = (here_op) & 15;
	      state.mode = DISTEXT;
	      /* falls through */
	    case DISTEXT:
	      if (state.extra) {
	        //=== NEEDBITS(state.extra);
	        n = state.extra;
	        while (bits < n) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
	        //--- DROPBITS(state.extra) ---//
	        hold >>>= state.extra;
	        bits -= state.extra;
	        //---//
	        state.back += state.extra;
	      }
	//#ifdef INFLATE_STRICT
	      if (state.offset > state.dmax) {
	        strm.msg = 'invalid distance too far back';
	        state.mode = BAD;
	        break;
	      }
	//#endif
	      //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
	      state.mode = MATCH;
	      /* falls through */
	    case MATCH:
	      if (left === 0) { break inf_leave; }
	      copy = _out - left;
	      if (state.offset > copy) {         /* copy from window */
	        copy = state.offset - copy;
	        if (copy > state.whave) {
	          if (state.sane) {
	            strm.msg = 'invalid distance too far back';
	            state.mode = BAD;
	            break;
	          }
	// (!) This block is disabled in zlib defailts,
	// don't enable it for binary compatibility
	//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
	//          Trace((stderr, "inflate.c too far\n"));
	//          copy -= state.whave;
	//          if (copy > state.length) { copy = state.length; }
	//          if (copy > left) { copy = left; }
	//          left -= copy;
	//          state.length -= copy;
	//          do {
	//            output[put++] = 0;
	//          } while (--copy);
	//          if (state.length === 0) { state.mode = LEN; }
	//          break;
	//#endif
	        }
	        if (copy > state.wnext) {
	          copy -= state.wnext;
	          from = state.wsize - copy;
	        }
	        else {
	          from = state.wnext - copy;
	        }
	        if (copy > state.length) { copy = state.length; }
	        from_source = state.window;
	      }
	      else {                              /* copy from output */
	        from_source = output;
	        from = put - state.offset;
	        copy = state.length;
	      }
	      if (copy > left) { copy = left; }
	      left -= copy;
	      state.length -= copy;
	      do {
	        output[put++] = from_source[from++];
	      } while (--copy);
	      if (state.length === 0) { state.mode = LEN; }
	      break;
	    case LIT:
	      if (left === 0) { break inf_leave; }
	      output[put++] = state.length;
	      left--;
	      state.mode = LEN;
	      break;
	    case CHECK:
	      if (state.wrap) {
	        //=== NEEDBITS(32);
	        while (bits < 32) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          // Use '|' insdead of '+' to make sure that result is signed
	          hold |= input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        _out -= left;
	        strm.total_out += _out;
	        state.total += _out;
	        if (_out) {
	          strm.adler = state.check =
	              /*UPDATE(state.check, put - _out, _out);*/
	              (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

	        }
	        _out = left;
	        // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
	        if ((state.flags ? hold : zswap32(hold)) !== state.check) {
	          strm.msg = 'incorrect data check';
	          state.mode = BAD;
	          break;
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        //Tracev((stderr, "inflate:   check matches trailer\n"));
	      }
	      state.mode = LENGTH;
	      /* falls through */
	    case LENGTH:
	      if (state.wrap && state.flags) {
	        //=== NEEDBITS(32);
	        while (bits < 32) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (hold !== (state.total & 0xffffffff)) {
	          strm.msg = 'incorrect length check';
	          state.mode = BAD;
	          break;
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        //Tracev((stderr, "inflate:   length matches trailer\n"));
	      }
	      state.mode = DONE;
	      /* falls through */
	    case DONE:
	      ret = Z_STREAM_END;
	      break inf_leave;
	    case BAD:
	      ret = Z_DATA_ERROR;
	      break inf_leave;
	    case MEM:
	      return Z_MEM_ERROR;
	    case SYNC:
	      /* falls through */
	    default:
	      return Z_STREAM_ERROR;
	    }
	  }

	  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

	  /*
	     Return from inflate(), updating the total counts and the check value.
	     If there was no progress during the inflate() call, return a buffer
	     error.  Call updatewindow() to create and/or update the window state.
	     Note: a memory error from inflate() is non-recoverable.
	   */

	  //--- RESTORE() ---
	  strm.next_out = put;
	  strm.avail_out = left;
	  strm.next_in = next;
	  strm.avail_in = have;
	  state.hold = hold;
	  state.bits = bits;
	  //---

	  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
	                      (state.mode < CHECK || flush !== Z_FINISH))) {
	    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
	      state.mode = MEM;
	      return Z_MEM_ERROR;
	    }
	  }
	  _in -= strm.avail_in;
	  _out -= strm.avail_out;
	  strm.total_in += _in;
	  strm.total_out += _out;
	  state.total += _out;
	  if (state.wrap && _out) {
	    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
	      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
	  }
	  strm.data_type = state.bits + (state.last ? 64 : 0) +
	                    (state.mode === TYPE ? 128 : 0) +
	                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
	  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
	    ret = Z_BUF_ERROR;
	  }
	  return ret;
	}

	function inflateEnd(strm) {

	  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
	    return Z_STREAM_ERROR;
	  }

	  var state = strm.state;
	  if (state.window) {
	    state.window = null;
	  }
	  strm.state = null;
	  return Z_OK;
	}

	function inflateGetHeader(strm, head) {
	  var state;

	  /* check state */
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

	  /* save header structure */
	  state.head = head;
	  head.done = false;
	  return Z_OK;
	}

	function inflateSetDictionary(strm, dictionary) {
	  var dictLength = dictionary.length;

	  var state;
	  var dictid;
	  var ret;

	  /* check state */
	  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
	  state = strm.state;

	  if (state.wrap !== 0 && state.mode !== DICT) {
	    return Z_STREAM_ERROR;
	  }

	  /* check for correct dictionary identifier */
	  if (state.mode === DICT) {
	    dictid = 1; /* adler32(0, null, 0)*/
	    /* dictid = adler32(dictid, dictionary, dictLength); */
	    dictid = adler32(dictid, dictionary, dictLength, 0);
	    if (dictid !== state.check) {
	      return Z_DATA_ERROR;
	    }
	  }
	  /* copy dictionary to window using updatewindow(), which will amend the
	   existing dictionary if appropriate */
	  ret = updatewindow(strm, dictionary, dictLength, dictLength);
	  if (ret) {
	    state.mode = MEM;
	    return Z_MEM_ERROR;
	  }
	  state.havedict = 1;
	  // Tracev((stderr, "inflate:   dictionary set\n"));
	  return Z_OK;
	}

	exports.inflateReset = inflateReset;
	exports.inflateReset2 = inflateReset2;
	exports.inflateResetKeep = inflateResetKeep;
	exports.inflateInit = inflateInit;
	exports.inflateInit2 = inflateInit2;
	exports.inflate = inflate;
	exports.inflateEnd = inflateEnd;
	exports.inflateGetHeader = inflateGetHeader;
	exports.inflateSetDictionary = inflateSetDictionary;
	exports.inflateInfo = 'pako inflate (from Nodeca project)';

	/* Not implemented
	exports.inflateCopy = inflateCopy;
	exports.inflateGetDictionary = inflateGetDictionary;
	exports.inflateMark = inflateMark;
	exports.inflatePrime = inflatePrime;
	exports.inflateSync = inflateSync;
	exports.inflateSyncPoint = inflateSyncPoint;
	exports.inflateUndermine = inflateUndermine;
	*/

	},{"../utils/common":62,"./adler32":64,"./crc32":66,"./inffast":69,"./inftrees":71}],71:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	var utils = require('../utils/common');

	var MAXBITS = 15;
	var ENOUGH_LENS = 852;
	var ENOUGH_DISTS = 592;
	//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

	var CODES = 0;
	var LENS = 1;
	var DISTS = 2;

	var lbase = [ /* Length codes 257..285 base */
	  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
	  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
	];

	var lext = [ /* Length codes 257..285 extra */
	  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
	  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
	];

	var dbase = [ /* Distance codes 0..29 base */
	  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
	  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
	  8193, 12289, 16385, 24577, 0, 0
	];

	var dext = [ /* Distance codes 0..29 extra */
	  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
	  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
	  28, 28, 29, 29, 64, 64
	];

	module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
	{
	  var bits = opts.bits;
	      //here = opts.here; /* table entry for duplication */

	  var len = 0;               /* a code's length in bits */
	  var sym = 0;               /* index of code symbols */
	  var min = 0, max = 0;          /* minimum and maximum code lengths */
	  var root = 0;              /* number of index bits for root table */
	  var curr = 0;              /* number of index bits for current table */
	  var drop = 0;              /* code bits to drop for sub-table */
	  var left = 0;                   /* number of prefix codes available */
	  var used = 0;              /* code entries in table used */
	  var huff = 0;              /* Huffman code */
	  var incr;              /* for incrementing code, index */
	  var fill;              /* index for replicating entries */
	  var low;               /* low bits for current root entry */
	  var mask;              /* mask for low root bits */
	  var next;             /* next available space in table */
	  var base = null;     /* base value table to use */
	  var base_index = 0;
	//  var shoextra;    /* extra bits table to use */
	  var end;                    /* use base and extra for symbol > end */
	  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
	  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
	  var extra = null;
	  var extra_index = 0;

	  var here_bits, here_op, here_val;

	  /*
	   Process a set of code lengths to create a canonical Huffman code.  The
	   code lengths are lens[0..codes-1].  Each length corresponds to the
	   symbols 0..codes-1.  The Huffman code is generated by first sorting the
	   symbols by length from short to long, and retaining the symbol order
	   for codes with equal lengths.  Then the code starts with all zero bits
	   for the first code of the shortest length, and the codes are integer
	   increments for the same length, and zeros are appended as the length
	   increases.  For the deflate format, these bits are stored backwards
	   from their more natural integer increment ordering, and so when the
	   decoding tables are built in the large loop below, the integer codes
	   are incremented backwards.

	   This routine assumes, but does not check, that all of the entries in
	   lens[] are in the range 0..MAXBITS.  The caller must assure this.
	   1..MAXBITS is interpreted as that code length.  zero means that that
	   symbol does not occur in this code.

	   The codes are sorted by computing a count of codes for each length,
	   creating from that a table of starting indices for each length in the
	   sorted table, and then entering the symbols in order in the sorted
	   table.  The sorted table is work[], with that space being provided by
	   the caller.

	   The length counts are used for other purposes as well, i.e. finding
	   the minimum and maximum length codes, determining if there are any
	   codes at all, checking for a valid set of lengths, and looking ahead
	   at length counts to determine sub-table sizes when building the
	   decoding tables.
	   */

	  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
	  for (len = 0; len <= MAXBITS; len++) {
	    count[len] = 0;
	  }
	  for (sym = 0; sym < codes; sym++) {
	    count[lens[lens_index + sym]]++;
	  }

	  /* bound code lengths, force root to be within code lengths */
	  root = bits;
	  for (max = MAXBITS; max >= 1; max--) {
	    if (count[max] !== 0) { break; }
	  }
	  if (root > max) {
	    root = max;
	  }
	  if (max === 0) {                     /* no symbols to code at all */
	    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
	    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
	    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
	    table[table_index++] = (1 << 24) | (64 << 16) | 0;


	    //table.op[opts.table_index] = 64;
	    //table.bits[opts.table_index] = 1;
	    //table.val[opts.table_index++] = 0;
	    table[table_index++] = (1 << 24) | (64 << 16) | 0;

	    opts.bits = 1;
	    return 0;     /* no symbols, but wait for decoding to report error */
	  }
	  for (min = 1; min < max; min++) {
	    if (count[min] !== 0) { break; }
	  }
	  if (root < min) {
	    root = min;
	  }

	  /* check for an over-subscribed or incomplete set of lengths */
	  left = 1;
	  for (len = 1; len <= MAXBITS; len++) {
	    left <<= 1;
	    left -= count[len];
	    if (left < 0) {
	      return -1;
	    }        /* over-subscribed */
	  }
	  if (left > 0 && (type === CODES || max !== 1)) {
	    return -1;                      /* incomplete set */
	  }

	  /* generate offsets into symbol table for each length for sorting */
	  offs[1] = 0;
	  for (len = 1; len < MAXBITS; len++) {
	    offs[len + 1] = offs[len] + count[len];
	  }

	  /* sort symbols by length, by symbol order within each length */
	  for (sym = 0; sym < codes; sym++) {
	    if (lens[lens_index + sym] !== 0) {
	      work[offs[lens[lens_index + sym]]++] = sym;
	    }
	  }

	  /*
	   Create and fill in decoding tables.  In this loop, the table being
	   filled is at next and has curr index bits.  The code being used is huff
	   with length len.  That code is converted to an index by dropping drop
	   bits off of the bottom.  For codes where len is less than drop + curr,
	   those top drop + curr - len bits are incremented through all values to
	   fill the table with replicated entries.

	   root is the number of index bits for the root table.  When len exceeds
	   root, sub-tables are created pointed to by the root entry with an index
	   of the low root bits of huff.  This is saved in low to check for when a
	   new sub-table should be started.  drop is zero when the root table is
	   being filled, and drop is root when sub-tables are being filled.

	   When a new sub-table is needed, it is necessary to look ahead in the
	   code lengths to determine what size sub-table is needed.  The length
	   counts are used for this, and so count[] is decremented as codes are
	   entered in the tables.

	   used keeps track of how many table entries have been allocated from the
	   provided *table space.  It is checked for LENS and DIST tables against
	   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
	   the initial root table size constants.  See the comments in inftrees.h
	   for more information.

	   sym increments through all symbols, and the loop terminates when
	   all codes of length max, i.e. all codes, have been processed.  This
	   routine permits incomplete codes, so another loop after this one fills
	   in the rest of the decoding tables with invalid code markers.
	   */

	  /* set up for code type */
	  // poor man optimization - use if-else instead of switch,
	  // to avoid deopts in old v8
	  if (type === CODES) {
	    base = extra = work;    /* dummy value--not used */
	    end = 19;

	  } else if (type === LENS) {
	    base = lbase;
	    base_index -= 257;
	    extra = lext;
	    extra_index -= 257;
	    end = 256;

	  } else {                    /* DISTS */
	    base = dbase;
	    extra = dext;
	    end = -1;
	  }

	  /* initialize opts for loop */
	  huff = 0;                   /* starting code */
	  sym = 0;                    /* starting code symbol */
	  len = min;                  /* starting code length */
	  next = table_index;              /* current table to fill in */
	  curr = root;                /* current table index bits */
	  drop = 0;                   /* current bits to drop from code for index */
	  low = -1;                   /* trigger new sub-table when len > root */
	  used = 1 << root;          /* use root table entries */
	  mask = used - 1;            /* mask for comparing low */

	  /* check available table space */
	  if ((type === LENS && used > ENOUGH_LENS) ||
	    (type === DISTS && used > ENOUGH_DISTS)) {
	    return 1;
	  }

	  /* process all codes and make table entries */
	  for (;;) {
	    /* create table entry */
	    here_bits = len - drop;
	    if (work[sym] < end) {
	      here_op = 0;
	      here_val = work[sym];
	    }
	    else if (work[sym] > end) {
	      here_op = extra[extra_index + work[sym]];
	      here_val = base[base_index + work[sym]];
	    }
	    else {
	      here_op = 32 + 64;         /* end of block */
	      here_val = 0;
	    }

	    /* replicate for those indices with low len bits equal to huff */
	    incr = 1 << (len - drop);
	    fill = 1 << curr;
	    min = fill;                 /* save offset to next table */
	    do {
	      fill -= incr;
	      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
	    } while (fill !== 0);

	    /* backwards increment the len-bit code huff */
	    incr = 1 << (len - 1);
	    while (huff & incr) {
	      incr >>= 1;
	    }
	    if (incr !== 0) {
	      huff &= incr - 1;
	      huff += incr;
	    } else {
	      huff = 0;
	    }

	    /* go to next symbol, update count, len */
	    sym++;
	    if (--count[len] === 0) {
	      if (len === max) { break; }
	      len = lens[lens_index + work[sym]];
	    }

	    /* create new sub-table if needed */
	    if (len > root && (huff & mask) !== low) {
	      /* if first time, transition to sub-tables */
	      if (drop === 0) {
	        drop = root;
	      }

	      /* increment past last table */
	      next += min;            /* here min is 1 << curr */

	      /* determine length of next table */
	      curr = len - drop;
	      left = 1 << curr;
	      while (curr + drop < max) {
	        left -= count[curr + drop];
	        if (left <= 0) { break; }
	        curr++;
	        left <<= 1;
	      }

	      /* check for enough space */
	      used += 1 << curr;
	      if ((type === LENS && used > ENOUGH_LENS) ||
	        (type === DISTS && used > ENOUGH_DISTS)) {
	        return 1;
	      }

	      /* point entry in root table to sub-table */
	      low = huff & mask;
	      /*table.op[low] = curr;
	      table.bits[low] = root;
	      table.val[low] = next - opts.table_index;*/
	      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
	    }
	  }

	  /* fill in remaining table entry if code is incomplete (guaranteed to have
	   at most one remaining entry, since if the code is incomplete, the
	   maximum code length that was allowed to get this far is one bit) */
	  if (huff !== 0) {
	    //table.op[next + huff] = 64;            /* invalid code marker */
	    //table.bits[next + huff] = len - drop;
	    //table.val[next + huff] = 0;
	    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
	  }

	  /* set return parameters */
	  //opts.table_index += used;
	  opts.bits = root;
	  return 0;
	};

	},{"../utils/common":62}],72:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	module.exports = {
	  2:      'need dictionary',     /* Z_NEED_DICT       2  */
	  1:      'stream end',          /* Z_STREAM_END      1  */
	  0:      '',                    /* Z_OK              0  */
	  '-1':   'file error',          /* Z_ERRNO         (-1) */
	  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
	  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
	  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
	  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
	  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
	};

	},{}],73:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	var utils = require('../utils/common');

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	//var Z_FILTERED          = 1;
	//var Z_HUFFMAN_ONLY      = 2;
	//var Z_RLE               = 3;
	var Z_FIXED               = 4;
	//var Z_DEFAULT_STRATEGY  = 0;

	/* Possible values of the data_type field (though see inflate()) */
	var Z_BINARY              = 0;
	var Z_TEXT                = 1;
	//var Z_ASCII             = 1; // = Z_TEXT
	var Z_UNKNOWN             = 2;

	/*============================================================================*/


	function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

	// From zutil.h

	var STORED_BLOCK = 0;
	var STATIC_TREES = 1;
	var DYN_TREES    = 2;
	/* The three kinds of block type */

	var MIN_MATCH    = 3;
	var MAX_MATCH    = 258;
	/* The minimum and maximum match lengths */

	// From deflate.h
	/* ===========================================================================
	 * Internal compression state.
	 */

	var LENGTH_CODES  = 29;
	/* number of length codes, not counting the special END_BLOCK code */

	var LITERALS      = 256;
	/* number of literal bytes 0..255 */

	var L_CODES       = LITERALS + 1 + LENGTH_CODES;
	/* number of Literal or Length codes, including the END_BLOCK code */

	var D_CODES       = 30;
	/* number of distance codes */

	var BL_CODES      = 19;
	/* number of codes used to transfer the bit lengths */

	var HEAP_SIZE     = 2 * L_CODES + 1;
	/* maximum heap size */

	var MAX_BITS      = 15;
	/* All codes must not exceed MAX_BITS bits */

	var Buf_size      = 16;
	/* size of bit buffer in bi_buf */


	/* ===========================================================================
	 * Constants
	 */

	var MAX_BL_BITS = 7;
	/* Bit length codes must not exceed MAX_BL_BITS bits */

	var END_BLOCK   = 256;
	/* end of block literal code */

	var REP_3_6     = 16;
	/* repeat previous bit length 3-6 times (2 bits of repeat count) */

	var REPZ_3_10   = 17;
	/* repeat a zero length 3-10 times  (3 bits of repeat count) */

	var REPZ_11_138 = 18;
	/* repeat a zero length 11-138 times  (7 bits of repeat count) */

	/* eslint-disable comma-spacing,array-bracket-spacing */
	var extra_lbits =   /* extra bits for each length code */
	  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

	var extra_dbits =   /* extra bits for each distance code */
	  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

	var extra_blbits =  /* extra bits for each bit length code */
	  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

	var bl_order =
	  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
	/* eslint-enable comma-spacing,array-bracket-spacing */

	/* The lengths of the bit length codes are sent in order of decreasing
	 * probability, to avoid transmitting the lengths for unused bit length codes.
	 */

	/* ===========================================================================
	 * Local data. These are initialized only once.
	 */

	// We pre-fill arrays with 0 to avoid uninitialized gaps

	var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

	// !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
	var static_ltree  = new Array((L_CODES + 2) * 2);
	zero(static_ltree);
	/* The static literal tree. Since the bit lengths are imposed, there is no
	 * need for the L_CODES extra codes used during heap construction. However
	 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
	 * below).
	 */

	var static_dtree  = new Array(D_CODES * 2);
	zero(static_dtree);
	/* The static distance tree. (Actually a trivial tree since all codes use
	 * 5 bits.)
	 */

	var _dist_code    = new Array(DIST_CODE_LEN);
	zero(_dist_code);
	/* Distance codes. The first 256 values correspond to the distances
	 * 3 .. 258, the last 256 values correspond to the top 8 bits of
	 * the 15 bit distances.
	 */

	var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
	zero(_length_code);
	/* length code for each normalized match length (0 == MIN_MATCH) */

	var base_length   = new Array(LENGTH_CODES);
	zero(base_length);
	/* First normalized length for each code (0 = MIN_MATCH) */

	var base_dist     = new Array(D_CODES);
	zero(base_dist);
	/* First normalized distance for each code (0 = distance of 1) */


	function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

	  this.static_tree  = static_tree;  /* static tree or NULL */
	  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
	  this.extra_base   = extra_base;   /* base index for extra_bits */
	  this.elems        = elems;        /* max number of elements in the tree */
	  this.max_length   = max_length;   /* max bit length for the codes */

	  // show if `static_tree` has data or dummy - needed for monomorphic objects
	  this.has_stree    = static_tree && static_tree.length;
	}


	var static_l_desc;
	var static_d_desc;
	var static_bl_desc;


	function TreeDesc(dyn_tree, stat_desc) {
	  this.dyn_tree = dyn_tree;     /* the dynamic tree */
	  this.max_code = 0;            /* largest code with non zero frequency */
	  this.stat_desc = stat_desc;   /* the corresponding static tree */
	}



	function d_code(dist) {
	  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
	}


	/* ===========================================================================
	 * Output a short LSB first on the stream.
	 * IN assertion: there is enough room in pendingBuf.
	 */
	function put_short(s, w) {
	//    put_byte(s, (uch)((w) & 0xff));
	//    put_byte(s, (uch)((ush)(w) >> 8));
	  s.pending_buf[s.pending++] = (w) & 0xff;
	  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
	}


	/* ===========================================================================
	 * Send a value on a given number of bits.
	 * IN assertion: length <= 16 and value fits in length bits.
	 */
	function send_bits(s, value, length) {
	  if (s.bi_valid > (Buf_size - length)) {
	    s.bi_buf |= (value << s.bi_valid) & 0xffff;
	    put_short(s, s.bi_buf);
	    s.bi_buf = value >> (Buf_size - s.bi_valid);
	    s.bi_valid += length - Buf_size;
	  } else {
	    s.bi_buf |= (value << s.bi_valid) & 0xffff;
	    s.bi_valid += length;
	  }
	}


	function send_code(s, c, tree) {
	  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
	}


	/* ===========================================================================
	 * Reverse the first len bits of a code, using straightforward code (a faster
	 * method would use a table)
	 * IN assertion: 1 <= len <= 15
	 */
	function bi_reverse(code, len) {
	  var res = 0;
	  do {
	    res |= code & 1;
	    code >>>= 1;
	    res <<= 1;
	  } while (--len > 0);
	  return res >>> 1;
	}


	/* ===========================================================================
	 * Flush the bit buffer, keeping at most 7 bits in it.
	 */
	function bi_flush(s) {
	  if (s.bi_valid === 16) {
	    put_short(s, s.bi_buf);
	    s.bi_buf = 0;
	    s.bi_valid = 0;

	  } else if (s.bi_valid >= 8) {
	    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
	    s.bi_buf >>= 8;
	    s.bi_valid -= 8;
	  }
	}


	/* ===========================================================================
	 * Compute the optimal bit lengths for a tree and update the total bit length
	 * for the current block.
	 * IN assertion: the fields freq and dad are set, heap[heap_max] and
	 *    above are the tree nodes sorted by increasing frequency.
	 * OUT assertions: the field len is set to the optimal bit length, the
	 *     array bl_count contains the frequencies for each bit length.
	 *     The length opt_len is updated; static_len is also updated if stree is
	 *     not null.
	 */
	function gen_bitlen(s, desc)
	//    deflate_state *s;
	//    tree_desc *desc;    /* the tree descriptor */
	{
	  var tree            = desc.dyn_tree;
	  var max_code        = desc.max_code;
	  var stree           = desc.stat_desc.static_tree;
	  var has_stree       = desc.stat_desc.has_stree;
	  var extra           = desc.stat_desc.extra_bits;
	  var base            = desc.stat_desc.extra_base;
	  var max_length      = desc.stat_desc.max_length;
	  var h;              /* heap index */
	  var n, m;           /* iterate over the tree elements */
	  var bits;           /* bit length */
	  var xbits;          /* extra bits */
	  var f;              /* frequency */
	  var overflow = 0;   /* number of elements with bit length too large */

	  for (bits = 0; bits <= MAX_BITS; bits++) {
	    s.bl_count[bits] = 0;
	  }

	  /* In a first pass, compute the optimal bit lengths (which may
	   * overflow in the case of the bit length tree).
	   */
	  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

	  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
	    n = s.heap[h];
	    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
	    if (bits > max_length) {
	      bits = max_length;
	      overflow++;
	    }
	    tree[n * 2 + 1]/*.Len*/ = bits;
	    /* We overwrite tree[n].Dad which is no longer needed */

	    if (n > max_code) { continue; } /* not a leaf node */

	    s.bl_count[bits]++;
	    xbits = 0;
	    if (n >= base) {
	      xbits = extra[n - base];
	    }
	    f = tree[n * 2]/*.Freq*/;
	    s.opt_len += f * (bits + xbits);
	    if (has_stree) {
	      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
	    }
	  }
	  if (overflow === 0) { return; }

	  // Trace((stderr,"\nbit length overflow\n"));
	  /* This happens for example on obj2 and pic of the Calgary corpus */

	  /* Find the first bit length which could increase: */
	  do {
	    bits = max_length - 1;
	    while (s.bl_count[bits] === 0) { bits--; }
	    s.bl_count[bits]--;      /* move one leaf down the tree */
	    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
	    s.bl_count[max_length]--;
	    /* The brother of the overflow item also moves one step up,
	     * but this does not affect bl_count[max_length]
	     */
	    overflow -= 2;
	  } while (overflow > 0);

	  /* Now recompute all bit lengths, scanning in increasing frequency.
	   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
	   * lengths instead of fixing only the wrong ones. This idea is taken
	   * from 'ar' written by Haruhiko Okumura.)
	   */
	  for (bits = max_length; bits !== 0; bits--) {
	    n = s.bl_count[bits];
	    while (n !== 0) {
	      m = s.heap[--h];
	      if (m > max_code) { continue; }
	      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
	        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
	        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
	        tree[m * 2 + 1]/*.Len*/ = bits;
	      }
	      n--;
	    }
	  }
	}


	/* ===========================================================================
	 * Generate the codes for a given tree and bit counts (which need not be
	 * optimal).
	 * IN assertion: the array bl_count contains the bit length statistics for
	 * the given tree and the field len is set for all tree elements.
	 * OUT assertion: the field code is set for all tree elements of non
	 *     zero code length.
	 */
	function gen_codes(tree, max_code, bl_count)
	//    ct_data *tree;             /* the tree to decorate */
	//    int max_code;              /* largest code with non zero frequency */
	//    ushf *bl_count;            /* number of codes at each bit length */
	{
	  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
	  var code = 0;              /* running code value */
	  var bits;                  /* bit index */
	  var n;                     /* code index */

	  /* The distribution counts are first used to generate the code values
	   * without bit reversal.
	   */
	  for (bits = 1; bits <= MAX_BITS; bits++) {
	    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
	  }
	  /* Check that the bit counts in bl_count are consistent. The last code
	   * must be all ones.
	   */
	  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
	  //        "inconsistent bit counts");
	  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

	  for (n = 0;  n <= max_code; n++) {
	    var len = tree[n * 2 + 1]/*.Len*/;
	    if (len === 0) { continue; }
	    /* Now reverse the bits */
	    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

	    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
	    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
	  }
	}


	/* ===========================================================================
	 * Initialize the various 'constant' tables.
	 */
	function tr_static_init() {
	  var n;        /* iterates over tree elements */
	  var bits;     /* bit counter */
	  var length;   /* length value */
	  var code;     /* code value */
	  var dist;     /* distance index */
	  var bl_count = new Array(MAX_BITS + 1);
	  /* number of codes at each bit length for an optimal tree */

	  // do check in _tr_init()
	  //if (static_init_done) return;

	  /* For some embedded targets, global variables are not initialized: */
	/*#ifdef NO_INIT_GLOBAL_POINTERS
	  static_l_desc.static_tree = static_ltree;
	  static_l_desc.extra_bits = extra_lbits;
	  static_d_desc.static_tree = static_dtree;
	  static_d_desc.extra_bits = extra_dbits;
	  static_bl_desc.extra_bits = extra_blbits;
	#endif*/

	  /* Initialize the mapping length (0..255) -> length code (0..28) */
	  length = 0;
	  for (code = 0; code < LENGTH_CODES - 1; code++) {
	    base_length[code] = length;
	    for (n = 0; n < (1 << extra_lbits[code]); n++) {
	      _length_code[length++] = code;
	    }
	  }
	  //Assert (length == 256, "tr_static_init: length != 256");
	  /* Note that the length 255 (match length 258) can be represented
	   * in two different ways: code 284 + 5 bits or code 285, so we
	   * overwrite length_code[255] to use the best encoding:
	   */
	  _length_code[length - 1] = code;

	  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
	  dist = 0;
	  for (code = 0; code < 16; code++) {
	    base_dist[code] = dist;
	    for (n = 0; n < (1 << extra_dbits[code]); n++) {
	      _dist_code[dist++] = code;
	    }
	  }
	  //Assert (dist == 256, "tr_static_init: dist != 256");
	  dist >>= 7; /* from now on, all distances are divided by 128 */
	  for (; code < D_CODES; code++) {
	    base_dist[code] = dist << 7;
	    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
	      _dist_code[256 + dist++] = code;
	    }
	  }
	  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

	  /* Construct the codes of the static literal tree */
	  for (bits = 0; bits <= MAX_BITS; bits++) {
	    bl_count[bits] = 0;
	  }

	  n = 0;
	  while (n <= 143) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 8;
	    n++;
	    bl_count[8]++;
	  }
	  while (n <= 255) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 9;
	    n++;
	    bl_count[9]++;
	  }
	  while (n <= 279) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 7;
	    n++;
	    bl_count[7]++;
	  }
	  while (n <= 287) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 8;
	    n++;
	    bl_count[8]++;
	  }
	  /* Codes 286 and 287 do not exist, but we must include them in the
	   * tree construction to get a canonical Huffman tree (longest code
	   * all ones)
	   */
	  gen_codes(static_ltree, L_CODES + 1, bl_count);

	  /* The static distance tree is trivial: */
	  for (n = 0; n < D_CODES; n++) {
	    static_dtree[n * 2 + 1]/*.Len*/ = 5;
	    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
	  }

	  // Now data ready and we can init static trees
	  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
	  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
	  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

	  //static_init_done = true;
	}


	/* ===========================================================================
	 * Initialize a new block.
	 */
	function init_block(s) {
	  var n; /* iterates over tree elements */

	  /* Initialize the trees. */
	  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
	  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
	  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

	  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
	  s.opt_len = s.static_len = 0;
	  s.last_lit = s.matches = 0;
	}


	/* ===========================================================================
	 * Flush the bit buffer and align the output on a byte boundary
	 */
	function bi_windup(s)
	{
	  if (s.bi_valid > 8) {
	    put_short(s, s.bi_buf);
	  } else if (s.bi_valid > 0) {
	    //put_byte(s, (Byte)s->bi_buf);
	    s.pending_buf[s.pending++] = s.bi_buf;
	  }
	  s.bi_buf = 0;
	  s.bi_valid = 0;
	}

	/* ===========================================================================
	 * Copy a stored block, storing first the length and its
	 * one's complement if requested.
	 */
	function copy_block(s, buf, len, header)
	//DeflateState *s;
	//charf    *buf;    /* the input data */
	//unsigned len;     /* its length */
	//int      header;  /* true if block header must be written */
	{
	  bi_windup(s);        /* align on byte boundary */

	  if (header) {
	    put_short(s, len);
	    put_short(s, ~len);
	  }
	//  while (len--) {
	//    put_byte(s, *buf++);
	//  }
	  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
	  s.pending += len;
	}

	/* ===========================================================================
	 * Compares to subtrees, using the tree depth as tie breaker when
	 * the subtrees have equal frequency. This minimizes the worst case length.
	 */
	function smaller(tree, n, m, depth) {
	  var _n2 = n * 2;
	  var _m2 = m * 2;
	  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
	         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
	}

	/* ===========================================================================
	 * Restore the heap property by moving down the tree starting at node k,
	 * exchanging a node with the smallest of its two sons if necessary, stopping
	 * when the heap property is re-established (each father smaller than its
	 * two sons).
	 */
	function pqdownheap(s, tree, k)
	//    deflate_state *s;
	//    ct_data *tree;  /* the tree to restore */
	//    int k;               /* node to move down */
	{
	  var v = s.heap[k];
	  var j = k << 1;  /* left son of k */
	  while (j <= s.heap_len) {
	    /* Set j to the smallest of the two sons: */
	    if (j < s.heap_len &&
	      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
	      j++;
	    }
	    /* Exit if v is smaller than both sons */
	    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

	    /* Exchange v with the smallest son */
	    s.heap[k] = s.heap[j];
	    k = j;

	    /* And continue down the tree, setting j to the left son of k */
	    j <<= 1;
	  }
	  s.heap[k] = v;
	}


	// inlined manually
	// var SMALLEST = 1;

	/* ===========================================================================
	 * Send the block data compressed using the given Huffman trees
	 */
	function compress_block(s, ltree, dtree)
	//    deflate_state *s;
	//    const ct_data *ltree; /* literal tree */
	//    const ct_data *dtree; /* distance tree */
	{
	  var dist;           /* distance of matched string */
	  var lc;             /* match length or unmatched char (if dist == 0) */
	  var lx = 0;         /* running index in l_buf */
	  var code;           /* the code to send */
	  var extra;          /* number of extra bits to send */

	  if (s.last_lit !== 0) {
	    do {
	      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
	      lc = s.pending_buf[s.l_buf + lx];
	      lx++;

	      if (dist === 0) {
	        send_code(s, lc, ltree); /* send a literal byte */
	        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
	      } else {
	        /* Here, lc is the match length - MIN_MATCH */
	        code = _length_code[lc];
	        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
	        extra = extra_lbits[code];
	        if (extra !== 0) {
	          lc -= base_length[code];
	          send_bits(s, lc, extra);       /* send the extra length bits */
	        }
	        dist--; /* dist is now the match distance - 1 */
	        code = d_code(dist);
	        //Assert (code < D_CODES, "bad d_code");

	        send_code(s, code, dtree);       /* send the distance code */
	        extra = extra_dbits[code];
	        if (extra !== 0) {
	          dist -= base_dist[code];
	          send_bits(s, dist, extra);   /* send the extra distance bits */
	        }
	      } /* literal or match pair ? */

	      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
	      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
	      //       "pendingBuf overflow");

	    } while (lx < s.last_lit);
	  }

	  send_code(s, END_BLOCK, ltree);
	}


	/* ===========================================================================
	 * Construct one Huffman tree and assigns the code bit strings and lengths.
	 * Update the total bit length for the current block.
	 * IN assertion: the field freq is set for all tree elements.
	 * OUT assertions: the fields len and code are set to the optimal bit length
	 *     and corresponding code. The length opt_len is updated; static_len is
	 *     also updated if stree is not null. The field max_code is set.
	 */
	function build_tree(s, desc)
	//    deflate_state *s;
	//    tree_desc *desc; /* the tree descriptor */
	{
	  var tree     = desc.dyn_tree;
	  var stree    = desc.stat_desc.static_tree;
	  var has_stree = desc.stat_desc.has_stree;
	  var elems    = desc.stat_desc.elems;
	  var n, m;          /* iterate over heap elements */
	  var max_code = -1; /* largest code with non zero frequency */
	  var node;          /* new node being created */

	  /* Construct the initial heap, with least frequent element in
	   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
	   * heap[0] is not used.
	   */
	  s.heap_len = 0;
	  s.heap_max = HEAP_SIZE;

	  for (n = 0; n < elems; n++) {
	    if (tree[n * 2]/*.Freq*/ !== 0) {
	      s.heap[++s.heap_len] = max_code = n;
	      s.depth[n] = 0;

	    } else {
	      tree[n * 2 + 1]/*.Len*/ = 0;
	    }
	  }

	  /* The pkzip format requires that at least one distance code exists,
	   * and that at least one bit should be sent even if there is only one
	   * possible code. So to avoid special checks later on we force at least
	   * two codes of non zero frequency.
	   */
	  while (s.heap_len < 2) {
	    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
	    tree[node * 2]/*.Freq*/ = 1;
	    s.depth[node] = 0;
	    s.opt_len--;

	    if (has_stree) {
	      s.static_len -= stree[node * 2 + 1]/*.Len*/;
	    }
	    /* node is 0 or 1 so it does not have extra bits */
	  }
	  desc.max_code = max_code;

	  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
	   * establish sub-heaps of increasing lengths:
	   */
	  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

	  /* Construct the Huffman tree by repeatedly combining the least two
	   * frequent nodes.
	   */
	  node = elems;              /* next internal node of the tree */
	  do {
	    //pqremove(s, tree, n);  /* n = node of least frequency */
	    /*** pqremove ***/
	    n = s.heap[1/*SMALLEST*/];
	    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
	    pqdownheap(s, tree, 1/*SMALLEST*/);
	    /***/

	    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

	    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
	    s.heap[--s.heap_max] = m;

	    /* Create a new node father of n and m */
	    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
	    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
	    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

	    /* and insert the new node in the heap */
	    s.heap[1/*SMALLEST*/] = node++;
	    pqdownheap(s, tree, 1/*SMALLEST*/);

	  } while (s.heap_len >= 2);

	  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

	  /* At this point, the fields freq and dad are set. We can now
	   * generate the bit lengths.
	   */
	  gen_bitlen(s, desc);

	  /* The field len is now set, we can generate the bit codes */
	  gen_codes(tree, max_code, s.bl_count);
	}


	/* ===========================================================================
	 * Scan a literal or distance tree to determine the frequencies of the codes
	 * in the bit length tree.
	 */
	function scan_tree(s, tree, max_code)
	//    deflate_state *s;
	//    ct_data *tree;   /* the tree to be scanned */
	//    int max_code;    /* and its largest code of non zero frequency */
	{
	  var n;                     /* iterates over all tree elements */
	  var prevlen = -1;          /* last emitted length */
	  var curlen;                /* length of current code */

	  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

	  var count = 0;             /* repeat count of the current code */
	  var max_count = 7;         /* max repeat count */
	  var min_count = 4;         /* min repeat count */

	  if (nextlen === 0) {
	    max_count = 138;
	    min_count = 3;
	  }
	  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

	  for (n = 0; n <= max_code; n++) {
	    curlen = nextlen;
	    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

	    if (++count < max_count && curlen === nextlen) {
	      continue;

	    } else if (count < min_count) {
	      s.bl_tree[curlen * 2]/*.Freq*/ += count;

	    } else if (curlen !== 0) {

	      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
	      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

	    } else if (count <= 10) {
	      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

	    } else {
	      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
	    }

	    count = 0;
	    prevlen = curlen;

	    if (nextlen === 0) {
	      max_count = 138;
	      min_count = 3;

	    } else if (curlen === nextlen) {
	      max_count = 6;
	      min_count = 3;

	    } else {
	      max_count = 7;
	      min_count = 4;
	    }
	  }
	}


	/* ===========================================================================
	 * Send a literal or distance tree in compressed form, using the codes in
	 * bl_tree.
	 */
	function send_tree(s, tree, max_code)
	//    deflate_state *s;
	//    ct_data *tree; /* the tree to be scanned */
	//    int max_code;       /* and its largest code of non zero frequency */
	{
	  var n;                     /* iterates over all tree elements */
	  var prevlen = -1;          /* last emitted length */
	  var curlen;                /* length of current code */

	  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

	  var count = 0;             /* repeat count of the current code */
	  var max_count = 7;         /* max repeat count */
	  var min_count = 4;         /* min repeat count */

	  /* tree[max_code+1].Len = -1; */  /* guard already set */
	  if (nextlen === 0) {
	    max_count = 138;
	    min_count = 3;
	  }

	  for (n = 0; n <= max_code; n++) {
	    curlen = nextlen;
	    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

	    if (++count < max_count && curlen === nextlen) {
	      continue;

	    } else if (count < min_count) {
	      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

	    } else if (curlen !== 0) {
	      if (curlen !== prevlen) {
	        send_code(s, curlen, s.bl_tree);
	        count--;
	      }
	      //Assert(count >= 3 && count <= 6, " 3_6?");
	      send_code(s, REP_3_6, s.bl_tree);
	      send_bits(s, count - 3, 2);

	    } else if (count <= 10) {
	      send_code(s, REPZ_3_10, s.bl_tree);
	      send_bits(s, count - 3, 3);

	    } else {
	      send_code(s, REPZ_11_138, s.bl_tree);
	      send_bits(s, count - 11, 7);
	    }

	    count = 0;
	    prevlen = curlen;
	    if (nextlen === 0) {
	      max_count = 138;
	      min_count = 3;

	    } else if (curlen === nextlen) {
	      max_count = 6;
	      min_count = 3;

	    } else {
	      max_count = 7;
	      min_count = 4;
	    }
	  }
	}


	/* ===========================================================================
	 * Construct the Huffman tree for the bit lengths and return the index in
	 * bl_order of the last bit length code to send.
	 */
	function build_bl_tree(s) {
	  var max_blindex;  /* index of last bit length code of non zero freq */

	  /* Determine the bit length frequencies for literal and distance trees */
	  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
	  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

	  /* Build the bit length tree: */
	  build_tree(s, s.bl_desc);
	  /* opt_len now includes the length of the tree representations, except
	   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
	   */

	  /* Determine the number of bit length codes to send. The pkzip format
	   * requires that at least 4 bit length codes be sent. (appnote.txt says
	   * 3 but the actual value used is 4.)
	   */
	  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
	    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
	      break;
	    }
	  }
	  /* Update opt_len to include the bit length tree and counts */
	  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
	  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
	  //        s->opt_len, s->static_len));

	  return max_blindex;
	}


	/* ===========================================================================
	 * Send the header for a block using dynamic Huffman trees: the counts, the
	 * lengths of the bit length codes, the literal tree and the distance tree.
	 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
	 */
	function send_all_trees(s, lcodes, dcodes, blcodes)
	//    deflate_state *s;
	//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
	{
	  var rank;                    /* index in bl_order */

	  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
	  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
	  //        "too many codes");
	  //Tracev((stderr, "\nbl counts: "));
	  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
	  send_bits(s, dcodes - 1,   5);
	  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
	  for (rank = 0; rank < blcodes; rank++) {
	    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
	    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
	  }
	  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

	  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
	  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

	  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
	  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
	}


	/* ===========================================================================
	 * Check if the data type is TEXT or BINARY, using the following algorithm:
	 * - TEXT if the two conditions below are satisfied:
	 *    a) There are no non-portable control characters belonging to the
	 *       "black list" (0..6, 14..25, 28..31).
	 *    b) There is at least one printable character belonging to the
	 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
	 * - BINARY otherwise.
	 * - The following partially-portable control characters form a
	 *   "gray list" that is ignored in this detection algorithm:
	 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
	 * IN assertion: the fields Freq of dyn_ltree are set.
	 */
	function detect_data_type(s) {
	  /* black_mask is the bit mask of black-listed bytes
	   * set bits 0..6, 14..25, and 28..31
	   * 0xf3ffc07f = binary 11110011111111111100000001111111
	   */
	  var black_mask = 0xf3ffc07f;
	  var n;

	  /* Check for non-textual ("black-listed") bytes. */
	  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
	    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
	      return Z_BINARY;
	    }
	  }

	  /* Check for textual ("white-listed") bytes. */
	  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
	      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
	    return Z_TEXT;
	  }
	  for (n = 32; n < LITERALS; n++) {
	    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
	      return Z_TEXT;
	    }
	  }

	  /* There are no "black-listed" or "white-listed" bytes:
	   * this stream either is empty or has tolerated ("gray-listed") bytes only.
	   */
	  return Z_BINARY;
	}


	var static_init_done = false;

	/* ===========================================================================
	 * Initialize the tree data structures for a new zlib stream.
	 */
	function _tr_init(s)
	{

	  if (!static_init_done) {
	    tr_static_init();
	    static_init_done = true;
	  }

	  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
	  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
	  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

	  s.bi_buf = 0;
	  s.bi_valid = 0;

	  /* Initialize the first block of the first file: */
	  init_block(s);
	}


	/* ===========================================================================
	 * Send a stored block
	 */
	function _tr_stored_block(s, buf, stored_len, last)
	//DeflateState *s;
	//charf *buf;       /* input block */
	//ulg stored_len;   /* length of input block */
	//int last;         /* one if this is the last block for a file */
	{
	  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
	  copy_block(s, buf, stored_len, true); /* with header */
	}


	/* ===========================================================================
	 * Send one empty static block to give enough lookahead for inflate.
	 * This takes 10 bits, of which 7 may remain in the bit buffer.
	 */
	function _tr_align(s) {
	  send_bits(s, STATIC_TREES << 1, 3);
	  send_code(s, END_BLOCK, static_ltree);
	  bi_flush(s);
	}


	/* ===========================================================================
	 * Determine the best encoding for the current block: dynamic trees, static
	 * trees or store, and output the encoded block to the zip file.
	 */
	function _tr_flush_block(s, buf, stored_len, last)
	//DeflateState *s;
	//charf *buf;       /* input block, or NULL if too old */
	//ulg stored_len;   /* length of input block */
	//int last;         /* one if this is the last block for a file */
	{
	  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
	  var max_blindex = 0;        /* index of last bit length code of non zero freq */

	  /* Build the Huffman trees unless a stored block is forced */
	  if (s.level > 0) {

	    /* Check if the file is binary or text */
	    if (s.strm.data_type === Z_UNKNOWN) {
	      s.strm.data_type = detect_data_type(s);
	    }

	    /* Construct the literal and distance trees */
	    build_tree(s, s.l_desc);
	    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
	    //        s->static_len));

	    build_tree(s, s.d_desc);
	    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
	    //        s->static_len));
	    /* At this point, opt_len and static_len are the total bit lengths of
	     * the compressed block data, excluding the tree representations.
	     */

	    /* Build the bit length tree for the above two trees, and get the index
	     * in bl_order of the last bit length code to send.
	     */
	    max_blindex = build_bl_tree(s);

	    /* Determine the best encoding. Compute the block lengths in bytes. */
	    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
	    static_lenb = (s.static_len + 3 + 7) >>> 3;

	    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
	    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
	    //        s->last_lit));

	    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

	  } else {
	    // Assert(buf != (char*)0, "lost buf");
	    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
	  }

	  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
	    /* 4: two words for the lengths */

	    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
	     * Otherwise we can't have processed more than WSIZE input bytes since
	     * the last block flush, because compression would have been
	     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
	     * transform a block into a stored block.
	     */
	    _tr_stored_block(s, buf, stored_len, last);

	  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

	    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
	    compress_block(s, static_ltree, static_dtree);

	  } else {
	    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
	    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
	    compress_block(s, s.dyn_ltree, s.dyn_dtree);
	  }
	  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
	  /* The above check is made mod 2^32, for files larger than 512 MB
	   * and uLong implemented on 32 bits.
	   */
	  init_block(s);

	  if (last) {
	    bi_windup(s);
	  }
	  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
	  //       s->compressed_len-7*last));
	}

	/* ===========================================================================
	 * Save the match info and tally the frequency counts. Return true if
	 * the current block must be flushed.
	 */
	function _tr_tally(s, dist, lc)
	//    deflate_state *s;
	//    unsigned dist;  /* distance of matched string */
	//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
	{
	  //var out_length, in_length, dcode;

	  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
	  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

	  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
	  s.last_lit++;

	  if (dist === 0) {
	    /* lc is the unmatched char */
	    s.dyn_ltree[lc * 2]/*.Freq*/++;
	  } else {
	    s.matches++;
	    /* Here, lc is the match length - MIN_MATCH */
	    dist--;             /* dist = match distance - 1 */
	    //Assert((ush)dist < (ush)MAX_DIST(s) &&
	    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
	    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

	    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
	    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
	  }

	// (!) This block is disabled in zlib defailts,
	// don't enable it for binary compatibility

	//#ifdef TRUNCATE_BLOCK
	//  /* Try to guess if it is profitable to stop the current block here */
	//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
	//    /* Compute an upper bound for the compressed length */
	//    out_length = s.last_lit*8;
	//    in_length = s.strstart - s.block_start;
	//
	//    for (dcode = 0; dcode < D_CODES; dcode++) {
	//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
	//    }
	//    out_length >>>= 3;
	//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
	//    //       s->last_lit, in_length, out_length,
	//    //       100L - out_length*100L/in_length));
	//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
	//      return true;
	//    }
	//  }
	//#endif

	  return (s.last_lit === s.lit_bufsize - 1);
	  /* We avoid equality with lit_bufsize because of wraparound at 64K
	   * on 16 bit machines and because stored blocks are restricted to
	   * 64K-1 bytes.
	   */
	}

	exports._tr_init  = _tr_init;
	exports._tr_stored_block = _tr_stored_block;
	exports._tr_flush_block  = _tr_flush_block;
	exports._tr_tally = _tr_tally;
	exports._tr_align = _tr_align;

	},{"../utils/common":62}],74:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	function ZStream() {
	  /* next input byte */
	  this.input = null; // JS specific, because we have no pointers
	  this.next_in = 0;
	  /* number of bytes available at input */
	  this.avail_in = 0;
	  /* total number of input bytes read so far */
	  this.total_in = 0;
	  /* next output byte should be put there */
	  this.output = null; // JS specific, because we have no pointers
	  this.next_out = 0;
	  /* remaining free space at output */
	  this.avail_out = 0;
	  /* total number of bytes output so far */
	  this.total_out = 0;
	  /* last error message, NULL if no error */
	  this.msg = ''/*Z_NULL*/;
	  /* not visible by applications */
	  this.state = null;
	  /* best guess about the data type: binary or text */
	  this.data_type = 2/*Z_UNKNOWN*/;
	  /* adler32 value of the uncompressed data */
	  this.adler = 0;
	}

	module.exports = ZStream;

	},{}]},{},[10])(10)
	});
	});

	/**
	 * Handles Unzipping a requesting files from an Epub Archive
	 * @class
	 */

	var Archive = function () {
		function Archive() {
			_classCallCheck(this, Archive);

			this.zip = undefined;
			this.urlCache = {};

			this.checkRequirements();
		}

		/**
	  * Checks to see if JSZip exists in global namspace,
	  * Requires JSZip if it isn't there
	  * @private
	  */


		_createClass(Archive, [{
			key: "checkRequirements",
			value: function checkRequirements() {
				try {
					this.zip = new jszip();
				} catch (e) {
					throw new Error("JSZip lib not loaded");
				}
			}

			/**
	   * Open an archive
	   * @param  {binary} input
	   * @param  {boolean} isBase64 tells JSZip if the input data is base64 encoded
	   * @return {Promise} zipfile
	   */

		}, {
			key: "open",
			value: function open(input, isBase64) {
				return this.zip.loadAsync(input, { "base64": isBase64 });
			}

			/**
	   * Load and Open an archive
	   * @param  {string} zipUrl
	   * @param  {boolean} isBase64 tells JSZip if the input data is base64 encoded
	   * @return {Promise} zipfile
	   */

		}, {
			key: "openUrl",
			value: function openUrl(zipUrl, isBase64) {
				return request(zipUrl, "binary").then(function (data) {
					return this.zip.loadAsync(data, { "base64": isBase64 });
				}.bind(this));
			}

			/**
	   * Request a url from the archive
	   * @param  {string} url  a url to request from the archive
	   * @param  {string} [type] specify the type of the returned result
	   * @return {Promise}
	   */

		}, {
			key: "request",
			value: function request$$1(url, type$$1) {
				var deferred = new defer$1();
				var response;
				var path = new Path(url);

				// If type isn't set, determine it from the file extension
				if (!type$$1) {
					type$$1 = path.extension;
				}

				if (type$$1 == "blob") {
					response = this.getBlob(url);
				} else {
					response = this.getText(url);
				}

				if (response) {
					response.then(function (r) {
						var result = this.handleResponse(r, type$$1);
						deferred.resolve(result);
					}.bind(this));
				} else {
					deferred.reject({
						message: "File not found in the epub: " + url,
						stack: new Error().stack
					});
				}
				return deferred.promise;
			}

			/**
	   * Handle the response from request
	   * @private
	   * @param  {any} response
	   * @param  {string} [type]
	   * @return {any} the parsed result
	   */

		}, {
			key: "handleResponse",
			value: function handleResponse(response, type$$1) {
				var r;

				if (type$$1 == "json") {
					r = JSON.parse(response);
				} else if (isXml(type$$1)) {
					r = parse(response, "text/xml");
				} else if (type$$1 == "xhtml") {
					r = parse(response, "application/xhtml+xml");
				} else if (type$$1 == "html" || type$$1 == "htm") {
					r = parse(response, "text/html");
				} else {
					r = response;
				}

				return r;
			}

			/**
	   * Get a Blob from Archive by Url
	   * @param  {string} url
	   * @param  {string} [mimeType]
	   * @return {Blob}
	   */

		}, {
			key: "getBlob",
			value: function getBlob(url, mimeType) {
				var decodededUrl = decodeURIComponent(url.substr(1)); // Remove first slash
				var entry = this.zip.file(decodededUrl);

				if (entry) {
					mimeType = mimeType || mime.lookup(entry.name);
					return entry.async("uint8array").then(function (uint8array) {
						return new Blob([uint8array], { type: mimeType });
					});
				}
			}

			/**
	   * Get Text from Archive by Url
	   * @param  {string} url
	   * @param  {string} [encoding]
	   * @return {string}
	   */

		}, {
			key: "getText",
			value: function getText(url, encoding) {
				var decodededUrl = decodeURIComponent(url.substr(1)); // Remove first slash
				var entry = this.zip.file(decodededUrl);

				if (entry) {
					return entry.async("string").then(function (text) {
						return text;
					});
				}
			}

			/**
	   * Get a base64 encoded result from Archive by Url
	   * @param  {string} url
	   * @param  {string} [mimeType]
	   * @return {string} base64 encoded
	   */

		}, {
			key: "getBase64",
			value: function getBase64(url, mimeType) {
				var decodededUrl = decodeURIComponent(url.substr(1)); // Remove first slash
				var entry = this.zip.file(decodededUrl);

				if (entry) {
					mimeType = mimeType || mime.lookup(entry.name);
					return entry.async("base64").then(function (data) {
						return "data:" + mimeType + ";base64," + data;
					});
				}
			}

			/**
	   * Create a Url from an unarchived item
	   * @param  {string} url
	   * @param  {object} [options.base64] use base64 encoding or blob url
	   * @return {Promise} url promise with Url string
	   */

		}, {
			key: "createUrl",
			value: function createUrl(url, options) {
				var deferred = new defer$1();
				//var _URL = window.URL || window.webkitURL || window.mozURL;
				var tempUrl;
				var response;
				var useBase64 = options && options.base64;

				if (url in this.urlCache) {
					deferred.resolve(this.urlCache[url]);
					return deferred.promise;
				}

				if (useBase64) {
					response = this.getBase64(url);

					if (response) {
						response.then(function (tempUrl) {

							this.urlCache[url] = tempUrl;
							deferred.resolve(tempUrl);
						}.bind(this));
					}
				} else {

					response = this.getBlob(url);

					if (response) {
						response.then(function (blob) {

							tempUrl = URL.createObjectURL(blob);
							this.urlCache[url] = tempUrl;
							deferred.resolve(tempUrl);
						}.bind(this));
					}
				}

				if (!response) {
					deferred.reject({
						message: "File not found in the epub: " + url,
						stack: new Error().stack
					});
				}

				return deferred.promise;
			}

			/**
	   * Revoke Temp Url for a achive item
	   * @param  {string} url url of the item in the archive
	   */

		}, {
			key: "revokeUrl",
			value: function revokeUrl(url) {
				//var _URL = _URL || window.webkitURL || window.mozURL;
				var fromCache = this.urlCache[url];
				if (fromCache) URL.revokeObjectURL(fromCache);
			}
		}, {
			key: "destroy",
			value: function destroy() {
				// var _URL = window.URL || window.webkitURL || window.mozURL;
				for (var fromCache in this.urlCache) {
					URL.revokeObjectURL(fromCache);
				}
				this.zip = undefined;
				this.urlCache = {};
			}
		}]);

		return Archive;
	}();

	var CONTAINER_PATH = "META-INF/container.xml";

	var INPUT_TYPE = {
		BINARY: "binary",
		BASE64: "base64",
		EPUB: "epub",
		OPF: "opf",
		MANIFEST: "json",
		DIRECTORY: "directory"
	};

	/**
	 * An Epub representation with methods for the parsing of its contents.
	 * @class
	 * @param {string} [url]
	 * @param {object} [options]
	 * @param {method} [options.requestMethod] a request function to use instead of the default
	 * @param {boolean} [options.requestCredentials=undefined] send the xhr request withCredentials
	 * @param {object} [options.requestHeaders=undefined] send the xhr request headers
	 * @param {string} [options.encoding=binary] optional to pass 'binary' or base64' for archived Epubs
	 * @param {string} [options.replacements] use base64, blobUrl, or none for replacing assets in archived Epubs
	 * @param {method} [options.cache] use cache to save book contents for a service workers
	 * @returns {Epub}
	 * @example new Epub("/path/to/book.epub", {})
	 * @example new Epub({ replacements: "blobUrl" })
	 */

	var Epub = function () {
		function Epub(url, options) {
			var _this = this;

			_classCallCheck(this, Epub);

			// Allow passing just options to the Book
			if (typeof options === "undefined" && (typeof url === "undefined" ? "undefined" : _typeof(url)) === "object") {
				options = url;
				url = undefined;
			}

			this.settings = extend(this.settings || {}, {
				requestMethod: undefined,
				requestCredentials: undefined,
				requestHeaders: undefined,
				encoding: undefined,
				replacements: undefined,
				cache: undefined,
				stylesheet: null,
				script: null
			});

			extend(this.settings, options);

			this.opening = new defer$1();
			/**
	   * @member {promise} opened returns after the book is loaded
	   * @memberof Book
	   */
			this.opened = this.opening.promise;
			this.isOpen = false;

			this.book = undefined;

			/**
	   * @member {promise} ready returns after the book is loaded and parsed
	   * @memberof Book
	   * @private
	   */
			this.ready = this.opened.then(function () {
				_this.manifest = _this.book.toJSON();
				_this.emit(EVENTS.BOOK.READY, _this.manifest);
				return _this.book;
			});

			/**
	   * @member {method} request
	   * @memberof Epub
	   * @private
	   */
			this.request = this.settings.requestMethod || request;

			/**
	   * @member {boolean} archived
	   * @memberof Epub
	   * @private
	   */
			this.archived = false;

			/**
	   * @member {Container} container
	   * @memberof Epub
	   * @private
	   */
			this.container = undefined;

			/**
	   * @member {Packaging} packaging
	   * @memberof Epub
	   * @private
	   */
			this.packaging = undefined;

			/**
	   * @member {Locations} locations
	   * @memberof Epub
	   * @private
	   */
			this.locations = undefined;

			/**
	  * @member {PageList} pagelist
	  * @memberof Epub
	  */
			this.pageList = undefined;

			if (url) {
				this.open(url).catch(function (error) {
					var err = new Error("Cannot load book at " + url);
					_this.emit(EVENTS.BOOK.OPEN_FAILED, err);
					console.error(error);
				});
			}
		}

		/**
	  * Open a epub or url
	  * @param {string | ArrayBuffer} input Url, Path or ArrayBuffer
	  * @param {string} [what="binary", "base64", "epub", "opf", "json", "directory"] force opening as a certain type
	  * @returns {Promise} of when the book has been loaded
	  * @example book.open("/path/to/book.epub")
	  */


		_createClass(Epub, [{
			key: "open",
			value: function open(input, what) {
				var _this2 = this;

				var opening = void 0;
				var type$$1 = what || this.determineType(input);
				var inputLocation = void 0;

				// For browsers
				if (typeof window !== "undefined") {
					inputLocation = window.location.href;
				}

				// For web workers
				if (typeof self !== "undefined") {
					inputLocation = self.location.href;
				}

				if (type$$1 === INPUT_TYPE.BINARY) {
					this.archived = true;
					this.url = new Url("/", "");
					this.locationUrl = new Url(inputLocation);
					opening = this.openEpub(input);
				} else if (type$$1 === INPUT_TYPE.BASE64) {
					this.archived = true;
					this.url = new Url("/", "");
					this.locationUrl = new Url(inputLocation);
					opening = this.openEpub(input, type$$1);
				} else if (type$$1 === INPUT_TYPE.EPUB) {
					this.archived = true;
					this.url = new Url("/", "");
					this.locationUrl = new Url(input, inputLocation);
					opening = this.request(input, "binary").then(this.openEpub.bind(this));
				} else if (type$$1 == INPUT_TYPE.OPF) {
					this.url = new Url(input);
					this.locationUrl = new Url(input);
					opening = this.openPackaging(this.url.Path.toString());
				} else if (type$$1 == INPUT_TYPE.MANIFEST) {
					this.url = new Url(input);
					this.locationUrl = new Url(input);
					opening = this.openManifest(this.url.Path.toString());
				} else {
					this.url = new Url(input);
					this.locationUrl = new Url(input);
					opening = this.openContainer(CONTAINER_PATH).then(this.openPackaging.bind(this));
				}

				return opening.then(function (packaging) {
					return _this2.unpack(packaging);
				});
			}

			/**
	   * Open an archived epub
	   * @private
	   * @param  {binary} data
	   * @param  {string} [encoding]
	   * @return {Promise}
	   */

		}, {
			key: "openEpub",
			value: function openEpub(data, encoding) {
				var _this3 = this;

				return this.unarchive(data, encoding || this.settings.encoding).then(function () {
					return _this3.openContainer(CONTAINER_PATH);
				}).then(function (packagePath) {
					return _this3.openPackaging(packagePath);
				});
			}

			/**
	   * Open the epub container
	   * @private
	   * @param  {string} url
	   * @return {string} packagePath
	   */

		}, {
			key: "openContainer",
			value: function openContainer(url) {
				var _this4 = this;

				return this.load(url).then(function (xml) {
					_this4.container = new Container(xml);
					return _this4.resolve(_this4.container.packagePath);
				});
			}

			/**
	   * Open the Open Packaging Format Xml
	   * @private
	   * @param  {string} url
	   * @return {Promise}
	   */

		}, {
			key: "openPackaging",
			value: function openPackaging(url) {
				var _this5 = this;

				this.path = new Path(url);
				return this.load(url).then(function (xml) {
					_this5.packaging = new Packaging(xml);
					return _this5.packaging;
				});
			}

			/**
	   * Open the manifest JSON
	   * @private
	   * @param  {string} url
	   * @return {Promise}
	   */

		}, {
			key: "openManifest",
			value: function openManifest(url) {
				var _this6 = this;

				this.path = new Path(url);
				return this.load(url).then(function (json) {
					_this6.packaging = new Packaging();
					_this6.packaging.load(json);
					return _this6.packaging;
				});
			}

			/**
	   * Load a resource from the Book
	   * @private
	   * @param  {string} path path to the resource to load
	   * @return {Promise}     returns a promise with the requested resource
	   */

		}, {
			key: "load",
			value: function load(path, type$$1) {
				var resolved;

				if (this.archived) {
					resolved = this.resolve(path);
					return this.archive.request(resolved, type$$1);
				} else {
					resolved = this.resolve(path);
					return this.request(resolved, type$$1, this.settings.requestCredentials, this.settings.requestHeaders);
				}
			}

			/**
	   * Resolve a path to it's absolute position in the Book
	   * @private
	   * @param  {string} path
	   * @param  {boolean} [absolute] force resolving the full URL
	   * @return {string}          the resolved path string
	   */

		}, {
			key: "resolve",
			value: function resolve(path, absolute) {
				if (!path) {
					return;
				}
				var resolved = path;
				var isAbsolute = path.indexOf("://") > -1;

				if (isAbsolute) {
					return path;
				}

				if (this.path) {
					resolved = this.path.resolve(path);
				}

				if (absolute != false && this.url) {
					resolved = this.url.resolve(resolved);
				}

				return resolved;
			}

			/**
	   * Determine the type of they input passed to open
	   * @private
	   * @param  {string} input
	   * @return {string}  binary | directory | epub | opf
	   */

		}, {
			key: "determineType",
			value: function determineType(input) {
				var url;
				var path;
				var extension;

				if (this.settings.encoding === "base64") {
					return INPUT_TYPE.BASE64;
				}

				if (typeof input != "string") {
					return INPUT_TYPE.BINARY;
				}

				url = new Url(input);
				path = url.path();
				extension = path.extension;

				if (!extension) {
					return INPUT_TYPE.DIRECTORY;
				}

				if (extension === "epub") {
					return INPUT_TYPE.EPUB;
				}

				if (extension === "opf") {
					return INPUT_TYPE.OPF;
				}

				if (extension === "json") {
					return INPUT_TYPE.MANIFEST;
				}
			}

			/**
	   * unpack the contents of the Packaging
	   * @private
	   * @param {document} packageXml XML Document
	   */

		}, {
			key: "unpack",
			value: function unpack(packaging) {
				var _this7 = this;

				this.package = packaging;

				var url = void 0;
				var path = this.path.toString();
				if (this.archived) {
					url = new Url(path, "");
				} else if (this.url) {
					url = this.url.resolve(path);
				} else {
					url = new Url(path);
				}

				this.resources = new Resources(this.package.manifest, {
					archive: this.archive,
					url: url,
					load: this.load.bind(this),
					replacements: this.settings.replacements,
					inject: {
						script: this.settings.script,
						stylesheet: this.settings.stylesheet,
						identifer: this.package.metadata.identifier
					}
				});

				var processed = [];
				var crossdomain = url.origin !== location.origin;

				// If caches doesn't exist, use replacements instead
				if (typeof caches === "undefined") {
					this.settings.replacements = true;
					this.settings.cache = false;
				}

				// If we are using a worker and cache isn't set,
				// we should cache the resources if we can
				if (typeof this.settings.cache === "undefined" && this.settings.worker) {
					this.settings.cache = true;
				}

				// If the resource is Cross Domain, and we aren't using cache then
				// replacements are needed.
				if ((crossdomain || this.archived) && !this.settings.worker && !this.settings.cache && typeof this.settings.replacements === "undefined") {
					this.settings.replacements = true;
				}

				if (this.settings.cache && typeof caches != "undefined") {

					var uriComponent = void 0;
					var cached = void 0;
					var key = void 0;

					if (this.archived) {
						uriComponent = encodeURIComponent(this.locationUrl.toString());
						key = "epubjs-zip/";
						url = new Url(key + uriComponent + path, location.href);
						cached = this.resources.cache(key, url.toString());

						this.cacheUrl = url;
					} else if (crossdomain) {
						uriComponent = encodeURIComponent(this.locationUrl.origin);
						key = "epubjs-proxy/";
						url = new Url(key + uriComponent + path, location.href);
						cached = this.resources.cache(key, url.toString());

						this.cacheUrl = url;
					}

					// Wait for injection (not handled in service worker)
					if (this.settings.script || this.settings.stylesheet) {
						processed.push(cached);
					}
				}

				if (this.settings.replacements) {
					var replacements = this.resources.replacements();
					processed.push(replacements);
				}

				return _Promise.all(processed).then(function () {
					return _this7.loadNavigation(_this7.package).then(function () {
						return _this7.navigation;
					});
				}).then(function () {
					_this7.isOpen = true;

					// Remove zip after cached
					// if (this.archive) {
					// 	this.archive.destroy();
					// }

					_this7.book = _this7.toBook();

					// Resolve book opened promise
					_this7.opening.resolve(_this7);

					return _this7.book;
				}).catch(function (err) {
					console.error(err);
				});
			}
		}, {
			key: "cache",
			value: function cache(key, url, crossdomain) {
				var _this8 = this;

				if (!key) {
					key = this.key();
				}

				return this.resources.cache(key, url, crossdomain).then(function () {
					_this8.book = _this8.toBook();
					return _this8.book;
				}).catch(function (err) {
					console.error(err);
				});
			}
		}, {
			key: "replacements",
			value: function replacements() {
				var _this9 = this;

				return this.resources.replacements().then(function () {
					_this9.book = _this9.toBook();
					return _this9.book;
				}).catch(function (err) {
					console.error(err);
				});
			}

			/**
	   * Load Navigation and PageList from package
	   * @private
	   * @param {document} opf XML Document
	   */

		}, {
			key: "loadNavigation",
			value: function loadNavigation(opf) {
				var _this10 = this;

				var navPath = opf.navPath || opf.ncxPath;
				var toc = opf.toc;

				if (!navPath) {
					return new _Promise(function (resolve, reject) {
						_this10.navigation = new Navigation$1(null);
						_this10.pageList = new PageList();

						resolve(_this10.navigation);
					});
				}

				return this.load(navPath, "xml").then(function (xml) {
					_this10.navigation = new Navigation$1(xml, _this10.resolve(navPath));
					_this10.pageList = new PageList(xml);
					return _this10.navigation;
				});
			}

			/**
	   * Set if request should use withCredentials
	   * @param {boolean} credentials
	   */

		}, {
			key: "setRequestCredentials",
			value: function setRequestCredentials(credentials) {
				this.settings.requestCredentials = credentials;
			}

			/**
	   * Set headers request should use
	   * @param {object} headers
	   */

		}, {
			key: "setRequestHeaders",
			value: function setRequestHeaders(headers) {
				this.settings.requestHeaders = headers;
			}

			/**
	   * Unarchive a zipped epub
	   * @private
	   * @param  {binary} input epub data
	   * @param  {string} [encoding]
	   * @return {Archive}
	   */

		}, {
			key: "unarchive",
			value: function unarchive(input, encoding) {
				this.archive = new Archive();
				return this.archive.open(input, encoding);
			}
		}, {
			key: "generateLocations",
			value: function generateLocations(breakPoint) {
				if (!this.book) {
					return;
				}
				if (!this.locations) {
					this.locations = new Locations();
				}
				return this.locations.generate(this.book.sections, breakPoint).then(function (locations) {
					book.locations = locations;
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

				if (!this.locations) {
					this.locations = new Locations();
				}

				if (typeof locations === "string") {
					locations = JSON.parse(json);
				} else {
					locations = json;
				}

				this.book.locations = locations;

				return locations;
			}

			/**
	   * Generates the Book Key using the identifer in the manifest or other string provided
	   * @param  {string} [identifier] to use instead of metadata identifier
	   * @return {string} key
	   */

		}, {
			key: "key",
			value: function key(identifier) {
				var ident = identifier || this.package.metadata.identifier || this.url.filename;
				return "epubjs-" + EPUBJS_VERSION + "-" + ident;
			}
		}, {
			key: "toBook",
			value: function toBook() {
				var _this11 = this;

				var resolver = this.resources.resolve.bind(this.resources);

				var book = new Book();

				book.url = "";

				if (this.cacheUrl) {
					book.url = this.cacheUrl.resolve("manifest.json");
				} else {
					book.url = this.locationUrl.resolve("manifest.json");
				}

				if (this.archived) {
					book.source = this.locationUrl.toString();
				}

				book.resources = this.resources.toArray();

				book.spine = this.package.spine.map(function (item, index) {
					var resource = _this11.resources.get(item.idref) || item;
					var url = _this11.resources.resolve(resource.href);

					// Remove from resources array
					var i = book.resources.findIndex(function (r) {
						return r.id === resource.id;
					});

					if (i > -1) {
						book.resources.splice(i, 1);
					}

					item.index = index;
					item.cfiBase = new EpubCFI().generateChapterComponent(_this11.package.spineNodeIndex, item.index, item.idref);

					if (resource) {
						item.source = resource.href;
						item.href = url;
						item.type = resource.type;

						if (resource.properties && resource.properties.length) {
							item.properties.push.apply(item.properties, resource.properties);
						}
					}

					return item;
				});

				book.metadata = this.package.metadata;

				if (this.navigation) {
					book.toc = this.navigation.getTocArray(resolver);
					book.landmarks = this.navigation.getLandmarksArray(resolver);
				}

				if (this.pageList) {
					book.pages = this.pageList.toArray();
				}

				if (this.locations) {
					book.locations = this.locations.toArray();
				}

				return book;
			}

			/**
	   * Destroy the Book and all associated objects
	   */

		}, {
			key: "destroy",
			value: function destroy() {
				this.opened = undefined;
				this.loading = undefined;
				this.loaded = undefined;
				this.ready = undefined;

				this.isOpen = false;
				this.isRendered = false; //TODO: ?

				this.book && this.book.destroy();
				this.locations && this.locations.destroy();
				this.pageList && this.pageList.destroy();
				this.archive && this.archive.destroy();
				this.resources && this.resources.destroy();
				this.container && this.container.destroy();
				this.packaging && this.packaging.destroy();

				this.spine = undefined;
				this.locations = undefined;
				this.pageList = undefined;
				this.archive = undefined;
				this.resources = undefined;
				this.container = undefined;
				this.packaging = undefined;

				this.navigation = undefined;
				this.url = undefined;
				this.path = undefined;
				this.archived = false;
			}
		}]);

		return Epub;
	}();

	eventEmitter(Epub.prototype);

	var DEV = false;

	/**
	 * Displays an Epub as a series of Views for each Section.
	 * Requires Manager and View class to handle specifics of rendering
	 * the section contetn.
	 * @class
	 * @param {Book} book
	 * @param {object} [options]
	 * @param {number} [options.width]
	 * @param {number} [options.height]
	 * @param {string} [options.ignoreClass] class for the cfi parser to ignore
	 * @param {string | function | object} [options.manager='default']
	 * @param {string | function} [options.view='iframe']
	 * @param {string} [options.layout] layout to force
	 * @param {string} [options.spread] force spread value
	 * @param {number} [options.minSpreadWidth] overridden by spread: none (never) / both (always)
	 * @param {string} [options.stylesheet] url of stylesheet to be injected
	 * @param {string} [options.script] url of script to be injected
	 */

	var Rendition = function () {
		function Rendition(manifest, options) {
			var _this = this;

			_classCallCheck(this, Rendition);

			this.settings = extend(this.settings || {}, {
				width: null,
				height: null,
				ignoreClass: "",
				manager: "default",
				view: "iframe",
				flow: null,
				layout: null,
				spread: null,
				minSpreadWidth: 800,
				stylesheet: null,
				script: null,
				worker: undefined,
				workerScope: undefined
			});

			extend(this.settings, options);

			if (_typeof(this.settings.manager) === "object") {
				this.manager = this.settings.manager;
			}

			/**
	   * Adds Hook methods to the Rendition prototype
	   * @member {object} hooks
	   * @property {Hook} hooks.content
	   * @memberof Rendition
	   */
			this.hooks = {};
			this.hooks.display = new Hook(this);
			this.hooks.content = new Hook(this);
			this.hooks.unloaded = new Hook(this);
			this.hooks.layout = new Hook(this);
			this.hooks.render = new Hook(this);
			this.hooks.show = new Hook(this);

			this.hooks.content.register(this.handleLinks.bind(this));
			this.hooks.content.register(this.passEvents.bind(this));
			this.hooks.content.register(this.adjustImages.bind(this));
			this.hooks.content.register(this.addIdentifier.bind(this));

			/**
	   * @member {Themes} themes
	   * @memberof Rendition
	   */
			this.themes = new Themes(this);

			/**
	   * @member {Annotations} annotations
	   * @memberof Rendition
	   */
			this.annotations = new Annotations(this);

			this.epubcfi = new EpubCFI();

			this.q = new Queue(this);

			/**
	   * A Rendered Location Range
	   * @typedef location
	   * @type {Object}
	   * @property {object} start
	   * @property {string} start.index
	   * @property {string} start.href
	   * @property {object} start.displayed
	   * @property {EpubCFI} start.cfi
	   * @property {number} start.location
	   * @property {number} start.percentage
	   * @property {number} start.displayed.page
	   * @property {number} start.displayed.total
	   * @property {object} end
	   * @property {string} end.index
	   * @property {string} end.href
	   * @property {object} end.displayed
	   * @property {EpubCFI} end.cfi
	   * @property {number} end.location
	   * @property {number} end.percentage
	   * @property {number} end.displayed.page
	   * @property {number} end.displayed.total
	   * @property {boolean} atStart
	   * @property {boolean} atEnd
	   * @memberof Rendition
	   */
			this.location = undefined;

			// Hold queue until book is opened
			// this.q.enqueue(this.book.opened);

			/**
	   * @private
	   */
			this.spineByHref = undefined;
			this.spineBySource = undefined;
			this.spineById = undefined;

			this.starting = new defer$1();
			/**
	   * @member {promise} started returns after the rendition has started
	   * @memberof Rendition
	   */
			this.started = this.starting.promise;
			// Block the queue until rendering is started
			this.q.enqueue(this.started);

			if (manifest) {
				this.unpack(manifest);
			}

			// If a service workers is used, block queue till it is ready
			if (this.settings.worker && navigator && 'serviceWorker' in navigator) {
				this.q.enqueue(function () {
					return _this.worker(_this.settings.worker).catch(function () {
						// worker failed, will need replacements
						_this.starting = new defer$1();
						_this.started = _this.starting.promise;
						// Block the queue again
						return _this.q.enqueue(_this.started);
					});
				});
			}
		}

		/**
	  * Load Book object or JSON manifest
	  */


		_createClass(Rendition, [{
			key: "unpack",
			value: function unpack(manifest) {
				var _this2 = this;

				if (!manifest) {
					throw new Error("No manifest provided");
				}

				if (typeof manifest === "string") {
					this.manifest = JSON.parse(manifest);
				} else {
					this.manifest = manifest;
				}

				var spine = this.manifest.spine.map(function (item, index) {
					item.index = index;
					return item;
				});

				this.spineByHref = {};
				this.spineBySource = {};
				this.spineById = {};

				this.manifest.spine.forEach(function (section, index) {
					_this2.spineByHref[decodeURI(section.href)] = index;
					_this2.spineByHref[encodeURI(section.href)] = index;
					_this2.spineByHref[section.href] = index;

					if (section.source) {
						_this2.spineBySource[decodeURI(section.source)] = index;
						_this2.spineBySource[encodeURI(section.source)] = index;
						_this2.spineBySource[section.source] = index;
					}

					_this2.spineById[section.idref] = index;
				});

				this.book = new Book(manifest);

				this.start();
			}
			/**
	   * Set the manager function
	   * @param {function} manager
	   */

		}, {
			key: "setManager",
			value: function setManager(manager) {
				this.manager = manager;
			}

			/**
	   * Require the manager from passed string, or as a class function
	   * @param  {string|object} manager [description]
	   * @return {method}
	   */

		}, {
			key: "requireManager",
			value: function requireManager(manager) {
				var viewManager;

				// If manager is a string, try to load from global registered managers
				if (typeof manager === "string" && typeof ePub != "undefined") {
					// Use global
					viewManager = ePub.ViewManagers[manager];
				} else {
					// otherwise, assume we were passed a class function
					viewManager = manager;
				}

				return viewManager;
			}

			/**
	   * Require the view from passed string, or as a class function
	   * @param  {string|object} view
	   * @return {view}
	   */

		}, {
			key: "requireView",
			value: function requireView(view) {
				var View;

				// If view is a string, try to load from global registered views,
				if (typeof view == "string" && typeof ePub != "undefined") {
					// Use global
					View = ePub.Views[view];
				} else {
					// otherwise, assume we were passed a class function
					View = view;
				}

				return View;
			}

			/**
	   * Start the rendering
	   * @return {Promise} rendering has started
	   */

		}, {
			key: "start",
			value: function start() {

				if (!this.manager) {
					this.ViewManager = this.requireManager(this.settings.manager);
					this.View = this.requireView(this.settings.view);

					this.manager = new this.ViewManager({
						view: this.View,
						// queue: this.q,
						spine: this.manifest.spine,
						hooks: this.hooks,
						// request: this.book.load.bind(this.book),
						settings: this.settings
					});
				}

				this.direction(this.manifest.metadata.direction);

				// Parse metadata to get layout props
				this.settings.globalLayoutProperties = this.determineLayoutProperties(this.manifest.metadata);

				this.flow(this.settings.globalLayoutProperties.flow);

				this.layout(this.settings.globalLayoutProperties);

				// Listen for displayed views
				this.manager.on(EVENTS.MANAGERS.ADDED, this.afterDisplayed.bind(this));
				this.manager.on(EVENTS.MANAGERS.REMOVED, this.afterRemoved.bind(this));

				// Listen for resizing
				this.manager.on(EVENTS.MANAGERS.RESIZED, this.onResized.bind(this));

				// Listen for rotation
				this.manager.on(EVENTS.MANAGERS.ORIENTATION_CHANGE, this.onOrientationChange.bind(this));

				// Listen for scroll changes
				this.manager.on(EVENTS.MANAGERS.SCROLLED, this.reportLocation.bind(this));

				/**
	    * Emit that rendering has started
	    * @event started
	    * @memberof Rendition
	    */
				this.emit(EVENTS.RENDITION.STARTED);

				// Start processing queue
				this.starting.resolve();
			}

			/**
	   * Call to attach the container to an element in the dom
	   * Container must be attached before rendering can begin
	   * @param  {element} element to attach to
	   * @return {Promise}
	   */

		}, {
			key: "attachTo",
			value: function attachTo(element) {

				return this.q.enqueue(function () {

					// Start rendering
					this.manager.render(element, {
						"width": this.settings.width,
						"height": this.settings.height
					});

					/**
	     * Emit that rendering has attached to an element
	     * @event attached
	     * @memberof Rendition
	     */
					this.emit(EVENTS.RENDITION.ATTACHED);
				}.bind(this));
			}

			/**
	   * Display a point in the book
	   * The request will be added to the rendering Queue,
	   * so it will wait until book is opened, rendering started
	   * and all other rendering tasks have finished to be called.
	   * @param  {string} target Url or EpubCFI
	   * @return {Promise}
	   */

		}, {
			key: "display",
			value: function display(target) {
				if (this.displaying) {
					this.displaying.resolve();
				}
				return this.q.enqueue(this._display, target);
			}

			/**
	   * Tells the manager what to display immediately
	   * @private
	   * @param  {string} target Url or EpubCFI
	   * @return {Promise}
	   */

		}, {
			key: "_display",
			value: function _display(target) {
				var _this3 = this;

				// if (!this.book) {
				// 	return;
				// }
				var displaying = new defer$1();
				var displayed = displaying.promise;
				var section;

				this.displaying = displaying;

				// Check if this is a book percentage
				if (this.locations && this.locations.length() && (isFloat(target) || target === "1.0")) {
					// Handle 1.0
					target = this.locations.cfiFromPercentage(parseFloat(target));
				}

				section = this.findInSpine(target);

				if (!section) {
					displaying.reject(new Error("No Section Found"));
					return displayed;
				}

				this.manager.display(section, target).then(function () {
					displaying.resolve(section);
					_this3.displaying = undefined;

					/**
	     * Emit that a section has been displayed
	     * @event displayed
	     * @param {Section} section
	     * @memberof Rendition
	     */
					_this3.emit(EVENTS.RENDITION.DISPLAYED, section);
					_this3.reportLocation();
				}, function (err) {
					/**
	     * Emit that has been an error displaying
	     * @event displayError
	     * @param {Section} section
	     * @memberof Rendition
	     */
					_this3.emit(EVENTS.RENDITION.DISPLAY_ERROR, err);
				});

				return displayed;
			}

			/**
	   * Report what section has been displayed
	   * @private
	   * @param  {*} view
	   */

		}, {
			key: "afterDisplayed",
			value: function afterDisplayed(view) {
				var _this4 = this;

				view.on(EVENTS.VIEWS.MARK_CLICKED, function (cfiRange, data) {
					return _this4.triggerMarkEvent(cfiRange, data, view);
				});

				this.hooks.render.trigger(view, this).then(function () {
					if (view.contents) {
						_this4.hooks.content.trigger(view.contents, _this4).then(function () {
							/**
	       * Emit that a section has been rendered
	       * @event rendered
	       * @param {Section} section
	       * @param {View} view
	       * @memberof Rendition
	       */
							_this4.emit(EVENTS.RENDITION.RENDERED, view.section, view);
						});
					} else {
						_this4.emit(EVENTS.RENDITION.RENDERED, view.section, view);
					}
				});
			}

			/**
	   * Report what has been removed
	   * @private
	   * @param  {*} view
	   */

		}, {
			key: "afterRemoved",
			value: function afterRemoved(view) {
				var _this5 = this;

				this.hooks.unloaded.trigger(view, this).then(function () {
					/**
	     * Emit that a section has been removed
	     * @event removed
	     * @param {Section} section
	     * @param {View} view
	     * @memberof Rendition
	     */
					_this5.emit(EVENTS.RENDITION.REMOVED, view.section, view);
				});
			}

			/**
	   * Report resize events and display the last seen location
	   * @private
	   */

		}, {
			key: "onResized",
			value: function onResized(size) {

				/**
	    * Emit that the rendition has been resized
	    * @event resized
	    * @param {number} width
	    * @param {height} height
	    * @memberof Rendition
	    */
				this.emit(EVENTS.RENDITION.RESIZED, {
					width: size.width,
					height: size.height
				});

				if (this.location && this.location.start) {
					this.display(this.location.start.cfi);
				}
			}

			/**
	   * Report orientation events and display the last seen location
	   * @private
	   */

		}, {
			key: "onOrientationChange",
			value: function onOrientationChange(orientation) {
				/**
	    * Emit that the rendition has been rotated
	    * @event orientationchange
	    * @param {string} orientation
	    * @memberof Rendition
	    */
				this.emit(EVENTS.RENDITION.ORIENTATION_CHANGE, orientation);
			}

			/**
	   * Move the Rendition to a specific offset
	   * Usually you would be better off calling display()
	   * @param {object} offset
	   */

		}, {
			key: "moveTo",
			value: function moveTo(offset) {
				this.manager.moveTo(offset);
			}

			/**
	   * Trigger a resize of the views
	   * @param {number} [width]
	   * @param {number} [height]
	   */

		}, {
			key: "resize",
			value: function resize(width, height) {
				if (width) {
					this.settings.width = width;
				}
				if (height) {
					this.settings.height = width;
				}
				this.manager.resize(width, height);
			}

			/**
	   * Clear all rendered views
	   */

		}, {
			key: "clear",
			value: function clear() {
				this.manager.clear();
			}

			/**
	   * Go to the next "page" in the rendition
	   * @return {Promise}
	   */

		}, {
			key: "next",
			value: function next() {
				return this.q.enqueue(this.manager.next.bind(this.manager)).then(this.reportLocation.bind(this));
			}

			/**
	   * Go to the previous "page" in the rendition
	   * @return {Promise}
	   */

		}, {
			key: "prev",
			value: function prev() {
				return this.q.enqueue(this.manager.prev.bind(this.manager)).then(this.reportLocation.bind(this));
			}

			//-- http://www.idpf.org/epub/301/spec/epub-publications.html#meta-properties-rendering
			/**
	   * Determine the Layout properties from metadata and settings
	   * @private
	   * @param  {object} metadata
	   * @return {object} properties
	   */

		}, {
			key: "determineLayoutProperties",
			value: function determineLayoutProperties(metadata) {
				var properties;
				var layout = this.settings.layout || metadata.layout || "reflowable";
				var spread = this.settings.spread || metadata.spread || "auto";
				var orientation = this.settings.orientation || metadata.orientation || "auto";
				var flow = this.settings.flow || metadata.flow || "auto";
				var viewport = metadata.viewport || "";
				var minSpreadWidth = this.settings.minSpreadWidth || metadata.minSpreadWidth || 800;
				var direction = this.settings.direction || metadata.direction || "ltr";

				properties = {
					layout: layout,
					spread: spread,
					orientation: orientation,
					flow: flow,
					viewport: viewport,
					minSpreadWidth: minSpreadWidth,
					direction: direction
				};

				return properties;
			}

			/**
	   * Adjust the flow of the rendition to paginated or scrolled
	   * (scrolled-continuous vs scrolled-doc are handled by different view managers)
	   * @param  {string} flow
	   */

		}, {
			key: "flow",
			value: function flow(_flow2) {
				var _flow = _flow2;
				if (_flow2 === "scrolled" || _flow2 === "scrolled-doc" || _flow2 === "scrolled-continuous") {
					_flow = "scrolled";
				}

				if (_flow2 === "auto" || _flow2 === "paginated") {
					_flow = "paginated";
				}

				this.settings.flow = _flow2;

				if (this._layout) {
					this._layout.flow(_flow);
				}

				if (this.manager && this._layout) {
					this.manager.applyLayout(this._layout);
				}

				if (this.manager) {
					this.manager.updateFlow(_flow);
				}

				if (this.manager && this.manager.isRendered() && this.location) {
					this.manager.clear();
					this.display(this.location.start.cfi);
				}
			}

			/**
	   * Adjust the layout of the rendition to reflowable or pre-paginated
	   * @param  {object} settings
	   */

		}, {
			key: "layout",
			value: function layout(settings) {
				var _this6 = this;

				if (settings) {
					this._layout = new Layout(settings);
					this._layout.spread(settings.spread, this.settings.minSpreadWidth);

					// this.mapping = new Mapping(this._layout.props);

					this._layout.on(EVENTS.LAYOUT.UPDATED, function (props, changed) {
						_this6.emit(EVENTS.RENDITION.LAYOUT, props, changed);
					});
				}

				if (this.manager && this._layout) {
					this.manager.applyLayout(this._layout);
				}

				return this._layout;
			}

			/**
	   * Adjust if the rendition uses spreads
	   * @param  {string} spread none | auto (TODO: implement landscape, portrait, both)
	   * @param  {int} min min width to use spreads at
	   */

		}, {
			key: "spread",
			value: function spread(_spread, min) {

				this._layout.spread(_spread, min);

				if (this.manager.isRendered()) {
					this.manager.updateLayout();
				}
			}

			/**
	   * Adjust the direction of the rendition
	   * @param  {string} dir
	   */

		}, {
			key: "direction",
			value: function direction(dir) {

				this.settings.direction = dir || "ltr";

				if (this.manager) {
					this.manager.direction(this.settings.direction);
				}

				if (this.manager && this.manager.isRendered() && this.location) {
					this.manager.clear();
					this.display(this.location.start.cfi);
				}
			}

			/**
	   * Report the current location
	   * @fires relocated
	   * @fires locationChanged
	   */

		}, {
			key: "reportLocation",
			value: function reportLocation() {
				return this.q.enqueue(function reportedLocation() {
					requestAnimationFrame(function reportedLocationAfterRAF() {
						var location = this.manager.currentLocation();
						if (location && location.then && typeof location.then === "function") {
							location.then(function (result) {
								var located = this.located(result);

								if (!located || !located.start || !located.end) {
									return;
								}

								this.location = located;

								this.emit(EVENTS.RENDITION.LOCATION_CHANGED, {
									index: this.location.start.index,
									href: this.location.start.href,
									start: this.location.start.cfi,
									end: this.location.end.cfi,
									percentage: this.location.start.percentage
								});

								this.emit(EVENTS.RENDITION.RELOCATED, this.location);
							}.bind(this));
						} else if (location) {
							var located = this.located(location);

							if (!located || !located.start || !located.end) {
								return;
							}

							this.location = located;

							/**
	       * @event locationChanged
	       * @deprecated
	       * @type {object}
	       * @property {number} index
	       * @property {string} href
	       * @property {EpubCFI} start
	       * @property {EpubCFI} end
	       * @property {number} percentage
	       * @memberof Rendition
	       */
							this.emit(EVENTS.RENDITION.LOCATION_CHANGED, {
								index: this.location.start.index,
								href: this.location.start.href,
								start: this.location.start.cfi,
								end: this.location.end.cfi,
								percentage: this.location.start.percentage
							});

							/**
	       * @event relocated
	       * @type {displayedLocation}
	       * @memberof Rendition
	       */
							this.emit(EVENTS.RENDITION.RELOCATED, this.location);
						}
					}.bind(this));
				}.bind(this));
			}

			/**
	   * Get the Current Location object
	   * @return {displayedLocation | promise} location (may be a promise)
	   */

		}, {
			key: "currentLocation",
			value: function currentLocation() {
				var location = this.manager.currentLocation();
				if (location && location.then && typeof location.then === "function") {
					location.then(function (result) {
						var located = this.located(result);
						return located;
					}.bind(this));
				} else if (location) {
					var located = this.located(location);
					return located;
				}
			}

			/**
	   * Creates a Rendition#locationRange from location
	   * passed by the Manager
	   * @returns {displayedLocation}
	   * @private
	   */

		}, {
			key: "located",
			value: function located(location) {
				if (!location.length) {
					return {};
				}
				var start = location[0];
				var end = location[location.length - 1];

				var located = {
					start: {
						index: start.index,
						href: start.href,
						cfi: start.mapping.start,
						displayed: {
							page: start.pages[0] || 1,
							total: start.totalPages
						}
					},
					end: {
						index: end.index,
						href: end.href,
						cfi: end.mapping.end,
						displayed: {
							page: end.pages[end.pages.length - 1] || 1,
							total: end.totalPages
						}
					}
				};

				if (this.locations) {
					var locationStart = this.locations.locationFromCfi(start.mapping.start);
					var locationEnd = this.locations.locationFromCfi(end.mapping.end);

					if (locationStart != null) {
						located.start.location = locationStart;
						located.start.percentage = this.locations.percentageFromLocation(locationStart);
					}
					if (locationEnd != null) {
						located.end.location = locationEnd;
						located.end.percentage = this.locations.percentageFromLocation(locationEnd);
					}
				}

				if (this.pageList) {
					var pageStart = this.pageList.pageFromCfi(start.mapping.start);
					var pageEnd = this.pageList.pageFromCfi(end.mapping.end);

					if (pageStart != -1) {
						located.start.page = pageStart;
					}
					if (pageEnd != -1) {
						located.end.page = pageEnd;
					}
				}

				if (end.index === this.manifest.spine[this.manifest.spine.length - 1].index && located.end.displayed.page >= located.end.displayed.total) {
					located.atEnd = true;
				}

				if (start.index === this.manifest.spine[0].index && located.start.displayed.page === 1) {
					located.atStart = true;
				}

				return located;
			}

			/**
	   * Remove and Clean Up the Rendition
	   */

		}, {
			key: "destroy",
			value: function destroy() {
				// Clear the queue
				this.q.clear();
				this.q = undefined;

				this.manager && this.manager.destroy();

				this.manifest = undefined;

				this.spineByHref = undefined;
				this.spineBySource = undefined;
				this.spineById = undefined;

				this.hooks.display.clear();
				// this.hooks.serialize.clear();
				this.hooks.content.clear();
				this.hooks.layout.clear();
				this.hooks.render.clear();
				this.hooks.show.clear();
				this.hooks = {};

				this.themes.destroy();
				this.themes = undefined;

				this.epubcfi = undefined;

				this.starting = undefined;
				this.started = undefined;
			}

			/**
	   * Pass the events from a view's Contents
	   * @private
	   * @param  {View} view
	   */

		}, {
			key: "passEvents",
			value: function passEvents(contents) {
				var _this7 = this;

				var listenedEvents = Contents.listenedEvents;

				listenedEvents.forEach(function (e) {
					contents.on(e, function (ev) {
						return _this7.triggerViewEvent(ev, contents);
					});
				});

				contents.on(EVENTS.CONTENTS.SELECTED, function (e) {
					return _this7.triggerSelectedEvent(e, contents);
				});
			}

			/**
	   * Emit events passed by a view
	   * @private
	   * @param  {event} e
	   */

		}, {
			key: "triggerViewEvent",
			value: function triggerViewEvent(e, contents) {
				this.emit(e.type, e, contents);
			}

			/**
	   * Emit a selection event's CFI Range passed from a a view
	   * @private
	   * @param  {EpubCFI} cfirange
	   */

		}, {
			key: "triggerSelectedEvent",
			value: function triggerSelectedEvent(cfirange, contents) {
				/**
	    * Emit that a text selection has occured
	    * @event selected
	    * @param {EpubCFI} cfirange
	    * @param {Contents} contents
	    * @memberof Rendition
	    */
				this.emit(EVENTS.RENDITION.SELECTED, cfirange, contents);
			}

			/**
	   * Emit a markClicked event with the cfiRange and data from a mark
	   * @private
	   * @param  {EpubCFI} cfirange
	   */

		}, {
			key: "triggerMarkEvent",
			value: function triggerMarkEvent(cfiRange, data, contents) {
				/**
	    * Emit that a mark was clicked
	    * @event markClicked
	    * @param {EpubCFI} cfirange
	    * @param {object} data
	    * @param {Contents} contents
	    * @memberof Rendition
	    */
				this.emit(EVENTS.RENDITION.MARK_CLICKED, cfiRange, data, contents);
			}

			/**
	   * Get a Range from a Visible CFI
	   * @param  {string} cfi EpubCfi String
	   * @param  {string} ignoreClass
	   * @return {range}
	   */

		}, {
			key: "getRange",
			value: function getRange(cfi, ignoreClass) {
				var _cfi = new EpubCFI(cfi);
				var found = this.manager.visible().filter(function (view) {
					if (_cfi.spinePos === view.index) return true;
				});

				// Should only every return 1 item
				if (found.length) {
					return found[0].contents.range(_cfi, ignoreClass);
				}
			}

			/**
	   * Hook to adjust images to fit in columns
	   * @param  {Contents} contents
	   * @private
	   */

		}, {
			key: "adjustImages",
			value: function adjustImages(contents) {

				if (this._layout.name === "pre-paginated") {
					return new _Promise(function (resolve) {
						resolve();
					});
				}

				contents.addStylesheetRules({
					"img": {
						"max-width": (this._layout.columnWidth ? this._layout.columnWidth + "px" : "100%") + "!important",
						"max-height": (this._layout.height ? this._layout.height * 0.6 + "px" : "60%") + "!important",
						"object-fit": "contain",
						"page-break-inside": "avoid"
					},
					"svg": {
						"max-width": (this._layout.columnWidth ? this._layout.columnWidth + "px" : "100%") + "!important",
						"max-height": (this._layout.height ? this._layout.height * 0.6 + "px" : "60%") + "!important",
						"page-break-inside": "avoid"
					}
				});

				return new _Promise(function (resolve, reject) {
					// Wait to apply
					setTimeout(function () {
						resolve();
					}, 1);
				});
			}

			/**
	   * Hook to add the book identifier
	   * @param  {Contents} contents
	   * @private
	   */

		}, {
			key: "addIdentifier",
			value: function addIdentifier(contents) {
				var ident = this.book.metadata.identifier;
				contents.addIdentifier(ident);
			}

			/**
	   * Get the Contents object of each rendered view
	   * @returns {Contents[]}
	   */

		}, {
			key: "getContents",
			value: function getContents() {
				return this.manager ? this.manager.getContents() : [];
			}

			/**
	   * Get the views member from the manager
	   * @returns {Views}
	   */

		}, {
			key: "views",
			value: function views() {
				var views = this.manager ? this.manager.views : undefined;
				return views || [];
			}

			/**
	   * Hook to handle link clicks in rendered content
	   * @param  {Contents} contents
	   * @private
	   */

		}, {
			key: "handleLinks",
			value: function handleLinks(contents) {
				var _this8 = this;

				if (contents) {
					contents.on(EVENTS.CONTENTS.LINK_CLICKED, function (href) {
						var relative = _this8.book.path.relative(href);
						_this8.display(relative);
					});
				}
			}

			/**
	   * @return {object} spineItem
	   */

		}, {
			key: "findInSpine",
			value: function findInSpine(target) {
				var index = 0;

				if (this.epubcfi.isCfiString(target)) {
					var cfi = new EpubCFI(target);
					index = cfi.spinePos;
				} else if (typeof target === "number" || isNaN(target) === false) {
					index = target;
				} else if (typeof target === "string" && target.indexOf("#") === 0) {
					index = this.spineById[target.substring(1)];
				} else if (typeof target === "string") {
					// Remove fragments
					target = target.split("#")[0];
					index = this.spineByHref[target] || this.spineByHref[encodeURI(target)] || this.spineBySource[target] || this.spineBySource[encodeURI(target)];
				}

				return this.manifest.spine[index] || null;
			}

			/**
	   * Generates the Book Key using the identifer in the manifest or other string provided
	   * @param  {string} [identifier] to use instead of metadata identifier
	   * @return {string} key
	   */

		}, {
			key: "key",
			value: function key(identifier) {
				var ident = identifier || this.manifest.metadata.identifier;
				return "epubjs-" + EPUBJS_VERSION + "-" + ident;
			}
		}, {
			key: "worker",
			value: function worker(workerUrl) {
				var _this9 = this;

				var deferred = new defer$1();
				var key = this.key();

				// Resolve early if book is not archived and not cross domain
				var url = new Url(this.book.url);
				var source = this.book.source ? this.book.source.type : '';

				if (source !== "application/epub+zip" && url.origin === window.location.origin) {
					deferred.resolve();
				}

				if ('serviceWorker' in navigator) {

					var worker = navigator.serviceWorker.controller;
					// Worker is already running
					if (worker) {
						deferred.resolve();
					}

					navigator.serviceWorker.register(workerUrl, { scope: this.settings.workerScope }).then(function (reg) {

						worker = navigator.serviceWorker.controller;

						if (reg.active && !worker) {
							_this9.emit(EVENTS.RENDITION.WORKER_INACTIVE);
							deferred.resolve();
						}

						if (worker) {
							deferred.resolve();
						}
					}, function (error) {
						// registration failed
						console.error(error);

						_this9.emit(EVENTS.RENDITION.WORKER_FAILED);
						deferred.reject('Worker registration failed', error);
					});

					navigator.serviceWorker.addEventListener('message', function (event) {
						DEV && console.log("[sw msg]", event.data);
						if (event.data.msg === "active") {
							deferred.resolve();
						}
					});

					navigator.serviceWorker.addEventListener("controllerchange", function (event) {
						worker = navigator.serviceWorker.controller;
						if (worker) {
							deferred.resolve();
						}
					});
				} else {
					deferred.resolve();
				}

				return deferred.promise;
			}
		}, {
			key: "cache",
			value: function cache(worker) {
				if (!worker) {
					worker = navigator.serviceWorker.controller;
				}
				worker.postMessage({ method: "add", key: key, resources: this.manifest.resources });
			}
		}]);

		return Rendition;
	}();

	//-- Enable binding events to Renderer


	eventEmitter(Rendition.prototype);

	var runtime = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  var inModule = 'object' === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  runtime.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }

	      return ContinueSentinel;
	    }
	  };
	})(
	  // In sloppy mode, unbound `this` refers to the global object, fallback to
	  // Function constructor if we're in global strict mode. That is sadly a form
	  // of indirect eval which violates Content Security Policy.
	  (function() { return this })() || Function("return this")()
	);
	});

	// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g = (function() { return this })() || Function("return this")();

	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;

	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;

	var runtimeModule = runtime;

	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}

	var regenerator = runtimeModule;

	var asyncToGenerator = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _promise2 = _interopRequireDefault(promise$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (fn) {
	  return function () {
	    var gen = fn.apply(this, arguments);
	    return new _promise2.default(function (resolve, reject) {
	      function step(key, arg) {
	        try {
	          var info = gen[key](arg);
	          var value = info.value;
	        } catch (error) {
	          reject(error);
	          return;
	        }

	        if (info.done) {
	          resolve(value);
	        } else {
	          return _promise2.default.resolve(value).then(function (value) {
	            step("next", value);
	          }, function (err) {
	            step("throw", err);
	          });
	        }
	      }

	      return step("next");
	    });
	  };
	};
	});

	var _asyncToGenerator = unwrapExports(asyncToGenerator);

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	_export(_export.S, 'Object', {create: _objectCreate});

	var $Object$3 = _core.Object;
	var create$1 = function create(P, D){
	  return $Object$3.create(P, D);
	};

	var create$2 = createCommonjsModule(function (module) {
	module.exports = { "default": create$1, __esModule: true };
	});

	var _Object$create = unwrapExports(create$2);

	var urlPolyfill = createCommonjsModule(function (module) {

	  (function (root, factory) {
	    // Fix for this being undefined in modules
	    if (!root) {
	      root = window || commonjsGlobal;
	    }
	    if ('object' === 'object' && module.exports) {
	      // Node
	      module.exports = factory(root);
	    } else if (typeof undefined === 'function' && undefined.amd) {
	      // AMD. Register as an anonymous module.
	      undefined([], factory);
	    } else {
	      // Browser globals (root is window)
	      root.URL = factory(root);
	    }
	  })(commonjsGlobal, function (scope) {
	    // feature detect for URL constructor
	    var hasWorkingUrl = false;
	    if (!scope.forceJURL) {
	      try {
	        var u = new URL('b', 'http://a');
	        u.pathname = 'c%20d';
	        hasWorkingUrl = u.href === 'http://a/c%20d';
	      } catch (e) {}
	    }

	    if (hasWorkingUrl) return scope.URL;

	    var relative = _Object$create(null);
	    relative['ftp'] = 21;
	    relative['file'] = 0;
	    relative['gopher'] = 70;
	    relative['http'] = 80;
	    relative['https'] = 443;
	    relative['ws'] = 80;
	    relative['wss'] = 443;

	    var relativePathDotMapping = _Object$create(null);
	    relativePathDotMapping['%2e'] = '.';
	    relativePathDotMapping['.%2e'] = '..';
	    relativePathDotMapping['%2e.'] = '..';
	    relativePathDotMapping['%2e%2e'] = '..';

	    function isRelativeScheme(scheme) {
	      return relative[scheme] !== undefined;
	    }

	    function invalid() {
	      clear.call(this);
	      this._isInvalid = true;
	    }

	    function IDNAToASCII(h) {
	      if ('' == h) {
	        invalid.call(this);
	      }
	      // XXX
	      return h.toLowerCase();
	    }

	    function percentEscape(c) {
	      var unicode = c.charCodeAt(0);
	      if (unicode > 0x20 && unicode < 0x7F &&
	      // " # < > ? `
	      [0x22, 0x23, 0x3C, 0x3E, 0x3F, 0x60].indexOf(unicode) == -1) {
	        return c;
	      }
	      return encodeURIComponent(c);
	    }

	    function percentEscapeQuery(c) {
	      // XXX This actually needs to encode c using encoding and then
	      // convert the bytes one-by-one.

	      var unicode = c.charCodeAt(0);
	      if (unicode > 0x20 && unicode < 0x7F &&
	      // " # < > ` (do not escape '?')
	      [0x22, 0x23, 0x3C, 0x3E, 0x60].indexOf(unicode) == -1) {
	        return c;
	      }
	      return encodeURIComponent(c);
	    }

	    var EOF = undefined,
	        ALPHA = /[a-zA-Z]/,
	        ALPHANUMERIC = /[a-zA-Z0-9\+\-\.]/;

	    function parse(input, stateOverride, base) {

	      var state = stateOverride || 'scheme start',
	          cursor = 0,
	          buffer = '',
	          seenAt = false,
	          seenBracket = false;

	      loop: while ((input[cursor - 1] != EOF || cursor == 0) && !this._isInvalid) {
	        var c = input[cursor];
	        switch (state) {
	          case 'scheme start':
	            if (c && ALPHA.test(c)) {
	              buffer += c.toLowerCase(); // ASCII-safe
	              state = 'scheme';
	            } else if (!stateOverride) {
	              buffer = '';
	              state = 'no scheme';
	              continue;
	            } else {
	              break loop;
	            }
	            break;

	          case 'scheme':
	            if (c && ALPHANUMERIC.test(c)) {
	              buffer += c.toLowerCase(); // ASCII-safe
	            } else if (':' == c) {
	              this._scheme = buffer;
	              buffer = '';
	              if (stateOverride) {
	                break loop;
	              }
	              if (isRelativeScheme(this._scheme)) {
	                this._isRelative = true;
	              }
	              if ('file' == this._scheme) {
	                state = 'relative';
	              } else if (this._isRelative && base && base._scheme == this._scheme) {
	                state = 'relative or authority';
	              } else if (this._isRelative) {
	                state = 'authority first slash';
	              } else {
	                state = 'scheme data';
	              }
	            } else if (!stateOverride) {
	              buffer = '';
	              cursor = 0;
	              state = 'no scheme';
	              continue;
	            } else if (EOF == c) {
	              break loop;
	            } else {
	              break loop;
	            }
	            break;

	          case 'scheme data':
	            if ('?' == c) {
	              this._query = '?';
	              state = 'query';
	            } else if ('#' == c) {
	              this._fragment = '#';
	              state = 'fragment';
	            } else {
	              // XXX error handling
	              if (EOF != c && '\t' != c && '\n' != c && '\r' != c) {
	                this._schemeData += percentEscape(c);
	              }
	            }
	            break;

	          case 'no scheme':
	            if (!base || !isRelativeScheme(base._scheme)) {
	              invalid.call(this);
	            } else {
	              state = 'relative';
	              continue;
	            }
	            break;

	          case 'relative or authority':
	            if ('/' == c && '/' == input[cursor + 1]) {
	              state = 'authority ignore slashes';
	            } else {
	              state = 'relative';
	              continue;
	            }
	            break;

	          case 'relative':
	            this._isRelative = true;
	            if ('file' != this._scheme) this._scheme = base._scheme;
	            if (EOF == c) {
	              this._host = base._host;
	              this._port = base._port;
	              this._path = base._path.slice();
	              this._query = base._query;
	              this._username = base._username;
	              this._password = base._password;
	              break loop;
	            } else if ('/' == c || '\\' == c) {
	              state = 'relative slash';
	            } else if ('?' == c) {
	              this._host = base._host;
	              this._port = base._port;
	              this._path = base._path.slice();
	              this._query = '?';
	              this._username = base._username;
	              this._password = base._password;
	              state = 'query';
	            } else if ('#' == c) {
	              this._host = base._host;
	              this._port = base._port;
	              this._path = base._path.slice();
	              this._query = base._query;
	              this._fragment = '#';
	              this._username = base._username;
	              this._password = base._password;
	              state = 'fragment';
	            } else {
	              var nextC = input[cursor + 1];
	              var nextNextC = input[cursor + 2];
	              if ('file' != this._scheme || !ALPHA.test(c) || nextC != ':' && nextC != '|' || EOF != nextNextC && '/' != nextNextC && '\\' != nextNextC && '?' != nextNextC && '#' != nextNextC) {
	                this._host = base._host;
	                this._port = base._port;
	                this._username = base._username;
	                this._password = base._password;
	                this._path = base._path.slice();
	                this._path.pop();
	              }
	              state = 'relative path';
	              continue;
	            }
	            break;

	          case 'relative slash':
	            if ('/' == c || '\\' == c) {
	              if ('file' == this._scheme) {
	                state = 'file host';
	              } else {
	                state = 'authority ignore slashes';
	              }
	            } else {
	              if ('file' != this._scheme) {
	                this._host = base._host;
	                this._port = base._port;
	                this._username = base._username;
	                this._password = base._password;
	              }
	              state = 'relative path';
	              continue;
	            }
	            break;

	          case 'authority first slash':
	            if ('/' == c) {
	              state = 'authority second slash';
	            } else {
	              state = 'authority ignore slashes';
	              continue;
	            }
	            break;

	          case 'authority second slash':
	            state = 'authority ignore slashes';
	            if ('/' != c) {
	              continue;
	            }
	            break;

	          case 'authority ignore slashes':
	            if ('/' != c && '\\' != c) {
	              state = 'authority';
	              continue;
	            } else {
	            }
	            break;

	          case 'authority':
	            if ('@' == c) {
	              if (seenAt) {
	                buffer += '%40';
	              }
	              seenAt = true;
	              for (var i = 0; i < buffer.length; i++) {
	                var cp = buffer[i];
	                if ('\t' == cp || '\n' == cp || '\r' == cp) {
	                  continue;
	                }
	                // XXX check URL code points
	                if (':' == cp && null === this._password) {
	                  this._password = '';
	                  continue;
	                }
	                var tempC = percentEscape(cp);
	                null !== this._password ? this._password += tempC : this._username += tempC;
	              }
	              buffer = '';
	            } else if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c) {
	              cursor -= buffer.length;
	              buffer = '';
	              state = 'host';
	              continue;
	            } else {
	              buffer += c;
	            }
	            break;

	          case 'file host':
	            if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c) {
	              if (buffer.length == 2 && ALPHA.test(buffer[0]) && (buffer[1] == ':' || buffer[1] == '|')) {
	                state = 'relative path';
	              } else if (buffer.length == 0) {
	                state = 'relative path start';
	              } else {
	                this._host = IDNAToASCII.call(this, buffer);
	                buffer = '';
	                state = 'relative path start';
	              }
	              continue;
	            } else if ('\t' == c || '\n' == c || '\r' == c) {
	            } else {
	              buffer += c;
	            }
	            break;

	          case 'host':
	          case 'hostname':
	            if (':' == c && !seenBracket) {
	              // XXX host parsing
	              this._host = IDNAToASCII.call(this, buffer);
	              buffer = '';
	              state = 'port';
	              if ('hostname' == stateOverride) {
	                break loop;
	              }
	            } else if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c) {
	              this._host = IDNAToASCII.call(this, buffer);
	              buffer = '';
	              state = 'relative path start';
	              if (stateOverride) {
	                break loop;
	              }
	              continue;
	            } else if ('\t' != c && '\n' != c && '\r' != c) {
	              if ('[' == c) {
	                seenBracket = true;
	              } else if (']' == c) {
	                seenBracket = false;
	              }
	              buffer += c;
	            } else {
	            }
	            break;

	          case 'port':
	            if (/[0-9]/.test(c)) {
	              buffer += c;
	            } else if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c || stateOverride) {
	              if ('' != buffer) {
	                var temp = parseInt(buffer, 10);
	                if (temp != relative[this._scheme]) {
	                  this._port = temp + '';
	                }
	                buffer = '';
	              }
	              if (stateOverride) {
	                break loop;
	              }
	              state = 'relative path start';
	              continue;
	            } else if ('\t' == c || '\n' == c || '\r' == c) {
	            } else {
	              invalid.call(this);
	            }
	            break;

	          case 'relative path start':
	            state = 'relative path';
	            if ('/' != c && '\\' != c) {
	              continue;
	            }
	            break;

	          case 'relative path':
	            if (EOF == c || '/' == c || '\\' == c || !stateOverride && ('?' == c || '#' == c)) {
	              var tmp;
	              if (tmp = relativePathDotMapping[buffer.toLowerCase()]) {
	                buffer = tmp;
	              }
	              if ('..' == buffer) {
	                this._path.pop();
	                if ('/' != c && '\\' != c) {
	                  this._path.push('');
	                }
	              } else if ('.' == buffer && '/' != c && '\\' != c) {
	                this._path.push('');
	              } else if ('.' != buffer) {
	                if ('file' == this._scheme && this._path.length == 0 && buffer.length == 2 && ALPHA.test(buffer[0]) && buffer[1] == '|') {
	                  buffer = buffer[0] + ':';
	                }
	                this._path.push(buffer);
	              }
	              buffer = '';
	              if ('?' == c) {
	                this._query = '?';
	                state = 'query';
	              } else if ('#' == c) {
	                this._fragment = '#';
	                state = 'fragment';
	              }
	            } else if ('\t' != c && '\n' != c && '\r' != c) {
	              buffer += percentEscape(c);
	            }
	            break;

	          case 'query':
	            if (!stateOverride && '#' == c) {
	              this._fragment = '#';
	              state = 'fragment';
	            } else if (EOF != c && '\t' != c && '\n' != c && '\r' != c) {
	              this._query += percentEscapeQuery(c);
	            }
	            break;

	          case 'fragment':
	            if (EOF != c && '\t' != c && '\n' != c && '\r' != c) {
	              this._fragment += c;
	            }
	            break;
	        }

	        cursor++;
	      }
	    }

	    function clear() {
	      this._scheme = '';
	      this._schemeData = '';
	      this._username = '';
	      this._password = null;
	      this._host = '';
	      this._port = '';
	      this._path = [];
	      this._query = '';
	      this._fragment = '';
	      this._isInvalid = false;
	      this._isRelative = false;
	    }

	    // Does not process domain names or IP addresses.
	    // Does not handle encoding for the query parameter.
	    function jURL(url, base /* , encoding */) {
	      if (base !== undefined && !(base instanceof jURL)) base = new jURL(String(base));

	      this._url = url;
	      clear.call(this);

	      var input = url.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, '');
	      // encoding = encoding || 'utf-8'

	      parse.call(this, input, null, base);
	    }

	    jURL.prototype = {
	      toString: function toString() {
	        return this.href;
	      },
	      get href() {
	        if (this._isInvalid) return this._url;

	        var authority = '';
	        if ('' != this._username || null != this._password) {
	          authority = this._username + (null != this._password ? ':' + this._password : '') + '@';
	        }

	        return this.protocol + (this._isRelative ? '//' + authority + this.host : '') + this.pathname + this._query + this._fragment;
	      },
	      set href(href) {
	        clear.call(this);
	        parse.call(this, href);
	      },

	      get protocol() {
	        return this._scheme + ':';
	      },
	      set protocol(protocol) {
	        if (this._isInvalid) return;
	        parse.call(this, protocol + ':', 'scheme start');
	      },

	      get host() {
	        return this._isInvalid ? '' : this._port ? this._host + ':' + this._port : this._host;
	      },
	      set host(host) {
	        if (this._isInvalid || !this._isRelative) return;
	        parse.call(this, host, 'host');
	      },

	      get hostname() {
	        return this._host;
	      },
	      set hostname(hostname) {
	        if (this._isInvalid || !this._isRelative) return;
	        parse.call(this, hostname, 'hostname');
	      },

	      get port() {
	        return this._port;
	      },
	      set port(port) {
	        if (this._isInvalid || !this._isRelative) return;
	        parse.call(this, port, 'port');
	      },

	      get pathname() {
	        return this._isInvalid ? '' : this._isRelative ? '/' + this._path.join('/') : this._schemeData;
	      },
	      set pathname(pathname) {
	        if (this._isInvalid || !this._isRelative) return;
	        this._path = [];
	        parse.call(this, pathname, 'relative path start');
	      },

	      get search() {
	        return this._isInvalid || !this._query || '?' == this._query ? '' : this._query;
	      },
	      set search(search) {
	        if (this._isInvalid || !this._isRelative) return;
	        this._query = '?';
	        if ('?' == search[0]) search = search.slice(1);
	        parse.call(this, search, 'query');
	      },

	      get hash() {
	        return this._isInvalid || !this._fragment || '#' == this._fragment ? '' : this._fragment;
	      },
	      set hash(hash) {
	        if (this._isInvalid) return;
	        this._fragment = '#';
	        if ('#' == hash[0]) hash = hash.slice(1);
	        parse.call(this, hash, 'fragment');
	      },

	      get origin() {
	        var host;
	        if (this._isInvalid || !this._scheme) {
	          return '';
	        }
	        // javascript: Gecko returns String(""), WebKit/Blink String("null")
	        // Gecko throws error for "data://"
	        // data: Gecko returns "", Blink returns "data://", WebKit returns "null"
	        // Gecko returns String("") for file: mailto:
	        // WebKit/Blink returns String("SCHEME://") for file: mailto:
	        switch (this._scheme) {
	          case 'file':
	            return 'file://'; // EPUBJS Added
	          case 'data':
	          case 'javascript':
	          case 'mailto':
	            return 'null';
	        }
	        host = this.host;
	        if (!host) {
	          return '';
	        }
	        return this._scheme + '://' + host;
	      }
	    };

	    // Copy over the static methods
	    var OriginalURL = scope.URL;
	    if (OriginalURL) {
	      jURL.createObjectURL = function (blob) {
	        // IE extension allows a second optional options argument.
	        // http://msdn.microsoft.com/en-us/library/ie/hh772302(v=vs.85).aspx
	        return OriginalURL.createObjectURL.apply(OriginalURL, arguments);
	      };
	      jURL.revokeObjectURL = function (url) {
	        OriginalURL.revokeObjectURL(url);
	      };
	    }

	    return jURL;
	  });
	});

	var svg = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createElement = createElement;
	function createElement(name) {
	    return document.createElementNS('http://www.w3.org/2000/svg', name);
	}

	exports.default = {
	    createElement: createElement
	};
	});

	unwrapExports(svg);
	var svg_1 = svg.createElement;

	var events = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.proxyMouse = proxyMouse;
	exports.clone = clone;
	// import 'babelify/polyfill'; // needed for Object.assign

	exports.default = {
	    proxyMouse: proxyMouse
	};

	/**
	 * Start proxying all mouse events that occur on the target node to each node in
	 * a set of tracked nodes.
	 *
	 * The items in tracked do not strictly have to be DOM Nodes, but they do have
	 * to have dispatchEvent, getBoundingClientRect, and getClientRects methods.
	 *
	 * @param target {Node} The node on which to listen for mouse events.
	 * @param tracked {Node[]} A (possibly mutable) array of nodes to which to proxy
	 *                         events.
	 */

	function proxyMouse(target, tracked) {
	    function dispatch(e) {
	        // We walk through the set of tracked elements in reverse order so that
	        // events are sent to those most recently added first.
	        //
	        // This is the least surprising behaviour as it simulates the way the
	        // browser would work if items added later were drawn "on top of"
	        // earlier ones.
	        for (var i = tracked.length - 1; i >= 0; i--) {
	            var t = tracked[i];
	            var x = e.clientX;
	            var y = e.clientY;

	            if (e.touches && e.touches.length) {
	                x = e.touches[0].clientX;
	                y = e.touches[0].clientY;
	            }

	            if (!contains(t, target, x, y)) {
	                continue;
	            }

	            // The event targets this mark, so dispatch a cloned event:
	            t.dispatchEvent(clone(e));
	            // We only dispatch the cloned event to the first matching mark.
	            break;
	        }
	    }

	    if (target.nodeName === "iframe" || target.nodeName === "IFRAME") {

	        try {
	            // Try to get the contents if same domain
	            this.target = target.contentDocument;
	        } catch (err) {
	            this.target = target;
	        }
	    } else {
	        this.target = target;
	    }

	    var _arr = ['mouseup', 'mousedown', 'click', 'touchstart'];
	    for (var _i = 0; _i < _arr.length; _i++) {
	        var ev = _arr[_i];
	        this.target.addEventListener(ev, function (e) {
	            return dispatch(e);
	        }, false);
	    }
	}

	/**
	 * Clone a mouse event object.
	 *
	 * @param e {MouseEvent} A mouse event object to clone.
	 * @returns {MouseEvent}
	 */
	function clone(e) {
	    var opts = Object.assign({}, e, { bubbles: false });
	    try {
	        return new MouseEvent(e.type, opts);
	    } catch (err) {
	        // compat: webkit
	        var copy = document.createEvent('MouseEvents');
	        copy.initMouseEvent(e.type, false, opts.cancelable, opts.view, opts.detail, opts.screenX, opts.screenY, opts.clientX, opts.clientY, opts.ctrlKey, opts.altKey, opts.shiftKey, opts.metaKey, opts.button, opts.relatedTarget);
	        return copy;
	    }
	}

	/**
	 * Check if the item contains the point denoted by the passed coordinates
	 * @param item {Object} An object with getBoundingClientRect and getClientRects
	 *                      methods.
	 * @param x {Number}
	 * @param y {Number}
	 * @returns {Boolean}
	 */
	function contains(item, target, x, y) {
	    // offset
	    var offset = target.getBoundingClientRect();

	    function rectContains(r, x, y) {
	        var top = r.top - offset.top;
	        var left = r.left - offset.left;
	        var bottom = top + r.height;
	        var right = left + r.width;
	        return top <= y && left <= x && bottom > y && right > x;
	    }

	    // Check overall bounding box first
	    var rect = item.getBoundingClientRect();
	    if (!rectContains(rect, x, y)) {
	        return false;
	    }

	    // Then continue to check each child rect
	    var rects = item.getClientRects();
	    for (var i = 0, len = rects.length; i < len; i++) {
	        if (rectContains(rects[i], x, y)) {
	            return true;
	        }
	    }
	    return false;
	}
	});

	unwrapExports(events);
	var events_1 = events.proxyMouse;
	var events_2 = events.clone;

	var marks = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Underline = exports.Highlight = exports.Mark = exports.Pane = undefined;

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _svg2 = _interopRequireDefault(svg);



	var _events2 = _interopRequireDefault(events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Pane = exports.Pane = function () {
	    function Pane(target) {
	        var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

	        _classCallCheck(this, Pane);

	        this.target = target;
	        this.element = _svg2.default.createElement('svg');
	        this.marks = [];

	        // Match the coordinates of the target element
	        this.element.style.position = 'absolute';
	        // Disable pointer events
	        this.element.setAttribute('pointer-events', 'none');

	        // Set up mouse event proxying between the target element and the marks
	        _events2.default.proxyMouse(this.target, this.marks);

	        this.container = container;
	        this.container.appendChild(this.element);

	        this.render();
	    }

	    _createClass(Pane, [{
	        key: 'addMark',
	        value: function addMark(mark) {
	            var g = _svg2.default.createElement('g');
	            this.element.appendChild(g);
	            mark.bind(g, this.container);

	            this.marks.push(mark);

	            mark.render();
	            return mark;
	        }
	    }, {
	        key: 'removeMark',
	        value: function removeMark(mark) {
	            var idx = this.marks.indexOf(mark);
	            if (idx === -1) {
	                return;
	            }
	            var el = mark.unbind();
	            this.element.removeChild(el);
	            this.marks.splice(idx, 1);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            setCoords(this.element, coords(this.target, this.container));
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.marks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var m = _step.value;

	                    m.render();
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }]);

	    return Pane;
	}();

	var Mark = exports.Mark = function () {
	    function Mark() {
	        _classCallCheck(this, Mark);

	        this.element = null;
	    }

	    _createClass(Mark, [{
	        key: 'bind',
	        value: function bind(element, container) {
	            this.element = element;
	            this.container = container;
	        }
	    }, {
	        key: 'unbind',
	        value: function unbind() {
	            var el = this.element;
	            this.element = null;
	            return el;
	        }
	    }, {
	        key: 'render',
	        value: function render() {}
	    }, {
	        key: 'dispatchEvent',
	        value: function dispatchEvent(e) {
	            if (!this.element) return;
	            this.element.dispatchEvent(e);
	        }
	    }, {
	        key: 'getBoundingClientRect',
	        value: function getBoundingClientRect() {
	            return this.element.getBoundingClientRect();
	        }
	    }, {
	        key: 'getClientRects',
	        value: function getClientRects() {
	            var rects = [];
	            var el = this.element.firstChild;
	            while (el) {
	                rects.push(el.getBoundingClientRect());
	                el = el.nextSibling;
	            }
	            return rects;
	        }
	    }, {
	        key: 'filteredRanges',
	        value: function filteredRanges() {
	            var rects = Array.from(this.range.getClientRects());

	            // De-duplicate the boxes
	            return rects.filter(function (box) {
	                for (var i = 0; i < rects.length; i++) {
	                    if (rects[i] === box) {
	                        return true;
	                    }
	                    var contained = contains(rects[i], box);
	                    if (contained) {
	                        return false;
	                    }
	                }
	                return true;
	            });
	        }
	    }]);

	    return Mark;
	}();

	var Highlight = exports.Highlight = function (_Mark) {
	    _inherits(Highlight, _Mark);

	    function Highlight(range, className, data, attributes) {
	        _classCallCheck(this, Highlight);

	        var _this = _possibleConstructorReturn(this, (Highlight.__proto__ || Object.getPrototypeOf(Highlight)).call(this));

	        _this.range = range;
	        _this.className = className;
	        _this.data = data || {};
	        _this.attributes = attributes || {};
	        return _this;
	    }

	    _createClass(Highlight, [{
	        key: 'bind',
	        value: function bind(element, container) {
	            _get(Highlight.prototype.__proto__ || Object.getPrototypeOf(Highlight.prototype), 'bind', this).call(this, element, container);

	            for (var attr in this.data) {
	                if (this.data.hasOwnProperty(attr)) {
	                    this.element.dataset[attr] = this.data[attr];
	                }
	            }

	            for (var attr in this.attributes) {
	                if (this.attributes.hasOwnProperty(attr)) {
	                    this.element.setAttribute(attr, this.attributes[attr]);
	                }
	            }

	            if (this.className) {
	                this.element.classList.add(this.className);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            // Empty element
	            while (this.element.firstChild) {
	                this.element.removeChild(this.element.firstChild);
	            }

	            var docFrag = this.element.ownerDocument.createDocumentFragment();
	            var filtered = this.filteredRanges();
	            var offset = this.element.getBoundingClientRect();
	            var container = this.container.getBoundingClientRect();

	            for (var i = 0, len = filtered.length; i < len; i++) {
	                var r = filtered[i];
	                var el = _svg2.default.createElement('rect');
	                el.setAttribute('x', r.left - offset.left + container.left);
	                el.setAttribute('y', r.top - offset.top + container.top);
	                el.setAttribute('height', r.height);
	                el.setAttribute('width', r.width);
	                docFrag.appendChild(el);
	            }

	            this.element.appendChild(docFrag);
	        }
	    }]);

	    return Highlight;
	}(Mark);

	var Underline = exports.Underline = function (_Highlight) {
	    _inherits(Underline, _Highlight);

	    function Underline(range, className, data, attributes) {
	        _classCallCheck(this, Underline);

	        return _possibleConstructorReturn(this, (Underline.__proto__ || Object.getPrototypeOf(Underline)).call(this, range, className, data, attributes));
	    }

	    _createClass(Underline, [{
	        key: 'render',
	        value: function render() {
	            // Empty element
	            while (this.element.firstChild) {
	                this.element.removeChild(this.element.firstChild);
	            }

	            var docFrag = this.element.ownerDocument.createDocumentFragment();
	            var filtered = this.filteredRanges();
	            var offset = this.element.getBoundingClientRect();
	            var container = this.container.getBoundingClientRect();

	            for (var i = 0, len = filtered.length; i < len; i++) {
	                var r = filtered[i];

	                var rect = _svg2.default.createElement('rect');
	                rect.setAttribute('x', r.left - offset.left + container.left);
	                rect.setAttribute('y', r.top - offset.top + container.top);
	                rect.setAttribute('height', r.height);
	                rect.setAttribute('width', r.width);
	                rect.setAttribute('fill', 'none');

	                var line = _svg2.default.createElement('line');
	                line.setAttribute('x1', r.left - offset.left + container.left);
	                line.setAttribute('x2', r.left - offset.left + container.left + r.width);
	                line.setAttribute('y1', r.top - offset.top + container.top + r.height - 1);
	                line.setAttribute('y2', r.top - offset.top + container.top + r.height - 1);

	                line.setAttribute('stroke-width', 1);
	                line.setAttribute('stroke', 'black'); //TODO: match text color?
	                line.setAttribute('stroke-linecap', 'square');

	                docFrag.appendChild(rect);

	                docFrag.appendChild(line);
	            }

	            this.element.appendChild(docFrag);
	        }
	    }]);

	    return Underline;
	}(Highlight);

	function coords(el, container) {
	    var offset = container.getBoundingClientRect();
	    var rect = el.getBoundingClientRect();

	    return {
	        top: rect.top - offset.top,
	        left: rect.left - offset.left,
	        height: el.scrollHeight,
	        width: el.scrollWidth
	    };
	}

	function setCoords(el, coords) {
	    el.style.top = coords.top + 'px';
	    el.style.left = coords.left + 'px';
	    el.style.height = coords.height + 'px';
	    el.style.width = coords.width + 'px';
	}

	function contains(rect1, rect2) {
	    return rect2.right <= rect1.right && rect2.left >= rect1.left && rect2.top >= rect1.top && rect2.bottom <= rect1.bottom;
	}
	});

	unwrapExports(marks);
	var marks_1 = marks.Underline;
	var marks_2 = marks.Highlight;
	var marks_3 = marks.Mark;
	var marks_4 = marks.Pane;

	var IframeView = function () {
		function IframeView(section, options) {
			_classCallCheck(this, IframeView);

			this.settings = extend({
				ignoreClass: "",
				axis: options.layout && options.layout.props.flow === "scrolled" ? "vertical" : "horizontal",
				direction: undefined,
				width: 0,
				height: 0,
				layout: undefined,
				globalLayoutProperties: {},
				method: "url"
			}, options || {});

			this.id = "epubjs-view-" + uuid();
			this.section = section;
			this.index = section.index;

			this.element = this.container(this.settings.axis);

			this.added = false;
			this.displayed = false;
			this.rendered = false;

			// this.width  = this.settings.width;
			// this.height = this.settings.height;

			this.fixedWidth = 0;
			this.fixedHeight = 0;

			// Blank Cfi for Parsing
			this.epubcfi = new EpubCFI();

			this.layout = this.settings.layout;
			// Dom events to listen for
			// this.listenedEvents = ["keydown", "keyup", "keypressed", "mouseup", "mousedown", "click", "touchend", "touchstart"];

			this.pane = undefined;
			this.highlights = {};
			this.underlines = {};
			this.marks = {};
		}

		_createClass(IframeView, [{
			key: "container",
			value: function container(axis) {
				var element = document.createElement("div");

				element.classList.add("epub-view");

				// this.element.style.minHeight = "100px";
				element.style.height = "0px";
				element.style.width = "0px";
				element.style.overflow = "hidden";
				element.style.position = "relative";
				element.style.display = "block";

				if (axis && axis == "horizontal") {
					element.style.flex = "none";
				} else {
					element.style.flex = "initial";
				}

				return element;
			}
		}, {
			key: "create",
			value: function create() {

				if (this.iframe) {
					return this.iframe;
				}

				if (!this.element) {
					this.element = this.createContainer();
				}

				this.iframe = document.createElement("iframe");
				this.iframe.id = this.id;
				this.iframe.scrolling = "no"; // Might need to be removed: breaks ios width calculations
				this.iframe.style.overflow = "hidden";
				this.iframe.seamless = "seamless";
				// Back up if seamless isn't supported
				this.iframe.style.border = "none";

				this.iframe.setAttribute("enable-annotation", "true");

				this.resizing = true;

				// this.iframe.style.display = "none";
				this.element.style.visibility = "hidden";
				this.iframe.style.visibility = "hidden";

				this.iframe.style.width = "0";
				this.iframe.style.height = "0";
				this._width = 0;
				this._height = 0;

				this.element.setAttribute("ref", this.index);

				this.element.appendChild(this.iframe);
				this.added = true;

				this.elementBounds = bounds(this.element);

				// if(width || height){
				//   this.resize(width, height);
				// } else if(this.width && this.height){
				//   this.resize(this.width, this.height);
				// } else {
				//   this.iframeBounds = bounds(this.iframe);
				// }


				if ("srcdoc" in this.iframe) {
					this.supportsSrcdoc = true;
				} else {
					this.supportsSrcdoc = false;
				}

				// if (!this.settings.method) {
				// 	this.settings.method = this.supportsSrcdoc ? "srcdoc" : "write";
				// }

				return this.iframe;
			}
		}, {
			key: "render",
			value: function render(request$$1, show) {
				var contents = void 0;
				// view.onLayout = this.layout.format.bind(this.layout);
				this.create();

				// Fit to size of the container, apply padding
				this.size();

				if (this.settings.method === "url") {
					contents = this.section.href;
				} else if (contents) {
					contents = this.section.contents;
				} else {
					contents = request(this.section.href);
				}

				// Render Chain
				return this.load(contents).then(function () {
					var _this = this;

					// apply the layout function to the contents
					this.layout.format(this.contents);

					// find and report the writingMode axis
					var writingMode = this.contents.writingMode();
					var axis = writingMode.indexOf("vertical") === 0 ? "vertical" : "horizontal";

					this.setAxis(axis);
					this.emit(EVENTS.VIEWS.AXIS, axis);

					// Listen for events that require an expansion of the iframe
					this.addListeners();

					return new _Promise(function (resolve, reject) {
						// Expand the iframe to the full size of the content
						_this.expand();
						resolve();
					});
				}.bind(this), function (e) {
					this.emit(EVENTS.VIEWS.LOAD_ERROR, e);
					return new _Promise(function (resolve, reject) {
						reject(e);
					});
				}.bind(this)).then(function () {
					this.emit(EVENTS.VIEWS.RENDERED, this.section);
				}.bind(this));
			}
		}, {
			key: "reset",
			value: function reset() {
				if (this.iframe) {
					this.iframe.style.width = "0";
					this.iframe.style.height = "0";
					this._width = 0;
					this._height = 0;
					this._textWidth = undefined;
					this._contentWidth = undefined;
					this._textHeight = undefined;
					this._contentHeight = undefined;
				}
				this._needsReframe = true;
			}

			// Determine locks base on settings

		}, {
			key: "size",
			value: function size(_width, _height) {
				var width = _width || this.settings.width;
				var height = _height || this.settings.height;

				if (this.layout.name === "pre-paginated") {
					this.lock("both", width, height);
				} else if (this.settings.axis === "horizontal") {
					this.lock("height", width, height);
				} else {
					this.lock("width", width, height);
				}

				this.settings.width = width;
				this.settings.height = height;
			}

			// Lock an axis to element dimensions, taking borders into account

		}, {
			key: "lock",
			value: function lock(what, width, height) {
				var elBorders = borders(this.element);
				var iframeBorders;

				if (this.iframe) {
					iframeBorders = borders(this.iframe);
				} else {
					iframeBorders = { width: 0, height: 0 };
				}

				if (what == "width" && isNumber(width)) {
					this.lockedWidth = width - elBorders.width - iframeBorders.width;
					// this.resize(this.lockedWidth, width); //  width keeps ratio correct
				}

				if (what == "height" && isNumber(height)) {
					this.lockedHeight = height - elBorders.height - iframeBorders.height;
					// this.resize(width, this.lockedHeight);
				}

				if (what === "both" && isNumber(width) && isNumber(height)) {

					this.lockedWidth = width - elBorders.width - iframeBorders.width;
					this.lockedHeight = height - elBorders.height - iframeBorders.height;
					// this.resize(this.lockedWidth, this.lockedHeight);
				}

				if (this.displayed && this.iframe) {

					// this.contents.layout();
					this.expand();
				}
			}

			// Resize a single axis based on content dimensions

		}, {
			key: "expand",
			value: function expand(force) {
				var width = this.lockedWidth;
				var height = this.lockedHeight;
				var columns;

				if (!this.iframe || this._expanding) return;

				this._expanding = true;

				if (this.layout.name === "pre-paginated") {
					width = this.layout.columnWidth;
					height = this.layout.height;
				}
				// Expand Horizontally
				else if (this.settings.axis === "horizontal") {
						// Get the width of the text
						width = this.contents.textWidth();

						if (width % this.layout.pageWidth > 0) {
							width = Math.ceil(width / this.layout.pageWidth) * this.layout.pageWidth;
						}

						if (this.settings.forceEvenPages) {
							columns = width / this.layout.delta;
							if (this.layout.divisor > 1 && this.layout.name === "reflowable" && columns % 2 > 0) {
								// add a blank page
								width += this.layout.gap + this.layout.columnWidth;
							}
						}
					} // Expand Vertically
					else if (this.settings.axis === "vertical") {
							height = this.contents.scrollHeight();
						}

				// Only Resize if dimensions have changed or
				// if Frame is still hidden, so needs reframing
				if (this._needsReframe || width != this._width || height != this._height) {
					this.reframe(width, height);
				}

				this._expanding = false;
			}
		}, {
			key: "reframe",
			value: function reframe(width, height) {
				var size;

				if (isNumber(width)) {
					this.element.style.width = width + "px";
					this.iframe.style.width = width + "px";
					this._width = width;
				}

				if (isNumber(height)) {
					this.element.style.height = height + "px";
					this.iframe.style.height = height + "px";
					this._height = height;
				}

				var widthDelta = this.prevBounds ? width - this.prevBounds.width : width;
				var heightDelta = this.prevBounds ? height - this.prevBounds.height : height;

				size = {
					width: width,
					height: height,
					widthDelta: widthDelta,
					heightDelta: heightDelta
				};

				this.pane && this.pane.render();

				this.onResize(this, size);

				this.emit(EVENTS.VIEWS.RESIZED, size);

				this.prevBounds = size;

				this.elementBounds = bounds(this.element);
			}
		}, {
			key: "load",
			value: function load(contents) {
				var _this2 = this;

				var loading = new defer$1();
				var loaded = loading.promise;

				if (!this.iframe) {
					loading.reject(new Error("No Iframe Available"));
					return loaded;
				}

				this.iframe.onload = function (event) {

					this.onLoad(event, loading);
				}.bind(this);

				if (this.settings.method != "url") {
					contents.then(function (r) {
						var text = serialize(r);
						if (_this2.settings.method === "blobUrl") {
							_this2.blobUrl = createBlobUrl(text, "application/xhtml+xml");
							_this2.iframe.src = _this2.blobUrl;
						} else if (_this2.settings.method === "srcdoc") {
							_this2.iframe.srcdoc = text;
						}
					});
				} else {
					this.iframe.src = contents;
				}

				return loaded;
			}
		}, {
			key: "onLoad",
			value: function onLoad(event, promise) {
				var _this3 = this;

				this.window = this.iframe.contentWindow;
				this.document = this.iframe.contentDocument;

				this.contents = new Contents(this.document, this.document.body, this.section.cfiBase, this.section.index);

				this.rendering = false;

				/*
	   TODO: this seems not needed with replace cannonical
	   var link = this.document.querySelector("link[rel='canonical']");
	   if (link) {
	   	link.setAttribute("href", this.section.canonical);
	   } else {
	   	link = this.document.createElement("link");
	   	link.setAttribute("rel", "canonical");
	   	link.setAttribute("href", this.section.canonical);
	   	this.document.querySelector("head").appendChild(link);
	   }
	   */

				this.contents.on(EVENTS.CONTENTS.EXPAND, function () {
					if (_this3.displayed && _this3.iframe) {
						_this3.expand();
						if (_this3.contents) {
							_this3.layout.format(_this3.contents);
						}
					}
				});

				this.contents.on(EVENTS.CONTENTS.RESIZE, function (e) {
					if (_this3.displayed && _this3.iframe) {
						_this3.expand();
						if (_this3.contents) {
							_this3.layout.format(_this3.contents);
						}
					}
				});

				promise.resolve(this.contents);
			}
		}, {
			key: "setLayout",
			value: function setLayout(layout) {
				this.layout = layout;

				if (this.contents) {
					this.layout.format(this.contents);
					this.expand();
				}
			}
		}, {
			key: "setAxis",
			value: function setAxis(axis) {

				// Force vertical for scrolled
				if (this.layout.props.flow === "scrolled") {
					axis = "vertical";
				}

				this.settings.axis = axis;

				if (axis == "horizontal") {
					this.element.style.flex = "none";
				} else {
					this.element.style.flex = "initial";
				}

				this.size();
			}
		}, {
			key: "addListeners",
			value: function addListeners() {
				//TODO: Add content listeners for expanding
			}
		}, {
			key: "removeListeners",
			value: function removeListeners(layoutFunc) {
				//TODO: remove content listeners for expanding
			}
		}, {
			key: "display",
			value: function display(request$$1) {
				var displayed = new defer$1();

				if (!this.displayed) {

					this.render(request$$1).then(function () {

						this.emit(EVENTS.VIEWS.DISPLAYED, this);
						this.onDisplayed(this);

						this.displayed = true;
						displayed.resolve(this);
					}.bind(this), function (err) {
						displayed.reject(err, this);
					});
				} else {
					displayed.resolve(this);
				}

				return displayed.promise;
			}
		}, {
			key: "show",
			value: function show() {

				this.element.style.visibility = "visible";

				if (this.iframe) {
					this.iframe.style.visibility = "visible";
				}

				this.emit(EVENTS.VIEWS.SHOWN, this);
			}
		}, {
			key: "hide",
			value: function hide() {
				// this.iframe.style.display = "none";
				this.element.style.visibility = "hidden";
				this.iframe.style.visibility = "hidden";

				this.stopExpanding = true;
				this.emit(EVENTS.VIEWS.HIDDEN, this);
			}
		}, {
			key: "offset",
			value: function offset() {
				return {
					top: this.element.offsetTop,
					left: this.element.offsetLeft
				};
			}
		}, {
			key: "width",
			value: function width() {
				return this._width;
			}
		}, {
			key: "height",
			value: function height() {
				return this._height;
			}
		}, {
			key: "position",
			value: function position() {
				return this.element.getBoundingClientRect();
			}
		}, {
			key: "locationOf",
			value: function locationOf$$1(target) {
				// var parentPos = this.iframe.getBoundingClientRect();
				var targetPos = this.contents.locationOf(target, this.settings.ignoreClass);

				return {
					"left": targetPos.left,
					"top": targetPos.top
				};
			}
		}, {
			key: "onDisplayed",
			value: function onDisplayed(view) {
				// Stub, override with a custom functions
			}
		}, {
			key: "onResize",
			value: function onResize(view, e) {
				// Stub, override with a custom functions
			}
		}, {
			key: "bounds",
			value: function bounds$$1(force) {
				if (force || !this.elementBounds) {
					this.elementBounds = bounds(this.element);
				}

				return this.elementBounds;
			}
		}, {
			key: "highlight",
			value: function highlight(cfiRange) {
				var _this4 = this;

				var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
				var cb = arguments[2];

				if (!this.contents) {
					return;
				}
				var range = this.contents.range(cfiRange);

				var emitter = function emitter() {
					_this4.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
				};

				data["epubcfi"] = cfiRange;

				if (!this.pane) {
					this.pane = new marks_4(this.iframe, this.element);
				}

				var m = new marks_2(range, "epubjs-hl", data, { "fill": "yellow", "fill-opacity": "0.3", "mix-blend-mode": "multiply" });
				var h = this.pane.addMark(m);

				this.highlights[cfiRange] = { "mark": h, "element": h.element, "listeners": [emitter, cb] };

				h.element.setAttribute("ref", "epubjs-hl");
				h.element.addEventListener("click", emitter);
				h.element.addEventListener("touchstart", emitter);

				if (cb) {
					h.element.addEventListener("click", cb);
					h.element.addEventListener("touchstart", cb);
				}
				return h;
			}
		}, {
			key: "underline",
			value: function underline(cfiRange) {
				var _this5 = this;

				var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
				var cb = arguments[2];

				if (!this.contents) {
					return;
				}
				var range = this.contents.range(cfiRange);
				var emitter = function emitter() {
					_this5.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
				};

				data["epubcfi"] = cfiRange;

				if (!this.pane) {
					this.pane = new marks_4(this.iframe, this.element);
				}

				var m = new marks_1(range, "epubjs-ul", data, { "stroke": "black", "stroke-opacity": "0.3", "mix-blend-mode": "multiply" });
				var h = this.pane.addMark(m);

				this.underlines[cfiRange] = { "mark": h, "element": h.element, "listeners": [emitter, cb] };

				h.element.setAttribute("ref", "epubjs-ul");
				h.element.addEventListener("click", emitter);
				h.element.addEventListener("touchstart", emitter);

				if (cb) {
					h.element.addEventListener("click", cb);
					h.element.addEventListener("touchstart", cb);
				}
				return h;
			}
		}, {
			key: "mark",
			value: function mark(cfiRange) {
				var _this6 = this;

				var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
				var cb = arguments[2];


				if (!this.contents) {
					return;
				}

				if (cfiRange in this.marks) {
					var item = this.marks[cfiRange];
					return item;
				}

				var range = this.contents.range(cfiRange);
				if (!range) {
					return;
				}
				var container = range.commonAncestorContainer;
				var parent = container.nodeType === 1 ? container : container.parentNode;

				var emitter = function emitter(e) {
					_this6.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
				};

				if (range.collapsed && container.nodeType === 1) {
					range = new Range();
					range.selectNodeContents(container);
				} else if (range.collapsed) {
					// Webkit doesn't like collapsed ranges
					range = new Range();
					range.selectNodeContents(parent);
				}

				var top = void 0,
				    right = void 0,
				    left = void 0;

				if (this.layout.name === "pre-paginated" || this.settings.axis !== "horizontal") {
					var pos = range.getBoundingClientRect();
					top = pos.top;
					right = pos.right;
				} else {
					// Element might break columns, so find the left most element
					var rects = range.getClientRects();
					var rect = void 0;
					for (var i = 0; i != rects.length; i++) {
						rect = rects[i];
						if (!left || rect.left < left) {
							left = rect.left;
							right = left + this.layout.columnWidth - this.layout.gap;
							top = rect.top;
						}
					}
				}

				var mark = this.document.createElement("a");
				mark.setAttribute("ref", "epubjs-mk");
				mark.style.position = "absolute";
				mark.style.top = top + "px";
				mark.style.left = right + "px";

				mark.dataset["epubcfi"] = cfiRange;

				if (data) {
					_Object$keys(data).forEach(function (key) {
						mark.dataset[key] = data[key];
					});
				}

				if (cb) {
					mark.addEventListener("click", cb);
					mark.addEventListener("touchstart", cb);
				}

				mark.addEventListener("click", emitter);
				mark.addEventListener("touchstart", emitter);

				this.element.appendChild(mark);

				this.marks[cfiRange] = { "element": mark, "listeners": [emitter, cb] };

				return parent;
			}
		}, {
			key: "unhighlight",
			value: function unhighlight(cfiRange) {
				var item = void 0;
				if (cfiRange in this.highlights) {
					item = this.highlights[cfiRange];

					this.pane.removeMark(item.mark);
					item.listeners.forEach(function (l) {
						if (l) {
							item.element.removeEventListener("click", l);
						}
					});
					delete this.highlights[cfiRange];
				}
			}
		}, {
			key: "ununderline",
			value: function ununderline(cfiRange) {
				var item = void 0;
				if (cfiRange in this.underlines) {
					item = this.underlines[cfiRange];
					this.pane.removeMark(item.mark);
					item.listeners.forEach(function (l) {
						if (l) {
							item.element.removeEventListener("click", l);
						}
					});
					delete this.underlines[cfiRange];
				}
			}
		}, {
			key: "unmark",
			value: function unmark(cfiRange) {
				var item = void 0;
				if (cfiRange in this.marks) {
					item = this.marks[cfiRange];
					this.element.removeChild(item.element);
					item.listeners.forEach(function (l) {
						if (l) {
							item.element.removeEventListener("click", l);
						}
					});
					delete this.marks[cfiRange];
				}
			}
		}, {
			key: "destroy",
			value: function destroy() {

				for (var cfiRange in this.highlights) {
					this.unhighlight(cfiRange);
				}

				for (var _cfiRange in this.underlines) {
					this.ununderline(_cfiRange);
				}

				for (var _cfiRange2 in this.marks) {
					this.unmark(_cfiRange2);
				}

				if (this.blobUrl) {
					revokeBlobUrl(this.blobUrl);
				}

				if (this.displayed) {
					this.displayed = false;

					this.removeListeners();

					this.stopExpanding = true;
					this.element.removeChild(this.iframe);

					this.iframe = null;

					this._textWidth = null;
					this._textHeight = null;
					this._width = null;
					this._height = null;
				}
				// this.element.style.height = "0px";
				// this.element.style.width = "0px";
			}
		}]);

		return IframeView;
	}();

	eventEmitter(IframeView.prototype);

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	var isObject_1 = isObject;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	var _freeGlobal = freeGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = _freeGlobal || freeSelf || Function('return this')();

	var _root = root;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return _root.Date.now();
	};

	var now_1 = now;

	/** Built-in value references. */
	var Symbol$1 = _root.Symbol;

	var _Symbol = Symbol$1;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty$1.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	var _getRawTag = getRawTag;

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString$1 = objectProto$1.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString$1.call(value);
	}

	var _objectToString = objectToString;

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag$1 && symToStringTag$1 in Object(value))
	    ? _getRawTag(value)
	    : _objectToString(value);
	}

	var _baseGetTag = baseGetTag;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	var isObjectLike_1 = isObjectLike;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol$1(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
	}

	var isSymbol_1 = isSymbol$1;

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol_1(value)) {
	    return NAN;
	  }
	  if (isObject_1(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject_1(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	var toNumber_1 = toNumber;

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber_1(wait) || 0;
	  if (isObject_1(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        timeWaiting = wait - timeSinceLastCall;

	    return maxing
	      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
	      : timeWaiting;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now_1();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now_1());
	  }

	  function debounced() {
	    var time = now_1(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	var debounce_1 = debounce;

	/** Error message constants. */
	var FUNC_ERROR_TEXT$1 = 'Expected a function';

	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT$1);
	  }
	  if (isObject_1(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce_1(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}

	var throttle_1 = throttle;

	var Stage = function () {
		function Stage(_options) {
			_classCallCheck(this, Stage);

			this.settings = _options || {};
			this.id = "epubjs-container-" + uuid();

			this.container = this.create(this.settings);

			if (this.settings.hidden) {
				this.wrapper = this.wrap(this.container);
			}
		}

		/*
	 * Creates an element to render to.
	 * Resizes to passed width and height or to the elements size
	 */


		_createClass(Stage, [{
			key: "create",
			value: function create(options) {
				var height = options.height; // !== false ? options.height : "100%";
				var width = options.width; // !== false ? options.width : "100%";
				var overflow = options.overflow || false;
				var axis = options.axis || "vertical";
				var direction = options.direction;

				if (options.height && isNumber(options.height)) {
					height = options.height + "px";
				}

				if (options.width && isNumber(options.width)) {
					width = options.width + "px";
				}

				// Create new container element
				var container = document.createElement("div");

				container.id = this.id;
				container.classList.add("epub-container");

				// Style Element
				// container.style.fontSize = "0";
				container.style.wordSpacing = "0";
				container.style.lineHeight = "0";
				container.style.verticalAlign = "top";
				container.style.position = "relative";

				if (axis === "horizontal") {
					// container.style.whiteSpace = "nowrap";
					container.style.display = "flex";
					container.style.flexDirection = "row";
					container.style.flexWrap = "nowrap";
				}

				if (width) {
					container.style.width = width;
				}

				if (height) {
					container.style.height = height;
				}

				if (overflow) {
					container.style.overflow = overflow;
				}

				if (direction) {
					container.dir = direction;
					container.style["direction"] = direction;
				}

				if (direction && this.settings.fullsize) {
					document.body.style["direction"] = direction;
				}

				return container;
			}
		}, {
			key: "wrap",
			value: function wrap(container) {
				var wrapper = document.createElement("div");

				wrapper.style.visibility = "hidden";
				wrapper.style.overflow = "hidden";
				wrapper.style.width = "0";
				wrapper.style.height = "0";

				wrapper.appendChild(container);
				return wrapper;
			}
		}, {
			key: "getElement",
			value: function getElement(_element) {
				var element;

				if (isElement(_element)) {
					element = _element;
				} else if (typeof _element === "string") {
					element = document.getElementById(_element);
				}

				if (!element) {
					throw new Error("Not an Element");
				}

				return element;
			}
		}, {
			key: "attachTo",
			value: function attachTo(what) {

				var element = this.getElement(what);
				var base;

				if (!element) {
					return;
				}

				if (this.settings.hidden) {
					base = this.wrapper;
				} else {
					base = this.container;
				}

				element.appendChild(base);

				this.element = element;

				return element;
			}
		}, {
			key: "getContainer",
			value: function getContainer() {
				return this.container;
			}
		}, {
			key: "onResize",
			value: function onResize(func) {
				// Only listen to window for resize event if width and height are not fixed.
				// This applies if it is set to a percent or auto.
				if (!isNumber(this.settings.width) || !isNumber(this.settings.height)) {
					this.resizeFunc = throttle_1(func, 50);
					window.addEventListener("resize", this.resizeFunc, false);
				}
			}
		}, {
			key: "onOrientationChange",
			value: function onOrientationChange(func) {
				this.orientationChangeFunc = func;
				window.addEventListener("orientationchange", this.orientationChangeFunc, false);
			}
		}, {
			key: "size",
			value: function size(width, height) {
				var bounds$$1;
				// var width = _width || this.settings.width;
				// var height = _height || this.settings.height;

				// If width or height are set to false, inherit them from containing element
				if (width === null) {
					bounds$$1 = this.element.getBoundingClientRect();

					if (bounds$$1.width) {
						width = bounds$$1.width;
						this.container.style.width = bounds$$1.width + "px";
					}
				}

				if (height === null) {
					bounds$$1 = bounds$$1 || this.element.getBoundingClientRect();

					if (bounds$$1.height) {
						height = bounds$$1.height;
						this.container.style.height = bounds$$1.height + "px";
					}
				}

				if (!isNumber(width)) {
					bounds$$1 = this.container.getBoundingClientRect();
					width = bounds$$1.width;
					//height = bounds.height;
				}

				if (!isNumber(height)) {
					bounds$$1 = bounds$$1 || this.container.getBoundingClientRect();
					//width = bounds.width;
					height = bounds$$1.height;
				}

				this.containerStyles = window.getComputedStyle(this.container);

				this.containerPadding = {
					left: parseFloat(this.containerStyles["padding-left"]) || 0,
					right: parseFloat(this.containerStyles["padding-right"]) || 0,
					top: parseFloat(this.containerStyles["padding-top"]) || 0,
					bottom: parseFloat(this.containerStyles["padding-bottom"]) || 0
				};

				// Bounds not set, get them from window
				var _windowBounds = windowBounds();
				if (!width) {
					width = _windowBounds.width;
				}
				if (this.settings.fullsize || !height) {
					height = _windowBounds.height;
				}

				return {
					width: width - this.containerPadding.left - this.containerPadding.right,
					height: height - this.containerPadding.top - this.containerPadding.bottom
				};
			}
		}, {
			key: "bounds",
			value: function bounds$$1() {
				var box = void 0;
				if (this.container.style.overflow !== "visible") {
					box = this.container && this.container.getBoundingClientRect();
				}

				if (!box || !box.width || !box.height) {
					return windowBounds();
				} else {
					return box;
				}
			}
		}, {
			key: "getSheet",
			value: function getSheet() {
				var style = document.createElement("style");

				// WebKit hack --> https://davidwalsh.name/add-rules-stylesheets
				style.appendChild(document.createTextNode(""));

				document.head.appendChild(style);

				return style.sheet;
			}
		}, {
			key: "addStyleRules",
			value: function addStyleRules(selector, rulesArray) {
				var scope = "#" + this.id + " ";
				var rules = "";

				if (!this.sheet) {
					this.sheet = this.getSheet();
				}

				rulesArray.forEach(function (set) {
					for (var prop in set) {
						if (set.hasOwnProperty(prop)) {
							rules += prop + ":" + set[prop] + ";";
						}
					}
				});

				this.sheet.insertRule(scope + selector + " {" + rules + "}", 0);
			}
		}, {
			key: "axis",
			value: function axis(_axis) {
				if (_axis === "horizontal") {
					this.container.style.display = "flex";
					this.container.style.flexDirection = "row";
					this.container.style.flexWrap = "nowrap";
				} else {
					this.container.style.display = "block";
				}
			}

			// orientation(orientation) {
			// 	if (orientation === "landscape") {
			//
			// 	} else {
			//
			// 	}
			//
			// 	this.orientation = orientation;
			// }

		}, {
			key: "direction",
			value: function direction(dir) {
				if (this.container) {
					this.container.dir = dir;
					this.container.style["direction"] = dir;
				}

				if (this.settings.fullsize) {
					document.body.style["direction"] = dir;
				}
			}
		}, {
			key: "destroy",
			value: function destroy() {
				var base;

				if (this.element) {

					if (this.settings.hidden) {
						base = this.wrapper;
					} else {
						base = this.container;
					}

					if (this.element.contains(base)) {
						this.element.removeChild(base);
					}

					window.removeEventListener("resize", this.resizeFunc);
					window.removeEventListener("orientationChange", this.orientationChangeFunc);
				}
			}
		}]);

		return Stage;
	}();

	var Views = function () {
		function Views(container) {
			_classCallCheck(this, Views);

			this.container = container;
			this._views = [];
			this.length = 0;
			this.hidden = false;
		}

		_createClass(Views, [{
			key: "all",
			value: function all() {
				return this._views;
			}
		}, {
			key: "first",
			value: function first() {
				return this._views[0];
			}
		}, {
			key: "last",
			value: function last() {
				return this._views[this._views.length - 1];
			}
		}, {
			key: "indexOf",
			value: function indexOf(view) {
				return this._views.indexOf(view);
			}
		}, {
			key: "slice",
			value: function slice() {
				return this._views.slice.apply(this._views, arguments);
			}
		}, {
			key: "get",
			value: function get(i) {
				return this._views[i];
			}
		}, {
			key: "append",
			value: function append(view) {
				this._views.push(view);
				if (this.container) {
					this.container.appendChild(view.element);
				}
				this.length++;
				return view;
			}
		}, {
			key: "prepend",
			value: function prepend(view) {
				this._views.unshift(view);
				if (this.container) {
					this.container.insertBefore(view.element, this.container.firstChild);
				}
				this.length++;
				return view;
			}
		}, {
			key: "insert",
			value: function insert(view, index) {
				this._views.splice(index, 0, view);

				if (this.container) {
					if (index < this.container.children.length) {
						this.container.insertBefore(view.element, this.container.children[index]);
					} else {
						this.container.appendChild(view.element);
					}
				}

				this.length++;
				return view;
			}
		}, {
			key: "remove",
			value: function remove(view) {
				var index = this._views.indexOf(view);

				if (index > -1) {
					this._views.splice(index, 1);
				}

				this.destroy(view);

				this.length--;
			}
		}, {
			key: "destroy",
			value: function destroy(view) {
				if (view.displayed) {
					view.destroy();
				}

				if (this.container) {
					this.container.removeChild(view.element);
				}
				view = null;
			}

			// Iterators

		}, {
			key: "forEach",
			value: function forEach() {
				return this._views.forEach.apply(this._views, arguments);
			}
		}, {
			key: "clear",
			value: function clear() {
				// Remove all views
				var view;
				var len = this.length;

				if (!this.length) return;

				for (var i = 0; i < len; i++) {
					view = this._views[i];
					this.destroy(view);
				}

				this._views = [];
				this.length = 0;
			}
		}, {
			key: "find",
			value: function find(section) {

				var view;
				var len = this.length;

				for (var i = 0; i < len; i++) {
					view = this._views[i];
					if (view.displayed && view.section.index == section.index) {
						return view;
					}
				}
			}
		}, {
			key: "displayed",
			value: function displayed() {
				var displayed = [];
				var view;
				var len = this.length;

				for (var i = 0; i < len; i++) {
					view = this._views[i];
					if (view.displayed) {
						displayed.push(view);
					}
				}
				return displayed;
			}
		}, {
			key: "show",
			value: function show() {
				var view;
				var len = this.length;

				for (var i = 0; i < len; i++) {
					view = this._views[i];
					if (view.displayed) {
						view.show();
					}
				}
				this.hidden = false;
			}
		}, {
			key: "hide",
			value: function hide() {
				var view;
				var len = this.length;

				for (var i = 0; i < len; i++) {
					view = this._views[i];
					if (view.displayed) {
						view.hide();
					}
				}
				this.hidden = true;
			}
		}]);

		return Views;
	}();

	var DefaultViewManager = function () {
		function DefaultViewManager(options) {
			_classCallCheck(this, DefaultViewManager);

			this.name = "default";
			this.View = options.view;
			this.request = options.request;
			this.spine = options.spine;
			this.hooks = options.hooks;
			this.q = new Queue(this);

			this.settings = extend(this.settings || {}, {
				infinite: true,
				hidden: false,
				width: undefined,
				height: undefined,
				axis: undefined,
				flow: "scrolled",
				ignoreClass: ""
			});

			extend(this.settings, options.settings || {});

			this.viewSettings = {
				ignoreClass: this.settings.ignoreClass,
				hooks: this.hooks,
				axis: this.settings.axis,
				flow: this.settings.flow,
				layout: this.layout,
				method: this.settings.method || "url", // srcdoc, blobUrl, write
				width: 0,
				height: 0,
				forceEvenPages: true
			};

			this.rendered = false;
		}

		_createClass(DefaultViewManager, [{
			key: "render",
			value: function render(element, size) {
				var tag = element.tagName;

				if (tag && (tag.toLowerCase() == "body" || tag.toLowerCase() == "html")) {
					this.fullsize = true;
				}

				if (this.fullsize) {
					this.settings.overflow = "visible";
					this.overflow = this.settings.overflow;
				}

				this.settings.size = size;

				// Save the stage
				this.stage = new Stage({
					width: size.width,
					height: size.height,
					overflow: this.overflow,
					hidden: this.settings.hidden,
					axis: this.settings.axis,
					fullsize: this.fullsize,
					direction: this.settings.direction
				});

				this.stage.attachTo(element);

				// Get this stage container div
				this.container = this.stage.getContainer();

				// Views array methods
				this.views = new Views(this.container);

				// Calculate Stage Size
				this._bounds = this.bounds();
				this._stageSize = this.stage.size();

				// Set the dimensions for views
				this.viewSettings.width = this._stageSize.width;
				this.viewSettings.height = this._stageSize.height;

				// Function to handle a resize event.
				// Will only attach if width and height are both fixed.
				this.stage.onResize(this.onResized.bind(this));

				this.stage.onOrientationChange(this.onOrientationChange.bind(this));

				// Add Event Listeners
				this.addEventListeners();

				// Add Layout method
				// this.applyLayoutMethod();
				if (this.layout) {
					this.updateLayout();
				}

				this.rendered = true;
			}
		}, {
			key: "addEventListeners",
			value: function addEventListeners() {
				var scroller;

				window.addEventListener("unload", function (e) {
					this.destroy();
				}.bind(this));

				if (!this.fullsize) {
					scroller = this.container;
				} else {
					scroller = window;
				}

				scroller.addEventListener("scroll", this.onScroll.bind(this));
			}
		}, {
			key: "removeEventListeners",
			value: function removeEventListeners() {
				var scroller;

				if (!this.fullsize) {
					scroller = this.container;
				} else {
					scroller = window;
				}

				if (scroller) {
					scroller.removeEventListener("scroll", this.onScroll.bind(this));
				}
			}
		}, {
			key: "destroy",
			value: function destroy() {
				clearTimeout(this.orientationTimeout);
				clearTimeout(this.resizeTimeout);
				clearTimeout(this.afterScrolled);

				this.clear();

				this.removeEventListeners();

				this.stage && this.stage.destroy();

				this.rendered = false;

				/*
	   		clearTimeout(this.trimTimeout);
	   	if(this.settings.hidden) {
	   		this.element.removeChild(this.wrapper);
	   	} else {
	   		this.element.removeChild(this.container);
	   	}
	   */
			}
		}, {
			key: "onOrientationChange",
			value: function onOrientationChange(e) {
				var _window = window,
				    orientation = _window.orientation;


				this.resize();

				// Per ampproject:
				// In IOS 10.3, the measured size of an element is incorrect if the
				// element size depends on window size directly and the measurement
				// happens in window.resize event. Adding a timeout for correct
				// measurement. See https://github.com/ampproject/amphtml/issues/8479
				clearTimeout(this.orientationTimeout);
				this.orientationTimeout = setTimeout(function () {
					this.orientationTimeout = undefined;
					this.resize();
					this.emit(EVENTS.MANAGERS.ORIENTATION_CHANGE, orientation);
				}.bind(this), 500);
			}
		}, {
			key: "onResized",
			value: function onResized(e) {
				this.resize();
			}
		}, {
			key: "resize",
			value: function resize(width, height) {
				var stageSize = this.stage.size(width, height);

				// For Safari, wait for orientation to catch up
				// if the window is a square
				this.winBounds = windowBounds();
				if (this.orientationTimeout && this.winBounds.width === this.winBounds.height) {
					// reset the stage size for next resize
					this._stageSize = undefined;
					return;
				}

				if (this._stageSize && this._stageSize.width === stageSize.width && this._stageSize.height === stageSize.height) {
					// Size is the same, no need to resize
					return;
				}

				this._stageSize = stageSize;

				this._bounds = this.bounds();

				// Clear current views
				this.clear();

				// Update for new views
				this.viewSettings.width = this._stageSize.width;
				this.viewSettings.height = this._stageSize.height;

				this.updateLayout();

				this.emit(EVENTS.MANAGERS.RESIZED, {
					width: this._stageSize.width,
					height: this._stageSize.height
				});
			}
		}, {
			key: "createView",
			value: function createView(section) {
				return new this.View(section, this.viewSettings);
			}
		}, {
			key: "display",
			value: function display(section, target) {

				var displaying = new defer$1();
				var displayed = displaying.promise;

				// Check if moving to target is needed
				if (target === section.href || isNumber(target)) {
					target = undefined;
				}

				// Check to make sure the section we want isn't already shown
				var visible = this.views.find(section);

				// View is already shown, just move to correct location in view
				if (visible && section) {
					var offset = visible.offset();

					if (this.settings.direction === "ltr") {
						this.scrollTo(offset.left, offset.top, true);
					} else {
						var width = visible.width();
						this.scrollTo(offset.left + width, offset.top, true);
					}

					if (target) {
						var _offset = visible.locationOf(target);
						this.moveTo(_offset);
					}

					displaying.resolve();
					return displayed;
				}

				// Hide all current views
				this.clear();

				this.add(section).then(function (view) {

					// Move to correct place within the section, if needed
					if (target) {
						var _offset2 = view.locationOf(target);
						this.moveTo(_offset2);
					}
				}.bind(this), function (err) {
					displaying.reject(err);
				}).then(function () {
					var next;
					if (this.layout.name === "pre-paginated" && this.layout.divisor > 1) {
						next = nextSection(section, this.spine);
						if (next) {
							return this.add(next);
						}
					}
				}.bind(this)).then(function () {

					this.views.show();

					displaying.resolve();
				}.bind(this));

				return displayed;
			}
		}, {
			key: "afterDisplayed",
			value: function afterDisplayed(view) {
				this.emit(EVENTS.MANAGERS.ADDED, view);
			}
		}, {
			key: "afterResized",
			value: function afterResized(view) {
				this.emit(EVENTS.MANAGERS.RESIZE, view.section);
			}
		}, {
			key: "moveTo",
			value: function moveTo(offset) {
				var distX = 0,
				    distY = 0;

				if (!this.isPaginated) {
					distY = offset.top;
				} else {
					distX = Math.floor(offset.left / this.layout.delta) * this.layout.delta;

					if (distX + this.layout.delta > this.container.scrollWidth) {
						distX = this.container.scrollWidth - this.layout.delta;
					}
				}
				this.scrollTo(distX, distY, true);
			}
		}, {
			key: "add",
			value: function add(section) {
				var _this = this;

				var view = this.createView(section);

				this.views.append(view);

				// view.on(EVENTS.VIEWS.SHOWN, this.afterDisplayed.bind(this));
				view.onDisplayed = this.afterDisplayed.bind(this);
				view.onResize = this.afterResized.bind(this);

				view.on(EVENTS.VIEWS.AXIS, function (axis) {
					_this.updateAxis(axis);
				});

				return view.display(this.request);
			}
		}, {
			key: "append",
			value: function append(section) {
				var _this2 = this;

				var view = this.createView(section);
				this.views.append(view);

				view.onDisplayed = this.afterDisplayed.bind(this);
				view.onResize = this.afterResized.bind(this);

				view.on(EVENTS.VIEWS.AXIS, function (axis) {
					_this2.updateAxis(axis);
				});

				return view.display(this.request);
			}
		}, {
			key: "prepend",
			value: function prepend(section) {
				var _this3 = this;

				var view = this.createView(section);

				view.on(EVENTS.VIEWS.RESIZED, function (bounds$$1) {
					_this3.counter(bounds$$1);
				});

				this.views.prepend(view);

				view.onDisplayed = this.afterDisplayed.bind(this);
				view.onResize = this.afterResized.bind(this);

				view.on(EVENTS.VIEWS.AXIS, function (axis) {
					_this3.updateAxis(axis);
				});

				return view.display(this.request);
			}
		}, {
			key: "counter",
			value: function counter(bounds$$1) {
				if (this.settings.axis === "vertical") {
					this.scrollBy(0, bounds$$1.heightDelta, true);
				} else {
					this.scrollBy(bounds$$1.widthDelta, 0, true);
				}
			}

			// resizeView(view) {
			//
			// 	if(this.settings.globalLayoutProperties.layout === "pre-paginated") {
			// 		view.lock("both", this.bounds.width, this.bounds.height);
			// 	} else {
			// 		view.lock("width", this.bounds.width, this.bounds.height);
			// 	}
			//
			// };

		}, {
			key: "next",
			value: function next() {
				var next;
				var left;

				var dir = this.settings.direction;

				if (!this.views.length) return;

				if (this.isPaginated && this.settings.axis === "horizontal" && (!dir || dir === "ltr")) {

					this.scrollLeft = this.container.scrollLeft;

					left = this.container.scrollLeft + this.container.offsetWidth + this.layout.delta;

					if (left <= this.container.scrollWidth) {
						this.scrollBy(this.layout.delta, 0, true);
					} else {
						next = nextSection(this.views.last().section, this.spine);
					}
				} else if (this.isPaginated && this.settings.axis === "horizontal" && dir === "rtl") {

					this.scrollLeft = this.container.scrollLeft;

					left = this.container.scrollLeft;

					if (left > 0) {
						this.scrollBy(this.layout.delta, 0, true);
					} else {
						next = nextSection(this.views.last().section, this.spine);
					}
				} else if (this.isPaginated && this.settings.axis === "vertical") {

					this.scrollTop = this.container.scrollTop;

					var top = this.container.scrollTop + this.container.offsetHeight;

					if (top < this.container.scrollHeight) {
						this.scrollBy(0, this.layout.height, true);
					} else {
						next = nextSection(this.views.last().section, this.spine);
					}
				} else {
					next = nextSection(this.views.last().section, this.spine);
				}

				if (next) {
					this.clear();

					return this.append(next).then(function () {
						var right;
						if (this.layout.name === "pre-paginated" && this.layout.divisor > 1) {
							right = nextSection(next, this.spine);
							if (right) {
								return this.append(right);
							}
						}
					}.bind(this), function (err) {
						return err;
					}).then(function () {
						this.views.show();
					}.bind(this));
				}
			}
		}, {
			key: "prev",
			value: function prev() {
				var prev;
				var left;
				var dir = this.settings.direction;

				if (!this.views.length) return;

				if (this.isPaginated && this.settings.axis === "horizontal" && (!dir || dir === "ltr")) {

					this.scrollLeft = this.container.scrollLeft;

					left = this.container.scrollLeft;

					if (left > 0) {
						this.scrollBy(-this.layout.delta, 0, true);
					} else {
						prev = prevSection(this.views.first().section, this.spine);
					}
				} else if (this.isPaginated && this.settings.axis === "horizontal" && dir === "rtl") {

					this.scrollLeft = this.container.scrollLeft;

					left = this.container.scrollLeft + this.container.offsetWidth + this.layout.delta;

					if (left <= this.container.scrollWidth) {
						this.scrollBy(-this.layout.delta, 0, true);
					} else {
						prev = prevSection(this.views.first().section, this.spine);
					}
				} else if (this.isPaginated && this.settings.axis === "vertical") {

					this.scrollTop = this.container.scrollTop;

					var top = this.container.scrollTop;

					if (top > 0) {
						this.scrollBy(0, -this.layout.height, true);
					} else {
						prev = prevSection(this.views.first().section, this.spine);
					}
				} else {

					prev = prevSection(this.views.first().section, this.spine);
				}

				if (prev) {
					this.clear();

					return this.prepend(prev).then(function () {
						var left;
						if (this.layout.name === "pre-paginated" && this.layout.divisor > 1) {
							left = prevSection(prev, this.spine);
							if (left) {
								return this.prepend(left);
							}
						}
					}.bind(this), function (err) {
						return err;
					}).then(function () {
						if (this.isPaginated && this.settings.axis === "horizontal") {
							if (this.settings.direction === "rtl") {
								this.scrollTo(0, 0, true);
							} else {
								this.scrollTo(this.container.scrollWidth - this.layout.delta, 0, true);
							}
						}
						this.views.show();
					}.bind(this));
				}
			}
		}, {
			key: "current",
			value: function current() {
				var visible = this.visible();
				if (visible.length) {
					// Current is the last visible view
					return visible[visible.length - 1];
				}
				return null;
			}
		}, {
			key: "clear",
			value: function clear() {

				// this.q.clear();

				if (this.views) {
					this.views.hide();
					this.scrollTo(0, 0, true);
					this.views.clear();
				}
			}
		}, {
			key: "currentLocation",
			value: function currentLocation() {

				if (this.settings.axis === "vertical") {
					this.location = this.scrolledLocation();
				} else {
					this.location = this.paginatedLocation();
				}
				return this.location;
			}
		}, {
			key: "scrolledLocation",
			value: function scrolledLocation() {
				var _this4 = this;

				var visible = this.visible();
				var container = this.container.getBoundingClientRect();
				var pageHeight = container.height < window.innerHeight ? container.height : window.innerHeight;

				var offset = 0;
				var used = 0;

				if (this.fullsize) {
					offset = window.scrollY;
				}

				var sections = visible.map(function (view) {
					var index = view.section.index;

					var href = view.section.source || view.section.href;

					var position = view.position();
					var height = view.height();

					var startPos = offset + container.top - position.top + used;
					var endPos = startPos + pageHeight - used;
					if (endPos > height) {
						endPos = height;
						used = endPos - startPos;
					}

					var totalPages = _this4.layout.count(height, pageHeight).pages;

					var currPage = Math.ceil(startPos / pageHeight);
					var pages = [];
					var endPage = Math.ceil(endPos / pageHeight);

					pages = [];
					for (var i = currPage; i <= endPage; i++) {
						var pg = i + 1;
						pages.push(pg);
					}

					var mapping = _this4.mapping.page(view.contents, view.section.cfiBase, startPos, endPos);

					return {
						index: index,
						href: href,
						pages: pages,
						totalPages: totalPages,
						mapping: mapping
					};
				});

				return sections;
			}
		}, {
			key: "paginatedLocation",
			value: function paginatedLocation() {
				var _this5 = this;

				var visible = this.visible();
				var container = this.container.getBoundingClientRect();

				var left = 0;
				var used = 0;

				if (this.fullsize) {
					left = window.scrollX;
				}

				var sections = visible.map(function (view) {
					var index = view.section.index;

					var href = view.section.source || view.section.href;
					// let offset = view.offset().left;
					var position = view.position().left;
					var width = view.width();

					// Find mapping
					var start = left + container.left - position + used;
					var end = start + _this5.layout.width - used;

					var mapping = _this5.mapping.page(view.contents, view.section.cfiBase, start, end);

					// Find displayed pages
					//console.log("pre", end, offset + width);
					// if (end > offset + width) {
					// 	end = offset + width;
					// 	used = this.layout.pageWidth;
					// }
					// console.log("post", end);

					var totalPages = _this5.layout.count(width).pages;
					var startPage = Math.floor(start / _this5.layout.pageWidth);
					var pages = [];
					var endPage = Math.floor(end / _this5.layout.pageWidth);

					// start page should not be negative
					if (startPage < 0) {
						startPage = 0;
						endPage = endPage + 1;
					}

					// Reverse page counts for rtl
					if (_this5.settings.direction === "rtl") {
						var tempStartPage = startPage;
						startPage = totalPages - endPage;
						endPage = totalPages - tempStartPage;
					}

					for (var i = startPage + 1; i <= endPage; i++) {
						var pg = i;
						pages.push(pg);
					}

					return {
						index: index,
						href: href,
						pages: pages,
						totalPages: totalPages,
						mapping: mapping
					};
				});

				return sections;
			}
		}, {
			key: "isVisible",
			value: function isVisible(view, offsetPrev, offsetNext, _container) {
				var position = view.position();
				var container = _container || this.bounds();

				if (this.settings.axis === "horizontal" && position.right > container.left - offsetPrev && position.left < container.right + offsetNext) {

					return true;
				} else if (this.settings.axis === "vertical" && position.bottom > container.top - offsetPrev && position.top < container.bottom + offsetNext) {

					return true;
				}

				return false;
			}
		}, {
			key: "visible",
			value: function visible() {
				var container = this.bounds();
				var views = this.views.displayed();
				var viewsLength = views.length;
				var visible = [];
				var isVisible;
				var view;

				for (var i = 0; i < viewsLength; i++) {
					view = views[i];
					isVisible = this.isVisible(view, 0, 0, container);

					if (isVisible === true) {
						visible.push(view);
					}
				}
				return visible;
			}
		}, {
			key: "scrollBy",
			value: function scrollBy(x, y, silent) {
				var dir = this.settings.direction === "rtl" ? -1 : 1;

				if (silent) {
					this.ignore = true;
				}

				if (!this.fullsize) {
					if (x) this.container.scrollLeft += x * dir;
					if (y) this.container.scrollTop += y;
				} else {
					window.scrollBy(x * dir, y * dir);
				}
				this.scrolled = true;
			}
		}, {
			key: "scrollTo",
			value: function scrollTo(x, y, silent) {
				if (silent) {
					this.ignore = true;
				}

				if (!this.fullsize) {
					this.container.scrollLeft = x;
					this.container.scrollTop = y;
				} else {
					window.scrollTo(x, y);
				}
				this.scrolled = true;
			}
		}, {
			key: "onScroll",
			value: function onScroll() {
				var scrollTop = void 0;
				var scrollLeft = void 0;

				if (!this.fullsize) {
					scrollTop = this.container.scrollTop;
					scrollLeft = this.container.scrollLeft;
				} else {
					scrollTop = window.scrollY;
					scrollLeft = window.scrollX;
				}

				this.scrollTop = scrollTop;
				this.scrollLeft = scrollLeft;

				if (!this.ignore) {
					this.emit(EVENTS.MANAGERS.SCROLL, {
						top: scrollTop,
						left: scrollLeft
					});

					clearTimeout(this.afterScrolled);
					this.afterScrolled = setTimeout(function () {
						this.emit(EVENTS.MANAGERS.SCROLLED, {
							top: this.scrollTop,
							left: this.scrollLeft
						});
					}.bind(this), 20);
				} else {
					this.ignore = false;
				}
			}
		}, {
			key: "bounds",
			value: function bounds$$1() {
				var bounds$$1;

				bounds$$1 = this.stage.bounds();

				return bounds$$1;
			}
		}, {
			key: "applyLayout",
			value: function applyLayout(layout) {

				this.layout = layout;
				this.updateLayout();
				// this.manager.layout(this.layout.format);
			}
		}, {
			key: "updateLayout",
			value: function updateLayout() {

				if (!this.stage) {
					return;
				}

				this._stageSize = this.stage.size();

				if (!this.isPaginated) {
					this.layout.calculate(this._stageSize.width, this._stageSize.height);
				} else {
					this.layout.calculate(this._stageSize.width, this._stageSize.height, this.settings.gap);

					// Set the look ahead offset for what is visible
					this.settings.offset = this.layout.delta;

					// this.stage.addStyleRules("iframe", [{"margin-right" : this.layout.gap + "px"}]);
				}

				// Set the dimensions for views
				this.viewSettings.width = this.layout.width;
				this.viewSettings.height = this.layout.height;

				this.setLayout(this.layout);
			}
		}, {
			key: "setLayout",
			value: function setLayout(layout) {

				this.viewSettings.layout = layout;

				this.mapping = new Mapping(layout.props, this.settings.direction, this.settings.axis);

				if (this.views) {

					this.views.forEach(function (view) {
						if (view) {
							view.setLayout(layout);
						}
					});
				}
			}
		}, {
			key: "updateAxis",
			value: function updateAxis(axis, forceUpdate) {

				if (!this.isPaginated) {
					axis = "vertical";
				}

				if (!forceUpdate && axis === this.settings.axis) {
					return;
				}

				this.settings.axis = axis;

				this.stage && this.stage.axis(axis);

				this.viewSettings.axis = axis;

				if (this.mapping) {
					this.mapping = new Mapping(this.layout.props, this.settings.direction, this.settings.axis);
				}

				if (this.layout) {
					if (axis === "vertical") {
						this.layout.spread("none");
					} else {
						this.layout.spread(this.layout.settings.spread);
					}
				}
			}
		}, {
			key: "updateFlow",
			value: function updateFlow(flow) {
				var isPaginated = flow === "paginated" || flow === "auto";

				this.isPaginated = isPaginated;

				if (flow === "scrolled-doc" || flow === "scrolled-continuous" || flow === "scrolled") {
					this.updateAxis("vertical");
				}

				this.viewSettings.flow = flow;

				if (!this.settings.overflow) {
					this.overflow = isPaginated ? "hidden" : "auto";
				} else {
					this.overflow = this.settings.overflow;
				}
				// this.views.forEach(function(view){
				// 	view.setAxis(axis);
				// });

				this.updateLayout();
			}
		}, {
			key: "getContents",
			value: function getContents() {
				var contents = [];
				if (!this.views) {
					return contents;
				}
				this.views.forEach(function (view) {
					var viewContents = view && view.contents;
					if (viewContents) {
						contents.push(viewContents);
					}
				});
				return contents;
			}
		}, {
			key: "direction",
			value: function direction() {
				var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ltr";

				this.settings.direction = dir;

				this.stage && this.stage.direction(dir);

				this.viewSettings.direction = dir;

				this.updateLayout();
			}
		}, {
			key: "isRendered",
			value: function isRendered() {
				return this.rendered;
			}
		}]);

		return DefaultViewManager;
	}();

	//-- Enable binding events to Manager


	eventEmitter(DefaultViewManager.prototype);

	// 19.1.2.9 Object.getPrototypeOf(O)


	_objectSap('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return _objectGpo(_toObject(it));
	  };
	});

	var getPrototypeOf = _core.Object.getPrototypeOf;

	var getPrototypeOf$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getPrototypeOf, __esModule: true };
	});

	var _Object$getPrototypeOf = unwrapExports(getPrototypeOf$1);

	var possibleConstructorReturn = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _typeof3 = _interopRequireDefault(_typeof_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};
	});

	var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */

	var check = function(O, proto){
	  _anObject(O);
	  if(!_isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	// 19.1.3.19 Object.setPrototypeOf(O, proto)

	_export(_export.S, 'Object', {setPrototypeOf: _setProto.set});

	var setPrototypeOf = _core.Object.setPrototypeOf;

	var setPrototypeOf$1 = createCommonjsModule(function (module) {
	module.exports = { "default": setPrototypeOf, __esModule: true };
	});

	unwrapExports(setPrototypeOf$1);

	var inherits = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _setPrototypeOf2 = _interopRequireDefault(setPrototypeOf$1);



	var _create2 = _interopRequireDefault(create$2);



	var _typeof3 = _interopRequireDefault(_typeof_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};
	});

	var _inherits = unwrapExports(inherits);

	var ContinuousViewManager = function (_DefaultViewManager) {
		_inherits(ContinuousViewManager, _DefaultViewManager);

		function ContinuousViewManager(options) {
			_classCallCheck(this, ContinuousViewManager);

			var _this = _possibleConstructorReturn(this, (ContinuousViewManager.__proto__ || _Object$getPrototypeOf(ContinuousViewManager)).call(this, options));

			_this.name = "continuous";

			_this.settings = extend(_this.settings || {}, {
				infinite: true,
				overflow: undefined,
				axis: undefined,
				flow: "scrolled",
				offset: 500,
				offsetDelta: 250,
				width: undefined,
				height: undefined
			});

			extend(_this.settings, options.settings || {});

			// Gap can be 0, but defaults doesn't handle that
			if (options.settings.gap != "undefined" && options.settings.gap === 0) {
				_this.settings.gap = options.settings.gap;
			}

			_this.viewSettings = {
				ignoreClass: _this.settings.ignoreClass,
				hooks: _this.hooks,
				axis: _this.settings.axis,
				flow: _this.settings.flow,
				layout: _this.layout,
				method: _this.settings.method || "url", // srcdoc, blobUrl, write
				width: 0,
				height: 0,
				forceEvenPages: false
			};

			_this.scrollTop = 0;
			_this.scrollLeft = 0;
			return _this;
		}

		_createClass(ContinuousViewManager, [{
			key: "display",
			value: function display(section, target) {
				return DefaultViewManager.prototype.display.call(this, section, target).then(function () {
					return this.fill();
				}.bind(this));
			}
		}, {
			key: "fill",
			value: function fill(_full) {
				var _this2 = this;

				var full = _full || new defer$1();

				this.q.enqueue(function () {
					return _this2.check();
				}).then(function (result) {
					if (result) {
						_this2.fill(full);
					} else {
						full.resolve();
					}
				});

				return full.promise;
			}
		}, {
			key: "moveTo",
			value: function moveTo(offset) {
				// var bounds = this.stage.bounds();
				// var dist = Math.floor(offset.top / bounds.height) * bounds.height;
				var distX = 0;
				var distY = 0;

				// let offsetX = 0;
				// let offsetY = 0;

				if (!this.isPaginated) {
					distY = offset.top;
					// offsetY = offset.top+this.settings.offset;
				} else {
					distX = Math.floor(offset.left / this.layout.delta) * this.layout.delta;
					// offsetX = distX+this.settings.offset;
				}

				if (distX > 0 || distY > 0) {
					this.scrollBy(distX, distY, true);
				}
			}
		}, {
			key: "afterResized",
			value: function afterResized(view) {
				this.emit(EVENTS.MANAGERS.RESIZE, view.section);
			}

			// Remove Previous Listeners if present

		}, {
			key: "removeShownListeners",
			value: function removeShownListeners(view) {

				// view.off("shown", this.afterDisplayed);
				// view.off("shown", this.afterDisplayedAbove);
				view.onDisplayed = function () {};
			}
		}, {
			key: "add",
			value: function add(section) {
				var _this3 = this;

				var view = this.createView(section);

				this.views.append(view);

				view.on(EVENTS.VIEWS.RESIZED, function (bounds$$1) {
					view.expanded = true;
				});

				view.on(EVENTS.VIEWS.AXIS, function (axis) {
					_this3.updateAxis(axis);
				});

				// view.on(EVENTS.VIEWS.SHOWN, this.afterDisplayed.bind(this));
				view.onDisplayed = this.afterDisplayed.bind(this);
				view.onResize = this.afterResized.bind(this);

				return view.display(this.request);
			}
		}, {
			key: "append",
			value: function append(section) {
				var view = this.createView(section);

				view.on(EVENTS.VIEWS.RESIZED, function (bounds$$1) {
					view.expanded = true;
				});

				/*
	   view.on(EVENTS.VIEWS.AXIS, (axis) => {
	   	this.updateAxis(axis);
	   });
	   */

				this.views.append(view);

				view.onDisplayed = this.afterDisplayed.bind(this);

				return view;
			}
		}, {
			key: "prepend",
			value: function prepend(section) {
				var _this4 = this;

				var view = this.createView(section);

				view.on(EVENTS.VIEWS.RESIZED, function (bounds$$1) {
					_this4.counter(bounds$$1);
					view.expanded = true;
				});

				/*
	   view.on(EVENTS.VIEWS.AXIS, (axis) => {
	   	this.updateAxis(axis);
	   });
	   */

				this.views.prepend(view);

				view.onDisplayed = this.afterDisplayed.bind(this);

				return view;
			}
		}, {
			key: "counter",
			value: function counter(bounds$$1) {
				if (this.settings.axis === "vertical") {
					this.scrollBy(0, bounds$$1.heightDelta, true);
				} else {
					this.scrollBy(bounds$$1.widthDelta, 0, true);
				}
			}
		}, {
			key: "update",
			value: function update(_offset) {
				var container = this.bounds();
				var views = this.views.all();
				var viewsLength = views.length;
				var offset = typeof _offset != "undefined" ? _offset : this.settings.offset || 0;
				var isVisible;
				var view;

				var updating = new defer$1();
				var promises = [];
				for (var i = 0; i < viewsLength; i++) {
					view = views[i];

					isVisible = this.isVisible(view, offset, offset, container);

					if (isVisible === true) {
						// console.log("visible " + view.index);

						if (!view.displayed) {
							var displayed = view.display(this.request).then(function (view) {
								view.show();
							}, function (err) {
								view.hide();
							});
							promises.push(displayed);
						} else {
							view.show();
						}
					} else {
						this.q.enqueue(view.destroy.bind(view));
						// console.log("hidden " + view.index);

						clearTimeout(this.trimTimeout);
						this.trimTimeout = setTimeout(function () {
							this.q.enqueue(this.trim.bind(this));
						}.bind(this), 250);
					}
				}

				if (promises.length) {
					return _Promise.all(promises).catch(function (err) {
						updating.reject(err);
					});
				} else {
					updating.resolve();
					return updating.promise;
				}
			}
		}, {
			key: "check",
			value: function check(_offsetLeft, _offsetTop) {
				var _this5 = this;

				var checking = new defer$1();
				var newViews = [];

				var horizontal = this.settings.axis === "horizontal";
				var delta = this.settings.offset || 0;

				if (_offsetLeft && horizontal) {
					delta = _offsetLeft;
				}

				if (_offsetTop && !horizontal) {
					delta = _offsetTop;
				}

				var bounds$$1 = this._bounds; // bounds saved this until resize

				var rtl = this.settings.direction === "rtl";
				var dir = horizontal && rtl ? -1 : 1; //RTL reverses scrollTop

				var offset = horizontal ? this.scrollLeft : this.scrollTop * dir;
				var visibleLength = horizontal ? bounds$$1.width : bounds$$1.height;
				var contentLength = horizontal ? this.container.scrollWidth : this.container.scrollHeight;

				var prepend = function prepend() {
					var first = _this5.views.first();
					var prev = first && prevSection(first.section, _this5.spine);

					if (prev) {
						newViews.push(_this5.prepend(prev));
					}
				};

				var append = function append() {
					var last = _this5.views.last();
					var next = last && nextSection(last.section, _this5.spine);

					if (next) {
						newViews.push(_this5.append(next));
					}
				};

				if (offset + visibleLength + delta >= contentLength) {
					if (horizontal && rtl) {
						prepend();
					} else {
						append();
					}
				}

				if (offset - delta < 0) {
					if (horizontal && rtl) {
						append();
					} else {
						prepend();
					}
				}

				var promises = newViews.map(function (view) {
					return view.displayed;
				});

				if (newViews.length) {
					return _Promise.all(promises).then(function () {
						if (_this5.layout.name === "pre-paginated" && _this5.layout.props.spread) {
							return _this5.check();
						}
					}).then(function () {
						// Check to see if anything new is on screen after rendering
						return _this5.update(delta);
					}, function (err) {
						return err;
					});
				} else {
					this.q.enqueue(function () {
						this.update();
					}.bind(this));
					checking.resolve(false);
					return checking.promise;
				}
			}
		}, {
			key: "trim",
			value: function trim() {
				var task = new defer$1();
				var displayed = this.views.displayed();
				var first = displayed[0];
				var last = displayed[displayed.length - 1];
				var firstIndex = this.views.indexOf(first);
				var lastIndex = this.views.indexOf(last);
				var above = this.views.slice(0, firstIndex);
				var below = this.views.slice(lastIndex + 1);

				// Erase all but last above
				for (var i = 0; i < above.length - 1; i++) {
					this.erase(above[i], above);
				}

				// Erase all except first below
				for (var j = 1; j < below.length; j++) {
					this.erase(below[j]);
				}

				task.resolve();
				return task.promise;
			}
		}, {
			key: "erase",
			value: function erase(view, above) {
				//Trim

				var prevTop;
				var prevLeft;

				if (this.settings.height) {
					prevTop = this.container.scrollTop;
					prevLeft = this.container.scrollLeft;
				} else {
					prevTop = window.scrollY;
					prevLeft = window.scrollX;
				}

				var bounds$$1 = view.bounds();

				this.views.remove(view);

				if (above) {
					if (this.settings.axis === "vertical") {
						this.scrollTo(0, prevTop - bounds$$1.height, true);
					} else {
						this.scrollTo(prevLeft - bounds$$1.width, 0, true);
					}
				}
			}
		}, {
			key: "addEventListeners",
			value: function addEventListeners(stage) {

				window.addEventListener("unload", function (e) {
					this.ignore = true;
					// this.scrollTo(0,0);
					this.destroy();
				}.bind(this));

				this.addScrollListeners();
			}
		}, {
			key: "addScrollListeners",
			value: function addScrollListeners() {
				var scroller;

				this.tick = requestAnimationFrame$1;

				if (this.settings.height) {
					this.prevScrollTop = this.container.scrollTop;
					this.prevScrollLeft = this.container.scrollLeft;
				} else {
					this.prevScrollTop = window.scrollY;
					this.prevScrollLeft = window.scrollX;
				}

				this.scrollDeltaVert = 0;
				this.scrollDeltaHorz = 0;

				if (this.settings.height) {
					scroller = this.container;
					this.scrollTop = this.container.scrollTop;
					this.scrollLeft = this.container.scrollLeft;
				} else {
					scroller = window;
					this.scrollTop = window.scrollY;
					this.scrollLeft = window.scrollX;
				}

				scroller.addEventListener("scroll", this.onScroll.bind(this));
				this._scrolled = debounce_1(this.scrolled.bind(this), 30);
				// this.tick.call(window, this.onScroll.bind(this));

				this.didScroll = false;
			}
		}, {
			key: "removeEventListeners",
			value: function removeEventListeners() {
				var scroller;

				if (this.settings.height) {
					scroller = this.container;
				} else {
					scroller = window;
				}

				scroller.removeEventListener("scroll", this.onScroll.bind(this));
			}
		}, {
			key: "onScroll",
			value: function onScroll() {
				var scrollTop = void 0;
				var scrollLeft = void 0;
				var dir = this.settings.direction === "rtl" ? -1 : 1;

				if (this.settings.height) {
					scrollTop = this.container.scrollTop;
					scrollLeft = this.container.scrollLeft;
				} else {
					scrollTop = window.scrollY * dir;
					scrollLeft = window.scrollX * dir;
				}

				this.scrollTop = scrollTop;
				this.scrollLeft = scrollLeft;

				if (!this.ignore) {

					this._scrolled();
				} else {
					this.ignore = false;
				}

				this.scrollDeltaVert += Math.abs(scrollTop - this.prevScrollTop);
				this.scrollDeltaHorz += Math.abs(scrollLeft - this.prevScrollLeft);

				this.prevScrollTop = scrollTop;
				this.prevScrollLeft = scrollLeft;

				clearTimeout(this.scrollTimeout);
				this.scrollTimeout = setTimeout(function () {
					this.scrollDeltaVert = 0;
					this.scrollDeltaHorz = 0;
				}.bind(this), 150);

				this.didScroll = false;
			}
		}, {
			key: "scrolled",
			value: function scrolled() {
				this.q.enqueue(function () {
					this.check();
				}.bind(this));

				this.emit(EVENTS.MANAGERS.SCROLL, {
					top: this.scrollTop,
					left: this.scrollLeft
				});

				clearTimeout(this.afterScrolled);
				this.afterScrolled = setTimeout(function () {
					this.emit(EVENTS.MANAGERS.SCROLLED, {
						top: this.scrollTop,
						left: this.scrollLeft
					});
				}.bind(this));
			}
		}, {
			key: "next",
			value: function next() {
				var delta = this.layout.props.name === "pre-paginated" && this.layout.props.spread ? this.layout.props.delta * 2 : this.layout.props.delta;

				if (!this.views.length) return;

				if (this.isPaginated && this.settings.axis === "horizontal") {

					this.scrollBy(delta, 0, true);
				} else {

					this.scrollBy(0, this.layout.height, true);
				}

				this.q.enqueue(function () {
					this.check();
				}.bind(this));
			}
		}, {
			key: "prev",
			value: function prev() {
				var delta = this.layout.props.name === "pre-paginated" && this.layout.props.spread ? this.layout.props.delta * 2 : this.layout.props.delta;

				if (!this.views.length) return;

				if (this.isPaginated && this.settings.axis === "horizontal") {

					this.scrollBy(-delta, 0, true);
				} else {

					this.scrollBy(0, -this.layout.height, true);
				}

				this.q.enqueue(function () {
					this.check();
				}.bind(this));
			}
		}, {
			key: "updateAxis",
			value: function updateAxis(axis, forceUpdate) {

				if (!this.isPaginated) {
					axis = "vertical";
				}

				if (!forceUpdate && axis === this.settings.axis) {
					return;
				}

				this.settings.axis = axis;

				this.stage && this.stage.axis(axis);

				this.viewSettings.axis = axis;

				if (this.mapping) {
					this.mapping.axis(axis);
				}

				if (this.layout) {
					if (axis === "vertical") {
						this.layout.spread("none");
					} else {
						this.layout.spread(this.layout.settings.spread);
					}
				}

				if (axis === "vertical") {
					this.settings.infinite = true;
				} else {
					this.settings.infinite = false;
				}
			}
		}]);

		return ContinuousViewManager;
	}(DefaultViewManager);

	var DEV$1 = false;
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
				var asking = new defer$1();
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

					DEV$1 && console.log("[ask]", str);
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

				DEV$1 && console.log("[listen]", data);

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

	/**
	 * Creates a new Book or Book Bridge & Worker
	 * @param {string|ArrayBuffer} url URL, Path or ArrayBuffer
	 * @param {object} options to pass to the book
	 * @returns {Book} a new Book object
	 * @example ePub("/path/to/book.epub", {})
	 */
	var ePub$1 = function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(url) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var epub,
			    rendition,
			    _args = arguments;
			return regenerator.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							epub = void 0;
							rendition = void 0;

							if (!(_args.length === 0 || _args.length === 1 && _typeof(_args[0]) === "object")) {
								_context.next = 4;
								break;
							}

							return _context.abrupt("return", new (Function.prototype.bind.apply(Epub, [null].concat(Array.prototype.slice.call(_args))))());

						case 4:

							if (options.worker) {
								epub = new Bridge(options);
							} else {
								epub = new Epub(options);
							}

							return _context.abrupt("return", epub.open(url).then(function (book) {
								/**
	        * Sugar to render a book to an element
	        * @param  {element | string} element element or string to add a rendition to
	        * @param  {object} [options]
	        * @return {Rendition}
	        */
								book.renderTo = function (element) {
									var renditionOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


									if (options && typeof options.worker !== "undefined" && typeof renditionOptions.worker === "undefined") {
										renditionOptions.worker = options.worker;
									}

									rendition = new Rendition(book.manifest, renditionOptions);
									rendition.attachTo(element);

									// If the workers fails, switch to replacements
									rendition.on("workerFailed", function () {
										rendition.clear();
										epub.replacements().then(function (book) {
											rendition.unpack(book.manifest);
											rendition.display(rendition.location);
										});
									});

									return rendition;
								};

								book.generateLocations = function (chars) {
									return epub.generateLocations(chars).then(function (locations) {
										book.locations = locations;
										return locations;
									});
								};

								book._destroy = book.destroy;
								book.destroy = function () {
									book._destroy();
									epub.destroy();
									rendition.destroy();
								};

								// epub.destroy();
								window.Epub = epub;

								return book;
							}));

						case 6:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		return function ePub(_x2) {
			return _ref.apply(this, arguments);
		};
	}();

	ePub$1.VERSION = EPUBJS_VERSION;

	ePub$1.CFI = EpubCFI;
	ePub$1.Book = Book;
	ePub$1.Rendition = Rendition;
	ePub$1.Contents = Contents;
	ePub$1.utils = core;

	ePub$1.ViewManagers = {};
	ePub$1.Views = {};
	/**
	 * Register Managers and Views
	 */
	ePub$1.register = {
		/**
	  * register a new view manager
	  */
		manager: function manager(name, _manager) {
			return ePub$1.ViewManagers[name] = _manager;
		},
		/**
	  * register a new view
	  */
		view: function view(name, _view) {
			return ePub$1.Views[name] = _view;
		}
	};

	// Default Views
	ePub$1.register.view("iframe", IframeView);

	// Default View Managers
	ePub$1.register.manager("default", DefaultViewManager);
	ePub$1.register.manager("continuous", ContinuousViewManager);

	// export {
	// 	Book,
	// 	EpubCFI,
	// 	Rendition,
	// 	Contents,
	// 	Layout
	// };

	return ePub$1;

})));
//# sourceMappingURL=epub.js.map