import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, ArrowLeft, Plane, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const { resetPassword, loading, error } = useAuth();
  
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => {
    if (!email) {
      return t('auth.validation.emailRequired');
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return t('auth.validation.emailInvalid');
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    const { error } = await resetPassword(email);
    
    if (!error) {
      setIsSuccess(true);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t('auth.resetEmailSent')}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t('auth.checkEmailReset')}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  {t('auth.resetEmailSentTo', { email })}
                </p>
              </div>
              
              <p className="text-gray-600 text-sm">
                {t('auth.resetEmailInstructions')}
              </p>
              
              <div className="space-y-3">
                <Button
                  onClick={() => setIsSuccess(false)}
                  variant="outline"
                  className="w-full"
                >
                  {t('auth.tryDifferentEmail')}
                </Button>
                
                <Link to="/auth/login">
                  <Button className="w-full">
                    {t('auth.backToLogin')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500">
            <p>
              {t('footer.madeWith')} ❤️ {t('footer.byAirplus')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Plane className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {t('auth.resetPassword')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('auth.resetPasswordDescription')}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`pl-10 ${emailError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder={t('auth.emailPlaceholder')}
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? t('common.loading') : t('auth.sendResetEmail')}
            </Button>
          </form>

          <div className="mt-6">
            <Link
              to="/auth/login"
              className="flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t('auth.backToLogin')}</span>
            </Link>
          </div>
        </div>

        {/* Additional Help */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            {t('auth.needHelp')}
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>{t('auth.resetHelpText1')}</p>
            <p>{t('auth.resetHelpText2')}</p>
            <p>
              {t('auth.contactSupport')}{' '}
              <a
                href="mailto:support@airplus.com"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                support@airplus.com
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>
            {t('footer.madeWith')} ❤️ {t('footer.byAirplus')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;