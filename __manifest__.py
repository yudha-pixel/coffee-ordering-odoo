# -*- coding: utf-8 -*-
# Part of ERPQuick. See LICENSE file for full copyright and licensing details.

{
    'name': 'ERPQuick Coffee Ordering System',
    'version': '1.0',
    'depends': ['base', 'website', 'mail', 'product', 'sale_management',
                'om_account_accountant','point_of_sale', 'pos_restaurant', 'website_sale'],
    'category': 'Custom',
    'author': 'ERPQuick',
    'license': 'LGPL-3',
    'summary': 'Coffee Ordering via QR for Coffee Shops',
    'data': [
        'security/security.xml',
        'security/ir.model.access.csv',
        'views/coffee_order_views.xml',
        'views/menu_views.xml',

        'views/coffee_menu_templates.xml',

        'data/ir_sequence.xml',
        'data/pos_config_data.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'erpquick_coffee_ordering/static/src/js/qty_control.js',
    ],
},

    'images': ['static/description/icon.png'],
    'installable': True,
    'auto_install': False,
    'application': True,
}
