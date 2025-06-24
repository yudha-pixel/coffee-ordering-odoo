import { useState } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "./ui/button";
import { OrderItem } from "../types";

interface FeedbackModalProps {
  order: OrderItem;
  onSubmit: (orderId: string, rating: number, feedback: string) => void;
  onClose: () => void;
}

export default function FeedbackModal({ order, onSubmit, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Order Complete!
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            How was your experience?
          </p>
        </div>
        <div className="mb-6">
          <div className="flex justify-center space-x-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-10 h-10 transition-colors ${
                    star <= rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400">
            {rating === 0 && "Rate your experience"}
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent"}
          </p>
        </div>
        <div className="mb-6">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us about your experience (optional)"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#84482b] focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows={3}
          />
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Skip
          </Button>
          <Button
            onClick={() => onSubmit(order.id, rating, feedback)}
            disabled={rating === 0}
            className="flex-1 bg-[#84482b] hover:bg-[#6d3a23] disabled:bg-gray-300"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}