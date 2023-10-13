void 0===window.Shopify&&(window.Shopify={}),Shopify.bind=function(t,e){return function(){return t.apply(e,arguments)}},Shopify.setSelectorByValue=function(t,e){for(var n=0,i=t.options.length;n<i;n++){var o=t.options[n];if(e==o.value||e==o.innerHTML)return t.selectedIndex=n}},Shopify.addListener=function(t,e,n){t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent("on"+e,n)},Shopify.postLink=function(t,e){var n,i=(e=e||{}).method||"post",o=e.parameters||{},r=document.createElement("form");for(n in r.setAttribute("method",i),r.setAttribute("action",t),o){var s=document.createElement("input");s.setAttribute("type","hidden"),s.setAttribute("name",n),s.setAttribute("value",o[n]),r.appendChild(s)}document.body.appendChild(r),r.submit(),document.body.removeChild(r)},Shopify.CountryProvinceSelector=function(t,e,n){this.countryEl=document.getElementById(t),this.provinceEl=document.getElementById(e),this.provinceContainer=document.getElementById(n.hideElement||e),Shopify.addListener(this.countryEl,"change",Shopify.bind(this.countryHandler,this)),this.initCountry(),this.initProvince()},Shopify.CountryProvinceSelector.prototype={initCountry:function(){var t=this.countryEl.getAttribute("data-default");Shopify.setSelectorByValue(this.countryEl,t),this.countryHandler()},initProvince:function(){var t=this.provinceEl.getAttribute("data-default");t&&0<this.provinceEl.options.length&&Shopify.setSelectorByValue(this.provinceEl,t)},countryHandler:function(t){var e=(i=this.countryEl.options[this.countryEl.selectedIndex]).getAttribute("data-provinces"),n=JSON.parse(e);if(this.clearOptions(this.provinceEl),n&&0==n.length)this.provinceContainer.style.display="none";else{for(var i,o=0;o<n.length;o++)(i=document.createElement("option")).value=n[o][0],i.innerHTML=n[o][1],this.provinceEl.appendChild(i);this.provinceContainer.style.display=""}},clearOptions:function(t){for(;t.firstChild;)t.removeChild(t.firstChild)},setOptions:function(t,e){var n=0;for(e.length;n<e.length;n++){var i=document.createElement("option");i.value=e[n],i.innerHTML=e[n],t.appendChild(i)}}},void 0===window.Theme&&(window.Theme={},window.Theme.utils={});class BaseElement extends HTMLElement{constructor(){super(),"function"==typeof this.onClick&&this.addEventListener("click",this.onClick),this.sectionId=this.getAttribute("section-id")}listenTo(t,e,n=!0){window.addEventListener(t,t=>{(t.detail.sectionId===this.sectionId&&n||!n)&&e.bind(this)(t,t.detail)})}forwardEvent(t,e={}){e=new CustomEvent(t,{bubbles:!0,composed:!0,detail:{sectionId:this.sectionId,...e}});this.dispatchEvent(e)}getSectionContainer(){if(!this.sectionId)return null;var t=`shopify-section-${this.sectionId}`;return document.getElementById(t)}connectedCallback(){if(this.elements)for(var[t,e]of Object.entries(this.elements))this[`$${t}`]="*"===e[0]?Array.from(this.querySelectorAll(e.substring(1))):this.querySelector(e);this.render()}}const moneyFormat="${{amount}}";function formatMoney(t,e){"string"==typeof t&&(t=t.replace(".",""));let n="";var i=/\{\{\s*(\w+)\s*\}\}/;const o=e||moneyFormat;function r(t,e=2,n=",",i="."){if(isNaN(t)||null==t)return 0;const o=(t=(t/100).toFixed(e)).split(".");return o[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,`$1${n}`)+(o[1]?i+o[1]:"")}switch(o.match(i)[1]){case"amount":n=r(t,2);break;case"amount_no_decimals":n=r(t,0);break;case"amount_with_comma_separator":n=r(t,2,".",",");break;case"amount_no_decimals_with_comma_separator":n=r(t,0,".",",")}return o.replace(i,n)}window.Theme.utils.formatMoney=formatMoney,window.Theme.BaseElement=BaseElement,window.gm_authFailure=()=>{document.querySelectorAll("google-map").forEach(t=>{t.onAuthError&&t.onAuthError()})};