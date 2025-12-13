import { BookOpen, Play, FileText, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdSpace from "./AdSpace";

const LearningHub = () => {
  const resources = [
    {
      type: "video",
      icon: Play,
      title: "Understanding Mutual Fund Basics",
      description: "A comprehensive guide to mutual fund types, NAV calculation, and investment strategies for beginners.",
      duration: "12 min",
      category: "Beginner",
    },
    {
      type: "article",
      icon: FileText,
      title: "Decoding Upside Capture Ratio",
      description: "Learn how upside capture ratio helps identify funds that excel during market rallies.",
      duration: "8 min read",
      category: "Intermediate",
    },
    {
      type: "video",
      icon: Play,
      title: "SIP vs Lumpsum: Which is Better?",
      description: "Data-driven analysis of SIP and lumpsum investment strategies across market cycles.",
      duration: "15 min",
      category: "Beginner",
    },
    {
      type: "article",
      icon: FileText,
      title: "Exit Load & Tax Implications",
      description: "Complete guide to understanding STCG, LTCG, and exit load calculations for mutual funds.",
      duration: "10 min read",
      category: "Advanced",
    },
    {
      type: "video",
      icon: Play,
      title: "Reading Fund Fact Sheets",
      description: "How to analyze mutual fund fact sheets and identify key performance indicators.",
      duration: "18 min",
      category: "Intermediate",
    },
    {
      type: "article",
      icon: FileText,
      title: "Direct vs Regular Plans Explained",
      description: "Understanding the expense ratio difference and long-term impact on your investments.",
      duration: "6 min read",
      category: "Beginner",
    },
  ];

  const categoryColors: Record<string, string> = {
    Beginner: "bg-primary/10 text-primary",
    Intermediate: "bg-accent/10 text-accent",
    Advanced: "bg-secondary text-secondary-foreground",
  };

  return (
    <section id="learning" className="py-20 md:py-32 relative">
      {/* Background */}
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Top Ad Space */}
        <div className="flex justify-center mb-12">
          <AdSpace size="leaderboard" position="learning-top" />
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Financial Literacy Resources
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Learn to </span>
            <span className="text-gradient">Invest Smarter</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Free educational content covering mutual fund basics, advanced analytics, 
            tax planning, and investment strategies—all designed to empower your 
            financial decisions.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <article
              key={resource.title}
              className="glass-card-hover rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Thumbnail Placeholder */}
              <div className="h-40 bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center relative overflow-hidden">
                <resource.icon className="h-12 w-12 text-primary/50 group-hover:scale-110 transition-transform duration-300" />
                {resource.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                      <Play className="h-6 w-6 text-primary-foreground fill-current" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[resource.category]}`}>
                    {resource.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {resource.duration}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {resource.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button variant="hero-outline" size="lg">
            Explore All Resources
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Bottom Ad Space */}
        <div className="flex justify-center mt-12">
          <AdSpace size="banner" position="learning-bottom" />
        </div>
      </div>
    </section>
  );
};

export default LearningHub;
