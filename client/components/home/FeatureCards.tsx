import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Shield,
  HelpCircle,
  Newspaper,
  BarChart3,
  Users,
  ArrowRight,
  Lock,
  AlertTriangle,
  Brain,
} from "lucide-react";
import { Link } from "react-router-dom";

export function FeatureCards() {
  const features = [
    {
      title: "Learning Center",
      description:
        "Comprehensive cybersecurity courses from beginner to advanced levels with hands-on exercises.",
      icon: BookOpen,
      href: "/learning",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      darkBgColor: "dark:bg-blue-950/50",
      stats: "50+ Courses",
    },
    {
      title: "Threat Intelligence",
      description:
        "Stay informed about the latest cybersecurity threats, attack vectors, and protection strategies.",
      icon: Shield,
      href: "/threats",
      color: "text-red-600",
      bgColor: "bg-red-50",
      darkBgColor: "dark:bg-red-950/50",
      stats: "Live Updates",
    },
    {
      title: "Security Quiz",
      description:
        "Test your cybersecurity knowledge with interactive quizzes and track your progress over time.",
      icon: HelpCircle,
      href: "/quiz",
      color: "text-green-600",
      bgColor: "bg-green-50",
      darkBgColor: "dark:bg-green-950/50",
      stats: "100+ Questions",
    },
    {
      title: "News Center",
      description:
        "Real-time cybersecurity news aggregated from trusted sources worldwide with AI analysis.",
      icon: Newspaper,
      href: "/news",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      darkBgColor: "dark:bg-purple-950/50",
      stats: "24/7 Updates",
    },
    {
      title: "Dashboard",
      description:
        "Track your learning progress, quiz scores, and security knowledge improvements.",
      icon: BarChart3,
      href: "/dashboard",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      darkBgColor: "dark:bg-orange-950/50",
      stats: "Personal Stats",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Complete Cybersecurity Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to learn, practice, and stay current with
            cybersecurity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature) => {
            const IconComponent = feature.icon;

            return (
              <Card
                key={feature.title}
                className="relative group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor} ${feature.darkBgColor} mb-4`}
                  >
                    <IconComponent className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      {feature.stats}
                    </span>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="group/btn"
                    >
                      <Link to={feature.href}>
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="inline-block p-8 bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/20">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-warning/20">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success/20">
                <Brain className="h-6 w-6 text-success" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">
              Ready to Secure Your Future?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Join thousands of professionals building their cybersecurity
              expertise
            </p>
            <Button size="lg" className="px-8" asChild>
              <Link to="/learning">Get Started Free</Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
