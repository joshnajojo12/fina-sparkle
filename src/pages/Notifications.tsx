import { Bell, AlertTriangle, TrendingUp, CreditCard, Shield, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";

const allNotifications = [
  {
    id: 1,
    type: "bill",
    icon: CreditCard,
    title: "Water Bill Due Tomorrow",
    message: "Water bill of ₹800 is due tomorrow. Pay now to save ₹10.",
    time: "2 hours ago",
    priority: "high",
    read: false
  },
  {
    id: 2,
    type: "fraud",
    icon: Shield,
    title: "Suspicious SMS Detected",
    message: "Potential fraud detected: 'Your account will be blocked, click here'",
    time: "4 hours ago",
    priority: "high",
    read: false
  },
  {
    id: 3,
    type: "goal",
    icon: TrendingUp,
    title: "Savings Goal Update",
    message: "You're 64% towards your Bali trip goal! Keep it up!",
    time: "1 day ago",
    priority: "medium",
    read: true
  },
  {
    id: 4,
    type: "bill",
    icon: CreditCard,
    title: "Credit Card Bill Generated",
    message: "₹12,500 bill generated for HDFC Card. Due in 15 days.",
    time: "2 days ago",
    priority: "medium",
    read: true
  },
  {
    id: 5,
    type: "warning",
    icon: AlertTriangle,
    title: "Budget Alert",
    message: "You've spent 85% of your food budget this month.",
    time: "3 days ago",
    priority: "medium",
    read: false
  }
];

const Notifications = () => {
  const unreadCount = allNotifications.filter(n => !n.read).length;
  const billReminders = allNotifications.filter(n => n.type === "bill");
  const fraudAlerts = allNotifications.filter(n => n.type === "fraud");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive/10 border-destructive/20";
      case "medium": return "bg-warning/10 border-warning/20";
      default: return "bg-accent/10 border-accent/20";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "warning": return "text-warning";
      case "fraud": return "text-destructive";
      case "goal": return "text-success";
      case "bill": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Notifications <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Center</span>
                </h1>
                <p className="text-muted-foreground">Stay updated with bills, alerts, and reminders</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary">
                  {unreadCount} unread
                </Badge>
                <Button variant="outline" size="sm">
                  Mark all read
                </Button>
              </div>
            </div>
          </div>

          {/* Notification Tabs */}
          <div className="animate-scale-in">
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All ({allNotifications.length})</TabsTrigger>
                <TabsTrigger value="bills">Bills ({billReminders.length})</TabsTrigger>
                <TabsTrigger value="fraud">Security ({fraudAlerts.length})</TabsTrigger>
                <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="glass-card p-6 rounded-2xl">
                  <div className="space-y-4">
                    {allNotifications.map((notification) => {
                      const Icon = notification.icon;
                      
                      return (
                        <div
                          key={notification.id}
                          className={`p-4 rounded-xl border ${getPriorityColor(notification.priority)} ${!notification.read ? 'border-l-4 border-l-primary' : ''} hover:bg-background-accent/50 transition-colors`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                              <div className={`mt-1 ${getIconColor(notification.type)}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="text-sm font-medium text-foreground">
                                    {notification.title}
                                  </h4>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-primary rounded-full" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bills">
                <div className="glass-card p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Bill Payment Reminders</h3>
                  <div className="space-y-4">
                    {billReminders.map((notification) => {
                      const Icon = notification.icon;
                      
                      return (
                        <div key={notification.id} className="p-4 rounded-xl border border-border hover:bg-background-accent/50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="text-primary">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-foreground">{notification.title}</h4>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                            <Button size="sm" className="btn-glow">
                              Pay Now
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="fraud">
                <div className="glass-card p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Security Alerts</h3>
                  <div className="space-y-4">
                    {fraudAlerts.map((notification) => {
                      const Icon = notification.icon;
                      
                      return (
                        <div key={notification.id} className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-colors">
                          <div className="flex items-start space-x-3">
                            <div className="text-destructive mt-1">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-foreground">{notification.title}</h4>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                              <div className="flex space-x-2 mt-3">
                                <Button variant="destructive" size="sm">
                                  Block Sender
                                </Button>
                                <Button variant="outline" size="sm">
                                  Learn More
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="unread">
                <div className="glass-card p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Unread Notifications</h3>
                  <div className="space-y-4">
                    {allNotifications.filter(n => !n.read).map((notification) => {
                      const Icon = notification.icon;
                      
                      return (
                        <div key={notification.id} className={`p-4 rounded-xl border ${getPriorityColor(notification.priority)} border-l-4 border-l-primary hover:bg-background-accent/50 transition-colors`}>
                          <div className="flex items-start space-x-3">
                            <div className={`mt-1 ${getIconColor(notification.type)}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-foreground">{notification.title}</h4>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              Mark Read
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;