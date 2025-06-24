// src/components/CartSummaryOverlay.tsx
import { Button } from './ui/button';

interface CartSummaryOverlayProps {
  itemCount: number;
  totalPrice: number;
  onContinue: () => void;
}

export default function CartSummaryOverlay({ itemCount, totalPrice, onContinue }: CartSummaryOverlayProps) {
  // Determine the correct pluralization for "Item"
  const itemText = itemCount === 1 ? 'Item' : 'Items';

  return (
    // The wrapper provides a slide-in animation from the bottom
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 animate-in slide-in-from-bottom-5 duration-300 ease-out">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 flex items-center justify-between">
        {/* Left side: Item count and total price */}
        <div>
          <p className="text-sm font-medium text-gray-900">{itemCount} {itemText}</p>
          <p className="text-lg font-bold text-gray-900">
            Rp {totalPrice.toLocaleString()}
          </p>
        </div>
        
        {/* Right side: Continue button */}
        <Button
          onClick={onContinue}
          className="bg-[#84482b] hover:bg-[#6d3a23] text-white font-semibold text-base px-8 py-3 h-auto rounded-xl"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}