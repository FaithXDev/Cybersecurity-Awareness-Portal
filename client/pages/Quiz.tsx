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
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  HelpCircle,
  Trophy,
  Clock,
  Target,
  Brain,
  CheckCircle,
  XCircle,
  RotateCcw,
  Play,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  quizzesData,
  QuizData,
  generateQuizQuestionsOnDemand,
} from "@/lib/quizzesData";

export default function Quiz() {
  const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

  useEffect(() => {
    // Load all quizzes
    setQuizzes(quizzesData);
    setFilteredQuizzes(quizzesData);
  }, []);

  useEffect(() => {
    // Filter quizzes based on search and category
    let filtered = quizzes;

    if (searchQuery) {
      filtered = filtered.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quiz.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((quiz) => quiz.category === selectedCategory);
    }

    setFilteredQuizzes(filtered);
  }, [quizzes, searchQuery, selectedCategory]);

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

  const startQuiz = async (quizId: string) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) return;

    setIsLoadingQuiz(true);

    try {
      // For generated quizzes (quiz-6 onwards), try to get AI-generated questions
      let finalQuiz = quiz;
      if (quizId.startsWith("quiz-") && parseInt(quizId.split("-")[1]) >= 6) {
        const aiQuiz = await generateQuizQuestionsOnDemand(quizId);
        if (aiQuiz) {
          finalQuiz = aiQuiz;
          // Update the quiz in the local state
          setQuizzes((prev) => prev.map((q) => (q.id === quizId ? aiQuiz : q)));
          setFilteredQuizzes((prev) =>
            prev.map((q) => (q.id === quizId ? aiQuiz : q)),
          );
        }
      }

      setCurrentQuiz(finalQuiz);
      setCurrentQuestion(0);
      setUserAnswers([]);
      setShowResults(false);
      setQuizCompleted(false);
      setSelectedAnswer("");
    } catch (error) {
      console.error("Error starting quiz:", error);
      // Fallback to original quiz
      setCurrentQuiz(quiz);
      setCurrentQuestion(0);
      setUserAnswers([]);
      setShowResults(false);
      setQuizCompleted(false);
      setSelectedAnswer("");
    } finally {
      setIsLoadingQuiz(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!currentQuiz) return;

    const answerIndex = parseInt(selectedAnswer);
    const newAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newAnswers);

    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    if (!currentQuiz) return 0;

    let correct = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === currentQuiz.questions[index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / currentQuiz.questions.length) * 100);
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
    setSelectedAnswer("");
  };

  if (currentQuiz && !showResults) {
    const question = currentQuiz.questions[currentQuestion];
    const progress =
      ((currentQuestion + 1) / currentQuiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8 max-w-4xl">
          {/* Quiz Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Cybersecurity Quiz</h1>
              <Button variant="outline" onClick={resetQuiz}>
                Exit Quiz
              </Button>
            </div>
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {currentQuiz.questions.length}
            </p>
          </div>

          {/* Question Card */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">{currentQuiz.category}</Badge>
                <Badge variant={getDifficultyColor(question.difficulty) as any}>
                  {question.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswer}
                onValueChange={handleAnswerSelect}
              >
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50"
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === ""}
                className="w-full mt-6"
                size="lg"
              >
                {currentQuestion === currentQuiz.questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (showResults && currentQuiz) {
    const score = calculateScore();
    const correct = userAnswers.filter(
      (answer, index) => answer === currentQuiz.questions[index].correctAnswer,
    ).length;

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8 max-w-4xl">
          {/* Results Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
            <p className="text-muted-foreground">Here are your results</p>
          </div>

          {/* Score Card */}
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <div className="text-6xl font-bold text-primary mb-2">
                {score}%
              </div>
              <p className="text-xl text-muted-foreground mb-4">
                {correct} out of {currentQuiz.questions.length} correct
              </p>
              <Badge
                variant={
                  score >= 80
                    ? "default"
                    : score >= 60
                      ? "secondary"
                      : "destructive"
                }
                className="text-lg px-4 py-2"
              >
                {score >= 80
                  ? "Excellent"
                  : score >= 60
                    ? "Good"
                    : "Needs Improvement"}
              </Badge>
            </CardContent>
          </Card>

          {/* Question Review */}
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold">Question Review</h2>
            {currentQuiz.questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <Card key={question.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg flex items-center">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-success mr-2" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive mr-2" />
                        )}
                        Question {index + 1}
                      </CardTitle>
                      <Badge variant={isCorrect ? "default" : "destructive"}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </Badge>
                    </div>
                    <p className="text-base">{question.question}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm">
                        <span className="font-medium">Your answer:</span>{" "}
                        {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm">
                          <span className="font-medium">Correct answer:</span>{" "}
                          {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">
                        {question.explanation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={resetQuiz} variant="outline" size="lg">
              <RotateCcw className="mr-2 h-4 w-4" />
              Take Another Quiz
            </Button>
            <Button size="lg">View Learning Resources</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-primary/10 text-primary border-primary/20 mb-4">
            <HelpCircle className="mr-2 h-4 w-4" />
            Cybersecurity Assessment
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Test Your Security Knowledge
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Challenge yourself with interactive cybersecurity quizzes designed
            to test and improve your security awareness
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-6">
              <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {quizzes.reduce(
                  (total, quiz) => total + quiz.questions.length,
                  0,
                )}
              </div>
              <p className="text-sm text-muted-foreground">Questions</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Target className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold">85%</div>
              <p className="text-sm text-muted-foreground">Avg. Score</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Trophy className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold">5K+</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quizzes..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
            {[...new Set(quizzes.map((q) => q.category))]
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
            Showing {filteredQuizzes.length} of {quizzes.length} quizzes
          </div>
        </div>

        {/* Quiz Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {filteredQuizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={getDifficultyColor(quiz.difficulty) as any}>
                    {quiz.difficulty}
                  </Badge>
                  <Badge variant="outline">{quiz.category}</Badge>
                </div>
                <CardTitle className="text-xl">{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    {quiz.questions.length} questions
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {quiz.timeLimit} minutes
                  </div>
                </div>
                <Button
                  onClick={() => startQuiz(quiz.id)}
                  className="w-full group/btn"
                  disabled={isLoadingQuiz}
                >
                  <Play className="mr-2 h-4 w-4" />
                  {isLoadingQuiz ? "Generating Questions..." : "Start Quiz"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="text-center mt-16">
          <Card className="inline-block p-8 bg-muted/50">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              More Quizzes Coming Soon
            </h3>
            <p className="text-muted-foreground max-w-md">
              We're developing advanced quizzes covering incident response,
              compliance, and hands-on security scenarios.
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
