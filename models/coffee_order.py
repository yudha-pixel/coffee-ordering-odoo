from odoo import models, fields, api
import uuid
from datetime import datetime, timedelta

class CoffeeTable(models.Model):
    _name = 'coffee.table'
    _description = 'Coffee Table'

    name = fields.Char('Table Name', required=True)
    token = fields.Char('Token', default=lambda self: uuid.uuid4().hex, readonly=True)
    qr_url = fields.Char('QR URL', compute='_compute_qr_url')

    def _compute_qr_url(self):
        base_url = self.env['ir.config_parameter'].sudo().get_param('web.base.url')
        for table in self:
            table.qr_url = f"{base_url}/coffee/order/{table.token}"

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
