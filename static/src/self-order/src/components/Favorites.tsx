import { useState } from 'react';
import { ArrowLeft, Heart, Trash2, Plus, Coffee } from 'lucide-react';
import { Button } from './ui/button';
import LogoWhite from "../assets/LogoWhite.png";

// interface CartItem {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   quantity: number;
//   customizations?: {
//     size: string;
//     milk: string;
//     toppings: string[];
//     notes: string;
//   };
// }

interface MenuItem {
  id: string;
  name: string;
  description: string;
  basePrice: number; // Updated to match App.tsx structure
  variants?: {
    sizes?: {
      Small: number;
      Regular: number;
      Large: number;
    };
    milk?: {
      Regular: number;
      'Oat Milk': number;
      'Almond Milk': number;
      'Soy Milk': number;
    };
  };
  image: string;
  category: string;
  isNew?: boolean;
  isRecommended?: boolean;
  orderCount?: number;
  comboWith?: string[];
}

interface FavoriteItem {
  id: string;
  menuItemId: string;
  name: string;
  customizations: {
    size: string;
    milk: string;
    toppings: string[];
    notes: string;
  };
  totalPrice: number;
  savedAt: Date;
}

interface FavoritesProps {
  onBack: () => void;
  favorites: FavoriteItem[];
  menuItems: MenuItem[];
  onRemoveFavorite: (favoriteId: string) => void;
  onReorder: (favorite: FavoriteItem) => void;
  onAddToCart: (item: MenuItem, quantity: number, customizations: any) => void;
}

export default function Favorites({ 
  onBack, 
  favorites, 
  menuItems, 
  onRemoveFavorite, 
  // onReorder,
  onAddToCart 
}: FavoritesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Get unique categories from favorites
  const categories = ['All', ...Array.from(new Set(
    favorites.map(fav => {
      const menuItem = menuItems.find(item => item.id === fav.menuItemId);
      return menuItem?.category || 'Unknown';
    })
  ))];

  // Filter favorites by category
  const filteredFavorites = selectedCategory === 'All' 
    ? favorites 
    : favorites.filter(fav => {
        const menuItem = menuItems.find(item => item.id === fav.menuItemId);
        return menuItem?.category === selectedCategory;
      });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleReorder = (favorite: FavoriteItem) => {
    const menuItem = menuItems.find(item => item.id === favorite.menuItemId);
    if (menuItem) {
      onAddToCart(menuItem, 1, favorite.customizations);
    }
  };

  return (
    <div className="relative size-full bg-white">
      {/* Header */}
      <div className="bg-[#167dda] h-16 overflow-clip relative shrink-0 w-full">
        <div className="flex flex-row items-center relative size-full px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 flex justify-center">
            <h1 className="text-xl font-bold text-white">My Favorites</h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {favorites.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Favorites Yet</h3>
            <p className="text-gray-500 mb-6 max-w-sm">
              Save your favorite coffee customizations for quick reordering. 
              Add items to favorites when customizing your order.
            </p>
            <Button
              onClick={onBack}
              className="bg-[#84482b] hover:bg-[#6d3a23] text-white px-6 py-3 rounded-xl"
            >
              <Coffee className="w-5 h-5 mr-2" />
              Browse Menu
            </Button>
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            {/* Category Filter */}
            <div className="p-5 pb-3">
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category 
                        ? 'bg-[#84482b] text-white shadow-lg' 
                        : 'bg-white text-[#84482b] border-2 border-[#84482b] hover:bg-[#84482b] hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats - Changed from danger red to friendly blue/purple */}
            <div className="px-5 pb-4">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {filteredFavorites.length} Saved {filteredFavorites.length === 1 ? 'Favorite' : 'Favorites'}
                    </h3>
                    <p className="text-sm text-gray-600">Ready for quick reorder</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-purple-600 fill-current" />
                  </div>
                </div>
              </div>
            </div>

            {/* Favorites List */}
            <div className="px-5 pb-6 space-y-4">
              {filteredFavorites.map((favorite) => {
                const menuItem = menuItems.find(item => item.id === favorite.menuItemId);
                
                return (
                  <div
                    key={favorite.id}
                    className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
                  >
                    <div className="flex space-x-4">
                      {/* Image */}
                      <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                        {menuItem && (
                          <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url('${menuItem.image}')` }}
                          />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-base">
                              {favorite.name}
                            </h3>
                            <div className="mt-1 space-y-1">
                              <p className="text-sm text-gray-600">
                                Size: {favorite.customizations.size} • {favorite.customizations.milk}
                              </p>
                              {/* Fixed: Safe access to toppings array */}
                              {favorite.customizations.toppings && favorite.customizations.toppings.length > 0 && (
                                <p className="text-xs text-gray-500">
                                  Toppings: {favorite.customizations.toppings.join(', ')}
                                </p>
                              )}
                              {favorite.customizations.notes && (
                                <p className="text-xs text-gray-500">
                                  Note: {favorite.customizations.notes}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center space-x-2 ml-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveFavorite(favorite.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 h-auto"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Price and Actions */}
                        <div className="flex justify-between items-center mt-3">
                          <div className="space-y-1">
                            <div className="font-bold text-lg text-gray-900">
                              Rp {favorite.totalPrice.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              Saved {formatDate(new Date(favorite.savedAt))}
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => handleReorder(favorite)}
                            className="bg-[#84482b] hover:bg-[#6d3a23] text-white px-4 py-2 rounded-xl flex items-center space-x-2"
                          >
                            <Plus className="w-4 h-4" />
                            <span className="text-sm font-medium">Add to Cart</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Powered By Footer */}
      <div className="bg-[#000000] p-4">
        <div className="flex flex-row items-center justify-center gap-[5px]">
          <div className="font-['Poppins:Medium',_sans-serif] font-medium leading-[0] not-italic text-[#ffffff] text-[12px] text-right tracking-[-0.06px]">
            <p className="block leading-[1.35]">Powered By </p>
          </div>
          <div
            className="aspect-[960/320] bg-center bg-cover bg-no-repeat h-4 shrink-0"
            style={{ backgroundImage: `url('${LogoWhite}')` }}
          />
        </div>
      </div>
    </div>
  );
}