import { Bell, Calendar, Trophy, AlertTriangle, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const StudentNotifications = () => {
  const notifications = [
    {
      id: 1,
      type: "reminder",
      title: "College fest fee due this Friday",
      message: "Don't forget to pay ₹500 for the annual fest registration 🎤",
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
      emoji: "📅",
      time: "2 hours ago",
      urgent: true
    },
    {
      id: 2,
      type: "achievement",
      title: "Awesome savings streak!",
      message: "You saved ₹500 this week — keep it up! 🏆",
      icon: Trophy,
      color: "from-green-500 to-emerald-500",
      emoji: "🎉",
      time: "1 day ago",
      urgent: false
    },
    {
      id: 3,
      type: "alert",
      title: "Scam Alert",
      message: "⚠️ Fake internship message detected. Don't pay upfront fees for any job opportunities!",
      icon: AlertTriangle,
      color: "from-red-500 to-orange-500",
      emoji: "🚨",
      time: "3 days ago",
      urgent: true
    },
    {
      id: 4,
      type: "goal",
      title: "Goal Progress Update",
      message: "Your 'New Phone' goal is now 25% complete! Only ₹11,250 to go 📱",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      emoji: "🎯",
      time: "1 week ago",
      urgent: false
    }
  ];

  const getNotificationStyle = (type: string, urgent: boolean) => {
    if (urgent && type === "alert") return "border-red-200/40 bg-red-500/5";
    if (urgent && type === "reminder") return "border-blue-200/40 bg-blue-500/5";
    if (type === "achievement") return "border-green-200/40 bg-green-500/5";
    return "border-border bg-background-accent";
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications 🔔
        </h3>
        <Button variant="ghost" size="sm" data-testid="button-mark-all-read">
          Mark all read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          
          return (
            <div 
              key={notification.id} 
              className={`p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] ${getNotificationStyle(notification.type, notification.urgent)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${notification.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground text-sm">
                        {notification.title}
                      </h4>
                      <span className="text-lg flex-shrink-0">{notification.emoji}</span>
                      {notification.urgent && (
                        <Badge variant="destructive" className="text-xs px-2 py-0">
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="opacity-50 hover:opacity-100">
                  ×
                </Button>
              </div>

              {/* Quick Actions for certain notification types */}
              {notification.type === "reminder" && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <Button size="sm" className="text-xs" data-testid={`button-action-${notification.id}`}>
                    Set Reminder
                  </Button>
                </div>
              )}

              {notification.type === "goal" && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <Button size="sm" variant="outline" className="text-xs" data-testid={`button-view-goal-${notification.id}`}>
                    View Goal
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Filter */}
      <div className="mt-6 flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" className="text-xs">
          All
        </Button>
        <Button variant="ghost" size="sm" className="text-xs">
          🚨 Urgent
        </Button>
        <Button variant="ghost" size="sm" className="text-xs">
          🏆 Achievements  
        </Button>
        <Button variant="ghost" size="sm" className="text-xs">
          📅 Reminders
        </Button>
      </div>
    </div>
  );
};

export default StudentNotifications;