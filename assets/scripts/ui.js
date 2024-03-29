/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 634:
/***/ (() => {

const masthead = document.querySelector('.c-masthead');
if (masthead) {
  height = () => {
    document.documentElement.style.setProperty('--masthead--height', masthead.offsetHeight - 1 + 'px');
  };
  height();
  window.addEventListener('resize', height);
  window.addEventListener('orientationchange', height);
} else {
  console.warn('No .c-masthead available. This script is not needed.');
}

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
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _masthead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(634);
/* harmony import */ var _masthead__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_masthead__WEBPACK_IMPORTED_MODULE_0__);

console.log('%cDeveloped by', 'font-style: italic; font-size: 12px;');
console.log('%cSay Hello GmbH', 'font-weight: bold; color: #000; font-size: 16px;');
console.log('%chttps://sayhello.ch 👋', 'color: #000; font-size: 12px;');
const conditionalLoadScript = (filename, condition) => {
  if (!!condition) {
    const min = sht_theme.debug ? '' : '.min';
    let script = document.createElement('script');
    script.setAttribute('src', `${sht_theme.directory_uri}/assets/scripts/${filename}${min}.js?version=${sht_theme.version}`);
    document.head.appendChild(script);
  }
};
conditionalLoadScript('aria-toggler', !!document.querySelectorAll('[aria-controls]:not([data-standalone-controller])').length);
})();

/******/ })()
;