/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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

;// CONCATENATED MODULE: external ["wp","domReady"]
var external_wp_domReady_namespaceObject = window["wp"]["domReady"];
var external_wp_domReady_default = /*#__PURE__*/__webpack_require__.n(external_wp_domReady_namespaceObject);
;// CONCATENATED MODULE: external ["wp","blocks"]
var external_wp_blocks_namespaceObject = window["wp"]["blocks"];
;// CONCATENATED MODULE: external ["wp","editPost"]
var external_wp_editPost_namespaceObject = window["wp"]["editPost"];
;// CONCATENATED MODULE: external ["wp","editSite"]
var external_wp_editSite_namespaceObject = window["wp"]["editSite"];
;// CONCATENATED MODULE: ./.build/assets/scripts/block-editor/block-styles/index.js



// Dependencies to make domReady work properly


external_wp_domReady_default()(() => {
  (0,external_wp_blocks_namespaceObject.unregisterBlockStyle)('core/image', 'default');
  (0,external_wp_blocks_namespaceObject.unregisterBlockStyle)('core/image', 'rounded');
  (0,external_wp_blocks_namespaceObject.unregisterBlockStyle)('core/separator', 'wide');
  (0,external_wp_blocks_namespaceObject.unregisterBlockStyle)('core/separator', 'dots');
});
;// CONCATENATED MODULE: ./.build/assets/scripts/block-editor/index.js

/******/ })()
;