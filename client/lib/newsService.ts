const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  overview?: string; // AI-generated overview
  category: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  source: string;
  url: string;
  imageUrl?: string;
  publishedAt: string;
  views: number;
}

class NewsService {
  private apiKey: string;
  private requestQueue: Array<() => Promise<any>> = [];
  private isProcessingQueue = false;
  private lastRequestTime = 0;
  private readonly MIN_REQUEST_DELAY = 10000; // 10 seconds between requests
  private quotaExhausted = false;
  private quotaExhaustedUntil = 0;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public isQuotaExhausted(): boolean {
    if (this.quotaExhausted && Date.now() < this.quotaExhaustedUntil) {
      return true;
    } else if (this.quotaExhausted && Date.now() >= this.quotaExhaustedUntil) {
      // Reset quota status after cooldown period
      this.quotaExhausted = false;
      this.quotaExhaustedUntil = 0;
    }
    return false;
  }

  private markQuotaExhausted() {
    this.quotaExhausted = true;
    // Set cooldown for 1 hour
    this.quotaExhaustedUntil = Date.now() + 60 * 60 * 1000;
    console.log("API quota exhausted, disabling AI features for 1 hour");
  }

  private async queueRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push(async () => {
        try {
          const result = await requestFn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.isProcessingQueue || this.requestQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;

    while (this.requestQueue.length > 0) {
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;

      if (timeSinceLastRequest < this.MIN_REQUEST_DELAY) {
        await new Promise((resolve) =>
          setTimeout(resolve, this.MIN_REQUEST_DELAY - timeSinceLastRequest),
        );
      }

      const request = this.requestQueue.shift();
      if (request) {
        try {
          await request();
        } catch (error) {
          console.error("Queue request failed:", error);
        }
        this.lastRequestTime = Date.now();
      }
    }

    this.isProcessingQueue = false;
  }

  async fetchLatestCyberSecurityNews(): Promise<NewsArticle[]> {
    // If quota is exhausted, return fallback content immediately
    if (this.isQuotaExhausted()) {
      console.log("Quota exhausted, returning fallback news content");
      return this.getFallbackNews();
    }

    try {
      // Force fresh content with unique timestamp and seed
      const timestamp = Date.now();
      const randomSeed = Math.random().toString(36).substring(2, 15);
      const uniqueId = `${timestamp}_${randomSeed}_${Math.floor(Math.random() * 10000)}`;

      const prompt = `Generate exactly 14 cybersecurity news articles. Return ONLY a valid JSON array with no additional text, markdown, or formatting.

Format: [{"title":"Article title","summary":"Brief summary","content":"Detailed content","category":"Data Breach","severity":"High","source":"Security News","url":"https://example.com/news","publishedAt":"${new Date().toISOString()}","views":1500}]

Categories: Data Breach, Ransomware, Phishing, Vulnerability, Malware, APT, IoT Security, Cloud Security, Mobile Security
Severities: Critical, High, Medium, Low

Session: ${uniqueId}`;

      const requestBody = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          topK: 20,
          topP: 0.9,
          maxOutputTokens: 2048,
        },
      };

      const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 429) {
        this.markQuotaExhausted();
        console.log("Quota exhausted, falling back to offline news content");
        return this.getFallbackNews();
      }

      if (!response.ok) {
        console.error(
          `Gemini API error ${response.status}:`,
          await response.text().catch(() => "Unknown error"),
        );

        // Try alternative model for 404 errors
        if (response.status === 404) {
          const alternativeResult =
            await this.tryAlternativeModelForNews(requestBody);
          if (alternativeResult) return alternativeResult;
        }

        // Return fallback news if API fails
        return this.getFallbackNews();
      }

      const data = await response.json();
      const content = data.candidates[0]?.content?.parts[0]?.text;

      if (!content) {
        console.error("No content received from Gemini API");
        return this.getFallbackNews();
      }

      // Try multiple JSON extraction methods
      let articles;
      try {
        // Method 1: Look for JSON array in response
        const jsonMatch = content.match(/\[[\s\S]*?\]/);
        if (jsonMatch) {
          articles = JSON.parse(jsonMatch[0]);
        } else {
          // Method 2: Try to parse the entire content as JSON
          articles = JSON.parse(content);
        }
      } catch (parseError) {
        console.error("JSON parsing failed:", parseError);
        console.error("Response content:", content);

        // Method 3: Try to clean and extract JSON
        try {
          const cleanedContent = content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

          const jsonMatch = cleanedContent.match(/\[[\s\S]*?\]/);
          if (jsonMatch) {
            articles = JSON.parse(jsonMatch[0]);
          } else {
            throw new Error("No JSON array found in cleaned content");
          }
        } catch (secondParseError) {
          console.error(
            "Second JSON parsing attempt failed:",
            secondParseError,
          );
          return this.getFallbackNews();
        }
      }

      if (!Array.isArray(articles) || articles.length === 0) {
        console.error("Invalid articles format or empty array");
        return this.getFallbackNews();
      }

      // Add unique IDs and format data
      return articles.map((article: any, index: number) => ({
        ...article,
        id: `news-${Date.now()}-${index}`,
        views:
          parseInt(article.views) || Math.floor(Math.random() * 4500) + 500,
        imageUrl: this.generateImageUrl(article.category),
      }));
    } catch (error) {
      console.error("Error fetching news:", error);
      console.error("Falling back to offline news content");
      // Return fallback news if API fails
      return this.getFallbackNews();
    }
  }

  private generateImageUrl(category: string): string {
    const imageMap: { [key: string]: string } = {
      "Data Breach":
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
      Ransomware:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
      Phishing:
        "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400",
      Vulnerability:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
      Malware:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
      APT: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
      "IoT Security":
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
      "Cloud Security":
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
      "Mobile Security":
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
    };

    return (
      imageMap[category] ||
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400"
    );
  }

  private async tryAlternativeModelForNews(
    requestBody: any,
  ): Promise<NewsArticle[] | null> {
    const alternativeModels = [
      "gemini-1.5-pro",
      "gemini-pro",
      "gemini-1.0-pro",
    ];

    for (const model of alternativeModels) {
      try {
        const alternativeUrl = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent`;

        const response = await fetch(`${alternativeUrl}?key=${this.apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.candidates[0]?.content?.parts[0]?.text;

          if (content) {
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
              const articles = JSON.parse(jsonMatch[0]);
              return articles.map((article: any, index: number) => ({
                ...article,
                id: `news-${Date.now()}-${index}`,
                views:
                  parseInt(article.views) ||
                  Math.floor(Math.random() * 4500) + 500,
                imageUrl: this.generateImageUrl(article.category),
              }));
            }
          }
        }
      } catch (error) {
        console.error(`Failed with model ${model}:`, error);
        continue;
      }
    }

    return null;
  }

  private getFallbackNews(): NewsArticle[] {
    const fallbackArticles = [];
    const newsTemplates = [
      {
        category: "Data Breach",
        severity: "Critical",
        title:
          "Major Healthcare Provider Suffers Data Breach Affecting 2.3M Patients",
        summary:
          "Personal health information including social security numbers and medical records were exposed in a sophisticated cyberattack targeting the healthcare giant.",
        content:
          "A leading healthcare provider has disclosed a massive data breach affecting 2.3 million patients after cybercriminals gained unauthorized access to their network systems. The breach, discovered during a routine security audit, exposed sensitive patient information including names, social security numbers, medical record numbers, and treatment details. The company has notified law enforcement and is working with cybersecurity experts to strengthen their defenses. Affected patients are being offered free credit monitoring services.",
      },
      {
        category: "Ransomware",
        severity: "High",
        title:
          "New Ransomware Strain Targets Manufacturing Companies Worldwide",
        summary:
          "Industrial control systems are being encrypted by a sophisticated ransomware group demanding millions in cryptocurrency payments.",
        content:
          "Cybersecurity researchers have identified a new ransomware strain specifically designed to target manufacturing and industrial companies. The malware, dubbed 'IndustryCrypt,' encrypts both IT systems and operational technology networks, potentially shutting down production lines. The attackers are demanding payments ranging from $500,000 to $5 million in Bitcoin. Security experts recommend immediate patching of known vulnerabilities and network segmentation to prevent lateral movement.",
      },
      {
        category: "Phishing",
        severity: "Medium",
        title:
          "AI-Generated Phishing Emails Bypass Traditional Security Filters",
        summary:
          "Sophisticated artificial intelligence is being used to create highly convincing phishing emails that evade detection by standard email security systems.",
        content:
          "Security researchers have discovered a new phishing campaign using AI-generated content that successfully bypasses traditional email filtering systems. The emails are remarkably well-written, personalized, and difficult to distinguish from legitimate communications. The campaign has targeted over 10,000 organizations across various industries, with a success rate 40% higher than traditional phishing attempts. Organizations are advised to implement advanced AI-powered security solutions and enhance user training programs.",
      },
      {
        category: "Vulnerability",
        severity: "Critical",
        title: "Zero-Day Exploit Discovered in Popular VPN Software",
        summary:
          "A critical vulnerability allowing remote code execution has been found in VPN software used by millions of remote workers worldwide.",
        content:
          "Security researchers have disclosed a critical zero-day vulnerability in a widely-used VPN application that could allow attackers to execute arbitrary code on affected systems. The flaw, assigned CVE-2024-XXXX, affects versions of the software installed on over 50 million devices globally. The vulnerability stems from improper input validation in the connection handling process. Users are urged to update to the latest version immediately, and organizations should consider temporarily restricting VPN access until patches are applied.",
      },
      {
        category: "Malware",
        severity: "High",
        title: "Banking Trojan Steals $45M Through Mobile Payment Apps",
        summary:
          "A sophisticated mobile malware campaign has successfully stolen millions from banking customers using fake payment application overlays.",
        content:
          "Cybercriminals have stolen over $45 million from banking customers using a sophisticated mobile malware known as 'MobileDrain.' The malware creates fake overlays on legitimate banking and payment applications, capturing login credentials and transaction details. The campaign has affected users in over 30 countries, with the highest concentration of victims in Europe and North America. Financial institutions are working with law enforcement to track the stolen funds and implement additional mobile security measures.",
      },
    ];

    const sources = [
      "CyberSecurity Today",
      "ThreatWatch",
      "SecurityWeek",
      "InfoSec Daily",
      "Cyber Defense News",
      "ThreatPost",
      "Security Affairs",
      "BleepingComputer",
      "KrebsOnSecurity",
      "The Hacker News",
      "Dark Reading",
      "CSO Online",
      "Cybersecurity Dive",
      "SC Media",
      "Security Boulevard",
    ];

    // Create 14 articles by cycling through templates and adding variety
    for (let i = 1; i <= 14; i++) {
      const template = newsTemplates[(i - 1) % newsTemplates.length];
      const source = sources[(i - 1) % sources.length];
      const hoursAgo = i * 2; // Spread articles over time

      fallbackArticles.push({
        id: `fallback-${i}-${Date.now()}`,
        title: i <= 5 ? template.title : `${template.title} - Update ${i - 5}`,
        summary: template.summary,
        content: template.content,
        category: template.category,
        severity: template.severity,
        source,
        url: `https://example.com/security-news-${i}`,
        imageUrl: this.generateImageUrl(template.category),
        publishedAt: new Date(
          Date.now() - hoursAgo * 60 * 60 * 1000,
        ).toISOString(),
        views: Math.floor(Math.random() * 4500) + 500,
      });
    }

    return fallbackArticles;
  }

  async searchNews(query: string, category?: string): Promise<NewsArticle[]> {
    const prompt = `Generate 8 cybersecurity news articles related to the search query: "${query}"${category ? ` in the category: ${category}` : ""}.

Format as JSON array with same structure as before. Make articles relevant to the search term and current cybersecurity landscape.`;

    try {
      const requestBody = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 3072,
        },
      };

      const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error("Search API error:", response.status);
        return this.getFallbackSearchResults(query);
      }

      const data = await response.json();
      const content = data.candidates[0]?.content?.parts[0]?.text;
      const jsonMatch = content?.match(/\[[\s\S]*\]/);

      if (jsonMatch) {
        const articles = JSON.parse(jsonMatch[0]);
        return articles.map((article: any, index: number) => ({
          ...article,
          id: `search-${Date.now()}-${index}`,
          views: Math.floor(Math.random() * 3000) + 500,
          imageUrl: this.generateImageUrl(article.category),
        }));
      }
    } catch (error) {
      console.error("Search error:", error);
    }

    return this.getFallbackSearchResults(query);
  }

  private getFallbackSearchResults(query: string): NewsArticle[] {
    // Return filtered fallback news based on search query
    const fallback = this.getFallbackNews();
    return fallback
      .filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.summary.toLowerCase().includes(query.toLowerCase()) ||
          article.category.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, 8);
  }

  async getNewsByCategory(category: string): Promise<NewsArticle[]> {
    return this.searchNews(`latest ${category} cybersecurity news`, category);
  }

  async generateOverview(article: NewsArticle): Promise<string> {
    // If quota is exhausted, return fallback immediately
    if (this.isQuotaExhausted()) {
      console.log("Quota exhausted, using fallback overview");
      return this.getFallbackOverview(article);
    }

    // Check if quota is likely exhausted - return fallback immediately
    const recentErrors = this.getRecentErrors();
    if (recentErrors >= 3) {
      console.log("Too many recent API errors, using fallback overview");
      return this.getFallbackOverview(article);
    }

    try {
      return await this.queueRequest(async () => {
        const prompt = `Create a concise, professional overview (2-3 sentences, max 150 words) for this cybersecurity news article:

Title: ${article.title}
Summary: ${article.summary}
Category: ${article.category}
Severity: ${article.severity}

The overview should:
- Highlight the key security implications
- Explain why this matters to cybersecurity professionals
- Use clear, professional language
- Focus on actionable insights

Return only the overview text, no formatting or additional content.`;

        const requestBody = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 200,
          },
        };

        const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        if (response.status === 429) {
          this.markQuotaExhausted();
          this.recordError();
          throw new Error("Rate limit exceeded");
        }

        if (!response.ok) {
          this.recordError();
          console.error("Overview generation API error:", response.status);
          const errorText = await response.text().catch(() => "Unknown error");
          console.error("Overview API Error details:", errorText);
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        const overview = data.candidates[0]?.content?.parts[0]?.text?.trim();

        if (overview && overview.length > 10) {
          return overview;
        } else {
          throw new Error("Invalid response format");
        }
      });
    } catch (error) {
      console.error("Error generating overview:", error);
      return this.getFallbackOverview(article);
    }
  }

  private errorLog: number[] = [];

  private recordError() {
    const now = Date.now();
    this.errorLog.push(now);
    // Keep only errors from last 10 minutes
    this.errorLog = this.errorLog.filter((time) => now - time < 600000);
  }

  private getRecentErrors(): number {
    const now = Date.now();
    // Count errors in last 5 minutes
    return this.errorLog.filter((time) => now - time < 300000).length;
  }

  public getFallbackOverview(article: NewsArticle): string {
    const severityMap = {
      Critical:
        "This critical security incident requires immediate attention and response from security teams.",
      High: "This high-priority security issue should be addressed promptly to prevent potential exploitation.",
      Medium:
        "This security development warrants monitoring and consideration for defensive measures.",
      Low: "This security update provides valuable information for ongoing threat awareness.",
    };

    const categoryInsights = {
      "Data Breach":
        "Organizations should review their data protection strategies and incident response procedures.",
      Ransomware:
        "Enhanced backup strategies and network segmentation are essential defensive measures.",
      Phishing:
        "User awareness training and email security controls should be prioritized.",
      Vulnerability:
        "Patch management and vulnerability assessment programs need immediate review.",
      Malware:
        "Endpoint protection and threat detection capabilities require strengthening.",
      APT: "Advanced threat hunting and network monitoring are crucial for early detection.",
      "IoT Security":
        "Device inventory and security hardening of connected systems are recommended.",
      "Cloud Security":
        "Cloud configuration reviews and access management audits should be conducted.",
      "Mobile Security":
        "Mobile device management and application security policies need evaluation.",
    };

    return `${severityMap[article.severity]} ${categoryInsights[article.category] || "Security professionals should assess their current defensive posture and update security controls accordingly."}`;
  }
}

export const newsService = new NewsService(GEMINI_API_KEY);
export default newsService;
