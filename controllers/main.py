from odoo import http
from odoo.http import request, Response
from odoo import fields
from datetime import timedelta
import uuid
import json

class CoffeeOrderController(http.Controller):
    @http.route('/self_order/app', type='http', auth='public')
    def serve_react_app(self, **kw):
        template = 'erpquick_coffee_ordering.self_order_page_view'
        is_dev_mode = request.env['ir.config_parameter'].sudo().get_param('react_development_mode')

        if is_dev_mode == 'True':
            template = 'erpquick_coffee_ordering.self_order_page_view_dev'

        return request.render(template)

    @http.route('/self_order/app/products', type='http', auth='public', methods=['GET'], cors='*')
    def get_products_for_app(self, **kw):
        Product = request.env['product.template'].sudo().with_context(bin_size=True)
        categories = request.env['pos.category'].sudo().search([], order="sequence, name")

        grouped_products_data = []
        for category in categories:
            products = Product.search([
                ('sale_ok', '=', True),
                ('available_in_pos', '=', True),
                ('pos_categ_ids', '=', category.id),
            ])

            if products:
                products_data = []
                for product in products:
                    variants_data = {}
                    for variant in product.attribute_line_ids:
                        attribute_name = variant.attribute_id.name
                        values_data = {}
                        for ptav in variant.product_template_value_ids:
                            values_data[ptav.name] = ptav.price_extra
                        variants_data[attribute_name] = values_data
                    products_data.append({
                        'id': product.id,
                        'name': product.name,
                        'price': product.list_price,
                        'image_url': f'/web/image/product.template/{product.id}/image_1920',
                        'description': product.description_sale,
                        'product_variant_id': product.product_variant_id.id,
                        'isNew': product.is_new,
                        'isRecommend': product.is_favorite,
                        'optional_product_ids': product.optional_product_ids.ids,
                        'comboIds': product.optional_product_ids.ids,
                        'variants': variants_data,
                    })

                grouped_products_data.append({
                    'id': category.id,
                    'name': category.name,
                    'products': products_data,
                })

        # Convert the Python list to a JSON string and return it in a Response object
        return Response(
            json.dumps(grouped_products_data),
            content_type='application/json',
            status=200
        )

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


