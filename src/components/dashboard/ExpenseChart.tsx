import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const expenseData = [
  { name: 'Savings', value: 35, color: '#3B82F6' },
  { name: 'EMI/Loans', value: 25, color: '#06B6D4' },
  { name: 'Bills & Utilities', value: 20, color: '#8B5CF6' },
  { name: 'Food & Dining', value: 12, color: '#F59E0B' },
  { name: 'Entertainment', value: 5, color: '#EF4444' },
  { name: 'Others', value: 3, color: '#6B7280' }
];

const ExpenseChart = () => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 rounded-lg border">
          <p className="text-foreground font-medium">{payload[0].name}</p>
          <p className="text-primary font-bold">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Expense Breakdown</h3>
        <div className="text-sm text-muted-foreground">This Month</div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {expenseData.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseChart;