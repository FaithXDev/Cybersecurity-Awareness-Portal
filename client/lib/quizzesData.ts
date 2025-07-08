export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

import { geminiAI } from "./geminiApi";

export interface QuizData {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questions: QuizQuestion[];
  timeLimit: number; // in minutes
  passingScore: number; // percentage
}

export const quizzesData: QuizData[] = [
  {
    id: "phishing-awareness",
    title: "Phishing Awareness Fundamentals",
    description: "Test your ability to identify and prevent phishing attacks",
    category: "Social Engineering",
    difficulty: "Beginner",
    timeLimit: 15,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question:
          "Which of the following is the most common sign of a phishing email?",
        options: [
          "Professional company logo",
          "Urgent language requesting immediate action",
          "Correct spelling and grammar",
          "Personalized greeting with your full name",
        ],
        correctAnswer: 1,
        explanation:
          "Phishing emails often use urgent language to pressure victims into acting quickly without thinking critically about the request.",
        difficulty: "Easy",
      },
      {
        id: 2,
        question:
          "What should you do if you receive a suspicious email asking for personal information?",
        options: [
          "Reply with the requested information",
          "Click the link to verify it's legitimate",
          "Forward it to your contacts to warn them",
          "Report it as phishing and delete it",
        ],
        correctAnswer: 3,
        explanation:
          "Always report suspicious emails and delete them. Never provide personal information through email links.",
        difficulty: "Easy",
      },
      {
        id: 3,
        question: "Which URL is most likely to be a phishing attempt?",
        options: [
          "https://www.paypal.com/login",
          "https://www.payp4l.com/login",
          "https://paypal.com/signin",
          "https://secure.paypal.com/account",
        ],
        correctAnswer: 1,
        explanation:
          "The second URL uses a '4' instead of 'a' in 'paypal', which is a common phishing technique called typosquatting.",
        difficulty: "Medium",
      },
      {
        id: 4,
        question: "What is spear phishing?",
        options: [
          "A type of fishing with spears",
          "Mass email attacks sent to thousands of people",
          "Targeted attacks on specific individuals or organizations",
          "Attacks that use phone calls instead of emails",
        ],
        correctAnswer: 2,
        explanation:
          "Spear phishing is a targeted form of phishing that focuses on specific individuals or organizations, often using personal information to appear more credible.",
        difficulty: "Medium",
      },
      {
        id: 5,
        question:
          "Which of the following is NOT a red flag for phishing emails?",
        options: [
          "Generic greetings like 'Dear Customer'",
          "Requests for urgent action or threats",
          "Professional email signature with contact information",
          "Suspicious attachments or links",
        ],
        correctAnswer: 2,
        explanation:
          "Professional email signatures with proper contact information are typically legitimate. The other options are common phishing indicators.",
        difficulty: "Easy",
      },
      {
        id: 6,
        question:
          "What is the most effective way to verify if an email from your bank is legitimate?",
        options: [
          "Check the email address carefully",
          "Look for the bank's logo",
          "Call the bank directly using a known phone number",
          "Reply to the email asking for confirmation",
        ],
        correctAnswer: 2,
        explanation:
          "Always verify suspicious communications by contacting the organization directly through known, trusted contact information.",
        difficulty: "Medium",
      },
      {
        id: 7,
        question:
          "What should you do if you accidentally clicked on a phishing link?",
        options: [
          "Immediately close the browser",
          "Disconnect from the internet and scan for malware",
          "Change passwords for accounts that might be compromised",
          "All of the above",
        ],
        correctAnswer: 3,
        explanation:
          "If you click a phishing link, take immediate action: disconnect from internet, scan for malware, and change potentially compromised passwords.",
        difficulty: "Hard",
      },
      {
        id: 8,
        question:
          "Which of these is a characteristic of a sophisticated phishing attack?",
        options: [
          "Poor grammar and spelling",
          "Generic greeting",
          "Convincing company branding and personalized information",
          "Obvious fake email addresses",
        ],
        correctAnswer: 2,
        explanation:
          "Advanced phishing attacks often use legitimate-looking branding and personal information to appear more credible.",
        difficulty: "Hard",
      },
      {
        id: 9,
        question: "What is 'whaling' in the context of cybersecurity?",
        options: [
          "A type of malware that spreads through networks",
          "Phishing attacks targeting high-profile individuals like executives",
          "A method of encrypting sensitive data",
          "A technique for securing wireless networks",
        ],
        correctAnswer: 1,
        explanation:
          "Whaling refers to phishing attacks that specifically target high-value individuals like CEOs, executives, or celebrities.",
        difficulty: "Medium",
      },
      {
        id: 10,
        question:
          "Which technology can help prevent phishing emails from reaching users?",
        options: [
          "Email filtering and anti-phishing solutions",
          "Antivirus software only",
          "Firewall protection",
          "VPN connections",
        ],
        correctAnswer: 0,
        explanation:
          "Email filtering and dedicated anti-phishing solutions are specifically designed to detect and block phishing attempts before they reach users.",
        difficulty: "Medium",
      },
    ],
  },
  {
    id: "password-security",
    title: "Password Security Best Practices",
    description:
      "Evaluate your knowledge of password security and authentication",
    category: "Authentication",
    difficulty: "Beginner",
    timeLimit: 20,
    passingScore: 75,
    questions: [
      {
        id: 1,
        question:
          "What is the minimum recommended length for a strong password?",
        options: [
          "6 characters",
          "8 characters",
          "12 characters",
          "16 characters",
        ],
        correctAnswer: 2,
        explanation:
          "Security experts recommend passwords of at least 12 characters to provide adequate protection against brute force attacks.",
        difficulty: "Easy",
      },
      {
        id: 2,
        question: "Which of the following makes a password most secure?",
        options: [
          "Using your birth date",
          "Combining uppercase, lowercase, numbers, and symbols",
          "Using dictionary words",
          "Making it easy to remember",
        ],
        correctAnswer: 1,
        explanation:
          "A combination of uppercase letters, lowercase letters, numbers, and special symbols creates the most secure password.",
        difficulty: "Easy",
      },
      {
        id: 3,
        question: "What is two-factor authentication (2FA)?",
        options: [
          "Using two different passwords",
          "A security process requiring two different authentication factors",
          "Having two user accounts",
          "Logging in twice",
        ],
        correctAnswer: 1,
        explanation:
          "Two-factor authentication requires two different types of evidence to verify identity, typically something you know (password) and something you have (phone).",
        difficulty: "Medium",
      },
      {
        id: 4,
        question: "How often should you change your passwords?",
        options: [
          "Every day",
          "Only when there's a security breach",
          "Every 30 days",
          "Every 90 days or when compromised",
        ],
        correctAnswer: 3,
        explanation:
          "Current best practice recommends changing passwords every 90 days or immediately if there's evidence of compromise.",
        difficulty: "Medium",
      },
      {
        id: 5,
        question: "What is the biggest risk of password reuse?",
        options: [
          "Passwords become easier to guess",
          "If one account is compromised, all accounts are at risk",
          "It's harder to remember passwords",
          "Passwords expire faster",
        ],
        correctAnswer: 1,
        explanation:
          "Password reuse means that if one account is compromised, attackers can access all other accounts using the same password.",
        difficulty: "Easy",
      },
      {
        id: 6,
        question: "What is a passphrase?",
        options: [
          "A short, complex password",
          "A sequence of words or phrases used as a password",
          "A password hint",
          "A password manager tool",
        ],
        correctAnswer: 1,
        explanation:
          "A passphrase is a sequence of words or phrases that can be longer and easier to remember than traditional passwords while still being secure.",
        difficulty: "Easy",
      },
      {
        id: 7,
        question: "Which of these is the most secure way to store passwords?",
        options: [
          "Write them down on paper",
          "Save them in a browser",
          "Use a reputable password manager",
          "Memorize all of them",
        ],
        correctAnswer: 2,
        explanation:
          "Password managers provide the most secure way to store passwords, using encryption and generating unique passwords for each account.",
        difficulty: "Medium",
      },
      {
        id: 8,
        question:
          "What should you do if you suspect your password has been compromised?",
        options: [
          "Wait to see if anything happens",
          "Change the password immediately",
          "Use the same password on other accounts",
          "Ignore it if you haven't noticed any problems",
        ],
        correctAnswer: 1,
        explanation:
          "If you suspect a password compromise, change it immediately and check for any unauthorized activity on your accounts.",
        difficulty: "Easy",
      },
      {
        id: 9,
        question: "What is credential stuffing?",
        options: [
          "Creating very long passwords",
          "Using stolen credentials to access multiple accounts",
          "Stuffing passwords with special characters",
          "Saving passwords in multiple locations",
        ],
        correctAnswer: 1,
        explanation:
          "Credential stuffing is an attack where stolen username/password combinations are used to attempt access to multiple accounts and services.",
        difficulty: "Hard",
      },
      {
        id: 10,
        question: "Which authentication method is considered most secure?",
        options: [
          "Password only",
          "Two-factor authentication (2FA)",
          "Multi-factor authentication (MFA)",
          "Biometric authentication only",
        ],
        correctAnswer: 2,
        explanation:
          "Multi-factor authentication (MFA) using multiple different types of authentication factors provides the highest level of security.",
        difficulty: "Medium",
      },
    ],
  },
  {
    id: "malware-identification",
    title: "Malware Detection and Prevention",
    description:
      "Learn to identify and handle various types of malware threats",
    category: "Malware",
    difficulty: "Intermediate",
    timeLimit: 25,
    passingScore: 80,
    questions: [
      {
        id: 1,
        question:
          "Which type of malware is designed to encrypt files and demand payment?",
        options: ["Virus", "Worm", "Ransomware", "Trojan"],
        correctAnswer: 2,
        explanation:
          "Ransomware is specifically designed to encrypt victim files and demand payment (ransom) for the decryption key.",
        difficulty: "Easy",
      },
      {
        id: 2,
        question: "What is the primary difference between a virus and a worm?",
        options: [
          "Viruses are more dangerous",
          "Worms can spread without user interaction",
          "Viruses only affect Windows systems",
          "Worms are always visible to users",
        ],
        correctAnswer: 1,
        explanation:
          "Worms can replicate and spread across networks without requiring user interaction, while viruses typically need user action to spread.",
        difficulty: "Medium",
      },
      {
        id: 3,
        question: "What is a Trojan horse in cybersecurity?",
        options: [
          "A large wooden horse used in ancient warfare",
          "Malware that appears legitimate but contains malicious code",
          "A type of antivirus software",
          "A secure communication protocol",
        ],
        correctAnswer: 1,
        explanation:
          "A Trojan appears to be legitimate software but contains hidden malicious code that executes when the program runs.",
        difficulty: "Easy",
      },
      {
        id: 4,
        question: "Which of the following is the best defense against malware?",
        options: [
          "Only using free software",
          "Avoiding the internet completely",
          "Regular updates and reputable antivirus software",
          "Using only mobile devices",
        ],
        correctAnswer: 2,
        explanation:
          "Keeping software updated and using reputable antivirus solutions provides the best protection against malware threats.",
        difficulty: "Medium",
      },
      {
        id: 5,
        question: "What is a zero-day exploit?",
        options: [
          "An exploit that costs nothing",
          "An exploit of a vulnerability unknown to software vendors",
          "An exploit that works for only one day",
          "An exploit that affects zero computers",
        ],
        correctAnswer: 1,
        explanation:
          "A zero-day exploit targets a vulnerability that is unknown to software vendors and security researchers, making it particularly dangerous.",
        difficulty: "Hard",
      },
    ],
  },
  {
    id: "network-security-basics",
    title: "Network Security Fundamentals",
    description:
      "Test your understanding of network security principles and practices",
    category: "Network Security",
    difficulty: "Intermediate",
    timeLimit: 30,
    passingScore: 75,
    questions: [
      {
        id: 1,
        question: "What is the primary purpose of a firewall?",
        options: [
          "To prevent computer overheating",
          "To monitor and control network traffic",
          "To speed up internet connections",
          "To backup important files",
        ],
        correctAnswer: 1,
        explanation:
          "A firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules.",
        difficulty: "Easy",
      },
      {
        id: 2,
        question: "What does VPN stand for?",
        options: [
          "Virtual Private Network",
          "Very Private Network",
          "Verified Protection Network",
          "Variable Public Network",
        ],
        correctAnswer: 0,
        explanation:
          "VPN stands for Virtual Private Network, which creates a secure connection over a public network.",
        difficulty: "Easy",
      },
      {
        id: 3,
        question: "Which protocol is commonly used to secure web traffic?",
        options: ["HTTP", "FTP", "HTTPS", "SMTP"],
        correctAnswer: 2,
        explanation:
          "HTTPS (HTTP Secure) uses SSL/TLS encryption to secure web traffic between browsers and servers.",
        difficulty: "Medium",
      },
      {
        id: 4,
        question: "What is a DDoS attack?",
        options: [
          "A type of antivirus software",
          "Distributed Denial of Service attack",
          "Data Destruction of Systems",
          "Direct Database Operation System",
        ],
        correctAnswer: 1,
        explanation:
          "A DDoS (Distributed Denial of Service) attack overwhelms a target system with traffic from multiple sources to disrupt service.",
        difficulty: "Medium",
      },
      {
        id: 5,
        question: "What is network segmentation?",
        options: [
          "Dividing a network into smaller, isolated segments",
          "Connecting all devices to one network",
          "Removing network cables",
          "Upgrading network hardware",
        ],
        correctAnswer: 0,
        explanation:
          "Network segmentation divides a network into smaller segments to improve security and performance by limiting access between segments.",
        difficulty: "Hard",
      },
    ],
  },
  {
    id: "web-application-security",
    title: "Web Application Security",
    description:
      "Assess your knowledge of web application vulnerabilities and security measures",
    category: "Web Security",
    difficulty: "Advanced",
    timeLimit: 35,
    passingScore: 85,
    questions: [
      {
        id: 1,
        question: "What does XSS stand for in web security?",
        options: [
          "XML Security Standard",
          "Cross-Site Scripting",
          "eXternal Security System",
          "eXtra Security Settings",
        ],
        correctAnswer: 1,
        explanation:
          "XSS stands for Cross-Site Scripting, a vulnerability that allows attackers to inject malicious scripts into web pages.",
        difficulty: "Easy",
      },
      {
        id: 2,
        question: "Which of the following is an example of SQL injection?",
        options: [
          "SELECT * FROM users",
          "' OR '1'='1",
          "UPDATE password SET new='123'",
          "CREATE TABLE sensitive_data",
        ],
        correctAnswer: 1,
        explanation:
          "The string ' OR '1'='1 is a classic SQL injection payload that can bypass authentication by making the WHERE clause always true.",
        difficulty: "Medium",
      },
      {
        id: 3,
        question: "What is CSRF?",
        options: [
          "Cross-Site Request Forgery",
          "Cyber Security Response Framework",
          "Certified Security Risk Factor",
          "Computer Security Rapid Fix",
        ],
        correctAnswer: 0,
        explanation:
          "CSRF (Cross-Site Request Forgery) tricks users into performing unintended actions on applications where they're authenticated.",
        difficulty: "Medium",
      },
      {
        id: 4,
        question: "What is the OWASP Top 10?",
        options: [
          "Ten best security tools",
          "Ten most critical web application security risks",
          "Ten security companies",
          "Ten cybersecurity certifications",
        ],
        correctAnswer: 1,
        explanation:
          "The OWASP Top 10 is a list of the ten most critical web application security risks, updated regularly by security experts.",
        difficulty: "Easy",
      },
      {
        id: 5,
        question: "What is the best defense against SQL injection?",
        options: [
          "Using strong passwords",
          "Parameterized queries and input validation",
          "Installing antivirus software",
          "Using HTTPS only",
        ],
        correctAnswer: 1,
        explanation:
          "Parameterized queries (prepared statements) and proper input validation are the most effective defenses against SQL injection attacks.",
        difficulty: "Hard",
      },
    ],
  },
];

