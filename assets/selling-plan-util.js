const watchElement=(e,t,a)=>{const n=new MutationObserver(a);return n.observe(e,t)},observeInputValueChange=function(e,t){watchElement(e,{attributes:!0,childList:!1,subtree:!1},e=>{e=e.find(e=>"attributes"===e.type&&"value"===e.attributeName);e&&t(e.target.value)}),e.addEventListener("change",e=>t(e.target.value))};export{observeInputValueChange};