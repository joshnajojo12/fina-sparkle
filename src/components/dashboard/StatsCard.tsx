import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  gradient?: boolean;
}

const StatsCard = ({ title, value, change, changeType = "neutral", icon: Icon, gradient = false }: StatsCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className={`glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300 ${gradient ? 'bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground mb-2">{value}</p>
          {change && (
            <p className={`text-xs font-medium ${getChangeColor()}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${gradient ? 'bg-gradient-to-r from-primary to-accent' : 'bg-background-accent'}`}>
          <Icon className={`w-6 h-6 ${gradient ? 'text-primary-foreground' : 'text-primary'}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;