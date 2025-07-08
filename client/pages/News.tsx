import { useState, useEffect } from "react";
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
import {
  Newspaper,
  Search,
  Clock,
  ExternalLink,
  AlertTriangle,
  Shield,
  Zap,
  RefreshCw,
  Loader2,
  Filter,
} from "lucide-react";
import { newsService, NewsArticle } from "@/lib/newsService";

export default function News() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const categories = [
    "All",
    "Data Breach",
    "Ransomware",
    "Phishing",
    "Vulnerability",
    "Malware",
    "APT",
    "IoT Security",
    "Cloud Security",
    "Mobile Security",
  ];

  // Load news on component mount
  useEffect(() => {
    loadLatestNews();
  }, []);

  // Filter articles based on search and category
  useEffect(() => {
    let filtered = newsArticles;

    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory,
      );
    }

    setFilteredArticles(filtered);
  }, [newsArticles, searchQuery, selectedCategory]);

  const loadLatestNews = async () => {
    try {
      setIsLoading(true);
      const articles = await newsService.fetchLatestCyberSecurityNews();

      // Add overviews to all articles
      const articlesWithOverviews = articles.map((article) => ({
        ...article,
        overview: newsService.getFallbackOverview(article),
      }));

      setNewsArticles(articlesWithOverviews);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to load news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      // Clear existing articles immediately to show refresh is working
      setNewsArticles([]);
      setFilteredArticles([]);

      // Force fresh content generation
      const articles = await newsService.fetchLatestCyberSecurityNews();

      // Add overviews to all articles
      const articlesWithOverviews = articles.map((article) => ({
        ...article,
        overview: newsService.getFallbackOverview(article),
      }));

      setNewsArticles(articlesWithOverviews);
      setLastUpdated(new Date());

      console.log(
        "News refreshed successfully with",
        articlesWithOverviews.length,
        "new articles",
      );
    } catch (error) {
      console.error("Failed to refresh news:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === "All" ? null : category);
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

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Critical":
        return AlertTriangle;
      case "High":
        return Zap;
      default:
        return Shield;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-primary/10 text-primary border-primary/20 mb-4">
            <Newspaper className="mr-2 h-4 w-4" />
            Cybersecurity News Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Latest Security News
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with real-time cybersecurity news, threat
            intelligence, and security updates from trusted sources worldwide
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Search and Refresh */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cybersecurity news..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                size="sm"
                variant="outline"
              >
                {isRefreshing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Refresh News
              </Button>
              <Badge variant="outline" className="px-3 py-1">
                <Clock className="h-3 w-3 mr-1" />
                {lastUpdated
                  ? `Updated ${lastUpdated.toLocaleTimeString()}`
                  : "Loading..."}
              </Badge>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={
                  (category === "All" && !selectedCategory) ||
                  category === selectedCategory
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {filteredArticles.length} of {newsArticles.length}{" "}
              articles
            </span>
            <span>
              {filteredArticles.length > 0 && (
                <>
                  Latest:{" "}
                  {new Date(filteredArticles[0]?.publishedAt).toLocaleString()}
                </>
              )}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-6 w-20 bg-muted rounded" />
                    <div className="h-6 w-24 bg-muted rounded" />
                  </div>
                  <div className="h-6 w-3/4 bg-muted rounded mb-2" />
                  <div className="h-4 w-full bg-muted rounded mb-1" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-8 w-full bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* News Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {filteredArticles.map((article) => {
              const SeverityIcon = getSeverityIcon(article.severity);

              return (
                <Card
                  key={article.id}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge
                        variant={getSeverityColor(article.severity) as any}
                        className="mb-2"
                      >
                        <SeverityIcon className="h-3 w-3 mr-1" />
                        {article.severity}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                    </div>

                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>

                    <CardDescription className="text-base leading-relaxed">
                      {article.summary}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(article.publishedAt).toLocaleString()}
                      </div>
                      <span>{article.source}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{article.views.toLocaleString()} views</span>
                    </div>

                    {/* Security Overview Section */}
                    <div className="border-t pt-4">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          <Shield className="h-4 w-4 text-primary mr-2" />
                          <span className="text-sm font-medium text-primary">
                            Security Overview
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {article.overview}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all categories.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        <div className="text-center">
          <Button size="lg" variant="outline">
            Load More Articles
          </Button>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-16 text-center">
          <Card className="inline-block p-8 bg-muted/50">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4">
              <Newspaper className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Real-time News Feed Coming Soon
            </h3>
            <p className="text-muted-foreground max-w-md">
              We're working on integrating live news feeds from major
              cybersecurity sources with AI-powered analysis and personalized
              recommendations.
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
