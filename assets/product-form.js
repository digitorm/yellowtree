
  (async () => {
    const { updateURLParams: n, historyPush: a, parseHTML: i } = await import(window.theme.modules.utils);
    var t = await import(window.theme.modules.baseComponent);
    customElements.define(
        "product-form",
        class extends t.default {
            elements = { form: "form", addButton: "[data-add-button]", buyButton: "[data-buy-button]", content: "[data-content]", input: "[data-variant-id-input]", sellingPlanInput: 'input[name="selling_plan"]' };
            async render() {
                if (
                    (this._enableInput(),
                    (this.cartSection = document.querySelector("main-cart")),
                    (this.isProductPage = "product" === this.getAttribute("page-type")),
                    this.listenTo("variantChange", (t, e) => {
                        this._rerender(e), e.variant && this._rerenderVariantInput(e);
                    }),
                    this.on(
                        "cartChange",
                        (t, e) => {
                            this._updateQtyStatus(e.variantId);
                        },
                        !1
                    ),
                    this.hasAttribute("cart-popup") && this.$form.addEventListener("submit", this._handleSubmit.bind(this)),
                    this.$sellingPlanInput && this.hasAttribute("selling-plan-enable"))
                ) {
                    this.currentSellingPlanId = this.querySelector('input[name="selling_plan"]').value;
                    const { observeInputValueChange: t } = await import(window.theme.modules.sellingPlanUtil);
                    t(this.$sellingPlanInput, this._handleSellingPlanChange.bind(this));
                }

               // Add the event listener for customAddToCart event
              this.addEventListener("customAddToCart", (event) => {
                const { variants } = event.detail;
                this.customAddToCart(variants);
              });
              
            }
            _handleSellingPlanChange(t) {
                var e;
                t !== this.currentSellingPlanId &&
                    ((this.currentSellingPlanId = t),
                    ({ queryURL: e, currentURL: t } = n({ selling_plan: this.currentSellingPlanId, variant: this.getAttribute("current-variant") }, this.sectionId)),
                    this.isProductPage && a(t),
                    this._fetchPageWithVariant(e, (t) => {
                        this.forwardEvent("sellingPlanChange", { html: t });
                    }));
            }
            _enableInput() {
                this.$input.disabled = !1;
            }
            _fetchPageWithVariant(t, e) {
                return fetch(t)
                    .then((t) => t.text())
                    .then((t) => {
                        t = i(t);
                        e(t);
                    });
            }
            _rerender(t) {
                const e = t.html.querySelector("[data-content]");
                this.$content.replaceChildren(...e.cloneNode(!0).childNodes), this._rerenderPaymentButton();
            }
            _rerenderVariantInput(t) {
                this.setAttribute("current-variant", `${t.variant.id}`);
                t = t.html.querySelector(this.elements.input).value;
                this.$input.value = t;
            }
            _rerenderPaymentButton() {
                window.Shopify?.PaymentButton?.init && window.Shopify.PaymentButton.init();
            }
            _handleSubmit(t) {
                t.preventDefault(), (this.formData = new FormData(t.target)), this._addToCartRequest();
            }
            _addToCartRequest() {
                this._setLoading(!0),
                    fetch(`${window.routes.cart_add_url}.js`, { method: "POST", headers: { Accept: "application/javascript" }, body: this.formData })
                        .then((t) => t.json())
                        .then(data => {
                            this.trigger("updateCart", {
                                callback: () => {
                                    this._setLoading(!1), this._updateQtyStatus(this.formData.get("id")), this.cartSection ? this.cartSection.update() : this.trigger("openPopup", { target: "CART" });
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
                                              if($("#MyElement").is(":visible") == false || cur_price != 0 ){
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
                                },
                            });
                        })
                        .catch((t) => {
                            this._setLoading(!1), console.log(t);
                        });
            }
          
            // Add this new customAddToCart method to the class
           async customAddToCart(variants) {
             const button = document.getElementById("product-add-to-cart");
              const addedVariants = [];
            
              for (const { title, quantity } of variants) {
                const variant = window.productInfo.colorVariants.find(v => v.title === title);
                if (variant) {
                  const added = await this._customAddVariantToCart(variant.id, quantity);
                  if (added) {
                    addedVariants.push(variant.id);
                  }
                }
              }
            
              // Trigger cart update
                this.trigger("updateCart", {
                  callback: () => {
                    if (this.cartSection) {
                      this.cartSection.update();
                      button.classList.remove("loader");
                    } else {
                      this.trigger("openPopup", { target: "CART" });
                      button.classList.remove("loader");
                    }
                  },
                });
            }

            // Add this new _customAddVariantToCart method to the class
            async _customAddVariantToCart(variantId, quantity) {
              const form = new FormData();
              form.append("id", variantId);
              form.append("quantity", quantity);

              // Add properties with the specific naming convention
              form.append("properties[Toastie]", 'Multi Pack');
      
              await fetch(`${window.routes.cart_add_url}.js`, {
                method: "POST",
                headers: { Accept: "application/javascript" },
                body: form,
              });
            }

            _updateQtyStatus(e) {
                var t = `${this.getAttribute("product-url")}?variant=${e}&section_id=${this.getAttribute("section-id")}`;
                this._fetchPageWithVariant(t, (t) => {
                    this.trigger("qtyStatusUpdate", { html: t, variantId: e }), this._rerender({ html: t });
                });
            }
            _setLoading(t) {
                t ? this.$addButton.setAttribute("loading", "") : this.$addButton.removeAttribute("loading");
            }
        }
    );
})();
