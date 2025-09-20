import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Bell, Settings, LogOut, Globe, Wifi, WifiOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { syncService } from '../../services/offline/syncService';
import { Button } from '../ui/Button';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden"
            icon={<Menu className="w-5 h-5" />}
          >
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-gray-900">
              {t('app.title')}
            </h1>
            <span className="text-sm text-gray-500">
              {t('app.subtitle')}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Connection Status */}
          <div className="flex items-center space-x-1">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <span className="text-sm text-gray-600">
              {t(isOnline ? 'status.online' : 'status.offline')}
            </span>
          </div>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLanguageToggle}
            icon={<Globe className="w-4 h-4" />}
          >
            {i18n.language.toUpperCase()}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            icon={<Bell className="w-4 h-4" />}
          >
            <span className="sr-only">Notifications</span>
          </Button>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">{user?.full_name || user?.email}</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.full_name?.[0] || user?.email?.[0]}
              </span>
            </div>
          </div>

          {/* Settings */}
          <Button
            variant="ghost"
            size="sm"
            icon={<Settings className="w-4 h-4" />}
          >
            <span className="sr-only">Settings</span>
          </Button>

          {/* Logout */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            icon={<LogOut className="w-4 h-4" />}
          >
            {t('auth.logout')}
          </Button>
        </div>
      </div>
    </header>
  );
}