import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Search,
  Shield,
  Zap,
  Bug,
  Lock,
  Eye,
  FileX,
  Wifi,
  Smartphone,
  Globe,
  Database,
  ArrowRight,
  TrendingUp,
  Clock,
  Target,
  Activity,
} from "lucide-react";
import {
  threatsData,
  getCurrentThreatLevel,
  getAllThreatCategories,
} from "@/lib/threatsData";

export default function Threats() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Filter threats based on search and category
  const filteredThreats = threatsData.filter((threat) => {
    const matchesSearch =
      threat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || threat.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const currentThreatLevel = getCurrentThreatLevel();
  const threatCategories = getAllThreatCategories();

  const categoryData = [
    {
      name: "Malware",
      icon: Bug,
      count: threatsData.filter((t) => t.category.includes("Malware")).length,
      trend: "+12%",
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/50",
      description: "Malicious software including viruses, worms, and trojans",
    },
    {
      name: "Social Engineering",
      icon: Eye,
      count: threatsData.filter((t) =>
        t.category.includes("Social Engineering"),
      ).length,
      trend: "+8%",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/50",
      description: "Social engineering attacks targeting user credentials",
    },
    {
      name: "Ransomware",
      icon: Lock,
      count: threatsData.filter((t) => t.category.includes("Ransomware"))
        .length,
      trend: "+23%",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/50",
      description: "Encryption-based extortion attacks",
    },
    {
      name: "Network Security",
      icon: Wifi,
      count: threatsData.filter((t) => t.category.includes("Network")).length,
      trend: "+5%",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
      description: "DDoS, man-in-the-middle, and network intrusions",
    },
    {
      name: "Cloud Security",
      icon: Database,
      count: threatsData.filter((t) => t.category.includes("Cloud")).length,
      trend: "+15%",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/50",
      description: "Cloud infrastructure and service attacks",
    },
    {
      name: "Web Security",
      icon: Globe,
      count: threatsData.filter((t) => t.category.includes("Web")).length,
      trend: "+7%",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/50",
      description: "SQL injection, XSS, and web application attacks",
    },
  ];

  const protectionSteps = [
    {
      title: "Multi-Factor Authentication",
      description: "Enable MFA on all critical accounts and systems",
      priority: "High",
      difficulty: "Easy",
      timeToImplement: "1 hour",
    },
    {
      title: "Regular Security Updates",
      description: "Keep all software and systems updated with latest patches",
      priority: "High",
      difficulty: "Easy",
      timeToImplement: "Ongoing",
    },
    {
      title: "Employee Security Training",
      description: "Train staff to recognize and respond to security threats",
      priority: "High",
      difficulty: "Medium",
      timeToImplement: "1 week",
    },
    {
      title: "Backup and Recovery Plan",
      description:
        "Implement comprehensive backup strategy with offline copies",
      priority: "Medium",
      difficulty: "Medium",
      timeToImplement: "2-3 days",
    },
    {
      title: "Network Segmentation",
      description: "Isolate critical systems and limit lateral movement",
      priority: "Medium",
      difficulty: "Hard",
      timeToImplement: "1-2 weeks",
    },
  ];

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

  const getTrendIcon = (trend: string) => {
    return trend === "Increasing" ? TrendingUp : Activity;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive";
      case "Medium":
        return "warning";
      case "Low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-destructive/10 text-destructive border-destructive/20 mb-4">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Threat Intelligence Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cybersecurity Threats
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed about the latest cybersecurity threats and learn how
            to protect your organization from emerging attacks
          </p>
        </div>

        {/* Search and Current Status */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search threats..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Badge
              variant={currentThreatLevel.color as any}
              className="px-3 py-1"
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              Threat Level: {currentThreatLevel.level}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <Clock className="h-3 w-3 mr-1" />
              Last Updated: 2 min ago
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="current" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current">Current Threats</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="protection">Protection</TabsTrigger>
            <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
          </TabsList>

          {/* Current Threats Tab */}
          <TabsContent value="current" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredThreats.slice(0, 20).map((threat) => {
                const getSeverityIcon = (severity: string) => {
                  switch (severity) {
                    case "Critical":
                      return AlertTriangle;
                    case "High":
                      return Zap;
                    case "Medium":
                      return Activity;
                    case "Low":
                      return Shield;
                    default:
                      return Activity;
                  }
                };

                const IconComponent = getSeverityIcon(threat.severity);

                return (
                  <Card
                    key={threat.id}
                    className="group hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-destructive/10">
                            <IconComponent className="h-5 w-5 text-destructive" />
                          </div>
                          <div>
                            <Badge
                              variant={getSeverityColor(threat.severity) as any}
                              className="mb-1"
                            >
                              {threat.severity}
                            </Badge>
                            <Badge variant="outline" className="ml-2">
                              {threat.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Active
                        </div>
                      </div>

                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {threat.name}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed line-clamp-3">
                        {threat.description.substring(0, 200)}...
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {/* Risk Level */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Risk Level</span>
                            <span className="font-bold">
                              {threat.riskLevel}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-destructive h-2 rounded-full transition-all duration-500"
                              style={{ width: `${threat.riskLevel}%` }}
                            />
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm text-muted-foreground">
                            {threat.recentActivity
                              ? "Recent activity"
                              : "Active threat"}
                          </span>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/threats/${threat.id}`}>
                              Learn More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryData.map((category) => {
                const IconComponent = category.icon;

                return (
                  <Card
                    key={category.name}
                    className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() =>
                      setSelectedCategory(
                        category.name === selectedCategory ? "" : category.name,
                      )
                    }
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${category.bgColor}`}
                        >
                          <IconComponent
                            className={`h-6 w-6 ${category.color}`}
                          />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {category.count}
                          </div>
                          <div className="text-sm text-success">
                            {category.trend}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {category.description}
                      </p>

                      <Button
                        variant={
                          selectedCategory === category.name
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className="w-full group/btn"
                      >
                        {selectedCategory === category.name
                          ? "Clear Filter"
                          : "Filter Threats"}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Protection Tab */}
          <TabsContent value="protection" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Essential Protection Steps
                </h2>
                <div className="space-y-4">
                  {protectionSteps.map((step, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold">{step.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {step.description}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={getPriorityColor(step.priority) as any}
                          size="sm"
                        >
                          {step.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground ml-11">
                        <span>Difficulty: {step.difficulty}</span>
                        <span>Time: {step.timeToImplement}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Emergency Response</h2>
                <Card className="p-6 bg-destructive/5 border-destructive/20">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-6 w-6 text-destructive" />
                      <h3 className="text-lg font-semibold">
                        Incident Response Checklist
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {[
                        "Isolate affected systems immediately",
                        "Document the incident details",
                        "Notify relevant stakeholders",
                        "Preserve evidence for investigation",
                        "Implement containment measures",
                        "Begin recovery procedures",
                        "Conduct post-incident review",
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-2 h-2 rounded-full bg-destructive" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="mt-6 p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Emergency Contacts
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">CERT Team:</span>{" "}
                      cert@cybersafe.com
                    </div>
                    <div>
                      <span className="font-medium">24/7 Hotline:</span> +1
                      (555) 123-4567
                    </div>
                    <div>
                      <span className="font-medium">FBI IC3:</span> www.ic3.gov
                    </div>
                    <div>
                      <span className="font-medium">CISA:</span> +1 (888)
                      282-0870
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Intelligence Tab */}
          <TabsContent value="intelligence" className="space-y-6">
            <div className="text-center">
              <Card className="inline-block p-8 bg-muted/50">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Advanced Threat Intelligence
                </h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Real-time threat intelligence feeds, IoC databases, and
                  advanced analytics coming soon to help you stay ahead of
                  emerging threats.
                </p>
                <Button>Request Early Access</Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}

// Fix missing Brain import
function Brain({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}
