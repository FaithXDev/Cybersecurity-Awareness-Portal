const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

class GeminiAIService {
  private apiKey: string;
  private conversationHistory: ChatMessage[] = [];

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private getSystemPrompt(): string {
    return `You are CyberSafe AI, the most advanced cybersecurity expert assistant. You have comprehensive knowledge of ALL cybersecurity topics and can answer ANY question accurately and helpfully.

YOUR CAPABILITIES:
- Expert knowledge in ALL cybersecurity domains
- Current understanding of latest threats and technologies
- Practical, actionable advice for any security scenario
- Clear explanations for technical and non-technical users
- Step-by-step guidance for implementation
- Industry best practices and standards knowledge

RESPONSE STYLE:
- Always provide accurate, complete answers
- Be helpful and informative regardless of question complexity
- Use clear, professional language
- Include practical examples when relevant
- Offer specific recommendations and next steps
- Structure responses with clear sections when needed

KNOWLEDGE AREAS (you are expert in ALL of these):
- Network Security, Web Security, Mobile Security, Cloud Security
- Threat Intelligence, Malware Analysis, Penetration Testing
- Risk Management, Compliance, Governance
- Incident Response, Digital Forensics, Security Operations
- Cryptography, Identity Management, Security Architecture
- IoT Security, Industrial Control Systems, AI Security
- Security Awareness, Training, Policy Development
- All security tools, frameworks, and methodologies
- Current threat landscape and emerging technologies

Answer every question completely and accurately. If someone asks about cybersecurity topics, provide expert-level guidance. You are the definitive cybersecurity knowledge source.`;
  }

  async sendMessage(userMessage: string): Promise<string> {
    try {
      // Create a focused prompt for better responses
      const contextualPrompt = `${this.getSystemPrompt()}

User Question: ${userMessage}

Provide a comprehensive, accurate, and helpful response:`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: contextualPrompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      };

      const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        console.error(`Gemini API error ${response.status}:`, errorText);

        // Try alternative model if 404 error
        if (response.status === 404) {
          return await this.tryAlternativeModel(userMessage, contextualPrompt);
        }

        // Fallback response for other API errors
        return this.getFallbackResponse(userMessage);
      }

      const data: GeminiResponse = await response.json();

