(async()=>{var t=await import(window.theme.modules.baseComponent);customElements.define("cart-counter",class extends t.default{render(){this.on("updateCart",this._fetchCart.bind(this),!1),this.on("cartChange",this._fetchCart.bind(this),!1)}_fetchCart(t){fetch(`${this.getAttribute("cart-url")}.js`).then(t=>t.json()).then(this._update.bind(this)).catch(t=>console.error(t))}_update(t){this.textContent=t.item_count,0!=+t.item_count?this.hasAttribute("empty")&&0!=+t.item_count&&this.removeAttribute("empty"):this.setAttribute("empty","true")}})})();