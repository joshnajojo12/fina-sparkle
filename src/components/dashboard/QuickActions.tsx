import { Plus, MessageSquare, Calculator, Shield, TrendingUp, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    icon: Plus,
    label: "Add Transaction",
    description: "Quick expense entry",
    color: "from-blue-500 to-cyan-500",
    href: "/transactions"
  },
  {
    icon: MessageSquare,
    label: "Parse SMS",
    description: "Auto-detect from SMS",
    color: "from-purple-500 to-pink-500",
    href: "/sms-parser"
  },
  {
    icon: Calculator,
    label: "EMI Calculator",
    description: "Calculate loan EMI",
    color: "from-green-500 to-emerald-500",
    href: "/emi-calculator"
  },
  {
    icon: Shield,
    label: "Fraud Check",
    description: "Verify suspicious SMS",
    color: "from-red-500 to-orange-500",
    href: "/fraud-detection"
  },
  {
    icon: Target,
    label: "New Goal",
    description: "Set savings target",
    color: "from-indigo-500 to-purple-500",
    href: "/goals"
  },
  {
    icon: TrendingUp,
    label: "What-If Analysis",
    description: "Financial scenarios",
    color: "from-yellow-500 to-orange-500",
    href: "/simulator"
  }
];

const QuickActions = () => {
  return (
    <div className="glass-card p-6 rounded-2xl">
      <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <Button
              key={index}
              variant="ghost"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-background-accent transition-all duration-300 btn-glow group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;