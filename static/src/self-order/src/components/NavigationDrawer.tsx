import LogoWhite from "@/assets/LogoWhite.png";
import { UserUser } from "@/types";

import { User, LogOut, FileText, Settings, Shield, History, Heart, HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import MenuItem from "./MenuItem";

interface NavigationDrawerProps {
  user: UserUser | null;
  onClose: () => void; 
  onShowOrderHistory: () => void;
  onShowSettings: () => void;
  onShowFavorites: () => void;
  onShowLogin: () => void;
  onShowRegister: () => void;
  onShowContactSupport: () => void;
  onShowDeveloperFeedback: () => void;
  onShowTermsConditions: () => void;
  onShowPrivacyPolicy: () => void;
  onLogout: () => void;
}

// Enhanced Navigation Drawer with User Profile
export default function NavigationDrawer({ 
  user,
  onClose, 
  onShowOrderHistory, 
  onShowSettings, 
  onShowFavorites,
  onShowLogin,
  onShowRegister,
  onShowContactSupport,
  onShowDeveloperFeedback,
  onShowTermsConditions,
  onShowPrivacyPolicy,
  onLogout
}: NavigationDrawerProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#167dda] px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
          >
            <div className="w-4 h-4 relative">
              <div className="absolute w-4 h-0.5 bg-white transform rotate-45 top-1.5" />
              <div className="absolute w-4 h-0.5 bg-white transform -rotate-45 top-1.5" />
            </div>
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#167dda] to-[#1a7fe0] px-6 py-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            {user ? (
              <>
                <h3 className="text-lg font-semibold text-white">Welcome, {user.name}!</h3>
                <p className="text-sm text-white/80">{user.email}</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-white">Welcome, Guest!</h3>
                <p className="text-sm text-white/80">Sign in to access your account</p>
              </>
            )}
          </div>
        </div>
        
        {!user && (
          <div className="mt-4 flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-xl"
              onClick={onShowLogin}
            >
              Sign In
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-xl"
              onClick={onShowRegister}
            >
              Register
            </Button>
          </div>
        )}

        {user && (
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-xl"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          <MenuItem
            icon={<div className="w-5 h-5 bg-[#84482b] rounded flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"/>
              </svg>
            </div>}
            title="New Order"
            onClick={onClose}
          />

          <MenuItem
            icon={<History className="w-5 h-5" />}
            title="My Orders"
            onClick={onShowOrderHistory}
          />

          <MenuItem
            icon={<Heart className="w-5 h-5" />}
            title="Favorites"
            onClick={onShowFavorites}
          />

          <MenuItem
            icon={<HelpCircle className="w-5 h-5" />}
            title="Contact Support"
            onClick={onShowContactSupport}
          />

          <MenuItem
            icon={<MessageCircle className="w-5 h-5" />}
            title="Send Feedback"
            onClick={onShowDeveloperFeedback}
          />

          <MenuItem
            icon={<Settings className="w-5 h-5" />}
            title="Settings"
            onClick={onShowSettings}
          />

          <div className="mx-6 my-2 border-t border-white/20" />

          <MenuItem
            icon={<FileText className="w-5 h-5" />}
            title="Terms & Conditions"
            onClick={onShowTermsConditions}
          />

          <MenuItem
            icon={<Shield className="w-5 h-5" />}
            title="Privacy Policy"
            onClick={onShowPrivacyPolicy}
          />
        </div>
      </div>

      <div className="bg-[#000000] p-4">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-white text-sm">Powered By</span>
          <div
            className="h-4 w-12 bg-center bg-contain bg-no-repeat"
            style={{ backgroundImage: `url('${LogoWhite}')` }}
          />
        </div>
      </div>
    </div>
  );
}