      if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
        console.error("Invalid Gemini response structure:", data);
        return this.getFallbackResponse(userMessage);
      }

      const aiResponse = data.candidates[0].content.parts[0].text;

      // Add messages to conversation history
      this.addToHistory("user", userMessage);
      this.addToHistory("assistant", aiResponse);

      return aiResponse;
    } catch (error) {
      console.error("Gemini API error:", error);
      return this.getFallbackResponse(userMessage);
    }
  }

  private async tryAlternativeModel(
    userMessage: string,
    contextualPrompt: string,
  ): Promise<string> {
    const alternativeModels = [
      "gemini-1.5-pro",
      "gemini-pro",
      "gemini-1.0-pro",
    ];

    for (const model of alternativeModels) {
      try {
        const alternativeUrl = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent`;

        const requestBody = {
          contents: [
            {
              parts: [
                {
                  text: contextualPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        };

        const response = await fetch(`${alternativeUrl}?key=${this.apiKey}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const data: GeminiResponse = await response.json();
          if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            this.addToHistory("user", userMessage);
            this.addToHistory("assistant", aiResponse);
            return aiResponse;
          }
        }
      } catch (error) {
        console.error(`Failed with model ${model}:`, error);
        continue;
      }
    }

    // If all models fail, return fallback
    return this.getFallbackResponse(userMessage);
  }

  private getFallbackResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    // Cybersecurity-specific fallback responses
    if (lowerMessage.includes("phishing")) {
      return `🎣 **Phishing Protection Guide**

Phishing attacks are one of the most common cyber threats. Here's how to protect yourself:

• **Verify sender identity** - Check email addresses carefully for typos or suspicious domains
• **Don't click suspicious links** - Hover over links to see the actual destination
• **Enable two-factor authentication** - This adds an extra layer of security
• **Keep software updated** - Install security patches promptly
• **Report phishing attempts** - Forward suspicious emails to your IT team

**Red flags to watch for:**
- Urgent language demanding immediate action
- Requests for personal information via email
- Generic greetings like "Dear Customer"
- Poor spelling and grammar

Stay vigilant and when in doubt, verify through a separate communication channel!`;
    }

    if (lowerMessage.includes("password")) {
      return `🔐 **Password Security Best Practices**

Strong passwords are your first line of defense:

**Password Requirements:**
• At least 12 characters long
• Mix of uppercase, lowercase, numbers, and symbols
• Unique for each account
• Avoid personal information

**Best Practices:**
• Use a password manager
• Enable two-factor authentication
• Change passwords if breached
• Use passphrases for easier memorization

**Example of a strong password:**
- Weak: password123
- Strong: MyDog&2Cats#LiveIn1House!

Remember: A password manager can generate and store complex passwords for all your accounts!`;
    }

    if (lowerMessage.includes("malware") || lowerMessage.includes("virus")) {
      return `🦠 **Malware Protection Guide**

Malware (malicious software) includes viruses, ransomware, and spyware:

**Prevention Steps:**
• Keep antivirus software updated
• Don't download from untrusted sources
• Be cautious with email attachments
• Regular system backups
• Use reputable app stores only

**Types of Malware:**
- **Viruses**: Replicate and spread to other files
- **Ransomware**: Encrypts files for ransom
- **Spyware**: Secretly monitors your activity
- **Trojans**: Disguised as legitimate software

**If infected:**
1. Disconnect from internet
2. Run antivirus scan
3. Restore from clean backup
4. Change all passwords
5. Monitor accounts for suspicious activity`;
    }

    if (lowerMessage.includes("network") || lowerMessage.includes("wifi")) {
      return `📶 **Network Security Essentials**

Secure your network connections:

**WiFi Security:**
• Use WPA3 encryption (or WPA2 if WPA3 unavailable)
• Change default router passwords
• Hide network name (SSID) if possible
• Regular firmware updates
• Guest network for visitors

**Public WiFi Safety:**
• Avoid sensitive activities
• Use VPN when possible
• Verify network names with staff
• Turn off auto-connect features
• Enable firewall protection

**Home Network Tips:**
- Change default admin credentials
- Disable WPS (WiFi Protected Setup)
- Use strong WiFi passwords
- Monitor connected devices regularly`;
    }

    // Generic cybersecurity response
    return `🛡️ **Cybersecurity Guidance**

I understand you're asking about: "${userMessage}"

While I'm experiencing some technical difficulties with my advanced AI capabilities, I can share these general cybersecurity principles:

**Core Security Principles:**
• **Defense in Depth** - Use multiple layers of security
• **Least Privilege** - Grant minimum necessary access
• **Regular Updates** - Keep all software current
• **Backup Strategy** - 3-2-1 backup rule (3 copies, 2 different media, 1 offsite)

**Immediate Actions:**
• Enable two-factor authentication
• Use strong, unique passwords
• Keep software updated
• Be cautious with email links/attachments
• Regular security training

For specific cybersecurity questions, I recommend:
- Consulting official security resources (NIST, CISA)
- Checking our Learning Center for detailed courses
- Reviewing our Threat Intelligence section

The AI assistant will be back to full functionality shortly. Thank you for your patience!`;
  }

  private addToHistory(role: "user" | "assistant", content: string): void {
    const message: ChatMessage = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };

    this.conversationHistory.push(message);

    // Keep only last 10 messages to manage context length
    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10);
    }
  }

  getConversationHistory(): ChatMessage[] {
    return [...this.conversationHistory];
  }

  clearHistory(): void {
    this.conversationHistory = [];
  }

  async generateQuizQuestions(
    category: string,
    difficulty: string,
    numberOfQuestions: number,
    retryCount = 0,
  ): Promise<QuizQuestion[]> {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000; // 2 seconds

    try {
      const prompt = `Generate exactly ${numberOfQuestions} cybersecurity quiz questions for the category "${category}" with difficulty level "${difficulty}".

REQUIREMENTS:
- Each question must be about ${category.toLowerCase()} in cybersecurity
- Difficulty level: ${difficulty}
- Format: Multiple choice with 4 options each
- Include detailed explanations for correct answers
- Questions should be practical and relevant to real-world scenarios

RESPONSE FORMAT (JSON):
{
  "questions": [
    {
      "id": 1,
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Detailed explanation of why this answer is correct",
      "difficulty": "${difficulty}"
    }
  ]
}

Generate ${numberOfQuestions} questions following this exact JSON format. Make sure questions are diverse, practical, and test real cybersecurity knowledge.`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      };

      const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 429) {
        // Rate limit hit
        if (retryCount < MAX_RETRIES) {
          console.log(
            `Rate limit hit, retrying in ${RETRY_DELAY}ms... (attempt ${retryCount + 1}/${MAX_RETRIES})`,
          );
          await new Promise((resolve) =>
            setTimeout(resolve, RETRY_DELAY * (retryCount + 1)),
          );
          return this.generateQuizQuestions(
            category,
            difficulty,
            numberOfQuestions,
            retryCount + 1,
          );
        } else {
          console.error("Rate limit exceeded, max retries reached");
          return this.getFallbackQuestions(
            category,
            difficulty,
            numberOfQuestions,
          );
        }
      }

      if (!response.ok) {
        console.error(`Gemini API error ${response.status}`);
        return this.getFallbackQuestions(
          category,
          difficulty,
          numberOfQuestions,
        );
      }

      const data: GeminiResponse = await response.json();

      if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
        console.error("Invalid Gemini response structure:", data);
        return this.getFallbackQuestions(
          category,
          difficulty,
          numberOfQuestions,
        );
      }

      const responseText = data.candidates[0].content.parts[0].text;

      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("No JSON found in response");
        return this.getFallbackQuestions(
          category,
          difficulty,
          numberOfQuestions,
        );
      }

      const parsedResponse = JSON.parse(jsonMatch[0]);

      if (
        !parsedResponse.questions ||
        !Array.isArray(parsedResponse.questions)
      ) {
        console.error("Invalid questions format in response");
        return this.getFallbackQuestions(
          category,
          difficulty,
          numberOfQuestions,
        );
      }

      return parsedResponse.questions.slice(0, numberOfQuestions);
    } catch (error) {
      console.error("Error generating quiz questions:", error);

      if (retryCount < MAX_RETRIES) {
        console.log(
          `Retrying due to error... (attempt ${retryCount + 1}/${MAX_RETRIES})`,
        );
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_DELAY * (retryCount + 1)),
        );
        return this.generateQuizQuestions(
          category,
          difficulty,
          numberOfQuestions,
          retryCount + 1,
        );
      }

      return this.getFallbackQuestions(category, difficulty, numberOfQuestions);
    }
  }

  private getFallbackQuestions(
    category: string,
    difficulty: string,
    numberOfQuestions: number,
  ): QuizQuestion[] {
    const questions: QuizQuestion[] = [];

    for (let i = 1; i <= numberOfQuestions; i++) {
      questions.push({
        id: i,
        question: `What is the primary goal of ${category.toLowerCase()}?`,
        options: [
          "To increase system performance",
          "To protect against security threats",
          "To reduce operational costs",
          "To improve user experience",
        ],
        correctAnswer: 1,
        explanation: `The primary goal of ${category.toLowerCase()} is to protect systems and data from security threats.`,
        difficulty: difficulty as "Easy" | "Medium" | "Hard",
      });
    }

    return questions;
  }

  // Predefined quick responses for common cybersecurity topics
  getQuickResponses(): { question: string; icon: string }[] {
    return [
      { question: "What is two-factor authentication?", icon: "🔐" },
      { question: "How to identify phishing emails?", icon: "🎣" },
      { question: "Best practices for password security", icon: "🔑" },
      { question: "What is ransomware and how to prevent it?", icon: "🛡️" },
      { question: "How to secure my home Wi-Fi network?", icon: "📶" },
      { question: "What are the latest cybersecurity threats?", icon: "⚠️" },
      { question: "How to create a secure backup strategy?", icon: "💾" },
      { question: "What is zero trust security?", icon: "🎯" },
    ];
  }
}

// Create and export the service instance
export const geminiAI = new GeminiAIService(GEMINI_API_KEY);
export default geminiAI;
