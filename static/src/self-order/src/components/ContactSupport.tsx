import { useState } from 'react';
import { ArrowLeft, Phone, Mail, MessageCircle, Send, Clock, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import LogoWhite from "../assets/LogoWhite.png";

interface ContactSupportProps {
  onBack: () => void;
}

export default function ContactSupport({ onBack }: ContactSupportProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supportOptions = [
    { id: 'order', label: 'Order Issues', description: 'Problems with your current or past orders' },
    { id: 'payment', label: 'Payment Problems', description: 'Issues with billing or refunds' },
    { id: 'app', label: 'App Technical Issues', description: 'Bugs, crashes, or app not working' },
    { id: 'account', label: 'Account Help', description: 'Login, registration, or profile issues' },
    { id: 'menu', label: 'Menu Questions', description: 'Ingredients, allergens, or availability' },
    { id: 'other', label: 'Other', description: 'Something else we can help with' }
  ];

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      description: '+62 21 1234 5678',
      subtitle: 'Available 24/7',
      action: () => window.open('tel:+622112345678')
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'WhatsApp',
      description: 'Chat with us instantly',
      subtitle: 'Usually replies in 5 mins',
      action: () => window.open('https://wa.me/622112345678?text=Hello, I need help with my coffee order')
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'support@coffeeshop.com',
      subtitle: 'Response within 2 hours',
      action: () => window.open('mailto:support@coffeeshop.com')
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption || !message.trim()) {
      alert('Please select a topic and write a message');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Your support request has been submitted! We\'ll get back to you soon.');
      setSelectedOption('');
      setMessage('');
      setIsSubmitting(false);
    }, 2000);
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
            <h1 className="text-xl font-bold text-white">Contact Support</h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Support Hours */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">We're Here to Help!</h3>
                <p className="text-sm text-blue-700">Our support team is available 24/7 to assist you</p>
              </div>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Get in Touch</h3>
            <div className="space-y-3">
              {contactMethods.map((method, index) => (
                <button
                  key={index}
                  onClick={method.action}
                  className="w-full bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#84482b] rounded-full flex items-center justify-center text-white">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{method.title}</h4>
                      <p className="text-gray-600">{method.description}</p>
                      <p className="text-sm text-gray-500">{method.subtitle}</p>
                    </div>
                    <div className="text-gray-400">
                      <ArrowLeft className="w-5 h-5 rotate-180" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Support Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Topic Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">What can we help you with?</label>
                <div className="grid grid-cols-1 gap-2">
                  {supportOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-start p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedOption === option.id
                          ? 'border-[#84482b] bg-[#84482b]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="supportOption"
                        value={option.id}
                        checked={selectedOption === option.id}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-500">{option.description}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        selectedOption === option.id
                          ? 'border-[#84482b] bg-[#84482b]'
                          : 'border-gray-300'
                      }`}>
                        {selectedOption === option.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Describe your issue</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Please provide as much detail as possible so we can help you quickly..."
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#84482b] focus:border-transparent resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !selectedOption || !message.trim()}
                className="w-full bg-[#84482b] hover:bg-[#6d3a23] text-white py-3 text-lg font-semibold rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Location */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Visit Our Store
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600">Downtown Coffee Shop</p>
              <p className="text-gray-600">123 Main Street, City Center</p>
              <p className="text-gray-600">Jakarta, Indonesia 12345</p>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-500">Open Daily: 6:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => alert('FAQ section coming soon!')}
              className="text-[#84482b] border-[#84482b] hover:bg-[#84482b] hover:text-white"
            >
              View Frequently Asked Questions
            </Button>
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