import { TrendingDown, Clock, AlertTriangle, TrendingUp, Target } from "lucide-react";

const StudentPredictor = () => {
  // Example calculation based on current spending
  const currentBalance = 4200;
  const weeklySpending = 600;
  const daysLeft = Math.floor(currentBalance / (weeklySpending / 7));
  const monthlySpending = weeklySpending * 4;
  const savingsRate = 0.3; // 30% savings rate

  const getPredictionColor = (days: number) => {
    if (days <= 7) return "from-red-500 to-orange-500";
    if (days <= 14) return "from-yellow-500 to-orange-500";
    return "from-green-500 to-emerald-500";
  };

  const getPredictionIcon = (days: number) => {
    if (days <= 7) return AlertTriangle;
    if (days <= 14) return TrendingDown;
    return TrendingUp;
  };

  const predictions = [
    {
      title: "Money Will Last",
      value: `${daysLeft} days`,
      description: "At your current spending rate",
      icon: Clock,
      color: getPredictionColor(daysLeft),
      urgent: daysLeft <= 7
    },
    {
      title: "Monthly Outlook",
      value: `₹${(4200 - monthlySpending).toLocaleString()}`,
      description: "Expected balance end of month",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
      urgent: false
    },
    {
      title: "Savings Goal ETA",
      value: "8 months",
      description: "For your phone at current rate",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      urgent: false
    }
  ];

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <TrendingDown className="w-5 h-5" />
          AI Predictor 🔮
        </h3>
      </div>

      <div className="space-y-4">
        {/* Main Prediction - Money Duration */}
        <div className={`p-4 rounded-xl bg-gradient-to-r ${getPredictionColor(daysLeft)}/10 border border-current/10`}>
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getPredictionColor(daysLeft)} flex items-center justify-center`}>
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-foreground">
                {daysLeft} days ⏳
              </h4>
              <p className="text-sm text-muted-foreground">
                At your current spending rate, your money will run out in {daysLeft} days
              </p>
            </div>
          </div>
          
          {daysLeft <= 7 && (
            <div className="mt-3 p-2 rounded-lg bg-red-500/10 border border-red-200/20">
              <p className="text-xs text-red-600 font-medium">
                🚨 Consider reducing expenses or adding more income!
              </p>
            </div>
          )}
        </div>

        {/* Secondary Predictions */}
        <div className="grid grid-cols-1 gap-3">
          <div className="p-3 rounded-lg bg-background-accent">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Monthly Savings Potential</p>
                <p className="text-xs text-muted-foreground">
                  You could save ₹{Math.round(monthlySpending * savingsRate)} more per month
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-background-accent">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white text-xs">📱</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Phone Goal ETA</p>
                <p className="text-xs text-muted-foreground">
                  About 8 months at current savings rate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Tips */}
        <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/20">
          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-1">
            💡 Smart Tips
          </h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>• Skip one coffee shop visit per week to save ₹200/month</p>
            <p>• Consider setting aside ₹100 daily for your phone goal</p>
            <p>• Your best spending day is usually Monday - plan expenses then</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPredictor;