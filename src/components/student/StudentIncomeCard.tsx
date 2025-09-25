import { Wallet, Plus, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const StudentIncomeCard = () => {
  const [pocketMoney, setPocketMoney] = useState(2000);
  const [partTimeEarnings, setPartTimeEarnings] = useState(3000);
  const [isEditing, setIsEditing] = useState(false);

  const totalBalance = pocketMoney + partTimeEarnings;

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to your data store
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Your Money 💰
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsEditing(!isEditing)}
          data-testid="button-edit-income"
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>

      {/* Total Balance - Big Display */}
      <div className="text-center mb-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200/20">
        <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
        <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          ₹{totalBalance.toLocaleString()}
        </p>
      </div>

      {/* Income Sources */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-xl bg-background-accent">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <PiggyBank className="w-5 h-5 text-white" />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">Pocket Money</Label>
              <p className="text-xs text-muted-foreground">Monthly allowance</p>
            </div>
          </div>
          {isEditing ? (
            <Input 
              type="number" 
              value={pocketMoney} 
              onChange={(e) => setPocketMoney(Number(e.target.value))}
              className="w-24 text-right"
              data-testid="input-pocket-money"
            />
          ) : (
            <p className="text-lg font-semibold text-foreground">₹{pocketMoney.toLocaleString()}</p>
          )}
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-background-accent">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">Part-time Earnings</Label>
              <p className="text-xs text-muted-foreground">Side hustle income</p>
            </div>
          </div>
          {isEditing ? (
            <Input 
              type="number" 
              value={partTimeEarnings} 
              onChange={(e) => setPartTimeEarnings(Number(e.target.value))}
              className="w-24 text-right"
              data-testid="input-part-time-earnings"
            />
          ) : (
            <p className="text-lg font-semibold text-foreground">₹{partTimeEarnings.toLocaleString()}</p>
          )}
        </div>
      </div>

      {/* Add New Income Source */}
      <Button 
        variant="outline" 
        className="w-full mt-4 border-dashed border-2 hover:bg-primary/5"
        data-testid="button-add-income-source"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add New Income Source
      </Button>
    </div>
  );
};

export default StudentIncomeCard;