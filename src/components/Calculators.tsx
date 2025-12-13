import { 
  Calculator, 
  TrendingUp, 
  Calendar, 
  Percent, 
  ArrowRight,
  PiggyBank,
  Target,
  IndianRupee
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Calculators = () => {
  const calculators = [
    {
      icon: PiggyBank,
      title: "SIP Calculator",
      description: "Calculate future value of your systematic investment plan with customizable periods and returns.",
      color: "primary",
    },
    {
      icon: TrendingUp,
      title: "CAGR Calculator",
      description: "Compute compound annual growth rate for your investments over different time periods.",
      color: "accent",
    },
    {
      icon: Target,
      title: "Goal Planning",
      description: "Plan your investments to achieve specific financial goals with target-based calculations.",
      color: "primary",
    },
    {
      icon: Percent,
      title: "XIRR Calculator",
      description: "Calculate extended internal rate of return for irregular cash flows and SIP investments.",
      color: "accent",
    },
    {
      icon: IndianRupee,
      title: "Tax Calculator",
      description: "Estimate STCG and LTCG tax implications on your mutual fund redemptions.",
      color: "primary",
    },
    {
      icon: Calendar,
      title: "Exit Load Calculator",
      description: "Check applicable exit loads based on your investment date and scheme rules.",
      color: "accent",
    },
  ];

  return (
    <section id="calculators" className="py-20 md:py-32 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute left-1/4 top-1/3 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Calculator className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Investment Calculators
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Plan Your </span>
            <span className="text-gradient">Investment Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Free, easy-to-use calculators to help you make informed investment decisions. 
            All calculations are transparent and follow standard financial formulas.
          </p>
        </div>

        {/* Calculators Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <div
              key={calc.title}
              className="glass-card-hover rounded-2xl p-6 group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl ${calc.color === "primary" ? "bg-primary/10" : "bg-accent/10"} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <calc.icon className={`h-7 w-7 ${calc.color === "primary" ? "text-primary" : "text-accent"}`} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                {calc.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {calc.description}
              </p>
              <Button variant="ghost" className="group/btn p-0 h-auto">
                <span className="text-sm font-medium text-primary group-hover/btn:underline">
                  Use Calculator
                </span>
                <ArrowRight className="h-4 w-4 text-primary ml-1 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Calculators;
