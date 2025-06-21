from odoo import http
from odoo.http import request
from odoo import fields
from datetime import timedelta
import uuid

class CoffeeOrderController(http.Controller):
    @http.route('/self_order/app', type='http', auth='public')
    def serve_react_app(self, **kw):
        template = 'erpquick_coffee_ordering.self_order_page_view'
        is_dev_mode = request.env['ir.config_parameter'].sudo().get_param('react_development_mode')

        if is_dev_mode == 'True':
            template = 'erpquick_coffee_ordering.self_order_page_view_dev'

        return request.render(template)

    # @http.route('/order', type='http', auth='public', website=True)
    @http.route('/order', auth="public", website=True)
    def order_menu(self, **kwargs):
        Product = request.env['product.template'].sudo().with_context(bin_size=True)
        categories = request.env['pos.category'].sudo().search([], order="sequence, name")

        grouped_products = []
        for category in categories:
            products = Product.search([
                ('sale_ok', '=', True),
                ('available_in_pos', '=', True),
                ('pos_categ_ids', '=', category.id),
            ])
            products = products.filtered(lambda p: p.product_variant_id.is_published)
            if products:
                grouped_products.append({
                    'category': category,
                    'products': products,
                })

        return request.render('erpquick_coffee_ordering.coffee_order_menu_page', {
            'grouped_products': grouped_products,
        })

    @http.route('/submit-order', type='http', auth='public', website=True, csrf=False)
    def submit_order(self, **post):
        product_lines = []
        for key, value in post.items():
            if key.startswith('product_') and value:
                try:
                    product_id = int(key.split('_')[1])
                    qty = int(value)
                    if qty > 0:
                        product_lines.append((product_id, qty))
                except:
                    continue

        if not product_lines:
            return request.redirect('/order')  # or show error

        # Buat Sale Order
        order = request.env['sale.order'].sudo().create({
            'partner_id': request.website.partner_id.id,
            'order_line': [
                (0, 0, {
                    'product_id': p_id,
                    'product_uom_qty': qty,
                }) for p_id, qty in product_lines
            ]
        })

        return request.redirect('/order/success')

    @http.route('/order/success', type='http', auth='public', website=True)
    def order_success(self):
        return request.render('erpquick_coffee_ordering.coffee_order_success_page')

    @http.route('/order/add_to_cart', type='json', auth='public', csrf=False)
    def add_to_cart(self, product_id, qty, variant_id=None, addons=None, note=None):
        token = request.session.get('guest_token')
        product_id = variant_id or product_id.product_variant_id

        if not token:
            token = uuid.uuid4().hex
            request.session['guest_token'] = token

        # Cari guest partner berdasarkan token
        Partner = request.env['res.partner'].sudo()
        partner = Partner.search([('is_guest', '=', True), ('name', '=', f"Guest {token}")], limit=1)

        if not partner:
            partner = Partner.create({
                'name': f"Guest {token}",
                'is_guest': True,
                'guest_expiry': fields.Datetime.now() + timedelta(hours=24)
            })

        SaleOrder = request.env['sale.order'].sudo()
        order = request.session.get('coffee_order_id')
        if order:
            sale_order = SaleOrder.browse(order)
        else:
            sale_order = SaleOrder.create({
                'partner_id': partner.id,
                'state': 'draft'
            })
            request.session['coffee_order_id'] = sale_order.id

        line = sale_order.order_line.filtered(lambda l: l.product_id.id == product_id)
        if line:
            line.product_uom_qty += qty
        else:
            sale_order.order_line.create({
                'order_id': sale_order.id,
                'product_id': product_id,
                'product_uom_qty': qty,
                'name': note or request.env['product.product'].browse(product_id).name,
            })

            if addons:
                for addon_id in addons:
                    sale_order.order_line.create({
                        'order_id': sale_order.id,
                        'product_id': addon_id,
                        'product_uom_qty': 1,
                    })


        return {"success": True, "order_id": sale_order.id}


