import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Scale, ArrowLeft, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FundSelector } from '@/components/FundSelector';
import { FundComparisonTable } from '@/components/FundComparisonTable';
import { MutualFund } from '@/data/mockFunds';

export default function Compare() {
  const [selectedFunds, setSelectedFunds] = useState<MutualFund[]>([]);

  const handleSelectFund = (fund: MutualFund) => {
    if (selectedFunds.length < 3) {
      setSelectedFunds([...selectedFunds, fund]);
    }
  };

  const handleRemoveFund = (fundId: string) => {
    setSelectedFunds(selectedFunds.filter((f) => f.id !== fundId));
  };

  const handleClearAll = () => {
    setSelectedFunds([]);
  };

  return (
    <>
      <Helmet>
        <title>Compare Mutual Funds - MFIndia Info | Side-by-Side Fund Analysis</title>
        <meta
          name="description"
          content="Compare up to 3 mutual funds side by side with detailed metrics including CAGR, Sharpe Ratio, Alpha, Beta, Upside Capture Ratio, and expense ratios."
        />
        <meta
          name="keywords"
          content="mutual fund comparison, compare mutual funds India, CAGR comparison, Sharpe ratio, expense ratio, best mutual funds, fund analysis tool"
        />
      </Helmet>

      <Header />

      <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background via-secondary/10 to-background">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
                  <Scale className="h-8 w-8 text-primary" />
                  Compare Mutual Funds
                </h1>
                <p className="text-muted-foreground mt-2">
                  Analyze and compare up to 3 funds side by side with key performance metrics
                </p>
              </div>

              {selectedFunds.length > 0 && (
                <Button variant="outline" size="sm" onClick={handleClearAll}>
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Fund Selector */}
          <div className="glass border border-border/50 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Select Funds to Compare</h2>
            </div>
            <FundSelector
              selectedFunds={selectedFunds}
              onSelect={handleSelectFund}
              onRemove={handleRemoveFund}
              maxFunds={3}
            />
          </div>

          {/* Comparison Table */}
          <FundComparisonTable funds={selectedFunds} />

          {/* Educational Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="glass border border-border/50 rounded-xl p-6">
              <h3 className="font-semibold mb-2">Understanding CAGR</h3>
              <p className="text-sm text-muted-foreground">
                Compound Annual Growth Rate (CAGR) shows the mean annual growth rate over a period. 
                It smooths out volatility to show consistent growth rate.
              </p>
            </div>
            <div className="glass border border-border/50 rounded-xl p-6">
              <h3 className="font-semibold mb-2">Sharpe Ratio Explained</h3>
              <p className="text-sm text-muted-foreground">
                Sharpe Ratio measures risk-adjusted returns. A ratio above 1 is good, above 1.5 is excellent. 
                Higher Sharpe means better return per unit of risk.
              </p>
            </div>
            <div className="glass border border-border/50 rounded-xl p-6">
              <h3 className="font-semibold mb-2">Upside Capture Ratio</h3>
              <p className="text-sm text-muted-foreground">
                Shows how much of the benchmark's gains the fund captures. Above 100% means the fund 
                outperforms during rising markets – a key 80/20 Pareto metric.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
