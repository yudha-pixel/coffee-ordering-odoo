// Favorites Section Component with Better Colors
import { ProductProduct, FavoriteItem } from "@/types";
import LazyImage from "./LazyImage";
import { Heart } from "lucide-react";

interface FavoritesSectionProp {
  favorites: FavoriteItem[]; 
  menuItems: ProductProduct[];
  onReorder: (favorite: FavoriteItem) => void;
}

export default function FavoritesSection({ 
  favorites, 
  menuItems, 
  onReorder }: FavoritesSectionProp) {

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Quick Reorder</h3>
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {favorites.slice(0, 5).map((favorite) => {
          const menuItem = menuItems.find(item => item.id === favorite.menuItemId);
          return (
            <button
              key={favorite.id}
              onClick={() => onReorder(favorite)}
              className="flex-shrink-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 min-w-[200px] hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  {menuItem && (
                    <LazyImage
                      src={menuItem.image}
                      alt={favorite.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{favorite.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Rp {favorite.totalPrice.toLocaleString()}</p>
                </div>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}