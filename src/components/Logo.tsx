import logoImg from "@/assets/logo.png";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className = "", showText = true, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={logoImg} 
        alt="MFindiaInfo Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`font-heading font-bold ${textSizes[size]} text-foreground`}>
            <span className="text-gradient">MF</span>
            <span>india</span>
            <span className="text-gradient-accent">info</span>
          </span>
          {size === "lg" && (
            <span className="text-xs text-muted-foreground">Intelligent Mutual Fund Insights</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
