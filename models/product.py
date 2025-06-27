from odoo import fields, models

class ProductTemplate(models.Model):
    _inherit = 'product.template'

    is_new = fields.Boolean(string="New", default=False,
                            help="If checked, this product will be marked as new.")