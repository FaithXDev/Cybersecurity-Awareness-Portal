import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import {
  TrendingUp,
  AlertTriangle,
  Shield,
  Users,
  Clock,
  Target,
  Activity,
  Award,
} from "lucide-react";

export function StatsSection() {
  const [activeLearners, setActiveLearners] = useState(2847);
  const [threatsBlocked, setThreatsBlocked] = useState(45921);
  const [courseCompletion, setCourseCompletion] = useState(87.3);
  const [threatLevel, setThreatLevel] = useState("Medium");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Real-time updates every 3-5 seconds
  useEffect(() => {
    const interval = setInterval(
      () => {
        // Update active learners (small random changes)
        setActiveLearners((prev) => prev + Math.floor(Math.random() * 3) - 1);

        // Update threats blocked (always increasing)
        setThreatsBlocked((prev) => prev + Math.floor(Math.random() * 5) + 1);

        // Update course completion (small fluctuations)
        setCourseCompletion((prev) => {
          const change = (Math.random() - 0.5) * 0.2;
          return Math.max(85, Math.min(95, prev + change));
        });

        // Occasionally change threat level
        if (Math.random() < 0.1) {
          // 10% chance
          const levels = ["Low", "Medium", "High"];
          setThreatLevel(levels[Math.floor(Math.random() * levels.length)]);
        }

        setLastUpdate(new Date());
      },
      3000 + Math.random() * 2000,
    ); // 3-5 seconds

    return () => clearInterval(interval);
  }, []);

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case "Low":
        return { color: "text-success", bgColor: "bg-success/10" };
      case "High":
        return { color: "text-destructive", bgColor: "bg-destructive/10" };
      default:
        return { color: "text-warning", bgColor: "bg-warning/10" };
    }
  };

  const threatColors = getThreatLevelColor(threatLevel);

  const stats = [
    {
      title: "Threat Level",
      value: threatLevel,
      change: `Updated ${Math.floor((Date.now() - lastUpdate.getTime()) / 1000)}s ago`,
      trend: "up",
      icon: AlertTriangle,
      color: threatColors.color,
      bgColor: threatColors.bgColor,
    },
    {
      title: "Active Learners",
      value: activeLearners.toLocaleString(),
      change: `+${Math.floor(Math.random() * 50) + 100} this week`,
      trend: "up",
      icon: Users,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Threats Blocked",
      value: threatsBlocked.toLocaleString(),
      change: `+${Math.floor(Math.random() * 100) + 1000} today`,
      trend: "up",
      icon: Shield,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Course Completion",
      value: `${courseCompletion.toFixed(1)}%`,
      change: `+${(Math.random() * 2 + 3).toFixed(1)}% this month`,
      trend: "up",
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/50",
    },
  ];

  const [recentThreats] = useState([
    {
      name: "Phishing Campaign",
      severity: "High",
      time: Date.now() - 2 * 60 * 60 * 1000,
    },
    {
      name: "Malware Distribution",
      severity: "Medium",
      time: Date.now() - 4 * 60 * 60 * 1000,
    },
    {
      name: "Data Breach Alert",
      severity: "Critical",
      time: Date.now() - 6 * 60 * 60 * 1000,
    },
    {
      name: "Ransomware Activity",
      severity: "High",
      time: Date.now() - 8 * 60 * 60 * 1000,
    },
  ]);

  const getTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else {
      return `${hours} hours ago`;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "destructive";
      case "High":
        return "warning";
      case "Medium":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            Real-Time Security Intelligence
            <div className="flex items-center">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-normal text-success ml-2">
                LIVE
              </span>
            </div>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with live cybersecurity metrics and threat monitoring
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const IconComponent = stat.icon;

            return (
              <Card key={stat.title} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.bgColor}`}
                    >
                      <IconComponent className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mb-2">{stat.value}</p>
                    <p className="text-sm text-success">{stat.change}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Threats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Activity className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-semibold">Recent Threat Alerts</h3>
              </div>

              <div className="space-y-4">
                {recentThreats.map((threat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{threat.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {getTimeAgo(threat.time)}
                      </p>
                    </div>
                    <Badge variant={getSeverityColor(threat.severity) as any}>
                      {threat.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Target className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-semibold">Security Metrics</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Firewall Status</span>
                  <Badge
                    variant="secondary"
                    className="bg-success/10 text-success"
                  >
                    Active
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Last Security Scan
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.floor((Date.now() - lastUpdate.getTime()) / 1000)}s
                    ago
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Vulnerability Score
                  </span>
                  <span className="text-sm font-bold text-success">9.2/10</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">System Updates</span>
                  <Badge
                    variant="secondary"
                    className="bg-success/10 text-success"
                  >
                    Up to date
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Backup Status</span>
                  <Badge
                    variant="secondary"
                    className="bg-success/10 text-success"
                  >
                    Completed
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
