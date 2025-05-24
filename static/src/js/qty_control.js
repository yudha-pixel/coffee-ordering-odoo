odoo.define('erpquick_coffee_ordering.qty_control', [], function (require) {
    "use strict"


    import publicWidget from '@web/legacy/js/public/public_widget';

    function increaseQty(btn) {
        const input = document.querySelector(btn.getAttribute('data-target'));
        input.value = parseInt(input.value || 0) + 1;
    }

    function decreaseQty(btn) {
        const input = document.querySelector(btn.getAttribute('data-target'));
        let val = parseInt(input.value || 0);
        if (val > 0) input.value = val - 1;
    }

    function sanitizeQty(input) {
        const val = parseInt(input.value);
        input.value = (isNaN(val) || val < 0) ? 0 : val;
    }

    window.increaseQty = increaseQty;
    window.decreaseQty = decreaseQty;
    window.sanitizeQty = sanitizeQty;

    publicWidget.registry.CoffeeOrderCartHandler = publicWidget.Widget.extend({
        selector: '.js-add-to-cart', // tombol yang akan ditarget
        events: {
            'click': '_onAddToCartClick',
        },

        _onAddToCartClick: function (ev) {
            ev.preventDefault();
            const button = ev.currentTarget;
            const productId = parseInt(button.dataset.productId);
            const modal = button.closest('.modal');

            // Get qty
            const qtyInput = modal.querySelector('input[id^="qty_"]');
            const qty = parseInt(qtyInput?.value || 1);

            // Get selected variant (radio)
            const variantInput = modal.querySelector('input[name^="variant_"]:checked');
            const variantId = variantInput ? parseInt(variantInput.value) : false;

            // Get addons (checkbox)
            const addonsInput = modal.querySelectorAll('input[name^="addon_"]:checked');
            const addons = Array.from(addonsInput).map(input => parseInt(input.name.split('_')[1]));

            // Get note
            const noteInput = modal.querySelector('textarea[name="note"]');
            const note = noteInput?.value || "";

            if (qty > 0) {
                fetch("/order/add_to_cart", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ params: {
                        product_id: productId,
                        qty: qty,
                        variant_id: variantId,
                        addons: addons,
                        note: note,
                    }}),
                }).then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert("Added to cart!");
                        } else {
                            alert("Failed to add item.");
                        }
                    });
            }
        },
    });
});
