import { ArrowRight, TrendingUp, Shield, BarChart3, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.png";

const Hero = () => {
  const stats = [
    { value: "40+", label: "AMC Coverage" },
    { value: "5000+", label: "Fund Schemes" },
    { value: "95%", label: "Data Accuracy" },
    { value: "Free", label: "Core Features" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px] animate-pulse-slow delay-1000" />

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              SEBI & AMFI Compliant Analytics Platform
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">Make Smarter </span>
            <span className="text-gradient">Mutual Fund</span>
            <br />
            <span className="text-foreground">Investment Decisions</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up delay-100">
            India's most trusted mutual fund aggregator and investment intelligence platform. 
            Get transparent, explainable analytics powered by research-backed methodologies 
            without the risk of mis-selling.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up delay-200">
            <Button variant="hero" size="xl">
              Analyze Your Portfolio
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="hero-outline" size="xl">
              <Play className="h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up delay-300">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card-hover rounded-xl p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-8 opacity-60 animate-fade-in delay-500">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>MF Central Integrated</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
            <span>AMFI Data Source</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>PAN + Aadhaar Verified</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
