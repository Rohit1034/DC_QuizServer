// =======================================
// SIGNUP PAGE
// Online Quiz System - User Registration
// =======================================

import React from 'react';
import { register } from '../api/auth';
import { Input, Select, Checkbox } from '../components/Form';
import { Button } from '../components/Button';
import { useFormValidation } from '../components/Form';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'admin';
  agreeToTerms: boolean;
  subscribeToUpdates: boolean;
}

export const SignupPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [signupError, setSignupError] = React.useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = React.useState(false);

  const validationRules = {
    name: (value: string) => {
      if (!value) return 'Full name is required';
      if (value.length < 2) return 'Name must be at least 2 characters';
      return null;
    },
    email: (value: string) => {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
      return null;
    },
    password: (value: string) => {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters';
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return 'Password must contain uppercase, lowercase, and number';
      }
      return null;
    },
    confirmPassword: (value: string) => {
      if (!value) return 'Please confirm your password';
      if (value !== form.values.password) return 'Passwords do not match';
      return null;
    },
    role: (value: string) => {
      if (!value) return 'Please select a role';
      return null;
    },
    agreeToTerms: (value: boolean) => {
      if (!value) return 'You must agree to the terms and conditions';
      return null;
    },
    subscribeToUpdates: () => null,
  };

  const form = useFormValidation<SignupFormData>(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
      agreeToTerms: false,
      subscribeToUpdates: true,
    },
    validationRules
  );

  const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-danger-500' };
    if (score <= 3) return { score, label: 'Fair', color: 'bg-accent-500' };
    if (score <= 4) return { score, label: 'Good', color: 'bg-primary-500' };
    return { score, label: 'Strong', color: 'bg-success-500' };
  };

  const passwordStrength = getPasswordStrength(form.values.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);


    if (!form.validateAll()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      const result = await register(form.values);
      if(result.message === 'User Registered') {

      }else{
        setSignupError(result.message || 'Registration failed. Please try again.');
      }
      
    } catch (error) {
      setSignupError('An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: 'google' | 'microsoft') => {
    console.log(`Sign up with ${provider}`);
  };

  if (signupSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="mx-auto w-16 h-16 bg-success-100 rounded-full flex items-center justify-center">
            <CheckCircleIcon />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Account Created Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Welcome to QuizSystem, {form.values.name}! We've sent a verification email to {form.values.email}.
            </p>
            <div className="space-y-4">
              <Button variant="primary" size="lg" fullWidth>
                Verify Email Address
              </Button>
              <Button variant="ghost" size="md" onClick={() => setSignupSuccess(false)}>
                Back to Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="flex">
        {/* Left Side - Form */}
        <div className="w-full lg:w-2/3 flex items-center justify-center p-8">
          <div className="w-full max-w-lg space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Q</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">QuizSystem</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Create your account
              </h3>
              <p className="text-gray-600">
                Join thousands of educators and learners worldwide.
              </p>
            </div>

            {/* Error Message */}
            {signupError && (
              <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 animate-slide-down">
                <div className="flex items-center space-x-2">
                  <ExclamationCircleIcon />
                  <span className="text-sm font-medium text-danger-800">{signupError}</span>
                </div>
              </div>
            )}

            {/* Social Signup */}
            <div className="space-y-3">
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={() => handleSocialSignup('google')}
                disabled={isLoading}
                leftIcon={<GoogleIcon />}
              >
                Continue with Google
              </Button>
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={() => handleSocialSignup('microsoft')}
                disabled={isLoading}
                leftIcon={<MicrosoftIcon />}
              >
                Continue with Microsoft
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or create account with email</span>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={form.values.name}
                  onChange={(value) => form.setFieldValue('name', value)}
                  error={form.touched.has('name') ? form.errors.name : undefined}
                  required
                  leftIcon={<UserIcon />}
                  disabled={isLoading}
                />

                <Select
                  label="Role"
                  options={[
                    { value: 'student', label: '🎓 Student' },
                    { value: 'admin', label: '👨‍💼 Administrator' },
                  ]}
                  value={form.values.role}
                  onChange={(value) => form.setFieldValue('role', value)}
                  error={form.touched.has('role') ? form.errors.role : undefined}
                  required
                  placeholder="Select your role"
                  disabled={isLoading}
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                value={form.values.email}
                onChange={(value) => form.setFieldValue('email', value)}
                error={form.touched.has('email') ? form.errors.email : undefined}
                required
                leftIcon={<EmailIcon />}
                disabled={isLoading}
              />
              <div className="space-y-2">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={form.values.password}
                  onChange={(value) => form.setFieldValue('password', value)}
                  error={form.touched.has('password') ? form.errors.password : undefined}
                  required
                  leftIcon={<LockIcon />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  }
                  disabled={isLoading}
                />
                {form.values.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Password strength:</span>
                      <span className={`font-medium ${
                        passwordStrength.score <= 2 ? 'text-danger-600' :
                        passwordStrength.score <= 3 ? 'text-accent-600' :
                        passwordStrength.score <= 4 ? 'text-primary-600' : 'text-success-600'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full ${
                            level <= passwordStrength.score 
                              ? passwordStrength.color 
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Input
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={form.values.confirmPassword}
                onChange={(value) => form.setFieldValue('confirmPassword', value)}
                error={form.touched.has('confirmPassword') ? form.errors.confirmPassword : undefined}
                required
                leftIcon={<LockIcon />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                }
                disabled={isLoading}
              />

              <Checkbox
                label={
                  <span className="text-sm">
                    I agree to the{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500 font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500 font-medium">
                      Privacy Policy
                    </a>
                  </span>
                }
                checked={form.values.agreeToTerms}
                onChange={(checked) => form.setFieldValue('agreeToTerms', checked)}
                error={form.touched.has('agreeToTerms') ? form.errors.agreeToTerms : undefined}
                required
                disabled={isLoading}
              />

              <Checkbox
                label="Send me product updates and educational content via email"
                checked={form.values.subscribeToUpdates}
                onChange={(checked) => form.setFieldValue('subscribeToUpdates', checked)}
                disabled={isLoading}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isLoading}
                disabled={isLoading || !form.isValid}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center">
              <span className="text-gray-600">Already have an account? </span>
              <a 
                href="/" 
                className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="hidden lg:flex lg:w-1/3 bg-gradient-to-br from-primary-600 to-accent-500 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          
          <div className="relative z-10 flex flex-col justify-center px-8 text-white">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Join the Future of Learning
                </h2>
                <p className="text-lg text-blue-100">
                  Experience the most advanced quiz platform designed for modern education.
                </p>
              </div>
              
              <div className="space-y-6">
                <BenefitItem 
                  icon={<AcademicCapIcon />}
                  title="Smart Learning"
                  description="AI-powered insights and personalized learning paths."
                />
                <BenefitItem 
                  icon={<UsersIcon />}
                  title="Global Community"
                  description="Connect with educators and learners worldwide."
                />
                <BenefitItem 
                  icon={<TrendingUpIcon />}
                  title="Track Progress"
                  description="Detailed analytics and progress tracking tools."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Benefit Item Component
const BenefitItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-blue-100">{description}</p>
    </div>
  </div>
);

// Icon Components (reused from LoginPage)
const CheckCircleIcon = () => (
  <svg className="w-8 h-8 text-success-600" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const ExclamationCircleIcon = () => (
  <svg className="w-5 h-5 text-danger-600" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  </svg>
);

const AcademicCapIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const MicrosoftIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#F25022" d="M1 1h10v10H1z"/>
    <path fill="#00A4EF" d="M13 1h10v10H13z"/>
    <path fill="#7FBA00" d="M1 13h10v10H1z"/>
    <path fill="#FFB900" d="M13 13h10v10H13z"/>
  </svg>
);