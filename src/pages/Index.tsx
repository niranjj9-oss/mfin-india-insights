import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FundCategories from "@/components/FundCategories";
import Features from "@/components/Features";
import LearningHub from "@/components/LearningHub";
import Calculators from "@/components/Calculators";
import Compliance from "@/components/Compliance";
import Footer from "@/components/Footer";
import AdSpace from "@/components/AdSpace";
import { Helmet } from "react-helmet-async";

const Index = () => {
  // JSON-LD Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "MFindiaInfo",
    "description": "India's trusted mutual fund aggregator and investment intelligence platform providing transparent, research-backed analytics for informed investment decisions.",
    "url": "https://mfinindiainfo.com",
    "logo": "https://mfinindiainfo.com/logo.png",
    "areaServed": "India",
    "serviceType": ["Mutual Fund Analytics", "Investment Research", "Portfolio Aggregation"],
    "offers": {
      "@type": "Offer",
      "name": "Free Mutual Fund Analytics",
      "description": "Free portfolio aggregation, fund analytics, and educational resources",
      "price": "0",
      "priceCurrency": "INR"
    },
    "sameAs": [
      "https://twitter.com/mfinindiainfo",
      "https://linkedin.com/company/mfinindiainfo",
      "https://youtube.com/@mfinindiainfo"
    ]
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Upside Capture Ratio in mutual funds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upside Capture Ratio measures how much a mutual fund participates in benchmark gains during positive market periods. A ratio above 100% indicates the fund outperforms the benchmark during upswings."
        }
      },
      {
        "@type": "Question",
        "name": "How do I analyze mutual fund performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Analyze mutual fund performance using key metrics like CAGR, Sharpe Ratio, Alpha, Rolling Returns Consistency, and Expense Ratio. MFindiaInfo provides comprehensive analytics based on these research-backed parameters."
        }
      },
      {
        "@type": "Question",
        "name": "Is MFindiaInfo a SEBI registered investment advisor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MFindiaInfo provides investment analytics and educational insights only. It is not a registered investment advisor. All information is for educational purposes, and investment decisions should be made independently."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>MFindiaInfo - Best Mutual Fund Analytics & Investment Intelligence Platform India</title>
        <meta name="description" content="India's trusted mutual fund aggregator with research-backed analytics. Analyze fund performance, upside capture ratio, CAGR, Sharpe ratio & more. Free portfolio insights with SEBI compliant data." />
        <meta name="keywords" content="mutual fund analytics India, mutual fund comparison, SIP calculator, CAGR calculator, upside capture ratio, mutual fund portfolio tracker, best mutual funds India, SEBI compliant, AMFI data, fund performance analysis" />
        <link rel="canonical" href="https://mfinindiainfo.com/" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MFindiaInfo - Smart Mutual Fund Analytics for Indian Investors" />
        <meta property="og:description" content="Make smarter investment decisions with transparent, explainable mutual fund analytics. Free portfolio aggregation and research-backed insights." />
        <meta property="og:url" content="https://mfinindiainfo.com/" />
        <meta property="og:site_name" content="MFindiaInfo" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MFindiaInfo - Best Mutual Fund Analytics Platform" />
        <meta name="twitter:description" content="Analyze mutual funds with research-backed metrics. Free portfolio tracker, SIP calculator, and investment intelligence." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <Hero />
          
          {/* Top Banner Ad */}
          <div className="container mx-auto px-4 py-8 flex justify-center">
            <AdSpace size="leaderboard" position="top-banner" />
          </div>
          
          <FundCategories />
          <Features />
          <LearningHub />
          <Calculators />
          <Compliance />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
