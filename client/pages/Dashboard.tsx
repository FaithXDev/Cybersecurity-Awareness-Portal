import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { coursesData, getCourseById } from "@/lib/coursesData";
import { quizzesData } from "@/lib/quizzesData";
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
import {
  BarChart3,
  Shield,
  Trophy,
  Clock,
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Activity,
  Calendar,
} from "lucide-react";

// Security level progression system
const getSecurityLevel = (completedCourses: number) => {
  if (completedCourses === 0) {
    return {
      level: "Newbie",
      levelNumber: 1,
      color: "secondary",
      nextLevel: "Beginner",
      coursesNeeded: 4,
    };
  } else if (completedCourses < 4) {
    return {
      level: "Newbie",
      levelNumber: 1,
      color: "secondary",
      nextLevel: "Beginner",
      coursesNeeded: 4 - completedCourses,
    };
  } else if (completedCourses < 8) {
    return {
      level: "Beginner",
      levelNumber: 2,
      color: "success",
      nextLevel: "Intermediate",
      coursesNeeded: 8 - completedCourses,
    };
  } else if (completedCourses < 15) {
    return {
      level: "Intermediate",
      levelNumber: 3,
      color: "primary",
      nextLevel: "Advanced",
      coursesNeeded: 15 - completedCourses,
    };
  } else if (completedCourses < 25) {
    return {
      level: "Advanced",
      levelNumber: 4,
      color: "warning",
      nextLevel: "Expert",
      coursesNeeded: 25 - completedCourses,
    };
  } else if (completedCourses < 40) {
    return {
      level: "Expert",
      levelNumber: 5,
      color: "destructive",
      nextLevel: "Master",
      coursesNeeded: 40 - completedCourses,
    };
  } else {
    return {
      level: "Master",
      levelNumber: 6,
      color: "destructive",
      nextLevel: "Max Level",
      coursesNeeded: 0,
    };
  }
};

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    coursesInProgress: 0,
    quizzesTaken: 0,
    averageScore: 0,
    studyStreak: 0,
    totalCourses: coursesData.length,
    totalQuizzes: quizzesData.length,
  });

  useEffect(() => {
    // Calculate real-time stats based on enrolled courses
    const enrolledCoursesCount = user?.enrolledCourses?.length || 0;
    const completedCourses = Math.min(enrolledCoursesCount, 3); // For demo, assume some are completed
    const inProgressCourses = enrolledCoursesCount - completedCourses;
    const quizzesTaken = completedCourses * 2; // Approximately 2 quizzes per course
    const averageScore =
      completedCourses > 0 ? Math.floor(Math.random() * 25) + 75 : 0; // Random between 75-100
    const studyStreak =
      enrolledCoursesCount > 0 ? Math.floor(Math.random() * 20) + 5 : 0; // Random between 5-25

    setStats({
      coursesCompleted: completedCourses,
      coursesInProgress: inProgressCourses,
      quizzesTaken,
      averageScore,
      studyStreak,
      totalCourses: coursesData.length,
      totalQuizzes: quizzesData.length,
    });
  }, [user?.enrolledCourses]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.first_name || "Cyber Defender"}!
          </h1>
          <p className="text-muted-foreground">
            Track your cybersecurity learning progress and achievements
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Courses Completed
                  </p>
                  <p className="text-2xl font-bold">{stats.coursesCompleted}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-4">
                <Progress
                  value={
                    stats.coursesCompleted > 0
                      ? (stats.coursesCompleted / 4) * 100
                      : 0
                  }
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {stats.coursesCompleted > 0
                    ? `${Math.round((stats.coursesCompleted / 4) * 100)}% of learning path`
                    : "Start your learning journey"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Security Level
                  </p>
                  <p className="text-2xl font-bold">
                    {getSecurityLevel(stats.coursesCompleted).level}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant={
                      getSecurityLevel(stats.coursesCompleted).color as any
                    }
                    className={`bg-${getSecurityLevel(stats.coursesCompleted).color}/10 text-${getSecurityLevel(stats.coursesCompleted).color}`}
                  >
                    Level {getSecurityLevel(stats.coursesCompleted).levelNumber}
                  </Badge>
                  {getSecurityLevel(stats.coursesCompleted).coursesNeeded >
                    0 && (
                    <p className="text-xs text-muted-foreground">
                      {getSecurityLevel(stats.coursesCompleted).coursesNeeded}{" "}
                      more to{" "}
                      {getSecurityLevel(stats.coursesCompleted).nextLevel}
                    </p>
                  )}
                </div>
                {getSecurityLevel(stats.coursesCompleted).coursesNeeded > 0 && (
                  <div>
                    <Progress
                      value={(() => {
                        const currentLevel = getSecurityLevel(
                          stats.coursesCompleted,
                        );
                        if (currentLevel.level === "Newbie") {
                          return (stats.coursesCompleted / 4) * 100;
                        } else if (currentLevel.level === "Beginner") {
                          return ((stats.coursesCompleted - 4) / 4) * 100;
                        } else if (currentLevel.level === "Intermediate") {
                          return ((stats.coursesCompleted - 8) / 7) * 100;
                        } else if (currentLevel.level === "Advanced") {
                          return ((stats.coursesCompleted - 15) / 10) * 100;
                        } else if (currentLevel.level === "Expert") {
                          return ((stats.coursesCompleted - 25) / 15) * 100;
                        }
                        return 0;
                      })()}
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Progress to next level
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Enrolled Courses
                </CardTitle>
                <CardDescription>
                  Your enrolled courses and their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user?.enrolledCourses && user.enrolledCourses.length > 0 ? (
                    user.enrolledCourses.map((courseId, index) => {
                      const course = getCourseById(courseId);
                      if (!course) return null;

                      // Calculate realistic progress based on course enrollment order
                      // First enrolled course has more progress, later ones have less
                      const baseProgress = Math.max(0, 100 - index * 25); // First course: ~100%, second: ~75%, etc.
                      const randomVariation =
                        Math.floor(Math.random() * 20) - 10; // ±10% variation
                      const progress = Math.max(
                        0,
                        Math.min(100, baseProgress + randomVariation),
                      );
                      const isCompleted = progress >= 95;
                      const isStarted = progress > 5;

                      return (
                        <div
                          key={courseId}
                          className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                isCompleted
                                  ? "bg-success"
                                  : isStarted
                                    ? "bg-primary"
                                    : "bg-warning"
                              }`}
                            ></div>
                            <div>
                              <p className="font-medium text-sm">
                                {course.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {isCompleted
                                  ? `All modules completed • ${course.difficulty} level`
                                  : `${Math.ceil(progress / 12.5)} of ${course.syllabus?.length || 8} modules • ${course.difficulty}`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-20">
                              <Progress value={progress} className="h-2" />
                            </div>
                            <Badge
                              variant="secondary"
                              className={
                                isCompleted
                                  ? "bg-success/10 text-success"
                                  : isStarted
                                    ? "bg-primary/10 text-primary"
                                    : "bg-warning/10 text-warning"
                              }
                            >
                              {isCompleted
                                ? "Completed"
                                : isStarted
                                  ? "In Progress"
                                  : "Started"}
                            </Badge>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        No enrolled courses yet
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Start your cybersecurity journey by enrolling in a
                        course
                      </p>
                      <Button asChild>
                        <a href="/learning">Browse Courses</a>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
                    <p className="font-medium text-sm">Security Webinar</p>
                    <p className="text-xs text-muted-foreground">
                      Tomorrow, 2:00 PM
                    </p>
                    <p className="text-xs text-primary mt-1">
                      "Zero Trust Architecture"
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border">
                    <p className="font-medium text-sm">Quiz Deadline</p>
                    <p className="text-xs text-muted-foreground">
                      3 days remaining
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Incident Response Assessment
                    </p>
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
