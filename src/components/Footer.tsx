import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Youtube,
  ExternalLink
} from "lucide-react";
import Logo from "./Logo";
import AdSpace from "./AdSpace";

const Footer = () => {
  const quickLinks = [
    { name: "Fund Analytics", href: "#analytics" },
    { name: "Learning Hub", href: "#learning" },
    { name: "Calculators", href: "#calculators" },
    { name: "Risk Tools", href: "#tools" },
  ];

  const resources = [
    { name: "SIP Calculator", href: "#" },
    { name: "CAGR Calculator", href: "#" },
    { name: "Tax Calculator", href: "#" },
    { name: "Exit Load Checker", href: "#" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Disclaimer", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ];

  const externalLinks = [
    { name: "SEBI", href: "https://www.sebi.gov.in" },
    { name: "AMFI", href: "https://www.amfiindia.com" },
    { name: "MF Central", href: "https://www.mfcentral.com" },
    { name: "NSE", href: "https://www.nseindia.com" },
  ];

  return (
    <footer className="border-t border-border bg-secondary/30">
      {/* Footer Ad Space */}
      <div className="border-b border-border py-8">
        <div className="container mx-auto px-4 flex justify-center">
          <AdSpace size="leaderboard" position="footer-top" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo size="lg" className="mb-6" />
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              India's trusted mutual fund aggregator and investment intelligence platform. 
              Empowering investors with transparent, research-backed analytics.
            </p>
            <div className="space-y-3">
              <a href="mailto:support@mfinindiainfo.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
                support@mfinindiainfo.com
              </a>
              <a href="tel:+911234567890" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-4 w-4" />
                +91 123 456 7890
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Calculators</h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & External */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3 mb-6">
              {legal.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="font-heading font-semibold text-foreground mb-4">Regulators</h4>
            <ul className="space-y-3">
              {externalLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} MFindiaInfo. All rights reserved. 
            Information only, not investment advice.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <div className="bg-secondary/50 py-4 border-t border-border">
        <div className="container mx-auto px-4">
          <p className="text-xs text-muted-foreground text-center">
            Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. 
            Past performance does not guarantee future returns. Analytics are based on publicly available data and statistical methods.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
