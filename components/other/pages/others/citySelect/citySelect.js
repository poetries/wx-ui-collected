/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _promise = __webpack_require__(2);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//index.js
	//获取应用实例
	var city = __webpack_require__(67);
	Page({
	    data: {
	        searchLetter: [],
	        showLetter: "",
	        winHeight: 0,
	        tHeight: 0,
	        bHeight: 0,
	        startPageY: 0,
	        cityList: [],
	        isShowLetter: false,
	        scrollTop: 0,
	        city: "",
	        cityArr: [],
	        src: './dw.png'
	    },
	    onLoad: function onLoad(options) {
	        //历史选择，应该在缓存中记录，或者在在app中全局记录
	        //当前城市通过之前的页面穿过来或者调用定位
	        var c = '北京';
	        var cityArr = ['上海', '北京'];
	        this.setData({
	            cityArr: cityArr,
	            city: c
	        });
	        // 生命周期函数--监听页面加载
	        var searchLetter = city.searchLetter;
	        var cityList = city.cityList();
	        // console.log(cityInfo);

	        var sysInfo = wx.getSystemInfoSync();
	        console.log(sysInfo);
	        var winHeight = sysInfo.windowHeight;

	        //添加要匹配的字母范围值
	        //1、更加屏幕高度设置子元素的高度
	        var itemH = (winHeight - 50) / searchLetter.length;
	        var tempObj = [];
	        for (var i = 0; i < searchLetter.length; i++) {
	            var temp = {};
	            temp.name = searchLetter[i];
	            temp.tHeight = i * itemH;
	            temp.bHeight = (i + 1) * itemH;

	            tempObj.push(temp);
	        }

	        this.setData({
	            winHeight: winHeight,
	            itemH: itemH,
	            searchLetter: tempObj,
	            cityList: cityList
	        });

	        console.log(this.data.cityInfo);
	    },
	    searchStart: function searchStart(e) {
	        var showLetter = e.currentTarget.dataset.letter;
	        var pageY = e.touches[0].pageY;
	        this.setScrollTop(this, showLetter);
	        this.nowLetter(pageY, this);
	        this.setData({
	            showLetter: showLetter,
	            startPageY: pageY,
	            isShowLetter: true
	        });
	    },
	    searchMove: function searchMove(e) {
	        var pageY = e.touches[0].pageY;
	        var startPageY = this.data.startPageY;
	        var tHeight = this.data.tHeight;
	        var bHeight = this.data.bHeight;
	        var showLetter = 0;
	        console.log(pageY);
	        if (startPageY - pageY > 0) {
	            //向上移动
	            if (pageY < tHeight) {
	                // showLetter=this.mateLetter(pageY,this);
	                this.nowLetter(pageY, this);
	            }
	        } else {
	            //向下移动
	            if (pageY > bHeight) {
	                // showLetter=this.mateLetter(pageY,this);
	                this.nowLetter(pageY, this);
	            }
	        }
	    },
	    searchEnd: function searchEnd(e) {
	        // console.log(e);
	        // var showLetter=e.currentTarget.dataset.letter;
	        var that = this;
	        setTimeout(function () {
	            that.setData({
	                isShowLetter: false
	            });
	        }, 1000);
	    },
	    nowLetter: function nowLetter(pageY, that) {
	        //当前选中的信息
	        var letterData = this.data.searchLetter;
	        var bHeight = 0;
	        var tHeight = 0;
	        var showLetter = "";
	        for (var i = 0; i < letterData.length; i++) {
	            if (letterData[i].tHeight <= pageY && pageY <= letterData[i].bHeight) {
	                bHeight = letterData[i].bHeight;
	                tHeight = letterData[i].tHeight;
	                showLetter = letterData[i].name;
	                break;
	            }
	        }

	        this.setScrollTop(that, showLetter);

	        that.setData({
	            bHeight: bHeight,
	            tHeight: tHeight,
	            showLetter: showLetter,
	            startPageY: pageY
	        });
	    },
	    bindScroll: function bindScroll(e) {
	        console.log(e.detail);
	    },
	    setScrollTop: function setScrollTop(that, showLetter) {
	        var scrollTop = 0;
	        var cityList = that.data.cityList;
	        var cityCount = 0;
	        var initialCount = 0;
	        for (var i = 0; i < cityList.length; i++) {
	            if (showLetter == cityList[i].initial) {
	                scrollTop = initialCount * 30 + cityCount * 41;
	                break;
	            } else {
	                initialCount++;
	                cityCount += cityList[i].cityInfo.length;
	            }
	        }
	        that.setData({
	            scrollTop: scrollTop - 1558
	        });
	    },
	    bindCity: function bindCity(e) {
	        var city = e.currentTarget.dataset.city;
	        this.setData({ city: city });
	    },
	    wxSortPickerViewItemTap: function wxSortPickerViewItemTap(e) {
	        var city = e.target.dataset.text;
	        //可以跳转了
	        console.log('选择了城市：', city);
	    },
	    cxgps: function cxgps(e) {
	        var that = this;
	        wx.getLocation({
	            type: 'wgs84',
	            success: function success(res) {
	                var latitude = res.latitude;
	                var longitude = res.longitude;
	                ajaxGes(latitude, longitude).then(function (data) {
	                    if (data.status === 'success') {
	                        that.setData({});
	                    } else {
	                        that.setData({
	                            city: '定位失败'
	                        });
	                    }
	                });
	            },
	            fail: function fail(res) {
	                that.setData({
	                    city: '定位失败'
	                });
	            }
	        });
	    }
	});

	//经纬度定位获取站点
	function ajaxGes(lat, lng) {
	    //自己的定位接口
	    var url = '';

	    return new _promise2.default(function (resolve, reject) {
	        wx.request({
	            url: url,
	            header: {
	                'content-type': 'application/json'
	            },
	            success: function success(res) {
	                resolve(res.data);
	            },
	            fail: function fail(err) {
	                reject(err);
	            }
	        });
	    });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(49);
	__webpack_require__(53);
	module.exports = __webpack_require__(13).Promise;

/***/ },
/* 4 */
/***/ function(module, exports) {

	

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(6)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(9)(String, 'String', function(iterated){
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(7)
	  , defined   = __webpack_require__(8);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(10)
	  , $export        = __webpack_require__(11)
	  , redefine       = __webpack_require__(26)
	  , hide           = __webpack_require__(16)
	  , has            = __webpack_require__(27)
	  , Iterators      = __webpack_require__(28)
	  , $iterCreate    = __webpack_require__(29)
	  , setToStringTag = __webpack_require__(45)
	  , getPrototypeOf = __webpack_require__(47)
	  , ITERATOR       = __webpack_require__(46)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
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
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(12)
	  , core      = __webpack_require__(13)
	  , ctx       = __webpack_require__(14)
	  , hide      = __webpack_require__(16)
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

/***/ },
/* 12 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 13 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(15);
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

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(17)
	  , createDesc = __webpack_require__(25);
	module.exports = __webpack_require__(21) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(18)
	  , IE8_DOM_DEFINE = __webpack_require__(20)
	  , toPrimitive    = __webpack_require__(24)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(21) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(21) && !__webpack_require__(22)(function(){
	  return Object.defineProperty(__webpack_require__(23)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(22)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19)
	  , document = __webpack_require__(12).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(19);
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

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16);

/***/ },
/* 27 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(30)
	  , descriptor     = __webpack_require__(25)
	  , setToStringTag = __webpack_require__(45)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(16)(IteratorPrototype, __webpack_require__(46)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(18)
	  , dPs         = __webpack_require__(31)
	  , enumBugKeys = __webpack_require__(43)
	  , IE_PROTO    = __webpack_require__(40)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(23)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(44).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(17)
	  , anObject = __webpack_require__(18)
	  , getKeys  = __webpack_require__(32);

	module.exports = __webpack_require__(21) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(33)
	  , enumBugKeys = __webpack_require__(43);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(27)
	  , toIObject    = __webpack_require__(34)
	  , arrayIndexOf = __webpack_require__(37)(false)
	  , IE_PROTO     = __webpack_require__(40)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(35)
	  , defined = __webpack_require__(8);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(36);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(34)
	  , toLength  = __webpack_require__(38)
	  , toIndex   = __webpack_require__(39);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
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

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(7)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(7)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(41)('keys')
	  , uid    = __webpack_require__(42);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(12)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12).document && document.documentElement;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(17).f
	  , has = __webpack_require__(27)
	  , TAG = __webpack_require__(46)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(41)('wks')
	  , uid        = __webpack_require__(42)
	  , Symbol     = __webpack_require__(12).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(27)
	  , toObject    = __webpack_require__(48)
	  , IE_PROTO    = __webpack_require__(40)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(8);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(50);
	var global        = __webpack_require__(12)
	  , hide          = __webpack_require__(16)
	  , Iterators     = __webpack_require__(28)
	  , TO_STRING_TAG = __webpack_require__(46)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(51)
	  , step             = __webpack_require__(52)
	  , Iterators        = __webpack_require__(28)
	  , toIObject        = __webpack_require__(34);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(9)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(10)
	  , global             = __webpack_require__(12)
	  , ctx                = __webpack_require__(14)
	  , classof            = __webpack_require__(54)
	  , $export            = __webpack_require__(11)
	  , isObject           = __webpack_require__(19)
	  , aFunction          = __webpack_require__(15)
	  , anInstance         = __webpack_require__(55)
	  , forOf              = __webpack_require__(56)
	  , speciesConstructor = __webpack_require__(60)
	  , task               = __webpack_require__(61).set
	  , microtask          = __webpack_require__(63)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(46)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
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
	            reject(TypeError('Promise-chain cycle'));
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
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
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
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
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
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
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
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
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
	  Internal.prototype = __webpack_require__(64)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
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
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(45)($Promise, PROMISE);
	__webpack_require__(65)(PROMISE);
	Wrapper = __webpack_require__(13)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
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
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(66)(function(iter){
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
	      forOf(iterable, false, function(promise){
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
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(36)
	  , TAG = __webpack_require__(46)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(14)
	  , call        = __webpack_require__(57)
	  , isArrayIter = __webpack_require__(58)
	  , anObject    = __webpack_require__(18)
	  , toLength    = __webpack_require__(38)
	  , getIterFn   = __webpack_require__(59)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(18);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(28)
	  , ITERATOR   = __webpack_require__(46)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(54)
	  , ITERATOR  = __webpack_require__(46)('iterator')
	  , Iterators = __webpack_require__(28);
	module.exports = __webpack_require__(13).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(18)
	  , aFunction = __webpack_require__(15)
	  , SPECIES   = __webpack_require__(46)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(14)
	  , invoke             = __webpack_require__(62)
	  , html               = __webpack_require__(44)
	  , cel                = __webpack_require__(23)
	  , global             = __webpack_require__(12)
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
	  if(__webpack_require__(36)(process) == 'process'){
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

/***/ },
/* 62 */
/***/ function(module, exports) {

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

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(12)
	  , macrotask = __webpack_require__(61).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(36)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
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
	      process.nextTick(flush);
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
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
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
	      macrotask.call(global, flush);
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

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(16);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(12)
	  , core        = __webpack_require__(13)
	  , dP          = __webpack_require__(17)
	  , DESCRIPTORS = __webpack_require__(21)
	  , SPECIES     = __webpack_require__(46)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(46)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	"use strict";

	var cityObj = [{ "city": "阿城", "initial": "A", "id": "06448299177710533" }, { "city": "安达", "initial": "A", "id": "03122694308362859" }, { "city": "安图", "initial": "A", "id": "01289994925257243" }, { "city": "鞍山", "initial": "A", "id": "02077634724089974" }, { "city": "阿鲁旗", "initial": "A", "id": "07659206100840623" }, { "city": "敖汉", "initial": "A", "id": "02842208719678778" }, { "city": "阿巴嘎", "initial": "A", "id": "02842594862977319" }, { "city": "阿荣旗", "initial": "A", "id": "047930488523552217" }, { "city": "阿尔山", "initial": "A", "id": "08007626663930292" }, { "city": "阿左旗", "initial": "A", "id": "09014862715102605" }, { "city": "阿右旗", "initial": "A", "id": "017312420119095306" }, { "city": "安新", "initial": "A", "id": "09540643532975501" }, { "city": "安国", "initial": "A", "id": "07141044578088103" }, { "city": "安平", "initial": "A", "id": "08811889636944836" }, { "city": "安泽", "initial": "A", "id": "05342280142432343" }, { "city": "安塞", "initial": "A", "id": "08507093800242294" }, { "city": "安康", "initial": "A", "id": "023163925166898913" }, { "city": "安丘", "initial": "A", "id": "08932896601866507" }, { "city": "阿拉尔", "initial": "A", "id": "0541978292205737" }, { "city": "阿克苏", "initial": "A", "id": "07164481403061298" }, { "city": "阿瓦提", "initial": "A", "id": "07656225570514459" }, { "city": "阿勒泰", "initial": "A", "id": "046798341695959955" }, { "city": "阿图什", "initial": "A", "id": "0191954105894518" }, { "city": "阿克陶", "initial": "A", "id": "020285326864742959" }, { "city": "阿合奇", "initial": "A", "id": "07365495326685221" }, { "city": "阿拉山口", "initial": "A", "id": "09875534853576029" }, { "city": "昂仁", "initial": "A", "id": "09765587124993547" }, { "city": "安多", "initial": "A", "id": "0027632057001694132" }, { "city": "阿里", "initial": "A", "id": "0811740805796223" }, { "city": "安定", "initial": "A", "id": "030012835477931965" }, { "city": "阿克塞", "initial": "A", "id": "08816893513258808" }, { "city": "安阳", "initial": "A", "id": "07323953989186338" }, { "city": "安陆", "initial": "A", "id": "06911184511966977" }, { "city": "安吉", "initial": "A", "id": "032948884327566796" }, { "city": "安庆", "initial": "A", "id": "041259777292234756" }, { "city": "安溪", "initial": "A", "id": "03295305936861581" }, { "city": "安义", "initial": "A", "id": "09143005668328805" }, { "city": "安福", "initial": "A", "id": "05894384100256431" }, { "city": "安远", "initial": "A", "id": "048416594558076476" }, { "city": "安源", "initial": "A", "id": "015607541055061525" }, { "city": "安仁", "initial": "A", "id": "09683288754437223" }, { "city": "安乡", "initial": "A", "id": "03768945293588055" }, { "city": "安化", "initial": "A", "id": "007452231531333142" }, { "city": "安顺", "initial": "A", "id": "011041013338961703" }, { "city": "安龙", "initial": "A", "id": "05483987988088603" }, { "city": "安县", "initial": "A", "id": "0009780790967883979" }, { "city": "安岳", "initial": "A", "id": "09298278099922628" }, { "city": "阿坝", "initial": "A", "id": "08307760863101019" }, { "city": "安宁", "initial": "A", "id": "09135352556756" }, { "city": "澳门", "initial": "A", "id": "0966479642185442" }, { "city": "北京", "initial": "B", "id": "08323182181132442" }, { "city": "宝山", "initial": "B", "id": "023273065278345095" }, { "city": "宝坻", "initial": "B", "id": "06234997791505157" }, { "city": "北辰", "initial": "B", "id": "018415463504109408" }, { "city": "滨海新区", "initial": "B", "id": "026511872909465684" }, { "city": "北碚", "initial": "B", "id": "00755251918587776" }, { "city": "巴南", "initial": "B", "id": "08518074939627387" }, { "city": "璧山", "initial": "B", "id": "05156065987774383" }, { "city": "宾县", "initial": "B", "id": "03347350502761881" }, { "city": "巴彦", "initial": "B", "id": "044205126695255825" }, { "city": "拜泉", "initial": "B", "id": "09712431093124978" }, { "city": "北安", "initial": "B", "id": "05802519013415208" }, { "city": "勃利", "initial": "B", "id": "08343326976777508" }, { "city": "宝清", "initial": "B", "id": "09773453351209225" }, { "city": "白城", "initial": "B", "id": "0058373820353448735" }, { "city": "白山", "initial": "B", "id": "0061355423993733726" }, { "city": "本溪", "initial": "B", "id": "017243592112706274" }, { "city": "本溪县", "initial": "B", "id": "06989410749789735" }, { "city": "北镇", "initial": "B", "id": "09555346729751732" }, { "city": "北票", "initial": "B", "id": "04459810284907155" }, { "city": "包头", "initial": "B", "id": "07999150863969617" }, { "city": "白云鄂博", "initial": "B", "id": "045751482141326627" }, { "city": "巴雅尔吐胡硕", "initial": "B", "id": "07545158646909746" }, { "city": "巴林左旗", "initial": "B", "id": "07870646068391796" }, { "city": "巴林右旗", "initial": "B", "id": "033476892389823076" }, { "city": "八里罕", "initial": "B", "id": "08713676134194506" }, { "city": "宝国吐", "initial": "B", "id": "02809165302959078" }, { "city": "博克图", "initial": "B", "id": "05909244068009902" }, { "city": "巴彦诺日公", "initial": "B", "id": "07054222856143266" }, { "city": "保定", "initial": "B", "id": "03242759715968806" }, { "city": "博野", "initial": "B", "id": "06640664891725085" }, { "city": "霸州", "initial": "B", "id": "03404168290562293" }, { "city": "柏乡", "initial": "B", "id": "010135853551337437" }, { "city": "北戴河", "initial": "B", "id": "046417879045818844" }, { "city": "保德", "initial": "B", "id": "03634287237745064" }, { "city": "彬县", "initial": "B", "id": "02252110347324605" }, { "city": "白水", "initial": "B", "id": "07663603139300339" }, { "city": "白河", "initial": "B", "id": "06016588974150567" }, { "city": "佛坪", "initial": "B", "id": "05656573795361484" }, { "city": "宝鸡", "initial": "B", "id": "03170449459045299" }, { "city": "博山", "initial": "B", "id": "0736192256781468" }, { "city": "滨州", "initial": "B", "id": "0195306500589024" }, { "city": "博兴", "initial": "B", "id": "0681496883904912" }, { "city": "白杨沟", "initial": "B", "id": "016681205427519652" }, { "city": "白碱滩", "initial": "B", "id": "07813530274110647" }, { "city": "巴音布鲁克", "initial": "B", "id": "017026549053279694" }, { "city": "博湖", "initial": "B", "id": "06131766743656071" }, { "city": "巴仑台", "initial": "B", "id": "001729696207208442" }, { "city": "拜城", "initial": "B", "id": "06628235788753947" }, { "city": "巴楚", "initial": "B", "id": "008040281620426959" }, { "city": "巴里坤", "initial": "B", "id": "026541889963919796" }, { "city": "布尔津", "initial": "B", "id": "0002638410455908735" }, { "city": "博乐", "initial": "B", "id": "0668774474925204" }, { "city": "白朗", "initial": "B", "id": "02746032897430424" }, { "city": "波密", "initial": "B", "id": "07019767617632848" }, { "city": "边坝", "initial": "B", "id": "08470053389282246" }, { "city": "八宿", "initial": "B", "id": "0269477746910167" }, { "city": "班戈", "initial": "B", "id": "018062615646059466" }, { "city": "巴青", "initial": "B", "id": "08417364358655024" }, { "city": "比如", "initial": "B", "id": "068219891510372" }, { "city": "班玛", "initial": "B", "id": "08534246651652153" }, { "city": "白银", "initial": "B", "id": "043922997295369326" }, { "city": "宝丰", "initial": "B", "id": "06030263385467305" }, { "city": "博爱", "initial": "B", "id": "03491691201794065" }, { "city": "宝应", "initial": "B", "id": "041643047752137674" }, { "city": "滨海", "initial": "B", "id": "0921369963019038" }, { "city": "保康", "initial": "B", "id": "0569031145401224" }, { "city": "巴东", "initial": "B", "id": "017464327342251873" }, { "city": "北仑", "initial": "B", "id": "08175992199617474" }, { "city": "蚌埠", "initial": "B", "id": "06051520422179693" }, { "city": "亳州", "initial": "B", "id": "0007125630174070974" }, { "city": "保靖", "initial": "B", "id": "015277647443356446" }, { "city": "白云", "initial": "B", "id": "0751710857300782" }, { "city": "毕节", "initial": "B", "id": "06437076730584286" }, { "city": "北川", "initial": "B", "id": "08755471136818895" }, { "city": "巴中", "initial": "B", "id": "038010418044933925" }, { "city": "布拖", "initial": "B", "id": "09500358390261776" }, { "city": "宝兴", "initial": "B", "id": "0669173983816427" }, { "city": "白玉", "initial": "B", "id": "08744213004218131" }, { "city": "巴塘", "initial": "B", "id": "09811180726455886" }, { "city": "博罗", "initial": "B", "id": "06127485105759967" }, { "city": "佛山", "initial": "B", "id": "042569293710734635" }, { "city": "佛冈", "initial": "B", "id": "0876330285845484" }, { "city": "宾川", "initial": "B", "id": "0511498347261367" }, { "city": "保山", "initial": "B", "id": "03890175381048213" }, { "city": "宾阳", "initial": "B", "id": "09942315378293882" }, { "city": "博白", "initial": "B", "id": "09491256408064164" }, { "city": "北流", "initial": "B", "id": "032015153609596014" }, { "city": "百色", "initial": "B", "id": "01907721682394563" }, { "city": "巴马", "initial": "B", "id": "07628461691903223" }, { "city": "北海", "initial": "B", "id": "06230481927557803" }, { "city": "白沙", "initial": "B", "id": "03650905846324406" }, { "city": "保亭", "initial": "B", "id": "09423466990139886" }, { "city": "昌平", "initial": "C", "id": "04213948273856092" }, { "city": "崇明", "initial": "C", "id": "06401004104865238" }, { "city": "城口", "initial": "C", "id": "022142042809938944" }, { "city": "昌图", "initial": "C", "id": "022909484809879577" }, { "city": "察右前旗", "initial": "C", "id": "035258849160409356" }, { "city": "察右中旗", "initial": "C", "id": "09976530225735178" }, { "city": "察右后旗", "initial": "C", "id": "09619902574838799" }, { "city": "赤峰", "initial": "C", "id": "008406708644883665" }, { "city": "陈旗", "initial": "C", "id": "004689369215124506" }, { "city": "赤城", "initial": "C", "id": "017161805106348393" }, { "city": "崇礼", "initial": "C", "id": "005417293021095082" }, { "city": "承德", "initial": "C", "id": "021595589899225343" }, { "city": "承德县", "initial": "C", "id": "06693895151477705" }, { "city": "曹妃甸", "initial": "C", "id": "008815257291797285" }, { "city": "曹妃甸工业区", "initial": "C", "id": "01884831455026006" }, { "city": "沧州", "initial": "C", "id": "09803890328589375" }, { "city": "沧县", "initial": "C", "id": "09893144029386285" }, { "city": "成安", "initial": "C", "id": "07271865005371021" }, { "city": "磁县", "initial": "C", "id": "05153529579295133" }, { "city": "昌黎", "initial": "C", "id": "028344928340340303" }, { "city": "淳化", "initial": "C", "id": "08166347387050434" }, { "city": "城固", "initial": "C", "id": "048978936072184887" }, { "city": "陈仓", "initial": "C", "id": "09970916574816853" }, { "city": "昌乐", "initial": "C", "id": "05718903956997423" }, { "city": "昌邑", "initial": "C", "id": "04168668444472101" }, { "city": "曹县", "initial": "C", "id": "01813005251423978" }, { "city": "成武", "initial": "C", "id": "03356751741558621" }, { "city": "成山头", "initial": "C", "id": "018590574431341733" }, { "city": "茌平", "initial": "C", "id": "027642440104407373" }, { "city": "昌吉", "initial": "C", "id": "0628009444567089" }, { "city": "蔡家湖", "initial": "C", "id": "04014132062183189" }, { "city": "察布查尔", "initial": "C", "id": "08432131145367823" }, { "city": "策勒", "initial": "C", "id": "05890830810082937" }, { "city": "错那", "initial": "C", "id": "06429594655431421" }, { "city": "措美", "initial": "C", "id": "013567463395989687" }, { "city": "察隅", "initial": "C", "id": "08292190206712335" }, { "city": "昌都", "initial": "C", "id": "001852876105071455" }, { "city": "察雅", "initial": "C", "id": "08877106061139539" }, { "city": "措勤", "initial": "C", "id": "038334065286857655" }, { "city": "称多", "initial": "C", "id": "09646419303258638" }, { "city": "崇信", "initial": "C", "id": "00359822112586774" }, { "city": "成县", "initial": "C", "id": "00951262077461883" }, { "city": "常熟", "initial": "C", "id": "019665103999862366" }, { "city": "常州", "initial": "C", "id": "07389226655607162" }, { "city": "蔡甸", "initial": "C", "id": "010008189775263987" }, { "city": "赤壁", "initial": "C", "id": "07870630147142406" }, { "city": "崇阳", "initial": "C", "id": "04792212256880408" }, { "city": "淳安", "initial": "C", "id": "05723433432795539" }, { "city": "慈溪", "initial": "C", "id": "08700005274324141" }, { "city": "苍南", "initial": "C", "id": "03150860585721771" }, { "city": "常山", "initial": "C", "id": "09072782239556034" }, { "city": "巢湖", "initial": "C", "id": "09191956468320257" }, { "city": "滁州", "initial": "C", "id": "0380746279605378" }, { "city": "池州", "initial": "C", "id": "04844695968145414" }, { "city": "城厢", "initial": "C", "id": "08210756978912186" }, { "city": "崇武", "initial": "C", "id": "08577819936995521" }, { "city": "崇仁", "initial": "C", "id": "06343134648611686" }, { "city": "崇义", "initial": "C", "id": "06465483302131727" }, { "city": "茶陵", "initial": "C", "id": "000883754606192877" }, { "city": "常宁", "initial": "C", "id": "08795407573894034" }, { "city": "郴州", "initial": "C", "id": "0647341230847708" }, { "city": "常德", "initial": "C", "id": "04203246067968782" }, { "city": "城步", "initial": "C", "id": "05744752159981383" }, { "city": "慈利", "initial": "C", "id": "07549287380226979" }, { "city": "辰溪", "initial": "C", "id": "07687347720544233" }, { "city": "赤水", "initial": "C", "id": "028960290100484687" }, { "city": "岑巩", "initial": "C", "id": "04117369772957731" }, { "city": "从江", "initial": "C", "id": "04720886681650387" }, { "city": "册亨", "initial": "C", "id": "020123424355079922" }, { "city": "成都", "initial": "C", "id": "006275441774377799" }, { "city": "崇州", "initial": "C", "id": "07993278885948047" }, { "city": "苍溪", "initial": "C", "id": "015094669458226884" }, { "city": "从化", "initial": "C", "id": "015503394884828503" }, { "city": "潮阳", "initial": "C", "id": "06629989348251999" }, { "city": "赤坎", "initial": "C", "id": "05330180631538106" }, { "city": "潮州", "initial": "C", "id": "07622876402359182" }, { "city": "潮安", "initial": "C", "id": "08055892952828041" }, { "city": "呈贡", "initial": "C", "id": "09655037230827404" }, { "city": "昌宁", "initial": "C", "id": "0465237098908198" }, { "city": "楚雄", "initial": "C", "id": "025369113441823643" }, { "city": "沧源", "initial": "C", "id": "06155606789498222" }, { "city": "崇左", "initial": "C", "id": "085135696699431" }, { "city": "苍梧", "initial": "C", "id": "04942749424637203" }, { "city": "岑溪", "initial": "C", "id": "07724962772428978" }, { "city": "昌江", "initial": "C", "id": "0020567394935602445" }, { "city": "大兴", "initial": "D", "id": "07865507884664236" }, { "city": "东丽", "initial": "D", "id": "045546099765480097" }, { "city": "垫江", "initial": "D", "id": "06355590417324741" }, { "city": "大足", "initial": "D", "id": "09372487810374412" }, { "city": "东宁", "initial": "D", "id": "05101782155875996" }, { "city": "大兴安岭", "initial": "D", "id": "09488664330618106" }, { "city": "大庆", "initial": "D", "id": "05066547642066876" }, { "city": "杜尔伯特", "initial": "D", "id": "09917531474140453" }, { "city": "德惠", "initial": "D", "id": "02876266690779601" }, { "city": "敦化", "initial": "D", "id": "01938654355370275" }, { "city": "大安", "initial": "D", "id": "0979745487604037" }, { "city": "东丰", "initial": "D", "id": "06386702423091519" }, { "city": "东辽", "initial": "D", "id": "04876076101206983" }, { "city": "东岗", "initial": "D", "id": "05343326457788029" }, { "city": "大连", "initial": "D", "id": "0878104425971376" }, { "city": "丹东", "initial": "D", "id": "04806628017777508" }, { "city": "东港", "initial": "D", "id": "07865905826414066" }, { "city": "大石桥", "initial": "D", "id": "0823130034443607" }, { "city": "灯塔", "initial": "D", "id": "021189557024765993" }, { "city": "大洼", "initial": "D", "id": "06840536302385523" }, { "city": "达茂旗", "initial": "D", "id": "03570045789571896" }, { "city": "达拉特", "initial": "D", "id": "042215610264584447" }, { "city": "东胜", "initial": "D", "id": "06677314596776704" }, { "city": "磴口", "initial": "D", "id": "04561668694573584" }, { "city": "大佘太", "initial": "D", "id": "033356087913737986" }, { "city": "东乌旗", "initial": "D", "id": "09520998783867827" }, { "city": "多伦", "initial": "D", "id": "002490605190376538" }, { "city": "定州", "initial": "D", "id": "04772918776402486" }, { "city": "定兴", "initial": "D", "id": "035955673128152843" }, { "city": "大城", "initial": "D", "id": "04152442358569539" }, { "city": "大厂", "initial": "D", "id": "05072808613035913" }, { "city": "东光", "initial": "D", "id": "0997850356582793" }, { "city": "大名", "initial": "D", "id": "022026194583635705" }, { "city": "大同", "initial": "D", "id": "07188920789899722" }, { "city": "大同县", "initial": "D", "id": "08689788061220265" }, { "city": "大宁", "initial": "D", "id": "07975637013529342" }, { "city": "定襄", "initial": "D", "id": "049003114651348745" }, { "city": "代县", "initial": "D", "id": "04805642275655402" }, { "city": "定边", "initial": "D", "id": "06799820666149246" }, { "city": "大荔", "initial": "D", "id": "02535239316155302" }, { "city": "澄城", "initial": "D", "id": "05744926263106693" }, { "city": "丹凤", "initial": "D", "id": "019630318441152905" }, { "city": "德州", "initial": "D", "id": "01891444655746548" }, { "city": "东平", "initial": "D", "id": "038803070168078935" }, { "city": "东明", "initial": "D", "id": "041400637489198067" }, { "city": "定陶", "initial": "D", "id": "0720869264607205" }, { "city": "东营", "initial": "D", "id": "013257543739580746" }, { "city": "东阿", "initial": "D", "id": "09838060159443724" }, { "city": "达坂城", "initial": "D", "id": "04646641202272903" }, { "city": "当雄", "initial": "D", "id": "04894097843516396" }, { "city": "达孜", "initial": "D", "id": "08816199503025226" }, { "city": "定日", "initial": "D", "id": "030177556055043375" }, { "city": "定结", "initial": "D", "id": "06926205693167169" }, { "city": "丁青", "initial": "D", "id": "029277964291540215" }, { "city": "大通", "initial": "D", "id": "08175208586982432" }, { "city": "达日", "initial": "D", "id": "08628494762628316" }, { "city": "德令哈", "initial": "D", "id": "005217715627095276" }, { "city": "大柴旦", "initial": "D", "id": "01944913849510772" }, { "city": "都兰", "initial": "D", "id": "08321927665795539" }, { "city": "定西", "initial": "D", "id": "06705496462201779" }, { "city": "敦煌", "initial": "D", "id": "022061091857450466" }, { "city": "宕昌", "initial": "D", "id": "06726719653012592" }, { "city": "东乡", "initial": "D", "id": "006383145091145637" }, { "city": "迭部", "initial": "D", "id": "0060583235231494115" }, { "city": "登封", "initial": "D", "id": "09453579171398272" }, { "city": "邓州", "initial": "D", "id": "09273804277384763" }, { "city": "郸城", "initial": "D", "id": "09831242427720905" }, { "city": "丹阳", "initial": "D", "id": "015982011250202732" }, { "city": "丹徒", "initial": "D", "id": "006185267826830021" }, { "city": "东台", "initial": "D", "id": "06739865884368728" }, { "city": "大丰", "initial": "D", "id": "04952639811326973" }, { "city": "东海", "initial": "D", "id": "05134523120044567" }, { "city": "东西湖", "initial": "D", "id": "06106010874909815" }, { "city": "大悟", "initial": "D", "id": "0679030275508862" }, { "city": "大冶", "initial": "D", "id": "0508663393149346" }, { "city": "当阳", "initial": "D", "id": "09980379177315701" }, { "city": "丹江口", "initial": "D", "id": "06836824178044292" }, { "city": "掇刀", "initial": "D", "id": "04627099058499504" }, { "city": "德清", "initial": "D", "id": "0052992305458753775" }, { "city": "洞头", "initial": "D", "id": "05992552634336723" }, { "city": "东阳", "initial": "D", "id": "09360349031445845" }, { "city": "岱山", "initial": "D", "id": "08303239820162291" }, { "city": "定海", "initial": "D", "id": "07786081104106584" }, { "city": "当涂", "initial": "D", "id": "031670128709641543" }, { "city": "砀山", "initial": "D", "id": "019662131533536686" }, { "city": "定远", "initial": "D", "id": "08006641662046465" }, { "city": "东至", "initial": "D", "id": "07724027315704831" }, { "city": "德化", "initial": "D", "id": "06447714581941097" }, { "city": "东山", "initial": "D", "id": "06485582588636363" }, { "city": "大田", "initial": "D", "id": "022196086595170494" }, { "city": "钓鱼岛", "initial": "D", "id": "05933249067079525" }, { "city": "德安", "initial": "D", "id": "08360069806159274" }, { "city": "都昌", "initial": "D", "id": "030611343378053957" }, { "city": "德兴", "initial": "D", "id": "03221020685766709" }, { "city": "大余", "initial": "D", "id": "05630127247827621" }, { "city": "定南", "initial": "D", "id": "025873956404160015" }, { "city": "洞口", "initial": "D", "id": "06147903307999476" }, { "city": "东安", "initial": "D", "id": "006850857597286919" }, { "city": "道县", "initial": "D", "id": "041649055254345946" }, { "city": "道真", "initial": "D", "id": "08662387701397063" }, { "city": "都匀", "initial": "D", "id": "02295099643773464" }, { "city": "独山", "initial": "D", "id": "09397479027246387" }, { "city": "丹寨", "initial": "D", "id": "05766821100407793" }, { "city": "德江", "initial": "D", "id": "041368554639017163" }, { "city": "大方", "initial": "D", "id": "05407031626328451" }, { "city": "大邑", "initial": "D", "id": "0992366138672075" }, { "city": "都江堰", "initial": "D", "id": "05495706833086926" }, { "city": "达州", "initial": "D", "id": "08806918493060929" }, { "city": "大竹", "initial": "D", "id": "047424256209713067" }, { "city": "达川", "initial": "D", "id": "0882132074320874" }, { "city": "东兴", "initial": "D", "id": "033470543520420715" }, { "city": "丹棱", "initial": "D", "id": "07182915147644118" }, { "city": "德昌", "initial": "D", "id": "019778747081922998" }, { "city": "丹巴", "initial": "D", "id": "04264515548265393" }, { "city": "道孚", "initial": "D", "id": "041230508683239986" }, { "city": "德格", "initial": "D", "id": "006684819300143552" }, { "city": "稻城", "initial": "D", "id": "08977779743846959" }, { "city": "得荣", "initial": "D", "id": "012488848670412045" }, { "city": "德阳", "initial": "D", "id": "07212939474691014" }, { "city": "大埔", "initial": "D", "id": "015249318944820933" }, { "city": "澄海", "initial": "D", "id": "05152364717296132" }, { "city": "斗门", "initial": "D", "id": "07437991442565259" }, { "city": "德庆", "initial": "D", "id": "09627362257372398" }, { "city": "东源", "initial": "D", "id": "07062119667245956" }, { "city": "东莞", "initial": "D", "id": "05563512992498458" }, { "city": "电白", "initial": "D", "id": "07037692523488486" }, { "city": "东川", "initial": "D", "id": "005795021810037149" }, { "city": "大理", "initial": "D", "id": "09545662836190221" }, { "city": "澄江", "initial": "D", "id": "021450361143642782" }, { "city": "大姚", "initial": "D", "id": "036290819024134446" }, { "city": "大关", "initial": "D", "id": "06754416452947405" }, { "city": "德钦", "initial": "D", "id": "08767380403284388" }, { "city": "德宏", "initial": "D", "id": "02549712084409499" }, { "city": "大新", "initial": "D", "id": "014566834227842484" }, { "city": "德保", "initial": "D", "id": "03836285414409002" }, { "city": "东兰", "initial": "D", "id": "06098988221682646" }, { "city": "都安", "initial": "D", "id": "05015775781982208" }, { "city": "大化", "initial": "D", "id": "07355981775077374" }, { "city": "东方", "initial": "D", "id": "004360709122266626" }, { "city": "澄迈", "initial": "D", "id": "05645194214027023" }, { "city": "儋州", "initial": "D", "id": "08491683688447951" }, { "city": "定安", "initial": "D", "id": "07066594177190544" }, { "city": "氹仔岛", "initial": "D", "id": "00007822439956324256" }, { "city": "二道", "initial": "E", "id": "044807843738943975" }, { "city": "鄂尔多斯", "initial": "E", "id": "06397164813832714" }, { "city": "鄂前旗", "initial": "E", "id": "05660217467294768" }, { "city": "鄂托克", "initial": "E", "id": "00234070568594138" }, { "city": "二连浩特", "initial": "E", "id": "09336308241749758" }, { "city": "鄂伦春旗", "initial": "E", "id": "05379100377385899" }, { "city": "鄂温克旗", "initial": "E", "id": "06295597872306926" }, { "city": "额尔古纳", "initial": "E", "id": "06615831286100373" }, { "city": "额济纳", "initial": "E", "id": "031632447270838493" }, { "city": "额敏", "initial": "E", "id": "013300574397512754" }, { "city": "鄂州", "initial": "E", "id": "0812688280785496" }, { "city": "恩施", "initial": "E", "id": "07488356643752907" }, { "city": "峨边", "initial": "E", "id": "0501344736294572" }, { "city": "峨眉", "initial": "E", "id": "09080792741981552" }, { "city": "峨眉山", "initial": "E", "id": "08721896285808706" }, { "city": "恩平", "initial": "E", "id": "09089472977657116" }, { "city": "洱源", "initial": "E", "id": "01666494462443331" }, { "city": "峨山", "initial": "E", "id": "006860938309577569" }, { "city": "丰台", "initial": "F", "id": "07656989869882214" }, { "city": "房山", "initial": "F", "id": "09347341403238518" }, { "city": "奉贤", "initial": "F", "id": "038343685740429345" }, { "city": "涪陵", "initial": "F", "id": "08625339147351851" }, { "city": "奉节", "initial": "F", "id": "00040293829519371105" }, { "city": "丰都", "initial": "F", "id": "021689854402453723" }, { "city": "方正", "initial": "F", "id": "0893973880183057" }, { "city": "富裕", "initial": "F", "id": "007870689672116682" }, { "city": "抚远", "initial": "F", "id": "06125029790095473" }, { "city": "富锦", "initial": "F", "id": "03023454415151259" }, { "city": "扶余", "initial": "F", "id": "009274252471359845" }, { "city": "抚松", "initial": "F", "id": "06667414742166253" }, { "city": "法库", "initial": "F", "id": "02058282392999633" }, { "city": "抚顺", "initial": "F", "id": "08985894308257063" }, { "city": "凤城", "initial": "F", "id": "009193794682058742" }, { "city": "阜新", "initial": "F", "id": "06789128748685793" }, { "city": "丰镇", "initial": "F", "id": "007089968072224906" }, { "city": "阜平", "initial": "F", "id": "041411082772266017" }, { "city": "丰宁", "initial": "F", "id": "04741202263521418" }, { "city": "丰南", "initial": "F", "id": "04845759326269219" }, { "city": "丰润", "initial": "F", "id": "023633533952217167" }, { "city": "阜城", "initial": "F", "id": "02987187681829504" }, { "city": "峰峰", "initial": "F", "id": "06076419256252377" }, { "city": "肥乡", "initial": "F", "id": "04929115633638801" }, { "city": "抚宁", "initial": "F", "id": "003805741208853752" }, { "city": "汾西", "initial": "F", "id": "06872458925995786" }, { "city": "浮山", "initial": "F", "id": "09431442961133614" }, { "city": "方山", "initial": "F", "id": "07258430469292105" }, { "city": "汾阳", "initial": "F", "id": "008325768951225476" }, { "city": "富县", "initial": "F", "id": "07136543903070593" }, { "city": "府谷", "initial": "F", "id": "07542882756462606" }, { "city": "富平", "initial": "F", "id": "010135248139120101" }, { "city": "凤翔", "initial": "F", "id": "07097925688196041" }, { "city": "扶风", "initial": "F", "id": "031952544281852946" }, { "city": "凤县", "initial": "F", "id": "04711500423893993" }, { "city": "福山", "initial": "F", "id": "047083815682888086" }, { "city": "肥城", "initial": "F", "id": "0014636880874519864" }, { "city": "费县", "initial": "F", "id": "08183948063796616" }, { "city": "阜康", "initial": "F", "id": "08562551280252175" }, { "city": "福海", "initial": "F", "id": "032662126892934595" }, { "city": "富蕴", "initial": "F", "id": "030479844498376907" }, { "city": "封丘", "initial": "F", "id": "08117866523831425" }, { "city": "方城", "initial": "F", "id": "09308070516518399" }, { "city": "范县", "initial": "F", "id": "010908328201118134" }, { "city": "扶沟", "initial": "F", "id": "07164663913657954" }, { "city": "阜宁", "initial": "F", "id": "024578399306498944" }, { "city": "丰县", "initial": "F", "id": "02914625475045205" }, { "city": "房县", "initial": "F", "id": "08574200206205596" }, { "city": "富阳", "initial": "F", "id": "05109785753585596" }, { "city": "奉化", "initial": "F", "id": "0588940806586862" }, { "city": "肥东", "initial": "F", "id": "003702695082241658" }, { "city": "肥西", "initial": "F", "id": "07357690992604065" }, { "city": "凤台", "initial": "F", "id": "06066975725290915" }, { "city": "阜阳", "initial": "F", "id": "006160353543163355" }, { "city": "阜南", "initial": "F", "id": "03466764956163846" }, { "city": "凤阳", "initial": "F", "id": "042632747860257614" }, { "city": "福州", "initial": "F", "id": "03751335809136058" }, { "city": "福清", "initial": "F", "id": "010986649534999193" }, { "city": "福安", "initial": "F", "id": "028184657384156364" }, { "city": "福鼎", "initial": "F", "id": "028729276256350644" }, { "city": "抚州", "initial": "F", "id": "05744603026555757" }, { "city": "奉新", "initial": "F", "id": "06450531921599647" }, { "city": "丰城", "initial": "F", "id": "06464277112819437" }, { "city": "浮梁", "initial": "F", "id": "06303068482989105" }, { "city": "分宜", "initial": "F", "id": "007906896836182375" }, { "city": "凤凰", "initial": "F", "id": "027036900893066074" }, { "city": "凤冈", "initial": "F", "id": "009753353504994244" }, { "city": "福泉", "initial": "F", "id": "09898654977876065" }, { "city": "富顺", "initial": "F", "id": "03172962061041369" }, { "city": "丰顺", "initial": "F", "id": "018159963088907904" }, { "city": "封开", "initial": "F", "id": "03740250113770667" }, { "city": "富民", "initial": "F", "id": "03318920168805042" }, { "city": "富源", "initial": "F", "id": "01152012630625574" }, { "city": "富宁", "initial": "F", "id": "08198046464861266" }, { "city": "凤庆", "initial": "F", "id": "08548956744566314" }, { "city": "福贡", "initial": "F", "id": "049894951139084687" }, { "city": "扶绥", "initial": "F", "id": "09496310803867831" }, { "city": "富川", "initial": "F", "id": "022194568021442418" }, { "city": "凤山", "initial": "F", "id": "042359297903372095" }, { "city": "防城港", "initial": "F", "id": "0005288676973454143" }, { "city": "防城", "initial": "F", "id": "0137757548368326" }, { "city": "甘南", "initial": "G", "id": "07724807318904661" }, { "city": "公主岭", "initial": "G", "id": "05697468480793471" }, { "city": "盖州", "initial": "G", "id": "06358019488464188" }, { "city": "弓长岭", "initial": "G", "id": "010386529927316412" }, { "city": "固阳", "initial": "G", "id": "07757883704409161" }, { "city": "岗子", "initial": "G", "id": "09420217606162469" }, { "city": "根河", "initial": "G", "id": "07044966946583862" }, { "city": "高力板", "initial": "G", "id": "05434472562547745" }, { "city": "拐子湖", "initial": "G", "id": "021465512290890953" }, { "city": "高邑", "initial": "G", "id": "06803679263391542" }, { "city": "藁城", "initial": "G", "id": "015636465966641078" }, { "city": "高阳", "initial": "G", "id": "0579895949439988" }, { "city": "高碑店", "initial": "G", "id": "02746966548448617" }, { "city": "沽源", "initial": "G", "id": "07630333493052965" }, { "city": "固安", "initial": "G", "id": "041089380497384" }, { "city": "故城", "initial": "G", "id": "04181591251643273" }, { "city": "广宗", "initial": "G", "id": "008793967908072053" }, { "city": "广平", "initial": "G", "id": "06536998282454038" }, { "city": "馆陶", "initial": "G", "id": "006454565716898131" }, { "city": "古交", "initial": "G", "id": "09404357366982838" }, { "city": "广灵", "initial": "G", "id": "05333480661352974" }, { "city": "高平", "initial": "G", "id": "08607359033129269" }, { "city": "古县", "initial": "G", "id": "017885942166069335" }, { "city": "高陵", "initial": "G", "id": "042596808230797345" }, { "city": "甘泉", "initial": "G", "id": "08607602317345417" }, { "city": "高青", "initial": "G", "id": "08487999863333131" }, { "city": "高密", "initial": "G", "id": "02990376682410947" }, { "city": "广饶", "initial": "G", "id": "007359837495105293" }, { "city": "冠县", "initial": "G", "id": "0047525529396182264" }, { "city": "高唐", "initial": "G", "id": "019663164403972555" }, { "city": "巩留", "initial": "G", "id": "024535830677657477" }, { "city": "岗巴", "initial": "G", "id": "08123402757357228" }, { "city": "贡嘎", "initial": "G", "id": "004484248063302254" }, { "city": "工布江达", "initial": "G", "id": "012068599418735948" }, { "city": "贡觉", "initial": "G", "id": "009178488178442468" }, { "city": "改则", "initial": "G", "id": "0565943723082265" }, { "city": "噶尔", "initial": "G", "id": "009718984089784755" }, { "city": "革吉", "initial": "G", "id": "05675300903987948" }, { "city": "共和", "initial": "G", "id": "0019667412509605464" }, { "city": "贵德", "initial": "G", "id": "096689011028003" }, { "city": "贵南", "initial": "G", "id": "06859968540216788" }, { "city": "甘德", "initial": "G", "id": "06388939699919789" }, { "city": "格尔木", "initial": "G", "id": "05130103051391592" }, { "city": "刚察", "initial": "G", "id": "08235722120146054" }, { "city": "皋兰", "initial": "G", "id": "07284088310117778" }, { "city": "古浪", "initial": "G", "id": "03519413285830786" }, { "city": "高台", "initial": "G", "id": "07428494354327042" }, { "city": "瓜州", "initial": "G", "id": "0044064787132741534" }, { "city": "甘谷", "initial": "G", "id": "05710845724117539" }, { "city": "广河", "initial": "G", "id": "02321891139106742" }, { "city": "固原", "initial": "G", "id": "002692322999770269" }, { "city": "巩义", "initial": "G", "id": "02590254646045247" }, { "city": "光山", "initial": "G", "id": "030052330314962594" }, { "city": "固始", "initial": "G", "id": "08442717091498382" }, { "city": "高淳", "initial": "G", "id": "03641908706331878" }, { "city": "高邮", "initial": "G", "id": "007646401364196409" }, { "city": "赣榆", "initial": "G", "id": "022432692255521824" }, { "city": "灌云", "initial": "G", "id": "02693284239067415" }, { "city": "灌南", "initial": "G", "id": "003258674797875205" }, { "city": "公安", "initial": "G", "id": "02054927431672562" }, { "city": "广水", "initial": "G", "id": "06905823255175165" }, { "city": "固镇", "initial": "G", "id": "06598446731301739" }, { "city": "广德", "initial": "G", "id": "05542732939952602" }, { "city": "古田", "initial": "G", "id": "05621473566909923" }, { "city": "光泽", "initial": "G", "id": "06470675190633555" }, { "city": "广丰", "initial": "G", "id": "042325673314817647" }, { "city": "广昌", "initial": "G", "id": "05397132960250752" }, { "city": "高安", "initial": "G", "id": "042296200364772285" }, { "city": "赣州", "initial": "G", "id": "06145138413596756" }, { "city": "赣县", "initial": "G", "id": "0722307038431633" }, { "city": "贵溪", "initial": "G", "id": "09304057570308455" }, { "city": "桂阳", "initial": "G", "id": "07397072728699967" }, { "city": "桂东", "initial": "G", "id": "010942759545275949" }, { "city": "古丈", "initial": "G", "id": "07687361713893706" }, { "city": "贵阳", "initial": "G", "id": "045734047160183855" }, { "city": "关岭", "initial": "G", "id": "029014688002109223" }, { "city": "贵定", "initial": "G", "id": "07631443047804869" }, { "city": "广安", "initial": "G", "id": "08822197372275054" }, { "city": "古蔺", "initial": "G", "id": "05128743891017309" }, { "city": "高县", "initial": "G", "id": "06532185047177601" }, { "city": "珙县", "initial": "G", "id": "030355291919198346" }, { "city": "甘洛", "initial": "G", "id": "05666272368466432" }, { "city": "甘孜", "initial": "G", "id": "07086271768343264" }, { "city": "广汉", "initial": "G", "id": "07399792145969879" }, { "city": "广元", "initial": "G", "id": "043009073708670464" }, { "city": "广州", "initial": "G", "id": "014201396269237887" }, { "city": "高明", "initial": "G", "id": "038689837203296373" }, { "city": "广宁", "initial": "G", "id": "07866626158203434" }, { "city": "高要", "initial": "G", "id": "0052203991783593695" }, { "city": "高州", "initial": "G", "id": "007522043130894684" }, { "city": "个旧", "initial": "G", "id": "021532393599608102" }, { "city": "广南", "initial": "G", "id": "09404969726690791" }, { "city": "耿马", "initial": "G", "id": "07463870296149213" }, { "city": "贡山", "initial": "G", "id": "087819566015208" }, { "city": "桂林", "initial": "G", "id": "09014227089672975" }, { "city": "灌阳", "initial": "G", "id": "07985986276139065" }, { "city": "恭城", "initial": "G", "id": "06555881677328337" }, { "city": "贵港", "initial": "G", "id": "020350683125371405" }, { "city": "桂平", "initial": "G", "id": "06368266711836579" }, { "city": "高雄", "initial": "G", "id": "04065821883799172" }, { "city": "海淀", "initial": "H", "id": "05945043747203216" }, { "city": "怀柔", "initial": "H", "id": "07878056373833058" }, { "city": "合川", "initial": "H", "id": "036038300545516133" }, { "city": "哈尔滨", "initial": "H", "id": "038579816526892263" }, { "city": "呼兰", "initial": "H", "id": "07753350791805418" }, { "city": "海林", "initial": "H", "id": "0840498833510761" }, { "city": "桦川", "initial": "H", "id": "013626730703231882" }, { "city": "桦南", "initial": "H", "id": "05401992829703235" }, { "city": "海伦", "initial": "H", "id": "04319588898854443" }, { "city": "黑河", "initial": "H", "id": "08641823036570186" }, { "city": "呼玛", "initial": "H", "id": "016365949829861925" }, { "city": "呼中", "initial": "H", "id": "08517793439605135" }, { "city": "虎林", "initial": "H", "id": "05471005982803334" }, { "city": "鹤岗", "initial": "H", "id": "06880891746377213" }, { "city": "桦甸", "initial": "H", "id": "05550035522525834" }, { "city": "和龙", "initial": "H", "id": "048868985482773364" }, { "city": "珲春", "initial": "H", "id": "0685094043848592" }, { "city": "辉南", "initial": "H", "id": "05794578946451505" }, { "city": "海城", "initial": "H", "id": "028434939001722714" }, { "city": "桓仁", "initial": "H", "id": "05818018733032821" }, { "city": "黑山", "initial": "H", "id": "06121982076234385" }, { "city": "葫芦岛", "initial": "H", "id": "000567133603232417" }, { "city": "呼和浩特", "initial": "H", "id": "06155408774202105" }, { "city": "和林", "initial": "H", "id": "07424212251109439" }, { "city": "化德", "initial": "H", "id": "05006114478975769" }, { "city": "霍林郭勒", "initial": "H", "id": "012782711291487714" }, { "city": "浩尔吐", "initial": "H", "id": "043059505319829094" }, { "city": "河南", "initial": "H", "id": "07598779214243909" }, { "city": "杭锦旗", "initial": "H", "id": "0700581939095589" }, { "city": "海力素", "initial": "H", "id": "033583891817727385" }, { "city": "杭锦后旗", "initial": "H", "id": "0045554637949903" }, { "city": "海拉尔", "initial": "H", "id": "05081887859956356" }, { "city": "胡尔勒", "initial": "H", "id": "0452917067402995" }, { "city": "怀安", "initial": "H", "id": "04486010904080482" }, { "city": "怀来", "initial": "H", "id": "020198708639338014" }, { "city": "海兴", "initial": "H", "id": "04295485091750646" }, { "city": "黄骅", "initial": "H", "id": "07341000264486093" }, { "city": "河间", "initial": "H", "id": "02480382224354445" }, { "city": "衡水", "initial": "H", "id": "011705021880889421" }, { "city": "邯郸", "initial": "H", "id": "042828829566974824" }, { "city": "浑源", "initial": "H", "id": "07161427235865239" }, { "city": "和顺", "initial": "H", "id": "018375943785287885" }, { "city": "壶关", "initial": "H", "id": "00535401591721667" }, { "city": "洪洞", "initial": "H", "id": "0965605436233079" }, { "city": "霍州", "initial": "H", "id": "08367744293369763" }, { "city": "侯马", "initial": "H", "id": "038001169638731525" }, { "city": "河津", "initial": "H", "id": "03357836228609876" }, { "city": "怀仁", "initial": "H", "id": "010715104739203651" }, { "city": "河曲", "initial": "H", "id": "08187621756766936" }, { "city": "户县", "initial": "H", "id": "08625102580328872" }, { "city": "黄陵", "initial": "H", "id": "08312411770471779" }, { "city": "黄龙", "initial": "H", "id": "02700130350326728" }, { "city": "横山", "initial": "H", "id": "08258029409661078" }, { "city": "华县", "initial": "H", "id": "0054257017949215225" }, { "city": "合阳", "initial": "H", "id": "0007951928127641006" }, { "city": "韩城", "initial": "H", "id": "012528462579699862" }, { "city": "华阴", "initial": "H", "id": "02709053890634612" }, { "city": "汉阴", "initial": "H", "id": "09836715821060398" }, { "city": "汉中", "initial": "H", "id": "06211102347382129" }, { "city": "黄岛", "initial": "H", "id": "033037471001609475" }, { "city": "桓台", "initial": "H", "id": "09896117886379443" }, { "city": "海阳", "initial": "H", "id": "0712694887621206" }, { "city": "菏泽", "initial": "H", "id": "03354612473283325" }, { "city": "惠民", "initial": "H", "id": "08156848086497355" }, { "city": "河口", "initial": "H", "id": "05775778107694651" }, { "city": "呼图壁", "initial": "H", "id": "07939634494570502" }, { "city": "和静", "initial": "H", "id": "0049551699070043975" }, { "city": "和硕", "initial": "H", "id": "010964771026391529" }, { "city": "霍城", "initial": "H", "id": "0280564283842887" }, { "city": "霍尔果斯", "initial": "H", "id": "08274719568075684" }, { "city": "和布克赛尔", "initial": "H", "id": "02794277263998117" }, { "city": "哈密", "initial": "H", "id": "0570954464497903" }, { "city": "和田", "initial": "H", "id": "049239043586637243" }, { "city": "哈巴河", "initial": "H", "id": "07221264869823869" }, { "city": "湟源", "initial": "H", "id": "0861191124420313" }, { "city": "湟中", "initial": "H", "id": "005046752503498708" }, { "city": "互助", "initial": "H", "id": "04309586563026324" }, { "city": "化隆", "initial": "H", "id": "011424647632800577" }, { "city": "海北", "initial": "H", "id": "0714992787726479" }, { "city": "华亭", "initial": "H", "id": "024779056929021204" }, { "city": "环县", "initial": "H", "id": "08111720047055506" }, { "city": "华池", "initial": "H", "id": "0485021973710712" }, { "city": "合水", "initial": "H", "id": "07051415468673543" }, { "city": "徽县", "initial": "H", "id": "043000712403220853" }, { "city": "和政", "initial": "H", "id": "0569136370833426" }, { "city": "合作", "initial": "H", "id": "04134151390336882" }, { "city": "贺兰", "initial": "H", "id": "06605896397539139" }, { "city": "惠农", "initial": "H", "id": "06871712785289499" }, { "city": "海原", "initial": "H", "id": "05830849995418377" }, { "city": "滑县", "initial": "H", "id": "04140838561615472" }, { "city": "获嘉", "initial": "H", "id": "032203866817336047" }, { "city": "辉县", "initial": "H", "id": "024386749033516741" }, { "city": "淮滨", "initial": "H", "id": "02731153188174349" }, { "city": "潢川", "initial": "H", "id": "08066466561741252" }, { "city": "鹤壁", "initial": "H", "id": "08123667669484658" }, { "city": "淮阳", "initial": "H", "id": "05338576209873345" }, { "city": "海安", "initial": "H", "id": "05710928704991154" }, { "city": "海门", "initial": "H", "id": "07728258919033131" }, { "city": "邗江", "initial": "H", "id": "047239088891091097" }, { "city": "淮安", "initial": "H", "id": "030454356398347104" }, { "city": "洪泽", "initial": "H", "id": "08368946638079406" }, { "city": "淮阴区", "initial": "H", "id": "011750681534022989" }, { "city": "淮安区", "initial": "H", "id": "0015421574156622597" }, { "city": "黄陂", "initial": "H", "id": "026706241137971487" }, { "city": "汉川", "initial": "H", "id": "018256461928620915" }, { "city": "黄冈", "initial": "H", "id": "09095751250612194" }, { "city": "红安", "initial": "H", "id": "08732069446035533" }, { "city": "黄梅", "initial": "H", "id": "028449045366880954" }, { "city": "黄石", "initial": "H", "id": "01806186943837378" }, { "city": "洪湖", "initial": "H", "id": "07227532496299187" }, { "city": "鹤峰", "initial": "H", "id": "008578036443876136" }, { "city": "杭州", "initial": "H", "id": "06913259691448654" }, { "city": "湖州", "initial": "H", "id": "08811103875141726" }, { "city": "海宁", "initial": "H", "id": "08673054664460496" }, { "city": "海盐", "initial": "H", "id": "08375198650648159" }, { "city": "洪家", "initial": "H", "id": "07774853735402594" }, { "city": "黄岩", "initial": "H", "id": "016683345172653752" }, { "city": "合肥", "initial": "H", "id": "0434499366943208" }, { "city": "怀远", "initial": "H", "id": "06809229855372816" }, { "city": "淮南", "initial": "H", "id": "07352117368876141" }, { "city": "含山", "initial": "H", "id": "006950949821621033" }, { "city": "和县", "initial": "H", "id": "03989802588014524" }, { "city": "怀宁", "initial": "H", "id": "07644229018922439" }, { "city": "黄山", "initial": "H", "id": "03623348825555526" }, { "city": "黄山区", "initial": "H", "id": "07625689149642221" }, { "city": "黄山风景区(光明顶)", "initial": "H", "id": "003167365030479696" }, { "city": "淮北", "initial": "H", "id": "045252026999944084" }, { "city": "霍邱", "initial": "H", "id": "06072303499883864" }, { "city": "霍山", "initial": "H", "id": "043034807121689433" }, { "city": "涵江", "initial": "H", "id": "021098166493128367" }, { "city": "惠安", "initial": "H", "id": "002043872968451299" }, { "city": "华安", "initial": "H", "id": "03062468391202777" }, { "city": "湖口", "initial": "H", "id": "08099158294399367" }, { "city": "横峰", "initial": "H", "id": "019598033844249851" }, { "city": "衡阳", "initial": "H", "id": "08409363893877178" }, { "city": "衡山", "initial": "H", "id": "0406735561077356" }, { "city": "衡东", "initial": "H", "id": "08292233366439592" }, { "city": "衡阳县", "initial": "H", "id": "06167968536367661" }, { "city": "衡南", "initial": "H", "id": "02839591530407959" }, { "city": "汉寿", "initial": "H", "id": "06669630483777562" }, { "city": "赫山区", "initial": "H", "id": "03789462567677804" }, { "city": "华容", "initial": "H", "id": "013946697440783518" }, { "city": "怀化", "initial": "H", "id": "035866726676724703" }, { "city": "洪江", "initial": "H", "id": "01806308652532258" }, { "city": "花垣", "initial": "H", "id": "09879033911998949" }, { "city": "花溪", "initial": "H", "id": "03398297597381883" }, { "city": "汇川", "initial": "H", "id": "06762338578981684" }, { "city": "红花岗", "initial": "H", "id": "05218295671002542" }, { "city": "惠水", "initial": "H", "id": "011238632403011639" }, { "city": "黄平", "initial": "H", "id": "028857494412242946" }, { "city": "赫章", "initial": "H", "id": "08793896575222957" }, { "city": "华蓥", "initial": "H", "id": "05336747459271993" }, { "city": "合江", "initial": "H", "id": "07387381499228043" }, { "city": "洪雅", "initial": "H", "id": "047328756738854505" }, { "city": "汉源", "initial": "H", "id": "09702084556000865" }, { "city": "黑水", "initial": "H", "id": "0598693079193831" }, { "city": "红原", "initial": "H", "id": "09609694097304717" }, { "city": "花都", "initial": "H", "id": "07758242193253531" }, { "city": "惠州", "initial": "H", "id": "048730588300632105" }, { "city": "惠阳", "initial": "H", "id": "04529483157243954" }, { "city": "惠东", "initial": "H", "id": "0994629562339419" }, { "city": "怀集", "initial": "H", "id": "06516380123072305" }, { "city": "鹤山", "initial": "H", "id": "01566236821355511" }, { "city": "河源", "initial": "H", "id": "08634795486522557" }, { "city": "和平", "initial": "H", "id": "05050595793843617" }, { "city": "惠来", "initial": "H", "id": "018615896326145198" }, { "city": "化州", "initial": "H", "id": "04723624629343035" }, { "city": "海丰", "initial": "H", "id": "07317755017656005" }, { "city": "鹤庆", "initial": "H", "id": "06612059166274953" }, { "city": "红河", "initial": "H", "id": "07869282903910861" }, { "city": "华宁", "initial": "H", "id": "03947495263114531" }, { "city": "华坪", "initial": "H", "id": "06561085133464273" }, { "city": "横县", "initial": "H", "id": "04383326786582673" }, { "city": "合山", "initial": "H", "id": "09135010130466545" }, { "city": "贺州", "initial": "H", "id": "04767355267244022" }, { "city": "河池", "initial": "H", "id": "06069332776998451" }, { "city": "环江", "initial": "H", "id": "06103879717913603" }, { "city": "合浦", "initial": "H", "id": "036416455499038003" }, { "city": "海口", "initial": "H", "id": "030138278360503823" }, { "city": "花莲", "initial": "H", "id": "06247464655188748" }, { "city": "嘉定", "initial": "J", "id": "028766212078853126" }, { "city": "金山", "initial": "J", "id": "08158313902343308" }, { "city": "静海", "initial": "J", "id": "02924273086863476" }, { "city": "津南", "initial": "J", "id": "010982454322813906" }, { "city": "蓟县", "initial": "J", "id": "09806905264175487" }, { "city": "江津", "initial": "J", "id": "07895001969997344" }, { "city": "佳木斯", "initial": "J", "id": "08883673061292872" }, { "city": "加格达奇", "initial": "J", "id": "07419367055997854" }, { "city": "嘉荫", "initial": "J", "id": "07743824700990525" }, { "city": "鸡西", "initial": "J", "id": "03217702199327981" }, { "city": "鸡东", "initial": "J", "id": "05715907917035772" }, { "city": "集贤", "initial": "J", "id": "09860020134868446" }, { "city": "九台", "initial": "J", "id": "032704269005600417" }, { "city": "吉林", "initial": "J", "id": "07147795479573649" }, { "city": "蛟河", "initial": "J", "id": "04524286868635292" }, { "city": "集安", "initial": "J", "id": "04226434755567361" }, { "city": "靖宇", "initial": "J", "id": "0756505167795593" }, { "city": "江源", "initial": "J", "id": "09252153520456061" }, { "city": "金州", "initial": "J", "id": "09462444251138995" }, { "city": "锦州", "initial": "J", "id": "012656152200649617" }, { "city": "建平县", "initial": "J", "id": "06231244601889017" }, { "city": "建昌", "initial": "J", "id": "048983003790487856" }, { "city": "集宁", "initial": "J", "id": "0029084958644705727" }, { "city": "吉兰太", "initial": "J", "id": "021437777102632394" }, { "city": "井陉", "initial": "J", "id": "08857623384012265" }, { "city": "晋州", "initial": "J", "id": "08632061527275079" }, { "city": "景县", "initial": "J", "id": "024544161105880846" }, { "city": "冀州", "initial": "J", "id": "08516691975587869" }, { "city": "巨鹿", "initial": "J", "id": "01609636121893343" }, { "city": "鸡泽", "initial": "J", "id": "025361691140729814" }, { "city": "尖草坪区", "initial": "J", "id": "09770031794397489" }, { "city": "晋中", "initial": "J", "id": "08190107163557718" }, { "city": "介休", "initial": "J", "id": "05297683167805083" }, { "city": "晋城", "initial": "J", "id": "0907385306477992" }, { "city": "吉县", "initial": "J", "id": "06267905415845199" }, { "city": "稷山", "initial": "J", "id": "05617642318761498" }, { "city": "绛县", "initial": "J", "id": "06557184708724471" }, { "city": "静乐", "initial": "J", "id": "013205659472892162" }, { "city": "交口", "initial": "J", "id": "026209111138087593" }, { "city": "交城", "initial": "J", "id": "013835447486164743" }, { "city": "泾阳", "initial": "J", "id": "045809009032345704" }, { "city": "佳县", "initial": "J", "id": "07916455077300846" }, { "city": "靖边", "initial": "J", "id": "05431514479864881" }, { "city": "济南", "initial": "J", "id": "010180687333859506" }, { "city": "济阳", "initial": "J", "id": "017369160736994615" }, { "city": "即墨", "initial": "J", "id": "004404471417571498" }, { "city": "胶州", "initial": "J", "id": "02069806780227288" }, { "city": "济宁", "initial": "J", "id": "09455256905887841" }, { "city": "嘉祥", "initial": "J", "id": "09648645001170193" }, { "city": "金乡", "initial": "J", "id": "06427668445504566" }, { "city": "莒南", "initial": "J", "id": "07239953906903649" }, { "city": "鄄城", "initial": "J", "id": "09795226317208718" }, { "city": "巨野", "initial": "J", "id": "07087799168279048" }, { "city": "莒县", "initial": "J", "id": "036823772094613405" }, { "city": "吉木萨尔", "initial": "J", "id": "0537858860318672" }, { "city": "吉木乃", "initial": "J", "id": "03073268734965422" }, { "city": "精河", "initial": "J", "id": "013719380113997426" }, { "city": "江孜", "initial": "J", "id": "01733806210887583" }, { "city": "吉隆", "initial": "J", "id": "012960374394577667" }, { "city": "加查", "initial": "J", "id": "005414452546294091" }, { "city": "江达", "initial": "J", "id": "09925193835597483" }, { "city": "嘉黎", "initial": "J", "id": "06951159344276134" }, { "city": "尖扎", "initial": "J", "id": "07289652984770749" }, { "city": "久治", "initial": "J", "id": "09557781671004599" }, { "city": "泾川", "initial": "J", "id": "009222767762169148" }, { "city": "静宁", "initial": "J", "id": "04906224778826547" }, { "city": "金昌", "initial": "J", "id": "05561185566507942" }, { "city": "酒泉", "initial": "J", "id": "04038694054138958" }, { "city": "金塔", "initial": "J", "id": "03964455692194726" }, { "city": "积石山", "initial": "J", "id": "06299653371886491" }, { "city": "靖远", "initial": "J", "id": "07476383452193058" }, { "city": "景泰", "initial": "J", "id": "036277088892485043" }, { "city": "嘉峪关", "initial": "J", "id": "0608348042134085" }, { "city": "泾源", "initial": "J", "id": "04431798383648913" }, { "city": "郏县", "initial": "J", "id": "05924649288236006" }, { "city": "吉利", "initial": "J", "id": "019830394515465422" }, { "city": "焦作", "initial": "J", "id": "05589359961061449" }, { "city": "济源", "initial": "J", "id": "03270846311096982" }, { "city": "江宁", "initial": "J", "id": "08410986637549449" }, { "city": "江浦", "initial": "J", "id": "02536388255658921" }, { "city": "江阴", "initial": "J", "id": "038966406824747013" }, { "city": "句容", "initial": "J", "id": "04713732751924191" }, { "city": "江都", "initial": "J", "id": "0715604121329044" }, { "city": "建湖", "initial": "J", "id": "08706798543640724" }, { "city": "金湖", "initial": "J", "id": "07432094960960249" }, { "city": "金坛", "initial": "J", "id": "08469589667645774" }, { "city": "姜堰", "initial": "J", "id": "025552131737738804" }, { "city": "靖江", "initial": "J", "id": "0131185794660041" }, { "city": "江夏", "initial": "J", "id": "0965545738898852" }, { "city": "嘉鱼", "initial": "J", "id": "06657450937767007" }, { "city": "荆州", "initial": "J", "id": "09095137506912752" }, { "city": "江陵", "initial": "J", "id": "08737150231600925" }, { "city": "监利", "initial": "J", "id": "03921249080332696" }, { "city": "建始", "initial": "J", "id": "03563929687652674" }, { "city": "荆门", "initial": "J", "id": "005224594949237882" }, { "city": "京山", "initial": "J", "id": "016391003940568472" }, { "city": "建德", "initial": "J", "id": "027888216108425845" }, { "city": "嘉兴", "initial": "J", "id": "0053591009287804026" }, { "city": "嘉善", "initial": "J", "id": "09033738315405353" }, { "city": "椒江", "initial": "J", "id": "08473672764671631" }, { "city": "缙云", "initial": "J", "id": "07574688604867634" }, { "city": "景宁", "initial": "J", "id": "0004456567951738322" }, { "city": "金华", "initial": "J", "id": "09119927864261193" }, { "city": "江山", "initial": "J", "id": "0298750187541283" }, { "city": "界首", "initial": "J", "id": "041171462738812936" }, { "city": "泾县", "initial": "J", "id": "08191350924556047" }, { "city": "旌德", "initial": "J", "id": "05366404439909689" }, { "city": "绩溪", "initial": "J", "id": "09265164427336534" }, { "city": "金寨", "initial": "J", "id": "09321128577835509" }, { "city": "九华山", "initial": "J", "id": "07539298033033797" }, { "city": "晋江", "initial": "J", "id": "045430410621559103" }, { "city": "建宁", "initial": "J", "id": "024979244550960877" }, { "city": "建阳", "initial": "J", "id": "021503718135978134" }, { "city": "建瓯", "initial": "J", "id": "010643459442071768" }, { "city": "进贤", "initial": "J", "id": "030055051356456186" }, { "city": "九江", "initial": "J", "id": "02529115833039155" }, { "city": "金溪", "initial": "J", "id": "05048560532026627" }, { "city": "靖安", "initial": "J", "id": "009509810895184811" }, { "city": "吉安", "initial": "J", "id": "011008502306010493" }, { "city": "吉安县", "initial": "J", "id": "02753927220068293" }, { "city": "吉水", "initial": "J", "id": "04978611936232833" }, { "city": "井冈山", "initial": "J", "id": "06465179285006069" }, { "city": "景德镇", "initial": "J", "id": "027607184535622364" }, { "city": "嘉禾", "initial": "J", "id": "007821334936548574" }, { "city": "津市", "initial": "J", "id": "02889724434013021" }, { "city": "靖州", "initial": "J", "id": "007958403314518514" }, { "city": "江永", "initial": "J", "id": "03135989714669667" }, { "city": "江华", "initial": "J", "id": "04876312896954429" }, { "city": "吉首", "initial": "J", "id": "03749524652212226" }, { "city": "剑河", "initial": "J", "id": "01385705635675505" }, { "city": "锦屏", "initial": "J", "id": "0015458973819720834" }, { "city": "江口", "initial": "J", "id": "07317109024421176" }, { "city": "金沙", "initial": "J", "id": "09169468765151927" }, { "city": "金堂", "initial": "J", "id": "035737744319328657" }, { "city": "江油", "initial": "J", "id": "02681220327085643" }, { "city": "江安", "initial": "J", "id": "018199585322823042" }, { "city": "简阳", "initial": "J", "id": "05376626318510418" }, { "city": "井研", "initial": "J", "id": "04802510808476079" }, { "city": "夹江", "initial": "J", "id": "001769957227606156" }, { "city": "金阳", "initial": "J", "id": "04738633648815789" }, { "city": "九龙", "initial": "J", "id": "07353555083327068" }, { "city": "九寨沟", "initial": "J", "id": "02523699288190211" }, { "city": "金川", "initial": "J", "id": "038605780101163756" }, { "city": "剑阁", "initial": "J", "id": "07294121496015427" }, { "city": "金湾", "initial": "J", "id": "08786733867395038" }, { "city": "江门", "initial": "J", "id": "03422713619372779" }, { "city": "江海", "initial": "J", "id": "06956644344148617" }, { "city": "揭阳", "initial": "J", "id": "05640722218895824" }, { "city": "揭西", "initial": "J", "id": "07684355975838957" }, { "city": "揭东", "initial": "J", "id": "0956598351891303" }, { "city": "晋宁", "initial": "J", "id": "017470941908400617" }, { "city": "剑川", "initial": "J", "id": "07280815784834418" }, { "city": "建水", "initial": "J", "id": "022483528961626975" }, { "city": "金平", "initial": "J", "id": "005004493917085928" }, { "city": "江川", "initial": "J", "id": "09090411048353151" }, { "city": "景谷", "initial": "J", "id": "04938182039393286" }, { "city": "景东", "initial": "J", "id": "013321719903682783" }, { "city": "江城", "initial": "J", "id": "08217969781102148" }, { "city": "景洪", "initial": "J", "id": "05989152469434094" }, { "city": "金秀", "initial": "J", "id": "04739136898083267" }, { "city": "靖西", "initial": "J", "id": "06030725408536259" }, { "city": "嘉义", "initial": "J", "id": "08027938436042579" }, { "city": "开县", "initial": "K", "id": "0567197759058738" }, { "city": "克山", "initial": "K", "id": "09414115925822315" }, { "city": "克东", "initial": "K", "id": "011855618956013902" }, { "city": "康平", "initial": "K", "id": "04899415900014312" }, { "city": "宽甸", "initial": "K", "id": "024211320141602255" }, { "city": "开原", "initial": "K", "id": "08164851668487405" }, { "city": "喀左", "initial": "K", "id": "03244885460980811" }, { "city": "科左中旗", "initial": "K", "id": "0498706962444339" }, { "city": "科左后旗", "initial": "K", "id": "09561209081235615" }, { "city": "开鲁", "initial": "K", "id": "011969357542498638" }, { "city": "库伦", "initial": "K", "id": "0662384009254062" }, { "city": "克什克腾", "initial": "K", "id": "006402404215410828" }, { "city": "喀喇沁", "initial": "K", "id": "021636882430565496" }, { "city": "科右中旗", "initial": "K", "id": "09938514613958549" }, { "city": "科右前旗", "initial": "K", "id": "05503652668227508" }, { "city": "康保", "initial": "K", "id": "010502365058077756" }, { "city": "宽城", "initial": "K", "id": "0025626038596152423" }, { "city": "岢岚", "initial": "K", "id": "016763375195112795" }, { "city": "垦利", "initial": "K", "id": "06828534171786429" }, { "city": "克拉玛依", "initial": "K", "id": "009810237068333616" }, { "city": "库尔勒", "initial": "K", "id": "09652391433138015" }, { "city": "库车", "initial": "K", "id": "04735706069637584" }, { "city": "柯坪", "initial": "K", "id": "069940500745193" }, { "city": "喀什", "initial": "K", "id": "041916814690899407" }, { "city": "奎屯", "initial": "K", "id": "02936711271015726" }, { "city": "康马", "initial": "K", "id": "016977027952700263" }, { "city": "崆峒", "initial": "K", "id": "07319531701720814" }, { "city": "康县", "initial": "K", "id": "08886862236966468" }, { "city": "康乐", "initial": "K", "id": "09432258319658737" }, { "city": "会宁", "initial": "K", "id": "04384542482332974" }, { "city": "开封", "initial": "K", "id": "07507945053067788" }, { "city": "昆山", "initial": "K", "id": "0008856067818159286" }, { "city": "柯桥", "initial": "K", "id": "04463045818486311" }, { "city": "开化", "initial": "K", "id": "0592191317136987" }, { "city": "会昌", "initial": "K", "id": "007319648503994203" }, { "city": "会同", "initial": "K", "id": "08050547816508378" }, { "city": "开阳", "initial": "K", "id": "06074925679328826" }, { "city": "凯里", "initial": "K", "id": "07847102757688729" }, { "city": "开江", "initial": "K", "id": "020155848619518424" }, { "city": "会理", "initial": "K", "id": "044673508806656304" }, { "city": "会东", "initial": "K", "id": "01319149065528602" }, { "city": "康定", "initial": "K", "id": "01348090777979829" }, { "city": "开平", "initial": "K", "id": "07937134152815228" }, { "city": "昆明", "initial": "K", "id": "018257385694692418" }, { "city": "开远", "initial": "K", "id": "0047204718395478906" }, { "city": "会泽", "initial": "K", "id": "036652690059886006" }, { "city": "梁平", "initial": "L", "id": "018878082811529828" }, { "city": "龙江", "initial": "L", "id": "03236623454074956" }, { "city": "林口", "initial": "L", "id": "025572751740682365" }, { "city": "兰西", "initial": "L", "id": "038177047497088146" }, { "city": "林甸", "initial": "L", "id": "02248034337607281" }, { "city": "萝北", "initial": "L", "id": "07424325151168087" }, { "city": "龙井", "initial": "L", "id": "03829956576401128" }, { "city": "梨树", "initial": "L", "id": "007120431452259313" }, { "city": "柳河", "initial": "L", "id": "014222853818863923" }, { "city": "辽源", "initial": "L", "id": "00060620020212822645" }, { "city": "临江", "initial": "L", "id": "043771015562968696" }, { "city": "辽中", "initial": "L", "id": "0683603949671608" }, { "city": "旅顺", "initial": "L", "id": "021806228224052537" }, { "city": "凌海", "initial": "L", "id": "08468079896507501" }, { "city": "辽阳", "initial": "L", "id": "06438060097423015" }, { "city": "辽阳县", "initial": "L", "id": "008455109549354045" }, { "city": "凌源", "initial": "L", "id": "017228705402416655" }, { "city": "凉城", "initial": "L", "id": "017926972097160343" }, { "city": "林西", "initial": "L", "id": "06972298209663887" }, { "city": "临河", "initial": "L", "id": "09561418469313481" }, { "city": "孪井滩", "initial": "L", "id": "06854547377403406" }, { "city": "栾城", "initial": "L", "id": "0058077239049264096" }, { "city": "灵寿", "initial": "L", "id": "00028313918275193473" }, { "city": "鹿泉", "initial": "L", "id": "07452797845148309" }, { "city": "涞源", "initial": "L", "id": "016076082677546233" }, { "city": "蠡县", "initial": "L", "id": "049760032714823166" }, { "city": "涞水", "initial": "L", "id": "08267013969044499" }, { "city": "滦平", "initial": "L", "id": "013408551982090722" }, { "city": "隆化", "initial": "L", "id": "038631012353567296" }, { "city": "滦县", "initial": "L", "id": "01512734818576693" }, { "city": "滦南", "initial": "L", "id": "07910393008849932" }, { "city": "廊坊", "initial": "L", "id": "05879826627872529" }, { "city": "临城", "initial": "L", "id": "039567693100309387" }, { "city": "隆尧", "initial": "L", "id": "03669680553601955" }, { "city": "临西", "initial": "L", "id": "005751919332739952" }, { "city": "临漳", "initial": "L", "id": "07629450583639237" }, { "city": "卢龙", "initial": "L", "id": "06833077035244783" }, { "city": "娄烦", "initial": "L", "id": "08823323000828664" }, { "city": "灵丘", "initial": "L", "id": "045958127964508666" }, { "city": "灵石", "initial": "L", "id": "08742888974694454" }, { "city": "黎城", "initial": "L", "id": "024130113189234592" }, { "city": "潞城", "initial": "L", "id": "02139073751468481" }, { "city": "陵川", "initial": "L", "id": "06180491175272664" }, { "city": "临汾", "initial": "L", "id": "05364283735030848" }, { "city": "临猗", "initial": "L", "id": "06982119897008647" }, { "city": "吕梁", "initial": "L", "id": "026048232224927803" }, { "city": "离石", "initial": "L", "id": "019629224326410855" }, { "city": "临县", "initial": "L", "id": "02652247193026096" }, { "city": "岚县", "initial": "L", "id": "07574631006130801" }, { "city": "柳林", "initial": "L", "id": "08043300995998448" }, { "city": "临潼", "initial": "L", "id": "09607240278162803" }, { "city": "蓝田", "initial": "L", "id": "03944945920894658" }, { "city": "礼泉", "initial": "L", "id": "018919612825036514" }, { "city": "洛川", "initial": "L", "id": "03093736896740653" }, { "city": "洛南", "initial": "L", "id": "010921312416555407" }, { "city": "岚皋", "initial": "L", "id": "0126831906087417" }, { "city": "略阳", "initial": "L", "id": "019496811002362024" }, { "city": "留坝", "initial": "L", "id": "003792203203180633" }, { "city": "麟游", "initial": "L", "id": "07820044923409253" }, { "city": "陇县", "initial": "L", "id": "06967897082432812" }, { "city": "崂山", "initial": "L", "id": "07708000378260038" }, { "city": "莱西", "initial": "L", "id": "029698775173306413" }, { "city": "临淄", "initial": "L", "id": "08964963646751098" }, { "city": "临邑", "initial": "L", "id": "043200233512767805" }, { "city": "陵县", "initial": "L", "id": "07013253295933408" }, { "city": "莱州", "initial": "L", "id": "0511555750867732" }, { "city": "龙口", "initial": "L", "id": "05654636749702031" }, { "city": "莱阳", "initial": "L", "id": "02728091538847164" }, { "city": "临朐", "initial": "L", "id": "006631748850198482" }, { "city": "梁山", "initial": "L", "id": "06236115299828304" }, { "city": "临沂", "initial": "L", "id": "014762541576813293" }, { "city": "兰陵", "initial": "L", "id": "08515324543572729" }, { "city": "临沭", "initial": "L", "id": "045484075623241016" }, { "city": "利津", "initial": "L", "id": "008320976166843552" }, { "city": "莱芜", "initial": "L", "id": "09373130050542284" }, { "city": "聊城", "initial": "L", "id": "09968319251667537" }, { "city": "临清", "initial": "L", "id": "06985165226592456" }, { "city": "轮台", "initial": "L", "id": "09660024824608591" }, { "city": "洛浦", "initial": "L", "id": "08544707044374062" }, { "city": "拉萨", "initial": "L", "id": "05604363305112154" }, { "city": "林周", "initial": "L", "id": "05356571440975542" }, { "city": "拉孜", "initial": "L", "id": "06591908321324618" }, { "city": "浪卡子", "initial": "L", "id": "06443910576925391" }, { "city": "隆子", "initial": "L", "id": "045372243758762076" }, { "city": "洛扎", "initial": "L", "id": "07784182440263407" }, { "city": "林芝", "initial": "L", "id": "09693297904245763" }, { "city": "朗县", "initial": "L", "id": "06788352389080754" }, { "city": "洛隆", "initial": "L", "id": "009721712968984342" }, { "city": "类乌齐", "initial": "L", "id": "014105377276950692" }, { "city": "冷湖", "initial": "L", "id": "03699379577652915" }, { "city": "兰州", "initial": "L", "id": "041695043286784106" }, { "city": "陇西", "initial": "L", "id": "05498980138970133" }, { "city": "临洮", "initial": "L", "id": "040782503619042787" }, { "city": "灵台", "initial": "L", "id": "07181872847998059" }, { "city": "临泽", "initial": "L", "id": "017837535703993668" }, { "city": "礼县", "initial": "L", "id": "008751140740429775" }, { "city": "两当", "initial": "L", "id": "09934666505018714" }, { "city": "临夏", "initial": "L", "id": "09785842199295671" }, { "city": "临潭", "initial": "L", "id": "07097515321262047" }, { "city": "碌曲", "initial": "L", "id": "08892038540260854" }, { "city": "灵武", "initial": "L", "id": "0054558904110873385" }, { "city": "隆德", "initial": "L", "id": "06180158574557597" }, { "city": "林州", "initial": "L", "id": "03197279172094274" }, { "city": "鲁山", "initial": "L", "id": "045057063010037113" }, { "city": "罗山", "initial": "L", "id": "005075248387471687" }, { "city": "兰考", "initial": "L", "id": "0973105124545409" }, { "city": "洛阳", "initial": "L", "id": "008654054589519733" }, { "city": "洛宁", "initial": "L", "id": "05400310368657371" }, { "city": "栾川", "initial": "L", "id": "07314253441510248" }, { "city": "鹿邑", "initial": "L", "id": "00010968671361391014" }, { "city": "临颍", "initial": "L", "id": "07631752716989348" }, { "city": "灵宝", "initial": "L", "id": "008170992180687953" }, { "city": "卢氏", "initial": "L", "id": "0996107586294458" }, { "city": "溧水", "initial": "L", "id": "041310820173280205" }, { "city": "六合", "initial": "L", "id": "04964898317080577" }, { "city": "涟水", "initial": "L", "id": "03286815877196041" }, { "city": "连云港", "initial": "L", "id": "06264905336083133" }, { "city": "溧阳", "initial": "L", "id": "031159114123194986" }, { "city": "老河口", "initial": "L", "id": "020519740544576504" }, { "city": "梁子湖", "initial": "L", "id": "0827204219415711" }, { "city": "罗田", "initial": "L", "id": "016532940132556662" }, { "city": "利川", "initial": "L", "id": "02777303686510977" }, { "city": "来凤", "initial": "L", "id": "06862659533280862" }, { "city": "临安", "initial": "L", "id": "05676057736071045" }, { "city": "临海", "initial": "L", "id": "09002671438561201" }, { "city": "路桥", "initial": "L", "id": "09474873441389711" }, { "city": "丽水", "initial": "L", "id": "08872353412779563" }, { "city": "龙泉", "initial": "L", "id": "02713728734807008" }, { "city": "兰溪", "initial": "L", "id": "08600478679462018" }, { "city": "龙游", "initial": "L", "id": "016791188338072893" }, { "city": "庐江", "initial": "L", "id": "09986074456391487" }, { "city": "灵璧", "initial": "L", "id": "08543392211767984" }, { "city": "临泉", "initial": "L", "id": "023696976927872382" }, { "city": "利辛", "initial": "L", "id": "05895014321736312" }, { "city": "来安", "initial": "L", "id": "08373342753354014" }, { "city": "郎溪", "initial": "L", "id": "0554342613806178" }, { "city": "六安", "initial": "L", "id": "07151908977419119" }, { "city": "罗源", "initial": "L", "id": "02818751073481387" }, { "city": "连江", "initial": "L", "id": "049646879001942024" }, { "city": "荔城", "initial": "L", "id": "04165026596361612" }, { "city": "龙海", "initial": "L", "id": "09989071347301559" }, { "city": "龙岩", "initial": "L", "id": "002403109574907325" }, { "city": "连城", "initial": "L", "id": "06424574465951658" }, { "city": "庐山", "initial": "L", "id": "007116532305384693" }, { "city": "黎川", "initial": "L", "id": "08562261124457995" }, { "city": "龙南", "initial": "L", "id": "0785013540354" }, { "city": "莲花", "initial": "L", "id": "02732261666827216" }, { "city": "芦溪", "initial": "L", "id": "06195144143421527" }, { "city": "浏阳", "initial": "L", "id": "013029093348273313" }, { "city": "醴陵", "initial": "L", "id": "016858522240504414" }, { "city": "耒阳", "initial": "L", "id": "04832046031609818" }, { "city": "临武", "initial": "L", "id": "0170017003940224" }, { "city": "澧县", "initial": "L", "id": "07003328524080064" }, { "city": "临澧", "initial": "L", "id": "05465064626932972" }, { "city": "娄底", "initial": "L", "id": "013212059772764118" }, { "city": "冷水江", "initial": "L", "id": "011709993268011853" }, { "city": "涟源", "initial": "L", "id": "03823452637580935" }, { "city": "隆回", "initial": "L", "id": "06110769802230549" }, { "city": "临湘", "initial": "L", "id": "07464329561135405" }, { "city": "蓝山", "initial": "L", "id": "040796128431381495" }, { "city": "冷水滩", "initial": "L", "id": "012251092276822284" }, { "city": "泸溪", "initial": "L", "id": "09134138962597469" }, { "city": "龙山", "initial": "L", "id": "08230720528187294" }, { "city": "龙里", "initial": "L", "id": "0006782414197451292" }, { "city": "罗甸", "initial": "L", "id": "024211183636245304" }, { "city": "荔波", "initial": "L", "id": "023347182295027147" }, { "city": "雷山", "initial": "L", "id": "025434343093801925" }, { "city": "黎平", "initial": "L", "id": "09172915133973669" }, { "city": "六枝", "initial": "L", "id": "09842558860179575" }, { "city": "龙泉驿", "initial": "L", "id": "015809351169604713" }, { "city": "阆中", "initial": "L", "id": "09392546399496664" }, { "city": "邻水", "initial": "L", "id": "026611733227540224" }, { "city": "泸州", "initial": "L", "id": "03436068170643918" }, { "city": "泸县", "initial": "L", "id": "005290327737902123" }, { "city": "隆昌", "initial": "L", "id": "08082801538428739" }, { "city": "凉山", "initial": "L", "id": "06686381444272331" }, { "city": "雷波", "initial": "L", "id": "05244453259929498" }, { "city": "芦山", "initial": "L", "id": "05152426457398611" }, { "city": "泸定", "initial": "L", "id": "07481208051877215" }, { "city": "炉霍", "initial": "L", "id": "0159982698604187" }, { "city": "理塘", "initial": "L", "id": "009059748672568535" }, { "city": "理县", "initial": "L", "id": "006458202775505617" }, { "city": "罗江", "initial": "L", "id": "019337128484241273" }, { "city": "龙门", "initial": "L", "id": "06912735472120584" }, { "city": "雷州", "initial": "L", "id": "046307272883277784" }, { "city": "廉江", "initial": "L", "id": "08506681989251672" }, { "city": "连平", "initial": "L", "id": "00058454468929618475" }, { "city": "龙川", "initial": "L", "id": "008119155859396732" }, { "city": "连南", "initial": "L", "id": "07313778804227911" }, { "city": "连州", "initial": "L", "id": "09804952590854248" }, { "city": "连山", "initial": "L", "id": "09069448110893856" }, { "city": "罗定", "initial": "L", "id": "0538175684966411" }, { "city": "陆丰", "initial": "L", "id": "010528549139937571" }, { "city": "陆河", "initial": "L", "id": "044867948987962136" }, { "city": "禄劝", "initial": "L", "id": "05477051078917032" }, { "city": "绿春", "initial": "L", "id": "07576739893468365" }, { "city": "泸西", "initial": "L", "id": "07493003856008593" }, { "city": "陆良", "initial": "L", "id": "039088111549702576" }, { "city": "罗平", "initial": "L", "id": "08778168913734627" }, { "city": "龙陵", "initial": "L", "id": "0014073918479714287" }, { "city": "禄丰", "initial": "L", "id": "03139723675393329" }, { "city": "澜沧", "initial": "L", "id": "01997406329316247" }, { "city": "鲁甸", "initial": "L", "id": "05067674461633065" }, { "city": "临沧", "initial": "L", "id": "04215794097588339" }, { "city": "兰坪", "initial": "L", "id": "04435556675702106" }, { "city": "泸水", "initial": "L", "id": "04363090992082903" }, { "city": "六库", "initial": "L", "id": "03666683404250701" }, { "city": "丽江", "initial": "L", "id": "09469847921436172" }, { "city": "陇川", "initial": "L", "id": "046432534163813144" }, { "city": "梁河", "initial": "L", "id": "03448127567921555" }, { "city": "隆安", "initial": "L", "id": "07972088396114445" }, { "city": "龙州", "initial": "L", "id": "025504289339284925" }, { "city": "柳州", "initial": "L", "id": "0991634729527685" }, { "city": "柳城", "initial": "L", "id": "08617751228430115" }, { "city": "鹿寨", "initial": "L", "id": "08330488012700143" }, { "city": "柳江", "initial": "L", "id": "06472206157640374" }, { "city": "来宾", "initial": "L", "id": "003161551539244711" }, { "city": "龙胜", "initial": "L", "id": "04144640632503438" }, { "city": "临桂", "initial": "L", "id": "05361907342371679" }, { "city": "灵川", "initial": "L", "id": "05582111349096641" }, { "city": "荔浦", "initial": "L", "id": "09025416242490956" }, { "city": "陆川", "initial": "L", "id": "0956519444504039" }, { "city": "隆林", "initial": "L", "id": "018788963989371177" }, { "city": "凌云", "initial": "L", "id": "03274968081943199" }, { "city": "灵山", "initial": "L", "id": "06067577475984354" }, { "city": "罗城", "initial": "L", "id": "07446984336877613" }, { "city": "临高", "initial": "L", "id": "07529157591476279" }, { "city": "陵水", "initial": "L", "id": "02587243264039232" }, { "city": "路环岛", "initial": "L", "id": "08339372973162396" }, { "city": "密云", "initial": "M", "id": "0541719380334494" }, { "city": "门头沟", "initial": "M", "id": "06415432541725161" }, { "city": "闵行", "initial": "M", "id": "05943704431063506" }, { "city": "木兰", "initial": "M", "id": "032612483639881296" }, { "city": "牡丹江", "initial": "M", "id": "05184325496273887" }, { "city": "穆棱", "initial": "M", "id": "06071215529553662" }, { "city": "明水", "initial": "M", "id": "06509639263956621" }, { "city": "漠河", "initial": "M", "id": "0837090082992888" }, { "city": "密山", "initial": "M", "id": "0340693321866508" }, { "city": "梅河口", "initial": "M", "id": "022253987949812526" }, { "city": "满都拉", "initial": "M", "id": "06377192176295321" }, { "city": "莫力达瓦", "initial": "M", "id": "009086054680278877" }, { "city": "满洲里", "initial": "M", "id": "09624440278879889" }, { "city": "满城", "initial": "M", "id": "03997522791219841" }, { "city": "孟村", "initial": "M", "id": "0005774450784804541" }, { "city": "米脂", "initial": "M", "id": "040258388652957966" }, { "city": "勉县", "initial": "M", "id": "07681403726088409" }, { "city": "眉县", "initial": "M", "id": "07726594452737319" }, { "city": "牟平", "initial": "M", "id": "04779753629182313" }, { "city": "蒙阴", "initial": "M", "id": "04299877690816738" }, { "city": "莫索湾", "initial": "M", "id": "090138312121396" }, { "city": "米泉", "initial": "M", "id": "031717845651781684" }, { "city": "玛纳斯", "initial": "M", "id": "07019338805893036" }, { "city": "木垒", "initial": "M", "id": "00856852665118244" }, { "city": "麦盖提", "initial": "M", "id": "08903059175659562" }, { "city": "墨玉", "initial": "M", "id": "06857941258655023" }, { "city": "民丰", "initial": "M", "id": "031641572101492144" }, { "city": "墨竹工卡", "initial": "M", "id": "06344171062583526" }, { "city": "米林", "initial": "M", "id": "08131465077485842" }, { "city": "墨脱", "initial": "M", "id": "06101948849122667" }, { "city": "民和", "initial": "M", "id": "009013064886356004" }, { "city": "玛沁", "initial": "M", "id": "017311370741575605" }, { "city": "玛多", "initial": "M", "id": "07830441979386618" }, { "city": "茫崖", "initial": "M", "id": "06437656941904459" }, { "city": "门源", "initial": "M", "id": "0038600758106990485" }, { "city": "岷县", "initial": "M", "id": "034696321870803537" }, { "city": "民勤", "initial": "M", "id": "09296238501594933" }, { "city": "民乐", "initial": "M", "id": "0049715169472374976" }, { "city": "麦积", "initial": "M", "id": "06736090295896364" }, { "city": "玛曲", "initial": "M", "id": "09309759283582779" }, { "city": "孟津", "initial": "M", "id": "01742229723709503" }, { "city": "民权", "initial": "M", "id": "08656392530239703" }, { "city": "孟州", "initial": "M", "id": "09029648573680711" }, { "city": "泌阳", "initial": "M", "id": "09339237619207958" }, { "city": "麻城", "initial": "M", "id": "08287713716935436" }, { "city": "茅箭", "initial": "M", "id": "018824194350559154" }, { "city": "马鞍山", "initial": "M", "id": "06979612199370682" }, { "city": "蒙城", "initial": "M", "id": "065272753480124" }, { "city": "明光", "initial": "M", "id": "0509271620618599" }, { "city": "闽清", "initial": "M", "id": "044682451348599006" }, { "city": "闽侯", "initial": "M", "id": "011674981332537704" }, { "city": "明溪", "initial": "M", "id": "07325456993593855" }, { "city": "汨罗", "initial": "M", "id": "01987433732109647" }, { "city": "麻阳", "initial": "M", "id": "03862477253975083" }, { "city": "湄潭", "initial": "M", "id": "043042765893555157" }, { "city": "麻江", "initial": "M", "id": "08881888320579938" }, { "city": "米易", "initial": "M", "id": "04800177992698622" }, { "city": "绵阳", "initial": "M", "id": "06587635191100976" }, { "city": "沐川", "initial": "M", "id": "033983912526657334" }, { "city": "马边", "initial": "M", "id": "03685989122018092" }, { "city": "眉山", "initial": "M", "id": "027080620910633235" }, { "city": "木里", "initial": "M", "id": "011935297356807495" }, { "city": "冕宁", "initial": "M", "id": "04693622015041472" }, { "city": "美姑", "initial": "M", "id": "00366643830974589" }, { "city": "名山", "initial": "M", "id": "015444526619097498" }, { "city": "茂县", "initial": "M", "id": "013797476401167375" }, { "city": "马尔康", "initial": "M", "id": "06655066993498906" }, { "city": "绵竹", "initial": "M", "id": "04966811851168964" }, { "city": "梅州", "initial": "M", "id": "09975107471129607" }, { "city": "梅县", "initial": "M", "id": "07111790310918118" }, { "city": "麻章", "initial": "M", "id": "007661254352551916" }, { "city": "茂名", "initial": "M", "id": "04580817755410127" }, { "city": "茂港", "initial": "M", "id": "07033906150093423" }, { "city": "弥渡", "initial": "M", "id": "02987053821483432" }, { "city": "弥勒", "initial": "M", "id": "06986801938798108" }, { "city": "蒙自", "initial": "M", "id": "048521692887115586" }, { "city": "马龙", "initial": "M", "id": "05219040465153277" }, { "city": "马关", "initial": "M", "id": "037358369386939216" }, { "city": "麻栗坡", "initial": "M", "id": "041351459049649875" }, { "city": "牟定", "initial": "M", "id": "031725534050127013" }, { "city": "墨江", "initial": "M", "id": "09811950284017561" }, { "city": "孟连", "initial": "M", "id": "09862880184659237" }, { "city": "勐海", "initial": "M", "id": "047273117109538965" }, { "city": "勐腊", "initial": "M", "id": "09388694864716529" }, { "city": "马山", "initial": "M", "id": "012883439829555665" }, { "city": "蒙山", "initial": "M", "id": "008765792660528704" }, { "city": "苗栗", "initial": "M", "id": "023810794910695288" }, { "city": "宁河", "initial": "N", "id": "014288945129967678" }, { "city": "南川", "initial": "N", "id": "0637306251313982" }, { "city": "讷河", "initial": "N", "id": "02030724057289539" }, { "city": "宁安", "initial": "N", "id": "036649825334878905" }, { "city": "嫩江", "initial": "N", "id": "007242505517752829" }, { "city": "农安", "initial": "N", "id": "05178916219375187" }, { "city": "奈曼", "initial": "N", "id": "007103882859470101" }, { "city": "宁城", "initial": "N", "id": "07599245336141802" }, { "city": "那仁宝力格", "initial": "N", "id": "031187116606223286" }, { "city": "南皮", "initial": "N", "id": "06557331265718216" }, { "city": "内丘", "initial": "N", "id": "029940276051704506" }, { "city": "南和", "initial": "N", "id": "0849136231845049" }, { "city": "宁晋", "initial": "N", "id": "01373783640307149" }, { "city": "南宫", "initial": "N", "id": "02601382250998612" }, { "city": "宁武", "initial": "N", "id": "034654930651204885" }, { "city": "宁陕", "initial": "N", "id": "0724453420657575" }, { "city": "宁强", "initial": "N", "id": "05864244391721749" }, { "city": "南郑", "initial": "N", "id": "010282430513633245" }, { "city": "宁津", "initial": "N", "id": "07340161203408366" }, { "city": "宁阳", "initial": "N", "id": "04147142507807431" }, { "city": "尼勒克", "initial": "N", "id": "018518993370347392" }, { "city": "尼木", "initial": "N", "id": "012201288896521567" }, { "city": "南木林", "initial": "N", "id": "06912152027521128" }, { "city": "聂拉木", "initial": "N", "id": "0798240937736453" }, { "city": "乃东", "initial": "N", "id": "04698116141388857" }, { "city": "那曲", "initial": "N", "id": "035048833041985783" }, { "city": "尼玛", "initial": "N", "id": "06590066693557748" }, { "city": "聂荣", "initial": "N", "id": "021489936640994478" }, { "city": "囊谦", "initial": "N", "id": "09267021425832762" }, { "city": "宁县", "initial": "N", "id": "027207406863502315" }, { "city": "内黄", "initial": "N", "id": "032277357544316243" }, { "city": "南阳", "initial": "N", "id": "07041429012488003" }, { "city": "南召", "initial": "N", "id": "039655555464826686" }, { "city": "内乡", "initial": "N", "id": "09796270368144231" }, { "city": "宁陵", "initial": "N", "id": "041502446943931015" }, { "city": "南乐", "initial": "N", "id": "038777026990602037" }, { "city": "南京", "initial": "N", "id": "03961575241885389" }, { "city": "南通", "initial": "N", "id": "018557442541157787" }, { "city": "南漳", "initial": "N", "id": "07509803296782147" }, { "city": "宁波", "initial": "N", "id": "04797665111325584" }, { "city": "宁海", "initial": "N", "id": "020001586346510902" }, { "city": "南陵", "initial": "N", "id": "06669724671521486" }, { "city": "宁国", "initial": "N", "id": "09962719988637532" }, { "city": "宁德", "initial": "N", "id": "07754785996665274" }, { "city": "南安", "initial": "N", "id": "0010575824180318216" }, { "city": "南靖", "initial": "N", "id": "020773824970869037" }, { "city": "宁化", "initial": "N", "id": "07577467063554149" }, { "city": "南平", "initial": "N", "id": "02928442634006716" }, { "city": "南昌", "initial": "N", "id": "03749005037509392" }, { "city": "南昌县", "initial": "N", "id": "033788379487440356" }, { "city": "南城", "initial": "N", "id": "03516342154473515" }, { "city": "南丰", "initial": "N", "id": "021857817639973387" }, { "city": "宁冈", "initial": "N", "id": "022232196470958332" }, { "city": "南康", "initial": "N", "id": "039529385032041753" }, { "city": "宁都", "initial": "N", "id": "06185526066826377" }, { "city": "宁乡", "initial": "N", "id": "08949493313785417" }, { "city": "南岳", "initial": "N", "id": "06817247912635218" }, { "city": "南县", "initial": "N", "id": "016245627494508064" }, { "city": "宁远", "initial": "N", "id": "04672399903780933" }, { "city": "南明", "initial": "N", "id": "03056631520801172" }, { "city": "纳雍", "initial": "N", "id": "019735055839984939" }, { "city": "南充", "initial": "N", "id": "02899400869067055" }, { "city": "南部", "initial": "N", "id": "05875702503907734" }, { "city": "南江", "initial": "N", "id": "00887295616677477" }, { "city": "纳溪", "initial": "N", "id": "00031115831538093275" }, { "city": "南溪", "initial": "N", "id": "04398839299628554" }, { "city": "内江", "initial": "N", "id": "03530096781262093" }, { "city": "宁南", "initial": "N", "id": "09915906142139683" }, { "city": "南雄", "initial": "N", "id": "08277981219450141" }, { "city": "南澳", "initial": "N", "id": "09184891314793817" }, { "city": "南海", "initial": "N", "id": "0008656235743355056" }, { "city": "南涧", "initial": "N", "id": "07423384210856119" }, { "city": "南华", "initial": "N", "id": "09440235006427344" }, { "city": "宁洱", "initial": "N", "id": "029170387521411145" }, { "city": "怒江", "initial": "N", "id": "06894087490345167" }, { "city": "宁蒗", "initial": "N", "id": "09348947031205563" }, { "city": "南宁", "initial": "N", "id": "04961936655622654" }, { "city": "宁明", "initial": "N", "id": "03730139999260935" }, { "city": "那坡", "initial": "N", "id": "09768037603148254" }, { "city": "南丹", "initial": "N", "id": "03073262457101138" }, { "city": "南沙", "initial": "N", "id": "07354619956810595" }, { "city": "南投", "initial": "N", "id": "0531880773005478" }, { "city": "平谷", "initial": "P", "id": "04106751549017409" }, { "city": "浦东新区", "initial": "P", "id": "07922505637619106" }, { "city": "彭水", "initial": "P", "id": "0351210208239469" }, { "city": "磐石", "initial": "P", "id": "013886933991921113" }, { "city": "普兰店", "initial": "P", "id": "0030187620704618112" }, { "city": "盘锦", "initial": "P", "id": "04781288333232103" }, { "city": "盘山", "initial": "P", "id": "03233013295133724" }, { "city": "平山", "initial": "P", "id": "027150204243831055" }, { "city": "平泉", "initial": "P", "id": "031558842318624913" }, { "city": "泊头", "initial": "P", "id": "022082304881732773" }, { "city": "平乡", "initial": "P", "id": "035363696448058923" }, { "city": "平定", "initial": "P", "id": "013072377410236125" }, { "city": "平遥", "initial": "P", "id": "06769908981044643" }, { "city": "平顺", "initial": "P", "id": "005701779791417061" }, { "city": "蒲县", "initial": "P", "id": "015393113901432032" }, { "city": "平陆", "initial": "P", "id": "02142529980776049" }, { "city": "平鲁", "initial": "P", "id": "008444881341729849" }, { "city": "偏关", "initial": "P", "id": "05548550402888119" }, { "city": "繁峙", "initial": "P", "id": "048307741369636603" }, { "city": "蒲城", "initial": "P", "id": "05128441817837273" }, { "city": "平利", "initial": "P", "id": "0974810626032445" }, { "city": "平阴", "initial": "P", "id": "02809994237192317" }, { "city": "平度", "initial": "P", "id": "06615889145809937" }, { "city": "平原", "initial": "P", "id": "03699825471264324" }, { "city": "蓬莱", "initial": "P", "id": "06362062293312967" }, { "city": "平邑", "initial": "P", "id": "08262311598109056" }, { "city": "炮台", "initial": "P", "id": "0719975155883344" }, { "city": "皮山", "initial": "P", "id": "007396978762893847" }, { "city": "帕里", "initial": "P", "id": "07110801002308493" }, { "city": "普兰", "initial": "P", "id": "09410796775689905" }, { "city": "平安", "initial": "P", "id": "09509198689705931" }, { "city": "平凉", "initial": "P", "id": "05204766328070247" }, { "city": "平川", "initial": "P", "id": "05987167748244309" }, { "city": "平罗", "initial": "P", "id": "05185457557454636" }, { "city": "彭阳", "initial": "P", "id": "06001585740072313" }, { "city": "平顶山", "initial": "P", "id": "029078938804430043" }, { "city": "濮阳", "initial": "P", "id": "07007337803779619" }, { "city": "平舆", "initial": "P", "id": "008184720653641397" }, { "city": "浦口", "initial": "P", "id": "038382093655229066" }, { "city": "沛县", "initial": "P", "id": "042981721911968473" }, { "city": "邳州", "initial": "P", "id": "06482450651527814" }, { "city": "平湖", "initial": "P", "id": "011427826705082045" }, { "city": "平阳", "initial": "P", "id": "021670104220387865" }, { "city": "浦江", "initial": "P", "id": "06974123926637559" }, { "city": "磐安", "initial": "P", "id": "06438584081135519" }, { "city": "普陀", "initial": "P", "id": "024994969985443238" }, { "city": "繁昌", "initial": "P", "id": "0316940489091023" }, { "city": "潘集", "initial": "P", "id": "0888255399493274" }, { "city": "平潭", "initial": "P", "id": "0032638297709731035" }, { "city": "屏南", "initial": "P", "id": "04940586991823057" }, { "city": "莆田", "initial": "P", "id": "05839752404846985" }, { "city": "平和", "initial": "P", "id": "03526254038959997" }, { "city": "浦城", "initial": "P", "id": "038538277273635835" }, { "city": "彭泽", "initial": "P", "id": "049080214088861895" }, { "city": "鄱阳", "initial": "P", "id": "012897472544809574" }, { "city": "萍乡", "initial": "P", "id": "037042143211858325" }, { "city": "平江", "initial": "P", "id": "08005172563401248" }, { "city": "普定", "initial": "P", "id": "06226776145322221" }, { "city": "平坝", "initial": "P", "id": "03896466656196518" }, { "city": "平塘", "initial": "P", "id": "02988483754870457" }, { "city": "盘县", "initial": "P", "id": "02851762998981877" }, { "city": "普安", "initial": "P", "id": "011552102380976681" }, { "city": "郫县", "initial": "P", "id": "06225790790950774" }, { "city": "蒲江", "initial": "P", "id": "02104821742746137" }, { "city": "彭州", "initial": "P", "id": "0934139247363833" }, { "city": "攀枝花", "initial": "P", "id": "023699665678086324" }, { "city": "平武", "initial": "P", "id": "0330568034705907" }, { "city": "蓬安", "initial": "P", "id": "010437524329390402" }, { "city": "蓬溪", "initial": "P", "id": "03657825712526148" }, { "city": "平昌", "initial": "P", "id": "026308663123539255" }, { "city": "屏山", "initial": "P", "id": "030545847974115836" }, { "city": "彭山", "initial": "P", "id": "04092813555679915" }, { "city": "普格", "initial": "P", "id": "006859725139329265" }, { "city": "番禺", "initial": "P", "id": "093806078304649" }, { "city": "平远", "initial": "P", "id": "027666298219770113" }, { "city": "坡头", "initial": "P", "id": "07845343050893749" }, { "city": "蓬江", "initial": "P", "id": "07665280369429703" }, { "city": "普宁", "initial": "P", "id": "07360140511318569" }, { "city": "屏边", "initial": "P", "id": "021417155977763236" }, { "city": "普洱", "initial": "P", "id": "0585178196219889" }, { "city": "凭祥", "initial": "P", "id": "06102165731299594" }, { "city": "平乐", "initial": "P", "id": "05272302002341271" }, { "city": "平南", "initial": "P", "id": "03138862878537052" }, { "city": "平果", "initial": "P", "id": "02726806895348819" }, { "city": "浦北", "initial": "P", "id": "037740775430205464" }, { "city": "屏东", "initial": "P", "id": "07135459879070267" }, { "city": "青浦", "initial": "Q", "id": "06133470279456885" }, { "city": "黔江", "initial": "Q", "id": "026690690901731995" }, { "city": "綦江", "initial": "Q", "id": "08797057577503726" }, { "city": "齐齐哈尔", "initial": "Q", "id": "019592124957401702" }, { "city": "青冈", "initial": "Q", "id": "05776985637676693" }, { "city": "庆安", "initial": "Q", "id": "0928786847164573" }, { "city": "七台河", "initial": "Q", "id": "06634829326303426" }, { "city": "乾安", "initial": "Q", "id": "05812610536470899" }, { "city": "前郭", "initial": "Q", "id": "06608180881076653" }, { "city": "清原", "initial": "Q", "id": "06837431920287658" }, { "city": "清水河", "initial": "Q", "id": "01422938982391646" }, { "city": "青龙山", "initial": "Q", "id": "03128666092416681" }, { "city": "曲阳", "initial": "Q", "id": "08182227954281123" }, { "city": "清苑", "initial": "Q", "id": "0774607219234364" }, { "city": "迁西", "initial": "Q", "id": "028984349490419237" }, { "city": "迁安", "initial": "Q", "id": "08402305865399655" }, { "city": "青县", "initial": "Q", "id": "0014631947736889028" }, { "city": "清河", "initial": "Q", "id": "018779946232396094" }, { "city": "邱县", "initial": "Q", "id": "07549424646105338" }, { "city": "曲周", "initial": "Q", "id": "04967371819441242" }, { "city": "秦皇岛", "initial": "Q", "id": "033242634546372396" }, { "city": "青龙", "initial": "Q", "id": "033062272590189457" }, { "city": "清徐", "initial": "Q", "id": "027861205986152004" }, { "city": "祁县", "initial": "Q", "id": "05141761922039869" }, { "city": "沁县", "initial": "Q", "id": "08962832307678139" }, { "city": "沁源", "initial": "Q", "id": "08880049478839787" }, { "city": "沁水", "initial": "Q", "id": "010699032836568545" }, { "city": "曲沃", "initial": "Q", "id": "06465324530498631" }, { "city": "乾县", "initial": "Q", "id": "06001072268045897" }, { "city": "清涧", "initial": "Q", "id": "05239714424561208" }, { "city": "千阳", "initial": "Q", "id": "07238957311378247" }, { "city": "岐山", "initial": "Q", "id": "023670311917646103" }, { "city": "青岛", "initial": "Q", "id": "003358885841109216" }, { "city": "齐河", "initial": "Q", "id": "010513522411802634" }, { "city": "庆云", "initial": "Q", "id": "029414243289373365" }, { "city": "青州", "initial": "Q", "id": "03665681645147332" }, { "city": "曲阜", "initial": "Q", "id": "05079274202955124" }, { "city": "奇台", "initial": "Q", "id": "04962968981638305" }, { "city": "且末", "initial": "Q", "id": "002257486971618472" }, { "city": "伽师", "initial": "Q", "id": "04226896110676004" }, { "city": "青河", "initial": "Q", "id": "0643531441451936" }, { "city": "曲水", "initial": "Q", "id": "07875449550934299" }, { "city": "琼结", "initial": "Q", "id": "016108160662858517" }, { "city": "曲松", "initial": "Q", "id": "02939851923132504" }, { "city": "曲麻莱", "initial": "Q", "id": "06829889568997014" }, { "city": "祁连", "initial": "Q", "id": "09772585966503906" }, { "city": "庆阳", "initial": "Q", "id": "06584279209180901" }, { "city": "庆城", "initial": "Q", "id": "08864160620938522" }, { "city": "清水", "initial": "Q", "id": "04309219874946808" }, { "city": "秦安", "initial": "Q", "id": "05515541731603879" }, { "city": "青铜峡", "initial": "Q", "id": "07268767166207779" }, { "city": "杞县", "initial": "Q", "id": "09234754707715387" }, { "city": "沁阳", "initial": "Q", "id": "09690459193494172" }, { "city": "淇县", "initial": "Q", "id": "03857501774421337" }, { "city": "清丰", "initial": "Q", "id": "03153274763596401" }, { "city": "确山", "initial": "Q", "id": "0896615196937748" }, { "city": "启东", "initial": "Q", "id": "018029959525357753" }, { "city": "蕲春", "initial": "Q", "id": "011090677047565256" }, { "city": "潜江", "initial": "Q", "id": "05419679139937268" }, { "city": "青田", "initial": "Q", "id": "035219867323760723" }, { "city": "庆元", "initial": "Q", "id": "01672282056188239" }, { "city": "衢州", "initial": "Q", "id": "045418213610753133" }, { "city": "衢江", "initial": "Q", "id": "014003907027348106" }, { "city": "潜山", "initial": "Q", "id": "009544404712880228" }, { "city": "祁门", "initial": "Q", "id": "029619491526962194" }, { "city": "全椒", "initial": "Q", "id": "0003054143568750556" }, { "city": "青阳", "initial": "Q", "id": "06979131164790076" }, { "city": "泉州", "initial": "Q", "id": "06891811352697659" }, { "city": "清流", "initial": "Q", "id": "047569674245406945" }, { "city": "将乐", "initial": "Q", "id": "04307804101742103" }, { "city": "铅山", "initial": "Q", "id": "04332985335516457" }, { "city": "全南", "initial": "Q", "id": "00025927888497705442" }, { "city": "祁东", "initial": "Q", "id": "0011460498994833035" }, { "city": "祁阳", "initial": "Q", "id": "016143909634674158" }, { "city": "清镇", "initial": "Q", "id": "07821803793893067" }, { "city": "黔西", "initial": "Q", "id": "08147062387025135" }, { "city": "晴隆", "initial": "Q", "id": "04640224912347177" }, { "city": "邛崃", "initial": "Q", "id": "047629070942384977" }, { "city": "青白江", "initial": "Q", "id": "03061383979552763" }, { "city": "渠县", "initial": "Q", "id": "09210116436916544" }, { "city": "犍为", "initial": "Q", "id": "06291997883157812" }, { "city": "青神", "initial": "Q", "id": "03041879152052078" }, { "city": "青川", "initial": "Q", "id": "006208138870265212" }, { "city": "曲江", "initial": "Q", "id": "047682079103458674" }, { "city": "蕉岭", "initial": "Q", "id": "0844171707503452" }, { "city": "清远", "initial": "Q", "id": "05994208838695079" }, { "city": "清新", "initial": "Q", "id": "03044719781678882" }, { "city": "曲靖", "initial": "Q", "id": "03908341039805925" }, { "city": "丘北", "initial": "Q", "id": "005339303054208533" }, { "city": "巧家", "initial": "Q", "id": "07666915237915051" }, { "city": "全州", "initial": "Q", "id": "00035193412661835843" }, { "city": "钦州", "initial": "Q", "id": "06045216342984656" }, { "city": "琼中", "initial": "Q", "id": "09729349493335384" }, { "city": "琼海", "initial": "Q", "id": "03792978696010949" }, { "city": "荣昌", "initial": "R", "id": "0789123356355862" }, { "city": "饶河", "initial": "R", "id": "027877004824687823" }, { "city": "容城", "initial": "R", "id": "09888378867792547" }, { "city": "任丘", "initial": "R", "id": "00445947278325336" }, { "city": "饶阳", "initial": "R", "id": "05217363825680517" }, { "city": "任县", "initial": "R", "id": "0771678805510686" }, { "city": "芮城", "initial": "R", "id": "03423627705957706" }, { "city": "荣成", "initial": "R", "id": "05636000822669585" }, { "city": "乳山", "initial": "R", "id": "03836516404002128" }, { "city": "日照", "initial": "R", "id": "09065686524673446" }, { "city": "若羌", "initial": "R", "id": "07371500801873614" }, { "city": "日喀则", "initial": "R", "id": "028661910793071343" }, { "city": "仁布", "initial": "R", "id": "08616824700678052" }, { "city": "日土", "initial": "R", "id": "09353893912658788" }, { "city": "汝州", "initial": "R", "id": "05526743592779655" }, { "city": "汝阳", "initial": "R", "id": "05672628135909283" }, { "city": "汝南", "initial": "R", "id": "05979023185368195" }, { "city": "如皋", "initial": "R", "id": "04133513412508467" }, { "city": "如东", "initial": "R", "id": "046364464852293885" }, { "city": "瑞安", "initial": "R", "id": "038677097774040625" }, { "city": "瑞昌", "initial": "R", "id": "07246318299180703" }, { "city": "瑞金", "initial": "R", "id": "019361201049457977" }, { "city": "汝城", "initial": "R", "id": "05847867504959485" }, { "city": "仁怀", "initial": "R", "id": "06209061570282446" }, { "city": "榕江", "initial": "R", "id": "070883460371434" }, { "city": "仁和", "initial": "R", "id": "02058067337752132" }, { "city": "荣县", "initial": "R", "id": "08840676274883124" }, { "city": "仁寿", "initial": "R", "id": "0705690824484245" }, { "city": "壤塘", "initial": "R", "id": "05822242787733944" }, { "city": "若尔盖", "initial": "R", "id": "0308538581523669" }, { "city": "乳源", "initial": "R", "id": "09948782812878552" }, { "city": "仁化", "initial": "R", "id": "0445886342744398" }, { "city": "饶平", "initial": "R", "id": "06499595833226208" }, { "city": "瑞丽", "initial": "R", "id": "09571223381850398" }, { "city": "融安", "initial": "R", "id": "0018504221043458058" }, { "city": "融水", "initial": "R", "id": "09676447276823517" }, { "city": "容县", "initial": "R", "id": "03643934181717994" }, { "city": "顺义", "initial": "S", "id": "008730854952748124" }, { "city": "石景山", "initial": "S", "id": "025461289214640437" }, { "city": "上海", "initial": "S", "id": "04808824276928185" }, { "city": "松江", "initial": "S", "id": "09731325821423915" }, { "city": "石柱", "initial": "S", "id": "06799586554227122" }, { "city": "双城", "initial": "S", "id": "0041665276747922864" }, { "city": "尚志", "initial": "S", "id": "0733408233659123" }, { "city": "绥芬河", "initial": "S", "id": "05152947882295396" }, { "city": "绥化", "initial": "S", "id": "042103476567403475" }, { "city": "绥棱", "initial": "S", "id": "07971413440518165" }, { "city": "孙吴", "initial": "S", "id": "08919894760629865" }, { "city": "绥滨", "initial": "S", "id": "08547954722923994" }, { "city": "双鸭山", "initial": "S", "id": "08907913587601881" }, { "city": "双阳", "initial": "S", "id": "01409815810044064" }, { "city": "舒兰", "initial": "S", "id": "07425438734075673" }, { "city": "四平", "initial": "S", "id": "0961488977319096" }, { "city": "双辽", "initial": "S", "id": "08754862855543537" }, { "city": "松原", "initial": "S", "id": "005870533319982152" }, { "city": "沈阳", "initial": "S", "id": "09322395252617661" }, { "city": "绥中", "initial": "S", "id": "08597271307070078" }, { "city": "赛罕", "initial": "S", "id": "0983888460948753" }, { "city": "商都", "initial": "S", "id": "021249775074464705" }, { "city": "四子王旗", "initial": "S", "id": "06126221608709561" }, { "city": "舍伯吐", "initial": "S", "id": "07275635308241444" }, { "city": "苏左旗", "initial": "S", "id": "09021751937711147" }, { "city": "苏右旗", "initial": "S", "id": "09418210992965284" }, { "city": "索伦", "initial": "S", "id": "08446588023629613" }, { "city": "石家庄", "initial": "S", "id": "09341729246452881" }, { "city": "深泽", "initial": "S", "id": "05172253062262284" }, { "city": "顺平", "initial": "S", "id": "010794269085360564" }, { "city": "尚义", "initial": "S", "id": "019033082176946703" }, { "city": "三河", "initial": "S", "id": "005791070458094305" }, { "city": "肃宁", "initial": "S", "id": "03254820715965179" }, { "city": "深州", "initial": "S", "id": "049101880736383796" }, { "city": "沙河", "initial": "S", "id": "0627637717204063" }, { "city": "涉县", "initial": "S", "id": "0573780120800756" }, { "city": "寿阳", "initial": "S", "id": "017502053930438444" }, { "city": "朔州", "initial": "S", "id": "010541226600570841" }, { "city": "山阴", "initial": "S", "id": "07650669076833505" }, { "city": "神池", "initial": "S", "id": "09892009341014247" }, { "city": "石楼", "initial": "S", "id": "06119149594010045" }, { "city": "三原", "initial": "S", "id": "09755427083854864" }, { "city": "神木", "initial": "S", "id": "00995244617158706" }, { "city": "绥德", "initial": "S", "id": "07468701590585942" }, { "city": "商洛", "initial": "S", "id": "04589762470430916" }, { "city": "商州", "initial": "S", "id": "08290868210340416" }, { "city": "商南", "initial": "S", "id": "09277287098064819" }, { "city": "山阳", "initial": "S", "id": "09444938527289171" }, { "city": "石泉", "initial": "S", "id": "05679862172685093" }, { "city": "商河", "initial": "S", "id": "08192879492554315" }, { "city": "寿光", "initial": "S", "id": "09188814816064756" }, { "city": "泗水", "initial": "S", "id": "05541593767677826" }, { "city": "单县", "initial": "S", "id": "018365429935503452" }, { "city": "石岛", "initial": "S", "id": "034882741776377646" }, { "city": "莘县", "initial": "S", "id": "0014376549320736176" }, { "city": "石河子", "initial": "S", "id": "012380685560469007" }, { "city": "鄯善", "initial": "S", "id": "03590380939973281" }, { "city": "沙雅", "initial": "S", "id": "09026795457770849" }, { "city": "莎车", "initial": "S", "id": "0732086413548567" }, { "city": "疏附", "initial": "S", "id": "048342302434682427" }, { "city": "疏勒", "initial": "S", "id": "07939680973565604" }, { "city": "沙湾", "initial": "S", "id": "05729990185668747" }, { "city": "萨嘎", "initial": "S", "id": "07301225663609128" }, { "city": "萨迦", "initial": "S", "id": "030502279366507823" }, { "city": "山南", "initial": "S", "id": "0584434373256115" }, { "city": "桑日", "initial": "S", "id": "041668235090616124" }, { "city": "索县", "initial": "S", "id": "09562731654383774" }, { "city": "双湖", "initial": "S", "id": "044269224143500385" }, { "city": "申扎", "initial": "S", "id": "07437188971796007" }, { "city": "狮泉河", "initial": "S", "id": "010400564367640275" }, { "city": "肃南", "initial": "S", "id": "008266481683939575" }, { "city": "山丹", "initial": "S", "id": "06647268897410137" }, { "city": "肃北", "initial": "S", "id": "08332278003017759" }, { "city": "石嘴山", "initial": "S", "id": "04775241080156618" }, { "city": "上街", "initial": "S", "id": "05472191447219248" }, { "city": "石龙", "initial": "S", "id": "06541780428154409" }, { "city": "商城", "initial": "S", "id": "00045864386683975855" }, { "city": "社旗", "initial": "S", "id": "013976641051353345" }, { "city": "嵩县", "initial": "S", "id": "09805554874741722" }, { "city": "商丘", "initial": "S", "id": "020589251303663647" }, { "city": "睢县", "initial": "S", "id": "06795433423270714" }, { "city": "商水", "initial": "S", "id": "0029584942782053147" }, { "city": "沈丘", "initial": "S", "id": "05596144426256977" }, { "city": "遂平", "initial": "S", "id": "0022859272855167312" }, { "city": "上蔡", "initial": "S", "id": "013665562450201207" }, { "city": "三门峡", "initial": "S", "id": "0584252941353993" }, { "city": "渑池", "initial": "S", "id": "0899642843148025" }, { "city": "陕县", "initial": "S", "id": "019861350587240278" }, { "city": "苏州", "initial": "S", "id": "05777167184256324" }, { "city": "射阳", "initial": "S", "id": "019978176584267793" }, { "city": "睢宁", "initial": "S", "id": "09528928300462538" }, { "city": "宿迁", "initial": "S", "id": "08060565676190345" }, { "city": "沭阳", "initial": "S", "id": "02722175831364677" }, { "city": "泗阳", "initial": "S", "id": "031025636715315974" }, { "city": "泗洪", "initial": "S", "id": "06932790966828841" }, { "city": "宿豫", "initial": "S", "id": "07330597878790202" }, { "city": "石首", "initial": "S", "id": "08630047858241865" }, { "city": "松滋", "initial": "S", "id": "03307370494156303" }, { "city": "沙市", "initial": "S", "id": "03894877465941733" }, { "city": "三峡", "initial": "S", "id": "05998557891016316" }, { "city": "十堰", "initial": "S", "id": "09921390485158148" }, { "city": "神农架", "initial": "S", "id": "033291407902384273" }, { "city": "随州", "initial": "S", "id": "0033887359872249556" }, { "city": "沙洋", "initial": "S", "id": "0912081098617284" }, { "city": "上虞", "initial": "S", "id": "014878450161202994" }, { "city": "嵊州", "initial": "S", "id": "00223315181602306" }, { "city": "三门", "initial": "S", "id": "09682779510263877" }, { "city": "遂昌", "initial": "S", "id": "05309975636078523" }, { "city": "松阳", "initial": "S", "id": "0707792218010834" }, { "city": "嵊泗", "initial": "S", "id": "01952466331987306" }, { "city": "宿松", "initial": "S", "id": "09671925676169664" }, { "city": "宿州", "initial": "S", "id": "02397196681139504" }, { "city": "泗县", "initial": "S", "id": "0460802613202262" }, { "city": "濉溪", "initial": "S", "id": "0022560012876083668" }, { "city": "寿县", "initial": "S", "id": "008789895879877507" }, { "city": "舒城", "initial": "S", "id": "09891889855602407" }, { "city": "石台", "initial": "S", "id": "08154688125342153" }, { "city": "寿宁", "initial": "S", "id": "08087102402828052" }, { "city": "石狮", "initial": "S", "id": "027195194686842616" }, { "city": "上杭", "initial": "S", "id": "07809166436991546" }, { "city": "三明", "initial": "S", "id": "07909759419469204" }, { "city": "沙县", "initial": "S", "id": "0374515968941739" }, { "city": "顺昌", "initial": "S", "id": "07046264419204034" }, { "city": "邵武", "initial": "S", "id": "07344825538540198" }, { "city": "松溪", "initial": "S", "id": "003376639536365822" }, { "city": "上饶", "initial": "S", "id": "001886528067826565" }, { "city": "上饶县", "initial": "S", "id": "09343789238436135" }, { "city": "上高", "initial": "S", "id": "03535532194767481" }, { "city": "遂川", "initial": "S", "id": "09287915234779969" }, { "city": "上犹", "initial": "S", "id": "019829606187718007" }, { "city": "石城", "initial": "S", "id": "025702008905654816" }, { "city": "上栗", "initial": "S", "id": "02105667064433201" }, { "city": "韶山", "initial": "S", "id": "019978612564313059" }, { "city": "苏仙", "initial": "S", "id": "05884440541554021" }, { "city": "石门", "initial": "S", "id": "09296342092858207" }, { "city": "双峰", "initial": "S", "id": "08594662825303143" }, { "city": "邵阳", "initial": "S", "id": "0910431158076096" }, { "city": "邵东", "initial": "S", "id": "015918744264533835" }, { "city": "绥宁", "initial": "S", "id": "02270872502885024" }, { "city": "邵阳县", "initial": "S", "id": "012725480587619376" }, { "city": "桑植", "initial": "S", "id": "07085251440801348" }, { "city": "双牌", "initial": "S", "id": "039315390383181414" }, { "city": "绥阳", "initial": "S", "id": "012791370628598542" }, { "city": "三都", "initial": "S", "id": "05127786513116872" }, { "city": "施秉", "initial": "S", "id": "0455206526670914" }, { "city": "三穗", "initial": "S", "id": "08146314955078948" }, { "city": "思南", "initial": "S", "id": "05006849624136895" }, { "city": "石阡", "initial": "S", "id": "041626965574544994" }, { "city": "松桃", "initial": "S", "id": "0271901464594712" }, { "city": "水城", "initial": "S", "id": "09608833140436264" }, { "city": "双流", "initial": "S", "id": "04985300380615667" }, { "city": "三台", "initial": "S", "id": "006498638079116881" }, { "city": "遂宁", "initial": "S", "id": "07161550880144631" }, { "city": "射洪", "initial": "S", "id": "06753945832730208" }, { "city": "石棉", "initial": "S", "id": "0048680491196218645" }, { "city": "石渠", "initial": "S", "id": "07524443725131578" }, { "city": "色达", "initial": "S", "id": "018123294132591883" }, { "city": "松潘", "initial": "S", "id": "02939125691576723" }, { "city": "什邡", "initial": "S", "id": "045553202087474975" }, { "city": "韶关", "initial": "S", "id": "08586740603327954" }, { "city": "始兴", "initial": "S", "id": "008873421309571716" }, { "city": "汕头", "initial": "S", "id": "00512256974173404" }, { "city": "深圳", "initial": "S", "id": "05386551012271497" }, { "city": "顺德", "initial": "S", "id": "028284537567251644" }, { "city": "三水", "initial": "S", "id": "024732463221213719" }, { "city": "四会", "initial": "S", "id": "09529510807715005" }, { "city": "遂溪", "initial": "S", "id": "029089331003619967" }, { "city": "汕尾", "initial": "S", "id": "042684848349425564" }, { "city": "石林", "initial": "S", "id": "008734729586945167" }, { "city": "嵩明", "initial": "S", "id": "02019474200326612" }, { "city": "石屏", "initial": "S", "id": "028123448752630087" }, { "city": "师宗", "initial": "S", "id": "08554773278903267" }, { "city": "施甸", "initial": "S", "id": "04442064066674445" }, { "city": "双柏", "initial": "S", "id": "05256906380505737" }, { "city": "绥江", "initial": "S", "id": "06296453549695953" }, { "city": "水富", "initial": "S", "id": "0920861842385353" }, { "city": "双江", "initial": "S", "id": "08571535135842792" }, { "city": "上林", "initial": "S", "id": "05900463297605645" }, { "city": "三江", "initial": "S", "id": "05792764594179343" }, { "city": "上思", "initial": "S", "id": "03643825763464623" }, { "city": "三亚", "initial": "S", "id": "03720668485141734" }, { "city": "通州", "initial": "T", "id": "01092288172145981" }, { "city": "天津", "initial": "T", "id": "07711723318164498" }, { "city": "潼南", "initial": "T", "id": "042494181619747606" }, { "city": "铜梁", "initial": "T", "id": "005898278078014507" }, { "city": "通河", "initial": "T", "id": "031327431505373116" }, { "city": "泰来", "initial": "T", "id": "02474417505681894" }, { "city": "汤原", "initial": "T", "id": "003184315126806325" }, { "city": "同江", "initial": "T", "id": "08610613427786813" }, { "city": "塔河", "initial": "T", "id": "01257586256687313" }, { "city": "铁力", "initial": "T", "id": "01957837140524319" }, { "city": "图们", "initial": "T", "id": "08785333426886188" }, { "city": "通化", "initial": "T", "id": "06042212703182077" }, { "city": "通化县", "initial": "T", "id": "08104050200538973" }, { "city": "洮南", "initial": "T", "id": "08392826329075274" }, { "city": "通榆", "initial": "T", "id": "005648995017100922" }, { "city": "台安", "initial": "T", "id": "01774169787917066" }, { "city": "铁岭", "initial": "T", "id": "042650027836020077" }, { "city": "调兵山", "initial": "T", "id": "07348922578176393" }, { "city": "土左旗", "initial": "T", "id": "06509408542966777" }, { "city": "托县", "initial": "T", "id": "09679895337643931" }, { "city": "土右旗", "initial": "T", "id": "0585300440040236" }, { "city": "通辽", "initial": "T", "id": "08722728186193749" }, { "city": "太仆寺", "initial": "T", "id": "01068932182033604" }, { "city": "图里河", "initial": "T", "id": "04511436083753364" }, { "city": "突泉", "initial": "T", "id": "09588962334547355" }, { "city": "头道湖", "initial": "T", "id": "06468312347677636" }, { "city": "唐县", "initial": "T", "id": "08190906582000834" }, { "city": "唐山", "initial": "T", "id": "08804639300568919" }, { "city": "太原", "initial": "T", "id": "06144769308922455" }, { "city": "天镇", "initial": "T", "id": "05221362668928988" }, { "city": "太谷", "initial": "T", "id": "08090970782689519" }, { "city": "潼关", "initial": "T", "id": "07144608694137222" }, { "city": "太白", "initial": "T", "id": "02580452313878303" }, { "city": "铜川", "initial": "T", "id": "08628805017738359" }, { "city": "泰安", "initial": "T", "id": "0058240232741848086" }, { "city": "郯城", "initial": "T", "id": "07804371114387982" }, { "city": "台儿庄", "initial": "T", "id": "017893549062662162" }, { "city": "滕州", "initial": "T", "id": "040731261998501944" }, { "city": "天池", "initial": "T", "id": "03957111083450553" }, { "city": "吐鲁番", "initial": "T", "id": "09056906406382443" }, { "city": "托克逊", "initial": "T", "id": "013365964779477446" }, { "city": "铁干里克", "initial": "T", "id": "047986382674685935" }, { "city": "塔中", "initial": "T", "id": "07395831244317215" }, { "city": "塔什库尔干", "initial": "T", "id": "07852169197257017" }, { "city": "特克斯", "initial": "T", "id": "010969176658231916" }, { "city": "塔城", "initial": "T", "id": "04060254883053809" }, { "city": "托里", "initial": "T", "id": "0025316235850572744" }, { "city": "同仁", "initial": "T", "id": "0939448053752796" }, { "city": "同德", "initial": "T", "id": "009242364274965142" }, { "city": "天峻", "initial": "T", "id": "04914634816374237" }, { "city": "通渭", "initial": "T", "id": "06990016231126677" }, { "city": "天祝", "initial": "T", "id": "07312657523834556" }, { "city": "天水", "initial": "T", "id": "09078403152012695" }, { "city": "同心", "initial": "T", "id": "09217738773605382" }, { "city": "汤阴", "initial": "T", "id": "06312691300818902" }, { "city": "唐河", "initial": "T", "id": "09841159720916963" }, { "city": "桐柏", "initial": "T", "id": "013958537400348292" }, { "city": "通许", "initial": "T", "id": "029932908700812955" }, { "city": "台前", "initial": "T", "id": "018090326126652823" }, { "city": "太康", "initial": "T", "id": "02554526161829005" }, { "city": "漯河", "initial": "T", "id": "05447899702079471" }, { "city": "太仓", "initial": "T", "id": "00836697274068432" }, { "city": "铜山", "initial": "T", "id": "0021196697638774742" }, { "city": "泰州", "initial": "T", "id": "02538661421237567" }, { "city": "泰兴", "initial": "T", "id": "09532377276537716" }, { "city": "团风", "initial": "T", "id": "014568052297825873" }, { "city": "铁山", "initial": "T", "id": "0568266301792093" }, { "city": "通城", "initial": "T", "id": "01166851227077439" }, { "city": "通山", "initial": "T", "id": "07799742915155121" }, { "city": "天门", "initial": "T", "id": "04050618717975085" }, { "city": "桐庐", "initial": "T", "id": "010459231333739982" }, { "city": "桐乡", "initial": "T", "id": "04656530285380529" }, { "city": "台州", "initial": "T", "id": "029719581206704615" }, { "city": "天台", "initial": "T", "id": "010673982481060551" }, { "city": "泰顺", "initial": "T", "id": "08852639251377916" }, { "city": "太湖", "initial": "T", "id": "02233813954801911" }, { "city": "桐城", "initial": "T", "id": "04005853439484415" }, { "city": "太和", "initial": "T", "id": "02045221713355887" }, { "city": "天长", "initial": "T", "id": "02625821747154824" }, { "city": "铜陵", "initial": "T", "id": "07386526743681696" }, { "city": "同安", "initial": "T", "id": "05305292415467349" }, { "city": "泰宁", "initial": "T", "id": "0027394707971944765" }, { "city": "铜鼓", "initial": "T", "id": "08074832046471099" }, { "city": "泰和", "initial": "T", "id": "09507544614497991" }, { "city": "桃源", "initial": "T", "id": "02224559473970915" }, { "city": "桃江", "initial": "T", "id": "07543275896146868" }, { "city": "通道", "initial": "T", "id": "02798958606596891" }, { "city": "桐梓", "initial": "T", "id": "09789573411132335" }, { "city": "台江", "initial": "T", "id": "09764689536499422" }, { "city": "天柱", "initial": "T", "id": "05423509720325002" }, { "city": "铜仁", "initial": "T", "id": "03488130609938145" }, { "city": "通川", "initial": "T", "id": "035492127814768315" }, { "city": "通江", "initial": "T", "id": "09693917955364588" }, { "city": "天全", "initial": "T", "id": "015253905984050542" }, { "city": "台山", "initial": "T", "id": "09304690035120979" }, { "city": "太华山", "initial": "T", "id": "015019351196635444" }, { "city": "腾冲", "initial": "T", "id": "09979999925189258" }, { "city": "通海", "initial": "T", "id": "04073818043729913" }, { "city": "天等", "initial": "T", "id": "012510397641754922" }, { "city": "藤县", "initial": "T", "id": "04133677847443955" }, { "city": "田阳", "initial": "T", "id": "020801480309331488" }, { "city": "田东", "initial": "T", "id": "09553066664356207" }, { "city": "田林", "initial": "T", "id": "0014562437583510945" }, { "city": "天峨", "initial": "T", "id": "020272892436677625" }, { "city": "台北", "initial": "T", "id": "05349638797027794" }, { "city": "桃园", "initial": "T", "id": "08006039080417051" }, { "city": "台南", "initial": "T", "id": "05317411582318026" }, { "city": "台东", "initial": "T", "id": "035986437114065617" }, { "city": "台中", "initial": "T", "id": "09112741593680722" }, { "city": "武清", "initial": "W", "id": "03896090329327222" }, { "city": "万盛", "initial": "W", "id": "06829647539270081" }, { "city": "万州", "initial": "W", "id": "06994913695972846" }, { "city": "巫溪", "initial": "W", "id": "030227764863796636" }, { "city": "巫山", "initial": "W", "id": "09832789579227683" }, { "city": "武隆", "initial": "W", "id": "0013512569072024805" }, { "city": "五常", "initial": "W", "id": "031945422862791295" }, { "city": "望奎", "initial": "W", "id": "09435411998301952" }, { "city": "五大连池", "initial": "W", "id": "02174414416988597" }, { "city": "乌伊岭", "initial": "W", "id": "05190297870405878" }, { "city": "五营", "initial": "W", "id": "033149044970995734" }, { "city": "汪清", "initial": "W", "id": "02334190628173085" }, { "city": "瓦房店", "initial": "W", "id": "047071601204728064" }, { "city": "武川", "initial": "W", "id": "02758436676450984" }, { "city": "乌海", "initial": "W", "id": "01697358139067926" }, { "city": "翁牛特", "initial": "W", "id": "043822308988566094" }, { "city": "乌审旗", "initial": "W", "id": "0552133289981704" }, { "city": "乌审召", "initial": "W", "id": "03947275593981969" }, { "city": "五原", "initial": "W", "id": "005623256223303241" }, { "city": "乌前旗", "initial": "W", "id": "041039669116338695" }, { "city": "乌中旗", "initial": "W", "id": "05086076545578595" }, { "city": "乌后旗", "initial": "W", "id": "012801049060312586" }, { "city": "乌拉盖", "initial": "W", "id": "08889305922915223" }, { "city": "乌兰浩特", "initial": "W", "id": "06826365226351703" }, { "city": "乌斯太", "initial": "W", "id": "004016288673432378" }, { "city": "无极", "initial": "W", "id": "029742834821809927" }, { "city": "望都", "initial": "W", "id": "06497788640984801" }, { "city": "万全", "initial": "W", "id": "015835146459918548" }, { "city": "围场", "initial": "W", "id": "06476217613450965" }, { "city": "文安", "initial": "W", "id": "08485464375347465" }, { "city": "吴桥", "initial": "W", "id": "0792719513188815" }, { "city": "武邑", "initial": "W", "id": "037211882900515714" }, { "city": "武强", "initial": "W", "id": "035744991633407985" }, { "city": "威县", "initial": "W", "id": "09734191930556859" }, { "city": "魏县", "initial": "W", "id": "08646533720540341" }, { "city": "武安", "initial": "W", "id": "01264488665631729" }, { "city": "武乡", "initial": "W", "id": "006694852428206866" }, { "city": "万荣", "initial": "W", "id": "08305224407273528" }, { "city": "闻喜", "initial": "W", "id": "015877299917281174" }, { "city": "五台县", "initial": "W", "id": "025878718110169574" }, { "city": "五台山", "initial": "W", "id": "05410088472270533" }, { "city": "五寨", "initial": "W", "id": "004581978289884914" }, { "city": "文水", "initial": "W", "id": "03722489877616666" }, { "city": "武功", "initial": "W", "id": "011848164712074749" }, { "city": "吴起", "initial": "W", "id": "06499771392830496" }, { "city": "吴堡", "initial": "W", "id": "06313480916738419" }, { "city": "渭南", "initial": "W", "id": "05570812533593388" }, { "city": "武城", "initial": "W", "id": "030991743560805096" }, { "city": "潍坊", "initial": "W", "id": "09924687153268346" }, { "city": "微山", "initial": "W", "id": "08117696446691465" }, { "city": "汶上", "initial": "W", "id": "08336965910635976" }, { "city": "无棣", "initial": "W", "id": "04215171377278315" }, { "city": "威海", "initial": "W", "id": "038678583285539725" }, { "city": "文登", "initial": "W", "id": "093535613642312" }, { "city": "五莲", "initial": "W", "id": "08531792052519631" }, { "city": "乌鲁木齐", "initial": "W", "id": "09049971924856131" }, { "city": "乌鲁木齐牧试站", "initial": "W", "id": "0894943969211474" }, { "city": "乌尔禾", "initial": "W", "id": "006460208675004542" }, { "city": "乌什", "initial": "W", "id": "02780016938776859" }, { "city": "温宿", "initial": "W", "id": "030296803150976204" }, { "city": "乌苏", "initial": "W", "id": "06920850338509212" }, { "city": "乌恰", "initial": "W", "id": "035871900017028047" }, { "city": "温泉", "initial": "W", "id": "06866308849266198" }, { "city": "芒康", "initial": "W", "id": "040160553962942114" }, { "city": "乌兰", "initial": "W", "id": "00549387943310482" }, { "city": "渭源", "initial": "W", "id": "017156762815771986" }, { "city": "武威", "initial": "W", "id": "044941079106030957" }, { "city": "武山", "initial": "W", "id": "06147723992036636" }, { "city": "武都", "initial": "W", "id": "017418022095185037" }, { "city": "文县", "initial": "W", "id": "07578632206223854" }, { "city": "吴忠", "initial": "W", "id": "041019147959390656" }, { "city": "卫辉", "initial": "W", "id": "01474006206036096" }, { "city": "舞钢", "initial": "W", "id": "024711852383151234" }, { "city": "武陟", "initial": "W", "id": "005132496851334567" }, { "city": "温县", "initial": "W", "id": "02497946130932247" }, { "city": "舞阳", "initial": "W", "id": "06459726006034525" }, { "city": "无锡", "initial": "W", "id": "09974773659486189" }, { "city": "吴中", "initial": "W", "id": "04130997225092785" }, { "city": "吴江", "initial": "W", "id": "0792053654928635" }, { "city": "武进", "initial": "W", "id": "0059002874668665495" }, { "city": "武汉", "initial": "W", "id": "08789305738949782" }, { "city": "武穴", "initial": "W", "id": "06030354749967508" }, { "city": "五峰", "initial": "W", "id": "07109602709861349" }, { "city": "温岭", "initial": "W", "id": "04371407782867822" }, { "city": "温州", "initial": "W", "id": "06894438838195682" }, { "city": "文成", "initial": "W", "id": "08684060395749822" }, { "city": "武义", "initial": "W", "id": "07072204680044734" }, { "city": "五河", "initial": "W", "id": "0445278657338974" }, { "city": "芜湖", "initial": "W", "id": "03139097748722506" }, { "city": "芜湖县", "initial": "W", "id": "0004682563049638988" }, { "city": "无为", "initial": "W", "id": "06369693087610111" }, { "city": "望江", "initial": "W", "id": "019886413784204904" }, { "city": "涡阳", "initial": "W", "id": "03384130262794003" }, { "city": "武平", "initial": "W", "id": "08146810203929393" }, { "city": "武夷山", "initial": "W", "id": "020674208096954483" }, { "city": "武宁", "initial": "W", "id": "009028541426601677" }, { "city": "婺源", "initial": "W", "id": "05166976544329904" }, { "city": "万年", "initial": "W", "id": "04024769781569384" }, { "city": "万载", "initial": "W", "id": "0713610659368167" }, { "city": "万安", "initial": "W", "id": "014809296938097427" }, { "city": "望城", "initial": "W", "id": "003595497069154807" }, { "city": "武冈", "initial": "W", "id": "0989770127834217" }, { "city": "武陵源", "initial": "W", "id": "07839285460093421" }, { "city": "乌当", "initial": "W", "id": "043342495072063736" }, { "city": "务川", "initial": "W", "id": "02323009297237526" }, { "city": "瓮安", "initial": "W", "id": "07739117064392786" }, { "city": "万山", "initial": "W", "id": "06058898966027317" }, { "city": "威宁", "initial": "W", "id": "06524432575488954" }, { "city": "望谟", "initial": "W", "id": "08619547756576083" }, { "city": "温江", "initial": "W", "id": "0903452992864999" }, { "city": "万源", "initial": "W", "id": "07577251147985706" }, { "city": "武胜", "initial": "W", "id": "08794390530578649" }, { "city": "威远", "initial": "W", "id": "015288731090782104" }, { "city": "汶川", "initial": "W", "id": "07813302460368514" }, { "city": "旺苍", "initial": "W", "id": "03553885636419629" }, { "city": "翁源", "initial": "W", "id": "06855394390156053" }, { "city": "武江", "initial": "W", "id": "06068103782634346" }, { "city": "五华", "initial": "W", "id": "05520045837168512" }, { "city": "吴川", "initial": "W", "id": "035478220153872675" }, { "city": "巍山", "initial": "W", "id": "00009215933195685366" }, { "city": "文山", "initial": "W", "id": "08308863616767042" }, { "city": "武定", "initial": "W", "id": "07325690284827397" }, { "city": "威信", "initial": "W", "id": "09051829385980368" }, { "city": "维西", "initial": "W", "id": "084663371243848" }, { "city": "芒市", "initial": "W", "id": "077642522618002" }, { "city": "武鸣", "initial": "W", "id": "05081642112047879" }, { "city": "武宣", "initial": "W", "id": "08728602722813801" }, { "city": "梧州", "initial": "W", "id": "07772810787341418" }, { "city": "涠洲岛", "initial": "W", "id": "08094883058624545" }, { "city": "文昌", "initial": "W", "id": "023567524358621483" }, { "city": "万宁", "initial": "W", "id": "036872310511554063" }, { "city": "五指山", "initial": "W", "id": "08981775415124555" }, { "city": "徐汇", "initial": "X", "id": "06325512703335774" }, { "city": "西青", "initial": "X", "id": "01546487955838578" }, { "city": "秀山", "initial": "X", "id": "016610126161264405" }, { "city": "逊克", "initial": "X", "id": "013571449881823505" }, { "city": "新林", "initial": "X", "id": "034054791389765837" }, { "city": "新民", "initial": "X", "id": "04379507189118239" }, { "city": "岫岩", "initial": "X", "id": "01245112520452174" }, { "city": "新宾", "initial": "X", "id": "05365803908433797" }, { "city": "西丰", "initial": "X", "id": "03433181995571022" }, { "city": "兴城", "initial": "X", "id": "03453376154139418" }, { "city": "希拉穆仁", "initial": "X", "id": "02749380173828464" }, { "city": "兴和", "initial": "X", "id": "05417560723116388" }, { "city": "锡林浩特", "initial": "X", "id": "001580699367107319" }, { "city": "西乌旗", "initial": "X", "id": "029240058342662545" }, { "city": "镶黄旗", "initial": "X", "id": "0664839376558793" }, { "city": "小二沟", "initial": "X", "id": "023151967563321563" }, { "city": "新左旗", "initial": "X", "id": "01798985415370009" }, { "city": "新右旗", "initial": "X", "id": "06668493518040934" }, { "city": "锡林高勒", "initial": "X", "id": "00701163676644363" }, { "city": "行唐", "initial": "X", "id": "023331010594553425" }, { "city": "辛集", "initial": "X", "id": "08898093583310256" }, { "city": "新乐", "initial": "X", "id": "0619939670083951" }, { "city": "徐水", "initial": "X", "id": "0592907568656535" }, { "city": "雄县", "initial": "X", "id": "08504577512114904" }, { "city": "宣化", "initial": "X", "id": "09281933113312706" }, { "city": "兴隆", "initial": "X", "id": "03555758776422975" }, { "city": "香河", "initial": "X", "id": "033952869393855" }, { "city": "献县", "initial": "X", "id": "06441943960312742" }, { "city": "邢台", "initial": "X", "id": "04228350820032174" }, { "city": "新河", "initial": "X", "id": "05405564916128758" }, { "city": "小店区", "initial": "X", "id": "03807963590145722" }, { "city": "昔阳", "initial": "X", "id": "03072720728847098" }, { "city": "襄垣", "initial": "X", "id": "05302923759051863" }, { "city": "隰县", "initial": "X", "id": "04334762315508909" }, { "city": "襄汾", "initial": "X", "id": "06868730973646364" }, { "city": "乡宁", "initial": "X", "id": "035458920728421317" }, { "city": "新绛", "initial": "X", "id": "08125358153127822" }, { "city": "夏县", "initial": "X", "id": "03474109963753935" }, { "city": "忻州", "initial": "X", "id": "09825939257230065" }, { "city": "兴县", "initial": "X", "id": "0026512967056396164" }, { "city": "孝义", "initial": "X", "id": "07927087047486401" }, { "city": "西安", "initial": "X", "id": "03994866405062443" }, { "city": "咸阳", "initial": "X", "id": "018357443310680344" }, { "city": "旬邑", "initial": "X", "id": "05455616104252854" }, { "city": "兴平", "initial": "X", "id": "05338758524447365" }, { "city": "旬阳", "initial": "X", "id": "049620295073502474" }, { "city": "西乡", "initial": "X", "id": "06902397058253036" }, { "city": "夏津", "initial": "X", "id": "018314136171428275" }, { "city": "栖霞", "initial": "X", "id": "0054711447075653785" }, { "city": "新泰", "initial": "X", "id": "05061609500992748" }, { "city": "薛城", "initial": "X", "id": "05801341767641981" }, { "city": "小渠子", "initial": "X", "id": "034668342451646383" }, { "city": "新和", "initial": "X", "id": "07044532312364196" }, { "city": "新源", "initial": "X", "id": "07769780940047193" }, { "city": "谢通门", "initial": "X", "id": "00642320495508013" }, { "city": "西宁", "initial": "X", "id": "03793118806702407" }, { "city": "循化", "initial": "X", "id": "08396771097320805" }, { "city": "兴海", "initial": "X", "id": "09949875571416706" }, { "city": "西和", "initial": "X", "id": "0011656600537114592" }, { "city": "夏河", "initial": "X", "id": "03864164011807918" }, { "city": "西吉", "initial": "X", "id": "09618630083311175" }, { "city": "新密", "initial": "X", "id": "08582612034635824" }, { "city": "新郑", "initial": "X", "id": "06630626579001637" }, { "city": "新乡", "initial": "X", "id": "0001198938107225045" }, { "city": "许昌", "initial": "X", "id": "06149926348020394" }, { "city": "襄城", "initial": "X", "id": "019464478046719513" }, { "city": "信阳", "initial": "X", "id": "07159845734085706" }, { "city": "息县", "initial": "X", "id": "027520220676053575" }, { "city": "新县", "initial": "X", "id": "06441546868038657" }, { "city": "西峡", "initial": "X", "id": "09361496866871892" }, { "city": "淅川", "initial": "X", "id": "04115219018055385" }, { "city": "新野", "initial": "X", "id": "022203861599220898" }, { "city": "新安", "initial": "X", "id": "08562275681801357" }, { "city": "夏邑", "initial": "X", "id": "07088413228964112" }, { "city": "修武", "initial": "X", "id": "027011102573622825" }, { "city": "浚县", "initial": "X", "id": "05481928777069314" }, { "city": "西华", "initial": "X", "id": "08713763367471656" }, { "city": "项城", "initial": "X", "id": "040060576715607565" }, { "city": "西平", "initial": "X", "id": "0031547840081282974" }, { "city": "新蔡", "initial": "X", "id": "08815678494477326" }, { "city": "锡山", "initial": "X", "id": "036293442965888767" }, { "city": "响水", "initial": "X", "id": "011883214268318554" }, { "city": "徐州", "initial": "X", "id": "03568716663905298" }, { "city": "新沂", "initial": "X", "id": "098265448031409" }, { "city": "盱眙", "initial": "X", "id": "005265647917027261" }, { "city": "兴化", "initial": "X", "id": "08163902996129864" }, { "city": "新洲", "initial": "X", "id": "03214097740260289" }, { "city": "襄阳", "initial": "X", "id": "07009301160591894" }, { "city": "襄州", "initial": "X", "id": "022784688404684883" }, { "city": "孝感", "initial": "X", "id": "048866138582947793" }, { "city": "孝昌", "initial": "X", "id": "09469463719164855" }, { "city": "浠水", "initial": "X", "id": "05272787972823152" }, { "city": "下陆", "initial": "X", "id": "04839198924300032" }, { "city": "西塞山", "initial": "X", "id": "08394759533467053" }, { "city": "咸宁", "initial": "X", "id": "08673336642915856" }, { "city": "兴山", "initial": "X", "id": "08025541722732461" }, { "city": "咸丰", "initial": "X", "id": "007709794313620932" }, { "city": "宣恩", "initial": "X", "id": "0046598501686297755" }, { "city": "仙桃", "initial": "X", "id": "08745398257520507" }, { "city": "萧山", "initial": "X", "id": "027022541338205786" }, { "city": "象山", "initial": "X", "id": "004648764301398045" }, { "city": "新昌", "initial": "X", "id": "0832407885625515" }, { "city": "仙居", "initial": "X", "id": "0913976576573998" }, { "city": "萧县", "initial": "X", "id": "05476006872945367" }, { "city": "歙县", "initial": "X", "id": "03721549977457719" }, { "city": "休宁", "initial": "X", "id": "0306798415900027" }, { "city": "宣城", "initial": "X", "id": "026979193543727664" }, { "city": "厦门", "initial": "X", "id": "06183184756908933" }, { "city": "霞浦", "initial": "X", "id": "05761731317106431" }, { "city": "仙游", "initial": "X", "id": "05115929897684204" }, { "city": "秀屿港", "initial": "X", "id": "03951636789430646" }, { "city": "秀屿", "initial": "X", "id": "007052900164263987" }, { "city": "新建", "initial": "X", "id": "04625711326577666" }, { "city": "星子", "initial": "X", "id": "05528416585883873" }, { "city": "修水", "initial": "X", "id": "030943036078093566" }, { "city": "新干", "initial": "X", "id": "08039628966877377" }, { "city": "峡江", "initial": "X", "id": "047314520858070974" }, { "city": "信丰", "initial": "X", "id": "02693109485619798" }, { "city": "寻乌", "initial": "X", "id": "06227803046146594" }, { "city": "兴国", "initial": "X", "id": "03820472261204504" }, { "city": "湘东", "initial": "X", "id": "06642499443265493" }, { "city": "新余", "initial": "X", "id": "007171212384217562" }, { "city": "湘江新区", "initial": "X", "id": "027672077443679965" }, { "city": "湘潭", "initial": "X", "id": "006540955655670566" }, { "city": "湘乡", "initial": "X", "id": "08835774153266314" }, { "city": "新化", "initial": "X", "id": "09235928073266031" }, { "city": "新邵", "initial": "X", "id": "0596076984325036" }, { "city": "新宁", "initial": "X", "id": "06561433512113561" }, { "city": "湘阴", "initial": "X", "id": "020504969833180398" }, { "city": "新晃", "initial": "X", "id": "06693874209924746" }, { "city": "溆浦", "initial": "X", "id": "08158705071388654" }, { "city": "新田", "initial": "X", "id": "03543437833802343" }, { "city": "息烽", "initial": "X", "id": "03564460099576743" }, { "city": "修文", "initial": "X", "id": "06615967886574654" }, { "city": "小河", "initial": "X", "id": "018584201982708315" }, { "city": "习水", "initial": "X", "id": "0633231732642807" }, { "city": "兴义", "initial": "X", "id": "03527177941029298" }, { "city": "兴仁", "initial": "X", "id": "09993731170665228" }, { "city": "新都", "initial": "X", "id": "03376079775002816" }, { "city": "新津", "initial": "X", "id": "05215497158753515" }, { "city": "西充", "initial": "X", "id": "01408736803088908" }, { "city": "宣汉", "initial": "X", "id": "09972000886159276" }, { "city": "叙永", "initial": "X", "id": "07347528738241771" }, { "city": "兴文", "initial": "X", "id": "012039439308989319" }, { "city": "西昌", "initial": "X", "id": "030490780316973454" }, { "city": "喜德", "initial": "X", "id": "029835377751374326" }, { "city": "新龙", "initial": "X", "id": "007032363696458366" }, { "city": "乡城", "initial": "X", "id": "08597226373511229" }, { "city": "小金", "initial": "X", "id": "03428874690144996" }, { "city": "新丰", "initial": "X", "id": "08112883227438785" }, { "city": "兴宁", "initial": "X", "id": "029820591115966266" }, { "city": "徐闻", "initial": "X", "id": "0189722290815868" }, { "city": "霞山", "initial": "X", "id": "040594248481022377" }, { "city": "新会", "initial": "X", "id": "015174127466375853" }, { "city": "新兴", "initial": "X", "id": "08544568512800879" }, { "city": "信宜", "initial": "X", "id": "06316372940037283" }, { "city": "寻甸", "initial": "X", "id": "020923743537674544" }, { "city": "祥云", "initial": "X", "id": "09875043542041326" }, { "city": "宣威", "initial": "X", "id": "08466924067087895" }, { "city": "西畴", "initial": "X", "id": "07873996878300058" }, { "city": "新平", "initial": "X", "id": "015428134000539684" }, { "city": "西盟", "initial": "X", "id": "041409942235010044" }, { "city": "香格里拉", "initial": "X", "id": "042058640087226484" }, { "city": "忻城", "initial": "X", "id": "017291463286883868" }, { "city": "象州", "initial": "X", "id": "018324796533667875" }, { "city": "兴安", "initial": "X", "id": "032544487729735017" }, { "city": "兴业", "initial": "X", "id": "04095932603452377" }, { "city": "西林", "initial": "X", "id": "05839781845174794" }, { "city": "西沙", "initial": "X", "id": "035982756610019573" }, { "city": "香港", "initial": "X", "id": "07147385769266585" }, { "city": "新界", "initial": "X", "id": "045114055119352403" }, { "city": "新竹", "initial": "X", "id": "00034355898999782752" }, { "city": "延庆", "initial": "Y", "id": "032208395124904543" }, { "city": "永川", "initial": "Y", "id": "08600067134860949" }, { "city": "渝北", "initial": "Y", "id": "05572646042559812" }, { "city": "云阳", "initial": "Y", "id": "08853431506922895" }, { "city": "酉阳", "initial": "Y", "id": "0029259291254878805" }, { "city": "依兰", "initial": "Y", "id": "05440432551631047" }, { "city": "延寿", "initial": "Y", "id": "0855008570886973" }, { "city": "依安", "initial": "Y", "id": "01491130248385124" }, { "city": "伊春", "initial": "Y", "id": "05663057320599334" }, { "city": "友谊", "initial": "Y", "id": "06927940845066618" }, { "city": "榆树", "initial": "Y", "id": "020811929440015486" }, { "city": "永吉", "initial": "Y", "id": "05250272413576749" }, { "city": "延吉", "initial": "Y", "id": "011587504444998564" }, { "city": "伊通", "initial": "Y", "id": "036128447620564574" }, { "city": "义县", "initial": "Y", "id": "06453578891677076" }, { "city": "营口", "initial": "Y", "id": "016710513286811035" }, { "city": "伊和乌素", "initial": "Y", "id": "08957516667519614" }, { "city": "伊金霍洛", "initial": "Y", "id": "026009758023144136" }, { "city": "牙克石", "initial": "Y", "id": "07694282562121075" }, { "city": "雅布赖", "initial": "Y", "id": "0878902034217117" }, { "city": "元氏", "initial": "Y", "id": "014092302613820706" }, { "city": "易县", "initial": "Y", "id": "09057623137047845" }, { "city": "蔚县", "initial": "Y", "id": "07957538094311607" }, { "city": "阳原", "initial": "Y", "id": "08874601332986265" }, { "city": "乐亭", "initial": "Y", "id": "006911719751306356" }, { "city": "玉田", "initial": "Y", "id": "0891588626796509" }, { "city": "永清", "initial": "Y", "id": "0987192152717389" }, { "city": "盐山", "initial": "Y", "id": "06107246478846842" }, { "city": "永年", "initial": "Y", "id": "0642438664613451" }, { "city": "阳曲", "initial": "Y", "id": "06200187937728621" }, { "city": "阳高", "initial": "Y", "id": "09035253941246149" }, { "city": "阳泉", "initial": "Y", "id": "08985593515520545" }, { "city": "盂县", "initial": "Y", "id": "06430277917929954" }, { "city": "榆次", "initial": "Y", "id": "08599450653491303" }, { "city": "榆社", "initial": "Y", "id": "09191734540059209" }, { "city": "阳城", "initial": "Y", "id": "05929491662037294" }, { "city": "永和", "initial": "Y", "id": "0584444970504912" }, { "city": "翼城", "initial": "Y", "id": "012320720161145848" }, { "city": "运城", "initial": "Y", "id": "0285083301401982" }, { "city": "垣曲", "initial": "Y", "id": "017276484216753873" }, { "city": "永济", "initial": "Y", "id": "046226074715378385" }, { "city": "右玉", "initial": "Y", "id": "08235640183913817" }, { "city": "应县", "initial": "Y", "id": "05421334867584957" }, { "city": "原平", "initial": "Y", "id": "09592680123645718" }, { "city": "永寿", "initial": "Y", "id": "07208350013148095" }, { "city": "延安", "initial": "Y", "id": "04693580399048558" }, { "city": "延长", "initial": "Y", "id": "05085931514042399" }, { "city": "延川", "initial": "Y", "id": "04056712811267793" }, { "city": "宜川", "initial": "Y", "id": "04896473152252747" }, { "city": "榆林", "initial": "Y", "id": "07461885283375085" }, { "city": "榆阳", "initial": "Y", "id": "03860123365345409" }, { "city": "洋县", "initial": "Y", "id": "05517747547166187" }, { "city": "耀县", "initial": "Y", "id": "03743475339916482" }, { "city": "宜君", "initial": "Y", "id": "046030562044043544" }, { "city": "耀州", "initial": "Y", "id": "035770698635449594" }, { "city": "杨凌", "initial": "Y", "id": "007678644196369744" }, { "city": "沂源", "initial": "Y", "id": "018354927281697941" }, { "city": "乐陵", "initial": "Y", "id": "04948437352805384" }, { "city": "禹城", "initial": "Y", "id": "03555560705164962" }, { "city": "烟台", "initial": "Y", "id": "0986291909374863" }, { "city": "鱼台", "initial": "Y", "id": "015439617722283572" }, { "city": "兖州", "initial": "Y", "id": "047140903556834535" }, { "city": "沂南", "initial": "Y", "id": "031743985939095887" }, { "city": "沂水", "initial": "Y", "id": "02471791481250527" }, { "city": "郓城", "initial": "Y", "id": "034557847444191303" }, { "city": "阳信", "initial": "Y", "id": "011957182859848392" }, { "city": "峄城", "initial": "Y", "id": "015771468341454842" }, { "city": "阳谷", "initial": "Y", "id": "033035984564900245" }, { "city": "尉犁", "initial": "Y", "id": "05673755477648403" }, { "city": "焉耆", "initial": "Y", "id": "0004725758952148329" }, { "city": "英吉沙", "initial": "Y", "id": "036267674743672096" }, { "city": "叶城", "initial": "Y", "id": "005138429811163325" }, { "city": "岳普湖", "initial": "Y", "id": "0503572752315566" }, { "city": "伊宁", "initial": "Y", "id": "07207034001012094" }, { "city": "伊宁县", "initial": "Y", "id": "03649284890780027" }, { "city": "裕民", "initial": "Y", "id": "035131439450974433" }, { "city": "伊吾", "initial": "Y", "id": "0029293184745246448" }, { "city": "于田", "initial": "Y", "id": "09328529581829375" }, { "city": "亚东", "initial": "Y", "id": "09758294596805879" }, { "city": "乐都", "initial": "Y", "id": "021230720213466947" }, { "city": "玉树", "initial": "Y", "id": "041840713169825006" }, { "city": "永登", "initial": "Y", "id": "008102591551150184" }, { "city": "榆中", "initial": "Y", "id": "03026589338501864" }, { "city": "永昌", "initial": "Y", "id": "017637432414610266" }, { "city": "玉门", "initial": "Y", "id": "05835350879011547" }, { "city": "永靖", "initial": "Y", "id": "04721051385576207" }, { "city": "银川", "initial": "Y", "id": "09744922641231966" }, { "city": "永宁", "initial": "Y", "id": "04429836866076502" }, { "city": "陶乐", "initial": "Y", "id": "06137980521465825" }, { "city": "盐池", "initial": "Y", "id": "06643770186251006" }, { "city": "荥阳", "initial": "Y", "id": "03196951455166255" }, { "city": "原阳", "initial": "Y", "id": "005403350656532191" }, { "city": "延津", "initial": "Y", "id": "0497652928542309" }, { "city": "鄢陵", "initial": "Y", "id": "08686772474922158" }, { "city": "禹州", "initial": "Y", "id": "07184537014613075" }, { "city": "叶县", "initial": "Y", "id": "07824209893733809" }, { "city": "尉氏", "initial": "Y", "id": "06682706659540387" }, { "city": "宜阳", "initial": "Y", "id": "09546670704114861" }, { "city": "伊川", "initial": "Y", "id": "04702861975577315" }, { "city": "偃师", "initial": "Y", "id": "08646318600025296" }, { "city": "虞城", "initial": "Y", "id": "0943355871055819" }, { "city": "永城", "initial": "Y", "id": "08391385423203541" }, { "city": "义马", "initial": "Y", "id": "05242429856702593" }, { "city": "宜兴", "initial": "Y", "id": "045184016049868836" }, { "city": "扬中", "initial": "Y", "id": "09523641010230419" }, { "city": "扬州", "initial": "Y", "id": "05050901667804577" }, { "city": "仪征", "initial": "Y", "id": "040998709137583655" }, { "city": "盐城", "initial": "Y", "id": "06755809166089557" }, { "city": "盐都", "initial": "Y", "id": "031758870618829294" }, { "city": "宜城", "initial": "Y", "id": "017660736003815347" }, { "city": "谷城", "initial": "Y", "id": "08712559625074878" }, { "city": "云梦", "initial": "Y", "id": "05412161307530043" }, { "city": "应城", "initial": "Y", "id": "0956697378713478" }, { "city": "英山", "initial": "Y", "id": "034229444598490244" }, { "city": "阳新", "initial": "Y", "id": "017047651104336614" }, { "city": "宜昌", "initial": "Y", "id": "0630085702238879" }, { "city": "远安", "initial": "Y", "id": "007870804633453643" }, { "city": "宜都", "initial": "Y", "id": "0564297909209307" }, { "city": "夷陵", "initial": "Y", "id": "039381178786498205" }, { "city": "郧西", "initial": "Y", "id": "08508461805665448" }, { "city": "郧阳", "initial": "Y", "id": "02929249151352469" }, { "city": "余杭", "initial": "Y", "id": "07351296162976304" }, { "city": "余姚", "initial": "Y", "id": "012021694309622721" }, { "city": "鄞州", "initial": "Y", "id": "018947059225988072" }, { "city": "越城", "initial": "Y", "id": "03814281560894801" }, { "city": "玉环", "initial": "Y", "id": "09032560133929792" }, { "city": "乐清", "initial": "Y", "id": "0934308419492446" }, { "city": "永嘉", "initial": "Y", "id": "06561913406512114" }, { "city": "云和", "initial": "Y", "id": "08112622736975792" }, { "city": "义乌", "initial": "Y", "id": "033311001654000183" }, { "city": "永康", "initial": "Y", "id": "09473447074207029" }, { "city": "岳西", "initial": "Y", "id": "09616865931224101" }, { "city": "颍上", "initial": "Y", "id": "039738372890950635" }, { "city": "黟县", "initial": "Y", "id": "03006837388753667" }, { "city": "永泰", "initial": "Y", "id": "03205560266066598" }, { "city": "永春", "initial": "Y", "id": "010608468823680495" }, { "city": "云霄", "initial": "Y", "id": "016660464197725178" }, { "city": "永定", "initial": "Y", "id": "043149597673851847" }, { "city": "尤溪", "initial": "Y", "id": "03619626657119013" }, { "city": "永安", "initial": "Y", "id": "05936561393779418" }, { "city": "永修", "initial": "Y", "id": "06260967256096466" }, { "city": "余干", "initial": "Y", "id": "06334627429835993" }, { "city": "弋阳", "initial": "Y", "id": "000022399789422289373" }, { "city": "玉山", "initial": "Y", "id": "07326313015769192" }, { "city": "乐安", "initial": "Y", "id": "06994026988655495" }, { "city": "宜黄", "initial": "Y", "id": "0746670479613105" }, { "city": "宜春", "initial": "Y", "id": "09825835393412221" }, { "city": "宜丰", "initial": "Y", "id": "03302828074852271" }, { "city": "永丰", "initial": "Y", "id": "044277781390264925" }, { "city": "永新", "initial": "Y", "id": "011883599916638565" }, { "city": "于都", "initial": "Y", "id": "01865770146739194" }, { "city": "乐平", "initial": "Y", "id": "05956891802851514" }, { "city": "鹰潭", "initial": "Y", "id": "09865538298610361" }, { "city": "余江", "initial": "Y", "id": "02987268794631317" }, { "city": "攸县", "initial": "Y", "id": "08984613615272039" }, { "city": "炎陵", "initial": "Y", "id": "02975225351536184" }, { "city": "宜章", "initial": "Y", "id": "07411595684327004" }, { "city": "永兴", "initial": "Y", "id": "05235743416179042" }, { "city": "益阳", "initial": "Y", "id": "08269272048724576" }, { "city": "沅江", "initial": "Y", "id": "006603656818976211" }, { "city": "岳阳", "initial": "Y", "id": "031296271634053796" }, { "city": "沅陵", "initial": "Y", "id": "008809797109184303" }, { "city": "永州", "initial": "Y", "id": "03224596540432969" }, { "city": "永顺", "initial": "Y", "id": "06504715610230258" }, { "city": "云岩", "initial": "Y", "id": "09728056703616836" }, { "city": "余庆", "initial": "Y", "id": "024895099311928925" }, { "city": "玉屏", "initial": "Y", "id": "0846421964808963" }, { "city": "印江", "initial": "Y", "id": "05379148460971668" }, { "city": "沿河", "initial": "Y", "id": "0508214409969389" }, { "city": "盐边", "initial": "Y", "id": "020534007107989538" }, { "city": "盐亭", "initial": "Y", "id": "03588845193188037" }, { "city": "营山", "initial": "Y", "id": "03834937180880049" }, { "city": "仪陇", "initial": "Y", "id": "048577079557438085" }, { "city": "岳池", "initial": "Y", "id": "06293325427510232" }, { "city": "宜宾", "initial": "Y", "id": "09360626980318167" }, { "city": "宜宾县", "initial": "Y", "id": "030666632266618965" }, { "city": "筠连", "initial": "Y", "id": "024720385441432713" }, { "city": "乐至", "initial": "Y", "id": "04042217979361922" }, { "city": "乐山", "initial": "Y", "id": "0927774252463363" }, { "city": "盐源", "initial": "Y", "id": "021630229958330394" }, { "city": "越西", "initial": "Y", "id": "08042044547542733" }, { "city": "雅安", "initial": "Y", "id": "07990983488708638" }, { "city": "荥经", "initial": "Y", "id": "0005723774734317955" }, { "city": "雅江", "initial": "Y", "id": "04254042664684199" }, { "city": "乐昌", "initial": "Y", "id": "09406839904571671" }, { "city": "阳山", "initial": "Y", "id": "08716566839048459" }, { "city": "英德", "initial": "Y", "id": "0172625793372585" }, { "city": "云浮", "initial": "Y", "id": "006828751489415752" }, { "city": "郁南", "initial": "Y", "id": "07754910864039262" }, { "city": "云安", "initial": "Y", "id": "0010727801120612668" }, { "city": "阳江", "initial": "Y", "id": "05341085732950093" }, { "city": "阳春", "initial": "Y", "id": "021013972709329254" }, { "city": "阳东", "initial": "Y", "id": "08685690210194346" }, { "city": "阳西", "initial": "Y", "id": "08924033103681168" }, { "city": "宜良", "initial": "Y", "id": "09918082155412618" }, { "city": "云龙", "initial": "Y", "id": "06585899488736882" }, { "city": "漾濞", "initial": "Y", "id": "04104041311193487" }, { "city": "永平", "initial": "Y", "id": "06844446556120236" }, { "city": "元阳", "initial": "Y", "id": "01383924403584318" }, { "city": "砚山", "initial": "Y", "id": "0813334652405622" }, { "city": "玉溪", "initial": "Y", "id": "06556274682821452" }, { "city": "易门", "initial": "Y", "id": "02821680248746645" }, { "city": "元江", "initial": "Y", "id": "03543617290745027" }, { "city": "元谋", "initial": "Y", "id": "05441803916314318" }, { "city": "姚安", "initial": "Y", "id": "05643910910716452" }, { "city": "永仁", "initial": "Y", "id": "006505206620548676" }, { "city": "彝良", "initial": "Y", "id": "08845772270147279" }, { "city": "永善", "initial": "Y", "id": "0040781252000454016" }, { "city": "盐津", "initial": "Y", "id": "07658599743433452" }, { "city": "永德", "initial": "Y", "id": "07858871330034494" }, { "city": "云县", "initial": "Y", "id": "03665021110656388" }, { "city": "永胜", "initial": "Y", "id": "07917163264521188" }, { "city": "盈江", "initial": "Y", "id": "09630784207928089" }, { "city": "邕宁", "initial": "Y", "id": "05274482984551065" }, { "city": "永福", "initial": "Y", "id": "022897965969559997" }, { "city": "阳朔", "initial": "Y", "id": "07447178331925963" }, { "city": "玉林", "initial": "Y", "id": "03956487360513239" }, { "city": "乐业", "initial": "Y", "id": "06089944517461889" }, { "city": "宜州", "initial": "Y", "id": "03312755116119399" }, { "city": "乐东", "initial": "Y", "id": "05516776615694794" }, { "city": "宜兰", "initial": "Y", "id": "07988278430038191" }, { "city": "云林", "initial": "Y", "id": "009539094828732231" }, { "city": "朝阳", "initial": "Z", "id": "043906809810044356" }, { "city": "重庆", "initial": "Z", "id": "005521184575498839" }, { "city": "长寿", "initial": "Z", "id": "07163492172810815" }, { "city": "忠县", "initial": "Z", "id": "017490089617549898" }, { "city": "肇东", "initial": "Z", "id": "06636643752993607" }, { "city": "肇州", "initial": "Z", "id": "05405623872179968" }, { "city": "肇源", "initial": "Z", "id": "07019968368837697" }, { "city": "长春", "initial": "Z", "id": "010695919047351188" }, { "city": "镇赉", "initial": "Z", "id": "0861413997218486" }, { "city": "长岭", "initial": "Z", "id": "0023037214605583722" }, { "city": "长白", "initial": "Z", "id": "0781611749422823" }, { "city": "长海", "initial": "Z", "id": "006309550473403869" }, { "city": "庄河", "initial": "Z", "id": "06828341689082926" }, { "city": "章党", "initial": "Z", "id": "015012720399312807" }, { "city": "彰武", "initial": "Z", "id": "028729946439306686" }, { "city": "卓资", "initial": "Z", "id": "041312590685105377" }, { "city": "扎鲁特", "initial": "Z", "id": "06021735143226363" }, { "city": "准格尔", "initial": "Z", "id": "04764724055864882" }, { "city": "朱日和", "initial": "Z", "id": "016851542889887283" }, { "city": "正镶白旗", "initial": "Z", "id": "09572099107008549" }, { "city": "正蓝旗", "initial": "Z", "id": "09141844831865156" }, { "city": "扎兰屯", "initial": "Z", "id": "0656182579402036" }, { "city": "扎赉特", "initial": "Z", "id": "05232764710548883" }, { "city": "中泉子", "initial": "Z", "id": "05611604238331394" }, { "city": "正定", "initial": "Z", "id": "09840653295126027" }, { "city": "赞皇", "initial": "Z", "id": "02402959287042592" }, { "city": "赵县", "initial": "Z", "id": "0029051780412785222" }, { "city": "涿州", "initial": "Z", "id": "05139384642476739" }, { "city": "张家口", "initial": "Z", "id": "04961300244055944" }, { "city": "张北", "initial": "Z", "id": "06608135171034122" }, { "city": "涿鹿", "initial": "Z", "id": "043997067069977747" }, { "city": "遵化", "initial": "Z", "id": "02591250555471596" }, { "city": "枣强", "initial": "Z", "id": "035125730473015215" }, { "city": "左云", "initial": "Z", "id": "0596052185923605" }, { "city": "左权", "initial": "Z", "id": "07051231092975081" }, { "city": "长治", "initial": "Z", "id": "021834423963296756" }, { "city": "屯留", "initial": "Z", "id": "03987387615716984" }, { "city": "长子", "initial": "Z", "id": "045673272881189186" }, { "city": "泽州", "initial": "Z", "id": "0006981751888905707" }, { "city": "中阳", "initial": "Z", "id": "07360962405604323" }, { "city": "长安", "initial": "Z", "id": "05566048844630165" }, { "city": "周至", "initial": "Z", "id": "06404898250547799" }, { "city": "长武", "initial": "Z", "id": "014937916407363883" }, { "city": "子长", "initial": "Z", "id": "06683936768146106" }, { "city": "志丹", "initial": "Z", "id": "07697164608774643" }, { "city": "子洲", "initial": "Z", "id": "06421253832419684" }, { "city": "柞水", "initial": "Z", "id": "004181547673312158" }, { "city": "镇安", "initial": "Z", "id": "026699783090725093" }, { "city": "紫阳", "initial": "Z", "id": "005317948916902138" }, { "city": "镇坪", "initial": "Z", "id": "05332865011772088" }, { "city": "镇巴", "initial": "Z", "id": "05216201083985652" }, { "city": "长清", "initial": "Z", "id": "05649104345374876" }, { "city": "章丘", "initial": "Z", "id": "04668134800038264" }, { "city": "淄博", "initial": "Z", "id": "009428842977223062" }, { "city": "淄川", "initial": "Z", "id": "04165016626206588" }, { "city": "周村", "initial": "Z", "id": "09952421303949872" }, { "city": "长岛", "initial": "Z", "id": "05256092528622189" }, { "city": "招远", "initial": "Z", "id": "04050718087030294" }, { "city": "诸城", "initial": "Z", "id": "08902864711788301" }, { "city": "邹城", "initial": "Z", "id": "06234516118306672" }, { "city": "沾化", "initial": "Z", "id": "00084153330404233" }, { "city": "邹平", "initial": "Z", "id": "019243883464661704" }, { "city": "枣庄", "initial": "Z", "id": "011724406708448365" }, { "city": "泽普", "initial": "Z", "id": "09867951027710229" }, { "city": "昭苏", "initial": "Z", "id": "037192604155800946" }, { "city": "堆龙德庆", "initial": "Z", "id": "011032089284410285" }, { "city": "仲巴", "initial": "Z", "id": "05255576245453042" }, { "city": "扎囊", "initial": "Z", "id": "06557625344875397" }, { "city": "泽当", "initial": "Z", "id": "0170166107672429" }, { "city": "左贡", "initial": "Z", "id": "09451438792408708" }, { "city": "札达", "initial": "Z", "id": "05911994133674492" }, { "city": "泽库", "initial": "Z", "id": "0129829824970092" }, { "city": "治多", "initial": "Z", "id": "06615129650246598" }, { "city": "杂多", "initial": "Z", "id": "012291449520024922" }, { "city": "漳县", "initial": "Z", "id": "047312452486158807" }, { "city": "庄浪", "initial": "Z", "id": "08722535785517345" }, { "city": "正宁", "initial": "Z", "id": "07248514283441205" }, { "city": "镇原", "initial": "Z", "id": "05659367656865117" }, { "city": "张掖", "initial": "Z", "id": "02637027733445043" }, { "city": "张家川", "initial": "Z", "id": "0031943658006776454" }, { "city": "卓尼", "initial": "Z", "id": "09690115730602542" }, { "city": "舟曲", "initial": "Z", "id": "0038611571405829936" }, { "city": "中卫", "initial": "Z", "id": "08020782987515194" }, { "city": "中宁", "initial": "Z", "id": "005789655679358807" }, { "city": "郑州", "initial": "Z", "id": "0946349237129561" }, { "city": "中牟", "initial": "Z", "id": "04825269716921521" }, { "city": "长垣", "initial": "Z", "id": "082253690079397" }, { "city": "长葛", "initial": "Z", "id": "07404657058294037" }, { "city": "镇平", "initial": "Z", "id": "02884757860157474" }, { "city": "柘城", "initial": "Z", "id": "011236665059407613" }, { "city": "周口", "initial": "Z", "id": "0986481769074723" }, { "city": "驻马店", "initial": "Z", "id": "006067208884220632" }, { "city": "正阳", "initial": "Z", "id": "09603506544392155" }, { "city": "镇江", "initial": "Z", "id": "0503557769945908" }, { "city": "张家港", "initial": "Z", "id": "03632978095163155" }, { "city": "枣阳", "initial": "Z", "id": "06277096716434092" }, { "city": "秭归", "initial": "Z", "id": "031297654480903336" }, { "city": "长阳", "initial": "Z", "id": "0302981024593856" }, { "city": "枝江", "initial": "Z", "id": "05946628478953007" }, { "city": "竹溪", "initial": "Z", "id": "030523552237836027" }, { "city": "竹山", "initial": "Z", "id": "02072357965161662" }, { "city": "张湾", "initial": "Z", "id": "07866270484842259" }, { "city": "钟祥", "initial": "Z", "id": "09167316530527021" }, { "city": "长兴", "initial": "Z", "id": "008284927502199269" }, { "city": "镇海", "initial": "Z", "id": "05839731529603449" }, { "city": "诸暨", "initial": "Z", "id": "05258171216118852" }, { "city": "舟山", "initial": "Z", "id": "03291849961725031" }, { "city": "长丰", "initial": "Z", "id": "05353020715832137" }, { "city": "枞阳", "initial": "Z", "id": "010601395014784876" }, { "city": "屯溪", "initial": "Z", "id": "08031824097137039" }, { "city": "长乐", "initial": "Z", "id": "011899545766115849" }, { "city": "周宁", "initial": "Z", "id": "06819438251413557" }, { "city": "柘荣", "initial": "Z", "id": "08232210588805993" }, { "city": "漳州", "initial": "Z", "id": "03185058487427168" }, { "city": "长泰", "initial": "Z", "id": "02317800532737191" }, { "city": "漳浦", "initial": "Z", "id": "07499102724314506" }, { "city": "诏安", "initial": "Z", "id": "048347589190183604" }, { "city": "长汀", "initial": "Z", "id": "04321397696581295" }, { "city": "漳平", "initial": "Z", "id": "02365575321177682" }, { "city": "政和", "initial": "Z", "id": "015890883809127998" }, { "city": "资溪", "initial": "Z", "id": "035203845154252456" }, { "city": "樟树", "initial": "Z", "id": "014680323883784951" }, { "city": "长沙", "initial": "Z", "id": "049063989830295673" }, { "city": "长沙县", "initial": "Z", "id": "05406744789288964" }, { "city": "株洲", "initial": "Z", "id": "03185624828410032" }, { "city": "资兴", "initial": "Z", "id": "005527518360392669" }, { "city": "张家界", "initial": "Z", "id": "08782501487988779" }, { "city": "芷江", "initial": "Z", "id": "02468798647290975" }, { "city": "中方", "initial": "Z", "id": "06236993319146571" }, { "city": "遵义", "initial": "Z", "id": "09255936823107629" }, { "city": "遵义县", "initial": "Z", "id": "05985739625458326" }, { "city": "正安", "initial": "Z", "id": "022486458464213688" }, { "city": "镇宁", "initial": "Z", "id": "09506613124257455" }, { "city": "紫云", "initial": "Z", "id": "06395514031538181" }, { "city": "长顺", "initial": "Z", "id": "08452657987561387" }, { "city": "镇远", "initial": "Z", "id": "025009083103554897" }, { "city": "织金", "initial": "Z", "id": "09475391184927608" }, { "city": "贞丰", "initial": "Z", "id": "07156102042846901" }, { "city": "自贡", "initial": "Z", "id": "05064882986205963" }, { "city": "梓潼", "initial": "Z", "id": "03024904159912014" }, { "city": "长宁", "initial": "Z", "id": "009319067322476293" }, { "city": "资中", "initial": "Z", "id": "03277616498582918" }, { "city": "资阳", "initial": "Z", "id": "019122633654676746" }, { "city": "昭觉", "initial": "Z", "id": "08516260625277523" }, { "city": "中江", "initial": "Z", "id": "06335625169547592" }, { "city": "增城", "initial": "Z", "id": "049054708203341035" }, { "city": "浈江", "initial": "Z", "id": "02635382649970146" }, { "city": "珠海", "initial": "Z", "id": "010916975722433464" }, { "city": "肇庆", "initial": "Z", "id": "05341493990047737" }, { "city": "湛江", "initial": "Z", "id": "012017306487799173" }, { "city": "紫金", "initial": "Z", "id": "06529233367259673" }, { "city": "中山", "initial": "Z", "id": "0781380203586312" }, { "city": "沾益", "initial": "Z", "id": "03186033863777915" }, { "city": "镇沅", "initial": "Z", "id": "09396884968361798" }, { "city": "昭通", "initial": "Z", "id": "047466852155917527" }, { "city": "镇雄", "initial": "Z", "id": "009469992173671304" }, { "city": "镇康", "initial": "Z", "id": "08841287409576621" }, { "city": "中甸", "initial": "Z", "id": "08368882331422325" }, { "city": "资源", "initial": "Z", "id": "05144753960369117" }, { "city": "昭平", "initial": "Z", "id": "03427647859038665" }, { "city": "钟山", "initial": "Z", "id": "024149271577092546" }, { "city": "屯昌", "initial": "Z", "id": "05107134932264972" }, { "city": "中沙", "initial": "Z", "id": "05249354249182439" }, { "city": "彰化", "initial": "Z", "id": "07100417801682966" }];

	//城市检索的首字母
	var searchLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"];

	function searchLetter() {
	    return searchLetter;
	}

	//对城市信息进行分组
	function cityList() {

	    var tempObj = [];
	    for (var i = 0; i < searchLetter.length; i++) {
	        var initial = searchLetter[i];
	        var cityInfo = [];
	        var tempArr = {};
	        tempArr.initial = initial;
	        for (var j = 0; j < cityObj.length; j++) {
	            if (initial == cityObj[j].initial) {
	                cityInfo.push(cityObj[j]);
	            }
	        }
	        tempArr.cityInfo = cityInfo;
	        tempObj.push(tempArr);
	    }
	    return tempObj;
	}

	function pushCity() {}

	module.exports = {
	    searchLetter: searchLetter,
	    cityList: cityList
	};

/***/ }
/******/ ]);