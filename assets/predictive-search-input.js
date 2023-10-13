(async()=>{const{debounce:e,parseHTML:i}=await import(window.theme.modules.utils);var t=await import(window.theme.modules.baseComponent);customElements.define("predictive-search-input",class extends t.default{elements={input:'input[name="q"]',results:"[data-results]"};minChars=3;render(){this.sources=this.getAttribute("sources").split(",").filter(Boolean),this.$input.setAttribute("autocomplete","off"),this.$input.focus(),this.$input.addEventListener("input",e(this._inputHandler.bind(this),300).bind(this))}_inputHandler(e){this.searchQuery=this.$input.value.trim(),this.searchQuery.length>=this.minChars?this._getSearchResults():this._cleanResults()}_getSearchResults(){const e=`q=${window.encodeURIComponent(this.searchQuery)}`,t=`${window.encodeURIComponent("resources[type]")}=${this.sources.join(",")}${this.hasAttribute("only-stock-products")?"resources[options][unavailable_products]=hide":""}`,s=`${window.encodeURIComponent("resources[limit]")}=${this.getAttribute("results-limit")}`;fetch(`${window.theme.routes.predictiveSearch}?${[e,t,s,"section_id=predictive-search"].join("&")}`).then(e=>{if(e.ok)return e.text()}).then(e=>{e=i(e).querySelector("#shopify-section-predictive-search");e?this.$results.replaceChildren(e):this._cleanResults()})}_cleanResults(){this.$results.replaceChildren()}})})();