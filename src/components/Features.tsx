import { 
  PieChart, 
  LineChart, 
  Shield, 
  Calculator, 
  ArrowRightLeft, 
  Wallet,
  Lock,
  Zap,
  BookOpen
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: PieChart,
      title: "Portfolio Aggregation",
      description: "Consolidate all your mutual fund investments across AMCs using PAN-based authentication. View your complete portfolio in one dashboard.",
    },
    {
      icon: LineChart,
      title: "Upside Capture Analysis",
      description: "Understand how your funds perform during market upswings with explainable metrics and benchmark comparisons.",
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Get comprehensive risk metrics including Sharpe Ratio, Maximum Drawdown, and Standard Deviation with plain-English explanations.",
    },
    {
      icon: Calculator,
      title: "Tax & Exit Calculator",
      description: "Calculate STCG/LTCG implications, exit loads, and post-tax realization before making redemption decisions.",
    },
    {
      icon: ArrowRightLeft,
      title: "Switch Intelligence",
      description: "Discover better-performing alternatives within the same category, AMC, or risk profile without pushy recommendations.",
    },
    {
      icon: Wallet,
      title: "SIP vs Lumpsum Analysis",
      description: "Analyze your investment patterns and understand the impact of different investment strategies on your returns.",
    },
    {
      icon: Lock,
      title: "Bank-Grade Security",
      description: "Your data is encrypted and we never store your Aadhaar number. Only authentication tokens are kept for verification.",
    },
    {
      icon: Zap,
      title: "Real-Time NAV Updates",
      description: "Get the latest NAV data directly from AMFI and registrar sources with automated daily updates.",
    },
    {
      icon: BookOpen,
      title: "5W Explainability",
      description: "Every insight answers What, Why, What it means, What options exist, and What risks are involved.",
    },
  ];

  return (
    <section id="tools" className="py-20 md:py-32 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">
              Powerful Analytics Tools
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Everything You Need for </span>
            <span className="text-gradient-accent">Smart Investing</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive tools designed with regulatory compliance and transparency at the core. 
            No hidden agendas, no push selling—just clear, actionable insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card-hover rounded-2xl p-6 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
