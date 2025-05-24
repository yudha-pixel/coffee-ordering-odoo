from odoo import fields, models

class ResPartner(models.Model):
    _inherit = 'res.partner'

    is_guest = fields.Boolean('Is Guest Partner', default=False)
    guest_expiry = fields.Datetime('Guest Expiry')

    def _cron_delete_expired_guests(self):
        expired_partners = self.env['res.partner'].sudo().search([
            ('is_guest', '=', True),
            ('guest_expiry', '<', fields.Datetime.now())
        ])
        expired_partners.unlink()
