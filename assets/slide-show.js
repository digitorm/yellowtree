(async()=>{const{loadScript:t,loadStyle:i}=await import(window.theme.modules.utils);var e=await import(window.theme.modules.baseComponent);customElements.define("slide-show",class extends e.default{elements={sliderContainer:"[data-slider-container]",slides:"*[data-slide-variants]",nextButton:"[data-slider-button-next]",prevButton:"[data-slider-button-prev]",pagination:"[data-slider-pagination]",thumbnails:"slideshow-thumbnails"};async render(){await this._initSwiper();var t=1e3*this.getAttribute("autoplay-delay"),i=this.hasAttribute("use-autoplay")&&{delay:t},e=this.getAttribute("navigation-type");const s={delay:t,autoplay:i,pagination:("pagination"===e||"pagination_buttons"===e)&&{el:this.$pagination,clickable:!0},navigation:("buttons"===e||"pagination_buttons"===e)&&{nextEl:this.$nextButton,prevEl:this.$prevButton},zoom:this.hasAttribute("zoom"),breakpoints:this.hasAttribute("desktop-no-swipe")&&{992:{allowTouchMove:!1}},cssMode:(()=>{const t=window.navigator.userAgent;if(/CriOS/i.test(t)){var i=t.match(/(.+)(iPhone|iPad|iPod)(.+)OS[\s|\_](\d+)\_?(\d+)?[\_]?(\d+)?.+/i);if(i&&6<=i.length){var e=parseInt(i[4],10),i=parseInt(i[5],10);if(14<=e&&6<=i)return!0}}return!1})()};this.hasAttribute("sync-slider")&&(this.syncSlider=document.getElementById(this.getAttribute("sync-slider")),s.initialSlide=this.syncSlider.getCurrentSlide()),this.swiper=new window.Swiper(this.$sliderContainer,s),this.hasAttribute("observe-slide-type")&&(this._setMediaType(this.swiper.activeIndex),this.swiper.on("slideChange",({activeIndex:t})=>{this._setMediaType(t)})),this.hasAttribute("zoom")&&this.swiper.on("zoomChange",(t,i)=>{1===i?this.removeAttribute("zoomed"):this.setAttribute("zoomed","")}),this.hasAttribute("thumbnails")&&this.$thumbnails&&this.$thumbnails.onSliderLoad(this),this.syncSlider&&this.swiper.on("slideChange",()=>{this.syncSlider.slideTo(this.getCurrentSlide())}),this.hasAttribute("initial-slide")&&this.slideTo(+this.getAttribute("initial-slide"))}async _initSwiper(){await t(window.theme.scripts.Swiper,"swiper"),i(window.theme.styles.Swiper)}getCurrentSlide(){return this.swiper.activeIndex}slideTo(t){this.swiper.slideTo(t)}_setMediaType(t){this.dataset.slideMediaType=this.swiper.slides[t].dataset.mediaType}})})();