(async()=>{const{updateURLParams:i,historyPush:r}=await import(window.theme.modules.utils);var t=await import(window.theme.modules.baseComponent);customElements.define("active-filter",class extends t.default{render(){this.addEventListener("click",t=>{t.preventDefault(),this._onActiveFilterClick(t)})}_onActiveFilterClick(t){t.preventDefault(),this.trigger("filterUpadting"),this.hasAttribute("price")&&this.trigger("resetPriceFilter");var e=window.location.origin+this.getAttribute("url"),{queryURL:t}=i({},this.sectionId,e);this._fetchChanges(t),r(e)}_fetchChanges(t){fetch(t).then(t=>t.text()).then(t=>{this.forwardEvent("filterChange",{html:t,src:"active-filters"})})}})})();