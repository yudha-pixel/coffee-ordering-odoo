import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  customizations?: {
    size: string;
    milk: string;
    toppings: string[];
    notes: string;
  };
}

interface FloatingCartCardProps {
  items: CartItem[];
  total: number;
  onContinue: () => void;
  isVisible: boolean;
}

export default function FloatingCartCard({ items, total, onContinue, isVisible }: FloatingCartCardProps) {
  if (!isVisible || items.length === 0) {
    return null;
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const firstItem = items[0]; // Show the first item in the cart

  return (
    <div className={`fixed bottom-6 left-4 right-4 z-40 transform transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-w-sm mx-auto">
        <div className="p-5">
          <div className="flex items-center space-x-4">
            {/* Item Image */}
            <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${firstItem.image}')` }}
              />
            </div>
            
            {/* Item Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-lg">
                {firstItem.name}
              </h3>
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                {firstItem.description}
              </p>
              
              {/* Cart Summary */}
              <div className="mt-3 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    {totalItems} Item{totalItems > 1 ? 's' : ''}
                  </span>
                  <span className="font-bold text-xl text-gray-900">
                    Rp {total.toLocaleString()}
                  </span>
                </div>
                
                {totalItems > 1 && (
                  <p className="text-xs text-gray-500">
                    +{totalItems - 1} more item{totalItems > 2 ? 's' : ''} in cart
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Continue Button */}
          <Button
            onClick={onContinue}
            className="w-full mt-4 bg-[#84482b] hover:bg-[#6d3a23] text-white py-3 text-lg font-semibold rounded-2xl flex items-center justify-center space-x-2"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}