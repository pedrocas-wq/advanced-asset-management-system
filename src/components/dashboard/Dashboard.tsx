import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Plane, 
  FileText, 
  Activity,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Card } from '../ui/Card';

export function Dashboard() {
  const { t } = useTranslation();

  const stats = [
    {
      name: 'Total Aircraft',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: Plane,
    },
    {
      name: 'Active Users',
      value: '48',
      change: '+5',
      changeType: 'positive',
      icon: Users,
    },
    {
      name: 'Pending Reports',
      value: '7',
      change: '-2',
      changeType: 'negative',
      icon: FileText,
    },
    {
      name: 'System Health',
      value: '98%',
      change: '+1%',
      changeType: 'positive',
      icon: Activity,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      user: 'João Silva',
      action: 'Created maintenance report',
      aircraft: 'CS-ABC',
      time: '2 minutes ago',
      status: 'completed',
    },
    {
      id: 2,
      user: 'Maria Santos',
      action: 'Updated shift schedule',
      time: '15 minutes ago',
      status: 'completed',
    },
    {
      id: 3,
      user: 'Pedro Costa',
      action: 'Logged flight hours',
      aircraft: 'CS-DEF',
      time: '1 hour ago',
      status: 'pending',
    },
    {
      id: 4,
      user: 'Ana Ferreira',
      action: 'Generated inspection report',
      aircraft: 'CS-GHI',
      time: '2 hours ago',
      status: 'completed',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {t('dashboard.welcome')}
        </h1>
        <p className="text-blue-100">
          {t('dashboard.overview')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} padding="md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className={`flex items-center text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600">
                  {stat.name}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t('dashboard.recentActivity')}
            </h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {activity.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.user}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.action}
                    {activity.aircraft && (
                      <span className="font-medium"> · {activity.aircraft}</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t('dashboard.quickActions')}
            </h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <FileText className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">New Report</p>
              <p className="text-xs text-gray-600">Create maintenance report</p>
            </button>
            <button className="p-4 text-left bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
              <Users className="w-6 h-6 text-teal-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Manage Shifts</p>
              <p className="text-xs text-gray-600">Update team schedules</p>
            </button>
            <button className="p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <Plane className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Aircraft Status</p>
              <p className="text-xs text-gray-600">Check fleet status</p>
            </button>
            <button className="p-4 text-left bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <AlertTriangle className="w-6 h-6 text-orange-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Alerts</p>
              <p className="text-xs text-gray-600">View system alerts</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}