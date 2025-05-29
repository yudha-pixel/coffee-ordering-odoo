# -*- coding: utf-8 -*-
# Part of ERPQuick. See LICENSE file for full copyright and licensing details.

{
    'name': 'ERPQuick Coffee Ordering System',
    'version': '1.0',
    'depends': ['base', 'admin_module', 'point_of_sale', 'pos_restaurant', 'website_sale', 'payment'],
    'category': 'Custom',
    'author': 'ERPQuick',
    'license': 'LGPL-3',
    'summary': 'Coffee Ordering via QR for Coffee Shops',
    'data': [
        # 'security/security.xml',
        # 'security/ir.model.access.csv',
        # 'views/coffee_order_views.xml',
        # 'views/pos_config_view.xml',
        'views/restaurant_table_views.xml',
        'views/product_template_views.xml',
        'views/menu_views.xml',

        # 'views/coffee_menu_templates.xml',
        #
        # 'data/ir_sequence.xml',
        'data/pos_config_data.xml',
        # 'data/product_attribute_demo.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'erpquick_coffee_ordering/static/src/backend/pos_kanban_view/*',
        ],
    },

    'images': ['static/description/icon.png'],
    'installable': True,
    'auto_install': False,
    'application': True,
}
