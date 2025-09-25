import { useState } from "react";
import { Wallet, Target, TrendingUp, AlertTriangle, Calendar, Trophy, Zap, Coffee, Car, BookOpen, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StudentDashboard = () => {
  const [weeklyAllowance] = useState(2000);
  const [partTimeEarnings] = useState(8000);
  const [totalSpent] = useState(1200);
  
  const savingsGoals = [
    {
      id: 1,
      title: "New iPhone 📱",
      target: 80000,
      current: 32000,
      emoji: "📱",
      color: "from-blue-500 to-purple-500"
    },
    {
      id: 2,
      title: "College Trip to Goa 🏖️",
      target: 15000,
      current: 8500,
      emoji: "🏖️",
      color: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      title: "Gaming Setup 🎮",
      target: 45000,
      current: 12000,
      emoji: "🎮",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const expenses = [
    { category: "Food", amount: 450, icon: Coffee, emoji: "🍕", color: "text-orange-500" },
    { category: "Travel", amount: 280, icon: Car, emoji: "🚌", color: "text-blue-500" },
    { category: "Entertainment", amount: 320, icon: Gamepad2, emoji: "🎬", color: "text-purple-500" },
    { category: "Study", amount: 150, icon: BookOpen, emoji: "📚", color: "text-green-500" }
  ];

  const notifications = [
    {
      id: 1,
      type: "reminder",
      title: "College Fees Due Soon! 🎓",
      message: "Your semester fees of ₹25,000 are due in 5 days",
      priority: "high",
      emoji: "🎓"
    },
    {
      id: 2,
      type: "scam",
      title: "Scam Alert! 🚨",
      message: "Beware of fake internship offers asking for money upfront",
      priority: "high",
      emoji: "🚨"
    },
    {
      id: 3,
      type: "exam",
      title: "Exam Fee Reminder 📝",
      message: "Don't forget to pay your exam fees by next week",
      priority: "medium",
      emoji: "📝"
    }
  ];

  const remainingMoney = weeklyAllowance + partTimeEarnings - totalSpent;
  const weeklySpendingRate = totalSpent / 7; // Assuming current spending is for a week
  const daysRemaining = Math.floor(remainingMoney / weeklySpendingRate);
  const spentPercentage = (totalSpent / weeklyAllowance) * 100;

  const getAIFeedback = () => {
    const foodSpent = expenses.find(e => e.category === "Food")?.amount || 0;
    const foodPercentage = (foodSpent / weeklyAllowance) * 100;
    
    if (foodPercentage > 25) {
      return `You've spent ${foodPercentage.toFixed(0)}% of your weekly allowance on food 🍕 Maybe try cooking at home more often? 👨‍🍳`;
    } else if (spentPercentage > 80) {
      return "Whoa! You're spending quite fast this week 🏃‍♂️ Time to slow down a bit! 💸";
    } else if (spentPercentage < 30) {
      return "Great job saving money! 🌟 You're on track to meet your goals! 🎯";
    } else {
      return "You're doing well with your spending! Keep it balanced! ⚖️";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Hey Student! 👋 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Your Money Dashboard</span>
          </h1>
          <p className="text-gray-600">Manage your pocket money like a pro! 💪</p>
        </div>

        {/* Money Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-400 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Wallet className="w-5 h-5 mr-2" />
                Pocket Money 💰
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹{weeklyAllowance.toLocaleString()}</p>
              <p className="text-green-100">Weekly allowance</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Part-time Earnings 💼
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹{partTimeEarnings.toLocaleString()}</p>
              <p className="text-blue-100">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-400 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Money Left 🎯
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹{remainingMoney.toLocaleString()}</p>
              <p className="text-purple-100">Available now</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Feedback & Predictor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center">
                🤖 AI Money Coach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{getAIFeedback()}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-100 to-red-100 border-pink-300">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center">
                🔮 Money Predictor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                At your current spending rate, your money will last for <span className="font-bold text-pink-600">{daysRemaining} days</span> 📅
              </p>
              <p className="text-sm text-gray-600 mt-2">Daily spending: ₹{weeklySpendingRate.toFixed(0)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Savings Goals */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center">
              <Target className="w-6 h-6 mr-2" />
              🎯 Your Savings Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {savingsGoals.map((goal) => {
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={goal.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800">{goal.title}</h4>
                      <span className="text-2xl">{goal.emoji}</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">₹{goal.current.toLocaleString()}</span>
                      <span className="text-gray-600">₹{goal.target.toLocaleString()}</span>
                    </div>
                    <p className="text-sm font-medium text-green-600">{progress.toFixed(1)}% Complete! 🌟</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Expenses */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center">
              💸 This Week's Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {expenses.map((expense, index) => {
                const Icon = expense.icon;
                return (
                  <div key={index} className="bg-white p-4 rounded-lg border-2 border-gray-100 hover:border-gray-200 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{expense.emoji}</span>
                        <Icon className={`w-5 h-5 ${expense.color}`} />
                      </div>
                      <Badge variant="secondary">₹{expense.amount}</Badge>
                    </div>
                    <h4 className="font-medium text-gray-800">{expense.category}</h4>
                    <p className="text-sm text-gray-600">This week</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center">
              🔔 Important Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    notification.priority === "high"
                      ? "bg-red-50 border-red-400"
                      : "bg-yellow-50 border-yellow-400"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{notification.emoji}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{notification.title}</h4>
                      <p className="text-gray-600 text-sm">{notification.message}</p>
                    </div>
                    <Badge
                      variant={notification.priority === "high" ? "destructive" : "secondary"}
                    >
                      {notification.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gamification Section */}
        <Card className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center">
              <Trophy className="w-6 h-6 mr-2" />
              🏆 Your Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Badge className="bg-yellow-500 text-white px-4 py-2 text-sm">
                🥇 Smart Saver - 7 days streak!
              </Badge>
              <Badge className="bg-green-500 text-white px-4 py-2 text-sm">
                💰 Budget Master - Under budget this week!
              </Badge>
              <Badge className="bg-blue-500 text-white px-4 py-2 text-sm">
                🎯 Goal Getter - 50% progress on phone goal!
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;