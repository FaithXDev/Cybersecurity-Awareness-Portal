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
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Search,
  Clock,
  Users,
  PlayCircle,
  CheckCircle,
  Star,
  Filter,
  Trophy,
  Target,
  Shield,
  Lock,
} from "lucide-react";
import { coursesData, CourseData } from "@/lib/coursesData";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Learning() {
  const { user, isEnrolledInCourse } = useAuth();
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null,
  );

  useEffect(() => {
    // Load all courses
    setCourses(coursesData);
    setFilteredCourses(coursesData);
  }, []);

  useEffect(() => {
    // Filter courses based on search and filters
    let filtered = courses;

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory,
      );
    }

    if (selectedDifficulty) {
      filtered = filtered.filter(
        (course) => course.difficulty === selectedDifficulty,
      );
    }

    setFilteredCourses(filtered);
  }, [courses, searchQuery, selectedCategory, selectedDifficulty]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "success";
      case "Intermediate":
        return "warning";
      case "Advanced":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const enrolledCourses = user?.enrolledCourses
    ? courses.filter((course) => user.enrolledCourses.includes(course.id))
    : [];
  const availableCourses = filteredCourses;

  // Calculate real-time stats
  const totalCourses = courses.length;
  const totalStudents = courses.reduce(
    (sum, course) => sum + course.students,
    0,
  );
  const averageRating =
    courses.length > 0
      ? (
          courses.reduce((sum, course) => sum + course.rating, 0) /
          courses.length
        ).toFixed(1)
      : "0.0";

  // Calculate completion rate based on enrolled users (mock calculation)
  const completionRate =
    user?.enrolledCourses?.length > 0
      ? Math.min(95, Math.round(enrolledCourses.length * 15 + 65)) // Dynamic but realistic
      : 95; // Default for users with no enrollments

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-primary/10 text-primary border-primary/20 mb-4">
            <BookOpen className="mr-2 h-4 w-4" />
            Cybersecurity Learning Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Master Cybersecurity Skills
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advance your cybersecurity expertise with comprehensive courses
            designed by industry experts
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalCourses}</div>
              <p className="text-sm text-muted-foreground">Courses</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {(totalStudents / 1000).toFixed(0)}K+
              </div>
              <p className="text-sm text-muted-foreground">Students</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Trophy className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold">{completionRate}%</div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{averageRating}</div>
              <p className="text-sm text-muted-foreground">Avg. Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* My Learning Section */}
        {enrolledCourses.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">My Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card
                  key={course.id}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant={getDifficultyColor(course.difficulty) as any}
                      >
                        {course.difficulty}
                      </Badge>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Progress: {course.progress}%</span>
                        <span>{course.duration}</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <Button className="w-full group/btn" asChild>
                        <Link to={`/learning/${course.id}`}>
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Continue Learning
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedDifficulty ? "outline" : "default"}
                size="sm"
                onClick={() => setSelectedDifficulty(null)}
              >
                <Filter className="mr-2 h-4 w-4" />
                All Levels
              </Button>
              <Button
                variant={
                  selectedDifficulty === "Beginner" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedDifficulty("Beginner")}
              >
                Beginner
              </Button>
              <Button
                variant={
                  selectedDifficulty === "Intermediate" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedDifficulty("Intermediate")}
              >
                Intermediate
              </Button>
              <Button
                variant={
                  selectedDifficulty === "Advanced" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedDifficulty("Advanced")}
              >
                Advanced
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory ? "outline" : "default"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {[...new Set(courses.map((c) => c.category))]
              .slice(0, 8)
              .map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
          </div>

          {/* Results count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredCourses.length} of {courses.length} courses
          </div>
        </div>

        {/* Available Courses */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course) => (
              <Card
                key={course.id}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant={getDifficultyColor(course.difficulty) as any}
                    >
                      {course.difficulty}
                    </Badge>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>By {course.instructor}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-warning mr-1" />
                        {course.rating}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{course.lessons} lessons</span>
                      <span className="font-medium text-foreground">Free</span>
                    </div>

                    {isEnrolledInCourse(course.id) ? (
                      <Button className="w-full group/btn" asChild>
                        <Link to={`/learning/${course.id}/enrolled`}>
                          Continue Learning
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        className="w-full group/btn"
                        variant="outline"
                        asChild
                      >
                        <Link to={`/learning/${course.id}`}>Enroll Now</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Paths */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">
            Recommended Learning Paths
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/20">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mr-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    Endpoint Security Professional Training
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced endpoint protection strategies
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Master endpoint security with comprehensive training in threat
                detection, device management, and advanced protection
                techniques.
              </p>
              <Button className="w-full" asChild>
                <Link to="/learning/course-13">Start Learning</Link>
              </Button>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-success/10 to-green-600/10 border-success/20">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success/20 mr-4">
                  <Lock className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    Cloud Security Architecture
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Secure cloud infrastructure design
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Learn to design and implement secure cloud architectures with
                hands-on experience in major cloud platforms.
              </p>
              <Button className="w-full" variant="outline" asChild>
                <Link to="/learning/cloud-security">Start Learning</Link>
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
