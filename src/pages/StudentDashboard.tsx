import { 
  Wallet, 
  Target, 
  TrendingUp, 
  Sparkles, 
  Send, 
  Plus, 
  AlertTriangle,
  Trophy,
  Star,
  Gift,
  CreditCard,
  Calendar,
  Clock
} from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import StudentNavbar from "@/components/student/StudentNavbar";
import StudentSavingsGoals from "@/components/student/StudentSavingsGoals";
import StudentNotifications from "@/components/student/StudentNotifications";
import StudentBadges from "@/components/student/StudentBadges";
import StatsCard from "@/components/dashboard/StatsCard";
import { api, WalletData, Transaction } from "@/lib/api";

const StudentDashboard = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [transferForm, setTransferForm] = useState({
    to: "",
    amount: "",
    type: "transfer"
  });
  const [transferring, setTransferring] = useState(false);
  const { toast } = useToast();

  // Load initial data
  useEffect(() => {
    loadWalletData();
    loadTransactions();
  }, []);

  const loadWalletData = async () => {
    try {
      const data = await api.getWallet();
      setWalletData(data);
    } catch (error) {
      console.error('Failed to load wallet data:', error);
      toast({
        title: "Error",
        description: "Failed to load wallet data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadTransactions = async () => {
    try {
      const data = await api.getTransactions(10);
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferForm.to || !transferForm.amount || transferring) return;
    
    setTransferring(true);
    try {
      const payment = await api.makePayment({
        to: transferForm.to,
        amount_rupees: parseFloat(transferForm.amount),
        type: transferForm.type,
        sandbox: true
      });
      
      toast({
        title: "Transfer Successful! 🎉",
        description: `₹${payment.amount_rupees} sent to ${payment.to}`,
      });
      
      // Reset form and refresh data
      setTransferForm({ to: "", amount: "", type: "transfer" });
      await loadWalletData();
      await loadTransactions();
      
    } catch (error: any) {
      toast({
        title: "Transfer Failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setTransferring(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'food': return '🍔';
      case 'travel': return '🚌';
      case 'entertainment': return '🎮';
      case 'bill': return '💳';
      case 'transfer': return '💸';
      default: return '💰';
    }
  };

  const getSavingsProgress = () => {
    if (!walletData) return 0;
    const goalAmount = 50000; // ₹50,000 goal
    return Math.min((walletData.balance_rupees / goalAmount) * 100, 100);
  };

  const getSpendingStreak = () => {
    // Calculate days without overspending based on transactions
    const recentTransactions = transactions.slice(0, 7);
    const dailyBudget = 500; // ₹500 daily budget
    
    let streak = 0;
    for (const transaction of recentTransactions) {
      if (transaction.amount_rupees <= dailyBudget) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <StudentNavbar />
      
      {/* Main Dashboard */}
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Hey there, <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">{walletData?.user_name || 'Student'}!</span> ✨
            </h1>
            <p className="text-muted-foreground">Let's keep track of your money and reach your goals! 🎯</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
            <StatsCard
              title="Total Balance"
              value={`₹${walletData?.balance_rupees.toLocaleString() || '0'}`}
              change="Live from your wallet"
              changeType="positive"
              icon={Wallet}
              gradient={true}
            />
            <StatsCard
              title="Savings Progress"
              value={`${Math.round(getSavingsProgress())}%`}
              change="Towards ₹50,000 goal"
              changeType="positive"
              icon={Target}
            />
            <StatsCard
              title="Total Transactions"
              value={transactions.length.toString()}
              change="This month"
              changeType="positive"
              icon={Sparkles}
            />
            <StatsCard
              title="Smart Spending Days"
              value={getSpendingStreak().toString()}
              change="Keep it up! 🏆"
              changeType="positive"
              icon={TrendingUp}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Wallet Balance Card */}
              <Card className="glass-card animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Your Wallet 💰
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200/20">
                    <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                      ₹{walletData?.balance_rupees.toLocaleString() || '0'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Wallet ID: {walletData?.wallet_id} • {walletData?.wallet_type} • Sandbox Mode
                    </p>
                  </div>
                  
                  {/* Quick Balance Insights */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-200/20">
                      <p className="text-sm font-medium text-green-700 dark:text-green-400">Available</p>
                      <p className="text-lg font-bold text-green-800 dark:text-green-300">
                        ₹{walletData?.balance_rupees.toLocaleString() || '0'}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-200/20">
                      <p className="text-sm font-medium text-blue-700 dark:text-blue-400">Last Updated</p>
                      <p className="text-lg font-bold text-blue-800 dark:text-blue-300">
                        {walletData?.updated_at ? new Date(walletData.updated_at).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transfer Money Card */}
              <Card className="glass-card animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Money 💸
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTransfer} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="to">Send To</Label>
                        <Input
                          id="to"
                          placeholder="Friend's phone number"
                          value={transferForm.to}
                          onChange={(e) => setTransferForm({ ...transferForm, to: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="amount">Amount (₹)</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          value={transferForm.amount}
                          onChange={(e) => setTransferForm({ ...transferForm, amount: e.target.value })}
                          required
                          min="1"
                          max={walletData?.balance_rupees || 0}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="type">Transaction Type</Label>
                      <select
                        id="type"
                        value={transferForm.type}
                        onChange={(e) => setTransferForm({ ...transferForm, type: e.target.value })}
                        className="w-full p-2 rounded-lg bg-background border border-input text-foreground"
                      >
                        <option value="transfer">💸 Transfer to Friend</option>
                        <option value="food">🍔 Food & Snacks</option>
                        <option value="travel">🚌 Travel & Transport</option>
                        <option value="entertainment">🎮 Entertainment</option>
                        <option value="bill">💳 Bill Payment</option>
                      </select>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      disabled={transferring || !transferForm.to || !transferForm.amount}
                    >
                      {transferring ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send ₹{transferForm.amount || '0'}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="animate-scale-in">
                <StudentSavingsGoals />
              </div>
              
              {/* Scam Alerts & Notifications */}
              <Card className="glass-card animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Alerts & Tips 🚨
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-200/20">
                    <p className="text-sm text-red-700 dark:text-red-400 flex items-center gap-2">
                      ⚠️ Fake internship scam detected! Never pay for jobs.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-200/20">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
                      💡 Tip: Set aside ₹500 weekly for emergency fund!
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-200/20">
                    <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
                      🎯 You're {Math.round(getSavingsProgress())}% closer to your phone goal!
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="animate-scale-in">
                <StudentBadges />
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <Card className="glass-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Transactions 📊
              </CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.slice(0, 8).map((transaction) => (
                    <div key={transaction.transaction_id} className="flex items-center justify-between p-4 rounded-lg bg-background-accent border border-border/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <span className="text-lg">{getTransactionIcon(transaction.type)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            To: {transaction.recipient} • {new Date(transaction.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-red-500">-₹{transaction.amount_rupees}</p>
                        <Badge variant="outline" className="text-xs">
                          {transaction.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {transactions.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No transactions yet. Make your first transfer above! 🚀</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No transactions yet. Make your first transfer above! 🚀</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;