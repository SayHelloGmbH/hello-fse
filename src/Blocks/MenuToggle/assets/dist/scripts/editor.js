(()=>{"use strict";const e=window.wp.blocks,t=window.wp.blockEditor,n=window.wp.components,o=window.wp.element,r=window.wp.primitives,l=(0,o.createElement)(r.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,o.createElement)(r.Path,{d:"M5 5v1.5h14V5H5zm0 7.8h14v-1.5H5v1.5zM5 19h14v-1.5H5V19z"})),a=window.wp.url,w=JSON.parse('{"name":"sht/menu-toggle"}'),{name:c}=w;(0,e.registerBlockType)(c,{icon:l,edit:e=>{const{attributes:o,setAttributes:r}=e,{target:l}=o,w=(0,t.useBlockProps)();return React.createElement("div",w,React.createElement(t.InspectorControls,null,React.createElement(n.PanelBody,{title:"Link Settings"},React.createElement(n.TextControl,{label:"Target",value:l,onChange:e=>{r({target:(0,a.cleanForSlug)(e)})}}))))}})})();