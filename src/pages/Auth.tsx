import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Shield, TrendingUp, Lock } from 'lucide-react';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { SignInForm } from '@/components/auth/SignInForm';
import { useAuth } from '@/hooks/useAuth';
import Logo from '@/components/Logo';

type AuthMode = 'signin' | 'signup';

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && user) {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSuccess = () => {
    navigate('/', { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{mode === 'signin' ? 'Sign In' : 'Create Account'} - MFIndia Info</title>
        <meta
          name="description"
          content="Sign in to MFIndia Info to access your mutual fund portfolio, analytics, and personalized investment insights."
        />
      </Helmet>

      <div className="min-h-screen grid lg:grid-cols-2">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary/20 via-background to-secondary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          
          <div className="relative z-10">
            <Logo />
          </div>

          <div className="relative z-10 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                India's Premier Mutual Fund Intelligence Platform
              </h1>
              <p className="text-xl text-muted-foreground">
                Make data-driven investment decisions with transparent analytics
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg glass">
                <div className="p-2 rounded-full bg-primary/20">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">PAN-Based Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Secure identity verification linked to your investment portfolio
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg glass">
                <div className="p-2 rounded-full bg-accent/20">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Portfolio Aggregation</h3>
                  <p className="text-sm text-muted-foreground">
                    View all your mutual fund investments in one place via MF Central
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg glass">
                <div className="p-2 rounded-full bg-secondary/30">
                  <Lock className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Bank-Grade Security</h3>
                  <p className="text-sm text-muted-foreground">
                    End-to-end encryption. We never store your Aadhaar number.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-xs text-muted-foreground">
              SEBI & AMFI compliant platform. Past performance does not guarantee future returns.
            </p>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="flex flex-col justify-center p-6 lg:p-12 bg-background">
          <div className="lg:hidden mb-8">
            <Logo />
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="glass p-8 rounded-2xl border border-border/50">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground">
                  {mode === 'signin' ? 'Welcome Back' : 'Create Your Account'}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {mode === 'signin'
                    ? 'Sign in to access your portfolio'
                    : 'Start your investment journey with MFIndia Info'}
                </p>
              </div>

              {mode === 'signin' ? (
                <SignInForm
                  onSuccess={handleSuccess}
                  onSwitchToSignUp={() => setMode('signup')}
                />
              ) : (
                <SignUpForm
                  onSuccess={handleSuccess}
                  onSwitchToSignIn={() => setMode('signin')}
                />
              )}
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-center text-muted-foreground mt-6 max-w-sm mx-auto">
              By continuing, you agree to our Terms of Service and acknowledge that you have read our Privacy Policy. 
              Mutual fund investments are subject to market risks.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
