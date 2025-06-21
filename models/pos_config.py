from odoo import models, fields, api, _
from odoo.exceptions import ValidationError


class PosConfig(models.Model):
    _inherit = 'pos.config'

    @api.model
    def load_onboarding_coffee_scenario(self):
        if not bool(self.env.company.chart_template):
            raise ValidationError('Need to set Fiscal Localization on Package selection')

        journal, payment_methods_ids = self._create_journal_and_payment_methods()
        restaurant_categories = self.get_categories([
            'pos_restaurant.food',
            'pos_restaurant.drinks',
        ])
        not_cash_payment_methods_ids = self.env['pos.payment.method'].search([
            ('is_cash_count', '=', False),
            ('id', 'in', payment_methods_ids),
        ]).ids
        self.env['pos.config'].create([{
            'name': _('Coffee Shop'),
            'company_id': self.env.company.id,
            'journal_id': journal.id,
            'payment_method_ids': not_cash_payment_methods_ids,
            'limit_categories': True,
            'iface_available_categ_ids': restaurant_categories,
            'iface_splitbill': True,
            'module_pos_restaurant': True,
            'self_ordering_mode': 'mobile'
        }])

    def erpq_preview_self_order_app(self):
        self.ensure_one()
        return {
            "type": "ir.actions.act_url",
            "url": "/self_order/app",
            "target": "new",
        }

