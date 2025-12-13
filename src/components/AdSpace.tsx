interface AdSpaceProps {
  size?: "banner" | "rectangle" | "leaderboard" | "skyscraper";
  position?: string;
  className?: string;
}

const AdSpace = ({ size = "banner", position = "", className = "" }: AdSpaceProps) => {
  const sizeClasses = {
    banner: "h-[90px] w-full max-w-[728px]",
    rectangle: "h-[250px] w-[300px]",
    leaderboard: "h-[90px] w-full max-w-[970px]",
    skyscraper: "h-[600px] w-[160px]",
  };

  return (
    <div 
      className={`ad-space ${sizeClasses[size]} ${className}`}
      data-ad-position={position}
      aria-label="Advertisement space"
    >
      <div className="text-center">
        <span className="text-xs text-muted-foreground/50 uppercase tracking-wider">
          Advertisement
        </span>
        <p className="text-xs text-muted-foreground/30 mt-1">
          {size === "banner" && "728 x 90"}
          {size === "rectangle" && "300 x 250"}
          {size === "leaderboard" && "970 x 90"}
          {size === "skyscraper" && "160 x 600"}
        </p>
      </div>
    </div>
  );
};

export default AdSpace;
