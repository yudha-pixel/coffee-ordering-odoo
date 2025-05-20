from odoo import models, fields, api
from datetime import datetime, timedelta
import uuid
import qrcode
import base64
from io import BytesIO

class CoffeeTable(models.Model):
    _name = 'coffee.table'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _description = 'Coffee Table'

    name = fields.Char('Table Name', required=True, tracking=True)
    active = fields.Boolean(default=True, tracking=True)
    token = fields.Char('Token', default=lambda self: uuid.uuid4().hex, readonly=True)
    qr_url = fields.Char('QR URL', compute='_compute_qr_url')
    qr_image = fields.Binary('QR Code Image', compute='_compute_qr_image', store=True)

    @api.depends('token')
    def _compute_qr_url(self):
        base_url = self.env['ir.config_parameter'].sudo().get_param('web.base.url')
        for table in self:
            table.qr_url = f"{base_url}/coffee/order/{table.token}"

    @api.depends('qr_url')
    def _compute_qr_image(self):
        for table in self:
            if table.qr_url:
                qr = qrcode.QRCode(version=1, box_size=10, border=4)
                qr.add_data(table.qr_url)
                qr.make(fit=True)
                img = qr.make_image(fill_color="black", back_color="white")
                buffer = BytesIO()
                img.save(buffer, format="PNG")
                qr_image_b64 = base64.b64encode(buffer.getvalue())
                table.qr_image = qr_image_b64
            else:
                table.qr_image = False

    def action_generate_qr_image(self):
        for table in self:
            table._compute_qr_url()
            table._compute_qr_image()


class CoffeeOrder(models.Model):
    _name = 'coffee.order'
    _description = 'Coffee Order'
    _inherit = ['mail.thread']

    name = fields.Char(default='New', readonly=True)
    table_id = fields.Many2one('coffee.table', string='Table')
    guest_token = fields.Char('Guest Token')
    order_line_ids = fields.One2many('coffee.order.line', 'order_id')
    session_expiry = fields.Datetime('Session Expiry')
    state = fields.Selection([
        ('draft', 'Draft'),
        ('confirmed', 'Confirmed'),
        ('preparing', 'Preparing'),
        ('done', 'Done')
    ], default='draft', tracking=True)

    @api.model
    def create(self, vals):
        vals['name'] = self.env['ir.sequence'].next_by_code('coffee.order') or 'New'
        vals['session_expiry'] = datetime.now() + timedelta(hours=24)
        return super().create(vals)

class CoffeeOrderLine(models.Model):
    _name = 'coffee.order.line'
    _description = 'Coffee Order Line'

    order_id = fields.Many2one('coffee.order')
    product_id = fields.Many2one('product.product')
    qty = fields.Integer('Qty', default=1)
    price_unit = fields.Float('Price', related='product_id.list_price', store=True)
