import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Plus } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function ReportsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('navigation.reports')}
        </h1>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
          New Report
        </Button>
      </div>

      <Card>
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No reports yet
          </h3>
          <p className="text-gray-600 mb-6">
            Create your first report to get started with aircraft management.
          </p>
          <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
            Create Report
          </Button>
        </div>
      </Card>
    </div>
  );
}