// Generate additional quizzes to reach 30 total
const categories = [
  "Social Engineering",
  "Authentication",
  "Malware",
  "Network Security",
  "Web Security",
  "Mobile Security",
  "Cloud Security",
  "IoT Security",
  "Cryptography",
  "Incident Response",
  "Digital Forensics",
  "Risk Management",
  "Compliance",
  "Physical Security",
  "Endpoint Security",
];

const difficulties = ["Beginner", "Intermediate", "Advanced"] as const;

// Create placeholder quizzes without AI-generated questions initially
for (let i = 6; i <= 30; i++) {
  const category = categories[i % categories.length];
  const difficulty = difficulties[i % 3];

  quizzesData.push({
    id: `quiz-${i}`,
    title: `${category} Assessment ${i}`,
    description: `Test your knowledge of ${category.toLowerCase()} concepts and best practices with AI-generated questions.`,
    category,
    difficulty,
    timeLimit: 15 + (i % 20),
    passingScore: 70 + (i % 20),
    questions: [
      {
        id: 1,
        question: `What is the primary goal of ${category.toLowerCase()}?`,
        options: [
          "To increase system performance",
          "To protect against security threats",
          "To reduce operational costs",
          "To improve user experience",
        ],
        correctAnswer: 1,
        explanation: `The primary goal of ${category.toLowerCase()} is to protect systems and data from security threats.`,
        difficulty: "Easy",
      },
      {
        id: 2,
        question: `Which of the following is a key principle in ${category.toLowerCase()}?`,
        options: [
          "Defense in depth",
          "Single point of failure",
          "Open access",
          "Minimal security",
        ],
        correctAnswer: 0,
        explanation:
          "Defense in depth is a fundamental security principle that uses multiple layers of protection.",
        difficulty: "Medium",
      },
      {
        id: 3,
        question: `What is the most effective way to implement ${category.toLowerCase()}?`,
        options: [
          "Use a single security tool",
          "Rely only on user training",
          "Implement comprehensive security policies and controls",
          "Trust all network traffic",
        ],
        correctAnswer: 2,
        explanation:
          "Comprehensive security policies and controls provide the most effective protection.",
        difficulty: "Medium",
      },
      {
        id: 4,
        question: `In ${category.toLowerCase()}, what should be your first priority?`,
        options: [
          "Cost reduction",
          "Risk assessment and management",
          "User convenience",
          "System speed",
        ],
        correctAnswer: 1,
        explanation:
          "Risk assessment and management should be the first priority in any security domain.",
        difficulty: "Easy",
      },
      {
        id: 5,
        question: `Advanced ${category.toLowerCase()} requires:`,
        options: [
          "Only technical controls",
          "Only administrative controls",
          "A combination of technical, administrative, and physical controls",
          "No controls at all",
        ],
        correctAnswer: 2,
        explanation:
          "Effective security requires a combination of technical, administrative, and physical controls.",
        difficulty: "Hard",
      },
    ],
  });
}

