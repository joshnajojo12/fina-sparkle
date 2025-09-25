import { Trophy, Star, Zap, Target, Shield, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const StudentBadges = () => {
  const badges = [
    {
      id: 1,
      name: "First ₹1,000 Saved",
      description: "Reached your first savings milestone",
      icon: "🎉",
      color: "from-green-500 to-emerald-500",
      earned: true,
      earnedDate: "2 weeks ago",
      rarity: "common"
    },
    {
      id: 2,
      name: "Streak Master",
      description: "5 days without overspending",
      icon: "🏅", 
      color: "from-blue-500 to-cyan-500",
      earned: true,
      earnedDate: "1 week ago",
      rarity: "uncommon"
    },
    {
      id: 3,
      name: "Budget Ninja",
      description: "Stayed under budget for a full month",
      icon: "🥷",
      color: "from-purple-500 to-pink-500", 
      earned: false,
      progress: 67,
      rarity: "rare"
    },
    {
      id: 4,
      name: "Goal Crusher",
      description: "Complete your first savings goal",
      icon: "🎯",
      color: "from-orange-500 to-red-500",
      earned: false,
      progress: 20,
      rarity: "epic"
    },
    {
      id: 5,
      name: "Scam Detector",
      description: "Report a suspicious message",
      icon: "🕵️",
      color: "from-yellow-500 to-orange-500",
      earned: false,
      progress: 0,
      rarity: "legendary"
    },
    {
      id: 6,
      name: "Money Mentor",
      description: "Help a friend with budgeting tips",
      icon: "🤝",
      color: "from-indigo-500 to-purple-500",
      earned: false,
      progress: 0,
      rarity: "legendary"
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-500";
      case "uncommon": return "bg-green-500";
      case "rare": return "bg-blue-500";
      case "epic": return "bg-purple-500";
      case "legendary": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const earnedBadges = badges.filter(b => b.earned);
  const availableBadges = badges.filter(b => !b.earned);

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Badges 🏆
        </h3>
        <Badge variant="secondary" className="text-xs">
          {earnedBadges.length}/{badges.length}
        </Badge>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Earned Badges ✨</h4>
          <div className="grid grid-cols-1 gap-3">
            {earnedBadges.map((badge) => (
              <div key={badge.id} className={`p-3 rounded-xl bg-gradient-to-r ${badge.color}/10 border border-current/10 hover:scale-105 transition-transform`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${badge.color} flex items-center justify-center relative`}>
                    <span className="text-lg">{badge.icon}</span>
                    <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getRarityColor(badge.rarity)} flex items-center justify-center`}>
                      <Star className="w-2 h-2 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-foreground text-sm flex items-center gap-2">
                      {badge.name}
                      <Crown className="w-3 h-3 text-yellow-500" />
                    </h5>
                    <p className="text-xs text-muted-foreground mb-1">{badge.description}</p>
                    <p className="text-xs text-green-600 font-medium">Earned {badge.earnedDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Badges */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Available Badges 🎯</h4>
        <div className="grid grid-cols-1 gap-3">
          {availableBadges.slice(0, 3).map((badge) => (
            <div key={badge.id} className="p-3 rounded-xl bg-background-accent border border-border opacity-75 hover:opacity-90 transition-opacity">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${badge.color}/20 border border-current/20 flex items-center justify-center relative`}>
                  <span className="text-sm grayscale">{badge.icon}</span>
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getRarityColor(badge.rarity)} opacity-50 flex items-center justify-center`}>
                    <Star className="w-1.5 h-1.5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground text-sm">{badge.name}</h5>
                  <p className="text-xs text-muted-foreground mb-1">{badge.description}</p>
                  {badge.progress !== undefined && badge.progress > 0 && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs text-foreground">{badge.progress}%</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full bg-gradient-to-r ${badge.color}`}
                          style={{ width: `${badge.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Summary */}
      <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Achievement Points</span>
          <span className="font-bold text-foreground">{earnedBadges.length * 100} pts</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Next reward at 500 pts - Keep going! 🚀
        </div>
      </div>
    </div>
  );
};

export default StudentBadges;