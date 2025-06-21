from odoo import fields, models, api

from io import BytesIO

import base64
import qrcode
import uuid

class RestaurantTable(models.Model):
    _name = 'restaurant.table'
    _inherit = ['restaurant.table', 'mail.thread', 'mail.activity.mixin']

    name = fields.Char(string='Coffee Name', compute='_compute_name', store=True)
    token = fields.Char('Token', default=lambda self: uuid.uuid4().hex, readonly=True, tracking=True)
    qr_url = fields.Char('QR URL', compute='_compute_qr_url')
    qr_image = fields.Binary('QR Code Image', compute='_compute_qr_image', store=True)

    @api.depends('floor_id.name', 'table_number')
    def _compute_name(self):
        for table in self:
            floor = (table.floor_id.name or "Floor").replace(" ", "")
            number = table.table_number or 0
            base_name = f'{floor}-T{number}'
            name = base_name

            i = 1
            while self.search_count([('name', '=', name), ('id', '!=', table.id)]) > 0:
                name = f"{base_name}_{i}"
                i += 1

            table.name = name

    @api.depends('token')
    def _compute_qr_url(self):
        base_url = self.env['ir.config_parameter'].sudo().get_param('web.base.url')
        for table in self:
            table.qr_url = f"{base_url}/pos-self/{table.floor_id.id}/{table.name}/{table.token}"

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

    def print_qr(self):
        return self.env.ref('your_module.report_qr_single_table').report_action(self)
