# -*- coding: utf-8 -*-
# Part of ERPQuick. See LICENSE file for full copyright and licensing details.

{
    'name': 'ERPQuick Coffee Ordering System',
    'version': '1.0',
    'depends': ['base', 'website', 'mail', 'product', 'sale_management'],
    'category': 'Custom',
    'author': 'ERPQuick',
    'summary': 'Coffee Ordering via QR for Coffee Shops',
    'data': [
        'security/security.xml',
        'security/ir.model.access.csv',
        'views/coffee_order_views.xml',
        'views/coffee_menu_templates.xml',
        'views/menu_views.xml',

        'data/ir_sequence.xml',
    ],
    'images': ['static/description/icon.png'],
    'installable': True,
    'auto_install': False,
    'application': True,
}
