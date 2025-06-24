import { useState } from 'react';
import { X, Heart, Plus, Minus, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Customizations, ProductProduct } from "@/types";

interface FavoriteItem {
  id: string;
  menuItemId: string;
  name: string;
  customizations: Customizations
  totalPrice: number;
  savedAt: Date;
}

interface MenuDetailOverlayProps {
  item: ProductProduct;
  menuItems: ProductProduct[];
  favorites: FavoriteItem[];
  onClose: () => void;
  onAddToCart: (item: ProductProduct, quantity: number, customizations: Customizations) => void;
  onSaveFavorite: (item: ProductProduct, customizations: Customizations, totalPrice: number) => void;
  onRemoveFavorite: (favoriteId: string) => void;
  getFavoriteItem: (itemId: string, customizations?: Customizations) => FavoriteItem | null;
  onComboItemAdd: (comboItem: ProductProduct) => void; // Add this prop
}

export default function MenuDetailOverlay({
  item,
  menuItems,
  favorites,
  onClose,
  onAddToCart,
  onSaveFavorite,
  onRemoveFavorite,
  onComboItemAdd
}: MenuDetailOverlayProps) {
  const [selectedSize, setSelectedSize] = useState('Regular');
  const [selectedMilk, setSelectedMilk] = useState('Regular');
  const [toppings] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  const customizations = {
    size: selectedSize,
    milk: selectedMilk,
    toppings,
    notes
  };

  // Calculate total price with variants
  const calculateTotalPrice = () => {
    let price = item.basePrice;
    
    if (item.variants?.sizes) {
      price += item.variants.sizes[selectedSize as keyof typeof item.variants.sizes] || 0;
    }
    
    if (item.variants?.milk) {
      price += item.variants.milk[selectedMilk as keyof typeof item.variants.milk] || 0;
    }
    
    return price * quantity;
  };

  const getFavoriteItem = (itemId: string, customizations?: Customizations): FavoriteItem | null => {
    if (!customizations) return null;
    const customString = JSON.stringify(customizations);
    return favorites.find(fav =>
      fav.menuItemId === itemId &&
      JSON.stringify(fav.customizations) === customString
    ) || null;
  };

  const isItemFavorited = (itemId: string, customizations?: Customizations) => {
    return !!getFavoriteItem(itemId, customizations);
  };

  const handleAddToCart = () => {
    onAddToCart(item, quantity, customizations);
    onClose();
  };

  const handleToggleFavorite = () => {
    if (isFavorited) {
      const favorite = favorites.find(fav => 
        fav.menuItemId === item.id && 
        JSON.stringify(fav.customizations) === JSON.stringify(customizations)
      );
      if (favorite) {
        onRemoveFavorite(favorite.id);
      }
    } else {
      onSaveFavorite(item, customizations, totalPrice / quantity);
    }
  };

  // Get combo recommendations
  const comboItems = item.comboWith ? 
    menuItems.filter(menuItem => item.comboWith!.includes(menuItem.id)) : [];

  const formatPrice = (price: number) => {
    if (price === 0) return '';
    if (price > 0) return `+Rp ${price.toLocaleString()}`;
    return `Rp ${Math.abs(price).toLocaleString()} off`;
  };

  const totalPrice = calculateTotalPrice();
  const isFavorited = isItemFavorited(item.id, customizations);

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Content with proper padding for tablet view */}
      <div className="relative bg-white dark:bg-gray-800 w-full max-h-[90vh] rounded-t-3xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="relative">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          
          {/* Image */}
          <div className="relative h-64 bg-gray-100 dark:bg-gray-700 overflow-hidden rounded-t-3xl">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${item.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 space-y-2">
              {item.isNew && (
                <span className="inline-block bg-yellow-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                  NEW
                </span>
              )}
              {item.isRecommended && (
                <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-medium flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Recommended</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content with enhanced padding for tablet view */}
        <div className="overflow-y-auto max-h-[calc(90vh-16rem)] px-6 py-8 space-y-6">
          {/* Title and Description */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{item.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{item.description}</p>
                {item.orderCount && (
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{item.orderCount} orders • {item.category}</p>
                )}
              </div>
              
              <button
                onClick={handleToggleFavorite}
                className="ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <Heart 
                  className={`w-6 h-6 transition-colors ${
                    isFavorited 
                      ? 'text-red-500 fill-current' 
                      : 'text-gray-400 dark:text-gray-500 hover:text-red-500'
                  }`}
                />
              </button>
            </div>
            
            <div className="text-2xl font-bold text-[#84482b]">
              Rp {item.basePrice.toLocaleString()}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">base price</span>
            </div>
          </div>

          {/* Size Selection */}
          {item.variants?.sizes && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Size</h3>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(item.variants.sizes).map(([size, extraPrice]) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedSize === size
                        ? 'border-[#84482b] bg-[#84482b]/5 dark:bg-[#84482b]/10'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{size}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {extraPrice === 0 ? 'Default' : formatPrice(extraPrice)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Selection */}
          {item.variants?.milk && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Milk (Optional)</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(item.variants.milk).map(([milk, extraPrice]) => (
                  <button
                    key={milk}
                    onClick={() => setSelectedMilk(milk)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedMilk === milk
                        ? 'border-[#84482b] bg-[#84482b]/5 dark:bg-[#84482b]/10'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="font-medium text-gray-900 dark:text-gray-100">{milk}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {extraPrice === 0 ? 'Included' : formatPrice(extraPrice)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Notes */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Special Instructions (Optional)</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests? (e.g., less sugar, extra hot)"
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#84482b] focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              rows={3}
            />
          </div>

          {/* Combo Recommendations with proper bottom padding */}
          {comboItems.length > 0 && (
            <div className="space-y-3 pb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Perfect Combo</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Customers who ordered this also enjoyed:</p>
              <div className="space-y-3">
                {comboItems.map((comboItem) => (
                  <div
                    key={comboItem.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
                  >
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${comboItem.image}')` }}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{comboItem.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{comboItem.description}</p>
                      <p className="font-semibold text-[#84482b] mt-1">
                        Rp {comboItem.basePrice.toLocaleString()}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => onComboItemAdd(comboItem)}
                      className="bg-[#84482b] text-white px-4 py-2 rounded-xl hover:bg-[#6d3a23] transition-colors text-sm font-medium"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
          {/* Quantity Selector */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Quantity</span>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Minus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <span className="text-xl font-semibold min-w-[2ch] text-center text-gray-900 dark:text-gray-100">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Base price ({selectedSize})</span>
              <span>Rp {(item.basePrice + (item.variants?.sizes?.[selectedSize as keyof typeof item.variants.sizes] || 0)).toLocaleString()}</span>
            </div>
            {item.variants?.milk && selectedMilk !== 'Regular' && (
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>{selectedMilk}</span>
                <span>{formatPrice(item.variants.milk[selectedMilk as keyof typeof item.variants.milk])}</span>
              </div>
            )}
            {quantity > 1 && (
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Quantity</span>
                <span>× {quantity}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-gray-100 pt-2 border-t border-gray-200 dark:border-gray-700">
              <span>Total</span>
              <span>Rp {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full bg-[#84482b] hover:bg-[#6d3a23] text-white py-4 text-lg font-semibold rounded-xl"
          >
            Add to Cart • Rp {totalPrice.toLocaleString()}
          </Button>
        </div>
      </div>
    </div>
  );
}