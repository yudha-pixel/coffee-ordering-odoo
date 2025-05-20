# -*- coding: utf-8 -*-
# Part of ERPQuick. See LICENSE file for full copyright and licensing details.

{
    'name': 'Coffee Ordering System',
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
    ],
    'installable': True,
    'application': True,
}
