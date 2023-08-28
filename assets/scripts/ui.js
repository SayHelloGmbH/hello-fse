/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 197:
/***/ (function() {

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    var i;
    var len = this.length;
    thisArg = thisArg || window;
    for (i = 0; i < len; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
      i,
      el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {}
    } while (i < 0 && (el = el.parentElement));
    return el;
  };
}

/***/ }),

/***/ 599:
/***/ (function() {

const check_class = 'c-body--no-outline';
const body = document.body;
body.classList.add(check_class);
window.addEventListener('keydown', event => {
  if (event.key.toLowerCase() === 'tab') {
    body.classList.remove(check_class);
  }
});
window.addEventListener('mousemove', () => {
  body.classList.add(check_class);
});

/***/ }),

/***/ 704:
/***/ (function() {

const masthead = document.querySelector('.c-masthead'),
  height = () => {
    document.documentElement.style.setProperty('--masthead--height', masthead.offsetHeight - 1 + 'px');
  };
height();
window.addEventListener('resize', height);
window.addEventListener('orientationchange', height);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/* harmony import */ var _polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(197);
/* harmony import */ var _polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _a11y__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(599);
/* harmony import */ var _a11y__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_a11y__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _masthead__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(704);
/* harmony import */ var _masthead__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_masthead__WEBPACK_IMPORTED_MODULE_2__);
// import './modules/settings';



console.log('%cDeveloped by', 'font-style: italic; font-size: 12px;');
console.log('%cSay Hello GmbH', 'font-weight: bold; color: #000; font-size: 16px;');
console.log('%chttps://sayhello.ch', 'color: #000; font-size: 12px;');
const conditionalLoadScript = (filename, condition) => {
  if (!!condition) {
    const min = sht_theme.debug ? '' : '.min';
    let script = document.createElement('script');
    script.setAttribute('src', `${sht_theme.directory_uri}/assets/scripts/${filename}${min}.js?version=${sht_theme.version}`);
    document.head.appendChild(script);
  }
};
conditionalLoadScript('svh', !CSS.supports || !CSS.supports('height', '1svh'));
conditionalLoadScript('aria-toggler', !!document.querySelectorAll('[aria-controls]:not([data-standalone-controller])').length);
}();
/******/ })()
;