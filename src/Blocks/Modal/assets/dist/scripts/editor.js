!function(){"use strict";var e=window.wp.blocks,t=window.wp.blockEditor,a=window.wp.element,o=window.wp.primitives,r=(0,a.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,a.createElement)(o.Path,{d:"M5 5v1.5h14V5H5zm0 7.8h14v-1.5H5v1.5zM5 19h14v-1.5H5V19z"}));window.wp.i18n;const{name:c}={name:"sht/modal"};(0,e.registerBlockType)(c,{icon:r,edit:e=>{const a=(0,t.useBlockProps)();return React.createElement("div",a,React.createElement(t.InnerBlocks,{allowedBlocks:["core/paragraph","gravityforms/form"],template:[["core/paragraph",{placeholder:"Add your content here"}],["gravityforms/form",{}]]}))},save:()=>{const e=t.useBlockProps.save();return React.createElement("div",e,React.createElement("div",{class:"c-modal"},React.createElement("div",{className:"c-modal__toggle-wrap"},React.createElement("button",{"aria-controls":"testmodal",className:"c-modal__toggle","aria-expanded":"false",type:"button"},"Toggle modal")),React.createElement("div",{className:"c-modal__inner",id:"testmodal","aria-hidden":"true"},React.createElement(t.InnerBlocks.Content,null))))}})}();