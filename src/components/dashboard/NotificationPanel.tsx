import { Bell, AlertTriangle, TrendingUp, CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const notifications = [
  {
    id: 1,
    type: "warning",
    icon: AlertTriangle,
    title: "EMI Due Tomorrow",
    message: "Home loan EMI of ₹25,000 is due tomorrow",
    time: "2 hours ago",
    priority: "high"
  },
  {
    id: 2,
    type: "fraud",
    icon: Shield,
    title: "Suspicious SMS Detected",
    message: "Potential fraud detected in recent SMS",
    time: "4 hours ago",
    priority: "high"
  },
  {
    id: 3,
    type: "goal",
    icon: TrendingUp,
    title: "Savings Goal Update",
    message: "You're 64% towards your Bali trip goal!",
    time: "1 day ago",
    priority: "medium"
  },
  {
    id: 4,
    type: "bill",
    icon: CreditCard,
    title: "Credit Card Bill",
    message: "₹12,500 bill generated for HDFC Card",
    time: "2 days ago",
    priority: "medium"
  }
];

const NotificationPanel = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 border-destructive/20";
      case "medium":
        return "bg-warning/10 border-warning/20";
      default:
        return "bg-accent/10 border-accent/20";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "warning":
        return "text-warning";
      case "fraud":
        return "text-destructive";
      case "goal":
        return "text-success";
      case "bill":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          <Badge variant="secondary" className="ml-2">
            {notifications.length}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          Mark all read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          
          return (
            <div
              key={notification.id}
              className={`p-4 rounded-xl border ${getPriorityColor(notification.priority)} hover:bg-background-accent/50 transition-colors cursor-pointer`}
            >
              <div className="flex items-start space-x-3">
                <div className={`mt-1 ${getIconColor(notification.type)}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {notification.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {notification.time}
                  </p>
                </div>
                {notification.priority === "high" && (
                  <div className="w-2 h-2 bg-destructive rounded-full notification-badge" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Button variant="outline" className="w-full mt-4" size="sm">
        View All Notifications
      </Button>
    </div>
  );
};

export default NotificationPanel;