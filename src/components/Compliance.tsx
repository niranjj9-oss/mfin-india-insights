import { Shield, AlertTriangle, Info, CheckCircle2 } from "lucide-react";

const Compliance = () => {
  const disclaimers = [
    {
      icon: AlertTriangle,
      title: "Investment Risk Disclosure",
      text: "Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Past performance is not indicative of future returns.",
    },
    {
      icon: Info,
      title: "Information Only Platform",
      text: "This platform provides investment analytics and educational insights only. It is NOT a registered investment advisor. All insights are informational, comparative, and analytical in nature.",
    },
    {
      icon: Shield,
      title: "User Responsibility",
      text: "Final investment decisions lie entirely with the user. Users must independently verify all information before acting. The platform is not liable for any financial losses.",
    },
  ];

  const regulations = [
    "SEBI Guidelines Compliant",
    "AMFI Data Standards",
    "RBI Framework Aligned",
    "MF Central Integrated",
    "CAMS/KFintech Compatible",
  ];

  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-4">
        {/* Regulatory Compliance */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Regulatory Compliance
            </span>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
            Built with Compliance at the Core
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {regulations.map((reg) => (
              <div key={reg} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{reg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimers */}
        <div className="grid md:grid-cols-3 gap-6">
          {disclaimers.map((item) => (
            <div key={item.title} className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Compliance;
