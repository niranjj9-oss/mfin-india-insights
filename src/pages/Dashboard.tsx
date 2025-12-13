import { useEffect } from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
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

                  {!profile?.aadhaar_verified && (
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Shield className="h-4 w-4 mr-2" />
                      Verify Aadhaar via OTP
                    </Button>
                  )}

                  {/* Verification Progress */}
                  <div className="pt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Profile Completion</span>
                      <span className="font-medium">
                        {profile?.pan_verified && profile?.aadhaar_verified ? '100%' : profile?.pan_verified ? '50%' : '25%'}
                      </span>
                    </div>
                    <Progress
                      value={profile?.pan_verified && profile?.aadhaar_verified ? 100 : profile?.pan_verified ? 50 : 25}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Portfolio Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Portfolio Overview Placeholder */}
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
                    <Button variant="outline" size="sm" disabled>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync
                    </Button>
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
                    <Button className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Connect to MF Central
                    </Button>
                    <p className="text-xs text-muted-foreground mt-4">
                      Secure connection via RTA-authorized channels
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats Placeholders */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Card className="glass border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <Wallet className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Investment</p>
                        <p className="text-xl font-bold">₹ --</p>
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
                        <p className="text-xl font-bold">₹ --</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent/20">
                        <PieChart className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Returns</p>
                        <p className="text-xl font-bold">-- %</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Holdings Placeholder */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Your Holdings</CardTitle>
                  <CardDescription>
                    Fund-wise breakdown of your investments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 animate-pulse"
                      >
                        <div className="h-10 w-10 rounded-full bg-secondary" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-secondary rounded w-3/4" />
                          <div className="h-3 bg-secondary rounded w-1/2" />
                        </div>
                        <div className="text-right space-y-2">
                          <div className="h-4 bg-secondary rounded w-20" />
                          <div className="h-3 bg-secondary rounded w-16" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Connect your portfolio to view holdings
                  </p>
                </CardContent>
              </Card>
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
    </>
  );
}
