const selectors={customerAddresses:"[data-customer-addresses]",addressCountrySelect:"[data-address-country-select]",addressContainer:"[data-address]",toggleAddressButton:"button[aria-expanded]",cancelAddressButton:'button[type="reset"]',deleteAddressButton:"button[data-confirm-message]"},attributes={expanded:"aria-expanded",confirmMessage:"data-confirm-message"};class CustomerAddresses{constructor(){this.elements=this._getElements(),0!==Object.keys(this.elements).length&&(this._setupCountries(),this._setupEventListeners())}_getElements(){const e=document.querySelector(selectors.customerAddresses);return e?{container:e,addressContainer:e.querySelector(selectors.addressContainer),toggleButtons:document.querySelectorAll(selectors.toggleAddressButton),cancelButtons:e.querySelectorAll(selectors.cancelAddressButton),deleteButtons:e.querySelectorAll(selectors.deleteAddressButton),countrySelects:e.querySelectorAll(selectors.addressCountrySelect)}:{}}_setupCountries(){Shopify&&Shopify.CountryProvinceSelector&&(new Shopify.CountryProvinceSelector("AddressCountryNew","AddressProvinceNew",{hideElement:"AddressProvinceContainerNew"}),this.elements.countrySelects.forEach(e=>{e=e.dataset.formId;new Shopify.CountryProvinceSelector(`AddressCountry_${e}`,`AddressProvince_${e}`,{hideElement:`AddressProvinceContainer_${e}`})}))}_setupEventListeners(){this.elements.toggleButtons.forEach(e=>{e.addEventListener("click",this._handleAddEditButtonClick)}),this.elements.cancelButtons.forEach(e=>{e.addEventListener("click",this._handleCancelButtonClick)}),this.elements.deleteButtons.forEach(e=>{e.addEventListener("click",this._handleDeleteButtonClick)})}_toggleExpanded(e){e.setAttribute(attributes.expanded,("false"===e.getAttribute(attributes.expanded)).toString())}_handleAddEditButtonClick=({currentTarget:e})=>{this._toggleExpanded(e)};_handleCancelButtonClick=({currentTarget:e})=>{this._toggleExpanded(e.closest(selectors.addressContainer).querySelector(`[${attributes.expanded}]`))};_handleDeleteButtonClick=({currentTarget:e})=>{confirm(e.getAttribute(attributes.confirmMessage))&&Shopify.postLink(e.dataset.target,{parameters:{_method:"delete"}})}}