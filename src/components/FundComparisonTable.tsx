import { MutualFund } from '@/data/mockFunds';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FundComparisonTableProps {
  funds: MutualFund[];
}

interface MetricRowProps {
  label: string;
  tooltip?: string;
  values: (string | number)[];
  highlight?: 'highest' | 'lowest';
  format?: 'percent' | 'currency' | 'number' | 'text';
  suffix?: string;
}

const MetricRow = ({
  label,
  tooltip,
  values,
  highlight,
  format = 'number',
  suffix = '',
}: MetricRowProps) => {
  const numericValues = values.map((v) => (typeof v === 'number' ? v : parseFloat(v as string)));
  const maxVal = Math.max(...numericValues.filter((v) => !isNaN(v)));
  const minVal = Math.min(...numericValues.filter((v) => !isNaN(v)));

  const formatValue = (val: string | number) => {
    if (format === 'percent') return `${val}%`;
    if (format === 'currency') return `₹${typeof val === 'number' ? val.toLocaleString('en-IN') : val}`;
    return `${val}${suffix}`;
  };

  const getBestIndicator = (val: number) => {
    if (highlight === 'highest' && val === maxVal) return 'best';
    if (highlight === 'lowest' && val === minVal) return 'best';
    return null;
  };

  return (
    <div className="grid grid-cols-[180px_repeat(3,1fr)] items-center py-3 border-b border-border/50 last:border-0">
      <div className="flex items-center gap-1.5">
        <span className="text-sm text-muted-foreground">{label}</span>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-3.5 w-3.5 text-muted-foreground/50" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[250px] bg-popover text-popover-foreground border-border">
              <p className="text-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      {values.map((val, idx) => {
        const isBest = typeof val === 'number' && getBestIndicator(val) === 'best';
        return (
          <div key={idx} className="text-center">
            <span
              className={`text-sm font-medium ${
                isBest ? 'text-green-500' : 'text-foreground'
              }`}
            >
              {formatValue(val)}
              {isBest && values.length > 1 && (
                <span className="ml-1 text-xs text-green-500">★</span>
              )}
            </span>
          </div>
        );
      })}
      {/* Fill empty slots */}
      {Array.from({ length: 3 - values.length }).map((_, idx) => (
        <div key={`empty-${idx}`} className="text-center text-muted-foreground/30">
          —
        </div>
      ))}
    </div>
  );
};

export function FundComparisonTable({ funds }: FundComparisonTableProps) {
  if (funds.length === 0) {
    return (
      <Card className="glass border-border/50">
        <CardContent className="py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Select Funds to Compare</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Choose up to 3 mutual funds from the selector above to see a detailed side-by-side comparison
          </p>
        </CardContent>
      </Card>
    );
  }

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Moderate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Moderately High':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'High':
      case 'Very High':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Fund Headers */}
      <div className="grid grid-cols-[180px_repeat(3,1fr)] gap-4">
        <div />
        {funds.map((fund) => (
          <Card key={fund.id} className="glass border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold leading-tight">
                {fund.shortName}
              </CardTitle>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <Badge variant="outline" className="text-xs">
                  {fund.category}
                </Badge>
                <Badge className={`text-xs ${getRiskBadgeVariant(fund.riskLevel)}`}>
                  {fund.riskLevel}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{fund.amc}</p>
            </CardHeader>
          </Card>
        ))}
        {/* Empty slots */}
        {Array.from({ length: 3 - funds.length }).map((_, idx) => (
          <Card key={`empty-header-${idx}`} className="glass border-border/50 border-dashed opacity-50">
            <CardHeader className="py-8">
              <div className="text-center text-sm text-muted-foreground">
                Select a fund
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Comparison Sections */}
      <Card className="glass border-border/50">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Returns Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <MetricRow
            label="1 Year CAGR"
            tooltip="Compound Annual Growth Rate over 1 year"
            values={funds.map((f) => f.cagr1Y)}
            highlight="highest"
            format="percent"
          />
          <MetricRow
            label="3 Year CAGR"
            tooltip="Compound Annual Growth Rate over 3 years"
            values={funds.map((f) => f.cagr3Y)}
            highlight="highest"
            format="percent"
          />
          <MetricRow
            label="5 Year CAGR"
            tooltip="Compound Annual Growth Rate over 5 years"
            values={funds.map((f) => f.cagr5Y)}
            highlight="highest"
            format="percent"
          />
        </CardContent>
      </Card>

      <Card className="glass border-border/50">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="text-base flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5 text-green-500" />
            Risk-Adjusted Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <MetricRow
            label="Sharpe Ratio"
            tooltip="Measures risk-adjusted return. Higher is better (>1 is good, >1.5 is excellent)"
            values={funds.map((f) => f.sharpeRatio)}
            highlight="highest"
          />
          <MetricRow
            label="Alpha"
            tooltip="Excess return over benchmark. Positive alpha means fund outperformed"
            values={funds.map((f) => f.alpha)}
            highlight="highest"
            format="percent"
          />
          <MetricRow
            label="Beta"
            tooltip="Volatility relative to market. Beta of 1 means same volatility as market"
            values={funds.map((f) => f.beta)}
          />
          <MetricRow
            label="Std Deviation"
            tooltip="Measures volatility/risk. Lower is generally preferred for similar returns"
            values={funds.map((f) => f.standardDeviation)}
            highlight="lowest"
            format="percent"
          />
        </CardContent>
      </Card>

      <Card className="glass border-border/50">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="text-base flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5 text-accent" />
            Capture Ratios (80/20 Pareto Metric)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <MetricRow
            label="Upside Capture"
            tooltip="How much the fund captures when benchmark rises. >100% means outperformance in up markets"
            values={funds.map((f) => f.upsideCaptureRatio)}
            highlight="highest"
            format="percent"
          />
          <MetricRow
            label="Downside Capture"
            tooltip="How much the fund falls when benchmark falls. <100% means better downside protection"
            values={funds.map((f) => f.downsideCaptureRatio)}
            highlight="lowest"
            format="percent"
          />
        </CardContent>
      </Card>

      <Card className="glass border-border/50">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="h-5 w-5 text-muted-foreground" />
            Fund Details
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <MetricRow
            label="NAV"
            tooltip="Net Asset Value - current price per unit"
            values={funds.map((f) => f.nav)}
            format="currency"
          />
          <MetricRow
            label="AUM (₹ Cr)"
            tooltip="Assets Under Management in Crores"
            values={funds.map((f) => f.aum.toLocaleString('en-IN'))}
          />
          <MetricRow
            label="Expense Ratio"
            tooltip="Annual fee charged by the fund. Lower is better"
            values={funds.map((f) => f.expenseRatio)}
            highlight="lowest"
            format="percent"
          />
          <MetricRow
            label="Min Investment"
            values={funds.map((f) => f.minInvestment)}
            format="currency"
          />
          <MetricRow
            label="Exit Load"
            values={funds.map((f) => f.exitLoad)}
            format="text"
          />
          <MetricRow
            label="Benchmark"
            values={funds.map((f) => f.benchmark)}
            format="text"
          />
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
        <p className="text-xs text-muted-foreground">
          <strong>Important:</strong> Past performance does not guarantee future returns. 
          The metrics shown are based on historical data and statistical calculations. 
          Star (★) indicates best value in comparison. Please read scheme documents carefully before investing.
        </p>
      </div>
    </div>
  );
}
