(async()=>{var e=await import(window.theme.modules.baseComponent);customElements.define("main-header",class extends e.default{elements={logo:"[data-logo]",nav:"main-nav"};render(){this.setOverlap(),this.on("stickyMainHeader",(e,{sticky:t})=>{t?(this.classList.add("@sticky"),document.body.style.setProperty("--sticky-header-offset",`${this.$nav.offsetHeight}px`)):(this.classList.remove("@sticky"),document.body.style.setProperty("--sticky-header-offset","0"))})}setOverlap(){if(this.style.setProperty("--nav-height",`${this.$nav.offsetHeight}px`),this.hasAttribute("overlap")){const e=document.getElementById("MainContent").firstElementChild,t=e.querySelector("[data-main-header-overlap]");t?(t.classList.add("@main-header-overlap"),this.classList.add("@overlap")):this.classList.remove("@overlap")}}})})();