customElements.define("page-header",class extends Theme.BaseElement{render(){if(this.hasAttribute("overlap")&&document.getElementById("MainContent").firstElementChild===this.getSectionContainer()){const e=document.getElementById("MainHeader");e.classList.add("@overlap"),this.classList.add("@overlap")}}});