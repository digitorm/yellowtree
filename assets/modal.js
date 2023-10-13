(async()=>{var t=await import(window.theme.modules.baseComponent);const{hideElement:e,showElement:i,parseHTML:o}=await import(window.theme.modules.utils);customElements.define("modal-close",class extends t.default{render(){this.addEventListener("click",t=>{t.preventDefault(),this.trigger("closePopup")})}}),customElements.define("modal-trigger",class extends t.default{render(){this.addEventListener("click",t=>{t.preventDefault(),this.forwardEvent("openPopup",{target:this.getAttribute("target"),url:this.getAttribute("url"),layout:this.getAttribute("layout"),hiddenClose:this.hasAttribute("hidden-close")})})}}),customElements.define("modal-popup",class extends t.default{elements={content:"[data-content]",overlay:"[data-overlay]",close:"[data-close]",layout:"[data-layout]"};animationTimeout=300;html=document.querySelector("html");defaultLayoutClass="default";render(){this.hasAttribute("enable-cart")&&this._initCart(),[this.$overlay,this.$close].map(this._closeOnClick.bind(this)),this.setAttribute("style",`--transition: ${this.animationTimeout}ms;`),this.listenTo("openPopup",(t,s)=>(this.target=s.target,"CART"===s.target?this.cartContent?(this.layout="sidebar",this.$content.replaceChildren(this.cartContent),this._setLayout(),void this._openModal()):void 0:(this.triggerSectionId=t.detail.sectionId,this.layout=s.layout||"default",this._setLayout(),s.hiddenClose&&e(this.$close),this._openModal(),void(s.url?(this.setAttribute("loading",""),fetch(s.url).then(t=>t.text()).then(t=>{const e=new DOMParser,i=e.parseFromString(t,"text/html");var o=i.querySelector(s.target);this.removeAttribute("loading"),(t=this.$content).appendChild(o),Array.from(t.querySelectorAll("script")).forEach(t=>{const e=document.createElement("script");Array.from(t.attributes).forEach(t=>e.setAttribute(t.name,t.value)),e.appendChild(document.createTextNode(t.innerHTML)),t.parentNode.replaceChild(e,t)})}).catch(t=>console.error(t))):(this.contentWrapper=document.querySelector(s.target),this.contentWrapper.content?this.$content.replaceChildren(...this.contentWrapper.content.cloneNode(!0).childNodes):this.$content.replaceChildren(...this.contentWrapper.childNodes))))),!1),this.on("closePopup",this._closeModal.bind(this),!1),this.trigger("modalReady"),window.theme.modalReady=!0}_closeOnClick(t){t.addEventListener("click",this._closeModal.bind(this))}_closeModal(){this.removeAttribute("opened"),this.setAttribute("closing",""),setTimeout(()=>{this.contentWrapper&&!this.contentWrapper.content?this.contentWrapper.replaceChildren(...this.$content.childNodes):this.$content.replaceChildren(),this._resetLayout(),i(this.$close),this.removeAttribute("closing")},this.animationTimeout),this.html.classList.remove("overflow-hidden"),this.trigger("popupClosed",{sectionId:this.triggerSectionId})}_openModal(){this.setAttribute("opened",""),this.html.classList.add("overflow-hidden"),this.trigger("popupOpened",{sectionId:this.triggerSectionId})}_setLayout(){this.layout&&this.classList.add(`@layout:${this.layout}`)}_resetLayout(){this.layout&&this.classList.remove(`@layout:${this.layout}`)}_initCart(){const t=this.getAttribute("cart-url"),e=this.getAttribute("cart-target");t&&e&&(fetch(t).then(t=>t.text()).then(t=>{t=o(t).querySelector(e);this.cartContent=t,document.body.appendChild(this.cartContent),document.body.removeChild(this.cartContent)}),this.on("updateCart",(t,{callback:e})=>{this.cartContent.update(e)},!1))}})})();