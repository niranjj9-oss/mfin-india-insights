import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MFCentralConnection {
  id: string;
  user_id: string;
  pan_number: string;
  connected_at: string;
  last_synced_at: string | null;
  connection_status: string;
  folios_count: number;
}

interface PortfolioHolding {
  id: string;
  user_id: string;
  scheme_name: string;
  scheme_code: string | null;
  amc_name: string;
  category: string;
  folio_number: string;
  units: number;
  nav: number;
  current_value: number;
  invested_value: number;
  returns_percentage: number | null;
}

interface PortfolioSummary {
  totalInvested: number;
  currentValue: number;
  totalReturns: number;
  returnsPercentage: number;
  holdingsCount: number;
}

export function usePortfolio(userId: string | undefined) {
  const [connection, setConnection] = useState<MFCentralConnection | null>(null);
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);
  const [summary, setSummary] = useState<PortfolioSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPortfolio = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch MF Central connection status
      const { data: connectionData, error: connectionError } = await supabase
        .from('mf_central_connections')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (connectionError) throw connectionError;
      setConnection(connectionData);

      // If connected, fetch holdings
      if (connectionData) {
        const { data: holdingsData, error: holdingsError } = await supabase
          .from('portfolio_holdings')
          .select('*')
          .eq('user_id', userId)
          .order('current_value', { ascending: false });

        if (holdingsError) throw holdingsError;

        const typedHoldings: PortfolioHolding[] = (holdingsData || []).map((h: any) => ({
          ...h,
          units: Number(h.units),
          nav: Number(h.nav),
          current_value: Number(h.current_value),
          invested_value: Number(h.invested_value),
          returns_percentage: h.returns_percentage ? Number(h.returns_percentage) : null,
        }));

        setHoldings(typedHoldings);

        // Calculate summary
        if (typedHoldings.length > 0) {
          const totalInvested = typedHoldings.reduce((sum, h) => sum + h.invested_value, 0);
          const currentValue = typedHoldings.reduce((sum, h) => sum + h.current_value, 0);
          const totalReturns = currentValue - totalInvested;
          const returnsPercentage = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;

          setSummary({
            totalInvested,
            currentValue,
            totalReturns,
            returnsPercentage,
            holdingsCount: typedHoldings.length,
          });
        }
      }
    } catch (err: any) {
      console.error('Error fetching portfolio:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  return {
    connection,
    holdings,
    summary,
    loading,
    error,
    refetch: fetchPortfolio,
  };
}
