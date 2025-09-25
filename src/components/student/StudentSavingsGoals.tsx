import { Target, Plus, Smartphone, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const StudentSavingsGoals = () => {
  const goals = [
    {
      id: 1,
      name: "New Phone",
      target: 15000,
      saved: 3000,
      icon: Smartphone,
      emoji: "📱",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "College Trip",
      target: 10000,
      saved: 1000,
      icon: Plane,
      emoji: "✈️",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const getProgressPercentage = (saved: number, target: number) => {
    return Math.round((saved / target) * 100);
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Target className="w-5 h-5" />
          Savings Goals 🎯
        </h3>
        <Button 
          variant="ghost" 
          size="sm"
          data-testid="button-add-goal"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = getProgressPercentage(goal.saved, goal.target);
          const Icon = goal.icon;
          
          return (
            <div key={goal.id} className="p-4 rounded-xl bg-background-accent space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${goal.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground flex items-center gap-1">
                      {goal.name} <span className="text-lg">{goal.emoji}</span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      ₹{goal.saved.toLocaleString()} / ₹{goal.target.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{progress}%</p>
                  <p className="text-xs text-muted-foreground">Complete</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  ₹{(goal.target - goal.saved).toLocaleString()} to go!
                </p>
              </div>

              {progress >= 100 && (
                <div className="text-center p-2 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200/20">
                  <span className="text-sm font-medium text-green-600">🎉 Goal Complete! Time to treat yourself!</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add New Goal */}
      <Button 
        variant="outline" 
        className="w-full mt-4 border-dashed border-2 hover:bg-primary/5"
        data-testid="button-new-goal"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add New Goal
      </Button>

      {/* Quick Stats */}
      <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Progress</span>
          <span className="font-medium text-foreground">
            {Math.round(goals.reduce((acc, goal) => acc + getProgressPercentage(goal.saved, goal.target), 0) / goals.length)}% avg
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentSavingsGoals;