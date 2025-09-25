import { Plus, ShoppingBag, Car, Gamepad2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const StudentExpenses = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, category: "Food", amount: 300, icon: "🍔", color: "from-red-500 to-orange-500", description: "Lunch at cafeteria" },
    { id: 2, category: "Travel", amount: 100, icon: "🚌", color: "from-blue-500 to-cyan-500", description: "Bus fare" },
    { id: 3, category: "Fun", amount: 200, icon: "🎮", color: "from-purple-500 to-pink-500", description: "Movie tickets" },
  ]);

  const [newExpense, setNewExpense] = useState({ category: "Food", amount: "" });
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = [
    { name: "Food", icon: "🍔", color: "from-red-500 to-orange-500" },
    { name: "Travel", icon: "🚌", color: "from-blue-500 to-cyan-500" },
    { name: "Fun", icon: "🎮", color: "from-purple-500 to-pink-500" },
    { name: "Study", icon: "📚", color: "from-green-500 to-emerald-500" }
  ];

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const weeklyBudget = 1000; // Example weekly budget
  const spentPercentage = Math.round((totalSpent / weeklyBudget) * 100);

  const addExpense = () => {
    if (newExpense.amount) {
      const category = categories.find(c => c.name === newExpense.category);
      const expense = {
        id: Date.now(),
        category: newExpense.category,
        amount: Number(newExpense.amount),
        icon: category?.icon || "💰",
        color: category?.color || "from-gray-500 to-gray-600",
        description: `${newExpense.category} expense`
      };
      setExpenses([expense, ...expenses]);
      setNewExpense({ category: "Food", amount: "" });
      setShowAddForm(false);
    }
  };

  const getAiFeedback = () => {
    if (spentPercentage > 80) {
      return {
        message: "Whoa! You've spent 80%+ of your weekly budget 😱. Maybe skip that extra snack?",
        type: "warning",
        emoji: "⚠️"
      };
    } else if (spentPercentage > 50) {
      return {
        message: `You've spent ${spentPercentage}% of your weekly pocket money on expenses 🍟. Keep an eye on it!`,
        type: "caution",
        emoji: "👀"
      };
    } else {
      return {
        message: "Great job managing your expenses! You're staying within budget 🎉",
        type: "success",
        emoji: "✨"
      };
    }
  };

  const feedback = getAiFeedback();

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Expenses 💸
        </h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          data-testid="button-add-expense"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* AI Feedback */}
      <div className={`p-3 rounded-lg mb-6 border ${
        feedback.type === 'warning' ? 'bg-red-500/10 border-red-200/20' :
        feedback.type === 'caution' ? 'bg-yellow-500/10 border-yellow-200/20' :
        'bg-green-500/10 border-green-200/20'
      }`}>
        <p className="text-sm text-foreground flex items-center gap-2">
          <span className="text-lg">{feedback.emoji}</span>
          {feedback.message}
        </p>
      </div>

      {/* Budget Overview */}
      <div className="mb-6 p-4 rounded-xl bg-background-accent">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Weekly Budget</span>
          <span className="text-sm font-medium text-foreground">
            ₹{totalSpent} / ₹{weeklyBudget}
          </span>
        </div>
        <div className="w-full bg-background rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              spentPercentage > 80 ? 'bg-gradient-to-r from-red-500 to-orange-500' :
              spentPercentage > 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
              'bg-gradient-to-r from-green-500 to-emerald-500'
            }`}
            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          ₹{weeklyBudget - totalSpent} left for this week
        </p>
      </div>

      {/* Add Expense Form */}
      {showAddForm && (
        <div className="mb-6 p-4 rounded-xl bg-background-accent border border-primary/20">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <select 
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                className="p-2 rounded-lg bg-background border border-input text-foreground"
                data-testid="select-expense-category"
              >
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
              <Input
                type="number"
                placeholder="Amount"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                data-testid="input-expense-amount"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addExpense} size="sm" data-testid="button-save-expense">
                Add Expense
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Expenses */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Recent Expenses</h4>
        {expenses.slice(0, 5).map((expense) => (
          <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg bg-background-accent">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${expense.color} flex items-center justify-center`}>
                <span className="text-sm">{expense.icon}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{expense.category}</p>
                <p className="text-xs text-muted-foreground">{expense.description}</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-foreground">₹{expense.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentExpenses;