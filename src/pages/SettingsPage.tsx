import React from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, User, Globe, Bell, Shield } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function SettingsPage() {
  const { t } = useTranslation();

  const settingsSections = [
    {
      title: 'Profile Settings',
      description: 'Update your personal information',
      icon: User,
      items: ['Personal Information', 'Avatar', 'Contact Details'],
    },
    {
      title: 'Language & Region',
      description: 'Configure language and timezone',
      icon: Globe,
      items: ['Language', 'Timezone', 'Date Format'],
    },
    {
      title: 'Notifications',
      description: 'Manage notification preferences',
      icon: Bell,
      items: ['Email Notifications', 'Push Notifications', 'System Alerts'],
    },
    {
      title: 'Security',
      description: 'Security and privacy settings',
      icon: Shield,
      items: ['Password', 'Two-Factor Auth', 'Session Management'],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('navigation.settings')}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {section.description}
                  </p>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <div key={item} className="text-sm text-gray-500">
                        • {item}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    Configure
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}