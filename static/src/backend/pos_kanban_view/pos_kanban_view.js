import { PosKanbanRenderer } from "@point_of_sale/backend/pos_kanban_view/pos_kanban_view";
import { _t } from "@web/core/l10n/translation";

Object.defineProperty(PosKanbanRenderer.prototype, "restaurantScenarios", {
    get() {
        return [
            {
                name: _t("Restaurant"),
                isRestaurant: true,
                description: _t("Tables, menus, kitchen display, etc."),
                functionName: "load_onboarding_restaurant_scenario",
                iconFile: "restaurant-icon.png",
                module: "point_of_sale",
            },
            {
                name: _t("Bar"),
                isRestaurant: true,
                description: _t("Floor plan, tips, self order, etc."),
                functionName: "load_onboarding_bar_scenario",
                iconFile: "cocktail-icon.png",
                module: "point_of_sale",
            },
            {
                name: _t("Coffee Shop"),
                isRestaurant: true,
                description: _t("Small orders, mobile menus, coffee blends."),
                functionName: "load_onboarding_coffee_scenario",
                iconFile: "coffe-icon.png",
                module: "erpquick_coffee_ordering",
            },
        ];
    },
});