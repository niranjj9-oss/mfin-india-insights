import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  ExternalLink,
  CheckCircle2,
  Loader2,
  Lock,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MFCentralConnectProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  panNumber: string;
  userId: string;
}

type Step = 'intro' | 'verify' | 'fetching' | 'success';

// Mock portfolio data for demo
const mockHoldings = [
  {
    scheme_name: 'HDFC Flexi Cap Fund - Direct Plan - Growth',
    scheme_code: 'HDFC-FC-D-G',
    amc_name: 'HDFC Mutual Fund',
    category: 'Flexi Cap',
    folio_number: 'HD12345678',
    units: 245.6782,
    nav: 1842.35,
    current_value: 452580.45,
    invested_value: 380000,
    returns_percentage: 19.1,
  },
  {
    scheme_name: 'Parag Parikh Flexi Cap Fund - Direct Plan - Growth',
    scheme_code: 'PPFAS-FC-D-G',
    amc_name: 'PPFAS Mutual Fund',
    category: 'Flexi Cap',
    folio_number: 'PP98765432',
    units: 1520.4523,
    nav: 72.89,
    current_value: 110846.17,
    invested_value: 85000,
    returns_percentage: 30.41,
  },
  {
    scheme_name: 'Axis Midcap Fund - Direct Plan - Growth',
    scheme_code: 'AXIS-MC-D-G',
    amc_name: 'Axis Mutual Fund',
    category: 'Mid Cap',
    folio_number: 'AX55667788',
    units: 892.3456,
    nav: 112.76,
    current_value: 100612.92,
    invested_value: 75000,
    returns_percentage: 34.15,
  },
  {
    scheme_name: 'ICICI Prudential Bluechip Fund - Direct Plan - Growth',
    scheme_code: 'ICICI-BC-D-G',
    amc_name: 'ICICI Prudential MF',
    category: 'Large Cap',
    folio_number: 'IC11223344',
    units: 1245.8901,
    nav: 98.42,
    current_value: 122618.70,
    invested_value: 100000,
    returns_percentage: 22.62,
  },
];

export function MFCentralConnect({
  isOpen,
  onClose,
  onSuccess,
  panNumber,
  userId,
}: MFCentralConnectProps) {
  const [step, setStep] = useState<Step>('intro');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleStartConnection = () => {
    setStep('verify');
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter a 6-digit OTP',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setStep('fetching');

    // Simulate OTP verification and data fetching
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // Create MF Central connection record
      const { error: connectionError } = await supabase
        .from('mf_central_connections')
        .insert({
          user_id: userId,
          pan_number: panNumber,
          connection_status: 'connected',
          folios_count: mockHoldings.length,
          last_synced_at: new Date().toISOString(),
        });

      if (connectionError) {
        throw connectionError;
      }

      // Insert mock holdings data
      const holdingsWithUserId = mockHoldings.map((holding) => ({
        ...holding,
        user_id: userId,
      }));

      const { error: holdingsError } = await supabase
        .from('portfolio_holdings')
        .insert(holdingsWithUserId);

      if (holdingsError) {
        throw holdingsError;
      }

      setStep('success');
      toast({
        title: 'Portfolio Connected!',
        description: `Successfully fetched ${mockHoldings.length} mutual fund holdings.`,
      });
    } catch (error: any) {
      console.error('Connection error:', error);
      toast({
        title: 'Connection Failed',
        description: error.message || 'Failed to connect to MF Central',
        variant: 'destructive',
      });
      setStep('intro');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (step === 'success') {
      onSuccess();
    }
    setStep('intro');
    setOtp('');
    onClose();
  };

  const maskedPAN = `${panNumber.slice(0, 4)}****${panNumber.slice(-1)}`;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] glass border-border/50">
        {step === 'intro' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <ExternalLink className="h-5 w-5 text-primary" />
                Connect to MF Central
              </DialogTitle>
              <DialogDescription>
                Securely fetch your consolidated mutual fund holdings
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">What is MF Central?</h4>
                    <p className="text-sm text-muted-foreground">
                      MF Central is SEBI-regulated platform by CAMS & KFintech
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">PAN Linked</p>
                    <p className="text-xs text-muted-foreground">{maskedPAN}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                  <Lock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Secure Connection</p>
                    <p className="text-xs text-muted-foreground">
                      Read-only access via encrypted RTA channels
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">What You'll Get</p>
                    <p className="text-xs text-muted-foreground">
                      All folios, units, NAV, and returns across AMCs
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={handleStartConnection} className="w-full">
                Continue with MF Central
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By continuing, you authorize fetching your CAS data
              </p>
            </div>
          </>
        )}

        {step === 'verify' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Verify Your Identity
              </DialogTitle>
              <DialogDescription>
                Enter the OTP sent to your registered email/mobile
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-400">Demo Mode</p>
                    <p className="text-xs text-muted-foreground">
                      Enter any 6-digit OTP (e.g., 123456) to continue with mock data
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp">Enter 6-Digit OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="text-center text-2xl tracking-[0.5em] font-mono bg-background/50"
                />
              </div>

              <Button
                onClick={handleVerifyOTP}
                className="w-full"
                disabled={otp.length !== 6 || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Fetch Portfolio'
                )}
              </Button>

              <Button variant="ghost" onClick={() => setStep('intro')} className="w-full">
                Go Back
              </Button>
            </div>
          </>
        )}

        {step === 'fetching' && (
          <div className="py-12 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fetching Your Portfolio</h3>
            <p className="text-sm text-muted-foreground">
              Connecting to MF Central and retrieving your holdings...
            </p>
            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <p>✓ Connecting to CAMS...</p>
              <p>✓ Connecting to KFintech...</p>
              <p className="animate-pulse">⟳ Aggregating folios...</p>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="py-8 text-center">
            <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Portfolio Connected!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Successfully fetched {mockHoldings.length} mutual fund holdings
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {['HDFC MF', 'PPFAS MF', 'Axis MF', 'ICICI Pru MF'].map((amc) => (
                <Badge key={amc} variant="secondary" className="bg-primary/10">
                  {amc}
                </Badge>
              ))}
            </div>

            <Button onClick={handleClose} className="w-full">
              View My Portfolio
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
