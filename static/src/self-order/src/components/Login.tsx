import { useState } from 'react';
import { ArrowLeft, AlertCircle, Phone } from 'lucide-react';
import { Button } from './ui/button';
import LogoWhite from "../assets/LogoWhite.png";
import LogVector from "../assets/LogoVector.svg";

interface LoginProps {
  onBack: () => void;
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
  onShowTermsConditions: () => void;
  onShowPrivacyPolicy: () => void;
}

export default function Login({ 
  onBack, 
  onLogin, 
  onSwitchToRegister,
  onShowTermsConditions,
  onShowPrivacyPolicy 
}: LoginProps) {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    // Simulate Google login
    setTimeout(() => {
      onLogin('user@gmail.com', 'google-auth');
      setIsSubmitting(false);
    }, 2000);
  };

  const handleWhatsAppLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappNumber.trim() || !password.trim()) {
      alert('Please enter your WhatsApp number and password');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate login process
    setTimeout(() => {
      // Convert WhatsApp number to email format for storage
      const emailFormat = `${whatsappNumber.replace(/\D/g, '')}@whatsapp.user`;
      onLogin(emailFormat, password);
      setIsSubmitting(false);
    }, 2000);
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Add +62 prefix for Indonesian numbers if not present
    if (cleaned.length > 0 && !cleaned.startsWith('62')) {
      if (cleaned.startsWith('0')) {
        return '+62' + cleaned.substring(1);
      } else {
        return '+62' + cleaned;
      }
    } else if (cleaned.startsWith('62')) {
      return '+' + cleaned;
    }
    
    return value;
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      alert('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Password reset instructions have been sent to ${resetEmail}`);
      setShowForgotPassword(false);
      setResetEmail('');
      setIsSubmitting(false);
    }, 2000);
  };

  if (showForgotPassword) {
    return (
      <div className="relative size-full bg-white">
        {/* Header */}
        <div className="bg-[#167dda] h-16 overflow-clip relative shrink-0 w-full">
          <div className="flex flex-row items-center relative size-full px-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowForgotPassword(false)}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex-1 flex justify-center">
              <h1 className="text-xl font-bold text-white">Reset Password</h1>
            </div>
            
            <div className="w-10"></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-sm mx-auto space-y-6">
            {/* Logo */}
            <div className="text-center py-8">
              <div className="w-24 h-16 mx-auto mb-4">
                <div
                  className="w-full h-full bg-center bg-contain bg-no-repeat"
                  style={{ backgroundImage: `url('${LogVector}')` }}
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
              <p className="text-gray-600">Enter your email and we'll send you reset instructions</p>
            </div>

            {/* Reset Form */}
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#84482b] focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#84482b] hover:bg-[#6d3a23] text-white py-3 text-lg font-semibold rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send Reset Instructions'
                )}
              </Button>
            </form>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Check your email</p>
                  <p>We'll send password reset instructions to your email address. The link will be valid for 24 hours.</p>
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
            <h1 className="text-xl font-bold text-white">Sign In</h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-sm mx-auto space-y-6">
          {/* Logo */}
          <div className="text-center py-8">
            <div className="w-24 h-16 mx-auto mb-4">
              <div
                className="w-full h-full bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: `url('${LogVector}')` }}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* WhatsApp Login Form */}
          <form onSubmit={handleWhatsAppLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(formatPhoneNumber(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#84482b] focus:border-transparent"
                  placeholder="+62 812 3456 7890"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#84482b] focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#84482b] hover:bg-[#6d3a23] text-white py-3 text-lg font-semibold rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Login */}
          <Button
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-4 text-lg font-semibold rounded-xl flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </Button>

          {/* Support Options */}
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => setShowForgotPassword(true)}
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl"
            >
              Forgot Password?
            </Button>
            
            <Button
              variant="outline"
              onClick={() => alert('Contact support: support@coffeeshop.com or +62 21 1234 5678')}
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl"
            >
              Contact Support
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-[#84482b] hover:text-[#6d3a23] font-medium"
              >
                Sign Up
              </button>
            </p>
          </div>

          {/* Terms & Privacy */}
          <div className="text-center text-xs text-gray-500 space-y-2">
            <p>By signing in, you agree to our</p>
            <div className="space-x-4">
              <button
                onClick={onShowTermsConditions}
                className="text-[#84482b] hover:text-[#6d3a23] underline"
              >
                Terms & Conditions
              </button>
              <span>and</span>
              <button
                onClick={onShowPrivacyPolicy}
                className="text-[#84482b] hover:text-[#6d3a23] underline"
              >
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="text-center text-sm text-blue-700">
              <p className="font-medium mb-1">Secure Login</p>
              <p>Your data is protected with industry-standard encryption</p>
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