// Function to generate AI questions for a specific quiz on-demand
export const generateQuizQuestionsOnDemand = async (
  quizId: string,
): Promise<QuizData | null> => {
  const quiz = quizzesData.find((q) => q.id === quizId);
  if (!quiz) return null;

  try {
    const aiQuestions = await geminiAI.generateQuizQuestions(
      quiz.category,
      quiz.difficulty,
      5, // Each quiz has 5 questions
    );

    // Update the quiz with AI-generated questions
    const updatedQuiz: QuizData = {
      ...quiz,
      questions: aiQuestions,
      description: `${quiz.description.replace("with AI-generated questions.", "")}with AI-generated questions.`,
    };

    // Update the quiz in the main array
    const quizIndex = quizzesData.findIndex((q) => q.id === quizId);
    if (quizIndex !== -1) {
      quizzesData[quizIndex] = updatedQuiz;
    }

    return updatedQuiz;
  } catch (error) {
    console.error(`Failed to generate AI questions for quiz ${quizId}:`, error);
    return quiz; // Return original quiz with fallback questions
  }
};

export const getQuizById = (id: string): QuizData | undefined => {
  return quizzesData.find((quiz) => quiz.id === id);
};

export const getQuizzesByCategory = (category: string): QuizData[] => {
  return quizzesData.filter((quiz) => quiz.category === category);
};

export const getQuizzesByDifficulty = (difficulty: string): QuizData[] => {
  return quizzesData.filter((quiz) => quiz.difficulty === difficulty);
};

export const getAllQuizCategories = (): string[] => {
  return [...new Set(quizzesData.map((quiz) => quiz.category))];
};

// Helper function to calculate quiz score
export const calculateQuizScore = (
  answers: number[],
  quiz: QuizData,
): {
  score: number;
  percentage: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
} => {
  const correctAnswers = answers.filter(
    (answer, index) => answer === quiz.questions[index].correctAnswer,
  ).length;

  const percentage = Math.round((correctAnswers / quiz.questions.length) * 100);
  const passed = percentage >= quiz.passingScore;

  return {
    score: correctAnswers,
    percentage,
    passed,
    correctAnswers,
    totalQuestions: quiz.questions.length,
  };
};
