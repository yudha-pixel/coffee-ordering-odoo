import { useState } from 'react';
import { ArrowLeft, User, Bell, HelpCircle, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import LogoWhite from "../assets/LogoWhite.png";

interface SettingsPageProps {
  onBack: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function SettingsPage({ onBack, isDarkMode, onToggleDarkMode }: SettingsPageProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="relative size-full bg-white dark:bg-gray-900">
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
            <h1 className="text-xl font-bold text-white">Settings</h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Appearance Section */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
              {isDarkMode ? <Moon className="w-4 h-4 text-purple-600 dark:text-purple-400" /> : <Sun className="w-4 h-4 text-purple-600" />}
            </div>
            Appearance
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Dark Mode</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={onToggleDarkMode}
                className="ml-4"
              />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
              <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Push Notifications</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about order updates</p>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
                className="ml-4"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Sound Alerts</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Play sounds for notifications</p>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
                className="ml-4"
              />
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
              <User className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            Account
          </h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="font-medium text-gray-900 dark:text-gray-100">Edit Profile</span>
              <div className="w-5 h-5 text-gray-400">→</div>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="font-medium text-gray-900 dark:text-gray-100">Change Password</span>
              <div className="w-5 h-5 text-gray-400">→</div>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="font-medium text-gray-900 dark:text-gray-100">Payment Methods</span>
              <div className="w-5 h-5 text-gray-400">→</div>
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mr-3">
              <HelpCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            Support
          </h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="font-medium text-gray-900 dark:text-gray-100">Help Center</span>
              <div className="w-5 h-5 text-gray-400">→</div>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="font-medium text-gray-900 dark:text-gray-100">Contact Support</span>
              <div className="w-5 h-5 text-gray-400">→</div>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="font-medium text-gray-900 dark:text-gray-100">Report a Problem</span>
              <div className="w-5 h-5 text-gray-400">→</div>
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Coffee Shop App</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Version 1.0.0</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">Built with ❤️ for coffee lovers</p>
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