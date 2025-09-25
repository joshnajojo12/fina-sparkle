import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Target } from "lucide-react";

const savingsGoals = [
  {
    id: 1,
    title: "Trip to Bali",
    target: 50000,
    current: 32000,
    dailyTarget: 137,
    daysLeft: 131,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "New Laptop",
    target: 80000,
    current: 45000,
    dailyTarget: 195,
    daysLeft: 179,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "Emergency Fund",
    target: 200000,
    current: 125000,
    dailyTarget: 411,
    daysLeft: 182,
    color: "from-green-500 to-emerald-500"
  }
];

const SavingsGoals = () => {
  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Savings Goals</h3>
        <Button variant="outline" size="sm" className="btn-glow">
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>

      <div className="space-y-6">
        {savingsGoals.map((goal) => {
          const progressPercentage = (goal.current / goal.target) * 100;
          
          return (
            <div key={goal.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${goal.color} flex items-center justify-center`}>
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{goal.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{progressPercentage.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">{goal.daysLeft} days left</p>
                </div>
              </div>
              
              <Progress value={progressPercentage} className="h-2 progress-glow" />
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Daily target: ₹{goal.dailyTarget}
                </span>
                <span className="text-success font-medium">
                  ₹{goal.target - goal.current} remaining
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavingsGoals;