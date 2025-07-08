import { CourseData } from "./coursesData";

export const additionalCourses: CourseData[] = [
  {
    id: "digital-forensics",
    title: "Digital Forensics Investigation",
    description:
      "Master digital forensics techniques for incident investigation and evidence collection in cybersecurity incidents.",
    instructor: "Detective Lisa Miller",
    duration: "12 weeks",
    lessons: 36,
    difficulty: "Advanced",
    category: "Digital Forensics",
    rating: 4.8,
    students: 3245,
    objectives: [
      "Conduct digital forensics investigations",
      "Collect and preserve digital evidence",
      "Analyze malware and attack artifacts",
      "Prepare forensics reports for legal proceedings",
    ],
    prerequisites: [
      "Cybersecurity fundamentals",
      "Operating systems knowledge",
    ],
    syllabus: [
      {
        module: "Forensics Fundamentals",
        topics: ["Legal framework", "Evidence handling", "Chain of custody"],
        duration: "3 weeks",
      },
      {
        module: "Computer Forensics",
        topics: ["Disk imaging", "File recovery", "Timeline analysis"],
        duration: "3 weeks",
      },
      {
        module: "Network Forensics",
        topics: [
          "Packet analysis",
          "Log correlation",
          "Traffic reconstruction",
        ],
        duration: "3 weeks",
      },
      {
        module: "Mobile Forensics",
        topics: [
          "Mobile data extraction",
          "App analysis",
          "Communication forensics",
        ],
        duration: "3 weeks",
      },
    ],
    skills: [
      "Digital Forensics",
      "Evidence Collection",
      "Malware Analysis",
      "Legal Compliance",
    ],
    certification: true,
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
  {
    id: "threat-hunting",
    title: "Advanced Threat Hunting",
    description:
      "Learn proactive threat hunting techniques to identify hidden threats and advanced persistent threats in your environment.",
    instructor: "Captain James Wilson",
    duration: "10 weeks",
    lessons: 30,
    difficulty: "Advanced",
    category: "Threat Hunting",
    rating: 4.9,
    students: 2156,
    objectives: [
      "Develop threat hunting methodologies",
      "Use advanced analytics for threat detection",
      "Hunt for APT groups and sophisticated attacks",
      "Build threat intelligence capabilities",
    ],
    prerequisites: [
      "Security operations experience",
      "Network analysis skills",
    ],
    syllabus: [
      {
        module: "Threat Hunting Foundations",
        topics: [
          "Hunting methodology",
          "Hypothesis development",
          "Intelligence gathering",
        ],
        duration: "2 weeks",
      },
      {
        module: "Data Analysis Techniques",
        topics: [
          "Statistical analysis",
          "Behavioral analytics",
          "Machine learning applications",
        ],
        duration: "3 weeks",
      },
      {
        module: "Advanced Hunting",
        topics: ["APT hunting", "Living off the land", "Memory analysis"],
        duration: "3 weeks",
      },
      {
        module: "Tool Development",
        topics: [
          "Custom hunting tools",
          "Automation",
          "Threat intelligence platforms",
        ],
        duration: "2 weeks",
      },
    ],
    skills: [
      "Threat Hunting",
      "Data Analysis",
      "Threat Intelligence",
      "Security Operations",
    ],
    certification: true,
    imageUrl: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=400",
  },
  {
    id: "security-architecture",
    title: "Enterprise Security Architecture",
    description:
      "Design and implement comprehensive security architectures for enterprise environments with focus on scalability and resilience.",
    instructor: "Dr. Patricia Johnson",
    duration: "14 weeks",
    lessons: 42,
    difficulty: "Advanced",
    category: "Security Architecture",
    rating: 4.7,
    students: 1987,
    objectives: [
      "Design enterprise security architectures",
      "Implement security frameworks",
      "Develop security strategies",
      "Manage security portfolios",
    ],
    prerequisites: [
      "Enterprise IT experience",
      "Security management knowledge",
    ],
    syllabus: [
      {
        module: "Architecture Fundamentals",
        topics: [
          "Security architecture principles",
          "Framework selection",
          "Risk-based design",
        ],
        duration: "3 weeks",
      },
      {
        module: "Enterprise Integration",
        topics: ["Identity management", "Access control", "API security"],
        duration: "4 weeks",
      },
      {
        module: "Cloud Architecture",
        topics: [
          "Multi-cloud security",
          "Hybrid environments",
          "Container security",
        ],
        duration: "4 weeks",
      },
      {
        module: "Future Technologies",
        topics: ["Zero trust", "AI security", "Quantum-ready architectures"],
        duration: "3 weeks",
      },
    ],
    skills: [
      "Security Architecture",
      "Enterprise Security",
      "Strategic Planning",
      "Risk Management",
    ],
    certification: true,
    imageUrl:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400",
  },
  {
    id: "devsecops",
    title: "DevSecOps Implementation",
    description:
      "Integrate security into DevOps processes with automated security testing, secure CI/CD pipelines, and security-first development.",
    instructor: "Ryan Mitchell",
    duration: "8 weeks",
    lessons: 24,
    difficulty: "Intermediate",
    category: "DevSecOps",
    rating: 4.6,
    students: 4521,
    objectives: [
      "Implement DevSecOps practices",
      "Automate security testing",
      "Build secure CI/CD pipelines",
      "Integrate security tools into development workflows",
    ],
    prerequisites: [
      "Development experience",
      "DevOps knowledge",
      "Basic security concepts",
    ],
    syllabus: [
      {
        module: "DevSecOps Fundamentals",
        topics: [
          "Security shift-left",
          "Culture transformation",
          "Tool integration",
        ],
        duration: "2 weeks",
      },
      {
        module: "Secure Development",
        topics: [
          "Secure coding practices",
          "Static analysis",
          "Dependency scanning",
        ],
        duration: "2 weeks",
      },
      {
        module: "Pipeline Security",
        topics: [
          "CI/CD security",
          "Container scanning",
          "Infrastructure as code",
        ],
        duration: "2 weeks",
      },
      {
        module: "Operations Security",
        topics: ["Runtime protection", "Monitoring", "Incident response"],
        duration: "2 weeks",
      },
    ],
    skills: ["DevSecOps", "Secure Development", "Automation", "CI/CD Security"],
    certification: true,
    imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400",
  },
  // Continue adding more courses...
  {
    id: "industrial-security",
    title: "Industrial Control Systems Security",
    description:
      "Secure industrial control systems, SCADA networks, and critical infrastructure from cyber threats and operational disruption.",
    instructor: "Engineer Maria Santos",
    duration: "10 weeks",
    lessons: 30,
    difficulty: "Advanced",
    category: "Industrial Security",
    rating: 4.8,
    students: 1654,
    objectives: [
      "Understand ICS/SCADA security challenges",
      "Implement industrial security controls",
      "Monitor operational technology networks",
      "Respond to industrial cyber incidents",
    ],
    prerequisites: ["Industrial systems knowledge", "Network security basics"],
    syllabus: [
      {
        module: "ICS Fundamentals",
        topics: ["SCADA systems", "PLC programming", "Industrial protocols"],
        duration: "3 weeks",
      },
      {
        module: "Threat Landscape",
        topics: [
          "Nation-state attacks",
          "Industrial malware",
          "Physical impacts",
        ],
        duration: "2 weeks",
      },
      {
        module: "Security Implementation",
        topics: [
          "Network segmentation",
          "Security monitoring",
          "Patch management",
        ],
        duration: "3 weeks",
      },
      {
        module: "Incident Response",
        topics: ["Operational continuity", "Recovery procedures", "Forensics"],
        duration: "2 weeks",
      },
    ],
    skills: [
      "ICS Security",
      "SCADA Protection",
      "Industrial Networks",
      "Critical Infrastructure",
    ],
    certification: true,
    imageUrl:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
  },
  // Add 39 more courses to reach 50+ total...
];

// Export combined courses
export const allCourses = [...additionalCourses];
