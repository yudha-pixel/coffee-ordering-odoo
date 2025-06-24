// src/components/SearchSection.tsx
import { categories } from "../data/categories";
import { Star, TrendingUp, Clock } from "lucide-react";
import { menuItems } from "../data/menuItems";

interface SearchSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  lastOrderItems: string[];
}

export default function SearchSection({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange,
  lastOrderItems}: SearchSectionProps) {

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "New":
        return <Star className="w-4 h-4 text-yellow-500" />;
      case "Recommended":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "Most Ordered":
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case "Last Order":
        return <Clock className="w-4 h-4 text-purple-500" />;
      default:
        return null;
    }
  };

  const getCategoryCount = (category: string) => {
    switch (category) {
      case "New":
        return menuItems.filter(item => item.isNew).length;
      case "Recommended":
        return menuItems.filter(item => item.isRecommended).length;
      case "Most Ordered":
        return menuItems.filter(item => (item.orderCount || 0) >= 150).length;
      case "Last Order":
        return lastOrderItems.length;
      default:
        return menuItems.filter(item => item.category === category).length;
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search for items..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#84482b] focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100"
        />
      </div>

      <div className="flex space-x-3 overflow-x-auto pb-2">
        {categories.map((category) => {
          const count = getCategoryCount(category);
          const isSelected = selectedCategory === category;
          
          if (category === "Last Order" && lastOrderItems.length === 0) {
            return null;
          }
          
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                isSelected 
                  ? 'bg-[#84482b] text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-800 text-[#84482b] dark:text-orange-400 border-2 border-[#84482b] dark:border-orange-400 hover:bg-[#84482b] hover:text-white'
              }`}
            >
              {getCategoryIcon(category)}
              <span>{category}</span>
              {count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20' : 'bg-[#84482b]/10 dark:bg-orange-400/10'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}