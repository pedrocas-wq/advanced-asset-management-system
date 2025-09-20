import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Github, ExternalLink } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>© {currentYear} AAMS - Airplus Aircraft Management System</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{t('footer.madeWith')}</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>{t('footer.byAirplus')}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/airplus/aams"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title={t('footer.github')}
              >
                <Github className="w-5 h-5" />
              </a>
              
              <a
                href="https://docs.aams.airplus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors flex items-center space-x-1"
                title={t('footer.documentation')}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">{t('footer.docs')}</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="text-xs text-gray-500">
              {t('footer.version')} 1.0.0 | {t('footer.environment')}: {import.meta.env.VITE_APP_ENV || 'development'}
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <a href="/privacy" className="hover:text-gray-700 transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="/terms" className="hover:text-gray-700 transition-colors">
                {t('footer.terms')}
              </a>
              <a href="/support" className="hover:text-gray-700 transition-colors">
                {t('footer.support')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}