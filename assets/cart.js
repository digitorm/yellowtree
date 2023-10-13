  (async () => {
    var t = await import(window.theme.modules.baseComponent);
    customElements.define(
        "main-cart",
        class extends t.default {
            elements = { items: "cart-items", subtotal: "subtotal-price" };
            render() {
                this.listenTo("cartChange", (t, e) => {
                    const i = e.html.querySelector("main-cart");
                    i.hasAttribute("is-empty") ? this.setAttribute("is-empty", "") : this.removeAttribute("is-empty"), this.$subtotal.replaceChildren(...e.html.querySelector(this.elements.subtotal).childNodes);
                });
            }
            update(s) {
                fetch(`${this.getAttribute("cart-url")}?section_id=${this.sectionId}`)
                    .then((t) => t.text())
                    .then((t) => {
                        const e = new DOMParser().parseFromString(t, "text/html"),
                            i = e.querySelector("main-cart");
                        i.hasAttribute("is-empty") ? this.setAttribute("is-empty", "") : this.removeAttribute("is-empty"),
                            this.$items.replaceChildren(...i.querySelector(this.elements.items).childNodes),
                            this.$subtotal.replaceChildren(...i.querySelector(this.elements.subtotal).childNodes),
                            s();
                    })
                    .catch((t) => {
                        console.error(t);
                    });
            }
        }
    ),
        customElements.define(
            "s-subtotal-price",
            class extends t.default {
                render() {
                    this.listenTo("cartChange", (t, e) => {
                        e = e.html.querySelector("subtotal-price");
                        this.replaceChildren(...e.childNodes);
                    });
                }
            }
        ),
        customElements.define(
            "cart-item",
            class extends t.default {
                elements = { plusButton: "[data-inc]", minusButton: "[data-dec]", removeButton: "[data-remove]", qtyInput: "[data-input]", linePrice: "[data-total]" };
                render() {
                    (this.sectionId = this.getAttribute("section-id")),
                        (this.lineIndex = this.getAttribute("line-item-index")),
                        (this.variantId = this.getAttribute("cart-item-variant-id")),
                        (this.qtyValue = +this.$qtyInput.value),
                        (this.variantQtyLimit = +this.$qtyInput.max),
                        this._handleInteractions();
                }
                _handleInteractions() {
                    this.$plusButton.addEventListener("click", () => this._validateInput(1)),
                        this.$minusButton.addEventListener("click", () => this._validateInput(-1)),
                        this.$qtyInput.addEventListener("change", () => this._validateInput()),
                        this.$removeButton.addEventListener("click", this._removeItem.bind(this));
                }
                _validateInput(t) {
                    t = t ? this.qtyValue + t : +this.$qtyInput.value;
                    t < 1 || (this.variantQtyLimit && t > this.variantQtyLimit) ? (this.$qtyInput.value = this.qtyValue) : ((this.qtyValue = t), this._updateUI(), this._updateCartRequest(t));
                }
                _removeItem(t) {
                    t.preventDefault(), this._updateCartRequest(0);
                }
                _updateUI() {
                    this._updateInputValue(), this._updateButtons();
                }
                _updateInputValue() {
                    this.$qtyInput.value = this.qtyValue;
                }
                _updateButtons() {
                    (this.$plusButton.disabled = this.qtyValue === this.variantQtyLimit), (this.$minusButton.disabled = 1 === this.qtyValue);
                }
                _updateCartRequest(e) {
                    this.setAttribute("loading", "");
                    var t = JSON.stringify({ id: this.variantId, quantity: e, sections: this.sectionId, sections_url: this.getAttribute("cart-url") });
                    fetch(`${routes.cart_change_url}`, { ...{ method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" } }, body: t })
                        .then((t) => t.json())
                        .then((t) => {
                            (t = t.sections[this.sectionId]), (t = new DOMParser().parseFromString(t, "text/html"));
                            this._acceptChanges(t, e), this.removeAttribute("loading");
                              if ($('.free-shipping-rate-container').length > 0) {
                                    let qouta = $('.free-shipping-rate-container').data('qouta');
                                    jQuery.getJSON('/cart.js', function(cart) {
                                    function shipping_countdown(data, qouta = 100) {
                                      let data_use = {
                                          all_data: {
                                            total: data.total_price/100,
                                            qouta: qouta,
                                  
                                          },
                                          templates: {
                                            data_ship: function(qouta, cur_price){
                                              let ship_qouta = parseFloat(qouta -  cur_price).toFixed(2);
                                              let percent = (cur_price/qouta) * 100;
                                              
                                              let cont_container = $(".free-shipping-rate-container");
                                              if(cont_container.is(":visible") == false || cur_price != 0 ){
                                                cont_container.show();
                                              }else{
                                                cont_container.hide();
                                              }
                                              if(ship_qouta <= 0 ){
                                                  $(".free_shipping_container .freeshipt_cont").html(`Congratulations on your Free Shipping!`);
                                                  $(".free_shipping_container .progress-meter").css({
                                                    width: `100%`
                                                  })
                                                }else{
                                                  $(".free_shipping_container .freeshipt_cont").html(` Only <span class="color_red">$${ship_qouta}</span> away from <span> free shipping </span>`);
                                                  $(".free_shipping_container .progress-meter").css({
                                                    width: `${percent}%`
                                                  })
                                                
                                                }
                                            },
                                          } 
                                      }
                                      
                                      data_use.templates.data_ship(data_use.all_data.qouta, data_use.all_data.total);
                                    }

                                    shipping_countdown(cart, qouta);
                                  
                                  });
                                  }
                        })
                        .catch((t) => {
                            console.error(t);
                        });
                }
                _acceptChanges(t, e) {
                    this.forwardEvent("cartChange", { html: t, remove: 0 === e, variantId: this.variantId }), 0 !== e ? this._updateLinePrice(t) : this.remove();
                }
                _updateLinePrice(t) {
                    t = t.querySelector(`[data-total="${this.variantId}"]`);
                    this.$linePrice.replaceChildren(...t.childNodes);
                }
            }
        );
})();