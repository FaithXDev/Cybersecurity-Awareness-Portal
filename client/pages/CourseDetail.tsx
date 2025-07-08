import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  CheckCircle,
  PlayCircle,
  Award,
  ArrowLeft,
  Target,
} from "lucide-react";
import { getCourseById } from "@/lib/coursesData";

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { enrollInCourse, isEnrolledInCourse } = useAuth();
  const course = courseId ? getCourseById(courseId) : null;
  const isEnrolled = courseId ? isEnrolledInCourse(courseId) : false;

  const handleEnrollment = () => {
    if (courseId) {
      enrollInCourse(courseId);
      // Navigate to the enrolled course page
      setTimeout(() => {
        navigate(`/learning/${courseId}/enrolled`);
      }, 1000);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The course you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/learning">Back to Learning Center</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/learning" className="hover:text-foreground">
            Learning Center
          </Link>
          <span>/</span>
          <span>{course.category}</span>
          <span>/</span>
          <span className="text-foreground">{course.title}</span>
        </div>

        {/* Back Button */}
        <Button variant="outline" size="sm" className="mb-6" asChild>
          <Link to="/learning">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Badge variant={getDifficultyColor(course.difficulty) as any}>
                  {course.difficulty}
                </Badge>
                <Badge variant="outline">{course.category}</Badge>
                {course.certification && (
                  <Badge variant="secondary">
                    <Award className="h-3 w-3 mr-1" />
                    Certification Available
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">
                {course.description}
              </p>

              {/* Enrollment Button */}
              <div className="mb-8">
                {isEnrolled ? (
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant="default"
                      className="px-4 py-2 bg-success text-success-foreground"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Enrolled Successfully!
                    </Badge>
                    <Button asChild>
                      <Link to={`/learning/${courseId}/enrolled`}>
                        Continue Learning
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <Button size="lg" onClick={handleEnrollment} className="px-8">
                    <PlayCircle className="h-5 w-5 mr-2" />
                    Enroll Now - Start Learning
                  </Button>
                )}
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{course.duration}</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">2.4k</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Star className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-muted-foreground">Modules</div>
                </div>
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-relaxed mb-4">
                      {course.description}
                    </p>
                    <p className="text-muted-foreground">
                      This comprehensive course covers all aspects of{" "}
                      {course.category.toLowerCase()} with hands-on exercises,
                      real-world scenarios, and expert guidance. You'll learn
                      from industry professionals and gain practical skills that
                      you can apply immediately in your cybersecurity career.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Curriculum Tab */}
              <TabsContent value="curriculum" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Curriculum</CardTitle>
                    <CardDescription>
                      Detailed breakdown of course modules and lessons
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {course.syllabus ? (
                      <div className="space-y-6">
                        {course.syllabus.map((module, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-2">
                              Module {index + 1}: {module.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              {module.description}
                            </p>
                            <ul className="space-y-1">
                              {module.topics.map((topic, topicIndex) => (
                                <li
                                  key={topicIndex}
                                  className="text-sm flex items-center space-x-2"
                                >
                                  <BookOpen className="h-3 w-3 text-primary" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold mb-2">
                            Module 1: Introduction and Fundamentals
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Get started with the basics of {course.category}
                          </p>
                          <ul className="space-y-1">
                            <li className="text-sm flex items-center space-x-2">
                              <BookOpen className="h-3 w-3 text-primary" />
                              <span>Course overview and objectives</span>
                            </li>
                            <li className="text-sm flex items-center space-x-2">
                              <BookOpen className="h-3 w-3 text-primary" />
                              <span>Key concepts and terminology</span>
                            </li>
                            <li className="text-sm flex items-center space-x-2">
                              <BookOpen className="h-3 w-3 text-primary" />
                              <span>Current threat landscape</span>
                            </li>
                          </ul>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold mb-2">
                            Module 2: Threat Analysis
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Learn to identify and analyze security threats
                          </p>
                          <ul className="space-y-1">
                            <li className="text-sm flex items-center space-x-2">
                              <BookOpen className="h-3 w-3 text-primary" />
                              <span>Common attack vectors</span>
                            </li>
                            <li className="text-sm flex items-center space-x-2">
                              <BookOpen className="h-3 w-3 text-primary" />
                              <span>Indicators of compromise</span>
                            </li>
                            <li className="text-sm flex items-center space-x-2">
                              <BookOpen className="h-3 w-3 text-primary" />
                              <span>Threat hunting techniques</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Instructor Tab */}
              <TabsContent value="instructor">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">
                          {course.instructor?.charAt(0) || "CS"}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">
                          {course.instructor || "Cybersecurity Expert"}
                        </h4>
                        <p className="text-muted-foreground mb-3">
                          Senior Security Consultant & Trainer
                        </p>
                        <p className="text-sm">
                          Industry expert with over 15 years of experience in
                          cybersecurity. Certified in multiple security
                          frameworks and has trained thousands of professionals
                          worldwide.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                    <CardDescription>
                      What our students say about this course
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="font-semibold">Sarah Johnson</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Excellent course with practical examples and hands-on
                        exercises. The instructor explains complex concepts in
                        an easy-to-understand manner."
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="font-semibold">Michael Chen</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Great course content and real-world scenarios. Helped
                        me advance my career in cybersecurity significantly."
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Duration:</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Difficulty:</span>
                  <Badge variant={getDifficultyColor(course.difficulty) as any}>
                    {course.difficulty}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Category:</span>
                  <span>{course.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Students:</span>
                  <span>2,437</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Objectives */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.objectives?.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                      <span className="text-sm">{objective}</span>
                    </li>
                  )) || (
                    <>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Understand core {course.category.toLowerCase()}{" "}
                          concepts
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Learn threat detection and prevention techniques
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Implement security best practices
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Develop incident response capabilities
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
