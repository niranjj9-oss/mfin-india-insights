import { useState } from "react";
import { Menu, X, TrendingUp, BookOpen, Shield, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Fund Analytics", icon: TrendingUp, href: "#analytics" },
    { name: "Learning Hub", icon: BookOpen, href: "#learning" },
    { name: "Risk Tools", icon: Shield, href: "#tools" },
    { name: "Calculators", icon: Calculator, href: "#calculators" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="hero" size="sm">
              Get Started Free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 text-primary" />
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 px-4 pt-4 border-t border-border/50">
                <Button variant="ghost" className="w-full">
                  Sign In
                </Button>
                <Button variant="hero" className="w-full">
                  Get Started Free
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
