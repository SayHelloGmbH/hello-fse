/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
const set = () => {
  document.documentElement.querySelector('body').style.setProperty('--vh', window.innerHeight / 100 + 'px');
};
set();
window.addEventListener('resize', set);
window.addEventListener('orientationchange', set);
/******/ })()
;