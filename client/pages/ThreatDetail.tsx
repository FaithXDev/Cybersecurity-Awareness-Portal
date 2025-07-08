import { useParams, Link } from "react-router-dom";
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  AlertTriangle,
  Shield,
  Eye,
  Target,
  Activity,
  Clock,
  Building,
  CheckCircle,
  XCircle,
  Zap,
  Book,
  Download,
  Share,
} from "lucide-react";
import { getThreatById } from "@/lib/threatsData";

export default function ThreatDetail() {
  const { threatId } = useParams<{ threatId: string }>();
  const threat = threatId ? getThreatById(threatId) : null;

  if (!threat) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Threat Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The threat you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/threats">Back to Threats</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "destructive";
      case "High":
        return "warning";
      case "Medium":
        return "secondary";
      case "Low":
        return "success";
      default:
        return "secondary";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Critical":
        return AlertTriangle;
      case "High":
        return Zap;
      case "Medium":
        return Activity;
      case "Low":
        return CheckCircle;
      default:
        return Activity;
    }
  };

  const preventionSteps = [
    {
      title: "Immediate Actions",
      description: "Steps to take right now to protect against this threat",
      actions: threat.prevention.slice(0, 3),
      timeframe: "Within 24 hours",
      priority: "Critical",
    },
    {
      title: "Short-term Measures",
      description: "Security improvements to implement this week",
      actions: threat.prevention.slice(3, 5),
      timeframe: "Within 1 week",
      priority: "High",
    },
    {
      title: "Long-term Strategy",
      description: "Comprehensive security enhancements for ongoing protection",
      actions: [
        "Regular security audits",
        "Employee training programs",
        "Incident response planning",
      ],
      timeframe: "Ongoing",
      priority: "Medium",
    },
  ];

  const SeverityIcon = getSeverityIcon(threat.severity);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/threats" className="hover:text-foreground">
            Threats
          </Link>
          <span>/</span>
          <span>{threat.category}</span>
          <span>/</span>
          <span className="text-foreground">{threat.name}</span>
        </div>

        {/* Back Button */}
        <Button variant="outline" size="sm" className="mb-6" asChild>
          <Link to="/threats">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Threats
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Threat Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-destructive/10">
                  <SeverityIcon className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <Badge
                    variant={getSeverityColor(threat.severity) as any}
                    className="mb-2"
                  >
                    {threat.severity} Risk
                  </Badge>
                  <Badge variant="outline" className="ml-2">
                    {threat.category}
                  </Badge>
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-4">{threat.name}</h1>

              {/* Risk Level */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Risk Level</span>
                  <span className="font-bold">{threat.riskLevel}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-destructive h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${threat.riskLevel}%` }}
                  />
                </div>
              </div>

              {/* Recent Activity Alert */}
              <Card className="mb-6 border-warning bg-warning/5">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-warning">
                        Recent Activity
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {threat.recentActivity}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="indicators">Indicators</TabsTrigger>
                <TabsTrigger value="prevention">Prevention</TabsTrigger>
                <TabsTrigger value="response">Response</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Book className="h-5 w-5 mr-2" />
                      Threat Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-relaxed">
                      {threat.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Indicators Tab */}
              <TabsContent value="indicators" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="h-5 w-5 mr-2" />
                      Indicators of Compromise (IoCs)
                    </CardTitle>
                    <CardDescription>
                      Watch for these signs that may indicate this threat is
                      present in your environment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {threat.indicators.map((indicator, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 rounded-lg border"
                        >
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-warning/20 text-warning text-sm font-bold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{indicator}</p>
                            <p className="text-sm text-muted-foreground">
                              Monitor for this behavior pattern in your security
                              tools and logs
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Detection Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Network Monitoring</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• SIEM platforms</li>
                          <li>• Network traffic analysis</li>
                          <li>• Intrusion detection systems</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Endpoint Protection</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• EDR solutions</li>
                          <li>• Behavioral analysis</li>
                          <li>• File integrity monitoring</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Prevention Tab */}
              <TabsContent value="prevention" className="space-y-6">
                <div className="space-y-6">
                  {preventionSteps.map((step, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center">
                            <div
                              className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                                step.priority === "Critical"
                                  ? "bg-destructive/20 text-destructive"
                                  : step.priority === "High"
                                    ? "bg-warning/20 text-warning"
                                    : "bg-secondary/20 text-secondary-foreground"
                              }`}
                            >
                              {index + 1}
                            </div>
                            {step.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                step.priority === "Critical"
                                  ? "destructive"
                                  : step.priority === "High"
                                    ? "warning"
                                    : "secondary"
                              }
                              size="sm"
                            >
                              {step.priority}
                            </Badge>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              {step.timeframe}
                            </div>
                          </div>
                        </div>
                        <CardDescription>{step.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {step.actions.map((action, actionIndex) => (
                            <div
                              key={actionIndex}
                              className="flex items-center space-x-3"
                            >
                              <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                              <span className="text-sm">{action}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Response Tab */}
              <TabsContent value="response" className="space-y-6">
                <Card className="border-destructive/20 bg-destructive/5">
                  <CardHeader>
                    <CardTitle className="flex items-center text-destructive">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Incident Response Plan
                    </CardTitle>
                    <CardDescription>
                      If you suspect this threat is active in your environment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        "Immediately isolate affected systems to prevent spread",
                        "Document all observed indicators and preserve evidence",
                        "Notify your incident response team and management",
                        "Assess the scope and impact of the potential breach",
                        "Implement containment measures specific to this threat",
                        "Begin forensic analysis and evidence collection",
                        "Notify relevant authorities and stakeholders as required",
                        "Execute recovery procedures and restore operations",
                      ].map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-sm font-bold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Emergency Contacts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="font-medium">CERT Team:</span>{" "}
                        cert@cybersafe.com
                      </div>
                      <div>
                        <span className="font-medium">24/7 Hotline:</span> +1
                        (555) 123-4567
                      </div>
                      <div>
                        <span className="font-medium">FBI IC3:</span>{" "}
                        www.ic3.gov
                      </div>
                      <div>
                        <span className="font-medium">CISA:</span> +1 (888)
                        282-0870
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recovery Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Recovery Checklist
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Book className="h-4 w-4 mr-2" />
                        View Technical Documentation
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Access Threat Hunting Guide
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Threat Intelligence */}
            <Card>
              <CardHeader>
                <CardTitle>Threat Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Category:</span>
                    <span className="text-sm">{threat.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Severity:</span>
                    <Badge
                      variant={getSeverityColor(threat.severity) as any}
                      size="sm"
                    >
                      {threat.severity}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Risk Score:</span>
                    <span className="text-sm font-bold">
                      {threat.riskLevel}/100
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Activity:</span>
                    <span
                      className={`text-sm font-medium ${threat.recentActivity ? "text-destructive" : "text-success"}`}
                    >
                      {threat.recentActivity ? "Active" : "Monitored"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Threats */}
            <Card>
              <CardHeader>
                <CardTitle>Related Threats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start h-auto p-2"
                    asChild
                  >
                    <Link to="/threats/ai-powered-phishing">
                      <div className="text-left">
                        <div className="font-medium text-sm">
                          AI-Powered Phishing
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Social Engineering
                        </div>
                      </div>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start h-auto p-2"
                    asChild
                  >
                    <Link to="/threats/supply-chain-attacks">
                      <div className="text-left">
                        <div className="font-medium text-sm">
                          Supply Chain Attacks
                        </div>
                        <div className="text-xs text-muted-foreground">APT</div>
                      </div>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start h-auto p-2"
                    asChild
                  >
                    <Link to="/threats/business-email-compromise">
                      <div className="text-left">
                        <div className="font-medium text-sm">
                          Business Email Compromise
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Social Engineering
                        </div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Threat Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Threat Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Global Impact</span>
                    <span className="font-bold">High</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Detection Rate</span>
                    <span className="font-bold">65%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Average Damage</span>
                    <span className="font-bold">$2.4M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Recovery Time</span>
                    <span className="font-bold">21 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
