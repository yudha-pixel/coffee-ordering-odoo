import { useState } from 'react';
import { ArrowLeft, Star, Send, Heart, Bug, Lightbulb, Smile } from 'lucide-react';
import { Button } from './ui/button';
import LogoWhite from "../assets/LogoWhite.png";

interface DeveloperFeedbackProps {
  onBack: () => void;
}

export default function DeveloperFeedback({ onBack }: DeveloperFeedbackProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState('');
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const feedbackTypes = [
    { id: 'bug', label: 'Bug Report', icon: <Bug className="w-5 h-5" />, color: 'text-red-600' },
    { id: 'feature', label: 'Feature Request', icon: <Lightbulb className="w-5 h-5" />, color: 'text-yellow-600' },
    { id: 'improvement', label: 'Improvement', icon: <Smile className="w-5 h-5" />, color: 'text-blue-600' },
    { id: 'compliment', label: 'Compliment', icon: <Heart className="w-5 h-5" />, color: 'text-pink-600' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !feedbackType || !feedback.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Thank you for your feedback! Your input helps us improve the app.');
      setRating(0);
      setFeedbackType('');
      setFeedback('');
      setEmail('');
      setIsSubmitting(false);
    }, 2000);
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Rate your experience';
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
            <h1 className="text-xl font-bold text-white">Developer Feedback</h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Welcome Message */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-5">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-purple-900 mb-2">We Value Your Feedback!</h3>
              <p className="text-purple-700">Help us make this app better for everyone. Share your thoughts, report bugs, or suggest new features.</p>
            </div>
          </div>

          {/* Feedback Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How would you rate our app?</h3>
              
              <div className="text-center">
                <div className="flex justify-center space-x-2 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`w-10 h-10 transition-colors ${
                          star <= (hoverRating || rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-lg font-medium text-gray-700">
                  {getRatingText(hoverRating || rating)}
                </p>
              </div>
            </div>

            {/* Feedback Type */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What type of feedback is this?</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {feedbackTypes.map((type) => (
                  <label
                    key={type.id}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      feedbackType === type.id
                        ? 'border-[#84482b] bg-[#84482b]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="feedbackType"
                      value={type.id}
                      checked={feedbackType === type.id}
                      onChange={(e) => setFeedbackType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`mb-2 ${type.color}`}>
                      {type.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-900 text-center">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Feedback Message */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tell us more</h3>
              
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                placeholder="Please share your feedback, bug report, feature request, or any suggestions you have..."
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#84482b] focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Email (Optional) */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email (Optional)</h3>
              <p className="text-sm text-gray-600 mb-3">Leave your email if you'd like us to follow up on your feedback</p>
              
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#84482b] focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !rating || !feedbackType || !feedback.trim()}
              className="w-full bg-[#84482b] hover:bg-[#6d3a23] text-white py-4 text-lg font-semibold rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending Feedback...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Send className="w-5 h-5" />
                  <span>Send Feedback</span>
                </div>
              )}
            </Button>
          </form>

          {/* Developer Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About the Developer</h3>
            <p className="text-gray-600 mb-3">
              This app was built with love by our development team. We're constantly working to improve your coffee ordering experience.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#84482b] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">CS</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Coffee Shop Team</p>
                <p className="text-sm text-gray-500">Powered by Figma Make</p>
              </div>
            </div>
          </div>
        </div>
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