import { Trophy, Star, CheckCircle, XCircle, TrendingUp, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FundCategories = () => {
  const categories = [
    {
      icon: Trophy,
      title: "GOAT Performers",
      emoji: "🐐",
      description: "Exceptional funds that consistently beat benchmarks with superior risk-adjusted returns",
      criteria: [
        "Upside Capture >110%",
        "Beats benchmark in ≥75% periods",
        "Positive Alpha (3Y & 5Y)",
        "Top quartile Sharpe ratio",
      ],
      color: "primary",
      gradient: "from-emerald-500/20 to-emerald-600/5",
    },
    {
      icon: Star,
      title: "Great Performers",
      emoji: "⭐",
      description: "Strong funds with efficient market participation and stable risk metrics",
      criteria: [
        "Upside Capture 95-110%",
        "Beats benchmark majority periods",
        "Stable risk metrics",
        "Minor drawdowns acceptable",
      ],
      color: "accent",
      gradient: "from-gold-500/20 to-gold-600/5",
    },
    {
      icon: CheckCircle,
      title: "On-Track Funds",
      emoji: "✅",
      description: "Steady performers that match benchmark returns with low tracking error",
      criteria: [
        "Upside Capture 85-95%",
        "Matches benchmark returns",
        "Low alpha, low tracking error",
        "Suitable for passive strategy",
      ],
      color: "secondary",
      gradient: "from-navy-500/20 to-navy-600/5",
    },
    {
      icon: XCircle,
      title: "Poor Performers",
      emoji: "❌",
      description: "Underperforming funds requiring immediate portfolio review and action",
      criteria: [
        "Upside Capture <80%",
        "Negative alpha",
        "Underperforms peers",
        "High expense ratio",
      ],
      color: "destructive",
      gradient: "from-red-500/20 to-red-600/5",
    },
  ];

  return (
    <section id="analytics" className="py-20 md:py-32 relative">
      {/* Background Elements */}
      <div className="absolute left-0 top-1/3 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute right-0 bottom-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Research-Backed Fund Categorization
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Understand Your </span>
            <span className="text-gradient">Fund Performance</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our 80/20 Pareto-based analytics engine categorizes your mutual funds using 
            industry-standard metrics including Upside Capture Ratio, Sharpe Ratio, and 
            rolling return consistency.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category) => (
            <div
              key={category.title}
              className={`glass-card-hover rounded-2xl p-8 bg-gradient-to-br ${category.gradient}`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-3xl">
                  {category.emoji}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {category.criteria.map((criterion, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {criterion}
                  </li>
                ))}
              </ul>

              <Button variant="ghost" className="group">
                Learn More
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 glass-card rounded-xl p-6 border-l-4 border-accent">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Important:</strong> Fund categorization is based on 
            historical performance and publicly available data. Past performance does not guarantee 
            future returns. All analytics are for informational purposes only and should not be 
            considered as investment advice.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FundCategories;
