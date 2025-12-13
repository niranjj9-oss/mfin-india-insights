import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  User,
  Shield,
  CheckCircle2,
  XCircle,
  TrendingUp,
  PieChart,
  Wallet,
  FileText,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MFCentralConnect } from '@/components/MFCentralConnect';
import { useAuth } from '@/hooks/useAuth';
import { usePortfolio } from '@/hooks/usePortfolio';

export default function Dashboard() {
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [showMFCentralModal, setShowMFCentralModal] = useState(false);
  
  const { connection, holdings, summary, loading: portfolioLoading, refetch } = usePortfolio(user?.id);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const panMasked = profile?.pan_number
    ? `${profile.pan_number.slice(0, 4)}****${profile.pan_number.slice(-1)}`
    : 'Not provided';

  const isConnected = !!connection;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - MFIndia Info</title>
        <meta
          name="description"
          content="View your mutual fund portfolio, track investments, and access personalized analytics."
        />
      </Helmet>

      <Header />

      <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background via-secondary/10 to-background">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'Investor'}!
            </h1>
            <p className="text-muted-foreground">
              Your personalized mutual fund dashboard
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Profile & Verification */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <Card className="glass border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <User className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{profile?.full_name || 'User'}</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">PAN Number</span>
                    <span className="font-mono font-medium">{panMasked}</span>
                  </div>
                  {profile?.phone && (
                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Mobile</span>
                      <span className="font-medium">+91 {profile.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Member Since</span>
                    <span className="font-medium">
                      {new Date(user.created_at).toLocaleDateString('en-IN', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Status Card */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5 text-primary" />
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* PAN Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">PAN Verification</span>
                    </div>
                    {profile?.pan_verified ? (
                      <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>

                  {/* MF Central Connection */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">MF Central</span>
                    </div>
                    {isConnected ? (
                      <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-border">
                        <XCircle className="h-3 w-3 mr-1" />
                        Not Connected
                      </Badge>
                    )}
                  </div>

                  {/* Aadhaar Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Aadhaar Verification</span>
                    </div>
                    {profile?.aadhaar_verified ? (
                      <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-border">
                        <XCircle className="h-3 w-3 mr-1" />
                        Not Verified
                      </Badge>
                    )}
                  </div>

                  {/* Verification Progress */}
                  <div className="pt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Profile Completion</span>
                      <span className="font-medium">
                        {isConnected && profile?.aadhaar_verified ? '100%' : isConnected ? '75%' : profile?.pan_verified ? '50%' : '25%'}
                      </span>
                    </div>
                    <Progress
                      value={isConnected && profile?.aadhaar_verified ? 100 : isConnected ? 75 : profile?.pan_verified ? 50 : 25}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Portfolio Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Portfolio Overview */}
              {!isConnected ? (
                <Card className="glass border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Wallet className="h-5 w-5 text-primary" />
                          Portfolio Overview
                        </CardTitle>
                        <CardDescription>
                          Aggregated from MF Central, CAMS & KFintech
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="h-20 w-20 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                        <PieChart className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Connect Your Portfolio</h3>
                      <p className="text-sm text-muted-foreground max-w-md mb-6">
                        Link your investments via MF Central to view consolidated holdings, 
                        track performance, and get personalized analytics.
                      </p>
                      <Button 
                        className="gap-2"
                        onClick={() => setShowMFCentralModal(true)}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Connect to MF Central
                      </Button>
                      <p className="text-xs text-muted-foreground mt-4">
                        Secure connection via RTA-authorized channels
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Connected Portfolio Header */}
                  <Card className="glass border-border/50 border-green-500/30">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-green-500/20">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Portfolio Connected</CardTitle>
                            <CardDescription>
                              Last synced: {connection.last_synced_at 
                                ? new Date(connection.last_synced_at).toLocaleString('en-IN')
                                : 'Just now'
                              }
                            </CardDescription>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={refetch}
                          disabled={portfolioLoading}
                        >
                          <RefreshCw className={`h-4 w-4 mr-2 ${portfolioLoading ? 'animate-spin' : ''}`} />
                          Sync
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Quick Stats */}
                  {summary && (
                    <div className="grid sm:grid-cols-3 gap-4">
                      <Card className="glass border-border/50">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/20">
                              <Wallet className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Total Investment</p>
                              <p className="text-xl font-bold">{formatCurrency(summary.totalInvested)}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass border-border/50">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-green-500/20">
                              <TrendingUp className="h-5 w-5 text-green-400" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Current Value</p>
                              <p className="text-xl font-bold">{formatCurrency(summary.currentValue)}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass border-border/50">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${summary.returnsPercentage >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                              {summary.returnsPercentage >= 0 ? (
                                <ArrowUpRight className="h-5 w-5 text-green-400" />
                              ) : (
                                <ArrowDownRight className="h-5 w-5 text-red-400" />
                              )}
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Total Returns</p>
                              <p className={`text-xl font-bold ${summary.returnsPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {summary.returnsPercentage >= 0 ? '+' : ''}{summary.returnsPercentage.toFixed(2)}%
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Holdings List */}
                  <Card className="glass border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Your Holdings ({holdings.length})</CardTitle>
                      <CardDescription>
                        Fund-wise breakdown of your investments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {holdings.map((holding) => (
                          <div
                            key={holding.id}
                            className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                          >
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <PieChart className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{holding.scheme_name}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{holding.category}</span>
                                <span>•</span>
                                <span>Folio: {holding.folio_number}</span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="font-semibold">{formatCurrency(holding.current_value)}</p>
                              <p className={`text-xs ${(holding.returns_percentage || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {(holding.returns_percentage || 0) >= 0 ? '+' : ''}{holding.returns_percentage?.toFixed(2)}%
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>

          {/* Compliance Footer */}
          <div className="mt-8 p-4 rounded-lg bg-secondary/30 border border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Disclaimer:</strong> This dashboard provides investment analytics and educational insights only. 
              It is not registered investment advisory. Mutual fund investments are subject to market risks. 
              Past performance does not guarantee future returns. Please read all scheme-related documents carefully.
            </p>
          </div>
        </div>
      </main>

      <Footer />

      {/* MF Central Connection Modal */}
      {profile?.pan_number && (
        <MFCentralConnect
          isOpen={showMFCentralModal}
          onClose={() => setShowMFCentralModal(false)}
          onSuccess={() => {
            setShowMFCentralModal(false);
            refetch();
          }}
          panNumber={profile.pan_number}
          userId={user.id}
        />
      )}
    </>
  );
}
