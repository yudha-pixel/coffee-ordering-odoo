// src/components/MenuItemComponent.tsx
import svgPaths from "../imports/svg-zotrlrl93e";
import LazyImage from "./LazyImage";

import { Heart, Minus, Plus } from "lucide-react";

// Type Imports
import {
  ProductProduct,
} from "../types";

interface MenuItemComponentProps {
  item: ProductProduct; 
  quantity: number;
  isFavorited: boolean;
  onShowDetail: (item: ProductProduct) => void;
  onQuickAdd: (item: ProductProduct) => void;
  onQuantityChange: (item: ProductProduct, quantity: number) => void;
  onToggleFavorite: (item: ProductProduct) => void;
}

// Updated MenuItemComponent with lazy loading
export default function MenuItemComponent({ 
  item, 
  quantity,
  isFavorited,
  onShowDetail, 
  onQuickAdd,
  onQuantityChange,
  onToggleFavorite}: MenuItemComponentProps) {

  return (
    <div 
      className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={() => onShowDetail(item)}
    >
      <div className="p-4">
        <div className="flex space-x-4">
          {/* Image */}
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden flex-shrink-0 relative">
            <LazyImage
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1 left-1 space-y-1">
              {item.isNew && (
                <span className="inline-block bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                  NEW
                </span>
              )}
              {item.isRecommended && (
                <span className="inline-block bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                  ⭐
                </span>
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base">{item.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{item.description}</p>
              </div>
              
              {/* Heart Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(item);
                }}
                className="ml-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <Heart 
                  className={`w-5 h-5 transition-colors ${
                    isFavorited 
                      ? 'text-red-500 fill-current' 
                      : 'text-gray-400 dark:text-gray-500 hover:text-red-500'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <div className="space-y-1">
                <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                  Rp {item.basePrice.toLocaleString()}
                </div>
                {item.orderCount && item.orderCount > 0 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {item.orderCount} orders
                  </div>
                )}
              </div>
              
              {/* Quantity Controls or Add Button */}
              <div onClick={(e) => e.stopPropagation()}>
                {quantity > 0 ? (
                  <div className="flex items-center space-x-2 bg-[#84482b] rounded-xl px-2 py-1">
                    <button
                      onClick={() => onQuantityChange(item, quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-white font-medium px-2 min-w-[24px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => onQuantityChange(item, quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onQuickAdd(item)}
                    className="bg-[#84482b] text-white px-4 py-2 rounded-xl hover:bg-[#6d3a23] transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span className="text-sm font-medium">Add</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d={svgPaths.p299f6d80} />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}