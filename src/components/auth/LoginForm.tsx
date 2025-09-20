import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export function LoginForm() {
  const { t } = useTranslation();
  const { signIn, signInWithGoogle, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(formData.email, formData.password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md" padding="lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('auth.welcome')}
          </h1>
          <p className="text-gray-600">
            {t('auth.pleaseSignIn')}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="email"
            type="email"
            label={t('auth.email')}
            icon={<Mail className="w-4 h-4" />}
            value={formData.email}
            onChange={handleInputChange}
            required
            autoComplete="email"
          />

          <Input
            name="password"
            type="password"
            label={t('auth.password')}
            icon={<Lock className="w-4 h-4" />}
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {t('auth.forgotPassword')}
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {t('auth.login')}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleGoogleLogin}
              className="w-full"
              disabled={loading}
            >
              {t('auth.signInWithGoogle')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}